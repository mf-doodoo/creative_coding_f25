document.addEventListener('wheel', e => e.preventDefault(), { passive: false });
document.addEventListener('keydown', e => {
  if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(e.key)) {
    e.preventDefault();
  }
}, { passive: false });

async function startMicScroll() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const micSource = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;

  const buffer = new Uint8Array(analyser.frequencyBinCount);
  micSource.connect(analyser);

  function getVolume() {
    analyser.getByteFrequencyData(buffer);
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i];
    }
    return sum / buffer.length;
  }

  function scrollLoop() {
    const volume = getVolume(); // volume range ~0–100+
    const deadzone = 10;        // no scroll when volume is too low
    const center = 40;          // midpoint: volume < 30 = up, volume > 30 = down
    const strength = volume - center;

    if (Math.abs(strength) > deadzone) {
      const direction = strength > 0 ? 1 : -1;
      const speed = Math.abs(strength) * 1.5;
      window.scrollBy(0, direction * speed);
    }

    requestAnimationFrame(scrollLoop);
  }

  scrollLoop();
}

startMicScroll().catch(console.error);
