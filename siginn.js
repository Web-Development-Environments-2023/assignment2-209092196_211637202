var database = [
    {
        username: "p",
        password: "testuser",
    },

];
var roundTime;
var shooyingKey;
var triesLeft = 3
var score = 0;
var canv;
var ctx;
var isLoadedsign = false;
var isLoadedUp = false;
var isConfig = false;
// 1-config, 2-login

function about() {
    var modalDialog = document.getElementById("modalid");
    var closebtn = document.getElementsByClassName("close")[0];
    modalDialog.style.display = "block";
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
}
function isUsernameValid(user) {
    for (let i = 0; i < database.length; i++) {
        if (database[i].username === user) {
            return false;
        }
    }
    return true;
}

function login_screen() {
    document.getElementById("welcome_scr").style.display = "none";
    document.getElementById("game_scr").style.display = "none";
    document.getElementById("signup_scr").style.display = "none";
    document.getElementById("config_scr").style.display = "none";
    document.getElementById("login_scr").style.display = "block";
    document.getElementById("logForm").style.display = "block";

}

function welcome_screen() {
    document.getElementById("game_scr").style.display = "none";
    document.getElementById("signup_scr").style.display = "none";
    document.getElementById("config_scr").style.display = "none";
    document.getElementById("login_scr").style.display = "none";
    document.getElementById("logForm").style.display = "none";
    document.getElementById("welcome_scr").style.display = "block";
}

function signup_scr() {
    document.getElementById("welcome_scr").style.display = "none";
    document.getElementById("login_scr").style.display = "none";
    document.getElementById("logForm").style.display = "none";
    document.getElementById("config_scr").style.display = "none";
    document.getElementById("login_scr").style.display = "none";
    document.getElementById("signup_scr").style.display = "block";
}

function isBdayValid(date) {
    let now = new Date();
    let sub = Math.abs(now - date);
    let subYears = sub / (1000 * 60 * 60 * 24 * 365);
    if (subYears > 3) {
        return true;
    }
    return false;
}

window.addEventListener("DOMContentLoaded", function () {
    if (!isLoadedsign) {
        isLoadedsign = true;
        const logform = document.getElementById('logForm');
        if (logform) {
            logform.addEventListener("submit", function (e) {
                e.preventDefault(); // before the code
                const user = document.querySelector('#username');
                const usern = user.value;
                const pass = document.querySelector('#password');
                const passw = pass.value;
                if (database.find((e) => e.username == usern && e.password == passw)) {
                    user.value = '';
                    pass.value = '';
                    document.getElementById("login_scr").style.display = "none";
                    logForm.style.display = "none";
                    document.getElementById("config_scr").style.display = "block";
                    document.getElementById("configForm").style.display = "block"
                    isLoadedsign = false;


                } else {
                    alert("No Such User!");
                    user.value = '';
                    pass.value = '';
                    document.getElementById("login_scr").style.display = "block";
                    logForm.style.display = "block";

                }



            });
        }
    } if (!isLoadedUp) {
        isLoadedUp = true;
        const signform = document.getElementById('signForm');
        if (signform) {
            signform.addEventListener("submit", function (e) {
                e.preventDefault();
                const first = document.querySelector('#firstname');
                const last = document.querySelector('#lastname');
                const username = document.querySelector('#usersign');
                const initial = document.querySelector('#initialPass');
                const confirm = document.querySelector('#confirmPass');
                const bday = document.querySelector('#birth');
                const mail = document.querySelector('#email');
                const to_check_username = username.value;
                const to_check_intial = initial.value;
                const to_check_confirm = confirm.value;
                const to_check_bday = new Date(bday.value);
                if (to_check_intial != to_check_confirm) {
                    alert('Passwords don not match!');
                    initial.value = '';
                    confirm.value = '';
                } else if (!isBdayValid(to_check_bday)) {
                    alert('You must be older than 3 years old!');
                    bday.value = '';
                } else if (!isUsernameValid(to_check_username)) {
                    alert('Username in use pick another one');
                    username.value = '';
                } else {
                    let toAdd = {
                        username: username.value,
                        password: initial.value
                    };
                    database.push(toAdd);
                    first.value = '';
                    last.value = '';
                    username.value = '';
                    initial.value = '';
                    confirm.value = '';
                    bday.value = '';
                    mail.value = '';
                    isLoadedUp = false;
                    alert("Successfuly added!");
                    document.getElementById("signup_scr").style.display = "none";
                    document.getElementById("welcome_scr").style.display = "block";
                }

            });
        }
    } if (!isConfig) {
        isConfig = true;
        const configform = document.getElementById('configForm');
        if (configform) {
            configform.addEventListener("submit", function (e) {
                e.preventDefault();
                const shooter = document.querySelector('#shoot');
                const round = document.querySelector('#timer');
                roundTime = round.value;
                shooyingKey = shooter.value;
                shooter.value = '';
                configform.style.display = "none";
                document.getElementById("config_scr").style.display = "none";
                configform.style.display = "none";
                document.getElementById("game_scr").style.display = "block";
                isConfig = false;
                startGame(roundTime, shooyingKey);

            });
        }

    }


});




function startGame(time, shootKey) {
    var background = new Audio('sounds/spaceinvaders1.mpeg');
    background.loop = true;
    background.play();
    canv = document.getElementById('gameCanvas');
    ctx = canv.getContext('2d');
    canv.height = window.innerHeight;
    canv.width = window.innerWidth;
    const space = new Image();
    space.src = 'images/canvasec.jpg';
    space.onload = function () {
        ctx.drawImage(space, 0, 0, canv.width, canv.height);
    };


}