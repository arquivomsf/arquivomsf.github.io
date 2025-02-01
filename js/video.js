var consoleAtual;
var jogoAtual;
var episodioAtual;
var tema = "";

function carregarDados() {
  procurarParam();
  carregarVideos();
  carregarConsoles();
  startTema();
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('jogo');
  episodioAtual = searchParams.get('id');
}

function carregarVideos() {
  if (consoleAtual == "etc") {
    fetch(`dados.json`)
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.jogos.length; i++){
              let vnome = data.jogos[i].nome;
              let vcurto = data.jogos[i].curto;
              let vlink = data.jogos[i].link;
              let vimagem = data.jogos[i].imagem;
              if(vcurto == jogoAtual){
                document.querySelector(".page-name").innerHTML = `${vnome}`;
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
    fetch(`video/${consoleAtual}/${jogoAtual}/videos.json`)
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.videos.length; i++){
              let vnome = data.videos[i].nome;
              let vlink = data.videos[i].link;
              let vimagem = data.videos[i].imagem;
              if(i == episodioAtual){
                document.querySelector(".page-name").innerHTML = `${vnome}`;
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
  })
}

function startTema() {
  tema = localStorage.getItem("tema");
  if (tema == null) {
      tema = "default";
      document.getElementById("default").checked = true;
      localStorage.setItem("tema", "default");
      return
  }
  if (tema == "default") {
      document.body.classList.remove("oldtheme");
      localStorage.setItem("tema", "default");
      return
  }
  if (tema == "old") {
      document.body.classList.add("oldtheme");
      localStorage.setItem("tema", "old");
  }
}

function setTema(tema_esc) {
  tema = tema_esc.value;
  if (tema == "default") {
      document.body.classList.remove("oldtheme");
      localStorage.setItem("tema", "default");
      return
  }
  if (tema == "old") {
      document.body.classList.add("oldtheme");
      localStorage.setItem("tema", "old");
  }
}