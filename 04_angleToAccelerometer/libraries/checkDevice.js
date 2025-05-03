let useAccelerometer = false;
var px = 50; // Position x and y
var py = 50;
var vx = 0.0; // Velocity x and y
var vy = 0.0;
var updateRate = 1 / 60; // Sensor refresh rate

function getAccel() {
    if (window.DeviceOrientationEvent) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {

            DeviceMotionEvent.requestPermission().then(response => {
                if (response == 'granted') {
                    // Add a listener to get smartphone orientation 
                    // in the alpha-beta-gamma axes (units in degrees)
                    window.addEventListener('deviceorientation', (event) => {
                        // Expose each orientation angle in a more readable way
                        rotation_degrees = event.alpha;
                        frontToBack_degrees = event.beta;
                        leftToRight_degrees = event.gamma;

                        // Update velocity according to how tilted the phone is
                        // Since phones are narrower than they are long, double the increase to the x velocity
                        //vx = vx + leftToRight_degrees * updateRate * 2;
                        //vy = vy + frontToBack_degrees * updateRate;

                        vx = lerp(vx, vx + leftToRight_degrees * updateRate * 2, 0.8);

                        vy = lerp(vy, vy + frontToBack_degrees * updateRate, 0.8);

                        // Update position and clip it to bounds
                        px = px + vx * .5;
                        if (px > 98 || px < 0) {
                            px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
                            vx = 0;
                        }

                        py = py + vy * .5;
                        if (py > 98 || py < 0) {
                            py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
                            vy = 0;
                        }



                    });
                    useAccelerometer = true;

                }
            });
        }
    }
    document.getElementById("accelPermsButton").style.display = "none";
}


if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        let btn = document.createElement("button");
        btn.setAttribute("id", "accelPermsButton");
        btn.style.position = "absolute";
        btn.classList.add('micbtn');//ueber diese Klasse kann Button gestylt werden
        btn.style.top = "0px";
        btn.style.left = "0px";
        let txt = document.createTextNode("Get Accelerometer Permissions");
        btn.appendChild(txt);
        btn.addEventListener("click", function (e) {
            getAccel();
        });
        document.body.appendChild(btn);
    }
}