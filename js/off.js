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
            document.querySelector(".videos_content_list").innerHTML += `
                <div class="bg-white flex flex-col divide-y-1 divide-gray-300 shadow-md rounded-md border border-gray-200 transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                    <div class="p-2 flex flex-col flex-auto gap-2 items-center">
                        <div class="relative h-auto">
                            <img src="video/etc/lost/${lost_imagem}" class="thumbnail w-auto h-auto aspect-video object-contain">
                            <div class="video-duracao z-2 absolute bottom-[3%] right-[3%] bg-black/70">
                                <span class="px-1 text-white">${lost_duracao}</span>
                            </div>
                        </div>
                        <b class="text-center">${lost_nome}</b>
                    </div>
                    <div class="p-2 flex flex-col flex-1 gap-2 items-center">
                        <p class="py-1 px-2 h-min w-fit m-auto">${lost_data}</p>
                    </div>
                </div>`;

                document.querySelectorAll(".thumbnail").forEach(el => {
                    el.onerror = function() {
                        el.src = `assets/img/generic.jpg`;
                    }
                });
            }
        }
    }
}

function resetarJogos(){
    document.querySelector(".videos_content_list").innerHTML = "";
}
