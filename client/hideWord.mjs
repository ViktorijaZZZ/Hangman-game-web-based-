export function hideWord(who) {
    let hiddenWord = [];
    for(let i = 0; i < who.length; i+=1) {
        hiddenWord[i] = who[i].replace(who[i], "_");
    };
    return hiddenWord;
}