let gameSeq = [];
let userSeq = [];
let level = 0;
let start = false;

let btns = ["yellow", "red", "green", "blue"];

let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

// -----------For starting the game-----------
document.addEventListener("keypress", function () {
  if (start === false) {
    console.log("Game started");
    start = true;

    levelUp();
  }
});

// -----------Level Up Func-----------
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * 3);
  let ranClr = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranClr}`);

  gameSeq.push(ranClr);
  console.log(gameSeq);
  btnFlash(ranBtn);
}

// -----------BTN FLASH FUNCTION-----------
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// --------------------------User Click Detection--------------------------
// -----------Adding event listeners on color buttons-----------
for (btn of allBtns) {
  btn.addEventListener("click", btnClicked);
}

// -----------Button click function-----------
function btnClicked() {
  //user clicked btn flash
  let btn = this;
  btnFlash(btn);

  //user seq tracking
  btn = this.id;
  userSeq.push(btn);

  checkSeq(userSeq.length - 1);
}

// -----------Sequence Checking-----------
function checkSeq(idx) {
  if (userSeq[idx] == gameSeq[idx]) {

    if (userSeq.length == gameSeq.length) {
      // seq same
      setTimeout(levelUp(), 1000);
    }

  } else {
    // game over
    h2.innerHTML = `Game Over! Your score is <b>${level}<b><br>Press any key to start.`;
    // Background changing
    document.querySelector("body").classList.add("wrong");
    setTimeout(function () {
      document.querySelector("body").classList.remove("wrong");
    }, 150);

    // reset to new game
    reset();
  }
}

// -----------Reset Function-----------
function reset() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  start = false;
}
