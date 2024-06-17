// creation variable global
let dom_jeu, tableau, under, lettreSaisie, btn;
var premchar = [], derchar = [], choixMot = [], tableauUnderscore = [];
let victoire, defaite = false ;
let essaiRestant = 6 ;
var tries = 0, i = 0;
var streak = 0;
var fond;
var DarkMode;
var tAffichage;
var titreH;
var white;
const END = 0;
const NB_BUTTON = 26;
const STREAK = 5
// 

/**
Restarts the game by resetting variables to their default values,
selecting a new random word, converting it into underscores,
updating the display and background, and enabling letter input buttons.
*/
function restart(){
    variableDefault();   
    backgroundChange();
    selectMot = motSecret();
    wordChange = splitWord(selectMot);
    tableauUnderscore = underscore(wordChange);
    enableButton();
    Streak();
}


/**

Activates dark mode and light mode for the webpage by changing the background color and adjusting the styles of various elements.
*/
function darkMode(){

    bDark = document.getElementById("DarkMode");

    if (bDark.textContent == "Dark Mode"){
        DarkToWhite();
    }
    else{
        WhiteToDark()
    }
}

/**
 
My First Background for Dark Mode 
*/
function DarkToWhite(){
    
        body = document.body;
        body.className=('bodybg');

        white = document.getElementById('trouve');
        white.className = ('white_mode');

        titreH = document.getElementById('titre');
        titreH.className = ('white_mode');

        tStreak = document.getElementById('streak');
        tStreak.className = ('white_mode');

        tAffichage = document.getElementById("affichage");
        tAffichage.className = ('white_mode');

        bDark.className=('white_bg');

        DarkMode = document.querySelectorAll('button');
        DarkMode.forEach(DarkMode => {
            DarkMode.className += (" " + 'button_color');
        });  
        
        bDark.innerText="Light Mode";
        bDark.classList.remove('button_color');
}

/**
 
My Second Background for Dark Mode 
*/

function WhiteToDark(){
    body = document.body;
    body.classList.remove('bodybg');

    white = document.getElementById('trouve');
    white.classList.remove('white_mode');

    titreH = document.getElementById('titre');
    titreH.classList.remove('white_mode');

    tStreak = document.getElementById('streak');
    tStreak.classList.remove('white_mode');

    tAffichage = document.getElementById("affichage");
    tAffichage.classList.remove('white_mode');


    bDark.innerText="Dark Mode";
    bDark.classList.remove('white_bg');

    bDark.innerText="Dark Mode";
    bDark.className = ('defaultTheme');

    DarkMode = document.querySelectorAll('button');
    DarkMode.forEach(DarkMode => {
        DarkMode.classList.remove('button_color');
    });  
}


/**
Generates a random word from a predefined dictionary and returns it.
@returns {string} - A randomly selected word from the dictionary.
*/
function motSecret() {
    let index = Math.floor(Math.random() * dictionnaire.length);
    choixMot = dictionnaire[index];
    motVisible = choixMot.split('');

    return choixMot;
}

/**
Splits a string into an array of characters, removes the first and last characters,and returns the resulting array.
@param {string} random - The input string to be processed.
@returns {array} - An array containing all characters of the input string except the first and last ones.
*/
function splitWord(random) {
    var tableauBefSplit = random.split('');
    premchar = tableauBefSplit.shift();
    derchar = tableauBefSplit.pop();
    return tableauBefSplit;
}

/**
Replaces each character of a given word with underscores,
except for the first and last characters which are preserved.
Displays the resulting word with underscores on the webpage.
@param {string} choixMot - The word to be converted into underscores.
@returns {array} - An array representing the word with underscores.
*/
function underscore(choixMot) {
    dom_jeu = document.getElementById('trouve');
    for (var i = 0; i < choixMot.length; i ++) {
        tableauUnderscore[i] = " _";
    }
    tableauUnderscore.unshift(premchar);
    tableauUnderscore.push(derchar);
    dom_jeu.innerText = tableauUnderscore.join(' ');
    return tableauUnderscore;
}
/**
 * Retrieves the text content of a given HTML element representing a letter input,disables the element, and passes the entered letter for further processing.
 * @param {HTMLElement} tag - The HTML element representing the letter input.
 */
function lettreTest(tag){
        lettreSaisie = tag.textContent;
        tag.disabled = true;
        Boucle(lettreSaisie);
}


/**
Enables all letter input buttons for the player to make guesses.
*/
function enableButton(){
    for (let index = 1; index < NB_BUTTON + 1 ; index++) {
        document.getElementById("btn" + index).disabled = false;
    }
}

/**
 * Updates the displayed word on the webpage by joining the elements of the array, representing the word with underscores and setting it as the text content of the specified HTML element.
 */
function updateWord(){
    dom_jeu.innerText = tableauUnderscore.join(' ');
}

/**
 * Verifies if the word guessed by the player matches the hidden word.
 * Updates the victory status if the guessed word matches the hidden word,
 * or updates the defeat status if the remaining attempts reach the end.
 * @returns {boolean} - True if the player wins, otherwise false.
 */
function verifTab() {
    let compteur = 0;
    for (let i = 0; i < motVisible.length; i++ ) {
        if (tableauUnderscore[i] === motVisible[i]) {
            compteur++;
        }
    }
    if (compteur === motVisible.length){
        victoire = true ;
    }
    else if (essaiRestant === END ) {
        defaite = true 
    }
    return victoire ;
}

/**
 * Checks whether the game is won or lost.
 * Updates the display and background color accordingly.
 */
function winOrNot(){

    if (victoire == true){
        affichage = document.getElementById("affichage");
        affichage.innerHTML="Bravo tu as bien trouver le mot";
        streak++;
        document.getElementById("streak").innerHTML="Streak : " + streak ;
        allBtn = document.querySelectorAll('button.off')
        allBtn.forEach((button) => {
          button.disabled = true;
        });

    }
    else if (defaite == true) {
        streak= 0;
        document.getElementById("streak").innerHTML="Streak : " + streak ;
        affichage = document.getElementById("affichage");
        affichage.innerHTML='Dommage, tu as perdu le mot été : ' + motVisible.join('') ;
        allBtn = document.querySelectorAll('button.off')
        allBtn.forEach((button) => {
          button.disabled = true;
        });
    }
    return;
}

/**
 * Checks if the guessed letter matches any character in the hidden word.
 * Updates the array representing the word with underscores accordingly.
 * Updates the displayed word, checks for victory or defeat, and updates the game status.
 * @param {string} lettre - The letter guessed by the player.
 */
function Boucle(lettre){
    let compteur = 0 ;
    console.log(motVisible);

    for (var i = 0 ; i < motVisible.length; i ++) {

            if (lettre == motVisible[i] ){
                tableauUnderscore[i] = lettre;
            }
            else {
                compteur++;
                if (compteur == motVisible.length) {
                    essaiRestant-- ;
                    backgroundChange();
                }
        }
    }  
    updateWord();
    verifTab();
    winOrNot();
    Streak();
    return; 
}

/**
 * Changes the background color and updates the displayed image based on the number of remaining attempts.
 */
function backgroundChange(){
        tries++;
        document.getElementById("pendu").src = "media/" + tries + ".png";
    }

/**
Resets variables to their default values.
*/
function variableDefault(){
    dom_jeu, tableau, under, lettreSaisie, btn;
    premchar = [], derchar = [], choixMot = [], tableauUnderscore = [];
    victoire = false, defaite = false ;
    essaiRestant = 6 ;
    tries = -1, i = 0;
    affichage = document.getElementById("affichage");
    affichage.innerHTML=' ' ;
}

/**

Updates the streak counter and adjusts the displayed image accordingly.
*/
function Streak(){
    if (streak == STREAK){
        document.getElementById("easter").src = "./media/She-goat_J1.jpg" ;
    }
    else if (streak == END ) {
        document.getElementById("easter").src = " " ;
    }
}

selectMot = motSecret();
wordChange = splitWord(selectMot);
tableauUnderscore = underscore(wordChange);