var myGamePiece;
var points = 0;
var fish;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(50, 70, "red", 0, 0);
    fish = new component(50, 70, "red", 0, 0);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 50;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

var gravity = .1;
var accel = gravity;
var mouseSpeed = 2;
var maxacel = 20;
var fishh = 50;

function updateGameArea() {
    var canvasWidth = myGameArea.canvas.width;
    var canvasHeight = myGameArea.canvas.height;
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    if(accel < maxacel){

        accel += gravity
    }
    if(myGamePiece.y > (canvasHeight - myGamePiece.height+1)){
        myGamePiece.y = (canvasHeight - myGamePiece.height + 1)
        accel = -(accel)/1.6;
    }

    if(myGamePiece.y < 0){
        myGamePiece.y = 0;
    }

    else{

        myGamePiece.speedY += accel
    }    

    if(mouseDown){
        accel -= (accel + mouseSpeed);
    }

    if(myGamePiece.y < fishh && (myGamePiece.y + myGamePiece.height > fishh)){
        points += .1;
    }





    myGamePiece.newPos();
    myGamePiece.update();
    updateCoordinates();
    updateCanvasPosition();
}


// Variables to track mouse state and position
var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

// Event listener for mouse down
window.addEventListener('mousedown', function (e) {
    if (e.button === 0) { // Check if left mouse button is pressed (button 0)
        mouseDown = true;
        mouseX = e.clientX; // Get the mouse X position
        mouseY = e.clientY; // Get the mouse Y position
    }
});

// Event listener for mouse up
window.addEventListener('mouseup', function (e) {
    if (e.button === 0) { // Check if left mouse button is released (button 0)
        mouseDown = false;
    }
});
function updateCoordinates() {
    var xCoordinateElement = document.getElementById("x-coordinate");
    var yCoordinateElement = document.getElementById("y-coordinate");
    var pointsElement = document.getElementById("points");
    xCoordinateElement.innerText = "X-coordinate: " + myGamePiece.x;
    yCoordinateElement.innerText = "Y-coordinate: " + myGamePiece.y;
    pointsElement.innerText = "Points: " + points;

}

function updateCanvasPosition() {
    myGameArea.canvas.style.left = myGamePiece.x + 'px';
    myGameArea.canvas.style.top = myGamePiece.y + 'px';
}