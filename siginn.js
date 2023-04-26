var database = [
    {
        username: "p",
        password: "testuser",
    },
   
];

document.addEventListener("DOMContentLoaded", function () {
    var about = document.getElementById("aboutbtn");
    var modalDialog = document.getElementById("modalid");
    var closebtn = document.getElementsByClassName("close")[0];
    about.onclick = function () {
        modalDialog.style.display = "block";
    }
    closebtn.onclick = function () {
        modalDialog.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modalDialog) {
            modalDialog.style.display = "none";
        }
    }
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modalDialog.style.display === "block") {
            modalDialog.style.display = "none";
        }
    });

});

function loginFun(user, pass) {
    if (database.find((e) => e.username == user && e.password == pass)) {
        console.log(newsfeed);//switch page to game!
    } else {
        alert("Try Again!");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let login = document.querySelector('#loginBtn');
    login.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById("modalid").style.display="none";
        document.getElementById("loginPage").style.display = "block";
        document.getElementById("logForm").style.display = "block";
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        loginFun(username, password);
    });
});

