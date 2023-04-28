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

function welcome() {
    document.getElementById("login_scr").style.display = "none";
    document.getElementById("game_scr").style.display = "none";
    document.getElementById("config_scr").style.display = "none";
    document.getElementById("welcome_scr").style.display = "block";

}

function loginFun(user, pass) {
    if (database.find((e) => e.username == user && e.password == pass)) {
        return true

    } else {
        return false
    }
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
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("logForm").style.display = "block";
}
function welcome_screen() {
    document.getElementById("logForm").style.display = "none";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("login_scr").style.display = "none";
    document.getElementById("game_scr").style.display = "none";
    document.getElementById("signup_scr").style.display = "none";
    document.getElementById("config_scr").style.display = "none";
    document.getElementById("welcome_scr").style.display = "block";
}

function signup_scr() {
    document.getElementById("logForm").style.display = "none";
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("login_scr").style.display = "none";
    document.getElementById("game_scr").style.display = "none";
    document.getElementById("welcome_scr").style.display = "none";
    document.getElementById("config_scr").style.display = "none";
    document.getElementById("signup_scr").style.display = "block";
}
if (document.getElementById("login_scr")) {
    document.addEventListener('DOMContentLoaded', function () {
        const user = document.querySelector('#username');
        const pass = document.querySelector('#password');
        const submitLoginBtn = document.querySelector('#submitbtn');

        submitLoginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const username = user.value;
            const password = pass.value;
            let bool = loginFun(username, password)
            if (bool) {
                document.getElementById("logForm").style.display = "none";
                document.getElementById("loginBox").style.display = "none";
                document.getElementById("login_scr").style.display = "none";
                document.getElementById("welcome_scr").style.display = "none";
                document.getElementById("signup_scr").style.display = "none";
                document.getElementById("game_scr").style.display = "none";
                document.getElementById("config_scr").style.display = "block";
                user.value = '';
                pass.value = '';
            } else {
                user.value = '';
                pass.value = '';
                alert('There is no such user try again!');
            }


        });


    });
}
function isNameValid(name) {
    const word = /^[a-zA-Z\s-]+$/;
    return word.test(name);
}

function isBdayValid(date) {
    let now = new Date();
    if (now - date > 3) {
        return true;
    }
    return false;
}

function isPasswordValid(pass) {
    let must = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return must.test(pass);
}

function isMailValid(mail) {
    let email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;
    return email.test(mail);
}


if (document.getElementById("signup_scr")) {
    document.addEventListener('DOMContentLoaded', function () {
        const first = document.querySelector('#firstname');
        const last = document.querySelector('#lastname');
        const username = document.querySelector('#usersign');
        const initial = document.querySelector('#initialPass');
        const confirm = document.querySelector('#confirmPass');
        const bday = document.querySelector('#birth');
        const mail = document.querySelector('#email');
        const submitSign = document.querySelector('#submitsign');
        submitSign.addEventListener('click', (event) => {
            event.preventDefault();
            const to_ckeck_first = first.value;
            const to_ckeck_lsat = last.value;
            const to_check_username = username.value;
            const to_check_intial = initial.value;
            const to_check_confirm = confirm.value;
            const to_check_bday = new Date(bday.value);
            const to_check_mail = mail.value;
            if (!isNameValid(to_ckeck_first)) {
                event.preventDefault();
                alert('First Name consists only letters a-z!');
                first.value = '';
            } else if (!isNameValid(to_ckeck_lsat)) {
                event.preventDefault();
                alert('Last Name consists only letters a-z!');
                last.value = '';
            } else if (!isUsernameValid(to_check_username)) {
                event.preventDefault();
                alert('Username in use pick another one');
                username.value = '';
            } else if (!isPasswordValid(to_check_intial)) {
                event.preventDefault();
                alert('Password at least 8 digits long must have both letters and numbers!');
                initial.value = '';
                confirm.value = '';
            } else if (to_check_intial != to_check_confirm) {
                event.preventDefault();
                alert('Passwords don not match!');
                initial.value = '';
                confirm.value = '';
            } else if (!isBdayValid(to_check_bday)) {
                event.preventDefault();
                alert('You must be older than 3 years old!');
                bday.value = '';
            } else if (!isMailValid(to_check_mail)) {
                event.preventDefault();
                alert('Incorrect E-mail address ');
                mail.value = '';
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
                alert("Successfuly added!");
                document.getElementById("signup_scr").style.display = "none";
                document.getElementById("welcome_scr").style.display = "block";
            } 


        });
    });
}
function startGame(time, shootKey) {
    canv = document.getElementById('gameCanvas');
    ctx = canv.getContext('2d');
    canv.height = window.innerHeight;
    canv.width = window.innerWidth;
    const space = new Image();
    space.src = 'images/canvasec.jpg';
    space.onload = function () {
        ctx.drawImage(space, 0, 0, canv.width, canv.height);
    };
    roundTime = time * 60;
    setInterval(update, 1000);


}

document.addEventListener('DOMContentLoaded', function () {
    const shooter = document.querySelector('#shoot');
    const round = document.querySelector('#timer');
    const startBtn = document.querySelector('#start');
    startBtn.addEventListener('click', (event) => {
        event.preventDefault();
        roundTime = round.value;
        shooyingKey = shooter.value;
        document.getElementById("welcome_scr").style.display = "none";
        document.getElementById("logForm").style.display = "none";
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("login_scr").style.display = "none";
        document.getElementById("signup_scr").style.display = "none";
        document.getElementById("config_scr").style.display = "none";
        document.getElementById("game_scr").style.display = "block";
        startGame(roundTime, shooyingKey);

    });
});




function updateScore() {
    ctx.font = "30px Bangers";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: " + score, 10, 30);
}

function updateTime() {
    ctx.font = "30px Bangers";
    ctx.fillStyle = "yellow";
    ctx.fillText("Time: " + roundTime, 10, 100);
}

function update() {

    updateScore();
    updateTime();
}


