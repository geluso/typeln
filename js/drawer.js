var DRAW_ALL_POINTS = true;

function drawLine(points) {
  if (points.length < 2) {
    return;
  }

  CTX.clearRect(0, 0, WIDTH, HEIGHT);

  CTX.save();
  CTX.beginPath();
  CTX.strokeStyle = "blue";
  CTX.moveTo(xx(points[0]), yy(points[0]));

  pointsXY = _.map(points, function(point) {
    var x = xx(point.x);
    var y = yy(point.y)

    CTX.strokeRect(point.x - 3, point.y - 3, 5, 5);
    CTX.lineTo(x, y);

    return new Point(x, y);
  });

  CTX.stroke();
  CTX.restore();

  return pointsXY;
}
