// if true, highlight each key bounding box on mouse hover
var SHOW_KEY = false;

var MAPPING_WIDTH = 50;
var MAPPINGS = [
  {key: 'q', top_left: new Point(5, 5)},
  {key: 'w', top_left: new Point(66, 5)},
  {key: 'e', top_left: new Point(127, 5)},
  {key: 'r', top_left: new Point(188, 5)},
  {key: 't', top_left: new Point(249, 5)},
  {key: 'y', top_left: new Point(310, 5)},
  {key: 'u', top_left: new Point(371, 5)},
  {key: 'i', top_left: new Point(432, 5)},
  {key: 'o', top_left: new Point(493, 5)},
  {key: 'p', top_left: new Point(555, 5)},

  {key: 'a', top_left: new Point(30, 63)},
  {key: 's', top_left: new Point(91, 63)},
  {key: 'd', top_left: new Point(152, 63)},
  {key: 'f', top_left: new Point(213, 63)},
  {key: 'g', top_left: new Point(273, 63)},
  {key: 'h', top_left: new Point(334, 63)},
  {key: 'j', top_left: new Point(395, 63)},
  {key: 'k', top_left: new Point(455, 63)},
  {key: 'l', top_left: new Point(515, 63)},

  {key: 'z', top_left: new Point(64, 119)},
  {key: 'x', top_left: new Point(124, 119)},
  {key: 'c', top_left: new Point(184, 119)},
  {key: 'v', top_left: new Point(244, 119)},
  {key: 'b', top_left: new Point(304, 119)},
  {key: 'n', top_left: new Point(364, 119)},
  {key: 'm', top_left: new Point(424, 119)},
];


var RATIO_MAPPING_SIZE = 0.07396449704142012;
var RATIO_MAPPINGS = [
  {key: 'q', x: 0.0073964497041420114, y: 0.021551724137931036},
  {key: 'w', x: 0.09763313609467456, y: 0.021551724137931036},
  {key: 'e', x: 0.1878698224852071, y: 0.021551724137931036},
  {key: 'r', x: 0.2781065088757396, y: 0.021551724137931036},
  {key: 't', x: 0.3683431952662722, y: 0.021551724137931036},
  {key: 'y', x: 0.45857988165680474, y: 0.021551724137931036},
  {key: 'u', x: 0.5488165680473372, y: 0.021551724137931036},
  {key: 'i', x: 0.6390532544378699, y: 0.021551724137931036},
  {key: 'o', x: 0.7292899408284024, y: 0.021551724137931036},
  {key: 'p', x: 0.8210059171597633, y: 0.021551724137931036},
  {key: 'a', x: 0.04437869822485207, y: 0.27155172413793105},
  {key: 's', x: 0.1346153846153846, y: 0.27155172413793105},
  {key: 'd', x: 0.22485207100591717, y: 0.27155172413793105},
  {key: 'f', x: 0.3150887573964497, y: 0.27155172413793105},
  {key: 'g', x: 0.40384615384615385, y: 0.27155172413793105},
  {key: 'h', x: 0.4940828402366864, y: 0.27155172413793105},
  {key: 'j', x: 0.584319526627219, y: 0.27155172413793105},
  {key: 'k', x: 0.6730769230769231, y: 0.27155172413793105},
  {key: 'l', x: 0.7618343195266272, y: 0.27155172413793105},
  {key: 'z', x: 0.09467455621301775, y: 0.5129310344827587},
  {key: 'x', x: 0.1834319526627219, y: 0.5129310344827587},
  {key: 'c', x: 0.27218934911242604, y: 0.5129310344827587},
  {key: 'v', x: 0.3609467455621302, y: 0.5129310344827587},
  {key: 'b', x: 0.44970414201183434, y: 0.5129310344827587},
  {key: 'n', x: 0.5384615384615384, y: 0.5129310344827587},
  {key: 'm', x: 0.6272189349112426, y: 0.5129310344827587}
];

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
