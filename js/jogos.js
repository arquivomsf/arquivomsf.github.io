var consoleAtual;
var jogoAtual;

function carregarDados() {
  setTab("",'jsonParent');
  procurarParam();
  carregarVideos();
  carregar_consoles_temas("jogo",jogoAtual);
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('id');
}

function carregarVideos() {
    fetch(`video/${consoleAtual}/${jogoAtual}/series.json`)
      .then(response => response.json())
      .then(data => {
        if (data.hasOwnProperty("episodios")) {
          let serie_nome = data.episodios[0].nome;
          let serie_imagem = data.episodios[0].imagem;
          let serie_quantidade = data.episodios[0].quantidade;
          document.querySelector("#jsonParent").innerHTML += `
              <div class="col">
                <a href="serie?con=${consoleAtual}&jogo=${jogoAtual}&serie=episodios" class="blacklink">
                  <div class="thumbnail">
                    <img src="video/${consoleAtual}/${jogoAtual}/episodios/${serie_imagem}" alt="" class="img-fluid linkicon">
                    <div class="playlist-length">
                      <div class="playlist-info-wrapper">
                        <i class="fa fa-list"></i>
                        <span>${serie_quantidade}</span>
                      </div>
                    </div>
                  </div>
                  <span class="flow-text title">${serie_nome}</span>
                </a>
              </div>`;
        }

        if (data.hasOwnProperty("vodsoficiais")) {
          let serie_nome = data.vodsoficiais[0].nome;
          let serie_imagem = data.vodsoficiais[0].imagem;
          let serie_link = data.vodsoficiais[0].link;
          let serie_quantidade = data.vodsoficiais[0].quantidade;
          document.querySelector("#jsonParent").innerHTML += `
              <div class="col">
                <a href="${serie_link}" target="_blank" class="blacklink">
                  <div class="thumbnail">
                    <img src="video/${consoleAtual}/${jogoAtual}/vodsoficiais.${serie_imagem}" alt="" class="img-fluid linkicon">
                    <div class="playlist-length">
                      <div class="playlist-info-wrapper">
                        <i class="fa fa-list"></i>
                        <span>${serie_quantidade}</span>
                      </div>
                    </div>
                  </div>
                  <span class="flow-text title">${serie_nome}</span>
                </a>
              </div>`;
        }

        if (data.hasOwnProperty("vodsarquivo")) {
          let serie_nome = data.vodsarquivo[0].nome;
          let serie_imagem = data.vodsarquivo[0].imagem;
          let serie_quantidade = data.vodsarquivo[0].quantidade;
          document.querySelector("#jsonParent").innerHTML += `
              <div class="col">
                <a href="serie?con=${consoleAtual}&jogo=${jogoAtual}&serie=vods" class="blacklink">
                  <div class="thumbnail">
                    <img src="video/${consoleAtual}/${jogoAtual}/vods/${serie_imagem}" alt="" class="img-fluid linkicon">
                    <div class="playlist-length">
                      <div class="playlist-info-wrapper">
                        <i class="fa fa-list"></i>
                        <span>${serie_quantidade}</span>
                      </div>
                    </div>
                  </div>
                  <span class="flow-text title">${serie_nome}</span>
                </a>
              </div>`;
        }

        if (data.hasOwnProperty("analise")) {
          let serie_nome = data.analise[0].nome;
          let serie_imagem = data.analise[0].imagem;
          let serie_link = data.analise[0].link;
          let serie_duracao = gerar_timestamp(data.analise[0].duracao.horas,data.analise[0].duracao.minutos,data.analise[0].duracao.segundos);
          document.querySelector("#jsonParent").innerHTML += `
            <div class="col">
              <a href="${serie_link}" target="_blank" class="blacklink">
                <div class="thumbnail">
                  <img src="video/${consoleAtual}/${jogoAtual}/analise.${serie_imagem}" alt="" class="img-fluid linkicon">
                  <span class="video-length"><i class="fa fa-fw fa-youtube-play"></i>${serie_duracao}</span>
                </div>
                <span class="flow-text title">${serie_nome}</span>
              </a>
            </div>`;
        }

      })
}
