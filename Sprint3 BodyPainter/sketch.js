let video;
let bodyPose;
let poses = [];
let connections;

let canvasWidth = 640;
let canvasHeight = 480;

let buffer;

let hueValue = 0;

function preload() {
  bodyPose = ml5.bodyPose();    // Load the bodyPose model
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSB, 360, 100, 100, 100);   //hue, saturation, brightness, alpha


  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);
  video.hide();

  bodyPose.detectStart(video, gotPoses);    // Start detecting poses in the webcam video
  connections = bodyPose.getSkeleton();   // Get the skeletal connection information
}

function draw() {
  // Draw the webcam video
  //image(video, 0, 0, width, height);
  frameRate();
  //background(255,30);

  hueValue = (hueValue + 1) % 360;    // Increment the hue value for color cycling

  // Draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(hueValue, 100, 100, 100);  
        strokeWeight(20);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
        stroke(0, 0, 100, 100);
        strokeWeight(10);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    // Iterate through all the keypoints
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
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


