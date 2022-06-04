function salvarAcessorio() {
    var codigo = document.getElementById('fCodigo').value;
    var nome = document.getElementById('fNome').value;
    var fornecedor = document.getElementById('fFornecedor').value;
    var valor = document.getElementById('fValor').value;
    var qtd = document.getElementById('fQtd').value;

    const objAcessorio = {
        'codigo': codigo,
        'nome' : nome,
        'fornecedor' : fornecedor,
        'valor' : valor,
        'qtd' : qtd
    }

    //Salva no localStorage
    var acessoriosCadastrados = localStorage.getItem('acessorios');
    
    //Procura para editar ou dar push
    localStorage.setItem('acessorio' + codigo, JSON.stringify(objAcessorio));

    adicionaAcessorio(codigo);
}

function recarregaTabelaAcessorios() //Limpa e remonta pra considerar as edições e remoções
{
    var corpoTabela = document.getElementById("corpoTabelaAcessorios");
    var novaLinha = document.createElement("tr");

    var objAcessorio = JSON.parse(localStorage.getItem('acessorio'+codigo));

    for (var chave in objAcessorio) {
        var novaCelula = document.createElement("td");
        novaCelula.innerText = objAcessorio[chave];
        novaLinha.appendChild(novaCelula);
    }

    //Adiciona os botões para editar e excluir
    novaLinha.innerHTML += '<button onClick="carregarInfo(' + codigo + ')" class="btnAcao btn-primary">Editar</button>';
    novaLinha.innerHTML += '<button onClick="excluirAcessorio(' + codigo + ')" class="btnAcao btn-danger">Excluir</button>'

    corpoTabela.appendChild(novaLinha);
}

function adicionaAcessorio(codigo)
{
    var corpoTabela = document.getElementById("corpoTabelaAcessorios");
    var novaLinha = document.createElement("tr");

    var objAcessorio = JSON.parse(localStorage.getItem('acessorio'+codigo));

    for (var chave in objAcessorio) {
        var novaCelula = document.createElement("td");
        novaCelula.innerText = objAcessorio[chave];
        novaLinha.appendChild(novaCelula);
    }

    //Adiciona os botões para editar e excluir
    novaLinha.innerHTML += '<button onClick="carregarInfo(' + codigo + ')" class="btnAcao btn-primary">Editar</button>';
    novaLinha.innerHTML += '<button onClick="excluirAcessorio(' + codigo + ')" class="btnAcao btn-danger">Excluir</button>'

    corpoTabela.appendChild(novaLinha);
}

function carregarInfo(codigo)
{
    var objAcessorio = JSON.parse(localStorage.getItem('acessorio'+ codigo));

    document.getElementById('fCodigo').value = objAcessorio['codigo'];
    document.getElementById('fNome').value = objAcessorio['nome'];
    document.getElementById('fFornecedor').value = objAcessorio['fornecedor'];
    document.getElementById('fValor').value = objAcessorio['valor'];
    document.getElementById('fQtd').value = objAcessorio['qtd'];
}

function excluirAcessorio(codigo)
{
    localStorage.removeItem('acessorio' + codigo);
}
