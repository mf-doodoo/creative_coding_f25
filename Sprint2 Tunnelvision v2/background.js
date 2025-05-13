let isActive = false;

chrome.action.onClicked.addListener(async (tab) => {
  isActive = !isActive;

  if (isActive) {
    // Füge p5 + overlay.js hinzu
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["p5.min.js", "overlay.js"]
    });
  } else {
    // Entferne das Canvas via toggle.js
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["toggle.js"]
    });
  }
});
