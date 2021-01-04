let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height)
let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');

let shipPosition = { x: 340, y: 368 };
let enemyShips = [];
let laserShots = [];
let input_state = {};
let laserId = 0;
let score = 0;
let enemyShipSpeed = .5;
let difficulty = 15;


function gameloop() {
    requestAnimationFrame(gameloop); 

        if (playerHit()) {
            gameOver();
            return;
        }

        if (input_state.ArrowRight && shipPosition.x !== canvas.width - 20) {
            shipPosition.x += 5;
        } else if (input_state.ArrowLeft && shipPosition.x !== 0) {
            shipPosition.x -= 5;
        }

        for (let i = 0; i < enemyShips.length; i++) {
            enemyShips[i].y += enemyShipSpeed;
        }
            
        if (input_state[" "]) {
            laserCannon();
        }

        /* DRAW */

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height) 

        for (let j = 0; j < laserShots.length; j++) {
            if (laserShots.length > 1 && isMultipleOfThree(laserShots[j].id)) {
                ctx.fillStyle = 'yellow';
                ctx.fillRect(laserShots[j].x + 8.5, laserShots[j].y, 2, 2);
                laserShots[j].y -= 7;
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
        
        ctx.fillStyle = "green"
        ctx.fillRect(shipPosition.x, shipPosition.y, 20, 30);

        enemiesDestroyed();
        scoreBoard();      
}

function init() {

    shipPosition = { x: 350, y: 368 };
    enemyShips = [];
    laserShots = [];
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height) 
    gameloop(shipPosition)

}

const scoreBoard = () => {

    let scoreElement = document.getElementById('score')
    scoreElement.innerHTML = `Score: ${score}`;

}

const playerHit = () => {
    for (let i = enemyShips.length - 1; i >= 0; i--) { 
        if (enemyShips[i].x - 10 <= shipPosition.x && enemyShips[i].x + 10 >= shipPosition.x && enemyShips[i].y - 10 <= shipPosition.y && enemyShips[i].y + 10 >= shipPosition.y) {
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
        enemyShips.push({x: xCoor, y: 5, color: 'red'});
    }
}

let enemiesDestroyed = () => {
    for (let i = enemyShips.length - 1; i >= 0; i--) {
        for (let j = laserShots.length - 1; j >= 0; j--) {
            if (enemyShips[i].x - difficulty <= laserShots[j].x && enemyShips[i].x + difficulty >= laserShots[j].x && enemyShips[i].y - difficulty <= laserShots[j].y && enemyShips[i].y + difficulty >= laserShots[j].y) {
                enemyShips.splice(i, 1);
                score += 10;
            }
        }
    }
}

const laserCannon = () => {

    laserShots.push({x: shipPosition.x, y: shipPosition.y, color: 'yellow', id: laserId})
    laserId++;
    if (laserShots.length > 57) {
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
    console.log(input_state)

}

document.onkeyup = function(e) {

    input_state[e.key] = false;
    console.log(input_state)

}

const randomCoor = () => {

    let num = Math.floor(Math.random() * Math.floor(680));
    let decimal = num / 15;
    return Math.round(decimal) * 15;

}

const isMultipleOfThree = num => {

    const div = parseInt(num / 7);
    return num === div * 7;

  };

init();





