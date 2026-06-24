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
var dados_franquia = "";

async function fetch_dados(tipo,file,tipo2 = "",file2 = "",load = true) {
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
        case "lost":
            dados_off = json_data;
        break;
        case "franquia":
            dados_franquia = json_data;
        break;
    }

    if (file2 != "") {
        let file2_object = await fetch(file2);
        let json2_data = await file2_object.json();

        switch(tipo2) {
            case "geral":
                dados_geral = json2_data;
            break;
            case "jogo":
                dados_jogo = json2_data;
            break;
            case "serie":
                dados_serie = json2_data;
            break;
            case "lost":
                dados_off = json2_data;
            break;
            case "franquia":
                dados_franquia = json2_data;
            break;
        }
    }
    if (load) carregar_itens();
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

var debug_mode = false;
var debug_info = {"info": {},"info_outro": {},"info_extras": {}};

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
    console.log("(1/4) Adicionando informações de debug na aba [Jogos]");

    let debug_todos_jogos = document.querySelectorAll(".jogo_titulo");

    for (var i = 0; i<dados_geral.jogos.length; i++) {
        let debug_jogo = dados_geral.jogos[i];
        let debug_console = debug_jogo.consigla;
        let debug_nome = debug_jogo.curto;
        let debug_tags = debug_jogo.tags;

        debug_todos_jogos[i].classList.add("jogo_id_"+debug_console+"_"+debug_nome);

        //debug Jogos estrutura
        let debug_jogos_estrutura = `
            <hr class="mt-1">
            <div class="divide-y-1 divide-white">
                <div class="m-1 flex flex-col gap-2">
                    <div>
                        <span class="jogo_id_${debug_console}_${debug_nome}_episodios_total hidden">0 Episódios no total</span>
                    </div>
                    <div class="flex flex-col">
                        <div>
                            <span class="jogo_id_${debug_console}_${debug_nome}_episodios_youtube hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("youtube")}" title="youtube"></i> 
                            <span class="jogo_id_${debug_console}_${debug_nome}_episodios_youtube_string">0 Episódios</span>
                            </span>
                        </div>
                        <div>
                            <span class="jogo_id_${debug_console}_${debug_nome}_episodios_gdrive hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("gdrive")}" title="gdrive"></i> 
                            <span class="jogo_id_${debug_console}_${debug_nome}_episodios_gdrive_string">0 Episódios</span>
                            </span>
                        </div>
                        <div>
                            <span class="jogo_id_${debug_console}_${debug_nome}_episodios_archive hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("archive")}" title="archive"></i> 
                            <span class="jogo_id_${debug_console}_${debug_nome}_episodios_archive_string">0 Episódios</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="m-1 flex flex-col gap-2">
                    <div>
                        <span class="jogo_id_${debug_console}_${debug_nome}_vods_total hidden">0 VODs no total</span>
                    </div>
                    <div class="flex flex-col">
                        <div>
                            <span class="jogo_id_${debug_console}_${debug_nome}_vods_youtube hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("youtube")}" title="youtube"></i> 
                            <span class="jogo_id_${debug_console}_${debug_nome}_vods_youtube_string">0 VODs</span>
                            </span>
                        </div>
                        <div>
                            <span class="jogo_id_${debug_console}_${debug_nome}_vods_gdrive hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("gdrive")}" title="gdrive"></i> 
                            <span class="jogo_id_${debug_console}_${debug_nome}_vods_gdrive_string">0 VODs</span>
                            </span>
                        </div>
                        <div>
                            <span class="jogo_id_${debug_console}_${debug_nome}_vods_archive hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("archive")}" title="archive"></i> 
                            <span class="jogo_id_${debug_console}_${debug_nome}_vods_archive_string">0 VODs</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="m-1">
                    <span class="jogo_id_${debug_console}_${debug_nome}_vods_oficial hidden">0 VODs Oficiais</span>
                </div>
                <div class="m-1 flex flex-col">
                    <span class="jogo_id_${debug_console}_${debug_nome}_episodios_extras hidden">0 Extras nos Episódios</span>
                    <span class="jogo_id_${debug_console}_${debug_nome}_vods_extras hidden">0 Extras nos VODs</span>
                </div>
                <div class="m-1">
                    <span class="jogo_id_${debug_console}_${debug_nome}_analise hidden">Ánalise</span>
                </div>
                <div class="m-1 flex flex-col">
                    <div>
                        <span class="jogo_id_${debug_console}_${debug_nome}_avisos_linkyt_episodios text-red-500 hidden">
                        <i class="fa fa-fw fa-exclamation-triangle"></i> 
                        <span class="jogo_id_${debug_console}_${debug_nome}_avisos_linkyt_episodios_string">0 Episódios no modelo antigo</span>
                        </span>
                    </div>
                    <div>
                        <span class="jogo_id_${debug_console}_${debug_nome}_avisos_linkyt_vods text-red-500 hidden">
                        <i class="fa fa-fw fa-exclamation-triangle"></i> 
                        <span class="jogo_id_${debug_console}_${debug_nome}_avisos_linkyt_vods_string">0 VODs no modelo antigo</span>
                        </span>
                    </div>
                    <div>
                        <span class="jogo_id_${debug_console}_${debug_nome}_avisos_data_episodios text-yellow-500 hidden">
                        <i class="fa fa-fw fa-exclamation-triangle"></i> 
                        <span class="jogo_id_${debug_console}_${debug_nome}_avisos_data_episodios_string">0 Episódios sem data</span>
                        </span>
                    </div>
                    <div>
                        <span class="jogo_id_${debug_console}_${debug_nome}_avisos_data_vods text-yellow-500 hidden">
                        <i class="fa fa-fw fa-exclamation-triangle"></i> 
                        <span class="jogo_id_${debug_console}_${debug_nome}_avisos_data_vods_string">0 VODs sem data</span>
                        </span>
                    </div>
                </div>
                <div>
                    <details>
                        <summary>Tags</summary>
                        <span class="jogo_id_${debug_console}_${debug_nome}_tags">${pesquisa_processar_string(debug_tags.replaceAll(/\s/g, "marcadorsuperespecifico")).replaceAll("marcadorsuperespecificomarcadorsuperespecifico", "marcadorsuperespecifico").replaceAll("marcadorsuperespecifico", ", ")}</span>
                    </details>
                </div>
            </div>
        `;

        document.querySelector(".jogo_id_"+debug_console+"_"+debug_nome).innerHTML += `${debug_jogos_estrutura}`;

        fetch(`video/${debug_console}/${debug_nome}/series.json`)
        .then(response => response.json())
        .then(data => {
            debug_info.info[debug_nome] = "<br>";
            debug_info.info_extras[debug_nome] = "";

            if (data.hasOwnProperty("episodios")) {
                //olha o atributo [episodios] do jogo e o json dessa pasta
                document.querySelector(".jogo_id_"+debug_console+"_"+debug_nome+"_episodios_total").classList.remove("hidden");
                document.querySelector(".jogo_id_"+debug_console+"_"+debug_nome+"_episodios_total").innerHTML = "Carregando...";

                fetch(`video/${debug_console}/${debug_nome}/episodios/videos.json`)
                .then(response => response.json())
                .then(data => {
                    document.querySelector(".jogo_id_"+debug_console+"_"+debug_nome+"_episodios_total").innerHTML = `${data.videos.length} Episódios no total`;

                    //verificação de plataformas - Episódios
                    let json_video_plataforma_counter = {youtube: 0, gdrive: 0, archive: 0};

                    for (var i = 0; i<data.videos.length; i++) {
                        if (!data.videos[i].links.youtube == "") {
                            json_video_plataforma_counter.youtube++;
                        }
                        if (!data.videos[i].links.gdrive == "") {
                            json_video_plataforma_counter.gdrive++;
                        }
                        if (!data.videos[i].links.archive == "") {
                            json_video_plataforma_counter.archive++;
                        }
                    }

                    if (json_video_plataforma_counter.youtube > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_episodios_youtube";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.youtube} Episódios`;
                    }

                    if (json_video_plataforma_counter.gdrive > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_episodios_gdrive";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.gdrive} Episódios`;
                    }

                    if (json_video_plataforma_counter.archive > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_episodios_archive";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.archive} Episódios`;
                    }

                    //Detector de JSON antigo - JOGOS episodios
                    let json_antigo_jogos_counter = 0;

                    for (var i = 0; i<data.videos.length; i++) {
                        if (data.videos[i].hasOwnProperty("linkyt")) {
                            json_antigo_jogos_counter++;
                        }
                    }
                    
                    if (json_antigo_jogos_counter > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_avisos_linkyt_episodios";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_antigo_jogos_counter} Episódios no modelo antigo`;
                    }

                    //Detector de data - JOGOS episodios
                    let json_data_jogos_counter = 0;

                    for (var i = 0; i<data.videos.length; i++) {
                        if (!data.videos[i].hasOwnProperty("data") || data.videos[i].hasOwnProperty("data") && data.videos[i].data == "") {
                            json_data_jogos_counter++;
                        }
                    }
                    
                    if (json_data_jogos_counter > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_avisos_data_episodios";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_data_jogos_counter} Episódios sem data`;
                    }

                    if (data.hasOwnProperty("extras")) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_episodios_extras";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class).innerHTML = `${data.extras.length} Extras nos Episódios`;
                    }
                })
            }

            if (data.hasOwnProperty("vodsarquivo")) {
                //olha o atributo [vodsarquivo] do jogo e o json da pasta [vods]
                document.querySelector(".jogo_id_"+debug_console+"_"+debug_nome+"_vods_total").classList.remove("hidden");
                document.querySelector(".jogo_id_"+debug_console+"_"+debug_nome+"_vods_total").innerHTML = "Carregando...";

                fetch(`video/${debug_console}/${debug_nome}/vods/videos.json`)
                .then(response => response.json())
                .then(data => {
                    document.querySelector(".jogo_id_"+debug_console+"_"+debug_nome+"_vods_total").innerHTML = `${data.videos.length} VODs no total`;

                    //verificação de plataformas - VODs
                    let json_video_plataforma_counter = {youtube: 0, gdrive: 0, archive: 0};

                    for (var i = 0; i<data.videos.length; i++) {
                        if (!data.videos[i].links.youtube == "") {
                            json_video_plataforma_counter.youtube++;
                        }
                        if (!data.videos[i].links.gdrive == "") {
                            json_video_plataforma_counter.gdrive++;
                        }
                        if (!data.videos[i].links.archive == "") {
                            json_video_plataforma_counter.archive++;
                        }
                    }

                    if (json_video_plataforma_counter.youtube > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_vods_youtube";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.youtube} VODs`;
                    }

                    if (json_video_plataforma_counter.gdrive > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_vods_gdrive";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.gdrive} VODs`;
                    }

                    if (json_video_plataforma_counter.archive > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_vods_archive";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.archive} VODs`;
                    }

                    //Detector de JSON antigo - JOGOS vods
                    let json_antigo_jogos_counter = 0;

                    for (var i = 0; i<data.videos.length; i++) {
                        if (data.videos[i].hasOwnProperty("linkyt")) {
                            json_antigo_jogos_counter++;
                        }
                    }
                    
                    if (json_antigo_jogos_counter > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_avisos_linkyt_vods";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_antigo_jogos_counter} VODs no modelo antigo`;
                    }

                    //Detector de data - JOGOS vods
                    let json_data_jogos_counter = 0;

                    for (var i = 0; i<data.videos.length; i++) {
                        if (!data.videos[i].hasOwnProperty("data") || data.videos[i].hasOwnProperty("data") && data.videos[i].data == "") {
                            json_data_jogos_counter++;
                        }
                    }
                    
                    if (json_data_jogos_counter > 0) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_avisos_data_vods";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class+"_string").innerHTML = `${json_data_jogos_counter} VODs sem data`;
                    }

                    if (data.hasOwnProperty("extras")) {
                        let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_vods_extras";
                        document.querySelector(cur_element_class).classList.remove("hidden");
                        document.querySelector(cur_element_class).innerHTML = `${data.extras.length} Extras nos VODs`;
                    }
                })
            }

            if (data.hasOwnProperty("vodsoficiais")) {
                let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_vods_oficial";
                document.querySelector(cur_element_class).classList.remove("hidden");
                document.querySelector(cur_element_class).innerHTML = `${data.vodsoficiais[0].quantidade} VODs Oficiais`;
            }

            if (data.hasOwnProperty("analise")) {
                let cur_element_class = ".jogo_id_"+debug_console+"_"+debug_nome+"_analise";
                document.querySelector(cur_element_class).classList.remove("hidden");
            }
        })
    }

    //debug da aba Outros
    console.log("(2/4) Adicionando informações de debug na aba [Outros]");
    let debug_todos_outros = document.querySelectorAll(".outro_titulo");

    for (var i = 0; i<dados_geral.outros.length; i++) {
        let debug_outro = dados_geral.outros[i];
        let debug_outro_nome = debug_outro.curto;
        let debug_tags = debug_outro.tags;

        let debug_outros_estrutura = `
            <hr class="mt-1">
            <div class="divide-y-1 divide-white">
                <div class="m-1 flex flex-col gap-2">
                    <div>
                        <span class="jogo_id_outros_${debug_outro_nome}_episodios_total hidden">0 Vídeos no total</span>
                    </div>
                    <div class="flex flex-col">
                        <div>
                            <span class="jogo_id_outros_${debug_outro_nome}_episodios_youtube hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("youtube")}" title="youtube"></i> 
                            <span class="jogo_id_outros_${debug_outro_nome}_episodios_youtube_string">0 Vídeos</span>
                            </span>
                        </div>
                        <div>
                            <span class="jogo_id_outros_${debug_outro_nome}_episodios_gdrive hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("gdrive")}" title="gdrive"></i> 
                            <span class="jogo_id_outros_${debug_outro_nome}_episodios_gdrive_string">0 Vídeos</span>
                            </span>
                        </div>
                        <div>
                            <span class="jogo_id_outros_${debug_outro_nome}_episodios_archive hidden">
                            <i class="fa fa-fw ${get_plataforma_icon("archive")}" title="archive"></i> 
                            <span class="jogo_id_outros_${debug_outro_nome}_episodios_archive_string">0 Vídeos</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="m-1">
                    <span class="jogo_id_outros_${debug_outro_nome}_extras hidden">0 Extras</span>
                </div>
                <div class="m-1">
                    <span class="jogo_id_outros_${debug_outro_nome}_analise hidden">Ánalise</span>
                </div>
                <div class="m-1 flex flex-col">
                    <div>
                        <span class="jogo_id_outros_${debug_outro_nome}_avisos_linkyt text-red-500 hidden">
                        <i class="fa fa-fw fa-exclamation-triangle"></i> 
                        <span class="jogo_id_outros_${debug_outro_nome}_avisos_linkyt_string">0 Vídeos no modelo antigo</span>
                        </span>
                    </div>
                    <div>
                        <span class="jogo_id_outros_${debug_outro_nome}_avisos_data text-yellow-500 hidden">
                        <i class="fa fa-fw fa-exclamation-triangle"></i> 
                        <span class="jogo_id_outros_${debug_outro_nome}_avisos_data_string">0 Vídeos sem data</span>
                        </span>
                    </div>
                </div>
                <div>
                    <details>
                        <summary>Tags</summary>
                        <span class="jogo_id_outros_${debug_outro_nome}_tags">${pesquisa_processar_string(debug_tags.replaceAll(/\s/g, "marcadorsuperespecifico")).replaceAll("marcadorsuperespecificomarcadorsuperespecifico", "marcadorsuperespecifico").replaceAll("marcadorsuperespecifico", ", ")}</span>
                    </details>
                </div>
            </div>
        `;

        debug_todos_outros[i].innerHTML += `${debug_outros_estrutura}`;

        fetch(`video/outros/${debug_outro_nome}/videos.json`)
        .then(response => response.json())
        .then(data => {
            //verificação de plataformas - OUTROS
            let json_video_plataforma_counter = {youtube: 0, gdrive: 0, archive: 0};

            for (var i = 0; i<data.videos.length; i++) {
                if (!data.videos[i].links.youtube == "") {
                    json_video_plataforma_counter.youtube++;
                }
                if (!data.videos[i].links.gdrive == "") {
                    json_video_plataforma_counter.gdrive++;
                }
                if (!data.videos[i].links.archive == "") {
                    json_video_plataforma_counter.archive++;
                }
            }

            if (json_video_plataforma_counter.youtube > 0) {
                let cur_element_class = ".jogo_id_outros_"+debug_outro_nome+"_episodios_youtube";
                document.querySelector(cur_element_class).classList.remove("hidden");
                document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.youtube} Vídeos`;
            }

            if (json_video_plataforma_counter.gdrive > 0) {
                let cur_element_class = ".jogo_id_outros_"+debug_outro_nome+"_episodios_gdrive";
                document.querySelector(cur_element_class).classList.remove("hidden");
                document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.gdrive} Vídeos`;
            }

            if (json_video_plataforma_counter.archive > 0) {
                let cur_element_class = ".jogo_id_outros_"+debug_outro_nome+"_episodios_archive";
                document.querySelector(cur_element_class).classList.remove("hidden");
                document.querySelector(cur_element_class+"_string").innerHTML = `${json_video_plataforma_counter.archive} Vídeos`;
            }

            if (data.hasOwnProperty("analise")) {
                let cur_element_class = ".jogo_id_outros_"+debug_outro_nome+"_analise";
                document.querySelector(cur_element_class).classList.remove("hidden");
            }

            if (data.hasOwnProperty("extras")) {
                let cur_element_class = ".jogo_id_outros_"+debug_outro_nome+"_extras";
                document.querySelector(cur_element_class).classList.remove("hidden");
                document.querySelector(cur_element_class).innerHTML = `${data.extras.length} Extras`;
            }

            document.querySelector(".jogo_id_outros_"+debug_outro_nome+"_episodios_total").classList.remove("hidden");
            document.querySelector(".jogo_id_outros_"+debug_outro_nome+"_episodios_total").innerHTML = `${data.videos.length} Vídeos no total`;

            //Detector de JSON antigo - OUTROS
            let json_antigo_outros_counter = 0;

            for (var i = 0; i<data.videos.length; i++) {
                if (data.videos[i].hasOwnProperty("linkyt")) {
                    json_antigo_outros_counter++;
                }
            }
            
            if (json_antigo_outros_counter > 0) {
                let cur_element_class = ".jogo_id_outros_"+debug_outro_nome+"_avisos_linkyt";
                document.querySelector(cur_element_class).classList.remove("hidden");
                document.querySelector(cur_element_class+"_string").innerHTML = `${json_antigo_outros_counter} Vídeos no modelo antigo`;
            }

            //Detector de data - OUTROS
            let json_data_outros_counter = 0;

            for (var i = 0; i<data.videos.length; i++) {
                if (!data.videos[i].hasOwnProperty("data") || data.videos[i].hasOwnProperty("data") && data.videos[i].data == "") {
                    json_data_outros_counter++;
                }
            }
            
            if (json_data_outros_counter > 0) {
                let cur_element_class = ".jogo_id_outros_"+debug_outro_nome+"_avisos_data";
                document.querySelector(cur_element_class).classList.remove("hidden");
                document.querySelector(cur_element_class+"_string").innerHTML = `${json_data_outros_counter} Vídeos sem data`;
            }
        })
    }

    //debug da aba Standalone
    console.log("(3/4) Adicionando informações de debug na aba [Independentes]");

    document.querySelectorAll(".standalone_titulo_youtube").forEach((element) =>
        element.innerHTML += `<hr class="m-1"><span>YouTube</span>`
    );

    document.querySelectorAll(".standalone_titulo_gdrive").forEach((element) =>
        element.innerHTML += `<hr class="m-1"><span>Google Drive</span>`
    );

    document.querySelectorAll(".standalone_titulo_archive").forEach((element) =>
        element.innerHTML += `<hr class="m-1"><span>Internet Archive</span>`
    );

    //Detector de JSON antigo - STANDALONE
    for (var i = 0; i<dados_geral.standalone.length; i++) {
        if (dados_geral.standalone[i].hasOwnProperty("linkyt")) {
            document.querySelector(".standalone_"+i).innerHTML += `<hr class="m-1"><span class="text-red-500"><i class="fa fa-fw fa-exclamation-triangle"></i> Vídeo no modelo antigo</span>`;
        }
    }

    //Detector de data - STANDALONE
    for (var i = 0; i<dados_geral.standalone.length; i++) {
        if (!dados_geral.standalone[i].hasOwnProperty("data") || dados_geral.standalone[i].hasOwnProperty("data") && dados_geral.standalone[i].data == "") {
            document.querySelector(".standalone_"+i).innerHTML += `<hr class="m-1"><span class="text-yellow-500"><i class="fa fa-fw fa-exclamation-triangle"></i> Vídeo sem data</span>`;
        }
    }

    //Adicionar Tags
    for (var i = 0; i<dados_geral.standalone.length; i++) {
        document.querySelector(".standalone_"+i).innerHTML += `
            <hr class="m-1">
            <details>
                <summary>Tags</summary>
                <span>${pesquisa_processar_string(dados_geral.standalone[i].tags.replaceAll(/\s/g, "marcadorsuperespecifico")).replaceAll("marcadorsuperespecificomarcadorsuperespecifico", "marcadorsuperespecifico").replaceAll("marcadorsuperespecifico", ", ")}</span>
            </details>
        `;
        //não me orgulho desse "marcadorsuperespecifico", mas funciona, então...
    }

    //debug da aba Franquias
    console.log("(4/4) Adicionando informações de debug na aba [Franquias]");

    for (var i = 0; i<Object.keys(dados_franquia).length; i++) {
        let franquia_id = Object.keys(dados_franquia)[i];
        document.querySelector(".franquia_titulo_"+franquia_id).innerHTML += `
            <hr class="m-1"><span class="franquia_titulo_${franquia_id}_jogos">${dados_franquia[franquia_id].jogos[0]}
        `;

        for (var ijogo = 1; ijogo<dados_franquia[franquia_id].jogos.length; ijogo++) {
            document.querySelector(".franquia_titulo_"+franquia_id+"_jogos").innerHTML += `, ${dados_franquia[franquia_id].jogos[ijogo]}`;
        }
    }

    //Adicionar Tags
    for (var i = 0; i<Object.keys(dados_franquia).length; i++) {
        let franquia_id = Object.keys(dados_franquia)[i];
        document.querySelector(".franquia_"+franquia_id).innerHTML += `
            <hr class="m-1">
            <details>
                <summary>Tags</summary>
                <span>${pesquisa_processar_string(dados_franquia[franquia_id].tags.replaceAll(/\s/g, "marcadorsuperespecifico")).replaceAll("marcadorsuperespecificomarcadorsuperespecifico", "marcadorsuperespecifico").replaceAll("marcadorsuperespecifico", ", ")}</span>
            </details>
        `;
    }

    console.groupEnd();

    return "✅ Modo de debug ativado";
}

function enable_debug_from_page() {
    if (document.querySelector("#inputPesquisa").value == "debug()") {
        fechar_pesquisa();
        debug();
    }
}

function debug_disable() {
    if (debug_mode) {
        debug_mode = false;
        document.body.classList.remove("debug_ativado");
        console.log("Modo de debug desativado");
    }
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

function get_plataforma_icon(plataforma) {
    switch(plataforma) {
        case "playlist":
            return "fa-list"
        break;
        case "youtube":
            return "fa-youtube-play"
        break;
        case "gdrive":
            return "fa-google"
        break;
        case "archive":
            return "fa-institution"
        break;
    }
}

function embed_replace(url, plataforma) {
    switch(plataforma) {
        case "youtube":
            url = url.replaceAll("youtu.be", "www.youtube.com/embed");
        break;
        case "gdrive":
            url = url.replaceAll("view", "preview");
        break;
        case "archive":
            url = url.replaceAll("details", "embed");
        break;
    }
    return url
}
