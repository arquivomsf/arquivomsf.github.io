var pathnameArray = window.location.pathname.split("/");
var consoleAtual;

function start() {
    resetarString();
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
    let jogo_console_sigla = dados_geral.jogos[i].console;
    let jogo_nome_curto = dados_geral.jogos[i].curto;

    if (item_corresponde_a_pesquisa(dados_geral.jogos[i])) {
      if(jogo_console_sigla == consoleAtual){
        create_item("","jogo_alt","videos_content_list",i,jogo_console_sigla,jogo_nome,jogo_nome_curto);
      }
    }
  }
}

function resetarJogos(){
    document.querySelector(".videos_content_list").innerHTML = "";
}
