function carregarDados() {
    fetch("videos.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.videos.length; i++){
              let vnome = data.videos[i].nome;
              let vimagem = data.videos[i].imagem;
              let vlink = data.videos[i].link;
              document.querySelector("#jsonParent").innerHTML += `
                <div class="col">
                  <a href="${vlink}" class="blacklink">
                    <img src="${i+1}.${vimagem}" alt="" class="img-fluid linkicon"><br>
                    <span class="flow-text title">${vnome}</span>
                  </a>
                </div>`;
          }
      })
    fetch("../../../dados.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.consoles.length; i++){
              let cnome = data.consoles[i].nome;
              let csigla = data.consoles[i].sigla;
              document.querySelector("#conJsonParent").innerHTML += `
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="../../${csigla}">${cnome}</a>
                </li>`;
          }
      })
}