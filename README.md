# AppProgCwk

# [GitPushNumber]

# [1] Added all the files into here, the index.mjs will need more modularisation

# pushed to github

# [TESTING] button pushing

# [2] Ditched the idea of 'inputbox',
# added letters as buttons instead,
# improved the design of the game to make the UI appeal better.

# [3] Made functionality of the letter-buttons on screen,
# allowing the user to use both the keyboard and buttons to choose their letter.

# [4] Generating randoms moved from client to server

# [5] Improved the wins/losses grabbed from server and set on client

# [6]
# - Added the grid style,
# - Improved the UI,
# - Changed 'lives' variables to 'guesses',
# - Modularised 'mouseClickCheck.mjs', 'disable/enable~Inputs.mjs', 'displayMessage.mjs', 'createPrompt.mjs'
# - Added a category 'lecturers',
# - Changed canvas properties.

# [7]
# improved coding structure and functions;
# - Improved namings of functions and variables,
# - The server is not at fixed state anymore (in case of multiplayer),
# - In 'index.mjs', the switch statement was improved on function 'checkKeys',
# - In 'index.mjs', the asynchronous functions that retrieve a random category and a word were improved,
# - Improved validation of the input based on whichever key was presed on user keyboard,
# - Removed the 'check' button as it was pointless to have it at this point,
# - improved the design of the game more to make the UI appeal better, using grids.

# [NEW_BRANCH]
# added lint
# [8]
# Made some changes to the code and added package.json for 'eslint' config
# [9]
# Fixed problems identified by ESLint

# [10]
# Added the name option after the player decides to finish playing the game through the prompt button 'No' asking to play again.
# If they choose 'Yes', the game will restart with defaulted variables.

# [10]
# When the player enters their name, that name along with their
# wins and losses score will become an object and stored on a server.
# Each time new player is added, the list of those players
# will be displayed on the console/terminal on server-side.

# [11]
# Changed canvas properties as well as stickman colour-coding
# to appeal better.

# [12]
# Ditched the idea of keeping most things on a server, because of more problems arising with it rather than using current state of the code.

# [FEATURES]

# A server will host the game;
# - It will store client values of lives, wins and losses.
# - It will store all available categories as well as the words, which will be randomised and sent to the client once requested.
# - 

# [HOW-TO-PLAY]
# When the game starts, the player will be shown a category of the word, blanks for that hidden word and their chosen letter displayed with 'Your letter' as well as the disabled input box with 3 dots. (This only exists to show what letter they picked)

# [1]
# The player can either use the keyboard to press any key of their chose or press any button on the page to record that letter as their choice.

# [2]
# The game will also display how many guesses the player has left.
# 'guesses left: 8'

# [3]
# If their guess was correct, that certain blank for the letter will be revealed, opening up the hidden word.

# [4]
# If their guess was wrong, the page will display the user the warning message, saying that their letter was incorrect, thereby reducing the guess count and drawing a gallow on canvas (a stickman hanging).

# [5]
# If their guess is repeated despite it already being recorded, the page will display a warning message saying that their letter was already guessed before.

# [6]
# Regardless of the letter being correct or wrong, it will be recorded into an array called 'usedLetters' which will store the chosen letters.

# [7]
# Once the player guesses the word correctly, the value of their 'wins' will be increased. Same thing for 'losses' value. This will be their score.

# [8]
# Once the game is finished regardless of the condition, the player will be prompted to play again and as stated before, either they play again to increment the score of 'wins' or 'losses' or decide to finish and add their name to the stat on a server.

# [9]
# Once they are on a 'prompting' stage, all the other buttons and inputs will be disabled to avoid tampering or cheating with the page. Even if the player reloads the page, they will restart the game but their score will be remembered, so they can't trick it.