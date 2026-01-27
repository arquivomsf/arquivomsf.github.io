var pathnameArray = window.location.pathname.split("/");
var consoleAtual;

function start() {
    //setTab("",'jsonParent');
    resetarString();
    //setPesquisa();
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
    let jogo_console_sigla = dados_geral.jogos[i].consigla;
    let jogo_nome_curto = dados_geral.jogos[i].curto;
    let nome_processado = pesquisa_processar_texto(jogo_tags);
    
    if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
      if(jogo_console_sigla == consoleAtual){
        document.querySelector(".jogos_content_list").innerHTML += `
            <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                <a href="jogo?con=${jogo_console_sigla}&id=${jogo_nome_curto}" class="p-1 flex flex-col flex-auto gap-2 items-center">
                    <div class="relative h-auto">
                        <img src="capas/${jogo_console_sigla}/${jogo_nome_curto}.png" class="w-auto h-[225px] aspect-video object-contain">
                    </div>
                    <b class="text-center">${jogo_nome}</b>
                </a>
            </div>`;
      }
    }
  }
}

function resetarJogos(){
    document.querySelector(".jogos_content_list").innerHTML = "";
}
