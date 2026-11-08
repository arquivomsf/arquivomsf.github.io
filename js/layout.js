// Barra de navegação + menu lateral, iguais em todas as páginas.
// Cada página chama, no lugar onde antes ficava esse HTML:
//
//   <script>montar_layout({ tipo: "simples", titulo: "Estatísticas", atual: "stats" })</script>
//
// Opções:
//   tipo    "home"      página inicial (só o botão de início)
//           "simples"   início → [titulo]
//           "console"   início → Console (escrito por js/consoles.js e video.js em .navbar-two / .navbar-two-sigla)
//           "franquia"  início → [titulo "Franquia"], com botão de busca
//           "jogo"      início → Console → Jogo (a barra de jogo para celular é escrita por jogos.js, series.js e video.js)
//   titulo  texto do último item (só "simples" e "franquia")
//   atual   página que o menu lateral deve deixar com link vazio: "off", "stats" ou "ripdlive"
//   raiz    caminho até a raiz do site: "" (padrão), "../" (pasta ripdlive) ou o endereço completo (404.html)

const LAYOUT_BOTAO = "text-center cursor-pointer py-2.5 px-3.5 rounded-sm bg-inherit transition-all duration-150 hover:bg-gray-500 focus:bg-gray-500";
const LAYOUT_BARRA = "px-2 bg-gray-800 sticky top-0 w-[100%] text-white flex flex-row sm:flex-row items-center z-10";
const LAYOUT_ITEM_MENU = "nav-link px-2 py-3 float-left w-auto border-none block outline-none transition-all duration-150 hover:bg-black/20 focus:bg-black/20";
const LAYOUT_TITULO_MENU = "px-2 py-4 float-left w-auto border-none block outline-none font-bold";

//links do "Mais links" do menu lateral: [página (para o "atual"), caminho, texto]
const LAYOUT_LINKS = [
    ["off", "off", "OFF (Lost Media)"],
    ["stats", "stats", "Estatísticas"],
    ["ripdlive", "ripdlive/sobre", "RIP DLive"]
];

function layout_item(conteudo) {
    return `<div class="mt-3">${conteudo}</div>`;
}

//"hidden sm:inline" (ou md) para esconder em tela pequena, e o inverso para a versão curta (sigla)
function layout_navegacao(tipo, titulo) {
    if (tipo == "home") return "";

    let divisor = layout_item(`<span class="navbar-divider select-none py-2.5 px-3.5">→</span>`);

    if (tipo == "simples") return divisor + layout_item(`<a href="" class="navbar-two ${LAYOUT_BOTAO}">${titulo}</a>`);
    if (tipo == "franquia") return divisor + layout_item(`<a href="" class="navbar-two ${LAYOUT_BOTAO} inline">${titulo}</a>`);

    let quebra = (tipo == "console") ? "sm" : "md";
    let console_e_sigla =
        layout_item(`<a href="" class="navbar-two ${LAYOUT_BOTAO} hidden ${quebra}:inline">Console</a>`) +
        layout_item(`<a href="" class="navbar-two-sigla ${LAYOUT_BOTAO} ${quebra}:hidden">Sigla</a>`);

    if (tipo == "console") return divisor + console_e_sigla;

    //jogo: no celular o jogo vai para uma segunda barra (ver layout_barra_jogo_celular)
    return divisor + console_e_sigla +
        layout_item(`<span class="navbar-divider select-none py-2.5 px-3.5 hidden md:inline">→</span>`) +
        layout_item(`<span class="navbar-divider navbar-divider-down select-none py-2.5 px-3.5 md:hidden">↴</span>`) +
        layout_item(`<a href="" class="navbar-three ${LAYOUT_BOTAO} truncate hidden md:inline">Jogo</a>`);
}

function layout_barra_jogo_celular() {
    return `
    <nav class="${LAYOUT_BARRA} navbar-default navbar-game-mobile md:hidden">
        <div class="tab w-[100%] flex flex-row justify-between">
            <div class="w-full mb-3"><a href="" class="navbar-three-mobile text-center cursor-pointer w-full py-2.5 px-3.5 rounded-sm bg-inherit transition-all duration-150 hover:bg-gray-500 focus:bg-gray-500 text-base/7">Jogo</a></div>
        </div>
    </nav>`;
}

function layout_menu_lateral(atual, raiz) {
    let links = LAYOUT_LINKS.map(([pagina, caminho, texto]) =>
        `<a href="${(pagina == atual) ? "" : raiz + caminho}" class="${LAYOUT_ITEM_MENU}">${texto}</a>`).join("\n          ");

    return `
    <div class="hidden px-3 bg-white h-full w-[90%] sm:w-[400px] fixed! z-12 overflow-auto top-0 right-0 animate-right flex flex-col" id="sidebar_main">
        <div class="block">
            <button class="float-right w-max border-none block outline-none tablinks cursor-pointer m-2 py-2 px-3.5 rounded-sm bg-inherit transition-all duration-150 hover:bg-black/20 focus:bg-black/20" onclick="sidebar_close()"><i class="fa-solid fa-close"></i></button>
        </div>
        <span class="${LAYOUT_TITULO_MENU}">Consoles</span>
        <div class="console_list flex flex-col mb-3">

        </div>
        <span class="${LAYOUT_TITULO_MENU}">Temas</span>
        <div class="themes_list flex flex-col mb-3">
          <select onchange="setTema(this);" name="choose_theme" id="themes_select" autocomplete="off" class="nav-link px-2 py-3 float-left w-auto border-1 block outline-none transition-all duration-150 hover:bg-black/20 focus:bg-black/20"></select>
        </div>
        <span class="${LAYOUT_TITULO_MENU}">Mais links</span>
        <div class="maislinks_list flex flex-col mb-3">
          ${links}
        </div>
    </div>

    <div class="hidden fixed w-[100%] h-[100%] top-0 left-0 right-0 bottom-0 bg-gray-800 z-10 opacity-50 animate-opacity" onclick="sidebar_close()" id="sidebar_overlay"></div>`;
}

function layout_html({ tipo = "simples", titulo = "", atual = "", raiz = "" }) {
    let tem_busca = (tipo == "home" || tipo == "console" || tipo == "franquia");
    let botao_busca = tem_busca
        ? `<div class="search-btn tablinks cursor-pointer my-1 py-2 px-3.5 rounded-sm bg-inherit transition-all duration-150 hover:bg-gray-500 focus:bg-gray-500" onclick="abrir_pesquisa()"><i class="fa-solid fa-search"></i></div>`
        : "";

    //na página inicial, digitar "debug()" na busca ativa o modo de debug
    let ao_digitar = (tipo == "home") ? "pesquisarJogo();enable_debug_from_page()" : "pesquisarJogo()";
    let link_inicio = (tipo == "home") ? "" : "https://arquivomsf.github.io/";

    return `
    <nav class="${LAYOUT_BARRA} navbar-default">
        <div class="tab w-[100%] flex flex-row justify-between">
            <div class="flex flex-row">
                ${layout_item(`<a href="${link_inicio}" class="navbar-home ${LAYOUT_BOTAO}"><i class="fa-regular fa-home"></i></a>`)}
                ${layout_navegacao(tipo, titulo)}
            </div>

            <div class="flex flex-row">
                ${botao_busca}
                <div class="cursor-pointer w-min my-1 py-2 px-3.5 rounded-sm bg-inherit transition-all duration-150 hover:bg-gray-500 focus:bg-gray-500" onclick="sidebar_open()"><i class="fa-solid fa-bars"></i></div>
            </div>
        </div>
    </nav>
    ${(tipo == "jogo") ? layout_barra_jogo_celular() : ""}
    <nav class="${LAYOUT_BARRA} hidden navbar-search">
        <div class="tab w-[100%] flex flex-row">
            <div class="m-1 w-full"><input id="inputPesquisa" inputmode="search" oninput="${ao_digitar}" onblur="checarStringVazia()" class="p-1 rounded-sm cursor-text bg-inherit h-full w-full transition-all duration-150 border-1 border-white outline-0 animate-abrir focus:bg-gray-700" type="text"></div>

            <button class="tablinks cursor-pointer my-1 py-2 px-3.5 rounded-sm bg-inherit transition-all duration-150 float-right w-max hover:bg-gray-500 focus:bg-gray-500" onclick="fechar_pesquisa()"><i class="fa-solid fa-close"></i></button>
        </div>
    </nav>
    ${layout_menu_lateral(atual, raiz)}`;
}

//escreve o layout no lugar da tag <script> que chamou esta função
function montar_layout(opcoes) {
    document.currentScript.insertAdjacentHTML("beforebegin", layout_html(opcoes));
}
