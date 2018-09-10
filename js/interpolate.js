function trace(word) {
  let points = [];
  for (let i = 1; i < word.length; i++) {
    let c1 = word[i - 1];
    let c2 = word[i];

    let l1 = LETTER_TO_POINT[c1];
    let l2 = LETTER_TO_POINT[c2];

    let x1 = l1.x;
    let y1 = l1.y;

    let x2 = l2.x;
    let y2 = l2.y;

    let xstep = (x2 - x1) / 50;
    let ystep = (y2 - y1) / 50;

    for (let n = 0; n < 50; n++) {
      points.push({
        x: xx(x1 + n * xstep) + MAPPING_WIDTH / 2,
        y: yy(y1 + n * ystep) + MAPPING_WIDTH / 2,
      });
    }
  }
  return points;
}

// let TRACED = "";
// let BACK_TRACED = "";
function traceAll() {
  let lastLetter;
  TRACED += "let TRACED = {\n";
  BACK_TRACED += "let BACK_TRACED = {\n";
  for (word of WORDS) {
    let interpreted = interpret(trace(word));
    TRACED += `  '${word}': '${interpreted}',\n`;
    BACK_TRACED += `  '${interpreted}': '${word}',\n`;

    if (word[0] !== lastLetter) {
      lastLetter = word[0];
      console.log(lastLetter);
    }
  }
  TRACED += "}\n";
  BACK_TRACED += "}\n";
  console.log(TRACED.length);
}
