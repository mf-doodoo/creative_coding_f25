let handPose;
let video;
let hands = [];
let lastScrollTime = 0;

let canvasWidth = 640;
let canvasHeight = 480;

// Scroll parameters (adjust as needed)
const SCROLL_COOLDOWN = 200; // milliseconds between scrolls
const SCROLL_DISTANCE = 100; // pixels per scroll
const SCROLL_THRESHOLD = 30; // minimum finger movement required

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(canvasWidth, canvasHeight).mouseClicked(startScroll);
  video = createCapture(VIDEO);
  video.size(canvasWidth, canvasHeight);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0, width, height);
  drawHandPoints();
  checkScrollGesture();
}

// Add click handler for scroll permission
function startScroll() {
  // Dummy function to enable scrolling after user interaction
}

function drawHandPoints() {
  for (let hand of hands) {
    for (let keypoint of hand.keypoints) {
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

function checkScrollGesture() {
  if (hands.length === 0 || millis() - lastScrollTime < SCROLL_COOLDOWN) return;

  const hand = hands[0];
  const indexBase = hand.keypoints[5]; // Index finger MCP joint
  const indexTip = hand.keypoints[8]; // Index finger tip

  // Calculate vertical distance between base and tip
  const verticalMovement = indexBase.y - indexTip.y;

  if (Math.abs(verticalMovement) > SCROLL_THRESHOLD) {
    if (verticalMovement > 0) {
      window.scrollBy(0, -SCROLL_DISTANCE); // Scroll up
      console.log("Scrolling up");
    } else {
      window.scrollBy(0, SCROLL_DISTANCE); // Scroll down
      console.log("Scrolling down");
    }
    lastScrollTime = millis();
  }
}

function gotHands(results) {
  hands = results;
}
