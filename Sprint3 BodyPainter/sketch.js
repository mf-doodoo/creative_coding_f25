let video;
let bodyPose;
let poses = [];
let connections;
let layer;

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let currentDirection;
let directionTimer = 0;


let pg;   // p5.Graphics object for off-screen drawing

let hueValue = 0;

function preload() {
  bodyPose = ml5.bodyPose();    // Load the bodyPose model
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSB, 360, 100, 100, 100);   //hue, saturation, brightness, alpha
  frameRate(10);

  layer = createGraphics(canvasWidth, canvasHeight);
  layer.colorMode(HSB, 360, 100, 100, 100);

  pg = createGraphics(canvasWidth, canvasHeight);   // Create an off-screen graphics buffer

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);
  video.hide();

  bodyPose.detectStart(video, gotPoses);    // Start detecting poses in the webcam video
  connections = bodyPose.getSkeleton();   // Get the skeletal connection information
}

function draw() {
  background(100, 0, 100, 10); // Light background for fading effect
  hueValue = (hueValue + 1) % 360;

  // Change direction every 15 frames
  if (directionTimer <= 0) {
    let directions = [
      {dx: 5, dy: 0},     // right
      {dx: -5, dy: 0},    // left
      {dx: 0, dy: 5},     // down
      {dx: 0, dy: -5}     // up
    ];
    currentDirection = random(directions);
    directionTimer = 120;
  }
  directionTimer--;

  // Shift pg contents
  pg.copy(pg, 0, 0, canvasWidth, canvasHeight,
          currentDirection.dx, currentDirection.dy,
          canvasWidth, canvasHeight);

  // Add optional decay (fade over time)
  pg.noStroke();
  pg.colorMode(HSB, 360, 100, 100, 100);  // Make sure pg uses HSB
  pg.noStroke();
  pg.fill(100, 0, 100, 3);  // Match the purple-ish background, low alpha
  pg.rect(0, 0, canvasWidth, canvasHeight);


  // Draw current frame pose on a transparent layer
  layer.clear();  // Clear the layer for fresh drawing
  layer.clear();
  layer.colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        layer.stroke(hueValue, 100, 100, 40);
        layer.strokeWeight(20);
        layer.line(pointA.x, pointA.y, pointB.x, pointB.y);

        layer.stroke(0, 0, 100, 80);
        layer.strokeWeight(10);
        layer.line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  pg.image(layer, 0, 0);
  image(pg, 0, 0);

  // Draw fresh keypoints on top
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.confidence > 0.1) {
        fill(0, 0, 100, 100);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}


// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}


