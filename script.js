'use strict';

// SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//SELECTING ELEMENTS WHICH HAVE CLASSES NOT ID'S
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//DECLARING THE VARIABLES OUTSIDE TO USE FROM THE FUNCTION NAME INIT()
let scores, currentScore, activePlayer, playing;

// STARTING CONDITIONS
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
//FUNCTION CALLING TO INITIALIZE THE GEME START A NEW GAME
init();

//FUNCTON FOR PLAYER SWITCHING TO 1 TO 2
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. GENERATING A RANDOM DICE ROLL
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. DISPLAY DICE
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. CHECK FOR ROLLED 1
        if (dice !== 1) {
            // ADD DICE TO CURRENT ROLL
            currentScore += dice;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            // SWITCH TO NEXT PLAYER
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // FINISH THE GAME
            playing = false;
            diceEl.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            // FUNCTION CALLING FOR SWITCHING TO THE NEXT PLAYER
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
