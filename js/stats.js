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
