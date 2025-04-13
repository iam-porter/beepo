let baseMinutes = 0;
let baseSeconds = 3;
let pomodoro = 0;
let countdownInterval;

function breakTimer() {}

function countdownTimer() {
  if (baseSeconds !== 0) {
    baseSeconds--;
  } else {
    baseMinutes--;
    baseSeconds = 59;
  }

  if (baseMinutes === 0 && baseSeconds === 0) {
    clearInterval(countdownInterval);
  }

  const minutes = baseMinutes < 10 ? "0" + baseMinutes : baseMinutes;
  const seconds = baseSeconds < 10 ? "0" + baseSeconds : baseSeconds;

  timer.textContent = `00:${minutes}:${seconds}`;
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
  countdownInterval = setInterval(countdownTimer, 1000);
  startButton.disabled = true;
});

/* 
    TODO: break timer (pomodoro), longer break timer (after 4th pomodoro),
    and stop session. 
*/
