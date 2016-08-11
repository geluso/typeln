var RECORDING = false;
var POINTS = [];


function startRecord() {
  RECORDING = true;
  POINTS = [];
}

function stopRecord() {
  RECORDING = false;
  drawLine(POINTS);
}

function record() {
  if (!RECORDING) {
    return;
  }

  POINTS.push(new Point(MOUSE_XX, MOUSE_YY));
}
