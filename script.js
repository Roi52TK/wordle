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

const keysData = keys.map(row =>
    row.map(label => ({
        label: label,
        type: label.length === 1 ? "letter" : "action"
    }))
);

const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");

const boardTiles = [];

function createBoard() {
    for (let i = 0; i < gameSettings.maxTries; i++) {
        const rowTiles = [];
        const row = document.createElement("div");
        row.className = "row";
        for(let char = 0; char < gameSettings.wordLength; char++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            rowTiles.push(tile);
            row.appendChild(tile);
        }
        boardTiles.push(rowTiles);
        board.appendChild(row);
    }
}

function createKeyboard() {
    for (let keyRow = 0; keyRow < keysData.length; keyRow++) {
        const row = document.createElement("div");
        row.className = "keyboard-row";
        for (let keyCol = 0; keyCol < keysData[keyRow].length; keyCol++) {
            const keyData = keysData[keyRow][keyCol];
            const keyBtn = document.createElement("button");
            keyBtn.textContent = keyData.label;
            keyBtn.addEventListener("click", () => handleKeyEvent(keyData));
            row.appendChild(keyBtn);
        }
        keyboard.appendChild(row);
    }
}

function handleKeyEvent(keyData) {
    if(keyData.type === "letter") {
        handleLetterPressEvent(keyData.label)
    }
    else if(keyData.label === "BACKSPACE") {
        onBackSpaceClickEvent();
    }
    else if(keyData.label === "ENTER") {
        onEnterClickEvent();
    }
}

function handleLetterPressEvent(letter) {
    if(gameState.currentGuess.length < gameSettings.wordLength) {
        gameState.currentGuess += letter;
        updateGuessDisplay();
    }
}

function onBackSpaceClickEvent() {
    gameState.currentGuess = gameState.currentGuess.slice(0, -1);
    updateGuessDisplay();
}

function onEnterClickEvent() {

}

function updateGuessDisplay() {
    for(let charIndex = 0; charIndex < gameState.currentGuess.length; charIndex++) {
        const char = gameState.currentGuess[charIndex];
        boardTiles[gameState.currentRow][charIndex].textContent = char;
    }
    for(let charIndex = gameState.currentGuess.length; charIndex < gameSettings.wordLength; charIndex++) {
        boardTiles[gameState.currentRow][charIndex].textContent = "";
    }
}

createBoard();
createKeyboard();