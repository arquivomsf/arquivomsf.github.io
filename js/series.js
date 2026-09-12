var consoleAtual;
var jogoAtual;
var serie_path;

function carregarDados() {
  setTab("",'ep_page');
  procurarParam();

  if (consoleAtual != "outros") serie_path = `video/${consoleAtual}/${jogoAtual}/${serieAtual}`;
  else serie_path = `video/${consoleAtual}/${jogoAtual}`;
  fetch_dados("serie",`${serie_path}/videos.json`);

  if (consoleAtual == "outros") carregar_consoles_temas("outro",jogoAtual);
  else carregar_consoles_temas("jogo",jogoAtual);
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('jogo');
  serieAtual = searchParams.get('serie');
}

function carregar_itens() {
  //vídeos normais
  for (var i = 0; i<dados_serie.videos.length; i++){
    let video_nome = dados_serie.videos[i].nome;
    let video_imagem = dados_serie.videos[i].imagem;
    let video_duracao = gerar_timestamp(dados_serie.videos[i].duracao.horas,dados_serie.videos[i].duracao.minutos,dados_serie.videos[i].duracao.segundos);
    document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/${serie_path}/1.${video_imagem}`);
    let video_plataforma = dados_serie.videos[i].plataforma;
    let video_link = dados_serie.videos[i].links[video_plataforma];
    if (consoleAtual == "outros") create_item("ep_outro","video","ep_content_list",i,consoleAtual,video_nome,jogoAtual,`${serie_path}/${i+1}.${video_imagem}`,video_plataforma,video_duracao);
    else create_item("ep_serie","video","ep_content_list",i,consoleAtual,video_nome,jogoAtual,`${serie_path}/${i+1}.${video_imagem}`,video_plataforma,video_duracao,serieAtual);
  }

  //itens extras
  document.querySelector(".tabs-navbar").classList.add("hidden");
  if (dados_serie.hasOwnProperty("playlist")) {
    let playlist_nome = dados_serie.playlist[0].nome;
    let playlist_imagem = dados_serie.playlist[0].imagem;
    let playlist_plataforma = dados_serie.playlist[0].plataforma;
    let playlist_link = dados_serie.playlist[0].links[playlist_plataforma];
    let playlist_quantidade = dados_serie.playlist[0].quantidade;
    create_item(playlist_link,"playlist","extras_content_list",0,"",playlist_nome,"",`${serie_path}/1.${playlist_imagem}`,"",playlist_quantidade);
    document.querySelector(".tabs-navbar").classList.remove("hidden");
  }

  if (dados_serie.hasOwnProperty("extras")) {
    for (var i = 0; i<dados_serie.extras.length; i++){
      let extra_nome = dados_serie.extras[i].nome;
      let extra_imagem = dados_serie.extras[i].imagem;
      let extra_duracao = gerar_timestamp(dados_serie.extras[i].duracao.horas,dados_serie.extras[i].duracao.minutos,dados_serie.extras[i].duracao.segundos);
      let extra_plataforma = dados_serie.extras[i].plataforma;
      let extra_link = dados_serie.extras[i].links[extra_plataforma];
      let extra_id = dados_serie.extras[i].id;
      if (consoleAtual == "outros") create_item("extra_outro","video","extras_content_list",i,consoleAtual,extra_nome,jogoAtual,`${serie_path}/${extra_imagem}`,extra_plataforma,extra_duracao,"",extra_id);
      else create_item("extra_serie","video","extras_content_list",i,consoleAtual,extra_nome,jogoAtual,`${serie_path}/${extra_imagem}`,extra_plataforma,extra_duracao,serieAtual,extra_id);
      document.querySelector(".tabs-navbar").classList.remove("hidden");
    }
  }

  if (dados_serie.hasOwnProperty("analise")) {
    for (var i = 0; i<dados_serie.analise.length; i++){
      let thumbnail_name = "analise";
      if (dados_serie.analise.length > 1) thumbnail_name = "analise"+(i+1);

      let serie_nome = dados_serie.analise[i].nome;
      let serie_imagem = dados_serie.analise[i].imagem;
      let serie_link = dados_serie.analise[i].link;
      let serie_duracao = gerar_timestamp(dados_serie.analise[i].duracao.horas,dados_serie.analise[i].duracao.minutos,dados_serie.analise[i].duracao.segundos);
      create_item(serie_link,"video","extras_content_list",i,consoleAtual,serie_nome,jogoAtual,`video/${consoleAtual}/${jogoAtual}/${thumbnail_name}.${serie_imagem}`,"youtube",serie_duracao);
    }
  }
}
