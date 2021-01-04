let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height)

let shipPosition = { x: 340, y: 368 };
let enemyShips = [];
let laserShots = [];
let shipPositionX = shipPosition.x;
let shipPositionY = shipPosition.y;
let input_state = {};
let arrowKeyPressed;
let laserId = 0;
let enemiesDefeated = 0;
let score = 0;
let enemyShipSpeed = .5;


function gameloop() {
    requestAnimationFrame(gameloop); 
        if (input_state.ArrowRight && shipPosition.x !== canvas.width - 20) {
            shipPosition.x += 5;
        } else if (input_state.ArrowLeft && shipPosition.x !== 0) {
            shipPosition.x -= 5;
        }

        enemiesDestroyed();

        /* DRAW */

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height) 

        for (let i = 0; i < enemyShips.length; i++) {
            enemyShips[i].y += enemyShipSpeed;
        }

        for (let i = 0; i < enemyShips.length; i++) {
            ctx.fillStyle = enemyShips[i].color;
            ctx.fillRect(enemyShips[i].x, enemyShips[i].y, 10, 20) 
            if (enemyShips[i].y === canvas.height + 5) {
                enemyShips.splice(i, 1);
            }
        }
            
        if (input_state[" "]) {
            laserCannon();
        }

        for (let j = 0; j < laserShots.length; j++) {
            if (laserShots.length > 1 && isMultipleOfThree(laserShots[j].id)) {
                ctx.fillStyle = 'yellow';
                ctx.fillRect(laserShots[j].x + 8.5, laserShots[j].y, 2, 2);
                laserShots[j].y -= 7;
            }
        }

        ctx.fillStyle = "green"
        ctx.fillRect(shipPosition.x, shipPosition.y, 20, 30);

        
}


function init() {
    let shipPosition = { x: 350, y: 368 };
    enemyShips = [];
    laserShots = [];
    shipPositionX = shipPosition.x;
    shipPositionY = shipPosition.y;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height) 
    gameloop(shipPosition)
}

setInterval(function() {
    enemyShip()
}, 3000)

const enemyShip = () => {
    let noRepeats = false;
    let xCoor = randomCoor();
    for (let i = 0; i < enemyShips.length; i++) {
        if (xCoor === enemyShips[i].x) {
            noRepeats = true;
        }
    }
    if (!noRepeats && enemyShips.length < 10) {
        enemyShips.push({x: xCoor, y: 5, color: 'red'});
    }
}

const laserCannon = () => {
    laserShots.push({x: shipPosition.x, y: shipPosition.y, color: 'yellow', id: laserId})
    laserId++;
    if (laserShots.length > 57) {
        laserShots.splice(0, 1);
    }
}

  

const randomCoor = () => {
    let num = Math.floor(Math.random() * Math.floor(680));
    let decimal = num / 15;
    return Math.round(decimal) * 15;
}


document.onkeydown = function(e) {
    input_state[e.key] = true;
    console.log(input_state)
}

document.onkeyup = function(e) {
    input_state[e.key] = false;
    console.log(input_state)
}

const isMultipleOfThree = num => {
    const div = parseInt(num / 7);
  
    return num === div * 7;
  };

const scoreBoard = () => {
    let scoreElement = document.getElementById('score')
    scoreElement.innerHTML = `Score: ${score}`;
}

let enemiesDestroyed = () => {
    for (let i = enemyShips.length - 1; i >= 0; i--) {
        for (let j = laserShots.length - 1; j >= 0; j--) {
            if (enemyShips[i].x - 15 <= laserShots[j].x && enemyShips[i].x + 15 >= laserShots[j].x && enemyShips[i].y - 15 <= laserShots[j].y && enemyShips[i].y + 15 >= laserShots[j].y) {
                enemyShips.splice(i, 1);
                score += 10;
                scoreBoard();
            }
        }
    }
}

init();





