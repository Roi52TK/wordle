import { loadSecretWords, loadAllowedWords } from "./wordLogic.js";

import {
    createBoard,
    createKeyboard
} from "./ui.js";

import {
    startNewGame,
    handleKeyEvent
} from "./game.js";

async function initializeGame() {
    await Promise.all([
        loadSecretWords(),
        loadAllowedWords()
    ]);

    createBoard();
    createKeyboard(handleKeyEvent);
    startNewGame();
}

initializeGame();