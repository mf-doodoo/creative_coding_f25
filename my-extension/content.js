// Content script (content.js)
const blackDiv = document.createElement("div");
blackDiv.style.position = "fixed";
blackDiv.style.top = "10px";
blackDiv.style.left = "10px";
blackDiv.style.width = "95vw";
blackDiv.style.height = "95vh";
blackDiv.style.backgroundColor = "black";
blackDiv.style.zIndex = "9999";
blackDiv.style.opacity = "0";
blackDiv.style.transition = "opacity 0.1s linear";
blackDiv.style.pointerEvents = "none";
document.body.appendChild(blackDiv);

function updateScrollEffects() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const opacity = Math.min(scrollY / (maxScroll || 1), 1);
  blackDiv.style.opacity = opacity.toString();
}

// Throttle scroll events for better performance
let isScrolling;
window.addEventListener("scroll", () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(updateScrollEffects, 50);
}, false);

// Initial update
updateScrollEffects();
