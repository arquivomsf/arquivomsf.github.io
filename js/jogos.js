var consoleAtual;
var jogoAtual;

function carregarDados() {
  //setTab("",'jsonParent');
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
    document.querySelector(".series_content_list").innerHTML += `
        <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
            <a href="serie?con=${consoleAtual}&jogo=${jogoAtual}&serie=episodios" class="p-1 flex flex-col flex-auto gap-2 items-center">
                <div class="relative h-auto">
                    <img src="video/${consoleAtual}/${jogoAtual}/episodios/${serie_imagem}" class="w-auto h-auto aspect-video object-contain">
                    <div class="playlist-duracao z-2 absolute h-full w-[30%] bottom-0 right-0 bg-black/70">
                        <span class="z-2 absolute bottom-1/2 translate-1/2 right-1/2 px-1 text-white inline-block align-middle"><i class="fa fa-fw fa-list"></i>${serie_quantidade}</span>
                    </div>
                </div>
                <b class="text-center">${serie_nome}</b>
            </a>
        </div>`;
  }

  if (dados_jogo.hasOwnProperty("vodsoficiais")) {
    let serie_nome = dados_jogo.vodsoficiais[0].nome;
    let serie_imagem = dados_jogo.vodsoficiais[0].imagem;
    let serie_link = dados_jogo.vodsoficiais[0].link;
    let serie_quantidade = dados_jogo.vodsoficiais[0].quantidade;
    document.querySelector(".series_content_list").innerHTML += `
        <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
            <a href="${serie_link}" class="p-1 flex flex-col flex-auto gap-2 items-center" target="_blank">
                <div class="relative h-auto">
                    <img src="video/${consoleAtual}/${jogoAtual}/vodsoficiais.${serie_imagem}" class="w-auto h-auto aspect-video object-contain">
                    <div class="playlist-duracao z-2 absolute h-full w-[30%] bottom-0 right-0 bg-black/70">
                        <span class="z-2 absolute bottom-1/2 translate-1/2 right-1/2 px-1 text-white inline-block align-middle"><i class="fa fa-fw fa-list"></i>${serie_quantidade}</span>
                    </div>
                </div>
                <b class="text-center">${serie_nome}</b>
            </a>
        </div>`;
  }

  if (dados_jogo.hasOwnProperty("vodsarquivo")) {
    let serie_nome = dados_jogo.vodsarquivo[0].nome;
    let serie_imagem = dados_jogo.vodsarquivo[0].imagem;
    let serie_quantidade = dados_jogo.vodsarquivo[0].quantidade;
    document.querySelector(".series_content_list").innerHTML += `
        <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
            <a href="serie?con=${consoleAtual}&jogo=${jogoAtual}&serie=vods" class="p-1 flex flex-col flex-auto gap-2 items-center">
                <div class="relative h-auto">
                    <img src="video/${consoleAtual}/${jogoAtual}/vods/${serie_imagem}" class="w-auto h-auto aspect-video object-contain">
                    <div class="playlist-duracao z-2 absolute h-full w-[30%] bottom-0 right-0 bg-black/70">
                        <span class="z-2 absolute bottom-1/2 translate-1/2 right-1/2 px-1 text-white inline-block align-middle"><i class="fa fa-fw fa-list"></i>${serie_quantidade}</span>
                    </div>
                </div>
                <b class="text-center">${serie_nome}</b>
            </a>
        </div>`;
  }

  if (dados_jogo.hasOwnProperty("analise")) {
    let serie_nome = dados_jogo.analise[0].nome;
    let serie_imagem = dados_jogo.analise[0].imagem;
    let serie_link = dados_jogo.analise[0].link;
    let serie_duracao = gerar_timestamp(dados_jogo.analise[0].duracao.horas,dados_jogo.analise[0].duracao.minutos,dados_jogo.analise[0].duracao.segundos);
    document.querySelector(".series_content_list").innerHTML += `
      <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
          <a href="${serie_link}" class="p-1 flex flex-col flex-auto gap-2 items-center" target="_blank">
              <div class="relative h-auto">
                  <img src="video/${consoleAtual}/${jogoAtual}/analise.${serie_imagem}" class="w-auto h-auto aspect-video object-contain">
                  <div class="video-duracao z-2 absolute bottom-[3%] right-[3%] bg-black/70">
                      <span class="px-1 text-white"><i class="fa fa-fw fa-youtube-play"></i>${serie_duracao}</span>
                  </div>
              </div>
              <b class="text-center">${serie_nome}</b>
          </a>
      </div>`;
  }
}
