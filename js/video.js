var consoleAtual;
var jogoAtual;
var episodioAtual;
var extra;

function carregarDados() {
  procurarParam();
  carregar_embed_fetch();
  carregar_consoles_temas("normal","");
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('jogo');
  serieAtual = searchParams.get('serie');
  fonteAtual = searchParams.get('fonte');
  episodioAtual = searchParams.get('id');
  extra = searchParams.get('extra');
}

function carregar_embed_fetch() {
  //vídeo standalone
  if (consoleAtual == "etc") {
    fetch_dados("geral","dados.json");
    return;
  }
  //vídeo extra
  if (extra) {
    fetch_dados("serie",`video/${consoleAtual}/${jogoAtual}/${serieAtual}/videos.json`);
    return;
  }
  //vídeo episódio
  fetch_dados("serie_embed",`video/${consoleAtual}/${jogoAtual}/${serieAtual}/videos.json`);
}

function carregar_itens() {
  //vídeo standalone
  if (consoleAtual == "etc") {
    for (var i = 0; i<dados_geral.standalone.length; i++){
      let video_nome = dados_geral.standalone[i].nome;
      let video_nome_curto = dados_geral.standalone[i].curto;
      let video_link = dados_geral.standalone[i].link;
      let video_imagem = dados_geral.standalone[i].imagem;
      let video_plataforma = dados_geral.standalone[i].plataforma;
      if(video_nome_curto == jogoAtual){
        document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"></div>`;
        document.querySelector(".video-name").innerHTML = `<a href="">${video_nome}</a>`;
        document.title = `${video_nome}`;
        document.querySelector('meta[property="og:title"]').setAttribute("content", `${video_nome}`);
        document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${video_imagem}`);
        let video_iframe_link;
        if (video_plataforma == "gdrive") video_iframe_link = video_link.replaceAll("view", "preview");
        if (video_plataforma == "archive") {
          video_iframe_link = `${video_link}&poster=https://arquivomsf.github.io/video/${consoleAtual}/${video_imagem}`;
          //console.log(video_iframe_link);
          video_iframe_link = video_iframe_link.replaceAll("details", "embed");
        }
        document.querySelector("#jsonIframe").src = `${video_iframe_link}`;
      }
    }
    return;
  }

  //vídeo extra
  if (extra) {
    for (var i = 0; i<dados_serie.extras.length; i++){
      let extra_id = dados_serie.extras[i].id;
      if(extra_id == episodioAtual){
        let extra_nome = dados_serie.extras[i].nome;
        let extra_link = dados_serie.extras[i].link;
        let extra_imagem = dados_serie.extras[i].imagem;
        let extra_plataforma = dados_serie.extras[i].plataforma;
        document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"></div>`;
        document.querySelector(".video-name").innerHTML = `<a href="">${extra_nome}</a>`;
        document.title = `${extra_nome}`;
        document.querySelector('meta[property="og:title"]').setAttribute("content", `${extra_nome}`);
        document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/${extra_imagem}`);
        let extra_iframe_link;
        if (extra_plataforma == "gdrive") extra_iframe_link = extra_link.replaceAll("view", "preview");
        if (extra_plataforma == "archive") {
          extra_iframe_link = `${extra_link}&poster=https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/${serieAtual}/${extra_imagem}`;
          //console.log(extra_iframe_link);
          extra_iframe_link = extra_iframe_link.replaceAll("details", "embed");
        }
        document.querySelector("#jsonIframe").src = `${extra_iframe_link}`;
      }
    }
    return;
  }

  //vídeo episódio
  for (var i = 0; i<dados_serie.videos.length; i++){
    let video_nome = dados_serie.videos[i].nome;
    let video_link = dados_serie.videos[i].link;
    let video_imagem = dados_serie.videos[i].imagem;
    if(i == episodioAtual){
      for (var i = 0; i<dados_geral.consoles.length; i++){
        let console_nome = dados_geral.consoles[i].nome;
        let console_sigla = dados_geral.consoles[i].sigla;
        if (console_sigla == consoleAtual) {
          document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item console-name"><a href="console?id=${console_sigla}">${console_nome}</a></div>`;
          for (var i = 0; i<dados_geral.jogos.length; i++){
            let jogo_nome = dados_geral.jogos[i].nome;
            let jogo_nome_curto = dados_geral.jogos[i].curto;
            if (jogo_nome_curto == jogoAtual) {
              document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item game-name"><a href="jogo?id=${jogo_nome_curto}&con=${console_sigla}">${jogo_nome}</a></div>`;
              if (serieAtual == "episodios") {
                document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"><a href="">Parte ${Number(episodioAtual)+1}</a></div>`;
              } else if (serieAtual == "vods") {
                document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"><a href="">VOD ${Number(episodioAtual)+1}</a></div>`;
              }
            }
          }
        }
      }
      document.title = `${video_nome}`;
      document.querySelector('meta[property="og:title"]').setAttribute("content", `${video_nome}`);
      document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/${serieAtual}/${Number(episodioAtual)+1}.${video_imagem}`);
      let video_iframe_link;
      if (fonteAtual == "gdrive") video_iframe_link = video_link.replaceAll("view", "preview");
      if (fonteAtual == "archive") {
          video_iframe_link = `${video_link}&poster=https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/${serieAtual}/${Number(episodioAtual)+1}.${video_imagem}`;
          //console.log(video_iframe_link);
          video_iframe_link = video_iframe_link.replaceAll("details", "embed");
        }
      document.querySelector("#jsonIframe").src = `${video_iframe_link}`;
    }
  }
}
