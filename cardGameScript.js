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

    console.log(animals);

function createGameboard(animals, rows, columns) {

    myTable = document.getElementById('myTable');
    
    for (let i = 0; i < rows; i++) {
        
        let tableRow = document.createElement('tr');
        myTable.appendChild(tableRow);

        for (let j = 0; j < columns; j++) {

            let card = document.createElement('td');
            tableRow.appendChild(card);
            card.data = animals[i * columns + j].name;
            let front = document.createElement('img');
            front.src = './static/cards/' + animals[i * columns + j].image;
            
            // let back = document.createElement('img');
            // back.scr = './static/cards/anibusiness.jpg';
            card.appendChild(front);
            //card.appendChild(back);
        }
    }
}

createGameboard(animals,6,4);
const cards = document.querySelectorAll('.card');
shuffle();

let hasFlippedCard = false;
let freezeGame = false;
let firstCard, secondCard;

function flipCard() {
    if (freezeGame) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
}

function checkForMatch() {      // Verify if flipped cards match
    let matching = firstCard.dataset.name == secondCard.dataset.name;
    matching ? disableCards() : unflipCards();
}
function checkForWin() {
    for (let card of cards) {
        if (card.classList.contains('flip') == false) return;
    }
    window.alert("Congratulations! You've matched everybody!");

    
}

function disableCards() {       // Match found
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    checkForWin();
}

function unflipCards() {        // On a mismatch flip cards facedown
    freezeGame = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 2000);
}

function resetBoard() {
    hasFlippedCard = false;
    freezeGame = false;
    firstCard = null;
    secondCard = null;
  }

  function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  }

cards.forEach(card => card.addEventListener('click', flipCard));