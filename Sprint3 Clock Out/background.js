let timerId = null;
let countdown = 0;

function getRandomDelay(minMinutes = 1, maxMinutes = 3) {
  // Random delay between min and max minutes
  return Math.floor(Math.random() * (maxMinutes - minMinutes + 1) + minMinutes) * 60 * 1000;
}

function getRandomCountdown(minSeconds = 5, maxSeconds = 30) {
  // Random countdown duration in seconds
  return Math.floor(Math.random() * (maxSeconds - minSeconds + 1) + minSeconds);
}

function startRandomTimer() {
  const delay = getRandomDelay();
  setTimeout(() => {
    countdown = getRandomCountdown();
    chrome.storage.local.set({ showTimer: true, countdown: countdown });
    runCountdown();
  }, delay);
}

function runCountdown() {
  timerId = setInterval(() => {
    countdown--;
    chrome.storage.local.set({ countdown: countdown });
    if (countdown <= 0) {
      clearInterval(timerId);
      chrome.storage.local.set({ showTimer: false });
      closeAllWindows();
      // Optionally, start the next random timer after closing
      setTimeout(startRandomTimer, 5000);
    }
  }, 1000);
}

function closeAllWindows() {
  chrome.windows.getAll({}, function(windows) {
    for (let win of windows) {
      chrome.windows.remove(win.id);
    }
  });
}

// Start the first random timer when extension loads
startRandomTimer();

chrome.storage.local.get(['key']).then((result) => {
  console.log(result.key);
});
