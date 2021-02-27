'use strict';


// selecting element

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dicePicEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    scores = [0, 0];
    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    dicePicEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1}`;

}
init();

//Switching Player
const handleScore = function () {

    currentScore = 0

    // if true, switch to next player
    activePlayer = activePlayer === 0 ?
        1 : 0; //ternary Operator (other way to write if condition)

    //change the background after swtiching
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}

// ROLLING the functionallity
btnRoll.addEventListener('click', function () {
    if (playing) {

        //1. Generating random number
        const dice = Math.trunc(Math.random() * 6) + 1;
        // console.log(dice);

        //2. Display the dice that the same as random number
        dicePicEl.classList.remove('hidden')
        dicePicEl.src = `dice-${dice}.png`

        //3. check for rolled 1
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {

            document.getElementById(`current--${activePlayer}`).textContent = 0;

            handleScore();

        }
    }

})

//Hold the score to the TOTAL SCORE
btnHold.addEventListener('click', function () {
    //1. add current score to total score
    if (playing) {

        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. if the score >= 100: if not, switch the player, if true then the player wins
        if (scores[activePlayer] >= 100) {

            dicePicEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

            document.querySelector(`#name--${activePlayer}`).textContent = 'Winner';

        } else {
            //switch the player 
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            handleScore();
        }
    }
});


//NEW GAME
btnNew.addEventListener('click', init);