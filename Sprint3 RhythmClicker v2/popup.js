document.getElementById('startBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('audioFile');
  if (!fileInput.files[0]) return;

  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();
  const audioBytes = Array.from(new Uint8Array(arrayBuffer)); // sendable via message

  chrome.runtime.sendMessage({
  action: 'start-looping-audio',
  buffer: audioBytes
})

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject beat script if not yet
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['beat.js']
  });

  // Send audio data
  chrome.tabs.sendMessage(tab.id, {
    action: 'start-beat',
    buffer: audioBytes
  });
});
