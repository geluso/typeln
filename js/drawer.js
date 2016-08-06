function drawLine(points) {
  console.log("start drawing");
  if (points.length < 2) {
    return;
  }

  CTX.clearRect(0, 0, WIDTH, HEIGHT);

  CTX.beginPath();
  CTX.moveTo(points[0].x, points[0].y);
  
  _.each(points, function(point) {
    CTX.lineTo(point.x, point.y);
  });

  CTX.strokeStyle = "red";
  CTX.stroke();

  console.log("done drawing");
}
