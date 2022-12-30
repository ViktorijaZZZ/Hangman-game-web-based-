import { prepareHandles } from './prepareHandles.mjs';

// display the underscores that match the letters in word
// '_ _ _ _'
export function displayHiddenWord(hiddenWord) {
  const handles = prepareHandles();
  handles.word.textContent = '';
  handles.word.textContent = `${hiddenWord.join(' ')}`;
}

// display a category for player
export function displayCategory(category) {
  const handles = prepareHandles();
  handles.category.textContent = `Category: ${category}`;
}

// display a condition message for win/lose scenario
export function displayMessage(condition, rWord) {
  const handles = prepareHandles();
  handles.warningMsg.textContent = condition === true ? 'You win! +1 point' : `The word was '${rWord.toUpperCase()}'`;
  if (condition) {
    handles.warningMsg.style.color = 'Lime';
  } else {
    handles.warningMsg.style.color = 'White';
  }
}

// this function will hide the letters of a word
export function hideWord(who) {
  const hiddenWord = [];
  for (let i = 0; i < who.length; i += 1) {
    hiddenWord[i] = who[i].replace(who[i], '_');
  }
  return hiddenWord;
}
