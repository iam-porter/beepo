let baseMinutes = 0;
let baseSeconds = 5;
let pomodoro = 0;
let countdownInterval;
let isBreak = false;

function stopInterval() {
  clearInterval(countdownInterval);
}

function resetInterval() {
  clearInterval(countdownInterval);
  countdownTimer();
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

        resetInterval();
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
const startButton = document.createElement("button");

logoBrand.setAttribute("src", "./public/logo-brand.svg");
logoBrand.setAttribute("class", "logo-brand");
timer.setAttribute("class", "pomodoro-timer");
startButton.setAttribute("class", "start-button");
startButton.textContent = "Start timer";

timer.textContent = "00:25:00";

document.body.appendChild(logoBrand);
document.body.appendChild(timer);
document.body.appendChild(startButton);

// disable this button after clicking
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  countdownTimer();
});

/* 
    TODO: break timer (pomodoro), longer break timer (after 4th pomodoro),
    and stop session. 
*/
