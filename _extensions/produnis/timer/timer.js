// Credit: Mateusz Rybczonec

// dash array value is the circumference of the circle radius (here 45)
const FULL_DASH_ARRAY = 2 * Math.PI * 45;
// the second limits for color change
const THRESHOLDS = [10, 5];

// Funktion zur Initialisierung des Timers in einem Container
function initializeTimer(containerId, timeLimit, startOn) {

  let timePassed = 0;
  let timeLeft = timeLimit;
  let intervalId = null;

  // Dynamisches Erstellen des Timer-HTML-Inhalts für jeden Container
  document.getElementById(containerId).innerHTML = `
    <div class="base-timer">
      <svg id="${containerId}-timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle id="${containerId}-circle" class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="${containerId}-path-remaining"
            stroke-dasharray="${FULL_DASH_ARRAY}"
            class="base-timer__path-remaining"
            d="M 50 50 m 0 -45 a 45 45 0 0 1 0 90 a 45 45 0 0 1 0 -90">
          </path>
          <text id="${containerId}-label" x="50%" y ="50%" dominant-baseline="middle" text-anchor="middle">
            ${formatTime(timeLeft)}
          </text>
        </g>
      </svg>
    </div>
    `;

  document.getElementById(`${containerId}-timer-svg`).addEventListener("click", () => {
    restartTimer();
  });

  if (startOn !== "interaction") {
    startTicking();
  }

  function startTicking() {
    if (intervalId !== null) return;
    intervalId = setInterval(() => {
      if (startOn === 'slide' && isHidden()) return;

      timePassed += 1;
      timeLeft = timeLimit - timePassed;

      document.getElementById(`${containerId}-label`).innerHTML = formatTime(timeLeft);
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, 1000);
  }

  function restartTimer() {
    timePassed = 0;
    timeLeft = timeLimit;

    document.getElementById(`${containerId}-label`).innerHTML = formatTime(timeLeft);
    const path = document.getElementById(`${containerId}-path-remaining`);
    path.classList.remove('lvl0', 'lvl1');
    setCircleDasharray();

    startTicking();
  }

  function isHidden() {
    let timecont = document.getElementById(containerId);
    let ancestor = timecont.parentNode;

    // look if the section element, the 'slide', is visible
    while (ancestor.tagName !== "SECTION") {
      ancestor = ancestor.parentNode;
    }
    return ancestor.hidden;
  }

  // Funktion zur Formatierung der verbleibenden Zeit
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  // Funktion zur Festlegung der Farbe des verbleibenden
  // Pfades basierend auf der verbleibenden Zeit
  function setRemainingPathColor(timeLeft) {
    const pathId = `${containerId}-path-remaining`;

    for ( let i = 0; i < THRESHOLDS.length; i+=1 ) {
      if (timeLeft < THRESHOLDS[i]) {
        document.getElementById(pathId).classList.remove(`lvl${i-1}`);
        document.getElementById(pathId).classList.add(`lvl${i}`);
      }
    }
  }

  // Funktion zur Festlegung der Strichlänge des verbleibenden
  // Pfades basierend auf dem Anteil der verstrichenen Zeit
  function setCircleDasharray() {
    let circle_proportions = timeLeft / timeLimit * FULL_DASH_ARRAY + " ";
    circle_proportions += (1 - timeLeft / timeLimit) * FULL_DASH_ARRAY;

    document
      .getElementById(`${containerId}-path-remaining`)
      .setAttribute("stroke-dasharray", circle_proportions);
  }
}
