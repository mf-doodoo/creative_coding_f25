/* 
+Colabor 2025 HSLU, Hanna Zuellig
Example Custom Audio Class for p5.js
Custom class creates a button to start the microphone
Custom class is to be embedded in index.html and put into library folder
*/

/**
 * Die Variable Mikrofon bindet eine Instanz der Klasse Mic
 * Die Variable micLevel nimmt die aktuelle Lautstärke zurück, von 0 bis 255
 */
let micInstance;
let micLevel = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  /**
   * Im setup einmalig Zugriff auf das Mikrofon
   */
  micInstance = new Mic("Start Mic"); //Parameter übergibt Beschriftung des Buttons
}

function draw() {
  background(255);
  fill(0)

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
  }

  let barHeight = map(micLevel, 0, 255, 0, height);
  rect(0, height - barHeight, width, barHeight); // Draw a bar representing the mic level

  // Draw a bar representing the mic level
 
}

// ✅ Async function outside draw() to call listenMic
async function getMicLevel() {
  micLevel = await micInstance.listenMic();
}