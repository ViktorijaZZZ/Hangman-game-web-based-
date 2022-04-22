import * as drawCanvas from './drawCanvas.mjs';

export function guessCount(guesses, isNotWrong) {
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
