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

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
]

const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");

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

function createKeyboard() {
    for(let keyRow = 0; keyRow < keys.length; keyRow++) {
        const row = document.createElement("div");
        row.className = "keyboard-row";
        for(let key = 0; key < keys[keyRow].length; key++) {
            const keyBtn = document.createElement("button");
            keyBtn.textContent = keys[keyRow][key];
            row.appendChild(keyBtn);
        }
        keyboard.appendChild(row);
    }
}

createBoard();
createKeyboard();