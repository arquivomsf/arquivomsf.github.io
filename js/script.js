function start() {
    setTab("",'jogosParent');
    resetarString();
    setPesquisa();
    carregarDados();
}

function carregarDados() {
    fetch_dados("geral","dados.json");
    carregar_consoles_temas("normal","");
}

function carregar_itens() {
    for (var i = 0; i<dados_geral.jogos.length; i++){
        let jogo_nome = dados_geral.jogos[i].nome;
        let jogo_console_nome = dados_geral.jogos[i].console;
        let jogo_console_sigla = dados_geral.jogos[i].consigla;
        let jogo_nome_curto = dados_geral.jogos[i].curto;
        let jogo_tags = dados_geral.jogos[i].tags;
        let nome_processado = pesquisa_processar_texto(jogo_tags);

        if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
            document.querySelector("#jogosParent").innerHTML += `
                <div class="col game-item">
                    <a href="jogo?con=${jogo_console_sigla}&id=${jogo_nome_curto}" class="blacklink">
                        <div class="thumbnail">
                            <img src="capas/${jogo_console_sigla}/${jogo_nome_curto}.png" alt="" class="linkicon ratio ratio-16x9 capa">
                            <span class="video-length"></span>
                        </div>
                        <span class="flow-text title">${jogo_nome}</span></a><br>
                    <a href="console?id=${jogo_console_sigla}" class="blacklink"><span class="flow-text subtitle">${jogo_console_nome}</span></a>
                </div>`;
        }
    }

    for (var i = 0; i<dados_geral.standalone.length; i++){
        let standalone_nome = dados_geral.standalone[i].nome;
        let standalone_imagem = dados_geral.standalone[i].imagem;
        let standalone_console_sigla = dados_geral.standalone[i].consigla;
        let standalone_nome_curto = dados_geral.standalone[i].curto;
        let standalone_tags = dados_geral.standalone[i].tags;
        let nome_processado = pesquisa_processar_texto(standalone_tags);
        
        if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
            let standalone_duracao = gerar_timestamp(dados_geral.standalone[i].duracao.horas,dados_geral.standalone[i].duracao.minutos,dados_geral.standalone[i].duracao.segundos);
            let standalone_plataforma = dados_geral.standalone[i].plataforma;
            let standalone_link_youtube = dados_geral.standalone[i].linkyt;
            if (standalone_plataforma == "gdrive" || standalone_plataforma == "archive") {
                document.querySelector("#standParent").innerHTML += `
                    <div class="col stand-item">
                    <a href="embed?con=${standalone_console_sigla}&jogo=${standalone_nome_curto}&fonte=${standalone_plataforma}" class="blacklink">
                        <div class="thumbnail">
                            <img src="video/${standalone_console_sigla}/${standalone_imagem}" alt="" class="img-fluid linkicon">
                            <span class="video-length"><i class="fa fa-fw fa-file-video-o"></i>${standalone_duracao}</span>
                        </div>
                        <span class="flow-text title">${standalone_nome}</span>
                    </a>
                    </div>`;
            } else if (standalone_plataforma == "youtube") {
                document.querySelector("#standParent").innerHTML += `
                    <div class="col stand-item">
                    <a href="${standalone_link_youtube}" target="_blank" class="blacklink">
                        <div class="thumbnail">
                            <img src="video/${standalone_console_sigla}/${standalone_imagem}" alt="" class="img-fluid linkicon">
                            <span class="video-length"><i class="fa fa-fw fa-youtube-play"></i>${standalone_duracao}</span>
                        </div>
                        <span class="flow-text title">${standalone_nome}</span>
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
        let nome_processado = pesquisa_processar_texto(outros_tags);

        if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
        document.querySelector("#outrosParent").innerHTML += `
            <div class="col game-item">
                <a href="serie?con=${outros_console_sigla}&jogo=${outros_nome_curto}" class="blacklink">
                    <div class="thumbnail">
                        <img src="video/${outros_console_sigla}/${outros_nome_curto}/${outros_imagem}" alt="" class="img-fluid linkicon">
                        <span class="video-length"></span>
                    </div>
                    <span class="flow-text title">${outros_nome}</span>
                </a>
            </div>`;
        }
    }
}

function resetarJogos(){
    document.querySelector("#jogosParent").innerHTML = "";
    document.querySelector("#outrosParent").innerHTML = "";
    document.querySelector("#standParent").innerHTML = "";
}
