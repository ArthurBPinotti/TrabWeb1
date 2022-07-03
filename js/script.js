import {Objeto} from './objeto.js';
function setaCookie() {
    var userName = document.getElementById('editNome').value;
    var userSenha = document.getElementById('editSenha').value;

    if (userName == "" || userSenha == "")
    {
        alert("O nome de usuário e a senha devem ser informados!")

        return;
    }

    document.cookie = "username="+userName; 
    window.location.href = "index.html";
}


function loginCheck() {
    if (document.cookie != '') {
        var userName = document.cookie.split('=')[1];
        document.getElementById('imgUser').style.display = 'block';
        document.getElementById('userName').innerHTML = userName;
    } 
    else {
        document.getElementById('imgUser').style.display = 'hidden';
        document.getElementById('userName').innerHTML = "Usuário não autenticado";
    }
}

function customPage(){
    var element = document.getElementsByTagName('body')[0];
    element.classList.add('classCustom');
}

function normalPage(){
    var element = document.getElementsByTagName('body')[0];
    element.classList.remove('classCustom');
}

function requisicaoRest(){
    const id = document.getElementById('fId').value;
    if (id == ""){
        alert("O ID deve ser informado!");
        document.getElementById("fId").focus();
        return;
    }
    //faz requisição da api
    const objTemp = "https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/" + id;
    objTemp =  fetch(objTemp)
    console.log(objTemp);
    const meuObjeto = new Objeto(objTemp.id, objTemp.nome, objTemp.departamento, objTemp.endereco, objTemp.email);
    const teste1 = document.getElementById('teste');
    teste1.innerHTML = objTemp;
}
