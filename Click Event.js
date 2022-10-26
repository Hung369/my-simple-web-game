"use strict";

let SecreteNumber = Rolling();
let highscore = 0;
let score = Number(document.querySelector(".score").textContent);

function DisplayScore(score) {
  document.querySelector(".score").textContent = score;
  if (score === 0) {
    document.querySelector(".message").textContent = "Lose the game";

    // remove event listener and disable button
    document.querySelector(".check").removeEventListener("click",(document.querySelector(".check").disabled = true)); 
  }
}

function Rolling(){
  /* random in range [a;b] =   Math.floor(Math.random() * b) + a (a < b) */
  return Math.floor(Math.random() * 20) + 1;
}

// add event listener
document.querySelector(".check").addEventListener("click", function () {
  const number = Number(
    document.querySelector(".guess").value /*string type of value*/
  );

  // checking result
  if (!number) {
    document.querySelector(".message").textContent = "💢 No Number!!";
    score--;
    DisplayScore(score);
  } else if (number === SecreteNumber) {
    document.querySelector(".message").textContent = "🥳 Correct Number!!!";
    document.querySelector(".number").textContent = SecreteNumber;
    
    if(score > highscore){ 
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
    // edit style after wining the game.
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // game over
    document.querySelector(".check").removeEventListener("click",(document.querySelector(".check").disabled = true));

  } else if (Math.abs(number - SecreteNumber) < 3) {
    if (number > SecreteNumber) {
      document.querySelector(".message").textContent = "A little bit high";
      score--;
      DisplayScore(score);
    } else {
      document.querySelector(".message").textContent = "A little bit low";
      score--;
      DisplayScore(score);
    }
  } else {
    if (number > SecreteNumber) {
      document.querySelector(".message").textContent = "Too high";
      score--;
      DisplayScore(score);
    } else {
      document.querySelector(".message").textContent = "Too low";
      score--;
      DisplayScore(score);
    }
  }
});

// reset
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  SecreteNumber = Rolling();

  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  // add event listener and enable button
  document.querySelector(".check").addEventListener("click",(document.querySelector(".check").disabled = false));
});