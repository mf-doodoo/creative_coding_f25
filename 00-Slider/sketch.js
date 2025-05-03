/*
+Colabor 2025 HSLU, Hanna Zuellig
Slider
Example shows how to create a slider, read its value and use it in a sketch
*/
let sizeSlider;// Declare the slider variable
function setup() {
  createCanvas(windowWidth, windowHeight);
  //create the slider and position it
  sizeSlider = createSlider(10, width/2, 100);
  sizeSlider.position(20, 20);
}

function draw() {
  background(255);
  fill(0);
  //get the value from the slider and use it to set the size of the ellipse
  let size = sizeSlider.value();
  ellipse(width/2, height/2, size, size);
}
