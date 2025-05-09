document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("scrollPosition", (data) => {
      document.getElementById("scroll-position").innerText = data.scrollPosition || 0;
    });
  });
  