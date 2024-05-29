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

    // Place player icon on board
    return board;
})();
console.log(gameBoard);

function placeIcon(gameBoard, playerIcon) {
    let choice;
    let validChoice = false;
    // Access gameBoard

    // Access player Icon
    while (!validChoice) {
        choice = prompt("Give me a number between 1 and 9");
        if (choice >= 1 && choice <= 9) {
            let i = Math.floor((choice - 1) / 3);
            let j = (choice - 1) % 3;
            if (gameBoard[i][j] === "") {
                gameBoard[i][j] = Player1().icon;
                validChoice = true;
            } else {
                choice = prompt("Give me a number between 1 and 9")
            }
        }
    }
}

function Player1() {
    const name = "Joshua";
    const icon = "X";
    return {name, icon};
}

function Game() {

}