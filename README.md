# Wordle

A simple Wordle-inspired word guessing game built with **HTML, CSS, and vanilla JavaScript**.

The project was created as a JavaScript practice project, focusing on DOM manipulation, event handling, game state management, modular JavaScript, asynchronous JavaScript, CSS animations, responsive design, and implementing the Wordle game logic from scratch.

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
* Animated letter input
* Animated invalid guesses
* Animated message notifications
* Tile flip animations when submitting a valid guess
* Responsive layout for smaller screens
* Play Again functionality
* JavaScript organized into separate modules
* Separate game state, game logic, word logic, and UI responsibilities

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

Controls the visual appearance of the game, including:

* Game board and tiles
* On-screen keyboard
* Tile result colors
* Responsive layouts for smaller screens
* Tile animations
* Message animations
* Button interactions

The layout uses CSS media queries to adapt tile and keyboard sizes for smaller screens.

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
* On-screen keyboard interaction
* Guess submission
* Guess validation
* Handling invalid guesses
* Game win/loss handling
* Starting a new game
* Managing the pause state during result animations
* Connecting user input with the game logic and UI

### `js/wordLogic.js`

Contains the word-related logic, including:

* Comparing guesses with the secret word
* Handling duplicate letters
* Checking whether a guess is correct
* Selecting a random secret word
* Loading the word lists from JSON files

### `js/ui.js`

Contains the functions responsible for creating and updating the user interface, including:

* Creating the game board
* Creating the on-screen keyboard
* Displaying the current guess
* Displaying guess results
* Updating keyboard letter states
* Showing temporary messages
* Playing tile animations
* Shaking rows for invalid guesses
* Resetting the board

Tile animation classes are automatically removed when their CSS animations finish using the `animationend` event.

## Data

The `data/` directory contains the word lists used by the game:

* `secret-words.json` — words that can be selected as the secret word.
* `allowed-words.json` — words that can be submitted as guesses.

Keeping these lists separately allows the game to have a larger set of accepted guesses while controlling which words can actually appear as secret words.

## Running the Project

Because the game loads its word lists using `fetch()`, it should be run through a local web server rather than opened directly as a `file://` page.

For example, using **VS Code** with the **Live Server** extension:

1. Open the project folder in VS Code.
2. Start Live Server.
3. Open the provided local URL in your browser.
4. Start playing.

The project is also deployed using GitHub Pages and can be played online from the link above.

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
* CSS animations and `@keyframes`
* The `animationend` event
* Responsive CSS and media queries
* Keyboard and mouse input handling
* Algorithm design

A significant part of the project was implementing Wordle's duplicate-letter behavior correctly using a two-pass comparison algorithm with letter counts.

The project was also structured into separate JavaScript modules to keep the game state, game flow, word logic, and UI code separated and easier to maintain.

The UI uses temporary CSS animation classes for effects such as letter input, invalid guesses, and tile flipping. These classes are automatically cleaned up when their animations finish, allowing the same animations to be triggered repeatedly.

## Possible Future Improvements

* Add a statistics system
* Add a daily challenge mode
* Add win/loss animations
* Add a dark/light theme
* Add sound effects
* Improve accessibility
* Add difficulty settings
* Add more detailed game statistics
* Add keyboard shortcuts or additional input options
