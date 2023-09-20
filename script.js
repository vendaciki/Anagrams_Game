// Seznam slov a hintů
const words = [
    { word: "cat", hint: "A pet with a beard" },
    { word: "table", hint: "Has four legs" },
    { word: "computer", hint: "You use it every day" },
    { word: "coffee", hint: "You drinking it" },
    { word: "wizard", hint: "Male (husband) witch" },
    { word: "butterfly", hint: "It is small with wings" },
    { word: "elephant", hint: "Live in Africa and in Zoo" },
    { word: "house", hint: "We live in it" },
    { word: "holiday", hint: "Rest time" },
    { word: "bird box", hint: "House for birds" },
    { word: "kangaroo", hint: "Live in Australia" },
    { word: "penguin", hint: "Blackwhite animal" },
    { word: "waterfall", hint: "Flowing water, scenic" },
    { word: "vacation", hint: "Holiday, time off" },
    { word: "sculpture", hint: "Artwork, carved form" },
    { word: "meditation", hint: "Mindful practice, calm" },
    { word: "landscape", hint: "Scenery, outdoor view" },
    { word: "happiness", hint: "Joy, contentment, smiles" },
    { word: "chocolate", hint: "Sweet treat, cocoa" },
    { word: "adventure", hint: "Exciting experience" },
    { word: "apple", hint: "Fruit, red or green" },
    { word: "chair", hint: "A seat with a backrest" },
    { word: "beach", hint: "Sand, ocean, sunshine" },
    { word: "cloud", hint: "White, fluffy, in the sky" },
    { word: "dance", hint: "Rhythmic movement to music" },
    { word: "drink", hint: "Consuming liquids, like water or lemonade" },
    { word: "earth", hint: "Our planet, soil, land" },
    { word: "flame", hint: "Fire, burning, heat" },
    { word: "music", hint: "Sounds, melodies, rhythms" },
    { word: "breeze", hint: "Gentle wind, cooling air" },
    { word: "castle", hint: "Fortified structure, royalty" },
    { word: "flower", hint: "Blossom, petals, fragrance" },
    { word: "guitar", hint: "Musical instrument, strings" },
    { word: "planet", hint: "Celestial body, Earth is one" },
    { word: "rocket", hint: "Spacecraft, launches into space" },
    { word: "sphere", hint: "Round shape, Earth is one" },
    { word: "ticket", hint: "Pass, admission, for entry" },
    { word: "bicycle", hint: "Two-wheeled vehicle, pedals" },
    { word: "diamond", hint: "Precious gem, sparkling" },
    { word: "journey", hint: "Travel, adventure, trip" },
    { word: "library", hint: "Collection of books, reading" },
    { word: "morning", hint: "Early hours, sunrise" },
    { word: "mystery", hint: "Unknown, puzzling, secrets" },
    { word: "present", hint: "Gift, now, time" },
    { word: "sunrise", hint: "Morning sun, dawn" },
    { word: "weather", hint: "Conditions, forecast, climate" },
    { word: "window", hint: "Glass opening, see outside" },
    { word: "birthday", hint: "Celebration of birth" },
    { word: "hospital", hint: "Medical facility, care" },
    { word: "mountain", hint: "High land, peaks" },
    { word: "rainbow", hint: "Colorful, after rain" },
    { word: "scissors", hint: "Cutting tool, two blades" },
    { word: "universe", hint: "All of space, galaxies" },
    { word: "wildlife", hint: "Animals in nature" },
    { word: "wireless", hint: "No wires, technology" },
    { word: "keyboard", hint: "Input device, typing" },
    { word: "telephone", hint: "Communication device, calls" },
    { word: "restaurant", hint: "Place to eat out" },
    { word: "helicopter", hint: "Flying machine" },
    { word: "television", hint: "Watching shows, screen" },
    { word: "elevator", hint: "Vertical transport" },
    { word: "briefcase", hint: "Carrying documents" },
    { word: "apartment", hint: "Living space, flat" },
    { word: "motorcycle", hint: "Two-wheeled vehicle" },
    { word: "flashlight", hint: "Portable light source" },
    { word: "sunglasses", hint: "Eyewear for the sun" },
    { word: "watermelon", hint: "Juicy fruit, refreshing" },
    //{ word: "", hint: "" },
];

// Získání odkazů na HTML prvky
const startButton = document.getElementById("start-button"); // Odkaz na tlačítko "Start"
const gameContainer = document.getElementById("game-container"); // Odkaz na herní kontejner

// Funkce pro spuštění hry
function startGame() {
    startButton.style.display = "none"; // Skryjeme tlačítko "Start"
    gameContainer.style.display = "block"; // Zobrazíme herní kontejner
    startRoundTimer(); // Spuštění časovače kola
    displayWord(); // Zobrazit první slovo
}

// Přidání posluchače na tlačítko "Start"
startButton.addEventListener("click", startGame);

// Vytvoření kopie seznamu slov a jejich náhodné promíchání
let shuffledWords = [...words];
shuffleArray(shuffledWords);

// Inicializace proměnných
let currentWordIndex = 0;
let roundsPlayed = 0; // Inicializace počítadla odehraných kol
let correctAnswers = 0; // Počet správných odpovědí
let incorrectAnswers = 0; // Počet špatných odpovědí
let currentWordTimeLeft = 0; // Proměnná pro zbývající čas pro aktuální slovo

// Získání odkazů na HTML prvky
const scrambledWordElement = document.getElementById("scrambled-word"); // Odkaz na element pro zobrazování přesmyček slov
const guessInput = document.getElementById("guess"); // Odkaz na vstupní pole pro odpovědi uživatele
const checkButton = document.getElementById("check-button"); // Odkaz na tlačítko pro kontrolu odpovědi
const messageElement = document.getElementById("message"); // Odkaz na element pro zobrazení zpráv
const roundsPlayedElement = document.getElementById("rounds-played"); // Odkaz na počítadlo odehraných kol
const timeLeftElement = document.getElementById("time-left"); // Odkaz na zobrazení zbývajícího času
const correctAnswersElement = document.getElementById("correct"); // Odkaz na zobrazení správných odpovědí
const incorrectAnswersElement = document.getElementById("incorrect"); // Odkaz na zobrazení špatných odpovědí

let roundTimer; // Proměnná pro interval časovače kola

// Funkce pro zamíchání pole
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Funkce pro přesmyčení slova
function scrambleWord(word) {
    const wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join("");
}

// Funkce pro aktualizaci zobrazení zbývajícího času pro aktuální slovo
function updateTimeLeftDisplay() {
    timeLeftElement.textContent = currentWordTimeLeft;
}

// Funkce pro aktualizaci zbývajícího času pro aktuální slovo
function startRoundTimer() {
    currentWordTimeLeft = 30; // Nastavit časový limit pro aktuální slovo
    updateTimeLeftDisplay(); // Aktualizace zobrazení zbývajícího času

    clearInterval(roundTimer); // Zastavení předchozího časovače, pokud běží

    roundTimer = setInterval(function () {
        if (currentWordTimeLeft > 0) {
            currentWordTimeLeft--;
            updateTimeLeftDisplay(); // Aktualizace zobrazení zbývajícího času
        } else {
            messageElement.textContent = "Time is up. Game over.";
            guessInput.disabled = true;
            checkButton.disabled = true;
            clearInterval(roundTimer); // Zastavení časovače kola
        }
    }, 1000);
}

// Funkce pro zastavení časovače kola
function stopRoundTimer() {
    clearInterval(roundTimer);
}

// Funkce pro zobrazení slova a hintu
function displayWord() {
    if (currentWordIndex < shuffledWords.length) {
        const currentWord = shuffledWords[currentWordIndex];
        const scrambledWord = scrambleWord(currentWord.word);
        scrambledWordElement.textContent = scrambledWord;
        messageElement.textContent = `Hint: ${currentWord.hint}`;
        roundsPlayedElement.textContent = roundsPlayed; // Aktualizace počítadla odehraných kol
        startRoundTimer(); // Spustit časovač kola pro aktuální slovo
    } else {
        messageElement.textContent = "Game over.";
        guessInput.disabled = true;
        checkButton.disabled = true;
    }
}

// Přidání posluchače na tlačítko pro kontrolu odpovědi
checkButton.addEventListener("click", checkAnswer);

// Přidání posluchače na stisknutí klávesy Enter v poli pro zadání odpovědi
guessInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Funkce pro nastavení box-shadow podle správné nebo špatné odpovědi
function setBoxShadow(isCorrect) {
    if (isCorrect) {
        gameContainer.style.boxShadow = "0px 0px 15px 3px #4fd253"; // Zelený box-shadow pro správnou odpověď
    } else {
        gameContainer.style.boxShadow = "0px 0px 15px 3px #ff0000"; // Červený box-shadow pro špatnou odpověď
    }

    // Počkejte 1 sekundu a poté vraťte původní box-shadow
    setTimeout(function () {
        gameContainer.style.boxShadow = "0px 0px 15px 3px #4f99d2"; // Původní modrý box-shadow
    }, 1000); // 1000 milisekund = 1 sekunda
}

// Funkce pro zkontrolování odpovědi
function checkAnswer() {
    const currentWord = shuffledWords[currentWordIndex];
    const guess = guessInput.value.toLowerCase();

    if (guess === currentWord.word) {
        messageElement.textContent = "Correct!";
        currentWordIndex++;
        roundsPlayed++; // Přičtení odehraného kola při správné odpovědi
        correctAnswers++; // Přičtení správné odpovědi
        roundsPlayedElement.textContent = roundsPlayed; // Aktualizace počítadla odehraných kol
        correctAnswersElement.textContent = correctAnswers; // Aktualizace zobrazení správných odpovědí
        guessInput.value = "";
        stopRoundTimer(); // Zastavení časovače kola
        setBoxShadow(true); // Nastavení zeleného box-shadow pro správnou odpověď
        displayWord(); // Zobrazit další slovo
    } else {
        messageElement.textContent = "Incorrect.";
        guessInput.value = "";
        stopRoundTimer(); // Zastavení časovače kola
        if (currentWordIndex < shuffledWords.length - 1) {
            currentWordIndex++;
            setBoxShadow(false); // Nastavení červeného box-shadow pro špatnou odpověď
            displayWord(); // Zobrazit další slovo při špatné odpovědi
        } else {
            messageElement.textContent = "Game over.";
            guessInput.disabled = true;
            checkButton.disabled = true;
        }
        roundsPlayed++; // Přičtení odehraného kola při špatné odpovědi
        roundsPlayedElement.textContent = roundsPlayed; // Aktualizace počítadla odehraných kol
        incorrectAnswers++; // Přičtení špatné odpovědi
        incorrectAnswersElement.textContent = incorrectAnswers; // Aktualizace zobrazení špatných odpovědí
    }
}

// Zobrazení prvního slova a hintu
displayWord();
