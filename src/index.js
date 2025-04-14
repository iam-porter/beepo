let baseMinutes = 0;
let baseSeconds = 5;
let pomodoro = 0;
let countdownInterval;
let isBreak = false;

function stopInterval() {
  clearInterval(countdownInterval);
}

function resetCountdownTimer() {
  clearInterval(countdownInterval);
  countdownTimer();
}

function stopSession() {
  clearInterval(countdownInterval);
  timer.textContent = "00:25:00";
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
  }, 1000);

  console.log(pomodoro, isBreak);
}

const logoBrand = document.createElement("img");
const timer = document.createElement("time");
const buttonContainer = document.createElement("div");
const startTimer = document.createElement("button");
const stopTimer = document.createElement("button");

logoBrand.setAttribute("src", "./public/logo-brand.svg");
logoBrand.setAttribute("class", "logo-brand");
buttonContainer.setAttribute("class", "button-container");
timer.setAttribute("class", "pomodoro-timer");
startTimer.setAttribute("class", "button");
stopTimer.setAttribute("class", "button");
stopTimer.setAttribute("disabled", true);

startTimer.textContent = "Start timer";
stopTimer.textContent = "Stop timer";
timer.textContent = "00:25:00";

document.body.appendChild(logoBrand);
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
    TODO: display streaks (pomodoro). 
*/
