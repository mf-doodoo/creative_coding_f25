// Entferne Canvas
const canvas = document.getElementById("tunnelblick-canvas");
if (canvas) {
  canvas.remove();
}

// Entferne zugehörige p5-Instanz, falls vorhanden
if (window.p5 && window.p5.instance && window.p5.instance.remove) {
  try {
    window.p5.instance.remove();
  } catch (e) {
    console.warn("p5 remove() failed", e);
  }
}

// Alternativ: Alle p5-Instanzen entfernen
if (window.p5 && window.p5.instance) {
  window.p5.instance.remove();
}
if (window._p5Instances && Array.isArray(window._p5Instances)) {
  window._p5Instances.forEach(inst => inst.remove());
  window._p5Instances.length = 0;
}
