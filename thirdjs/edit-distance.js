(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.editDistance = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Mapping, levenshtein, levenshteinBt, ref, trackedMin, zero;

ref = require('./util'), Mapping = ref.Mapping, zero = ref.zero, trackedMin = ref.trackedMin;

levenshtein = function(stringA, stringB, insertCb, removeCb, updateCb) {
  var a, aC, b, bC, dist, distance, i, j, k, l, m, min, n, ref1, ref2, ref3, ref4, track;
  a = stringA;
  b = stringB;
  track = zero(a.length + 1, b.length + 1);
  dist = zero(a.length + 1, b.length + 1);
  for (i = k = 1, ref1 = a.length; k <= ref1; i = k += 1) {
    dist[i][0] = i;
  }
  for (j = l = 1, ref2 = b.length; l <= ref2; j = l += 1) {
    dist[0][j] = j;
  }
  for (i = m = 1, ref3 = a.length; m <= ref3; i = m += 1) {
    for (j = n = 1, ref4 = b.length; n <= ref4; j = n += 1) {
      aC = a.charAt(i - 1);
      bC = b.charAt(j - 1);
      min = trackedMin(dist[i - 1][j] + removeCb(aC), dist[i][j - 1] + insertCb(bC), dist[i - 1][j - 1] + updateCb(aC, bC));
      track[i][j] = min.index;
      dist[i][j] = min.value;
    }
  }
  distance = dist[a.length][b.length];
  return new Mapping(a, b, distance, track, levenshteinBt);
};

levenshteinBt = function(a, b, track) {
  var i, j, mapping;
  i = a.length;
  j = b.length;
  mapping = [];
  while (i > 0 && j > 0) {
    switch (track[i][j]) {
      case 0:
        mapping.push([a[i - 1], null]);
        --i;
        break;
      case 1:
        mapping.push([null, b[j - 1]]);
        --j;
        break;
      case 2:
        mapping.push([a[i - 1], b[j - 1]]);
        --i;
        --j;
        break;
      default:
        throw new Error("Invalid operation " + track[i][j] + " at (" + i + ", " + j + ")");
    }
  }
  if (i === 0 && j !== 0) {
    while (j > 0) {
      mapping.push([null, b[j - 1]]);
      --j;
    }
  }
  if (i !== 0 && j === 0) {
    while (i > 0) {
      mapping.push([a[i - 1], null]);
      --i;
    }
  }
  return mapping;
};

module.exports = levenshtein;

},{"./util":3}],2:[function(require,module,exports){
var Mapping, postOrderWalk, ref, ted, tedBt, trackedMin, zero;

ref = require('./util'), Mapping = ref.Mapping, zero = ref.zero, trackedMin = ref.trackedMin;

postOrderWalk = function(root, childrenCb, visitCb) {
  var child, children, firstChild, index, k, len, node, ref1, ref2, ref3, ref4, stack1, stack2;
  stack1 = [];
  stack2 = [];
  stack1.push([void 0, root]);
  while (stack1.length > 0) {
    ref1 = stack1.pop(), index = ref1[0], node = ref1[1];
    children = childrenCb(node);
    firstChild = (ref2 = children != null ? children[0] : void 0) != null ? ref2 : null;
    stack2.push([index, node, firstChild]);
    ref3 = children != null ? children : [];
    for (index = k = 0, len = ref3.length; k < len; index = ++k) {
      child = ref3[index];
      stack1.push([index, child]);
    }
  }
  while (stack2.length > 0) {
    ref4 = stack2.pop(), index = ref4[0], node = ref4[1], firstChild = ref4[2];
    visitCb(index, node, firstChild);
  }
};

ted = function(rootA, rootB, childrenCb, insertCb, removeCb, updateCb) {
  var fdist, i, j, k, l, len, len1, preprocess, ref1, ref2, tA, tB, tdist, tdistance, treeDistance, ttrack;
  preprocess = function(root) {
    var t;
    t = {
      nodes: [],
      llds: [],
      keyroots: []
    };
    postOrderWalk(root, childrenCb, function(index, node, firstChild) {
      var childIndex, lldIndex, nIndex;
      nIndex = t.nodes.length;
      t.nodes.push(node);
      if (firstChild == null) {
        lldIndex = nIndex;
      } else {
        childIndex = t.nodes.indexOf(firstChild);
        lldIndex = t.llds[childIndex];
      }
      t.llds.push(lldIndex);
      if (index !== 0) {
        t.keyroots.push(nIndex);
      }
    });
    t.keyroots.sort();
    return t;
  };
  treeDistance = function(i, j) {
    var a, aL, aN, b, bL, bN, iOff, jOff, k, l, m, min, n, o, p, q, r, ref1, ref2, ref3, ref4;
    aL = tA.llds;
    bL = tB.llds;
    aN = tA.nodes;
    bN = tB.nodes;
    iOff = aL[i] - 1;
    jOff = bL[j] - 1;
    m = i - aL[i] + 2;
    n = j - bL[j] + 2;
    for (a = k = 1, ref1 = m; k < ref1; a = k += 1) {
      fdist[a][0] = fdist[a - 1][0] + removeCb(aN[a + iOff]);
    }
    for (b = l = 1, ref2 = n; l < ref2; b = l += 1) {
      fdist[0][b] = fdist[0][b - 1] + insertCb(bN[b + jOff]);
    }
    for (a = o = 1, ref3 = m; o < ref3; a = o += 1) {
      for (b = r = 1, ref4 = n; r < ref4; b = r += 1) {
        if (aL[i] === aL[a + iOff] && bL[j] === bL[b + jOff]) {
          min = trackedMin(fdist[a - 1][b] + removeCb(aN[a + iOff]), fdist[a][b - 1] + insertCb(bN[b + jOff]), fdist[a - 1][b - 1] + updateCb(aN[a + iOff], bN[b + jOff]));
          ttrack[a + iOff][b + jOff] = min.index;
          tdist[a + iOff][b + jOff] = fdist[a][b] = min.value;
        } else {
          p = aL[a + iOff] - 1 - iOff;
          q = bL[b + jOff] - 1 - jOff;
          fdist[a][b] = Math.min(fdist[a - 1][b] + removeCb(aN[a + iOff]), fdist[a][b - 1] + insertCb(bN[b + jOff]), fdist[p][q] + tdist[a + iOff][b + jOff]);
        }
      }
    }
  };
  tA = preprocess(rootA);
  tB = preprocess(rootB);
  ttrack = zero(tA.nodes.length, tB.nodes.length);
  tdist = zero(tA.nodes.length, tB.nodes.length);
  fdist = zero(tA.nodes.length + 1, tB.nodes.length + 1);
  ref1 = tA.keyroots;
  for (k = 0, len = ref1.length; k < len; k++) {
    i = ref1[k];
    ref2 = tB.keyroots;
    for (l = 0, len1 = ref2.length; l < len1; l++) {
      j = ref2[l];
      treeDistance(i, j);
    }
  }
  tdistance = tdist[tA.nodes.length - 1][tB.nodes.length - 1];
  return new Mapping(tA, tB, tdistance, ttrack, tedBt);
};

tedBt = function(tA, tB, ttrack) {
  var i, j, mapping;
  mapping = [];
  i = tA.nodes.length - 1;
  j = tB.nodes.length - 1;
  while (i >= 0 && j >= 0) {
    switch (ttrack[i][j]) {
      case 0:
        mapping.push([tA.nodes[i], null]);
        --i;
        break;
      case 1:
        mapping.push([null, tB.nodes[j]]);
        --j;
        break;
      case 2:
        mapping.push([tA.nodes[i], tB.nodes[j]]);
        --i;
        --j;
        break;
      default:
        throw new Error("Invalid operation " + ttrack[i][j] + " at (" + i + ", " + j + ")");
    }
  }
  if (i === -1 && j !== -1) {
    while (j >= 0) {
      mapping.push([null, tB.nodes[j]]);
      --j;
    }
  }
  if (i !== -1 && j === -1) {
    while (i >= 0) {
      mapping.push([tA.nodes[i], null]);
      --i;
    }
  }
  return mapping;
};

module.exports = ted;

},{"./util":3}],3:[function(require,module,exports){
var Mapping,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports.Mapping = Mapping = (function() {
  function Mapping(a1, b1, distance, track, backtrackFn) {
    this.a = a1;
    this.b = b1;
    this.distance = distance;
    this.track = track;
    this.backtrackFn = backtrackFn;
    this.alignment = bind(this.alignment, this);
    this.pairs = bind(this.pairs, this);
    this.pairCache = null;
  }

  Mapping.prototype.pairs = function() {
    if (this.pairCache == null) {
      this.pairCache = this.backtrackFn(this.a, this.b, this.track);
    }
    return this.pairCache;
  };

  Mapping.prototype.alignment = function() {
    var alignmentA, alignmentB, k, len, pair, pairs, ref;
    pairs = this.pairs();
    alignmentA = [];
    alignmentB = [];
    ref = pairs.reverse();
    for (k = 0, len = ref.length; k < len; k++) {
      pair = ref[k];
      alignmentA.push(pair[0]);
      alignmentB.push(pair[1]);
    }
    return {
      alignmentA: alignmentA,
      alignmentB: alignmentB
    };
  };

  return Mapping;

})();

module.exports.zero = function(width, height) {
  var i, j, k, l, ref, ref1, x, y;
  x = new Array(width);
  for (i = k = 0, ref = width; k < ref; i = k += 1) {
    y = x[i] = new Array(height);
    for (j = l = 0, ref1 = height; l < ref1; j = l += 1) {
      y[j] = 0;
    }
  }
  return x;
};

module.exports.trackedMin = function(a, b, c) {
  var min;
  min = {
    value: a,
    index: 0 | 0
  };
  if (b < min.value) {
    min.value = b;
    min.index = 1 | 0;
  }
  if (c < min.value) {
    min.value = c;
    min.index = 2 | 0;
  }
  return min;
};

},{}],4:[function(require,module,exports){
module.exports = {
  ted: require('./ted'),
  levenshtein: require('./levenshtein')
};

},{"./levenshtein":1,"./ted":2}]},{},[4])(4)
});