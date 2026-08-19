function start() {
    resetarString();
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
        let nome_processado = pesquisa_processar_string(lost_tags);

        lost_imagem = lost_imagem.replaceAll(/[\|]/g,"_");
        lost_imagem = lost_imagem.replaceAll(/[\?]/g,"_");
        
        if(pesquisa_array.every(v=> nome_processado.search(v) >= 0) || pesquisa_array == "") {
            if (fortnite_banido == "false" || (fortnite_banido == "true" && !nome_processado.toLowerCase().includes("fortnite"))) {
            let lost_duracao = gerar_timestamp(dados_off.lostmedia[i].duracao.horas,dados_off.lostmedia[i].duracao.minutos,dados_off.lostmedia[i].duracao.segundos);
            create_item("","off","videos_content_list",i,"",lost_nome,"",lost_imagem,"",lost_duracao,"","","",lost_data);

            document.querySelectorAll(".thumbnail").forEach(el => {
                el.onerror = function() {
                    el.src = `assets/img/generic.webp`;
                }
            });
            }
        }
    }
}

function resetarJogos(){
    document.querySelector(".videos_content_list").innerHTML = "";
}
