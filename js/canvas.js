var CTX;

var WIDTH;
var HEIGHT;

var MOUSE_X = undefined;
var MOUSE_Y = undefined;

var OFFSET;

$(document).ready(function() {
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
}

function resize() {
  WIDTH = $("#keyboard").width();
  HEIGHT = $("#keyboard").height(); 

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  ctx.width = WIDTH;
  ctx.height = HEIGHT;

  OFFSET = $("canvas").offset();

  CTX = ctx;
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
