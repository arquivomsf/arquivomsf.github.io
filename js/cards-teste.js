function start() {
    carregarDados();
}

function carregarDados() {
    procurarParam();
    fetch_dados("geral","dados.json");
    carregar_consoles_temas("normal","");
}

function procurarParam() {
  let searchParams = new URLSearchParams(window.location.search);
  let classes_cores = searchParams.get('classes_cores');

  if (classes_cores == null) classes_cores = false;
  else if (classes_cores == "") classes_cores = true;
  else classes_cores = false;

  try_cores(classes_cores);
}

function try_cores(classes_cores) {
    if (!classes_cores) return;

    document.body.querySelector(".debug_classes_text").classList.toggle("hidden", false);

    for (current of document.body.querySelectorAll(".item_card")) {current.style = "border: 5px solid black !important"};
    for (current of document.body.querySelectorAll(".item_info_main")) {current.style = "background-color: green !important"};
    for (current of document.body.querySelectorAll(".item_info_label")) {current.style = "background-color: red !important"};
    for (current of document.body.querySelectorAll(".item_info_desc")) {current.style = "background-color: pink !important"};
    for (current of document.body.querySelectorAll(".item_info_debug")) {current.style = "background-color: lightblue !important"};
}
