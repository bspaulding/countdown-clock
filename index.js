const params = new URLSearchParams(document.location.search);
const autoStart = params.get("start") !== "false";
const minutes = parseInt(params.get("minutes"), 10) || 99;
const seconds = parseInt(params.get("seconds"), 10) || 0;
const totalSeconds = minutes * 60 + seconds;

const clockEl = document.querySelector(".clock:not(.ghost)");
render(totalSeconds, clockEl);

let start = 0;
let lastUpdatedSeconds = 0;
function tick(t) {
  if (!start) {
    start = t;
  }
  const secondsSinceStart = Math.floor((t - start) / 1000);
  const secondsLeft = totalSeconds - secondsSinceStart;

  if (secondsSinceStart !== lastUpdatedSeconds) {
    lastUpdatedSeconds = secondsSinceStart;

    render(secondsLeft, clockEl);
  }

  if (secondsLeft > 0) {
    window.requestAnimationFrame(tick);
  } else {
    clockEl.classList.add("done");
    console.log("timer completed! stopping");
  }
}

clockEl.addEventListener("click", initAndStart);

function initAndStart() {
  start = 0;
  lastUpdatedSeconds = 0;
  render(totalSeconds, clockEl);
  window.requestAnimationFrame(tick);
}

function padWith(c, n) {
  return n < 10 ? `${c}${n}` : `${n}`;
}

function render(secondsLeft, clockEl) {
  const minutesRem = Math.floor(secondsLeft / 60);
  const secondsRem = Math.floor(secondsLeft % 60);
  const minutesEl = clockEl.querySelector(".minutes");
  const secondsEl = clockEl.querySelector(".seconds");

  minutesEl.innerHTML = padWith("&nbsp;", minutesRem);
  secondsEl.innerHTML = padWith("0", secondsRem);
}

if (autoStart) {
  initAndStart();
}
