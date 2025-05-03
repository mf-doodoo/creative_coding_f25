/*---
 * Einfache Klasse um Zugriff auf Mikrophon über die WebAudio API zu ermöglichen 
 * Konstruktor generiert einen Button, um Zugriff auf Audio durch UserInteraktion zu ermöglichen
 * Bsp. https://github.com/mdn/webaudio-examples 
 * @author Hanna Züllig
 * 
 */

const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;
analyser.fftSize = 128;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);



class Mic {
    constructor(val) {
        this.mic;
        this.started = false;
        this.val = val;
        this.source;
        this.btn = document.createElement('button');
        this.btn.setAttribute("value", this.val);
        this.btn.innerHTML = this.val;
        this.btn.style.position = "absolute";
        this.btn.classList.add('micbtn');//ueber diese Klasse kann Button gestylt werden
        this.btn.style.top = "0px";
        this.btn.style.left = "0px";
        this.OnEvent = OnEvent;
        var that = this;
        this.btn.addEventListener("click", this.OnEvent)
        document.body.append(this.btn);

        async function OnEvent() {
            that.started = true;

            // Resume AudioContext if it's suspended (especially for Chrome)
            if (audioCtx.state === 'suspended') {
                await audioCtx.resume();
            }

            if (navigator.mediaDevices.getUserMedia) {
                console.log("getUserMedia supported.");
                const constraints = { audio: true, echoCancellation: true };
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    that.source = audioCtx.createMediaStreamSource(stream);
                    that.source.connect(analyser);

                    // Await the new async method
                    const avg = await that.listenMic();
                    console.log("Average Frequency Data:", avg);
                } catch (err) {
                    console.log("The following gUM error occurred: " + err);
                }
            } else {
                console.log("getUserMedia not supported on your browser!");
            }

            that.btn.style.display = "none";
        }
    }

    // ✅ Changed to async
    async listenMic() {
        // Wait a short time to let audio data populate
       await new Promise(resolve => setTimeout(resolve, 100));

        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        return Math.floor(sum / bufferLength);
    }
}
