'use strict';

// A 'use strict' keyword is here to make sure JavaScript code is executed through "strict mode"
// Strict mode makes it easier to write "secure" JavaScript by eliminating some of the silent errors that are possible in normal JavaScript.
// That way, it becomes easier to code and if certain errors arise, they are not ignored

import { selectRandomCategory, selectRandomWord } from './selectRandomCatWords.mjs';
import { checkPlayers, addPlayerWithScore } from './PlayerList.mjs';
import { prepareCategories } from './prepareCategories.mjs';
import { scoreCount } from './scoreCount.mjs';
import express from 'express';

/**
 * create a simple server using 'express.json'
 * assign 'client' folder so that it is used as main client
 */
const app = express();
app.use(express.static('client'));

// prepare category list variable on server
const categories = prepareCategories();

function getCategory(req, res) {
  const randomCategory = selectRandomCategory(categories);
  res.json(randomCategory);
}

function getWord(req, res) {
  const category = req.params.name;
  const randomWord = selectRandomWord(category, categories);
  res.json(randomWord);
}

function getGuesses(req, res) {
  res.json(scoreCount.guesses);
}

function getScore(req, res) {
  res.json(scoreCount);
}

function sendScore(req, res) {
  // get the client score, update the score count list with it
  const payloadWins = req.body.wins;
  const payloadLosses = req.body.losses;
  scoreCount.wins = payloadWins;
  scoreCount.losses = payloadLosses;
  // send back the information about the new score to the request
  res.json(scoreCount);
}

// add player to server list
function addPlayer(req, res) {
  const payloadName = req.body.name;
  const isNewPlayer = checkPlayers(payloadName);
  if (isNewPlayer) {
    // if player's name doesn't exist in current list, add it
    addPlayerWithScore(payloadName, scoreCount.wins, scoreCount.losses);
    res.json(true);
  } else {
    // if the name already exists, warn player about it
    console.log(`The name '${payloadName}' already exists!!!`);
    res.json(false);
  }
}

// get information from the server
app.get('/category', getCategory);
app.get('/category/:name', getWord);
app.get('/guessCount', getGuesses);
app.get('/getScore', getScore);

// send information to the server
app.post('/sendScore', express.json(), sendScore);
app.post('/playerName', express.json(), addPlayer);

app.listen(8080);
