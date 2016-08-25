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
  
  var xs = pointsXY.map(function(pt) {
    return pt.x;
  });

  var ys = pointsXY.map(function(pt) {
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
