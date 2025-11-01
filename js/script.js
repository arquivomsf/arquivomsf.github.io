function start() {
    setTab("",'jogosParent');
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
              let jtags = data.jogos[i].tags;
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
                document.querySelector("#jogosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="${jimagem}" alt="" class="linkicon ratio ratio-16x9 capa">
                                <span class="video-length"></span>
                            </div>
                            <span class="flow-text title">${jnome}</span></a><br>
                        <a href="console?id=${jconsigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                    </div>`;
                /*if (jvod == 0) {
                    document.querySelector("#jogosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${jconsigla}/${jcurto}/${jimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length"><i class="fa fa-fw fa-${jstatus}"></i></span>
                            </div>
                            <span class="flow-text title">${jnome}</span></a><br>
                        <a href="console?id=${jconsigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                    </div>`;
                } else {
                    document.querySelector("#outrosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${jconsigla}/${jcurto}/${jimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length"><i class="fa fa-fw fa-${jstatus}"></i></span>
                            </div>
                            <span class="flow-text title">${jnome}</span></a><br>
                        <a href="console?id=${jconsigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                    </div>`;
                }*/
              }
              //if (document.querySelector(".game-item") !== null) document.querySelector(".c-series").style.display = "block";
          }
      })

      fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.standalone.length; i++){
              let jnome = data.standalone[i].nome;
              let jimagem = data.standalone[i].imagem;
              let jconsigla = data.standalone[i].consigla;
              let jcurto = data.standalone[i].curto;
              let jtags = data.standalone[i].tags;
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
                    let jduracao = data.standalone[i].duracao;
                    let jplat = data.standalone[i].plataforma;
                    let jlinkyt = data.standalone[i].linkyt;
                    if (jplat == "gdrive" || jplat == "archive") {
                        document.querySelector("#standParent").innerHTML += `
                            <div class="col stand-item">
                            <a href="embed?con=${jconsigla}&jogo=${jcurto}&fonte=${jplat}" class="blacklink">
                                <div class="thumbnail">
                                    <img src="video/${jconsigla}/${jimagem}" alt="" class="img-fluid linkicon">
                                    <span class="video-length"><i class="fa fa-fw fa-file-video-o"></i>${jduracao}</span>
                                </div>
                                <span class="flow-text title">${jnome}</span>
                            </a>
                            </div>`;
                    } else if (jplat == "youtube") {
                        document.querySelector("#standParent").innerHTML += `
                            <div class="col stand-item">
                            <a href="${jlinkyt}" target="_blank" class="blacklink">
                                <div class="thumbnail">
                                    <img src="video/${jconsigla}/${jimagem}" alt="" class="img-fluid linkicon">
                                    <span class="video-length"><i class="fa fa-fw fa-youtube-play"></i>${jduracao}</span>
                                </div>
                                <span class="flow-text title">${jnome}</span>
                            </a>
                            </div>`;
                   }
              }
              //if (document.querySelector(".stand-item") !== null) document.querySelector(".c-standalone").style.display = "block";
          }
      })

      fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.outros.length; i++){
              let otnome = data.outros[i].nome;
              let otimagem = data.outros[i].imagem;
              let otconsole = data.outros[i].console;
              let otconsigla = data.outros[i].consigla;
              let otcurto = data.outros[i].curto;
              let ottags = data.outros[i].tags;
              let nomecomp;
              //nomecomp = jnome.replaceAll(/\s/g, "");
              nomecomp = ottags.replaceAll(/\s/g, "");
              nomecomp = nomecomp.replaceAll(/[^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g,"");
              nomecomp = nomecomp.replaceAll(/[áàâãÁÀÂÃ]/g,"a");
              nomecomp = nomecomp.replaceAll(/[íïÍÏ]/g,"i");
              nomecomp = nomecomp.replaceAll(/[éèêÉÈ]/g,"e");
              nomecomp = nomecomp.replaceAll(/[ñÑ]/g,"n");
              nomecomp = nomecomp.replaceAll(/[óôõöÓÔÕÖ]/g,"o");
              nomecomp = nomecomp.replaceAll(/[Ç]/g,"c");
              nomecomp = nomecomp.replaceAll(/[úÚ]/g,"u");
              if(nomecomp.toLowerCase().includes(stringPesquisa.toLowerCase())) {
                document.querySelector("#outrosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="serie?con=${otconsigla}&jogo=${otcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${otconsigla}/${otcurto}/${otimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length"></span>
                            </div>
                            <span class="flow-text title">${otnome}</span>
                        </a>
                    </div>`;
                /*if (jvod == 0) {
                    document.querySelector("#jogosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${jconsigla}/${jcurto}/${jimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length"><i class="fa fa-fw fa-${jstatus}"></i></span>
                            </div>
                            <span class="flow-text title">${jnome}</span></a><br>
                        <a href="console?id=${jconsigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                    </div>`;
                } else {
                    document.querySelector("#outrosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="jogo?con=${jconsigla}&id=${jcurto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${jconsigla}/${jcurto}/${jimagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length"><i class="fa fa-fw fa-${jstatus}"></i></span>
                            </div>
                            <span class="flow-text title">${jnome}</span></a><br>
                        <a href="console?id=${jconsigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                    </div>`;
                }*/
              }
              //if (document.querySelector(".game-item") !== null) document.querySelector(".c-series").style.display = "block";
          }
      })
}

function resetarJogos(){
    document.querySelector("#jogosParent").innerHTML = "";
    //document.querySelector(".c-series").style.display = "none";
    document.querySelector("#outrosParent").innerHTML = "";
    document.querySelector("#standParent").innerHTML = "";
    //document.querySelector(".c-standalone").style.display = "none";
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
          for (var i = 0; i<data.temas.length; i++){
            let tnome = data.temas[i].nome;
            let tvalor = data.temas[i].valor;
            document.querySelector("#themes_select").innerHTML += `
              <option value="${tvalor}">${tnome}</option>`;
          }
          startTema();
      })
}

function carregarStats(){
    carregarConsoles();
    let ccounter = 0;
    let jcounter = 0;
    let jcomvod = 0;
    let scounter = 0;
    let epcounter = 0;
    let vodcounter = 0;
    let otcounter = 0;
    let jhorascounter = 0;
    let jmincounter = 0;
    let jsegcounter = 0;
    let shorascounter = 0;
    let smincounter = 0;
    let ssegcounter = 0;
    let othorascounter = 0;
    let otmincounter = 0;
    let otsegcounter = 0;
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
            let jconsigla = data.jogos[i].consigla;
            let jcurto = data.jogos[i].curto;
            jcounter++;
            document.querySelector(".counter-jogo").innerHTML = `${jcounter} jogos`;

            fetch(`video/${jconsigla}/${jcurto}/series.json`)
            .then(response => response.json())
            .then(data => {
                if (data.hasOwnProperty("episodios")) {
                    

            fetch(`video/${jconsigla}/${jcurto}/episodios/videos.json`)
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i<data.videos.length; i++){
                    let vduracao = data.videos[i].duracao;
                    if (vduracao !== "Perdido") {
                        const vtempoatual = vduracao.split(":");
                        epcounter++;
                        jmincounter += Number(vtempoatual[0]);
                        jsegcounter += Number(vtempoatual[1]);
                        tmincounter += Number(vtempoatual[0]);
                        tsegcounter += Number(vtempoatual[1]);
                        console.log("ep "+jmincounter+":"+jsegcounter+"/"+tmincounter+":"+tsegcounter);
                    }
                    document.querySelector(".counter-ep").innerHTML = `${epcounter} vídeos de jogos`;
                    document.querySelector(".counter-total").innerHTML = `${epcounter+vodcounter+scounter+otcounter} vídeos arquivados`;
                    document.querySelector(".counter-mediaep").innerHTML = `${Math.round(epcounter/jcounter)} vídeos por jogo (média)`;
                }
            })

                }

                if (data.hasOwnProperty("vodsarquivo")) {
                    

            fetch(`video/${jconsigla}/${jcurto}/vods/videos.json`)
            .then(response => response.json())
            .then(data => {
                jcomvod++;
                for (var i = 0; i<data.videos.length; i++){
                    let vduracao = data.videos[i].duracao;
                    if (vduracao !== "Perdido") {
                        const vtempoatual = vduracao.split(":");
                        vodcounter++;
                        jmincounter += Number(vtempoatual[0]);
                        jsegcounter += Number(vtempoatual[1]);
                        tmincounter += Number(vtempoatual[0]);
                        tsegcounter += Number(vtempoatual[1]);
                        console.log("vod "+jmincounter+":"+jsegcounter+"/"+tmincounter+":"+tsegcounter);
                    }
                    document.querySelector(".counter-vods").innerHTML = `${vodcounter} VODs de jogos`;
                    document.querySelector(".counter-total").innerHTML = `${epcounter+vodcounter+scounter+otcounter} vídeos arquivados`;
                    document.querySelector(".counter-mediavod").innerHTML = `${Math.round(vodcounter/jcomvod)} VODs por jogo (média)`;
                }
            })

                }

            })
          }
          for (var i = 0; i<data.standalone.length; i++){
            let sduracao = data.standalone[i].duracao;
            const stempoatual = sduracao.split(":");
            scounter++;
            smincounter += Number(stempoatual[0]);
            ssegcounter += Number(stempoatual[1]);
            tmincounter += Number(stempoatual[0]);
            tsegcounter += Number(stempoatual[1]);
            console.log("standalone "+smincounter+":"+ssegcounter+"/"+tmincounter+":"+tsegcounter);
            document.querySelector(".counter-standalone").innerHTML = `${scounter} vídeos standalone`;
            document.querySelector(".counter-total").innerHTML = `${epcounter+vodcounter+scounter+otcounter} vídeos arquivados`;
          }

          for (var i = 0; i<data.outros.length; i++){
            let otcurto = data.outros[i].curto;

            fetch(`video/outros/${otcurto}/videos.json`)
            .then(response => response.json())
            .then(data => {

            for (var i = 0; i<data.videos.length; i++){
            let otduracao = data.videos[i].duracao;
            const ottempoatual = otduracao.split(":");
            otcounter++;
            otmincounter += Number(ottempoatual[0]);
            otsegcounter += Number(ottempoatual[1]);
            tmincounter += Number(ottempoatual[0]);
            tsegcounter += Number(ottempoatual[1]);
            console.log("outros "+otmincounter+":"+otsegcounter+"/"+tmincounter+":"+tsegcounter);
            document.querySelector(".counter-outros").innerHTML = `${otcounter} vídeos marcados como "outros"`;
            document.querySelector(".counter-total").innerHTML = `${epcounter+vodcounter+scounter+otcounter} vídeos arquivados`;

            }

            })
          }
      })
      setInterval(function () {
        if (ssegcounter >= 60) {
            smincounter += Math.trunc(ssegcounter/60);
            ssegcounter = ssegcounter%60;
        }
        if (smincounter >= 60) {
            shorascounter += Math.trunc(smincounter/60);
            smincounter = smincounter%60;
        }

        if (jsegcounter >= 60) {
            jmincounter += Math.trunc(jsegcounter/60);
            jsegcounter = jsegcounter%60;
        }
        if (jmincounter >= 60) {
            jhorascounter += Math.trunc(jmincounter/60);
            jmincounter = jmincounter%60;
        }

        if (otsegcounter >= 60) {
            otmincounter += Math.trunc(otsegcounter/60);
            otsegcounter = otsegcounter%60;
        }
        if (otmincounter >= 60) {
            othorascounter += Math.trunc(otmincounter/60);
            otmincounter = otmincounter%60;
        }

        thorascounter = shorascounter + jhorascounter + othorascounter;
        tmincounter = smincounter + jmincounter + otmincounter;
        tsegcounter = ssegcounter + jsegcounter + otsegcounter;
        if (tsegcounter >= 60) {
            tmincounter += Math.trunc(tsegcounter/60);
            tsegcounter = tsegcounter%60;
        }
        if (tmincounter >= 60) {
            thorascounter += Math.trunc(tmincounter/60);
            tmincounter = tmincounter%60;
        }
        document.querySelector(".counter-tempototalstandalone").innerHTML = `${Math.round(shorascounter)}h ${Math.round(smincounter)}m ${Math.round(ssegcounter)}s de vídeos standalone`;
        document.querySelector(".counter-tempototaloutros").innerHTML = `${Math.round(othorascounter)}h ${Math.round(otmincounter)}m ${Math.round(otsegcounter)}s de vídeos marcados como "outros"`;
        document.querySelector(".counter-tempototaljogo").innerHTML = `${Math.round(jhorascounter)}h ${Math.round(jmincounter)}m ${Math.round(jsegcounter)}s de vídeos de jogos`;
        document.querySelector(".counter-tempototal").innerHTML = `${Math.round(thorascounter)}h ${Math.round(tmincounter)}m ${Math.round(tsegcounter)}s de vídeos arquivados`;
    }, 500);
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