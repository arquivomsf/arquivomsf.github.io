var consoleAtual;
var jogoAtual;

function carregarDados() {
  procurarParam();
  fetch_dados("jogo",`video/${consoleAtual}/${jogoAtual}/series.json`);
  carregar_consoles_temas("jogo",jogoAtual);
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('id');
}

function carregar_itens() {
  if (dados_jogo.hasOwnProperty("episodios")) {
    let serie_nome = dados_jogo.episodios[0].nome;
    let serie_imagem = dados_jogo.episodios[0].imagem;
    let serie_quantidade = dados_jogo.episodios[0].quantidade;
    create_item("serie","playlist","series_content_list",0,consoleAtual,serie_nome,jogoAtual,`video/${consoleAtual}/${jogoAtual}/episodios/${serie_imagem}`,"",serie_quantidade,"episodios");
  }

  if (dados_jogo.hasOwnProperty("vodsoficiais")) {
    let serie_nome = dados_jogo.vodsoficiais[0].nome;
    let serie_imagem = dados_jogo.vodsoficiais[0].imagem;
    let serie_link = dados_jogo.vodsoficiais[0].link;
    let serie_quantidade = dados_jogo.vodsoficiais[0].quantidade;
    create_item(serie_link,"playlist","series_content_list",0,"",serie_nome,"",`video/${consoleAtual}/${jogoAtual}/vodsoficiais.${serie_imagem}`,"",serie_quantidade);
  }

  if (dados_jogo.hasOwnProperty("vodsarquivo")) {
    let serie_nome = dados_jogo.vodsarquivo[0].nome;
    let serie_imagem = dados_jogo.vodsarquivo[0].imagem;
    let serie_quantidade = dados_jogo.vodsarquivo[0].quantidade;
    create_item("serie","playlist","series_content_list",0,consoleAtual,serie_nome,jogoAtual,`video/${consoleAtual}/${jogoAtual}/vods/${serie_imagem}`,"",serie_quantidade,"vods");
  }

  if (dados_jogo.hasOwnProperty("analise")) {
    let serie_nome = dados_jogo.analise[0].nome;
    let serie_imagem = dados_jogo.analise[0].imagem;
    let serie_link = dados_jogo.analise[0].link;
    let serie_duracao = gerar_timestamp(dados_jogo.analise[0].duracao.horas,dados_jogo.analise[0].duracao.minutos,dados_jogo.analise[0].duracao.segundos);
    create_item(serie_link,"video","series_content_list",0,consoleAtual,serie_nome,jogoAtual,`video/${consoleAtual}/${jogoAtual}/analise.${serie_imagem}`,"youtube",serie_duracao);
  }
}
