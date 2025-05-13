(function () {
  if (document.getElementById("tunnelblick-canvas")) return;

  const sketch = (p) => {
    let cnv;

    p.setup = () => {
      cnv = p.createCanvas(p.windowWidth, p.windowHeight);
      cnv.id("tunnelblick-canvas");
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

      const x = p.mouseX || window.lastMouseX || 0;
      const y = p.mouseY || window.lastMouseY || 0;

      p.erase();
      p.ellipse(x, y, 150);
      p.noErase();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new p5(sketch, document.body);
})();
