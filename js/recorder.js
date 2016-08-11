var RECORDING = false;
var POINTS = [];


function startRecord() {
  RECORDING = true;
  POINTS = [];
}

function stopRecord() {
  RECORDING = false;

  var pointsXY = drawLine(POINTS);
  var text = interpret(pointsXY);

  document.getElementById("result").value = text;
}

function record() {
  if (!RECORDING) {
    return;
  }

  POINTS.push(new Point(MOUSE_XX, MOUSE_YY));
}
