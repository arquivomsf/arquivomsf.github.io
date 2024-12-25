var stringPesquisa = "";
var pesquisando = 0;

function start() {
    resetarString();
    setPesquisa();
    carregarDados();
}

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
              //let jlink = data.jogos[i].link;
              let jstandalone = data.jogos[i].standalone;
              let nomecomp;
              nomecomp = jnome.replaceAll(/\s/g, "");
              nomecomp = nomecomp.replaceAll(/[^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g,"");
              nomecomp = nomecomp.replaceAll(/[áàâãÁÀÂÃ]/g,"a");
              nomecomp = nomecomp.replaceAll(/[íïÍÏ]/g,"i");
              nomecomp = nomecomp.replaceAll(/[éèêÉÈ]/g,"e");
              nomecomp = nomecomp.replaceAll(/[ñÑ]/g,"n");
              nomecomp = nomecomp.replaceAll(/[óôõöÓÔÕÖ]/g,"o");
              nomecomp = nomecomp.replaceAll(/[Ç]/g,"c");
              nomecomp = nomecomp.replaceAll(/[úÚ]/g,"u");
              /*console.log("stringPesquisa: "+ stringPesquisa.toLowerCase() + " " + "nomecomp: " + nomecomp.toLowerCase());*/
              if(nomecomp.toLowerCase().includes(stringPesquisa.toLowerCase())) {
                if(jstandalone == 0){
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                          <img src="video/${jconsigla}/${jcurto}/${jimagem}" alt="" class="img-fluid linkicon"><br>
                          <span class="flow-text title">${jnome}</span></a><br>
                          <a href="console?id=${jconsigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                        </div>`;
                } else {
                    /*
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="${jlink}" class="blacklink">
                            <img src="video/${jconsigla}/${jimagem}" alt="" class="img-fluid linkicon"><br>
                            <span class="flow-text title">${jnome}</span>
                          </a>
                        </div>`;
                    */
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="embed?con=${jconsigla}&jogo=${jcurto}" class="blacklink">
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
                  <a class="nav-link active" aria-current="page" href="console?id=${csigla}">${cnome}</a>
                </li>`;
          }
      })
}

function start404(){
    fetch("https://arquivomsf.github.io/dados.json")
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

function pesquisarJogo() {
    stringPesquisa = document.querySelector("#inputPesquisa").value;
    stringPesquisa = stringPesquisa.replaceAll(/\s/g, "");
    stringPesquisa = stringPesquisa.replaceAll(/[^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g,"");
    stringPesquisa = stringPesquisa.replaceAll(/[áàâãÁÀÂÃ]/g,"a");
    stringPesquisa = stringPesquisa.replaceAll(/[íïÍÏ]/g,"i");
    stringPesquisa = stringPesquisa.replaceAll(/[éèêÉÈ]/g,"e");
    stringPesquisa = stringPesquisa.replaceAll(/[ñÑ]/g,"n");
    stringPesquisa = stringPesquisa.replaceAll(/[óôõöÓÔÕÖ]/g,"o");
    stringPesquisa = stringPesquisa.replaceAll(/[Ç]/g,"c");
    stringPesquisa = stringPesquisa.replaceAll(/[úÚ]/g,"u");
    resetarJogos();
    carregarJogos();
}

if (!pesquisando == 0) {
    setInterval(function () {
        resetarJogos();
        carregarJogos();
    }, 100);
}

function setPesquisa() {
    if (pesquisando == 0) {
        document.querySelector(".default-container").style.display = "block";
        document.querySelector(".search-container").style.display = "none";
        let allSearchBtn = document.querySelectorAll(".pesquisar-btn");
        for (let i = 0; i < allSearchBtn.length; i++) {
            allSearchBtn[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-search" viewBox="0 2 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>';
        }
    } else {
        document.querySelector(".default-container").style.display = "none";
        document.querySelector(".search-container").style.display = "block";
        document.querySelector("#inputPesquisa").focus();
        let allSearchBtn = document.querySelectorAll(".pesquisar-btn");
        for (let i = 0; i < allSearchBtn.length; i++) {
            allSearchBtn[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 2 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>';
        }
    }
}

function changePesquisa() {
    if (pesquisando == 0) {
        pesquisando = 1;
        setPesquisa();
        return
    }
    if (!stringPesquisa == "" && !pesquisando == 0) {
        pesquisando = 0;
        resetarString();
        resetarJogos();
        carregarJogos();
        setPesquisa();
    }
}

function checarStringVazia() {
    if (stringPesquisa == "" && !pesquisando == 0) {
        pesquisando = 0;
        setPesquisa();
    }
}

function resetarString() {
    document.querySelector("#inputPesquisa").value = "";
    stringPesquisa = "";
}