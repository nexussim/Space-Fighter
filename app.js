let board = document.getElementById('board');
let shipPositionX;
let shipPositionY;

const ship = () => {
    let spaceship = document.createElement('div');
    spaceship.setAttribute('id', 'spaceship');
    board.appendChild(spaceship);
    shipPositionX = document.getElementById("spaceship").style.marginLeft = "350px";
    shipPositionY = document.getElementById("spaceship").style.marginTop = "365px";
}

ship();

const movement = (event) => {
    if (event.keyCode === 39 && parseInt(shipPositionX) < 680) {
        let spaceshipStyles = document.getElementById('spaceship')
        let value = parseInt(shipPositionX) + 10;
        spaceshipStyles.style.marginLeft = value.toString() + 'px';
        shipPositionX = value.toString() + 'px';
    }

    if (event.keyCode === 37 && parseInt(shipPositionX) > 0) {
        let spaceshipStyles = document.getElementById('spaceship')
        let value = parseInt(shipPositionX) - 10;
        spaceshipStyles.style.marginLeft = value.toString() + 'px';
        shipPositionX = value.toString() + 'px';
    }
}
