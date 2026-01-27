var consoleAtual;
var jogoAtual;
var serie_path;

function carregarDados() {
  setTab("",'ep_page');
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
      if (video_plataforma == "gdrive" || video_plataforma == "archive") {
          document.querySelector(".ep_content_list").innerHTML += `
          <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
            <a href="embed?con=${consoleAtual}&jogo=${jogoAtual}&serie=${serieAtual}&fonte=${video_plataforma}&id=${i}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                <div class="relative h-auto">
                    <img src="${serie_path}/${i+1}.${video_imagem}" class="w-auto h-auto aspect-video object-contain">
                    <div class="z-2 absolute bottom-[3%] right-[3%] bg-black/70">
                        <span class="px-1 text-white"><i class="fa fa-fw fa-file-video-o"></i>${video_duracao}</span>
                    </div>
                </div>
                <b class="text-center">${video_nome}</b>
            </a>
          </div>`;
      } else if (video_plataforma == "youtube") {
          document.querySelector(".ep_content_list").innerHTML += `
          <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
            <a href="${video_link_youtube}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                <div class="relative h-auto">
                    <img src="${serie_path}/${i+1}.${video_imagem}" class="w-auto h-auto aspect-video object-contain">
                    <div class="z-2 absolute bottom-[3%] right-[3%] bg-black/70">
                        <span class="px-1 text-white"><i class="fa fa-fw fa-youtube-play"></i>${video_duracao}</span>
                    </div>
                </div>
                <b class="text-center">${video_nome}</b>
            </a>
          </div>`;
      }
  }

  //itens extras
  document.querySelector(".tabs-navbar").classList.add("hidden");
  if (dados_serie.hasOwnProperty("playlist")) {
    let playlist_nome = dados_serie.playlist[0].nome;
    let playlist_imagem = dados_serie.playlist[0].imagem;
    let playlist_link = dados_serie.playlist[0].link;
    let playlist_quantidade = dados_serie.playlist[0].quantidade;
    document.querySelector(".extras_content_list").innerHTML += `
      <div class="extras-item p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
          <a href="${playlist_link}" class="p-1 flex flex-col flex-auto gap-2 items-center">
              <div class="relative h-auto">
                  <img src="${serie_path}/1.${playlist_imagem}" class="w-auto h-auto aspect-video object-contain">
                  <div class="z-2 absolute h-full w-[30%] bottom-0 right-0 bg-black/70">
                      <span class="z-2 absolute bottom-1/2 translate-1/2 right-1/2 px-1 text-white inline-block align-middle"><i class="fa fa-fw fa-list"></i>${playlist_quantidade}</span>
                  </div>
              </div>
              <b class="text-center">${playlist_nome}</b>
          </a>
      </div>`;
    document.querySelector(".tabs-navbar").classList.remove("hidden");
  }

  if (dados_serie.hasOwnProperty("extras")) {
    for (var i = 0; i<dados_serie.extras.length; i++){
      let extra_nome = dados_serie.extras[i].nome;
      let extra_imagem = dados_serie.extras[i].imagem;
      let extra_link_youtube = dados_serie.extras[i].linkyt;
      let extra_duracao = gerar_timestamp(dados_serie.extras[i].duracao.horas,dados_serie.extras[i].duracao.minutos,dados_serie.extras[i].duracao.segundos);
      let extra_plataforma = dados_serie.extras[i].plataforma;
      let extra_id = dados_serie.extras[i].id;
      if (extra_plataforma == "gdrive" || extra_plataforma == "archive") {
          document.querySelector(".extras_content_list").innerHTML += `
          <div class="extras-item p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
            <a href="embed?con=${consoleAtual}&jogo=${jogoAtual}&serie=${serieAtual}&fonte=${extra_plataforma}&extra=true&id=${extra_id}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                <div class="relative h-auto">
                    <img src="${serie_path}/${extra_imagem}" class="w-auto h-auto aspect-video object-contain">
                    <div class="z-2 absolute bottom-[3%] right-[3%] bg-black/70">
                        <span class="px-1 text-white"><i class="fa fa-fw fa-file-video-o"></i>${extra_duracao}</span>
                    </div>
                </div>
                <b class="text-center">${extra_nome}</b>
            </a>
          </div>`;
      } else if (extra_plataforma == "youtube") {
        document.querySelector(".extras_content_list").innerHTML += `
          <div class="extras-item p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
            <a href="${extra_link_youtube}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                <div class="relative h-auto">
                    <img src="${serie_path}/${extra_imagem}" class="w-auto h-auto aspect-video object-contain">
                    <div class="z-2 absolute bottom-[3%] right-[3%] bg-black/70">
                        <span class="px-1 text-white"><i class="fa fa-fw fa-youtube-play"></i>${extra_duracao}</span>
                    </div>
                </div>
                <b class="text-center">${extra_nome}</b>
            </a>
          </div>`;
      }
      document.querySelector(".tabs-navbar").classList.remove("hidden");
    }
  }
}
