var consoleAtual;
var jogoAtual;

function carregarDados() {
  setTab("",'jsonParent');
  procurarParam();
  carregarVideos();
  if (consoleAtual == "outros") carregar_consoles_temas("outro",jogoAtual);
  else carregar_consoles_temas("jogo",jogoAtual);
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('jogo');
  serieAtual = searchParams.get('serie');
}

function carregarVideos() {
  let serie_path;
  if (consoleAtual != "outros") serie_path = `video/${consoleAtual}/${jogoAtual}/${serieAtual}`;
  else serie_path = `video/${consoleAtual}/${jogoAtual}`;

    fetch(`${serie_path}/videos.json`)
      .then(response => response.json())
      .then(data => {
        document.querySelector(".tabs-navbar").style.display = "none";
        if (data.hasOwnProperty("playlist")) {
                let playlist_nome = data.playlist[0].nome;
                let playlist_imagem = data.playlist[0].imagem;
                let playlist_link = data.playlist[0].link;
                let playlist_quantidade = data.playlist[0].quantidade;
                document.querySelector("#extrasParent").innerHTML += `
                    <div class="col extras-item">
                      <a href="${playlist_link}" target="_blank" class="blacklink">
                        <div class="thumbnail">
                          <img src="${serie_path}/1.${playlist_imagem}" alt="" class="img-fluid linkicon">
                          <div class="playlist-length">
                            <div class="playlist-info-wrapper">
                              <i class="fa fa-list"></i>
                              <span>${playlist_quantidade}</span>
                            </div>
                          </div>
                        </div>
                        <span class="flow-text title">${playlist_nome}</span>
                      </a>
                    </div>`;
         document.querySelector(".tabs-navbar").style.display = "flex";
        }

        if (data.hasOwnProperty("extras")) {
          for (var i = 0; i<data.extras.length; i++){
                  let extra_nome = data.extras[i].nome;
                  let extra_imagem = data.extras[i].imagem;
                  let extra_link_youtube = data.extras[i].linkyt;
                  let extra_duracao = gerar_timestamp(data.extras[i].duracao.horas,data.extras[i].duracao.minutos,data.extras[i].duracao.segundos);
                  let extra_plataforma = data.extras[i].plataforma;
                  let extra_id = data.extras[i].id;
                  if (extra_plataforma == "gdrive") {
                  document.querySelector("#extrasParent").innerHTML += `
                    <div class="col extras-item">
                      <a href="embed?con=${consoleAtual}&jogo=${jogoAtual}&serie=${serieAtual}&fonte=${extra_plataforma}&extra=true&id=${extra_id}" class="blacklink">
                        <div class="thumbnail">
                          <img src="${serie_path}/${extra_imagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length"><i class="fa fa-fw fa-file-video-o"></i>${extra_duracao}</span>
                        </div>
                        <span class="flow-text title">${extra_nome}</span>
                      </a>
                    </div>`;
                } else if (extra_plataforma == "archive") {
                  document.querySelector("#extrasParent").innerHTML += `
                    <div class="col extras-item">
                      <a href="embed?con=${consoleAtual}&jogo=${jogoAtual}&serie=${serieAtual}&fonte=${extra_plataforma}&extra=true&id=${extra_id}" class="blacklink">
                        <div class="thumbnail">
                          <img src="${serie_path}/${extra_imagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length"><i class="fa fa-fw fa-file-video-o"></i>${extra_duracao}</span>
                        </div>
                        <span class="flow-text title">${extra_nome}</span>
                      </a>
                    </div>`;
                } else if (extra_plataforma == "youtube") {
                  document.querySelector("#extrasParent").innerHTML += `
                    <div class="col extras-item">
                      <a href="${extra_link_youtube}" target="_blank" class="blacklink">
                        <div class="thumbnail">
                          <img src="${serie_path}/${extra_imagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length"><i class="fa fa-fw fa-youtube-play"></i>${extra_duracao}</span>
                        </div>
                        <span class="flow-text title">${extra_nome}</span>
                      </a>
                    </div>`;
                }
         document.querySelector(".tabs-navbar").style.display = "flex";
        }
        }

        if (data.hasOwnProperty("analise")) {
                  let analise_nome = data.analise[0].nome;
                  let analise_imagem = data.analise[0].imagem;
                  let analise_link = data.analise[0].link;
                  let analise_duracao = gerar_timestamp(data.analise[0].duracao.horas,data.analise[0].duracao.minutos,data.analise[0].duracao.segundos);
                  document.querySelector("#extrasParent").innerHTML += `
                    <div class="col extras-item">
                      <a href="${analise_link}" target="_blank" class="blacklink">
                        <div class="thumbnail">
                          <img src="${serie_path}/analise.${analise_imagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length"><i class="fa fa-fw fa-youtube-play"></i>${analise_duracao}</span>
                        </div>
                        <span class="flow-text title">${analise_nome}</span>
                      </a>
                    </div>`;
         document.querySelector(".tabs-navbar").style.display = "flex";
        }

      })

    fetch(`${serie_path}/videos.json`)
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i<data.videos.length; i++){
              let video_nome = data.videos[i].nome;
              let video_imagem = data.videos[i].imagem;
              let video_duracao = gerar_timestamp(data.videos[i].duracao.horas,data.videos[i].duracao.minutos,data.videos[i].duracao.segundos);
                document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/${serie_path}/1.${video_imagem}`);
                let video_plataforma = data.videos[i].plataforma;
                let video_link_youtube = data.videos[i].linkyt;
                if (video_plataforma == "gdrive") {
                  document.querySelector("#jsonParent").innerHTML += `
                    <div class="col">
                      <a href="embed?con=${consoleAtual}&jogo=${jogoAtual}&serie=${serieAtual}&fonte=${video_plataforma}&id=${i}" class="blacklink">
                        <div class="thumbnail">
                          <img src="${serie_path}/${i+1}.${video_imagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length"><i class="fa fa-fw fa-file-video-o"></i>${video_duracao}</span>
                        </div>
                        <span class="flow-text title">${video_nome}</span>
                      </a>
                    </div>`;
                } else if (video_plataforma == "archive") {
                  document.querySelector("#jsonParent").innerHTML += `
                    <div class="col">
                      <a href="embed?con=${consoleAtual}&jogo=${jogoAtual}&serie=${serieAtual}&fonte=${video_plataforma}&id=${i}" class="blacklink">
                        <div class="thumbnail">
                          <img src="${serie_path}/${i+1}.${video_imagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length"><i class="fa fa-fw fa-file-video-o"></i>${video_duracao}</span>
                        </div>
                        <span class="flow-text title">${video_nome}</span>
                      </a>
                    </div>`;
                } else if (video_plataforma == "youtube") {
                  document.querySelector("#jsonParent").innerHTML += `
                    <div class="col">
                      <a href="${video_link_youtube}" target="_blank" class="blacklink">
                        <div class="thumbnail">
                          <img src="${serie_path}/${i+1}.${video_imagem}" alt="" class="img-fluid linkicon">
                          <span class="video-length"><i class="fa fa-fw fa-youtube-play"></i>${video_duracao}</span>
                        </div>
                        <span class="flow-text title">${video_nome}</span>
                      </a>
                    </div>`;
                }
        }
      })
}
