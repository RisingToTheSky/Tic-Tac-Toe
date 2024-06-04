function Player1() {
    const name = "Player 1";
    const icon = "X";
    return {name, icon};
}

function Player2() {
    const name = "Player 2";
    const icon = "O";
    return {name, icon};
}

const gameBoard = (function() {
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < columns; i++) {
        board[i] = [];
        for (let j = 0; j < rows; j++) {
            board[i].push("");
        }
    }
    
    return board;
})();
console.log(gameBoard);

// Game for winning combinations, changing turns, winner check
const Game = (function () {
    let turnCount = 0;
    let currentPlayer = Player2().icon;
    function changeTurn() {
        currentPlayer = currentPlayer === Player1().icon ? Player2().icon : Player1().icon;
        turnCount++;
        return currentPlayer;
    }

    function checkWinner(gameBoard, playerIcon) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        const flatBoard = gameBoard.flat();
        // Check if index of gameBoard array matches win condition
        for (let combination of winningCombinations) {
            let win = true;
            for (let index of combination) {
                if (flatBoard[index] !== playerIcon) {
                    win = false;
                    break;
                }
            }
            if (win) {
                return true;
            }
        }
        if (turnCount === 9) {
            return false;
        }
    }

    function restartBoard(gameBoard) {
        for (let i = 0; i < 3; i++) {
            gameBoard[i] = [];
            for (let j = 0; j < 3; j++) {
                gameBoard[i].push("");
            }
        }
    }

    function newGame() {
        restartBoard(gameBoard);
        changeTurn();
        turnCount = 0;
    }

    return {changeTurn, checkWinner, newGame};
})();

// Display controller
const displayController = (function () {
    // Render board
    const boardDiv = document.querySelector(".container");
    gameBoard.forEach(row => {
        row.forEach(() => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            boardDiv.appendChild(cellButton);
        })
    })

    // Event listener for cell buttons
    const cells = document.querySelectorAll(".cell");
    const restart = document.querySelector(".restart");
    const turn = document.querySelector(".turn");
    const winner = document.querySelector(".winner");
    cells.forEach((cell, index) => {
        const col = index % 3;
        const row = Math.floor (index/ 3);

        cell.addEventListener("click", () => {
            if (cell.textContent === "") {
                cell.textContent = Game.changeTurn();
                gameBoard[row][col] = cell.textContent;
                if (Game.checkWinner(gameBoard, Player1().icon) === true) {
                    winner.textContent = `${Player1().name} is the winner!`;
                } else if (Game.checkWinner(gameBoard, Player2().icon) === true) {
                    winner.textContent = `${Player2().name} is the winner!`;
                } else if (Game.checkWinner(gameBoard, Player1().icon) === false && Game.checkWinner(gameBoard, Player2().icon) === false) {
                    winner.textContent = "Players tied!";
                }
            }
        })
        // Event listener for restart button
        restart.addEventListener("click", () => {
            cell.textContent = "";
            Game.newGame();

            winner.textContent = "";
        })
    })
})();