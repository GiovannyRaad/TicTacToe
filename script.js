let grid = new Array(9).fill(9); /* creates and fills the game board with 9s */
let turn = 1; /* 1 = x and 0 = O */
let winner;
let running = true;

const cells = document.querySelectorAll(".cell");
const winScreen = document.querySelector(".winScreen");
const winCon = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [2, 5, 8],
  [6, 7, 8],
  [1, 4, 7],
  [3, 4, 5]
];
const line = document.querySelector(".line");

let prev_cell;

/* cells click checker */
cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

/* restart button click checker */
document.getElementById("restart").addEventListener("click", restart);

function resetFlicker(){ /* stops the flicker animation of the previous cell */
    if (prev_cell){
        prev_cell.querySelector("span").classList.remove("flickerX");
        prev_cell.querySelector("span").classList.remove("flickerO");
    }
}
function handleClick(event){
    const cell = event.target; /* actual dom element */
    const index = cell.dataset.index; /* gets value of data-index */
    if (grid[index] == 9){
        resetFlicker();
        prev_cell = cell;
        grid[index] = turn;
        draw(cell, turn);
        turn = (turn + 1) % 2;
        winCheck();

    }
}

function draw(cell, turn){
    const span = cell.querySelector("span"); /* gets the X or 0 inside the cell */
    if (turn == 1) {
        span.textContent = "X";
        span.classList.add("x"); /* for the color */
        span.classList.add("flickerX"); /* for the animation */
    } else if (turn == 0) {
        span.textContent = "O";
        span.classList.add("o");
        span.classList.add("flickerO");
    } else {
        alert("Game turn error, try to reload the page");
        return;
    }

    span.style.opacity = 100;
    span.style.fontSize = "1em";
    

}

function winCheck(){
    let pattern = 1;
    for (const con of winCon){
        const result = grid[con[0]] + grid[con[1]] + grid[con[2]]; /* if = 0, O wins, if = 3, X wins */
        if (result == 0){
            winner = 0;
            drawWinLine(pattern);
            endGame(winner);
        } else if (result == 3){
            winner = 1;
            drawWinLine(pattern);
            endGame(winner);
        }
        pattern++;
    }
    if (!grid.includes(9)){
        winner = 2;
        endGame(winner);
    }
}

function drawWinLine(pattern){ /* change rotation and location of line */
    switch (pattern) {
        
        case 1:
            line.style.rotate = "90deg";
            line.style.bottom = "68%";
            line.style.height = "90%";
            break;

        case 2:
            line.style.rotate = "0deg";
            line.style.right = "66.5%";
            line.style.height = "90%";
            break;
        
        case 3:
            line.style.rotate = "-45deg";
            line.style.height = "110%";
            break;

        case 4:
            line.style.rotate = "45deg";
            line.style.height = "110%";
            break;

        case 5:
            line.style.rotate = "0deg";
            line.style.left = "66.5%";
            line.style.height = "90%";
            break;

        case 6:
            line.style.rotate = "90deg";
            line.style.top = "68%";
            line.style.height = "90%";
            break;

        case 7:
            line.style.rotate = "0deg";
            line.style.height = "90%";
            break;

        case 8:
            line.style.rotate = "90deg";
            line.style.height = "90%";
    }
}

function endGame(win){
    const winText = document.getElementById('winText');
    cells.forEach(cell => {
        cell.removeEventListener("click", handleClick);
    });

    switch (win) {
        case 0:
            winText.textContent = "0 WINS";
            winText.classList.add("redNeon");
            break;

        case 1:
            winText.textContent = "X WINS";
            winText.classList.add("blueNeon");
            break;

        case 2:
            winText.textContent = "DRAW";
            winText.classList.add("greenNeon");
    }
    winScreen.style.transform = 'translate(-50%, -50%) scaleX(1)';
}

function restart(){
    resetFlicker();
    winner = null;
    turn = (turn + 1) % 2;
    grid.fill(9);

    /* restore cell properties to default */
    for (cell of cells){
        let span = cell.querySelector("span");
        span.textContent = "";
        span.classList.remove("x");
        span.classList.remove("o");
        span.style.opacity = 0;
        span.style.fontSize = "0em";
    }

    /* restore line to default position */
    line.style.height = "0%";
    line.style.top = "0";
    line.style.left = "0";
    line.style.right = "0";
    winScreen.style.transform = 'translate(-50%, -50%) scaleX(0)';

    /* reset win text */
    winText.classList.remove("redNeon");
    winText.classList.remove("blueNeon");
    winText.classList.remove("greenNeon");

    /* reactivate cells click checker */
    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

}