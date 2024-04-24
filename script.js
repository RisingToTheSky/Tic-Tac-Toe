(function gameBoard () {
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < columns; i++) {
        board[i] = [];
        for (let j = 0; j < rows; j++) {
            board[i].push(Cell());
        }
    }
    console.log(board);
    return board;
})();

function Player() {
    const players = [{
        name: "Joshua", // prompt("Player 1!  Name:"),
        icon: "X",
    }, {
        name: "Esther", // prompt("Player 2!  Name:"),
        icon: "O",
    }]
    return players;
}
console.log(Player());

function Game() {

}