function Player1() {
    const name = document.getElementById("Player1").value;
    const icon = "X";
    return {name, icon};
}

function Player2() {
    const name = document.getElementById("Player2").value;
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

// Game for winning combinations, changing turns, winner check
const Game = (function () {
    let turnCount = 0;
    let currentPlayer = Player1().icon;
    let gameOver = false;

    function changeTurn() {
        if (gameOver) return;

        if (turnCount === 0) {
            currentPlayer = Player1().icon;
            turnCount++;
            return currentPlayer;
        } else {
            currentPlayer = currentPlayer === Player1().icon ? Player2().icon : Player1().icon;
            turnCount++;
            return currentPlayer;
        }
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
                gameOver = true;
                return true;
            }
        }
        if (turnCount === 9) {
            gameOver = true;
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
        turnCount = 0;
        gameOver = false;
    }
    
    return {changeTurn, checkWinner, newGame, turnCount};
})();

// Display controller
const displayController = (function () {
    // Show board after submitting player names
    const container = document.querySelector(".container");
    const start = document.querySelector(".start");
    const form = document.querySelector("form");
    const reset = document.querySelector(".reset")

    start.addEventListener("click", (e) => {
        container.classList.remove("hidden");
        form.classList.add("hidden");
        e.preventDefault();
    })
    
    // Event listener for reset button
    reset.addEventListener("click", (e) => {
        container.classList.add("hidden");
        form.classList.remove("hidden");
    })

    // Render board
    const boardDiv = document.querySelector(".cells");
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

    turn.textContent = "X begins";
    cells.forEach((cell, index) => {
        const col = index % 3;
        const row = Math.floor (index / 3);

        cell.addEventListener("click", () => {
            if (cell.textContent === "") {
                cell.textContent = Game.changeTurn();
                gameBoard[row][col] = cell.textContent;
                if (Game.turnCount % 2 !== 0) {
                    turn.textContent = `${Player1().name}'s turn`;
                    Game.turnCount++;
                } else {
                    turn.textContent = `${Player2().name}'s turn`;
                    Game.turnCount++;
                }
                if (Game.checkWinner(gameBoard, Player1().icon) === true) {
                    winner.textContent = `${Player1().name} is the winner!`;
                    turn.textContent = "";
                } else if (Game.checkWinner(gameBoard, Player2().icon) === true) {
                    winner.textContent = `${Player2().name} is the winner!`;
                    turn.textContent = "";
                } else if (Game.checkWinner(gameBoard, Player1().icon) === false && Game.checkWinner(gameBoard, Player2().icon) === false) {
                    winner.textContent = "Players tied!";
                    turn.textContent = "";
                }
            }
        })
        // Event listener for restart button
        restart.addEventListener("click", () => {
            cell.textContent = "";
            Game.newGame();
            winner.textContent = "";
            Game.turnCount = 0;
            turn.textContent = `${Player1().name} begins`;
        })
    })
})();