var database = [
    {
        username: "p",
        password: "testuser",
    },

];
var message;
var scoreTable = [];
var win = -1;
var roundTime;
var shooyingKey;
var triesLeft = 3
var score = 0;
var canv;
var ctx;
var AlienShots = [];
var isLoadedsign = false;
var isLoadedUp = false;
var isConfig = false;
var player;
var space = new Image();
space.src = 'images/canvasec.jpg';
var missles = [];
var aliensGrid = []
var frames=0;
const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    shooyingKey: {
        pressed: false
    }
}
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
                if (win == 0) {
                    var modalDialog = document.getElementById("message");
                    var closebtn = document.getElementsByClassName("close")[0];
                    modalDialog.style.display = "block";
                    closebtn.onclick = function () {
                        modalDialog.style.display = "none";
                    }
                    modalDialog.document.write(`<h1> ${message}</h1>`);
                    // lose
                    //var myDialog = window.showModalDialog("message");

                    //// Write to the dialog's content with dynamic content using template literals
                    //myDialog.document.write(`<h1> ${message}</h1>`);
                    //const closeButton = myDialog.document.createElement("button");
                    //closeButton.textContent = "Close";
                    //closeButton.addEventListener("click", function () {
                    //    myDialog.close();
                    //});
                    //myDialog.document.body.appendChild(closeButton);
                }
                else if (win == 1) {
                    // bette
                } else {
                    // champ
                }

            });
        }

    }


});




function startGame(time, shootKey) {
    //var background = new Audio('sounds/spaceinvaders1.mpeg');
    //background.loop = true;
    //background.play();
    canv = document.getElementById('gameCanvas');
    ctx = canv.getContext('2d');
    canv.height = window.innerHeight;
    canv.width = window.innerWidth;
    const space = new Image();
    space.src = 'images/canvasec.jpg';
    space.onload = function () {
        ctx.drawImage(space, 0, 0, canv.width, canv.height);
    }
    player = new Invader();
    player.draw();
    aliensGrid.push(new GridAlien());
    window.addEventListener('keydown', ({ key }) => {
        if (triesLeft <= 0) {
            return;
        }
        switch (key) {
            case 'ArrowUp':
                if (player.point.y - 15 > canv.height - 0.4 * canv.height ) {
                    player.point.y = player.point.y - 15;
                    keys.ArrowUp.pressed = true;
                }
                break;
            case 'ArrowDown':
                if (player.point.y + 15 <  canv.height ) {
                    player.point.y = player.point.y + 15;
                    keys.ArrowDown.pressed = true;
                }
                break;
            case 'ArrowRight':
                if (player.point.x +15 < canv.width ) {
                    player.point.x = player.point.x + 15;
                    keys.ArrowRight.pressed = true;
                }
                break;
            case 'ArrowLeft':
                if (player.point.x > 15) {
                    player.point.x = player.point.x - 15;
                    keys.ArrowLeft.pressed = true;
                }
                break;
            case shooyingKey:
                let m1 = new Missle({
                    point: {
                        x: player.point.x + player.width/2,
                        y: player.point.y
                    },
                    speed: {
                        x: 0,
                        y: -15
                    }
                });
                missles.push(m1);
        }
            


    });
    window.addEventListener('keyup', ({ key }) => {
        switch (key) {
            case 'ArrowUp':
                if (player.point.y - 15 > canv.height - 0.4 * canv.height) {
                    player.point.y = player.point.y - 15;
                    keys.ArrowUp.pressed = false;
                }             
                break;
            case 'ArrowDown':
                if (player.point.y + 15 <  canv.height) {
                    player.point.y = player.point.y + 15;
                    keys.ArrowDown.pressed = false;
                }
                break;
            case 'ArrowRight':
                if (player.point.x + 15 < canv.width) {
                    player.point.x = player.point.x + 15;
                    keys.ArrowRight.pressed = false;
                }
                break;
            case 'ArrowLeft':
                if (player.point.x > 15) {
                    player.point.x = player.point.x - 15;
                    keys.ArrowLeft.pressed = false;
                }
                break;
        }



    });

    animate()
    const scoreE = document.getElementById('score');
    scoreE.innerHTML = 'Score: ' + score;
    const livesE = document.getElementById('lives');
    livesE.innerHTML = 'Lives: ' + triesLeft;
    startT = Date.now();
    setInterval(updateTimer, 1000);


}
function animate() {
    if (triesLeft <= 0) {
        win = 0;
        message = "You Lost!"
        scoreTable.push(score);
        scoreTable.sort((first, sec) => sec - first);
        return;
    }
    if (aliensGrid[0].length <= 0 && roundTime >= 0 && score < 100) {
        win = 1;
        message = "You Can Do Better!"
        scoreTable.push(score);
        scoreTable.sort((first, sec) => sec - first);
        return;
    }
    if (aliensGrid[0].length <= 0 && roundTime >= 0 && score >= 100) {
        win = 2;
        message = "Champion!"
        scoreTable.push(score);
        scoreTable.sort((first, sec) => sec - first);
        return;
    }
    requestAnimationFrame(animate)
    ctx.drawImage(space, 0, 0, canv.width, canv.height);
    player.draw();
    AlienShots.forEach((shot, shidx) => {
        if ((shot.point.y + shot.raduis >= canv.height) || (shot.point.y + shot.raduis >= player.point.y && shot.point.x + shot.raduis >= player.point.x && shot.point.x - shot.raduis <= player.point.x + player.width)) {

            setTimeout(() => {
                if (shot.point.y + shot.raduis >= player.point.y && shot.point.x + shot.raduis >= player.point.x && shot.point.x - shot.raduis <= player.point.x + player.width) {
                    let lifeDown = new Audio('sounds/explosion.wav');
                    lifeDown.play();
                    triesLeft--;
                    updateLives();
                    player.point.x = 500;
                    player.point.y = 900;
                    player.draw();
                    
      
                }
                AlienShots.splice(shidx, 1);
                
            }, 3)
        }
        else {
            shot.update();
        }

       
    })
    missles.forEach((missle, at) => {
        if (missle.point.y - missle.raduis <= 0) {
            setTimeout(() => {
                missles.splice(at, 1);
            }, 0)
        }
        else {
            missle.update();
        }
       // dlete out of frame!!!!!!!!!!
         

    });
    aliensGrid.forEach((grid) => {
        grid.update();
        if (frames % 45 == 0 && grid.aliens.length >= 1) { ////////////////////////
            grid.aliens[Math.floor(Math.random() * grid.aliens.length)].fire(AlienShots);

        }
        grid.aliens.forEach((ali, idx) => {
            ali.update({ speed: grid.speed });
            missles.forEach((mis, indx) => {
                if ((mis.point.y - mis.raduis <= ali.point.y + ali.height) && ((mis.point.x + mis.raduis >= ali.point.x) && (mis.point.x - mis.raduis <= ali.point.x + ali.width))) {
                    setTimeout(() => {
                        const notDead = grid.aliens.find(sec => {
                            return sec == ali
                        });
                        const misExist = missles.find(second => {
                            return second == mis
                        })
                        if (notDead && misExist) {
                            if (idx >= 0 && idx < 5) {
                                score += 20;
                            } else if (idx >= 5 && idx < 10) {
                                score += 15;
                            }
                            else if (idx >= 10 && idx < 15) {
                                score += 10;
                            } else {
                                score += 5;
                            }
                            updateScore();
                            grid.aliens.splice(idx, 1);
                            var killed = new Audio('sounds/invaderkilled.wav');
                            killed.play();
                            missles.splice(indx, 1);
                        }
                       
                    }, 0)
                }
                //if ((player.point.y <= ali.point.y + ali.height) && (player.x )) {
                //    setTimeout(() => {
                //        player.point.x = 500;
                //        player.point.y = 900;
                //    },5)
           
            })
        })

    if (frames % 1000 == 0) {
        grid.speed.x = 5;
        grid.speed.y = 1;
    }
    if (frames % 1000 == 250) {
        grid.speed.x = 4;
        grid.speed.y = 2;
    }
    if (frames % 1000 == 500) {
        grid.speed.x = 8;
        grid.speed.y = 2;
    }
    if (frames % 1000 ==800) {
        grid.speed.x = 10;
        grid.speed.y = 3;
    }
       
     
    })

    frames++;

}

function drawEnemy() {
    ctx.drawImage(space, 0, 0, canv.width, canv.height);
}


class Invader {
    constructor() {

        this.point = {
            x: 500,
            y: 600
        };
        this.platerimg = new Image();
        this.platerimg.src = 'images/player.jpg';
        this.loaded = new Promise(resolve => {
            this.platerimg.onload = () => {
                this.width = this.platerimg.width * 0.1;
                this.height = this.platerimg.height * 0.1;
                resolve();
            };
        });
    }

    async draw() {
        await this.loaded;
        ctx.drawImage(this.platerimg, this.point.x, this.point.y, this.width, this.height);
    }

}
class Missle {
    constructor({ point, speed}) {
        this.point = point;
        this.speed = speed;
        this.raduis = 10;
    }
    
    update() {
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, this.raduis, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        this.point.x = this.point.x + this.speed.x;
        this.point.y = this.point.y + this.speed.y;
    }
}
class Alien {
    constructor({ point }) {
        this.point = point;
        this.platerimg = new Image();
        this.platerimg.src = 'images/enmey2.png';
        this.platerimg.onload = () => {
            this.width = this.platerimg.width *0.2 ;
            this.height = this.platerimg.height * 0.2;
           // console.log("width: " + this.width);///////////// 50
           // console.log("height: " + this.height);/////////// 70
           
        };
        this.speed = {
            x: 0,
            y:0
        }

    }

    update({ speed }) {
        if (this.platerimg) {
            ctx.drawImage(this.platerimg, this.point.x, this.point.y, this.width, this.height);
            this.point.x = this.point.x + speed.x;
            this.point.y = this.point.y + speed.y;
            this.speed.x = speed.x;
            this.speed.y = speed.y;
            
          
        }      
    }
    fire(AlienShots) {
        AlienShots.push(new AlienMissle({
            point: {
                x: this.point.x + this.width / 2,
                y: this.point.y + this.height
            },
            speed: {
                x: this.speed.x,
                y: 7
            }
        })
        )
    }

}
class GridAlien {
    constructor() {
        this.point = {
            x: 0,
            y: 0
        }
        this.speed = {
            x: 10,
            y:1 ///////
        }
        this.width = 5 *80;
        this.height = 4 * 60;
        this.aliens = []
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 5; col++) {
                this.aliens.push(new Alien({
                    point: {
                        x: col * 80,
                        y: row * 60
                    }
                }));

            }
        }
        
        
    }
    update() {
        this.point.x = this.point.x + this.speed.x;
        this.point.y = this.point.y + this.speed.y;
        if (this.point.x + this.width >= canv.width) {
            this.speed.x = -this.speed.x;
        }
        if (this.point.x <= 0  ) {
            this.speed.x = -this.speed.x;
        }
        if (this.point.y + this.height >= canv.height * 0.6) {
            this.speed.y = -this.speed.y;
        }
        if (this.point.y <= 0) {
            this.speed.y = -this.speed.y;
        }

    }
}
class AlienMissle {
    constructor({ point, speed }) {
        this.point = point;
        this.speed = speed;
        this.raduis = 10;
    }

    update() {
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, this.raduis, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
        this.point.x = this.point.x + this.speed.x;
        this.point.y = this.point.y + this.speed.y;
    }

}
function updateTimer() {
    if (roundTime >= 0 && triesLeft) {

    }
    let now = Date.now();
    let diff = now - startT;
    eTime = roundTime * 60 * 1000 - diff;
    let minutes = Math.floor(eTime / 1000 / 60);
    let seconds = Math.floor(eTime / 1000) % 60;
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    const t = document.getElementById('time_remaining');
    if (!(minutes == 0 && seconds == 0) && triesLeft != 0) {
        // zed 3la 2l list a7sn scores
        // wrje lscores
        t.innerHTML = minutes + ':' + seconds;
    }
}
function updateLives() {
    document.getElementById('lives').innerHTML = 'Lives: ' + triesLeft;
    if (lives === 0) {
        // zed 3la 2l list a7sn scores
        // wrje lscores
    }
}
function updateScore() {
    document.getElementById('score').innerHTML = 'Score: ' + score;
    if (score === 250) {
        // zed 3la 2l list a7sn scores
        // wrje lscores
    }
}
function newgame() {
    //   canv = document.getElementById('gameCanvas');
    //   ctx = canv.getContext('2d');

    //   // Clear the canvas
    //   ctx.clearRect(0, 0, canv.width, canv.height);
    //   ctx.clearRect(0, 0, canv.width, canv.height);
    //   ctx.beginPath();
    //   ctx.closePath();

    document.getElementById('gameCanvas').style.display = 'none';
    document.getElementById('game_scr').style.display = 'none';
    document.getElementById('config_scr').style.display = 'block';
    document.getElementById('configForm').style.display = 'block';
    document.getElementById('gameCanvas').style.display = 'block';
}
