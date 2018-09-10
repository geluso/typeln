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
