'use strict';

// Selecting score elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Selecting Player elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Selecting dice elements
const diceEl = document.querySelector('.dice');

// Selecting buttons
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Start function
const startGame = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
};

// Player Change Function
const playerChange = () => {
  // Make Current player's current score = 0
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;

// Starting the game
startGame();

// Roll dice events
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice, typeof dice);

    // 2. Display the dice roll
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3. Check if rolled 1: if true, swtich to next player
    if (dice !== 1) {
      // Add dice score to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switching players
      playerChange();
    }
  }
});

// Hold Game Events
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. Current Score added to player score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // if yes, finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // if no, switch to next player
      // Switching players
      playerChange();
    }
  }
});

// New Game Events
btnNew.addEventListener('click', startGame);
