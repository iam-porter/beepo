let baseMinutes = 25;
let baseSeconds = 0;
let pomodoro = 0;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const tomatoSize = 50; // 50x50

let countdownInterval;
let isBreak = false;
let tomatoes = [];
let isAnimating = false;

const topBar = document.createElement("div");
const logoBrand = document.createElement("img");
const timer = document.createElement("time");
const buttonContainer = document.createElement("div");
const startTimer = document.createElement("button");
const stopTimer = document.createElement("button");
const streakCount = document.createElement("span");

topBar.setAttribute("class", "top-bar");
logoBrand.setAttribute("src", "./public/logo-brand.svg");
logoBrand.setAttribute("class", "logo-brand");
streakCount.setAttribute("id", "streak-count");
buttonContainer.setAttribute("class", "button-container");
timer.setAttribute("class", "pomodoro-timer");
startTimer.setAttribute("class", "button");
startTimer.setAttribute("id", "start-timer");
stopTimer.setAttribute("class", "button");
stopTimer.setAttribute("id", "stop-timer");
stopTimer.setAttribute("disabled", true);

function stopInterval() {
  clearInterval(countdownInterval);
}

function resetCountdownTimer() {
  clearInterval(countdownInterval);
  countdownTimer();
}

function stopSession() {
  clearInterval(countdownInterval);
  pomodoro = 0;
  timer.textContent = "00:25:00";
  streakCount.textContent = `streak: x0`;
  tomatoes = [];
  isAnimating = false;
  const tomatoesOnScreen = document.getElementsByClassName("tomato");

  for (let i = 0; i < tomatoesOnScreen.length; i++) {
    tomatoesOnScreen[i].remove();
  }
}

function countdownTimer() {
  countdownInterval = setInterval(() => {
    if (baseSeconds === 0) {
      if (baseMinutes > 0) {
        baseMinutes--;
        baseSeconds = 59;
      } else {
        stopInterval();

        if (!isBreak) {
          isBreak = true;
          pomodoro++;
          spawnTomato();

          if (!isAnimating) {
            animateTomato();
            isAnimating = true;
          }

          if (pomodoro % 4 === 0) {
            baseMinutes = 15;
            baseSeconds = 0;
          } else {
            baseMinutes = 5;
            baseSeconds = 0;
          }
        } else {
          isBreak = false;
          baseMinutes = 25;
          baseSeconds = 0;
        }
        resetCountdownTimer();
      }
    } else {
      baseSeconds--;
    }

    const minutes = baseMinutes < 10 ? "0" + baseMinutes : baseMinutes;
    const seconds = baseSeconds < 10 ? "0" + baseSeconds : baseSeconds;

    timer.textContent = `00:${minutes}:${seconds}`;
    streakCount.textContent = `streak: x${pomodoro}`;
  }, 1000);

  // console.log(pomodoro, isBreak);
}

function spawnTomato() {
  const tomato = document.createElement("img");
  tomato.setAttribute("src", "./public/shitty-tomato.svg");
  tomato.setAttribute("class", "tomato");

  const randomX = Math.floor(Math.random() * (viewportWidth - tomatoSize));
  const randomY = Math.floor(Math.random() * (viewportHeight - tomatoSize));

  // this sets the initial position of the tomato.
  tomato.posX = randomX;
  tomato.posY = randomY;
  tomato.dx = 1;
  tomato.dy = -1;

  tomatoes.push(tomato);
  document.body.appendChild(tomato);
}

function animateTomato() {
  tomatoes.forEach((tomato) => {
    if (tomato.posX >= viewportWidth - tomatoSize || tomato.posX <= 0) {
      tomato.dx *= -1;
    }
    if (tomato.posY > viewportHeight - tomatoSize || tomato.posY <= 0) {
      tomato.dy *= -1;
    }

    tomato.posX += tomato.dx;
    tomato.posY += tomato.dy;

    tomato.style.left = tomato.posX + "px";
    tomato.style.top = tomato.posY + "px";
  });

  requestAnimationFrame(animateTomato);
}

timer.textContent = "00:25:00";
startTimer.textContent = "Start timer";
stopTimer.textContent = "Stop timer";
streakCount.textContent = `streak: x${pomodoro}`;

topBar.appendChild(logoBrand);
topBar.appendChild(streakCount);
document.body.appendChild(topBar);
document.body.appendChild(timer);
buttonContainer.appendChild(startTimer);
buttonContainer.appendChild(stopTimer);
document.body.appendChild(buttonContainer);

startTimer.addEventListener("click", () => {
  startTimer.disabled = true;
  stopTimer.disabled = false;
  countdownTimer();
});

stopTimer.addEventListener("click", () => {
  stopSession();
  startTimer.disabled = false;
  stopTimer.disabled = true;
});

/* 
    TODO: make logo clickable to change timer parameters. 
*/
