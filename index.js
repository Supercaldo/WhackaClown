
// Creating Variables

const barrelsdiv = document.querySelector(".barrels");
const score = document.querySelector(".score");
const time = document.querySelector(".time");
const startbutton = document.querySelector(".menu button");
const menu = document.querySelector(".menu");
const highscore = document.querySelector(".highscore");
const gameover = document.querySelector(".display h2");
const hammer = document.querySelector(".hammer");

//Timer Variables
let timeleft;
let pscore = 0;
let maxscore = 0;

// Sound Variables
let ouch = new Audio("./sounds/ouch.mp3");
let hitsound = new Audio("./sounds/hitsound2.mp3");
let startsound = new Audio("./sounds/clown1.mp3");
let endsound = new Audio("./sounds/clown2.mp3");

/* A main container was created to hold the barrels, 
which were then configured individually.
*/

for (let i = 1; i <= 16; i++) {
  let barrel = document.createElement("div");
  barrel.classList.add("barrel");
  barrelsdiv.appendChild(barrel);
  let barril = document.createElement("img");
  barril.classList.add("barril");
  barril.src = "./images/barrel1.png";
  barrel.appendChild(barril);

  let clown = document.createElement("img");
  clown.classList.add("clown1a");
  clown.src = "./images/clown1a.png";

  clown.setAttribute("name", "clown1a");
  barrel.appendChild(clown);
}

// Here we mainly use the addEventListener method to make the mouse perform all actions.


window.addEventListener("mousemove", (e) => {
  hammer.style.left = e.pageX + "px";
  hammer.style.top = e.pageY - 60 + "px";
});

window.addEventListener("click", (e) => {
  hammer.style.transform = "rotateZ(-50deg) rotateY(-180deg";
  hitsound.play();
  hitsound.currentTime = 0;
  setTimeout(() => {
    hammer.style.transform = "rotateZ(0deg) rotateY(-180deg";
  }, 40);

  /*Here the click event interacts with the clown through a conditional statement. 
  If the clown is hit, the sound appears and the points are increased by 10.*/
  
  if (e.target.name === "clown1a") {
    setTimeout(() => {
      document.body.classList.toggle("hit");
    }, 100);
    document.body.classList.toggle("hit");
    ouch.play();
    ouch.currentTime = 0;
    pscore = pscore + 10;
    score.textContent = pscore;
  }
});

//Setting Start Button and Timer

startbutton.addEventListener("click", () => {
  menu.classList.add("menuclose");
  startsound.play();
  startsound.currentTime = 0;
  timeleft = 50;
  pscore = 0;
  score.textContent = pscore;
  time.textContent = timeleft;

  //Configuring the timer

  let timer = setInterval(() => {
    time.textContent = timeleft;
    if (timeleft === 0) {
      gameover.style.visibility = "visible";
      menu.classList.remove("menuclose");
      endsound.play();
      endsound.currentTime = 0;
      if (pscore > maxscore) {
        maxscore = pscore;
        highscore.textContent = maxscore;
      } else {
        highscore.textContent = maxscore;
      }

      clearInterval(timer);
    } else {
      timeleft--;
      time.textContent = timeleft < 10 ? "0" + timeleft : timeleft;
      const clown = document.querySelectorAll(".clown1a");

      let chooseclown = Math.floor(Math.random() * clown.length);
      clown[chooseclown].style.pointerEvents = "all";
      clown[chooseclown].style.animation = "appears 2s ease";

      clown[chooseclown].addEventListener("animationend", () => {
        clown[chooseclown].style.pointerEvents = "all";
        clown[chooseclown].style.animation = "clowndown 0.5s ease";
        clown[chooseclown].addEventListener("animationend", () => {
          clown[chooseclown].style.pointerEvents = "none";
        });
      });
    }
  }, 1000);
});
