import * as drawCanvas from './drawCanvas.mjs';

// this function will draw gallows based on number of lives that will be left
export function guessCount(guesses, isNotWrong) {
  // this statement checks if the guess was correct
  if (isNotWrong) {
    return;
  }

  switch (guesses) {
    case 7:
      drawCanvas.drawSmallSticks();
      break;
    case 6:
      drawCanvas.drawVerticalStick();
      break;
    case 5:
      drawCanvas.drawHorizontalStick();
      break;
    case 4:
      drawCanvas.drawRope();
      break;
    case 3:
      drawCanvas.drawStickLegs();
      break;
    case 2:
      drawCanvas.drawStickBody();
      break;
    case 1:
      drawCanvas.drawStickArms();
      break;
    case 0:
      drawCanvas.drawStickHead();
      break;
  }
}
