function fuzzy(term) {
  let list = Object.keys(BACK_TRACED);
  list = list.map(back => {return {back, orig: BACK_TRACED[back]}});
  let options = {
    shouldSort: true,
    includeScore: true,
    distance: 10,
    threshold: .2,
    keys: ["back"],
  };
  let fuse = new Fuse(list, options);

  result = fuse.search(term);
  console.log('result2:', result);
}

function letterEndsFuzzy(term) {
  const first = term[0];
  const last = term[term.length - 1];
  const words = LETTER_ENDS[first][last];

  let options = {
    shouldSort: true,
    includeScore: true,
    distance: 10,
    threshold: .2,
    keys: ["back"],
  };

  let fuse = new Fuse(words, options);
  result = fuse.search(term);
  console.log('result2:', result);
  return result;
}
