import { gameSettings, gameState, MATCH_TYPE } from "./gameState.js";

export let secretWords;
export let allowedWords;

export function compareGuess() {
    const letterCounts = new Map();
    const result = new Array(gameSettings.wordLength);

    // Map secret word letters - count
    for (let i = 0; i < gameSettings.wordLength; i++) {
        const char = gameState.secretWord[i];
        const count = letterCounts.has(char) ? letterCounts.get(char) + 1 : 1;
        letterCounts.set(char, count);
    }

    // Compare correct position letters
    for (let i = 0; i < gameSettings.wordLength; i++) {
        const guessChar = gameState.currentGuess[i];
        const secretWordChar = gameState.secretWord[i];

        if (guessChar === secretWordChar) {
            result[i] = MATCH_TYPE.CORRECT;

            const count = letterCounts.get(secretWordChar) - 1;

            if (count === 0) {
                letterCounts.delete(secretWordChar);
            }
            else {
                letterCounts.set(secretWordChar, count);
            }
        }
    }

    // Check remaining letters
    for (let i = 0; i < gameSettings.wordLength; i++) {
        if (result[i] !== MATCH_TYPE.CORRECT) {
            const guessChar = gameState.currentGuess[i];

            if (letterCounts.has(guessChar)) {
                result[i] = MATCH_TYPE.PRESENT;

                const count = letterCounts.get(guessChar) - 1;

                if (count === 0) {
                    letterCounts.delete(guessChar);
                }
                else {
                    letterCounts.set(guessChar, count);
                }
            }
            else {
                result[i] = MATCH_TYPE.ABSENT;
            }
        }
    }

    gameState.results.push(result);
}

export function checkGuessResult(result) {
    for (let i = 0; i < result.length; i++) {
        if (result[i] !== MATCH_TYPE.CORRECT) {
            return false;
        }
    }

    return true;
}

export function chooseRandomSecretWord() {
    const rndIndex = Math.floor(Math.random() * secretWords.length);
    gameState.secretWord = secretWords[rndIndex];
}

export async function loadSecretWords() {
    const response = await fetch("data/secret-words.json");
    secretWords = await response.json();
}

export async function loadAllowedWords() {
    const response = await fetch("data/allowed-words.json");
    allowedWords = await response.json();
}