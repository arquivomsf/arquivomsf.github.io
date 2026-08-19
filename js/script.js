function start() {
    setTab("",'jogos_page');
    resetarString();
    carregarDados();
}

function carregarDados() {
    fetch_dados("geral","dados.json","franquia","franquias.json");
    carregar_consoles_temas("normal","");
}

function carregar_itens() {
    for (var i = 0; i<dados_geral.jogos.length; i++){
        let jogo_nome = dados_geral.jogos[i].nome;
        let jogo_console_sigla = dados_geral.jogos[i].console;
        let jogo_console_nome = get_console_name(jogo_console_sigla);
        let jogo_nome_curto = dados_geral.jogos[i].curto;
        let jogo_tags = dados_geral.jogos[i].tags;
        let nome_processado = pesquisa_processar_string(jogo_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            create_item("","jogo","jogos_content_list",i,jogo_console_sigla,jogo_nome,jogo_nome_curto);
        }
    }

    for (var i = 0; i<dados_geral.standalone.length; i++){
        let standalone_nome = dados_geral.standalone[i].nome;
        let standalone_imagem = dados_geral.standalone[i].imagem;
        let standalone_console_sigla = "etc";
        let standalone_nome_curto = dados_geral.standalone[i].curto;
        let standalone_tags = dados_geral.standalone[i].tags;
        let nome_processado = pesquisa_processar_string(standalone_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            let standalone_duracao = gerar_timestamp(dados_geral.standalone[i].duracao.horas,dados_geral.standalone[i].duracao.minutos,dados_geral.standalone[i].duracao.segundos);
            let standalone_plataforma = dados_geral.standalone[i].plataforma;
            let standalone_link = dados_geral.standalone[i].links[standalone_plataforma];
            create_item("","standalone","standalone_content_list",i,standalone_console_sigla,standalone_nome,standalone_nome_curto,standalone_imagem,standalone_plataforma,standalone_duracao);
        }
    }

    for (var i = 0; i<dados_geral.outros.length; i++){
        let outros_nome = dados_geral.outros[i].nome;
        let outros_imagem = dados_geral.outros[i].imagem;
        let outros_console_sigla = "outros";
        let outros_nome_curto = dados_geral.outros[i].curto;
        let outros_categoria = dados_geral.outros[i].categoria;
        let outros_tags = dados_geral.outros[i].tags;
        let nome_processado = pesquisa_processar_string(outros_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            create_item("","outro","outros_content_list",i,outros_console_sigla,outros_nome,outros_nome_curto,outros_imagem,"","","","",outros_categoria);
        }
    }

    for (var i = 0; i<Object.keys(dados_franquia).length; i++) {
        let franquia_id = Object.keys(dados_franquia)[i];
        let franquia_nome = dados_franquia[franquia_id].nome;
        let franquia_tags = dados_franquia[franquia_id].tags;
        let franquia_jogos = dados_franquia[franquia_id].jogos;
        let nome_processado = pesquisa_processar_string(franquia_tags);

        let franquia_capa = dados_franquia[franquia_id].capas;

        let capas_html;

        if (franquia_capa.length == 1) {
            capas_html = `
                <div class="w-full h-[180px] flex flex-row franquia_album">
                    <img src="capas/${franquia_capa[0]}.webp" class="h-[180px] object-contain">
                </div>
            `
        }

        if (franquia_capa.length == 2) {
            capas_html = `
                <div class="w-full h-[180px] flex flex-row franquia_album">
                    <img src="capas/${franquia_capa[0]}.webp" class="h-[180px] object-contain mr-[-60px] z-4 ring-2 ring-white">
                    <img src="capas/${franquia_capa[1]}.webp" class="h-[180px] object-contain z-3 ring-2 ring-white">
                </div>
            `
        }

        if (franquia_capa.length >= 3) {
            capas_html = `
                <div class="w-full h-[180px] flex flex-row franquia_album">
                    <img src="capas/${franquia_capa[0]}.webp" class="h-[180px] object-contain mr-[-60px] z-4 ring-2 ring-white">
                    <img src="capas/${franquia_capa[1]}.webp" class="h-[180px] object-contain mr-[-60px] z-3 ring-2 ring-white">
                    <img src="capas/${franquia_capa[2]}.webp" class="h-[180px] object-contain ring-2 ring-white">
                </div>
            `
        }

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            document.querySelector(".franquias_content_list").innerHTML += `
                <div class="franquia_item franquia_${franquia_id} p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                    <a href="franquia?id=${franquia_id}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                        <div class="relative h-auto">
                            <div class="w-auto h-[180px]">
                                ${capas_html}
                            </div>
                        </div>
                        <b class="text-center franquia_titulo_${franquia_id}">${franquia_nome}</b>
                    </a>
                </div>`;
        }
    }
}

function resetarJogos(){
    document.querySelector(".jogos_content_list").innerHTML = "";
    document.querySelector(".standalone_content_list").innerHTML = "";
    document.querySelector(".outros_content_list").innerHTML = "";
    document.querySelector(".franquias_content_list").innerHTML = "";
}
