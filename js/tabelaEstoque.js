const produtos = [
    { nome: 'Coca-Cola sem açúcar', quantidade: 16, categoria: 'Bebida', validade: '12/12/2026', valor: 'R$ 30,90' },
    { nome: 'Arroz Integral', quantidade: 5, categoria: 'Alimento', validade: '05/11/2025', valor: 'R$ 20,50' },
    { nome: 'Macbook Pro 16”', quantidade: 1, categoria: 'Eletrônicos', validade: '20/08/2025', valor: 'R$ 14.499,00' },
    { nome: 'Café Torrado', quantidade: 500, categoria: 'Alimento', validade: '18/05/2024', valor: 'R$ 12,80' },
    { nome: 'Shampoo L\'Oréal', quantidade: 350, categoria: 'Higiene Pessoal', validade: '22/02/2026', valor: 'R$ 35,90' },
    { nome: 'Fone de Ouvido JBL', quantidade: 1, categoria: 'Eletrônicos', validade: '10/10/2025', valor: 'R$ 299,00' },
    { nome: 'Suco de Laranja Natural', quantidade: 1, categoria: 'Bebida', validade: '01/04/2024', valor: 'R$ 7,90' },
    { nome: 'Suco de Abacaxi Industrializado', quantidade: 15, categoria: 'Bebida', validade: '01/04/2024', valor: 'R$ 7,90' },
    { nome: 'Sabonete Dove', quantidade: 90, categoria: 'Higiene Pessoal', validade: '30/11/2025', valor: 'R$ 4,50' },
    { nome: 'Camiseta Nike', quantidade: 1, categoria: 'Vestuário', validade: '15/07/2025', valor: 'R$ 119,90' },
    { nome: 'Tênis Adidas', quantidade: 2, categoria: 'Vestuário', validade: '10/10/2026', valor: 'R$ 299,90' },
    { nome: 'Suco de Maça Natural', quantidade: 1, categoria: 'Bebida', validade: '01/04/2024', valor: 'R$ 7,90' },
    { nome: 'Lixeira de Cozinha', quantidade: 1, categoria: 'Casa', validade: '20/05/2027', valor: 'R$ 49,90' },
    { nome: 'Blusa Hering', quantidade: 1, categoria: 'Vestuário', validade: '05/01/2026', valor: 'R$ 69,90' },
    { nome: 'Suco de Goiaba Natural', quantidade: 10, categoria: 'Bebida', validade: '01/04/2024', valor: 'R$ 7,90' },
    { nome: 'Mochila de Viagem', quantidade: 1, categoria: 'Acessórios', validade: '10/08/2025', valor: 'R$ 149,00' }
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
                    <span>
                      Editar
                       <img src="img/icons/edit-3.png" alt="">
                    </span>
                    <span>
                        Excluir
                        <img src="img/icons/trash-2.png" alt="">
                    </span>
                </div>
            </td>
        `;

        tbody.appendChild(tr);

        // Adicionar os eventos para cada botão "Opções"
        const likeBtn = tr.querySelector('.like-btn');
        const reactionModal = tr.querySelector(`#${modalId}`);

        // Mostrar o modal ao passar o mouse sobre o botão "Opções"
        likeBtn.addEventListener('mouseenter', () => {
            reactionModal.style.display = 'block';
        });

        // Mostrar o modal ao passar o mouse sobre o próprio modal de reações
        reactionModal.addEventListener('mouseenter', () => {
            reactionModal.style.display = 'block';
        });

        // Esconder o modal quando o mouse sair do botão e do modal de reações
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
    });

    // Atualizar o número da página no formato "1/2"
    const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
    document.getElementById('pageNumber').textContent = `${paginaAtual}/${totalPaginas}`;
}

// Função para controlar a navegação entre páginas
function controlarPaginacao() {
    const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);

    // Navegação para a página anterior
    document.getElementById('prevPage').addEventListener('click', () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            carregarProdutos();
        }
    });

    // Navegação para a próxima página
    document.getElementById('nextPage').addEventListener('click', () => {
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            carregarProdutos();
        }
    });
}

// Função para filtrar produtos com base na pesquisa
function filtrarProdutos() {
    const pesquisaInput = document.getElementById('pesquisa-produto').value.toLowerCase();
    produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(pesquisaInput));
    paginaAtual = 1;  // Resetar para a primeira página
    carregarProdutos();
    controlarPaginacao();
}

// Adicionar evento de input no campo de pesquisa
document.getElementById('pesquisa-produto').addEventListener('input', filtrarProdutos);

// Carregar os produtos e configurar a navegação ao carregar a página
window.onload = () => {
    carregarProdutos();
    controlarPaginacao();
};
