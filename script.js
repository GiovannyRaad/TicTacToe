let grid = new Array(9).fill(9); /* creates and fills the game board with 9s */
let turn = 1; /* 1 = x and 0 = O */

const cells = document.querySelectorAll(".cell");

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