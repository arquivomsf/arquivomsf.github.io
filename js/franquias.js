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

/*
const applyCustomOrder = (arr, desiredOrder) => {
  const orderForIndexVals = desiredOrder.slice(0).reverse();
  arr.sort((a, b) => {
    const aIndex = -orderForIndexVals.indexOf(a);
    const bIndex = -orderForIndexVals.indexOf(b);
    return aIndex - bIndex;
  });
}
*/

function carregar_itens() {
    let franquia_atual_itens = [];

    /*
    let item_consoles = [];
    let item_ids = [];

    for (var i = 0; i<dados_geral.jogos.length; i++) {
        for (var ii = 0; ii<dados_franquia[franquiaAtual].jogos.length; ii++) {
            item_consoles[ii] = dados_franquia[franquiaAtual].jogos[ii].split("/")[0];
            item_ids[ii] = dados_franquia[franquiaAtual].jogos[ii].split("/")[1];

            //console.log("item carregado: "+item_consoles[ii]+" / "+item_ids[ii]);

            //console.log(item_consoles);
            //console.log(item_ids);
        }

        //if (dados_franquia[franquiaAtual].jogos.includes(dados_geral.jogos[i].curto)) {
        //console.log(dados_geral.jogos[i].curto);
        if (item_ids.includes(dados_geral.jogos[i].curto)) {
            let jogo_atual = dados_geral.jogos[i];
            console.log("jogo atual: "+jogo_atual.nome+" ("+jogo_atual.consigla+")");
            //franquia_atual_itens.push(dados_geral.jogos[i].curto);
            if (jogo_atual.consigla == item_consoles[i]) { console.log("é")}
            franquia_atual_itens[jogo_atual.curto] = jogo_atual;

            //applyCustomOrder(franquia_atual_itens, dados_franquia[franquiaAtual].jogos);
        }
    }
    */

    //funcionando sem verificar console
    
    for (var i = 0; i<dados_geral.jogos.length; i++) {
        if (dados_franquia[franquiaAtual].jogos.includes(dados_geral.jogos[i].curto)) {
            franquia_atual_itens[dados_geral.jogos[i].curto] = dados_geral.jogos[i];
        }
    }
    

    //console.log("dados_geral.jogos");
    //console.log(dados_geral.jogos);
    //console.log("franquia_atual_itens");
    //console.log(franquia_atual_itens);
    //console.log("dados_franquia[franquiaAtual].jogos");
    //console.log(dados_franquia[franquiaAtual].jogos);
    //console.log("Object.keys(franquia_atual_itens)");
    //console.log(Object.keys(franquia_atual_itens))

    let franquia_atual_organizada = organizar_jogos(dados_franquia[franquiaAtual].jogos, Object.keys(franquia_atual_itens), franquia_atual_itens);
    //console.log(franquia_atual_organizada);

    for (var i = 0; i<franquia_atual_organizada.length; i++) {
        //console.log(franquia_atual_organizada[i]);

        let jogo_nome = franquia_atual_organizada[i].nome;
        let jogo_console_sigla = franquia_atual_organizada[i].consigla;
        let jogo_console_nome = get_console_name(jogo_console_sigla);
        let jogo_nome_curto = franquia_atual_organizada[i].curto;
        let jogo_tags = franquia_atual_organizada[i].tags;
        let nome_processado = pesquisa_processar_string(jogo_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            //if (dados_franquia[franquiaAtual].jogos.includes(dados_geral.jogos[i].curto)) {
                //console.log(dados_geral.jogos[i].curto)

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
            //}
        }
    }

    /*
    for (var i = 0; i<dados_franquia[franquiaAtual].jogos.length; i++) {
        //console.log(dados_franquia[franquiaAtual].jogos[i]);
        //console.log(Object.keys(franquia_atual_itens)[i])
        if (dados_franquia[franquiaAtual].jogos[i] == Object.keys(franquia_atual_itens)[i]) console.log("é")
    }
    */
    /*
    for (var i = 0; i<dados_geral.jogos.length; i++) {
        let jogo_nome = dados_geral.jogos[i].nome;
        let jogo_console_sigla = dados_geral.jogos[i].consigla;
        let jogo_console_nome = get_console_name(jogo_console_sigla);
        let jogo_nome_curto = dados_geral.jogos[i].curto;
        let jogo_tags = dados_geral.jogos[i].tags;
        let nome_processado = pesquisa_processar_string(jogo_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            if (dados_franquia[franquiaAtual].jogos.includes(dados_geral.jogos[i].curto)) {
                //console.log(dados_geral.jogos[i].curto)

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
    }
    */

    document.querySelector(".navbar-two").innerHTML = `${dados_franquia[franquiaAtual].nome}`;
    document.title = `Arquivo - ${dados_franquia[franquiaAtual].nome}`;
    document.querySelector('meta[property="og:title"]').setAttribute("content", `Arquivo - ${dados_franquia[franquiaAtual].nome}`);
}

function organizar_jogos(ordem, jogos, itens) {
    let resultado = [];
    for (var i = 0; i<ordem.length; i++) {
        let agora = ordem[i];
        //console.log("agora: "+agora);

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
