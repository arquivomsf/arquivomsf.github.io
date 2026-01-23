function start() {
    resetarString();
    setPesquisa();
    carregarDados();
}

function carregarDados() {
    procurarParam();
    fetch_dados("geral","dados.json");
    carregar_consoles_temas("normal","");

    fetch_dados("lost","off.json");
}

var fortnite_banido = "false";

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  fortnite_banido = searchParams.get('fortnite_banido');

  if (fortnite_banido == null) fortnite_banido = "false";
  if (fortnite_banido == "") fortnite_banido = "true";
}

function carregar_itens() {
    for (var i = 0; i<dados_off.lostmedia.length; i++){
        let lost_nome = dados_off.lostmedia[i].nome;
        let lost_imagem = dados_off.lostmedia[i].imagem;
        let lost_tags = dados_off.lostmedia[i].tags;
        let lost_data = dados_off.lostmedia[i].data;
        let nome_processado = pesquisa_processar_texto(lost_tags);

        lost_imagem = lost_imagem.replaceAll(/[\|]/g,"_");
        lost_imagem = lost_imagem.replaceAll(/[\?]/g,"_");
        
        if(nome_processado.toLowerCase().includes(stringPesquisa.toLowerCase())) {
            if (fortnite_banido == "false" || (fortnite_banido == "true" && !nome_processado.toLowerCase().includes("fortnite"))) {
            let lost_duracao = gerar_timestamp(dados_off.lostmedia[i].duracao.horas,dados_off.lostmedia[i].duracao.minutos,dados_off.lostmedia[i].duracao.segundos);
            document.querySelector("#jsonParent").innerHTML += `
                <div class="col stand-item">
                <a href="" class="blacklink">
                    <div class="thumbnail">
                        <img src="video/etc/lost/${lost_imagem}" alt="" class="img-fluid linkicon">
                        <span class="video-length">${lost_duracao}</span>
                    </div>
                    <span class="flow-text title">${lost_nome}</span></a><br>
                    <a href="" class="blacklink"><span class="flow-text subtitle">${lost_data}</span></a>
                </div>`;
            }
        }
    }
}

function resetarJogos(){
    document.querySelector("#jsonParent").innerHTML = "";
}
