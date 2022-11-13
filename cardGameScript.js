// Christian Hart 001-68-3628

const animals = [
    {name: "baboon", image: "baboon.jpg"},
    {name: "baboon", image: "baboon.jpg"},
    {name: "cat", image: "cat.jpg"},
    {name: "cat", image: "cat.jpg"},
    {name: "cheetah", image: "cheetah.jpg"},
    {name: "cheetah", image: "cheetah.jpg"},
    {name: "cow", image: "cow.jpg"},
    {name: "cow", image: "cow.jpg"},
    {name: "dog", image: "dog.jpg"},
    {name: "dog", image: "dog.jpg"},
    {name: "frog", image: "frog.jpg"},
    {name: "frog", image: "frog.jpg"},
    {name: "hippo", image: "hippo.jpg"},
    {name: "hippo", image: "hippo.jpg"},
    {name: "lemur", image: "lemur.jpg"},
    {name: "lemur", image: "lemur.jpg"},
    {name: "lion", image: "lion.jpg"},
    {name: "lion", image: "lion.jpg"},
    {name: "panda", image: "panda.jpg"},
    {name: "panda", image: "panda.jpg"},
    {name: "pig", image: "pig.jpg"},
    {name: "pig", image: "pig.jpg"},
    {name: "racoon", image: "racoon.jpg"},
    {name: "racoon", image: "racoon.jpg"}
];

let finished = false;

function chooseSize(animals, size) {
    let resizedAnimals = [];
    for (let i = 0; i < size; i++) {
        resizedAnimals.push(animals[i]); 
    }
    return resizedAnimals;
}

function createGameboard(animals, size, difficulty) {
    let columns;
    let minutes;
    let seconds;
    if (size == 8) { columns = 4, minutes = 2, seconds = 0; }
    if (size == 10) { columns = 5, minutes = 2, seconds = 30; }
    if (size == 12) { columns = 6, minutes = 3, seconds = 0; }


    let shuffledAnimals = shuffle(animals);    //shuffle array

    myTable = document.getElementById('myTable');
    myTable.innerHTML = "";             //clear current gameboard
    myTable.removeAttribute('hidden');

    for (let i = 0; i < 4; i++) {
        
        let tableRow = document.createElement('tr');
        myTable.appendChild(tableRow);

        for (let j = 0; j < columns; j++) {

            let card = document.createElement('td');
            tableRow.appendChild(card);
            card.className = shuffledAnimals[i * columns + j].name;

            let cardFace = document.createElement('img');
            cardFace.src = './static/cards/' + shuffledAnimals[i * columns + j].image;
            card.appendChild(cardFace);
        }
    }
    setTimeout(function() {
        let cards = document.querySelectorAll('td');
        for (card of cards) { 
            let image = card.firstChild;
            image.src = './static/cards/anibusiness.jpg'; 
        }
    }, difficulty);

    function setTimer() {
        let clock = setInterval(function() {
            countdown = document.getElementById('clock');
            if (finished == true) {
                clearInterval(clock);
            }
            if (seconds == 00) {
                minutes --;
                seconds = 59;
            }
            if (seconds < 00 || minutes < 00) {
                
                clearInterval(clock);
                freezeGame = true;
                window.alert("Oops! Looks like you ran out of time. Refresh the page to try again.");
                return;
            }
            
            countdown.innerHTML = minutes + " : " + leadingZero(seconds);
            seconds--;
        }, 1000);
    }

    const cards = document.querySelectorAll('td');
    cards.forEach(td => td.addEventListener('click', flipCard));

    const btn = document.querySelector('#start');
    btn.innerHTML = "End Game!"
    btn.addEventListener('click', function() {
        window.location.reload();
    })

    countdown = document.getElementById('clock');
    countdown.innerHTML = minutes + " : " + seconds;
    document.getElementById('countdown').removeAttribute('hidden');
    setTimer();
    
    
    
    
}

function shuffle(arr) {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i]);
    }
    const len = temp.length;
    let shuffledArray = []
    for (let i = 0; i < len; i++) {
        let ranIdx = Math.floor(Math.random() * temp.length);
        let randVal = temp.splice(ranIdx,1);
        shuffledArray.push(randVal[0]);
    }
    return shuffledArray;
}

function awaitInput(animals) {
    const btn = document.querySelector('#start');
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    const diffInputs = document.querySelectorAll("input[name='difficulty']");
    
    btn.addEventListener('click', function() {
        let size;
        let difficulty;
        for (const selected of sizeInputs) {
            if (selected.checked) {
                size = selected.value;
                break;
            }
        }
        for (const selected of diffInputs) {
            if (selected.checked) {
                difficulty = selected.value;
                break;
            }
        }
        resizedAnimals = chooseSize(animals, size*2);

        createGameboard(resizedAnimals, size, difficulty);
    })
}
awaitInput(animals);


// checkForMatch function
    // if cards don't match, unflip cards
    // if cards match, disable cards

// unflipCards function
    // freeze the game
    // after 2 seconds, remove the flip class from firstCard and secondCard and reset flags

// disableCards function
    // make firstCard and secondCard unclickable
    // reset flags
    // if all cards have flip class, send alert "You win!"

let hasFlippedCard = false;         // indicates if any cards have been flipped
let freezeGame = false;             // indicates if game boards should be temporarily disabled
let firstCard, secondCard;          // variables for currently flipped cards

function flipCard() {
    console.log(this);
    if (freezeGame) return;                     // if freezeGame, do nothing
    if (this === firstCard) return;             // if card already flipped, do nothing
    //let cardData = shuffledAnimals[this.data];  // mark the card's name
    let image = this.firstChild;                
    let animal = this.className;
    image.src = './static/cards/' + animal + '.jpg'; // update image on flipped card
    this.classList.add('flip');                 // mark card as 'flipped'
    if (!hasFlippedCard) {          // if no card has been flipped...
        hasFlippedCard = true;      
        firstCard = this;
        return;
    }
    secondCard = this;              // if a card has already been flipped...
    hasFlippedCard = false;

    checkForMatch();                // Now check if flipped cards match
}

function checkForMatch() {      // Verify if flipped cards match
    let matching = firstCard.className == secondCard.className;
    matching ? disableCards() : unflipCards();
}
function checkForWin() {
    const cards = document.querySelectorAll('td');
    for (let card of cards) {
        if (card.classList.contains('flip') == false) return;
    }
    window.alert("Congratulations! You've matched everybody!");
    finished = true;
}

function disableCards() {           // Match found
    firstCard.removeEventListener('click', flipCard);
    //change firstCard img to animal image
    //image.src = './static/cards/' + cardData.image;
    secondCard.removeEventListener('click', flipCard);
    // change secondCard img to animal image
    resetBoard();
    checkForWin();
}

function unflipCards() {        // On a mismatch flip cards facedown
    freezeGame = true;
    setTimeout(function() {resetCards()}, 1000);
}

function resetCards() {
    firstCard.classList.remove('flip');
    firstCard.firstChild.src = './static/cards/anibusiness.jpg';
    secondCard.classList.remove('flip');
    secondCard.firstChild.src = './static/cards/anibusiness.jpg';
    resetBoard();
}

function resetBoard() {
    hasFlippedCard = false;
    freezeGame = false;
    firstCard = null;
    secondCard = null;
  }