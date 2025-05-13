(function() {
  if (window.__tunnelblickCanvasLoaded) return;
  window.__tunnelblickCanvasLoaded = true;

  const sketch = (p) => {
    p.setup = () => {
      let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.position(0, 0);
      cnv.style('pointer-events', 'none');
      cnv.style('z-index', '999999');
      cnv.style('position', 'fixed');
      cnv.style('top', '0');
      cnv.style('left', '0');
      p.noStroke();
    };

    p.draw = () => {
      p.clear();
      p.fill(0, 200);
      p.rect(0, 0, p.width, p.height);

      p.erase();
      p.ellipse(p.mouseX, p.mouseY, 150);
      p.noErase();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new p5(sketch, document.body);
})();
