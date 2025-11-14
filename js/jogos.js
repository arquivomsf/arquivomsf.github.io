var consoleAtual;
var jogoAtual;

function carregarDados() {
  setTab("",'jsonParent');
  procurarParam();
  fetch_dados("jogo",`video/${consoleAtual}/${jogoAtual}/series.json`);
  carregar_consoles_temas("jogo",jogoAtual);
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('id');
}

function carregar_itens() {
  if (dados_jogo.hasOwnProperty("episodios")) {
    let serie_nome = dados_jogo.episodios[0].nome;
    let serie_imagem = dados_jogo.episodios[0].imagem;
    let serie_quantidade = dados_jogo.episodios[0].quantidade;
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

  if (dados_jogo.hasOwnProperty("vodsoficiais")) {
    let serie_nome = dados_jogo.vodsoficiais[0].nome;
    let serie_imagem = dados_jogo.vodsoficiais[0].imagem;
    let serie_link = dados_jogo.vodsoficiais[0].link;
    let serie_quantidade = dados_jogo.vodsoficiais[0].quantidade;
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

  if (dados_jogo.hasOwnProperty("vodsarquivo")) {
    let serie_nome = dados_jogo.vodsarquivo[0].nome;
    let serie_imagem = dados_jogo.vodsarquivo[0].imagem;
    let serie_quantidade = dados_jogo.vodsarquivo[0].quantidade;
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

  if (dados_jogo.hasOwnProperty("analise")) {
    let serie_nome = dados_jogo.analise[0].nome;
    let serie_imagem = dados_jogo.analise[0].imagem;
    let serie_link = dados_jogo.analise[0].link;
    let serie_duracao = gerar_timestamp(dados_jogo.analise[0].duracao.horas,dados_jogo.analise[0].duracao.minutos,dados_jogo.analise[0].duracao.segundos);
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
}
