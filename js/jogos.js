var consoleAtual;
var jogoAtual;
var tema = "";

function carregarDados() {
  procurarParam();
  carregarVideos();
  carregarConsoles();
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('id');
}

function carregarVideos() {
    fetch(`video/${consoleAtual}/${jogoAtual}/videos.json`)
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i<data.videos.length; i++){
              let vnome = data.videos[i].nome;
              let vimagem = data.videos[i].imagem;
              let vduracao = data.videos[i].duracao;
              if (i == 0) {
                if (data.hasOwnProperty("playlist")) {
                let pnome = data.playlist[i].nome;
                let pimagem = data.playlist[i].imagem;
                let plink = data.playlist[i].link;
                let pquantidade = data.playlist[i].quantidade;
                document.querySelector("#jsonParent").innerHTML += `
                    <div class="col">
                      <a href="${plink}" target="_blank" class="blacklink">
                        <div class="thumbnail">
                          <img src="video/${consoleAtual}/${jogoAtual}/1.${pimagem}" alt="" class="img-fluid linkicon">
                          <div class="playlist-length">
                            <div class="playlist-info-wrapper">
                              <i class="fa fa-list"></i>
                              <span>${pquantidade}</span>
                            </div>
                          </div>
                        </div>
                        <span class="flow-text title">${pnome}</span>
                      </a>
                    </div>`;
                }
                document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/video/${consoleAtual}/${jogoAtual}/1.${vimagem}`);
              }
                let vplat = data.videos[i].plataforma;
                let vlinkyt = data.videos[i].linkyt;
                if (vplat == "gdrive") {
                  document.querySelector("#jsonParent").innerHTML += `
                    <div class="col">
                      <a href="embed?con=${consoleAtual}&jogo=${jogoAtual}&id=${i}" class="blacklink">
                        <div class="thumbnail">
                          <img src="video/${consoleAtual}/${jogoAtual}/${i+1}.${vimagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length">${vduracao}</span>
                        </div>
                        <span class="flow-text title">${vnome}</span>
                      </a>
                    </div>`;
                } else if (vplat == "youtube") {
                  document.querySelector("#jsonParent").innerHTML += `
                    <div class="col">
                      <a href="${vlinkyt}" target="_blank" class="blacklink">
                        <div class="thumbnail">
                          <img src="video/${consoleAtual}/${jogoAtual}/${i+1}.${vimagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length">${vduracao}</span>
                        </div>
                        <span class="flow-text title">${vnome}</span>
                      </a>
                    </div>`;
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
  fetch("dados.json")
  .then(response => response.json())
  .then(data => {
      for (var i = 0; i<data.jogos.length; i++){
          let jnome = data.jogos[i].nome;
          let jconsole = data.jogos[i].console;
          let jconsigla = data.jogos[i].consigla;
          let jcurto = data.jogos[i].curto;
          if(jcurto == jogoAtual){
            //document.querySelector(".page-name").innerHTML = `${jnome}`;
            document.querySelector(".game-name").innerHTML = `<a href="">${jnome}</a>`;
            document.querySelector(".console-name").innerHTML = `<a href="console?id=${jconsigla}">${jconsole}</a>`;
            document.title = `Arquivo - ${jnome}`;
            document.querySelector('meta[property="og:title"]').setAttribute("content", `Arquivo - ${jnome}`);
          }
      }
  })
}

function startTema() {
  tema = localStorage.getItem("tema");
  if (tema == null) {
      tema = "default";
      document.getElementById("themes_select").value = tema;
      document.body.setAttribute("data-tema", tema);
      localStorage.setItem("tema", tema);
      return
  }
  document.getElementById("themes_select").value = tema;
  document.body.setAttribute("data-tema", tema);
  localStorage.setItem("tema", tema);
}

function setTema(tema_esc) {
  tema = tema_esc.value;
  document.body.setAttribute("data-tema", tema);
  localStorage.setItem("tema", tema);
}