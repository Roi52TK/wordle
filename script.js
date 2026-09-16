const gameSettings = {
    maxTries: 6,
    wordLength: 5
};

const gameState = {
    secretWord: "APPLE", // Must be upper-case
    currentRow: 0,
    currentGuess: "",
    gameOver: false,
    results: [] 
};

const MATCH_TYPE = {
    CORRECT: "G",
    PRESENT: "Y",
    ABSENT: "B"
}

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
    if (gameState.gameOver) {
        return;
    }

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
    if(gameState.currentGuess.length !== gameSettings.wordLength) {
        return;
    }

    // Check if word is valid...


    // Enter logic
    compareGuess();
    const result = gameState.results[gameState.currentRow];
    displayGuessResult(result);
    let isWin = checkGuessResult(result);

    if(isWin) {
        onGameWon();
        return;
    }

    gameState.currentRow++;
    gameState.currentGuess = "";

    if(gameState.currentRow === gameSettings.maxTries) {
        gameState.gameOver = true;
    }
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

function displayGuessResult(result) {
    // For testing
    const subtitle = document.getElementById("sub-title");
    subtitle.textContent = result.join("");
}

function compareGuess() {
    const letterCounts = new Map();
    const result = new Array(gameSettings.wordLength);
    
    // Map secret word letters - count
    for (let i = 0; i < gameSettings.wordLength; i++) {
        const char = gameState.secretWord[i];
        const count = letterCounts.has(char) ? letterCounts.get(char) + 1 : 1;
        letterCounts.set(char, count);
    }

    // Compare correct position letters
    for(let i = 0; i < gameSettings.wordLength; i++) {
        const guessChar = gameState.currentGuess[i];
        const secretWordChar = gameState.secretWord[i];
        if(guessChar === secretWordChar) {
            result[i] = MATCH_TYPE.CORRECT;

            // Update map
            const count = letterCounts.get(secretWordChar) - 1;
            if(count === 0) {
                letterCounts.delete(secretWordChar);
            }
            else {
                letterCounts.set(secretWordChar, count);
            }
        }
    }

    // Check remaining letters
    for(let i = 0; i < gameSettings.wordLength; i++) {
        if(result[i] !== MATCH_TYPE.CORRECT) {
            const guessChar = gameState.currentGuess[i];
            if(letterCounts.has(guessChar)) {
                // Wrong position letter
                result[i] = MATCH_TYPE.PRESENT;

                // Update map
                const count = letterCounts.get(guessChar) - 1;
                if (count === 0) {
                    letterCounts.delete(guessChar);
                }
                else {
                    letterCounts.set(guessChar, count);
                }
            }
            else {
                // Letter does not exist
                result[i] = MATCH_TYPE.ABSENT;
            }
        }
    }

    // Update result
    gameState.results.push(result);
}

function checkGuessResult(result) {
    for(let i = 0; i < result.length; i++) {
        if(result[i] !== MATCH_TYPE.CORRECT) {
            return false;
        }
    }

    return true;
}

function onGameWon() {
    gameState.gameOver = true;
    // For testing
    const subtitle = document.getElementById("sub-title");
    subtitle.textContent = "YOU WON!!!!";
}

createBoard();
createKeyboard();