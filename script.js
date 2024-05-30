function Player1() {
    const name = "Joshua";
    const icon = "X";
    return {name, icon};
}

function Player2() {
    const name = "Esther";
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

function placeIcon(gameBoard, playerIcon) {
    let choice;
    let validChoice = false;

    while (!validChoice) {
        choice = prompt("Give me a number between 1 and 9");
        if (choice >= 1 && choice <= 9) {
            let i = Math.floor((choice - 1) / 3);
            let j = (choice - 1) % 3;
            if (gameBoard[i][j] === "") {
                gameBoard[i][j] = playerIcon;
                validChoice = true;
            } else {
                choice = prompt("Give me a number between 1 and 9")
            }
        }
    }
}

function changeTurn() {
    let turn = 0;
    for (let i = 0; i < 9; i++) {
        if (turn === 0) {
            placeIcon(gameBoard, Player1().icon);
            if (checkWinner(gameBoard, Player1().icon) === true) {
                console.log(`${Player1().name} wins!`);
                break;
            };
            turn++;
        } else if (turn === 1) {
            placeIcon(gameBoard, Player2().icon);
            if (checkWinner(gameBoard, Player2().icon) === true) {
                console.log(`${Player2().name} wins!`);
                break;
            };
            turn--;
        }
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

// A display controller is for DOM


// Game for winning combinations, changing turns, winner check
function Game() {

}