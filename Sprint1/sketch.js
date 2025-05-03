let canvasWidth = 800;
let canvasHeight = 800;

let micInstance;
let micLevel = 0;

colorMode(HSB);

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  /* Im setup einmalig Zugriff auf das Mikrofon
  */
 micInstance = new Mic("Start Mic"); //Parameter übergibt Beschriftung des Buttons

}

function draw() {
  background(220);
  //let angleBG = frameCount*0.01
  //rotate(angleBG)

  /**
  * User muss mit der Seite interagieren, um Zugriff auf das Mikrofon zu erhalten
  */
  if (micInstance && micInstance.started) {
    /**
    * In jedem Frame wird die aktuelle Lautstärke erfragt 
    * Werte die zurückkommen, gehen von 0 bis 255
    * allenfalls umwandeln
    */
    getMicLevel();
  
    //console.log(micLevel)
  

  // background lines
  for (let x = 10; x < canvasWidth; x += 10) {
    strokeWeight(3);
    let winkel = atan2(mouseX, mouseY);

    push();
    translate(canvasWidth / 2, canvasHeight / 2);
    rotate(winkel);
    line(x-canvasWidth, 0 - canvasHeight, x, canvasHeight);

    pop();
    }

  // draw Rooms (x, y, width, height, depth)
  strokeWeight(0);
  fill(0);
  
  for(let ix = 0; ix < 20; ix++){
    for(let iy = 0; iy < 20; iy++){
      drawRoom(ix * 50, iy * 50, 5 + mouseX * 0.3, 10, 10 + map(micLevel,0,255,10,230) * 0.5)

    }
  }
  
  //drawRoom(50, 50, 50, 50, 50);

  // draw ellipse objects (x ,y, inverted # of layers, height)
  //drawEllipse(50, mouseY, 12, 80);
  //drawEllipse(mouseY * 0.8, mouseX * 0.4, 14, 50);

  }


function drawRoom(x, y, wallWidth, wallHeight, wallDepth) {
  // Upper wall, black, clockwise
  fill(0);
  quad(
    x,
    y,
    x + wallWidth,
    y,
    x + wallWidth,
    y + wallHeight,
    x,
    y + wallHeight
  );

  // Right wall, red, clockwise
  fill(255);
  quad(
    x + wallWidth,
    y,
    x + wallWidth + wallDepth,
    y + wallDepth,
    x + wallWidth + wallDepth,
    y + wallHeight + wallDepth,
    x + wallWidth,
    y + wallHeight
  );

  // Left wall, green, clockwise
  fill(255);
  quad(
    x,
    y,
    x + wallDepth,
    y + wallDepth,
    x + wallDepth,
    y + wallHeight + wallDepth,
    x,
    y + wallHeight
  );

  // Lower wall, blue, clockwise
  fill(0);
  quad(
    x + wallDepth,
    y + wallHeight + wallDepth,
    x + wallWidth + wallDepth,
    y + wallHeight + wallDepth,
    x + wallWidth + wallDepth,
    y + wallDepth,
    x + wallDepth,
    y + wallDepth
  );
  }

function drawEllipse(ellipseX, ellipseY, ellipseLayers, baseHeight) {
  // ellipses
  for (ellipseLayers; ellipseLayers < 20; ellipseLayers++) {
    let ellipseHeight = baseHeight + (ellipseLayers - 10) * 10;
    if (ellipseLayers % 2 == 0) {
      fill(0);
    } else {
      fill(255);
    }
    strokeWeight(1);
    ellipse(ellipseX, ellipseY, 20 * 20 - ellipseLayers * 20, ellipseHeight);
  }
  }
}

// ✅ Async function outside draw() to call listenMic
async function getMicLevel() {
  micLevel = await micInstance.listenMic();
}
