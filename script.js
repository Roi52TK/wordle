const gameSettings = {
    maxTries: 6,
    wordLength: 5
};

const gameState = {
    secretWord: "APPLE", // Must be upper-case
    currentRow: 0,
    currentGuess: "",
    gameOver: false,
    results: [],
    lettersStatus: new Map()
};

const MATCH_TYPE = {
    UNKNOWN: "U",
    CORRECT: "G",
    PRESENT: "Y",
    ABSENT: "B"
}

const secretWords = [
    "APPLE",
    "GRAPE",
    "HOUSE",
    "PLANT",
    "LIGHT",
    "WATER",
    "MOUSE",
    "TRAIN",
    "STONE",
    "CLOUD",
    "BEACH",
    "BREAD",
    "CHAIR",
    "DREAM",
    "HEART"
];

const allowedWords = [
    "APPLE",
    "GRAPE",
    "HOUSE",
    "PLANT",
    "LIGHT",
    "WATER",
    "MOUSE",
    "TRAIN",
    "STONE",
    "CLOUD",
    "BEACH",
    "BREAD",
    "CHAIR",
    "DREAM",
    "HEART",
    "ABOUT",
    "ABOVE",
    "AFTER",
    "AGAIN",
    "ALONE",
    "ANGEL",
    "BLACK",
    "BLAME",
    "BLIND",
    "BRAIN",
    "BRAVE",
    "BRING",
    "CARRY",
    "CAUSE",
    "CLEAR",
    "CLOSE",
    "CRAZY",
    "EARTH",
    "EMPTY",
    "ENJOY",
    "EVERY",
    "FIGHT",
    "FINAL",
    "FIRST",
    "FRONT",
    "GIANT",
    "GREEN",
    "HAPPY",
    "HORSE",
    "HOUSE",
    "IMAGE",
    "JUICE",
    "LEARN",
    "MUSIC",
    "NIGHT",
    "OCEAN",
    "PAPER",
    "PEACE",
    "PHONE",
    "PIANO",
    "PLACE",
    "PLANE",
    "POWER",
    "QUEEN",
    "QUIET",
    "RADIO",
    "RIGHT",
    "ROUND",
    "SMILE",
    "SOUND",
    "SPACE",
    "SPEAK",
    "SWEET",
    "TABLE",
    "TEACH",
    "THING",
    "THINK",
    "THROW",
    "TODAY",
    "TOUCH",
    "TRUST",
    "VOICE",
    "WATCH",
    "WORLD",
    "WRITE",
    "YOUNG"
];

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

const keysDataMap = new Map(
    keysData.flat().map(obj => [obj.label, obj])
);

document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    if (keysDataMap.has(key)) {
        handleKeyEvent(keysDataMap.get(key));
    }
})

const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");

const boardTiles = [];
const keyboardKeys = new Map();

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
            keyboardKeys.set(keyData.label, keyBtn); // Add button to map
            keyBtn.addEventListener("click", () => handleKeyEvent(keyData));
            row.appendChild(keyBtn);
        }
        keyboard.appendChild(row);
    }
}

function resetLettersStatus() {
    // Iterating codes from A to Z
    for(let c = 97; c <= 122; c++) {
        const char = String.fromCharCode(c).toUpperCase();
        gameState.lettersStatus.set(char, MATCH_TYPE.UNKNOWN);
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
    // Length of word is illegal
    if(gameState.currentGuess.length !== gameSettings.wordLength) {
        return;
    }

    // Check if word is not allowed
    if(!allowedWords.includes(gameState.currentGuess)) {
        return;
    }

    // Enter logic
    compareGuess();
    const result = gameState.results[gameState.currentRow];
    displayGuessResult(result);
    updateLettersStatus(result);
    updateKeyboardDisplay();
    const isWin = checkGuessResult(result);

    if(isWin) {
        onGameWon();
        return;
    }

    // Move onto the next row and reset current guess
    gameState.currentRow++;
    gameState.currentGuess = "";

    if(gameState.currentRow === gameSettings.maxTries) {
        onGameLost();
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
    for(let i = 0; i < result.length; i++) {
        const tile = boardTiles[gameState.currentRow][i];
        let color;

        if(result[i] === MATCH_TYPE.ABSENT) {
            color = "gray";
        }
        else if (result[i] === MATCH_TYPE.CORRECT) {
            color = "green";
        }
        else if (result[i] === MATCH_TYPE.PRESENT) {
            color = "yellow";
        }

        tile.style.backgroundColor = color;
    }
}

function updateLettersStatus(result) {
    for(let i = 0; i < result.length; i++) {
        const char = gameState.currentGuess[i];

        // Anyway if char is correct then status is correct
        if(result[i] === MATCH_TYPE.CORRECT) {
            gameState.lettersStatus.set(char, MATCH_TYPE.CORRECT);
        }

        // Char status unknown
        else if (gameState.lettersStatus.get(char) === MATCH_TYPE.UNKNOWN) {
            // Char is not in secret word
            if (result[i] === MATCH_TYPE.ABSENT) {
                // Absent status
                gameState.lettersStatus.set(char, MATCH_TYPE.ABSENT);
            }
            else {
                // Wrong position therefore present
                gameState.lettersStatus.set(char, MATCH_TYPE.PRESENT);
            }
        }
    }
}

function updateKeyboardDisplay() {
    // Change button background color of each letter according to its status
    gameState.lettersStatus.forEach((value, key, map) => {
        const button = keyboardKeys.get(key);
        
        if(value === MATCH_TYPE.UNKNOWN) {
            // Button default background color
            button.style.backgroundColor = "";
        }
        else if(value === MATCH_TYPE.ABSENT) {
            button.style.backgroundColor = "gray";
        }
    })
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
    // For testing
    const subtitle = document.getElementById("sub-title");
    subtitle.textContent = "YOU WON!!!!";
    gameOver();
}

function onGameLost() {
    // For testing
    const subtitle = document.getElementById("sub-title");
    subtitle.textContent = "You lost:(";
    gameOver();
}

function gameOver() {
    gameState.gameOver = true;
    // For testing
    const subtitle = document.getElementById("sub-title");
    subtitle.textContent += "The secret word was: " + gameState.secretWord;
}

function chooseRandomSecretWord() {
    const rndIndex = Math.floor(Math.random() * secretWords.length);
    gameState.secretWord = secretWords[rndIndex];
}

function startNewGame() {
    gameState.currentRow = 0;
    gameState.currentGuess = "";
    gameState.gameOver = false;
    gameState.results = [];

    resetLettersStatus();
    updateKeyboardDisplay();
    chooseRandomSecretWord();
}

createBoard();
createKeyboard();
startNewGame();