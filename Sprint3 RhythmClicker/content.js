let canClick = false;
const beatWindow = 150;
let musicStarted = false;

// Create beat indicator
const indicator = document.createElement("div");
Object.assign(indicator.style, {
  position: "fixed",
  top: "10px",
  right: "10px",
  width: "30px",
  height: "30px",
  backgroundColor: "red",
  borderRadius: "50%",
  zIndex: 9999,
});
document.body.appendChild(indicator);

// Create audio
const audio = new Audio(chrome.runtime.getURL("music.mp3"));
// audio.play().then(() => {
//   console.log("Audio plays fine");
// }).catch(err => {
//   console.error("Audio failed to play", err);
// });
audio.crossOrigin = "anonymous";
audio.loop = true;

// Init Rythm
const rythm = new Rythm();
rythm.setMusic(audio);
rythm.setGain(2);

// start button
const startButton = document.createElement("button");
startButton.textContent = "Start Music";
Object.assign(startButton.style, {
  position: "fixed",
  top: "50px",
  right: "10px",
  zIndex: 10000,
});
document.body.appendChild(startButton);

startButton.addEventListener("click", () => {
  audio.play().then(() => {
    return rythm.start();
  }).then(() => {
    startButton.remove();
    // Optional: show a message "Now click on the beat!"
  });
});


// Click to start audio and rythm
document.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().then(() => {
      console.log("Audio playing...");
      return rythm.start();
    }).then(() => {
      musicStarted = true;
      startButton.remove(); // Remove start button after music starts
      console.log("Rythm started");

      // Safe to start analyser debug after Rythm is running
      const analyser = rythm._analyser;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function debugEnergy() {
        analyser.getByteFrequencyData(dataArray);
        const lowEnergy = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
        console.log("🔊 Low frequency energy:", lowEnergy);
        requestAnimationFrame(debugEnergy);
      }
      debugEnergy();

    }).catch((err) => {
      console.error("Failed to play/start Rythm:", err);
    });
  }
});

// Add pulse indicator
rythm.addRythm("debug-beat", "pulse", 0, 40, {
  onStart: () => {
    console.log("🎵 BEAT DETECTED");
    indicator.style.backgroundColor = "limegreen";
    setTimeout(() => {
      indicator.style.backgroundColor = "red";
    }, 150);
  }
});

// Allow clicks on beat
rythm.addRythm("click-window", "pulse", 0, 40, {
  onStart: () => {
    console.log("CLICK WINDOW OPEN");
    canClick = true;
    setTimeout(() => canClick = false, beatWindow);
  }
});

// Click guard
document.addEventListener("click", (e) => {
  if (!musicStarted) return; // Don't block clicks before music starts
  const target = e.target.closest("a, button, input[type='submit']");
  if (target && !canClick) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.warn("Click blocked: not on beat.");
  }
}, true);

