// Create overlay
const overlay = document.createElement('div');
overlay.id = 'countdown-overlay';
overlay.style.position = 'fixed';
overlay.style.top = '20px';
overlay.style.right = '20px';
overlay.style.background = 'rgba(0,0,0,0.8)';
overlay.style.color = '#fff';
overlay.style.padding = '20px';
overlay.style.fontSize = '2em';
overlay.style.borderRadius = '10px';
overlay.style.zIndex = '99999';
overlay.style.display = 'none';
document.body.appendChild(overlay);

// Listen for countdown updates
function updateOverlay(countdown, show) {
  if (show && countdown > 0) {
    overlay.textContent = `Time left: ${countdown}s`;
    overlay.style.display = 'block';
  } else {
    overlay.style.display = 'none';
  }
}

// Poll storage for changes
setInterval(() => {
  chrome.storage.local.get(['showTimer', 'countdown'], (data) => {
    updateOverlay(data.countdown, data.showTimer);
  });
}, 500);
