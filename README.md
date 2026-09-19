# Wordle

A simple Wordle-inspired word guessing game built with **HTML, CSS, and vanilla JavaScript**.

The project was created as a small JavaScript practice project, focusing on DOM manipulation, event handling, game state management, modular JavaScript, asynchronous JavaScript, and implementing the Wordle game logic from scratch.

## Play Online

[**🎮 Play Wordle**](https://roi52tk.github.io/wordle/)

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
* JavaScript organized into separate modules

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
├── js/
│   ├── main.js
│   ├── gameState.js
│   ├── game.js
│   ├── wordLogic.js
│   └── ui.js
├── index.html
├── style.css
└── README.md
```

### `index.html`

Contains the basic structure of the game, including the header, game board, message area, keyboard, and Play Again button.

### `style.css`

Controls the visual appearance of the game, including the board, keyboard, responsive layout, and animations.

### `js/main.js`

Serves as the entry point of the application.

It initializes the game by:

* Loading the word lists
* Creating the game board
* Creating the on-screen keyboard
* Starting a new game

### `js/gameState.js`

Contains the game's shared state and settings, including:

* Game settings
* Current game state
* Match result types

### `js/game.js`

Contains the main game flow and input handling, including:

* Keyboard input handling
* Guess submission
* Guess validation
* Game win/loss handling
* Starting a new game
* Connecting user input with the game logic and UI

### `js/wordLogic.js`

Contains the word-related logic, including:

* Comparing guesses with the secret word
* Handling duplicate letters
* Checking whether a guess is correct
* Selecting a random secret word
* Loading the word lists from JSON files

### `js/ui.js`

Contains the functions responsible for updating and creating the user interface, including:

* Creating the game board
* Creating the on-screen keyboard
* Displaying the current guess
* Displaying guess results
* Updating keyboard letter states
* Showing messages
* Playing animations
* Resetting the board

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
* Modular JavaScript
* State management
* Asynchronous JavaScript
* `fetch()` and JSON
* CSS classes controlled from JavaScript
* CSS animations
* Responsive CSS
* Algorithm design

A significant part of the project was implementing Wordle's duplicate-letter behavior correctly using a two-pass comparison algorithm with letter counts.

The project was also structured into separate JavaScript modules to keep the game state, game logic, word logic, and UI code separated and easier to maintain.

## Possible Future Improvements

* Add a statistics system
* Add a daily challenge mode
* Add a virtual keyboard with more detailed letter states
* Add win/loss animations
* Add a dark/light theme
* Add sound effects
* Improve accessibility
* Add difficulty settings