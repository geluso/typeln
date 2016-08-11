function CharCount(key) {
  this.key = key;
  this.count = 1;
}

function interpret(points) {
  if (points == undefined || points.length < 1) {
    return "";
  }

  var first, last, i;

  i = 0;
  while (first == undefined) {
    first = getKey(points[i].x, points[i].y);
    i++;
  }

  i = points.length - 1;
  while (last == undefined) {
    last = getKey(points[i].x, points[i].y);
    i--;
  }

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
