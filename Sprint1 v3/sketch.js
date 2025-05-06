let canvasWidth = 800;
let canvasHeight = 800;

let micInstance;
let micLevel = 0;

var scaleFactor;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  /* Im setup einmalig Zugriff auf das Mikrofon
  */
 micInstance = new Mic("Start Mic"); //Parameter übergibt Beschriftung des Buttons

}

function draw() {
  background(0);


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
  /*
  for (let x = 10; x < canvasWidth; x += 10) {
    strokeWeight(3);
    line(x, 0, x, canvasHeight);
    }
  */


  // draw Rooms (x, y, width, height, depth)
  strokeWeight(0);
  fill(0);
  
  
    for (let ix = 0; ix < 20; ix++) {
      for (let iy = 0; iy < 20; iy++) {
        let baseX = ix * 50;
        let baseY = iy * 50;
    

        // -------------- WAVE EFFECTS --------------
        
        // Wave offset based on row or column,  swap ix/iy for direction
        //let waveOffset = sin(frameCount * 0.4 - iy * 0.6);
    
        //radial Wave
        let dx = ix - mouseX / 50;
        let dy = iy - mouseY / 50;
        let distance = sqrt(dx * dx + dy * dy);
        let waveOffset = sin(frameCount * 0.3 - distance * 0.5);

console.log(waveOffset)

        //spiral wave
        //let dx = ix - 10;
        //let dy = iy - 10;
        //let angle = atan2(dy, dx);
        //let radius = sqrt(dx * dx + dy * dy);
        //let waveOffset = sin(frameCount * 0.2 - radius * 0.5 + angle * 2);


        // Map wave to scale between 0.5 and 1.0
        let scaleFactor = map(waveOffset, -1, 1, 0.5, 1.0);
    
        // Apply micLevel and wave scale
        let w = 5 + scaleFactor * map(micLevel, 0, 255, 10, 100) * 0.3;
        let d = 10 + scaleFactor * map(micLevel, 0, 255, 10, 100) * 0.5;
        let h = 10 + scaleFactor * map(micLevel, 0, 255, 10, 100) * 0.2;
        let colorWave = map(scaleFactor * map(micLevel, 0, 255, 10, 100), 0, 255, 0,100);
    
        drawRoom(baseX, baseY, w, h, d, colorWave);
      }
    }
    
    //cursor replacement
    noCursor();
    drawRoom(mouseX, mouseY, 50, 50, 50, map(micLevel,0 , 255, 0, 100));

  }

  //color

function drawRoom(x, y, wallWidth, wallHeight, wallDepth, wallColor) {
  colorMode(HSB);
  
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

  // Right wall, clockwise
  fill(map(micLevel,0,255,0,360) * wallColor,100,100);
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

  // Left wall, clockwise
  fill(map(micLevel,0,255,0,360) * wallColor,100,100);
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

// Async function outside draw() to call listenMic
async function getMicLevel() {
  micLevel = await micInstance.listenMic();
}
