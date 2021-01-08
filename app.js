let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height)
let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');
let music = document.getElementById('music');
let musicChangeButton = document.getElementById('musicChangeButton');
let laser = new Audio('audio/laser2.mp3');
let playerExplosion = new Audio('audio/battleExplosion.mp3');
let enemyExplosion = new Audio('audio/enemyExplosion.mp3');
let retroPlatforming = new Audio('audio/retroPlatforming.mp3');
let retroFunk = new Audio('audio/retroFunk.mp3');
let musicChoice = retroPlatforming;

let shipPosition = { x: 340, y: 368 };
let enemyShips = [];
let laserShots = [];
let input_state = {};
let laserId = 0;
let score = 0;
let enemyShipSpeed = .5;
let difficulty = 15;
let keyPressed;
let explosionSounds = 0;
let musicPlaying = 0;


function gameloop() {
    requestAnimationFrame(gameloop); 

        if (playerHit()) {
            if (explosionSounds === 0) {
                playerExplosion.play();
                explosionSounds++
            }
            gameOver();
            return;
        }

        if (input_state.ArrowRight && shipPosition.x !== canvas.width - 35) {
            shipPosition.x += 5;
        } else if (input_state.ArrowLeft && shipPosition.x !== 15) {
            shipPosition.x -= 5;
        }

        for (let i = 0; i < enemyShips.length; i++) {
            enemyShips[i].y += enemyShipSpeed;
        }
            
        if (input_state[" "]) {
            laserCannon();
            laser.play();
        }

        /* DRAW */

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height) 

        for (let j = 0; j < laserShots.length; j++) {
            if (laserShots.length > 1 && isMultipleOfThree(laserShots[j].id)) {
                ctx.fillStyle = 'yellow';
                ctx.fillRect(laserShots[j].x + 8.5, laserShots[j].y, 2, 2);
                laserShots[j].y -= 11 ;
            }
        }

        for (let i = 0; i < enemyShips.length; i++) {
            ctx.fillStyle = enemyShips[i].color;
            ctx.fillRect(enemyShips[i].x, enemyShips[i].y, 10, 20) 
            if (enemyShips[i].y === canvas.height + 5) {
                enemyShips.splice(i, 1);
                score -= 10;
            }
        }
        /* PLAYER SHIP */
        /* TOP LEFT */
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.moveTo(shipPosition.x - 10, shipPosition.y);
        ctx.lineTo(shipPosition.x + 5, shipPosition.y - 20);
        ctx.lineTo(shipPosition.x + 5, shipPosition.y);
        ctx.fill();
        /* MIDDLE LEFT */
        ctx.beginPath();
        ctx.moveTo(shipPosition.x - 10, shipPosition.y + 10);
        ctx.lineTo(shipPosition.x + 5, shipPosition.y - 10);
        ctx.lineTo(shipPosition.x + 5, shipPosition.y + 10);
        ctx.fill();
        /* BOTTOM LEFT */
        ctx.beginPath();
        ctx.moveTo(shipPosition.x - 15, shipPosition.y + 30);
        ctx.lineTo(shipPosition.x + 5, shipPosition.y + 15);
        ctx.lineTo(shipPosition.x + 5, shipPosition.y + 30);
        ctx.fill();
        /* TOP RIGHT */
        ctx.beginPath();
        ctx.moveTo(shipPosition.x + 30, shipPosition.y + 10);
        ctx.lineTo(shipPosition.x + 15, shipPosition.y - 10);
        ctx.lineTo(shipPosition.x + 15, shipPosition.y + 10);
        ctx.fill();
        /* MIDDLE RIGHT */       
        ctx.beginPath();
        ctx.moveTo(shipPosition.x + 30, shipPosition.y);
        ctx.lineTo(shipPosition.x + 15, shipPosition.y - 20);
        ctx.lineTo(shipPosition.x + 15, shipPosition.y);
        ctx.fill();
        /* BOTTOM RIGHT */
        ctx.beginPath();
        ctx.moveTo(shipPosition.x + 35, shipPosition.y + 30);
        ctx.lineTo(shipPosition.x + 15, shipPosition.y + 15);
        ctx.lineTo(shipPosition.x + 15, shipPosition.y + 30);
        ctx.fill();

        ctx.fillStyle = 'green';
        ctx.fillRect(shipPosition.x, shipPosition.y, 20, 30);

        enemiesDestroyed();
        scoreBoard();      
}

function init() {

    shipPosition = { x: 340, y: 368 };
    enemyShips = [];
    laserShots = [];
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height) 
    gameloop(shipPosition)

}

const scoreBoard = () => {

    let scoreElement = document.getElementById('score');
    let hiScore = document.getElementById('hiScore');
    myHiScore = localStorage.getItem('hiScore')
    scoreElement.innerHTML = `Score: ${score}`;
    hiScore.innerHTML = `Hi Score: ${myHiScore}`;
    storeScore();

}

const playerHit = () => {

    for (let i = enemyShips.length - 1; i >= 0; i--) { 
        if (enemyShips[i].x - 20 <= shipPosition.x && enemyShips[i].x + 15 >= shipPosition.x && enemyShips[i].y - 20 <= shipPosition.y && enemyShips[i].y + 20 >= shipPosition.y) {
            return true;
        }
    }
}

setInterval(function() {

    enemyShip()

}, 1000)

const enemyShip = () => {

    let noRepeats = false;
    let xCoor = randomCoor();
    for (let i = 0; i < enemyShips.length; i++) {
        if (xCoor === enemyShips[i].x) {
            noRepeats = true;
        }
    }
    if (!noRepeats && enemyShips.length < 15) {
        enemyShips.push({x: xCoor, y: 0, color: 'red'});
    }
}

let enemiesDestroyed = () => {

    for (let i = enemyShips.length - 2; i >= 0; i--) {
        for (let j = laserShots.length - 1; j >= 0; j--) {
            if (enemyShips[i].x - difficulty <= laserShots[j].x && enemyShips[i].x + difficulty >= laserShots[j].x && enemyShips[i].y - difficulty <= laserShots[j].y && enemyShips[i].y + difficulty >= laserShots[j].y) {
                enemyShips.splice(i, 1);
                score += 10;
                enemyExplosion.play();
            }
        }
    }
}

setInterval(function () {

    for (let i = 0; i < laserShots.length; i++) {
        if (laserShots[i].y < 0) {
            laserShots.splice(laserShots[i], 1);
        }
    }
}, 100) 

const laserCannon = () => {

    laserShots.push({x: shipPosition.x, y: shipPosition.y, color: 'yellow', id: laserId})
    laserId++;
    if (laserShots.length > 50) {
        laserShots.splice(0, 1);
    }
}

const gameOver = () => {

    ctx.fillStyle = "white";
    ctx.font = "90px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);

} 

const gameDifficulty = (e) => {

    if (e.target.textContent === 'Easy') {
        enemyShipSpeed = .5;
        difficulty = 15;
    } else if (e.target.textContent === 'Medium') {
        enemyShipSpeed = 1.5;
        difficulty = 10;
    } else if (e.target.textContent === 'Hard') {
        enemyShipSpeed = 2.5;
        difficulty = 5;
    }
}

document.onkeydown = function(e) {

    input_state[e.key] = true;
    keyPressed = 1;

}

document.onkeyup = function(e) {

    input_state[e.key] = false;
    keyPressed = 0;

}

const randomCoor = () => {

    let num = Math.random() * (670 - 30) + 40;
    let decimal = num / 15;
    return Math.round(decimal) * 15;

}

const isMultipleOfThree = num => {

    const div = parseInt(num / 7);
    return num === div * 7;

  };

music.addEventListener("click", event => {
    
    playMusic();

});

const playMusic = () => {

    if (musicPlaying === 0) {
        musicChoice.play(); 
        musicPlaying++;
    } else if (musicPlaying === 1) {
        musicChoice.pause();
        musicPlaying = 0;
    }
}

musicChangeButton.addEventListener("click", event => {

    musicChoice.pause();
    if (musicChoice.duration === 130.928875) {
        musicChoice = retroFunk;
    } else if ((musicChoice.duration === 173.0201)) {
        musicChoice = retroPlatforming;
    }
    playMusic();
});

musicChoice.addEventListener('ended', function() {

    this.currentTime = 0;
    this.play();
}, false);

const storeScore = () => {
    let hiScore = localStorage.getItem('hiScore');
    if (score > hiScore) {
        localStorage.setItem("hiScore", score)
    }
    
}

init();





