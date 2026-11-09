var consoleAtual;
var jogoAtual;
var serieAtual;
var fonteAtual;
var episodioAtual;
var extra;
var videoAtual;

// Endereço público do site (og:image e links do player precisam ser absolutos)
const URL_DO_SITE = "https://arquivomsf.github.io";

var force_fake_embed_archive = false;

const PLATAFORMAS = ["youtube", "gdrive", "archive", "rumble"];

function carregarDados() {
  procurarParam();
  carregar_embed_fetch();
  carregar_consoles_temas("normal","");
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  consoleAtual = searchParams.get('con');
  jogoAtual = searchParams.get('jogo');
  serieAtual = searchParams.get('serie');
  fonteAtual = searchParams.get('fonte');
  episodioAtual = searchParams.get('id');
  extra = searchParams.get('extra');
  videoAtual = searchParams.get('video');
}

function carregar_embed_fetch() {
  //vídeo standalone
  if (consoleAtual == "etc") {
    fetch_dados("geral","dados.json");
    return;
  }
  //vídeo do series.json de um jogo (tipo "video" com redirect "embed")
  if (videoAtual) {
    fetch_dados("jogo",`video/${consoleAtual}/${jogoAtual}/series.json`,"geral","dados.json");
    return;
  }
  //vídeo outro
  if (consoleAtual == "outros") {
    fetch_dados("serie",`video/${consoleAtual}/${jogoAtual}/videos.json`,"geral","dados.json");
    return;
  }
  //vídeo extra
  if (extra) {
    fetch_dados("serie",`video/${consoleAtual}/${jogoAtual}/${serieAtual}/videos.json`);
    return;
  }
  //vídeo episódio
  fetch_dados("serie",`video/${consoleAtual}/${jogoAtual}/${serieAtual}/videos.json`,"geral","dados.json");
}

// Os 5 tipos de página de vídeo (standalone, vídeo do series.json, extra, outros, episódio) só diferem em:
//   - de onde vem o item (dados.json ou videos.json)
//   - em que pasta ficam as imagens e o chat
//   - se mostram o "breadcrumb" (console → jogo) ou escondem a navegação
// Esta função descobre isso; o resto do fluxo é igual para todos (ver carregar_itens).
function montar_contexto() {
  //vídeo standalone
  if (consoleAtual == "etc") {
    let item = dados_geral.standalone.find(v => v.curto == jogoAtual);
    return { item: item, pasta: "video/etc", thumb: item && item.imagem, chat_padrao: item && item.curto, esconde_navegacao: true };
  }

  //vídeo do series.json: funciona como um independente, só que a imagem e o chat ficam na pasta do jogo e a navegação aparece
  if (videoAtual) {
    let item = dados_jogo.itens.find(v => v.tipo == "video" && v.curto == videoAtual);
    return { item: item, pasta: `video/${consoleAtual}/${jogoAtual}`, thumb: item && item.imagem, chat_padrao: item && item.curto, esconde_navegacao: false };
  }

  let pasta = (consoleAtual == "outros") ? `video/outros/${jogoAtual}` : `video/${consoleAtual}/${jogoAtual}/${serieAtual}`;

  //vídeo extra
  if (extra) {
    let item = dados_serie.extras.find(v => v.id == episodioAtual);
    return { item: item, pasta: pasta, thumb: item && item.imagem, chat_padrao: item && item.id, esconde_navegacao: true };
  }

  //vídeo de "outros" ou episódio: a imagem e o chat são numerados pela posição do vídeo na lista
  let numero = Number(episodioAtual) + 1;
  let item = dados_serie.videos[episodioAtual];
  return { item: item, pasta: pasta, thumb: item && `${numero}.${item.imagem}`, chat_padrao: `${numero}`, esconde_navegacao: false };
}

function carregar_itens() {
  let contexto = montar_contexto();
  let item = contexto.item;

  if (contexto.esconde_navegacao) esconder_navegacao();
  if (!item) return;

  let thumb = `${URL_DO_SITE}/${contexto.pasta}/${contexto.thumb}`;

  if (contexto.esconde_navegacao) document.querySelector(".video-title").innerHTML = `${item.nome}`;
  else montar_navegacao(item.nome);

  document.title = `${item.nome}`;
  document.querySelector('meta[property="og:title"]').setAttribute("content", `${item.nome}`);
  document.querySelector('meta[property="og:image"]').setAttribute("content", thumb);

  montar_player(item, thumb);
  montar_botoes_plataformas(item);

  document.querySelector(".data_string").innerHTML = item.data ?? "";
  mostrar_campo_opcional(item, "nome_original", "original");
  mostrar_campo_opcional(item, "desc", "desc");

  if (Object.hasOwn(item, "chat")) {
    let chat_nome = (item.chat == "") ? contexto.chat_padrao : item.chat;
    document.querySelector("#chatIframe").src = `${contexto.pasta}/${chat_nome}.html`;
    document.querySelector(".chat_container").classList.remove("hidden");
  }
}

function esconder_navegacao() {
  [".navbar-two", ".navbar-two-sigla", ".navbar-three", ".navbar-three-mobile", ".navbar-game-mobile"].forEach(seletor => {
    document.querySelector(seletor).style.display = "none";
  });
  document.querySelectorAll(".navbar-divider").forEach(el => {
    el.style.display = "none";
  });
}

//breadcrumb: Início → Console (ou "Outros") → Jogo
function montar_navegacao(video_nome) {
  let lista_de_jogos;

  if (consoleAtual == "outros") {
    let link = `${URL_DO_SITE}/?tab=outros`;
    document.querySelector(".navbar-two").innerHTML = `Outros`;
    document.querySelector(".navbar-two").href = link;
    document.querySelector(".navbar-two-sigla").innerHTML = `Outros`;
    document.querySelector(".navbar-two-sigla").href = link;
    lista_de_jogos = dados_geral.outros;
  } else {
    let link = `console?id=${consoleAtual}`;
    document.querySelector(".navbar-two").innerHTML = `${get_console_name(consoleAtual)} (${consoleAtual.toUpperCase()})`;
    document.querySelector(".navbar-two").href = link;
    document.querySelector(".navbar-two-sigla").innerHTML = `${consoleAtual.toUpperCase()}`;
    document.querySelector(".navbar-two-sigla").href = link;
    lista_de_jogos = dados_geral.jogos;
  }

  for (var i = 0; i<lista_de_jogos.length; i++){
    if (lista_de_jogos[i].curto == jogoAtual) {
      let link = `jogo?id=${lista_de_jogos[i].curto}&con=${consoleAtual}`;
      document.querySelector(".navbar-three").innerHTML = `${lista_de_jogos[i].nome}`;
      document.querySelector(".navbar-three").href = link;
      document.querySelector(".navbar-three-mobile").innerHTML = `${lista_de_jogos[i].nome}`;
      document.querySelector(".navbar-three-mobile").href = link;
      document.querySelector(".video-title").innerHTML = `${video_nome}`;
    }
  }
}

function montar_player(item, thumb) {
  let video_link = item.links[fonteAtual];

  if (Object.hasOwn(item, "direto") || fonteAtual == "archive" && force_fake_embed_archive) {
    create_fake_embed(video_link, thumb);
    return;
  }

  if (fonteAtual == "archive") video_link = `${video_link}?poster=${thumb}`;
  if (fonteAtual == "perdido") video_link = `video/erro?thumb=${thumb}&title=${item.nome}&original=${video_link}`;
  document.querySelector("#jsonIframe").src = `${embed_replace(video_link, fonteAtual)}`;
}

//mostra um botão para cada plataforma em que o vídeo está disponível
function montar_botoes_plataformas(item) {
  PLATAFORMAS.forEach(plataforma => {
    if (Object.hasOwn(item.links, plataforma) && item.links[plataforma] != "") {
      document.querySelector(".btn-"+plataforma).href = item.links[plataforma];
      document.querySelector(".btn-"+plataforma).classList.remove("hidden");
    }
  });

  if (fonteAtual == "perdido") {
    document.querySelector(".plataformas_label").classList.add("hidden");
    document.querySelector(".plataformas_list").classList.add("hidden");
  }
}

//campos que só aparecem quando existem no JSON (nome_original → .original_*, desc → .desc_*)
function mostrar_campo_opcional(item, campo_json, prefixo_classe) {
  if (!Object.hasOwn(item, campo_json)) return;

  document.querySelector("."+prefixo_classe+"_string").innerHTML = item[campo_json];
  document.querySelector("."+prefixo_classe+"_br").classList.remove("hidden");
  document.querySelector("."+prefixo_classe+"_label").classList.remove("hidden");
  document.querySelector("."+prefixo_classe+"_string").classList.remove("hidden");
}

function create_fake_embed(link,thumb) {
  document.querySelector("#jsonIframe").srcdoc = `
    <head>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <link href="https://arquivomsf.github.io/assets/fonts/fontawesome/css/fontawesome.min.css" rel="stylesheet" />
      <link href="https://arquivomsf.github.io/assets/fonts/fontawesome/css/solid.min.css" rel="stylesheet" />
    </head>
    <body>
      <a href="${link}" target="_blank">
        <img class="w-full h-auto aspect-video" src="${thumb}">
      </a>
      <div class="w-full h-auto aspect-video fixed top-0 left-0 z-2 bg-black opacity-50 pointer-events-none"></div>
      <div class="w-full h-auto aspect-video fixed top-0 left-0 z-3 flex items-center cursor-pointer pointer-events-none">
        <span class="text-white w-full text-center">
          <i class="fa-solid fa-play text-[7em]"></i>
        </span>
      </div>
    </body>
  `;
}
