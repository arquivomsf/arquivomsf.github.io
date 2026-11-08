#!/usr/bin/env python3
"""
Baixa a lista de vídeos de um canal do COS.TV direto da API do site e salva título, data de publicação e descrição.

Uso, na raiz do repositório:
    python3 tools/baixar_cos.py                 # baixa tudo e gera os arquivos
    python3 tools/baixar_cos.py --paginas 2     # teste rápido: só as 2 primeiras páginas
    python3 tools/baixar_cos.py --so-processar  # não baixa nada, só refaz os arquivos a partir do que já foi baixado

O que ele faz:
  1. baixa page=1, page=2, ... da API até acabar e guarda cada resposta, sem alterar, em tools/cos_resultado/cos_paginas/pagina_0001.json etc.
     (se parar no meio, rode de novo: ele só baixa o que falta);
  2. a partir dessas páginas gera
       tools/cos_resultado/cos_videos.txt   no formato  Título / Data / (linha em branco) / Descrição / ---
       tools/cos_resultado/cos_videos.json  os mesmos dados + link, duração, tags, jogo e a descrição já pronta para o campo "desc" do site.

A data é o "created_at" que a API devolve (momento em que o vídeo foi criado no COS.TV), no fuso de Brasília.
Se for baixar de novo depois de o canal ter vídeos novos, use --refazer (senão ele reaproveita as páginas antigas,
que ficam deslocadas quando entra vídeo novo).
"""
import argparse
import html
import json
import math
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

UID_PADRAO = "16570413463283712"
URL_PADRAO = "https://cos.tv/api/v1/feed/video/other/homelist?uid={uid}&filter=&page={page}&pagesize={pagesize}&order_by=1"
LINK_VIDEO = "https://cos.tv/videos/play/{id}"
CABECALHOS = {
    # um nome de navegador comum: alguns sites recusam o "Python-urllib" padrão
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
    "Referer": "https://cos.tv/",
}
PASTA_DE_RESULTADO = Path(__file__).resolve().parent / "cos_resultado"  # tools/cos_resultado
MAX_PAGINAS_DE_SEGURANCA = 5000  # só para um erro nunca virar um laço infinito


class ErroDeDownload(Exception):
    pass


# ---------------------------------------------------------------------------------------------
# Download
# ---------------------------------------------------------------------------------------------
def numero(valor, padrao=None):
    """A API manda números como texto ("3072"); aceita os dois."""
    try:
        return int(float(str(valor).strip()))
    except (TypeError, ValueError):
        return padrao


def verdadeiro(valor):
    return str(valor).strip().lower() in ("1", "true", "yes", "sim")


def baixar_texto(url, tentativas, timeout):
    """Baixa uma URL; repete com espera crescente se der erro passageiro (rede, 429, 5xx)."""
    ultimo_erro = None
    for tentativa in range(1, tentativas + 1):
        espera = 2 ** tentativa  # 2, 4, 8, 16...
        try:
            req = urllib.request.Request(url, headers=CABECALHOS)
            with urllib.request.urlopen(req, timeout=timeout) as resposta:
                return resposta.read().decode("utf-8")
        except urllib.error.HTTPError as erro:
            if erro.code in (401, 403, 404):
                raise ErroDeDownload(f"o site respondeu {erro.code} para {url}")
            ultimo_erro = f"HTTP {erro.code}"
            if erro.code == 429 and erro.headers.get("Retry-After", "").isdigit():
                espera = int(erro.headers["Retry-After"])
        except (urllib.error.URLError, TimeoutError, ConnectionError, OSError) as erro:
            ultimo_erro = str(getattr(erro, "reason", erro))
        if tentativa < tentativas:
            print(f"      erro ({ultimo_erro}); tentando de novo em {espera}s ({tentativa}/{tentativas})")
            time.sleep(espera)
    raise ErroDeDownload(f"não consegui baixar depois de {tentativas} tentativas ({ultimo_erro}): {url}")


def ler_pagina(texto):
    """Confere se o texto é mesmo uma página de vídeos. Devolve o objeto 'data', ou levanta ValueError."""
    corpo = json.loads(texto)
    dados = corpo.get("data") if isinstance(corpo, dict) else None
    if not isinstance(dados, dict) or not isinstance(dados.get("list"), list):
        mensagem = corpo.get("message") if isinstance(corpo, dict) else ""
        raise ValueError(f"resposta sem data.list (message: {mensagem!r})")
    return dados


def pagina_guardada_serve(caminho, pagina, pagesize):
    """Uma página já baixada só é reaproveitada se for a mesma página e o mesmo tamanho de página pedidos agora."""
    try:
        dados = ler_pagina(caminho.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None
    if numero(dados.get("page")) == pagina and numero(dados.get("pagesize")) == pagesize:
        return dados
    return None


def baixar_todas(args):
    pasta = Path(args.pasta)
    pasta.mkdir(parents=True, exist_ok=True)
    pagina = 1
    total = None
    baixadas = 0
    while pagina <= MAX_PAGINAS_DE_SEGURANCA:
        caminho = pasta / f"pagina_{pagina:04d}.json"
        dados = None if args.refazer else pagina_guardada_serve(caminho, pagina, args.pagesize)
        origem = "já baixada"

        if dados is None:
            url = args.url.format(uid=args.uid, page=pagina, pagesize=args.pagesize)
            texto = baixar_texto(url, args.tentativas, args.timeout)
            try:
                dados = ler_pagina(texto)
            except ValueError as erro:
                raise ErroDeDownload(f"a página {pagina} veio num formato inesperado: {erro}\n   URL: {url}\n   começo da resposta: {texto[:200]!r}")
            caminho.write_text(texto, encoding="utf-8")
            baixadas += 1
            origem = "baixada"

        total = numero(dados.get("total"), total)
        paginas_previstas = math.ceil(total / args.pagesize) if total else "?"
        print(f"  página {pagina}/{paginas_previstas}: {len(dados['list'])} vídeos ({origem})")

        if not dados["list"] or not verdadeiro(dados.get("has_next")):
            break
        if args.paginas and pagina >= args.paginas:
            print(f"  parando na página {pagina}, como pedido (--paginas {args.paginas})")
            break
        pagina += 1
        if origem == "baixada":
            time.sleep(args.pausa)  # educação com o site
    return baixadas, total


# ---------------------------------------------------------------------------------------------
# Processamento
# ---------------------------------------------------------------------------------------------
def texto_ou_vazio(valor):
    if valor is None:
        return ""
    if isinstance(valor, (list, tuple)):
        return ", ".join(str(v).strip() for v in valor if str(v).strip())
    return str(valor).strip()


def converter_video(item, fuso):
    descricao = texto_ou_vazio(item.get("introduction")).replace("\r\n", "\n").replace("\r", "\n").strip()
    criado = numero(item.get("created_at"))
    data = datetime.fromtimestamp(criado, timezone.utc).astimezone(fuso) if criado else None
    segundos = numero(item.get("duration"))  # "2780.416" -> 2780
    id_video = texto_ou_vazio(item.get("id"))
    return {
        "id": id_video,
        "link": LINK_VIDEO.format(id=id_video),
        "titulo": texto_ou_vazio(item.get("title")),
        "data": data.strftime("%d/%m/%Y") if data else "",
        "data_iso": data.isoformat() if data else "",
        "descricao": descricao,
        # o site mostra "desc" com innerHTML: escapa o texto e troca quebra de linha por <br>
        "desc_site": html.escape(descricao, quote=False).replace("\n", "<br>") if descricao else "",
        # mesmo formato do campo "duracao" dos videos.json do site
        "duracao": {"horas": segundos // 3600, "minutos": segundos % 3600 // 60, "segundos": segundos % 60} if segundos is not None else None,
        "tags": texto_ou_vazio(item.get("tag")),
        "jogo": texto_ou_vazio(item.get("game_name")),
        "_criado": criado or 0,
    }


def juntar_paginas(pasta, fuso):
    """Lê todas as páginas baixadas, na ordem, e devolve (vídeos sem repetição, quantas repetições havia, total dito pela API)."""
    arquivos = sorted(Path(pasta).glob("pagina_*.json"))
    if not arquivos:
        raise ErroDeDownload(f"nenhuma página encontrada em {pasta}/ (rode sem --so-processar para baixar)")
    vistos, videos, repetidos, total = set(), [], 0, None
    for arquivo in arquivos:
        dados = ler_pagina(arquivo.read_text(encoding="utf-8"))
        total = numero(dados.get("total"), total)
        for item in dados["list"]:
            video = converter_video(item, fuso)
            if not video["id"]:
                continue
            if video["id"] in vistos:  # vídeo novo no canal desloca as páginas e repete itens na fronteira
                repetidos += 1
                continue
            vistos.add(video["id"])
            videos.append(video)
    return videos, repetidos, total


def ordenar(videos, mais_recentes_primeiro):
    # mais antigo primeiro (como as "Parte 1, 2, 3…" do arquivo); em empate de horário, pelo id
    return sorted(videos, key=lambda v: (v["_criado"], int(v["id"]) if v["id"].isdigit() else 0), reverse=mais_recentes_primeiro)


def escrever_txt(videos, caminho):
    blocos = [f"{v['titulo']}\n{v['data']}\n\n{v['descricao']}" for v in videos]
    Path(caminho).write_text("\n\n---\n\n".join(blocos) + "\n\n---\n", encoding="utf-8")


def escrever_json(videos, caminho):
    limpos = [{k: v for k, v in video.items() if not k.startswith("_")} for video in videos]
    Path(caminho).write_text(json.dumps(limpos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description="Baixa título, data e descrição dos vídeos de um canal do COS.TV pela API do site.")
    ap.add_argument("--uid", default=UID_PADRAO, help="id do canal (padrão: o canal do arquivo)")
    ap.add_argument("--url", default=URL_PADRAO, help="modelo da URL da API; usa {uid}, {page} e {pagesize}")
    ap.add_argument("--pagesize", type=int, default=20, help="vídeos por página (padrão: 20, como no link original)")
    ap.add_argument("--paginas", type=int, default=0, help="baixa só as N primeiras páginas (para testar)")
    ap.add_argument("--pasta", default=str(PASTA_DE_RESULTADO / "cos_paginas"), help="onde guardar as páginas baixadas")
    ap.add_argument("-o", "--txt", default=str(PASTA_DE_RESULTADO / "cos_videos.txt"), help="arquivo de texto de saída")
    ap.add_argument("--json", default=str(PASTA_DE_RESULTADO / "cos_videos.json"), help="arquivo JSON de saída")
    ap.add_argument("--so-processar", action="store_true", help="não baixa; só gera os arquivos com as páginas já baixadas")
    ap.add_argument("--refazer", action="store_true", help="baixa tudo de novo, ignorando as páginas já guardadas")
    ap.add_argument("--fuso", type=float, default=-3, help="fuso das datas, em horas em relação ao UTC (padrão: -3, Brasília)")
    ap.add_argument("--mais-recentes-primeiro", action="store_true", help="ordem do mais novo para o mais antigo")
    ap.add_argument("--pausa", type=float, default=0.5, help="segundos entre uma página e outra")
    ap.add_argument("--tentativas", type=int, default=5, help="tentativas por página em caso de erro passageiro")
    ap.add_argument("--timeout", type=float, default=30, help="segundos de espera por resposta")
    args = ap.parse_args()

    for saida in (sys.stdout, sys.stderr):  # acentos no console do Windows
        if hasattr(saida, "reconfigure"):
            saida.reconfigure(encoding="utf-8", errors="replace")
    if "{page}" not in args.url:
        sys.exit("A --url precisa conter {page} no lugar do número da página.")

    try:
        total_api = None
        if not args.so_processar:
            print("Baixando páginas da API do COS.TV...")
            baixadas, total_api = baixar_todas(args)
            print(f"{baixadas} páginas novas baixadas (o resto já estava em {args.pasta}/).")
        videos, repetidos, total_pagina = juntar_paginas(args.pasta, timezone(timedelta(hours=args.fuso)))
    except ErroDeDownload as erro:
        sys.exit(f"ERRO: {erro}\nO que já foi baixado ficou em {args.pasta}/; rode de novo para continuar de onde parou.")
    except KeyboardInterrupt:
        sys.exit(f"\nInterrompido. O que já foi baixado ficou em {args.pasta}/; rode de novo para continuar.")

    videos = ordenar(videos, args.mais_recentes_primeiro)
    for saida in (args.txt, args.json):
        Path(saida).parent.mkdir(parents=True, exist_ok=True)
    escrever_txt(videos, args.txt)
    escrever_json(videos, args.json)

    sem_titulo = sum(1 for v in videos if not v["titulo"])
    sem_data = sum(1 for v in videos if not v["data"])
    sem_desc = sum(1 for v in videos if not v["descricao"])
    print(f"\nPronto: {len(videos)} vídeos em {args.txt} e {args.json}")
    print(f"  com descrição: {len(videos) - sem_desc} | sem descrição: {sem_desc} | sem título: {sem_titulo} | sem data: {sem_data}")
    if repetidos:
        print(f"  AVISO: {repetidos} vídeos apareceram em duas páginas (entrou vídeo novo no canal durante o download) e foram contados uma vez.")
    total = total_api or total_pagina
    parcial = bool(args.paginas) and not args.so_processar
    if total and len(videos) != total and not parcial:
        print(f"  AVISO: a API diz que o canal tem {total} vídeos, mas foram salvos {len(videos)}. Use --refazer para baixar tudo de novo.")


if __name__ == "__main__":
    main()
