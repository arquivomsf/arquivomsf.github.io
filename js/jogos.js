var consoleAtual;
var jogoAtual;

//Quantidade de vídeos das séries que NÃO declaram "quantidade" no series.json (calculada a partir do videos.json).
//Declarar "quantidade" só é preciso quando ela é MAIOR que o arquivado (ex.: a playlist original tinha 10, só 4 foram arquivados).
var quantidades_calculadas = {};

async function carregarDados() {
  procurarParam();
  await calcular_quantidades_que_faltam();
  fetch_dados("jogo",`video/${consoleAtual}/${jogoAtual}/series.json`);
  carregar_consoles_temas("jogo",jogoAtual);
}

async function calcular_quantidades_que_faltam() {
  let pasta = `video/${consoleAtual}/${jogoAtual}`;
  let series = await (await fetch(`${pasta}/series.json`)).json();

  for (const [chave, subpasta] of [["episodios", "episodios"], ["vodsarquivo", "vods"]]) {
    if (!Object.hasOwn(series, chave) || Object.hasOwn(series[chave][0], "quantidade")) continue;

    let lista = await (await fetch(`${pasta}/${subpasta}/videos.json`)).json();
    quantidades_calculadas[chave] = lista.videos.length;
  }
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('id');
}

function carregar_itens() {
  if (Object.hasOwn(dados_jogo, "episodios")) {
    let serie_nome = dados_jogo.episodios[0].nome;
    let serie_imagem = dados_jogo.episodios[0].imagem;
    let serie_quantidade = dados_jogo.episodios[0].quantidade ?? quantidades_calculadas.episodios;
    create_item("serie","playlist","series_content_list",0,consoleAtual,serie_nome,jogoAtual,`video/${consoleAtual}/${jogoAtual}/episodios/${serie_imagem}`,"",serie_quantidade,"episodios");
  }

  if (Object.hasOwn(dados_jogo, "vodsoficiais")) {
    let serie_nome = dados_jogo.vodsoficiais[0].nome;
    let serie_imagem = dados_jogo.vodsoficiais[0].imagem;
    let serie_link = dados_jogo.vodsoficiais[0].link;
    let serie_quantidade = dados_jogo.vodsoficiais[0].quantidade;
    create_item(serie_link,"playlist","series_content_list",0,"",serie_nome,"",`video/${consoleAtual}/${jogoAtual}/vodsoficiais.${serie_imagem}`,"",serie_quantidade);
  }

  if (Object.hasOwn(dados_jogo, "vodsarquivo")) {
    let serie_nome = dados_jogo.vodsarquivo[0].nome;
    let serie_imagem = dados_jogo.vodsarquivo[0].imagem;
    let serie_quantidade = dados_jogo.vodsarquivo[0].quantidade ?? quantidades_calculadas.vodsarquivo;
    create_item("serie","playlist","series_content_list",0,consoleAtual,serie_nome,jogoAtual,`video/${consoleAtual}/${jogoAtual}/vods/${serie_imagem}`,"",serie_quantidade,"vods");
  }

  if (Object.hasOwn(dados_jogo, "analise")) {
    for (var i = 0; i<dados_jogo.analise.length; i++){
      let thumbnail_name = "analise";
      if (dados_jogo.analise.length > 1) thumbnail_name = "analise"+(i+1);

      let serie_nome = dados_jogo.analise[i].nome;
      let serie_imagem = dados_jogo.analise[i].imagem;
      let serie_link = dados_jogo.analise[i].link;
      let serie_duracao = gerar_timestamp(dados_jogo.analise[i].duracao.horas,dados_jogo.analise[i].duracao.minutos,dados_jogo.analise[i].duracao.segundos);
      create_item(serie_link,"video","series_content_list",i,consoleAtual,serie_nome,jogoAtual,`video/${consoleAtual}/${jogoAtual}/${thumbnail_name}.${serie_imagem}`,"youtube",serie_duracao);
    }
  }
}
