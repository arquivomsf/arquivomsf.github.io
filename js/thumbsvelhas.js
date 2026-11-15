function start() {
    resetarString();
    carregarDados();
}

function carregarDados() {
    fetch_dados("geral","dados.json");
    carregar_consoles_temas("normal","");

    fetch_dados("thumbs","thumbsvelhas.json");
}

function carregar_itens() {
    for (var i = 0; i<dados_thumbs.videos.length; i++){
        let thumb_nome = dados_thumbs.videos[i].nome;
        let thumb_imagem = `video/etc/thumbsvelhas/${dados_thumbs.videos[i].imagem}`;
        let thumb_data = dados_thumbs.videos[i].data;
        let thumb_plataforma = dados_thumbs.videos[i].plataforma;
        let thumb_link = dados_thumbs.videos[i].links[thumb_plataforma];
        let thumb_desc = dados_thumbs.videos[i].desc;

        thumb_imagem = thumb_imagem.replaceAll(/[\|]/g,"_");
        thumb_imagem = thumb_imagem.replaceAll(/[\?]/g,"_");
        
        if (item_corresponde_a_pesquisa(dados_thumbs.videos[i])) {
            create_item(thumb_link,"thumbs","videos_content_list",i,"",thumb_nome,"",thumb_imagem,"","","","","",thumb_data,thumb_desc);

            document.querySelectorAll(".thumbnail").forEach(el => {
                el.onerror = function() {
                    el.src = `assets/img/generic.webp`;
                }
            });
        }
    }
}

function resetarJogos(){
    document.querySelector(".videos_content_list").innerHTML = "";
}
