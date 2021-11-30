import prompt from "readline-sync";
import wordBank from "./word-bank.js";

//Globals
let randomWordArray;
//
let numberOfguesses = 6;
//
let guessArrayOfUnderscores = [];
//
let hangmanState;
//
let correctlyGuessedLetter = [];

////////////////////

let displayInstructionsToConsole = () => {
  console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");
  console.log("\nPlease Guess a Letter\n");
};

////////////////////

let selectRandomWordFromWordBankToBeArrayified = () => {
  randomWordArray =
    wordBank[Math.floor(Math.random() * wordBank.length)].split("");
  return randomWordArray;
};

let generateGuessArrayOfUnderscores = (randomWord) => {
  // let guessArrayOfUnderscores = [];
  for (let i = 0; i < randomWord.length; i++) {
    guessArrayOfUnderscores.push("_");
  }

  return guessArrayOfUnderscores;
};
////////////////////

let arrayifyGuessedLetter = () => {
  let userInput = prompt.question("\nGuess one letter of the Random Word\n\n");
  userInput = userInput.split();
  return userInput;
};

////////////////////

let produceHangmanState = (numberOfguesses) => {
  hangmanState = [
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
   /|\  |
            |
            |
    =========
    `,
    `
    +---+
    |   |
    O   |
   /|\  |
   / \  |
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
      return console.log(hangmanState[5]);

    case 1:
      return console.log(hangmanState[6]);
  }
};
////////////////////

let doesGuessFollowRules = (evalLetter) => {
  if (/[a-zA-Z]/.test(evalLetter[0])) {
    console.log(
      "\nThe first letter of this string fits the format of a valid guess, \ncharacters after that are automatically ignored\n"
    );
    return evalLetter[0];
  } else if (/[^a-zA-Z]/.test(evalLetter[0])) {
    console.log(`\nThis: ${evalLetter} is not a letter\n`);

    let guessedLetter = arrayifyGuessedLetter();
    return guessedLetter[0];
  }
};

let usingValidGuessInGame = (
  letterFollowsRules,
  randomWord,
  guessArrayOfUnderscores
) => {
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === letterFollowsRules) {
      guessArrayOfUnderscores[i] = letterFollowsRules;
    }
  }

  --numberOfguesses;

  return guessArrayOfUnderscores;
};

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

  while (numberOfguesses > 0) {
    console.log(`\n${guessArrayOfUnderscores}\n`);

    displayInstructionsToConsole();

    let hangmanState = produceHangmanState(numberOfguesses);

    console.log(`\nYou have ${numberOfguesses} guesses left\n`);

    let guess = arrayifyGuessedLetter();
    let letterFollowsRules = doesGuessFollowRules(guess);

    let playingGameWithValidInput = usingValidGuessInGame(
      letterFollowsRules,
      randomWord,
      guessArrayOfUnderscores
    );

    let winCondition = informUserOfVictory(playingGameWithValidInput);

    let loseCondition = informUserOfDefeat(numberOfguesses);

    if (winCondition === true) {
      console.log("\nYou have won\n");
    } else if (loseCondition === true) {
      console.log("\nYou have lost\n");
      break;
    }
  }
};

let newGameLoop = gameLoop();
