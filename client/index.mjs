'use strict';

import { createRestartPrompt, createNamePrompt } from './createPrompt.mjs';
import { drawBackground, clearCanvas } from './drawCanvas.mjs';
import { displayHiddenWord } from './displayHiddenWord.mjs';
import { displayCategory } from './displayCategory.mjs';
import { displayMessage } from './displayMessage.mjs';
import { prepareHandles } from './prepareHandles.mjs';
import { whatClicked } from './mouseClickCheck.mjs';
import { guessCount } from './guessCount.mjs';
import { hideWord } from './hideWord.mjs';
import * as inputs from './manageInputs.mjs';

let handles = {};
let randomWord = [];
let usedLetters = [];
let hiddenWord;
let letterFound;
let condition;
let guesses;
let scoreWins;
let scoreLosses;

async function getRandomWord(randomCat) {
  const response = await fetch('category/' + randomCat);
  if (response.ok) {
    const fetchedWord = await response.json();
    randomWord = fetchedWord.toLowerCase();
    hiddenWord = hideWord(fetchedWord);
    displayHiddenWord(hiddenWord);
  } else {
    handles.errorMsg.hidden = false;
    handles.errorMsg.textContent = 'Word failed to load';
    throw new Error(`[${response.status}] connection failed;\n- Word failed to load`);
  }
}

async function getRandomCategory() {
  const response = await fetch('category');
  if (response.ok) {
    const fetchedCategory = await response.json();
    // display category output taken from server
    handles.category.value = fetchedCategory;
    displayCategory(fetchedCategory);

    // request a random word in that category from server
    getRandomWord(fetchedCategory);
  } else {
    handles.errorMsg.hidden = false;
    handles.errorMsg.textContent = 'Category failed to load';
    throw new Error(`[${response.status}] connection failed;\n- category failed to load`);
  }
}

// send to server the current score, thereby updating it
async function sendScore(scrW, scrL) {
  const payload = { wins: scrW, losses: scrL };
  const response = await fetch('sendScore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const scoreCount = await response.json();
    scoreCount.wins = scoreWins;
    scoreCount.losses = scoreLosses;
    handles.scoreCount.textContent = `Wins: ${scoreCount.wins}\nLosses: ${scoreCount.losses}`;
  } else {
    handles.scoreCount.textContent = ['*Could not load new score :-(*'];
    throw new Error(`[${response.status}] connection failed;\n- Word failed to load`);
  }
}

// this async function will send player name to the server.
async function sendPlayerStat(playerName) {
  const payload = { name: playerName };
  const response = await fetch('playerName', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const playerAdded = await response.json();
    if (!playerAdded) {
    // the player was not added to server list
      handles.errorMsg.textContent = 'The name already exists!';
      handles.errorMsg.hidden = false;
    } else {
      handles.errorMsg.textContent = '';
      handles.errorMsg.hidden = true;
    }
  } else {
    throw new Error(`[${response.status}] connection failed;\n- Player name failed to post.`);
  }
}

// when the page is restarted, all the required variables will be reset,
// canvas will be redrawn.
function restartPage(theClass, prompting) {
  randomWord = [];
  usedLetters = [];
  hiddenWord = '';
  letterFound = false;
  condition = false;
  handles.letter.value = '';
  handles.warningMsg.textContent = '';
  handles.usedLetters.textContent = 'Used Letters: ';
  handles.warningMsg.style.color = 'White';

  inputs.enableKeyButtons();

  if (prompting) {
    handles.gameSection.removeChild(theClass);
    prompting = false;
  }

  clearCanvas();
  drawBackground();
  getRandomCategory();
  setGuessCount();
  displayScore();
}

function namePrompt(gameSection) {
  const namePromptClass = createNamePrompt(gameSection);
  const sendButton = document.querySelector('#btnSend');
  sendButton.addEventListener('click', function () {
    // when the button is clicked,
    // check if any restricted character is in the name
    const restrictedCHARS = ['!', ',', '.', '#', '¬', '`', '/', '|'];
    const name = document.querySelector('#nameInput');
    for (let i = 0; i < restrictedCHARS.length; i += 1) {
      // first loop for restricted characters
      for (let j = 0; j < name.value.length; j += 1) {
        if (name.value[j] === restrictedCHARS[i]) {
          // the name contains restricted character
          console.log(`The name '${name.value}' contains restricted character '${restrictedCHARS[i]}'`);
          name.style.backgroundColor = 'red';
          handles.errorMsg.textContent = 'Your name contains restricted characters!';
          handles.errorMsg.hidden = false;
          return;
        }
      }
    }
    // the name field is empty
    if (name.value.length === 0) {
      console.log('The name field is empty.');
      name.style.backgroundColor = 'red';
      handles.errorMsg.textContent = 'The name field is empty!';
      handles.errorMsg.hidden = false;
      return;
    }
    // no restricted characters, send the name to server
    handles.errorMsg.hidden = true;
    sendPlayerStat(name.value);
    if (gameSection.contains(namePromptClass)) {
      gameSection.removeChild(namePromptClass);
    }
    document.body.style.background = 'grey';
  });
}

// create restart prompt box here
function restartPrompt() {
  const gameSec = handles.gameSection;

  // prompt user with restart
  const prompting = true;
  // text
  const newText = document.createTextNode('Play Again?');
  const rPrompt = createRestartPrompt();
  rPrompt.append(newText);
  // class of 'restartPrompt'
  // add text into it
  const newClass = document.createElement('class');
  newClass.className = 'restartPrompt';
  newClass.append(rPrompt);

  // buttons yes/no
  const btnYes = document.createElement('button');
  btnYes.setAttribute('id', 'btnYes');
  btnYes.setAttribute('class', 'promptButtons');
  const btnNo = document.createElement('button');
  btnNo.setAttribute('id', 'btnNo');
  btnNo.setAttribute('class', 'promptButtons');
  btnYes.textContent = 'Yes';
  btnNo.textContent = 'No';

  newClass.append(btnYes);
  newClass.append(btnNo);
  gameSec.append(newClass);

  // restart whole page
  document.querySelector('#btnYes').addEventListener('click', function () {
    restartPage(newClass, prompting);
  });

  // prompt the player their name through a button 'No'
  document.querySelector('#btnNo').addEventListener('click', function () {
    gameSec.removeChild(newClass);
    namePrompt(gameSec);
  });
}

// The function stops the game process,
// disables inputs,
// creates a prompt for user to restart or leave the game.
function gameStop(condition, rWord, sWins, sLosses) {
  inputs.disableKeyButtons();

  if (condition) {
    displayMessage(condition, rWord);
    sWins += 1;
  } else {
    displayMessage(condition, rWord);
    sLosses += 1;
  }

  sendScore(sWins, sLosses);
  restartPrompt();
}

// The function will monitor the guess count.
// It accepts 'guess' as 'gCount' (which is an int or number)
// it stops the game and sends true/false condition after checking whether the player won or lost
function monitorGuess(gCount, rWord, scoreW, scoreL, isNotWrong) {
  guessCount(gCount, isNotWrong);

  if (gCount === 0) {
    condition = false;
    gameStop(condition, rWord, scoreW, scoreL);
  } else if (hiddenWord.join('') === randomWord && gCount > 0) {
    condition = true;
    gameStop(condition, rWord, scoreW, scoreL);
  } else if (randomWord.includes(' ')) {
    // if the word has a whitespace
    randomWord.replace(' ', '');
  }

  handles.scoreCount.textContent = `Wins: ${scoreW}\nLosses: ${scoreL}`;
}

// The function will check the letter input to compare it with the word's letters
export function letterCheck(who) {
  const letter = who.toLowerCase();
  const usedLetterstxt = handles.usedLetters;
  let isNotWrong = false;
  handles.warningMsg.textContent = '';

  // record certain letter each time the user enters it
  // check letters array based on a user input
  for (let i = 0; i < usedLetters.length; i++) {
    // letter already exists
    if (usedLetters[i].includes(letter)) {
      handles.warningMsg.textContent = `The letter '${letter}' was already guessed before`;
      return;
    }
  }

  /**
     * Check if the chosen word has any whitespace
     * if(randomWord.includes(' ')) {
     *
     * }
     */

  // go through word array to find the letter in that word
  for (let i = 0; i < randomWord.length; i++) {
    // found a letter
    if (randomWord[i].includes(letter)) {
      hiddenWord[i] = hiddenWord[i].replace(hiddenWord[i], letter);
      displayHiddenWord(hiddenWord);
      letterFound = true;
      isNotWrong = true;
    } else if (i + 1 === randomWord.length && !letterFound) {
      // letter does not exist in the word
      handles.warningMsg.textContent = `The letter '${letter}' does not exist in the word`;
      guesses -= 1;
      isNotWrong = false;
    }
  }
  monitorGuess(guesses, randomWord, scoreWins, scoreLosses, isNotWrong);
  letterFound = false;
  usedLetters.push(letter);
  handles.guessCount.textContent = `Guesses left: ${guesses}`;
  usedLetterstxt.textContent = `Used letters: ${usedLetters}`;
}

// this function may need to be deleted after testing
function validateInput(event) {
  // Letter pressed on keyboard between A to Z
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letterKey = event.key;
    handles.letter.value = letterKey.toLowerCase();

    letterCheck(letterKey);
  }
}

// check the keys that were pressed by the user on keyboard
function checkKeys(e) {
  if (guesses > 0 && !condition) {
    switch (e.key) {
      case 'Backspace':
        handles.letter.value = null;
        break;
      default:
        // any other key pressed on a keyboard
        validateInput(e);
        break;
    }
  }
}

// get the score from server and display here
async function displayScore() {
  const response = await fetch('getScore');
  if (response.ok) {
    const sCount = await response.json();
    scoreWins = sCount.wins;
    scoreLosses = sCount.losses;
  } else {
    handles.errorMsg.textContent = 'Could not load score';
    handles.errorMsg.hidden = false;
    scoreWins = scoreLosses = [':('];
  }
  handles.scoreCount.textContent = `Wins: ${scoreWins}\nLosses: ${scoreLosses}`;
}

// get the guess count from server and display here
async function setGuessCount() {
  const response = await fetch('guessCount');
  if (response.ok) {
    const lCount = await response.json();
    guesses = lCount;
  } else {
    handles.errorMsg.textContent = 'Failed to load guesses!';
    handles.errorMsg.hidden = false;
    guesses = [' *Could not load guesses* '];
  }
  handles.guessCount.textContent = `Guesses left: ${guesses}`;
}

function addEventListeners() {
  window.addEventListener('keydown', checkKeys);
  window.addEventListener('mouseup', whatClicked);
}

function prepareHandle() {
  handles = prepareHandles();
  handles.errorMsg.hidden = true;
}

function pageLoaded() {
  prepareHandle();
  addEventListeners();
  setGuessCount();
  getRandomCategory();
  displayScore();
  drawBackground();
}

window.addEventListener('load', pageLoaded);
