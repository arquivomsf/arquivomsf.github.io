var pathnameArray = window.location.pathname.split("/");
var consoleAtual;

function start() {
  setTab("",'jsonParent');
    resetarString();
    setPesquisa();
    carregarDados();
}

function carregarDados() {
    procurarParam();
    fetch_dados("geral","dados.json");
    carregar_consoles_temas("console",consoleAtual);
}

function procurarParam() {
    let searchParams = new URLSearchParams(window.location.search);
    consoleAtual = searchParams.get('id');
}

function carregar_itens() {
  for (var i = 0; i<dados_geral.jogos.length; i++){
    let jogo_nome = dados_geral.jogos[i].nome;
    let jogo_tags = dados_geral.jogos[i].tags;
    let jogo_imagem = dados_geral.jogos[i].imagem;
    let jogo_console_sigla = dados_geral.jogos[i].consigla;
    let jogo_nome_curto = dados_geral.jogos[i].curto;
    let nome_processado = pesquisa_processar_texto(jogo_tags);
    
    if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
      if(jogo_console_sigla == consoleAtual){
        document.querySelector("#jsonParent").innerHTML += `
            <div class="col">
              <a href="jogo?con=${jogo_console_sigla}&id=${jogo_nome_curto}" class="blacklink">
                <div class="thumbnail">
                    <img src="${jogo_imagem}" alt="" class="linkicon ratio ratio-16x9 capa">
                    <span class="video-length"></span>
                </div>
                <span class="flow-text title">${jogo_nome}</span>
              </a>
            </div>`;
      }
    }
  }
}

function resetarJogos(){
    document.querySelector("#jsonParent").innerHTML = "";
}
