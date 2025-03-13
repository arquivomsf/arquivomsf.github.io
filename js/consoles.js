var pathnameArray = window.location.pathname.split("/");
var consoleAtual;
var stringPesquisa = "";
var pesquisando = 0;
var tema = "";

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
              if(nomecomp.toLowerCase().includes(stringPesquisa.toLowerCase())) {
                if(jconsigla == consoleAtual){
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                            <img src="video/${jconsigla}/${jcurto}/${jimagem}" alt="" class="img-fluid linkicon"><br>
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
                //document.querySelector(".page-name").innerHTML = `${cnome}`;
                document.querySelector(".console-name").innerHTML = `<a href="">${cnome}</a>`;
                document.title = `Arquivo - ${cnome}`;
                document.querySelector('meta[property="og:title"]').setAttribute("content", `Arquivo - ${cnome}`);
              }
              document.querySelector("#conJsonParent").innerHTML += `
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="?id=${csigla}">${cnome}</a>
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
            allSearchBtn[i].innerHTML = '<i class="fa fa-search"></i>';
        }
    } else {
        document.querySelector(".default-container").style.display = "none";
        document.querySelector(".search-container").style.display = "block";
        document.querySelector("#inputPesquisa").focus();
        let allSearchBtn = document.querySelectorAll(".pesquisar-btn");
        for (let i = 0; i < allSearchBtn.length; i++) {
            allSearchBtn[i].innerHTML = '<i class="fa fa-close"></i>';
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