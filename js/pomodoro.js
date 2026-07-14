// ==========================================
// ------- Pomodoro Timer -------
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  let pomodoroTimeLeft = 1500; // 25 minutes in seconds
  let pomodoroTimerId = null;
  let pomodoroIsRunning = false;
  let pomodoroActiveModeSeconds = 1500;
  let pomodoroActiveLabel = 'Work Session';

  const timeDisplay = document.getElementById('pomodoro-time-display');
  const sessionLabel = document.getElementById('pomodoro-session-label');
  const cardSummary = document.getElementById('pomodoro-card-summary');
  const startBtn = document.getElementById('pomodoro-start');
  const pauseBtn = document.getElementById('pomodoro-pause');
  const resetBtn = document.getElementById('pomodoro-reset');
  const modesContainer = document.querySelector('.pomodoro-modes');

  // Format seconds into MM:SS
  function formatPomodoroTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // Update Displays
  function updatePomodoroUI() {
    const timeStr = formatPomodoroTime(pomodoroTimeLeft);

    if (timeDisplay) timeDisplay.textContent = timeStr;
    if (sessionLabel) sessionLabel.textContent = pomodoroActiveLabel;

    if (cardSummary) {
      if (pomodoroIsRunning) {
        cardSummary.textContent = `Focusing... ${timeStr} left`;
      } else if (pomodoroTimeLeft < pomodoroActiveModeSeconds) {
        cardSummary.textContent = `${timeStr} - Paused`;
      } else {
        cardSummary.textContent = `${formatPomodoroTime(pomodoroActiveModeSeconds)} ${pomodoroActiveLabel.toLowerCase()}`;
      }
    }
  }

  // Start Timer
  function startPomodoro() {
    if (pomodoroIsRunning) return;

    if (pomodoroTimerId) {
      clearInterval(pomodoroTimerId);
    }

    pomodoroIsRunning = true;
    toggleTimerButtons(true);

    pomodoroTimerId = setInterval(() => {
      if (pomodoroTimeLeft > 0) {
        pomodoroTimeLeft--;
        updatePomodoroUI();
      } else {
        handlePomodoroFinished();
      }
    }, 1000);

    updatePomodoroUI();
  }

  // Pause Timer
  function pausePomodoro() {
    if (!pomodoroIsRunning) return;

    clearInterval(pomodoroTimerId);
    pomodoroTimerId = null;
    pomodoroIsRunning = false;

    toggleTimerButtons(false);
    updatePomodoroUI();
  }

  // Reset Timer
  function resetPomodoro() {
    clearInterval(pomodoroTimerId);
    pomodoroTimerId = null;
    pomodoroIsRunning = false;
    pomodoroTimeLeft = pomodoroActiveModeSeconds;

    toggleTimerButtons(false);
    updatePomodoroUI();
  }

  // Toggle buttons helper
  function toggleTimerButtons(running) {
    if (running) {
      if (startBtn) startBtn.classList.add('hidden');
      if (pauseBtn) pauseBtn.classList.remove('hidden');
    } else {
      if (startBtn) startBtn.classList.remove('hidden');
      if (pauseBtn) pauseBtn.classList.add('hidden');
    }
  }

  // Timer complete alert
  function handlePomodoroFinished() {
    pausePomodoro();
    alert(`🔔 Timer Complete! Time for a change of pace.`);
    resetPomodoro();
  }

  // Switch modes
  function switchPomodoroMode(e) {
    const modeBtn = e.target.closest('.mode-btn');
    if (!modeBtn) return;

    const allModeButtons = document.querySelectorAll('.mode-btn');
    allModeButtons.forEach(btn => btn.classList.remove('active'));
    modeBtn.classList.add('active');

    const timeSeconds = parseInt(modeBtn.getAttribute('data-time'));
    const label = modeBtn.getAttribute('data-label');

    pomodoroActiveModeSeconds = timeSeconds;
    pomodoroActiveLabel = label;
    
    resetPomodoro();
  }

  // Bind Listeners
  if (startBtn) startBtn.addEventListener('click', startPomodoro);
  if (pauseBtn) pauseBtn.addEventListener('click', pausePomodoro);
  if (resetBtn) resetBtn.addEventListener('click', resetPomodoro);
  if (modesContainer) modesContainer.addEventListener('click', switchPomodoroMode);

  resetPomodoro();
});
