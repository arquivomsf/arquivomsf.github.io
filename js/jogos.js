var consoleAtual;
var jogoAtual;

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
              /*document.querySelector("#jsonParent").innerHTML += `
                <div class="col">
                  <a href="${vlink}" class="blacklink">
                    <img src="video/${consoleAtual}/${jogoAtual}/${i+1}.${vimagem}" alt="" class="img-fluid linkicon"><br>
                    <span class="flow-text title">${vnome}</span>
                  </a>
                </div>`;*/
                /*document.querySelector("#jsonParent").innerHTML += `
                <div class="col">
                  <a href="embed?con=${consoleAtual}&jogo=${jogoAtual}&id=${i}" class="blacklink">
                    <img src="video/${consoleAtual}/${jogoAtual}/${i+1}.${vimagem}" alt="" class="img-fluid linkicon"><br>
                    <span class="flow-text title">${vnome}</span>
                  </a>
                </div>`;*/
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
                /*
                teste yt

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
                */
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
  fetch("dados.json")
  .then(response => response.json())
  .then(data => {
      for (var i = 0; i<data.jogos.length; i++){
          let jnome = data.jogos[i].nome;
          let jcurto = data.jogos[i].curto;
          if(jcurto == jogoAtual){
            document.querySelector(".page-name").innerHTML = `${jnome}`;
            document.title = `Arquivo - ${jnome}`;
          }
      }
  })
}