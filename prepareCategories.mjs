const categories = {};

export function prepareCategories() {
  categories.colors = ['red', 'orange', 'yellow', 'lime', 'green', 'cyan', 'blue', 'purple', 'violet', 'pink', 'black', 'white', 'rainbow'];
  categories.animals = ['cat', 'dog', 'giraffe', 'parrot', 'elephant', 'snake', 'mouse', 'tiger', 'bear', 'wolf', 'crocodile', 'dolphin'];
  categories.cars = ['hyundai', 'volkswagen', 'ford', 'BMW', 'tesla', 'ferrari', 'porsche', 'honda', 'toyota', 'lamborghini'];
  categories.searchEngines = ['google', 'yahoo', 'yandex', 'bing', 'mozilla', 'explorer', 'edge', 'netscape', 'mosaic'];
  categories.cities = ['riga', 'daugavpils', 'jelgava', 'jurmala', 'liepaja', 'ventspils', 'rezekne', 'valmiera', 'jekabpils', 'ogre'];
  categories.countries = ['england', 'america', 'canada', 'brazil', 'france', 'finland', 'iceland', 'latvia', 'spain', 'germany', 'australia', 'austria', 'mexico', 'madagascar', 'belgium', 'netherlands', 'china', 'japan', 'southKorea', 'northKorea', 'newZealand'];
  categories.socialMedias = ['youtube', 'instagram', 'facebook', 'snapchat', 'twitter'];
  categories.communications = ['discord', 'skype', 'whatsapp', 'zoom', 'teamspeak'];
  categories.drinks = ['water', 'juice', 'pepsi', 'cocacola', 'fanta', 'sprite', 'mountaindew', 'sevenup'];
  categories.fruits = ['apple', 'banana', 'kiwi', 'orange', 'grape', 'blueberry', 'pineapple', 'pear', 'papaya'];
  categories.subjects = ['mathematics', 'chemistry', 'physics', 'history', 'biology', 'english', 'latvian'];
  categories.vegetables = ['tomato', 'cucumber', 'corn', 'onion'];
  categories.movies = ['TheTerminator', 'theDarkKnight', 'theDarkKnightRises', 'theJoker', 'spiderMan', 'avengers', 'justiceLeague', 'theMatrix', 'monsters', 'harryPotter', 'suicideSquad', 'deadpool', 'ironMan'];
  return categories;
}
