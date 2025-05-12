function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style('pointer-events', 'none'); // wichtig für Webseiten-Interaktion
  cnv.style('z-index', '999999');
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  noStroke();
}

function draw() {
  clear(); // macht den Hintergrund des Canvas transparent

  // Schwarzes Overlay
  fill(0, 255); // 200 = leicht transparent, 255 = voll schwarz
  rect(0, 0, width, height);

  // Loch an Mausposition
  erase();
  ellipse(mouseX-50, mouseY, 120, 80);
  ellipse(mouseX+50, mouseY, 120, 80);
  noErase();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
