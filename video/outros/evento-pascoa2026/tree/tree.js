function carregarDados() {
    if (check_egg()) update_step(5);

    fetch_dados("geral","https://arquivomsf.github.io/dados.json","","",false);
    carregar_consoles_temas("404","https://arquivomsf.github.io/dados.json");
}

function update_step(step) {
    document.querySelectorAll(".tela").forEach(el => {
        el.classList.add("hidden");
    });

    document.querySelector(".step-"+step).classList.remove("hidden");
}

function get_egg() {
    localStorage.setItem("egg", true);

    check_egg();
}

function unleash() {
    document.querySelector(".man_ogg").play();
    document.querySelector(".darkness").classList.add("hidden");
}
