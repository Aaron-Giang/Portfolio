

class GameBoard{
    constructor(){
        this.layout = [];
        this.playerBoard = [];
        this.points = 0;
        this.maxTime = 15;
        this.time = this.maxTime;
        this.timeIncrease = 2;
        this.start = false;
        this.keydownEventListener = this.handleKeydown.bind(this);
        this.interval = setInterval(() => {
            this.updateTimer()
        }, 10);
        
    }
    startGame() {
        this.start = true; // Set isRunning to true
        // Start the game logic (e.g., initialize, reset, etc.)
        this.initialize();
        this.reset();
        const progressBar = document.getElementById('progressBar'); // Get the timer bar element
        progressBar.style.display = 'flex'; // Hide the timer bar
        document.addEventListener('keydown', this.keydownEventListener);
    }

    stopGame() {
        this.start = false; // Set isRunning to false
        const container = document.getElementById('boardContainer');
        const score = document.getElementById('score');
        container.innerHTML = ''; // Clear previous contents
        score.innerHTML = ''; // Clear previous contents
        clearInterval(this.interval);
        const progressBar = document.getElementById('progressBar'); // Get the timer bar element
        progressBar.style.display = 'none'; // Hide the timer bar
        document.removeEventListener('keydown', this.keydownEventListener);
    }

    updateBoard(direction,boardNum){
        switch(boardNum){
            case 0:
                var board = this.layout;
                break;
            case 1:
                var board = this.playerBoard;
                break;

        }
        switch(direction){
            case 0:
                board.push("up")
                break;
            case 1:
                board.push("down")
                break;
            case 2:
                board.push("left")
                break;
            case 3:
                board.push("right")
                break;
            default:
                // code block
        }

        this.renderBoard()
    }

    reset(){
        this.layout = [];
        this.playerBoard = [];
        //getting size for board
        var max = 10
        var min = 5
        var gameSize = Math.floor(Math.random() * (max - min) ) + min //random game size
        
        for (var i =0; i < gameSize; i++){
            var direction = Math.floor(Math.random() * 4); //random direction number
            this.updateBoard(direction,0)
        }

        this.renderBoard();

    }
    initialize(){}
    handleKeydown(event) {
        var keyPressed = event.key.toLowerCase();
        switch(keyPressed) {
            case 'w':
                this.updateBoard(0,1);
                break;
            case 'a':
                this.updateBoard(2,1);
                break;
            case 's':
                this.updateBoard(1,1);
                break;
            case 'd':
                this.updateBoard(3,1);
                break;
            default:
                break;
        }

        var lengGame = this.playerBoard.length;
        var lengLayout = this.layout.length;
        
        // Fail Game
        for (var i =0; i < lengGame; i++) {
            if(this.layout[i] != this.playerBoard[i]) {
                this.reset();
            }
        }

        // Win Game
        if(this.playerBoard.length == this.layout.length) {
            this.points += 1;
            this.time += this.timeIncrease;
            this.reset();
        }
    }

    displayScore() {
        document.getElementById('score').innerText = "Score: " +String(this.points);

    }


    renderBoard() {
        this.displayScore();
        const container = document.getElementById('boardContainer');
        container.innerHTML = ''; // Clear previous contents

        var i =0;
        this.layout.forEach(direction => {
            const img = document.createElement('img');
            if(i<this.playerBoard.length){
                img.src = `icons/${direction}G.png`; // Assuming you have arrow icons in a folder named 'icons'
            }
            else{
                img.src = `icons/${direction}.png`; // Assuming you have arrow icons in a folder named 'icons'

            }
            container.appendChild(img);

            i++;
        });
    }
    
    updateTimer(){
        if(this.start){
            if(this.time <0){
                this.time = this.maxTime;
                this.points = 0;
                this.reset();
            }

            this.time -= 0.01;
            var innerProgressBar = document.getElementById('innerProgressBar');
            if(this.time > this.maxTime){
                this.time = this.maxTime;
            }
            var percent = (this.time / this.maxTime * 100);
            innerProgressBar.style.width = percent + '%'; // Set the width based on the percentage
        }

    }
    
}



let gm = null; // Initialize gm to null initially

const button = document.getElementById('startButton');

// Add event listener for "click" event
button.addEventListener('click', function() {
    if (gm) {
        // If gm exists, stop the game
        gm.stopGame();
        gm = null; // Reset gm to null
        button.textContent = "Start Game"; // Change button text
    } else {
        // If gm does not exist, start the game
        gm = new GameBoard();
        gm.startGame();
        button.textContent = "Stop Game"; // Change button text
    }

});