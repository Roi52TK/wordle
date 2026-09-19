export const gameSettings = {
    maxTries: 6,
    wordLength: 5,
    resultFlipDuration: 1500
};

export const gameState = {
    secretWord: "APPLE", // Must be upper-case
    currentRow: 0,
    currentGuess: "",
    gameOver: false,
    results: [],
    lettersStatus: new Map(),
    isPaused: false
};

export const MATCH_TYPE = {
    UNKNOWN: "U",
    CORRECT: "G",
    PRESENT: "Y",
    ABSENT: "B"
};