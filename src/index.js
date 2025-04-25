let baseMinutes = 25;
let baseSeconds = 0;
let pomodoro = 0;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const tomatoSize = 50; // 50x50
let currentTheme = document.documentElement.getAttribute("data-theme");

let countdownInterval;
let isBreak = false;
let tomatoes = [];
let isAnimating = false;

const topBar = document.createElement("div");
topBar.setAttribute("class", "top-bar");

const logoBrand = document.createElement("img");
logoBrand.setAttribute("src", "./public/logo-light.svg");
logoBrand.setAttribute("class", "logo-brand button");
logoBrand.setAttribute("id", "logo-button");

const timer = document.createElement("time");
timer.setAttribute("class", "pomodoro-timer");
timer.textContent = "00:25:00";

const buttonContainer = document.createElement("div");
buttonContainer.setAttribute("class", "button-container");

const startTimer = document.createElement("button");
startTimer.setAttribute("class", "button button-reset");
startTimer.setAttribute("id", "start-timer");
startTimer.textContent = "Start timer";

const stopTimer = document.createElement("button");
stopTimer.setAttribute("class", "button button-reset");
stopTimer.setAttribute("id", "stop-timer");
stopTimer.setAttribute("disabled", true);
stopTimer.textContent = "Stop timer";

const streakCount = document.createElement("span");
streakCount.setAttribute("id", "streak-count");
streakCount.textContent = `Streak: x${pomodoro}`;

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

// toggle dark mode
logoBrand.addEventListener("click", () => {
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    currentTheme = "light";
    logoBrand.setAttribute("src", "./public/logo-dark.svg");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    currentTheme = "dark";
    logoBrand.setAttribute("src", "./public/logo-light.svg");
  }
});

/* 
    TODO: add dark mode, edit/set timer (pomodoro, break, and long break). 
*/
