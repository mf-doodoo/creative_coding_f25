function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style('position', 'absolute'); // <-- instead of fixed
  cnv.style('top', '0px');
  cnv.style('left', '0px');
  background(30);
}


function draw() {
  background(255, 255, 255);
  ellipse(mouseX, mouseY, 50, 50);
}

// Automatically resize canvas on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

