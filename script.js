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
    let currentPlayer = Player2().icon;
    function changeTurn() {
        currentPlayer = currentPlayer === Player1().icon ? Player2().icon : Player1().icon;
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
        return false;
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
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (cell.textContent === "") {
                cell.textContent = Game.changeTurn();
            }
        });
    })

    // Event listener for restart button
    const restart = document.querySelector(".restart");
    restart.addEventListener("click", () => {
        cells.forEach((cell) => {
            cell.textContent = "";
            Game.newGame();
        })
    })
})();