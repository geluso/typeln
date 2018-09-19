const words = require('./gen-words-traced');
const BACK_TRACED = {};

for (word in words) {
  let back = words[word];
  if (!BACK_TRACED[back]) {
    BACK_TRACED[back] = [];
  }
  BACK_TRACED[back].push(word);
}

console.log(BACK_TRACED);
