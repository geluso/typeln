var CANVAS, CTX;
var WIDTH, HEIGHT;

var MOUSE_X = undefined;
var MOUSE_Y = undefined;

var OFFSET;

$("#keyboard").ready(function() {
  CANVAS = document.getElementById("canvas");
  CTX = canvas.getContext("2d");

  paper.setup(CANVAS);

  resize();

	window.onresize = resize;
	window.addEventListener("mousemove", trackMouse);

	window.addEventListener("mousedown", startRecord);
	window.addEventListener("mousemove", record);
	window.addEventListener("mouseup", stopRecord);
});

function trackMouse(e) {
	MOUSE_X = e.pageX - OFFSET.left;
	MOUSE_Y = e.pageY - OFFSET.top;

	MOUSE_XX = percentX(MOUSE_X);
	MOUSE_YY = percentY(MOUSE_Y);
}

function resize() {
  WIDTH = $("#keyboard").width();
  HEIGHT = $("#keyboard").height(); 

  CANVAS.width = WIDTH;
  CANVAS.height = HEIGHT;

  CTX.width = WIDTH;
  CTX.height = HEIGHT;

  OFFSET = $("canvas").offset();

}

function percentX(value) {
  return value / WIDTH;
}

function percentY(value) {
  return value / HEIGHT;
}

function xx(percent) {
	return Math.round(WIDTH * percent);
}

function yy(percent) {
	return Math.round(HEIGHT * percent);
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function clamp(value, min, max) {
  return Math.max(Math.min(value, max), min);
}
