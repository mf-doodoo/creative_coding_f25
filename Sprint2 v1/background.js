console.log("Background.js running...");


// -------- move window on icon click -----------
/*
chrome.action.onClicked.addListener(async () => {
    console.log("icon clicked");

    
    const window = await chrome.windows.getCurrent();
    const newLeft = (window.left || 0) + 500;
    const newTop = (window.top || 0) + 500;

    await chrome.windows.update(window.id, {
        left: newLeft,
        top: newTop,
    });

    console.log(`Window moved to new position: ${newLeft}, top: ${newTop}`);
});
*/

// -------- move window away from mouse -----------
/*
chrome.action.onClicked.addListener(async (tab) => {
    console.log("icon clicked");
  
    // get mouse position in the current tab
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["mousePos.js"]
    });
  });
  
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "mouse_position") {
      console.log("got mouse position:", message.x, message.y);
  
      const windowInfo = await chrome.windows.getCurrent();
  
      // move window away from mouse position
      let newLeft = windowInfo.left;
      let newTop = windowInfo.top;
  
      if (message.x - windowInfo.left < 200) {
        newLeft += 200; // mouse is right – go right
        console.log("mouse is right – go right");
      } else {
        newLeft -= 200; // mouse is left – go left
        console.log("mouse is left – go left");
      }
  
      if (message.y - windowInfo.top < 200) {
        newTop += 200;  // mouse is below – go down
      } else {
        newTop -= 200;  // mouse is above – go up
      }
  
      await chrome.windows.update(windowInfo.id, {
        left: newLeft,
        top: newTop
      });
  
      console.log(`window moves to: X, Y (${newLeft}, ${newTop})`);
    }
  });
  */

  let lastMove = 0;

  chrome.action.onClicked.addListener(async (tab) => {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["mousePos.js"]
    });
  });
  
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type !== "mouse_position") return;
  
    const now = Date.now();
    if (now - lastMove < 50) return;
    lastMove = now;
  
    const windowInfo = await chrome.windows.getCurrent();
  
    const windowCenterX = windowInfo.left + windowInfo.width / 2;
    const windowCenterY = windowInfo.top + windowInfo.height / 2;
  
    const dx = windowCenterX - message.x;
    const dy = windowCenterY - message.y;
  
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 50) return;
  
    const normalize = (value) => value / distance;
  
    const directionX = normalize(dx);
    const directionY = normalize(dy);
  
    // Dynamische Schrittweite mit Trägheit (z. B. max 30 px pro Schritt)
    const maxStep = 30;
    const minStep = 4;
    const stepScale = Math.min(maxStep, Math.max(minStep, distance / 20));
  
    const moveX = Math.round(directionX * stepScale);
    const moveY = Math.round(directionY * stepScale);
  
    await chrome.windows.update(windowInfo.id, {
      left: windowInfo.left + moveX,
      top: windowInfo.top + moveY
    });
  });