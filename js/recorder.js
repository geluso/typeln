var RECORDING = false;
var POINTS = [];


function startRecord() {
  console.log("start recording");
  RECORDING = true;
  POINTS = [];
}

function stopRecord() {
  console.log("stop recording");
  RECORDING = false;
  drawLine(POINTS);
}

function record() {
  if (!RECORDING) {
    return;
  }

  console.log("recording", MOUSE_X, MOUSE_Y);
  POINTS.push(new Point(MOUSE_X, MOUSE_Y));
}
