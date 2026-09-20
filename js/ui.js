import { gameSettings, gameState, MATCH_TYPE } from "./gameState.js";

const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

const keysData = keys.map(row =>
    row.map(label => ({
        label: label,
        type: label.length === 1 ? "letter" : "action"
    }))
);

export const keysDataMap = new Map(
    keysData.flat().map(obj => [obj.label, obj])
);

export const subtitle = document.getElementById("sub-title");
const board = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
export const message = document.getElementById("message");
export const playAgainBtn = document.getElementById("play-again-btn");

const boardTiles = [];
const keyboardKeys = new Map();

export function createBoard() {
    for (let i = 0; i < gameSettings.maxTries; i++) {
        const rowTiles = [];
        const row = document.createElement("div");

        row.className = "row";

        for (let char = 0; char < gameSettings.wordLength; char++) {
            const tile = document.createElement("div");

            tile.className = "tile";
            tile.addEventListener("animationend", handleTileAnimationEnd);
            
            rowTiles.push(tile);
            row.appendChild(tile);
        }

        boardTiles.push(rowTiles);
        board.appendChild(row);
    }
}

function handleTileAnimationEnd(event) {
    const tile = event.currentTarget;

    if (event.animationName === "horizontal-shaking") {
        tile.classList.remove("shake");
    }
    else if (event.animationName === "popping-animation") {
        tile.classList.remove("letter");
    }
}

export function createKeyboard(handleKeyEvent) {
    for (let keyRow = 0; keyRow < keysData.length; keyRow++) {
        const row = document.createElement("div");

        row.className = "keyboard-row";

        for (let keyCol = 0; keyCol < keysData[keyRow].length; keyCol++) {
            const keyData = keysData[keyRow][keyCol];
            const keyBtn = document.createElement("button");

            keyBtn.className = "keyboard-button";
            keyBtn.textContent = keyData.label;

            keyboardKeys.set(keyData.label, keyBtn);

            keyBtn.addEventListener("click", () => handleKeyEvent(keyData));

            row.appendChild(keyBtn);
        }

        keyboard.appendChild(row);
    }
}

export function resetLettersStatus() {
    for (let c = 97; c <= 122; c++) {
        const char = String.fromCharCode(c).toUpperCase();
        gameState.lettersStatus.set(char, MATCH_TYPE.UNKNOWN);
    }
}

export function showMessage(messageText) {
    message.textContent = messageText;

    message.classList.remove("fade");

    void message.offsetWidth;

    message.classList.add("fade");
}

export function shakeRow(rowNum) {
    const row = boardTiles[rowNum];

    row.forEach(tile => {
        tile.classList.remove("letter");
        tile.classList.remove("shake");

        void tile.offsetWidth;

        tile.classList.add("shake");
    });
}

export function updateGuessDisplay() {
    for (let charIndex = 0; charIndex < gameState.currentGuess.length; charIndex++) {
        const char = gameState.currentGuess[charIndex];

        boardTiles[gameState.currentRow][charIndex].textContent = char;
    }

    for (let charIndex = gameState.currentGuess.length; charIndex < gameSettings.wordLength; charIndex++ ) {
        boardTiles[gameState.currentRow][charIndex].textContent = "";
    }
}

export function animateTile(row, col) {
    const tile = boardTiles[row][col];

    tile.classList.remove("letter");
    void tile.offsetWidth;
    tile.classList.add("letter");
}

export function displayGuessResult(result) {
    const flipDelay =
        gameSettings.resultFlipDuration /
        gameSettings.wordLength /
        1000;

    const resultDelay = 0.25;

    for (let i = 0; i < result.length; i++) {
        const tile = boardTiles[gameState.currentRow][i];
        const nextFlip = flipDelay * i;

        tile.style.animationDelay = nextFlip + "s";
        tile.classList.add("flip");

        setTimeout(() => {
            if (result[i] === MATCH_TYPE.ABSENT) {
                tile.classList.add("absent");
            }
            else if (result[i] === MATCH_TYPE.CORRECT) {
                tile.classList.add("correct");
            }
            else if (result[i] === MATCH_TYPE.PRESENT) {
                tile.classList.add("present");
            }
        }, (nextFlip + resultDelay) * 1000);
    }
}

export function updateLettersStatus(result) {
    for (let i = 0; i < result.length; i++) {
        const char = gameState.currentGuess[i];

        if (result[i] === MATCH_TYPE.CORRECT) {
            gameState.lettersStatus.set(char, MATCH_TYPE.CORRECT);
        }
        else if (gameState.lettersStatus.get(char) === MATCH_TYPE.UNKNOWN) {
            if (result[i] === MATCH_TYPE.ABSENT) {
                gameState.lettersStatus.set(char, MATCH_TYPE.ABSENT);
            }
            else {
                gameState.lettersStatus.set(char, MATCH_TYPE.PRESENT);
            }
        }
    }
}

export function updateKeyboardDisplay() {
    gameState.lettersStatus.forEach((value, key) => {
        const button = keyboardKeys.get(key);

        button.classList.remove("absent");
        button.classList.remove("correct");
        button.classList.remove("present");

        if (value === MATCH_TYPE.ABSENT) {
            button.classList.add("absent");
        }
        else if(value === MATCH_TYPE.CORRECT) {
            button.classList.add("correct");
        }
        else if(value === MATCH_TYPE.PRESENT) {
            button.classList.add("present");
        }
    });
}

export function clearBoard() {
    for (let row = 0; row < gameSettings.maxTries; row++) {
        for (let char = 0; char < gameSettings.wordLength; char++) {
            const tile = boardTiles[row][char];

            tile.textContent = "";
            tile.style.animationDelay = "0s";

            tile.classList.remove("shake");
            tile.classList.remove("flip");
            tile.classList.remove("absent");
            tile.classList.remove("present");
            tile.classList.remove("correct");
        }
    }
}