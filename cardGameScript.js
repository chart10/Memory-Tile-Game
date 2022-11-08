// Christian Hart 001-68-3628

// const animals = [
//     {name: baboon, image: baboon.jpg},
//     {name: cat, image: cat.jpg},
//     {name: cheetah, image: cheetah.jpg},
//     {name: cow, image: cow.jpg},
//     {name: dog, image: dog.jpg},
//     {name: frog, image: frog.jpg},
//     {name: hippo, image: hippo.jpg},
//     {name: lemur, image: lemur.jpg},
//     {name: lion, image: lion.jpg},
//     {name: panda, image: panda.jpg},
//     {name: pig, image: pig.jpg},
//     {name: racoon, image: racoon.jpg}
// ]

const cards = document.querySelectorAll('.card');

function flipCard() {
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));