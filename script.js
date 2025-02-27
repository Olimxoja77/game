const gameBoard = document.getElementById('gameBoard');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let shuffledValues = [...cardValues, ...cardValues];
shuffledValues = shuffle(shuffledValues);
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card-container');
    card.innerHTML = `
        <div class="card">
            <div class="front">${value}</div>
            <div class="back"></div>
        </div>
    `;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.querySelector('.card').classList.contains('flipped')) {
        card.querySelector('.card').classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const firstValue = firstCard.querySelector('.front').textContent;
    const secondValue = secondCard.querySelector('.front').textContent;

    if (firstValue === secondValue) {
        firstCard.querySelector('.card').classList.add('matched');
        secondCard.querySelector('.card').classList.add('matched');
        matchedCards += 2;
        if (matchedCards === shuffledValues.length) {
            setTimeout(() => alert('You win!'), 500);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            firstCard.querySelector('.card').classList.remove('flipped');
            secondCard.querySelector('.card').classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startGame() {
    shuffledValues.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });
}

startGame();
