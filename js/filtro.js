const categorias = [
    'Bebida',
    'Alimento',
    'Eletrônicos',
    'Higiene Pessoal',
    'Vestuário',
    'Casa',
    'Acessórios'
];

// Função para preencher o select com as categorias
function preencherSelectCategorias() {
    const selects = [
        document.getElementById('categoria-select'),
        document.getElementById('categoria')
    ];

    selects.forEach(select => {
        // Limpa o select antes de preencher para evitar duplicatas
        select.innerHTML = '<option value="null">Selecione a categoria</option>';

        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.toLowerCase()
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .replace(/\s+/g, '-');
            option.textContent = categoria;
            select.appendChild(option);
        });
    });
}

// Função para filtrar os produtos pela categoria selecionada
function filtrarPorCategoria() {
    const categoriaSelecionada = document.getElementById('categoria-select').value;
    
    // Se a categoria selecionada for "null", exibe todos os produtos
    if (categoriaSelecionada === "null") {
        produtosFiltrados = [...produtos]; // Reseta para todos os produtos
    } else {
        produtosFiltrados = produtos.filter(produto => {
            return produto.categoria.toLowerCase().replace(/\s+/g, '-') === categoriaSelecionada;
        });
    }

    paginaAtual = 1;  // Resetar para a primeira página
    carregarProdutos();  // Recarregar os produtos filtrados
    controlarPaginacao();  // Atualizar a paginação
}

// Adicionar evento de mudança no select para filtrar produtos
document.getElementById('categoria-select').addEventListener('change', filtrarPorCategoria);

// Função de filtro de pesquisa (já existente)
function filtrarProdutos() {
    const pesquisaInput = document.getElementById('pesquisa-produto').value.toLowerCase();
    produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(pesquisaInput));
    carregarProdutos();
    controlarPaginacao();
}

// Adicionar evento de input no campo de pesquisa
document.getElementById('pesquisa-produto').addEventListener('input', filtrarProdutos);

// Preencher as categorias no select ao carregar a página
window.onload = () => {
    preencherSelectCategorias();
    carregarProdutos();
    controlarPaginacao();
};
