#!/usr/bin/env python3
"""
Baixa as capas ("video_cover_big") de todos os vídeos das páginas guardadas pelo baixar_cos.py.

    python3 tools/baixar_capas_cos.py                 # lê tools/cos_resultado/cos_paginas/ e salva em tools/cos_resultado/cos_capas/
    python3 tools/baixar_capas_cos.py --limite 5      # teste rápido: só as 5 primeiras capas
    python3 tools/baixar_capas_cos.py --simular       # só lista o que seria baixado

Cada imagem é salva como  {título do vídeo}.{extensão original}  (a extensão vem da URL da capa; se a URL não tiver
uma, vem do tipo do arquivo que o servidor devolver). Detalhes:
  - caracteres que o Windows não aceita em nome de arquivo (\\ / : * ? " < > |) viram "_" no título;
  - se dois vídeos tiverem o mesmo título, o segundo (e os seguintes) ganha o id no fim: "Título (123456).jpg";
  - imagens que já existem na pasta são puladas, então é possível interromper e rodar de novo;
  - vídeos sem "video_cover_big" são listados no final.
"""
import argparse
import json
import mimetypes
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

PASTA_DE_RESULTADO = Path(__file__).resolve().parent / "cos_resultado"  # tools/cos_resultado
CABECALHOS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/*,*/*;q=0.8",
    "Referer": "https://cos.tv/",
}
INVALIDOS = re.compile(r'[\\/:*?"<>|\x00-\x1f]')
RESERVADOS_WINDOWS = {"con", "prn", "aux", "nul", *(f"com{i}" for i in range(1, 10)), *(f"lpt{i}" for i in range(1, 10))}
TAMANHO_MAXIMO_DO_NOME = 150  # sem a extensão; deixa folga para caminhos longos no Windows


def url_da_capa(valor):
    """O campo costuma ser um texto com a URL; por garantia aceita também um objeto/lista com ela dentro."""
    if isinstance(valor, str):
        return valor.strip()
    if isinstance(valor, dict):
        for chave in ("url", "src", "big", "origin"):
            if isinstance(valor.get(chave), str) and valor[chave].strip():
                return valor[chave].strip()
    if isinstance(valor, list):
        for v in valor:
            achada = url_da_capa(v)
            if achada:
                return achada
    return ""


def nome_seguro(titulo, id_video):
    nome = INVALIDOS.sub("_", titulo or "").strip().strip(".")
    nome = re.sub(r"\s+", " ", nome)[:TAMANHO_MAXIMO_DO_NOME].strip().strip(".")
    if not nome or nome.lower() in RESERVADOS_WINDOWS:
        nome = f"video_{id_video}" if not nome else f"{nome}_"
    return nome


def extensao_da_url(url):
    sufixo = Path(urllib.parse.unquote(urllib.parse.urlparse(url).path)).suffix.lower()
    return sufixo if re.fullmatch(r"\.[a-z0-9]{1,5}", sufixo) else ""


def baixar_bytes(url, tentativas, timeout):
    """Devolve (bytes, tipo do conteúdo). Repete com espera crescente em erro passageiro (rede, 429, 5xx)."""
    ultimo_erro = None
    for tentativa in range(1, tentativas + 1):
        espera = 2 ** tentativa
        try:
            req = urllib.request.Request(url, headers=CABECALHOS)
            with urllib.request.urlopen(req, timeout=timeout) as resposta:
                return resposta.read(), resposta.headers.get_content_type()
        except urllib.error.HTTPError as erro:
            if erro.code in (401, 403, 404, 410):
                raise RuntimeError(f"o site respondeu {erro.code}")
            ultimo_erro = f"HTTP {erro.code}"
            if erro.code == 429 and erro.headers.get("Retry-After", "").isdigit():
                espera = int(erro.headers["Retry-After"])
        except (urllib.error.URLError, TimeoutError, ConnectionError, OSError) as erro:
            ultimo_erro = str(getattr(erro, "reason", erro))
        if tentativa < tentativas:
            print(f"      erro ({ultimo_erro}); tentando de novo em {espera}s ({tentativa}/{tentativas})")
            time.sleep(espera)
    raise RuntimeError(f"falhou depois de {tentativas} tentativas ({ultimo_erro})")


def ler_videos(pasta):
    """Lê as páginas guardadas, na ordem; devolve [(id, título, url da capa)] sem repetir vídeos."""
    arquivos = sorted(Path(pasta).glob("pagina_*.json"))
    if not arquivos:
        sys.exit(f"ERRO: nenhuma página em {pasta}/. Rode antes o tools/baixar_cos.py (ou use --pasta).")
    vistos, videos = set(), []
    for arquivo in arquivos:
        try:
            lista = json.loads(arquivo.read_text(encoding="utf-8"))["data"]["list"]
        except (ValueError, KeyError, TypeError) as erro:
            print(f"AVISO  {arquivo.name}: não é uma página válida, ignorada ({erro})")
            continue
        for item in lista:
            id_video = str(item.get("id", "")).strip()
            if not id_video or id_video in vistos:
                continue
            vistos.add(id_video)
            videos.append((id_video, str(item.get("title") or "").strip(), url_da_capa(item.get("video_cover_big"))))
    return videos


def main():
    ap = argparse.ArgumentParser(description="Baixa a 'video_cover_big' de cada vídeo guardado pelo baixar_cos.py.")
    ap.add_argument("--pasta", default=str(PASTA_DE_RESULTADO / "cos_paginas"), help="páginas baixadas pelo baixar_cos.py")
    ap.add_argument("-o", "--saida", default=str(PASTA_DE_RESULTADO / "cos_capas"), help="pasta onde salvar as imagens")
    ap.add_argument("--limite", type=int, default=0, help="baixa só as N primeiras (para testar)")
    ap.add_argument("--simular", action="store_true", help="não baixa; só mostra os nomes de arquivo que seriam usados")
    ap.add_argument("--pausa", type=float, default=0.2, help="segundos entre uma imagem e outra")
    ap.add_argument("--tentativas", type=int, default=4, help="tentativas por imagem em caso de erro passageiro")
    ap.add_argument("--timeout", type=float, default=30, help="segundos de espera por resposta")
    args = ap.parse_args()
    for saida in (sys.stdout, sys.stderr):
        if hasattr(saida, "reconfigure"):
            saida.reconfigure(encoding="utf-8", errors="replace")

    videos = ler_videos(args.pasta)
    saida = Path(args.saida)
    if not args.simular:
        saida.mkdir(parents=True, exist_ok=True)

    sem_capa = [(i, t) for i, t, u in videos if not u]
    com_capa = [(i, t, u) for i, t, u in videos if u]
    if args.limite:
        com_capa = com_capa[:args.limite]
    print(f"{len(videos)} vídeos lidos; {len(com_capa)} com capa a processar; {len(sem_capa)} sem 'video_cover_big'")

    usados = set()  # nomes (minúsculos) já escolhidos nesta execução: detecta títulos repetidos
    baixadas = puladas = 0
    falhas = []
    for n, (id_video, titulo, url) in enumerate(com_capa, 1):
        base = nome_seguro(titulo, id_video)
        if base.lower() in usados:
            base = f"{base} ({id_video})"
        usados.add(base.lower())

        ext = extensao_da_url(url)
        existente = [p for p in saida.glob(glob_seguro(base) + ".*") if p.stem == base] if saida.exists() and not ext else []
        alvo = saida / f"{base}{ext}" if ext else (existente[0] if existente else None)
        if alvo is not None and alvo.exists():
            puladas += 1
            continue
        if args.simular:
            print(f"  [{n}/{len(com_capa)}] {base}{ext or '.?'}  <-  {url}")
            continue
        try:
            dados, tipo = baixar_bytes(url, args.tentativas, args.timeout)
            if not dados:
                raise RuntimeError("resposta vazia")
            if not ext:  # URL sem extensão: usa o tipo do arquivo (image/jpeg -> .jpg)
                ext = {"image/jpeg": ".jpg"}.get(tipo) or mimetypes.guess_extension(tipo) or ".jpg"
                alvo = saida / f"{base}{ext}"
            alvo.write_bytes(dados)
            baixadas += 1
            print(f"  [{n}/{len(com_capa)}] {alvo.name}")
        except (RuntimeError, OSError) as erro:
            falhas.append((id_video, titulo, url, str(erro)))
            print(f"  [{n}/{len(com_capa)}] FALHOU {titulo!r}: {erro}")
        time.sleep(args.pausa)

    print(f"\nbaixadas: {baixadas} | já existiam: {puladas} | falhas: {len(falhas)} | sem capa: {len(sem_capa)}")
    if falhas:
        print("\nFalhas (rode de novo para tentar só essas):")
        for id_video, titulo, url, erro in falhas:
            print(f"  {id_video}  {titulo}  -> {erro}\n      {url}")
    if sem_capa:
        print("\nSem 'video_cover_big':")
        for id_video, titulo in sem_capa[:50]:
            print(f"  {id_video}  {titulo}")
        if len(sem_capa) > 50:
            print(f"  ... e mais {len(sem_capa) - 50}")
    if args.simular:
        print("(--simular: nada foi baixado)")


def glob_seguro(texto):
    """Escapa [ ] * ? do nome para usá-lo no glob()."""
    return re.sub(r"([\[\]*?])", r"[\1]", texto)


if __name__ == "__main__":
    main()
