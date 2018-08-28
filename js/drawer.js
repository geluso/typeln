var DRAW_ALL_POINTS = false;
var DRAW_CORNER_POINTS = true;

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

  // create a chart of line slopes
  var chartCtx = document.getElementById("myChart").getContext("2d");
  var pieData = [
      {
          value: 20,
          color:"#878BB6"
      },
      {
          value : 40,
          color : "#4ACAB4"
      },
      {
          value : 10,
          color : "#FF8153"
      },
      {
          value : 30,
          color : "#FFEA88"
      }
  ];
  // Get the context of the canvas element we want to select
  
  var integral = [];
  for (var i = 1; i < pointsXY.length; i++) {
      var p1 = pointsXY[i - 1];
      var p2 = pointsXY[i];

      if (p1 && p2) {
        var slope = (p2.y - p1.y) / (p2.x - p1.x);
        var midX = p1.x + (p2.x - p1.x) / 2;
        integral.push(new Point(midX, slope));
      }
  };

  //var data = pointsXY;
  var data = integral;
  var xs = data.map(function(pt) {
    return pt.x;
  });

  var ys = data.map(function(pt) {
    return pt.y;
  });

  var lineData = {
    labels: ys,
    datasets: [
        {
            label: "Sodium intake",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: xs
        }
    ]
  };

  new Chart(chartCtx).Line(lineData);

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
