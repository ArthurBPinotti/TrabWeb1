function setaCookie() {

    document.cookie = "username="+document.getElementById('userName').value; 
    document.cookie = "password="+document.getElementById('password').value; 
    console.log(document.cookie);
    window.location.href = "index.html";
}


function loginCheck() {
    if (document.cookie != '') {
        var userName = document.cookie.split(';')[0].split('=')[1];
        document.getElementById('imgUser').style.display = 'block';
        document.getElementById('userName').innerHTML = userName;
        
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

// document.cookie = "username="+document.getElementById('login').value;
    // document.cookie = "password="+document.getElementById('senha').value;
    // document.cookie = "sexo="+document.getElementById('sexo').value;
    // document.cookie = "cor="+document.getElementById('cor').value;
    // document.cookie = "dtNasc="+document.getElementById('dtNasc').value;
    // document.cookie = "notificar="+document.getElementById('notificar').value;
    // console.log(document.cookie);