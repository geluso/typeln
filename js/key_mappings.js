// if true, highlight each key bounding box on mouse hover
var SHOW_KEY = false;

let LETTER_TO_POINT = RATIO_MAPPINGS.reduce((map, key) => {
  map[key.key] = key;
  return map;
}, {});
console.log('LETTER_TO_POINT', LETTER_TO_POINT);

function resizeMapping() {
  MAPPING_WIDTH = xx(RATIO_MAPPING_SIZE);
  MAPPINGS = _.map(RATIO_MAPPINGS, function(ratio) {
    var x = xx(ratio.x);
    var y = yy(ratio.y);
    return {key: ratio.key, top_left: new Point(x, y)};
  });

  drawMapping();
}

function drawMapping() {
  _.each(MAPPINGS, function(xy) {
    CTX.strokeRect(xy.top_left.x, xy.top_left.y, MAPPING_WIDTH, MAPPING_WIDTH);
    CTX.fillStyle = "rgba(255,0,0,.1)";
    if (Math.random() < .2) {
      CTX.fillStyle = "rgba(0,255,0,.1)";
    }
    CTX.fillRect(xy.top_left.x, xy.top_left.y, MAPPING_WIDTH, MAPPING_WIDTH);
  });
}

// deprecated. used once to convert hard coded values to ratio values.
function convertMapping() {
  _.each(MAPPINGS, function(mapping) {
    var x = percentX(mapping.top_left.x);
    var y = percentY(mapping.top_left.y);
  });
}

function getKey(x, y) {
  return getMouseUnderKey(x, y);
}

function getMouseUnderKey(x, y) {
  var key = _.find(MAPPINGS, function(mapping) {
    if (mapping.top_left.x < x &&
        mapping.top_left.y < y &&
        x < mapping.top_left.x + 50 &&
        y < mapping.top_left.y + 50) {
      return true;
    }
  });

  return key;
}
