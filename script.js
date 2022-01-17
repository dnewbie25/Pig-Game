'use strict';

// player and scores
const player1 = document.querySelector('.player--0');
const player1Score = document.querySelector('#score--0');
const player2 = document.querySelector('.player--1');
const player2Score = document.querySelector('#score--1');
let activePlayer = player1;

// game UI
const diceImg = document.querySelector('.dice');
diceImg.style.display = 'none';
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const reset = document.querySelector('.btn--new');

// starting conditions
player1Score.textContent = 0;
player2Score.textContent = 0;

// functions

const rollDice = () => {
  // roll the dice on screen
  const dice = {
    1: [1, './dice-1.png'],
    2: [2, './dice-2.png'],
    3: [3, './dice-3.png'],
    4: [4, './dice-4.png'],
    5: [5, './dice-5.png'],
    6: [6, './dice-6.png'],
  };

  const randomNumber = Math.floor(Math.random() * (6 - 1 + 1) + 1);

  return dice[randomNumber];
}

const checkActivePlayer = (diceValue) => {
  if (player1.classList.contains('player--active') && diceValue === 1) {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    activePlayer = player2;
  } else if (player2.classList.contains('player--active') && diceValue === 1) {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    activePlayer = player1;
  }
}

// hold function

const checkWinner = () => {
  if (Number(player1Score.textContent) === 100) {
    player1Score.textContent = "Player 1 Wins";
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
  } else if (Number(player2Score.textContent) === 100) {
    player2Score.textContent = "Player 2 Wins";
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;
  }
}

const holdValue = () => {
  // changes active player
  if (activePlayer.classList.contains('player--0')) {
    player1Score.textContent = Number(player1Score.textContent) + Number(activePlayer.children[2].children[1].textContent);
    checkWinner();
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
    activePlayer.children[2].children[1].textContent = 0;
    diceImg.style.display = 'none';
    activePlayer = player2;
  } else {
    player2Score.textContent = Number(player2Score.textContent) + Number(activePlayer.children[2].children[1].textContent);
    checkWinner();
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
    activePlayer.children[2].children[1].textContent = 0;
    diceImg.style.display = 'none';
    activePlayer = player1;
  }
}

// new game function
reset.addEventListener('click', function () {
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.children[2].children[1].textContent = 0;
  player2.children[2].children[1].textContent = 0;
  diceImg.style.display = 'none';
  rollDiceBtn.disabled = false;
  holdBtn.disabled = false;
})


// DOM functions

rollDiceBtn.addEventListener('click', function () {
  const rolledDice = rollDice();
  diceImg.style.display = 'block'
  diceImg.src = rolledDice[1];
  if (rolledDice[0] !== 1) {
    // add to active player score
    // currentScore += rolledDice[0];
    activePlayer.children[2].children[1].textContent = Number(activePlayer.children[2].children[1].textContent) + rolledDice[0];
    checkActivePlayer(rolledDice[0]);
  } else {
    activePlayer.children[2].children[1].textContent = 0;
    // do not add to score, and change active player
    checkActivePlayer(rolledDice[0]);
  }
})

holdBtn.addEventListener('click', function () {
  holdValue();
})