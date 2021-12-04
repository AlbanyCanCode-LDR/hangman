import prompt from "readline-sync";
import wordBank from "./word-bank1.js";

// use node --inspect index.js to debug

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
  // let guessArrayOfUnderscores = [];
  for (let i = 0; i < randomWord.length; i++) {
    guessArrayOfUnderscores.push("_");
  }

  return guessArrayOfUnderscores;
};
////////////////////
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
  //needs a loop to check if the user has already guessed this letter
  //and to force the user to guess a letter in a valid format infinitely until they do
};
//check specs for multiple guess of right and wrong letter
let promptForLetter = () => {
  /// change name to more descriptive "promt for letter"
  let guessedLetter;
  /* every time the user input at index 0 is a special character, repeat prompt and clear previous value */
  while (true) {
    let userInput = prompt.question(
      "\nGuess one letter of the Random Word\n\n"
    );
    userInput = userInput.split();
    guessedLetter = userInput[0];

    if (doesGuessFollowRules(guessedLetter)) {
      break;
    }
  }

  return guessedLetter.toLowerCase(); /// change user input to a lowercase letter
};

////////////////////

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
  let foundLetter = false;

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === letterFollowsRules) {
      guessArrayOfUnderscores[i] = letterFollowsRules;
      foundLetter = true;
    }
  }

  if (foundLetter === false) {
    --numberOfguesses;
  }

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
