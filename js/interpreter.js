function CharCount(key) {
  this.key = key;
  this.count = 1;
}

function interpret(points) {
  if (points && points.length < 1) {
    return "";
  }

  var first = getKey(points[0].x, points[0].y);
  var last = getKey(points[points.length - 1].x, points[points.length - 1].y);

  var counts = [];
  var current = first.key;

  var keys = _.map(points, function(point) {
    var key = getKey(point.x, point.y);
    if (key == undefined) {
      // do nothing
    } else if (key.key == current.key) {
      current.count++;
    } else {
      current = new CharCount(key.key);
      counts.push(current);
    }
  });

  counts = _.filter(counts, function(count) {
    return count.count > 10;
  });

  return first.key + countArrayToStr(counts) + last.key;
}

function countArrayToStr(arr) {
  return arr.reduce(function(s1, s2) {
    return s1 + s2.key;
  }, "");
}
