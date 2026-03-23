//tema
var tema = "";

function startTema() {
    tema = localStorage.getItem("tema");
    if (tema == null || tema == "undefined" || tema == "") {
        tema = "default";
        localStorage.setItem("tema", tema);
    }
    document.getElementById("themes_select").value = tema;
    if (document.querySelector(".page-404") == null) {
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
    if (document.querySelector(".page-404") == null) {
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
var dados_off = {"lostmedia": []};

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
        case "lost":
            dados_off = json_data;
        break;
    }
    carregar_itens();
}


//pesquisa
var pesquisa_array = [];
var pesquisando = 0;

function pesquisarJogo() {
    pesquisa_array = pesquisa_processar_array(document.querySelector("#inputPesquisa").value);

    debug_disable();

    resetarJogos();
    carregar_itens();
}

if (!pesquisando == 0) {
    setInterval(function () {
        resetarJogos();
        carregar_itens();
    }, 100);
}

function abrir_pesquisa() {
    document.querySelector(".navbar-default").classList.add("hidden");
    document.querySelector(".navbar-search").classList.remove("hidden");

    document.querySelector("#inputPesquisa").focus();

    changePesquisa("on");
}

function fechar_pesquisa() {
    document.querySelector(".navbar-default").classList.remove("hidden");
    document.querySelector(".navbar-search").classList.add("hidden");

    debug_disable();

    changePesquisa("off");
}

function changePesquisa(on_off) {
    if (on_off == "on") {
        pesquisando = 1;
        return
    }
    if (!pesquisa_array == "" && on_off == "off") {
        pesquisando = 0;
        resetarString();
        resetarJogos();
        carregar_itens();
    }
}

function checarStringVazia() {
    if (pesquisa_array == "" && !pesquisando == 0) {
        pesquisando = 0;
        fechar_pesquisa();
    }
}

function resetarString() {
    document.querySelector("#inputPesquisa").value = "";
    pesquisa_array = [];
}

//gerar string de timestamp pros videos na pagina
function gerar_timestamp(horas, minutos, segundos) {
    if (horas == 0 && minutos == 0 && segundos == 0) return "Perdido"

    if (horas > 0 && minutos < 10) minutos = String(minutos).padStart(2, '0');
    segundos = String(segundos).padStart(2, '0');

    if (horas > 0) return `${horas}:${minutos}:${segundos}`
    return `${minutos}:${segundos}`
}

//carregar consoles e temas na sidebar (especificamente na pagina de erro 404)
function start404(){
    carregar_consoles_temas("404","https://arquivomsf.github.io/dados.json");
}

//carregar consoles e temas na sidebar
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

            let console_url = "";
            if(modo == "404") console_url = `https://arquivomsf.github.io/console?id=${console_sigla}`;
            else console_url = `console?id=${console_sigla}`;

            document.querySelector(".console_list").innerHTML += `
                <a href="${console_url}" class="nav-link px-2 py-3 float-left w-auto border-none block outline-none transition-all duration-150 hover:bg-black/20 focus:bg-black/20">${console_nome} (${console_sigla.toUpperCase()})</a>`;
            
            //se estiver no modo console, verificar se é o console atual pra tambem colocar no titulo da página
            if(modo == "console" && console_sigla == parametro){
                document.querySelector(".navbar-two").innerHTML = `${console_nome} (${console_sigla.toUpperCase()})`;
                document.querySelector(".navbar-two-sigla").innerHTML = `${console_sigla.toUpperCase()}`;
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

                //verificar se é o jogo atual pra tambem colocar no titulo da página
                if(jogo_nome_curto == parametro){
                    document.querySelector(".navbar-three").innerHTML = `${jogo_nome}`;
                    document.querySelector(".navbar-three-mobile").innerHTML = `${jogo_nome}`;
                    if (modo == "outro") {
                        document.querySelector(".navbar-two").innerHTML = `Outros`;
                        document.querySelector(".navbar-two").href = `https://arquivomsf.github.io/`;

                        document.querySelector(".navbar-two-sigla").innerHTML = `Outros`;
                        document.querySelector(".navbar-two-sigla").href = `https://arquivomsf.github.io/`;
                    }
                    else {
                        document.querySelector(".navbar-two").innerHTML = `${jogo_console_nome}`;
                        document.querySelector(".navbar-two").href = `console?id=${jogo_console_sigla}`;

                        document.querySelector(".navbar-two-sigla").innerHTML = `${jogo_console_sigla.toUpperCase()}`;
                        document.querySelector(".navbar-two-sigla").href = `console?id=${jogo_console_sigla}`;
                    }
                    document.title = `Arquivo - ${jogo_nome}`;
                    document.querySelector('meta[property="og:title"]').setAttribute("content", `Arquivo - ${jogo_nome}`);
                }
            }
        }

        startTema();
    })
}

//função de selecionar abas (automaticamente ou por click)
function setTab(cur_el,selected_tab) {
    if (cur_el != "") {
        document.querySelectorAll(".tab-link").forEach(el => {
            el.classList.remove("active");
        });
        cur_el.classList.add("active");
    }

    document.querySelectorAll(".tabcontent").forEach(el => {
        el.classList.add("hidden");
    });
    document.querySelector("#"+selected_tab).classList.remove("hidden");
}

//processar texto pra ser um pouquinho mais considerativo na digitação
//(ignorar caracteres especiais, ignorar espaços, ignorar ordem das palavras)
function pesquisa_processar_array(texto_original) {
    let texto_processado;
    texto_processado = texto_original.toLowerCase().split(" ");

    for (var i = 0; i<texto_processado.length; i++) {
        texto_processado[i] = texto_processado[i].replaceAll(/[^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g,"");
        texto_processado[i] = texto_processado[i].replaceAll(/[áàâãÁÀÂÃ]/g,"a");
        texto_processado[i] = texto_processado[i].replaceAll(/[íïÍÏ]/g,"i");
        texto_processado[i] = texto_processado[i].replaceAll(/[éèêÉÈ]/g,"e");
        texto_processado[i] = texto_processado[i].replaceAll(/[ñÑ]/g,"n");
        texto_processado[i] = texto_processado[i].replaceAll(/[óôõöÓÔÕÖ]/g,"o");
        texto_processado[i] = texto_processado[i].replaceAll(/[Ç]/g,"c");
        texto_processado[i] = texto_processado[i].replaceAll(/[úÚ]/g,"u");

        texto_processado = texto_processado.filter(item => item !== "")
    }
    
    return texto_processado;
}

function pesquisa_processar_string(texto_original) {
    let texto_processado;
    texto_processado = texto_original.toLowerCase();
    texto_processado = texto_processado.replaceAll(/\s/g, "");
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

function sidebar_open() {
  document.querySelector("#sidebar_main").classList.remove("hidden");
  document.querySelector("#sidebar_overlay").classList.remove("hidden");

  document.querySelector("#sidebar_main").classList.remove("animate-sidebar-fechar");

  document.body.style.overflow = "hidden";
}

function sidebar_close() {
  document.querySelector("#sidebar_overlay").classList.add("hidden");

  document.querySelector("#sidebar_main").classList.add("animate-sidebar-fechar");
  setTimeout(function(){ document.querySelector("#sidebar_main").classList.add("hidden"); }, 300);

  document.body.style.overflow = "auto";
}

function get_console_name(sigla) {
    switch(sigla) {
        case "nes":
            return "Nintendo"
        break;
        case "n64":
            return "Nintendo 64"
        break;
        case "gba":
            return "Game Boy Advance"
        break;
        case "md":
            return "Mega Drive"
        break;
        case "dc":
            return "Dreamcast"
        break;
        case "ps1":
            return "PlayStation 1"
        break;
        case "ps2":
            return "PlayStation 2"
        break;
    }
}

var debug_mode = false;
var debug_info = {"info": {},"info_outro": {}};

//ativar modo de debug que permite
    //ver a plataforma em que as séries ou vídeos estão disponíveis
    //ver se um jogo tem análise
function debug() {
    if (document.body.classList.contains("debug_ativado")) return "⚠️ Erro: Modo de debug já ativado";
    if (window.location.pathname != "/" && window.location.pathname != "/index.html") return "⚠️ Erro: O modo de debug funciona apenas na página inicial\nhttps://arquivomsf.github.io/";
    if (pesquisa_array != "") return "⚠️ Erro: Tentativa de ativar o modo de debug durante uma pesquisa";

    //console.log("Ativando modo de debug...");
    console.group("Ativando modo de debug...");
    debug_mode = true;
    document.body.classList.add("debug_ativado");

    //debug da aba Jogos
    console.log("(1/3) Adicionando informações de debug na aba [Jogos]");
    let debug_todos_jogos = document.querySelectorAll(".jogo_titulo");

    for (var i = 0; i<dados_geral.jogos.length; i++) {
        let debug_jogo = dados_geral.jogos[i];
        let debug_console = debug_jogo.consigla;
        let debug_nome = debug_jogo.curto;

        debug_todos_jogos[i].classList.add("jogo_id_"+debug_console+"_"+debug_nome);

        fetch(`video/${debug_console}/${debug_nome}/series.json`)
        .then(response => response.json())
        .then(data => {
            debug_info.info[debug_nome] = "<br>";

            if (data.hasOwnProperty("episodios")) {
                //olha a série episódios
                debug_info.info[debug_nome] += `<br><span class="debug_episodios_${debug_console}_${debug_nome}">Carregando...</span>`;

                fetch(`video/${debug_console}/${debug_nome}/episodios/videos.json`)
                .then(response => response.json())
                .then(data => {
                    let debug_serie_icon = "";
                    if (data.videos[data.videos.length-1].plataforma == "youtube") debug_serie_icon = `<i class="fa fa-fw fa-youtube-play" title="${data.videos[data.videos.length-1].plataforma}"></i>`;
                    else if (data.videos[data.videos.length-1].plataforma == "gdrive" || data.videos[data.videos.length-1].plataforma == "archive")  debug_serie_icon = `<i class="fa fa-fw fa-file-video-o" title="${data.videos[data.videos.length-1].plataforma}"></i>`;

                    document.querySelector(".debug_episodios_"+debug_console+"_"+debug_nome).innerHTML = `${debug_serie_icon} ${data.videos.length} Episódios`;
                })
            }

            if (data.hasOwnProperty("vodsarquivo")) {
                //olha a série vods
                debug_info.info[debug_nome] += `<br><span class="debug_vods_${debug_console}_${debug_nome}">Carregando...</span>`;

                fetch(`video/${debug_console}/${debug_nome}/vods/videos.json`)
                .then(response => response.json())
                .then(data => {
                    let debug_serie_icon = "";
                    if (data.videos[data.videos.length-1].plataforma == "youtube") debug_serie_icon = `<i class="fa fa-fw fa-youtube-play" title="${data.videos[data.videos.length-1].plataforma}"></i>`;
                    else if (data.videos[data.videos.length-1].plataforma == "gdrive" || data.videos[data.videos.length-1].plataforma == "archive")  debug_serie_icon = `<i class="fa fa-fw fa-file-video-o" title="${data.videos[data.videos.length-1].plataforma}"></i>`;

                    document.querySelector(".debug_vods_"+debug_console+"_"+debug_nome).innerHTML = `${debug_serie_icon} ${data.videos.length} VODs`;
                })
            }

            if (data.hasOwnProperty("analise")) {
                debug_info.info[debug_nome] += `<br><span>Análise</span>`;
            }
            document.querySelector(".jogo_id_"+debug_console+"_"+debug_nome).innerHTML += debug_info.info[debug_nome];
        })
    }

    //debug da aba Outros
    console.log("(2/3) Adicionando informações de debug na aba [Outros]");
    let debug_todos_outros = document.querySelectorAll(".outro_titulo");

    for (var i = 0; i<dados_geral.outros.length; i++) {
        let debug_outro = dados_geral.outros[i];
        let debug_outro_nome = debug_outro.curto;

        debug_todos_outros[i].classList.add("jogo_id_outros_"+debug_outro_nome);

        fetch(`video/outros/${debug_outro_nome}/videos.json`)
        .then(response => response.json())
        .then(data => {
            debug_info.info_outro[debug_outro_nome] = "<br>";

            debug_info.info_outro[debug_outro_nome] += `<br><span class="debug_episodios_outros_${debug_outro_nome}">Carregando...</span>`;

            let debug_serie_icon = "";
            if (data.videos[data.videos.length-1].plataforma == "youtube") debug_serie_icon = `<i class="fa fa-fw fa-youtube-play" title="${data.videos[data.videos.length-1].plataforma}"></i>`;
            else if (data.videos[data.videos.length-1].plataforma == "gdrive" || data.videos[data.videos.length-1].plataforma == "archive")  debug_serie_icon = `<i class="fa fa-fw fa-file-video-o" title="${data.videos[data.videos.length-1].plataforma}"></i>`;

            if (data.hasOwnProperty("analise")) {
                debug_info.info_outro[debug_outro_nome] += `<br><span>Análise</span>`;
            }

            document.querySelector(".jogo_id_outros_"+debug_outro_nome).innerHTML += debug_info.info_outro[debug_outro_nome];
            document.querySelector(".debug_episodios_outros_"+debug_outro_nome).innerHTML = `${debug_serie_icon} ${data.videos.length} Episódios`;
        })
    }

    //debug da aba Standalone
    console.log("(3/3) Adicionando informações de debug na aba [Vídeos Independentes]");

    document.querySelectorAll(".standalone_titulo_youtube").forEach((element) =>
        element.innerHTML += `<br><br><span>YouTube</span>`
    );

    document.querySelectorAll(".standalone_titulo_gdrive").forEach((element) =>
        element.innerHTML += `<br><br><span>Google Drive</span>`
    );

    document.querySelectorAll(".standalone_titulo_archive").forEach((element) =>
        element.innerHTML += `<br><br><span>Inernet Archive</span>`
    );

    console.groupEnd();

    return "✅ Modo de debug ativado";
}

function debug_disable() {
    if (debug_mode) {
        debug_mode = false;
        document.body.classList.remove("debug_ativado");
        console.log("Modo de debug desativado");
    }
}
