var consoleAtual;
var jogoAtual;
var episodioAtual;
var extra;

function carregarDados() {
  procurarParam();
  carregarVideos();
  carregarConsoles();
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('jogo');
  episodioAtual = searchParams.get('id');
  extra = searchParams.get('extra');
}

function carregarVideos() {
  if (consoleAtual == "etc") {
    fetch(`dados.json`)
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.standalone.length; i++){
              let vnome = data.standalone[i].nome;
              let vcurto = data.standalone[i].curto;
              let vlink = data.standalone[i].link;
              let vimagem = data.standalone[i].imagem;
              if(vcurto == jogoAtual){
                document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"></div>`;
                document.querySelector(".video-name").innerHTML = `<a href="">${vnome}</a>`;
                document.title = `${vnome}`;
                document.querySelector('meta[property="og:title"]').setAttribute("content", `${vnome}`);
                document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${vimagem}`);
                let vpreview = vlink.replaceAll("view", "preview");
                document.querySelector("#jsonIframe").src = `${vpreview}`;
              }
          }
      })
    return
  }
  if (extra) {
    fetch(`video/${consoleAtual}/${jogoAtual}/videos.json`)
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.extras.length; i++){
              let eid = data.extras[i].id;
              if(eid == episodioAtual){
                let enome = data.extras[i].nome;
                let elink = data.extras[i].link;
                let eimagem = data.extras[i].imagem;
                document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"></div>`;
                document.querySelector(".video-name").innerHTML = `<a href="">${enome}</a>`;
                document.title = `${enome}`;
                document.querySelector('meta[property="og:title"]').setAttribute("content", `${enome}`);
                document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/${eimagem}`);
                let epreview = elink.replaceAll("view", "preview");
                document.querySelector("#jsonIframe").src = `${epreview}`;
              }
          }
      })
    return
  }
    fetch(`video/${consoleAtual}/${jogoAtual}/videos.json`)
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.videos.length; i++){
              let vnome = data.videos[i].nome;
              let vlink = data.videos[i].link;
              let vimagem = data.videos[i].imagem;
              if(i == episodioAtual){
                fetch(`dados.json`)
                .then(response => response.json())
                .then(data => {
                  for (var i = 0; i<data.consoles.length; i++){
                    let cnome = data.consoles[i].nome;
                    let csigla = data.consoles[i].sigla;
                    if (csigla == consoleAtual) {
                      document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item console-name"><a href="console?id=${csigla}">${cnome}</a></div>`;
                      for (var i = 0; i<data.jogos.length; i++){
                        let jnome = data.jogos[i].nome;
                        let jcurto = data.jogos[i].curto;
                        if (jcurto == jogoAtual) {
                          document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item game-name"><a href="jogo?id=${jcurto}&con=${csigla}">${jnome}</a></div>`;
                          document.querySelector(".title-breadcrumb").innerHTML += `<div class="title-breadcrumb-item video-name active"><a href="">Parte ${Number(episodioAtual)+1}</a></div>`;
                        }
                      }
                    }
                  }
                })
                document.title = `${vnome}`;
                document.querySelector('meta[property="og:title"]').setAttribute("content", `${vnome}`);
                document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/${i+1}.${vimagem}`);
                let vpreview = vlink.replaceAll("view", "preview");
                document.querySelector("#jsonIframe").src = `${vpreview}`;
              }
          }
      })
}

function carregarConsoles() {
  fetch("dados.json")
  .then(response => response.json())
  .then(data => {
      for (var i = 0; i<data.consoles.length; i++){
          let cnome = data.consoles[i].nome;
          let csigla = data.consoles[i].sigla;
          document.querySelector("#conJsonParent").innerHTML += `
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="console?id=${csigla}">${cnome}</a>
            </li>`;
      }
      for (var i = 0; i<data.temas.length; i++){
        let tnome = data.temas[i].nome;
        let tvalor = data.temas[i].valor;
        document.querySelector("#themes_select").innerHTML += `
          <option value="${tvalor}">${tnome}</option>`;
      }
      startTema();
  })
}