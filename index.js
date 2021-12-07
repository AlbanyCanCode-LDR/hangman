import prompt from "readline-sync";
import wordBank from "./word-bank1.js";

//Globals
let randomWordArray;
//
let numberOfguesses = 6;
//
let guessArrayOfUnderscores = [];
//

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
  for (let i = 0; i < randomWord.length; i++) {
    guessArrayOfUnderscores.push("_");
  }

  return guessArrayOfUnderscores;
};

/* vvv INPUT VALIDATION vvv */

let doesGuessFollowRules = (evalLetter) => {
  if (/[a-zA-Z]/.test(evalLetter)) {
    console.log(
      "\nThe first letter of this string fits the format of a valid guess, \ncharacters after that are automatically ignored\n"
    );
    return true;
  } else {
    console.log(`\nThis: ${evalLetter} is not a letter\n`);
    return false;
  }
};

let promptForLetter = () => {
  let guessedLetter = [];

  while (true) {
    let userInput = prompt.question(
      "\nGuess one letter of the Selected Random Word\n\n"
    );

    guessedLetter = userInput[0];

    if (doesGuessFollowRules(guessedLetter)) {
      break;
    }
  }

  return guessedLetter[0].toLowerCase(); /// change user input to a lowercase letter
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
  guessArrayOfUnderscores
) => {
  /*
     For every guess I need to determine if the letter has been repeated before
          
      if the letter has been repeated, regardless of whether its part of the random word, it will NOT decrement the guesses

      1.  condition that will guarantee a decrement of number of guesses

           Condition: the guess is BOTH incorrect AND has not been guessed before

      2.  conditions that will NOT decrement number of guesses 

          A. Condition: The guess is correct AND it has been used before

          B. Condition: The guess is incorrect AND it has been used before

     */

  let foundLetter = false;

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === letterFollowsRules[0]) {
      guessArrayOfUnderscores[i] = letterFollowsRules[0];
      foundLetter = true;
    }
  }

  if (foundLetter === false) {
    --numberOfguesses;
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

  while (numberOfguesses > 0) {
    console.log(`\n${guessArrayOfUnderscores}\n`);

    displayInstructionsToConsole();

    let hangmanState = produceHangmanState(numberOfguesses);

    console.log(`\nYou have ${numberOfguesses} guesses left\n`);

    let guess = promptForLetter();

    let playingGameWithValidInput = usingValidGuessInGame(
      guess,
      randomWord,
      guessArrayOfUnderscores
    );

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

let newGameLoop = gameLoop();

// The game will keep on going until the user presses ctrl + c to stop. You must include this in your instructions before each round.
