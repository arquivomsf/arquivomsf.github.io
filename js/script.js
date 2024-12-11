var stringPesquisa = "";

function carregarDados() {
    carregarJogos();
    carregarConsoles();
}

function carregarJogos() {
    fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.jogos.length; i++){
              let jnome = data.jogos[i].nome;
              let jimagem = data.jogos[i].imagem;
              let jconsole = data.jogos[i].console;
              let jconsigla = data.jogos[i].consigla;
              let jcurto = data.jogos[i].curto;
              let jlink = data.jogos[i].link;
              let jstandalone = data.jogos[i].standalone;
              if(jnome.includes(stringPesquisa)) {
                if(jstandalone == 0){
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="video/${jconsigla}/${jcurto}" class="blacklink">
                          <img src="video/${jconsigla}/${jcurto}/${jimagem}" alt="" class="img-fluid linkicon"><br>
                          <span class="flow-text title">${jnome}</span></a><br>
                          <a href="video/${jconsigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                        </div>`;
                } else {
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="${jlink}" class="blacklink">
                            <img src="video/${jconsigla}/${jimagem}" alt="" class="img-fluid linkicon"><br>
                            <span class="flow-text title">${jnome}</span>
                          </a>
                        </div>`;
                }
              }
          }
      })
}

function resetarJogos(){
    document.querySelector("#jsonParent").innerHTML = ""
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
                  <a class="nav-link active" aria-current="page" href="video/${csigla}">${cnome}</a>
                </li>`;
          }
      })
}

function pesquisarJogo() {
    stringPesquisa = document.querySelector("#inputPesquisa").value;
    resetarJogos();
    carregarJogos();
}