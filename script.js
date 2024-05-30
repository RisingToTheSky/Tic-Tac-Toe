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
        console.log(choice);
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
    for (let i = 0; i < 5; i++) {
        if (turn === 0) {
            placeIcon(gameBoard, Player1().icon);
            turn++;
        } else if (turn === 1) {
            placeIcon(gameBoard, Player2().icon);
            turn--;
        }
    }
}

function Game() {

}