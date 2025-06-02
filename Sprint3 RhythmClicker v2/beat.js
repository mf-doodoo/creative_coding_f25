chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === 'start-beat') {
    const audioCtx = new AudioContext();
    const buffer = new Uint8Array(msg.buffer).buffer;
    const audioBuffer = await audioCtx.decodeAudioData(buffer);

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();

    // Beat detection (use the improved one here)
    const sampleRate = audioBuffer.sampleRate;
    const data = audioBuffer.getChannelData(0);
    const frameSize = 1024;
    const beatTimes = [];
    const energyHistory = [];
    const windowSize = 43;
    let lastBeatTime = -Infinity;

    for (let i = 0; i < data.length - frameSize; i += frameSize) {
      let sum = 0;
      for (let j = 0; j < frameSize; j++) {
        const sample = data[i + j];
        sum += sample * sample;
      }
      const energy = sum / frameSize;
      const avgEnergy = energyHistory.reduce((a, b) => a + b, 0) / energyHistory.length || 0;
      const currentTime = i / sampleRate;

      if (energy > avgEnergy * 1.3 && currentTime - lastBeatTime > 0.3) {
        beatTimes.push(currentTime);
        lastBeatTime = currentTime;
      }

      energyHistory.push(energy);
      if (energyHistory.length > windowSize) energyHistory.shift();
    }

    // Trigger visuals
    for (const beatTime of beatTimes) {
      const delay = beatTime * 1000 - audioCtx.currentTime * 1000;
      if (delay >= 0) {
        setTimeout(() => {
          const overlay = document.getElementById('beat-overlay');
          if (overlay) {
            overlay.style.backgroundColor = 'rgba(0,255,0,0.3)';
            overlay.style.pointerEvents = 'none';
            setTimeout(() => {
              overlay.style.backgroundColor = 'rgba(255,0,0,0.3)';
              overlay.style.pointerEvents = 'auto';
            }, 100);
          }
        }, delay);
      }
    }
  }
});
