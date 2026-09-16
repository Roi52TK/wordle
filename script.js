const gameSettings = {
    maxTries: 6,
    wordLength: 5
};

const gameState = {
    secretWord: "",
    currentRow: 0,
    currentGuess: "",
    gameOver: false
};

const board = document.getElementById("game-board");

function createBoard() {
    for (let i = 0; i < gameSettings.maxTries; i++) {
        const row = document.createElement("div");
        row.className = "row";
        for(let char = 0; char < gameSettings.wordLength; char++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            row.appendChild(tile);
        }
        board.appendChild(row);
    }
}

createBoard();