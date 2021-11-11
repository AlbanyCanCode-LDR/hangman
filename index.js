// import prompt from "readline-sync";
// import wordBank from "./word-bank.js";

// console.log(wordBank[0]);

// const userInput = prompt.question("What is your name?");
// console.log(userInput);


const wordBank = ["rumor","happen","match","sail","sick"]

// pick a random value from the word bank and display it
let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

console.log(randomWord);

