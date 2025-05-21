let video;
let bodyPose;
let poses = [];
let connections;

let canvasWidth = 640;
let canvasHeight = 480;

let buffer;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    //background(255); // Clear the canvas with a white background

    // Create the video and hide it
    video = createCapture(VIDEO);
    video.size(canvasWidth, canvasHeight);
    video.hide();

    // Start detecting poses in the webcam video
    bodyPose.detectStart(video, gotPoses);
    // Get the skeletal connection information
    connections = bodyPose.getSkeleton();

    buffer= createGraphics(canvasWidth, canvasHeight);    //create a buffer to draw previous frame
    buffer.background(255); // Clear the buffer with a white background
}

function draw() {
    frameRate(10);
    //image(video, 0, 0, width, height);  // Draw the webcam video
    //background(255,255,255,90); // Clear the canvas with a white background and some transparency

    // 1. Slide buffer to the right
    buffer.copy(buffer, 0, 0, buffer.width, buffer.height, 5, 0, buffer.width, buffer.height);

    // 2. Fade buffer slightly with a semi-transparent white overlay
    buffer.noStroke();
    buffer.fill(255, 10); // white with small transparency for slow fade
    buffer.rect(0, 0, buffer.width, buffer.height); // Draw a rectangle over the entire buffer


    // 3. Draw the skeleton connections
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        for (let j = 0; j < connections.length; j++) {
            let pointAIndex = connections[j][0];
            let pointBIndex = connections[j][1];
            let pointA = pose.keypoints[pointAIndex];
            let pointB = pose.keypoints[pointBIndex];
            // Only draw a line if both points are confident enough
            if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
                stroke(255, 0, 0);
                strokeWeight(20);
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
        fill(0, 255, 0);
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
