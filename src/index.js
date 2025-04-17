let baseMinutes = 0;
let baseSeconds = 5;
let pomodoro = 0;
let countdownInterval;
let isBreak = false;
let tomatoes = [];

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
          // spawnTomato();
          if (pomodoro % 4 === 0) {
            baseMinutes = 0;
            baseSeconds = 30;
          } else {
            baseMinutes = 0;
            baseSeconds = 5;
          }
        } else {
          isBreak = false;
          baseMinutes = 0;
          baseSeconds = 10;
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

  console.log(pomodoro, isBreak);
}

function spawnTomato() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const tomato = document.createElement("img");
  const tomatoSize = 50; // 50x50
  tomato.setAttribute("src", "./public/shitty-tomato.svg");
  tomato.setAttribute("class", "tomato");

  const randomX = Math.floor(Math.random() * (viewportWidth - tomatoSize));
  const randomY = Math.floor(Math.random() * (viewportHeight - tomatoSize));

  // should spawn within the viewport, not on the viewport.
  tomato.style.left = randomX + "px";
  tomato.style.top = randomY + "px";

  document.body.appendChild(tomato);

  tomatoes.push(tomato);
}

function collision() {}

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
    TODO: make tomato bounce across the viewport. 
*/
