var HIT_BOX_THRESHOLD = 1;

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
    return key;
  });

  let reduced = keys.reduce((all, curr) => {
    if (curr) {
      if (all.length == 0) {
        all.push(curr);
      } else if (curr !== all[all.length - 1]) {
        all.push(curr);
      }
    }
    return all;
  }, []);

  let joined = reduced.map(key => key.key).join('');
  if (BACK_TRACED[joined]) {
    console.log(joined, "hit");
    return BACK_TRACED[joined];
  } else {
    console.log(joined, "miss");
  }

  let min = minEditDistance(joined);
  console.log("min edit distance", min);

  let fuzzy = letterEndsFuzzy(joined);
  console.log("fuzzy:", fuzzy);

  let letters = reduced.map(key => key.key).join("");
  counts = _.filter(counts, function(count) {
    return count.count > HIT_BOX_THRESHOLD;
  });

  var result = countArrayToStr(counts);
  if (last.count < HIT_BOX_THRESHOLD) {
    result += last.key;
  }

  return result;
}

function countArrayToStr(arr) {
  return arr.reduce(function(s1, s2) {
    return s1 + s2.key;
  }, "");
}

function minEditDistance(needle) {
  let first = needle[0];
  let last = needle[needle.length - 1];
  let ends = LETTER_ENDS[first][last];

  let min = 99;
  let best = null;
  for (word of ends) {
    let result = editDistance.levenshtein(needle, word.back, insert, remove, update)
    if (result.distance < min) {
      min = result.distance;
      best = word.english;
    }
  }
  console.log("min:", min, "best:", best);
  return best;
}
