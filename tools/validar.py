#!/usr/bin/env python3
"""
Valida a consistência dos dados do arquivo (JSONs, capas, thumbnails, links).

Uso (na raiz do repositório):
    python3 tools/validar.py

Sai com código 1 se achar ERROS (quebram o site ou deixam um item sem imagem/link).
AVISOS são coisas para conferir, mas que podem ser intencionais.
"""
import json
import os
import re
import sys
import unicodedata
from datetime import datetime

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)

erros, avisos = [], []


def erro(msg):
    erros.append(msg)


def aviso(msg):
    avisos.append(msg)


def carregar(caminho):
    try:
        with open(caminho, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        erro(f"{caminho}: arquivo não existe")
    except json.JSONDecodeError as e:
        erro(f"{caminho}: JSON inválido ({e})")
    return None


def data_valida(texto):
    if not isinstance(texto, str) or not re.fullmatch(r"\d{2}/\d{2}/\d{4}", texto):
        return False
    try:
        datetime.strptime(texto, "%d/%m/%Y")
        return True
    except ValueError:
        return False


def sem_acento_e_pontuacao(texto):
    texto = unicodedata.normalize("NFD", texto.lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in texto if unicodedata.category(c) != "Mn"))


def checar_tags(item, onde):
    """A busca já procura no 'nome'; 'tags' é só para apelidos e termos extras."""
    tags = item.get("tags", "")
    nome = sem_acento_e_pontuacao(item.get("nome", ""))
    if nome and sem_acento_e_pontuacao(tags).startswith(nome):
        aviso(f"{onde}: 'tags' começa repetindo o nome (pode apagar essa parte, a busca já usa o nome)")


def quantidade_desatualizada(declarada, arquivados):
    """'quantidade' é opcional: sem ela o site conta os vídeos sozinho.
    Só vale declarar quando é MAIOR que o arquivado (ex.: playlist original com 10, só 4 arquivados); menor é erro de digitação/atraso."""
    if declarada is None:
        return False
    try:
        return int(declarada) < arquivados
    except (TypeError, ValueError):
        return True


def checar_item_de_video(item, onde, pasta_imagens, nome_imagem):
    """Checks comuns a qualquer vídeo (episódio, VOD, extra, standalone, outros)."""
    plataforma = item.get("plataforma")
    links = item.get("links") or {}

    if "linkyt" in item:
        erro(f"{onde}: usa o formato antigo 'linkyt' (migrar para links.youtube)")
    if not plataforma:
        erro(f"{onde}: sem 'plataforma'")
    elif not links.get(plataforma):
        erro(f"{onde}: plataforma '{plataforma}' sem link em links.{plataforma}")
    if not data_valida(item.get("data")):
        erro(f"{onde}: data ausente ou fora do formato DD/MM/AAAA ({item.get('data')!r})")
    if not isinstance(item.get("duracao"), dict):
        erro(f"{onde}: sem 'duracao'")
    if nome_imagem and not os.path.exists(os.path.join(pasta_imagens, nome_imagem)):
        erro(f"{onde}: imagem não encontrada ({pasta_imagens}/{nome_imagem})")


def checar_videos_json(caminho, pasta):
    dados = carregar(caminho)
    if dados is None:
        return 0
    videos = dados.get("videos", [])

    # a imagem de cada vídeo é numerada pela posição: 1.webp, 2.webp...
    for i, v in enumerate(videos):
        checar_item_de_video(v, f"{caminho} vídeo #{i + 1} ({v.get('nome', '?')})", pasta, f"{i + 1}.{v.get('imagem', 'webp')}")

    ids = set()
    for e in dados.get("extras", []):
        onde = f"{caminho} extra '{e.get('id', '?')}'"
        if e.get("id") in ids:
            erro(f"{onde}: id repetido")
        ids.add(e.get("id"))
        checar_item_de_video(e, onde, pasta, e.get("imagem"))

    disponiveis = sum(1 for v in videos if isinstance(v, dict) and v.get("plataforma") != "perdido")  # perdidos não contam
    for p in dados.get("playlist", []):
        if quantidade_desatualizada(p.get("quantidade"), disponiveis):
            aviso(f"{caminho}: a playlist diz {p.get('quantidade')} vídeos, mas há {disponiveis} arquivados (número provavelmente desatualizado)")
    return len(videos)


def quantidade_invalida(q):
    """'quantidade' opcional: vazia/ausente é ok; se existir, precisa ser um número maior que 0."""
    if q is None or q == "":
        return False
    try:
        return int(q) <= 0
    except (TypeError, ValueError):
        return True


def checar_series_json(base, series):
    """series.json = {"itens": [...]}, cada item com "tipo": "playlist" ou "video"."""
    arquivo = f"{base}/series.json"
    if "itens" not in series:
        erro(f"{arquivo}: formato antigo (sem 'itens')")
        return
    itens = series["itens"]
    if not isinstance(itens, list) or not itens:
        erro(f"{arquivo}: 'itens' precisa ser uma lista com pelo menos 1 item")
        return

    pastas_usadas = set()
    curtos = set()
    for i, item in enumerate(itens):
        onde = f"{arquivo} item #{i + 1} ({item.get('nome', '?')})"
        tipo = item.get("tipo")
        if not item.get("nome"):
            erro(f"{onde}: sem 'nome'")
        if item.get("imagem") and not os.path.exists(os.path.join(base, item["imagem"])):
            erro(f"{onde}: imagem não encontrada ({base}/{item['imagem']})")
        elif not item.get("imagem"):
            erro(f"{onde}: sem 'imagem' (caminho a partir da pasta do jogo, ex.: episodios/1.webp)")

        if tipo == "playlist":
            redirect = item.get("redirect")
            if quantidade_invalida(item.get("quantidade")):
                aviso(f"{onde}: 'quantidade' inválida ({item.get('quantidade')!r}; esperado um número maior que 0)")
            if redirect == "pasta":
                pasta = item.get("pasta")
                if not pasta:
                    erro(f"{onde}: playlist com redirect 'pasta' precisa de 'pasta'")
                    continue
                if pasta in pastas_usadas:
                    aviso(f"{onde}: a pasta '{pasta}' já é usada por outra playlist deste jogo")
                pastas_usadas.add(pasta)
                n = checar_videos_json(f"{base}/{pasta}/videos.json", f"{base}/{pasta}")
                if quantidade_desatualizada(item.get("quantidade"), n):
                    aviso(f"{onde}: diz {item.get('quantidade')} itens, mas {pasta}/videos.json tem {n} (número provavelmente desatualizado)")
            elif redirect == "link":
                if not item.get("link"):
                    erro(f"{onde}: playlist com redirect 'link' precisa de 'link'")
                if item.get("pasta"):
                    aviso(f"{onde}: tem 'pasta', mas o redirect é 'link' (a pasta é ignorada)")
            else:
                erro(f"{onde}: playlist com 'redirect' inválido ({redirect!r}; use 'pasta' ou 'link')")

        elif tipo == "video":
            redirect = item.get("redirect")
            plataforma = item.get("plataforma")
            if redirect not in ("direto", "embed"):
                erro(f"{onde}: vídeo com 'redirect' inválido ({redirect!r}; use 'direto' ou 'embed')")
            if not plataforma:
                erro(f"{onde}: vídeo sem 'plataforma'")
            elif not (item.get("links") or {}).get(plataforma):
                erro(f"{onde}: plataforma '{plataforma}' sem link em links.{plataforma}")
            if not isinstance(item.get("duracao"), dict):
                erro(f"{onde}: sem 'duracao'")
            if item.get("data") is not None and not data_valida(item.get("data")):
                erro(f"{onde}: data fora do formato DD/MM/AAAA ({item.get('data')!r})")
            if redirect == "embed":
                if not item.get("curto"):
                    erro(f"{onde}: vídeo com redirect 'embed' precisa de 'curto' (o identificador na URL da página de vídeo)")
                elif item["curto"] in curtos:
                    erro(f"{onde}: 'curto' repetido ({item['curto']})")
                curtos.add(item.get("curto"))
                if not data_valida(item.get("data")):
                    erro(f"{onde}: vídeo com redirect 'embed' precisa de 'data' (DD/MM/AAAA)")
        else:
            erro(f"{onde}: 'tipo' inválido ({tipo!r}; use 'playlist' ou 'video')")

    # pastas com videos.json que nenhuma playlist usa
    for sub in sorted(os.listdir(base)):
        if os.path.isfile(os.path.join(base, sub, "videos.json")) and sub not in pastas_usadas:
            aviso(f"{base}/{sub}: pasta com videos.json, mas nenhuma playlist do series.json aponta para ela (não aparece no site)")


def main():
    dados = carregar("dados.json")
    franquias = carregar("franquias.json")
    if dados is None or franquias is None:
        return

    jogos = dados.get("jogos", [])
    consoles = {c["sigla"] for c in dados.get("consoles", [])}

    # --- jogos ---
    vistos = set()
    for j in jogos:
        chave = (j.get("console"), j.get("curto"))
        nome = f"jogo {j.get('console')}/{j.get('curto')}"
        if chave in vistos:
            erro(f"dados.json: {nome} aparece mais de uma vez")
        vistos.add(chave)
        checar_tags(j, nome)
        if j.get("console") not in consoles:
            erro(f"dados.json: {nome} usa console que não existe em 'consoles'")
        if not os.path.exists(f"capas/{chave[0]}/{chave[1]}.webp"):
            erro(f"{nome}: capa não encontrada (capas/{chave[0]}/{chave[1]}.webp)")

        base = f"video/{chave[0]}/{chave[1]}"
        series = carregar(f"{base}/series.json")
        if series is None:
            continue
        checar_series_json(base, series)

    # pastas de jogo que existem no disco mas não estão em dados.json
    if os.path.isdir("video"):
        for con in sorted(os.listdir("video")):
            if con in ("etc", "outros") or not os.path.isdir(f"video/{con}"):
                continue
            for pasta_jogo in sorted(os.listdir(f"video/{con}")):
                if os.path.isdir(f"video/{con}/{pasta_jogo}") and (con, pasta_jogo) not in vistos:
                    aviso(f"video/{con}/{pasta_jogo}: pasta existe, mas o jogo não está em dados.json (não aparece no site)")

    # --- vídeos independentes (standalone) ---
    curtos = set()
    for s in dados.get("standalone", []):
        onde = f"standalone '{s.get('curto')}'"
        checar_tags(s, onde)
        if s.get("curto") in curtos:
            erro(f"{onde}: 'curto' repetido")
        curtos.add(s.get("curto"))
        checar_item_de_video(s, onde, "video/etc", s.get("imagem"))

    # --- outros ---
    for o in dados.get("outros", []):
        onde = f"outros '{o.get('curto')}'"
        checar_tags(o, onde)
        pasta = f"video/outros/{o.get('curto')}"
        if not os.path.exists(f"{pasta}/{o.get('imagem')}"):
            erro(f"{onde}: imagem de capa não encontrada ({pasta}/{o.get('imagem')})")
        checar_videos_json(f"{pasta}/videos.json", pasta)

    # --- franquias ---
    curtos_jogos = {j["curto"] for j in jogos}
    for fid, f in franquias.items():
        checar_tags(f, f"franquia '{fid}'")
        for jogo in f.get("jogos", []):
            if jogo not in curtos_jogos:
                erro(f"franquias.json: '{fid}' lista o jogo '{jogo}', que não existe em dados.json")
        for capa in f.get("capas", []):
            if not os.path.exists(f"capas/{capa}.webp"):
                erro(f"franquias.json: '{fid}' usa a capa 'capas/{capa}.webp', que não existe")

    # --- lost media (off.json) ---
    off = carregar("off.json")
    for i, item in enumerate((off or {}).get("lostmedia", [])):
        checar_tags(item, f"off.json item #{i + 1}")


main()

for a in avisos:
    print(f"AVISO  {a}")
for e in erros:
    print(f"ERRO   {e}")
print(f"\n{len(erros)} erro(s), {len(avisos)} aviso(s)")
sys.exit(1 if erros else 0)
