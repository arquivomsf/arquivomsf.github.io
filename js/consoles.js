var pathnameArray = window.location.pathname.split("/");
/*var consoleAtual = pathnameArray[2];*/
var consoleAtual;
var stringPesquisa = "";
var pesquisando = 0;

function start() {
    resetarString();
    setPesquisa();
    carregarDados();
}

function carregarDados() {
    procurarParam();
    carregarJogos();
    carregarConsoles();
}

function procurarParam() {
    let searchParams = new URLSearchParams(window.location.search);
    consoleAtual = searchParams.get('id');
}

function carregarJogos() {
    fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.jogos.length; i++){
              let jnome = data.jogos[i].nome;
              let jimagem = data.jogos[i].imagem;
              let jconsigla = data.jogos[i].consigla;
              let jcurto = data.jogos[i].curto;
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
                if(jconsigla == consoleAtual){
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="${jcurto}" class="blacklink">
                            <img src="${jcurto}/${jimagem}" alt="" class="img-fluid linkicon"><br>
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
              if(csigla == consoleAtual){
                document.querySelector(".page-name").innerHTML = `${cnome}`;
                document.title = `Arquivo - ${cnome}`;
              }
              document.querySelector("#conJsonParent").innerHTML += `
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="?id=${csigla}">${cnome}</a>
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
        document.querySelector(".navbar-brand").style.display = "block";
        document.querySelector(".navbar-toggler").style.display = "block";
        document.querySelector(".home-icon").style.display = "block";
        document.querySelector("#inputPesquisaContainer").style.display = "none";
        document.querySelector("#pesquisarBtn").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-search" viewBox="0 2 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>';
    } else {
        document.querySelector(".navbar-brand").style.display = "none";
        document.querySelector(".navbar-toggler").style.display = "none";
        document.querySelector(".home-icon").style.display = "none";
        document.querySelector("#inputPesquisaContainer").style.display = "block";
        document.querySelector("#inputPesquisa").focus();
        document.querySelector("#pesquisarBtn").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 2 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>';
    }
}

function changePesquisa() {
    if (pesquisando == 0) {
        pesquisando = 1;
        setPesquisa();
    } else {
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