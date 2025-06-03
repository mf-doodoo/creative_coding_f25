// Create fullscreen overlay
let overlay = document.createElement('div');
overlay.id = 'screamlock-overlay';
overlay.innerHTML = `
  <div id="screamlock-box">
    <h2>Sorry!</h2>
    <p>You have to scream, to unlock the page.</p>
    <div id="noise-bar" style="width: 100%; background: #eee; height: 16px; border-radius: 8px; margin-top: 20px;">
      <div id="noise-bar-inner" style="width: 0%; height: 100%; background: #4caf50; border-radius: 8px;"></div>
    </div>
  </div>
`;
Object.assign(overlay.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.85)',
  zIndex: 999999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
});

document.body.appendChild(overlay);

// Style the box
const box = overlay.querySelector('#screamlock-box');
Object.assign(box.style, {
  background: '#fff',
  padding: '32px',
  borderRadius: '16px',
  textAlign: 'center',
  boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
  color: 'rgba(0,0,0,0.8)',
});

// Microphone logic
async function listenForNoise() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function createOverlay() {
      if (!document.getElementById('screamlock-overlay')) {
        document.body.appendChild(overlay);
      }
    }

    function removeOverlay() {
      const existingOverlay = document.getElementById('screamlock-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }
    }

    function checkVolume() {
      analyser.getByteTimeDomainData(dataArray);
      // Compute RMS (root mean square) volume
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        let val = (dataArray[i] - 128) / 128;
        sum += val * val;
      }
      const rms = Math.sqrt(sum / dataArray.length);
      const volume = rms * 100;

      // Update bar
      const bar = document.getElementById('noise-bar-inner');
      if (bar) {
        bar.style.width = Math.min(volume, 100) + '%';
      }

      // Threshold: adjust as needed (e.g., 20)
      if (volume > 50) {
        removeOverlay();
      } else {
        createOverlay();
      }

      requestAnimationFrame(checkVolume);
    }
    checkVolume();
  } catch (e) {
    box.innerHTML = "<p>Microphone access is required to unlock the page.</p>";
  }
}

listenForNoise();
