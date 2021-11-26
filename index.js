import prompt from "readline-sync";
import wordBank from "./word-bank1.js";

//Global Variables
let numberOfguesses = 6;

let guessedWord;

///////////////////////////////////////////////////////////////////////////////

// View

let displayInstructionsToConsole = () => {
  console.log("\nWelcome to Hangman!\nPress ctrl+c to stop\n");
  console.log("\nPlease Guess a Letter\n");
};

displayInstructionsToConsole();

///////////////////////////////////////////////////////////////////////////////

// Model

let selectRandomWordFromWordBank = () => {
  let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  return randomWord;
};

let randomWord = selectRandomWordFromWordBank();

///////////////////////////////////////////////////////////////////////////////

let randomWordArray = randomWord.split(""); //DEBUG

console.log(`The Random Word to an array is ${randomWordArray}\n`); // DEBUG

///////////////////////////////////////////////////////////////////////////////

// Controller

let storeTypedLetter = () => {
  let userInput = prompt.question("\nGuess a letter of the Random Word\n\n");
  return userInput;
};

let guessedLetter = storeTypedLetter();

let generateGuessArray = (randomWord) => {
  let guessArray = [];
  for (let i = 0; i < randomWord.length; i++) {
    guessArray.push("_");
  }

  return guessArray;
};
guessedWord = generateGuessArray(randomWord);
///////////////////////////////////////////////////////////////////////////////

//Model

let convertGuessedLetterToArray = (gssedLetter) => {
  let guessedLetterArray = gssedLetter.split();
  return guessedLetterArray;
};

let guessedLetterArray = convertGuessedLetterToArray(guessedLetter);

///////////////////////////////////////////////////////////////////////////////

let evaluateTypedLetterAgainstRules = (guessedLetterArray) => {
  if (/[a-zA-Z]/.test(guessedLetterArray[0])) {
    console.log("\nThis is a letter\n");
    return guessedLetterArray[0];
  } else if (/[^a-zA-Z]/.test(guessedLetterArray[0])) {
    // Do something here
    console.log(`\nThis: ${guessedLetterArray} is not a letter\n`);

    let guessedLetter = storeTypedLetter();
    return guessedLetter;
  }
};

let evalOfTypedLetter = evaluateTypedLetterAgainstRules(guessedLetterArray);

///////////////////////////////////////////////////////////////////////////////

let firstLetterGuess = (passedLetter, randomWord, guessedWord) => {
  let guessedLetters = [];
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === passedLetter) {
      guessedWord[i] = passedLetter;

      guessedLetters.push(passedLetter);
      console.log(`Current guessedLetters are ${guessedLetters}`);
    }
  }
  console.log(`The guessedWord is ${guessedWord}`);
  return randomWord;
};

let remainingLettersToGuess = firstLetterGuess(
  evalOfTypedLetter,
  randomWordArray,
  guessedWord
);

console.log(
  `These are the remaining letters in the random word: ${remainingLettersToGuess} \n`
); // DEBUG

console.log(`Remaining number of geusses: ${numberOfguesses}`);

//////////////////////////////////////////////////////////////////////////
let remainingGuesses = (selectRandom) => {
  while (numberOfguesses >= 0) {
    displayInstructionsToConsole();

    // let randomWordArray = randomWord.split("");

    let theRemainingLetters = remainingLettersToGuess;
    console.log(`The remaining letters to guess ${theRemainingLetters}`);

    let guessedLetter = storeTypedLetter(); //modify for the condition of two of the same letters in a row
    console.log(guessedLetter);

    let guessedLetterArray = convertGuessedLetterToArray(guessedLetter);
    console.log(guessedLetterArray);

    let evalOfTypedLetter = evaluateTypedLetterAgainstRules(guessedLetterArray);
    console.log(evalOfTypedLetter);

    let theRemainingLettersToGuess = firstLetterGuess(
      evalOfTypedLetter,
      randomWordArray,
      guessedWord
    );

    let userHasWon = (guessedWord) => {
      if (guessedWord.includes("_")) {
        return false;
      } else {
        return true;
      }
    };

    console.log(`Remaining number of guesses: ${numberOfguesses}`);
    numberOfguesses--;
    /* 

    for (iterate through index values of guessedWord) {
    show hangman every time a mistake is made}
    if a mistake is made, add the next peice to hangman
    if = 6, then no hangman
    if = 5, then one hangman
    if = 4, then two hangman
given that you know that the hangman has to change, function could be called Where you have made a mistake,

need detection of mistake 
      */
    /*
let head = [0];
let body = []

let wholeBody = [ [], [], ]



*/

    if (numberOfguesses === 0) {
      console.log("\nYou have lost the game\n");

      break;
    } else if (userHasWon(guessedWord)) {
      console.log("\nYou have won the game\n");
      break;
    }
  }
};

let theGame = remainingGuesses(selectRandomWordFromWordBank);
console.log(theGame);

/* 
node --inspect index.js // DEBUG console


let futureGuesses = (aGuess) => {
  console.log(typeof guess);


  for (let i = 0; i < arr.length; i++) {

    if (arr[i] === aGuess) {
      arr.splice(i, 1);
      }
     else{
     console.log("You have tried this before")
     }
      
      return arr;
    }

  }
  
 let secondGuess ="a";

let nextGuess = futureGuesses(secondGuess);

console.log(nextGuess)

//https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice-value

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice



let comparison = compareTypedLetterWithRandomWordArray();

console.log(comparison); //TAKE OUT OF FINAL PROJECT, ONLY FOR DEBUGGING

// View

let displayNextGuessesRemaining = () => {
  console.log(`Remaining number of geusses: ${numberOfguesses}`);
};

let displayPromptForNextNextGuess = () => {
  //While (remaining number of guesses is greater than zero run first function  through future guesses)
};

//repeat model and view functions until end of game round

let displayAfterEachGameRoundUserGeuessesCorrectlyOrNot = () => {};

//repeat entire game until user quits using ctrl + c*/
