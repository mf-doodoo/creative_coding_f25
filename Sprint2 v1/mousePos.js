console.log("mousePos running...");

/*
document.addEventListener('mousemove', (event) => {
    console.log(`Mouse position: X=${event.clientX}, Y=${event.clientY}`);
});
*/

document.addEventListener("mousemove", (event) => {
    // Mausposition an Background schicken
    chrome.runtime.sendMessage({
      type: "mouse_position",
      x: event.screenX,
      y: event.screenY
    });
  }, { once: true });