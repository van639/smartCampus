function trocarConteudo(pagina) {
    const home = document.getElementById("container-home");
    const cadastro = document.getElementById("container-cadastro");
    const estoque = document.getElementById("container-estoque");
    const filtro = document.getElementById("filtro-estoque");

    home.style.display = "none";
    cadastro.style.display = "none";
    estoque.style.display = "none";

    if (pagina === "home") {
        home.style.display = "block";
        filtro.style.display = "none";
    } else if (pagina === "cadastro") {
        cadastro.style.display = "block";
        filtro.style.display = "none";
    } else if (pagina === "estoque") {
        estoque.style.display = "block";
        filtro.style.display = "block";
    }
}