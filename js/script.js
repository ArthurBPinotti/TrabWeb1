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
