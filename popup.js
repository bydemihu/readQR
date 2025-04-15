document.addEventListener('DOMContentLoaded', async function () {

    // DECLARE VARIABLES
    const canvas = document.getElementById("canvas");
    canvas.setAttribute("width", 240);
    canvas.setAttribute("height", 240);
    canvas.setAttribute("style", "transform:scale(-1, 1);");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    const video = document.getElementById("video");
    let lastframe = 0;
    let framerate = 12;
    const icon = new Image(240, 240);
    icon.src = "icon.png";

    // GET VIDEO
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: 240, height: 240 } })
            .then((stream) => {
                console.log('Video access granted.');
                video.srcObject = stream;  // assign stream to video elem
                video.addEventListener("loadeddata", () => {  // wait for stream to load
                    runDetection();  // run detection and draw points
                });
            })
            .catch(function (error) {
                console.error("Error accessing camera:", error.name, error.message);
            });
    }

    // RUN DETECTION ON VIDEO
    const runDetection = async () => {
        console.log("detector created");
        ctx.drawImage(video, 0, 0, 240, 240); //initial video
        let isProcessing = false;  // initial processing state

        const detect = async (timestamp) => {  // runs every frame while active

            if (isProcessing) return;
            isProcessing = true;

            if (timestamp - lastframe >= 1000 / framerate) {
                lastframe = timestamp;

                // draw video
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(video, 0, 0, 240, 240);
                ctx.drawImage(icon, 0, 0, 240, 240);
                console.log("video drawn")

                // check for QR
                if (video.readyState === video.HAVE_ENOUGH_DATA) {

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);

                    console.log("tried to scan");

                    if (code) {
                        console.log("scanned a code");
                        chrome.runtime.sendMessage({ qrLink: code.data });

                        // pause scanning for 2 seconds
                        scanPaused = true;
                        setTimeout(() => {
                            scanPaused = false;
                        }, 2000);
                    }
                }
            }
            isProcessing = false;
            requestAnimationFrame(detect);
        } // end of detect
        detect(); // initial detect
    }
})
