function converterDataParaInputDate(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

function normalizarCategoria(categoria) {
    return categoria.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-');
}

function preencherFormularioEditar(produto) {
    document.querySelector('#container-cadastro input[name="nome"]').value = produto.nome;
    document.querySelector('#container-cadastro select[name="category"]').value = normalizarCategoria(produto.categoria);
    document.querySelector('#container-cadastro input[name="observacao"]').value = produto.observacao || '';
    document.querySelector('#container-cadastro input[name="valor"]').value = produto.valor;

    if (produto.validade) {
        const validadeFormatada = converterDataParaInputDate(produto.validade);
        document.querySelector('#container-cadastro input[name="dataCadastro"]').value = validadeFormatada;
    }

    document.querySelector('#container-cadastro input[name="quantidade"]').value = produto.quantidade;

    const botaoCadastrar = document.getElementById('btn-cadastrar');
    botaoCadastrar.querySelector('span').textContent = 'ALTERAR';

    botaoCadastrar.setAttribute('data-id-edicao', produto.id);

    trocarConteudo('cadastro');
}

// Função para limpar todos os campos do formulário
function limparFormularioCadastro() {
    document.querySelector('#container-cadastro input[name="nome"]').value = '';
    document.querySelector('#container-cadastro select[name="category"]').value = 'null';
    document.querySelector('#container-cadastro input[name="observacao"]').value = '';
    document.querySelector('#container-cadastro input[name="valor"]').value = '';
    document.querySelector('#container-cadastro input[name="dataCadastro"]').value = '';
    document.querySelector('#container-cadastro input[name="quantidade"]').value = '';

    const botaoCadastrar = document.getElementById('btn-cadastrar');
    botaoCadastrar.querySelector('span').textContent = 'CADASTRAR';
    botaoCadastrar.removeAttribute('data-id-edicao');
}

// Adicionar evento ao botão CANCELAR para limpar o formulário
document.querySelector('#container-cadastro .btn[style*="red"]').addEventListener('click', limparFormularioCadastro);


const botaoCadastrar = document.getElementById('btn-cadastrar');
botaoCadastrar.addEventListener('click', () => {
    const idEdicao = botaoCadastrar.getAttribute('data-id-edicao');
    if (idEdicao) {
        alert("editar");
    } else {
        alert("Salvar");
    }
});