if (!document.getElementById('beat-overlay')) {
  const overlay = document.createElement('div');
  overlay.id = 'beat-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    zIndex: 999999,
    pointerEvents: 'none',
    transition: 'background-color 0.2s ease',
  });
  document.body.appendChild(overlay);

  chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'beat') {
    const overlay = document.getElementById('beat-overlay');
    if (overlay) {
      overlay.style.backgroundColor = 'rgba(0,255,0,0.3)';
      overlay.style.pointerEvents = 'none';
      setTimeout(() => {
        overlay.style.backgroundColor = 'rgba(255,0,0,0.3)';
        overlay.style.pointerEvents = 'auto';
      }, 100);
    }
  }
});
;
;
}
