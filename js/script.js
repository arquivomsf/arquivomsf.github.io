function start() {
    setTab("",'jogos_page');
    resetarString();
    carregarDados();
}

function carregarDados() {
    fetch_dados("geral","dados.json");
    carregar_consoles_temas("normal","");
}

function carregar_itens() {
    for (var i = 0; i<dados_geral.jogos.length; i++){
        let jogo_nome = dados_geral.jogos[i].nome;
        let jogo_console_sigla = dados_geral.jogos[i].consigla;
        let jogo_console_nome = get_console_name(jogo_console_sigla);
        let jogo_nome_curto = dados_geral.jogos[i].curto;
        let jogo_tags = dados_geral.jogos[i].tags;
        let nome_processado = pesquisa_processar_string(jogo_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            document.querySelector(".jogos_content_list").innerHTML += `
                <div class="bg-white flex flex-col divide-y-1 divide-gray-300 shadow-md rounded-md border border-gray-200 cursor-pointer">
                    <a href="jogo?con=${jogo_console_sigla}&id=${jogo_nome_curto}" class="p-2 flex flex-col flex-auto gap-2 items-center transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                        <div class="w-auto h-[225px]">
                            <img src="capas/${jogo_console_sigla}/${jogo_nome_curto}.png" class="h-[225px] object-contain">
                        </div>
                        <b class="text-center">${jogo_nome}</b>
                    </a>
                    <a href="console?id=${jogo_console_sigla}" class="p-2 flex flex-row divide-x-1 divide-gray-300 flex-1 gap-2 items-center transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                        <p class="py-1 px-2 h-min w-fit m-auto flex-auto text-center">${jogo_console_nome}</p>
                        <p class="py-1 px-2 h-min w-fit m-auto flex-1 text-center">${jogo_console_sigla.toUpperCase()}</p>
                    </a>
                </div>`;
        }
    }

    for (var i = 0; i<dados_geral.standalone.length; i++){
        let standalone_nome = dados_geral.standalone[i].nome;
        let standalone_imagem = dados_geral.standalone[i].imagem;
        let standalone_console_sigla = dados_geral.standalone[i].consigla;
        let standalone_nome_curto = dados_geral.standalone[i].curto;
        let standalone_tags = dados_geral.standalone[i].tags;
        let nome_processado = pesquisa_processar_string(standalone_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            let standalone_duracao = gerar_timestamp(dados_geral.standalone[i].duracao.horas,dados_geral.standalone[i].duracao.minutos,dados_geral.standalone[i].duracao.segundos);
            let standalone_plataforma = dados_geral.standalone[i].plataforma;
            let standalone_link_youtube = dados_geral.standalone[i].linkyt;
            if (standalone_plataforma == "gdrive" || standalone_plataforma == "archive") {
                document.querySelector(".standalone_content_list").innerHTML += `
                    <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                        <a href="embed?con=${standalone_console_sigla}&jogo=${standalone_nome_curto}&fonte=${standalone_plataforma}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                            <div class="relative h-auto">
                                <img src="video/${standalone_console_sigla}/${standalone_imagem}" class="w-auto h-auto aspect-video object-contain">
                                <div class="video-duracao z-2 absolute bottom-[3%] right-[3%] bg-black/70">
                                    <span class="px-1 text-white"><i class="fa fa-fw fa-file-video-o"></i>${standalone_duracao}</span>
                                </div>
                            </div>
                            <b class="text-center">${standalone_nome}</b>
                        </a>
                    </div>`;
            } else if (standalone_plataforma == "youtube") {
                document.querySelector(".standalone_content_list").innerHTML += `
                    <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                        <a href="${standalone_link_youtube}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                            <div class="relative h-auto">
                                <img src="video/${standalone_console_sigla}/${standalone_imagem}" class="w-auto h-auto aspect-video object-contain">
                                <div class="video-duracao z-2 absolute bottom-[3%] right-[3%] bg-black/70">
                                    <span class="px-1 text-white"><i class="fa fa-fw fa-youtube-play"></i>${standalone_duracao}</span>
                                </div>
                            </div>
                            <b class="text-center">${standalone_nome}</b>
                        </a>
                    </div>`;
            }
        }
    }

    for (var i = 0; i<dados_geral.outros.length; i++){
        let outros_nome = dados_geral.outros[i].nome;
        let outros_imagem = dados_geral.outros[i].imagem;
        let outros_console_sigla = dados_geral.outros[i].consigla;
        let outros_nome_curto = dados_geral.outros[i].curto;
        let outros_tags = dados_geral.outros[i].tags;
        let nome_processado = pesquisa_processar_string(outros_tags);

        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            document.querySelector(".outros_content_list").innerHTML += `
                <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                    <a href="serie?con=${outros_console_sigla}&jogo=${outros_nome_curto}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                        <div class="relative h-auto">
                            <img src="video/${outros_console_sigla}/${outros_nome_curto}/${outros_imagem}" class="w-auto h-auto aspect-video object-contain">
                        </div>
                        <b class="text-center">${outros_nome}</b>
                    </a>
                </div>`;
        }
    }
}

function resetarJogos(){
    document.querySelector(".jogos_content_list").innerHTML = "";
    document.querySelector(".standalone_content_list").innerHTML = "";
    document.querySelector(".outros_content_list").innerHTML = "";
}
