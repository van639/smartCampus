// Função de filtro
function filtrarProdutos() {
    const pesquisaInput = document.getElementById('pesquisa-produto').value.toLowerCase();
    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(pesquisaInput));
    carregarProdutos(produtosFiltrados);
    controlarPaginacao(produtosFiltrados);
}

// Adicionar evento de input no campo de pesquisa
document.getElementById('pesquisa-produto').addEventListener('input', filtrarProdutos);