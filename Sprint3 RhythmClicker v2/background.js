let audioCtx, sourceNode, beatTimes = [], startTime = 0;

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === 'start-looping-audio') {
    const arrayBuffer = new Uint8Array(msg.buffer).buffer;
    audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const play = () => {
      sourceNode = audioCtx.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.connect(audioCtx.destination);
      sourceNode.start();
      startTime = audioCtx.currentTime;

      // Schedule beats
      for (const beatTime of beatTimes) {
        const delay = beatTime * 1000;
        setTimeout(() => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'beat' });
            }
          });
        }, delay);
      }

      // Loop when done
      sourceNode.onended = () => {
        play();
      };
    };

    // Calculate beatTimes only once
    if (beatTimes.length === 0) {
      const data = audioBuffer.getChannelData(0);
      const sampleRate = audioBuffer.sampleRate;
      const frameSize = 1024;
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
    }

    play();
    sendResponse({ status: 'playing' });
  }
});
