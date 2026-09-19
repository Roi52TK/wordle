# Wordle

A simple Wordle-inspired word guessing game built with **HTML, CSS, and vanilla JavaScript**.

The project was created as a small JavaScript practice project, focusing on DOM manipulation, event handling, game state management, and implementing the Wordle game logic from scratch.

## Features

* 6 attempts to guess a 5-letter word
* On-screen keyboard
* Physical keyboard support
* Random secret word selection
* Large lists of allowed and secret words stored in JSON files
* Proper handling of duplicate letters
* Letter status tracking
* Visual feedback for:

  * 🟩 Correct letter and position
  * 🟨 Correct letter, wrong position
  * ⬛ Letter not present in the word
* Animated invalid guesses
* Animated message notifications
* Tile flip animations when submitting a guess
* Responsive layout for smaller screens
* Play Again functionality

## How to Play

1. Enter a 5-letter word using the on-screen or physical keyboard.
2. Press **ENTER** to submit your guess.
3. Use the tile colors to help determine the secret word:

   * **Green** — the letter is in the correct position.
   * **Yellow** — the letter exists in the word but is in the wrong position.
   * **Dark** — the letter does not appear in the word.
4. You have **6 attempts** to find the secret word.
5. If the game ends, press **Play Again** to start a new game.

## Project Structure

```text
wordle/
├── data/
│   ├── allowed-words.json
│   └── secret-words.json
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the basic structure of the game, including the header, game board, message area, keyboard, and Play Again button.

### `style.css`

Controls the visual appearance of the game, including the board, keyboard, responsive layout, and animations.

### `script.js`

Contains the game logic, including:

* Game state and settings
* Keyboard input handling
* Guess validation
* Word comparison
* Duplicate-letter handling
* Letter status tracking
* Game win/loss handling
* Dynamic board and keyboard creation
* Loading word lists
* Animations and UI updates

### `data/`

Contains the word lists used by the game:

* `secret-words.json` — words that can be selected as the secret word.
* `allowed-words.json` — words that can be submitted as guesses.

## Running the Project

Because the game loads its word lists using `fetch()`, it should be run through a local web server rather than opened directly as a `file://` page.

For example, using **VS Code** with the **Live Server** extension:

1. Open the project folder in VS Code.
2. Start Live Server.
3. Open the provided local URL in your browser.
4. Start playing.

## Technologies

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**
* **JSON**

No frameworks or external JavaScript libraries are used.

## What I Practiced

This project was mainly built to practice JavaScript and web development concepts, including:

* DOM manipulation
* Event listeners
* Objects and arrays
* `Map`
* Functions and program structure
* State management
* Asynchronous JavaScript
* `fetch()` and JSON
* CSS classes controlled from JavaScript
* CSS animations
* Responsive CSS
* Algorithm design

A significant part of the project was implementing Wordle's duplicate-letter behavior correctly using a two-pass comparison algorithm with letter counts.

## Possible Future Improvements

* Add a statistics system
* Add a daily challenge mode
* Add a virtual keyboard with more detailed letter states
* Add win/loss animations
* Add a dark/light theme
* Add sound effects
* Improve accessibility
* Add difficulty settings
