let handPose;
let video;
let hands = [];

let canvasWidth = 640;
let canvasHeight = 480;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);
  
  //fill(0, 0, 250, 50);
  //rectangle(0, 0, width, height / 3);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }

  if (hands.length > 0) {
    let hand = hands[0]; // Access the first detected hand
    let indexTip = hand.keypoints[8]; // Index finger tip (verify index)
    let middleTip = hand.keypoints[12]; // Middle finger tip
      
    // Draw circles as before
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }

    // Compare y positions (smaller y is higher on the canvas)
    if (indexTip.y < middleTip.y || indexTip.y < canvasHeight / 3) {
      // Do your action here, e.g., change background color
      background(255, 0, 0, 50); // red background to check if it works




    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
