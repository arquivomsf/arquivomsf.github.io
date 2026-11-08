#!/usr/bin/env python3
"""
Cria cópias limpas do resultado do baixar_cos.py, sem mexer nos originais.

    python3 tools/limpar_cos.py                      # tools/cos_resultado/cos_videos.json -> cos_videos_limpo.txt / .json, na mesma pasta
    python3 tools/limpar_cos.py -i outro.json        # outro arquivo de entrada

Em cada descrição ele:
  - apaga as linhas do "rodapé" padrão do canal (membro, Dlive, Facebook, Twitter, Instagram, Discord, Linktree e Kwai);
  - depois apaga as linhas vazias que sobrarem no final.
O texto da descrição em si (o que vem antes do rodapé) não é alterado.

Se o canal mudar o rodapé, edite a lista RODAPE abaixo. Ao final o script mostra as linhas que mais se repetem
e NÃO foram apagadas: se alguma for parte do rodapé, é só acrescentar um padrão aqui.
"""
import argparse
import html
import json
import re
import sys
import unicodedata
from collections import Counter
from pathlib import Path

PASTA_DE_RESULTADO = Path(__file__).resolve().parent / "cos_resultado"  # tools/cos_resultado

# Padrões (expressões regulares) das linhas a apagar. São comparados com a linha sem acentos, em minúsculas e sem o
# emoji do começo, então "✅ Me Siga no Twitter: https://..." é pego por "^me siga no twitter".
# Os links do Kwai variam (8 caracteres aleatórios), por isso o padrão aceita qualquer coisa depois de /s/.
RODAPE = [
    r"^seja membro do canal",
    r"^siga meu canal de lives na dlive",
    r"^curta a pagina do canal no facebook",
    r"^me siga no twitter",
    r"^me siga no instagram",
    r"^discord do canal",
    r"^redes soc\w*,.*e muito mais:?$",  # Socias / Sociais, com ou sem "Discord"
    r"^social networks\w*,.*and much more:?$",
    r"^https?://linktr\.ee/marcelosouzaf/?$",
    r"^instale o kwai por esse link",  # com ou sem o link na mesma linha
    r"^baixe o kwai por esse link",  # com ou sem o link na mesma linha
    r"^use esse link para impulsionar e ganhar kwai gold",
    r"^se voce ja tem kwai instalado",
    r"^https?://s\.kwai\.app/s/\S+$",
]
RODAPE_RE = [re.compile(p) for p in RODAPE]


def normalizar(linha):
    """Minúsculas, sem acentos, sem espaços nas pontas e sem emojis/símbolos no começo."""
    sem_acento = "".join(c for c in unicodedata.normalize("NFD", linha) if unicodedata.category(c) != "Mn")
    texto = sem_acento.strip().lower()
    i = 0
    while i < len(texto) and not texto[i].isalnum() and texto[i] not in "(":
        i += 1
    return texto[i:].strip()


def eh_rodape(linha):
    n = normalizar(linha)
    return bool(n) and any(r.search(n) for r in RODAPE_RE)


def limpar_descricao(texto):
    """Devolve (texto limpo, quantas linhas de rodapé foram apagadas)."""
    linhas = texto.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    mantidas = [l for l in linhas if not eh_rodape(l)]
    apagadas = len(linhas) - len(mantidas)
    while mantidas and not mantidas[-1].strip():
        mantidas.pop()
    return "\n".join(l.rstrip() for l in mantidas).strip("\n"), apagadas


def main():
    ap = argparse.ArgumentParser(description="Cria cópias limpas (sem o rodapé padrão) do resultado do baixar_cos.py.")
    ap.add_argument("-i", "--entrada", default=str(PASTA_DE_RESULTADO / "cos_videos.json"), help="JSON gerado pelo baixar_cos.py")
    ap.add_argument("--txt", default=str(PASTA_DE_RESULTADO / "cos_videos_limpo.txt"), help="txt de saída")
    ap.add_argument("--json", default=str(PASTA_DE_RESULTADO / "cos_videos_limpo.json"), help="JSON de saída")
    args = ap.parse_args()
    for saida in (sys.stdout, sys.stderr):
        if hasattr(saida, "reconfigure"):
            saida.reconfigure(encoding="utf-8", errors="replace")

    entrada = Path(args.entrada)
    if not entrada.exists():
        sys.exit(f"ERRO: não achei {entrada}. Rode antes o tools/baixar_cos.py (ou use -i para indicar o arquivo).")
    videos = json.loads(entrada.read_text(encoding="utf-8"))

    com_rodape = vazias_depois = 0
    restantes = Counter()
    for v in videos:
        antes = v.get("descricao", "")
        limpa, apagadas = limpar_descricao(antes)
        com_rodape += apagadas > 0
        vazias_depois += bool(antes.strip()) and not limpa
        v["descricao"] = limpa
        v["desc_site"] = html.escape(limpa, quote=False).replace("\n", "<br>") if limpa else ""
        restantes.update({l.strip() for l in limpa.split("\n") if l.strip()})  # cada linha conta 1x por vídeo

    for saida in (args.txt, args.json):
        Path(saida).parent.mkdir(parents=True, exist_ok=True)
    blocos = [f"{v['titulo']}\n{v['data']}\n\n{v['descricao']}" for v in videos]
    Path(args.txt).write_text("\n\n---\n\n".join(blocos) + "\n\n---\n", encoding="utf-8")
    Path(args.json).write_text(json.dumps(videos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    com_desc = sum(1 for v in videos if v["descricao"])
    print(f"{len(videos)} vídeos lidos de {entrada}")
    print(f"  rodapé apagado em {com_rodape} descrições; {vazias_depois} ficaram vazias (só tinham rodapé)")
    print(f"  agora com descrição: {com_desc} | sem descrição: {len(videos) - com_desc}")
    print(f"Salvo em {args.txt} e {args.json}")
    repetidas = [(l, n) for l, n in restantes.most_common(10) if n >= 5]
    if repetidas:
        print("\nLinhas que se repetem em 5+ vídeos e foram MANTIDAS (confira se alguma é rodapé):")
        for linha, n in repetidas:
            print(f"  {n:>4}x  {linha[:100]}")


if __name__ == "__main__":
    main()
