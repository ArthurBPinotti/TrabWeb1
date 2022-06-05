function salvarAcessorio() {
    //Validação dos dados por aqui para náo depender dos eventos do form
    const codigo = document.getElementById('fCodigo').value;
    if (codigo == "")
    {
        alert("O código deve ser informado!");
        document.getElementById("fCodigo").focus();
        return;
    }

    const nome = document.getElementById('fNome').value;
    if (nome == "")
    {
        alert("O nome deve ser informado!");
        document.getElementById("fNome").focus();
        return;
    }

    const fornecedor = document.getElementById('fFornecedor').value;
    if (fornecedor == "")
    {
        alert("O fornecedor deve ser informado!");
        document.getElementById("fFornecedor").focus();
        return;
    }

    const valor = document.getElementById('fValor').value;
    if (valor == "")
    {
        alert("O fornecedor deve ser informado!");
        document.getElementById("fFornecedor").focus();
        return;
    }
    
    const qtd = document.getElementById('fQtd').value;
    if (qtd == "")
    {
        alert("A quantidade em estoque deve ser informada!");
        document.getElementById("fQtd").focus();
        return;
    }

    var acessoriosCadastrados = JSON.parse(localStorage.getItem('acessorios'));
    
    const objAcessorio = {
        'codigo': codigo,
        'nome' : nome,
        'fornecedor' : fornecedor,
        'valor' : valor,
        'qtd' : qtd
    }

    if (acessoriosCadastrados == null)
        acessoriosCadastrados = [];

    var indexObj = pegaIndexPorCodigo(codigo);

    if (indexObj == -1) //Não encontrou nenhum com o mesmo codigo, deve adicioanr um novo
        acessoriosCadastrados.push(objAcessorio);
    else //Apenas editar o já existente
        acessoriosCadastrados[indexObj] = objAcessorio;

    localStorage.setItem('acessorios', JSON.stringify(acessoriosCadastrados));

    recarregaTabelaAcessorios("cadastro");
}

function recarregaTabelaAcessorios(tipo) //Limpa e remonta a tabela na tela de cadastros pra considerar as edições e remoções
{
    var corpoTabela = null;

    console.log("tipo : " + tipo);

    if (tipo == "cadastro")
        corpoTabela = document.getElementById("corpoTabelaAcessorios");
    else if (tipo == "relatorio")
        corpoTabela = document.getElementById("corpoTabelaAcessoriosRelatorio");
    else
        return;

    corpoTabela.innerHTML = ""; //Limpa as <tr> do corpo

    const acessoriosCadastrados = JSON.parse(localStorage.getItem('acessorios'));

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

        if (tipo == "cadastro") //Adiciona os botões para editar e excluir
        {
            novaLinha.innerHTML += '<button onClick="carregaInfo(' + acessorio['codigo'] + ')" class="btnAcao btn-primary align-middle">Editar</button>';
            novaLinha.innerHTML += '<button onClick="excluiAcessorio(' + acessorio['codigo'] + ')" class="btnAcao btn-danger align-middle">Excluir</button>'
        }
        
        corpoTabela.appendChild(novaLinha);
    }
}

function carregaInfo(codigo)
{
    const acessoriosCadastrados = JSON.parse(localStorage.getItem('acessorios'));

    if (acessoriosCadastrados != null)
    {
        for (var idx = 0; idx < acessoriosCadastrados.length; ++idx)
        {
            if (acessoriosCadastrados[idx]['codigo'] == codigo)
            {
                const objAcessorio = (acessoriosCadastrados[idx]);

                document.getElementById('fCodigo').value = objAcessorio['codigo'];
                document.getElementById('fNome').value = objAcessorio['nome'];
                document.getElementById('fFornecedor').value = objAcessorio['fornecedor'];
                document.getElementById('fValor').value = objAcessorio['valor'];
                document.getElementById('fQtd').value = objAcessorio['qtd'];
                break;
            }
        }
    }
}

function excluiAcessorio(codigo)
{
    var idxAcessorio = pegaIndexPorCodigo(codigo);

    if (idxAcessorio == -1)
        return;

    var acessoriosCadastrados = JSON.parse(localStorage.getItem('acessorios'));
    acessoriosCadastrados.splice(idxAcessorio, 1);

    localStorage.setItem('acessorios', JSON.stringify(acessoriosCadastrados));
    recarregaTabelaAcessorios("cadastro");
}

function pegaIndexPorCodigo(codigo)
{
    const acessoriosCadastrados = JSON.parse(localStorage.getItem('acessorios'));

    if (acessoriosCadastrados != null)
    {
        for (var idx = 0; idx < acessoriosCadastrados.length; ++idx)
        {
            if (acessoriosCadastrados[idx]['codigo'] == codigo)
                return idx;
        }
    }

    return -1;
}
