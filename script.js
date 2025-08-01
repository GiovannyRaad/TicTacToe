let grid = new Array(9).fill(9); /* creates and fills the game board with 9s */
let turn = 1; /* 1 = x and 0 = O */
let winner;
let running = true;

const cells = document.querySelectorAll(".cell");
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


cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});



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
            endGame();
        } else if (result == 3){
            winner = 1;
            drawWinLine(pattern);
            endGame();
        }
        pattern++;
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

function endGame(){
    cells.forEach(cell => {
        cell.removeEventListener("click", handleClick);
    });
}