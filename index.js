import prompt from "readline-sync";
import wordBank from "./word-bank1.js";

//Globals

//
let numberOfguesses;

////////////////////

let displayInstructionsToConsole = () => {
  console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");
  console.log("\nPlease Guess a Letter\n");
};

////////////////////

let selectRandomWordFromWordBankToBeArrayified = () => {
  let randomWordArray =
    wordBank[Math.floor(Math.random() * wordBank.length)].split("");
  return randomWordArray;
};

let generateGuessArrayOfUnderscores = (randomWord) => {
  let guessArrayOfUnderscores = [];
  for (let i = 0; i < randomWord.length; i++) {
    guessArrayOfUnderscores.push("_");
  }

  return guessArrayOfUnderscores;
};

/* vvv INPUT VALIDATION vvv */

let doesGuessFollowRules = (evalLetter) => {
  if (/[a-zA-Z]/.test(evalLetter)) {
    return true;
  } else {
    console.log(`This: ${evalLetter} is not a letter`);
    return false;
  }
};

let promptForLetter = () => {
  let guessedLetter = [];

  while (true) {
    let userInput = prompt.question(
      "Guess one letter of the Selected Random Word\n"
    );

    guessedLetter = userInput[0];

    if (doesGuessFollowRules(guessedLetter)) {
      break;
    }
  }

  return guessedLetter.toLowerCase(); /// change user input to a lowercase letter
};

////////////////////////////

let produceHangmanState = (numberOfguesses) => {
  let hangmanState = [
    `
        +---+
        |   |
            |
            |
            |
            |
    =========
    `,
    `
        +---+
        |   |
        O   |
            |
            |
            |
    =========
    `,
    `
        +---+
        |   |
        O   |
        |   |
            |
            |
    =========
    `,
    `
        +---+
        |   |
        O   |
       /|   |
            |
            |
    =========
    `,
    `
        +---+
        |   |
        O   |
       /|\\  |
            |
            |
    =========
    `,
    `
        +---+
        |   |
        O   |
       /|\\  |
       /    |
            |
    =========
    `,
    `
        +---+
        |   |
        O   |
       /|\\  |
       / \\  |
            |
    =========
    `,
  ];

  switch (numberOfguesses) {
    case 6:
      return console.log(hangmanState[0]);

    case 5:
      return console.log(hangmanState[1]);

    case 4:
      return console.log(hangmanState[2]);

    case 3:
      return console.log(hangmanState[3]);

    case 2:
      return console.log(hangmanState[4]);

    case 1:
      return console.log(hangmanState[5]);
    case 0:
      return console.log(hangmanState[6]);
  }
};

////////////////////

let usingValidGuessInGame = (
  letterFollowsRules,
  randomWord,
  guessArrayOfUnderscores,
  previousGuesses
) => {
  /* Change letterFOllowsRules to something better reflecting the non boolean nature of the variable */

  if (
    !previousGuesses.has(
      letterFollowsRules
    ) /* if the set does not contain the variable letter followsRules, then don't execute the rest of the code */
  ) {
    let foundLetter = false;

    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === letterFollowsRules) {
        guessArrayOfUnderscores[i] = letterFollowsRules;
        foundLetter = true;
      }
    }

    previousGuesses.add(letterFollowsRules);

    if (foundLetter === false) {
      --numberOfguesses;
    }
  }
  return guessArrayOfUnderscores;
};

////////////////////

let informUserOfVictory = (guessArrayOfUnderscores) => {
  if (guessArrayOfUnderscores.includes("_") === false) {
    return true;
  }
};

let informUserOfDefeat = (numberOfguesses) => {
  if (numberOfguesses === 0) {
    return true;
  }
};

////////////////////

let gameLoop = () => {
  let randomWord = selectRandomWordFromWordBankToBeArrayified();

  let guessArrayOfUnderscores = generateGuessArrayOfUnderscores(randomWord); // _ _ _ _ ect..

  let previousGuesses = new Set();

  numberOfguesses = 6;

  //
  // let guessArrayOfUnderscores = [];
  //

  while (numberOfguesses > 0) {
    console.log(`${guessArrayOfUnderscores}`);

    displayInstructionsToConsole();

    let hangmanState = produceHangmanState(numberOfguesses);

    console.log(`You have ${numberOfguesses} guesses left`);

    let guess = promptForLetter();

    let playingGameWithValidInput = usingValidGuessInGame(
      guess,
      randomWord,
      guessArrayOfUnderscores,
      previousGuesses
    );

    console.log(previousGuesses);

    let winCondition = informUserOfVictory(playingGameWithValidInput);

    let loseCondition = informUserOfDefeat(numberOfguesses);

    if (winCondition === true) {
      console.log("\nYou have won\n");
      break;
    } else if (loseCondition === true) {
      console.log("\nYou have lost\n");
      produceHangmanState(numberOfguesses);
      break;
    }
  }
};

let playGame = () => {
  while (true) {
    gameLoop();
  }
};

playGame();

// The game will keep on going until the user presses ctrl + c to stop. You must include this in your instructions before each round.
