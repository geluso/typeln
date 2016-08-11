function drawLine(points) {
  if (points.length < 2) {
    return;
  }

  CTX.clearRect(0, 0, WIDTH, HEIGHT);

  points = _.map(points, function(point) {
    return new Point(xx(point.x), yy(point.y));
  });

  var path = new paper.Path(points);
  path.strokeColor = "red";

  var smoothed = path.clone()
  smoothed.strokeColor = "blue";
  smoothed.flatten(.2);
}
