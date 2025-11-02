function start() {
    setTab("",'jogosParent');
    resetarString();
    setPesquisa();
    carregarDados();
}

function carregarDados() {
    carregarJogos();
    carregar_consoles_temas("normal","");
}

function carregarJogos() {
    fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.jogos.length; i++){
              let jogo_nome = data.jogos[i].nome;
              let jogo_imagem = data.jogos[i].imagem;
              let jconsole = data.jogos[i].console;
              let jogo_console_sigla = data.jogos[i].consigla;
              let jogo_nome_curto = data.jogos[i].curto;
              let jogo_tags = data.jogos[i].tags;
              let nome_processado = pesquisa_processar_texto(jogo_tags);
              
              if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
                document.querySelector("#jogosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="jogo?con=${jogo_console_sigla}&id=${jogo_nome_curto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="${jogo_imagem}" alt="" class="linkicon ratio ratio-16x9 capa">
                                <span class="video-length"></span>
                            </div>
                            <span class="flow-text title">${jogo_nome}</span></a><br>
                        <a href="console?id=${jogo_console_sigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                    </div>`;
              }
          }
      })

      fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.standalone.length; i++){
              let standalone_nome = data.standalone[i].nome;
              let standalone_imagem = data.standalone[i].imagem;
              let standalone_console_sigla = data.standalone[i].consigla;
              let standalone_nome_curto = data.standalone[i].curto;
              let standalone_tags = data.standalone[i].tags;
              let nome_processado = pesquisa_processar_texto(standalone_tags);
              
              if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
                    let standalone_duracao = gerar_timestamp(data.standalone[i].duracao.horas,data.standalone[i].duracao.minutos,data.standalone[i].duracao.segundos);
                    let standalone_plataforma = data.standalone[i].plataforma;
                    let standalone_link_youtube = data.standalone[i].linkyt;
                    if (standalone_plataforma == "gdrive" || standalone_plataforma == "archive") {
                        document.querySelector("#standParent").innerHTML += `
                            <div class="col stand-item">
                            <a href="embed?con=${standalone_console_sigla}&jogo=${standalone_nome_curto}&fonte=${standalone_plataforma}" class="blacklink">
                                <div class="thumbnail">
                                    <img src="video/${standalone_console_sigla}/${standalone_imagem}" alt="" class="img-fluid linkicon">
                                    <span class="video-length"><i class="fa fa-fw fa-file-video-o"></i>${standalone_duracao}</span>
                                </div>
                                <span class="flow-text title">${standalone_nome}</span>
                            </a>
                            </div>`;
                    } else if (standalone_plataforma == "youtube") {
                        document.querySelector("#standParent").innerHTML += `
                            <div class="col stand-item">
                            <a href="${standalone_link_youtube}" target="_blank" class="blacklink">
                                <div class="thumbnail">
                                    <img src="video/${standalone_console_sigla}/${standalone_imagem}" alt="" class="img-fluid linkicon">
                                    <span class="video-length"><i class="fa fa-fw fa-youtube-play"></i>${standalone_duracao}</span>
                                </div>
                                <span class="flow-text title">${standalone_nome}</span>
                            </a>
                            </div>`;
                   }
              }
          }
      })

      fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.outros.length; i++){
              let outros_nome = data.outros[i].nome;
              let outros_imagem = data.outros[i].imagem;
              let outros_console_sigla = data.outros[i].consigla;
              let outros_nome_curto = data.outros[i].curto;
              let outros_tags = data.outros[i].tags;
              let nome_processado = pesquisa_processar_texto(outros_tags);

              if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
                document.querySelector("#outrosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="serie?con=${outros_console_sigla}&jogo=${outros_nome_curto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="video/${outros_console_sigla}/${outros_nome_curto}/${outros_imagem}" alt="" class="img-fluid linkicon">
                                <span class="video-length"></span>
                            </div>
                            <span class="flow-text title">${outros_nome}</span>
                        </a>
                    </div>`;
              }
          }
      })
}

function resetarJogos(){
    document.querySelector("#jogosParent").innerHTML = "";
    document.querySelector("#outrosParent").innerHTML = "";
    document.querySelector("#standParent").innerHTML = "";
}

function carregarStats(){
    carregar_consoles_temas("normal","");

    let consoles_counter = 0;

    let jogos_counter = 0;
    let jogos_horas_counter = 0;
    let jogos_minutos_counter = 0;
    let jogos_segundos_counter = 0;

    let jogos_episodios_counter = 0;

    let jogos_comvod_counter = 0;
    let jogos_vods_counter = 0;

    let standalone_counter = 0;
    let standalone_horas_counter = 0;
    let standalone_minutos_counter = 0;
    let standalone_segundos_counter = 0;

    let outros_counter = 0;
    let outros_horas_counter = 0;
    let outros_minutos_counter = 0;
    let outros_segundos_counter = 0;

    let total_horas_counter = 0;
    let total_minutos_counter = 0;
    let total_segundos_counter = 0;
    fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.consoles.length; i++){
            consoles_counter++;
            document.querySelector(".counter-con").innerHTML = `${consoles_counter} consoles`;
          }
      })
      fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.jogos.length; i++){
            let jogo_console_sigla = data.jogos[i].consigla;
            let jogo_nome_curto = data.jogos[i].curto;
            jogos_counter++;
            document.querySelector(".counter-jogo").innerHTML = `${jogos_counter} jogos`;

            fetch(`video/${jogo_console_sigla}/${jogo_nome_curto}/series.json`)
            .then(response => response.json())
            .then(data => {
                if (data.hasOwnProperty("episodios")) {
                    

            fetch(`video/${jogo_console_sigla}/${jogo_nome_curto}/episodios/videos.json`)
            .then(response => response.json())
            .then(data => {
                for (var i = 0; i<data.videos.length; i++){
                    let video_horas = data.videos[i].duracao.horas;
                    let video_minutos = data.videos[i].duracao.minutos;
                    let video_segundos = data.videos[i].duracao.segundos;
                    jogos_episodios_counter++;
                    jogos_horas_counter += video_horas;
                    jogos_minutos_counter += video_minutos;
                    jogos_segundos_counter += video_segundos;
                    total_horas_counter += video_horas;
                    total_minutos_counter += video_minutos;
                    total_segundos_counter += video_segundos;
                    console.log("ep "+jogos_horas_counter+jogos_minutos_counter+":"+jogos_segundos_counter+"/"+total_horas_counter+total_minutos_counter+":"+total_segundos_counter);

                    document.querySelector(".counter-ep").innerHTML = `${jogos_episodios_counter} vídeos de jogos`;
                    document.querySelector(".counter-total").innerHTML = `${jogos_episodios_counter+jogos_vods_counter+standalone_counter+outros_counter} vídeos arquivados`;
                    document.querySelector(".counter-mediaep").innerHTML = `${Math.round(jogos_episodios_counter/jogos_counter)} vídeos por jogo (média)`;
                }

                if (data.hasOwnProperty("extras")) {
                    for (var i = 0; i<data.extras.length; i++){
                        let video_horas = data.extras[i].duracao.horas;
                        let video_minutos = data.extras[i].duracao.minutos;
                        let video_segundos = data.extras[i].duracao.segundos;
                        jogos_episodios_counter++;
                        jogos_horas_counter += video_horas;
                        jogos_minutos_counter += video_minutos;
                        jogos_segundos_counter += video_segundos;
                        total_horas_counter += video_horas;
                        total_minutos_counter += video_minutos;
                        total_segundos_counter += video_segundos;
                        console.log("ep extra "+jogos_horas_counter+jogos_minutos_counter+":"+jogos_segundos_counter+"/"+total_horas_counter+total_minutos_counter+":"+total_segundos_counter);

                        document.querySelector(".counter-ep").innerHTML = `${jogos_episodios_counter} vídeos de jogos`;
                        document.querySelector(".counter-total").innerHTML = `${jogos_episodios_counter+jogos_vods_counter+standalone_counter+outros_counter} vídeos arquivados`;
                        document.querySelector(".counter-mediaep").innerHTML = `${Math.round(jogos_episodios_counter/jogos_counter)} vídeos por jogo (média)`;
                    }
                }
            })

                }

                if (data.hasOwnProperty("vodsarquivo")) {
                    

            fetch(`video/${jogo_console_sigla}/${jogo_nome_curto}/vods/videos.json`)
            .then(response => response.json())
            .then(data => {
                jogos_comvod_counter++;
                for (var i = 0; i<data.videos.length; i++){
                    let video_horas = data.videos[i].duracao.horas;
                    let video_minutos = data.videos[i].duracao.minutos;
                    let video_segundos = data.videos[i].duracao.segundos;
                    jogos_vods_counter++;
                    jogos_horas_counter += video_horas;
                    jogos_minutos_counter += video_minutos;
                    jogos_segundos_counter += video_segundos;
                    total_horas_counter += video_horas;
                    total_minutos_counter += video_minutos;
                    total_segundos_counter += video_segundos;
                    console.log("vod "+jogos_horas_counter+jogos_minutos_counter+":"+jogos_segundos_counter+"/"+total_horas_counter+total_minutos_counter+":"+total_segundos_counter);
                    
                    document.querySelector(".counter-vods").innerHTML = `${jogos_vods_counter} VODs de jogos`;
                    document.querySelector(".counter-total").innerHTML = `${jogos_episodios_counter+jogos_vods_counter+standalone_counter+outros_counter} vídeos arquivados`;
                    document.querySelector(".counter-mediavod").innerHTML = `${Math.round(jogos_vods_counter/jogos_comvod_counter)} VODs por jogo (média)`;
                }

                if (data.hasOwnProperty("extras")) {
                    for (var i = 0; i<data.extras.length; i++){
                        let video_horas = data.extras[i].duracao.horas;
                        let video_minutos = data.extras[i].duracao.minutos;
                        let video_segundos = data.extras[i].duracao.segundos;
                        jogos_vods_counter++;
                        jogos_horas_counter += video_horas;
                        jogos_minutos_counter += video_minutos;
                        jogos_segundos_counter += video_segundos;
                        total_horas_counter += video_horas;
                        total_minutos_counter += video_minutos;
                        total_segundos_counter += video_segundos;
                        console.log("vod extra "+jogos_horas_counter+jogos_minutos_counter+":"+jogos_segundos_counter+"/"+total_horas_counter+total_minutos_counter+":"+total_segundos_counter);
                        
                        document.querySelector(".counter-vods").innerHTML = `${jogos_vods_counter} VODs de jogos`;
                        document.querySelector(".counter-total").innerHTML = `${jogos_episodios_counter+jogos_vods_counter+standalone_counter+outros_counter} vídeos arquivados`;
                        document.querySelector(".counter-mediavod").innerHTML = `${Math.round(jogos_vods_counter/jogos_comvod_counter)} VODs por jogo (média)`;
                    }
                }
            })

                }

            })
          }
          for (var i = 0; i<data.standalone.length; i++){
            let standalone_video_horas = data.standalone[i].duracao.horas;
            let standalone_video_minutos = data.standalone[i].duracao.minutos;
            let standalone_video_segundos = data.standalone[i].duracao.segundos;
            standalone_counter++;
            standalone_horas_counter += standalone_video_horas;
            standalone_minutos_counter += standalone_video_minutos;
            standalone_segundos_counter += standalone_video_segundos;
            total_horas_counter += standalone_video_horas;
            total_minutos_counter += standalone_video_minutos;
            total_segundos_counter += standalone_video_segundos;
            console.log("standalone "+standalone_horas_counter+standalone_minutos_counter+":"+standalone_segundos_counter+"/"+total_horas_counter+total_minutos_counter+":"+total_segundos_counter);

            document.querySelector(".counter-standalone").innerHTML = `${standalone_counter} vídeos standalone`;
            document.querySelector(".counter-total").innerHTML = `${jogos_episodios_counter+jogos_vods_counter+standalone_counter+outros_counter} vídeos arquivados`;
          }

          for (var i = 0; i<data.outros.length; i++){
            let outros_nome_curto = data.outros[i].curto;

            fetch(`video/outros/${outros_nome_curto}/videos.json`)
            .then(response => response.json())
            .then(data => {

            for (var i = 0; i<data.videos.length; i++){
                let outros_video_horas = data.videos[i].duracao.horas;
                let outros_video_minutos = data.videos[i].duracao.minutos;
                let outros_video_segundos = data.videos[i].duracao.segundos;
                outros_counter++;
                outros_horas_counter += outros_video_horas;
                outros_minutos_counter += outros_video_minutos;
                outros_segundos_counter += outros_video_segundos;
                total_horas_counter += outros_video_horas;
                total_minutos_counter += outros_video_minutos;
                total_segundos_counter += outros_video_segundos;
                console.log("outros "+outros_horas_counter+outros_minutos_counter+":"+outros_segundos_counter+"/"+total_horas_counter+total_minutos_counter+":"+total_segundos_counter);

                document.querySelector(".counter-outros").innerHTML = `${outros_counter} vídeos marcados como "outros"`;
                document.querySelector(".counter-total").innerHTML = `${jogos_episodios_counter+jogos_vods_counter+standalone_counter+outros_counter} vídeos arquivados`;

            }

            if (data.hasOwnProperty("extras")) {
                for (var i = 0; i<data.extras.length; i++){
                    let outros_video_horas = data.extras[i].duracao.horas;
                    let outros_video_minutos = data.extras[i].duracao.minutos;
                    let outros_video_segundos = data.extras[i].duracao.segundos;
                    outros_counter++;
                    outros_horas_counter += outros_video_horas;
                    outros_minutos_counter += outros_video_minutos;
                    outros_segundos_counter += outros_video_segundos;
                    total_horas_counter += outros_video_horas;
                    total_minutos_counter += outros_video_minutos;
                    total_segundos_counter += outros_video_segundos;
                    console.log("outros extra "+outros_horas_counter+outros_minutos_counter+":"+outros_segundos_counter+"/"+total_horas_counter+total_minutos_counter+":"+total_segundos_counter);

                    document.querySelector(".counter-outros").innerHTML = `${outros_counter} vídeos marcados como "outros"`;
                    document.querySelector(".counter-total").innerHTML = `${jogos_episodios_counter+jogos_vods_counter+standalone_counter+outros_counter} vídeos arquivados`;

                }
            }

            })
          }
      })
      setInterval(function () {
        //converter tempos, segundos > minutos, minutos > horas

        //converter standalone
        if (standalone_segundos_counter >= 60) {
            standalone_minutos_counter += Math.trunc(standalone_segundos_counter/60);
            standalone_segundos_counter = standalone_segundos_counter%60;
        }
        if (standalone_minutos_counter >= 60) {
            standalone_horas_counter += Math.trunc(standalone_minutos_counter/60);
            standalone_minutos_counter = standalone_minutos_counter%60;
        }

        //converter jogos (episódios e vods)
        if (jogos_segundos_counter >= 60) {
            jogos_minutos_counter += Math.trunc(jogos_segundos_counter/60);
            jogos_segundos_counter = jogos_segundos_counter%60;
        }
        if (jogos_minutos_counter >= 60) {
            jogos_horas_counter += Math.trunc(jogos_minutos_counter/60);
            jogos_minutos_counter = jogos_minutos_counter%60;
        }

        //converter outros
        if (outros_segundos_counter >= 60) {
            outros_minutos_counter += Math.trunc(outros_segundos_counter/60);
            outros_segundos_counter = outros_segundos_counter%60;
        }
        if (outros_minutos_counter >= 60) {
            outros_horas_counter += Math.trunc(outros_minutos_counter/60);
            outros_minutos_counter = outros_minutos_counter%60;
        }

        //converter TUDO
        total_horas_counter = standalone_horas_counter + jogos_horas_counter + outros_horas_counter;
        total_minutos_counter = standalone_minutos_counter + jogos_minutos_counter + outros_minutos_counter;
        total_segundos_counter = standalone_segundos_counter + jogos_segundos_counter + outros_segundos_counter;
        if (total_segundos_counter >= 60) {
            total_minutos_counter += Math.trunc(total_segundos_counter/60);
            total_segundos_counter = total_segundos_counter%60;
        }
        if (total_minutos_counter >= 60) {
            total_horas_counter += Math.trunc(total_minutos_counter/60);
            total_minutos_counter = total_minutos_counter%60;
        }

        document.querySelector(".counter-tempototalstandalone").innerHTML = `${Math.round(standalone_horas_counter)}h ${Math.round(standalone_minutos_counter)}m ${Math.round(standalone_segundos_counter)}s de vídeos standalone`;
        document.querySelector(".counter-tempototaloutros").innerHTML = `${Math.round(outros_horas_counter)}h ${Math.round(outros_minutos_counter)}m ${Math.round(outros_segundos_counter)}s de vídeos marcados como "outros"`;
        document.querySelector(".counter-tempototaljogo").innerHTML = `${Math.round(jogos_horas_counter)}h ${Math.round(jogos_minutos_counter)}m ${Math.round(jogos_segundos_counter)}s de vídeos de jogos`;
        document.querySelector(".counter-tempototal").innerHTML = `${Math.round(total_horas_counter)}h ${Math.round(total_minutos_counter)}m ${Math.round(total_segundos_counter)}s de vídeos arquivados`;
    }, 500);
}
