var consoleAtual;
var jogoAtual;

//Quantidade de vídeos das playlists de pasta que NÃO declaram "quantidade" (contada a partir do videos.json da pasta).
//Declarar "quantidade" só é preciso quando ela é MAIOR que o arquivado (ex.: a playlist original tinha 10, só 4 foram arquivados).
var quantidades_calculadas = {};

async function carregarDados() {
  procurarParam();
  carregar_consoles_temas("jogo",jogoAtual);

  await fetch_dados("jogo",`video/${consoleAtual}/${jogoAtual}/series.json`,"","",false);
  await calcular_quantidades_que_faltam(dados_jogo.itens);
  carregar_itens();
}

//baixa, ao mesmo tempo, o videos.json das playlists de pasta que não declaram "quantidade", só para contar os vídeos
async function calcular_quantidades_que_faltam(itens) {
  let pasta = `video/${consoleAtual}/${jogoAtual}`;

  await Promise.all(itens.map(async item => {
    if (item.tipo != "playlist" || item.redirect != "pasta" || Object.hasOwn(item, "quantidade")) return;

    let lista = await carregar_json(`${pasta}/${item.pasta}/videos.json`);
    quantidades_calculadas[item.pasta] = lista.videos.length;
  }));
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('id');
}

function carregar_itens() {
  dados_jogo.itens.forEach((item, i) => {
    let thumbnail = `video/${consoleAtual}/${jogoAtual}/${item.imagem}`;

    if (item.tipo == "playlist") {
      carregar_playlist(item, i, thumbnail);
    }
    else if (item.tipo == "video") {
      carregar_video(item, i, thumbnail);
    }
    else {
      console.warn(`series.json de ${consoleAtual}/${jogoAtual}: item ${i + 1} com "tipo" desconhecido (${item.tipo}), ignorado`);
    }
  });
}

function carregar_playlist(item, i, thumbnail) {
  if (item.redirect == "pasta") {
    let quantidade = item.quantidade ?? quantidades_calculadas[item.pasta];
    create_item("serie","playlist","series_content_list",i,consoleAtual,item.nome,jogoAtual,thumbnail,"",quantidade,item.pasta);
  }
  else {
    create_item(item.link,"playlist","series_content_list",i,"",item.nome,"",thumbnail,"",item.quantidade);
  }
}

function carregar_video(item, i, thumbnail) {
  let duracao = gerar_timestamp(item.duracao.horas,item.duracao.minutos,item.duracao.segundos);

  if (item.redirect == "embed") {
    create_item("jogo_video","video","series_content_list",i,consoleAtual,item.nome,jogoAtual,thumbnail,item.plataforma,duracao,"",item.curto);
  }
  else {
    create_item(item.links[item.plataforma],"video","series_content_list",i,consoleAtual,item.nome,jogoAtual,thumbnail,item.plataforma,duracao);
  }
}
