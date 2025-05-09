console.log("mousePos running...");

/*
document.addEventListener('mousemove', (event) => {
    console.log(`Mouse position: X=${event.clientX}, Y=${event.clientY}`);
});
*/


// Send mouse position to background script when mouse is moved
/*
document.addEventListener("mousemove", (event) => {
    // Mausposition an Background schicken
    chrome.runtime.sendMessage({
      type: "mouse_position",
      x: event.screenX,
      y: event.screenY
    });
  }, { once: true });
  */

  let lastX = 0;
  let lastY = 0;
  
  document.addEventListener("mousemove", (event) => {
    lastX = event.screenX;
    lastY = event.screenY;
  }, true);
  
  setInterval(() => {
    chrome.runtime.sendMessage({
      type: "mouse_position",
      x: lastX,
      y: lastY
    });
  }, 100);
  