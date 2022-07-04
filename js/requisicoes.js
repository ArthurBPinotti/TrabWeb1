function consultaRequest(){
    const id = document.getElementById('fId').value;
    
    if (id == "")
    {
        alert("O ID deve ser informado!");
        document.getElementById("fId").focus();
        return;
    }

    fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/' + id, 
    {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
         })
        .then((dadosBrutos) => dadosBrutos.json())
        .then((dadosJSON) => {
            var objCadastro = new Cadastro(dadosJSON);
            inserirHistorico(objCadastro);
        });
}

function inserirHistorico(objCadastro)
{
    var corpoTabela = document.getElementById("corpoTabelaHistorico");
    var novaLinha = document.createElement("tr");

    var celNome = document.createElement("td");
    celNome.innerText = objCadastro.getNome();
    novaLinha.appendChild(celNome);

    var celEmail = document.createElement("td");
    celEmail.innerText = objCadastro.getEMail();
    novaLinha.appendChild(celEmail);

    var btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Exclusão";
    btnDelete.classList = "btnAcao btn-danger align-middle"
    btnDelete.onclick = () => 
    {
        fetch("https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/" + objCadastro.id, {
            method: "DELETE"
        })
            .then((dadosBrutos) => dadosBrutos.json())
            .then((dadosJSON) => {
                processaResultado(dadosJSON.mensagem, dadosJSON.status, "Consulta");
            });

            corpoTabela.removeChild(novaLinha);
    };

    novaLinha.appendChild(btnDelete);
    corpoTabela.appendChild(novaLinha);
}

function enviaRequest()
{
    const id = document.getElementById('fIdCadastro').value;
    const nome = document.getElementById('fNome').value;
    const departamento = document.getElementById('fDepartamento').value;
    const endereco = document.getElementById('fEndereco').value;
    const email = document.getElementById('fEmail').value;

    var objcadastro = {
        id,
        nome,
        departamento,
        endereco,
        email,
    }

    fetch("https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/" + id, {
        method: "PUT",
        body: JSON.stringify(objcadastro),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
        .then((dadosBrutos) => dadosBrutos.json())
        .then((dadosJSON) => {
            processaResultado(dadosJSON.mensagem, dadosJSON.status, "Inserir"); 
            });
}

function processaResultado (mensagem, status, tipo) {
    var divResultado = document.getElementById("displayResultado" + tipo);

    if (status === "Ok")
        divResultado.className = "bg-success mostraResultado";
    else if (status === "Erro")
        divResultado.className = "bg-danger mostraResultado";


    var textoResultado = document.getElementById("textoResultado" + tipo);
    textoResultado.innerText = mensagem;
}
