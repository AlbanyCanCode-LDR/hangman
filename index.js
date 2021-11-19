import prompt from "readline-sync";
import wordBank from "./word-bank.js";

// View

let displayInstructionsToConsole = () => {
  console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");
  console.log("\nPlease Guess a Letter");
};

displayInstructionsToConsole();

// Model

let selectRandomWordFromWordBank = () => {
  let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  return randomWord;
};

let randomWord = selectRandomWordFromWordBank();

console.log(` The Random Word is ${randomWord}`);

// Controller

let storeTypedLetter = () => {
  let userInput = prompt.question("Guess a letter of the \nRandom Word ");
  return userInput;
};

let guessedLetter = storeTypedLetter();

//Model
let convertGuessedLetterToArray = () => {
  let guessedLetterArray = guessedLetter.split("");
  return guessedLetterArray;
};

let guessedLetterArray = convertGuessedLetterToArray();

// console.log(guessedLetterArray);

let evaluateTypedLetterAgainstRules = () => {
  console.log(guessedLetter);
  if (/[a-zA-Z]/.test(guessedLetterArray[0])) {
    console.log("This is a letter");
    return guessedLetterArray[0];
    console.log(guessedLetterArray[0]); //TAKE OUT OF FINAL PROJECT, ONLY FOR DEBUGGING
  } else if (/[^a-zA-Z]/.test(guessedLetterArray[0])) {
    // Do something here
    return console.log("This is NOT a letter");
  }
};

let evalOfTypedLetter = evaluateTypedLetterAgainstRules();

console.log(evalOfTypedLetter); //TAKE OUT OF FINAL PROJECT, ONLY FOR DEBUGGING

let compareTypedLetterWithRandomWordArray = () => {
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === evalOfTypedLetter) {
      console.log("This is a correct guess");
      let randomWordToArray = randomWord.split(""); //consolidate after, ONLY FOR DEBUGGING
      console.log(randomWordToArray); //TAKE OUT OF FINAL PROJECT, ONLY FOR DEBUGGING
      let random;
      console.log(); //TAKE OUT OF FINAL PROJECT, ONLY FOR DEBUGGING
      return randomWord;
    } else {
      console.log("This is a wrong guess");
    }
  }
};
/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice


*/

let comparison = compareTypedLetterWithRandomWordArray();

console.log(comparison); //TAKE OUT OF FINAL PROJECT, ONLY FOR DEBUGGING

// View

let displayNextGuessesRemaining = () => {};

let displayPromptForNextNextGuess = () => {};

//repeat model and view functions until end of game round

let displayAfterEachGameRoundUserGeuessesCorrectlyOrNot = () => {};

//repeat entire game until user quits using ctrl + c
