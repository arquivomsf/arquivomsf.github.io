var pathnameArray = window.location.pathname.split("/");
var franquiaAtual;

function start() {
    resetarString();
    carregarDados();
}

function carregarDados() {
    procurarParam();
    fetch_dados("geral","dados.json");
    fetch_dados("franquia","franquias.json");
    carregar_consoles_temas("normal","");
}

function procurarParam() {
    let searchParams = new URLSearchParams(window.location.search);
    franquiaAtual = searchParams.get('id');
}

function carregar_itens() {
    let franquia_atual_itens = [];

    for (var i = 0; i<dados_geral.jogos.length; i++) {
        if (dados_franquia[franquiaAtual].jogos.includes(dados_geral.jogos[i].curto)) {
            franquia_atual_itens[dados_geral.jogos[i].curto] = dados_geral.jogos[i];
        }
    }

    let franquia_atual_organizada = organizar_jogos(dados_franquia[franquiaAtual].jogos, Object.keys(franquia_atual_itens), franquia_atual_itens);

    for (var i = 0; i<franquia_atual_organizada.length; i++) {
        let jogo_nome = franquia_atual_organizada[i].nome;
        let jogo_console_sigla = franquia_atual_organizada[i].consigla;
        let jogo_console_nome = get_console_name(jogo_console_sigla);
        let jogo_nome_curto = franquia_atual_organizada[i].curto;
        let jogo_tags = franquia_atual_organizada[i].tags;
        let nome_processado = pesquisa_processar_string(jogo_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
                document.querySelector(".jogos_content_list").innerHTML += `
                    <div class="bg-white flex flex-col divide-y-1 divide-gray-300 shadow-md rounded-md border border-gray-200 cursor-pointer">
                        <a href="jogo?con=${jogo_console_sigla}&id=${jogo_nome_curto}" class="p-2 flex flex-col flex-auto gap-2 items-center transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                            <div class="w-auto h-[225px]">
                                <img src="capas/${jogo_console_sigla}/${jogo_nome_curto}.png" class="h-[225px] object-contain">
                            </div>
                            <b class="jogo_titulo text-center">${jogo_nome}</b>
                        </a>
                        <a href="console?id=${jogo_console_sigla}" class="p-2 flex flex-row divide-x-1 divide-gray-300 flex-1 gap-2 items-center transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                            <p class="py-1 px-2 h-min w-fit m-auto flex-auto text-center">${jogo_console_nome}</p>
                            <p class="py-1 px-2 h-min w-fit m-auto flex-1 text-center">${jogo_console_sigla.toUpperCase()}</p>
                        </a>
                    </div>`;
        }
    }

    document.querySelector(".navbar-two").innerHTML = `${dados_franquia[franquiaAtual].nome}`;
    document.title = `Arquivo - ${dados_franquia[franquiaAtual].nome}`;
    document.querySelector('meta[property="og:title"]').setAttribute("content", `Arquivo - ${dados_franquia[franquiaAtual].nome}`);
}

function organizar_jogos(ordem, jogos, itens) {
    let resultado = [];
    for (var i = 0; i<ordem.length; i++) {
        let agora = ordem[i];
        for (var ij = 0; ij<jogos.length; ij++) {
            if (jogos[ij] == agora) {
                resultado[i] = itens[agora];
            }
        }
    }
    return resultado;
}

function resetarJogos(){
    document.querySelector(".jogos_content_list").innerHTML = "";
}
