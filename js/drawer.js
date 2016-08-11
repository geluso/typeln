function drawLine(points) {
  if (points.length < 2) {
    return;
  }

  CTX.clearRect(0, 0, WIDTH, HEIGHT);

  CTX.strokeColor = "green";
  pointsXY = _.map(points, function(point) {
    var x = xx(point.x);
    var y = yy(point.y)

    return new Point(x, y);
  });

  var path = new paper.Path(pointsXY);
  path.strokeColor = "red";

  var smoothed = path.clone()
  smoothed.strokeColor = "blue";
  smoothed.flatten(.2);

  // set a timeout so the rects are drawn after the paper lib
  setTimeout(function() {
    _.each(pointsXY, function(point) {
      CTX.strokeRect(point.x - 3, point.y - 3, 5, 5);
    });
  }, 100);
}
