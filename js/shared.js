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

    check_egg();
}

window.addEventListener("pageshow", function() {
    let select = document.getElementById("themes_select");
    let salvo = null;
    try { salvo = localStorage.getItem("tema"); } catch (e) {}
    if (select && salvo && select.querySelector(`option[value="${salvo}"]`)) select.value = salvo;
});

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
var dados_console_keys = {};

//Baixa um JSON uma única vez por página: pedidos repetidos da mesma URL
//(ex.: o dados.json, que a página e o menu lateral usam) reaproveitam o mesmo download.
var json_em_cache = {};
function carregar_json(url) {
    if (!json_em_cache[url]) {
        json_em_cache[url] = fetch(url).then(resposta => resposta.json());
        json_em_cache[url].catch(() => delete json_em_cache[url]); //se falhar, a próxima tentativa baixa de novo
    }
    return json_em_cache[url];
}

function guardar_dados(tipo, dados) {
    switch(tipo) {
        case "geral":
            dados_geral = dados;
        break;
        case "jogo":
            dados_jogo = dados;
        break;
        case "serie":
            dados_serie = dados;
        break;
        case "lost":
            dados_off = dados;
        break;
        case "franquia":
            dados_franquia = dados;
        break;
    }
}

//baixa 1 ou 2 JSONs ao mesmo tempo, guarda nas variáveis dados_* e (se load) monta a página
async function fetch_dados(tipo,file,tipo2 = "",file2 = "",load = true) {
    let [json_data, json2_data] = await Promise.all([carregar_json(file), (file2 != "") ? carregar_json(file2) : null]);

    guardar_dados(tipo, json_data);
    if (file2 != "") guardar_dados(tipo2, json2_data);

    if (load) carregar_itens();
}


//pesquisa
var pesquisa_array = [];
var pesquisando = 0;

//A busca guarda o que foi digitado na hora, mas só redesenha a lista ao parar de digitar (150 ms).
var pesquisa_timer = null;

function pesquisarJogo() {
    pesquisa_array = pesquisa_processar_array(document.querySelector("#inputPesquisa").value);

    debug_disable();

    clearTimeout(pesquisa_timer);
    pesquisa_timer = setTimeout(atualizar_lista_da_pesquisa, 150);
}

function atualizar_lista_da_pesquisa() {
    pesquisa_timer = null;
    resetarJogos();
    carregar_itens();
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
        clearTimeout(pesquisa_timer);
        pesquisa_timer = null;
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
function gerar_timestamp(horas, minutos, segundos, stats=false) {
    if (!stats) {
        if (horas == 0 && minutos == 0 && segundos == 0) return "Perdido"

        if (horas > 0 && minutos < 10) minutos = String(minutos).padStart(2, '0');
        segundos = String(segundos).padStart(2, '0');

        if (horas > 0) return `${horas}:${minutos}:${segundos}`
        return `${minutos}:${segundos}`
    } else {
        if (segundos >= 60) {
            minutos += Math.trunc(segundos/60);
            segundos = segundos%60;
        }
        if (minutos >= 60) {
            horas += Math.trunc(minutos/60);
            minutos = minutos%60;
        }

        if (horas > 0) return `${horas}h ${minutos}m ${segundos}s`
        if (minutos > 0) return `${minutos}m ${segundos}s`
        return `${segundos}s`
    }
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

    carregar_json(json_url)
    .then(data => {
        let consoles = data.consoles;
        let temas = data.temas;

        //criar consoles
        for (var i = 0; i<consoles.length; i++){
            let console_nome = consoles[i].nome;
            let console_sigla = consoles[i].sigla;

            dados_console_keys[console_sigla] = console_nome;

            let console_url = "";
            if(modo == "404") console_url = `https://arquivomsf.github.io/console?id=${console_sigla}`;
            else console_url = `console?id=${console_sigla}`;

            document.querySelector(".console_list").insertAdjacentHTML("beforeend", `
                <a href="${console_url}" class="nav-link px-2 py-3 float-left w-auto border-none block outline-none transition-all duration-150 hover:bg-black/20 focus:bg-black/20">${console_nome} (${console_sigla.toUpperCase()})</a>`);
            
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
            document.querySelector("#themes_select").insertAdjacentHTML("beforeend", `
            <option value="${tema_valor}">${tema_nome}</option>`);
        }

        //se estiver no modo jogo/série, verificar jogos
        if (modo == "jogo" || modo == "outro") {
            let jogos_objeto = data.jogos;
            if (modo == "outro") jogos_objeto = data.outros;

            for (var i = 0; i<jogos_objeto.length; i++){
                let jogo_nome = jogos_objeto[i].nome;
                let jogo_nome_curto = jogos_objeto[i].curto;
                let jogo_console_sigla = jogos_objeto[i].console;
                if (modo == "outro") jogo_console_sigla = "outros";
                let jogo_console_nome = `${get_console_name(jogo_console_sigla)} (${jogo_console_sigla.toUpperCase()})`;

                //verificar se é o jogo atual pra tambem colocar no titulo da página
                if(jogo_nome_curto == parametro){
                    document.querySelector(".navbar-three").innerHTML = `${jogo_nome}`;
                    document.querySelector(".navbar-three-mobile").innerHTML = `${jogo_nome}`;
                    if (modo == "outro") {
                        document.querySelector(".navbar-two").innerHTML = `Outros`;
                        document.querySelector(".navbar-two").href = `https://arquivomsf.github.io/?tab=outros`;

                        document.querySelector(".navbar-two-sigla").innerHTML = `Outros`;
                        document.querySelector(".navbar-two-sigla").href = `https://arquivomsf.github.io/?tab=outros`;
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

    if (typeof jogoAtual !== 'undefined') if (jogoAtual == "evento-pascoa2026") try_egg(selected_tab);
}

//texto em que a busca procura: nome, "tags" (apelidos extras, opcionais), id curto, categoria (aba Outros),
//sigla do console e nome do console (os campos que o item não tem, como "console" nos independentes, ficam de fora)
function texto_de_busca(item) {
    let nome_do_console = item.console ? get_console_name(item.console) : "";
    return [item.nome, item.tags, item.curto, item.categoria, item.console, nome_do_console].filter(Boolean).join(" ");
}

//true se o item aparece na pesquisa atual (sem pesquisa, todos aparecem)
function item_corresponde_a_pesquisa(item) {
    let texto = pesquisa_processar_string(texto_de_busca(item));
    return pesquisa_array.every(v => texto.includes(v));
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

const DEBUG_PLATAFORMAS = ["youtube", "gdrive", "archive", "rumble"];

//ativar modo de debug que permite
    //ver a plataforma em que as séries ou vídeos estão disponíveis
    //ver se um jogo tem análise
    //ver avisos nos dados (formato antigo, vídeos sem data)
function debug() {
    if (document.body.classList.contains("debug_ativado")) return "⚠️ Erro: Modo de debug já ativado";
    if (window.location.pathname != "/" && window.location.pathname != "/index.html") return "⚠️ Erro: O modo de debug funciona apenas na página inicial\nhttps://arquivomsf.github.io/";
    if (pesquisa_array != "") return "⚠️ Erro: Tentativa de ativar o modo de debug durante uma pesquisa";

    console.group("Ativando modo de debug...");
    debug_mode = true;
    document.body.classList.add("debug_ativado");

    console.log("(1/4) Adicionando informações de debug na aba [Jogos]");
    debug_aba_jogos();

    console.log("(2/4) Adicionando informações de debug na aba [Outros]");
    debug_aba_outros();

    console.log("(3/4) Adicionando informações de debug na aba [Independentes]");
    debug_aba_standalone();

    console.log("(4/4) Adicionando informações de debug na aba [Franquias]");
    debug_aba_franquias();

    console.groupEnd();

    return "✅ Modo de debug ativado";
}

// ---------- ajudantes ----------

//os termos que a busca usa, em lista legível (tudo que o texto_de_busca considera, sem acento nem pontuação)
function debug_tags(item) {
    return texto_de_busca(item).split(/\s+/).map(palavra => pesquisa_processar_string(palavra)).filter(palavra => palavra != "").join(", ");
}

function debug_revelar(classe) {
    document.querySelector("."+classe).classList.remove("hidden");
}

function debug_texto(classe, texto) {
    document.querySelector("."+classe).innerHTML = texto;
}

//mostra a quantidade ao lado do ícone de uma plataforma
function debug_contagem(classe, quantidade) {
    debug_revelar(classe);
    debug_texto(classe+"_string", quantidade);
}

//mostra a etiqueta de análise: "Análise" ou, se o jogo tiver mais de uma, "N Análises"
function debug_analise(classe, analises) {
    debug_revelar(classe);
    debug_texto(classe, debug_chip(analises.length > 1 ? `${analises.length} Análises` : "Análise"));
}

//preenche o número do total de uma lista e mostra o bloco dela
function debug_total(base, texto) {
    debug_revelar(base+"_total");
    debug_texto(base+"_total_n", texto);
}

// ---------- HTML que o debug acrescenta aos cards ----------
// O debug aparece como um painel escuro dentro do card, com "etiquetas" (chips) coloridas:
//   cinza = informação, vermelho = erro nos dados (formato antigo), amarelo = aviso (sem data).
// Tudo nasce escondido ("hidden") com texto "0"; debug_analisar_lista revela e preenche o que existir.
// A cor e o formato das etiquetas ficam todos aqui nas constantes abaixo.

const DEBUG_CHIP = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-normal leading-tight";
const DEBUG_COR = {
    info: "bg-white/10 text-white",
    erro: "bg-red-500/20 text-red-300 ring-1 ring-red-500/50",
    aviso: "bg-yellow-500/20 text-yellow-200 ring-1 ring-yellow-500/50"
};
const DEBUG_ICONE_AVISO = `<i class="fa-solid fa-triangle-exclamation"></i>`;

//etiqueta pronta (ícone opcional já em HTML)
function debug_chip(texto, cor = "info", icone = "") {
    return `<span class="${DEBUG_CHIP} ${DEBUG_COR[cor]}">${icone}${texto}</span>`;
}

//o mesmo, mas nasce escondida; "classe" é o que debug_revelar/debug_texto usam para achá-la
function debug_chip_escondido(classe, texto, cor = "info", icone = "") {
    return `<span class="${classe} hidden">${debug_chip(texto, cor, icone)}</span>`;
}

//a moldura escura do painel; "linhas" são os blocos de dentro
function debug_painel(linhas) {
    return `
            <div class="mt-2 flex flex-col gap-1.5 rounded-lg border border-white/20 bg-black/30 p-2 text-left text-sm font-normal">${linhas}
            </div>`;
}

//uma fileira de etiquetas que quebra de linha quando falta espaço
function debug_fileira(etiquetas) {
    return `
                <div class="flex flex-wrap gap-1">${etiquetas}</div>`;
}

//bloco de uma lista: nome + total no topo e uma etiqueta por plataforma (youtube, gdrive, archive, rumble)
function debug_html_plataformas(base, unidade) {
    let etiquetas = DEBUG_PLATAFORMAS.map(plataforma => {
        let icone = get_plataforma_icon(plataforma).replace("pr-4 ", "");
        return `<span class="${base}_${plataforma} hidden"><span class="${DEBUG_CHIP} ${DEBUG_COR.info}"><i class="${icone}" title="${plataforma}"></i><span class="${base}_${plataforma}_string">0</span></span></span>`;
    }).join("");

    return `
                <div class="${base}_total hidden rounded-md bg-white/5 px-2 py-1.5">
                    <div class="flex items-baseline justify-between gap-2">
                        <span class="font-semibold">${unidade}</span>
                        <span class="${base}_total_n text-xs opacity-80">0</span>
                    </div>
                    <div class="mt-1 flex flex-wrap gap-1">${etiquetas}</div>
                </div>`;
}

//aviso vermelho (formato antigo) ou amarelo (sem data)
function debug_html_aviso(classe, cor, texto) {
    return `<span class="${classe} hidden">${debug_chip(`<span class="${classe}_string">${texto}</span>`, cor, DEBUG_ICONE_AVISO)}</span>`;
}

function debug_html_tags(item, classe_do_span = "") {
    let classe = (classe_do_span == "") ? "" : ` ${classe_do_span}`;
    return `
                <details class="text-xs">
                    <summary class="cursor-pointer opacity-80 text-base">Tags</summary>
                    <span class="break-words${classe}">${debug_tags(item)}</span>
                </details>`;
}

function debug_html_jogo(base, jogo) {
    return debug_painel(`${debug_html_plataformas(base+"_episodios", "Episódios")}${debug_html_plataformas(base+"_vods", "VODs")}${debug_fileira(
        debug_chip_escondido(base+"_vods_oficial", "0 VODs Oficiais") +
        debug_chip_escondido(base+"_episodios_extras", "0 Extras nos Episódios") +
        debug_chip_escondido(base+"_vods_extras", "0 Extras nos VODs") +
        debug_chip_escondido(base+"_analise", "Análise"))}${debug_fileira(
        debug_html_aviso(base+"_avisos_linkyt_episodios", "erro", "0 Episódios no modelo antigo") +
        debug_html_aviso(base+"_avisos_linkyt_vods", "erro", "0 VODs no modelo antigo") +
        debug_html_aviso(base+"_avisos_data_episodios", "aviso", "0 Episódios sem data") +
        debug_html_aviso(base+"_avisos_data_vods", "aviso", "0 VODs sem data"))}${debug_html_tags(jogo, base+"_tags")}`);
}

function debug_html_outro(base, outro) {
    return debug_painel(`${debug_html_plataformas(base+"_episodios", "Vídeos")}${debug_fileira(
        debug_chip_escondido(base+"_extras", "0 Extras") +
        debug_chip_escondido(base+"_analise", "Análise"))}${debug_fileira(
        debug_html_aviso(base+"_avisos_linkyt", "erro", "0 Vídeos no modelo antigo") +
        debug_html_aviso(base+"_avisos_data", "aviso", "0 Vídeos sem data"))}${debug_html_tags(outro, base+"_tags")}`);
}

// ---------- análise dos videos.json ----------

//Lê um videos.json e preenche o que o debug_html_* deixou escondido.
//c = nomes das classes e textos desta lista:
//    base (prefixo das classes de total/plataformas), unidade ("Episódios", "VODs"...),
//    extras, texto_extras, aviso_antigo, aviso_data, carregando, analise
function debug_analisar_lista(url, c) {
    if (c.carregando) {
        debug_total(c.base, "Carregando...");
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
        let videos = data.videos;

        //verificação de plataformas
        DEBUG_PLATAFORMAS.forEach(plataforma => {
            let quantidade = videos.filter(v => Object.hasOwn(v.links, plataforma) && v.links[plataforma] != "").length;
            if (quantidade > 0) debug_contagem(`${c.base}_${plataforma}`, quantidade);
        });

        if (c.analise && Object.hasOwn(data, "analise")) debug_analise(c.analise, data.analise);

        if (Object.hasOwn(data, "extras")) {
            debug_revelar(c.extras);
            debug_texto(c.extras, debug_chip(c.texto_extras(data.extras.length)));
        }

        debug_total(c.base, `${videos.length} no total`);

        //Detector de JSON antigo
        let antigos = videos.filter(v => Object.hasOwn(v, "linkyt")).length;
        if (antigos > 0) {
            debug_revelar(c.aviso_antigo);
            debug_texto(c.aviso_antigo+"_string", `${antigos} ${c.unidade} no modelo antigo`);
        }

        //Detector de data
        let sem_data = videos.filter(v => !Object.hasOwn(v, "data") || v.data == "").length;
        if (sem_data > 0) {
            debug_revelar(c.aviso_data);
            debug_texto(c.aviso_data+"_string", `${sem_data} ${c.unidade} sem data`);
        }
    })
}

// ---------- uma função por aba ----------

function debug_aba_jogos() {
    let titulos = document.querySelectorAll(".jogo_titulo");

    dados_geral.jogos.forEach((jogo, i) => {
        let base = `jogo_id_${jogo.console}_${jogo.curto}`;
        let pasta = `video/${jogo.console}/${jogo.curto}`;

        titulos[i].classList.add(base);
        document.querySelector("."+base).innerHTML += debug_html_jogo(base, jogo);

        fetch(`${pasta}/series.json`)
        .then(response => response.json())
        .then(series => {
            //olha o atributo [episodios] do jogo e o json dessa pasta
            if (Object.hasOwn(series, "episodios")) {
                debug_analisar_lista(`${pasta}/episodios/videos.json`, {
                    base: base+"_episodios", unidade: "Episódios", carregando: true,
                    extras: base+"_episodios_extras", texto_extras: n => `${n} Extras nos Episódios`,
                    aviso_antigo: base+"_avisos_linkyt_episodios", aviso_data: base+"_avisos_data_episodios"
                });
            }

            //olha o atributo [vodsarquivo] do jogo e o json da pasta [vods]
            if (Object.hasOwn(series, "vodsarquivo")) {
                debug_analisar_lista(`${pasta}/vods/videos.json`, {
                    base: base+"_vods", unidade: "VODs", carregando: true,
                    extras: base+"_vods_extras", texto_extras: n => `${n} Extras nos VODs`,
                    aviso_antigo: base+"_avisos_linkyt_vods", aviso_data: base+"_avisos_data_vods"
                });
            }

            if (Object.hasOwn(series, "vodsoficiais")) {
                debug_revelar(base+"_vods_oficial");
                debug_texto(base+"_vods_oficial", debug_chip(`${series.vodsoficiais[0].quantidade} VODs Oficiais`));
            }

            if (Object.hasOwn(series, "analise")) debug_analise(base+"_analise", series.analise);
        })
    });
}

function debug_aba_outros() {
    let titulos = document.querySelectorAll(".outro_titulo");

    dados_geral.outros.forEach((outro, i) => {
        let base = `jogo_id_outros_${outro.curto}`;

        titulos[i].innerHTML += debug_html_outro(base, outro);

        debug_analisar_lista(`video/outros/${outro.curto}/videos.json`, {
            base: base+"_episodios", unidade: "Vídeos", carregando: false, analise: base+"_analise",
            extras: base+"_extras", texto_extras: n => `${n} Extras`,
            aviso_antigo: base+"_avisos_linkyt", aviso_data: base+"_avisos_data"
        });
    });
}

function debug_aba_standalone() {
    let fontes = {youtube: "YouTube", gdrive: "Google Drive", archive: "Internet Archive", rumble: "Rumble"};

    Object.keys(fontes).forEach(fonte => {
        document.querySelectorAll(".standalone_titulo_"+fonte).forEach(el => el.innerHTML += debug_painel(debug_fileira(debug_chip(fontes[fonte]))));
    });

    dados_geral.standalone.forEach((video, i) => {
        let card = document.querySelector(".standalone_"+i);
        let avisos = "";

        //Detector de JSON antigo
        if (Object.hasOwn(video, "linkyt")) avisos += debug_chip("Vídeo no modelo antigo", "erro", DEBUG_ICONE_AVISO);

        //Detector de data
        if (!Object.hasOwn(video, "data") || video.data == "") avisos += debug_chip("Vídeo sem data", "aviso", DEBUG_ICONE_AVISO);

        card.innerHTML += debug_painel((avisos ? debug_fileira(avisos) : "") + debug_html_tags(video));
    });
}

function debug_aba_franquias() {
    Object.keys(dados_franquia).forEach(id => {
        let franquia = dados_franquia[id];
        let jogos = franquia.jogos.map(curto => debug_chip(curto)).join("");

        document.querySelector(".franquia_titulo_"+id).innerHTML += debug_painel(debug_fileira(jogos) + debug_html_tags(franquia));
    });
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
    return dados_console_keys[sigla];
}

function get_plataforma_icon(plataforma) {
    switch(plataforma) {
        case "playlist":
            return "pr-4 fa-solid fa-list"
        break;
        case "youtube":
            return "pr-4 fa-brands fa-youtube"
        break;
        case "gdrive":
            return "pr-4 fa-brands fa-google-drive"
        break;
        case "archive":
            return "pr-4 fa-brands fa-internet-archive"
        break;
        case "rumble":
            return "pr-4 fa-regular fa-circle-play"
        break;
        case "perdido":
            return "pr-4 fa-solid fa-xmark"
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
        case "rumble":
            //if (!url.includes("shorts")) url = `https://rumble.com/embed/${url.split("/")[3].split("-")[0]}`;
        break;
    }
    return url
}

function create_item(url="",type="",class_name="",i=0,console="",nome="",jogo="",thumbnail="",plataforma="",duracao="",serie="",id="",categoria="",data="") {
    if (type == "video") {
        if (url == "ep_serie") url = `href="embed?con=${console}&jogo=${jogo}&serie=${serie}&fonte=${plataforma}&id=${i}"`;
        else if (url == "ep_outro") url = `href="embed?con=${console}&jogo=${jogo}&fonte=${plataforma}&id=${i}"`;
        else if (url == "extra_serie") url = `href="embed?con=${console}&jogo=${jogo}&serie=${serie}&fonte=${plataforma}&extra=true&id=${id}"`;
        else if (url == "extra_outro") url = `href="embed?con=${console}&jogo=${jogo}&fonte=${plataforma}&extra=true&id=${id}"`;
        else url = `href="${url}" target="_blank"`;

        let extras_class = "";
        if (class_name == "extras_content_list") extras_class = "extras-item";

        document.querySelector("."+class_name).insertAdjacentHTML("beforeend", `
            <div class="${extras_class} p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                <a ${url} class="p-1 flex flex-col flex-auto gap-2 items-center">
                    <div class="relative h-auto">
                        <img src="${thumbnail}" class="w-auto h-auto aspect-video object-contain" loading="lazy" decoding="async">
                        <div class="video-duracao z-2 absolute bottom-[8px] right-[8px] bg-black/70">
                            <span class="px-2 text-white"><i class="${get_plataforma_icon(plataforma)}"></i>${duracao}</span>
                        </div>
                    </div>
                    <b class="text-center">${nome}</b>
                </a>
            </div>
        `);
        return
    }
    if (type == "playlist") {
        if (url == "serie") url = `href="serie?con=${console}&jogo=${jogo}&serie=${serie}"`;
        else url = `href="${url}" target="_blank"`;

        let extras_class = "";
        if (class_name == "extras_content_list") extras_class = "extras-item";

        //duracao = quantidade

        document.querySelector("."+class_name).insertAdjacentHTML("beforeend", `
            <div class="${extras_class} p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                <a ${url} class="p-1 flex flex-col flex-auto gap-2 items-center">
                    <div class="relative h-auto">
                        <img src="${thumbnail}" class="w-auto h-auto aspect-video object-contain" loading="lazy" decoding="async">
                        <div class="playlist-duracao z-2 absolute h-full w-[30%] bottom-0 right-0 bg-black/70">
                            <span class="z-2 absolute bottom-1/2 translate-1/2 right-1/2 text-white inline-block align-middle"><i class="${get_plataforma_icon("playlist")}"></i>${duracao}</span>
                        </div>
                    </div>
                    <b class="text-center">${nome}</b>
                </a>
            </div>
        `);
        return
    }
    if (type == "jogo") {
        if (url == "") url = `href="jogo?con=${console}&id=${jogo}"`;
        else url = `href="${url}" target="_blank"`;
        document.querySelector("."+class_name).insertAdjacentHTML("beforeend", `
            <div class="bg-white flex flex-col divide-y-1 divide-gray-300 shadow-md rounded-md border border-gray-200 cursor-pointer">
                <a ${url} class="p-2 flex flex-col flex-auto gap-2 items-center transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                    <div class="w-auto h-[225px]">
                        <img src="capas/${console}/${jogo}.webp" class="h-[225px] object-contain" loading="lazy" decoding="async">
                    </div>
                    <b class="jogo_titulo text-center">${nome}</b>
                </a>
                <a href="console?id=${console}" class="p-2 flex flex-row divide-x-1 divide-gray-300 flex-1 gap-2 items-center transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                    <p class="py-1 px-2 h-min w-fit m-auto flex-auto text-center">${get_console_name(console)}</p>
                    <p class="py-1 px-2 h-min w-fit m-auto flex-1 text-center">${console.toUpperCase()}</p>
                </a>
            </div>
        `);
        return
    }
    if (type == "jogo_alt") {
        if (url == "") url = `href="jogo?con=${console}&id=${jogo}"`;
        else url = `href="${url}" target="_blank"`;
        document.querySelector("."+class_name).insertAdjacentHTML("beforeend", `
            <div class="bg-white flex flex-col divide-y-1 divide-gray-300 shadow-md rounded-md border border-gray-200 cursor-pointer">
                <a ${url} class="p-2 flex flex-col flex-auto gap-2 items-center transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                    <div class="w-auto h-[225px]">
                        <img src="capas/${console}/${jogo}.webp" class="h-[225px] object-contain" loading="lazy" decoding="async">
                    </div>
                    <b class="jogo_titulo text-center">${nome}</b>
                </a>
            </div>
        `);
        return
    }
    if (type == "standalone") {
        if (url == "") url = `href="embed?con=${console}&jogo=${jogo}&fonte=${plataforma}"`;
        else url = `href="${url}" target="_blank"`;
        document.querySelector("."+class_name).insertAdjacentHTML("beforeend", `
            <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                <a ${url} class="p-1 flex flex-col flex-auto gap-2 items-center">
                    <div class="relative h-auto">
                        <img src="video/${console}/${thumbnail}" class="w-auto h-auto aspect-video object-contain" loading="lazy" decoding="async">
                        <div class="video-duracao z-2 absolute bottom-[8px] right-[8px] bg-black/70">
                            <span class="px-2 text-white"><i class="${get_plataforma_icon(plataforma)}"></i>${duracao}</span>
                        </div>
                    </div>
                    <b class="standalone_${i} standalone_titulo_${plataforma} text-center">${nome}</b>
                </a>
            </div>
        `);
        return
    }
    if (type == "outro") {
        if (url == "") url = `href="serie?con=${console}&jogo=${jogo}"`;
        else url = `href="${url}" target="_blank"`;
        document.querySelector("."+class_name).insertAdjacentHTML("beforeend", `
            <div class="p-1 bg-white flex flex-col shadow-md rounded-md border border-gray-200 cursor-pointer transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                <a ${url} class="p-1 flex flex-col flex-auto gap-2 items-center">
                    <div class="relative h-auto">
                        <img src="video/${console}/${jogo}/${thumbnail}" class="w-auto h-auto aspect-video object-contain" loading="lazy" decoding="async">
                        <div class="video-duracao z-2 absolute bottom-[8px] right-[8px] bg-black/70">
                            <span class="px-2 text-white">${categoria}</span>
                        </div>
                    </div>
                    <b class="outro_titulo text-center">${nome}</b>
                </a>
            </div>
        `);
        return
    }
    if (type == "off") {
        document.querySelector("."+class_name).insertAdjacentHTML("beforeend", `
            <div class="bg-white flex flex-col divide-y-1 divide-gray-300 shadow-md rounded-md border border-gray-200 transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                <div class="p-2 flex flex-col flex-auto gap-2 items-center">
                    <div class="relative h-auto">
                        <img src="video/etc/lost/${thumbnail}" class="thumbnail w-auto h-auto aspect-video object-contain" loading="lazy" decoding="async">
                        <div class="video-duracao z-2 absolute bottom-[8px] right-[8px] bg-black/70">
                            <span class="px-2 text-white">${duracao}</span>
                        </div>
                    </div>
                    <b class="text-center">${nome}</b>
                </div>
                <div class="p-2 flex flex-col flex-1 gap-2 items-center">
                    <p class="py-1 px-2 h-min w-fit m-auto">${data}</p>
                </div>
            </div>
        `);
        return
    }
}

var current_tab = "ep_page";

function try_egg(tab) {
    if(!check_egg()) {
        let random_number;
        if (current_tab != tab && tab == "ep_page") random_number = Math.floor(Math.random(50)*50);
        current_tab = tab;

        if (random_number == 49) window.location.href = "https://arquivomsf.github.io/video/outros/evento-pascoa2026/tree";
    }
}

function check_egg() {
    let egg = localStorage.getItem("egg");
    if (egg == null || egg == "undefined" || egg == false || egg == "false" || egg == "0" || egg == 0 || egg == "") {
        egg = false;
        localStorage.setItem("egg", egg);
    }
    else if (egg == true || egg == "true" || egg == "1" || egg == 1) {
        egg = true;
        localStorage.setItem("egg", egg);
    }

    if(egg) {
        if (document.querySelector(".egg_div") == null) {
            let spr_egg = "https://arquivomsf.github.io/video/outros/evento-pascoa2026/tree/spr_egg.png";
            document.querySelector("#sidebar_main").insertAdjacentHTML("beforeend", `
                <span class="px-2 py-4 float-left w-auto border-none block outline-none font-bold">Ovo</span>
                <div class="maislinks_list flex flex-col mb-3 egg_div">
                        <a title="Não tão importante, não tão desimportante." class="nav-link px-2 py-3 float-left w-auto border-none block outline-none transition-all duration-150 hover:bg-black/20 focus:bg-black/20">
                            <img src="${spr_egg}" title="Não tão importante, não tão desimportante." class="spr_egg" style="image-rendering: pixelated;">
                            <span class="sm:hidden scr_litemdesc_slash_scr_litemdesc_gml_36_0">Não tão importante, não tão desimportante.</span>
                        </a>
                    </div>
                </div>
            `);
        }
    }

    return egg;
}
