let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height)

let shipPosition = { x: 350, y: 368 };
let enemyShips = [];
let laserShots = [];
let shipPositionX = shipPosition.x;
let shipPositionY = shipPosition.y;
let input_state;
let arrowKeyPressed;



function gameloop() {
    requestAnimationFrame(gameloop); 
        if (input_state === 'start' && arrowKeyPressed === 'ArrowRight' && shipPosition.x !== canvas.width - 20) {
            shipPosition.x += 5;
        } else if (input_state === 'start' && arrowKeyPressed === 'ArrowLeft' && shipPosition.x !== 0) {
            shipPosition.x -= 5;
        } else if (input_state === 'stop') {
            shipPosition.x -= 0;
        }
        
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height) 

        for (let i = 0; i < enemyShips.length; i++) {
            enemyShips[i].y += .5;
        }

        for (let i = 0; i < enemyShips.length; i++) {
            ctx.fillStyle = enemyShips[i].color;
            ctx.fillRect(enemyShips[i].x, enemyShips[i].y, 10, 20) 
            if (enemyShips[i].y === canvas.height + 5) {
                enemyShips.splice(i, 1);
            }
        }
            
        ctx.fillStyle = "green"
        ctx.fillRect(shipPosition.x, shipPosition.y, 20, 30);
}


function init() {
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

  

const randomCoor = () => {
    let num = Math.floor(Math.random() * Math.floor(680));
    let decimal = num / 15;
    return Math.round(decimal) * 15;
}

document.onkeydown = function(e) {
    input_state = 'start'
    arrowKeyPressed = e.key;
}

document.onkeyup = function() {
    input_state = 'stop'
}

init();










































// OLD CODE

// let canvas = document.getElementById('canvas');
// let ctx = canvas.getContext("2d");
// ctx.fillStyle = 'black';
// ctx.fillRect(0, 0, canvas.width, canvas.height)

// let shipPosition = { x: 350, y: 368 };
// let enemyShips = [];
// let laserShots = [];
// let shipPositionX = shipPosition.x;
// let shipPositionY = shipPosition.y;


// setInterval(function() {

//     draw()

// }, 0)

// const draw = () => {

//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 0, canvas.width, canvas.height) 
//     spaceship();

//     /* ENEMIES */
    
//     for (let i = 0; i < enemyShips.length; i++) {
//         ctx.fillStyle = enemyShips[i].color;
//         ctx.fillRect(enemyShips[i].x, enemyShips[i].y, 10, 20) 
//         if (enemyShips[i].y === canvas.height + 5) {
//             enemyShips.splice(i, 1);
//         }
//     }

//     /* LASER CANON */

//     for (let j = 0; j < laserShots.length; j++) {
//         if (laserShots.length > 1) {
//             ctx.fillStyle = laserShots[j].color;
//             ctx.fillRect(laserShots[j].x + 8.5, laserShots[j].y, 2, 2) 
//             laserShots[j].y -= 5 ;
//         }
        
//     }
// }

// const spaceship = () => {

//     ctx.fillStyle = "green"
//     ctx.fillRect(shipPosition.x, shipPosition.y, 20, 30);

// }

// const laserCanon = () => {
//     laserShots.push({x: shipPosition.x, y: shipPosition.y, color: 'yellow'})
// }

// /* ENEMIES */

// setInterval(function() {

//     enemyShip()

// }, 3000)

// const enemyShip = () => {
//     let noRepeats = false;
//     let xCoor = randomCoor();
//     for (let i = 0; i < enemyShips.length; i++) {
//         if (xCoor === enemyShips[i].x) {
//             noRepeats = true;
//         }
//     }
//     if (!noRepeats && enemyShips.length < 10) {
//         enemyShips.push({x: xCoor, y: 5, color: 'red'});
//     }
// }

// setInterval(function() {
//     enemyShipMov();
// }, 500)

// const enemyShipMov = () => {
//     for (let i = 0; i < enemyShips.length; i++) {
//         enemyShips[i].y += 10;
//     }
// }

// const randomCoor = () => {

//     let num = Math.floor(Math.random() * Math.floor(680));
//     let decimal = num / 15;
//     return Math.round(decimal) * 15;

// }

// document.addEventListener('keydown', function(event) {

//     if (event.key === 'ArrowRight' && shipPosition.x !== canvas.width - 20) {
//         shipPosition.x += 10;
//     } else if (event.key === 'ArrowLeft' && shipPosition.x !== 0) {
//         shipPosition.x -= 10;
//     } else if (event.code === 'Space') {
//         laserCanon();
//     }
// })

