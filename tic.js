const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-Info");
const button = document.querySelector(".btn");
let currentPlayer;
let gameGrid;
let isComputerTurn = false;
const winningPositions = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

// Start game
function start() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });
    button.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
start();

// Swap turn
function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Check if game is over
function checkGameOver() {
    let winner = "";
    winningPositions.forEach(position => {
        if (gameGrid[position[0]] !== "" && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) {
            winner = gameGrid[position[0]];
            boxes.forEach(box => box.style.pointerEvents = "none");
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if (winner) {
        gameInfo.innerText = `Winner - ${winner}`;
        button.classList.add("active");
        return true;
    }

    if (gameGrid.every(box => box !== "")) {
        gameInfo.innerText = "Game Tied";
        button.classList.add("active");
        return true;
    }
    return false;
}

// Get a random empty box index for computer move
function getRandomEmptyBox() {
    const emptyBoxes = [];
    gameGrid.forEach((value, index) => {
        if (value === "") emptyBoxes.push(index);
    });
    return emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
}

// Handle computer's move
function handleComputerMove() {
    isComputerTurn = true;
    setTimeout(() => {
        const index = getRandomEmptyBox();
        gameGrid[index] = "O";
        boxes[index].innerText = "O";
        boxes[index].style.pointerEvents = "none";
        isComputerTurn = false;
        swapTurn();
        checkGameOver();
    }, 1000); // 2-second delay
}

// Handle click event
function handleClick(index) {
    if (!isComputerTurn && gameGrid[index] === "" && currentPlayer === "X") {
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        if (!checkGameOver()) {
            swapTurn();
            if (currentPlayer === "O") {
                handleComputerMove();
            }
        }
    }
}

// Add event listeners
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index));
});
button.addEventListener("click", start);