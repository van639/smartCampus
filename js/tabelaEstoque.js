let contadorId = 1;  // Inicializamos o contador de IDs

const produtos = [
    { id: contadorId++, nome: 'Coca-Cola sem açúcar', quantidade: 16, categoria: 'Bebida', validade: '12/12/2026', valor: 'R$ 30,90', observacao: 'Sem açúcar', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Arroz Integral', quantidade: 5, categoria: 'Alimento', validade: '05/11/2025', valor: 'R$ 20,50', observacao: 'Integral', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Macbook Pro 16”', quantidade: 1, categoria: 'Eletrônicos', validade: '20/08/2025', valor: 'R$ 14.499,00', observacao: 'Modelo 2023', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Café Torrado', quantidade: 500, categoria: 'Alimento', validade: '18/05/2024', valor: 'R$ 12,80', observacao: 'Produto orgânico', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Shampoo L\'Oréal', quantidade: 350, categoria: 'Higiene Pessoal', validade: '22/02/2026', valor: 'R$ 35,90', observacao: 'Para cabelo seco', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Fone de Ouvido JBL', quantidade: 1, categoria: 'Eletrônicos', validade: '10/10/2025', valor: 'R$ 299,00', observacao: 'Com cancelamento de ruído', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Suco de Laranja Natural', quantidade: 1, categoria: 'Bebida', validade: '01/04/2024', valor: 'R$ 7,90', observacao: 'Sem conservantes', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Suco de Abacaxi Industrializado', quantidade: 15, categoria: 'Bebida', validade: '01/04/2024', valor: 'R$ 7,90', observacao: 'Com açúcar', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Sabonete Dove', quantidade: 90, categoria: 'Higiene Pessoal', validade: '30/11/2025', valor: 'R$ 4,50', observacao: 'Hidratante', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Suco de Maça Natural', quantidade: 13, categoria: 'Bebida', validade: '01/04/2024', valor: 'R$ 7,90', observacao: 'Sem conservantes', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Camiseta Nike', quantidade: 1, categoria: 'Vestuário', validade: '15/07/2025', valor: 'R$ 119,90', observacao: 'Tamanho M', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Suco de Uva Natural', quantidade: 10, categoria: 'Bebida', validade: '01/04/2024', valor: 'R$ 7,90', observacao: 'Sem conservantes', dataCadastro: new Date().toLocaleDateString() },
    { id: contadorId++, nome: 'Tênis Adidas', quantidade: 2, categoria: 'Vestuário', validade: '10/10/2026', valor: 'R$ 299,90', observacao: 'Tênis casual', dataCadastro: new Date().toLocaleDateString() }
];

const itensPorPagina = 8;
let paginaAtual = 1;

let produtosFiltrados = [...produtos]; // Inicializa com todos os produtos

function carregarProdutos() {
    const tbody = document.getElementById('product-list');
    const paginaInicial = (paginaAtual - 1) * itensPorPagina;
    const produtosPagina = produtosFiltrados.slice(paginaInicial, paginaInicial + itensPorPagina);

    tbody.innerHTML = '';

    produtosPagina.forEach((produto, index) => {
        const tr = document.createElement('tr');
        const modalId = `reaction-modal-${index}`;

        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.categoria}</td>
            <td>${produto.validade}</td>
            <td>${produto.valor}</td>
            <td class="img-opcoes">
                <img src="img/icons/opcoes.png" alt="Opções" class="like-btn" data-modal="${modalId}" />
                <div class="reaction-modal" id="${modalId}">
                    <span class="editar" data-id="${produto.id}">
                      Editar
                       <img src="img/icons/edit-3.png" alt="Editar">
                    </span>
                    <span class="excluir" data-id="${produto.id}">
                        Excluir
                        <img src="img/icons/trash-2.png" alt="Excluir">
                    </span>
                </div>
            </td>
        `;

        tbody.appendChild(tr);

        // Adicionar evento de edição
        const editarBtn = tr.querySelector('.editar');
        editarBtn.addEventListener('click', () => {
            const produtoId = editarBtn.getAttribute('data-id');
            const produto = produtos.find(p => p.id == produtoId);
            preencherFormularioEditar(produto);
        });

        // Mostrar o modal ao passar o mouse sobre o botão "Opções"
        const likeBtn = tr.querySelector('.like-btn');
        const reactionModal = tr.querySelector(`#${modalId}`);

        likeBtn.addEventListener('mouseenter', () => {
            reactionModal.style.display = 'block';
        });

        reactionModal.addEventListener('mouseenter', () => {
            reactionModal.style.display = 'block';
        });

        likeBtn.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!reactionModal.matches(':hover')) {
                    reactionModal.style.display = 'none';
                }
            }, 100);
        });

        reactionModal.addEventListener('mouseleave', () => {
            reactionModal.style.display = 'none';
        });

        // Adicionar evento de exclusão
        const excluirBtn = tr.querySelector('.excluir');
        excluirBtn.addEventListener('click', () => {
            mostrarModalConfirmacao(excluirBtn.getAttribute('data-id'));
        });
    });

    // Atualizar o número da página
    const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
    document.getElementById('pageNumber').textContent = `${paginaAtual}/${totalPaginas}`;
}

// Função de navegação de páginas
function controlarPaginacao() {
    const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

    document.getElementById('prevPage').addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            carregarProdutos();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            carregarProdutos();
        }
    });
}

// Função para mostrar a modal de confirmação
function mostrarModalConfirmacao(idProduto) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <p>Tem certeza que deseja excluir esse produto?</p>
            <button id="confirmarSim">Sim</button>
            <button id="confirmarNao">Não</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Adicionar eventos para os botões de confirmação
    document.getElementById('confirmarSim').addEventListener('click', () => {
        excluirProduto(idProduto);
        document.body.removeChild(modal);
    });

    document.getElementById('confirmarNao').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Função para excluir o produto
function excluirProduto(id) {
    // Remove o produto com o id específico
    produtosFiltrados = produtosFiltrados.filter(p => p.id !== parseInt(id));
    carregarProdutos();  // Atualiza a lista de produtos
    alert('Produto excluído com sucesso!');
}

