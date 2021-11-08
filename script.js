'use strict';

// selecting elements

let play0El = document.querySelector('.player--0');
let play1El = document.querySelector('.player--1');

let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');

let curr0El = document.getElementById('current--0');
let curr1El = document.getElementById('current--1');

let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let scores;
let currentScore;
let activePlayer;
let playing;

let init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;

  diceEl.classList.add('hidden');
  document;
  play0El.classList.remove('player--winner');
  play1El.classList.remove('player--winner');
  play0El.classList.add('player--active');
  play1El.classList.remove('player--active');
};

init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  play0El.classList.toggle('player--active');
  play1El.classList.toggle('player--active');
};

let rollDice = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice-${dice}.png`;

    // 3. If rolled 1: switch to next player

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add curernt score to active player's score
    scores[activePlayer] += currentScore;
    // ex: scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
