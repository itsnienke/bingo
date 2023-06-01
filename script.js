// Selecteer het DOM-element voor de bingo kaart
const card = document.getElementById('bingo-card');
const numbers = [];
const generateButton = document.getElementById('generate-number');
generateButton.addEventListener('click', generateNumber);
const generatedNumbers = document.getElementById('generated-numbers');
const generatedNumbersArray = [];

// Genereer 25 unieke nummers van 1 tot 75 voor de bingo kaart
while (numbers.length < 25) {
  const number = Math.ceil(Math.random() * 75);
  if (!numbers.includes(number)) {
    numbers.push(number);
  }
}

// Maak de nummers op de bingo kaart
for (let i = 0; i < 25; i++) {
  const cell = document.createElement('li');
  cell.className = 'bingo-cell';
  cell.innerText = numbers[i];
  cell.tabIndex = 0;
  cell.addEventListener('click', toggleCell);

  // Voeg een keyup event listener toe aan de cel om te reageren op Enter-toets
  cell.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      toggleCell.call(this);
    }
  });

  card.appendChild(cell);
}

// Functie om een cel aan te vinken of uit te vinken
// Kan ik niet uitleggen
function toggleCell() {
  // Haal het nummer op uit de inhoud van de cel
  const number = parseInt(this.innerText);

  // Controleer of het nummer al in de gegenereerde nummers array zit
  if (generatedNumbersArray.includes(number)) {
    this.classList.toggle('generated');
  }
}

// Functie om een nieuw nummer te genereren
function generateNumber() {
  let number;
  do {
    number = Math.ceil(Math.random() * 75);
  } while (generatedNumbersArray.includes(number));
  
  // Voeg het gegenereerde nummer toe aan de array
  generatedNumbersArray.push(number);
  const generatedNumberElement = document.createElement('li');
  generatedNumberElement.textContent = number + ' ';

  // Voeg een click event listener toe aan het gegenereerde nummer om de bijbehorende cel aan te vinken
  // Kan ik niet uitleggen
  generatedNumberElement.addEventListener('click', function() {
    const cells = document.getElementsByClassName('bingo-cell');
    for (let i = 0; i < cells.length; i++) {
      if (parseInt(cells[i].innerText) === number) {
        cells[i].classList.toggle('generated');
        break;
      }
    }
  });

  // Voeg het gegenereerde nummer toe aan de lijst van gegenereerde nummers
  generatedNumbers.prepend(generatedNumberElement);
}






// de commando's
const commandos = [ 'bingo', 'bingo!']; 
const grammar = '#JSGF V1.0; grammar commandos; public <commando> = ' + commandos.join(' | ') + ' ;'

// de browser de benodigde dingen leren 
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var gewonnen = document.querySelector('.gewonnen');

// een lijstje maken van de grammer/commando's 
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

// het luisterobject aanmaken en de commando's en de taal leren
const recognition = new SpeechRecognition();
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en','nl';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// als er tekst verstaan is
function spraakAfhandelen(event) {
  const lijstMetAlleResultaten = event.results;
  const indexVanHetLaatsteResultaat = lijstMetAlleResultaten.length - 1;
  const hetLaatsteResultaat = lijstMetAlleResultaten[indexVanHetLaatsteResultaat];     

  let deTekstDieVerstaanIs = hetLaatsteResultaat[0].transcript;
  
  deTekstDieVerstaanIs = deTekstDieVerstaanIs.trim();
  deTekstDieVerstaanIs = deTekstDieVerstaanIs.toLowerCase();
  
  console.log(deTekstDieVerstaanIs) 
  
  

 // Maakt de bingo animatie aan voor wanneer "bingo" geroepen wordt  
  if (deTekstDieVerstaanIs == "bingo") {
    let mogelijkeBingo = true;
    const cells = document.getElementsByClassName('bingo-cell');
    
    // Controleer alle cellen of ze aangeklikt zijn of niet
    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].classList.contains('generated')) {
        mogelijkeBingo = false;
        break;
      }
    }
    
    // Als er geen niet-aangevinkte cel is gevonden, kan je bingo roepen en reageren
    if (mogelijkeBingo) {
      gewonnen.classList.add('show');
    }
  }
  
}


// het luisterobject laten luisteren 
function luisteren() {
   recognition.start();
   console.log('Ready to receive a command.');
}

// als er een woord herkent is - de functie starten 
recognition.onresult = event => {
   spraakAfhandelen(event);
}

// als het luisterobject er onverhoopt mee ophoudt - opnieuw starten met luisteren 
recognition.onend = () => {
   luisteren();
}


luisteren();

console.log("he");