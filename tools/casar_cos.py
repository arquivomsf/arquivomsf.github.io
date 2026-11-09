#!/usr/bin/env python3
"""
Cruza os vídeos baixados do COS.TV com os vídeos do site e acrescenta o campo opcional "desc" onde der match.

    python3 tools/casar_cos.py --simular     # só mostra o que faria e gera os logs (não altera nenhum JSON do site)
    python3 tools/casar_cos.py               # altera os JSONs do site

Entrada: tools/cos_resultado/cos_videos_limpo.json (gerado por tools/limpar_cos.py; use -i para outro arquivo).

Match = MESMO título (nome ou nome_original do site) E MESMA data. Só nesse caso o "desc" é escrito.
  - "desc" que já existe no site nunca é sobrescrito (a não ser com --sobrescrever).
  - se houver 2+ vídeos do COS com o mesmo título e data mas descrições diferentes, não escreve nada e avisa.

Logs (para conferir manualmente), salvos em tools/cos_casar_logs/ (use --pasta-logs para outra):
  cos_log_titulo_igual_data_diferente.txt  o título existe no COS, mas com outra data
  cos_log_titulo_parecido.txt              sem título igual no COS; mostra os mais parecidos
  cos_log_ambiguos.txt                     só aparece se houver ambiguidade
Onde o site olha: video/**/videos.json (campos "videos" e "extras") e dados.json (vídeos independentes).
"""
import argparse
import difflib
import json
import re
import sys
import unicodedata
from datetime import datetime
from pathlib import Path

RAIZ_DO_SITE = Path(__file__).resolve().parent.parent
ENTRADA_PADRAO = RAIZ_DO_SITE / "tools" / "cos_resultado" / "cos_videos_limpo.json"
PASTA_DE_LOGS_PADRAO = RAIZ_DO_SITE / "tools" / "cos_casar_logs"


# ---------------------------------------------------------------------------------------------
# Textos
# ---------------------------------------------------------------------------------------------
def chave_exata(titulo):
    """Título igual = mesmo texto, ignorando só espaços nas pontas e repetidos."""
    return " ".join(str(titulo or "").split())


def chave_flexivel(titulo):
    """Sem acentos, minúsculas e sem pontuação: para a comparação 'parecido'."""
    sem_acento = "".join(c for c in unicodedata.normalize("NFD", str(titulo or "")) if unicodedata.category(c) != "Mn")
    return " ".join(re.sub(r"[^a-z0-9]+", " ", sem_acento.lower()).split())


def numeros_de(chave):
    return re.findall(r"\d+", chave)


def data_valida(texto):
    try:
        return datetime.strptime(str(texto or "").strip(), "%d/%m/%Y")
    except ValueError:
        return None


def diferenca_de_dias(a, b):
    da, db = data_valida(a), data_valida(b)
    if not da or not db:
        return None
    return (db - da).days


def descrever_diferenca(site, cos):
    dias = diferenca_de_dias(site, cos)
    if dias is None:
        return "data do site ausente ou inválida"
    if dias == 0:
        return "mesma data"
    return f"COS {abs(dias)} dia(s) {'depois' if dias > 0 else 'antes'} do site"


# ---------------------------------------------------------------------------------------------
# Leitura dos dois lados
# ---------------------------------------------------------------------------------------------
def ler_json(caminho):
    return json.loads(Path(caminho).read_text(encoding="utf-8"))


def itens_do_site(raiz):
    """Lista cada vídeo do site (com a referência ao objeto, para poder alterar) e os arquivos carregados."""
    arquivos, itens = {}, []

    def coletar(caminho, lista_nome, lista, rotulo):
        for i, v in enumerate(lista or []):
            if isinstance(v, dict) and v.get("nome"):
                itens.append({"obj": v, "arquivo": caminho, "onde": f"{rotulo} #{i + 1}", "nome": v["nome"], "original": v.get("nome_original") or "", "data": str(v.get("data") or "").strip()})

    for caminho in sorted(raiz.glob("video/**/videos.json")):
        dados = ler_json(caminho)
        arquivos[caminho] = dados
        for campo in ("videos", "extras"):
            coletar(caminho, campo, dados.get(campo), campo)
    dados_gerais = raiz / "dados.json"
    if dados_gerais.exists():
        dados = ler_json(dados_gerais)
        arquivos[dados_gerais] = dados
        coletar(dados_gerais, "standalone", dados.get("standalone"), "standalone")
    return itens, arquivos


def nome_do_arquivo(caminho, raiz):
    return caminho.relative_to(raiz).as_posix()


# ---------------------------------------------------------------------------------------------
# Matching
# ---------------------------------------------------------------------------------------------
def titulos_do_item(item):
    return [t for t in (item["nome"], item["original"]) if t]


def mais_parecidos(item, cos_norm, minimo, quantos=3):
    """Os vídeos do COS cujo título mais se parece com o do item. cos_norm = [(chave_flexivel, video)]."""
    melhores = {}
    for titulo in titulos_do_item(item):
        alvo = chave_flexivel(titulo)
        if not alvo:
            continue
        numeros = numeros_de(alvo)
        sm = difflib.SequenceMatcher(None, "", alvo, autojunk=False)
        for chave, video in cos_norm:
            if not chave or numeros_de(chave) != numeros:
                continue  # "Parte 4" não é parecido com "Parte 12": os números precisam ser os mesmos
            nota = 0.0
            if len(alvo) >= 8 and len(chave) >= 8 and (alvo in chave or chave in alvo):
                nota = 0.9  # um contido no outro ("Jogo - Parte 1" x "Jogo - Parte 1 (live)")
            sm.set_seq1(chave)
            if sm.real_quick_ratio() >= minimo and sm.quick_ratio() >= minimo:
                nota = max(nota, sm.ratio())
            if nota >= minimo and nota > melhores.get(video["id"], (0, None))[0]:
                melhores[video["id"]] = (nota, video)
    return sorted(melhores.values(), key=lambda p: (-p[0], p[1]["id"]))[:quantos]


def cruzar(itens, cos, flexivel, minimo):
    por_exato = {}
    por_flex = {}
    for v in cos:
        por_exato.setdefault(chave_exata(v["titulo"]), []).append(v)
        por_flex.setdefault(chave_flexivel(v["titulo"]), []).append(v)
    cos_norm = [(chave_flexivel(v["titulo"]), v) for v in cos]

    casados, data_diferente, parecidos, ambiguos, sem_nada = [], [], [], [], []
    cache_parecidos = {}
    for item in itens:
        mesmos = []
        for titulo in titulos_do_item(item):
            mesmos += por_exato.get(chave_exata(titulo), [])
            if flexivel:
                mesmos += por_flex.get(chave_flexivel(titulo), [])
        mesmos = list({v["id"]: v for v in mesmos}.values())

        if mesmos:
            mesma_data = [v for v in mesmos if item["data"] and v["data"] == item["data"]]
            if not mesma_data:
                data_diferente.append((item, mesmos))
                continue
            com_texto = [v for v in mesma_data if v.get("desc_site")]
            textos = {v["desc_site"] for v in com_texto}
            if len(textos) > 1:
                ambiguos.append((item, mesma_data))
            elif textos:
                casados.append((item, com_texto[0]))
            else:
                casados.append((item, mesma_data[0]))  # casou, mas o COS não tem descrição
            continue

        chave = tuple(titulos_do_item(item))
        if chave not in cache_parecidos:
            cache_parecidos[chave] = mais_parecidos(item, cos_norm, minimo)
        if cache_parecidos[chave]:
            parecidos.append((item, cache_parecidos[chave]))
        else:
            sem_nada.append(item)
    return casados, data_diferente, parecidos, ambiguos, sem_nada


# ---------------------------------------------------------------------------------------------
# Escrita
# ---------------------------------------------------------------------------------------------
def inserir_desc(obj, texto):
    """Põe "desc" logo depois do nome (ou do nome_original), como já está nos itens que têm descrição."""
    novo, colocado = {}, False
    apos = "nome_original" if "nome_original" in obj else "nome"
    for chave, valor in obj.items():
        if chave == "desc":
            continue
        novo[chave] = valor
        if chave == apos:
            novo["desc"] = texto
            colocado = True
    if not colocado:
        novo["desc"] = texto
    obj.clear()
    obj.update(novo)


def salvar_json(caminho, dados):
    Path(caminho).write_text(json.dumps(dados, ensure_ascii=False, indent=2), encoding="utf-8")


def linha_cos(v):
    return f"{v['titulo']} ({v['data']})  {v['link']}"


def escrever_log_data_diferente(caminho, lista, raiz):
    blocos = []
    for item, candidatos in sorted(lista, key=lambda p: (p[0]["arquivo"], p[0]["onde"])):
        linhas = [f"SITE: {item['nome']} ({item['data'] or 'sem data'})", f"      {nome_do_arquivo(item['arquivo'], raiz)}  [{item['onde']}]"]
        for v in sorted(candidatos, key=lambda c: c["data_iso"]):
            linhas.append(f"COS:  {linha_cos(v)}")
            linhas.append(f"      {descrever_diferenca(item['data'], v['data'])}")
        blocos.append("\n".join(linhas))
    cabecalho = f"Título IGUAL, data diferente: {len(lista)} vídeos do site\n(nada foi escrito nesses; confira e, se for o mesmo vídeo, acerte a data ou adicione a descrição à mão)\n"
    Path(caminho).write_text(cabecalho + "\n" + "\n\n".join(blocos) + ("\n" if blocos else ""), encoding="utf-8")


def escrever_log_parecidos(caminho, lista, raiz):
    blocos = []
    for item, candidatos in sorted(lista, key=lambda p: (p[0]["arquivo"], p[0]["onde"])):
        linhas = [f"SITE: {item['nome']} ({item['data'] or 'sem data'})", f"      {nome_do_arquivo(item['arquivo'], raiz)}  [{item['onde']}]"]
        for nota, v in candidatos:
            linhas.append(f"COS:  {linha_cos(v)}  [{nota:.0%}]")
            linhas.append(f"      {descrever_diferenca(item['data'], v['data'])}")
        blocos.append("\n".join(linhas))
    cabecalho = f"Título PARECIDO, sem nenhum título igual: {len(lista)} vídeos do site\n(nada foi escrito nesses; os mais parecidos do COS, do mais ao menos parecido, com a % de semelhança;\n só entram títulos com os mesmos números: \"Parte 4\" não é sugerido para \"Parte 12\")\n"
    Path(caminho).write_text(cabecalho + "\n" + "\n\n".join(blocos) + ("\n" if blocos else ""), encoding="utf-8")


def escrever_log_ambiguos(caminho, lista, raiz):
    blocos = []
    for item, candidatos in lista:
        linhas = [f"SITE: {item['nome']} ({item['data']})", f"      {nome_do_arquivo(item['arquivo'], raiz)}  [{item['onde']}]"]
        linhas += [f"COS:  {linha_cos(v)}" for v in candidatos]
        blocos.append("\n".join(linhas))
    cabecalho = f"AMBÍGUOS: {len(lista)} vídeos do site têm 2+ vídeos do COS com o mesmo título e data, mas descrições diferentes\n(nada foi escrito nesses)\n"
    Path(caminho).write_text(cabecalho + "\n" + "\n\n".join(blocos) + "\n", encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description="Acrescenta o campo 'desc' nos JSONs do site quando título e data batem com um vídeo do COS.TV.")
    ap.add_argument("-i", "--entrada", default=str(ENTRADA_PADRAO), help="JSON gerado por limpar_cos.py (ou baixar_cos.py)")
    ap.add_argument("--site", default=str(RAIZ_DO_SITE), help="pasta do site (padrão: a deste repositório)")
    ap.add_argument("--simular", action="store_true", help="não altera nenhum JSON; só mostra o resultado e gera os logs")
    ap.add_argument("--sobrescrever", action="store_true", help="troca o 'desc' que já existe no site")
    ap.add_argument("--titulo-flexivel", action="store_true", help="considera igual o título que só difere em maiúsculas, acentos ou pontuação (padrão: título idêntico)")
    ap.add_argument("--similaridade", type=float, default=0.8, help="mínimo (0 a 1) para o log de títulos parecidos (padrão: 0.8)")
    ap.add_argument("--pasta-logs", default=str(PASTA_DE_LOGS_PADRAO), help="pasta onde salvar os logs")
    ap.add_argument("--log-data", default="cos_log_titulo_igual_data_diferente.txt")
    ap.add_argument("--log-parecidos", default="cos_log_titulo_parecido.txt")
    ap.add_argument("--log-ambiguos", default="cos_log_ambiguos.txt")
    args = ap.parse_args()
    for saida in (sys.stdout, sys.stderr):
        if hasattr(saida, "reconfigure"):
            saida.reconfigure(encoding="utf-8", errors="replace")

    raiz = Path(args.site).resolve()
    if not Path(args.entrada).exists():
        sys.exit(f"ERRO: não achei {args.entrada}. Rode antes tools/baixar_cos.py e tools/limpar_cos.py (ou use -i).")
    if not (raiz / "dados.json").exists():
        sys.exit(f"ERRO: {raiz} não parece ser a pasta do site (sem dados.json). Use --site.")

    pasta_logs = Path(args.pasta_logs)
    pasta_logs.mkdir(parents=True, exist_ok=True)
    log_data, log_parecidos, log_ambiguos = (pasta_logs / args.log_data, pasta_logs / args.log_parecidos, pasta_logs / args.log_ambiguos)

    cos = ler_json(args.entrada)
    itens, arquivos = itens_do_site(raiz)
    print(f"{len(cos)} vídeos do COS x {len(itens)} vídeos do site... (procurando os parecidos pode levar um minuto)")
    casados, data_diferente, parecidos, ambiguos, sem_nada = cruzar(itens, cos, args.titulo_flexivel, args.similaridade)

    escritos = ja_tinham = cos_sem_desc = 0
    alterados = set()
    for item, video in casados:
        texto = video.get("desc_site", "")
        if not texto:
            cos_sem_desc += 1
            continue
        if item["obj"].get("desc") and not args.sobrescrever:
            ja_tinham += 1
            continue
        if item["obj"].get("desc") == texto:
            continue
        inserir_desc(item["obj"], texto)
        alterados.add(item["arquivo"])
        escritos += 1

    if not args.simular:
        for caminho in alterados:
            salvar_json(caminho, arquivos[caminho])

    escrever_log_data_diferente(log_data, data_diferente, raiz)
    escrever_log_parecidos(log_parecidos, parecidos, raiz)
    if ambiguos:
        escrever_log_ambiguos(log_ambiguos, ambiguos, raiz)

    print(f"\nMatches (título e data iguais): {len(casados)}")
    print(f"  'desc' {'que seria escrito' if args.simular else 'escrito'}: {escritos} (em {len(alterados)} arquivos)")
    print(f"  já tinham 'desc' no site, mantidos: {ja_tinham}")
    print(f"  o COS não tem descrição para: {cos_sem_desc}")
    print(f"Título igual, data diferente: {len(data_diferente)}  -> {log_data}")
    print(f"Título parecido (sem igual):  {len(parecidos)}  -> {log_parecidos}")
    if ambiguos:
        print(f"AMBÍGUOS (nada escrito):      {len(ambiguos)}  -> {log_ambiguos}")
    print(f"Sem nada parecido no COS:     {len(sem_nada)}")
    if args.simular:
        print("\n(--simular: nenhum JSON do site foi alterado)")
    elif alterados:
        print("\nConfira as diferenças e rode `python3 tools/validar.py`.")


if __name__ == "__main__":
    main()
