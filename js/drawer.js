function drawLine(points) {
  console.log("start drawing");
  if (points.length < 2) {
    return;
  }

  CTX.clearRect(0, 0, WIDTH, HEIGHT);

  var path = new paper.Path(points);
  path.strokeColor = "red";

  var smoothed = path.clone()
  smoothed.strokeColor = "blue";
  smoothed.flatten(.2);
}
