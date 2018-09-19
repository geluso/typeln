var DRAW_ALL_POINTS = false;
var DRAW_CORNER_POINTS = true;

function drawLine(points) {
  if (points.length < 2) {
    return;
  }

  console.log('cleared');
  CTX.clearRect(0, 0, WIDTH, HEIGHT);

  CTX.strokeColor = "green";
  pointsXY = _.map(points, function(point) {
    var x = xx(point.x);
    var y = yy(point.y)

    return new Point(x, y);
  });

  paper.setup(CANVAS);
  var path = new paper.Path(pointsXY);
  path.strokeColor = "red";

  var smoothed = path.clone()
  smoothed.strokeColor = "blue";
  smoothed.flatten(.2);

  if (DRAW_ALL_POINTS) {
    // set a timeout so the rects are drawn after the paper lib
    setTimeout(function() {
      drawAllPoints(pointsXY);
    }, 100);
  }

  if (DRAW_CORNER_POINTS) {
    setTimeout(function() {
      var corners = determineCorners(pointsXY);
      drawAllPoints(corners);
    }, 100);

  }

  drawMapping();
  return pointsXY;
}

function drawAllPoints(pointsXY) {
  _.each(pointsXY, function(point) {
    CTX.strokeRect(point.x - 3, point.y - 3, 5, 5);
  });
}

function determineCorners(points) {
  if (points.length < 3) {
    return [];
  }

  var corners = [];

  var isXIncreasing = false;
  var isYIncreasing = false;

  _.each(points, function(point) {

  });

  return corners;
}
