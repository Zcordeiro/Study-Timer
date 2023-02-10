const pomodoroDurationInput = document.getElementById("pomodoroDuration");
const shortRestInput = document.getElementById("shortRest");
const longRestInput = document.getElementById("longRest");
const timeDisplay = document.getElementById("time");
const startTimerBtn = document.getElementById("startTimer");
const pauseTimerBtn = document.getElementById("pauseTimer");
const stopTimerBtn = document.getElementById("stopTimer");
const pomodoroLabel = document.getElementById("pomodoroLabel");
const shortRestLabel = document.getElementById("shortRestLabel");
const longRestLabel = document.getElementById("longRestLabel");
const video = document.getElementById("backgroundVideo");
const videoPauseBtn = document.getElementById("videoPause");
const timerContainer = document.getElementById("timerBox");
const hideTimerBtn = document.getElementById("hideAllBtn");
const showTimerBtn = document.getElementById("showAllBtn");
const settingsMenu = document.getElementById("settingsMenu");
const hideSettingBtn = document.getElementById("hideSettingBtn");

let pomodoroDuration = 25;
let shortRest = 5;
let longRest = 15;
let workSessions = 0;
let breakSessions = 0;
let timerState = "pomodoro";
let timerInterval;

pomodoroDurationInput.value = pomodoroDuration;
shortRestInput.value = shortRest;
longRestInput.value = longRest;

pomodoroDurationInput.addEventListener("change", (e) => {
  pomodoroDuration = e.target.value;
  timeDisplay.textContent = num2time(pomodoroDuration * 60);
});

shortRestInput.addEventListener("change", (e) => {
  shortRest = e.target.value * 60;
});

longRestInput.addEventListener("change", (e) => {
  longRest = e.target.value * 60;
});

function num2time(num) {
  let minutes = Math.floor(num / 60);
  let seconds = num % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

startTimerBtn.addEventListener("click", () => {
  workSessions = 1;
  startTimer(pomodoroDuration * 60);
  pomodoroLabel.classList.add("activeTimer");
  startTimerBtn.classList.toggle('hidden');
  pauseTimerBtn.classList.toggle('hidden');
  stopTimerBtn.classList.remove('hidden');
});


function startTimer(duration) {
  let timeLeft = duration;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = num2time(timeLeft);
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      if (timerState === "pomodoro" && breakSessions < 2) {
        breakSessions++;
        timerState = "shortBreak";
        startTimer(shortRest);
        pomodoroLabel.classList.remove("activeTimer");
        longRestLabel.classList.remove("activeTimer");
        shortRestLabel.classList.add("activeTimer");
      } else if (
        workSessions === 3 &&
        breakSessions === 2 &&
        timerState === "pomodoro"
      ) {
        startTimer(longRest);
        timerState = "longBreak";
        workSessions = 0;
        breakSessions = 0;
        pomodoroLabel.classList.remove("activeTimer");
        longRestLabel.classList.add("activeTimer");
        shortRestLabel.classList.remove('activeTimer');
      } else {
        startTimer(pomodoroDuration);
        timerState = "pomodoro";
        workSessions++;
        pomodoroLabel.classList.add("activeTimer");
        longRestLabel.classList.remove('activeTimer');
        shortRestLabel.classList.remove('activeTimer');
      }
    }
  }, 1000);
}

function pomodoroStateTag() {

  let result = '';
  if(timerState === "pomodoro") {
    result = 'Work/Study';
    return result;
  } else if(timerState === "shortBreak") {
    result = 'Short Rest';
    return result;
  } else {
    result = 'Long Rest';
    return result;
}
}

pauseTimerBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTimerBtn.classList.toggle('hidden');
  pauseTimerBtn.classList.toggle('hidden');
});

stopTimerBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  stopTimerBtn.classList.add('hidden');
  startTimerBtn.classList.toggle('hidden');
  pauseTimerBtn.classList.toggle('hidden');
  workSessions = 0;
  breakSessions = 0;
  timerState = "pomodoro";
  timeDisplay.textContent = num2time(pomodoroDuration * 60);
  pomodoroLabel.classList.remove("activeTimer");
  longRestLabel.classList.remove("activeTimer");
  shortRestLabel.classList.remove("activeTimer");
});

function backgroundPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

function hideTimer() {
  showTimerBtn.classList.toggle('hidden');
  timerContainer.classList.toggle('hidden');
};

function showSettings() {
  settingsMenu.classList.toggle('hidden');
}

hideSettingBtn.addEventListener('click', showSettings);
hideTimerBtn.addEventListener('click', hideTimer);
showTimerBtn.addEventListener('click', hideTimer);
videoPauseBtn.addEventListener('click', backgroundPause);
