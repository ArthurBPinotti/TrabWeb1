function salvarAcessorio() {
    var codigo = document.getElementById('fCodigo').value;
    var nome = document.getElementById('fNome').value;
    var fornecedor = document.getElementById('fFornecedor').value;
    var valor = document.getElementById('fValor').value;
    var qtd = document.getElementById('fQtd').value;

    //Salva no localStorage
    var acessoriosCadastrados = JSON.parse(localStorage.getItem('acessorios'));
    
    //Procura pelo codigo (na ideia de ser um id unico)
    const objAcessorio = {
        'codigo': codigo,
        'nome' : nome,
        'fornecedor' : fornecedor,
        'valor' : valor,
        'qtd' : qtd
    }

    var indexObj = -1;

    console.log(acessoriosCadastrados);

    if (acessoriosCadastrados != null)
    {
        for (var idx = 0; idx < acessoriosCadastrados.length; ++idx)
        {
            if (acessoriosCadastrados[idx]['codigo'] == codigo)
            {
                indexObj = idx;
                break;
            }
        }
    }
    else
        acessoriosCadastrados = [];

    if (indexObj == -1) //Não encontrou nenhum com o mesmo codigo, deve adicioanr um novo
        acessoriosCadastrados.push(objAcessorio);
    else //Apenas editar o já existente
        acessoriosCadastrados[indexObj] = objAcessorio;

    localStorage.setItem('acessorios', JSON.stringify(acessoriosCadastrados));

    recarregaTabelaAcessorios();
}

function recarregaTabelaAcessorios() //Limpa e remonta a tabela na tela de cadastros pra considerar as edições e remoções
{
    var corpoTabela = document.getElementById("corpoTabelaAcessorios");
    corpoTabela.innerHTML = "";

    const acessoriosCadastrados = JSON.parse(localStorage.getItem('acessorios'));
    console.log(acessoriosCadastrados);

    for (var idx = 0; idx < acessoriosCadastrados.length; ++idx)
    {
        var novaLinha = document.createElement("tr");
        const acessorio = acessoriosCadastrados[idx];

        for (var chave in acessorio)
        {
            var novaCelula = document.createElement("td");
            novaCelula.innerText = acessorio[chave];
            novaLinha.appendChild(novaCelula);
        }

        //Adiciona os botões para editar e excluir
        novaLinha.innerHTML += '<button onClick="carregarInfo(' + acessorio['codigo'] + ')" class="btnAcao btn-primary">Editar</button>';
        novaLinha.innerHTML += '<button onClick="excluirAcessorio(' + acessorio['codigo'] + ')" class="btnAcao btn-danger">Excluir</button>'

        corpoTabela.appendChild(novaLinha);
    }
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
