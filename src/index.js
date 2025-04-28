let baseHours = 0;
let baseMinutes = 25;
let baseSeconds = 0;
let pomodoro = 0;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const tomatoSize = 50; // 50x50

let currentTheme = document.documentElement.getAttribute("data-theme");
let countdownInterval;
let timerInterval;
let isBreak = false;
let tomatoes = [];
let isAnimating = false;
let shortBeep = new Audio("./public/sfx/short-break.wav");
let longBeep = new Audio("./public/sfx/long-break.wav");

const topBar = document.createElement("div");
topBar.setAttribute("class", "top-bar");

const logoBrand = document.createElement("img");
logoBrand.setAttribute("src", "./public/imgs/logo-light.svg");
logoBrand.setAttribute("class", "logo-brand button");
logoBrand.setAttribute("id", "logo-button");

const timerContainer = document.createElement("span");
const timerHours = document.createElement("time");
const timerMinutes = document.createElement("time");
const timerSeconds = document.createElement("time");
timerContainer.setAttribute("class", "pomodoro-timer");
timerHours.textContent =
  baseHours < 10 ? "0" + baseHours + ":" : baseHours + ":";
timerMinutes.textContent =
  baseMinutes < 10 ? "0" + baseMinutes + ":" : baseMinutes + ":";
timerSeconds.textContent = baseSeconds < 10 ? "0" + baseSeconds : baseSeconds;

const timerActions = document.createElement("div");
timerActions.setAttribute("class", "timer-actions-container");

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
  setTimeout(() => countdownTimer(), 3000);
}

function stopSession() {
  clearInterval(countdownInterval);
  pomodoro = 0;
  baseHours = 0;
  baseMinutes = 25;
  baseSeconds = 0;
  timerHours.textContent =
    baseHours < 10 ? "0" + baseHours + ":" : baseHours + ":";
  timerMinutes.textContent =
    baseMinutes < 10 ? "0" + baseMinutes + ":" : baseMinutes + ":";
  timerSeconds.textContent = baseSeconds < 10 ? "0" + baseSeconds : baseSeconds;
  streakCount.textContent = `Streak: x0`;
  tomatoes = [];
  isAnimating = false;
  const tomatoesOnScreen = document.querySelectorAll(".tomato");

  if (tomatoesOnScreen.length > 0) {
    tomatoesOnScreen.forEach((item) => item.remove());
  }
}

function countdownTimer() {
  countdownInterval = setInterval(() => {
    if (baseSeconds === 0) {
      if (baseHours > 0 && baseMinutes === 0) {
        baseHours--;
        baseMinutes = 59;
        baseSeconds = 59;
      } else if (baseMinutes > 0) {
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
            longBeep.play();
            baseMinutes = 15;
            baseSeconds = 0;
          } else {
            longBeep.play();
            baseMinutes = 5;
            baseSeconds = 0;
          }
        } else {
          shortBeep.play();
          isBreak = false;
          baseMinutes = 25;
          baseSeconds = 0;
        }
        resetCountdownTimer();
      }
    } else {
      baseSeconds--;
    }

    const hours = baseHours < 10 ? "0" + baseHours + ":" : baseHours + ":";
    const minutes =
      baseMinutes < 10 ? "0" + baseMinutes + ":" : baseMinutes + ":";
    const seconds = baseSeconds < 10 ? "0" + baseSeconds : baseSeconds;

    timerHours.textContent = `${hours}`;
    timerMinutes.textContent = `${minutes}`;
    timerSeconds.textContent = `${seconds}`;

    streakCount.textContent = `Streak: x${pomodoro}`;
  }, 1000);

  // console.log(pomodoro, isBreak);
}

function adjustTimer(event, element) {
  event.preventDefault();

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (event.deltaY < 0) {
      if (element === timerHours) {
        if (baseHours < 99) {
          baseHours++;
        }
      } else if (element === timerMinutes) {
        if (baseMinutes < 59) {
          baseMinutes++;
        }
      } else {
        if (baseSeconds < 59) {
          baseSeconds++;
        }
      }
    } else {
      if (element === timerHours) {
        if (baseHours > 0) {
          baseHours--;
        }
      } else if (element === timerMinutes) {
        if (baseMinutes > 0) {
          baseMinutes--;
        }
      } else {
        if (baseSeconds > 0) {
          baseSeconds--;
        }
      }
    }

    timerHours.textContent =
      baseHours < 10 ? "0" + baseHours + ":" : baseHours + ":";
    timerMinutes.textContent =
      baseMinutes < 10 ? "0" + baseMinutes + ":" : baseMinutes + ":";
    timerSeconds.textContent =
      baseSeconds < 10 ? "0" + baseSeconds : baseSeconds;

    clearInterval(timerInterval);
  }, 100);
}

function spawnTomato() {
  const tomato = document.createElement("img");
  tomato.setAttribute("src", "./public/imgs/shitty-tomato.svg");
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

// top icons
topBar.appendChild(logoBrand);
topBar.appendChild(streakCount);

// timer
timerContainer.appendChild(timerHours);
timerContainer.appendChild(timerMinutes);
timerContainer.appendChild(timerSeconds);

// timer actions
timerActions.appendChild(startTimer);
timerActions.appendChild(stopTimer);

document.body.appendChild(topBar);
document.body.appendChild(timerContainer);
document.body.appendChild(timerActions);

timerHours.addEventListener("wheel", (event) => adjustTimer(event, timerHours));
timerMinutes.addEventListener("wheel", (event) =>
  adjustTimer(event, timerMinutes)
);
timerSeconds.addEventListener("wheel", (event) =>
  adjustTimer(event, timerSeconds)
);

startTimer.addEventListener("click", () => {
  startTimer.disabled = true;
  stopTimer.disabled = false;
  shortBeep.play();
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
    logoBrand.setAttribute("src", "./public/imgs/logo-dark.svg");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    currentTheme = "dark";
    logoBrand.setAttribute("src", "./public/imgs/logo-light.svg");
  }
});
