import uuid from 'uuid-random';
import fs from 'fs';

let listOfPlayers = [
  { playerId: 'EXAMPLE-ID', playerName: 'John', wins: 5, losses: 2 },
];

// this function will store player list on a separate .json file
function storePlayers() {
  const data = JSON.stringify(listOfPlayers);
  fs.writeFileSync('savedPlayers.json', data);
}

// check if player name is same with another player already on stored list
export function checkPlayers(newPlayer) {
  for (let i = 0; i < listOfPlayers.length; i += 1) {
    if (listOfPlayers[i].playerName.toLowerCase() === newPlayer.toLowerCase()) {
      return false;
    }
  }
  return true;
}

// add a new player and their score into the list of scoreboard
export function addPlayerWithScore(player, wins, losses) {
  const newPlayer = {
    playerId: uuid(),
    playerName: player,
    wins,
    losses,
  };

  listOfPlayers = [newPlayer, ...listOfPlayers.slice(0, 9)];
  console.log('---\nPlayers;');
  console.log(listOfPlayers);
  console.log('\n---');

  storePlayers();
}
