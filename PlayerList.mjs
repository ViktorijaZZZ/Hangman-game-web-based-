import uuid from 'uuid-random';

let listOfPlayers = [
  { playerId: 'EXAMPLE-ID', playerName: 'John', wins: 5, losses: 2 },
];

// check if player name is same with another player already on stored list
export function checkPlayers(newPlayer) {
  for (let i = 0; i < listOfPlayers.length; i += 1) {
    if (listOfPlayers[i].playerName.toLowerCase() === newPlayer.toLowerCase()) {
      return false;
    }
  }
  return true;
}

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
}
