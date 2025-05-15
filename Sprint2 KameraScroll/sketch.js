/*
+Colabor 2025 HSLU, Hanna Zuellig
Example shows how to use ml5.js handpose model
filter the right and left hand 
take the index finger position
and draw a rectangle between the two index fingers
resize the rectangle based on the distance between the two index fingers

Reference to the ml5.js library
https://docs.ml5js.org/#/reference/handpose
See reference for an ilustration how the keypoints are numbered

ml5.js is to be embedded in index.html 

*/

let handPose;
let video;
let hands = [];
let videoScale = 1



function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  videoScale = width / video.width; // Calculate the scale factor to fit the points to the canvas

  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(255);
  fill(0);
  

  // be aware that the video is flipped
  // if you want to mirror the video
  // use the function scale(-1, 1) before the to flip the video

  push();
  translate(width / 2, height / 2);
  scale(-1, 1);
  image(video, -1 * width / 2, -1 * height / 2, width, video.height * videoScale);

  //resize rectangle based on distance between index finger from right and left hand
  if (hands.length > 0) {
    let rightHand = hands.find(hand => hand.handedness === "Right");
    let leftHand = hands.find(hand => hand.handedness === "Left");
    let rightIndex ={x:0, y:0};
    let leftIndex ={x:0, y:0};
    if (rightHand) {
      rightIndex = rightHand.keypoints[8];
    }
    if (leftHand) {
      leftIndex = leftHand.keypoints[8];
    }
   
    if(rightIndex.x > 0 && leftIndex.x > 0){
      let distance = dist(rightIndex.x, rightIndex.y, leftIndex.x, leftIndex.y);
      
      rectMode(CENTER);
      rect(0, 0, distance*videoScale, 100);
    }
  }


  
  pop();
}


// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
  console.log(hands);
}


function mousePressed() {
  // Stop detecting hands
  handPose.detectStop();
  //console.log('stopped');
  noLoop();
}