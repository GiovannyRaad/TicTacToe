let grid = new Array(9).fill(9); /* creates and fills the game board with 9s */
let turn = 1; /* 1 = x and 0 = O */

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(event){
    const cell = event.target; /* actual dom element */
    const index = cell.dataset.index; /* gets value of data-index */
    if (grid[index] == 9){
        grid[index] = turn;
        draw(cell, turn);
        turn = (turn + 1) % 2;

    }
}

function draw(cell, turn){
    const span = cell.querySelector("span"); /* gets the X or 0 inside the cell */
    if (turn == 1) {
        span.textContent = "X";
    } else if (turn == 0) {
        span.textContent = "O";
    } else {
        alert("Game turn error, try to reload the page");
        return;
    }

    span.style.display = "inline";
}