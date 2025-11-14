var consoleAtual;
var jogoAtual;
var serie_path;

function carregarDados() {
  setTab("",'jsonParent');
  procurarParam();

  if (consoleAtual != "outros") serie_path = `video/${consoleAtual}/${jogoAtual}/${serieAtual}`;
  else serie_path = `video/${consoleAtual}/${jogoAtual}`;
  fetch_dados("serie",`${serie_path}/videos.json`);

  if (consoleAtual == "outros") carregar_consoles_temas("outro",jogoAtual);
  else carregar_consoles_temas("jogo",jogoAtual);
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('jogo');
  serieAtual = searchParams.get('serie');
}

function carregar_itens() {
  //vídeos normais
  for (var i = 0; i<dados_serie.videos.length; i++){
    let video_nome = dados_serie.videos[i].nome;
    let video_imagem = dados_serie.videos[i].imagem;
    let video_duracao = gerar_timestamp(dados_serie.videos[i].duracao.horas,dados_serie.videos[i].duracao.minutos,dados_serie.videos[i].duracao.segundos);
      document.querySelector('meta[property="og:image"]').setAttribute("content", `https://arquivomsf.github.io/${serie_path}/1.${video_imagem}`);
      let video_plataforma = dados_serie.videos[i].plataforma;
      let video_link_youtube = dados_serie.videos[i].linkyt;
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

  //itens extras
  document.querySelector(".tabs-navbar").style.display = "none";
  if (dados_serie.hasOwnProperty("playlist")) {
    let playlist_nome = dados_serie.playlist[0].nome;
    let playlist_imagem = dados_serie.playlist[0].imagem;
    let playlist_link = dados_serie.playlist[0].link;
    let playlist_quantidade = dados_serie.playlist[0].quantidade;
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

  if (dados_serie.hasOwnProperty("extras")) {
    for (var i = 0; i<dados_serie.extras.length; i++){
      let extra_nome = dados_serie.extras[i].nome;
      let extra_imagem = dados_serie.extras[i].imagem;
      let extra_link_youtube = dados_serie.extras[i].linkyt;
      let extra_duracao = gerar_timestamp(dados_serie.extras[i].duracao.horas,dados_serie.extras[i].duracao.minutos,dados_serie.extras[i].duracao.segundos);
      let extra_plataforma = dados_serie.extras[i].plataforma;
      let extra_id = dados_serie.extras[i].id;
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
}
