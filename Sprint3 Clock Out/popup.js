function updateTimerDisplay(seconds) {
  const timerDiv = document.getElementById('timer');
  if (seconds > 0) {
    timerDiv.textContent = `Time left: ${seconds}s`;
  } else {
    timerDiv.textContent = '';
  }
}

function checkTimer() {
  chrome.storage.local.get(['showTimer', 'countdown'], (data) => {
    if (data.showTimer && data.countdown > 0) {
      updateTimerDisplay(data.countdown);
    } else {
      updateTimerDisplay(0);
    }
  });
}

setInterval(checkTimer, 500);
checkTimer();
