var consoleAtual;
var jogoAtual;
var episodioAtual;
var extra;

function carregarDados() {
  procurarParam();
  carregarVideos();
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

function carregarVideos() {
  if (consoleAtual == "etc") {
    fetch(`dados.json`)
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.standalone.length; i++){
              let video_nome = data.standalone[i].nome;
              let video_nome_curto = data.standalone[i].curto;
              let video_link = data.standalone[i].link;
              let video_imagem = data.standalone[i].imagem;
              let video_plataforma = data.standalone[i].plataforma;
              if(video_nome_curto == jogoAtual){
                document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"></div>`;
                document.querySelector(".video-name").innerHTML = `<a href="">${video_nome}</a>`;
                document.title = `${video_nome}`;
                document.querySelector('meta[property="og:title"]').setAttribute("content", `${video_nome}`);
                document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${video_imagem}`);
                let video_iframe_link;
                if (video_plataforma == "gdrive") video_iframe_link = video_link.replaceAll("view", "preview");
                if (video_plataforma == "archive") video_iframe_link = video_link.replaceAll("details", "embed");
                document.querySelector("#jsonIframe").src = `${video_iframe_link}`;
              }
          }
      })
    return
  }
  if (extra) {
    fetch(`video/${consoleAtual}/${jogoAtual}/${serieAtual}/videos.json`)
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.extras.length; i++){
              let extra_id = data.extras[i].id;
              if(extra_id == episodioAtual){
                let extra_nome = data.extras[i].nome;
                let extra_link = data.extras[i].link;
                let extra_imagem = data.extras[i].imagem;
                document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"></div>`;
                document.querySelector(".video-name").innerHTML = `<a href="">${extra_nome}</a>`;
                document.title = `${extra_nome}`;
                document.querySelector('meta[property="og:title"]').setAttribute("content", `${extra_nome}`);
                document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/${extra_imagem}`);
                let extra_iframe_link = extra_link.replaceAll("view", "preview");
                document.querySelector("#jsonIframe").src = `${extra_iframe_link}`;
              }
          }
      })
    return
  }
    fetch(`video/${consoleAtual}/${jogoAtual}/${serieAtual}/videos.json`)
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.videos.length; i++){
              let video_nome = data.videos[i].nome;
              let video_link = data.videos[i].link;
              let video_imagem = data.videos[i].imagem;
              if(i == episodioAtual){
                fetch(`dados.json`)
                .then(response => response.json())
                .then(data => {
                  for (var i = 0; i<data.consoles.length; i++){
                    let console_nome = data.consoles[i].nome;
                    let console_sigla = data.consoles[i].sigla;
                    if (console_sigla == consoleAtual) {
                      document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item console-name"><a href="console?id=${console_sigla}">${console_nome}</a></div>`;
                      for (var i = 0; i<data.jogos.length; i++){
                        let jogo_nome = data.jogos[i].nome;
                        let jogo_nome_curto = data.jogos[i].curto;
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
                })
                document.title = `${video_nome}`;
                document.querySelector('meta[property="og:title"]').setAttribute("content", `${video_nome}`);
                document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/${serieAtual}/${i+1}.${video_imagem}`);
                let video_iframe_link;
                if (fonteAtual == "gdrive") video_iframe_link = video_link.replaceAll("view", "preview");
                if (fonteAtual == "archive") video_iframe_link = video_link.replaceAll("details", "embed");
                document.querySelector("#jsonIframe").src = `${video_iframe_link}`;
              }
          }
      })
}
