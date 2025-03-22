# Wordle Clone

A simplistic replica of Wordle built using React. This project allows users to
guess a randomly generated word within a limited number of attempts.

## Features

- Interactive word-guessing game
- Keyboard input support
- Tracks the number of guesses
- Highlights correct and incorrect letters

## API Usage

This project uses the **Random Word API** to fetch words for the game.

- API Endpoint: `https://random-word-api.herokuapp.com/word?number=1`

## Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```sh
git clone https://github.com/jggoyaljayati/Wordle.git
cd wordle
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Start the Development Server

```sh
npm start
```

The application will be accessible at `http://localhost:3000/`.

## Building for Production

To create an optimized production build:

```sh
npm run build
```

The production-ready files will be available in the `build/` directory.
