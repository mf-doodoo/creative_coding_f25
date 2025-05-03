/*
+Colabor 2025 HSLU, Hanna Zuellig
Example shows how to use the camera and create a custom mask for the video

*/

// Declare variables
let pg; // Graphics buffer for mask
let slider1, slider2, slider3; // Sliders for adjusting parameters
let counter = 0; // Counter for rotation angle
let copyPixel; // Copy of captured video frame
let capture; // Video capture device
let e = 1; // Initial value for angle step
let f = 0; // Initial value for scale factor
let g = 0; // Initial value for rotation speed

function setup() {
  createCanvas(600, 600); // Create canvas
  background(255); // Set background color
  imageMode(CENTER); // Set image mode to center
  angleMode(DEGREES); // Set angle mode to degrees
  noStroke(); // Disable stroke
  noFill(); // Disable fill

  // Create video capture device
  capture = createCapture(VIDEO);
  capture.size(600, 400); // Set video capture size
  capture.hide(); // Hide video capture element

  // Create sliders for parameter adjustment
  createSliders();
}

function draw() {
  background(0); // Set background to black

  // Update parameter values from sliders
  getSliderValues();

  // Copy pixels of video frame at mouse position
  copyPixel = capture.get(mouseX, mouseY, 600, 600);

  // Draw arc mask for circular masking
  drawArcMask();

  push();
  translate(width / 2, height / 2); // Translate origin to canvas center
 

  image(copyPixel, width / 2, height / 2); // Draw masked image

  pop(); // Restore transformation state

  // Display video capture and arc
  image(capture, 38, 75, 75, 50);
  fill(255, 50, 50);
  arc(0, 105, 150, 150, 0, e, PIE);


}

function createSliders() {
  // Create sliders with initial values and ranges
  slider1 = createSlider(1, 60, 1); // Angle step
  slider1.position(10, 10); // Set position
  slider1.size(80); // Set size
  

}

function getSliderValues() {
  // Update parameter values from slider values
  e = slider1.value(); // Angle step
  // Ensure e is a multiple of 15 degrees, minimum 5
  e = floor(e / 15) * 15;
  if (e < 5) e = 5;


}

function drawArcMask() {
  // Draw circular mask to create arc effect
  pg = createGraphics(150, 150); // Create graphics buffer
  pg.angleMode(DEGREES); // Set angle mode to degrees
  pg.fill(0); // Fill color black
  pg.noStroke(); // Disable stroke
  pg.arc(0, 0, 150, 150, 0, e, PIE); // Draw arc (mask)
  copyPixel.mask(pg); // Apply mask to copyPixel
}

function keyReleased() {
  // Save canvas as PNG when 's' or 'S' key is released
  if (key == "s" || key == "S") saveCanvas("canvas", "png");
}
