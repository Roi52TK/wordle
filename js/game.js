import { gameSettings, gameState } from "./gameState.js";

import {
    clearBoard,
    resetLettersStatus,
    updateKeyboardDisplay,
    updateGuessDisplay,
    displayGuessResult,
    updateLettersStatus,
    showMessage,
    shakeRow,
    subtitle,
    playAgainBtn,
    keysDataMap
} from "./ui.js";

import {
    allowedWords,
    compareGuess,
    checkGuessResult,
    chooseRandomSecretWord
} from "./wordLogic.js";

document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();

    if (keysDataMap.has(key)) {
        handleKeyEvent(keysDataMap.get(key));
    }
});

playAgainBtn.addEventListener("click", startNewGame);

export function handleKeyEvent(keyData) {
    if (gameState.gameOver || gameState.isPaused) {
        return;
    }

    if (keyData.type === "letter") {
        handleLetterPressEvent(keyData.label);
    }
    else if (keyData.label === "BACKSPACE") {
        onBackSpaceClickEvent();
    }
    else if (keyData.label === "ENTER") {
        onEnterClickEvent();
    }
}

function handleLetterPressEvent(letter) {
    if (gameState.currentGuess.length < gameSettings.wordLength) {
        gameState.currentGuess += letter;
        updateGuessDisplay();
    }
}

function onBackSpaceClickEvent() {
    gameState.currentGuess = gameState.currentGuess.slice(0, -1);
    updateGuessDisplay();
}

function onEnterClickEvent() {
    if (gameState.currentGuess.length !== gameSettings.wordLength) {
        showMessage("Not enough letters");
        shakeRow(gameState.currentRow);
        return;
    }

    if (!allowedWords.includes(gameState.currentGuess)) {
        showMessage("Not in word list");
        shakeRow(gameState.currentRow);
        return;
    }

    compareGuess();

    const result = gameState.results[gameState.currentRow];

    displayGuessResult(result);
    updateLettersStatus(result);
    updateKeyboardDisplay();

    const isWin = checkGuessResult(result);

    gameState.isPaused = true;

    setTimeout(() => {
        if (isWin) {
            onGameWon();
            return;
        }

        gameState.currentRow++;
        gameState.currentGuess = "";

        if (gameState.currentRow === gameSettings.maxTries) {
            onGameLost();
        }

        gameState.isPaused = false;
    }, gameSettings.resultFlipDuration);
}

function onGameWon() {
    subtitle.textContent = "Well done! Onto the next round?";
    gameOver();
}

function onGameLost() {
    subtitle.textContent =
        "Not enough tries huh? The word was: " + gameState.secretWord;

    gameOver();
}

function gameOver() {
    gameState.gameOver = true;
    playAgainBtn.style.visibility = "visible";
}

export function startNewGame() {
    gameState.currentRow = 0;
    gameState.currentGuess = "";
    gameState.gameOver = false;
    gameState.results = [];
    gameState.isPaused = false;

    playAgainBtn.style.visibility = "hidden";
    subtitle.textContent = "Guess the word!";

    clearBoard();
    resetLettersStatus();
    updateKeyboardDisplay();
    chooseRandomSecretWord();
}