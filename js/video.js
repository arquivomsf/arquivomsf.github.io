var consoleAtual;
var jogoAtual;
var episodioAtual;

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
              if(vcurto == jogoAtual){
                document.querySelector(".page-name").innerHTML = `${vnome}`;
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
              if(i == episodioAtual){
                document.querySelector(".page-name").innerHTML = `${vnome}`;
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