var pathnameArray = window.location.pathname.split("/");
var consoleAtual;

function start() {
  setTab("",'jsonParent');
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
              let jtags = data.jogos[i].tags;
              let jimagem = data.jogos[i].imagem;
              let jconsigla = data.jogos[i].consigla;
              let jcurto = data.jogos[i].curto;
              let nomecomp;
              //nomecomp = jnome.replaceAll(/\s/g, "");
              nomecomp = jtags.replaceAll(/\s/g, "");
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
                    //if(jvod == 0){
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="${jimagem}" alt="" class="linkicon ratio ratio-16x9 capa">
                                <span class="video-length"></span>
                            </div>
                            <span class="flow-text title">${jnome}</span>
                          </a>
                        </div>`;
                    /*} else {
                      document.querySelector("#vodParent").innerHTML += `
                        <div class="col">
                          <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${jconsigla}/${jcurto}/${jimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length"><i class="fa fa-fw fa-${jstatus}"></i></span>
                            </div>
                            <span class="flow-text title">${jnome}</span>
                          </a>
                        </div>`;
                    }*/
                }
              }
          }
      })
}

function resetarJogos(){
    document.querySelector("#jsonParent").innerHTML = "";
    document.querySelector("#vodParent").innerHTML = "";
}

function carregarConsoles() {
    fetch("dados.json")
        .then(response => response.json())
        .then(data => {
          for (var i = 0; i<data.consoles.length; i++){
              let cnome = data.consoles[i].nome;
              let csigla = data.consoles[i].sigla;
              if(csigla == consoleAtual){
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

function setTab(cur_el,selected_tab) {
    if (cur_el != "") {
        document.querySelectorAll(".tab-link").forEach(el => {
            el.classList.remove("active");
        });
        cur_el.classList.add("active");
    }

    document.querySelectorAll(".tab-content").forEach(el => {
        el.classList.add("hidden");
    });
    document.querySelector("#"+selected_tab).classList.remove("hidden");
}