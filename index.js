//fixed array & counter of moves
let resultsArr = [],
  counter = 0,
  bestScore = 0;

//Function that start/restart game with any key pressed
let startGame = () => {
  document.addEventListener(
    "keydown",
    function () {
      resultsArr = [];
      setTimeout(function () {
        document.querySelector("body").classList.remove("game-over");
      }, 600);
      setTimeout(function () {
        generateRandomSquare();
      }, 600);
    },
    { once: true }
  );
};
startGame();

//Function restart game
let gameOver = () => {
  document.querySelector(
    "#level-title"
  ).innerText = `Game Over, Press Any Key to Restart`;
  document.querySelector("body").classList.add("game-over");
  let audioRestart = new Audio("sounds/wrong.mp3");
  audioRestart.play();
  startGame();
};

//function that upgrade the best score
let bestScoreFunct = (compare) => {
  if (compare > bestScore) {
    bestScore = compare;
    document.querySelector("#scoreH1").innerText = `Best Score: ${bestScore}`;
  }
};

//Function that compare the input with result and continue or stop the game
let compareInput = (id) => {
  if (id === resultsArr[counter]) {
    if (counter + 1 === resultsArr.length) {
      setTimeout(function () {
        generateRandomSquare();
      }, 1200);
      upLevel();
    }
  } else {
    bestScoreFunct(resultsArr.length - 1);
    counter = 0;
    resultsArr = [];
    gameOver();
  }
};

//function that upgrade the level
let upLevel = () => {
  document.querySelector(
    "#level-title"
  ).innerText = `Level ${resultsArr.length}`;
};

//Function that generate random number between 1 and 4 / push result / call other functions
let generateRandomSquare = () => {
  const randomNum = Math.floor(Math.random() * 5);
  resultsArr.push(randomNum);
  counter = 0;
  let selectBtn = document.querySelectorAll(".btn")[randomNum].id;
  upLevel();
  changeSquareStyle(selectBtn);
  playSound(selectBtn);
};

//Function that change the style of the square
let changeSquareStyle = (id) => {
  document.querySelector(`#${id}`).classList.add("pressed");

  setTimeout(function () {
    document.querySelector(`#${id}`).classList.remove("pressed");
  }, 100);
};

//Function that play sound when square is clicked
let playSound = (id) => {
  let audio = new Audio(`sounds/${id}.mp3`);
  audio.play();
};

//Function that add event listner to all buttons - call change of style and sound
let addEventListner = () => {
  let length = document.querySelectorAll(".btn").length;
  for (let i = 0; i < length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
      let id = this.id;
      changeSquareStyle(id);
      playSound(id);
      compareInput(i);
      counter++;
    });
  }
};
addEventListner();
