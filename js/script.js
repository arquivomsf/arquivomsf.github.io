function start() {
    setTab("",'jogosParent');
    resetarString();
    setPesquisa();
    carregarDados();
}

function carregarDados() {
    carregarJogos();
    carregar_consoles_temas("normal","");
}

function carregarJogos() {
    fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.jogos.length; i++){
              let jogo_nome = data.jogos[i].nome;
              let jogo_imagem = data.jogos[i].imagem;
              let jconsole = data.jogos[i].console;
              let jogo_console_sigla = data.jogos[i].consigla;
              let jogo_nome_curto = data.jogos[i].curto;
              let jogo_tags = data.jogos[i].tags;
              let nome_processado = pesquisa_processar_texto(jogo_tags);
              
              if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
                document.querySelector("#jogosParent").innerHTML += `
                    <div class="col game-item">
                        <a href="jogo?con=${jogo_console_sigla}&id=${jogo_nome_curto}" class="blacklink">
                            <div class="thumbnail">
                                <img src="${jogo_imagem}" alt="" class="linkicon ratio ratio-16x9 capa">
                                <span class="video-length"></span>
                            </div>
                            <span class="flow-text title">${jogo_nome}</span></a><br>
                        <a href="console?id=${jogo_console_sigla}" class="blacklink"><span class="flow-text subtitle">${jconsole}</span></a>
                    </div>`;
              }
          }
      })

      fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.standalone.length; i++){
              let standalone_nome = data.standalone[i].nome;
              let standalone_imagem = data.standalone[i].imagem;
              let standalone_console_sigla = data.standalone[i].consigla;
              let standalone_nome_curto = data.standalone[i].curto;
              let standalone_tags = data.standalone[i].tags;
              let nome_processado = pesquisa_processar_texto(standalone_tags);
              
              if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
                    let standalone_duracao = gerar_timestamp(data.standalone[i].duracao.horas,data.standalone[i].duracao.minutos,data.standalone[i].duracao.segundos);
                    let standalone_plataforma = data.standalone[i].plataforma;
                    let standalone_link_youtube = data.standalone[i].linkyt;
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
      })

      fetch("dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.outros.length; i++){
              let outros_nome = data.outros[i].nome;
              let outros_imagem = data.outros[i].imagem;
              let outros_console_sigla = data.outros[i].consigla;
              let outros_nome_curto = data.outros[i].curto;
              let outros_tags = data.outros[i].tags;
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
      })
}

function resetarJogos(){
    document.querySelector("#jogosParent").innerHTML = "";
    document.querySelector("#outrosParent").innerHTML = "";
    document.querySelector("#standParent").innerHTML = "";
}
