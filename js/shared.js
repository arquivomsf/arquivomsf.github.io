//tema

var tema = "";

function startTema() {
    tema = localStorage.getItem("tema");
    if (tema == null) {
        tema = "default";
        localStorage.setItem("tema", tema);
    }
    document.getElementById("themes_select").value = tema;
    if (document.querySelector(".header404") == null) {
        if (tema !== "default" && document.getElementById("style-"+tema) == null) {
            document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" id="style-${tema}" href="css/theme/${tema}.css" />`);
        }
    } else if (tema !== "default" && document.getElementById("style-"+tema) == null) {
        document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" id="style-${tema}" href="https://arquivomsf.github.io/css/theme/${tema}.css" />`);
    }
    document.body.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
}

function setTema(tema_esc) {
    tema = tema_esc.value;
    if (document.querySelector(".header404") == null) {
        if (tema !== "default" && document.getElementById("style-"+tema) == null) {
            document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" id="style-${tema}" href="css/theme/${tema}.css" />`);
        }
    } else if (tema !== "default" && document.getElementById("style-"+tema) == null) {
        document.head.insertAdjacentHTML('beforeend',`<link rel="stylesheet" id="style-${tema}" href="https://arquivomsf.github.io/css/theme/${tema}.css" />`);
    }
    document.body.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
}

//fetches
var dados_geral = "";
var dados_jogo = "";
var dados_serie = "";

async function fetch_dados(tipo,file) {
    let file_object = await fetch(file);
    let json_data = await file_object.json();

    switch(tipo) {
        case "geral":
            dados_geral = json_data;
        break;
        case "jogo":
            dados_jogo = json_data;
        break;
        case "serie":
            dados_serie = json_data;
        break;
        case "serie_embed":
            dados_serie = json_data;
            //gambiarra porque estoy cansado jefe
            let geral_object_embed = await fetch("dados.json");
            dados_geral = await geral_object_embed.json();
        break;
    }
    carregar_itens();
}


//pesquisa
var stringPesquisa = "";
var pesquisando = 0;

function pesquisarJogo() {
    stringPesquisa = pesquisa_processar_texto(document.querySelector("#inputPesquisa").value);
    resetarJogos();
    carregar_itens();
}

if (!pesquisando == 0) {
    setInterval(function () {
        resetarJogos();
        carregar_itens();
    }, 100);
}

function setPesquisa() {
    if (pesquisando == 0) {
        document.querySelector(".default-container").style.display = "block";
        document.querySelector(".search-container").style.display = "none";
        let allSearchBtn = document.querySelectorAll(".pesquisar-btn");
        for (let i = 0; i < allSearchBtn.length; i++) {
            allSearchBtn[i].innerHTML = '<i class="fa fa-search"></i>';
        }
    } else {
        document.querySelector(".default-container").style.display = "none";
        document.querySelector(".search-container").style.display = "block";
        document.querySelector("#inputPesquisa").focus();
        let allSearchBtn = document.querySelectorAll(".pesquisar-btn");
        for (let i = 0; i < allSearchBtn.length; i++) {
            allSearchBtn[i].innerHTML = '<i class="fa fa-close"></i>';
        }
    }
}

function changePesquisa() {
    if (pesquisando == 0) {
        pesquisando = 1;
        setPesquisa();
        return
    }
    if (!stringPesquisa == "" && !pesquisando == 0) {
        pesquisando = 0;
        resetarString();
        resetarJogos();
        carregar_itens();
        setPesquisa();
    }
}

function checarStringVazia() {
    if (stringPesquisa == "" && !pesquisando == 0) {
        pesquisando = 0;
        setPesquisa();
    }
}

function resetarString() {
    document.querySelector("#inputPesquisa").value = "";
    stringPesquisa = "";
}

//gerar string de timestamp
function gerar_timestamp(horas, minutos, segundos) {
    if (horas == 0 && minutos == 0 && segundos == 0) return "Perdido"

    if (horas > 0 && minutos < 10) minutos = String(minutos).padStart(2, '0');
    segundos = String(segundos).padStart(2, '0');

    if (horas > 0) return `${horas}:${minutos}:${segundos}`
    return `${minutos}:${segundos}`
}

//erro 404 - consoles e temas
function start404(){
    carregar_consoles_temas("404","https://arquivomsf.github.io/dados.json");
}

//carregar consoles e temas
function carregar_consoles_temas(modo,parametro) {
    let json_url;
    if (modo == "normal" || modo == "console" || modo == "jogo" || modo == "outro") json_url = "dados.json";
    if (modo == "404") json_url = parametro;

    fetch(json_url)
    .then(response => response.json())
    .then(data => {
        let consoles = data.consoles;
        let temas = data.temas;

        //criar consoles
        for (var i = 0; i<consoles.length; i++){
            let console_nome = consoles[i].nome;
            let console_sigla = consoles[i].sigla;
            document.querySelector("#conJsonParent").innerHTML += `
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="console?id=${console_sigla}">${console_nome}</a>
                </li>`;
            
            //se estiver no modo console, verificar se é o console atual para nomear a página
            if(modo == "console" && console_sigla == parametro){
                document.querySelector(".console-name").innerHTML = `<a href="">${console_nome}</a>`;
                document.title = `Arquivo - ${console_nome}`;
                document.querySelector('meta[property="og:title"]').setAttribute("content", `Arquivo - ${console_nome}`);
            }
        }

        //criar temas
        for (var i = 0; i<temas.length; i++){
            let tema_nome = temas[i].nome;
            let tema_valor = temas[i].valor;
            document.querySelector("#themes_select").innerHTML += `
            <option value="${tema_valor}">${tema_nome}</option>`;
        }

        //se estiver no modo jogo/série, verificar jogos
        if (modo == "jogo" || modo == "outro") {
            let jogos_objeto = data.jogos;
            if (modo == "outro") jogos_objeto = data.outros;

            for (var i = 0; i<jogos_objeto.length; i++){
                let jogo_nome = jogos_objeto[i].nome;
                let jogo_nome_curto = jogos_objeto[i].curto;
                let jogo_console_nome = jogos_objeto[i].console;
                let jogo_console_sigla = jogos_objeto[i].consigla;

                //verificar se é o jogo atual para nomear a página
                if(jogo_nome_curto == parametro){
                    document.querySelector(".game-name").innerHTML = `<a href="">${jogo_nome}</a>`;
                    if (modo == "outro") document.querySelector(".console-name").innerHTML = `<a href="https://arquivomsf.github.io/">Outros</a>`;
                    else document.querySelector(".console-name").innerHTML = `<a href="console?id=${jogo_console_sigla}">${jogo_console_nome}</a>`;
                    document.title = `Arquivo - ${jogo_nome}`;
                    document.querySelector('meta[property="og:title"]').setAttribute("content", `Arquivo - ${jogo_nome}`);
                }
            }
        }

        startTema();
    })
}

//gerenciar abas
function setTab(cur_el,selected_tab) {
    if (cur_el != "") {
        document.querySelectorAll(".tab-link").forEach(el => {
            el.classList.remove("active");
        });
        cur_el.classList.add("active");
    }

    document.querySelectorAll(".tab-content").forEach(el => {
        el.classList.add("hidden");
    });
    document.querySelector("#"+selected_tab).classList.remove("hidden");
}

//processar texto para ser um pouquinho mais considerativo na digitação
function pesquisa_processar_texto(texto_original) {
    let texto_processado;
    texto_processado = texto_original.replaceAll(/\s/g, "");
    texto_processado = texto_processado.replaceAll(/[^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g,"");
    texto_processado = texto_processado.replaceAll(/[áàâãÁÀÂÃ]/g,"a");
    texto_processado = texto_processado.replaceAll(/[íïÍÏ]/g,"i");
    texto_processado = texto_processado.replaceAll(/[éèêÉÈ]/g,"e");
    texto_processado = texto_processado.replaceAll(/[ñÑ]/g,"n");
    texto_processado = texto_processado.replaceAll(/[óôõöÓÔÕÖ]/g,"o");
    texto_processado = texto_processado.replaceAll(/[Ç]/g,"c");
    texto_processado = texto_processado.replaceAll(/[úÚ]/g,"u");
    
    return texto_processado;
}
