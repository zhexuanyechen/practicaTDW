function Escritor(user, pwd) {
    this.user = user;
    this.pwd = pwd;
}

let x = new Escritor("x", "x");
let y = new Escritor("y", "y");
let z = new Escritor("z", "z");
let usuarios = [x, y, z];

function login() {
    let user = document.getElementById("usuario").value;
    let password = document.getElementById("pwd").value;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].user == user && usuarios[i].pwd == password) {
            sessionStorage.setItem("logueado", "true");
        }
    }
}
document.getElementById("login").addEventListener("click", () => {
    login();
    showBtn();
});

function logout() {
    sessionStorage.setItem("logueado", "false");
}
document.getElementById("logout").addEventListener("click", () => {
    logout();
    showBtn();
});

function showBtn() {
    let displaybtn = document.getElementsByClassName("botonesObjeto");
    if (sessionStorage.getItem("logueado") == "true") {
        for (let i = 0; i < displaybtn.length; i++) {
            displaybtn[i].style.display = "flex";
        }
        document.getElementById("loginNav").style.display = "none";
        document.getElementById("logout").style.display = "block";
    } else {
        for (let i = 0; i < displaybtn.length; i++) {
            displaybtn[i].style.display = "none";
        }
        document.getElementById("loginNav").style.display = "block";
        document.getElementById("logout").style.display = "none";
    }
}

showBtn()