var stringPesquisa = "";
var pesquisando = 0;
var tema = "";

function start() {
    resetarString();
    setPesquisa();
    carregarDados();
    startTema();
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
                   /*
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="embed?con=${jconsigla}&jogo=${jcurto}" class="blacklink">
                            <img src="video/${jconsigla}/${jimagem}" alt="" class="img-fluid linkicon"><br>
                            <span class="flow-text title">${jnome}</span>
                          </a>
                        </div>`;
                    */
                    let jduracao = data.jogos[i].duracao;
                    /*
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="embed?con=${jconsigla}&jogo=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${jconsigla}/${jimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length">${jduracao}</span>
                            </div>
                            <span class="flow-text title">${jnome}</span>
                          </a>
                        </div>`;
                    */
                    let jplat = data.jogos[i].plataforma;
                    let jlinkyt = data.jogos[i].linkyt;
                   if (jplat == "gdrive") {
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                        <a href="embed?con=${jconsigla}&jogo=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${jconsigla}/${jimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length">${jduracao}</span>
                            </div>
                            <span class="flow-text title">${jnome}</span>
                        </a>
                        </div>`;
                   } else if (jplat == "youtube") {
                    document.querySelector("#jsonParent").innerHTML += `
                        <div class="col">
                          <a href="${jlinkyt}" target="_blank" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${jconsigla}/${jimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length">${jduracao}</span>
                            </div>
                            <span class="flow-text title">${jnome}</span>
                          </a>
                        </div>`;
                   }
                    
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
        /*for (let i = 0; i < allSearchBtn.length; i++) {
            allSearchBtn[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-search" viewBox="0 2 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>';
        }*/
        for (let i = 0; i < allSearchBtn.length; i++) {
            allSearchBtn[i].innerHTML = '<i class="fa fa-search"></i>';
        }
    } else {
        document.querySelector(".default-container").style.display = "none";
        document.querySelector(".search-container").style.display = "block";
        document.querySelector("#inputPesquisa").focus();
        let allSearchBtn = document.querySelectorAll(".pesquisar-btn");
        /*for (let i = 0; i < allSearchBtn.length; i++) {
            allSearchBtn[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 2 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>';
        }*/
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

function carregarStats(){
    carregarConsoles();
    let ccounter = 0;
    let jcounter = 0;
    let scounter = 0;
    let epcounter = 0;
    let jhorascounter = 0;
    let jmincounter = 0;
    let jsegcounter = 0;
    let shorascounter = 0;
    let smincounter = 0;
    let ssegcounter = 0;
    let thorascounter = 0;
    let tmincounter = 0;
    let tsegcounter = 0;
    fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.consoles.length; i++){
            ccounter++;
            document.querySelector(".counter-con").innerHTML = `${ccounter} consoles`;
          }
      })
      fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.jogos.length; i++){
            let jstandalone = data.jogos[i].standalone;
            let jconsigla = data.jogos[i].consigla;
            let jcurto = data.jogos[i].curto;
            if(jstandalone == 0){
                jcounter++;
                document.querySelector(".counter-jogo").innerHTML = `${jcounter} jogos`;
                fetch(`video/${jconsigla}/${jcurto}/videos.json`)
                .then(response => response.json())
                .then(data => {
                    for (var i = 0; i<data.videos.length; i++){
                        let vduracao = data.videos[i].duracao;
                        if (vduracao != "Perdido") {
                            const vtempoatual = vduracao.split(":");
                            epcounter++;
                            jmincounter += Number(vtempoatual[0]);
                            jsegcounter += Number(vtempoatual[1]);
                            tmincounter += Number(vtempoatual[0]);
                            tsegcounter += Number(vtempoatual[1]);
                            console.log("jogo "+jmincounter+":"+jsegcounter+"/"+tmincounter+":"+tsegcounter);
                        }
                        document.querySelector(".counter-ep").innerHTML = `${epcounter} vídeos de jogos`;
                        document.querySelector(".counter-total").innerHTML = `${epcounter+scounter} vídeos arquivados`;
                        document.querySelector(".counter-mediaep").innerHTML = `${Math.round(epcounter/jcounter)} vídeos por jogo (média)`;
                        /*document.querySelector(".counter-tempototaljogo").innerHTML = `${Math.round(jhorascounter)}h ${Math.round(jmincounter)}m ${Math.round(jsegcounter)}s de vídeos de jogos`;
                        document.querySelector(".counter-tempototal").innerHTML = `${Math.round(thorascounter)}h ${Math.round(tmincounter)}m ${Math.round(tsegcounter)}s de vídeos arquivados`;*/
                    }
                })
            }
            if(jstandalone == 1){
                let jduracao = data.jogos[i].duracao;
                const jtempoatual = jduracao.split(":");
                scounter++;
                smincounter += Number(jtempoatual[0]);
                ssegcounter += Number(jtempoatual[1]);
                tmincounter += Number(jtempoatual[0]);
                tsegcounter += Number(jtempoatual[1]);
                console.log("standalone "+smincounter+":"+ssegcounter+"/"+tmincounter+":"+tsegcounter);
                document.querySelector(".counter-standalone").innerHTML = `${scounter} vídeos standalone`;
                document.querySelector(".counter-total").innerHTML = `${epcounter+scounter} vídeos arquivados`;
                document.querySelector(".counter-mediaep").innerHTML = `${Math.round(epcounter/jcounter)} vídeos por jogo (média)`;
                /*document.querySelector(".counter-tempototalstandalone").innerHTML = `${Math.round(shorascounter)}h ${Math.round(smincounter)}m ${Math.round(ssegcounter)}s de vídeos standalone`;
                document.querySelector(".counter-tempototal").innerHTML = `${Math.round(thorascounter)}h ${Math.round(tmincounter)}m ${Math.round(tsegcounter)}s de vídeos arquivados`;*/
            }
          }
      })
      setInterval(function () {
        if (ssegcounter >= 60) {
            //console.log("smin = "+smincounter+" sseg = "+ssegcounter+" sseg depois = "+ssegcounter%60);
            smincounter += Math.trunc(ssegcounter/60);
            ssegcounter = ssegcounter%60;
            //console.log("smin depois = "+smincounter);
        }
        if (smincounter >= 60) {
            //console.log("sh = "+shorascounter+" smin = "+smincounter+" smin depois = "+smincounter%60);
            shorascounter += Math.trunc(smincounter/60);
            smincounter = smincounter%60;
            //console.log("sh depois = "+shorascounter);
        }
        if (jsegcounter >= 60) {
            //console.log("jmin = "+jmincounter+" jseg = "+jsegcounter+" jseg depois = "+jsegcounter%60);
            jmincounter += Math.trunc(jsegcounter/60);
            jsegcounter = jsegcounter%60;
            //console.log("jmin depois = "+jmincounter);
        }
        if (jmincounter >= 60) {
            //console.log("jh = "+jhorascounter+" jmin = "+jmincounter+" jmin depois = "+jmincounter%60);
            jhorascounter += Math.trunc(jmincounter/60);
            jmincounter = jmincounter%60;
            //console.log("jh depois = "+jhorascounter);
        }
        thorascounter = shorascounter + jhorascounter;
        tmincounter = smincounter + jmincounter;
        tsegcounter = ssegcounter + jsegcounter;
        if (tsegcounter >= 60) {
            tmincounter += Math.trunc(tsegcounter/60);
            tsegcounter = tsegcounter%60;
        }
        if (tmincounter >= 60) {
            thorascounter += Math.trunc(tmincounter/60);
            tmincounter = tmincounter%60;
        }
        document.querySelector(".counter-tempototalstandalone").innerHTML = `${Math.round(shorascounter)}h ${Math.round(smincounter)}m ${Math.round(ssegcounter)}s de vídeos standalone`;
        document.querySelector(".counter-tempototaljogo").innerHTML = `${Math.round(jhorascounter)}h ${Math.round(jmincounter)}m ${Math.round(jsegcounter)}s de vídeos de jogos`;
        document.querySelector(".counter-tempototal").innerHTML = `${Math.round(thorascounter)}h ${Math.round(tmincounter)}m ${Math.round(tsegcounter)}s de vídeos arquivados`;
    }, 500);
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