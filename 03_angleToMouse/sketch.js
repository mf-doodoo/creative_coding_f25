/*
+Colabor 2025 HSLU, Hanna Zuellig
Example shows how to use the mouse position and create a rotation to the mouse
*/

let xx = 0;
let yy = 0;

let tilesX = 2;
let tilesY = 2;
let gridX, gridY;




function setup() {
  createCanvas(windowWidth, windowHeight);
  gridX = width / tilesX;
  gridY = height / tilesY;


}

function draw() {
  background(0);
  stroke(255);

  // Use mouse position data
  xx = mouseX;
  yy = mouseY;


  drawGrid();
}


function drawGrid() {
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      //Rechne den Winkel zur Maus
      let winkel = atan2(yy - (y * gridY + gridY / 2), xx - (x * gridX + gridX / 2));
      if (winkel < 0) { winkel += 2 * PI; }

      push();
      translate(x * gridX + gridX / 2, y * gridY + gridY / 2);
      rotate(winkel);


      line(0, 0, gridX / 2, 0);


      pop();

    }

  }
}