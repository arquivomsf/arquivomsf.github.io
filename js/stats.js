// Página de estatísticas: lê todos os JSONs do acervo e soma quantidades e durações.

//busca um JSON; se falhar (arquivo faltando, etc.), avisa no console e segue sem ele
async function buscar_json(url) {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(resposta.status);
        return await resposta.json();
    } catch (erro) {
        console.warn(`stats: não consegui ler ${url} (${erro})`);
        return null;
    }
}

function escrever(classe, texto) {
    document.querySelector("."+classe).innerHTML = texto;
}

//Resultado de uma lista de vídeos (videos + extras de um videos.json): quantos são e quanto duram.
//Todos os tempos ficam em segundos; só viram "1h 2m 3s" na hora de exibir.
function somar_videos(dados_json) {
    const itens = [...(dados_json.videos || []), ...(dados_json.extras || [])];
    const segundos = itens.reduce((total, v) => total + v.duracao.horas*3600 + v.duracao.minutos*60 + v.duracao.segundos, 0);
    return { quantidade: itens.length, segundos: segundos };
}

function somar_listas(listas) {
    return listas.filter(l => l).map(somar_videos).reduce(
        (soma, l) => ({ quantidade: soma.quantidade + l.quantidade, segundos: soma.segundos + l.segundos }),
        { quantidade: 0, segundos: 0 });
}

function tempo_formatado(segundos) {
    return gerar_timestamp(0, 0, segundos, true);
}

async function carregarStats() {
    carregar_consoles_temas("normal","");

    escrever("counter-stickers", `${stickers_array.length} figurinhas do canal`);
    escrever("counter-stikersfollowers", `${followers_array.length} figurinhas dos seguidores`);

    const dados = await buscar_json("dados.json");
    escrever("counter-con", `${dados.consoles.length} consoles`);
    escrever("counter-jogo", `${dados.jogos.length} jogos`);

    //busca tudo em paralelo
    const [jogos, outros, lostmedia] = await Promise.all([
        Promise.all(dados.jogos.map(async jogo => {
            const pasta = `video/${jogo.console}/${jogo.curto}`;
            const series = await buscar_json(`${pasta}/series.json`);
            return {
                episodios: series && Object.hasOwn(series, "episodios") ? await buscar_json(`${pasta}/episodios/videos.json`) : null,
                vods: series && Object.hasOwn(series, "vodsarquivo") ? await buscar_json(`${pasta}/vods/videos.json`) : null
            };
        })),
        Promise.all(dados.outros.map(outro => buscar_json(`video/outros/${outro.curto}/videos.json`))),
        buscar_json("off.json")
    ]);

    const episodios = somar_listas(jogos.map(j => j.episodios));
    const vods = somar_listas(jogos.map(j => j.vods));
    const jogos_com_vod = jogos.filter(j => j.vods).length;
    const standalone = somar_videos({ videos: dados.standalone });
    const outros_soma = somar_listas(outros);

    const jogos_segundos = episodios.segundos + vods.segundos;
    const total_videos = episodios.quantidade + vods.quantidade + standalone.quantidade + outros_soma.quantidade;
    const total_segundos = jogos_segundos + standalone.segundos + outros_soma.segundos;

    escrever("counter-total", `${total_videos} vídeos arquivados`);
    escrever("counter-tempototal", `${tempo_formatado(total_segundos)} de vídeos arquivados`);

    escrever("counter-tempototaljogo", `${tempo_formatado(jogos_segundos)} de vídeos de jogos`);

    if (episodios.quantidade > 0) {
        escrever("counter-ep", `${episodios.quantidade} vídeos de jogos`);
        escrever("counter-mediaep", `${Math.round(episodios.quantidade/dados.jogos.length)} vídeos por jogo (média)`);
    }

    if (vods.quantidade > 0) {
        escrever("counter-vods", `${vods.quantidade} VODs de jogos`);
        escrever("counter-mediavod", `${Math.round(vods.quantidade/jogos_com_vod)} VODs por jogo (média)`);
    }

    escrever("counter-standalone", `${dados.standalone.length} vídeos independentes`);
    escrever("counter-tempototalstandalone", `${tempo_formatado(standalone.segundos)} de vídeos independentes`);

    if (outros_soma.quantidade > 0) escrever("counter-outros", `${outros_soma.quantidade} vídeos marcados como "outros"`);
    escrever("counter-tempototaloutros", `${tempo_formatado(outros_soma.segundos)} de vídeos marcados como "outros"`);

    if (lostmedia) {
        escrever("counter-lostmedia", `${lostmedia.lostmedia.length} vídeos perdidos`);

        const fortnite = lostmedia.lostmedia.filter(item => pesquisa_processar_string(texto_de_busca(item)).includes("fortnite")).length;
        if (fortnite > 0) escrever("counter-lostfortnite", `e ${fortnite} desses são de Fortnite (informação relevante)`);
    }
}
