import { openBlock as O, createElementBlock as P, normalizeClass as Ot, renderSlot as ms, createCommentVNode as X, resolveComponent as qe, createElementVNode as F, withModifiers as Oe, createVNode as at, withCtx as st, toDisplayString as Ke, Fragment as Ae, renderList as $e, createBlock as be, defineComponent as Rr, ref as Pr, onMounted as mo, onBeforeUnmount as Xs, h as Et, reactive as go, markRaw as Zs, getCurrentInstance as of, watchEffect as sf, nextTick as lf, unref as hi, Teleport as af, customRef as cf, watch as Nc, computed as uf, TransitionGroup as df, resolveDynamicComponent as ff, mergeProps as hf, toHandlers as pf, withDirectives as Dc, vModelText as mf, createTextVNode as Bc, vShow as gf, withKeys as Hl } from "vue";
const gt = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, yf = {
  props: {
    content: {
      type: String,
      required: !1
    },
    label: {
      type: String,
      required: !1
    },
    activeClass: {
      type: String,
      required: !1,
      default: "vueberg-button-active"
    },
    active: {
      type: Boolean
    }
  }
}, bf = ["data-tooltip", "innerHTML"];
function vf(n, e, t, r, i, o) {
  return O(), P("button", {
    class: Ot(["vueberg-button", t.active ? t.activeClass : ""]),
    "data-tooltip": t.label,
    innerHTML: t.content
  }, null, 10, bf);
}
const el = /* @__PURE__ */ gt(yf, [["render", vf]]), kf = {
  data() {
    return {
      showDropdown: !1
    };
  },
  methods: {
    toggleDropdown() {
      this.hasDropdown && (this.showDropdown = !this.showDropdown, setTimeout(() => {
        this.showDropdown ? document.addEventListener("click", this.handleClickOutside) : document.removeEventListener("click", this.handleClickOutside);
      }, 0));
    },
    handleClickOutside(n) {
      this.$refs.dropdown && !this.$refs.dropdown.contains(n.target) && (this.showDropdown = !1, document.removeEventListener("click", this.handleClickOutside));
    }
  },
  mounted() {
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  props: {
    align: {
      type: String,
      default: "left"
    },
    iconName: {
      type: String,
      required: !1
    },
    hasDropdown: {
      type: Boolean,
      default: !1
    },
    iconSvg: {
      type: String,
      required: !1
    },
    label: {
      type: String,
      required: !1
    },
    activeClass: {
      type: String,
      required: !1,
      default: "vueberg-menu-item--active"
    },
    active: {
      type: Boolean
    }
  }
};
function wf(n, e, t, r, i, o) {
  return O(), P("div", {
    class: "vueberg-menu-item",
    onClick: e[0] || (e[0] = (...s) => o.toggleDropdown && o.toggleDropdown(...s))
  }, [
    ms(n.$slots, "default"),
    t.hasDropdown ? (O(), P("div", {
      key: 0,
      class: Ot([{
        "vueberg-menu-item-dropdown--left": t.align === "left",
        "vueberg-menu-item-dropdown--right": t.align === "right",
        "vueberg-menu-item-dropdown--open": i.showDropdown
      }, "vueberg-menu-item-dropdown"]),
      ref: "dropdown"
    }, [
      ms(n.$slots, "dropdown")
    ], 2)) : X("", !0)
  ]);
}
const Lc = /* @__PURE__ */ gt(kf, [["render", wf]]);
function he(n) {
  this.content = n;
}
he.prototype = {
  constructor: he,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n)
        return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), o = r.content.slice();
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new he(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1)
      return this;
    var t = this.content.slice();
    return t.splice(e, 2), new he(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new he([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new he(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new he(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = he.from(n), n.size ? new he(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = he.from(n), n.size ? new he(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = he.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
he.from = function(n) {
  if (n instanceof he)
    return n;
  var e = [];
  if (n)
    for (var t in n)
      e.push(t, n[t]);
  return new he(e);
};
function Ic(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), o = e.child(r);
    if (i == o) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(o))
      return t;
    if (i.isText && i.text != o.text) {
      for (let s = 0; i.text[s] == o.text[s]; s++)
        t++;
      return t;
    }
    if (i.content.size || o.content.size) {
      let s = Ic(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function Rc(n, e, t, r) {
  for (let i = n.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: t, b: r };
    let s = n.child(--i), l = e.child(--o), a = s.nodeSize;
    if (s == l) {
      t -= a, r -= a;
      continue;
    }
    if (!s.sameMarkup(l))
      return { a: t, b: r };
    if (s.isText && s.text != l.text) {
      let c = 0, u = Math.min(s.text.length, l.text.length);
      for (; c < u && s.text[s.text.length - c - 1] == l.text[l.text.length - c - 1]; )
        c++, t--, r--;
      return { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = Rc(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class C {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, o) {
    for (let s = 0, l = 0; l < t; s++) {
      let a = this.content[s], c = l + a.nodeSize;
      if (c > e && r(a, i + l, o || null, s) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), r, i + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, i) {
    let o = "", s = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (s ? s = !1 : o += r), o += c;
    }, 0), o;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), o = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), o = 1); o < e.content.length; o++)
      i.push(e.content[o]);
    return new C(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let o = 0, s = 0; s < t; o++) {
        let l = this.content[o], a = s + l.nodeSize;
        a > e && ((s < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, t - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, t - s - 1))), r.push(l), i += l.nodeSize), s = a;
      }
    return new C(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? C.empty : e == 0 && t == this.content.length ? this : new C(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), o = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new C(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new C([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new C(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return Ic(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Rc(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. (Not public.)
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return ti(0, e);
    if (e == this.size)
      return ti(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let o = this.child(r), s = i + o.nodeSize;
      if (s >= e)
        return s == e || t > 0 ? ti(r + 1, s) : ti(r, i);
      i = s;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return C.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new C(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return C.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new C(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return C.empty;
    if (e instanceof C)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new C([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
C.empty = new C([], 0);
const Ro = { index: 0, offset: 0 };
function ti(n, e) {
  return Ro.index = n, Ro.offset = e, Ro;
}
function wi(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!wi(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !wi(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let J = class gs {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      if (this.eq(o))
        return e;
      if (this.type.excludes(o.type))
        t || (t = e.slice(0, i));
      else {
        if (o.type.excludes(this.type))
          return e;
        !r && o.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(o);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && wi(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    return r.create(t.attrs);
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return gs.none;
    if (e instanceof gs)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
J.none = [];
class xi extends Error {
}
class A {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = Fc(this.content, e + this.openStart, t);
    return r && new A(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new A(Pc(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return A.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new A(C.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let o = e.firstChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.firstChild)
      r++;
    for (let o = e.lastChild; o && !o.isLeaf && (t || !o.type.spec.isolating); o = o.lastChild)
      i++;
    return new A(e, r, i);
  }
}
A.empty = new A(C.empty, 0, 0);
function Pc(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Pc(o.content, e - i - 1, t - i - 1)));
}
function Fc(n, e, t, r) {
  let { index: i, offset: o } = n.findIndex(e), s = n.maybeChild(i);
  if (o == e || s.isText)
    return r && !r.canReplace(i, i, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let l = Fc(s.content, e - o - 1, t);
  return l && n.replaceChild(i, s.copy(l));
}
function xf(n, e, t) {
  if (t.openStart > n.depth)
    throw new xi("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new xi("Inconsistent open depths");
  return Hc(n, e, t, 0);
}
function Hc(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Hc(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return dn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = Cf(t, n);
      return dn(o, Vc(n, s, l, e, r));
    }
  else
    return dn(o, Ci(n, e, r));
}
function zc(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new xi("Cannot join " + e.type.name + " onto " + n.type.name);
}
function ys(n, e, t) {
  let r = n.node(t);
  return zc(r, e.node(t)), r;
}
function un(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function dr(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (un(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    un(i.child(l), r);
  e && e.depth == t && e.textOffset && un(e.nodeBefore, r);
}
function dn(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Vc(n, e, t, r, i) {
  let o = n.depth > i && ys(n, e, i + 1), s = r.depth > i && ys(t, r, i + 1), l = [];
  return dr(null, n, i, l), o && s && e.index(i) == t.index(i) ? (zc(o, s), un(dn(o, Vc(n, e, t, r, i + 1)), l)) : (o && un(dn(o, Ci(n, e, i + 1)), l), dr(e, t, i, l), s && un(dn(s, Ci(t, r, i + 1)), l)), dr(r, null, i, l), new C(l);
}
function Ci(n, e, t) {
  let r = [];
  if (dr(null, n, t, r), n.depth > t) {
    let i = ys(n, e, t + 1);
    un(dn(i, Ci(n, e, t + 1)), r);
  }
  return dr(e, null, t, r), new C(r);
}
function Cf(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(C.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class wr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let o = 0; o < e; o++)
      i += r.child(o).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return J.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let o = r.marks;
    for (var s = 0; s < o.length; s++)
      o[s].type.spec.inclusive === !1 && (!i || !o[s].isInSet(i.marks)) && (o = o[s--].removeFromSet(o));
    return o;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var o = 0; o < r.length; o++)
      r[o].type.spec.inclusive === !1 && (!i || !r[o].isInSet(i.marks)) && (r = r[o--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new Ti(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, o = t;
    for (let s = e; ; ) {
      let { index: l, offset: a } = s.content.findIndex(o), c = o - a;
      if (r.push(s, l, i + a), !c || (s = s.child(l), s.isText))
        break;
      o = c - 1, i += a + 1;
    }
    return new wr(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    for (let i = 0; i < Po.length; i++) {
      let o = Po[i];
      if (o.pos == t && o.doc == e)
        return o;
    }
    let r = Po[Fo] = wr.resolve(e, t);
    return Fo = (Fo + 1) % Tf, r;
  }
}
let Po = [], Fo = 0, Tf = 12;
class Ti {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Sf = /* @__PURE__ */ Object.create(null);
let fn = class bs {
  /**
  @internal
  */
  constructor(e, t, r, i = J.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || C.empty;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively between
  the given two positions that are relative to start of this
  node's content. The callback is invoked with the node, its
  position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.
  */
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && wi(this.attrs, t || e.defaultAttrs || Sf) && J.sameSet(this.marks, r || J.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new bs(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new bs(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return A.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new A(c, i.depth - s, o.depth - s);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return xf(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return wr.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return wr.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (o) => (r.isInSet(o.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), _c(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = C.empty, i = 0, o = r.childCount) {
    let s = this.contentMatchAt(e).matchFragment(r, i, o), l = s && s.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < o; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let o = this.contentMatchAt(e).matchType(r), s = o && o.matchFragment(this.content, t);
    return s ? s.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise error when they do not.
  */
  check() {
    this.type.checkContent(this.content);
    let e = J.none;
    for (let t = 0; t < this.marks.length; t++)
      e = this.marks[t].addToSet(e);
    if (!J.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r = null;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = C.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
fn.prototype.text = void 0;
class Si extends fn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : _c(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new Si(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Si(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function _c(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class yn {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Mf(e, t);
    if (r.next == null)
      return yn.empty;
    let i = jc(r);
    r.next && r.err("Unexpected trailing text");
    let o = Lf(Bf(i));
    return If(o, r), o;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let o = t; i && o < r; o++)
      i = i.matchType(e.child(o).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function o(s, l) {
      let a = s.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return C.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: u, next: d } = s.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let f = o(d, l.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return o(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), o = i.match;
      if (o.matchType(e)) {
        let s = [];
        for (let l = i; l.type; l = l.via)
          s.push(l.type);
        return s.reverse();
      }
      for (let s = 0; s < o.next.length; s++) {
        let { type: l, next: a } = o.next[s];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let o = i + (r.validEnd ? "*" : " ") + " ";
      for (let s = 0; s < r.next.length; s++)
        o += (s ? ", " : "") + r.next[s].type.name + "->" + e.indexOf(r.next[s].next);
      return o;
    }).join(`
`);
  }
}
yn.empty = new yn(!0);
class Mf {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function jc(n) {
  let e = [];
  do
    e.push(Ef(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Ef(n) {
  let e = [];
  do
    e.push(Af(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Af(n) {
  let e = Df(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Of(n, e);
    else
      break;
  return e;
}
function zl(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Of(n, e) {
  let t = zl(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = zl(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Nf(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let o in t) {
    let s = t[o];
    s.groups.indexOf(e) > -1 && i.push(s);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function Df(n) {
  if (n.eat("(")) {
    let e = jc(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Nf(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Bf(n) {
  let e = [[]];
  return i(o(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(s, l, a) {
    let c = { term: a, to: l };
    return e[s].push(c), c;
  }
  function i(s, l) {
    s.forEach((a) => a.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((a, c) => a.concat(o(c, l)), []);
    if (s.type == "seq")
      for (let a = 0; ; a++) {
        let c = o(s.exprs[a], l);
        if (a == s.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (s.type == "star") {
      let a = t();
      return r(l, a), i(o(s.expr, a), a), [r(a)];
    } else if (s.type == "plus") {
      let a = t();
      return i(o(s.expr, l), a), i(o(s.expr, a), a), [r(a)];
    } else {
      if (s.type == "opt")
        return [r(l)].concat(o(s.expr, l));
      if (s.type == "range") {
        let a = l;
        for (let c = 0; c < s.min; c++) {
          let u = t();
          i(o(s.expr, a), u), a = u;
        }
        if (s.max == -1)
          i(o(s.expr, a), a);
        else
          for (let c = s.min; c < s.max; c++) {
            let u = t();
            r(a, u), i(o(s.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (s.type == "name")
          return [r(l, void 0, s.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function $c(n, e) {
  return e - n;
}
function Vl(n, e) {
  let t = [];
  return r(e), t.sort($c);
  function r(i) {
    let o = n[i];
    if (o.length == 1 && !o[0].term)
      return r(o[0].to);
    t.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: l, to: a } = o[s];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function Lf(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Vl(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Vl(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new yn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort($c);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function If(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Wc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function qc(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let o = n[r];
      if (o.hasDefault)
        i = o.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function Kc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  if (n)
    for (let t in n)
      e[t] = new Rf(n[t]);
  return e;
}
let _l = class Uc {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Kc(r.attrs), this.defaultAttrs = Wc(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == yn.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : qc(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new fn(this, this.computeAttrs(e), C.from(t), J.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = C.from(t), this.checkContent(t), new fn(this, this.computeAttrs(e), t, J.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = C.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(C.empty, !0);
    return o ? new fn(this, e, t.append(o), J.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type with the given attributes.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : J.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Uc(o, t, s));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let o in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
class Rf {
  constructor(e) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(e, "default"), this.default = e.default;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class yo {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Kc(i.attrs), this.excluded = null;
    let o = Wc(this.attrs);
    this.instance = o ? new J(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new J(this, qc(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new yo(o, i++, t, s)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Pf {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = he.from(e.nodes), t.marks = he.from(e.marks || {}), this.nodes = _l.compile(this.spec.nodes, this), this.marks = yo.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = yn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? jl(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : jl(this, s.split(" "));
    }
    this.nodeFromJSON = this.nodeFromJSON.bind(this), this.markFromJSON = this.markFromJSON.bind(this), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof _l) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else
      throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new Si(r, r.defaultAttrs, e, J.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  Deserialize a node from its JSON representation. This method is
  bound.
  */
  nodeFromJSON(e) {
    return fn.fromJSON(this, e);
  }
  /**
  Deserialize a mark from its JSON representation. This method is
  bound.
  */
  markFromJSON(e) {
    return J.fromJSON(this, e);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function jl(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], o = n.marks[i], s = o;
    if (o)
      t.push(o);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(s = a);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function Ff(n) {
  return n.tag != null;
}
function Hf(n) {
  return n.style != null;
}
class Wn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [], t.forEach((r) => {
      Ff(r) ? this.tags.push(r) : Hf(r) && this.styles.push(r);
    }), this.normalizeLists = !this.tags.some((r) => {
      if (!/^(ul|ol)\b/.test(r.tag) || !r.node)
        return !1;
      let i = e.nodes[r.node];
      return i.contentMatch.matchType(i);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new Wl(this, t, !1);
    return r.addAll(e, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new Wl(this, t, !0);
    return r.addAll(e, t.from, t.to), A.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (_f(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
        if (o.getAttrs) {
          let s = o.getAttrs(e);
          if (s === !1)
            continue;
          o.attrs = s || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, i) {
    for (let o = i ? this.styles.indexOf(i) + 1 : 0; o < this.styles.length; o++) {
      let s = this.styles[o], l = s.style;
      if (!(l.indexOf(e) != 0 || s.context && !r.matchesContext(s.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (s.getAttrs) {
          let a = s.getAttrs(t);
          if (a === !1)
            continue;
          s.attrs = a || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let o = i.priority == null ? 50 : i.priority, s = 0;
      for (; s < t.length; s++) {
        let l = t[s];
        if ((l.priority == null ? 50 : l.priority) < o)
          break;
      }
      t.splice(s, 0, i);
    }
    for (let i in e.marks) {
      let o = e.marks[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = ql(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = ql(s)), s.node || s.ignore || s.mark || (s.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new Wn(e, Wn.schemaRules(e)));
  }
}
const Jc = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, zf = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Gc = { ol: !0, ul: !0 }, Mi = 1, Ei = 2, fr = 4;
function $l(n, e, t) {
  return e != null ? (e ? Mi : 0) | (e === "full" ? Ei : 0) : n && n.whitespace == "pre" ? Mi | Ei : t & ~fr;
}
class ni {
  constructor(e, t, r, i, o, s, l) {
    this.type = e, this.attrs = t, this.marks = r, this.pendingMarks = i, this.solid = o, this.options = l, this.content = [], this.activeMarks = J.none, this.stashMarks = [], this.match = s || (l & fr ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(C.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Mi)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = C.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(C.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  popFromStashMark(e) {
    for (let t = this.stashMarks.length - 1; t >= 0; t--)
      if (e.eq(this.stashMarks[t]))
        return this.stashMarks.splice(t, 1)[0];
  }
  applyPending(e) {
    for (let t = 0, r = this.pendingMarks; t < r.length; t++) {
      let i = r[t];
      (this.type ? this.type.allowsMarkType(i.type) : $f(i.type, e)) && !i.isInSet(this.activeMarks) && (this.activeMarks = i.addToSet(this.activeMarks), this.pendingMarks = i.removeFromSet(this.pendingMarks));
    }
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Jc.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Wl {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0;
    let i = t.topNode, o, s = $l(null, t.preserveWhitespace, 0) | (r ? fr : 0);
    i ? o = new ni(i.type, i.attrs, J.none, J.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new ni(null, null, J.none, J.none, !0, null, s) : o = new ni(e.schema.topNodeType, null, J.none, J.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e) {
    e.nodeType == 3 ? this.addTextNode(e) : e.nodeType == 1 && this.addElement(e);
  }
  withStyleRules(e, t) {
    let r = e.getAttribute("style");
    if (!r)
      return t();
    let i = this.readStyles(jf(r));
    if (!i)
      return;
    let [o, s] = i, l = this.top;
    for (let a = 0; a < s.length; a++)
      this.removePendingMark(s[a], l);
    for (let a = 0; a < o.length; a++)
      this.addPendingMark(o[a]);
    t();
    for (let a = 0; a < o.length; a++)
      this.removePendingMark(o[a], l);
    for (let a = 0; a < s.length; a++)
      this.addPendingMark(s[a]);
  }
  addTextNode(e) {
    let t = e.nodeValue, r = this.top;
    if (r.options & Ei || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(t)) {
      if (r.options & Mi)
        r.options & Ei ? t = t.replace(/\r\n?/g, `
`) : t = t.replace(/\r?\n|\r/g, " ");
      else if (t = t.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(t) && this.open == this.nodes.length - 1) {
        let i = r.content[r.content.length - 1], o = e.previousSibling;
        (!i || o && o.nodeName == "BR" || i.isText && /[ \t\r\n\u000c]$/.test(i.text)) && (t = t.slice(1));
      }
      t && this.insertNode(this.parser.schema.text(t)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t) {
    let r = e.nodeName.toLowerCase(), i;
    Gc.hasOwnProperty(r) && this.parser.normalizeLists && Vf(e);
    let o = this.options.ruleFromNode && this.options.ruleFromNode(e) || (i = this.parser.matchTag(e, this, t));
    if (o ? o.ignore : zf.hasOwnProperty(r))
      this.findInside(e), this.ignoreFallback(e);
    else if (!o || o.skip || o.closeParent) {
      o && o.closeParent ? this.open = Math.max(0, this.open - 1) : o && o.skip.nodeType && (e = o.skip);
      let s, l = this.top, a = this.needsBlock;
      if (Jc.hasOwnProperty(r))
        l.content.length && l.content[0].isInline && this.open && (this.open--, l = this.top), s = !0, l.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e);
        return;
      }
      o && o.skip ? this.addAll(e) : this.withStyleRules(e, () => this.addAll(e)), s && this.sync(l), this.needsBlock = a;
    } else
      this.withStyleRules(e, () => {
        this.addElementByRule(e, o, o.consuming === !1 ? i : void 0);
      });
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`));
  }
  // Called for ignored nodes
  ignoreFallback(e) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"));
  }
  // Run any style parser associated with the node's styles. Either
  // return an array of marks, or null to indicate some of the styles
  // had a rule with `ignore` set.
  readStyles(e) {
    let t = J.none, r = J.none;
    for (let i = 0; i < e.length; i += 2)
      for (let o = void 0; ; ) {
        let s = this.parser.matchStyle(e[i], e[i + 1], this, o);
        if (!s)
          break;
        if (s.ignore)
          return null;
        if (s.clearMark ? this.top.pendingMarks.concat(this.top.activeMarks).forEach((l) => {
          s.clearMark(l) && (r = l.addToSet(r));
        }) : t = this.parser.schema.marks[s.mark].create(s.attrs).addToSet(t), s.consuming === !1)
          o = s;
        else
          break;
      }
    return [t, r];
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r) {
    let i, o, s;
    t.node ? (o = this.parser.schema.nodes[t.node], o.isLeaf ? this.insertNode(o.create(t.attrs)) || this.leafFallback(e) : i = this.enter(o, t.attrs || null, t.preserveWhitespace)) : (s = this.parser.schema.marks[t.mark].create(t.attrs), this.addPendingMark(s));
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (r)
      this.addElement(e, r);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a);
    }
    i && this.sync(l) && this.open--, s && this.removePendingMark(s, l);
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r) {
    let i = t || 0;
    for (let o = t ? e.childNodes[t] : e.firstChild, s = r == null ? null : e.childNodes[r]; o != s; o = o.nextSibling, ++i)
      this.findAtPoint(e, i), this.addDOM(o);
    this.findAtPoint(e, i);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e) {
    let t, r;
    for (let i = this.open; i >= 0; i--) {
      let o = this.nodes[i], s = o.findWrapping(e);
      if (s && (!t || t.length > s.length) && (t = s, r = o, !s.length) || o.solid)
        break;
    }
    if (!t)
      return !1;
    this.sync(r);
    for (let i = 0; i < t.length; i++)
      this.enterInner(t[i], null, !1);
    return !0;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let t = this.textblockFromContext();
      t && this.enterInner(t);
    }
    if (this.findPlace(e)) {
      this.closeExtra();
      let t = this.top;
      t.applyPending(e.type), t.match && (t.match = t.match.matchType(e.type));
      let r = t.activeMarks;
      for (let i = 0; i < e.marks.length; i++)
        (!t.type || t.type.allowsMarkType(e.marks[i].type)) && (r = e.marks[i].addToSet(r));
      return t.content.push(e.mark(r)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r) {
    let i = this.findPlace(e.create(t));
    return i && this.enterInner(e, t, !0, r), i;
  }
  // Open a node of the given type
  enterInner(e, t = null, r = !1, i) {
    this.closeExtra();
    let o = this.top;
    o.applyPending(e), o.match = o.match && o.match.matchType(e);
    let s = $l(e, i, o.options);
    o.options & fr && o.content.length == 0 && (s |= fr), this.nodes.push(new ni(e, t, o.activeMarks, o.pendingMarks, r, null, s)), this.open++;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(this.isOpen || this.options.topOpen);
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--)
      if (this.nodes[t] == e)
        return this.open = t, !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), s = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= o; a--)
            if (s(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= o ? r.node(a - o).type : null;
          if (!u || u.name != c && u.groups.indexOf(c) == -1)
            return !1;
          a--;
        }
      }
      return !0;
    };
    return s(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
  addPendingMark(e) {
    let t = Wf(e, this.top.pendingMarks);
    t && this.top.stashMarks.push(t), this.top.pendingMarks = e.addToSet(this.top.pendingMarks);
  }
  removePendingMark(e, t) {
    for (let r = this.open; r >= 0; r--) {
      let i = this.nodes[r];
      if (i.pendingMarks.lastIndexOf(e) > -1)
        i.pendingMarks = e.removeFromSet(i.pendingMarks);
      else {
        i.activeMarks = e.removeFromSet(i.activeMarks);
        let s = i.popFromStashMark(e);
        s && i.type && i.type.allowsMarkType(s.type) && (i.activeMarks = s.addToSet(i.activeMarks));
      }
      if (i == t)
        break;
    }
  }
}
function Vf(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Gc.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function _f(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function jf(n) {
  let e = /\s*([\w-]+)\s*:\s*([^;]+)/g, t, r = [];
  for (; t = e.exec(n); )
    r.push(t[1], t[2].trim());
  return r;
}
function ql(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function $f(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let o = [], s = (l) => {
      o.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || o.indexOf(u) < 0 && s(u))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
function Wf(n, e) {
  for (let t = 0; t < e.length; t++)
    if (n.eq(e[t]))
      return e[t];
}
class ut {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = Ho(t).createDocumentFragment());
    let i = r, o = [];
    return e.forEach((s) => {
      if (o.length || s.marks.length) {
        let l = 0, a = 0;
        for (; l < o.length && a < s.marks.length; ) {
          let c = s.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(o[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < o.length; )
          i = o.pop()[1];
        for (; a < s.marks.length; ) {
          let c = s.marks[a++], u = this.serializeMark(c, s.isInline, t);
          u && (o.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(s, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    let { dom: r, contentDOM: i } = ut.renderSpec(Ho(t), this.nodes[e.type.name](e));
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let o = this.serializeMark(e.marks[i], e.isInline, t);
      o && ((o.contentDOM || o.dom).appendChild(r), r = o.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && ut.renderSpec(Ho(r), i(e, t));
  }
  /**
  Render an [output spec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) to a DOM node. If
  the spec has a hole (zero) in it, `contentDOM` will point at the
  node with the hole.
  */
  static renderSpec(e, t, r = null) {
    if (typeof t == "string")
      return { dom: e.createTextNode(t) };
    if (t.nodeType != null)
      return { dom: t };
    if (t.dom && t.dom.nodeType != null)
      return t;
    let i = t[0], o = i.indexOf(" ");
    o > 0 && (r = i.slice(0, o), i = i.slice(o + 1));
    let s, l = r ? e.createElementNS(r, i) : e.createElement(i), a = t[1], c = 1;
    if (a && typeof a == "object" && a.nodeType == null && !Array.isArray(a)) {
      c = 2;
      for (let u in a)
        if (a[u] != null) {
          let d = u.indexOf(" ");
          d > 0 ? l.setAttributeNS(u.slice(0, d), u.slice(d + 1), a[u]) : l.setAttribute(u, a[u]);
        }
    }
    for (let u = c; u < t.length; u++) {
      let d = t[u];
      if (d === 0) {
        if (u < t.length - 1 || u > c)
          throw new RangeError("Content hole must be the only child of its parent node");
        return { dom: l, contentDOM: l };
      } else {
        let { dom: f, contentDOM: h } = ut.renderSpec(e, d, r);
        if (l.appendChild(f), h) {
          if (s)
            throw new RangeError("Multiple content holes");
          s = h;
        }
      }
    }
    return { dom: l, contentDOM: s };
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new ut(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = Kl(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return Kl(e.marks);
  }
}
function Kl(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function Ho(n) {
  return n.document || window.document;
}
const Yc = 65535, Qc = Math.pow(2, 16);
function qf(n, e) {
  return n + e * Qc;
}
function Ul(n) {
  return n & Yc;
}
function Kf(n) {
  return (n - (n & Yc)) / Qc;
}
const Xc = 1, Zc = 2, pi = 4, eu = 8;
class vs {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & eu) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Xc | pi)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Zc | pi)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & pi) > 0;
  }
}
class Fe {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Fe.empty)
      return Fe.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Ul(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Kf(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = this.ranges[l + s], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : t : t, h = a + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (t < 0 ? a : d) ? null : qf(l / 3, e - a), g = e == a ? Zc : e == d ? Xc : pi;
        return (t < 0 ? e != a : e != d) && (g |= eu), new vs(h, g, p);
      }
      i += u - c;
    }
    return r ? e + i : new vs(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Ul(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + s] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, o = 0; i < this.ranges.length; i += 3) {
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), a = s + (this.inverted ? 0 : o), c = this.ranges[i + t], u = this.ranges[i + r];
      e(l, l + c, a, a + u), o += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Fe(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Fe.empty : new Fe(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Fe.empty = new Fe([]);
class Hn {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e = [], t, r = 0, i = e.length) {
    this.maps = e, this.mirror = t, this.from = r, this.to = i;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new Hn(this.maps, this.mirror, e, t);
  }
  /**
  @internal
  */
  copy() {
    return new Hn(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.to = this.maps.push(e), t != null && this.setMirror(this.maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this.maps.length; t < e.maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this.maps.length + e.maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e.maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Hn();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this.maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let o = this.from; o < this.to; o++) {
      let s = this.maps[o], l = s.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(o);
        if (a != null && a > o && a < this.to) {
          o = a, e = this.maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new vs(e, i, null);
  }
}
const zo = /* @__PURE__ */ Object.create(null);
class ke {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Fe.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = zo[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in zo)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return zo[e] = t, t.prototype.jsonID = e, t;
  }
}
class se {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new se(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new se(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return se.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof xi)
        return se.fail(o.message);
      throw o;
    }
  }
}
function tl(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(tl(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return C.fromArray(r);
}
class Vt extends ke {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new A(tl(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return se.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new dt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Vt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Vt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Vt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new Vt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ke.jsonID("addMark", Vt);
class dt extends ke {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new A(tl(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return se.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new Vt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new dt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof dt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new dt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new dt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ke.jsonID("removeMark", dt);
class _t extends ke {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return se.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return se.fromReplace(e, this.pos, this.pos + 1, new A(C.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new _t(this.pos, t.marks[i]);
        return new _t(this.pos, this.mark);
      }
    }
    return new qn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new _t(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new _t(t.pos, e.markFromJSON(t.mark));
  }
}
ke.jsonID("addNodeMark", _t);
class qn extends ke {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return se.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return se.fromReplace(e, this.pos, this.pos + 1, new A(C.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new _t(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new qn(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new qn(t.pos, e.markFromJSON(t.mark));
  }
}
ke.jsonID("removeNodeMark", qn);
class ae extends ke {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && ks(e, this.from, this.to) ? se.fail("Structure replace would overwrite content") : se.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Fe([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new ae(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new ae(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof ae) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? A.empty : new A(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new ae(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? A.empty : new A(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new ae(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new ae(t.from, t.to, A.fromJSON(e, t.slice), !!t.structure);
  }
}
ke.jsonID("replace", ae);
class ce extends ke {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, o, s, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = o, this.insert = s, this.structure = l;
  }
  apply(e) {
    if (this.structure && (ks(e, this.from, this.gapFrom) || ks(e, this.gapTo, this.to)))
      return se.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return se.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? se.fromReplace(e, this.from, this.to, r) : se.fail("Content does not fit in gap");
  }
  getMap() {
    return new Fe([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new ce(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new ce(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new ce(t.from, t.to, t.gapFrom, t.gapTo, A.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
ke.jsonID("replaceAround", ce);
function ks(n, e, t) {
  let r = n.resolve(e), i = t - e, o = r.depth;
  for (; i > 0 && o > 0 && r.indexAfter(o) == r.node(o).childCount; )
    o--, i--;
  if (i > 0) {
    let s = r.node(o).maybeChild(r.indexAfter(o));
    for (; i > 0; ) {
      if (!s || s.isLeaf)
        return !0;
      s = s.firstChild, i--;
    }
  }
  return !1;
}
function Uf(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(p) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = h : i.push(s = new dt(f, h, d[g])));
      l && l.to == f ? l.to = h : o.push(l = new Vt(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function Jf(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof yo) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else
      r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == o - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = o) : i.push({ style: d, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new dt(s.from, s.to, s.style)));
}
function tu(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      s.push(new ae(l, u, A.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new dt(l, u, c.marks[f]));
      if (i && c.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new A(C.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new ae(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(C.empty, !0);
    n.replace(l, l, new A(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function Gf(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function er(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), o = n.$from.index(r), s = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(o, s, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !Gf(i, o, s))
      break;
  }
  return null;
}
function Yf(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = C.empty, d = 0;
  for (let p = o, g = !1; p > t; p--)
    g || r.index(p) > 0 ? (g = !0, u = C.from(r.node(p).copy(u)), d++) : a--;
  let f = C.empty, h = 0;
  for (let p = o, g = !1; p > t; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, f = C.from(i.node(p).copy(f)), h++) : c++;
  n.step(new ce(a, c, s, l, new A(u.append(f), d, h), u.size - d, !0));
}
function nl(n, e, t = null, r = n) {
  let i = Qf(n, e), o = i && Xf(r, e);
  return o ? i.map(Jl).concat({ type: e, attrs: t }).concat(o.map(Jl)) : null;
}
function Jl(n) {
  return { type: n, attrs: null };
}
function Qf(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Xf(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function Zf(n, e, t) {
  let r = C.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = C.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new ce(i, o, i, o, new A(r, 0, 0), t.length, !0));
}
function eh(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (s.isTextblock && !s.hasMarkup(r, i) && rh(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let f = r.whitespace == "pre", h = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        f && !h ? a = !1 : !f && h && (a = !0);
      }
      a === !1 && nh(n, s, l, o), tu(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let c = n.mapping.slice(o), u = c.map(l, 1), d = c.map(l + s.nodeSize, 1);
      return n.step(new ce(u, d, u + 1, d - 1, new A(C.from(r.create(i, null, s.marks)), 0, 0), 1, !0)), a === !0 && th(n, s, l, o), !1;
    }
  });
}
function th(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.isText) {
      let s, l = /\r?\n|\r/g;
      for (; s = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + o + s.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function nh(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function rh(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function ih(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new ce(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new A(C.from(s), 0, 0), 1, !0));
}
function zn(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > o; c--, u--) {
    let d = i.node(c), f = i.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let g = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !g.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function oh(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = C.empty, s = C.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = C.from(i.node(l).copy(o));
    let u = r && r[c];
    s = C.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new ae(e, e, new A(o.append(s), t, t), !0));
}
function Gt(n, e) {
  let t = n.resolve(e), r = t.index();
  return nu(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function nu(n, e) {
  return !!(n && e && !n.isLeaf && n.canAppend(e));
}
function bo(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && nu(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function sh(n, e, t) {
  let r = new ae(e - t, e + t, A.empty, !0);
  n.step(r);
}
function lh(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.index(i);
      if (r.node(i).canReplaceWith(o, o, t))
        return r.before(i + 1);
      if (o > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let o = r.indexAfter(i);
      if (r.node(i).canReplaceWith(o, o, t))
        return r.after(i + 1);
      if (o < r.node(i).childCount)
        return null;
    }
  return null;
}
function ah(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let o = 0; o < t.openStart; o++)
    i = i.firstChild.content;
  for (let o = 1; o <= (t.openStart == 0 && t.size ? 2 : 1); o++)
    for (let s = r.depth; s >= 0; s--) {
      let l = s == r.depth ? 0 : r.pos <= (r.start(s + 1) + r.end(s + 1)) / 2 ? -1 : 1, a = r.index(s) + (l > 0 ? 1 : 0), c = r.node(s), u = !1;
      if (o == 1)
        u = c.canReplace(a, a, i);
      else {
        let d = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = d && c.canReplaceWith(a, a, d[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(s + 1) : r.after(s + 1);
    }
  return null;
}
function vo(n, e, t = e, r = A.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return ru(i, o, r) ? new ae(e, t, r) : new ch(i, o, r).fit();
}
function ru(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class ch {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = C.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = C.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let a = new A(o, s, l);
    return e > -1 ? new ce(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new ae(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let o = t.firstChild;
      if (t.childCount > 1 && (i = 0), o.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = o.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, o = null;
        r ? (o = Vo(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? c.matchType(s.type) || (d = c.fillBefore(C.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Vo(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new A(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Vo(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new A(ar(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new A(ar(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: o }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (o)
      for (let g = 0; g < o.length; g++)
        this.openFrontierNode(o[g]);
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        u.push(i.child(g));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let g = l.child(c), y = d.matchType(g.type);
      if (!y)
        break;
      c++, (c > 1 || a == 0 || g.content.size) && (d = y, u.push(iu(g.mark(f.allowedMarks(g.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = cr(this.placed, t, C.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, y = l; g < h; g++) {
      let b = y.lastChild;
      this.frontier.push({ type: b.type, match: b.contentMatchAt(b.childCount) }), y = b.content;
    }
    this.unplaced = p ? e == 0 ? A.empty : new A(ar(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new A(ar(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !_o(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e:
      for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
        let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = _o(e, t, i, r, o);
        if (s) {
          for (let l = t - 1; l >= 0; l--) {
            let { match: a, type: c } = this.frontier[l], u = _o(e, l, c, a, !0);
            if (!u || u.childCount)
              continue e;
          }
          return { depth: t, fit: s, move: o ? e.doc.resolve(e.after(t + 1)) : e };
        }
      }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = cr(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = cr(this.placed, this.depth, C.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(C.empty, !0);
    t.childCount && (this.placed = cr(this.placed, this.frontier.length, t));
  }
}
function ar(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(ar(n.firstChild.content, e - 1, t)));
}
function cr(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(cr(n.lastChild.content, e - 1, t)));
}
function Vo(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function iu(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, iu(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(C.empty, !0)))), n.copy(r);
}
function _o(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !uh(t, o.content, s) ? l : null;
}
function uh(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function dh(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function fh(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (ru(i, o, r))
    return n.step(new ae(e, t, r));
  let s = su(i, n.doc.resolve(t));
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(f) > -1 ? l = f : i.before(f) == h && s.splice(1, 0, -f);
  }
  let a = s.indexOf(l), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], p = dh(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let g = 0; g < s.length; g++) {
        let y = s[(g + a) % s.length], b = !0;
        y < 0 && (b = !1, y = -y);
        let x = i.node(y - 1), T = i.index(y - 1);
        if (x.canReplaceWith(T, T, p.type, p.marks))
          return n.replace(i.before(y), b ? o.after(y) : t, new A(ou(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function ou(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(ou(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(C.empty, !0));
  }
  return n;
}
function hh(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = lh(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new A(C.from(r), 0, 0));
}
function ph(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), o = su(r, i);
  for (let s = 0; s < o.length; s++) {
    let l = o[s], a = s == o.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let s = 1; s <= r.depth && s <= i.depth; s++)
    if (e - r.start(s) == r.depth - s && t > r.end(s) && i.end(s) - t != i.depth - s)
      return n.delete(r.before(s), t);
  n.delete(e, t);
}
function su(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Vn extends ke {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return se.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return se.fromReplace(e, this.pos, this.pos + 1, new A(C.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Fe.empty;
  }
  invert(e) {
    return new Vn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Vn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Vn(t.pos, t.attr, t.value);
  }
}
ke.jsonID("attr", Vn);
class xr extends ke {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return se.ok(r);
  }
  getMap() {
    return Fe.empty;
  }
  invert(e) {
    return new xr(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new xr(t.attr, t.value);
  }
}
ke.jsonID("docAttr", xr);
let Kn = class extends Error {
};
Kn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Kn.prototype = Object.create(Error.prototype);
Kn.prototype.constructor = Kn;
Kn.prototype.name = "TransformError";
class lu {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Hn();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new Kn(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = A.empty) {
    let i = vo(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new A(C.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, A.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return fh(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return hh(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return ph(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Yf(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return sh(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Zf(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return eh(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return ih(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Vn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new xr(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new _t(e, t)), this;
  }
  /**
  Remove a mark (or a mark of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    if (!(t instanceof J)) {
      let r = this.doc.nodeAt(e);
      if (!r)
        throw new RangeError("No node at position " + e);
      if (t = t.isInSet(r.marks), !t)
        return this;
    }
    return this.step(new qn(e, t)), this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(e, t = 1, r) {
    return oh(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Uf(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Jf(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return tu(this, e, t, r), this;
  }
}
const jo = /* @__PURE__ */ Object.create(null);
class V {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new mh(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = A.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? A.empty : t), l == 0 && Ql(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], a = e.mapping.slice(r), c = a.map(s.pos), u = a.map(l.pos);
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Ql(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new H(e) : Bn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Bn(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Bn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
      if (s)
        return s;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new et(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Bn(e, e, 0, 0, 1) || new et(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Bn(e, e, e.content.size, e.childCount, -1) || new et(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = jo[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in jo)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return jo[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return H.between(this.$anchor, this.$head).getBookmark();
  }
}
V.prototype.visible = !0;
class mh {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Gl = !1;
function Yl(n) {
  !Gl && !n.parent.inlineContent && (Gl = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class H extends V {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Yl(e), Yl(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return V.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new H(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = A.empty) {
    if (super.replace(e, t), t == A.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof H && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new ko(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new H(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let o = V.findFrom(t, r, !0) || V.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return V.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (V.findFrom(e, -r, !0) || V.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new H(e, t);
  }
}
V.jsonID("text", H);
class ko {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ko(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return H.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class B extends V {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), o = e.resolve(i);
    return r ? V.near(o) : new B(o);
  }
  content() {
    return new A(C.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof B && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new rl(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new B(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new B(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
B.prototype.visible = !1;
V.jsonID("node", B);
class rl {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ko(r, r) : new rl(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && B.isSelectable(r) ? new B(t) : V.near(t);
  }
}
class et extends V {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = A.empty) {
    if (t == A.empty) {
      e.delete(0, e.doc.content.size);
      let r = V.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new et(e);
  }
  map(e) {
    return new et(e);
  }
  eq(e) {
    return e instanceof et;
  }
  getBookmark() {
    return gh;
  }
}
V.jsonID("all", et);
const gh = {
  map() {
    return this;
  },
  resolve(n) {
    return new et(n);
  }
};
function Bn(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return H.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && B.isSelectable(l))
        return B.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Bn(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Ql(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof ae || i instanceof ce))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(V.near(n.doc.resolve(s), t));
}
const Xl = 1, ri = 2, Zl = 4;
class yh extends lu {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Xl) & ~ri, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & Xl) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= ri, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return J.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & ri) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~ri, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || J.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), r = r ?? t, !e)
        return this.deleteRange(t, r);
      let o = this.storedMarks;
      if (!o) {
        let s = this.doc.resolve(t);
        o = r == t ? s.marks() : s.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, o)), this.selection.empty || this.setSelection(V.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= Zl, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & Zl) > 0;
  }
}
function ea(n, e) {
  return !e || !n ? n : n.bind(e);
}
class ur {
  constructor(e, t, r) {
    this.name = e, this.init = ea(t.init, r), this.apply = ea(t.apply, r);
  }
}
const bh = [
  new ur("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new ur("selection", {
    init(n, e) {
      return n.selection || V.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new ur("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new ur("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class $o {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = bh.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new ur(r.key, r.spec.state, r));
    });
  }
}
class Pn {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let o = !1;
      for (let s = 0; s < this.config.plugins.length; s++) {
        let l = this.config.plugins[s];
        if (l.spec.appendTransaction) {
          let a = i ? i[s].n : 0, c = i ? i[s].state : this, u = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (u && r.filterTransaction(u, s)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                i.push(d < s ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), o = !0;
          }
          i && (i[s] = { state: r, n: t.length });
        }
      }
      if (!o)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new Pn(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let o = r[i];
      t[o.name] = o.apply(e, this[o.name], this, t);
    }
    return t;
  }
  /**
  Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new yh(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new $o(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new Pn(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new $o(this.schema, e.plugins), r = t.fields, i = new Pn(t);
    for (let o = 0; o < r.length; o++) {
      let s = r[o].name;
      i[s] = this.hasOwnProperty(s) ? this[s] : r[o].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], o = i.spec.state;
        o && o.toJSON && (t[r] = o.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new $o(e.schema, e.plugins), o = new Pn(i);
    return i.fields.forEach((s) => {
      if (s.name == "doc")
        o.doc = fn.fromJSON(e.schema, t.doc);
      else if (s.name == "selection")
        o.selection = V.fromJSON(o.doc, t.selection);
      else if (s.name == "storedMarks")
        t.storedMarks && (o.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == s.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              o[s.name] = c.fromJSON.call(a, e, t[l], o);
              return;
            }
          }
        o[s.name] = s.init(e, o);
      }
    }), o;
  }
}
function au(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = au(i, e, {})), t[r] = i;
  }
  return t;
}
class le {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && au(e.props, this, this.props), this.key = e.key ? e.key.key : cu("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Wo = /* @__PURE__ */ Object.create(null);
function cu(n) {
  return n in Wo ? n + "$" + ++Wo[n] : (Wo[n] = 0, n + "$");
}
class we {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = cu(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const uu = function(n, e = 0) {
  const { $anchor: t, $from: r } = n.view.state.selection, i = r.nodeAfter;
  if (i && i.type.name === "horizontalRule")
    return { ...i, depth: t.depth + 1, parent: t.node(t.depth) };
  if (n.view.lastSelectedViewDesc && n.view.lastSelectedViewDesc.node.type.name === "horizontalRule")
    return { ...n.view.lastSelectedViewDesc.node, depth: t.depth + 1, parent: t.node(t.depth) };
  let o = t.depth - e > 1 ? t.depth - e : 1, s = t.node(o);
  for (s && s.type.name === "paragraph" && o !== 1 && (s = null); !s && e < t.depth && (e++, o = t.depth - e, !(o < 0)); )
    s = t.node(o);
  if (s) {
    let l = o > 1 ? t.node(o - 1) : null;
    return {
      ...s,
      depth: o,
      parent: l,
      type: { ...s.type, name: s.type.name === "listItem" ? "bulletList" : s.type.name }
    };
  }
  return null;
}, vh = function(n) {
  const { state: e, view: t } = n, { selection: r } = e, i = n.commands.getCurrentNode();
  if (!i)
    return new DOMRect(0, 0, 0, 0);
  const o = r.$anchor.before(i.depth), s = t.coordsAtPos(o);
  return new DOMRect(s.left, s.top, 0, 0);
}, kh = function(n) {
  const e = n.view.state.selection.from, t = n.$pos(e).element;
  if (t) {
    const r = t.getBoundingClientRect();
    return new DOMRect(r.x + r.width - 50, r.top + r.height / 2, 0, 0);
  }
  return new DOMRect(0, 0, 0, 0);
}, wh = function(n) {
  const e = n.state.selection.$from;
  return e.node(1) == null && n.lastSelectedViewDesc ? n.lastSelectedViewDesc.node : e.node(1);
};
let xh = function(n, e) {
  const t = [];
  for (let r = 0; r < n.childCount; r++)
    t.push(
      e(n.child(r), r, n instanceof C ? n : n.content)
    );
  return t;
};
const Ch = function({ view: n, dir: e, currentResolved: t }) {
  if (!t)
    return !1;
  let r = n.state.tr;
  const i = e === "DOWN", o = t.node(1) || t.nodeAfter, s = 0, l = t.node(s), a = t.start(s), c = xh(l, (y) => y);
  let u = c.indexOf(o);
  if (u == -1)
    return !1;
  let d = i ? u + 1 : u - 1;
  if (d >= c.length || d < 0)
    return !1;
  const f = c[d].nodeSize;
  [c[u], c[d]] = [c[d], c[u]];
  let h = a, p = t.end(s);
  const g = new A(C.fromArray(c), 0, 0);
  r.step(new ae(h, p, g, !1)), r.setSelection(
    V.near(
      r.doc.resolve(
        i ? t.pos + f : t.pos - f
      )
    )
  ), n.dispatch(r);
};
const Th = {
  props: {
    editor: {
      type: [Object, Function],
      required: !0
    },
    vuebergWidth: {
      required: !0
    },
    currentBlockTool: {
      type: Object,
      required: !0
    },
    inlineTools: {
      type: Array,
      default: () => []
    },
    alignmentTools: {
      type: Array,
      default: () => []
    },
    customTools: {
      type: [Array, Boolean],
      default: () => !1
    },
    settings: {
      type: Object,
      default: () => []
    }
  },
  components: {
    MenuButton: el,
    MenuItem: Lc
  },
  data() {
    return {
      transformToLabel: this.editor.commands.getTranslation("toolbar.transformTo"),
      deleteLabel: this.editor.commands.getTranslation("control.delete"),
      moreLabel: this.editor.commands.getTranslation("toolbar.more"),
      upLabel: this.editor.commands.getTranslation("toolbar.up"),
      downLabel: this.editor.commands.getTranslation("toolbar.down"),
      moreIcon: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>',
      deleteIcon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-3 -3 30 30" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>'
    };
  },
  mounted() {
  },
  watch: {},
  computed: {
    currentNode() {
      return this.editor ? this.editor.storage.vuebergBlocks.currentNode : null;
    },
    canBeConvertedTo() {
      var n, e;
      return ((e = (n = this.currentBlockTool) == null ? void 0 : n.toolbar) == null ? void 0 : e.canBeConverted) === !1 ? [] : this.editor.storage.vuebergBlocks.currentNode ? this.editor.storage.vuebergBlocks.getAllowedBlocks(this.editor.storage.vuebergBlocks.currentNode, this.editor).filter((t) => {
        var r, i;
        return ((i = (r = this.currentBlockTool) == null ? void 0 : r.toolbar) == null ? void 0 : i.canBeConverted[t.name]) && t.convertCommand;
      }) : [];
    },
    activeAlignmentTools() {
      var e, t, r, i;
      if (!((t = (e = this.currentBlockTool) == null ? void 0 : e.toolbar) != null && t.alignTools))
        return [];
      const n = (o) => {
        var s;
        return ((s = this.currentNode) == null ? void 0 : s.depth) > 1 ? o.allowNested : !0;
      };
      return ((r = this.currentBlockTool.toolbar) == null ? void 0 : r.alignTools) === !0 ? this.alignmentTools.filter(n).filter(
        (o) => o.tools.find(
          (s) => s.isActiveTest(this.editor, this.currentBlockTool.name)
        )
      ) : typeof ((i = this.currentBlockTool.toolbar) == null ? void 0 : i.alignTools) == "object" ? this.alignmentTools.filter(n).filter((o) => {
        var s;
        return (s = this.currentBlockTool.toolbar) == null ? void 0 : s.alignTools[o.name];
      }).filter((o) => o.tools.length > 0) : [];
    },
    firstMenuItems() {
      var t;
      if (!this.currentBlockTool)
        return [];
      let n = this.menuCount, e = (t = this.menuItems) == null ? void 0 : t.reduce((r, i) => {
        var o;
        return r + ((o = i.buttons) == null ? void 0 : o.length);
      }, 0);
      return n < e && (n = n - 1), this.menuItems.map((r) => {
        if (n <= 0)
          return { ...r, buttons: [] };
        if (!r.buttons)
          return { ...r, buttons: [] };
        if (r.buttons.length <= n)
          return n -= r.buttons.length, r;
        {
          const i = r.buttons.slice(0, n);
          return n = 0, { ...r, buttons: i };
        }
      }).filter((r) => {
        var i;
        return r && r.buttons && ((i = r == null ? void 0 : r.buttons) == null ? void 0 : i.length) > 0;
      });
    },
    remainingMenuItems() {
      if (!this.currentBlockTool)
        return [];
      let n = this.menuCount, e = this.menuItems.reduce((t, r) => t + r.buttons.length, 0);
      return n < e && (n = n - 1), this.menuItems.map((t) => {
        if (n <= 0 || !t.buttons)
          return t;
        if (t.buttons.length <= n)
          return n -= t.buttons.length, { ...t, buttons: [] };
        {
          const r = t.buttons.slice(n);
          return n = 0, { ...t, buttons: r };
        }
      }).filter((t) => {
        var r;
        return t && t.buttons && ((r = t == null ? void 0 : t.buttons) == null ? void 0 : r.length) > 0;
      });
    },
    menuCount() {
      var u, d, f, h, p, g, y, b, x, T, m, w, v, E, L, S, I, j, $, W, ie, Y;
      let n = 700;
      ((d = (u = this.settings) == null ? void 0 : u.toolbar) == null ? void 0 : d.style) == "minimal" && (n = 400);
      let e = this.vuebergWidth > n ? n : this.vuebergWidth;
      const t = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vueberg-toolbar-padding")) || 6, r = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vueberg-button-size")) || 30, i = 2, o = 2 * (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vueberg-toolbar-gap")) || 10), s = 1;
      e -= t * 2, ((h = (f = this.settings) == null ? void 0 : f.toolbar) == null ? void 0 : h.showOrder) !== !1 && (e -= r), ((g = (p = this.settings) == null ? void 0 : p.toolbar) == null ? void 0 : g.showCurrentBlock) !== !1 && (e -= r), ((b = (y = this.settings) == null ? void 0 : y.toolbar) == null ? void 0 : b.showOrder) !== !1 && ((T = (x = this.settings) == null ? void 0 : x.toolbar) == null ? void 0 : T.showCurrentBlock) !== !1 && (e -= i), (((w = (m = this.settings) == null ? void 0 : m.toolbar) == null ? void 0 : w.showOrder) !== !1 || ((E = (v = this.settings) == null ? void 0 : v.toolbar) == null ? void 0 : E.showCurrentBlock) !== !1) && (e -= i, e -= o + s), this.activeAlignmentTools.length && (e -= this.activeAlignmentTools.length * r, e -= i * ((L = this.activeAlignmentTools) != null && L.length ? ((S = this.activeAlignmentTools) == null ? void 0 : S.length) - 1 : 0), e -= o + s), this.customTools && this.customTools.length > 0 && (e -= this.customTools.length * r, e -= (this.customTools.length - 1) * i, e -= o + s);
      const l = (j = (I = this.currentBlockTool) == null ? void 0 : I.tools) == null ? void 0 : j.length;
      let a = 0, c = 0;
      return (W = ($ = this.currentBlockTool) == null ? void 0 : $.tools) != null && W.length && (c = r * l, c += i * (l ? l - 1 : 0)), e < c + o + s ? Math.floor((e - o - s) / (r + i)) : (a = (Y = (ie = this.currentBlockTool) == null ? void 0 : ie.tools) == null ? void 0 : Y.length, e -= c, e -= o, e -= s, a == null && (a = 0), e -= o, e -= s, Math.floor(e / (i + r)) + a);
    },
    menuItems() {
      var n, e, t, r, i;
      return this.currentBlockTool ? [
        {
          type: "currentBlockTools",
          condition: (e = (n = this.currentBlockTool) == null ? void 0 : n.tools) == null ? void 0 : e.length,
          buttons: (() => {
            var s;
            const o = (s = this.currentBlockTool) == null ? void 0 : s.tools;
            return o ? o.filter((l) => l.enabled !== !1).map((l) => {
              var a, c;
              return {
                click: () => l.command.call(0, this.editor),
                icon: l.icon,
                label: l.title,
                activeClass: l.isActiveClass,
                disabled: (a = l.isDisabledTest) == null ? void 0 : a.call(0, this.editor),
                active: (c = l.isActiveTest) == null ? void 0 : c.call(0, this.editor)
              };
            }) : [];
          })()
        },
        {
          type: "inlineTools",
          condition: (r = (t = this.currentBlockTool) == null ? void 0 : t.toolbar) == null ? void 0 : r.inlineTools,
          buttons: (() => {
            var s, l;
            const o = (l = (s = this.currentBlockTool) == null ? void 0 : s.toolbar) == null ? void 0 : l.inlineTools;
            return o === !0 ? this.inlineTools.map((a) => ({
              click: () => a.command(this.editor),
              icon: a.icon,
              label: a.title,
              activeClass: a.isActiveClass,
              disabled: !1,
              active: a.isActiveTest(this.editor)
            })) : typeof o == "object" ? Object.keys(o).filter((c) => o[c]).map((c) => this.inlineTools.find((u) => u.name === c)).filter((c) => c).map((c) => ({
              click: () => c.command(this.editor),
              icon: c.icon,
              label: c.title,
              activeClass: c.isActiveClass,
              disabled: !1,
              active: c.isActiveTest(this.editor)
            })) : [];
          })()
        },
        {
          type: "control",
          condition: this.editor.can().deleteNode((i = this.currentBlockTool) == null ? void 0 : i.nodeType),
          buttons: (() => {
            var o, s;
            return ((s = (o = this.settings) == null ? void 0 : o.toolbar) == null ? void 0 : s.showDeleteButton) !== !1 ? [
              {
                click: () => {
                  var l;
                  return this.deleteNode((l = this.currentBlockTool) == null ? void 0 : l.nodeType);
                },
                icon: this.deleteIcon,
                label: this.deleteLabel,
                activeClass: "vueberg-button-text-danger",
                disabled: !1,
                active: !0
              }
            ] : [];
          })()
        }
      ] : [];
    }
  },
  methods: {
    getActiveAlignmentTool(n) {
      const e = n.find(
        (t) => {
          var r;
          return t.isActiveTest(this.editor, (r = this.currentBlockTool) == null ? void 0 : r.nodeType);
        }
      );
      return e || n[0];
    },
    deleteNode(n) {
      this.editor.chain().deleteNode(n).blur().run();
    },
    runConvertCommand(n) {
      n.convertCommand(this.editor), this.editor.storage.vuebergBlocks.getBlockTool(this.editor.commands.getCurrentNodeName());
    },
    moveNode(n = "UP") {
      Ch({
        view: this.editor.view,
        dir: n,
        currentResolved: this.editor.view.state.selection.$from
      });
    },
    canMoveNodeDown() {
      const n = this.editor.view.state.selection.$from;
      return n.index(0) < n.node(0).childCount - 1;
    },
    canMoveNodeUp() {
      return this.editor.view.state.selection.$from.index(0) > 0;
    }
  }
}, Sh = { class: "vueberg-toolbar" }, Mh = {
  key: 0,
  class: "vueberg-button-group vueberg-button-group-separate"
}, Eh = {
  key: 0,
  class: "vueberg-button-group vueberg-button-group-column vueberg-toolbar-order"
}, Ah = ["disabled", "data-tooltip"], Oh = /* @__PURE__ */ F("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  "aria-hidden": "true",
  focusable: "false",
  viewBox: "6.5 8 11 5.6"
}, [
  /* @__PURE__ */ F("path", { d: "M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z" })
], -1), Nh = [
  Oh
], Dh = ["disabled", "data-tooltip"], Bh = /* @__PURE__ */ F("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "6.5 10.4 11 5.6"
}, [
  /* @__PURE__ */ F("path", { d: "M17.5 11.6 12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" })
], -1), Lh = [
  Bh
], Ih = {
  key: 1,
  class: "vueberg-button-group vueberg-button-group-separate"
}, Rh = { class: "vueberg-toolbar-transform-to" }, Ph = {
  key: 1,
  class: "vueberg-button-group vueberg-button-group-separate"
}, Fh = {
  key: 2,
  class: "vueberg-button-group vueberg-button-group-separate"
}, Hh = {
  key: 3,
  class: "vueberg-button-group vueberg-button-group-separate vueberg-toolbar-custom-tools"
};
function zh(n, e, t, r, i, o) {
  var a, c, u, d, f, h, p, g, y, b, x, T;
  const s = qe("menu-button"), l = qe("menu-item");
  return O(), P("div", Sh, [
    ((c = (a = t.settings) == null ? void 0 : a.toolbar) == null ? void 0 : c.showOrder) !== !1 && ((d = (u = t.settings) == null ? void 0 : u.toolbar) == null ? void 0 : d.showCurrentBlock) !== !1 ? (O(), P("div", Mh, [
      ((h = (f = t.settings) == null ? void 0 : f.toolbar) == null ? void 0 : h.showOrder) !== !1 ? (O(), P("div", Eh, [
        F("button", {
          onClick: e[0] || (e[0] = Oe((m) => o.moveNode("UP"), ["prevent"])),
          disabled: !o.canMoveNodeUp(),
          "data-tooltip": i.upLabel,
          class: "vueberg-button--toolbar-order vueberg-button"
        }, Nh, 8, Ah),
        F("button", {
          onClick: e[1] || (e[1] = Oe((m) => o.moveNode("DOWN"), ["prevent"])),
          disabled: !o.canMoveNodeDown(),
          "data-tooltip": i.downLabel,
          class: "vueberg-button--toolbar-order vueberg-button"
        }, Lh, 8, Dh)
      ])) : X("", !0),
      ((g = (p = t.settings) == null ? void 0 : p.toolbar) == null ? void 0 : g.showCurrentBlock) !== !1 && ((y = t.currentBlockTool) != null && y.icon) && ((b = t.currentBlockTool) != null && b.name) ? (O(), P("div", Ih, [
        at(l, {
          hasDropdown: ((T = (x = t.currentBlockTool) == null ? void 0 : x.toolbar) == null ? void 0 : T.canBeConverted) && o.canBeConvertedTo.length > 0
        }, {
          dropdown: st(() => [
            F("div", Rh, Ke(i.transformToLabel), 1),
            (O(!0), P(Ae, null, $e(o.canBeConvertedTo, (m) => (O(), be(s, {
              content: m.icon + " " + m.title,
              key: m.title,
              onClick: Oe((w) => o.runConvertCommand(m), ["prevent"]),
              class: "vueberg-button-text vueberg-button-md"
            }, null, 8, ["content", "onClick"]))), 128))
          ]),
          default: st(() => {
            var m, w, v, E;
            return [
              at(s, {
                label: (m = t.currentBlockTool) == null ? void 0 : m.title,
                content: (w = t.currentBlockTool) == null ? void 0 : w.icon,
                class: Ot((E = (v = t.currentBlockTool) == null ? void 0 : v.toolbar) != null && E.canBeConverted && o.canBeConvertedTo.length ? "vueberg-button-secondary" : "")
              }, null, 8, ["label", "content", "class"])
            ];
          }),
          _: 1
        }, 8, ["hasDropdown"])
      ])) : X("", !0)
    ])) : X("", !0),
    o.activeAlignmentTools.length ? (O(), P("div", Ph, [
      (O(!0), P(Ae, null, $e(o.activeAlignmentTools, (m, w) => (O(), be(l, {
        hasDropdown: !0,
        key: w
      }, {
        dropdown: st(() => [
          (O(!0), P(Ae, null, $e(m.tools, (v) => {
            var E;
            return O(), be(s, {
              class: "vueberg-button-text vueberg-button-md",
              key: v.title,
              content: v.icon + " " + v.title,
              onClick: Oe((L) => v.command(t.editor), ["prevent"]),
              active: v.isActiveTest(t.editor, (E = t.currentBlockTool) == null ? void 0 : E.nodeType)
            }, null, 8, ["content", "onClick", "active"]);
          }), 128))
        ]),
        default: st(() => [
          at(s, {
            onClick: e[2] || (e[2] = Oe(() => {
            }, ["prevent"])),
            label: o.getActiveAlignmentTool(m.tools).title,
            content: o.getActiveAlignmentTool(m.tools).icon
          }, null, 8, ["label", "content"])
        ]),
        _: 2
      }, 1024))), 128))
    ])) : X("", !0),
    (O(!0), P(Ae, null, $e(o.firstMenuItems, (m) => (O(), P(Ae, null, [
      m.condition ? (O(), P("div", {
        key: m.type,
        class: "vueberg-button-group vueberg-button-group-separate"
      }, [
        (O(!0), P(Ae, null, $e(m.buttons, (w, v) => (O(), be(s, {
          key: v,
          content: w.icon,
          label: w.label,
          activeClass: w.activeClass,
          onClick: Oe(w.click, ["prevent"]),
          disabled: w.disabled,
          active: w.active
        }, null, 8, ["content", "label", "activeClass", "onClick", "disabled", "active"]))), 128))
      ])) : X("", !0)
    ], 64))), 256)),
    t.editor && o.remainingMenuItems.length ? (O(), P("div", Fh, [
      at(l, {
        align: "right",
        hasDropdown: !0
      }, {
        dropdown: st(() => [
          (O(!0), P(Ae, null, $e(o.remainingMenuItems, (m) => (O(), P(Ae, null, [
            m.condition ? (O(!0), P(Ae, { key: 0 }, $e(m.buttons, (w, v) => (O(), be(s, {
              key: v,
              class: "vueberg-button-md vueberg-button-text",
              content: w.icon + w.label,
              activeClass: w.activeClass,
              onClick: Oe(w.click, ["prevent"]),
              disabled: w.disabled,
              active: w.active
            }, null, 8, ["content", "activeClass", "onClick", "disabled", "active"]))), 128)) : X("", !0)
          ], 64))), 256))
        ]),
        default: st(() => [
          at(s, {
            class: "vueberg-button-secondary",
            onClick: e[3] || (e[3] = Oe(() => {
            }, ["prevent"])),
            label: i.moreLabel,
            content: i.moreIcon
          }, null, 8, ["label", "content"])
        ]),
        _: 1
      })
    ])) : X("", !0),
    t.customTools.length ? (O(), P("div", Hh, [
      (O(!0), P(Ae, null, $e(t.customTools, (m, w) => (O(), be(s, {
        key: w,
        content: m.icon,
        label: m.title,
        activeClass: m == null ? void 0 : m.activeClass,
        onClick: Oe(m == null ? void 0 : m.click, ["prevent"]),
        disabled: m == null ? void 0 : m.disabled,
        active: m == null ? void 0 : m.isActiveTest()
      }, null, 8, ["content", "label", "activeClass", "onClick", "disabled", "active"]))), 128))
    ])) : X("", !0)
  ]);
}
const Vh = /* @__PURE__ */ gt(Th, [["render", zh]]), pe = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, Cr = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let ws = null;
const Tt = function(n, e, t) {
  let r = ws || (ws = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, _h = function() {
  ws = null;
}, bn = function(n, e, t, r) {
  return t && (ta(n, e, t, r, -1) || ta(n, e, t, r, 1));
}, jh = /^(img|br|input|textarea|hr)$/i;
function ta(n, e, t, r, i) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : ct(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || Fr(n) || jh.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = pe(n) + (i < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (i < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = i < 0 ? ct(n) : 0;
    } else
      return !1;
  }
}
function ct(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function $h(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = ct(n);
    } else if (n.parentNode && !Fr(n))
      e = pe(n), n = n.parentNode;
    else
      return null;
  }
}
function Wh(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !Fr(n))
      e = pe(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function qh(n, e, t) {
  for (let r = e == 0, i = e == ct(n); r || i; ) {
    if (n == t)
      return !0;
    let o = pe(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && o == 0, i = i && o == ct(n);
  }
}
function Fr(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const wo = function(n) {
  return n.focusNode && bn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function on(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function Kh(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Uh(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: r.offset };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: r.startOffset };
  }
}
const ht = typeof navigator < "u" ? navigator : null, na = typeof document < "u" ? document : null, Yt = ht && ht.userAgent || "", xs = /Edge\/(\d+)/.exec(Yt), du = /MSIE \d/.exec(Yt), Cs = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Yt), Be = !!(du || Cs || xs), $t = du ? document.documentMode : Cs ? +Cs[1] : xs ? +xs[1] : 0, tt = !Be && /gecko\/(\d+)/i.test(Yt);
tt && +(/Firefox\/(\d+)/.exec(Yt) || [0, 0])[1];
const Ts = !Be && /Chrome\/(\d+)/.exec(Yt), Ce = !!Ts, Jh = Ts ? +Ts[1] : 0, Te = !Be && !!ht && /Apple Computer/.test(ht.vendor), Un = Te && (/Mobile\/\w+/.test(Yt) || !!ht && ht.maxTouchPoints > 2), We = Un || (ht ? /Mac/.test(ht.platform) : !1), Gh = ht ? /Win/.test(ht.platform) : !1, Xe = /Android \d/.test(Yt), Hr = !!na && "webkitFontSmoothing" in na.documentElement.style, Yh = Hr ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Qh(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function xt(n, e) {
  return typeof n == "number" ? n : n[e];
}
function Xh(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function ra(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, o = n.dom.ownerDocument;
  for (let s = t || n.dom; s; s = Cr(s)) {
    if (s.nodeType != 1)
      continue;
    let l = s, a = l == o.body, c = a ? Qh(o) : Xh(l), u = 0, d = 0;
    if (e.top < c.top + xt(r, "top") ? d = -(c.top - e.top + xt(i, "top")) : e.bottom > c.bottom - xt(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + xt(i, "top") - c.top : e.bottom - c.bottom + xt(i, "bottom")), e.left < c.left + xt(r, "left") ? u = -(c.left - e.left + xt(i, "left")) : e.right > c.right - xt(r, "right") && (u = e.right - c.right + xt(i, "right")), u || d)
      if (a)
        o.defaultView.scrollBy(u, d);
      else {
        let f = l.scrollLeft, h = l.scrollTop;
        d && (l.scrollTop += d), u && (l.scrollLeft += u);
        let p = l.scrollLeft - f, g = l.scrollTop - h;
        e = { left: e.left - p, top: e.top - g, right: e.right - p, bottom: e.bottom - g };
      }
    if (a || /^(fixed|sticky)$/.test(getComputedStyle(s).position))
      break;
  }
}
function Zh(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let o = (e.left + e.right) / 2, s = t + 1; s < Math.min(innerHeight, e.bottom); s += 5) {
    let l = n.root.elementFromPoint(o, s);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: fu(n.dom) };
}
function fu(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = Cr(r))
    ;
  return e;
}
function ep({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  hu(t, r == 0 ? 0 : r - e);
}
function hu(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: o } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != o && (r.scrollLeft = o);
  }
}
let An = null;
function tp(n) {
  if (n.setActive)
    return n.setActive();
  if (An)
    return n.focus(An);
  let e = fu(n);
  n.focus(An == null ? {
    get preventScroll() {
      return An = { preventScroll: !0 }, !0;
    }
  } : void 0), An || (An = !1, hu(e, 0));
}
function pu(n, e) {
  let t, r = 2e8, i, o = 0, s = e.top, l = e.top, a, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = Tt(u).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= s && p.bottom >= l) {
        s = Math.max(p.bottom, s), l = Math.min(p.top, l);
        let g = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (g < r) {
          t = u, r = g, i = g && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && g && (o = d + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else
        p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (o = d + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? np(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: o } : pu(t, i);
}
function np(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let o = It(r, 1);
    if (o.top != o.bottom && il(e, o))
      return { node: n, offset: i + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function il(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function rp(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function ip(n, e, t) {
  let { node: r, offset: i } = pu(e, t), o = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let s = r.getBoundingClientRect();
    o = s.left != s.right && t.left > (s.left + s.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, o);
}
function op(n, e, t, r) {
  let i = -1;
  for (let o = e, s = !1; o != n.dom; ) {
    let l = n.docView.nearestDesc(o, !0);
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent && !s || !l.contentDOM)) {
      let a = l.dom.getBoundingClientRect();
      if (l.node.isBlock && l.parent && !s && (s = !0, a.left > r.left || a.top > r.top ? i = l.posBefore : (a.right < r.left || a.bottom < r.top) && (i = l.posAfter)), !l.contentDOM && i < 0 && !l.node.isText)
        return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    }
    o = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function mu(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), o = i; ; ) {
      let s = n.childNodes[o];
      if (s.nodeType == 1) {
        let l = s.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (il(e, c))
            return mu(s, e, c);
        }
      }
      if ((o = (o + 1) % r) == i)
        break;
    }
  return n;
}
function sp(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, o = Uh(t, e.left, e.top);
  o && ({ node: r, offset: i } = o);
  let s = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!s || !n.dom.contains(s.nodeType != 1 ? s.parentNode : s)) {
    let c = n.dom.getBoundingClientRect();
    if (!il(e, c) || (s = mu(n.dom, e, c), !s))
      return null;
  }
  if (Te)
    for (let c = s; r && c; c = Cr(c))
      c.draggable && (r = void 0);
  if (s = rp(s, e), r) {
    if (tt && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && i++;
    }
    let c;
    Hr && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = op(n, r, i, e));
  }
  l == null && (l = ip(n, s, e));
  let a = n.docView.nearestDesc(s, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function ia(n) {
  return n.top < n.bottom || n.left < n.right;
}
function It(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (ia(r))
      return r;
  }
  return Array.prototype.find.call(t, ia) || n.getBoundingClientRect();
}
const lp = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function gu(n, e, t) {
  let { node: r, offset: i, atom: o } = n.docView.domFromPos(e, t < 0 ? -1 : 1), s = Hr || tt;
  if (r.nodeType == 3)
    if (s && (lp.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = It(Tt(r, i, i), t);
      if (tt && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = It(Tt(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = It(Tt(r, i, i + 1), -1);
          if (u.top != a.top)
            return sr(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, u = -1) : t >= 0 && i == r.nodeValue.length ? (a--, u = 1) : t < 0 ? a-- : c++, sr(It(Tt(r, a, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (o || 0)).parent.inlineContent) {
    if (o == null && i && (t < 0 || i == ct(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return qo(a.getBoundingClientRect(), !1);
    }
    if (o == null && i < ct(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return qo(a.getBoundingClientRect(), !0);
    }
    return qo(r.getBoundingClientRect(), t >= 0);
  }
  if (o == null && i && (t < 0 || i == ct(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? Tt(a, ct(a) - (s ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return sr(It(c, 1), !1);
  }
  if (o == null && i < ct(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? Tt(a, 0, s ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return sr(It(c, -1), !0);
  }
  return sr(It(r.nodeType == 3 ? Tt(r) : r, -t), t >= 0);
}
function sr(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function qo(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function yu(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function ap(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return yu(n, e, () => {
    let { node: o } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(o, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        o = l.contentDOM || l.dom;
        break;
      }
      o = l.dom.parentNode;
    }
    let s = gu(n, i.pos, 1);
    for (let l = o.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = Tt(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (t == "up" ? s.top - u.top > (u.bottom - s.top) * 2 : u.bottom - s.bottom > (s.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const cp = /[\u0590-\u08ac]/;
function up(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, o = !i, s = i == r.parent.content.size, l = n.domSelection();
  return !cp.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? o : s : yu(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", t, "character");
    let h = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: g } = n.domSelectionRange(), y = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == g;
    try {
      l.collapse(u, d), a && (a != u || c != d) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), y;
  });
}
let oa = null, sa = null, la = !1;
function dp(n, e, t) {
  return oa == e && sa == t ? la : (oa = e, sa = t, la = t == "up" || t == "down" ? ap(n, e, t) : up(n, e, t));
}
const Ue = 0, aa = 1, ln = 2, pt = 3;
class zr {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = Ue, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule() {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let o, s;
        if (e == this.contentDOM)
          o = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          o = e.previousSibling;
        }
        for (; o && !((s = o.pmViewDesc) && s.parent == this); )
          o = o.previousSibling;
        return o ? this.posBeforeChild(s) + s.size : this.posAtStart;
      } else {
        let o, s;
        if (e == this.contentDOM)
          o = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          o = e.nextSibling;
        }
        for (; o && !((s = o.pmViewDesc) && s.parent == this); )
          o = o.nextSibling;
        return o ? this.posBeforeChild(s) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > pe(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let o = e; ; o = o.parentNode) {
          if (o == this.dom) {
            i = !1;
            break;
          }
          if (o.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let o = e; ; o = o.parentNode) {
          if (o == this.dom) {
            i = !0;
            break;
          }
          if (o.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let o = this.getDesc(i), s;
      if (o && (!t || o.node))
        if (r && (s = o.nodeDOM) && !(s.nodeType == 1 ? s.contains(e.nodeType == 1 ? e : e.parentNode) : s == e))
          r = !1;
        else
          return o;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let o = this.getDesc(i);
      if (o)
        return o.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], o = r + i.size;
      if (r == e && o != r) {
        for (; !i.border && i.children.length; )
          i = i.children[0];
        return i;
      }
      if (e < o)
        return i.descAt(e - r - i.border);
      r = o;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let o = 0; r < this.children.length; r++) {
      let s = this.children[r], l = o + s.size;
      if (l > e || s instanceof vu) {
        i = e - o;
        break;
      }
      o = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let o; r && !(o = this.children[r - 1]).size && o instanceof bu && o.side >= 0; r--)
      ;
    if (t <= 0) {
      let o, s = !0;
      for (; o = r ? this.children[r - 1] : null, !(!o || o.dom.parentNode == this.contentDOM); r--, s = !1)
        ;
      return o && t && s && !o.border && !o.domAtom ? o.domFromPos(o.size, t) : { node: this.contentDOM, offset: o ? pe(o.dom) + 1 : 0 };
    } else {
      let o, s = !0;
      for (; o = r < this.children.length ? this.children[r] : null, !(!o || o.dom.parentNode == this.contentDOM); r++, s = !1)
        ;
      return o && s && !o.border && !o.domAtom ? o.domFromPos(0, t) : { node: this.contentDOM, offset: o ? pe(o.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, o = -1;
    for (let s = r, l = 0; ; l++) {
      let a = this.children[l], c = s + a.size;
      if (i == -1 && e <= c) {
        let u = s + a.border;
        if (e >= u && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, u);
        e = s;
        for (let d = l; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            i = pe(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            o = pe(d.dom);
            break;
          }
          t += d.size;
        }
        o == -1 && (o = this.contentDOM.childNodes.length);
        break;
      }
      s = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: o };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, i = !1) {
    let o = Math.min(e, t), s = Math.max(e, t);
    for (let f = 0, h = 0; f < this.children.length; f++) {
      let p = this.children[f], g = h + p.size;
      if (o > h && s < g)
        return p.setSelection(e - h - p.border, t - h - p.border, r, i);
      h = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.getSelection(), u = !1;
    if ((tt || Te) && e == t) {
      let { node: f, offset: h } = l;
      if (f.nodeType == 3) {
        if (u = !!(h && f.nodeValue[h - 1] == `
`), u && h == f.nodeValue.length)
          for (let p = f, g; p; p = p.parentNode) {
            if (g = p.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: pe(g) + 1 });
              break;
            }
            let y = p.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let p = f.childNodes[h - 1];
        u = p && (p.nodeName == "BR" || p.contentEditable == "false");
      }
    }
    if (tt && c.focusNode && c.focusNode != a.node && c.focusNode.nodeType == 1) {
      let f = c.focusNode.childNodes[c.focusOffset];
      f && f.contentEditable == "false" && (i = !0);
    }
    if (!(i || u && Te) && bn(l.node, l.offset, c.anchorNode, c.anchorOffset) && bn(a.node, a.offset, c.focusNode, c.focusOffset))
      return;
    let d = !1;
    if ((c.extend || e == t) && !u) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), d = !0;
      } catch {
      }
    }
    if (!d) {
      if (e > t) {
        let h = l;
        l = a, a = h;
      }
      let f = document.createRange();
      f.setEnd(a.node, a.offset), f.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(f);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let o = this.children[i], s = r + o.size;
      if (r == s ? e <= s && t >= r : e < s && t > r) {
        let l = r + o.border, a = s - o.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == s ? ln : aa, e == l && t == a && (o.contentLost || o.dom.parentNode != this.contentDOM) ? o.dirty = pt : o.markDirty(e - l, t - l);
          return;
        } else
          o.dirty = o.dom == o.contentDOM && o.dom.parentNode == this.contentDOM && !o.children.length ? ln : pt;
      }
      r = s;
    }
    this.dirty = ln;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? ln : aa;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class bu extends zr {
  constructor(e, t, r, i) {
    let o, s = t.type.toDOM;
    if (typeof s == "function" && (s = s(r, () => {
      if (!o)
        return i;
      if (o.parent)
        return o.parent.posBeforeChild(o);
    })), !t.type.spec.raw) {
      if (s.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(s), s = l;
      }
      s.contentEditable = "false", s.classList.add("ProseMirror-widget");
    }
    super(e, [], s, null), this.widget = t, this.widget = t, o = this;
  }
  matchesWidget(e) {
    return this.dirty == Ue && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class fp extends zr {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class vn extends zr {
  constructor(e, t, r, i) {
    super(e, [], r, i), this.mark = t;
  }
  static create(e, t, r, i) {
    let o = i.nodeViews[t.type.name], s = o && o(t, i, r);
    return (!s || !s.dom) && (s = ut.renderSpec(document, t.type.spec.toDOM(t, r))), new vn(e, t, s.dom, s.contentDOM || s.dom);
  }
  parseRule() {
    return this.dirty & pt || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != pt && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != Ue) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Ue;
    }
  }
  slice(e, t, r) {
    let i = vn.create(this.parent, this.mark, !0, r), o = this.children, s = this.size;
    t < s && (o = Es(o, t, s, r)), e > 0 && (o = Es(o, 0, e, r));
    for (let l = 0; l < o.length; l++)
      o[l].parent = i;
    return i.children = o, i;
  }
}
class Wt extends zr {
  constructor(e, t, r, i, o, s, l, a, c) {
    super(e, [], o, s), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, i, o, s) {
    let l = o.nodeViews[t.type.name], a, c = l && l(t, o, () => {
      if (!a)
        return s;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), u = c && c.dom, d = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else
      u || ({ dom: u, contentDOM: d } = ut.renderSpec(document, t.type.spec.toDOM(t)));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = xu(u, r, t), c ? a = new hp(e, t, r, i, u, d || null, f, c, o, s + 1) : t.isText ? new xo(e, t, r, i, u, f, o) : new Wt(e, t, r, i, u, d || null, f, o, s + 1);
  }
  parseRule() {
    if (this.node.type.spec.reparseInView)
      return null;
    let e = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (e.preserveWhitespace = "full"), !this.contentDOM)
      e.getContent = () => this.node.content;
    else if (!this.contentLost)
      e.contentElement = this.contentDOM;
    else {
      for (let t = this.children.length - 1; t >= 0; t--) {
        let r = this.children[t];
        if (this.dom.contains(r.dom.parentNode)) {
          e.contentElement = r.dom.parentNode;
          break;
        }
      }
      e.contentElement || (e.getContent = () => C.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == Ue && e.eq(this.node) && Ms(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, o = e.composing ? this.localCompositionInfo(e, t) : null, s = o && o.pos > -1 ? o : null, l = o && o.pos < 0, a = new mp(this, s && s.node, e);
    bp(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && a.syncToMarks(u == this.node.childCount ? J.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, i);
    }, (c, u, d, f) => {
      a.syncToMarks(c.marks, r, e);
      let h;
      a.findNodeMatch(c, u, d, f) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(o.node)) > -1 && a.updateNodeAt(c, u, d, h, e) || a.updateNextNode(c, u, d, e, f, i) || a.addNode(c, u, d, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == ln) && (s && this.protectLocalComposition(e, s), ku(this.contentDOM, this.children, e), Un && vp(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof H) || r < t || i > t + this.node.content.size)
      return null;
    let o = e.input.compositionNode;
    if (!o || !this.dom.contains(o.parentNode))
      return null;
    if (this.node.inlineContent) {
      let s = o.nodeValue, l = kp(this.node.content, s, r - t, i - t);
      return l < 0 ? null : { node: o, pos: l, text: s };
    } else
      return { node: o, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let o = t;
    for (; o.parentNode != this.contentDOM; o = o.parentNode) {
      for (; o.previousSibling; )
        o.parentNode.removeChild(o.previousSibling);
      for (; o.nextSibling; )
        o.parentNode.removeChild(o.nextSibling);
      o.pmViewDesc && (o.pmViewDesc = void 0);
    }
    let s = new fp(this, o, t, i);
    e.input.compositionNodes.push(s), this.children = Es(this.children, r, r + i.length, e, s);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == pt || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Ue;
  }
  updateOuterDeco(e) {
    if (Ms(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = wu(this.dom, this.nodeDOM, Ss(this.outerDeco, this.node, t), Ss(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.dom.draggable = !0);
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.dom.removeAttribute("draggable");
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function ca(n, e, t, r, i) {
  xu(r, e, n);
  let o = new Wt(void 0, n, e, t, r, r, r, i, 0);
  return o.contentDOM && o.updateChildren(i, 0), o;
}
class xo extends Wt {
  constructor(e, t, r, i, o, s, l) {
    super(e, t, r, i, o, null, s, l, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == pt || this.dirty != Ue && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Ue || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Ue, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), o = document.createTextNode(i.text);
    return new xo(this.parent, i, this.outerDeco, this.innerDeco, o, o, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = pt);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class vu extends zr {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Ue && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class hp extends Wt {
  constructor(e, t, r, i, o, s, l, a, c, u) {
    super(e, t, r, i, o, s, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == pt)
      return !1;
    if (this.spec.update) {
      let o = this.spec.update(e, t, r);
      return o && this.updateInner(e, t, r, i), o;
    } else
      return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r) : super.setSelection(e, t, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function ku(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let o = 0; o < e.length; o++) {
    let s = e[o], l = s.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = ua(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (s instanceof vn) {
      let a = r ? r.previousSibling : n.lastChild;
      ku(s.contentDOM, s.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = ua(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const hr = function(n) {
  n && (this.nodeName = n);
};
hr.prototype = /* @__PURE__ */ Object.create(null);
const an = [new hr()];
function Ss(n, e, t) {
  if (n.length == 0)
    return an;
  let r = t ? an[0] : new hr(), i = [r];
  for (let o = 0; o < n.length; o++) {
    let s = n[o].type.attrs;
    if (s) {
      s.nodeName && i.push(r = new hr(s.nodeName));
      for (let l in s) {
        let a = s[l];
        a != null && (t && i.length == 1 && i.push(r = new hr(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function wu(n, e, t, r) {
  if (t == an && r == an)
    return e;
  let i = e;
  for (let o = 0; o < r.length; o++) {
    let s = r[o], l = t[o];
    if (o) {
      let a;
      l && l.nodeName == s.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == s.nodeName || (a = document.createElement(s.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = an[0]), i = a;
    }
    pp(i, l || an[0], s);
  }
  return i;
}
function pp(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let o = 0; o < r.length; o++)
      i.indexOf(r[o]) == -1 && n.classList.remove(r[o]);
    for (let o = 0; o < i.length; o++)
      r.indexOf(i[o]) == -1 && n.classList.add(i[o]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function xu(n, e, t) {
  return wu(n, n, an, Ss(e, t, n.nodeType != 1));
}
function Ms(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function ua(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class mp {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = gp(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r) {
    let i = 0, o = this.stack.length >> 1, s = Math.min(o, e.length);
    for (; i < s && (i == o - 1 ? this.top : this.stack[i + 1 << 1]).matchesMark(e[i]) && e[i].type.spec.spanning !== !1; )
      i++;
    for (; i < o; )
      this.destroyRest(), this.top.dirty = Ue, this.index = this.stack.pop(), this.top = this.stack.pop(), o--;
    for (; o < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let l = -1;
      for (let a = this.index; a < Math.min(this.index + 3, this.top.children.length); a++) {
        let c = this.top.children[a];
        if (c.matchesMark(e[o]) && !this.isLocked(c.dom)) {
          l = a;
          break;
        }
      }
      if (l > -1)
        l > this.index && (this.changed = !0, this.destroyBetween(this.index, l)), this.top = this.top.children[this.index];
      else {
        let a = vn.create(this.top, e[o], t, r);
        this.top.children.splice(this.index, 0, a), this.top = a, this.changed = !0;
      }
      this.index = 0, o++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, i) {
    let o = -1, s;
    if (i >= this.preMatch.index && (s = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && s.matchesNode(e, t, r))
      o = this.top.children.indexOf(s, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          o = l;
          break;
        }
      }
    return o < 0 ? !1 : (this.destroyBetween(this.index, o), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, o) {
    let s = this.top.children[i];
    return s.dirty == pt && s.dom == s.contentDOM && (s.dirty = ln), s.update(e, t, r, o) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, i, o, s) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof Wt) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != o)
          return !1;
        let u = a.dom, d, f = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != pt && Ms(t, a.outerDeco));
        if (!f && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(a, e, t, r, i, s)))
          return this.top.children[this.index] = d, d.contentDOM && (d.dirty = ln, d.updateChildren(i, s + 1), d.dirty = Ue), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, i, o, s) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content))
      return null;
    let l = Wt.create(this.top, t, r, i, o, s);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, o) {
    let s = Wt.create(this.top, e, t, r, i, o);
    s.contentDOM && s.updateChildren(i, o + 1), this.top.children.splice(this.index++, 0, s), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let o = new bu(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, o), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof vn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof xo) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((Te || Ce) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new vu(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function gp(n, e) {
  let t = e, r = t.children.length, i = n.childCount, o = /* @__PURE__ */ new Map(), s = [];
  e:
    for (; i > 0; ) {
      let l;
      for (; ; )
        if (r) {
          let c = t.children[r - 1];
          if (c instanceof vn)
            t = c, r = c.children.length;
          else {
            l = c, r--;
            break;
          }
        } else {
          if (t == e)
            break e;
          r = t.parent.children.indexOf(t), t = t.parent;
        }
      let a = l.node;
      if (a) {
        if (a != n.child(i - 1))
          break;
        --i, o.set(l, i), s.push(l);
      }
    }
  return { index: i, matched: o, matches: s.reverse() };
}
function yp(n, e) {
  return n.type.side - e.type.side;
}
function bp(n, e, t, r) {
  let i = e.locals(n), o = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, i, e.forChild(o, u), c), o += u.nodeSize;
    }
    return;
  }
  let s = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; s < i.length && i[s].to == o; ) {
      let y = i[s++];
      y.widget && (u ? (d || (d = [u])).push(y) : u = y);
    }
    if (u)
      if (d) {
        d.sort(yp);
        for (let y = 0; y < d.length; y++)
          t(d[y], c, !!a);
      } else
        t(u, c, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (c < n.childCount)
      h = c, f = n.child(c++);
    else
      break;
    for (let y = 0; y < l.length; y++)
      l[y].to <= o && l.splice(y--, 1);
    for (; s < i.length && i[s].from <= o && i[s].to > o; )
      l.push(i[s++]);
    let p = o + f.nodeSize;
    if (f.isText) {
      let y = p;
      s < i.length && i[s].from < y && (y = i[s].from);
      for (let b = 0; b < l.length; b++)
        l[b].to < y && (y = l[b].to);
      y < p && (a = f.cut(y - o), f = f.cut(0, y - o), p = y, h = -1);
    } else
      for (; s < i.length && i[s].to < p; )
        s++;
    let g = f.isInline && !f.isLeaf ? l.filter((y) => !y.inline) : l.slice();
    r(f, g, e.forChild(o, f), h), o = p;
  }
}
function vp(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function kp(n, e, t, r) {
  for (let i = 0, o = 0; i < n.childCount && o <= r; ) {
    let s = n.child(i++), l = o;
    if (o += s.nodeSize, !s.isText)
      continue;
    let a = s.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (o += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (o >= t) {
      if (o >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function Es(n, e, t, r, i) {
  let o = [];
  for (let s = 0, l = 0; s < n.length; s++) {
    let a = n[s], c = l, u = l += a.size;
    c >= t || u <= e ? o.push(a) : (c < e && o.push(a.slice(0, e - c, r)), i && (o.push(i), i = void 0), u > t && o.push(a.slice(t - c, a.size, r)));
  }
  return o;
}
function ol(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), o = i && i.size == 0, s = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (s < 0)
    return null;
  let l = r.resolve(s), a, c;
  if (wo(t)) {
    for (a = l; i && !i.node; )
      i = i.parent;
    let u = i.node;
    if (i && u.isAtom && B.isSelectable(u) && i.parent && !(u.isInline && qh(t.focusNode, t.focusOffset, i.dom))) {
      let d = i.posBefore;
      c = new B(s == d ? l : r.resolve(d));
    }
  } else {
    let u = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (u < 0)
      return null;
    a = r.resolve(u);
  }
  if (!c) {
    let u = e == "pointer" || n.state.selection.head < l.pos && !o ? 1 : -1;
    c = sl(n, a, l, u);
  }
  return c;
}
function Cu(n) {
  return n.editable ? n.hasFocus() : Su(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function At(n, e = !1) {
  let t = n.state.selection;
  if (Tu(n, t), !!Cu(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && Ce) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && bn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      xp(n);
    else {
      let { anchor: r, head: i } = t, o, s;
      da && !(t instanceof H) && (t.$from.parent.inlineContent || (o = fa(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (s = fa(n, t.to))), n.docView.setSelection(r, i, n.root, e), da && (o && ha(o), s && ha(s)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && wp(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const da = Te || Ce && Jh < 63;
function fa(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, o = r ? t.childNodes[r - 1] : null;
  if (Te && i && i.contentEditable == "false")
    return Ko(i);
  if ((!i || i.contentEditable == "false") && (!o || o.contentEditable == "false")) {
    if (i)
      return Ko(i);
    if (o)
      return Ko(o);
  }
}
function Ko(n) {
  return n.contentEditable = "true", Te && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function ha(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function wp(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Cu(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function xp(n) {
  let e = n.domSelection(), t = document.createRange(), r = n.cursorWrapper.dom, i = r.nodeName == "IMG";
  i ? t.setEnd(r.parentNode, pe(r) + 1) : t.setEnd(r, 0), t.collapse(!1), e.removeAllRanges(), e.addRange(t), !i && !n.state.selection.visible && Be && $t <= 11 && (r.disabled = !0, r.disabled = !1);
}
function Tu(n, e) {
  if (e instanceof B) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (pa(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    pa(n);
}
function pa(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function sl(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || H.between(e, t, r);
}
function ma(n) {
  return n.editable && !n.hasFocus() ? !1 : Su(n);
}
function Su(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function Cp(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return bn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function As(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), o = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return o && V.findFrom(o, e);
}
function Rt(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function ga(n, e, t) {
  let r = n.state.selection;
  if (r instanceof H)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!o || o.isText || !o.isLeaf)
        return !1;
      let s = n.state.doc.resolve(i.pos + o.nodeSize * (e < 0 ? -1 : 1));
      return Rt(n, new H(r.$anchor, s));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = As(n.state, e);
        return i && i instanceof B ? Rt(n, i) : !1;
      } else if (!(We && t.indexOf("m") > -1)) {
        let i = r.$head, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, s;
        if (!o || o.isText)
          return !1;
        let l = e < 0 ? i.pos - o.nodeSize : i.pos;
        return o.isAtom || (s = n.docView.descAt(l)) && !s.contentDOM ? B.isSelectable(o) ? Rt(n, new B(e < 0 ? n.state.doc.resolve(i.pos - o.nodeSize) : i)) : Hr ? Rt(n, new H(n.state.doc.resolve(e < 0 ? l : l + o.nodeSize))) : !1 : !1;
      }
    } else
      return !1;
  else {
    if (r instanceof B && r.node.isInline)
      return Rt(n, new H(e > 0 ? r.$to : r.$from));
    {
      let i = As(n.state, e);
      return i ? Rt(n, i) : !1;
    }
  }
}
function Ai(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function pr(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function On(n, e) {
  return e < 0 ? Tp(n) : Sp(n);
}
function Tp(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, o, s = !1;
  for (tt && t.nodeType == 1 && r < Ai(t) && pr(t.childNodes[r], -1) && (s = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (pr(l, -1))
          i = t, o = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (Mu(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && pr(l, -1); )
          i = t.parentNode, o = pe(l), l = l.previousSibling;
        if (l)
          t = l, r = Ai(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  s ? Os(n, t, r) : i && Os(n, i, o);
}
function Sp(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = Ai(t), o, s;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (pr(l, 1))
        o = t, s = ++r;
      else
        break;
    } else {
      if (Mu(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && pr(l, 1); )
          o = l.parentNode, s = pe(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = Ai(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  o && Os(n, o, s);
}
function Mu(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function Mp(n, e) {
  for (; n && e == n.childNodes.length && !Fr(n); )
    e = pe(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function Ep(n, e) {
  for (; n && !e && !Fr(n); )
    e = pe(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Os(n, e, t) {
  if (e.nodeType != 3) {
    let o, s;
    (s = Mp(e, t)) ? (e = s, t = 0) : (o = Ep(e, t)) && (e = o, t = o.nodeValue.length);
  }
  let r = n.domSelection();
  if (wo(r)) {
    let o = document.createRange();
    o.setEnd(e, t), o.setStart(e, t), r.removeAllRanges(), r.addRange(o);
  } else
    r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && At(n);
  }, 50);
}
function ya(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(Ce || Gh) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let o = n.coordsAtPos(e - 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let o = n.coordsAtPos(e + 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function ba(n, e, t) {
  let r = n.state.selection;
  if (r instanceof H && !r.empty || t.indexOf("s") > -1 || We && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: o } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let s = As(n.state, e);
    if (s && s instanceof B)
      return Rt(n, s);
  }
  if (!i.parent.inlineContent) {
    let s = e < 0 ? i : o, l = r instanceof et ? V.near(s, e) : V.findFrom(s, e);
    return l ? Rt(n, l) : !1;
  }
  return !1;
}
function va(n, e) {
  if (!(n.state.selection instanceof H))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let o = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (o && !o.isText) {
    let s = n.state.tr;
    return e < 0 ? s.delete(t.pos - o.nodeSize, t.pos) : s.delete(t.pos, t.pos + o.nodeSize), n.dispatch(s), !0;
  }
  return !1;
}
function ka(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function Ap(n) {
  if (!Te || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    ka(n, r, "true"), setTimeout(() => ka(n, r, "false"), 20);
  }
  return !1;
}
function Op(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function Np(n, e) {
  let t = e.keyCode, r = Op(e);
  if (t == 8 || We && t == 72 && r == "c")
    return va(n, -1) || On(n, -1);
  if (t == 46 && !e.shiftKey || We && t == 68 && r == "c")
    return va(n, 1) || On(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || We && t == 66 && r == "c") {
    let i = t == 37 ? ya(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return ga(n, i, r) || On(n, i);
  } else if (t == 39 || We && t == 70 && r == "c") {
    let i = t == 39 ? ya(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return ga(n, i, r) || On(n, i);
  } else {
    if (t == 38 || We && t == 80 && r == "c")
      return ba(n, -1, r) || On(n, -1);
    if (t == 40 || We && t == 78 && r == "c")
      return Ap(n) || ba(n, 1, r) || On(n, 1);
    if (r == (We ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function Eu(n, e) {
  n.someProp("transformCopied", (h) => {
    e = h(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: o } = e;
  for (; i > 1 && o > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, o--;
    let h = r.firstChild;
    t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let s = n.someProp("clipboardSerializer") || ut.fromSchema(n.state.schema), l = Lu(), a = l.createElement("div");
  a.appendChild(s.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = Bu[c.nodeName.toLowerCase()]); ) {
    for (let h = u.length - 1; h >= 0; h--) {
      let p = l.createElement(u[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), d++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${o}${d ? ` -${d}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (h) => h(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function Au(n, e, t, r, i) {
  let o = i.parent.type.spec.code, s, l;
  if (!t && !e)
    return null;
  let a = e && (r || o || !t);
  if (a) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, o || r, n);
    }), o)
      return e ? new A(C.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : A.empty;
    let d = n.someProp("clipboardTextParser", (f) => f(e, i, r, n));
    if (d)
      l = d;
    else {
      let f = i.marks(), { schema: h } = n.state, p = ut.fromSchema(h);
      s = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((g) => {
        let y = s.appendChild(document.createElement("p"));
        g && y.appendChild(p.serializeNode(h.text(g, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), s = Lp(t), Hr && Ip(s);
  let c = s && s.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = s.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      s = f;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || Wn.fromSchema(n.state.schema)).parseSlice(s, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !Dp.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = Rp(wa(l, +u[1], +u[2]), u[4]);
  else if (l = A.maxOpen(Bp(l.content, i), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = wa(l, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    l = d(l, n);
  }), l;
}
const Dp = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Bp(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), o, s = [];
    if (n.forEach((l) => {
      if (!s)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return s = null;
      if (c = s.length && o.length && Nu(a, o, l, s[s.length - 1], 0))
        s[s.length - 1] = c;
      else {
        s.length && (s[s.length - 1] = Du(s[s.length - 1], o.length));
        let u = Ou(l, a);
        s.push(u), i = i.matchType(u.type), o = a;
      }
    }), s)
      return C.from(s);
  }
  return n;
}
function Ou(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, C.from(n));
  return n;
}
function Nu(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let o = Nu(n, e, t, r.lastChild, i + 1);
    if (o)
      return r.copy(r.content.replaceChild(r.childCount - 1, o));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(C.from(Ou(t, n, i + 1))));
  }
}
function Du(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, Du(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(C.empty, !0);
  return n.copy(t.append(r));
}
function Ns(n, e, t, r, i, o) {
  let s = e < 0 ? n.firstChild : n.lastChild, l = s.content;
  return n.childCount > 1 && (o = 0), i < r - 1 && (l = Ns(l, e, t, r, i + 1, o)), i >= t && (l = e < 0 ? s.contentMatchAt(0).fillBefore(l, o <= i).append(l) : l.append(s.contentMatchAt(s.childCount).fillBefore(C.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, s.copy(l));
}
function wa(n, e, t) {
  return e < n.openStart && (n = new A(Ns(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new A(Ns(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Bu = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
let xa = null;
function Lu() {
  return xa || (xa = document.implementation.createHTMLDocument("title"));
}
function Lp(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Lu().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && Bu[r[1].toLowerCase()]) && (n = i.map((o) => "<" + o + ">").join("") + n + i.map((o) => "</" + o + ">").reverse().join("")), t.innerHTML = n, i)
    for (let o = 0; o < i.length; o++)
      t = t.querySelector(i[o]) || t;
  return t;
}
function Ip(n) {
  let e = n.querySelectorAll(Ce ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function Rp(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: o, openEnd: s } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = C.from(a.create(r[l + 1], i)), o++, s++;
  }
  return new A(i, o, s);
}
const Se = {}, Me = {}, Pp = { touchstart: !0, touchmove: !0 };
class Fp {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function Hp(n) {
  for (let e in Se) {
    let t = Se[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      Vp(n, r) && !ll(n, r) && (n.editable || !(r.type in Me)) && t(n, r);
    }, Pp[e] ? { passive: !0 } : void 0);
  }
  Te && n.dom.addEventListener("input", () => null), Ds(n);
}
function jt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function zp(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function Ds(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => ll(n, r));
  });
}
function ll(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function Vp(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function _p(n, e) {
  !ll(n, e) && Se[e.type] && (n.editable || !(e.type in Me)) && Se[e.type](n, e);
}
Me.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !Ru(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(Xe && Ce && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), Un && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, on(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else
      n.someProp("handleKeyDown", (r) => r(n, t)) || Np(n, t) ? t.preventDefault() : jt(n, "key");
};
Me.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Me.keypress = (n, e) => {
  let t = e;
  if (Ru(n, t) || !t.charCode || t.ctrlKey && !t.altKey || We && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof H) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (o) => o(n, r.$from.pos, r.$to.pos, i)) && n.dispatch(n.state.tr.insertText(i).scrollIntoView()), t.preventDefault();
  }
};
function Co(n) {
  return { left: n.clientX, top: n.clientY };
}
function jp(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function al(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let o = n.state.doc.resolve(r);
  for (let s = o.depth + 1; s > 0; s--)
    if (n.someProp(e, (l) => s > o.depth ? l(n, t, o.nodeAfter, o.before(s), i, !0) : l(n, t, o.node(s), o.before(s), i, !1)))
      return !0;
  return !1;
}
function _n(n, e, t) {
  n.focused || n.focus();
  let r = n.state.tr.setSelection(e);
  t == "pointer" && r.setMeta("pointer", !0), n.dispatch(r);
}
function $p(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && B.isSelectable(r) ? (_n(n, new B(t), "pointer"), !0) : !1;
}
function Wp(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof B && (r = t.node);
  let o = n.state.doc.resolve(e);
  for (let s = o.depth + 1; s > 0; s--) {
    let l = s > o.depth ? o.nodeAfter : o.node(s);
    if (B.isSelectable(l)) {
      r && t.$from.depth > 0 && s >= t.$from.depth && o.before(t.$from.depth + 1) == t.$from.pos ? i = o.before(t.$from.depth) : i = o.before(s);
      break;
    }
  }
  return i != null ? (_n(n, B.create(n.state.doc, i), "pointer"), !0) : !1;
}
function qp(n, e, t, r, i) {
  return al(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (o) => o(n, e, r)) || (i ? Wp(n, t) : $p(n, t));
}
function Kp(n, e, t, r) {
  return al(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function Up(n, e, t, r) {
  return al(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || Jp(n, t, r);
}
function Jp(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (_n(n, H.create(r, 0, r.content.size), "pointer"), !0) : !1;
  let i = r.resolve(e);
  for (let o = i.depth + 1; o > 0; o--) {
    let s = o > i.depth ? i.nodeAfter : i.node(o), l = i.before(o);
    if (s.inlineContent)
      _n(n, H.create(r, l + 1, l + 1 + s.content.size), "pointer");
    else if (B.isSelectable(s))
      _n(n, B.create(r, l), "pointer");
    else
      continue;
    return !0;
  }
}
function cl(n) {
  return Oi(n);
}
const Iu = We ? "metaKey" : "ctrlKey";
Se.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = cl(n), i = Date.now(), o = "singleClick";
  i - n.input.lastClick.time < 500 && jp(t, n.input.lastClick) && !t[Iu] && (n.input.lastClick.type == "singleClick" ? o = "doubleClick" : n.input.lastClick.type == "doubleClick" && (o = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: o };
  let s = n.posAtCoords(Co(t));
  s && (o == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new Gp(n, s, t, !!r)) : (o == "doubleClick" ? Kp : Up)(n, s.pos, s.inside, t) ? t.preventDefault() : jt(n, "pointer"));
};
class Gp {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[Iu], this.allowDefault = r.shiftKey;
    let o, s;
    if (t.inside > -1)
      o = e.state.doc.nodeAt(t.inside), s = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      o = u.parent, s = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a ? a.dom : null;
    let { selection: c } = e.state;
    (r.button == 0 && o.type.spec.draggable && o.type.spec.selectable !== !1 || c instanceof B && c.from <= s && c.to > s) && (this.mightDrag = {
      node: o,
      pos: s,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && tt && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), jt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => At(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Co(e))), this.updateAllowDefault(e), this.allowDefault || !t ? jt(this.view, "pointer") : qp(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    Te && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    Ce && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (_n(this.view, V.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : jt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), jt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Se.touchstart = (n) => {
  n.input.lastTouch = Date.now(), cl(n), jt(n, "pointer");
};
Se.touchmove = (n) => {
  n.input.lastTouch = Date.now(), jt(n, "pointer");
};
Se.contextmenu = (n) => cl(n);
function Ru(n, e) {
  return n.composing ? !0 : Te && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const Yp = Xe ? 5e3 : -1;
Me.compositionstart = Me.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$from;
    if (e.selection.empty && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), Oi(n, !0), n.markCursor = null;
    else if (Oi(n), tt && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, o = r.focusOffset; i && i.nodeType == 1 && o != 0; ) {
        let s = o < 0 ? i.lastChild : i.childNodes[o - 1];
        if (!s)
          break;
        if (s.nodeType == 3) {
          n.domSelection().collapse(s, s.nodeValue.length);
          break;
        } else
          i = s, o = -1;
      }
    }
    n.input.composing = !0;
  }
  Pu(n, Yp);
};
Me.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Pu(n, 20));
};
function Pu(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => Oi(n), e));
}
function Fu(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Xp()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function Qp(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = $h(e.focusNode, e.focusOffset), r = Wh(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function Xp() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function Oi(n, e = !1) {
  if (!(Xe && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), Fu(n), e || n.docView && n.docView.dirty) {
      let t = ol(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Zp(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Tr = Be && $t < 15 || Un && Yh < 604;
Se.copy = Me.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let o = Tr ? null : t.clipboardData, s = r.content(), { dom: l, text: a } = Eu(n, s);
  o ? (t.preventDefault(), o.clearData(), o.setData("text/html", l.innerHTML), o.setData("text/plain", a)) : Zp(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function em(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function tm(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? Sr(n, r.value, null, i, e) : Sr(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function Sr(n, e, t, r, i) {
  let o = Au(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, o || A.empty)))
    return !0;
  if (!o)
    return !1;
  let s = em(o), l = s ? n.state.tr.replaceSelectionWith(s, r) : n.state.tr.replaceSelection(o);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Hu(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Me.paste = (n, e) => {
  let t = e;
  if (n.composing && !Xe)
    return;
  let r = Tr ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Sr(n, Hu(r), r.getData("text/html"), i, t) ? t.preventDefault() : tm(n, t);
};
class zu {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const Vu = We ? "altKey" : "ctrlKey";
Se.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, o = i.empty ? null : n.posAtCoords(Co(t)), s;
  if (!(o && o.pos >= i.from && o.pos <= (i instanceof B ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      s = B.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (s = B.create(n.state.doc, d.posBefore));
    }
  }
  let l = (s || n.state.selection).content(), { dom: a, text: c, slice: u } = Eu(n, l);
  t.dataTransfer.clearData(), t.dataTransfer.setData(Tr ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Tr || t.dataTransfer.setData("text/plain", c), n.dragging = new zu(u, !t[Vu], s);
};
Se.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Me.dragover = Me.dragenter = (n, e) => e.preventDefault();
Me.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(Co(t));
  if (!i)
    return;
  let o = n.state.doc.resolve(i.pos), s = r && r.slice;
  s ? n.someProp("transformPasted", (p) => {
    s = p(s, n);
  }) : s = Au(n, Hu(t.dataTransfer), Tr ? null : t.dataTransfer.getData("text/html"), !1, o);
  let l = !!(r && !t[Vu]);
  if (n.someProp("handleDrop", (p) => p(n, t, s || A.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!s)
    return;
  t.preventDefault();
  let a = s ? ah(n.state.doc, o.pos, s) : o.pos;
  a == null && (a = o.pos);
  let c = n.state.tr;
  if (l) {
    let { node: p } = r;
    p ? p.replace(c) : c.deleteSelection();
  }
  let u = c.mapping.map(a), d = s.openStart == 0 && s.openEnd == 0 && s.content.childCount == 1, f = c.doc;
  if (d ? c.replaceRangeWith(u, u, s.content.firstChild) : c.replaceRange(u, u, s), c.doc.eq(f))
    return;
  let h = c.doc.resolve(u);
  if (d && B.isSelectable(s.content.firstChild) && h.nodeAfter && h.nodeAfter.sameMarkup(s.content.firstChild))
    c.setSelection(new B(h));
  else {
    let p = c.mapping.map(a);
    c.mapping.maps[c.mapping.maps.length - 1].forEach((g, y, b, x) => p = x), c.setSelection(sl(n, h, c.doc.resolve(p)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
Se.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && At(n);
  }, 20));
};
Se.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Se.beforeinput = (n, e) => {
  if (Ce && Xe && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (o) => o(n, on(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Me)
  Se[n] = Me[n];
function Mr(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Ni {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || hn, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: o, deleted: s } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return s ? null : new De(o - r, o - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Ni && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Mr(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class qt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || hn;
  }
  map(e, t, r, i) {
    let o = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, s = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return o >= s ? null : new De(o, s, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof qt && Mr(this.attrs, e.attrs) && Mr(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof qt;
  }
  destroy() {
  }
}
class ul {
  constructor(e, t) {
    this.attrs = e, this.spec = t || hn;
  }
  map(e, t, r, i) {
    let o = e.mapResult(t.from + i, 1);
    if (o.deleted)
      return null;
    let s = e.mapResult(t.to + i, -1);
    return s.deleted || s.pos <= o.pos ? null : new De(o.pos - r, s.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), o;
    return i == t.from && !(o = e.child(r)).isText && i + o.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof ul && Mr(this.attrs, e.attrs) && Mr(this.spec, e.spec);
  }
  destroy() {
  }
}
class De {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new De(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new De(e, e, new Ni(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new De(e, t, new qt(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new De(e, t, new ul(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof qt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Ni;
  }
}
const Ln = [], hn = {};
class oe {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : Ln, this.children = t.length ? t : Ln;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? Di(t, e, 0, hn) : ye;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, o) {
    for (let s = 0; s < this.local.length; s++) {
      let l = this.local[s];
      l.from <= t && l.to >= e && (!o || o(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let s = 0; s < this.children.length; s += 3)
      if (this.children[s] < t && this.children[s + 1] > e) {
        let l = this.children[s] + 1;
        this.children[s + 2].findInner(e - l, t - l, r, i + l, o);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == ye || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || hn);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, o) {
    let s;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (s || (s = [])).push(a) : o.onRemove && o.onRemove(this.local[l].spec);
    }
    return this.children.length ? nm(this.children, s || [], e, t, r, i, o) : s ? new oe(s.sort(pn), Ln) : ye;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == ye ? oe.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, o = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = ju(t, l, c)) {
        for (i || (i = this.children.slice()); o < i.length && i[o] < a; )
          o += 3;
        i[o] == a ? i[o + 2] = i[o + 2].addInner(l, u, c + 1) : i.splice(o, 0, a, a + l.nodeSize, Di(u, l, c + 1, hn)), o += 3;
      }
    });
    let s = _u(o ? $u(t) : t, -r);
    for (let l = 0; l < s.length; l++)
      s[l].type.valid(e, s[l]) || s.splice(l--, 1);
    return new oe(s.length ? this.local.concat(s).sort(pn) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == ye ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let o = 0; o < r.length; o += 3) {
      let s, l = r[o] + t, a = r[o + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > l && d.to < a && (e[u] = null, (s || (s = [])).push(d));
      if (!s)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[o + 2].removeInner(s, l + 1);
      c != ye ? r[o + 2] = c : (r.splice(o, 3), o -= 3);
    }
    if (i.length) {
      for (let o = 0, s; o < e.length; o++)
        if (s = e[o])
          for (let l = 0; l < i.length; l++)
            i[l].eq(s, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new oe(i, r) : ye;
  }
  forChild(e, t) {
    if (this == ye)
      return this;
    if (t.isLeaf)
      return oe.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let o = e + 1, s = o + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < s && a.to > o && a.type instanceof qt) {
        let c = Math.max(o, a.from) - o, u = Math.min(s, a.to) - o;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new oe(i.sort(pn), Ln);
      return r ? new Ht([l, r]) : l;
    }
    return r || ye;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof oe) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return dl(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == ye)
      return Ln;
    if (e.inlineContent || !this.local.some(qt.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof qt || t.push(this.local[r]);
    return t;
  }
}
oe.empty = new oe([], []);
oe.removeOverlap = dl;
const ye = oe.empty;
class Ht {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, hn));
    return Ht.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return oe.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].forChild(e, t);
      o != ye && (o instanceof Ht ? r = r.concat(o.members) : r.push(o));
    }
    return Ht.from(r);
  }
  eq(e) {
    if (!(e instanceof Ht) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].localsInner(e);
      if (o.length)
        if (!t)
          t = o;
        else {
          r && (t = t.slice(), r = !1);
          for (let s = 0; s < o.length; s++)
            t.push(o[s]);
        }
    }
    return t ? dl(r ? t : t.sort(pn)) : Ln;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return ye;
      case 1:
        return e[0];
      default:
        return new Ht(e.every((t) => t instanceof oe) ? e : e.reduce((t, r) => t.concat(r instanceof oe ? r : r.members), []));
    }
  }
}
function nm(n, e, t, r, i, o, s) {
  let l = n.slice();
  for (let c = 0, u = o; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, h, p, g) => {
      let y = g - p - (h - f);
      for (let b = 0; b < l.length; b += 3) {
        let x = l[b + 1];
        if (x < 0 || f > x + u - d)
          continue;
        let T = l[b] + u - d;
        h >= T ? l[b + 1] = f <= T ? -2 : -1 : f >= u && y && (l[b] += y, l[b + 1] += y);
      }
      d += y;
    }), u = t.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + o), d = u - i;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let f = t.map(n[c + 1] + o, -1), h = f - i, { index: p, offset: g } = r.content.findIndex(d), y = r.maybeChild(p);
      if (y && g == d && g + y.nodeSize == h) {
        let b = l[c + 2].mapInner(t, y, u + 1, n[c] + o + 1, s);
        b != ye ? (l[c] = d, l[c + 1] = h, l[c + 2] = b) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = rm(l, n, e, t, i, o, s), u = Di(c, r, 0, s);
    e = u.local;
    for (let d = 0; d < l.length; d += 3)
      l[d + 1] < 0 && (l.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let h = u.children[d];
      for (; f < l.length && l[f] < h; )
        f += 3;
      l.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new oe(e.sort(pn), l);
}
function _u(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new De(i.from + e, i.to + e, i.type));
  }
  return t;
}
function rm(n, e, t, r, i, o, s) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, i, c);
      d ? t.push(d) : s.onRemove && s.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + o + 1);
  return t;
}
function ju(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let o = 0, s; o < n.length; o++)
    (s = n[o]) && s.from > t && s.to < r && ((i || (i = [])).push(s), n[o] = null);
  return i;
}
function $u(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function Di(n, e, t, r) {
  let i = [], o = !1;
  e.forEach((l, a) => {
    let c = ju(n, l, a + t);
    if (c) {
      o = !0;
      let u = Di(c, l, t + a + 1, r);
      u != ye && i.push(a, a + l.nodeSize, u);
    }
  });
  let s = _u(o ? $u(n) : n, -t).sort(pn);
  for (let l = 0; l < s.length; l++)
    s[l].type.valid(e, s[l]) || (r.onRemove && r.onRemove(s[l].spec), s.splice(l--, 1));
  return s.length || i.length ? new oe(s, i) : ye;
}
function pn(n, e) {
  return n.from - e.from || n.to - e.to;
}
function dl(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let o = e[i];
        if (o.from == r.from) {
          o.to != r.to && (e == n && (e = n.slice()), e[i] = o.copy(o.from, r.to), Ca(e, i + 1, o.copy(r.to, o.to)));
          continue;
        } else {
          o.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, o.from), Ca(e, i, r.copy(o.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function Ca(n, e, t) {
  for (; e < n.length && pn(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function Uo(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != ye && e.push(r);
  }), n.cursorWrapper && e.push(oe.create(n.state.doc, [n.cursorWrapper.deco])), Ht.from(e);
}
const im = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, om = Be && $t <= 11;
class sm {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class lm {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new sm(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      Be && $t <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), om && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, im)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (ma(this.view)) {
      if (this.suppressingSelectionUpdates)
        return At(this.view);
      if (Be && $t <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && bn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let o = e.focusNode; o; o = Cr(o))
      t.add(o);
    for (let o = e.anchorNode; o; o = Cr(o))
      if (t.has(o)) {
        r = o;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && ma(e) && !this.ignoreSelectionChange(r), o = -1, s = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], a);
        d && (o = o < 0 ? d.from : Math.min(d.from, o), s = s < 0 ? d.to : Math.max(d.to, s), d.typeOver && (l = !0));
      }
    if (tt && a.length > 1) {
      let u = a.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let d = u[0], f = u[1];
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      }
    }
    let c = null;
    o < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && wo(r) && (c = ol(e)) && c.eq(V.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, At(e), this.currentSelection.set(r), e.scrollToSelection()) : (o > -1 || i) && (o > -1 && (e.docView.markDirty(o, s), am(e)), this.handleDOMChange(o, s, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || At(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++)
        t.push(e.addedNodes[u]);
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, o = e.nextSibling;
      if (Be && $t <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (i = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (o = f);
        }
      let s = i && i.parentNode == e.target ? pe(i) + 1 : 0, l = r.localPosFromDOM(e.target, s, -1), a = o && o.parentNode == e.target ? pe(o) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else
      return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : {
        from: r.posAtStart,
        to: r.posAtEnd,
        // An event was generated for a text change that didn't change
        // any text. Mark the dom change to fall back to assuming the
        // selection was typed over with an identical value if it can't
        // find another change.
        typeOver: e.target.nodeValue == e.oldValue
      };
  }
}
let Ta = /* @__PURE__ */ new WeakMap(), Sa = !1;
function am(n) {
  if (!Ta.has(n) && (Ta.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = tt, Sa)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Sa = !0;
  }
}
function Ma(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, o = e.endOffset, s = n.domAtPos(n.state.selection.anchor);
  return bn(s.node, s.offset, i, o) && ([t, r, i, o] = [i, o, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: o };
}
function cm(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return Ma(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? Ma(n, t) : null;
}
function um(n, e, t) {
  let { node: r, fromOffset: i, toOffset: o, from: s, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, u = a.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], wo(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), Ce && n.input.lastKeyCode === 8)
    for (let y = o; y > i; y--) {
      let b = r.childNodes[y - 1], x = b.pmViewDesc;
      if (b.nodeName == "BR" && !x) {
        o = y;
        break;
      }
      if (!x || x.size)
        break;
    }
  let d = n.state.doc, f = n.someProp("domParser") || Wn.fromSchema(n.state.schema), h = d.resolve(s), p = null, g = f.parse(r, {
    topNode: h.parent,
    topMatch: h.parent.contentMatchAt(h.index()),
    topOpen: !0,
    from: i,
    to: o,
    preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: dm,
    context: h
  });
  if (c && c[0].pos != null) {
    let y = c[0].pos, b = c[1] && c[1].pos;
    b == null && (b = y), p = { anchor: y + s, head: b + s };
  }
  return { doc: g, sel: p, from: s, to: l };
}
function dm(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (Te && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || Te && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const fm = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function hm(n, e, t, r, i) {
  let o = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let S = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, I = ol(n, S);
    if (I && !n.state.selection.eq(I)) {
      if (Ce && Xe && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", ($) => $(n, on(13, "Enter"))))
        return;
      let j = n.state.tr.setSelection(I);
      S == "pointer" ? j.setMeta("pointer", !0) : S == "key" && j.scrollIntoView(), o && j.setMeta("composition", o), n.dispatch(j);
    }
    return;
  }
  let s = n.state.doc.resolve(e), l = s.sharedDepth(t);
  e = s.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = um(n, e, t), u = n.state.doc, d = u.slice(c.from, c.to), f, h;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, h = "end") : (f = n.state.selection.from, h = "start"), n.input.lastKeyCode = null;
  let p = gm(d.content, c.doc.content, c.from, f, h);
  if ((Un && n.input.lastIOSEnter > Date.now() - 225 || Xe) && i.some((S) => S.nodeType == 1 && !fm.test(S.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (S) => S(n, on(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof H && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let S = Ea(n, n.state.doc, c.sel);
        if (S && !S.eq(n.state.selection)) {
          let I = n.state.tr.setSelection(S);
          o && I.setMeta("composition", o), n.dispatch(I);
        }
      }
      return;
    }
  n.input.domChangeCount++, n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof H && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), Be && $t <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let g = c.doc.resolveNoCache(p.start - c.from), y = c.doc.resolveNoCache(p.endB - c.from), b = u.resolve(p.start), x = g.sameParent(y) && g.parent.inlineContent && b.end() >= p.endA, T;
  if ((Un && n.input.lastIOSEnter > Date.now() - 225 && (!x || i.some((S) => S.nodeName == "DIV" || S.nodeName == "P")) || !x && g.pos < c.doc.content.size && !g.sameParent(y) && (T = V.findFrom(c.doc.resolve(g.pos + 1), 1, !0)) && T.head == y.pos) && n.someProp("handleKeyDown", (S) => S(n, on(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && mm(u, p.start, p.endA, g, y) && n.someProp("handleKeyDown", (S) => S(n, on(8, "Backspace")))) {
    Xe && Ce && n.domObserver.suppressSelectionUpdates();
    return;
  }
  Ce && Xe && p.endB == p.start && (n.input.lastAndroidDelete = Date.now()), Xe && !x && g.start() != y.start() && y.parentOffset == 0 && g.depth == y.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, y = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(S) {
      return S(n, on(13, "Enter"));
    });
  }, 20));
  let m = p.start, w = p.endA, v, E, L;
  if (x) {
    if (g.pos == y.pos)
      Be && $t <= 11 && g.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => At(n), 20)), v = n.state.tr.delete(m, w), E = u.resolve(p.start).marksAcross(u.resolve(p.endA));
    else if (
      // Adding or removing a mark
      p.endA == p.endB && (L = pm(g.parent.content.cut(g.parentOffset, y.parentOffset), b.parent.content.cut(b.parentOffset, p.endA - b.start())))
    )
      v = n.state.tr, L.type == "add" ? v.addMark(m, w, L.mark) : v.removeMark(m, w, L.mark);
    else if (g.parent.child(g.index()).isText && g.index() == y.index() - (y.textOffset ? 0 : 1)) {
      let S = g.parent.textBetween(g.parentOffset, y.parentOffset);
      if (n.someProp("handleTextInput", (I) => I(n, m, w, S)))
        return;
      v = n.state.tr.insertText(S, m, w);
    }
  }
  if (v || (v = n.state.tr.replace(m, w, c.doc.slice(p.start - c.from, p.endB - c.from))), c.sel) {
    let S = Ea(n, v.doc, c.sel);
    S && !(Ce && Xe && n.composing && S.empty && (p.start != p.endB || n.input.lastAndroidDelete < Date.now() - 100) && (S.head == m || S.head == v.mapping.map(w) - 1) || Be && S.empty && S.head == m) && v.setSelection(S);
  }
  E && v.ensureMarks(E), o && v.setMeta("composition", o), n.dispatch(v.scrollIntoView());
}
function Ea(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : sl(n, e.resolve(t.anchor), e.resolve(t.head));
}
function pm(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, o = r, s, l, a;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < t.length; u++)
    o = t[u].removeFromSet(o);
  if (i.length == 1 && o.length == 0)
    l = i[0], s = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (i.length == 0 && o.length == 1)
    l = o[0], s = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (C.from(c).eq(n))
    return { mark: l, type: s };
}
function mm(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    Jo(r, !0, !1) < i.pos
  )
    return !1;
  let o = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = o.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (o.parentOffset < o.parent.content.size || !o.parent.isTextblock)
    return !1;
  let s = n.resolve(Jo(o, !0, !0));
  return !s.parent.isTextblock || s.pos > t || Jo(s, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(s.parent.content);
}
function Jo(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let o = n.node(r).maybeChild(n.indexAfter(r));
    for (; o && !o.isLeaf; )
      o = o.firstChild, i++;
  }
  return i;
}
function gm(n, e, t, r, i) {
  let o = n.findDiffStart(e, t);
  if (o == null)
    return null;
  let { a: s, b: l } = n.findDiffEnd(e, t + n.size, t + e.size);
  if (i == "end") {
    let a = Math.max(0, o - Math.min(s, l));
    r -= s + a - o;
  }
  if (s < o && n.size < e.size) {
    let a = r <= o && r >= s ? o - r : 0;
    o -= a, o && o < e.size && Aa(e.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), l = o + (l - s), s = o;
  } else if (l < o) {
    let a = r <= o && r >= l ? o - r : 0;
    o -= a, o && o < n.size && Aa(n.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), s = o + (s - l), l = o;
  }
  return { start: o, endA: s, endB: l };
}
function Aa(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class ym {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Fp(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(La), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Da(this), Na(this), this.nodeViews = Ba(this), this.docView = ca(this.state.doc, Oa(this), Uo(this), this.dom, this), this.domObserver = new lm(this, (r, i, o, s) => hm(this, r, i, o, s)), this.domObserver.start(), Hp(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && Ds(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(La), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, o = !1, s = !1;
    e.storedMarks && this.composing && (Fu(this), s = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let h = Ba(this);
      vm(h, this.nodeViews) && (this.nodeViews = h, o = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && Ds(this), this.editable = Da(this), Na(this);
    let a = Uo(this), c = Oa(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", d = o || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(i.selection)) && (s = !0);
    let f = u == "preserve" && s && this.dom.style.overflowAnchor == null && Zh(this);
    if (s) {
      this.domObserver.stop();
      let h = d && (Be || Ce) && !this.composing && !i.selection.empty && !e.selection.empty && bm(i.selection, e.selection);
      if (d) {
        let p = Ce ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = Qp(this)), (o || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = ca(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (h = !0);
      }
      h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && Cp(this)) ? At(this, h) : (Tu(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && ep(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!this.someProp("handleScrollToSelection", (t) => t(this)))
      if (this.state.selection instanceof B) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && ra(this, t.getBoundingClientRect(), e);
      } else
        ra(this, this.coordsAtPos(this.state.selection.head, 1), e);
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let o = r.from + (this.state.doc.content.size - t.doc.content.size);
      (o > 0 && this.state.doc.nodeAt(o)) == r.node && (i = o);
    }
    this.dragging = new zu(e.slice, e.move, i < 0 ? void 0 : B.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let s = 0; s < this.directPlugins.length; s++) {
      let l = this.directPlugins[s].props[e];
      if (l != null && (i = t ? t(l) : l))
        return i;
    }
    let o = this.state.plugins;
    if (o)
      for (let s = 0; s < o.length; s++) {
        let l = o[s].props[e];
        if (l != null && (i = t ? t(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (Be) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && tp(this.dom), At(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return sp(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return gu(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return dp(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return Sr(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return Sr(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (zp(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Uo(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, _h());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return _p(this, e);
  }
  /**
  Dispatch a transaction. Will call
  [`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
  when given, and otherwise defaults to applying the transaction to
  the current state and calling
  [`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
  This method is bound to the view instance, so that it can be
  easily passed around.
  */
  dispatch(e) {
    let t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return Te && this.root.nodeType === 11 && Kh(this.dom.ownerDocument) == this.dom && cm(this, e) || e;
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
function Oa(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [De.node(0, n.state.doc.content.size, e)];
}
function Na(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: De.widget(n.state.selection.head, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function Da(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function bm(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function Ba(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function vm(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function La(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Ut = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Bi = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, km = typeof navigator < "u" && /Mac/.test(navigator.platform), wm = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var me = 0; me < 10; me++)
  Ut[48 + me] = Ut[96 + me] = String(me);
for (var me = 1; me <= 24; me++)
  Ut[me + 111] = "F" + me;
for (var me = 65; me <= 90; me++)
  Ut[me] = String.fromCharCode(me + 32), Bi[me] = String.fromCharCode(me);
for (var Go in Ut)
  Bi.hasOwnProperty(Go) || (Bi[Go] = Ut[Go]);
function xm(n) {
  var e = km && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || wm && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Bi : Ut)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const Cm = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function Tm(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      s = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      Cm ? s = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), s && (t = "Meta-" + t), o && (t = "Shift-" + t), t;
}
function Sm(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[Tm(t)] = n[t];
  return e;
}
function Yo(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function Mm(n) {
  return new le({ props: { handleKeyDown: Wu(n) } });
}
function Wu(n) {
  let e = Sm(n);
  return function(t, r) {
    let i = xm(r), o, s = e[Yo(i, r)];
    if (s && s(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Yo(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || i.charCodeAt(0) > 127) && (o = Ut[r.keyCode]) && o != i) {
        let l = e[Yo(o, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const Em = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function qu(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Am = (n, e, t) => {
  let r = qu(n, t);
  if (!r)
    return !1;
  let i = fl(r);
  if (!i) {
    let s = r.blockRange(), l = s && er(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (!o.type.spec.isolating && Gu(n, i, e))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "end") || B.isSelectable(o))) {
    let s = vo(n.doc, r.before(), r.after(), A.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Jn(o, "end") ? V.findFrom(l.doc.resolve(l.mapping.map(i.pos, -1)), -1) : B.create(l.doc, i.pos - o.nodeSize)), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Om = (n, e, t) => {
  let r = qu(n, t);
  if (!r)
    return !1;
  let i = fl(r);
  return i ? Ku(n, i, e) : !1;
}, Nm = (n, e, t) => {
  let r = Uu(n, t);
  if (!r)
    return !1;
  let i = hl(r);
  return i ? Ku(n, i, e) : !1;
};
function Ku(n, e, t) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let s = e.nodeAfter, l = s, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = vo(n.doc, o, a, A.empty);
  if (!c || c.from != o || c instanceof ae && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(H.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Jn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Dm = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = fl(r);
  }
  let s = o && o.nodeBefore;
  return !s || !B.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(B.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function fl(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Uu(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Bm = (n, e, t) => {
  let r = Uu(n, t);
  if (!r)
    return !1;
  let i = hl(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Gu(n, i, e))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "start") || B.isSelectable(o))) {
    let s = vo(n.doc, r.before(), r.after(), A.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Jn(o, "start") ? V.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : B.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Lm = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = hl(r);
  }
  let s = o && o.nodeAfter;
  return !s || !B.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(B.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function hl(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const Im = (n, e) => {
  let t = n.selection, r = t instanceof B, i;
  if (r) {
    if (t.node.isTextblock || !Gt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = bo(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(B.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Rm = (n, e) => {
  let t = n.selection, r;
  if (t instanceof B) {
    if (t.node.isTextblock || !Gt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = bo(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Pm = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && er(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Fm = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ju(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Hm = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Ju(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(V.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, zm = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof et || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Ju(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(H.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Vm = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (zn(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && er(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
}, _m = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(B.create(n.doc, i))), !0);
};
function jm(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Gt(n.doc, e.pos)) ? !1 : (t && t(n.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function Gu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o, s;
  if (r.type.spec.isolating || i.type.spec.isolating)
    return !1;
  if (jm(n, e, t))
    return !0;
  let l = e.parent.canReplace(e.index(), e.index() + 1);
  if (l && (o = (s = r.contentMatchAt(r.childCount)).findWrapping(i.type)) && s.matchType(o[0] || i.type).validEnd) {
    if (t) {
      let d = e.pos + i.nodeSize, f = C.empty;
      for (let g = o.length - 1; g >= 0; g--)
        f = C.from(o[g].create(null, f));
      f = C.from(r.copy(f));
      let h = n.tr.step(new ce(e.pos - 1, d, e.pos, d, new A(f, 1, 0), o.length, !0)), p = d + 2 * o.length;
      Gt(h.doc, p) && h.join(p), t(h.scrollIntoView());
    }
    return !0;
  }
  let a = V.findFrom(e, 1), c = a && a.$from.blockRange(a.$to), u = c && er(c);
  if (u != null && u >= e.depth)
    return t && t(n.tr.lift(c, u).scrollIntoView()), !0;
  if (l && Jn(i, "start", !0) && Jn(r, "end")) {
    let d = r, f = [];
    for (; f.push(d), !d.isTextblock; )
      d = d.lastChild;
    let h = i, p = 1;
    for (; !h.isTextblock; h = h.firstChild)
      p++;
    if (d.canReplace(d.childCount, d.childCount, h.content)) {
      if (t) {
        let g = C.empty;
        for (let b = f.length - 1; b >= 0; b--)
          g = C.from(f[b].copy(g));
        let y = n.tr.step(new ce(e.pos - f.length, e.pos + i.nodeSize, e.pos + p, e.pos + i.nodeSize - p, new A(g, f.length, 0), 0, !0));
        t(y.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Yu(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(H.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const $m = Yu(-1), Wm = Yu(1);
function qm(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && nl(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Ia(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = t.tr;
      for (let s = 0; s < t.selection.ranges.length; s++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[s];
        o.setBlockType(l, a, n, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Km(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = !1, a = s;
    if (!s)
      return !1;
    if (s.depth >= 2 && i.node(s.depth - 1).type.compatibleContent(n) && s.startIndex == 0) {
      if (i.index(s.depth - 1) == 0)
        return !1;
      let u = t.doc.resolve(s.start - 2);
      a = new Ti(u, u, s.depth), s.endIndex < s.parent.childCount && (s = new Ti(i, t.doc.resolve(o.end(s.depth)), s.depth)), l = !0;
    }
    let c = nl(a, n, e, s);
    return c ? (r && r(Um(t.tr, s, c, l, n).scrollIntoView()), !0) : !1;
  };
}
function Um(n, e, t, r, i) {
  let o = C.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = C.from(t[u].type.create(t[u].attrs, o));
  n.step(new ce(e.start - (r ? 2 : 0), e.end, e.start, e.end, new A(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && zn(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function Jm(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Gm(e, t, n, o) : Ym(e, t, o) : !0 : !1;
  };
}
function Gm(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new ce(o - 1, s, o, s, new A(C.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Ti(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = er(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.mapping.map(o, -1) - 1;
  return Gt(i.doc, a) && i.join(a), e(i.scrollIntoView()), !0;
}
function Ym(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, g = t.startIndex; p > g; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? C.empty : C.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new ce(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new A((l ? C.empty : C.from(i.copy(C.empty))).append(a ? C.empty : C.from(i.copy(C.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Qm(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, a = l.child(s - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = C.from(c ? n.create() : null), d = new A(C.from(n.create(null, C.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = o.start, h = o.end;
      t(e.tr.step(new ce(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function To(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: i } = t, { storedMarks: o } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return o;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = t.selection, i = t.doc, o = t.storedMarks, t;
    }
  };
}
class So {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: i } = t, { tr: o } = r, s = this.buildProps(o);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...u) => {
      const d = a(...u)(s);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(o), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], a = !!e, c = e || o.tr, u = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(c), l.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...g) => {
        const y = this.buildProps(c, t), b = h(...g)(y);
        return l.push(b), d;
      }])),
      run: u
    };
    return d;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, i = !1, o = e || r.tr, s = this.buildProps(o, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([a, c]) => [a, (...u) => c(...u)({ ...s, dispatch: void 0 })])),
      chain: () => this.createChain(o, i)
    };
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = {
      tr: e,
      editor: i,
      view: s,
      state: To({
        state: o,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, c]) => [a, (...u) => c(...u)(l)]));
      }
    };
    return l;
  }
}
class Xm {
  constructor() {
    this.callbacks = {};
  }
  on(e, t) {
    return this.callbacks[e] || (this.callbacks[e] = []), this.callbacks[e].push(t), this;
  }
  emit(e, ...t) {
    const r = this.callbacks[e];
    return r && r.forEach((i) => i.apply(this, t)), this;
  }
  off(e, t) {
    const r = this.callbacks[e];
    return r && (t ? this.callbacks[e] = r.filter((i) => i !== t) : delete this.callbacks[e]), this;
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
function N(n, e, t) {
  return n.config[e] === void 0 && n.parent ? N(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? N(n.parent, e, t) : null
  }) : n.config[e];
}
function Mo(n) {
  const e = n.filter((i) => i.type === "extension"), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function Qu(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = Mo(n), i = [...t, ...r], o = {
    default: null,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  };
  return n.forEach((s) => {
    const l = {
      name: s.name,
      options: s.options,
      storage: s.storage
    }, a = N(s, "addGlobalAttributes", l);
    if (!a)
      return;
    a().forEach((u) => {
      u.types.forEach((d) => {
        Object.entries(u.attributes).forEach(([f, h]) => {
          e.push({
            type: d,
            name: f,
            attribute: {
              ...o,
              ...h
            }
          });
        });
      });
    });
  }), i.forEach((s) => {
    const l = {
      name: s.name,
      options: s.options,
      storage: s.storage
    }, a = N(s, "addAttributes", l);
    if (!a)
      return;
    const c = a();
    Object.entries(c).forEach(([u, d]) => {
      const f = {
        ...o,
        ...d
      };
      typeof (f == null ? void 0 : f.default) == "function" && (f.default = f.default()), f != null && f.isRequired && (f == null ? void 0 : f.default) === void 0 && delete f.default, e.push({
        type: s.name,
        name: u,
        attribute: f
      });
    });
  }), e;
}
function de(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
function Z(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([i, o]) => {
      if (!r[i]) {
        r[i] = o;
        return;
      }
      if (i === "class") {
        const l = o ? o.split(" ") : [], a = r[i] ? r[i].split(" ") : [], c = l.filter((u) => !a.includes(u));
        r[i] = [...a, ...c].join(" ");
      } else
        i === "style" ? r[i] = [r[i], o].join("; ") : r[i] = o;
    }), r;
  }, {});
}
function Bs(n, e) {
  return e.filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => Z(t, r), {});
}
function Xu(n) {
  return typeof n == "function";
}
function z(n, e = void 0, ...t) {
  return Xu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Zm(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function eg(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function Ra(n, e) {
  return n.style ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((o, s) => {
        const l = s.attribute.parseHTML ? s.attribute.parseHTML(t) : eg(t.getAttribute(s.name));
        return l == null ? o : {
          ...o,
          [s.name]: l
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function Pa(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && Zm(t) ? !1 : t != null)
  );
}
function tg(n, e) {
  var t;
  const r = Qu(n), { nodeExtensions: i, markExtensions: o } = Mo(n), s = (t = i.find((c) => N(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, l = Object.fromEntries(i.map((c) => {
    const u = r.filter((b) => b.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((b, x) => {
      const T = N(x, "extendNodeSchema", d);
      return {
        ...b,
        ...T ? T(c) : {}
      };
    }, {}), h = Pa({
      ...f,
      content: z(N(c, "content", d)),
      marks: z(N(c, "marks", d)),
      group: z(N(c, "group", d)),
      inline: z(N(c, "inline", d)),
      atom: z(N(c, "atom", d)),
      selectable: z(N(c, "selectable", d)),
      draggable: z(N(c, "draggable", d)),
      code: z(N(c, "code", d)),
      defining: z(N(c, "defining", d)),
      isolating: z(N(c, "isolating", d)),
      attrs: Object.fromEntries(u.map((b) => {
        var x;
        return [b.name, { default: (x = b == null ? void 0 : b.attribute) === null || x === void 0 ? void 0 : x.default }];
      }))
    }), p = z(N(c, "parseHTML", d));
    p && (h.parseDOM = p.map((b) => Ra(b, u)));
    const g = N(c, "renderHTML", d);
    g && (h.toDOM = (b) => g({
      node: b,
      HTMLAttributes: Bs(b, u)
    }));
    const y = N(c, "renderText", d);
    return y && (h.toText = y), [c.name, h];
  })), a = Object.fromEntries(o.map((c) => {
    const u = r.filter((y) => y.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((y, b) => {
      const x = N(b, "extendMarkSchema", d);
      return {
        ...y,
        ...x ? x(c) : {}
      };
    }, {}), h = Pa({
      ...f,
      inclusive: z(N(c, "inclusive", d)),
      excludes: z(N(c, "excludes", d)),
      group: z(N(c, "group", d)),
      spanning: z(N(c, "spanning", d)),
      code: z(N(c, "code", d)),
      attrs: Object.fromEntries(u.map((y) => {
        var b;
        return [y.name, { default: (b = y == null ? void 0 : y.attribute) === null || b === void 0 ? void 0 : b.default }];
      }))
    }), p = z(N(c, "parseHTML", d));
    p && (h.parseDOM = p.map((y) => Ra(y, u)));
    const g = N(c, "renderHTML", d);
    return g && (h.toDOM = (y) => g({
      mark: y,
      HTMLAttributes: Bs(y, u)
    })), [c.name, h];
  }));
  return new Pf({
    topNode: s,
    nodes: l,
    marks: a
  });
}
function Qo(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function Fa(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
const ng = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (i, o, s, l) => {
    var a, c;
    const u = ((c = (a = i.type.spec).toText) === null || c === void 0 ? void 0 : c.call(a, {
      node: i,
      pos: o,
      parent: s,
      index: l
    })) || i.textContent || "%leaf%";
    t += u.slice(0, Math.max(0, r - o));
  }), t;
};
function pl(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class Vr {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const rg = (n, e) => {
  if (pl(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function ii(n) {
  var e;
  const { editor: t, from: r, to: i, text: o, rules: s, plugin: l } = n, { view: a } = t;
  if (a.composing)
    return !1;
  const c = a.state.doc.resolve(r);
  if (
    // check for code node
    c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((f) => f.type.spec.code)
  )
    return !1;
  let u = !1;
  const d = ng(c) + o;
  return s.forEach((f) => {
    if (u)
      return;
    const h = rg(d, f.find);
    if (!h)
      return;
    const p = a.state.tr, g = To({
      state: a.state,
      transaction: p
    }), y = {
      from: r - (h[0].length - o.length),
      to: i
    }, { commands: b, chain: x, can: T } = new So({
      editor: t,
      state: g
    });
    f.handler({
      state: g,
      range: y,
      match: h,
      commands: b,
      chain: x,
      can: T
    }) === null || !p.steps.length || (p.setMeta(l, {
      transform: p,
      from: r,
      to: i,
      text: o
    }), a.dispatch(p), u = !0);
  }), u;
}
function ig(n) {
  const { editor: e, rules: t } = n, r = new le({
    state: {
      init() {
        return null;
      },
      apply(i, o) {
        const s = i.getMeta(r);
        if (s)
          return s;
        const l = i.getMeta("applyInputRules");
        return !!l && setTimeout(() => {
          const { from: c, text: u } = l, d = c + u.length;
          ii({
            editor: e,
            from: c,
            to: d,
            text: u,
            rules: t,
            plugin: r
          });
        }), i.selectionSet || i.docChanged ? null : o;
      }
    },
    props: {
      handleTextInput(i, o, s, l) {
        return ii({
          editor: e,
          from: o,
          to: s,
          text: l,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: {
        compositionend: (i) => (setTimeout(() => {
          const { $cursor: o } = i.state.selection;
          o && ii({
            editor: e,
            from: o.pos,
            to: o.pos,
            text: "",
            rules: t,
            plugin: r
          });
        }), !1)
      },
      // add support for input rules to trigger on enter
      // this is useful for example for code blocks
      handleKeyDown(i, o) {
        if (o.key !== "Enter")
          return !1;
        const { $cursor: s } = i.state.selection;
        return s ? ii({
          editor: e,
          from: s.pos,
          to: s.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    // @ts-ignore
    isInputRules: !0
  });
  return r;
}
function og(n) {
  return typeof n == "number";
}
class Zu {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const sg = (n, e, t) => {
  if (pl(e))
    return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((i) => {
    const o = [i.text];
    return o.index = i.index, o.input = n, o.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), o.push(i.replaceWith)), o;
  }) : [];
};
function lg(n) {
  const { editor: e, state: t, from: r, to: i, rule: o, pasteEvent: s, dropEvent: l } = n, { commands: a, chain: c, can: u } = new So({
    editor: e,
    state: t
  }), d = [];
  return t.doc.nodesBetween(r, i, (h, p) => {
    if (!h.isTextblock || h.type.spec.code)
      return;
    const g = Math.max(r, p), y = Math.min(i, p + h.content.size), b = h.textBetween(g - p, y - p, void 0, "￼");
    sg(b, o.find, s).forEach((T) => {
      if (T.index === void 0)
        return;
      const m = g + T.index + 1, w = m + T[0].length, v = {
        from: t.tr.mapping.map(m),
        to: t.tr.mapping.map(w)
      }, E = o.handler({
        state: t,
        range: v,
        match: T,
        commands: a,
        chain: c,
        can: u,
        pasteEvent: s,
        dropEvent: l
      });
      d.push(E);
    });
  }), d.every((h) => h !== null);
}
const ag = (n) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", n), t;
};
function cg(n) {
  const { editor: e, rules: t } = n;
  let r = null, i = !1, o = !1, s = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  const a = ({ state: u, from: d, to: f, rule: h, pasteEvt: p }) => {
    const g = u.tr, y = To({
      state: u,
      transaction: g
    });
    if (!(!lg({
      editor: e,
      state: y,
      from: Math.max(d - 1, 0),
      to: f.b - 1,
      rule: h,
      pasteEvent: p,
      dropEvent: l
    }) || !g.steps.length))
      return l = typeof DragEvent < "u" ? new DragEvent("drop") : null, s = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, g;
  };
  return t.map((u) => new le({
    // we register a global drag handler to track the current drag source element
    view(d) {
      const f = (h) => {
        var p;
        r = !((p = d.dom.parentElement) === null || p === void 0) && p.contains(h.target) ? d.dom.parentElement : null;
      };
      return window.addEventListener("dragstart", f), {
        destroy() {
          window.removeEventListener("dragstart", f);
        }
      };
    },
    props: {
      handleDOMEvents: {
        drop: (d, f) => (o = r === d.dom.parentElement, l = f, !1),
        paste: (d, f) => {
          var h;
          const p = (h = f.clipboardData) === null || h === void 0 ? void 0 : h.getData("text/html");
          return s = f, i = !!(p != null && p.includes("data-pm-slice")), !1;
        }
      }
    },
    appendTransaction: (d, f, h) => {
      const p = d[0], g = p.getMeta("uiEvent") === "paste" && !i, y = p.getMeta("uiEvent") === "drop" && !o, b = p.getMeta("applyPasteRules"), x = !!b;
      if (!g && !y && !x)
        return;
      if (x) {
        const { from: w, text: v } = b, E = w + v.length, L = ag(v);
        return a({
          rule: u,
          state: h,
          from: w,
          to: { b: E },
          pasteEvt: L
        });
      }
      const T = f.doc.content.findDiffStart(h.doc.content), m = f.doc.content.findDiffEnd(h.doc.content);
      if (!(!og(T) || !m || T === m.b))
        return a({
          rule: u,
          state: h,
          from: T,
          to: m,
          pasteEvt: s
        });
    }
  }));
}
function ug(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return [...new Set(e)];
}
class Fn {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = Fn.resolve(e), this.schema = tg(this.extensions, t), this.setupExtensions();
  }
  /**
   * Returns a flattened and sorted extension list while
   * also checking for duplicated extensions and warns the user.
   * @param extensions An array of Tiptap extensions
   * @returns An flattened and sorted array of Tiptap extensions
   */
  static resolve(e) {
    const t = Fn.sort(Fn.flatten(e)), r = ug(t.map((i) => i.name));
    return r.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${r.map((i) => `'${i}'`).join(", ")}]. This can lead to issues.`), t;
  }
  /**
   * Create a flattened array of extensions by traversing the `addExtensions` field.
   * @param extensions An array of Tiptap extensions
   * @returns A flattened array of Tiptap extensions
   */
  static flatten(e) {
    return e.map((t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage
      }, i = N(t, "addExtensions", r);
      return i ? [t, ...this.flatten(i())] : t;
    }).flat(10);
  }
  /**
   * Sort extensions by priority.
   * @param extensions An array of Tiptap extensions
   * @returns A sorted array of Tiptap extensions by priority
   */
  static sort(e) {
    return e.sort((r, i) => {
      const o = N(r, "priority") || 100, s = N(i, "priority") || 100;
      return o > s ? -1 : o < s ? 1 : 0;
    });
  }
  /**
   * Get all commands from the extensions.
   * @returns An object with all commands where the key is the command name and the value is the command function
   */
  get commands() {
    return this.extensions.reduce((e, t) => {
      const r = {
        name: t.name,
        options: t.options,
        storage: t.storage,
        editor: this.editor,
        type: Qo(t.name, this.schema)
      }, i = N(t, "addCommands", r);
      return i ? {
        ...e,
        ...i()
      } : e;
    }, {});
  }
  /**
   * Get all registered Prosemirror plugins from the extensions.
   * @returns An array of Prosemirror plugins
   */
  get plugins() {
    const { editor: e } = this, t = Fn.sort([...this.extensions].reverse()), r = [], i = [], o = t.map((s) => {
      const l = {
        name: s.name,
        options: s.options,
        storage: s.storage,
        editor: e,
        type: Qo(s.name, this.schema)
      }, a = [], c = N(s, "addKeyboardShortcuts", l);
      let u = {};
      if (s.type === "mark" && s.config.exitable && (u.ArrowRight = () => Re.handleExit({ editor: e, mark: s })), c) {
        const g = Object.fromEntries(Object.entries(c()).map(([y, b]) => [y, () => b({ editor: e })]));
        u = { ...u, ...g };
      }
      const d = Mm(u);
      a.push(d);
      const f = N(s, "addInputRules", l);
      Fa(s, e.options.enableInputRules) && f && r.push(...f());
      const h = N(s, "addPasteRules", l);
      Fa(s, e.options.enablePasteRules) && h && i.push(...h());
      const p = N(s, "addProseMirrorPlugins", l);
      if (p) {
        const g = p();
        a.push(...g);
      }
      return a;
    }).flat();
    return [
      ig({
        editor: e,
        rules: r
      }),
      ...cg({
        editor: e,
        rules: i
      }),
      ...o
    ];
  }
  /**
   * Get all attributes from the extensions.
   * @returns An array of attributes
   */
  get attributes() {
    return Qu(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = Mo(this.extensions);
    return Object.fromEntries(t.filter((r) => !!N(r, "addNodeView")).map((r) => {
      const i = this.attributes.filter((a) => a.type === r.name), o = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: de(r.name, this.schema)
      }, s = N(r, "addNodeView", o);
      if (!s)
        return [];
      const l = (a, c, u, d) => {
        const f = Bs(a, i);
        return s()({
          editor: e,
          node: a,
          getPos: u,
          decorations: d,
          HTMLAttributes: f,
          extension: r
        });
      };
      return [r.name, l];
    }));
  }
  /**
   * Go through all extensions, create extension storages & setup marks
   * & bind editor event listener.
   */
  setupExtensions() {
    this.extensions.forEach((e) => {
      var t;
      this.editor.extensionStorage[e.name] = e.storage;
      const r = {
        name: e.name,
        options: e.options,
        storage: e.storage,
        editor: this.editor,
        type: Qo(e.name, this.schema)
      };
      e.type === "mark" && (!((t = z(N(e, "keepOnSplit", r))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
      const i = N(e, "onBeforeCreate", r), o = N(e, "onCreate", r), s = N(e, "onUpdate", r), l = N(e, "onSelectionUpdate", r), a = N(e, "onTransaction", r), c = N(e, "onFocus", r), u = N(e, "onBlur", r), d = N(e, "onDestroy", r);
      i && this.editor.on("beforeCreate", i), o && this.editor.on("create", o), s && this.editor.on("update", s), l && this.editor.on("selectionUpdate", l), a && this.editor.on("transaction", a), c && this.editor.on("focus", c), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
}
function dg(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Xo(n) {
  return dg(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Eo(n, e) {
  const t = { ...n };
  return Xo(n) && Xo(e) && Object.keys(e).forEach((r) => {
    Xo(e[r]) ? r in n ? t[r] = Eo(n[r], e[r]) : Object.assign(t, { [r]: e[r] }) : Object.assign(t, { [r]: e[r] });
  }), t;
}
class ee {
  constructor(e = {}) {
    this.type = "extension", this.name = "extension", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = z(N(this, "addOptions", {
      name: this.name
    }))), this.storage = z(N(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ee(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.parent = this.parent, t.options = Eo(this.options, e), t.storage = z(N(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new ee({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = z(N(t, "addOptions", {
      name: t.name
    })), t.storage = z(N(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function ed(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, u, d) => {
    var f;
    a.isBlock && c > r && (l += o);
    const h = s == null ? void 0 : s[a.type.name];
    if (h)
      return u && (l += h({
        node: a,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    a.isText && (l += (f = a == null ? void 0 : a.text) === null || f === void 0 ? void 0 : f.slice(Math.max(r, c) - c, i - c));
  }), l;
}
function td(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const fg = ee.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new le({
        key: new we("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, { ranges: o } = i, s = Math.min(...o.map((u) => u.$from.pos)), l = Math.max(...o.map((u) => u.$to.pos)), a = td(t);
            return ed(r, { from: s, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), hg = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), pg = (n = !1) => ({ commands: e }) => e.setContent("", n), mg = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = er(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, g);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, gg = (n) => (e) => n(e), yg = () => ({ state: n, dispatch: e }) => zm(n, e), bg = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new H(r.doc.resolve(s - 1))), !0;
}, vg = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = n.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1)
    if (i.node(o).type === r.type) {
      if (e) {
        const l = i.before(o), a = i.after(o);
        n.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, kg = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = de(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1)
    if (o.node(s).type === i) {
      if (r) {
        const a = o.before(s), c = o.after(s);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, wg = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, xg = () => ({ state: n, dispatch: e }) => Em(n, e), Cg = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Tg = () => ({ state: n, dispatch: e }) => Hm(n, e);
function Li(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : pl(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Ls(n, e, t = {}) {
  return n.find((r) => r.type === e && Li(r.attrs, t));
}
function Sg(n, e, t = {}) {
  return !!Ls(n, e, t);
}
function ml(n, e, t = {}) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if (n.parentOffset === r.offset && r.offset !== 0 && (r = n.parent.childBefore(n.parentOffset)), !r.node)
    return;
  const i = Ls([...r.node.marks], e, t);
  if (!i)
    return;
  let o = r.index, s = n.start() + r.offset, l = o + 1, a = s + r.node.nodeSize;
  for (Ls([...r.node.marks], e, t); o > 0 && i.isInSet(n.parent.child(o - 1).marks); )
    o -= 1, s -= n.parent.child(o).nodeSize;
  for (; l < n.parent.childCount && Sg([...n.parent.child(l).marks], e, t); )
    a += n.parent.child(l).nodeSize, l += 1;
  return {
    from: s,
    to: a
  };
}
function Qt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Mg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const o = Qt(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = ml(a, o, e);
    if (d && d.from <= c && d.to >= u) {
      const f = H.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Eg = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function gl(n) {
  return n instanceof H;
}
function Mt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function nd(n, e = null) {
  if (!e)
    return null;
  const t = V.atStart(n), r = V.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, o = r.to;
  return e === "all" ? H.create(n, Mt(0, i, o), Mt(n.content.size, i, o)) : H.create(n, Mt(e, i, o), Mt(e, i, o));
}
function yl() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const Ag = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    yl() && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (o && n === null && !gl(t.state.selection))
    return s(), !0;
  const l = nd(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Og = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), Ng = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), rd = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && rd(r);
  }
  return n;
};
function Ha(n) {
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return rd(t);
}
function Ii(n, e, t) {
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const r = typeof n == "object" && n !== null, i = typeof n == "string";
  if (r)
    try {
      return Array.isArray(n) && n.length > 0 ? C.fromArray(n.map((s) => e.nodeFromJSON(s))) : e.nodeFromJSON(n);
    } catch (o) {
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Ii("", e, t);
    }
  if (i) {
    const o = Wn.fromSchema(e);
    return t.slice ? o.parseSlice(Ha(n), t.parseOptions).content : o.parse(Ha(n), t.parseOptions);
  }
  return Ii("", e, t);
}
function Dg(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof ae || i instanceof ce))
    return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), n.setSelection(V.near(n.doc.resolve(s), t));
}
const Bg = (n) => n.toString().startsWith("<"), Lg = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    t = {
      parseOptions: {},
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    const s = Ii(e, o.schema, {
      parseOptions: {
        preserveWhitespace: "full",
        ...t.parseOptions
      }
    });
    if (s.toString() === "<>")
      return !0;
    let { from: l, to: a } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, c = !0, u = !0;
    if ((Bg(s) ? s : [s]).forEach((h) => {
      h.check(), c = c ? h.isText && h.marks.length === 0 : !1, u = u ? h.isBlock : !1;
    }), l === a && u) {
      const { parent: h } = r.doc.resolve(l);
      h.isTextblock && !h.type.spec.code && !h.childCount && (l -= 1, a += 1);
    }
    let f;
    c ? (Array.isArray(e) ? f = e.map((h) => h.text || "").join("") : typeof e == "object" && e && e.text ? f = e.text : f = e, r.insertText(f, l, a)) : (f = s, r.replaceWith(l, a, f)), t.updateSelection && Dg(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: l, text: f }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: l, text: f });
  }
  return !0;
}, Ig = () => ({ state: n, dispatch: e }) => Im(n, e), Rg = () => ({ state: n, dispatch: e }) => Rm(n, e), Pg = () => ({ state: n, dispatch: e }) => Am(n, e), Fg = () => ({ state: n, dispatch: e }) => Bm(n, e), Hg = () => ({ tr: n, state: e, dispatch: t }) => {
  try {
    const r = bo(e.doc, e.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
  } catch {
    return !1;
  }
}, zg = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = bo(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Vg = () => ({ state: n, dispatch: e }) => Om(n, e), _g = () => ({ state: n, dispatch: e }) => Nm(n, e);
function id() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function jg(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      s = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      yl() || id() ? s = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const $g = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = jg(n).split(/-(?!$)/), s = o.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
    key: s === "Space" ? " " : s,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function Er(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? de(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (d, f) => {
    if (d.isText)
      return;
    const h = Math.max(r, f), p = Math.min(i, f + d.nodeSize);
    l.push({
      node: d,
      from: h,
      to: p
    });
  });
  const a = i - r, c = l.filter((d) => s ? s.name === d.node.type.name : !0).filter((d) => Li(d.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= a;
}
const Wg = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = de(n, t.schema);
  return Er(t, i, e) ? Pm(t, r) : !1;
}, qg = () => ({ state: n, dispatch: e }) => Vm(n, e), Kg = (n) => ({ state: e, dispatch: t }) => {
  const r = de(n, e.schema);
  return Jm(r)(e, t);
}, Ug = () => ({ state: n, dispatch: e }) => Fm(n, e);
function Ao(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function za(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Jg = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Ao(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (o = de(n, r.schema)), l === "mark" && (s = Qt(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, u) => {
      o && o === c.type && t.setNodeMarkup(u, void 0, za(c.attrs, e)), s && c.marks.length && c.marks.forEach((d) => {
        s === d.type && t.addMark(u, u + c.nodeSize, s.create(za(d.attrs, e)));
      });
    });
  }), !0) : !1;
}, Gg = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Yg = () => ({ tr: n, commands: e }) => e.setTextSelection({
  from: 0,
  to: n.doc.content.size
}), Qg = () => ({ state: n, dispatch: e }) => Dm(n, e), Xg = () => ({ state: n, dispatch: e }) => Lm(n, e), Zg = () => ({ state: n, dispatch: e }) => _m(n, e), e0 = () => ({ state: n, dispatch: e }) => Wm(n, e), t0 = () => ({ state: n, dispatch: e }) => $m(n, e);
function od(n, e, t = {}) {
  return Ii(n, e, { slice: !1, parseOptions: t });
}
const n0 = (n, e = !1, t = {}) => ({ tr: r, editor: i, dispatch: o }) => {
  const { doc: s } = r, l = od(n, i.schema, t);
  return o && r.replaceWith(0, s.content.size, l).setMeta("preventUpdate", !e), !0;
};
function Oo(n, e) {
  const t = Qt(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function r0(n, e) {
  const t = new lu(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function i0(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function o0(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (i, o) => {
    t(i) && r.push({
      node: i,
      pos: o
    });
  }), r;
}
function s0(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function bl(n) {
  return (e) => s0(e.$from, n);
}
function l0(n, e) {
  const t = ut.fromSchema(e).serializeFragment(n), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(t), i.innerHTML;
}
function a0(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return ed(n, t, e);
}
function c0(n, e) {
  const t = de(e, n.schema), { from: r, to: i } = n.selection, o = [];
  n.doc.nodesBetween(r, i, (l) => {
    o.push(l);
  });
  const s = o.reverse().find((l) => l.type.name === t.name);
  return s ? { ...s.attrs } : {};
}
function sd(n, e) {
  const t = Ao(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? c0(n, e) : t === "mark" ? Oo(n, e) : {};
}
function u0(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function d0(n) {
  const e = u0(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((o, s) => s !== r).some((o) => t.oldRange.from >= o.oldRange.from && t.oldRange.to <= o.oldRange.to && t.newRange.from >= o.newRange.from && t.newRange.to <= o.newRange.to));
}
function f0(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, o) => {
    const s = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        s.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = t[o];
      if (l === void 0 || a === void 0)
        return;
      s.push({ from: l, to: a });
    }
    s.forEach(({ from: l, to: a }) => {
      const c = e.slice(o).map(l, -1), u = e.slice(o).map(a), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), d0(r);
}
function vl(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((i) => {
    const o = t.resolve(n - 1), s = ml(o, i.type);
    s && r.push({
      mark: i,
      ...s
    });
  }) : t.nodesBetween(n, e, (i, o) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(...i.marks.map((s) => ({
      from: o,
      to: o + i.nodeSize,
      mark: s
    })));
  }), r;
}
function mi(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Is(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? Qt(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => o ? o.name === d.type.name : !0).find((d) => Li(d.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    n.doc.nodesBetween(h, p, (g, y) => {
      if (!g.isText && !g.marks.length)
        return;
      const b = Math.max(h, y), x = Math.min(p, y + g.nodeSize), T = x - b;
      s += T, l.push(...g.marks.map((m) => ({
        mark: m,
        from: b,
        to: x
      })));
    });
  }), s === 0)
    return !1;
  const a = l.filter((d) => o ? o.name === d.mark.type.name : !0).filter((d) => Li(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = l.filter((d) => o ? d.mark.type !== o && d.mark.type.excludes(o) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function h0(n, e, t = {}) {
  if (!e)
    return Er(n, null, t) || Is(n, null, t);
  const r = Ao(e, n.schema);
  return r === "node" ? Er(n, e, t) : r === "mark" ? Is(n, e, t) : !1;
}
function Va(n, e) {
  const { nodeExtensions: t } = Mo(e), r = t.find((s) => s.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = z(N(r, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function p0(n) {
  var e;
  const t = (e = n.type.createAndFill()) === null || e === void 0 ? void 0 : e.toJSON(), r = n.toJSON();
  return JSON.stringify(t) === JSON.stringify(r);
}
function m0(n) {
  return n instanceof B;
}
function ld(n, e, t) {
  const i = n.state.doc.content.size, o = Mt(e, 0, i), s = Mt(t, 0, i), l = n.coordsAtPos(o), a = n.coordsAtPos(s, -1), c = Math.min(l.top, a.top), u = Math.max(l.bottom, a.bottom), d = Math.min(l.left, a.left), f = Math.max(l.right, a.right), h = f - d, p = u - c, b = {
    top: c,
    bottom: u,
    left: d,
    right: f,
    width: h,
    height: p,
    x: d,
    y: c
  };
  return {
    ...b,
    toJSON: () => b
  };
}
function g0(n, e, t) {
  var r;
  const { selection: i } = e;
  let o = null;
  if (gl(i) && (o = i.$cursor), o) {
    const l = (r = n.storedMarks) !== null && r !== void 0 ? r : o.marks();
    return !!t.isInSet(l) || !l.some((a) => a.type.excludes(t));
  }
  const { ranges: s } = i;
  return s.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
const y0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = Qt(n, r.schema);
  if (i)
    if (s) {
      const c = Oo(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else
      l.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), g = Math.min(h + f.nodeSize, d);
          f.marks.find((b) => b.type === a) ? f.marks.forEach((b) => {
            a === b.type && t.addMark(p, g, a.create({
              ...b.attrs,
              ...e
            }));
          }) : t.addMark(p, g, a.create(e));
        });
      });
  return g0(r, t, a);
}, b0 = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), v0 = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = de(n, t.schema);
  return o.isTextblock ? i().command(({ commands: s }) => Ia(o, e)(t) ? !0 : s.clearNodes()).command(({ state: s }) => Ia(o, e)(s, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, k0 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Mt(n, 0, r.content.size), o = B.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, w0 = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? { from: n, to: n } : n, s = H.atStart(r).from, l = H.atEnd(r).to, a = Mt(i, s, l), c = Mt(o, s, l), u = H.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, x0 = (n) => ({ state: e, dispatch: t }) => {
  const r = de(n, e.schema);
  return Qm(r)(e, t);
};
function _a(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const C0 = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = mi(c, l.node().type.name, l.node().attrs);
  if (o instanceof B && o.node.isBlock)
    return !l.parentOffset || !zn(s, l.pos) ? !1 : (r && (n && _a(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  if (r) {
    const d = a.parentOffset === a.parent.content.size;
    o instanceof H && e.deleteSelection();
    const f = l.depth === 0 ? void 0 : i0(l.node(-1).contentMatchAt(l.indexAfter(-1)));
    let h = d && f ? [
      {
        type: f,
        attrs: u
      }
    ] : void 0, p = zn(e.doc, e.mapping.map(l.pos), 1, h);
    if (!h && !p && zn(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [
      {
        type: f,
        attrs: u
      }
    ] : void 0), p && (e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), y = e.doc.resolve(g);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && _a(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return !0;
}, T0 = (n) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  var o;
  const s = de(n, t.schema), { $from: l, $to: a } = t.selection, c = t.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a))
    return !1;
  const u = l.node(-1);
  if (u.type !== s)
    return !1;
  const d = i.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1)
      return !1;
    if (r) {
      let y = C.empty;
      const b = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let E = l.depth - b; E >= l.depth - 3; E -= 1)
        y = C.from(l.node(E).copy(y));
      const x = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, T = mi(d, l.node().type.name, l.node().attrs), m = ((o = s.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(T)) || void 0;
      y = y.append(C.from(s.createAndFill(null, m) || void 0));
      const w = l.before(l.depth - (b - 1));
      e.replace(w, l.after(-x), new A(y, 4 - b, 0));
      let v = -1;
      e.doc.nodesBetween(w, e.doc.content.size, (E, L) => {
        if (v > -1)
          return !1;
        E.isTextblock && E.content.size === 0 && (v = L + 1);
      }), v > -1 && e.setSelection(H.near(e.doc.resolve(v))), e.scrollIntoView();
    }
    return !0;
  }
  const f = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, h = mi(d, u.type.name, u.attrs), p = mi(d, l.node().type.name, l.node().attrs);
  e.delete(l.pos, a.pos);
  const g = f ? [
    { type: s, attrs: h },
    { type: f, attrs: p }
  ] : [{ type: s, attrs: h }];
  if (!zn(e.doc, l.pos, 2))
    return !1;
  if (r) {
    const { selection: y, storedMarks: b } = t, { splittableMarks: x } = i.extensionManager, T = b || y.$to.parentOffset && y.$from.marks();
    if (e.split(l.pos, 2, g).scrollIntoView(), !T || !r)
      return !0;
    const m = T.filter((w) => x.includes(w.type.name));
    e.ensureMarks(m);
  }
  return !0;
}, Zo = (n, e) => {
  const t = bl((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Gt(n.doc, t.pos) && n.join(t.pos), !0;
}, es = (n, e) => {
  const t = bl((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Gt(n.doc, r) && n.join(r), !0;
}, S0 = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = de(n, s.schema), p = de(e, s.schema), { selection: g, storedMarks: y } = s, { $from: b, $to: x } = g, T = b.blockRange(x), m = y || g.$to.parentOffset && g.$from.marks();
  if (!T)
    return !1;
  const w = bl((v) => Va(v.type.name, d))(g);
  if (T.depth >= 1 && w && T.depth - w.depth <= 1) {
    if (w.node.type === h)
      return c.liftListItem(p);
    if (Va(w.node.type.name, d) && h.validContent(w.node.content) && l)
      return a().command(() => (o.setNodeMarkup(w.pos, h), !0)).command(() => Zo(o, h)).command(() => es(o, h)).run();
  }
  return !t || !m || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => Zo(o, h)).command(() => es(o, h)).run() : a().command(() => {
    const v = u().wrapInList(h, r), E = m.filter((L) => f.includes(L.type.name));
    return o.ensureMarks(E), v ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => Zo(o, h)).command(() => es(o, h)).run();
}, M0 = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = Qt(n, r.schema);
  return Is(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, E0 = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = de(n, r.schema), s = de(e, r.schema);
  return Er(r, o, t) ? i.setNode(s) : i.setNode(o, t);
}, A0 = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = de(n, t.schema);
  return Er(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, O0 = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(n))) {
      if (e) {
        const s = n.tr, l = o.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          s.step(l.steps[a].invert(l.docs[a]));
        if (o.text) {
          const a = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, n.schema.text(o.text, a));
        } else
          s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, N0 = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: i } = t;
  return r || e && i.forEach((o) => {
    n.removeMark(o.$from.pos, o.$to.pos);
  }), !0;
}, D0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: s = !1 } = e, { selection: l } = t, a = Qt(n, r.schema), { $from: c, empty: u, ranges: d } = l;
  if (!i)
    return !0;
  if (u && s) {
    let { from: f, to: h } = l;
    const p = (o = c.marks().find((y) => y.type === a)) === null || o === void 0 ? void 0 : o.attrs, g = ml(c, a, p);
    g && (f = g.from, h = g.to), t.removeMark(f, h, a);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, B0 = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Ao(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (o = de(n, r.schema)), l === "mark" && (s = Qt(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    const c = a.$from.pos, u = a.$to.pos;
    r.doc.nodesBetween(c, u, (d, f) => {
      o && o === d.type && t.setNodeMarkup(f, void 0, {
        ...d.attrs,
        ...e
      }), s && d.marks.length && d.marks.forEach((h) => {
        if (s === h.type) {
          const p = Math.max(f, c), g = Math.min(f + d.nodeSize, u);
          t.addMark(p, g, s.create({
            ...h.attrs,
            ...e
          }));
        }
      });
    });
  }), !0) : !1;
}, L0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = de(n, t.schema);
  return qm(i, e)(t, r);
}, I0 = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = de(n, t.schema);
  return Km(i, e)(t, r);
};
var R0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: hg,
  clearContent: pg,
  clearNodes: mg,
  command: gg,
  createParagraphNear: yg,
  cut: bg,
  deleteCurrentNode: vg,
  deleteNode: kg,
  deleteRange: wg,
  deleteSelection: xg,
  enter: Cg,
  exitCode: Tg,
  extendMarkRange: Mg,
  first: Eg,
  focus: Ag,
  forEach: Og,
  insertContent: Ng,
  insertContentAt: Lg,
  joinUp: Ig,
  joinDown: Rg,
  joinBackward: Pg,
  joinForward: Fg,
  joinItemBackward: Hg,
  joinItemForward: zg,
  joinTextblockBackward: Vg,
  joinTextblockForward: _g,
  keyboardShortcut: $g,
  lift: Wg,
  liftEmptyBlock: qg,
  liftListItem: Kg,
  newlineInCode: Ug,
  resetAttributes: Jg,
  scrollIntoView: Gg,
  selectAll: Yg,
  selectNodeBackward: Qg,
  selectNodeForward: Xg,
  selectParentNode: Zg,
  selectTextblockEnd: e0,
  selectTextblockStart: t0,
  setContent: n0,
  setMark: y0,
  setMeta: b0,
  setNode: v0,
  setNodeSelection: k0,
  setTextSelection: w0,
  sinkListItem: x0,
  splitBlock: C0,
  splitListItem: T0,
  toggleList: S0,
  toggleMark: M0,
  toggleNode: E0,
  toggleWrap: A0,
  undoInputRule: O0,
  unsetAllMarks: N0,
  unsetMark: D0,
  updateAttributes: B0,
  wrapIn: L0,
  wrapInList: I0
});
const P0 = ee.create({
  name: "commands",
  addCommands() {
    return {
      ...R0
    };
  }
}), F0 = ee.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new le({
        key: new we("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), H0 = ee.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new le({
        key: new we("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (e, t) => {
              n.isFocused = !0;
              const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            },
            blur: (e, t) => {
              n.isFocused = !1;
              const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
              return e.dispatch(r), !1;
            }
          }
        }
      })
    ];
  }
}), z0 = ee.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      // maybe convert first text block node to default node
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = p.parent.type.spec.isolating, y = d.pos - d.parentOffset, b = g && p.parent.childCount === 1 ? y === d.pos : V.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !b || b && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
      }),
      () => s.deleteSelection(),
      () => s.joinBackward(),
      () => s.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: s }) => [
      () => s.deleteSelection(),
      () => s.deleteCurrentNode(),
      () => s.joinForward(),
      () => s.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: s }) => [
        () => s.newlineInCode(),
        () => s.createParagraphNear(),
        () => s.liftEmptyBlock(),
        () => s.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = {
      ...r
    }, o = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return yl() || id() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new le({
        key: new we("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (!(n.some((p) => p.docChanged) && !e.doc.eq(t.doc)))
            return;
          const { empty: i, from: o, to: s } = e.selection, l = V.atStart(e.doc).from, a = V.atEnd(e.doc).to;
          if (i || !(o === l && s === a) || !(t.doc.textBetween(0, t.doc.content.size, " ", " ").length === 0))
            return;
          const d = t.tr, f = To({
            state: t,
            transaction: d
          }), { commands: h } = new So({
            editor: this.editor,
            state: f
          });
          if (h.clearNodes(), !!d.steps.length)
            return d;
        }
      })
    ];
  }
}), V0 = ee.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new le({
        key: new we("tabindex"),
        props: {
          attributes: this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class sn {
  constructor(e, t, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = t, this.currentNode = i;
  }
  get name() {
    return this.node.type.name;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({ from: t, to: r }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0)
      return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new sn(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new sn(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new sn(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const i = t.isBlock && !t.isTextblock, o = this.pos + r + 1, s = this.resolvedPos.doc.resolve(o);
      if (!i && s.depth <= this.depth)
        return;
      const l = new sn(s, this.editor, i, i ? t : null);
      i && (l.actualDepth = this.depth + 1), e.push(new sn(s, this.editor, i, i ? t : null));
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e)
        if (Object.keys(t).length > 0) {
          const o = i.node.attrs, s = Object.keys(t);
          for (let l = 0; l < s.length; l += 1) {
            const a = s[l];
            if (o[a] !== t[a])
              break;
          }
        } else
          r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, r = !1) {
    let i = [];
    if (!this.children || this.children.length === 0)
      return i;
    const o = Object.keys(t);
    return this.children.forEach((s) => {
      r && i.length > 0 || (s.node.type.name === e && o.every((a) => t[a] === s.node.attrs[a]) && i.push(s), !(r && i.length > 0) && (i = i.concat(s.querySelectorAll(e, t, r))));
    }), i;
  }
  setAttribute(e) {
    const t = this.editor.state.selection;
    this.editor.chain().setTextSelection(this.from).updateAttributes(this.node.type.name, e).setTextSelection(t.from).run();
  }
}
const _0 = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 1px !important;
  height: 1px !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
function j0(n, e, t) {
  const r = document.querySelector(`style[data-tiptap-style${t ? `-${t}` : ""}]`);
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute(`data-tiptap-style${t ? `-${t}` : ""}`, ""), i.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(i), i;
}
let $0 = class extends Xm {
  constructor(e = {}) {
    super(), this.isFocused = !1, this.extensionStorage = {}, this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.setOptions(e), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.createView(), this.injectCSS(), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), window.setTimeout(() => {
      this.isDestroyed || (this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }));
    }, 0);
  }
  /**
   * Returns the editor storage.
   */
  get storage() {
    return this.extensionStorage;
  }
  /**
   * An object of all registered commands.
   */
  get commands() {
    return this.commandManager.commands;
  }
  /**
   * Create a command chain to call multiple commands at once.
   */
  chain() {
    return this.commandManager.chain();
  }
  /**
   * Check if a command or a command chain can be executed. Without executing it.
   */
  can() {
    return this.commandManager.can();
  }
  /**
   * Inject CSS styles.
   */
  injectCSS() {
    this.options.injectCSS && document && (this.css = j0(_0, this.options.injectNonce));
  }
  /**
   * Update editor options.
   *
   * @param options A list of options
   */
  setOptions(e = {}) {
    this.options = {
      ...this.options,
      ...e
    }, !(!this.view || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
   * Update editable state of the editor.
   */
  setEditable(e, t = !0) {
    this.setOptions({ editable: e }), t && this.emit("update", { editor: this, transaction: this.state.tr });
  }
  /**
   * Returns whether the editor is editable.
   */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
   * Returns the editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * Register a ProseMirror plugin.
   *
   * @param plugin A ProseMirror plugin
   * @param handlePlugins Control how to merge the plugin into the existing plugins.
   */
  registerPlugin(e, t) {
    const r = Xu(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: r });
    this.view.updateState(i);
  }
  /**
   * Unregister a ProseMirror plugin.
   *
   * @param nameOrPluginKey The plugins name
   */
  unregisterPlugin(e) {
    if (this.isDestroyed)
      return;
    const t = typeof e == "string" ? `${e}$` : e.key, r = this.state.reconfigure({
      // @ts-ignore
      plugins: this.state.plugins.filter((i) => !i.key.startsWith(t))
    });
    this.view.updateState(r);
  }
  /**
   * Creates an extension manager.
   */
  createExtensionManager() {
    var e, t;
    const i = [...this.options.enableCoreExtensions ? [
      F0,
      fg.configure({
        blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
      }),
      P0,
      H0,
      z0,
      V0
    ] : [], ...this.options.extensions].filter((o) => ["extension", "node", "mark"].includes(o == null ? void 0 : o.type));
    this.extensionManager = new Fn(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new So({
      editor: this
    });
  }
  /**
   * Creates a ProseMirror schema.
   */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
   * Creates a ProseMirror view.
   */
  createView() {
    const e = od(this.options.content, this.schema, this.options.parseOptions), t = nd(e, this.options.autofocus);
    this.view = new ym(this.options.element, {
      ...this.options.editorProps,
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: Pn.create({
        doc: e,
        selection: t || void 0
      })
    });
    const r = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(r), this.createNodeViews(), this.prependClass();
    const i = this.view.dom;
    i.editor = this;
  }
  /**
   * Creates all node views.
   */
  createNodeViews() {
    this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
   * Prepend class name to element.
   */
  prependClass() {
    this.view.dom.className = `tiptap ${this.view.dom.className}`;
  }
  captureTransaction(e) {
    this.isCapturingTransaction = !0, e(), this.isCapturingTransaction = !1;
    const t = this.capturedTransaction;
    return this.capturedTransaction = null, t;
  }
  /**
   * The callback over which to send transactions (state updates) produced by the view.
   *
   * @param transaction An editor state transaction
   */
  dispatchTransaction(e) {
    if (this.view.isDestroyed)
      return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = e;
        return;
      }
      e.steps.forEach((s) => {
        var l;
        return (l = this.capturedTransaction) === null || l === void 0 ? void 0 : l.step(s);
      });
      return;
    }
    const t = this.state.apply(e), r = !this.state.selection.eq(t.selection);
    this.view.updateState(t), this.emit("transaction", {
      editor: this,
      transaction: e
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: e
    });
    const i = e.getMeta("focus"), o = e.getMeta("blur");
    i && this.emit("focus", {
      editor: this,
      event: i.event,
      transaction: e
    }), o && this.emit("blur", {
      editor: this,
      event: o.event,
      transaction: e
    }), !(!e.docChanged || e.getMeta("preventUpdate")) && this.emit("update", {
      editor: this,
      transaction: e
    });
  }
  /**
   * Get attributes of the currently selected node or mark.
   */
  getAttributes(e) {
    return sd(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, i = typeof e == "string" ? t : e;
    return h0(this.state, r, i);
  }
  /**
   * Get the document as JSON.
   */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
   * Get the document as HTML.
   */
  getHTML() {
    return l0(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return a0(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...td(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return p0(this.state.doc);
  }
  /**
   * Get the number of characters for the current document.
   *
   * @deprecated
   */
  getCharacterCount() {
    return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'), this.state.doc.content.size - 2;
  }
  /**
   * Destroy the editor.
   */
  destroy() {
    this.emit("destroy"), this.view && this.view.destroy(), this.removeAllListeners();
  }
  /**
   * Check if the editor is already destroyed.
   */
  get isDestroyed() {
    var e;
    return !(!((e = this.view) === null || e === void 0) && e.docView);
  }
  $node(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelector(e, t)) || null;
  }
  $nodes(e, t) {
    var r;
    return ((r = this.$doc) === null || r === void 0 ? void 0 : r.querySelectorAll(e, t)) || null;
  }
  $pos(e) {
    const t = this.state.doc.resolve(e);
    return new sn(t, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function kn(n) {
  return new Vr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = z(n.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: o } = e, s = r[r.length - 1], l = r[0];
      if (s) {
        const a = l.search(/\S/), c = t.from + l.indexOf(s), u = c + s.length;
        if (vl(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((g) => g === n.type && g !== h.mark.type)).filter((h) => h.to > c).length)
          return null;
        u < t.to && o.delete(u, t.to), c > t.from && o.delete(t.from + a, c);
        const f = t.from + a + s.length;
        o.addMark(t.from + a, f, n.type.create(i || {})), o.removeStoredMark(n.type);
      }
    }
  });
}
function W0(n) {
  return new Vr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = z(n.getAttributes, void 0, r) || {}, { tr: o } = e, s = t.from;
      let l = t.to;
      const a = n.type.create(i);
      if (r[1]) {
        const c = r[0].lastIndexOf(r[1]);
        let u = s + c;
        u > l ? u = l : l = u + r[1].length;
        const d = r[0][r[0].length - 1];
        o.insertText(d, s + r[0].length - 1), o.replaceWith(u, l, a);
      } else
        r[0] && o.insert(s - 1, n.type.create(i)).delete(o.mapping.map(s), o.mapping.map(l));
      o.scrollIntoView();
    }
  });
}
function Rs(n) {
  return new Vr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = e.doc.resolve(t.from), o = z(n.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, o);
    }
  });
}
function re(n) {
  return new Vr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      let i = n.replace, o = t.from;
      const s = t.to;
      if (r[1]) {
        const l = r[0].lastIndexOf(r[1]);
        i += r[0].slice(l + r[1].length), o += l;
        const a = o - s;
        a > 0 && (i = r[0].slice(l - a, l) + i, o = s);
      }
      e.tr.insertText(i, o, s);
    }
  });
}
function Ri(n) {
  return new Vr({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: i }) => {
      const o = z(n.getAttributes, void 0, r) || {}, s = e.tr.delete(t.from, t.to), a = s.doc.resolve(t.from).blockRange(), c = a && nl(a, n.type, o);
      if (!c)
        return null;
      if (s.wrap(a, c), n.keepMarks && n.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: h } = n.editor.extensionManager, p = f || d.$to.parentOffset && d.$from.marks();
        if (p) {
          const g = p.filter((y) => h.includes(y.type.name));
          s.ensureMarks(g);
        }
      }
      if (n.keepAttributes) {
        const d = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(d, o).run();
      }
      const u = s.doc.resolve(t.from - 1).nodeBefore;
      u && u.type === n.type && Gt(s.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, u)) && s.join(t.from - 1);
    }
  });
}
class Re {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = z(N(this, "addOptions", {
      name: this.name
    }))), this.storage = z(N(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new Re(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = Eo(this.options, e), t.storage = z(N(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new Re({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = z(N(t, "addOptions", {
      name: t.name
    })), t.storage = z(N(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const s = i.marks();
      if (!!!s.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const a = s.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return a && r.removeStoredMark(a), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
}
class ve {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = z(N(this, "addOptions", {
      name: this.name
    }))), this.storage = z(N(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ve(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = Eo(this.options, e), t.storage = z(N(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new ve({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = z(N(t, "addOptions", {
      name: t.name
    })), t.storage = z(N(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Jt(n) {
  return new Zu({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: i }) => {
      const o = z(n.getAttributes, void 0, r, i);
      if (o === !1 || o === null)
        return null;
      const { tr: s } = e, l = r[r.length - 1], a = r[0];
      let c = t.to;
      if (l) {
        const u = a.search(/\S/), d = t.from + a.indexOf(l), f = d + l.length;
        if (vl(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((y) => y === n.type && y !== p.mark.type)).filter((p) => p.to > d).length)
          return null;
        f < t.to && s.delete(f, t.to), d > t.from && s.delete(t.from + u, d), c = t.from + u + l.length, s.addMark(t.from + u, c, n.type.create(o || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function q0(n) {
  return n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function K0(n) {
  return new Zu({
    find: n.find,
    handler({ match: e, chain: t, range: r, pasteEvent: i }) {
      const o = z(n.getAttributes, void 0, e, i);
      if (o === !1 || o === null)
        return null;
      e.input && t().deleteRange(r).insertContentAt(r.from, {
        type: n.type.name,
        attrs: o
      });
    }
  });
}
var Le = "top", Ge = "bottom", Ye = "right", Ie = "left", kl = "auto", _r = [Le, Ge, Ye, Ie], Gn = "start", Ar = "end", U0 = "clippingParents", ad = "viewport", lr = "popper", J0 = "reference", ja = /* @__PURE__ */ _r.reduce(function(n, e) {
  return n.concat([e + "-" + Gn, e + "-" + Ar]);
}, []), cd = /* @__PURE__ */ [].concat(_r, [kl]).reduce(function(n, e) {
  return n.concat([e, e + "-" + Gn, e + "-" + Ar]);
}, []), G0 = "beforeRead", Y0 = "read", Q0 = "afterRead", X0 = "beforeMain", Z0 = "main", ey = "afterMain", ty = "beforeWrite", ny = "write", ry = "afterWrite", iy = [G0, Y0, Q0, X0, Z0, ey, ty, ny, ry];
function mt(n) {
  return n ? (n.nodeName || "").toLowerCase() : null;
}
function ze(n) {
  if (n == null)
    return window;
  if (n.toString() !== "[object Window]") {
    var e = n.ownerDocument;
    return e && e.defaultView || window;
  }
  return n;
}
function wn(n) {
  var e = ze(n).Element;
  return n instanceof e || n instanceof Element;
}
function Je(n) {
  var e = ze(n).HTMLElement;
  return n instanceof e || n instanceof HTMLElement;
}
function wl(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = ze(n).ShadowRoot;
  return n instanceof e || n instanceof ShadowRoot;
}
function oy(n) {
  var e = n.state;
  Object.keys(e.elements).forEach(function(t) {
    var r = e.styles[t] || {}, i = e.attributes[t] || {}, o = e.elements[t];
    !Je(o) || !mt(o) || (Object.assign(o.style, r), Object.keys(i).forEach(function(s) {
      var l = i[s];
      l === !1 ? o.removeAttribute(s) : o.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function sy(n) {
  var e = n.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var i = e.elements[r], o = e.attributes[r] || {}, s = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : t[r]), l = s.reduce(function(a, c) {
        return a[c] = "", a;
      }, {});
      !Je(i) || !mt(i) || (Object.assign(i.style, l), Object.keys(o).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const ud = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: oy,
  effect: sy,
  requires: ["computeStyles"]
};
function ft(n) {
  return n.split("-")[0];
}
var mn = Math.max, Pi = Math.min, Yn = Math.round;
function Ps() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function dd() {
  return !/^((?!chrome|android).)*safari/i.test(Ps());
}
function Qn(n, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var r = n.getBoundingClientRect(), i = 1, o = 1;
  e && Je(n) && (i = n.offsetWidth > 0 && Yn(r.width) / n.offsetWidth || 1, o = n.offsetHeight > 0 && Yn(r.height) / n.offsetHeight || 1);
  var s = wn(n) ? ze(n) : window, l = s.visualViewport, a = !dd() && t, c = (r.left + (a && l ? l.offsetLeft : 0)) / i, u = (r.top + (a && l ? l.offsetTop : 0)) / o, d = r.width / i, f = r.height / o;
  return {
    width: d,
    height: f,
    top: u,
    right: c + d,
    bottom: u + f,
    left: c,
    x: c,
    y: u
  };
}
function xl(n) {
  var e = Qn(n), t = n.offsetWidth, r = n.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: t,
    height: r
  };
}
function fd(n, e) {
  var t = e.getRootNode && e.getRootNode();
  if (n.contains(e))
    return !0;
  if (t && wl(t)) {
    var r = e;
    do {
      if (r && n.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Nt(n) {
  return ze(n).getComputedStyle(n);
}
function ly(n) {
  return ["table", "td", "th"].indexOf(mt(n)) >= 0;
}
function Xt(n) {
  return ((wn(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function No(n) {
  return mt(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (wl(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Xt(n)
  );
}
function $a(n) {
  return !Je(n) || // https://github.com/popperjs/popper-core/issues/837
  Nt(n).position === "fixed" ? null : n.offsetParent;
}
function ay(n) {
  var e = /firefox/i.test(Ps()), t = /Trident/i.test(Ps());
  if (t && Je(n)) {
    var r = Nt(n);
    if (r.position === "fixed")
      return null;
  }
  var i = No(n);
  for (wl(i) && (i = i.host); Je(i) && ["html", "body"].indexOf(mt(i)) < 0; ) {
    var o = Nt(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function jr(n) {
  for (var e = ze(n), t = $a(n); t && ly(t) && Nt(t).position === "static"; )
    t = $a(t);
  return t && (mt(t) === "html" || mt(t) === "body" && Nt(t).position === "static") ? e : t || ay(n) || e;
}
function Cl(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function mr(n, e, t) {
  return mn(n, Pi(e, t));
}
function cy(n, e, t) {
  var r = mr(n, e, t);
  return r > t ? t : r;
}
function hd() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function pd(n) {
  return Object.assign({}, hd(), n);
}
function md(n, e) {
  return e.reduce(function(t, r) {
    return t[r] = n, t;
  }, {});
}
var uy = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, pd(typeof e != "number" ? e : md(e, _r));
};
function dy(n) {
  var e, t = n.state, r = n.name, i = n.options, o = t.elements.arrow, s = t.modifiersData.popperOffsets, l = ft(t.placement), a = Cl(l), c = [Ie, Ye].indexOf(l) >= 0, u = c ? "height" : "width";
  if (!(!o || !s)) {
    var d = uy(i.padding, t), f = xl(o), h = a === "y" ? Le : Ie, p = a === "y" ? Ge : Ye, g = t.rects.reference[u] + t.rects.reference[a] - s[a] - t.rects.popper[u], y = s[a] - t.rects.reference[a], b = jr(o), x = b ? a === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, T = g / 2 - y / 2, m = d[h], w = x - f[u] - d[p], v = x / 2 - f[u] / 2 + T, E = mr(m, v, w), L = a;
    t.modifiersData[r] = (e = {}, e[L] = E, e.centerOffset = E - v, e);
  }
}
function fy(n) {
  var e = n.state, t = n.options, r = t.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || fd(e.elements.popper, i) && (e.elements.arrow = i));
}
const hy = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: dy,
  effect: fy,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Xn(n) {
  return n.split("-")[1];
}
var py = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function my(n, e) {
  var t = n.x, r = n.y, i = e.devicePixelRatio || 1;
  return {
    x: Yn(t * i) / i || 0,
    y: Yn(r * i) / i || 0
  };
}
function Wa(n) {
  var e, t = n.popper, r = n.popperRect, i = n.placement, o = n.variation, s = n.offsets, l = n.position, a = n.gpuAcceleration, c = n.adaptive, u = n.roundOffsets, d = n.isFixed, f = s.x, h = f === void 0 ? 0 : f, p = s.y, g = p === void 0 ? 0 : p, y = typeof u == "function" ? u({
    x: h,
    y: g
  }) : {
    x: h,
    y: g
  };
  h = y.x, g = y.y;
  var b = s.hasOwnProperty("x"), x = s.hasOwnProperty("y"), T = Ie, m = Le, w = window;
  if (c) {
    var v = jr(t), E = "clientHeight", L = "clientWidth";
    if (v === ze(t) && (v = Xt(t), Nt(v).position !== "static" && l === "absolute" && (E = "scrollHeight", L = "scrollWidth")), v = v, i === Le || (i === Ie || i === Ye) && o === Ar) {
      m = Ge;
      var S = d && v === w && w.visualViewport ? w.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        v[E]
      );
      g -= S - r.height, g *= a ? 1 : -1;
    }
    if (i === Ie || (i === Le || i === Ge) && o === Ar) {
      T = Ye;
      var I = d && v === w && w.visualViewport ? w.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        v[L]
      );
      h -= I - r.width, h *= a ? 1 : -1;
    }
  }
  var j = Object.assign({
    position: l
  }, c && py), $ = u === !0 ? my({
    x: h,
    y: g
  }, ze(t)) : {
    x: h,
    y: g
  };
  if (h = $.x, g = $.y, a) {
    var W;
    return Object.assign({}, j, (W = {}, W[m] = x ? "0" : "", W[T] = b ? "0" : "", W.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + g + "px)" : "translate3d(" + h + "px, " + g + "px, 0)", W));
  }
  return Object.assign({}, j, (e = {}, e[m] = x ? g + "px" : "", e[T] = b ? h + "px" : "", e.transform = "", e));
}
function gy(n) {
  var e = n.state, t = n.options, r = t.gpuAcceleration, i = r === void 0 ? !0 : r, o = t.adaptive, s = o === void 0 ? !0 : o, l = t.roundOffsets, a = l === void 0 ? !0 : l, c = {
    placement: ft(e.placement),
    variation: Xn(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Wa(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Wa(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const yy = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: gy,
  data: {}
};
var oi = {
  passive: !0
};
function by(n) {
  var e = n.state, t = n.instance, r = n.options, i = r.scroll, o = i === void 0 ? !0 : i, s = r.resize, l = s === void 0 ? !0 : s, a = ze(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && c.forEach(function(u) {
    u.addEventListener("scroll", t.update, oi);
  }), l && a.addEventListener("resize", t.update, oi), function() {
    o && c.forEach(function(u) {
      u.removeEventListener("scroll", t.update, oi);
    }), l && a.removeEventListener("resize", t.update, oi);
  };
}
const vy = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: by,
  data: {}
};
var ky = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function gi(n) {
  return n.replace(/left|right|bottom|top/g, function(e) {
    return ky[e];
  });
}
var wy = {
  start: "end",
  end: "start"
};
function qa(n) {
  return n.replace(/start|end/g, function(e) {
    return wy[e];
  });
}
function Tl(n) {
  var e = ze(n), t = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function Sl(n) {
  return Qn(Xt(n)).left + Tl(n).scrollLeft;
}
function xy(n, e) {
  var t = ze(n), r = Xt(n), i = t.visualViewport, o = r.clientWidth, s = r.clientHeight, l = 0, a = 0;
  if (i) {
    o = i.width, s = i.height;
    var c = dd();
    (c || !c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: l + Sl(n),
    y: a
  };
}
function Cy(n) {
  var e, t = Xt(n), r = Tl(n), i = (e = n.ownerDocument) == null ? void 0 : e.body, o = mn(t.scrollWidth, t.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = mn(t.scrollHeight, t.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -r.scrollLeft + Sl(n), a = -r.scrollTop;
  return Nt(i || t).direction === "rtl" && (l += mn(t.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: l,
    y: a
  };
}
function Ml(n) {
  var e = Nt(n), t = e.overflow, r = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + i + r);
}
function gd(n) {
  return ["html", "body", "#document"].indexOf(mt(n)) >= 0 ? n.ownerDocument.body : Je(n) && Ml(n) ? n : gd(No(n));
}
function gr(n, e) {
  var t;
  e === void 0 && (e = []);
  var r = gd(n), i = r === ((t = n.ownerDocument) == null ? void 0 : t.body), o = ze(r), s = i ? [o].concat(o.visualViewport || [], Ml(r) ? r : []) : r, l = e.concat(s);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(gr(No(s)))
  );
}
function Fs(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function Ty(n, e) {
  var t = Qn(n, !1, e === "fixed");
  return t.top = t.top + n.clientTop, t.left = t.left + n.clientLeft, t.bottom = t.top + n.clientHeight, t.right = t.left + n.clientWidth, t.width = n.clientWidth, t.height = n.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Ka(n, e, t) {
  return e === ad ? Fs(xy(n, t)) : wn(e) ? Ty(e, t) : Fs(Cy(Xt(n)));
}
function Sy(n) {
  var e = gr(No(n)), t = ["absolute", "fixed"].indexOf(Nt(n).position) >= 0, r = t && Je(n) ? jr(n) : n;
  return wn(r) ? e.filter(function(i) {
    return wn(i) && fd(i, r) && mt(i) !== "body";
  }) : [];
}
function My(n, e, t, r) {
  var i = e === "clippingParents" ? Sy(n) : [].concat(e), o = [].concat(i, [t]), s = o[0], l = o.reduce(function(a, c) {
    var u = Ka(n, c, r);
    return a.top = mn(u.top, a.top), a.right = Pi(u.right, a.right), a.bottom = Pi(u.bottom, a.bottom), a.left = mn(u.left, a.left), a;
  }, Ka(n, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function yd(n) {
  var e = n.reference, t = n.element, r = n.placement, i = r ? ft(r) : null, o = r ? Xn(r) : null, s = e.x + e.width / 2 - t.width / 2, l = e.y + e.height / 2 - t.height / 2, a;
  switch (i) {
    case Le:
      a = {
        x: s,
        y: e.y - t.height
      };
      break;
    case Ge:
      a = {
        x: s,
        y: e.y + e.height
      };
      break;
    case Ye:
      a = {
        x: e.x + e.width,
        y: l
      };
      break;
    case Ie:
      a = {
        x: e.x - t.width,
        y: l
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var c = i ? Cl(i) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (o) {
      case Gn:
        a[c] = a[c] - (e[u] / 2 - t[u] / 2);
        break;
      case Ar:
        a[c] = a[c] + (e[u] / 2 - t[u] / 2);
        break;
    }
  }
  return a;
}
function Or(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = r === void 0 ? n.placement : r, o = t.strategy, s = o === void 0 ? n.strategy : o, l = t.boundary, a = l === void 0 ? U0 : l, c = t.rootBoundary, u = c === void 0 ? ad : c, d = t.elementContext, f = d === void 0 ? lr : d, h = t.altBoundary, p = h === void 0 ? !1 : h, g = t.padding, y = g === void 0 ? 0 : g, b = pd(typeof y != "number" ? y : md(y, _r)), x = f === lr ? J0 : lr, T = n.rects.popper, m = n.elements[p ? x : f], w = My(wn(m) ? m : m.contextElement || Xt(n.elements.popper), a, u, s), v = Qn(n.elements.reference), E = yd({
    reference: v,
    element: T,
    strategy: "absolute",
    placement: i
  }), L = Fs(Object.assign({}, T, E)), S = f === lr ? L : v, I = {
    top: w.top - S.top + b.top,
    bottom: S.bottom - w.bottom + b.bottom,
    left: w.left - S.left + b.left,
    right: S.right - w.right + b.right
  }, j = n.modifiersData.offset;
  if (f === lr && j) {
    var $ = j[i];
    Object.keys(I).forEach(function(W) {
      var ie = [Ye, Ge].indexOf(W) >= 0 ? 1 : -1, Y = [Le, Ge].indexOf(W) >= 0 ? "y" : "x";
      I[W] += $[Y] * ie;
    });
  }
  return I;
}
function Ey(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = t.boundary, o = t.rootBoundary, s = t.padding, l = t.flipVariations, a = t.allowedAutoPlacements, c = a === void 0 ? cd : a, u = Xn(r), d = u ? l ? ja : ja.filter(function(p) {
    return Xn(p) === u;
  }) : _r, f = d.filter(function(p) {
    return c.indexOf(p) >= 0;
  });
  f.length === 0 && (f = d);
  var h = f.reduce(function(p, g) {
    return p[g] = Or(n, {
      placement: g,
      boundary: i,
      rootBoundary: o,
      padding: s
    })[ft(g)], p;
  }, {});
  return Object.keys(h).sort(function(p, g) {
    return h[p] - h[g];
  });
}
function Ay(n) {
  if (ft(n) === kl)
    return [];
  var e = gi(n);
  return [qa(n), e, qa(e)];
}
function Oy(n) {
  var e = n.state, t = n.options, r = n.name;
  if (!e.modifiersData[r]._skip) {
    for (var i = t.mainAxis, o = i === void 0 ? !0 : i, s = t.altAxis, l = s === void 0 ? !0 : s, a = t.fallbackPlacements, c = t.padding, u = t.boundary, d = t.rootBoundary, f = t.altBoundary, h = t.flipVariations, p = h === void 0 ? !0 : h, g = t.allowedAutoPlacements, y = e.options.placement, b = ft(y), x = b === y, T = a || (x || !p ? [gi(y)] : Ay(y)), m = [y].concat(T).reduce(function(bt, Qe) {
      return bt.concat(ft(Qe) === kl ? Ey(e, {
        placement: Qe,
        boundary: u,
        rootBoundary: d,
        padding: c,
        flipVariations: p,
        allowedAutoPlacements: g
      }) : Qe);
    }, []), w = e.rects.reference, v = e.rects.popper, E = /* @__PURE__ */ new Map(), L = !0, S = m[0], I = 0; I < m.length; I++) {
      var j = m[I], $ = ft(j), W = Xn(j) === Gn, ie = [Le, Ge].indexOf($) >= 0, Y = ie ? "width" : "height", Q = Or(e, {
        placement: j,
        boundary: u,
        rootBoundary: d,
        altBoundary: f,
        padding: c
      }), G = ie ? W ? Ye : Ie : W ? Ge : Le;
      w[Y] > v[Y] && (G = gi(G));
      var K = gi(G), Pe = [];
      if (o && Pe.push(Q[$] <= 0), l && Pe.push(Q[G] <= 0, Q[K] <= 0), Pe.every(function(bt) {
        return bt;
      })) {
        S = j, L = !1;
        break;
      }
      E.set(j, Pe);
    }
    if (L)
      for (var ge = p ? 3 : 1, yt = function(Qe) {
        var vt = m.find(function(Cn) {
          var kt = E.get(Cn);
          if (kt)
            return kt.slice(0, Qe).every(function(Tn) {
              return Tn;
            });
        });
        if (vt)
          return S = vt, "break";
      }, Ee = ge; Ee > 0; Ee--) {
        var en = yt(Ee);
        if (en === "break")
          break;
      }
    e.placement !== S && (e.modifiersData[r]._skip = !0, e.placement = S, e.reset = !0);
  }
}
const Ny = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Oy,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ua(n, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: n.top - e.height - t.y,
    right: n.right - e.width + t.x,
    bottom: n.bottom - e.height + t.y,
    left: n.left - e.width - t.x
  };
}
function Ja(n) {
  return [Le, Ye, Ge, Ie].some(function(e) {
    return n[e] >= 0;
  });
}
function Dy(n) {
  var e = n.state, t = n.name, r = e.rects.reference, i = e.rects.popper, o = e.modifiersData.preventOverflow, s = Or(e, {
    elementContext: "reference"
  }), l = Or(e, {
    altBoundary: !0
  }), a = Ua(s, r), c = Ua(l, i, o), u = Ja(a), d = Ja(c);
  e.modifiersData[t] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: d
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": d
  });
}
const By = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Dy
};
function Ly(n, e, t) {
  var r = ft(n), i = [Ie, Le].indexOf(r) >= 0 ? -1 : 1, o = typeof t == "function" ? t(Object.assign({}, e, {
    placement: n
  })) : t, s = o[0], l = o[1];
  return s = s || 0, l = (l || 0) * i, [Ie, Ye].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Iy(n) {
  var e = n.state, t = n.options, r = n.name, i = t.offset, o = i === void 0 ? [0, 0] : i, s = cd.reduce(function(u, d) {
    return u[d] = Ly(d, e.rects, o), u;
  }, {}), l = s[e.placement], a = l.x, c = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = s;
}
const Ry = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Iy
};
function Py(n) {
  var e = n.state, t = n.name;
  e.modifiersData[t] = yd({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Fy = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Py,
  data: {}
};
function Hy(n) {
  return n === "x" ? "y" : "x";
}
function zy(n) {
  var e = n.state, t = n.options, r = n.name, i = t.mainAxis, o = i === void 0 ? !0 : i, s = t.altAxis, l = s === void 0 ? !1 : s, a = t.boundary, c = t.rootBoundary, u = t.altBoundary, d = t.padding, f = t.tether, h = f === void 0 ? !0 : f, p = t.tetherOffset, g = p === void 0 ? 0 : p, y = Or(e, {
    boundary: a,
    rootBoundary: c,
    padding: d,
    altBoundary: u
  }), b = ft(e.placement), x = Xn(e.placement), T = !x, m = Cl(b), w = Hy(m), v = e.modifiersData.popperOffsets, E = e.rects.reference, L = e.rects.popper, S = typeof g == "function" ? g(Object.assign({}, e.rects, {
    placement: e.placement
  })) : g, I = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), j = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, $ = {
    x: 0,
    y: 0
  };
  if (v) {
    if (o) {
      var W, ie = m === "y" ? Le : Ie, Y = m === "y" ? Ge : Ye, Q = m === "y" ? "height" : "width", G = v[m], K = G + y[ie], Pe = G - y[Y], ge = h ? -L[Q] / 2 : 0, yt = x === Gn ? E[Q] : L[Q], Ee = x === Gn ? -L[Q] : -E[Q], en = e.elements.arrow, bt = h && en ? xl(en) : {
        width: 0,
        height: 0
      }, Qe = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : hd(), vt = Qe[ie], Cn = Qe[Y], kt = mr(0, E[Q], bt[Q]), Tn = T ? E[Q] / 2 - ge - kt - vt - I.mainAxis : yt - kt - vt - I.mainAxis, Dt = T ? -E[Q] / 2 + ge + kt + Cn + I.mainAxis : Ee + kt + Cn + I.mainAxis, Sn = e.elements.arrow && jr(e.elements.arrow), Wr = Sn ? m === "y" ? Sn.clientTop || 0 : Sn.clientLeft || 0 : 0, tr = (W = j == null ? void 0 : j[m]) != null ? W : 0, qr = G + Tn - tr - Wr, Kr = G + Dt - tr, nr = mr(h ? Pi(K, qr) : K, G, h ? mn(Pe, Kr) : Pe);
      v[m] = nr, $[m] = nr - G;
    }
    if (l) {
      var rr, Ur = m === "x" ? Le : Ie, Jr = m === "x" ? Ge : Ye, wt = v[w], Bt = w === "y" ? "height" : "width", ir = wt + y[Ur], tn = wt - y[Jr], or = [Le, Ie].indexOf(b) !== -1, Gr = (rr = j == null ? void 0 : j[w]) != null ? rr : 0, Yr = or ? ir : wt - E[Bt] - L[Bt] - Gr + I.altAxis, Qr = or ? wt + E[Bt] + L[Bt] - Gr - I.altAxis : tn, Xr = h && or ? cy(Yr, wt, Qr) : mr(h ? Yr : ir, wt, h ? Qr : tn);
      v[w] = Xr, $[w] = Xr - wt;
    }
    e.modifiersData[r] = $;
  }
}
const Vy = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: zy,
  requiresIfExists: ["offset"]
};
function _y(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function jy(n) {
  return n === ze(n) || !Je(n) ? Tl(n) : _y(n);
}
function $y(n) {
  var e = n.getBoundingClientRect(), t = Yn(e.width) / n.offsetWidth || 1, r = Yn(e.height) / n.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function Wy(n, e, t) {
  t === void 0 && (t = !1);
  var r = Je(e), i = Je(e) && $y(e), o = Xt(e), s = Qn(n, i, t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((mt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ml(o)) && (l = jy(e)), Je(e) ? (a = Qn(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : o && (a.x = Sl(o))), {
    x: s.left + l.scrollLeft - a.x,
    y: s.top + l.scrollTop - a.y,
    width: s.width,
    height: s.height
  };
}
function qy(n) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), r = [];
  n.forEach(function(o) {
    e.set(o.name, o);
  });
  function i(o) {
    t.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function(l) {
      if (!t.has(l)) {
        var a = e.get(l);
        a && i(a);
      }
    }), r.push(o);
  }
  return n.forEach(function(o) {
    t.has(o.name) || i(o);
  }), r;
}
function Ky(n) {
  var e = qy(n);
  return iy.reduce(function(t, r) {
    return t.concat(e.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function Uy(n) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(n());
      });
    })), e;
  };
}
function Jy(n) {
  var e = n.reduce(function(t, r) {
    var i = t[r.name];
    return t[r.name] = i ? Object.assign({}, i, r, {
      options: Object.assign({}, i.options, r.options),
      data: Object.assign({}, i.data, r.data)
    }) : r, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var Ga = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ya() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Gy(n) {
  n === void 0 && (n = {});
  var e = n, t = e.defaultModifiers, r = t === void 0 ? [] : t, i = e.defaultOptions, o = i === void 0 ? Ga : i;
  return function(l, a, c) {
    c === void 0 && (c = o);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ga, o),
      modifiersData: {},
      elements: {
        reference: l,
        popper: a
      },
      attributes: {},
      styles: {}
    }, d = [], f = !1, h = {
      state: u,
      setOptions: function(b) {
        var x = typeof b == "function" ? b(u.options) : b;
        g(), u.options = Object.assign({}, o, u.options, x), u.scrollParents = {
          reference: wn(l) ? gr(l) : l.contextElement ? gr(l.contextElement) : [],
          popper: gr(a)
        };
        var T = Ky(Jy([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = T.filter(function(m) {
          return m.enabled;
        }), p(), h.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var b = u.elements, x = b.reference, T = b.popper;
          if (Ya(x, T)) {
            u.rects = {
              reference: Wy(x, jr(T), u.options.strategy === "fixed"),
              popper: xl(T)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(I) {
              return u.modifiersData[I.name] = Object.assign({}, I.data);
            });
            for (var m = 0; m < u.orderedModifiers.length; m++) {
              if (u.reset === !0) {
                u.reset = !1, m = -1;
                continue;
              }
              var w = u.orderedModifiers[m], v = w.fn, E = w.options, L = E === void 0 ? {} : E, S = w.name;
              typeof v == "function" && (u = v({
                state: u,
                options: L,
                name: S,
                instance: h
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Uy(function() {
        return new Promise(function(y) {
          h.forceUpdate(), y(u);
        });
      }),
      destroy: function() {
        g(), f = !0;
      }
    };
    if (!Ya(l, a))
      return h;
    h.setOptions(c).then(function(y) {
      !f && c.onFirstUpdate && c.onFirstUpdate(y);
    });
    function p() {
      u.orderedModifiers.forEach(function(y) {
        var b = y.name, x = y.options, T = x === void 0 ? {} : x, m = y.effect;
        if (typeof m == "function") {
          var w = m({
            state: u,
            name: b,
            instance: h,
            options: T
          }), v = function() {
          };
          d.push(w || v);
        }
      });
    }
    function g() {
      d.forEach(function(y) {
        return y();
      }), d = [];
    }
    return h;
  };
}
var Yy = [vy, Fy, yy, ud, Ry, Ny, Vy, hy, By], Qy = /* @__PURE__ */ Gy({
  defaultModifiers: Yy
}), Xy = "tippy-box", bd = "tippy-content", Zy = "tippy-backdrop", vd = "tippy-arrow", kd = "tippy-svg-arrow", rn = {
  passive: !0,
  capture: !0
}, wd = function() {
  return document.body;
};
function eb(n, e) {
  return {}.hasOwnProperty.call(n, e);
}
function ts(n, e, t) {
  if (Array.isArray(n)) {
    var r = n[e];
    return r ?? (Array.isArray(t) ? t[e] : t);
  }
  return n;
}
function El(n, e) {
  var t = {}.toString.call(n);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function xd(n, e) {
  return typeof n == "function" ? n.apply(void 0, e) : n;
}
function Qa(n, e) {
  if (e === 0)
    return n;
  var t;
  return function(r) {
    clearTimeout(t), t = setTimeout(function() {
      n(r);
    }, e);
  };
}
function tb(n, e) {
  var t = Object.assign({}, n);
  return e.forEach(function(r) {
    delete t[r];
  }), t;
}
function nb(n) {
  return n.split(/\s+/).filter(Boolean);
}
function In(n) {
  return [].concat(n);
}
function Xa(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function rb(n) {
  return n.filter(function(e, t) {
    return n.indexOf(e) === t;
  });
}
function ib(n) {
  return n.split("-")[0];
}
function Fi(n) {
  return [].slice.call(n);
}
function Za(n) {
  return Object.keys(n).reduce(function(e, t) {
    return n[t] !== void 0 && (e[t] = n[t]), e;
  }, {});
}
function yr() {
  return document.createElement("div");
}
function Nr(n) {
  return ["Element", "Fragment"].some(function(e) {
    return El(n, e);
  });
}
function ob(n) {
  return El(n, "NodeList");
}
function sb(n) {
  return El(n, "MouseEvent");
}
function lb(n) {
  return !!(n && n._tippy && n._tippy.reference === n);
}
function ab(n) {
  return Nr(n) ? [n] : ob(n) ? Fi(n) : Array.isArray(n) ? n : Fi(document.querySelectorAll(n));
}
function ns(n, e) {
  n.forEach(function(t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function ec(n, e) {
  n.forEach(function(t) {
    t && t.setAttribute("data-state", e);
  });
}
function cb(n) {
  var e, t = In(n), r = t[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function ub(n, e) {
  var t = e.clientX, r = e.clientY;
  return n.every(function(i) {
    var o = i.popperRect, s = i.popperState, l = i.props, a = l.interactiveBorder, c = ib(s.placement), u = s.modifiersData.offset;
    if (!u)
      return !0;
    var d = c === "bottom" ? u.top.y : 0, f = c === "top" ? u.bottom.y : 0, h = c === "right" ? u.left.x : 0, p = c === "left" ? u.right.x : 0, g = o.top - r + d > a, y = r - o.bottom - f > a, b = o.left - t + h > a, x = t - o.right - p > a;
    return g || y || b || x;
  });
}
function rs(n, e, t) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(i) {
    n[r](i, t);
  });
}
function tc(n, e) {
  for (var t = e; t; ) {
    var r;
    if (n.contains(t))
      return !0;
    t = t.getRootNode == null || (r = t.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var lt = {
  isTouch: !1
}, nc = 0;
function db() {
  lt.isTouch || (lt.isTouch = !0, window.performance && document.addEventListener("mousemove", Cd));
}
function Cd() {
  var n = performance.now();
  n - nc < 20 && (lt.isTouch = !1, document.removeEventListener("mousemove", Cd)), nc = n;
}
function fb() {
  var n = document.activeElement;
  if (lb(n)) {
    var e = n._tippy;
    n.blur && !e.state.isVisible && n.blur();
  }
}
function hb() {
  document.addEventListener("touchstart", db, rn), window.addEventListener("blur", fb);
}
var pb = typeof window < "u" && typeof document < "u", mb = pb ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function Nn(n) {
  var e = n === "destroy" ? "n already-" : " ";
  return [n + "() was called on a" + e + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function rc(n) {
  var e = /[ \t]{2,}/g, t = /^[ \t]*/gm;
  return n.replace(e, " ").replace(t, "").trim();
}
function gb(n) {
  return rc(`
  %ctippy.js

  %c` + rc(n) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function Td(n) {
  return [
    gb(n),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var Dr;
process.env.NODE_ENV !== "production" && yb();
function yb() {
  Dr = /* @__PURE__ */ new Set();
}
function St(n, e) {
  if (n && !Dr.has(e)) {
    var t;
    Dr.add(e), (t = console).warn.apply(t, Td(e));
  }
}
function Hs(n, e) {
  if (n && !Dr.has(e)) {
    var t;
    Dr.add(e), (t = console).error.apply(t, Td(e));
  }
}
function bb(n) {
  var e = !n, t = Object.prototype.toString.call(n) === "[object Object]" && !n.addEventListener;
  Hs(e, ["tippy() was passed", "`" + String(n) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), Hs(t, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var Sd = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, vb = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, He = Object.assign({
  appendTo: wd,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, Sd, vb), kb = Object.keys(He), wb = function(e) {
  process.env.NODE_ENV !== "production" && Ed(e, []);
  var t = Object.keys(e);
  t.forEach(function(r) {
    He[r] = e[r];
  });
};
function Md(n) {
  var e = n.plugins || [], t = e.reduce(function(r, i) {
    var o = i.name, s = i.defaultValue;
    if (o) {
      var l;
      r[o] = n[o] !== void 0 ? n[o] : (l = He[o]) != null ? l : s;
    }
    return r;
  }, {});
  return Object.assign({}, n, t);
}
function xb(n, e) {
  var t = e ? Object.keys(Md(Object.assign({}, He, {
    plugins: e
  }))) : kb, r = t.reduce(function(i, o) {
    var s = (n.getAttribute("data-tippy-" + o) || "").trim();
    if (!s)
      return i;
    if (o === "content")
      i[o] = s;
    else
      try {
        i[o] = JSON.parse(s);
      } catch {
        i[o] = s;
      }
    return i;
  }, {});
  return r;
}
function ic(n, e) {
  var t = Object.assign({}, e, {
    content: xd(e.content, [n])
  }, e.ignoreAttributes ? {} : xb(n, e.plugins));
  return t.aria = Object.assign({}, He.aria, t.aria), t.aria = {
    expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
    content: t.aria.content === "auto" ? e.interactive ? null : "describedby" : t.aria.content
  }, t;
}
function Ed(n, e) {
  n === void 0 && (n = {}), e === void 0 && (e = []);
  var t = Object.keys(n);
  t.forEach(function(r) {
    var i = tb(He, Object.keys(Sd)), o = !eb(i, r);
    o && (o = e.filter(function(s) {
      return s.name === r;
    }).length === 0), St(o, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var Cb = function() {
  return "innerHTML";
};
function zs(n, e) {
  n[Cb()] = e;
}
function oc(n) {
  var e = yr();
  return n === !0 ? e.className = vd : (e.className = kd, Nr(n) ? e.appendChild(n) : zs(e, n)), e;
}
function sc(n, e) {
  Nr(e.content) ? (zs(n, ""), n.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? zs(n, e.content) : n.textContent = e.content);
}
function Vs(n) {
  var e = n.firstElementChild, t = Fi(e.children);
  return {
    box: e,
    content: t.find(function(r) {
      return r.classList.contains(bd);
    }),
    arrow: t.find(function(r) {
      return r.classList.contains(vd) || r.classList.contains(kd);
    }),
    backdrop: t.find(function(r) {
      return r.classList.contains(Zy);
    })
  };
}
function Ad(n) {
  var e = yr(), t = yr();
  t.className = Xy, t.setAttribute("data-state", "hidden"), t.setAttribute("tabindex", "-1");
  var r = yr();
  r.className = bd, r.setAttribute("data-state", "hidden"), sc(r, n.props), e.appendChild(t), t.appendChild(r), i(n.props, n.props);
  function i(o, s) {
    var l = Vs(e), a = l.box, c = l.content, u = l.arrow;
    s.theme ? a.setAttribute("data-theme", s.theme) : a.removeAttribute("data-theme"), typeof s.animation == "string" ? a.setAttribute("data-animation", s.animation) : a.removeAttribute("data-animation"), s.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = typeof s.maxWidth == "number" ? s.maxWidth + "px" : s.maxWidth, s.role ? a.setAttribute("role", s.role) : a.removeAttribute("role"), (o.content !== s.content || o.allowHTML !== s.allowHTML) && sc(c, n.props), s.arrow ? u ? o.arrow !== s.arrow && (a.removeChild(u), a.appendChild(oc(s.arrow))) : a.appendChild(oc(s.arrow)) : u && a.removeChild(u);
  }
  return {
    popper: e,
    onUpdate: i
  };
}
Ad.$$tippy = !0;
var Tb = 1, si = [], is = [];
function Sb(n, e) {
  var t = ic(n, Object.assign({}, He, Md(Za(e)))), r, i, o, s = !1, l = !1, a = !1, c = !1, u, d, f, h = [], p = Qa(qr, t.interactiveDebounce), g, y = Tb++, b = null, x = rb(t.plugins), T = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, m = {
    // properties
    id: y,
    reference: n,
    popper: yr(),
    popperInstance: b,
    props: t,
    state: T,
    plugins: x,
    // methods
    clearDelayTimeouts: Yr,
    setProps: Qr,
    setContent: Xr,
    show: Xd,
    hide: Zd,
    hideWithInteractivity: ef,
    enable: or,
    disable: Gr,
    unmount: tf,
    destroy: nf
  };
  if (!t.render)
    return process.env.NODE_ENV !== "production" && Hs(!0, "render() function has not been supplied."), m;
  var w = t.render(m), v = w.popper, E = w.onUpdate;
  v.setAttribute("data-tippy-root", ""), v.id = "tippy-" + m.id, m.popper = v, n._tippy = m, v._tippy = m;
  var L = x.map(function(k) {
    return k.fn(m);
  }), S = n.hasAttribute("aria-expanded");
  return Sn(), ge(), G(), K("onCreate", [m]), t.showOnCreate && ir(), v.addEventListener("mouseenter", function() {
    m.props.interactive && m.state.isVisible && m.clearDelayTimeouts();
  }), v.addEventListener("mouseleave", function() {
    m.props.interactive && m.props.trigger.indexOf("mouseenter") >= 0 && ie().addEventListener("mousemove", p);
  }), m;
  function I() {
    var k = m.props.touch;
    return Array.isArray(k) ? k : [k, 0];
  }
  function j() {
    return I()[0] === "hold";
  }
  function $() {
    var k;
    return !!((k = m.props.render) != null && k.$$tippy);
  }
  function W() {
    return g || n;
  }
  function ie() {
    var k = W().parentNode;
    return k ? cb(k) : document;
  }
  function Y() {
    return Vs(v);
  }
  function Q(k) {
    return m.state.isMounted && !m.state.isVisible || lt.isTouch || u && u.type === "focus" ? 0 : ts(m.props.delay, k ? 0 : 1, He.delay);
  }
  function G(k) {
    k === void 0 && (k = !1), v.style.pointerEvents = m.props.interactive && !k ? "" : "none", v.style.zIndex = "" + m.props.zIndex;
  }
  function K(k, D, R) {
    if (R === void 0 && (R = !0), L.forEach(function(q) {
      q[k] && q[k].apply(q, D);
    }), R) {
      var U;
      (U = m.props)[k].apply(U, D);
    }
  }
  function Pe() {
    var k = m.props.aria;
    if (k.content) {
      var D = "aria-" + k.content, R = v.id, U = In(m.props.triggerTarget || n);
      U.forEach(function(q) {
        var xe = q.getAttribute(D);
        if (m.state.isVisible)
          q.setAttribute(D, xe ? xe + " " + R : R);
        else {
          var Ve = xe && xe.replace(R, "").trim();
          Ve ? q.setAttribute(D, Ve) : q.removeAttribute(D);
        }
      });
    }
  }
  function ge() {
    if (!(S || !m.props.aria.expanded)) {
      var k = In(m.props.triggerTarget || n);
      k.forEach(function(D) {
        m.props.interactive ? D.setAttribute("aria-expanded", m.state.isVisible && D === W() ? "true" : "false") : D.removeAttribute("aria-expanded");
      });
    }
  }
  function yt() {
    ie().removeEventListener("mousemove", p), si = si.filter(function(k) {
      return k !== p;
    });
  }
  function Ee(k) {
    if (!(lt.isTouch && (a || k.type === "mousedown"))) {
      var D = k.composedPath && k.composedPath()[0] || k.target;
      if (!(m.props.interactive && tc(v, D))) {
        if (In(m.props.triggerTarget || n).some(function(R) {
          return tc(R, D);
        })) {
          if (lt.isTouch || m.state.isVisible && m.props.trigger.indexOf("click") >= 0)
            return;
        } else
          K("onClickOutside", [m, k]);
        m.props.hideOnClick === !0 && (m.clearDelayTimeouts(), m.hide(), l = !0, setTimeout(function() {
          l = !1;
        }), m.state.isMounted || vt());
      }
    }
  }
  function en() {
    a = !0;
  }
  function bt() {
    a = !1;
  }
  function Qe() {
    var k = ie();
    k.addEventListener("mousedown", Ee, !0), k.addEventListener("touchend", Ee, rn), k.addEventListener("touchstart", bt, rn), k.addEventListener("touchmove", en, rn);
  }
  function vt() {
    var k = ie();
    k.removeEventListener("mousedown", Ee, !0), k.removeEventListener("touchend", Ee, rn), k.removeEventListener("touchstart", bt, rn), k.removeEventListener("touchmove", en, rn);
  }
  function Cn(k, D) {
    Tn(k, function() {
      !m.state.isVisible && v.parentNode && v.parentNode.contains(v) && D();
    });
  }
  function kt(k, D) {
    Tn(k, D);
  }
  function Tn(k, D) {
    var R = Y().box;
    function U(q) {
      q.target === R && (rs(R, "remove", U), D());
    }
    if (k === 0)
      return D();
    rs(R, "remove", d), rs(R, "add", U), d = U;
  }
  function Dt(k, D, R) {
    R === void 0 && (R = !1);
    var U = In(m.props.triggerTarget || n);
    U.forEach(function(q) {
      q.addEventListener(k, D, R), h.push({
        node: q,
        eventType: k,
        handler: D,
        options: R
      });
    });
  }
  function Sn() {
    j() && (Dt("touchstart", tr, {
      passive: !0
    }), Dt("touchend", Kr, {
      passive: !0
    })), nb(m.props.trigger).forEach(function(k) {
      if (k !== "manual")
        switch (Dt(k, tr), k) {
          case "mouseenter":
            Dt("mouseleave", Kr);
            break;
          case "focus":
            Dt(mb ? "focusout" : "blur", nr);
            break;
          case "focusin":
            Dt("focusout", nr);
            break;
        }
    });
  }
  function Wr() {
    h.forEach(function(k) {
      var D = k.node, R = k.eventType, U = k.handler, q = k.options;
      D.removeEventListener(R, U, q);
    }), h = [];
  }
  function tr(k) {
    var D, R = !1;
    if (!(!m.state.isEnabled || rr(k) || l)) {
      var U = ((D = u) == null ? void 0 : D.type) === "focus";
      u = k, g = k.currentTarget, ge(), !m.state.isVisible && sb(k) && si.forEach(function(q) {
        return q(k);
      }), k.type === "click" && (m.props.trigger.indexOf("mouseenter") < 0 || s) && m.props.hideOnClick !== !1 && m.state.isVisible ? R = !0 : ir(k), k.type === "click" && (s = !R), R && !U && tn(k);
    }
  }
  function qr(k) {
    var D = k.target, R = W().contains(D) || v.contains(D);
    if (!(k.type === "mousemove" && R)) {
      var U = Bt().concat(v).map(function(q) {
        var xe, Ve = q._tippy, Mn = (xe = Ve.popperInstance) == null ? void 0 : xe.state;
        return Mn ? {
          popperRect: q.getBoundingClientRect(),
          popperState: Mn,
          props: t
        } : null;
      }).filter(Boolean);
      ub(U, k) && (yt(), tn(k));
    }
  }
  function Kr(k) {
    var D = rr(k) || m.props.trigger.indexOf("click") >= 0 && s;
    if (!D) {
      if (m.props.interactive) {
        m.hideWithInteractivity(k);
        return;
      }
      tn(k);
    }
  }
  function nr(k) {
    m.props.trigger.indexOf("focusin") < 0 && k.target !== W() || m.props.interactive && k.relatedTarget && v.contains(k.relatedTarget) || tn(k);
  }
  function rr(k) {
    return lt.isTouch ? j() !== k.type.indexOf("touch") >= 0 : !1;
  }
  function Ur() {
    Jr();
    var k = m.props, D = k.popperOptions, R = k.placement, U = k.offset, q = k.getReferenceClientRect, xe = k.moveTransition, Ve = $() ? Vs(v).arrow : null, Mn = q ? {
      getBoundingClientRect: q,
      contextElement: q.contextElement || W()
    } : n, Fl = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Zr) {
        var En = Zr.state;
        if ($()) {
          var rf = Y(), Io = rf.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(ei) {
            ei === "placement" ? Io.setAttribute("data-placement", En.placement) : En.attributes.popper["data-popper-" + ei] ? Io.setAttribute("data-" + ei, "") : Io.removeAttribute("data-" + ei);
          }), En.attributes.popper = {};
        }
      }
    }, nn = [{
      name: "offset",
      options: {
        offset: U
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !xe
      }
    }, Fl];
    $() && Ve && nn.push({
      name: "arrow",
      options: {
        element: Ve,
        padding: 3
      }
    }), nn.push.apply(nn, (D == null ? void 0 : D.modifiers) || []), m.popperInstance = Qy(Mn, v, Object.assign({}, D, {
      placement: R,
      onFirstUpdate: f,
      modifiers: nn
    }));
  }
  function Jr() {
    m.popperInstance && (m.popperInstance.destroy(), m.popperInstance = null);
  }
  function wt() {
    var k = m.props.appendTo, D, R = W();
    m.props.interactive && k === wd || k === "parent" ? D = R.parentNode : D = xd(k, [R]), D.contains(v) || D.appendChild(v), m.state.isMounted = !0, Ur(), process.env.NODE_ENV !== "production" && St(m.props.interactive && k === He.appendTo && R.nextElementSibling !== v, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function Bt() {
    return Fi(v.querySelectorAll("[data-tippy-root]"));
  }
  function ir(k) {
    m.clearDelayTimeouts(), k && K("onTrigger", [m, k]), Qe();
    var D = Q(!0), R = I(), U = R[0], q = R[1];
    lt.isTouch && U === "hold" && q && (D = q), D ? r = setTimeout(function() {
      m.show();
    }, D) : m.show();
  }
  function tn(k) {
    if (m.clearDelayTimeouts(), K("onUntrigger", [m, k]), !m.state.isVisible) {
      vt();
      return;
    }
    if (!(m.props.trigger.indexOf("mouseenter") >= 0 && m.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(k.type) >= 0 && s)) {
      var D = Q(!1);
      D ? i = setTimeout(function() {
        m.state.isVisible && m.hide();
      }, D) : o = requestAnimationFrame(function() {
        m.hide();
      });
    }
  }
  function or() {
    m.state.isEnabled = !0;
  }
  function Gr() {
    m.hide(), m.state.isEnabled = !1;
  }
  function Yr() {
    clearTimeout(r), clearTimeout(i), cancelAnimationFrame(o);
  }
  function Qr(k) {
    if (process.env.NODE_ENV !== "production" && St(m.state.isDestroyed, Nn("setProps")), !m.state.isDestroyed) {
      K("onBeforeUpdate", [m, k]), Wr();
      var D = m.props, R = ic(n, Object.assign({}, D, Za(k), {
        ignoreAttributes: !0
      }));
      m.props = R, Sn(), D.interactiveDebounce !== R.interactiveDebounce && (yt(), p = Qa(qr, R.interactiveDebounce)), D.triggerTarget && !R.triggerTarget ? In(D.triggerTarget).forEach(function(U) {
        U.removeAttribute("aria-expanded");
      }) : R.triggerTarget && n.removeAttribute("aria-expanded"), ge(), G(), E && E(D, R), m.popperInstance && (Ur(), Bt().forEach(function(U) {
        requestAnimationFrame(U._tippy.popperInstance.forceUpdate);
      })), K("onAfterUpdate", [m, k]);
    }
  }
  function Xr(k) {
    m.setProps({
      content: k
    });
  }
  function Xd() {
    process.env.NODE_ENV !== "production" && St(m.state.isDestroyed, Nn("show"));
    var k = m.state.isVisible, D = m.state.isDestroyed, R = !m.state.isEnabled, U = lt.isTouch && !m.props.touch, q = ts(m.props.duration, 0, He.duration);
    if (!(k || D || R || U) && !W().hasAttribute("disabled") && (K("onShow", [m], !1), m.props.onShow(m) !== !1)) {
      if (m.state.isVisible = !0, $() && (v.style.visibility = "visible"), G(), Qe(), m.state.isMounted || (v.style.transition = "none"), $()) {
        var xe = Y(), Ve = xe.box, Mn = xe.content;
        ns([Ve, Mn], 0);
      }
      f = function() {
        var nn;
        if (!(!m.state.isVisible || c)) {
          if (c = !0, v.offsetHeight, v.style.transition = m.props.moveTransition, $() && m.props.animation) {
            var Lo = Y(), Zr = Lo.box, En = Lo.content;
            ns([Zr, En], q), ec([Zr, En], "visible");
          }
          Pe(), ge(), Xa(is, m), (nn = m.popperInstance) == null || nn.forceUpdate(), K("onMount", [m]), m.props.animation && $() && kt(q, function() {
            m.state.isShown = !0, K("onShown", [m]);
          });
        }
      }, wt();
    }
  }
  function Zd() {
    process.env.NODE_ENV !== "production" && St(m.state.isDestroyed, Nn("hide"));
    var k = !m.state.isVisible, D = m.state.isDestroyed, R = !m.state.isEnabled, U = ts(m.props.duration, 1, He.duration);
    if (!(k || D || R) && (K("onHide", [m], !1), m.props.onHide(m) !== !1)) {
      if (m.state.isVisible = !1, m.state.isShown = !1, c = !1, s = !1, $() && (v.style.visibility = "hidden"), yt(), vt(), G(!0), $()) {
        var q = Y(), xe = q.box, Ve = q.content;
        m.props.animation && (ns([xe, Ve], U), ec([xe, Ve], "hidden"));
      }
      Pe(), ge(), m.props.animation ? $() && Cn(U, m.unmount) : m.unmount();
    }
  }
  function ef(k) {
    process.env.NODE_ENV !== "production" && St(m.state.isDestroyed, Nn("hideWithInteractivity")), ie().addEventListener("mousemove", p), Xa(si, p), p(k);
  }
  function tf() {
    process.env.NODE_ENV !== "production" && St(m.state.isDestroyed, Nn("unmount")), m.state.isVisible && m.hide(), m.state.isMounted && (Jr(), Bt().forEach(function(k) {
      k._tippy.unmount();
    }), v.parentNode && v.parentNode.removeChild(v), is = is.filter(function(k) {
      return k !== m;
    }), m.state.isMounted = !1, K("onHidden", [m]));
  }
  function nf() {
    process.env.NODE_ENV !== "production" && St(m.state.isDestroyed, Nn("destroy")), !m.state.isDestroyed && (m.clearDelayTimeouts(), m.unmount(), Wr(), delete n._tippy, m.state.isDestroyed = !0, K("onDestroy", [m]));
  }
}
function xn(n, e) {
  e === void 0 && (e = {});
  var t = He.plugins.concat(e.plugins || []);
  process.env.NODE_ENV !== "production" && (bb(n), Ed(e, t)), hb();
  var r = Object.assign({}, e, {
    plugins: t
  }), i = ab(n);
  if (process.env.NODE_ENV !== "production") {
    var o = Nr(r.content), s = i.length > 1;
    St(o && s, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var l = i.reduce(function(a, c) {
    var u = c && Sb(c, r);
    return u && a.push(u), a;
  }, []);
  return Nr(n) ? l[0] : l;
}
xn.defaultProps = He;
xn.setDefaultProps = wb;
xn.currentInput = lt;
Object.assign({}, ud, {
  effect: function(e) {
    var t = e.state, r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow);
  }
});
xn.setDefaultProps({
  render: Ad
});
class Mb {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, updateDelay: o = 250, shouldShow: s }) {
    this.preventHide = !1, this.shouldShow = ({ view: l, state: a, from: c, to: u }) => {
      const { doc: d, selection: f } = a, { empty: h } = f, p = !d.textBetween(c, u).length && gl(a.selection), g = this.element.contains(document.activeElement);
      return !(!(l.hasFocus() || g) || h || p || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.dragstartHandler = () => {
      this.hide();
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: l }) => {
      var a;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      l != null && l.relatedTarget && (!((a = this.element.parentNode) === null || a === void 0) && a.contains(l.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (l) => {
      this.blurHandler({ event: l });
    }, this.handleDebouncedUpdate = (l, a) => {
      const c = !(a != null && a.selection.eq(l.state.selection)), u = !(a != null && a.doc.eq(l.state.doc));
      !c && !u || (this.updateDebounceTimer && clearTimeout(this.updateDebounceTimer), this.updateDebounceTimer = window.setTimeout(() => {
        this.updateHandler(l, c, u, a);
      }, this.updateDelay));
    }, this.updateHandler = (l, a, c, u) => {
      var d, f, h;
      const { state: p, composing: g } = l, { selection: y } = p;
      if (g || !a && !c)
        return;
      this.createTooltip();
      const { ranges: x } = y, T = Math.min(...x.map((v) => v.$from.pos)), m = Math.max(...x.map((v) => v.$to.pos));
      if (!((d = this.shouldShow) === null || d === void 0 ? void 0 : d.call(this, {
        editor: this.editor,
        view: l,
        state: p,
        oldState: u,
        from: T,
        to: m
      }))) {
        this.hide();
        return;
      }
      (f = this.tippy) === null || f === void 0 || f.setProps({
        getReferenceClientRect: ((h = this.tippyOptions) === null || h === void 0 ? void 0 : h.getReferenceClientRect) || (() => {
          if (m0(p.selection)) {
            let v = l.nodeDOM(T);
            const E = v.dataset.nodeViewWrapper ? v : v.querySelector("[data-node-view-wrapper]");
            if (E && (v = E.firstChild), v)
              return v.getBoundingClientRect();
          }
          return ld(l, T, m);
        })
      }), this.show();
    }, this.editor = e, this.element = t, this.view = r, this.updateDelay = o, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = xn(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    const { state: r } = e, i = r.selection.$from.pos !== r.selection.$to.pos;
    if (this.updateDelay > 0 && i) {
      this.handleDebouncedUpdate(e, t);
      return;
    }
    const o = !(t != null && t.selection.eq(e.state.selection)), s = !(t != null && t.doc.eq(e.state.doc));
    this.updateHandler(e, o, s, t);
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.removeEventListener("dragstart", this.dragstartHandler), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Od = (n) => new le({
  key: typeof n.pluginKey == "string" ? new we(n.pluginKey) : n.pluginKey,
  view: (e) => new Mb({ view: e, ...n })
});
ee.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      updateDelay: void 0,
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Od({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
class Eb {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, shouldShow: o }) {
    this.preventHide = !1, this.shouldShow = ({ view: s, state: l }) => {
      const { selection: a } = l, { $anchor: c, empty: u } = a, d = c.depth === 1, f = c.parent.isTextblock && !c.parent.type.spec.code && !c.parent.textContent;
      return !(!s.hasFocus() || !u || !d || !f || !this.editor.isEditable);
    }, this.mousedownHandler = () => {
      this.preventHide = !0;
    }, this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    }, this.blurHandler = ({ event: s }) => {
      var l;
      if (this.preventHide) {
        this.preventHide = !1;
        return;
      }
      s != null && s.relatedTarget && (!((l = this.element.parentNode) === null || l === void 0) && l.contains(s.relatedTarget)) || this.hide();
    }, this.tippyBlurHandler = (s) => {
      this.blurHandler({ event: s });
    }, this.editor = e, this.element = t, this.view = r, o && (this.shouldShow = o), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = xn(e, {
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: !0,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle",
      ...this.tippyOptions
    }), this.tippy.popper.firstChild && this.tippy.popper.firstChild.addEventListener("blur", this.tippyBlurHandler));
  }
  update(e, t) {
    var r, i, o;
    const { state: s } = e, { doc: l, selection: a } = s, { from: c, to: u } = a;
    if (t && t.doc.eq(l) && t.selection.eq(a))
      return;
    if (this.createTooltip(), !((r = this.shouldShow) === null || r === void 0 ? void 0 : r.call(this, {
      editor: this.editor,
      view: e,
      state: s,
      oldState: t
    }))) {
      this.hide();
      return;
    }
    (i = this.tippy) === null || i === void 0 || i.setProps({
      getReferenceClientRect: ((o = this.tippyOptions) === null || o === void 0 ? void 0 : o.getReferenceClientRect) || (() => ld(e, c, u))
    }), this.show();
  }
  show() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.show();
  }
  hide() {
    var e;
    (e = this.tippy) === null || e === void 0 || e.hide();
  }
  destroy() {
    var e, t;
    !((e = this.tippy) === null || e === void 0) && e.popper.firstChild && this.tippy.popper.firstChild.removeEventListener("blur", this.tippyBlurHandler), (t = this.tippy) === null || t === void 0 || t.destroy(), this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.editor.off("focus", this.focusHandler), this.editor.off("blur", this.blurHandler);
  }
}
const Nd = (n) => new le({
  key: typeof n.pluginKey == "string" ? new we(n.pluginKey) : n.pluginKey,
  view: (e) => new Eb({ view: e, ...n })
});
ee.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    return this.options.element ? [
      Nd({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const Ab = Rr({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: [String, Object],
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    updateDelay: {
      type: Number,
      default: void 0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = Pr(null);
    return mo(() => {
      const { updateDelay: r, editor: i, pluginKey: o, shouldShow: s, tippyOptions: l } = n;
      i.registerPlugin(Od({
        updateDelay: r,
        editor: i,
        element: t.value,
        pluginKey: o,
        shouldShow: s,
        tippyOptions: l
      }));
    }), Xs(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return Et("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
function lc(n) {
  return cf((e, t) => ({
    get() {
      return e(), n;
    },
    set(r) {
      n = r, requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          t();
        });
      });
    }
  }));
}
class Ob extends $0 {
  constructor(e = {}) {
    return super(e), this.vueRenderers = go(/* @__PURE__ */ new Map()), this.contentComponent = null, this.reactiveState = lc(this.view.state), this.reactiveExtensionStorage = lc(this.extensionStorage), this.on("transaction", () => {
      this.reactiveState.value = this.view.state, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), Zs(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  /**
   * Register a ProseMirror plugin.
   */
  registerPlugin(e, t) {
    super.registerPlugin(e, t), this.reactiveState.value = this.view.state;
  }
  /**
   * Unregister a ProseMirror plugin.
   */
  unregisterPlugin(e) {
    super.unregisterPlugin(e), this.reactiveState.value = this.view.state;
  }
}
const Nb = Rr({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(n) {
    const e = Pr(), t = of();
    return sf(() => {
      const r = n.editor;
      r && r.options.element && e.value && lf(() => {
        if (!e.value || !r.options.element.firstChild)
          return;
        const i = hi(e.value);
        e.value.append(...r.options.element.childNodes), r.contentComponent = t.ctx._, r.setOptions({
          element: i
        }), r.createNodeViews();
      });
    }), Xs(() => {
      const r = n.editor;
      if (!r || (r.isDestroyed || r.view.setProps({
        nodeViews: {}
      }), r.contentComponent = null, !r.options.element.firstChild))
        return;
      const i = document.createElement("div");
      i.append(...r.options.element.childNodes), r.setOptions({
        element: i
      });
    }), { rootEl: e };
  },
  render() {
    const n = [];
    return this.editor && this.editor.vueRenderers.forEach((e) => {
      const t = Et(af, {
        to: e.teleportElement,
        key: e.id
      }, Et(e.component, {
        ref: e.id,
        ...e.props
      }));
      n.push(t);
    }), Et("div", {
      ref: (e) => {
        this.rootEl = e;
      }
    }, ...n);
  }
}), Db = Rr({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      // TODO: TypeScript breaks :(
      // type: [String, Object as PropType<Exclude<FloatingMenuPluginProps['pluginKey'], string>>],
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: !0
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(n, { slots: e }) {
    const t = Pr(null);
    return mo(() => {
      const { pluginKey: r, editor: i, tippyOptions: o, shouldShow: s } = n;
      i.registerPlugin(Nd({
        pluginKey: r,
        editor: i,
        element: t.value,
        tippyOptions: o,
        shouldShow: s
      }));
    }), Xs(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return Et("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
Rr({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return Et(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
const Bb = Rr({
  name: "NodeViewWrapper",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var n, e;
    return Et(this.as, {
      // @ts-ignore
      class: this.decorationClasses,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      // @ts-ignore (https://github.com/vuejs/vue-next/issues/3031)
      onDragstart: this.onDragStart
    }, (e = (n = this.$slots).default) === null || e === void 0 ? void 0 : e.call(n));
  }
});
class Lb {
  constructor(e, { props: t = {}, editor: r }) {
    if (this.id = Math.floor(Math.random() * 4294967295).toString(), this.editor = r, this.component = Zs(e), this.teleportElement = document.createElement("div"), this.element = this.teleportElement, this.props = go(t), this.editor.vueRenderers.set(this.id, this), this.editor.contentComponent) {
      if (this.editor.contentComponent.update(), this.teleportElement.children.length !== 1)
        throw Error("VueRenderer doesn’t support multiple child elements.");
      this.element = this.teleportElement.firstElementChild;
    }
  }
  get ref() {
    var e;
    return (e = this.editor.contentComponent) === null || e === void 0 ? void 0 : e.refs[this.id];
  }
  updateProps(e = {}) {
    Object.entries(e).forEach(([t, r]) => {
      this.props[t] = r;
    });
  }
  destroy() {
    this.editor.vueRenderers.delete(this.id);
  }
}
const Ib = {
  editor: {
    type: Object,
    required: !0
  },
  node: {
    type: Object,
    required: !0
  },
  decorations: {
    type: Object,
    required: !0
  },
  selected: {
    type: Boolean,
    required: !0
  },
  extension: {
    type: Object,
    required: !0
  },
  getPos: {
    type: Function,
    required: !0
  },
  updateAttributes: {
    type: Function,
    required: !0
  },
  deleteNode: {
    type: Function,
    required: !0
  }
}, Rb = ee.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left"
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (n) => n.style.textAlign || this.options.defaultAlignment,
            renderHTML: (n) => n.textAlign === this.options.defaultAlignment ? {} : { style: `text-align: ${n.textAlign}` }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (n) => ({ commands: e }) => this.options.alignments.includes(n) ? this.options.types.map((t) => e.updateAttributes(t, { textAlign: n })).every((t) => t) : !1,
      unsetTextAlign: () => ({ commands: n }) => this.options.types.map((e) => n.resetAttributes(e, "textAlign")).every((e) => e)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
    };
  }
});
(function() {
  try {
    if (typeof document < "u") {
      var n = document.createElement("style");
      n.appendChild(document.createTextNode(".modal-container{position:fixed;left:0;top:0;height:100%;width:100%;display:flex;align-items:center;justify-content:center;background-color:#3e3e3e21;cursor:pointer}.modal-item{cursor:default}.modal-list-enter-active,.modal-list-leave-active,.modal-list-enter-active .modal-item,.modal-list-leave-active .modal-item{transition:all .2s ease}.modal-list-enter-from,.modal-list-leave-to{opacity:0!important}.modal-list-enter-from .modal-item,.modal-list-leave-to .modal-item{transform:translateY(-60px)}")), document.head.appendChild(n);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
/*!
  * jenesius-vue-modal v1.11.3
  * (c) 2024 Jenesius
  * @license MIT
  */
var _s = function(n, e) {
  return _s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var i in r)
      Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }, _s(n, e);
};
function Pb(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  _s(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function ac(n, e, t, r) {
  function i(o) {
    return o instanceof t ? o : new t(function(s) {
      s(o);
    });
  }
  return new (t || (t = Promise))(function(o, s) {
    function l(u) {
      try {
        c(r.next(u));
      } catch (d) {
        s(d);
      }
    }
    function a(u) {
      try {
        c(r.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      u.done ? o(u.value) : i(u.value).then(l, a);
    }
    c((r = r.apply(n, e || [])).next());
  });
}
function cc(n, e) {
  var t = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, r, i, o, s;
  return s = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function l(c) {
    return function(u) {
      return a([c, u]);
    };
  }
  function a(c) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, c[0] && (t = 0)), t; )
      try {
        if (r = 1, i && (o = c[0] & 2 ? i.return : c[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, c[1])).done)
          return o;
        switch (i = 0, o && (c = [c[0] & 2, o.value]), c[0]) {
          case 0:
          case 1:
            o = c;
            break;
          case 4:
            return t.label++, { value: c[1], done: !1 };
          case 5:
            t.label++, i = c[1], c = [0];
            continue;
          case 7:
            c = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (o = t.trys, !(o = o.length > 0 && o[o.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              t = 0;
              continue;
            }
            if (c[0] === 3 && (!o || c[1] > o[0] && c[1] < o[3])) {
              t.label = c[1];
              break;
            }
            if (c[0] === 6 && t.label < o[1]) {
              t.label = o[1], o = c;
              break;
            }
            if (o && t.label < o[2]) {
              t.label = o[2], t.ops.push(c);
              break;
            }
            o[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        c = e.call(n, t);
      } catch (u) {
        c = [6, u], i = 0;
      } finally {
        r = o = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
var Kt = (
  /** @class */
  function(n) {
    Pb(e, n);
    function e(t, r) {
      r === void 0 && (r = null);
      var i = n.call(this) || this;
      return i.isModalError = !0, i.message = t, i.details = r, i;
    }
    return e.Undefined = function(t) {
      return new e("Modal with id: ".concat(t, " not founded. The modal window may have been closed earlier."));
    }, e.UndefinedGuardName = function(t) {
      return new e("Guard's name ".concat(t, " is not declaration."));
    }, e.NextReject = function(t) {
      return new e("Guard returned false. Modal navigation was stopped. Modal id ".concat(t));
    }, e.GuardDeclarationType = function(t) {
      return new e("Guard's type should be a function. Provided:", t);
    }, e.ConfigurationType = function(t) {
      return new e("Configuration type must be an Object. Provided", t);
    }, e.ConfigurationUndefinedParam = function(t, r) {
      return new e("In configuration founded unknown parameter: ".concat(t, ". Available are ").concat(r.join(", "), " "));
    }, e.QueueNoEmpty = function() {
      return new e("Modal's queue is not empty. Probably some modal reject closing by onClose hook.");
    }, e.EmptyModalQueue = function() {
      return new e("Modal queue is empty.");
    }, e.NotInitialized = function(t) {
      return new e("Modal Container not found. Put container from jenesius-vue-modal in App's template. Namespace: ".concat(t, ". Check documentation for more information https://modal.jenesius.com/docs.html/installation#getting-started."));
    }, e.ModalComponentNotProvided = function() {
      return new e("The first parameter(VueComponent) was not specified.");
    }, e.DuplicatedRouterIntegration = function() {
      return new e("useModalRouter.init should escaped only once.");
    }, e.ModalRouterIntegrationNotInitialized = function() {
      return new e("The integration was not initialized. Please, use useModalRouter.init(router). For more information: https://modal.jenesius.com/docs.html/integration-vue-router#installation");
    }, e.ModalEventNameMustBeString = function(t) {
      return new e("Event name must be a string. Provided: ".concat(t));
    }, e.ModalNotFoundByID = function(t) {
      return new e("Modal with ID ".concat(t, " was not found."));
    }, e.ModalNotExistsInStore = function(t) {
      return new e("Provided name(".concat(t, ") don't exist in the store. Has the given name been added to the store?"));
    }, e;
  }(Error)
), jn = (
  /** @class */
  function() {
    function n() {
      this.state = /* @__PURE__ */ new Map(), n.instance = this;
    }
    return n.prototype.getByName = function(e) {
      return e === void 0 && (e = n.DEFAULT_NAMESPACE), this.state.has(e) || this.state.set(e, {
        queue: go([]),
        initialized: !1
      }), this.state.get(e);
    }, n.prototype.forceClean = function() {
      this.state.forEach(function(e) {
        e.queue.splice(0, e.queue.length);
      });
    }, n.DEFAULT_NAMESPACE = "default", n;
  }()
), Dd = function() {
  var n = new jn(), e = {
    scrollLock: !0,
    animation: "modal-list",
    backgroundClose: !0,
    escClose: !0,
    store: {},
    skipInitCheck: !1,
    draggable: !1
  }, t = n.getByName().queue;
  return Nc(function() {
    return t;
  }, function() {
    t.length ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto";
  }, { deep: !0 }), {
    namespaceStore: n,
    configuration: e
  };
}();
function Zt(n) {
  return Dd.namespaceStore.getByName(n);
}
var Br = Dd.configuration;
function Bd(n) {
  var e = {
    backgroundClose: Br.backgroundClose,
    isRoute: !1,
    namespace: jn.DEFAULT_NAMESPACE,
    draggable: Br.draggable
  };
  return n.backgroundClose !== void 0 && (e.backgroundClose = n.backgroundClose), n.isRoute && (e.isRoute = n.isRoute), n.namespace && (e.namespace = n.namespace), n.draggable !== void 0 && (e.draggable = n.draggable), e;
}
function uc(n) {
  n === void 0 && (n = {});
  var e = {
    background: !1,
    esc: !1
  };
  return Object.assign(e, n);
}
function Ld(n) {
  return n || (n = {}), n;
}
function Al(n, e) {
  e === void 0 && (e = {});
  var t = $r.STORE.get(n);
  if (!t)
    return Promise.reject(Kt.ModalNotFoundByID(n));
  var r = Zt(t.namespace), i = r.queue.findIndex(function(s) {
    return s.id === n;
  });
  if (i === -1)
    return Promise.reject(Kt.Undefined(n));
  var o = $n.get(n, "close").map(function(s) {
    return Hb(s, n, uc(e));
  });
  return Rd(o).then(function() {
    r.queue.splice(i, 1);
  }).then(function() {
    $n.get(n, "destroy").forEach(function(s) {
      return s(uc(e));
    });
  }).then(function() {
    $n.delete(n);
  });
}
var $r = (
  /** @class */
  function() {
    function n(e, t, r) {
      var i = this;
      this.events = go({}), this.backgroundClose = !0, this.isRoute = !1, this.id = n.modalId++, this.component = e, this.props = Pr(t), this.closed = uf(function() {
        return !Zt(r.namespace).queue.includes(i);
      }), e.beforeModalClose && $n.add(this.id, "close", e.beforeModalClose);
      var o = Bd(r);
      this.backgroundClose = o.backgroundClose, this.isRoute = o.isRoute, this.namespace = o.namespace, this.draggable = o.draggable, n.STORE.set(this.id, this);
    }
    return n.prototype.close = function() {
      return Al(this.id);
    }, Object.defineProperty(n.prototype, "onclose", {
      /**
       * @description Hook for handling modal closing
       * */
      set: function(e) {
        $n.add(this.id, "close", e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "ondestroy", {
      /**
       * @description Hook for handling modal closing
       * */
      set: function(e) {
        $n.add(this.id, "destroy", e);
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.on = function(e, t) {
      var r = this;
      return Array.isArray(this.events[e]) || (this.events[e] = []), this.events[e].push(t), function() {
        var i = r.events[e].indexOf(t);
        i !== -1 && r.events[e].splice(i, 1);
      };
    }, n.STORE = /* @__PURE__ */ new Map(), n.modalId = 0, n.EVENT_PROMPT = "jenesius-vue-modal:____P____R____O____M____P____T", n;
  }()
);
function Id(n) {
  return $r.STORE.get(n);
}
var Fb = {
  store: {},
  add: function(n, e, t) {
    var r, i;
    if (typeof t != "function")
      throw Kt.GuardDeclarationType(t);
    this.store[n] || (this.store[n] = (r = {}, r[e] = [], r)), this.store[n][e] || (this.store[n][e] = []), (i = this.store[n][e]) === null || i === void 0 || i.push(t);
  },
  get: function(n, e) {
    return n in this.store ? e in this.store[n] ? this.store[n][e] || [] : [] : [];
  },
  delete: function(n) {
    n in this.store && delete this.store[n];
  }
};
const $n = Fb;
function Rd(n) {
  return n.reduce(function(e, t) {
    return e.then(function() {
      return t();
    });
  }, Promise.resolve());
}
function Hb(n, e, t) {
  return function() {
    return new Promise(function(r, i) {
      var o, s = function(l) {
        l === void 0 && (l = !0), l === !1 && i(Kt.NextReject(e)), r();
      };
      Promise.resolve(n.call((o = Id(e)) === null || o === void 0 ? void 0 : o.instance, t)).then(s).catch(function(l) {
        return i(l);
      });
    });
  };
}
function Pd(n) {
  return n = Ld(n), Rd(Zt(n.namespace).queue.map(function(e) {
    return function() {
      return e.close();
    };
  }));
}
function Fd(n) {
  var e = Zt(n), t = e.queue;
  if (t.length !== 0)
    return t[t.length - 1];
}
function Do(n) {
  n = Ld(n);
  var e = Fd(n.namespace);
  return e ? e.close() : Promise.resolve();
}
function zb(n, e, t) {
  var r = Bd(t), i = Zt(r.namespace);
  if (r.namespace === jn.DEFAULT_NAMESPACE && !i.initialized && !Br.skipInitCheck)
    throw Kt.NotInitialized(r.namespace);
  if (typeof n == "string") {
    var o = jb(n);
    if (!o)
      throw Kt.ModalNotExistsInStore(n);
    n = o;
  }
  if (!n)
    throw Kt.ModalComponentNotProvided();
  var s = new $r(n, e, r);
  return i.queue.push(Zs(s)), s;
}
function Hd(n, e, t) {
  return e === void 0 && (e = {}), t === void 0 && (t = {}), Promise.resolve().then(function() {
    return zb(n, e, t);
  });
}
function Vb(n, e, t) {
  return e === void 0 && (e = {}), t === void 0 && (t = {}), Pd({
    namespace: t.namespace
  }).then(function() {
    var r = Zt(t.namespace);
    if (r.queue.length)
      throw Kt.QueueNoEmpty();
  }).then(function() {
    return Hd(n, e, t);
  });
}
function _b(n, e, t) {
  return e === void 0 && (e = {}), t === void 0 && (t = {}), ac(this, void 0, void 0, function() {
    var r, i, o = this;
    return cc(this, function(s) {
      switch (s.label) {
        case 0:
          return [4, Hd(n, e, t)];
        case 1:
          return r = s.sent(), i = !1, [2, new Promise(function(l) {
            r.on($r.EVENT_PROMPT, function(a) {
              return ac(o, void 0, void 0, function() {
                return cc(this, function(c) {
                  return i = !0, [2, r.close().then(function() {
                    return l(a);
                  }).catch(function() {
                    return i = !1;
                  })];
                });
              });
            }), r.ondestroy = function() {
              i || l(null);
            };
          })];
      }
    });
  });
}
function jb(n) {
  return Br.store[n] || void 0;
}
function $b(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var js = { exports: {} }, ss, dc;
function Wb() {
  if (dc)
    return ss;
  dc = 1;
  var n = 1e3, e = n * 60, t = e * 60, r = t * 24, i = r * 7, o = r * 365.25;
  ss = function(u, d) {
    d = d || {};
    var f = typeof u;
    if (f === "string" && u.length > 0)
      return s(u);
    if (f === "number" && isFinite(u))
      return d.long ? a(u) : l(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function s(u) {
    if (u = String(u), !(u.length > 100)) {
      var d = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (d) {
        var f = parseFloat(d[1]), h = (d[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return f * o;
          case "weeks":
          case "week":
          case "w":
            return f * i;
          case "days":
          case "day":
          case "d":
            return f * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return f * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return f * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return f * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return f;
          default:
            return;
        }
      }
    }
  }
  function l(u) {
    var d = Math.abs(u);
    return d >= r ? Math.round(u / r) + "d" : d >= t ? Math.round(u / t) + "h" : d >= e ? Math.round(u / e) + "m" : d >= n ? Math.round(u / n) + "s" : u + "ms";
  }
  function a(u) {
    var d = Math.abs(u);
    return d >= r ? c(u, d, r, "day") : d >= t ? c(u, d, t, "hour") : d >= e ? c(u, d, e, "minute") : d >= n ? c(u, d, n, "second") : u + " ms";
  }
  function c(u, d, f, h) {
    var p = d >= f * 1.5;
    return Math.round(u / f) + " " + h + (p ? "s" : "");
  }
  return ss;
}
function qb(n) {
  t.debug = t, t.default = t, t.coerce = a, t.disable = o, t.enable = i, t.enabled = s, t.humanize = Wb(), t.destroy = c, Object.keys(n).forEach((u) => {
    t[u] = n[u];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(u) {
    let d = 0;
    for (let f = 0; f < u.length; f++)
      d = (d << 5) - d + u.charCodeAt(f), d |= 0;
    return t.colors[Math.abs(d) % t.colors.length];
  }
  t.selectColor = e;
  function t(u) {
    let d, f = null, h, p;
    function g(...y) {
      if (!g.enabled)
        return;
      const b = g, x = Number(/* @__PURE__ */ new Date()), T = x - (d || x);
      b.diff = T, b.prev = d, b.curr = x, d = x, y[0] = t.coerce(y[0]), typeof y[0] != "string" && y.unshift("%O");
      let m = 0;
      y[0] = y[0].replace(/%([a-zA-Z%])/g, (w, v) => {
        if (w === "%%")
          return "%";
        m++;
        const E = t.formatters[v];
        if (typeof E == "function") {
          const L = y[m];
          w = E.call(b, L), y.splice(m, 1), m--;
        }
        return w;
      }), t.formatArgs.call(b, y), (b.log || t.log).apply(b, y);
    }
    return g.namespace = u, g.useColors = t.useColors(), g.color = t.selectColor(u), g.extend = r, g.destroy = t.destroy, Object.defineProperty(g, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => f !== null ? f : (h !== t.namespaces && (h = t.namespaces, p = t.enabled(u)), p),
      set: (y) => {
        f = y;
      }
    }), typeof t.init == "function" && t.init(g), g;
  }
  function r(u, d) {
    const f = t(this.namespace + (typeof d > "u" ? ":" : d) + u);
    return f.log = this.log, f;
  }
  function i(u) {
    t.save(u), t.namespaces = u, t.names = [], t.skips = [];
    let d;
    const f = (typeof u == "string" ? u : "").split(/[\s,]+/), h = f.length;
    for (d = 0; d < h; d++)
      f[d] && (u = f[d].replace(/\*/g, ".*?"), u[0] === "-" ? t.skips.push(new RegExp("^" + u.slice(1) + "$")) : t.names.push(new RegExp("^" + u + "$")));
  }
  function o() {
    const u = [
      ...t.names.map(l),
      ...t.skips.map(l).map((d) => "-" + d)
    ].join(",");
    return t.enable(""), u;
  }
  function s(u) {
    if (u[u.length - 1] === "*")
      return !0;
    let d, f;
    for (d = 0, f = t.skips.length; d < f; d++)
      if (t.skips[d].test(u))
        return !1;
    for (d = 0, f = t.names.length; d < f; d++)
      if (t.names[d].test(u))
        return !0;
    return !1;
  }
  function l(u) {
    return u.toString().substring(2, u.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function a(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function c() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Kb = qb;
(function(n, e) {
  e.formatArgs = r, e.save = i, e.load = o, e.useColors = t, e.storage = s(), e.destroy = (() => {
    let a = !1;
    return () => {
      a || (a = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r(a) {
    if (a[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + a[0] + (this.useColors ? "%c " : " ") + "+" + n.exports.humanize(this.diff), !this.useColors)
      return;
    const c = "color: " + this.color;
    a.splice(1, 0, c, "color: inherit");
    let u = 0, d = 0;
    a[0].replace(/%[a-zA-Z%]/g, (f) => {
      f !== "%%" && (u++, f === "%c" && (d = u));
    }), a.splice(d, 0, c);
  }
  e.log = console.debug || console.log || (() => {
  });
  function i(a) {
    try {
      a ? e.storage.setItem("debug", a) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function o() {
    let a;
    try {
      a = e.storage.getItem("debug");
    } catch {
    }
    return !a && typeof process < "u" && "env" in process && (a = process.env.DEBUG), a;
  }
  function s() {
    try {
      return localStorage;
    } catch {
    }
  }
  n.exports = Kb(e);
  const { formatters: l } = n.exports;
  l.j = function(a) {
    try {
      return JSON.stringify(a);
    } catch (c) {
      return "[UnexpectedJSONParseError]: " + c.message;
    }
  };
})(js, js.exports);
var Ub = js.exports;
const Jb = /* @__PURE__ */ $b(Ub);
function Gb(n) {
  return Jb("jenesius-vue-modal:".concat(n));
}
const Yb = ["onPointerdown"], fc = {
  __name: "WidgetModalContainerItem",
  props: {
    id: Number
  },
  setup(n) {
    const e = Pr(null), t = Gb("modal-item"), r = n, i = Id(r.id);
    function o() {
      if (i.backgroundClose)
        return Al(i.id, { background: !0 }).catch(() => {
        });
    }
    Nc(() => e.value, (l) => {
      i.instance = l;
    }), mo(() => {
      i.draggable && (t("The modal window is movable."), s(
        document.querySelector(
          typeof i.draggable == "string" ? i.draggable : `[modalid=_modal_${r.id}]`
        )
      ));
    });
    function s(l) {
      if (!l) {
        t("draggable item not found.");
        return;
      }
      const a = document.querySelector(`[modalid=_modal_${r.id}]`);
      l.addEventListener("pointerdown", (c) => {
        var u;
        const d = (u = a.getAttribute("style")) == null ? void 0 : u.match(/transform: translate\((.*)px,\s*(.*)px\)/);
        let f = d == null ? void 0 : d[1], h = d == null ? void 0 : d[2];
        f = typeof f == "string" ? Number.parseInt(f) : 0, h = typeof h == "string" ? Number.parseInt(h) : 0;
        const { clientX: p, clientY: g } = c, y = p, b = g;
        t(`movement started at (${b}, ${b})`), document.addEventListener("pointermove", x, { passive: !0 }), document.addEventListener("pointerup", T, { once: !0 });
        function x(m) {
          const { clientX: w, clientY: v } = m, E = f + w - y, L = h + v - b;
          t(`move at (${E}, ${L})`), a.style.transform = `translate(${E}px,${L}px)`;
        }
        function T(m) {
          t("movement completed"), document.removeEventListener("pointermove", x), m.preventDefault();
        }
      });
    }
    return (l, a) => (O(), P("div", {
      class: "widget__modal-container__item modal-container",
      onPointerdown: Oe(o, ["self", "stop"])
    }, [
      (O(), be(ff(hi(i).component), hf(hi(i).props.value, {
        class: "modal-item widget__modal-wrap",
        modalId: `_modal_${n.id}`,
        ref_key: "modalRef",
        ref: e
      }, pf(hi(i).events)), null, 16, ["modalId"]))
    ], 40, Yb));
  }
};
function Qb(n) {
  n === void 0 && (n = jn.DEFAULT_NAMESPACE);
  var e = jn.instance.getByName(n);
  e.initialized = !0, n === jn.DEFAULT_NAMESPACE && document.addEventListener("keyup", function(t) {
    if (t.key === "Escape" || t.code === "Escape") {
      var r = Fd(n);
      if (!r)
        return;
      Al(r.id, { esc: !0 }).catch(function() {
      });
    }
  });
}
const Xb = {
  props: {
    namespace: String
  },
  setup(n) {
    return mo(() => {
      Qb(n.namespace);
    }), () => {
      const e = Zt(n.namespace);
      return Et(df, { name: Br.animation, tag: "div" }, {
        default: () => e.queue.map((t) => Et(fc, {
          key: t.id,
          id: t.id
        }))
      });
    };
  },
  components: { WidgetContainerModalItem: fc }
};
Zt().queue;
function ls(n) {
  return n && typeof n == "object" && !Array.isArray(n);
}
function Zb(n) {
  return n && typeof n == "object" && Array.isArray(n);
}
function zd(n, e) {
  if (ls(n) && ls(e))
    for (const t in e)
      ls(e[t]) ? (n[t] || Object.assign(n, { [t]: {} }), zd(n[t], e[t])) : Zb(e[t]) ? (n[t] || (n[t] = []), yi(n[t], e[t])) : Object.assign(n, { [t]: e[t] });
  return n;
}
const yi = function(n, e) {
  return e === !1 ? [] : (e.forEach((t, r) => {
    !n || !n.find((i) => i.name == t.name) ? n.push(t) : zd(
      n.find((i) => i.name == t.name),
      t
    );
  }), n);
}, ev = ee.create({
  name: "blockWidth",
  addOptions() {
    return {
      types: [],
      alignments: ["normal", "wide", "full"],
      defaultAlignment: "normal"
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          blockWidth: {
            default: this.options.defaultAlignment,
            parseHTML: (n) => n.dataset.blockWidth || this.options.defaultAlignment,
            renderHTML: (n) => n.blockWidth === this.options.defaultAlignment ? {} : { "data-block-width": n.blockWidth }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setBlockWidth: (n) => ({ commands: e, view: t }) => this.options.alignments.includes(n) ? (e.updateAttributes(wh(t).type.name, {
        blockWidth: n
      }), !0) : !1,
      unsetBlockWidth: () => ({ commands: n }) => this.options.types.every(
        (e) => n.resetAttributes(e, "blockWidth")
      )
    };
  },
  addKeyboardShortcuts() {
    return {
      // 'Mod-Shift-l': () => this.editor.commands.setTextAlign('left'),
      // 'Mod-Shift-e': () => this.editor.commands.setTextAlign('center'),
      // 'Mod-Shift-r': () => this.editor.commands.setTextAlign('right'),
      // 'Mod-Shift-j': () => this.editor.commands.setTextAlign('justify'),
    };
  }
}), tv = ee.create({
  name: "vuebergBlocks",
  addOptions() {
    return {
      blocks: []
    };
  },
  addCommands() {
    return {
      getNodeIndex: (n) => ({ editor: e }) => {
        let t = null;
        return e.view.state.doc.descendants((o, s, l, a) => {
          if (o.attrs.id === n.attrs.id)
            return t = a, !1;
        }), t;
      },
      getCurrentNodeName: () => ({ editor: n }) => {
        let e = n.commands.getCurrentNode();
        return e == null ? null : e.type.name;
      },
      getCurrentNode: (n = !0) => ({ editor: e }) => {
        const t = uu(e);
        return n == !0 && (this.storage.currentNode = t), t;
      }
      // updateInsertionPlugin: (newBlocks) => ({ editor }) => {
      //   // this.options.allowedBlocks = newBlocks;
      //   // Обновляем состояние редактора, чтобы применить новые разрешенные блоки
      //   editor.view.updateState(editor.state.reconfigure({ plugins: editor.state.plugins }));
      // }
    };
  },
  onCreate() {
    this.options.blocks.forEach((t) => {
      t.blocks.forEach((r) => {
        r.extension = this.editor.extensionManager.extensions.find((i) => i.name === r.name && i.type == "node");
      });
    });
    const e = this.options.blocks.flatMap((t) => t.blocks.map((r) => r.name)).filter((t, r, i) => i.indexOf(t) !== r);
    e.length > 0 && console.warn(`[VuebergBlocks]: Duplicate block names found: ${[...new Set(e)].join(", ")}`);
  },
  addStorage() {
    return {
      flatBlocksCache: null,
      currentBlockTool: null,
      currentNode: null,
      allowedBlocks: !0,
      getFlatBlocks: (n = (e) => e) => (this.flatBlocksCache || (this.flatBlocksCache = this.options.blocks.flatMap((e) => e.blocks.map(n))), this.flatBlocksCache),
      getBlockTool(n) {
        var t;
        if (((t = this.currentBlockTool) == null ? void 0 : t.nodeType) == n)
          return this.currentBlockTool;
        let e = this.getFlatBlocks().find(
          (r) => r.name === n || r.tools && r.tools.some((i) => i.name === n)
        );
        return e != null ? e.nodeType = n : e = {
          nodeType: n
        }, this.currentBlockTool = e, e;
      },
      hasAllowedBlocks(n, e) {
        return this.getAllowedBlocks(n, e).length > 0;
      },
      getAllowedBlocks(n, e) {
        if (typeof this.allowedBlocks == Object && this.allowedBlocks.node.attrs.id == n.attrs.id)
          return this.allowedBlocks.blocks;
        let t = this.loadAllowedBlocks(n, this.getFlatBlocks());
        return n.parent == null && (t = t.filter((r) => {
          const i = e.schema.nodes[r.name];
          if (!i)
            return !1;
          const o = e.state.selection.$from;
          return o.node(-1) ? o.node(-1).canReplaceWith(o.index(-1), o.indexAfter(-1), i) : !1;
        })), this.allowedBlocks = {
          node: n,
          blocks: t
        }, this.allowedBlocks.blocks;
      },
      loadAllowedBlocks(n, e) {
        var i, o, s, l;
        const t = this.getBlockByName(n.type.name), r = n.type.spec.content;
        if (t) {
          if (((i = t.settings) == null ? void 0 : i.allowedBlocks) === !1)
            return [];
          typeof ((o = t.settings) == null ? void 0 : o.allowedBlocks) == "object" && (e = e.filter((a) => {
            var c;
            return (c = t.settings) == null ? void 0 : c.allowedBlocks[a.name];
          }));
        }
        if (r === "block+" || r.includes("block"))
          return e;
        if (r.includes("text") || r.includes("inline"))
          return n.depth === 1 && (((s = t == null ? void 0 : t.settings) == null ? void 0 : s.allowedBlocks) === !0 || typeof ((l = t == null ? void 0 : t.settings) == null ? void 0 : l.allowedBlocks) == "object") ? e : [];
        if (!r.includes("text") && !r.includes("inline")) {
          const a = r.match(/[\w]+/g) || [];
          e = e.filter((c) => a.includes(c.name));
        }
        return n.depth > 1 && n.parent ? this.loadAllowedBlocks(n.parent, e) : e;
      },
      getAllowedBlocksByGroups(n, e) {
        const t = this.getAllBlocks(), r = this.getAllowedBlocks(n, e), i = new Set(r.map((s) => s.name)), o = [];
        return t.forEach((s) => {
          const l = s.blocks.filter((a) => i.has(a.name));
          l.length > 0 && o.push({
            ...s,
            blocks: l
          });
        }), o;
      },
      getBlockByName(n) {
        return this.getFlatBlocks().find((e) => e.name === n);
      },
      getAllBlocksWithoutGroups() {
        return this.getFlatBlocks();
      },
      getAllBlocks: () => this.options.blocks
    };
  }
}), nv = {
  name: "DefaultModalLayout",
  props: {
    closeOnBackdropClick: {
      type: Boolean,
      default: !0
    },
    closable: {
      type: Boolean,
      default: !0
    },
    showHeader: {
      type: Boolean,
      default: !0
    },
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "sm"
    },
    editor: {
      type: [Object, Function],
      required: !0
    },
    form: {
      type: [Object, Array],
      default: []
    },
    okButton: {
      type: String,
      default: " Ok"
    },
    cancelButton: {
      type: String,
      default: "Cancel"
    }
  },
  components: {
    MenuButton: el
  },
  mounted() {
    this.$nextTick(() => {
      this.closable && document.addEventListener("keydown", this.handleEsc);
    });
  },
  beforeDestroy() {
    this.closable && document.removeEventListener("keydown", this.handleEsc);
  },
  methods: {
    clickBackdrop() {
      if (!this.closable || !this.closeOnBackdropClick)
        return !1;
      this.hideModal();
    },
    hideModal() {
      Do();
    },
    okHandler() {
      this.$emit($r.EVENT_PROMPT, this.form);
    },
    handleEsc(n) {
      n.key === "Escape" && (n.preventDefault(), this.hideModal());
    }
  }
}, rv = {
  class: "vueberg-modal-layout",
  role: "dialog",
  "aria-modal": "true",
  tabindex: "-1"
}, iv = {
  key: 0,
  class: "vueberg-modal-header"
}, ov = { class: "vueberg-modal-header-title" }, sv = /* @__PURE__ */ F("svg", {
  width: "24px",
  height: "24px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ F("g", null, [
    /* @__PURE__ */ F("path", {
      id: "Vector",
      d: "M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ])
], -1), lv = [
  sv
], av = { class: "vueberg-modal-body" }, cv = { class: "vueberg-form" }, uv = ["for"], dv = ["id", "placeholder", "autofocus", "onUpdate:modelValue"], fv = ["innerHTML"], hv = { class: "vueberg-form-buttons" };
function pv(n, e, t, r, i, o) {
  const s = qe("menu-button");
  return O(), P("div", rv, [
    F("div", {
      class: "vueberg-modal-backdrop",
      onClick: e[0] || (e[0] = (...l) => o.clickBackdrop && o.clickBackdrop(...l))
    }),
    F("div", {
      class: Ot(["vueberg-modal", `vueberg-modal-${t.size}`]),
      tabindex: "0"
    }, [
      t.showHeader ? (O(), P("div", iv, [
        F("div", ov, Ke(t.title), 1),
        t.closable ? (O(), P("div", {
          key: 0,
          class: "vueberg-modal-header-close",
          onClick: e[1] || (e[1] = (...l) => o.hideModal && o.hideModal(...l))
        }, lv)) : X("", !0)
      ])) : X("", !0),
      F("div", av, [
        F("div", cv, [
          (O(!0), P(Ae, null, $e(t.form, (l, a) => (O(), P("div", {
            class: "vueberg-form-item",
            key: a
          }, [
            F("label", {
              for: `vueberg-modal-input-${l.name}-${a}`
            }, Ke(l.label), 9, uv),
            Dc(F("input", {
              id: `vueberg-modal-input-${l.name}-${a}`,
              placeholder: l.placeholder,
              autofocus: a == 0,
              class: "vueberg-form-control",
              type: "text",
              "onUpdate:modelValue": (c) => l.value = c
            }, null, 8, dv), [
              [mf, l.value]
            ]),
            l.text ? (O(), P("small", {
              key: 0,
              innerHTML: l.text
            }, null, 8, fv)) : X("", !0)
          ]))), 128)),
          F("div", hv, [
            at(s, {
              class: "vueberg-button-lg vueberg-button-secondary vueberg-button-text vueberg-button-text-only",
              onClick: Oe(o.hideModal, ["prevent"]),
              content: t.cancelButton
            }, null, 8, ["onClick", "content"]),
            at(s, {
              class: "vueberg-button-lg vueberg-button-primary vueberg-button-text vueberg-button-text-only",
              onClick: Oe(o.okHandler, ["prevent"]),
              content: t.okButton
            }, null, 8, ["onClick", "content"])
          ])
        ])
      ])
    ], 2)
  ]);
}
const mv = /* @__PURE__ */ gt(nv, [["render", pv]]), gv = {
  name: "DefaultContentLayout",
  props: {
    closeOnBackdropClick: {
      type: Boolean,
      default: !0
    },
    closable: {
      type: Boolean,
      default: !0
    },
    showHeader: {
      type: Boolean,
      default: !0
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      default: null
    },
    size: {
      type: String,
      default: "sm"
    },
    editor: {
      type: [Object, Function],
      required: !0
    }
  },
  methods: {
    clickBackdrop() {
      if (!this.closable || !this.closeOnBackdropClick)
        return !1;
      this.hideModal();
    },
    hideModal() {
      Do();
    }
  }
}, yv = { class: "vueberg-modal-layout" }, bv = {
  key: 0,
  class: "vueberg-modal-header"
}, vv = { class: "vueberg-modal-header-title" }, kv = /* @__PURE__ */ F("svg", {
  width: "24px",
  height: "24px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ F("g", null, [
    /* @__PURE__ */ F("path", {
      id: "Vector",
      d: "M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ])
], -1), wv = [
  kv
], xv = ["innerHTML"];
function Cv(n, e, t, r, i, o) {
  return O(), P("div", yv, [
    F("div", {
      class: "vueberg-modal-backdrop",
      onClick: e[0] || (e[0] = (...s) => o.clickBackdrop && o.clickBackdrop(...s))
    }),
    F("div", {
      class: Ot(["vueberg-modal", `vueberg-modal-${t.size}`])
    }, [
      t.showHeader ? (O(), P("div", bv, [
        F("div", vv, Ke(t.title), 1),
        t.closable ? (O(), P("div", {
          key: 0,
          class: "vueberg-modal-header-close",
          onClick: e[1] || (e[1] = (...s) => o.hideModal && o.hideModal(...s))
        }, wv)) : X("", !0)
      ])) : X("", !0),
      t.content ? (O(), P("div", {
        key: 1,
        class: "vueberg-modal-body",
        innerHTML: t.content
      }, null, 8, xv)) : X("", !0)
    ], 2)
  ]);
}
const Tv = /* @__PURE__ */ gt(gv, [["render", Cv]]), Sv = ee.create({
  name: "modal",
  addOptions() {
    return {
      formModal: mv,
      contentModal: Tv,
      defaultProps: {}
    };
  },
  addCommands() {
    return {
      popModal: () => async ({ editor: n }) => {
        Do();
      },
      closeModal: () => async ({ editor: n }) => {
        Pd();
      },
      openModal: (n = {}, e = this.options.contentModal) => async ({ editor: t }) => {
        t.commands.blur();
        const r = { ...this.options.defaultProps, ...n, editor: t };
        return await Vb(
          e,
          r
        );
      },
      promptModal: (n = {}, e = this.options.formModal) => async ({ editor: t }) => {
        t.commands.blur();
        const r = { ...this.options.defaultProps, ...n, editor: t };
        return await _b(
          e,
          r
        );
      }
    };
  }
}), Mv = ee.create({
  name: "Variants",
  addOptions() {
    return {
      types: [],
      defaultVariant: "default"
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          variant: {
            default: this.options.defaultVariant,
            parseHTML: (n) => n.dataset.variant,
            renderHTML: (n) => n.variant === this.options.defaultVariant ? {} : {
              "data-variant": n.variant
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setVariant: (n) => ({ commands: e, view: t }) => (e.updateAttributes(e.getCurrentNodeName(), {
        variant: n
      }), !0),
      unsetVariant: () => ({ commands: n }) => this.options.types.every(
        (e) => n.resetAttributes(e, "variant")
      )
    };
  }
}), Ev = /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)(?!.*\/channel\/)(?!\/@)(.+)?$/, Av = /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)(?!.*\/channel\/)(?!\/@)(.+)?$/g, $s = (n) => n.match(Ev), hc = (n) => n ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/", Ov = (n) => {
  const {
    url: e,
    allowFullscreen: t,
    autoplay: r,
    ccLanguage: i,
    ccLoadPolicy: o,
    controls: s,
    disableKBcontrols: l,
    enableIFrameApi: a,
    endTime: c,
    interfaceLanguage: u,
    ivLoadPolicy: d,
    loop: f,
    modestBranding: h,
    nocookie: p,
    origin: g,
    playlist: y,
    progressBarColor: b,
    startAt: x
  } = n;
  if (e.includes("/embed/"))
    return e;
  if (e.includes("youtu.be")) {
    const E = e.split("/").pop();
    return E ? `${hc(p)}${E}` : null;
  }
  const m = /v=([-\w]+)/gm.exec(e);
  if (!m || !m[1])
    return null;
  let w = `${hc(p)}${m[1]}`;
  const v = [];
  return t === !1 && v.push("fs=0"), r && v.push("autoplay=1"), i && v.push(`cc_lang_pref=${i}`), o && v.push("cc_load_policy=1"), s || v.push("controls=0"), l && v.push("disablekb=1"), a && v.push("enablejsapi=1"), c && v.push(`end=${c}`), u && v.push(`hl=${u}`), d && v.push(`iv_load_policy=${d}`), f && v.push("loop=1"), h && v.push("modestbranding=1"), g && v.push(`origin=${g}`), y && v.push(`playlist=${y}`), x && v.push(`start=${x}`), b && v.push(`color=${b}`), v.length && (w += `?${v.join("&")}`), w;
};
function Nv() {
  return [
    {
      title: "Текст",
      name: "typography",
      blocks: [
        {
          title: "Заголовок",
          name: "heading",
          keywords: ["h1", "h2", "h3", "heading"],
          description: "Блок для заголовков",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M6.2 5.2v13.4l5.8-4.8 5.8 4.8V5.2z"></path></svg>',
          insertCommand: ({ editor: n, range: e }) => {
            n.chain().focus().deleteRange(e).setNode("heading", { level: 2 }).run();
          },
          convertCommand: (n) => {
            n.chain().focus().toggleHeading({ level: 2 }).run();
          },
          isActiveTest: (n) => n.isActive("heading"),
          settings: {
            allowedBlocks: !0,
            hideCommand: !1,
            isDefaultCommand: !0,
            variants: !1,
            blockWidth: !0,
            textAlign: !0
          },
          toolbar: {
            inlineTools: !0,
            alignTools: {
              textAlign: !0,
              blockWidth: !0
            },
            canBeConverted: {
              paragraph: !0,
              bulletList: !0
              // blockquote: true,
            }
          },
          tools: [
            {
              title: "Заголовок 1 ур.",
              name: "heading1",
              icon: '<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false"><path d="M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z"></path></svg>',
              command: (n) => {
                n.chain().focus().setHeading({ level: 1 }).run();
              },
              isActiveTest: (n) => n.isActive("heading", { level: 1 })
            },
            {
              title: "Заголовок 2 ур.",
              name: "heading2",
              icon: '<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" aria-hidden="true" focusable="false"><path d="M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z"></path></svg>',
              command: (n) => {
                n.chain().focus().setHeading({ level: 2 }).run();
              },
              isActiveTest: (n) => n.isActive("heading", { level: 2 })
            },
            {
              title: "Заголовок 3 ур.",
              name: "heading3",
              icon: '<svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false"><path d="M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z"></path></svg>',
              command: (n) => {
                n.chain().focus().setHeading({ level: 3 }).run();
              },
              isActiveTest: (n) => n.isActive("heading", { level: 3 })
            }
          ]
        },
        {
          title: "Текст",
          name: "paragraph",
          keywords: ["paragraph", "text"],
          description: "Текстовый блок",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M18.3 4H9.9v-.1l-.9.2c-2.3.4-4 2.4-4 4.8s1.7 4.4 4 4.8l.7.1V20h1.5V5.5h2.9V20h1.5V5.5h2.7V4z"></path></svg>',
          insertCommand: ({ editor: n, range: e }) => {
            n.chain().focus().deleteRange(e).setNode("paragraph").run();
          },
          convertCommand: (n) => {
            n.chain().focus().setParagraph().run();
          },
          isActiveTest: (n) => n.isActive("paragraph"),
          settings: {
            allowedBlocks: !0,
            isDefaultCommand: !0,
            variants: !0,
            blockWidth: !0,
            textAlign: !0
          },
          toolbar: {
            inlineTools: !0,
            alignTools: {
              textAlign: !0,
              blockWidth: !0
            },
            canBeConverted: {
              heading: !0,
              bulletList: !0
              // blockquote: true,
            }
          },
          tools: [
            {
              title: "Обычный",
              name: "default",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"  viewBox="0 0 48 48"><path fill="currentColor" d="M33.52 13.16a13.63 13.63 0 0 0-.19 2.24v2.45l-.15.14h-.92l-.16-.13a16 16 0 0 0-.17-2.2A1 1 0 0 0 31 15h-4.76v12.39a32.3 32.3 0 0 0 .19 4.54.65.65 0 0 0 .5.55c.15 0 .72.08 1.71.14l.15.15v1l-.15.15c-1-.06-2.47-.09-4.51-.09s-3.59 0-4.51.09l-.13-.14v-1l.14-.15c1-.06 1.57-.11 1.72-.14a.65.65 0 0 0 .5-.55 34 34 0 0 0 .15-4.62V19c0-2.41 0-3.77-.05-4.07h-2.07a14.74 14.74 0 0 0-3.06.16.66.66 0 0 0-.33.22 3.28 3.28 0 0 0-.22.94c-.06.52-.11 1.05-.13 1.6L16 18h-.93l-.16-.14v-2.51a18.58 18.58 0 0 0-.17-2.18l.13-.15c.58.1 2.67.15 6.3.15h5.93q5 0 6.3-.15Z"/></svg>',
              command: (n) => {
                n.chain().focus().setVariant("default").run();
              },
              isActiveTest: (n) => n.isActive({ variant: "default" })
            },
            {
              title: "Большой",
              name: "large",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"  viewBox="0 0 48 48"><path fill="currentColor" d="M41.37 6.12a27.85 27.85 0 0 0-.35 4L41 14.56l-.26.26h-1.69l-.29-.23a31.65 31.65 0 0 0-.29-4 1.83 1.83 0 0 0-1.69-1.24c-.35-.05-2-.08-5-.08h-3.49c0 .62-.05 3.06-.05 7.33v15a59.2 59.2 0 0 0 .34 8.18 1.14 1.14 0 0 0 .89 1 30 30 0 0 0 3.09.27l.26.26v1.77l-.26.26q-2.61-.16-8.12-.16t-8.12.16l-.24-.24v-1.8l.26-.26a29.7 29.7 0 0 0 3.09-.27 1.13 1.13 0 0 0 .89-1 58.62 58.62 0 0 0 .35-8.18v-15q0-6.51-.08-7.33h-3.77a27.11 27.11 0 0 0-5.51.29 1.12 1.12 0 0 0-.58.4 5.32 5.32 0 0 0-.4 1.69c-.12.93-.2 1.89-.24 2.87l-.26.26H8.17l-.29-.26L7.82 10a30.21 30.21 0 0 0-.31-3.93l.24-.26q1.54.25 11.33.26h10.68q9 0 11.34-.26Z"/></svg>',
              command: (n) => {
                n.chain().focus().setVariant("large").run();
              },
              isActiveTest: (n) => n.isActive({ variant: "large" })
            }
          ]
        },
        {
          title: "Список",
          name: "bulletList",
          keywords: ["ul", "li", "ol", "list"],
          description: "Маркированный или нумерованный список",
          icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="0" stroke="currentColor" fill="currentColor"  focusable="false"><path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path></svg>',
          insertCommand: ({ editor: n, range: e }) => {
            n.chain().focus().deleteRange(e).toggleBulletList().run();
          },
          convertCommand: (n) => {
            n.chain().focus().toggleBulletList().run();
          },
          isActiveTest: (n) => n.isActive("bulletList") || n.isActive("orderedList"),
          settings: {
            allowedBlocks: !1,
            isDefaultCommand: !0,
            variants: !1,
            blockWidth: !1,
            textAlign: !1
          },
          toolbar: {
            inlineTools: !0,
            alignTools: !1,
            canBeConverted: {
              heading: !0,
              paragraph: !0
              // blockquote: true,
            }
          },
          tools: [
            {
              title: "Список",
              name: "Маркированный список",
              icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="1"  fill="currentColor"  focusable="false"><path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path></svg>',
              command: (n) => {
                n.chain().focus().toggleBulletList().run();
              },
              isActiveTest: (n) => n.isActive("bulletList")
            },
            {
              title: "Нумерованный список",
              name: "orderedList",
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5"  stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0h24v24H0z" stroke="none"/><path d="M11 6h9M11 12h9M12 18h8M4 16a2 2 0 114 0c0 .591-.5 1-1 1.5L4 20h4M6 10V4L4 6"/></svg>',
              command: (n) => {
                n.chain().focus().toggleOrderedList().run();
              },
              isActiveTest: (n) => n.isActive("orderedList")
            },
            {
              title: "Сдвинуть вправо",
              name: "sinklistitem",
              icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-8-3.5l3 3-3 3 1 1 4-4-4-4-1 1z"></path></svg>',
              command: (n) => {
                n.chain().focus().sinkListItem("listItem").run();
              },
              isDisabledTest: (n) => !n.can().sinkListItem("listItem")
            },
            {
              title: "Сдвинуть влево",
              name: "liftlistitem",
              icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-4-4.6l-4 4 4 4 1-1-3-3 3-3-1-1z"></path></svg>',
              command: (n) => {
                n.chain().focus().liftListItem("listItem").run();
              },
              isDisabledTest: (n) => !n.can().liftListItem("listItem")
            }
          ]
        }
        // {
        //   title: "Цитата",
        //   name: "blockquote",
        //   keywords: ["blockquote"],
        //   icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false"><path d="M13 6v6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H13zm-9 6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H4v6z"></path></svg>',
        //   insertCommand: ({ editor, range }) => {
        //     editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        //   },
        //   inlineTools: true, 
        //   alignTools: true,
        //   variants: false,
        //   canBeConverted: {
        //     heading: true,
        //     paragraph: true,
        //     list: true,
        //   },
        //   convertCommand: (editor) => {
        //     editor.chain().focus().toggleBlockquote().run();
        //   },
        //   isActiveTest: (editor) => editor.isActive("blockquote"),
        // },
      ]
    },
    // Медиа - youtube
    {
      title: "Медиа",
      name: "media",
      blocks: [
        {
          title: "YouTube",
          name: "youtube",
          keywords: ["yt"],
          description: "Вставка видео YouTube",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" version="1.1" viewBox="0 0 461.001 461.001"><path fill="currentColor" d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z"/></svg>',
          insertCommand: async ({ editor: n, range: e }) => {
            n.chain().focus().deleteRange(e).run();
            let t = !1, r = null, i = null, o = null;
            for (; !t; ) {
              let s = await n.commands.promptModal(
                {
                  title: n.commands.getTranslation("blockTools.youtube.modal.title"),
                  form: [
                    {
                      label: n.commands.getTranslation("blockTools.youtube.form.label"),
                      name: "url",
                      value: r,
                      text: i,
                      placeholder: n.commands.getTranslation("blockTools.youtube.form.placeholder")
                    }
                  ],
                  okButton: n.commands.getTranslation("control.save"),
                  cancelButton: n.commands.getTranslation("control.cancel")
                }
              );
              if (s == null || (o = s[0].value, o == null))
                return;
              $s(o) ? t = !0 : (r = o, i = n.commands.getTranslation("blockTools.youtube.form.error"));
            }
            n.chain().focus().setYoutubeVideo({ src: o }).run();
          },
          isActiveTest: (n) => n.isActive("youtube"),
          settings: {
            allowedBlocks: !1,
            isDefaultCommand: !0,
            variants: !1,
            blockWidth: !0,
            textAlign: !1
          },
          toolbar: {
            inlineTools: !1,
            alignTools: {
              blockWidth: !0,
              textAlign: !1
            },
            canBeConverted: !1
          },
          tools: [
            {
              title: "Ссылка youtube",
              name: "youtubeLink",
              icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path></svg>',
              command: async (n) => {
                let e = !1, t = n.getAttributes("youtube").src, r = null, i = null;
                for (; !e; ) {
                  let o = await n.commands.promptModal(
                    {
                      title: n.commands.getTranslation("blockTools.youtube.modal.title"),
                      form: [
                        {
                          label: n.commands.getTranslation("blockTools.youtube.form.label"),
                          name: "url",
                          value: t,
                          text: r,
                          placeholder: n.commands.getTranslation("blockTools.youtube.form.placeholder")
                        }
                      ],
                      okButton: n.commands.getTranslation("control.save"),
                      cancelButton: n.commands.getTranslation("control.cancel")
                    }
                  );
                  if (o == null || (i = o[0].value, i == null))
                    return;
                  $s(i) ? e = !0 : (t = i, r = n.commands.getTranslation("blockTools.youtube.form.error"));
                }
                n.chain().focus().setYoutubeVideo({
                  src: i
                }).run();
              },
              isActiveTest: (n) => n.isActive("youtube")
            }
          ]
        }
      ]
    },
    {
      title: "Другое",
      name: "other",
      blocks: [
        {
          title: "Разделитель",
          name: "horizontalRule",
          keywords: ["hr", "horizontal"],
          description: "Горизонтальная линия",
          icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20.2 7v4H3.8V7H2.2v9h1.6v-3.5h16.4V16h1.6V7z"></path></svg>',
          insertCommand: ({ editor: n, range: e }) => {
            n.chain().focus().deleteRange(e).setHorizontalRule().run();
          },
          isActiveTest: (n) => n.isActive("horizontalRule"),
          settings: {
            allowedBlocks: !1,
            isDefaultCommand: !1,
            variants: !0,
            blockWidth: !0,
            textAlign: !1
          },
          toolbar: {
            inlineTools: !1,
            alignTools: {
              blockWidth: !0,
              textAlign: !1
            },
            canBeConverted: !1
          },
          tools: [
            {
              title: "Обычный",
              name: "default",
              icon: '<svg width="76" height="76" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve"><path fill="currentColor" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 31,51L 36.8333,51L 31,45L 36,45L 36,31L 31,31L 36.8334,25L 31,25L 31,22L 45,22L 45,25L 39.1667,25L 45,31L 40,31L 40,45L 45,45L 39.1666,51L 45,51L 45,54L 31,54L 31,51 Z "/></svg>',
              command: (n) => {
                n.chain().focus().setVariant("default").run();
              },
              isActiveTest: (n) => n.isActive({ variant: "default" })
            },
            {
              title: "Большой",
              name: "large",
              icon: '<svg width="76" height="76" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve"><path fill="currentColor" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 31,57L 36.8333,57L 31,51L 36,51L 36,25L 31,25L 36.8334,19L 31.0001,19L 31.0001,16L 45.0001,16L 45.0001,19L 39.1668,19L 45,25L 40,25L 40,51L 45,51L 39.1667,57L 45,57L 45,60L 31,60L 31,57 Z "/></svg>',
              command: (n) => {
                n.chain().focus().setVariant("large").run();
              },
              isActiveTest: (n) => n.isActive({ variant: "large" })
            }
          ]
        }
      ]
    }
  ];
}
const Dv = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, Bv = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, Lv = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, Iv = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, Rv = Re.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["strong", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      kn({
        find: Dv,
        type: this.type
      }),
      kn({
        find: Lv,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Jt({
        find: Bv,
        type: this.type
      }),
      Jt({
        find: Iv,
        type: this.type
      })
    ];
  }
}), Pv = ve.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", Z(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), pc = Re.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Oo(n, this.type);
        return Object.entries(t).some(([, i]) => !!i) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), mc = /^\s*([-+*])\s$/, Fv = ve.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["ul", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Pv.name, this.editor.getAttributes(pc.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = Ri({
      find: mc,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Ri({
      find: mc,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(pc.name),
      editor: this.editor
    })), [
      n
    ];
  }
}), Hv = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))$/, zv = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))/g, Vv = Re.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["code", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands: n }) => n.setMark(this.name),
      toggleCode: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetCode: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      kn({
        find: Hv,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Jt({
        find: zv,
        type: this.type
      })
    ];
  }
}), _v = /^```([a-z]+)?[\s\n]$/, jv = /^~~~([a-z]+)?[\s\n]$/, $v = ve.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: (n) => {
          var e;
          const { languageClassPrefix: t } = this.options, o = [...((e = n.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((s) => s.startsWith(t)).map((s) => s.replace(t, ""))[0];
          return o || null;
        },
        rendered: !1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      Z(this.options.HTMLAttributes, e),
      [
        "code",
        {
          class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      // exit node on triple enter
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter)
          return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: i } = t;
        if (!i || r.parent.type !== this.type)
          return !1;
        const o = r.parentOffset === r.parent.nodeSize - 2, s = r.parent.textContent.endsWith(`

`);
        return !o || !s ? !1 : n.chain().command(({ tr: l }) => (l.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown)
          return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: i, empty: o } = t;
        if (!o || i.parent.type !== this.type || !(i.parentOffset === i.parent.nodeSize - 2))
          return !1;
        const l = i.after();
        return l === void 0 || r.nodeAt(l) ? !1 : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      Rs({
        find: _v,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      Rs({
        find: jv,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new le({
        key: new we("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), i = r ? JSON.parse(r) : void 0, o = i == null ? void 0 : i.mode;
            if (!t || !o)
              return !1;
            const { tr: s } = n.state;
            return n.state.selection.from === n.state.doc.nodeSize - (1 + n.state.selection.$to.depth * 2) ? s.insert(n.state.selection.from - 1, this.type.create({ language: o })) : s.replaceSelectionWith(this.type.create({ language: o })), s.setSelection(H.near(s.doc.resolve(Math.max(0, s.selection.from - 2)))), s.insertText(t.replace(/\r\n?/g, `
`)), s.setMeta("paste", !0), n.dispatch(s), !0;
          }
        }
      })
    ];
  }
}), Wv = ve.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
class ne extends V {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return ne.valid(r) ? new ne(r) : V.near(r);
  }
  content() {
    return A.empty;
  }
  eq(e) {
    return e instanceof ne && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new ne(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new Ol(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !qv(e) || !Kv(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = t.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e:
      for (; ; ) {
        if (!r && ne.valid(e))
          return e;
        let i = e.pos, o = null;
        for (let s = e.depth; ; s--) {
          let l = e.node(s);
          if (t > 0 ? e.indexAfter(s) < l.childCount : e.index(s) > 0) {
            o = l.child(t > 0 ? e.indexAfter(s) : e.index(s) - 1);
            break;
          } else if (s == 0)
            return null;
          i += t;
          let a = e.doc.resolve(i);
          if (ne.valid(a))
            return a;
        }
        for (; ; ) {
          let s = t > 0 ? o.firstChild : o.lastChild;
          if (!s) {
            if (o.isAtom && !o.isText && !B.isSelectable(o)) {
              e = e.doc.resolve(i + o.nodeSize * t), r = !1;
              continue e;
            }
            break;
          }
          o = s, i += t;
          let l = e.doc.resolve(i);
          if (ne.valid(l))
            return l;
        }
        return null;
      }
  }
}
ne.prototype.visible = !1;
ne.findFrom = ne.findGapCursorFrom;
V.jsonID("gapcursor", ne);
class Ol {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Ol(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return ne.valid(t) ? new ne(t) : V.near(t);
  }
}
function qv(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Kv(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || i.isAtom || i.type.spec.isolating)
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function Uv() {
  return new le({
    props: {
      decorations: Qv,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && ne.valid(t) ? new ne(t) : null;
      },
      handleClick: Gv,
      handleKeyDown: Jv,
      handleDOMEvents: { beforeinput: Yv }
    }
  });
}
const Jv = Wu({
  ArrowLeft: li("horiz", -1),
  ArrowRight: li("horiz", 1),
  ArrowUp: li("vert", -1),
  ArrowDown: li("vert", 1)
});
function li(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, o) {
    let s = r.selection, l = e > 0 ? s.$to : s.$from, a = s.empty;
    if (s instanceof H) {
      if (!o.endOfTextblock(t) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = ne.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new ne(c))), !0) : !1;
  };
}
function Gv(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!ne.valid(r))
    return !1;
  let i = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && B.isSelectable(n.state.doc.nodeAt(i.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new ne(r))), !0);
}
function Yv(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof ne))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = C.empty;
  for (let s = r.length - 1; s >= 0; s--)
    i = C.from(r[s].createAndFill(null, i));
  let o = n.state.tr.replace(t.pos, t.pos, new A(i, 0, 0));
  return o.setSelection(H.near(o.doc.resolve(t.pos + 1))), n.dispatch(o), !1;
}
function Qv(n) {
  if (!(n.selection instanceof ne))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", oe.create(n.doc, [De.widget(n.selection.head, e, { key: "gapcursor" })]);
}
const Xv = ee.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      Uv()
    ];
  },
  extendNodeSchema(n) {
    var e;
    const t = {
      name: n.name,
      options: n.options,
      storage: n.storage
    };
    return {
      allowGapCursor: (e = z(N(n, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), Zv = ve.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", Z(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([
        () => n.exitCode(),
        () => n.command(() => {
          const { selection: i, storedMarks: o } = t;
          if (i.$from.parent.type.spec.isolating)
            return !1;
          const { keepMarks: s } = this.options, { splittableMarks: l } = r.extensionManager, a = o || i.$to.parentOffset && i.$from.marks();
          return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
            if (u && a && s) {
              const d = a.filter((f) => l.includes(f.type.name));
              c.ensureMarks(d);
            }
            return !0;
          }).run();
        })
      ])
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), e1 = ve.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: !1
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, Z(this.options.HTMLAttributes, e), 0];
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => Rs({
      find: new RegExp(`^(#{1,${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
});
var Hi = 200, ue = function() {
};
ue.prototype.append = function(e) {
  return e.length ? (e = ue.from(e), !this.length && e || e.length < Hi && this.leafAppend(e) || this.length < Hi && e.leafPrepend(this) || this.appendInner(e)) : this;
};
ue.prototype.prepend = function(e) {
  return e.length ? ue.from(e).append(this) : this;
};
ue.prototype.appendInner = function(e) {
  return new t1(this, e);
};
ue.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? ue.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
ue.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
ue.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
ue.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(o, s) {
    return i.push(e(o, s));
  }, t, r), i;
};
ue.from = function(e) {
  return e instanceof ue ? e : e && e.length ? new Vd(e) : ue.empty;
};
var Vd = /* @__PURE__ */ function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, o) {
    return i == 0 && o == this.length ? this : new e(this.values.slice(i, o));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, o, s, l) {
    for (var a = o; a < s; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, o, s, l) {
    for (var a = o - 1; a >= s; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= Hi)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= Hi)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(ue);
ue.empty = new Vd([]);
var t1 = /* @__PURE__ */ function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, o, s) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(o, l), s) === !1 || o > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, o) - l, s + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, o, s) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(o, l) - l, s + l) === !1 || o < l && this.left.forEachInvertedInner(r, Math.min(i, l), o, s) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var o = this.left.length;
    return i <= o ? this.left.slice(r, i) : r >= o ? this.right.slice(r - o, i - o) : this.left.slice(r, o).append(this.right.slice(0, i - o));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
}(ue);
const n1 = 500;
class Ze {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, o;
    t && (i = this.remapping(r, this.items.length), o = i.maps.length);
    let s = e.tr, l, a, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        i || (i = this.remapping(r, f + 1), o = i.maps.length), o--, u.push(d);
        return;
      }
      if (i) {
        u.push(new nt(d.map));
        let h = d.step.map(i.slice(o)), p;
        h && s.maybeStep(h).doc && (p = s.mapping.maps[s.mapping.maps.length - 1], c.push(new nt(p, void 0, void 0, c.length + u.length))), o--, p && i.appendMap(p, o);
      } else
        s.maybeStep(d.step);
      if (d.selection)
        return l = i ? d.selection.map(i.slice(o)) : d.selection, a = new Ze(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: s, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let o = [], s = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new nt(e.mapping.maps[u], d, t), h;
      (h = a && a.merge(f)) && (f = h, u ? o.pop() : l = l.slice(0, l.length - 1)), o.push(f), t && (s++, t = void 0), i || (a = f);
    }
    let c = s - r.depth;
    return c > i1 && (l = r1(l, c), s -= c), new Ze(l.append(o), s);
  }
  remapping(e, t) {
    let r = new Hn();
    return this.items.forEach((i, o) => {
      let s = i.mirrorOffset != null && o - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, s);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new Ze(this.items.append(e.map((t) => new nt(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), o = e.mapping, s = e.steps.length, l = this.eventCount;
    this.items.forEach((f) => {
      f.selection && l--;
    }, i);
    let a = t;
    this.items.forEach((f) => {
      let h = o.getMirror(--a);
      if (h == null)
        return;
      s = Math.min(s, h);
      let p = o.maps[h];
      if (f.step) {
        let g = e.steps[h].invert(e.docs[h]), y = f.selection && f.selection.map(o.slice(a + 1, h));
        y && l++, r.push(new nt(p, g, y));
      } else
        r.push(new nt(p));
    }, i);
    let c = [];
    for (let f = t; f < s; f++)
      c.push(new nt(o.maps[f]));
    let u = this.items.slice(0, i).append(c).append(r), d = new Ze(u, l);
    return d.emptyItemCount() > n1 && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], o = 0;
    return this.items.forEach((s, l) => {
      if (l >= e)
        i.push(s), s.selection && o++;
      else if (s.step) {
        let a = s.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let u = s.selection && s.selection.map(t.slice(r));
          u && o++;
          let d = new nt(c.invert(), a, u), f, h = i.length - 1;
          (f = i.length && i[h].merge(d)) ? i[h] = f : i.push(d);
        }
      } else
        s.map && r--;
    }, this.items.length, 0), new Ze(ue.from(i.reverse()), o);
  }
}
Ze.empty = new Ze(ue.empty, 0);
function r1(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class nt {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new nt(t.getMap().invert(), t, this.selection);
    }
  }
}
class Pt {
  constructor(e, t, r, i, o) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = o;
  }
}
const i1 = 20;
function o1(n, e, t, r) {
  let i = t.getMeta(gn), o;
  if (i)
    return i.historyState;
  t.getMeta(a1) && (n = new Pt(n.done, n.undone, null, 0, -1));
  let s = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (s && s.getMeta(gn))
    return s.getMeta(gn).redo ? new Pt(n.done.addTransform(t, void 0, r, bi(e)), n.undone, gc(t.mapping.maps[t.steps.length - 1]), n.prevTime, n.prevComposition) : new Pt(n.done, n.undone.addTransform(t, void 0, r, bi(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(s && s.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !s && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !s1(t, n.prevRanges)), c = s ? as(n.prevRanges, t.mapping) : gc(t.mapping.maps[t.steps.length - 1]);
    return new Pt(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, bi(e)), Ze.empty, c, t.time, l ?? n.prevComposition);
  } else
    return (o = t.getMeta("rebased")) ? new Pt(n.done.rebased(t, o), n.undone.rebased(t, o), as(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new Pt(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), as(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function s1(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let o = 0; o < e.length; o += 2)
      r <= e[o + 1] && i >= e[o] && (t = !0);
  }), t;
}
function gc(n) {
  let e = [];
  return n.forEach((t, r, i, o) => e.push(i, o)), e;
}
function as(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), o = e.map(n[r + 1], -1);
    i <= o && t.push(i, o);
  }
  return t;
}
function l1(n, e, t) {
  let r = bi(e), i = gn.get(e).spec.config, o = (t ? n.undone : n.done).popEvent(e, r);
  if (!o)
    return null;
  let s = o.selection.resolve(o.transform.doc), l = (t ? n.done : n.undone).addTransform(o.transform, e.selection.getBookmark(), i, r), a = new Pt(t ? l : o.remaining, t ? o.remaining : l, null, 0, -1);
  return o.transform.setSelection(s).setMeta(gn, { redo: t, historyState: a });
}
let cs = !1, yc = null;
function bi(n) {
  let e = n.plugins;
  if (yc != e) {
    cs = !1, yc = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        cs = !0;
        break;
      }
  }
  return cs;
}
const gn = new we("history"), a1 = new we("closeHistory");
function c1(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new le({
    key: gn,
    state: {
      init() {
        return new Pt(Ze.empty, Ze.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return o1(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? jd : r == "historyRedo" ? $d : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function _d(n, e) {
  return (t, r) => {
    let i = gn.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let o = l1(i, t, n);
      o && r(e ? o.scrollIntoView() : o);
    }
    return !0;
  };
}
const jd = _d(!1, !0), $d = _d(!0, !0), u1 = ee.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => jd(n, e),
      redo: () => ({ state: n, dispatch: e }) => $d(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      c1(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), d1 = ve.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", Z(this.options.HTMLAttributes, n)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain: n, state: e }) => {
        const { $to: t } = e.selection, r = n();
        return t.parentOffset === 0 ? r.insertContentAt(Math.max(t.pos - 2, 0), { type: this.name }) : r.insertContent({ type: this.name }), r.command(({ tr: i, dispatch: o }) => {
          var s;
          if (o) {
            const { $to: l } = i.selection, a = l.end();
            if (l.nodeAfter)
              l.nodeAfter.isTextblock ? i.setSelection(H.create(i.doc, l.pos + 1)) : l.nodeAfter.isBlock ? i.setSelection(B.create(i.doc, l.pos)) : i.setSelection(H.create(i.doc, l.pos));
            else {
              const c = (s = l.parent.type.contentMatch.defaultType) === null || s === void 0 ? void 0 : s.create();
              c && (i.insert(a, c), i.setSelection(H.create(i.doc, a + 1)));
            }
            i.scrollIntoView();
          }
          return !0;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      W0({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), f1 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, h1 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, p1 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, m1 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, g1 = Re.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["em", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      kn({
        find: f1,
        type: this.type
      }),
      kn({
        find: p1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Jt({
        find: h1,
        type: this.type
      }),
      Jt({
        find: m1,
        type: this.type
      })
    ];
  }
}), y1 = ve.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", Z(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), b1 = ve.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["li", Z(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), bc = Re.create({
  name: "textStyle",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (n) => n.hasAttribute("style") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Oo(n, this.type);
        return Object.entries(t).some(([, i]) => !!i) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), vc = /^(\d+)\.\s$/, v1 = ve.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, ...t } = n;
    return e === 1 ? ["ol", Z(this.options.HTMLAttributes, t), 0] : ["ol", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(b1.name, this.editor.getAttributes(bc.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = Ri({
      find: vc,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Ri({
      find: vc,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(bc.name) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
}), k1 = ve.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["p", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands: n }) => n.setNode(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
}), w1 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, x1 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, C1 = Re.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["s", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      kn({
        find: w1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Jt({
        find: x1,
        type: this.type
      })
    ];
  }
}), T1 = ve.create({
  name: "text",
  group: "inline"
}), S1 = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", M1 = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Zn = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, Ws = "numeric", qs = "ascii", Ks = "alpha", vi = "asciinumeric", ai = "alphanumeric", Us = "domain", Wd = "emoji", E1 = "scheme", A1 = "slashscheme", kc = "whitespace";
function O1(n, e) {
  return n in e || (e[n] = []), e[n];
}
function cn(n, e, t) {
  e[Ws] && (e[vi] = !0, e[ai] = !0), e[qs] && (e[vi] = !0, e[Ks] = !0), e[vi] && (e[ai] = !0), e[Ks] && (e[ai] = !0), e[ai] && (e[Us] = !0), e[Wd] && (e[Us] = !0);
  for (const r in e) {
    const i = O1(r, t);
    i.indexOf(n) < 0 && i.push(n);
  }
}
function N1(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function Ne(n) {
  n === void 0 && (n = null), this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
Ne.groups = {};
Ne.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], o = e.jr[r][1];
      if (o && i.test(n))
        return o;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(n, e) {
    return e === void 0 && (e = !1), e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let i = 0; i < n.length; i++)
      this.tt(n[i], e, t, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(n, e, t, r) {
    r = r || Ne.groups;
    let i;
    return e && e.j ? i = e : (i = new Ne(e), t && r && cn(e, t, r)), this.jr.push([n, i]), i;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(n, e, t, r) {
    let i = this;
    const o = n.length;
    if (!o)
      return i;
    for (let s = 0; s < o - 1; s++)
      i = i.tt(n[s]);
    return i.tt(n[o - 1], e, t, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(n, e, t, r) {
    r = r || Ne.groups;
    const i = this;
    if (e && e.j)
      return i.j[n] = e, e;
    const o = e;
    let s, l = i.go(n);
    if (l ? (s = new Ne(), Zn(s.j, l.j), s.jr.push.apply(s.jr, l.jr), s.jd = l.jd, s.t = l.t) : s = new Ne(), o) {
      if (r)
        if (s.t && typeof s.t == "string") {
          const a = Zn(N1(s.t, r), t);
          cn(o, a, r);
        } else
          t && cn(o, t, r);
      s.t = o;
    }
    return i.j[n] = s, s;
  }
};
const _ = (n, e, t, r, i) => n.ta(e, t, r, i), _e = (n, e, t, r, i) => n.tr(e, t, r, i), wc = (n, e, t, r, i) => n.ts(e, t, r, i), M = (n, e, t, r, i) => n.tt(e, t, r, i), Ct = "WORD", Js = "UWORD", Lr = "LOCALHOST", Gs = "TLD", Ys = "UTLD", ki = "SCHEME", Rn = "SLASH_SCHEME", Nl = "NUM", qd = "WS", Dl = "NL", br = "OPENBRACE", vr = "CLOSEBRACE", zi = "OPENBRACKET", Vi = "CLOSEBRACKET", _i = "OPENPAREN", ji = "CLOSEPAREN", $i = "OPENANGLEBRACKET", Wi = "CLOSEANGLEBRACKET", qi = "FULLWIDTHLEFTPAREN", Ki = "FULLWIDTHRIGHTPAREN", Ui = "LEFTCORNERBRACKET", Ji = "RIGHTCORNERBRACKET", Gi = "LEFTWHITECORNERBRACKET", Yi = "RIGHTWHITECORNERBRACKET", Qi = "FULLWIDTHLESSTHAN", Xi = "FULLWIDTHGREATERTHAN", Zi = "AMPERSAND", eo = "APOSTROPHE", to = "ASTERISK", Ft = "AT", no = "BACKSLASH", ro = "BACKTICK", io = "CARET", zt = "COLON", Bl = "COMMA", oo = "DOLLAR", rt = "DOT", so = "EQUALS", Ll = "EXCLAMATION", it = "HYPHEN", lo = "PERCENT", ao = "PIPE", co = "PLUS", uo = "POUND", fo = "QUERY", Il = "QUOTE", Rl = "SEMI", ot = "SLASH", kr = "TILDE", ho = "UNDERSCORE", Kd = "EMOJI", po = "SYM";
var Ud = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: Ct,
  UWORD: Js,
  LOCALHOST: Lr,
  TLD: Gs,
  UTLD: Ys,
  SCHEME: ki,
  SLASH_SCHEME: Rn,
  NUM: Nl,
  WS: qd,
  NL: Dl,
  OPENBRACE: br,
  CLOSEBRACE: vr,
  OPENBRACKET: zi,
  CLOSEBRACKET: Vi,
  OPENPAREN: _i,
  CLOSEPAREN: ji,
  OPENANGLEBRACKET: $i,
  CLOSEANGLEBRACKET: Wi,
  FULLWIDTHLEFTPAREN: qi,
  FULLWIDTHRIGHTPAREN: Ki,
  LEFTCORNERBRACKET: Ui,
  RIGHTCORNERBRACKET: Ji,
  LEFTWHITECORNERBRACKET: Gi,
  RIGHTWHITECORNERBRACKET: Yi,
  FULLWIDTHLESSTHAN: Qi,
  FULLWIDTHGREATERTHAN: Xi,
  AMPERSAND: Zi,
  APOSTROPHE: eo,
  ASTERISK: to,
  AT: Ft,
  BACKSLASH: no,
  BACKTICK: ro,
  CARET: io,
  COLON: zt,
  COMMA: Bl,
  DOLLAR: oo,
  DOT: rt,
  EQUALS: so,
  EXCLAMATION: Ll,
  HYPHEN: it,
  PERCENT: lo,
  PIPE: ao,
  PLUS: co,
  POUND: uo,
  QUERY: fo,
  QUOTE: Il,
  SEMI: Rl,
  SLASH: ot,
  TILDE: kr,
  UNDERSCORE: ho,
  EMOJI: Kd,
  SYM: po
});
const Dn = /[a-z]/, us = /\p{L}/u, ds = /\p{Emoji}/u, fs = /\d/, xc = /\s/, Cc = `
`, D1 = "️", B1 = "‍";
let ci = null, ui = null;
function L1(n) {
  n === void 0 && (n = []);
  const e = {};
  Ne.groups = e;
  const t = new Ne();
  ci == null && (ci = Tc(S1)), ui == null && (ui = Tc(M1)), M(t, "'", eo), M(t, "{", br), M(t, "}", vr), M(t, "[", zi), M(t, "]", Vi), M(t, "(", _i), M(t, ")", ji), M(t, "<", $i), M(t, ">", Wi), M(t, "（", qi), M(t, "）", Ki), M(t, "「", Ui), M(t, "」", Ji), M(t, "『", Gi), M(t, "』", Yi), M(t, "＜", Qi), M(t, "＞", Xi), M(t, "&", Zi), M(t, "*", to), M(t, "@", Ft), M(t, "`", ro), M(t, "^", io), M(t, ":", zt), M(t, ",", Bl), M(t, "$", oo), M(t, ".", rt), M(t, "=", so), M(t, "!", Ll), M(t, "-", it), M(t, "%", lo), M(t, "|", ao), M(t, "+", co), M(t, "#", uo), M(t, "?", fo), M(t, '"', Il), M(t, "/", ot), M(t, ";", Rl), M(t, "~", kr), M(t, "_", ho), M(t, "\\", no);
  const r = _e(t, fs, Nl, {
    [Ws]: !0
  });
  _e(r, fs, r);
  const i = _e(t, Dn, Ct, {
    [qs]: !0
  });
  _e(i, Dn, i);
  const o = _e(t, us, Js, {
    [Ks]: !0
  });
  _e(o, Dn), _e(o, us, o);
  const s = _e(t, xc, qd, {
    [kc]: !0
  });
  M(t, Cc, Dl, {
    [kc]: !0
  }), M(s, Cc), _e(s, xc, s);
  const l = _e(t, ds, Kd, {
    [Wd]: !0
  });
  _e(l, ds, l), M(l, D1, l);
  const a = M(l, B1);
  _e(a, ds, l);
  const c = [[Dn, i]], u = [[Dn, null], [us, o]];
  for (let d = 0; d < ci.length; d++)
    Lt(t, ci[d], Gs, Ct, c);
  for (let d = 0; d < ui.length; d++)
    Lt(t, ui[d], Ys, Js, u);
  cn(Gs, {
    tld: !0,
    ascii: !0
  }, e), cn(Ys, {
    utld: !0,
    alpha: !0
  }, e), Lt(t, "file", ki, Ct, c), Lt(t, "mailto", ki, Ct, c), Lt(t, "http", Rn, Ct, c), Lt(t, "https", Rn, Ct, c), Lt(t, "ftp", Rn, Ct, c), Lt(t, "ftps", Rn, Ct, c), cn(ki, {
    scheme: !0,
    ascii: !0
  }, e), cn(Rn, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((d, f) => d[0] > f[0] ? 1 : -1);
  for (let d = 0; d < n.length; d++) {
    const f = n[d][0], p = n[d][1] ? {
      [E1]: !0
    } : {
      [A1]: !0
    };
    f.indexOf("-") >= 0 ? p[Us] = !0 : Dn.test(f) ? fs.test(f) ? p[vi] = !0 : p[qs] = !0 : p[Ws] = !0, wc(t, f, f, p);
  }
  return wc(t, "localhost", Lr, {
    ascii: !0
  }), t.jd = new Ne(po), {
    start: t,
    tokens: Zn({
      groups: e
    }, Ud)
  };
}
function I1(n, e) {
  const t = R1(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, i = [];
  let o = 0, s = 0;
  for (; s < r; ) {
    let l = n, a = null, c = 0, u = null, d = -1, f = -1;
    for (; s < r && (a = l.go(t[s])); )
      l = a, l.accepts() ? (d = 0, f = 0, u = l) : d >= 0 && (d += t[s].length, f++), c += t[s].length, o += t[s].length, s++;
    o -= d, s -= f, c -= d, i.push({
      t: u.t,
      // token type/name
      v: e.slice(o - c, o),
      // string value
      s: o - c,
      // start index
      e: o
      // end index (excluding)
    });
  }
  return i;
}
function R1(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let i = n.charCodeAt(r), o, s = i < 55296 || i > 56319 || r + 1 === t || (o = n.charCodeAt(r + 1)) < 56320 || o > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(s), r += s.length;
  }
  return e;
}
function Lt(n, e, t, r, i) {
  let o;
  const s = e.length;
  for (let l = 0; l < s - 1; l++) {
    const a = e[l];
    n.j[a] ? o = n.j[a] : (o = new Ne(r), o.jr = i.slice(), n.j[a] = o), n = o;
  }
  return o = new Ne(t), o.jr = i.slice(), n.j[e[s - 1]] = o, o;
}
function Tc(n) {
  const e = [], t = [];
  let r = 0, i = "0123456789";
  for (; r < n.length; ) {
    let o = 0;
    for (; i.indexOf(n[r + o]) >= 0; )
      o++;
    if (o > 0) {
      e.push(t.join(""));
      for (let s = parseInt(n.substring(r, r + o), 10); s > 0; s--)
        t.pop();
      r += o;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const Ir = {
  defaultProtocol: "http",
  events: null,
  format: Sc,
  formatHref: Sc,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function Pl(n, e) {
  e === void 0 && (e = null);
  let t = Zn({}, Ir);
  n && (t = Zn(t, n instanceof Pl ? n.o : n));
  const r = t.ignoreTags, i = [];
  for (let o = 0; o < r.length; o++)
    i.push(r[o].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
Pl.prototype = {
  o: Ir,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(n, e, t) {
    const r = e != null;
    let i = this.o[n];
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : Ir[n], typeof i == "function" && r && (i = i(e, t))) : typeof i == "function" && r && (i = i(e, t.t, t)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function Sc(n) {
  return n;
}
function Jd(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
Jd.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
  */
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(n) {
    return n === void 0 && (n = Ir.defaultProtocol), {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), i = n.get("tagName", t, e), o = this.toFormattedString(n), s = {}, l = n.get("className", t, e), a = n.get("target", t, e), c = n.get("rel", t, e), u = n.getObj("attributes", t, e), d = n.getObj("events", t, e);
    return s.href = r, l && (s.class = l), a && (s.target = a), c && (s.rel = c), u && Zn(s, u), {
      tagName: i,
      attributes: s,
      content: o,
      eventListeners: d
    };
  }
};
function Bo(n, e) {
  class t extends Jd {
    constructor(i, o) {
      super(i, o), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const Mc = Bo("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Ec = Bo("text"), P1 = Bo("nl"), di = Bo("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n) {
    return n === void 0 && (n = Ir.defaultProtocol), this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== Lr && n[1].t === zt;
  }
}), je = (n) => new Ne(n);
function F1(n) {
  let {
    groups: e
  } = n;
  const t = e.domain.concat([Zi, to, Ft, no, ro, io, oo, so, it, Nl, lo, ao, co, uo, ot, po, kr, ho]), r = [eo, zt, Bl, rt, Ll, fo, Il, Rl, $i, Wi, br, vr, Vi, zi, _i, ji, qi, Ki, Ui, Ji, Gi, Yi, Qi, Xi], i = [Zi, eo, to, no, ro, io, oo, so, it, br, vr, lo, ao, co, uo, fo, ot, po, kr, ho], o = je(), s = M(o, kr);
  _(s, i, s), _(s, e.domain, s);
  const l = je(), a = je(), c = je();
  _(o, e.domain, l), _(o, e.scheme, a), _(o, e.slashscheme, c), _(l, i, s), _(l, e.domain, l);
  const u = M(l, Ft);
  M(s, Ft, u), M(a, Ft, u), M(c, Ft, u);
  const d = M(s, rt);
  _(d, i, s), _(d, e.domain, s);
  const f = je();
  _(u, e.domain, f), _(f, e.domain, f);
  const h = M(f, rt);
  _(h, e.domain, f);
  const p = je(Mc);
  _(h, e.tld, p), _(h, e.utld, p), M(u, Lr, p);
  const g = M(f, it);
  _(g, e.domain, f), _(p, e.domain, f), M(p, rt, h), M(p, it, g);
  const y = M(p, zt);
  _(y, e.numeric, Mc);
  const b = M(l, it), x = M(l, rt);
  _(b, e.domain, l), _(x, i, s), _(x, e.domain, l);
  const T = je(di);
  _(x, e.tld, T), _(x, e.utld, T), _(T, e.domain, l), _(T, i, s), M(T, rt, x), M(T, it, b), M(T, Ft, u);
  const m = M(T, zt), w = je(di);
  _(m, e.numeric, w);
  const v = je(di), E = je();
  _(v, t, v), _(v, r, E), _(E, t, v), _(E, r, E), M(T, ot, v), M(w, ot, v);
  const L = M(a, zt), S = M(c, zt), I = M(S, ot), j = M(I, ot);
  _(a, e.domain, l), M(a, rt, x), M(a, it, b), _(c, e.domain, l), M(c, rt, x), M(c, it, b), _(L, e.domain, v), M(L, ot, v), _(j, e.domain, v), _(j, t, v), M(j, ot, v);
  const $ = [
    [br, vr],
    // {}
    [zi, Vi],
    // []
    [_i, ji],
    // ()
    [$i, Wi],
    // <>
    [qi, Ki],
    // （）
    [Ui, Ji],
    // 「」
    [Gi, Yi],
    // 『』
    [Qi, Xi]
    // ＜＞
  ];
  for (let W = 0; W < $.length; W++) {
    const [ie, Y] = $[W], Q = M(v, ie);
    M(E, ie, Q), M(Q, Y, v);
    const G = je(di);
    _(Q, t, G);
    const K = je();
    _(Q, r), _(G, t, G), _(G, r, K), _(K, t, G), _(K, r, K), M(G, Y, v), M(K, Y, v);
  }
  return M(o, Lr, T), M(o, Dl, P1), {
    start: o,
    tokens: Ud
  };
}
function H1(n, e, t) {
  let r = t.length, i = 0, o = [], s = [];
  for (; i < r; ) {
    let l = n, a = null, c = null, u = 0, d = null, f = -1;
    for (; i < r && !(a = l.go(t[i].t)); )
      s.push(t[i++]);
    for (; i < r && (c = a || l.go(t[i].t)); )
      a = null, l = c, l.accepts() ? (f = 0, d = l) : f >= 0 && f++, i++, u++;
    if (f < 0)
      i -= u, i < r && (s.push(t[i]), i++);
    else {
      s.length > 0 && (o.push(hs(Ec, e, s)), s = []), i -= f, u -= f;
      const h = d.t, p = t.slice(i - u, i);
      o.push(hs(h, e, p));
    }
  }
  return s.length > 0 && o.push(hs(Ec, e, s)), o;
}
function hs(n, e, t) {
  const r = t[0].s, i = t[t.length - 1].e, o = e.slice(r, i);
  return new n(o, t);
}
const z1 = typeof console < "u" && console && console.warn || (() => {
}), V1 = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", te = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function _1() {
  Ne.groups = {}, te.scanner = null, te.parser = null, te.tokenQueue = [], te.pluginQueue = [], te.customSchemes = [], te.initialized = !1;
}
function Ac(n, e) {
  if (e === void 0 && (e = !1), te.initialized && z1(`linkifyjs: already initialized - will not register custom scheme "${n}" ${V1}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  te.customSchemes.push([n, e]);
}
function j1() {
  te.scanner = L1(te.customSchemes);
  for (let n = 0; n < te.tokenQueue.length; n++)
    te.tokenQueue[n][1]({
      scanner: te.scanner
    });
  te.parser = F1(te.scanner.tokens);
  for (let n = 0; n < te.pluginQueue.length; n++)
    te.pluginQueue[n][1]({
      scanner: te.scanner,
      parser: te.parser
    });
  te.initialized = !0;
}
function Gd(n) {
  return te.initialized || j1(), H1(te.parser.start, n, I1(te.scanner.start, n));
}
function Yd(n, e, t) {
  if (e === void 0 && (e = null), t === void 0 && (t = null), e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new Pl(t), i = Gd(n), o = [];
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    l.isLink && (!e || l.t === e) && r.check(l) && o.push(l.toFormattedObject(r));
  }
  return o;
}
function $1(n) {
  return n.length === 1 ? n[0].isLink : n.length === 3 && n[1].isLink ? ["()", "[]"].includes(n[0].value + n[2].value) : !1;
}
function W1(n) {
  return new le({
    key: new we("autolink"),
    appendTransaction: (e, t, r) => {
      const i = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), o = e.some((c) => c.getMeta("preventAutolink"));
      if (!i || o)
        return;
      const { tr: s } = r, l = r0(t.doc, [...e]);
      if (f0(l).forEach(({ newRange: c }) => {
        const u = o0(r.doc, c, (h) => h.isTextblock);
        let d, f;
        if (u.length > 1 ? (d = u[0], f = r.doc.textBetween(d.pos, d.pos + d.node.nodeSize, void 0, " ")) : u.length && r.doc.textBetween(c.from, c.to, " ", " ").endsWith(" ") && (d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ")), d && f) {
          const h = f.split(" ").filter((b) => b !== "");
          if (h.length <= 0)
            return !1;
          const p = h[h.length - 1], g = d.pos + f.lastIndexOf(p);
          if (!p)
            return !1;
          const y = Gd(p).map((b) => b.toObject());
          if (!$1(y))
            return !1;
          y.filter((b) => b.isLink).map((b) => ({
            ...b,
            from: g + b.start + 1,
            to: g + b.end + 1
          })).filter((b) => r.schema.marks.code ? !r.doc.rangeHasMark(b.from, b.to, r.schema.marks.code) : !0).filter((b) => n.validate ? n.validate(b.value) : !0).forEach((b) => {
            vl(b.from, b.to, r.doc).some((x) => x.mark.type === n.type) || s.addMark(b.from, b.to, n.type.create({
              href: b.href
            }));
          });
        }
      }), !!s.steps.length)
        return s;
    }
  });
}
function q1(n) {
  return new le({
    key: new we("handleClickLink"),
    props: {
      handleClick: (e, t, r) => {
        var i, o;
        if (n.whenNotEditable && e.editable || r.button !== 0)
          return !1;
        let s = r.target;
        const l = [];
        for (; s.nodeName !== "DIV"; )
          l.push(s), s = s.parentNode;
        if (!l.find((f) => f.nodeName === "A"))
          return !1;
        const a = sd(e.state, n.type.name), c = r.target, u = (i = c == null ? void 0 : c.href) !== null && i !== void 0 ? i : a.href, d = (o = c == null ? void 0 : c.target) !== null && o !== void 0 ? o : a.target;
        return c && u ? (window.open(u, d), !0) : !1;
      }
    }
  });
}
function K1(n) {
  return new le({
    key: new we("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        const { state: i } = e, { selection: o } = i, { empty: s } = o;
        if (s)
          return !1;
        let l = "";
        r.content.forEach((c) => {
          l += c.textContent;
        });
        const a = Yd(l).find((c) => c.isLink && c.value === l);
        return !l || !a ? !1 : (n.editor.commands.setMark(n.type, {
          href: a.href
        }), !0);
      }
    }
  });
}
const U1 = Re.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  onCreate() {
    this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        Ac(n);
        return;
      }
      Ac(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    _1();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      linkOnPaste: !0,
      autolink: !0,
      protocols: [],
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      validate: void 0
    };
  },
  addAttributes() {
    return {
      href: {
        default: null
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      }
    };
  },
  parseHTML() {
    return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
  },
  renderHTML({ HTMLAttributes: n }) {
    var e;
    return !((e = n.href) === null || e === void 0) && e.startsWith("javascript:") ? ["a", Z(this.options.HTMLAttributes, { ...n, href: "" }), 0] : ["a", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => e().setMark(this.name, n).setMeta("preventAutolink", !0).run(),
      toggleLink: (n) => ({ chain: e }) => e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run(),
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addPasteRules() {
    return [
      Jt({
        find: (n) => {
          const e = [];
          if (n) {
            const t = Yd(n).filter((r) => r.isLink);
            t.length && t.forEach((r) => e.push({
              text: r.value,
              data: {
                href: r.href
              },
              index: r.start
            }));
          }
          return e;
        },
        type: this.type,
        getAttributes: (n) => {
          var e;
          return {
            href: (e = n.data) === null || e === void 0 ? void 0 : e.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const n = [];
    return this.options.autolink && n.push(W1({
      type: this.type,
      validate: this.options.validate
    })), this.options.openOnClick && n.push(q1({
      type: this.type,
      whenNotEditable: this.options.openOnClick === "whenNotEditable"
    })), this.options.linkOnPaste && n.push(K1({
      editor: this.editor,
      type: this.type
    })), n;
  }
}), J1 = ee.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      considerAnyAsEmpty: !1,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [
      new le({
        key: new we("placeholder"),
        props: {
          decorations: ({ doc: n, selection: e }) => {
            var t;
            const r = this.editor.isEditable || !this.options.showOnlyWhenEditable, { anchor: i } = e, o = [];
            if (!r)
              return null;
            const { firstChild: s } = n.content, l = s && s.type.isLeaf, a = s && s.isAtom, c = this.options.considerAnyAsEmpty ? !0 : s && s.type.name === ((t = n.type.contentMatch.defaultType) === null || t === void 0 ? void 0 : t.name), u = n.content.childCount <= 1 && s && c && s.nodeSize <= 2 && (!l || !a);
            return n.descendants((d, f) => {
              const h = i >= f && i <= f + d.nodeSize, p = !d.isLeaf && !d.childCount;
              if ((h || !this.options.showOnlyCurrent) && p) {
                const g = [this.options.emptyNodeClass];
                u && g.push(this.options.emptyEditorClass);
                const y = De.node(f, f + d.nodeSize, {
                  class: g.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: d,
                    pos: f,
                    hasAnchor: h
                  }) : this.options.placeholder
                });
                o.push(y);
              }
              return this.options.includeChildren;
            }), oe.create(n, o);
          }
        }
      })
    ];
  }
}), G1 = Re.create({
  name: "subscript",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "sub"
      },
      {
        style: "vertical-align",
        getAttrs(n) {
          return n !== "sub" ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["sub", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setSubscript: () => ({ commands: n }) => n.setMark(this.name),
      toggleSubscript: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetSubscript: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-,": () => this.editor.commands.toggleSubscript()
    };
  }
}), Y1 = Re.create({
  name: "superscript",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "sup"
      },
      {
        style: "vertical-align",
        getAttrs(n) {
          return n !== "super" ? !1 : null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["sup", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setSuperscript: () => ({ commands: n }) => n.setMark(this.name),
      toggleSuperscript: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetSuperscript: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-.": () => this.editor.commands.toggleSuperscript()
    };
  }
}), Q1 = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/, X1 = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g, Z1 = Re.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: !1,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return this.options.multicolor ? {
      color: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-color") || n.style.backgroundColor,
        renderHTML: (n) => n.color ? {
          "data-color": n.color,
          style: `background-color: ${n.color}; color: inherit`
        } : {}
      }
    } : {};
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["mark", Z(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      setHighlight: (n) => ({ commands: e }) => e.setMark(this.name, n),
      toggleHighlight: (n) => ({ commands: e }) => e.toggleMark(this.name, n),
      unsetHighlight: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      kn({
        find: Q1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Jt({
        find: X1,
        type: this.type
      })
    ];
  }
}), ek = (n) => re({
  find: /--$/,
  replace: n ?? "—"
}), tk = (n) => re({
  find: /\.\.\.$/,
  replace: n ?? "…"
}), nk = (n) => re({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/,
  replace: n ?? "“"
}), rk = (n) => re({
  find: /"$/,
  replace: n ?? "”"
}), ik = (n) => re({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/,
  replace: n ?? "‘"
}), ok = (n) => re({
  find: /'$/,
  replace: n ?? "’"
}), sk = (n) => re({
  find: /<-$/,
  replace: n ?? "←"
}), lk = (n) => re({
  find: /->$/,
  replace: n ?? "→"
}), ak = (n) => re({
  find: /\(c\)$/,
  replace: n ?? "©"
}), ck = (n) => re({
  find: /\(tm\)$/,
  replace: n ?? "™"
}), uk = (n) => re({
  find: /\(sm\)$/,
  replace: n ?? "℠"
}), dk = (n) => re({
  find: /\(r\)$/,
  replace: n ?? "®"
}), fk = (n) => re({
  find: /(?:^|\s)(1\/2)\s$/,
  replace: n ?? "½"
}), hk = (n) => re({
  find: /\+\/-$/,
  replace: n ?? "±"
}), pk = (n) => re({
  find: /!=$/,
  replace: n ?? "≠"
}), mk = (n) => re({
  find: /<<$/,
  replace: n ?? "«"
}), gk = (n) => re({
  find: />>$/,
  replace: n ?? "»"
}), yk = (n) => re({
  find: /\d+\s?([*x])\s?\d+$/,
  replace: n ?? "×"
}), bk = (n) => re({
  find: /\^2$/,
  replace: n ?? "²"
}), vk = (n) => re({
  find: /\^3$/,
  replace: n ?? "³"
}), kk = (n) => re({
  find: /(?:^|\s)(1\/4)\s$/,
  replace: n ?? "¼"
}), wk = (n) => re({
  find: /(?:^|\s)(3\/4)\s$/,
  replace: n ?? "¾"
}), xk = ee.create({
  name: "typography",
  addOptions() {
    return {
      closeDoubleQuote: "”",
      closeSingleQuote: "’",
      copyright: "©",
      ellipsis: "…",
      emDash: "—",
      laquo: "«",
      leftArrow: "←",
      multiplication: "×",
      notEqual: "≠",
      oneHalf: "½",
      oneQuarter: "¼",
      openDoubleQuote: "“",
      openSingleQuote: "‘",
      plusMinus: "±",
      raquo: "»",
      registeredTrademark: "®",
      rightArrow: "→",
      servicemark: "℠",
      superscriptThree: "³",
      superscriptTwo: "²",
      threeQuarters: "¾",
      trademark: "™"
    };
  },
  addInputRules() {
    const n = [];
    return this.options.emDash !== !1 && n.push(ek(this.options.emDash)), this.options.ellipsis !== !1 && n.push(tk(this.options.ellipsis)), this.options.openDoubleQuote !== !1 && n.push(nk(this.options.openDoubleQuote)), this.options.closeDoubleQuote !== !1 && n.push(rk(this.options.closeDoubleQuote)), this.options.openSingleQuote !== !1 && n.push(ik(this.options.openSingleQuote)), this.options.closeSingleQuote !== !1 && n.push(ok(this.options.closeSingleQuote)), this.options.leftArrow !== !1 && n.push(sk(this.options.leftArrow)), this.options.rightArrow !== !1 && n.push(lk(this.options.rightArrow)), this.options.copyright !== !1 && n.push(ak(this.options.copyright)), this.options.trademark !== !1 && n.push(ck(this.options.trademark)), this.options.servicemark !== !1 && n.push(uk(this.options.servicemark)), this.options.registeredTrademark !== !1 && n.push(dk(this.options.registeredTrademark)), this.options.oneHalf !== !1 && n.push(fk(this.options.oneHalf)), this.options.plusMinus !== !1 && n.push(hk(this.options.plusMinus)), this.options.notEqual !== !1 && n.push(pk(this.options.notEqual)), this.options.laquo !== !1 && n.push(mk(this.options.laquo)), this.options.raquo !== !1 && n.push(gk(this.options.raquo)), this.options.multiplication !== !1 && n.push(yk(this.options.multiplication)), this.options.superscriptTwo !== !1 && n.push(bk(this.options.superscriptTwo)), this.options.superscriptThree !== !1 && n.push(vk(this.options.superscriptThree)), this.options.oneQuarter !== !1 && n.push(kk(this.options.oneQuarter)), this.options.threeQuarters !== !1 && n.push(wk(this.options.threeQuarters)), n;
  }
}), Ck = ve.create({
  name: "youtube",
  addOptions() {
    return {
      addPasteHandler: !0,
      allowFullscreen: !0,
      autoplay: !1,
      ccLanguage: void 0,
      ccLoadPolicy: void 0,
      controls: !0,
      disableKBcontrols: !1,
      enableIFrameApi: !1,
      endTime: 0,
      interfaceLanguage: void 0,
      ivLoadPolicy: 0,
      loop: !1,
      modestBranding: !0,
      HTMLAttributes: {},
      inline: !1,
      nocookie: !1,
      origin: "",
      playlist: "",
      progressBarColor: void 0,
      width: 560,
      height: 315
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  content: "inline*",
  draggable: !0,
  isolating: !1,
  addAttributes() {
    return {
      src: {
        default: null
        // parseHTML: element => {
        //   console.log(element);
        //   element.getAttribute('data-id');
        //   return 'http://youtube.com/watch?v='
        // },
      },
      start: {
        default: 0
      },
      width: {
        default: this.options.width
      },
      height: {
        default: this.options.height
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "figure[data-youtube-video]",
        contentElement: "figcaption"
      }
    ];
  },
  addCommands() {
    return {
      setYoutubeVideo: (n) => ({ commands: e }) => $s(n.src) ? e.insertContent({
        type: this.name,
        attrs: n
      }) : !1
    };
  },
  addPasteRules() {
    return this.options.addPasteHandler ? [
      K0({
        find: Av,
        type: this.type,
        getAttributes: (n) => ({ src: n.input })
      })
    ] : [];
  },
  renderHTML({ HTMLAttributes: n }) {
    const e = Ov({
      url: n.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      startAt: n.start || 0
    }), t = n["data-block-width"], r = n["data-id"];
    return n["data-block-width"] = null, n["data-id"] = null, n.src = e, [
      "figure",
      {
        "data-youtube-video": "",
        "data-block-width": t,
        "data-id": r,
        class: "vueberg-youtube-figure"
      },
      [
        "div",
        { class: "vueberg-youtube-figure-container" },
        [
          "iframe",
          Z(
            this.options.HTMLAttributes,
            {
              contenteditable: !1,
              draggable: !1,
              allowfullscreen: this.options.allowFullscreen,
              autoplay: this.options.autoplay,
              ccLanguage: this.options.ccLanguage,
              ccLoadPolicy: this.options.ccLoadPolicy,
              disableKBcontrols: this.options.disableKBcontrols,
              enableIFrameApi: this.options.enableIFrameApi,
              endTime: this.options.endTime,
              interfaceLanguage: this.options.interfaceLanguage,
              ivLoadPolicy: this.options.ivLoadPolicy,
              loop: this.options.loop,
              modestBranding: this.options.modestBranding,
              origin: this.options.origin,
              playlist: this.options.playlist,
              progressBarColor: this.options.progressBarColor,
              src: n.src
            },
            n
          )
        ]
      ]
      // ["figcaption", 0],
    ];
  }
  // addKeyboardShortcuts() {
  //   return {
  //     Enter: ({ editor }) => {
  //       const { state, dispatch } = editor.view;
  //       const { $head } = state.selection;
  //       if ($head.parent.type.name === 'youtube') {
  //         const endPos = $head.after();
  //         const tr = state.tr.insert(endPos, state.schema.nodes.paragraph.create());
  //         dispatch(tr.setSelection(state.selection.constructor.near(tr.doc.resolve(endPos))));
  //         editor.view.focus();
  //         return true;
  //       }
  //       return false;
  //     },
  //   };
  // },
});
function Oc({ types: n, node: e }) {
  return Array.isArray(n) && n.includes(e.type) || e.type === n;
}
const Tk = ee.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: "paragraph",
      notAfter: ["paragraph"]
    };
  },
  addProseMirrorPlugins() {
    const n = new we(this.name), e = Object.entries(this.editor.schema.nodes).map(([, t]) => t).filter((t) => this.options.notAfter.includes(t.name));
    return [
      new le({
        key: n,
        appendTransaction: (t, r, i) => {
          const { doc: o, tr: s, schema: l } = i, a = n.getState(i), c = o.content.size, u = l.nodes[this.options.node];
          if (a)
            return s.insert(c, u.create());
        },
        state: {
          init: (t, r) => {
            const i = r.tr.doc.lastChild;
            return !Oc({ node: i, types: e });
          },
          apply: (t, r) => {
            if (!t.docChanged)
              return r;
            const i = t.doc.lastChild;
            return !Oc({ node: i, types: e });
          }
        }
      })
    ];
  }
}), Sk = ee.create({
  name: "localize",
  addOptions() {
    return {
      translations: {}
      // Здесь будет храниться ваш JSON с переводами
    };
  },
  addCommands() {
    return {
      getTranslation: (n) => ({}) => {
        const e = this.options.translations, t = n.split(".");
        let r = e;
        for (let i = 0; i < t.length && (r = r[t[i]], !!r); i++)
          ;
        return r || n;
      }
    };
  }
});
function Mk(n) {
  var e;
  const { char: t, allowSpaces: r, allowedPrefixes: i, startOfLine: o, $position: s } = n, l = q0(t), a = new RegExp(`\\s${l}$`), c = o ? "^" : "", u = r ? new RegExp(`${c}${l}.*?(?=\\s${l}|$)`, "gm") : new RegExp(`${c}(?:^)?${l}[^\\s${l}]*`, "gm"), d = ((e = s.nodeBefore) === null || e === void 0 ? void 0 : e.isText) && s.nodeBefore.text;
  if (!d)
    return null;
  const f = s.pos - d.length, h = Array.from(d.matchAll(u)).pop();
  if (!h || h.input === void 0 || h.index === void 0)
    return null;
  const p = h.input.slice(Math.max(0, h.index - 1), h.index), g = new RegExp(`^[${i == null ? void 0 : i.join("")}\0]?$`).test(p);
  if (i !== null && !g)
    return null;
  const y = f + h.index;
  let b = y + h[0].length;
  return r && a.test(d.slice(b - 1, b + 1)) && (h[0] += " ", b += 1), y < s.pos && b >= s.pos ? {
    range: {
      from: y,
      to: b
    },
    query: h[0].slice(t.length),
    text: h[0]
  } : null;
}
const Ek = new we("suggestion");
function Ak({ pluginKey: n = Ek, editor: e, char: t = "@", allowSpaces: r = !1, allowedPrefixes: i = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: l = "suggestion", command: a = () => null, items: c = () => [], render: u = () => ({}), allow: d = () => !0, findSuggestionMatch: f = Mk }) {
  let h;
  const p = u == null ? void 0 : u(), g = new le({
    key: n,
    view() {
      return {
        update: async (y, b) => {
          var x, T, m, w, v, E, L;
          const S = (x = this.key) === null || x === void 0 ? void 0 : x.getState(b), I = (T = this.key) === null || T === void 0 ? void 0 : T.getState(y.state), j = S.active && I.active && S.range.from !== I.range.from, $ = !S.active && I.active, W = S.active && !I.active, ie = !$ && !W && S.query !== I.query, Y = $ || j, Q = ie && !j, G = W || j;
          if (!Y && !Q && !G)
            return;
          const K = G && !Y ? S : I, Pe = y.dom.querySelector(`[data-decoration-id="${K.decorationId}"]`);
          h = {
            editor: e,
            range: K.range,
            query: K.query,
            text: K.text,
            items: [],
            command: (ge) => a({
              editor: e,
              range: K.range,
              props: ge
            }),
            decorationNode: Pe,
            // virtual node for popper.js or tippy.js
            // this can be used for building popups without a DOM node
            clientRect: Pe ? () => {
              var ge;
              const { decorationId: yt } = (ge = this.key) === null || ge === void 0 ? void 0 : ge.getState(e.state), Ee = y.dom.querySelector(`[data-decoration-id="${yt}"]`);
              return (Ee == null ? void 0 : Ee.getBoundingClientRect()) || null;
            } : null
          }, Y && ((m = p == null ? void 0 : p.onBeforeStart) === null || m === void 0 || m.call(p, h)), Q && ((w = p == null ? void 0 : p.onBeforeUpdate) === null || w === void 0 || w.call(p, h)), (Q || Y) && (h.items = await c({
            editor: e,
            query: K.query
          })), G && ((v = p == null ? void 0 : p.onExit) === null || v === void 0 || v.call(p, h)), Q && ((E = p == null ? void 0 : p.onUpdate) === null || E === void 0 || E.call(p, h)), Y && ((L = p == null ? void 0 : p.onStart) === null || L === void 0 || L.call(p, h));
        },
        destroy: () => {
          var y;
          h && ((y = p == null ? void 0 : p.onExit) === null || y === void 0 || y.call(p, h));
        }
      };
    },
    state: {
      // Initialize the plugin's internal state.
      init() {
        return {
          active: !1,
          range: {
            from: 0,
            to: 0
          },
          query: null,
          text: null,
          composing: !1
        };
      },
      // Apply changes to the plugin state from a view transaction.
      apply(y, b, x, T) {
        const { isEditable: m } = e, { composing: w } = e.view, { selection: v } = y, { empty: E, from: L } = v, S = { ...b };
        if (S.composing = w, m && (E || e.view.composing)) {
          (L < b.range.from || L > b.range.to) && !w && !b.composing && (S.active = !1);
          const I = f({
            char: t,
            allowSpaces: r,
            allowedPrefixes: i,
            startOfLine: o,
            $position: v.$from
          }), j = `id_${Math.floor(Math.random() * 4294967295)}`;
          I && d({ editor: e, state: T, range: I.range }) ? (S.active = !0, S.decorationId = b.decorationId ? b.decorationId : j, S.range = I.range, S.query = I.query, S.text = I.text) : S.active = !1;
        } else
          S.active = !1;
        return S.active || (S.decorationId = null, S.range = { from: 0, to: 0 }, S.query = null, S.text = null), S;
      }
    },
    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown(y, b) {
        var x;
        const { active: T, range: m } = g.getState(y.state);
        return T && ((x = p == null ? void 0 : p.onKeyDown) === null || x === void 0 ? void 0 : x.call(p, { view: y, event: b, range: m })) || !1;
      },
      // Setup decorator on the currently active suggestion.
      decorations(y) {
        const { active: b, range: x, decorationId: T } = g.getState(y);
        return b ? oe.create(y.doc, [
          De.inline(x.from, x.to, {
            nodeName: s,
            class: l,
            "data-decoration-id": T
          })
        ]) : null;
      }
    }
  });
  return g;
}
const Ok = ee.create({
  name: "slashMenu",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: !0,
        command: ({ editor: n, range: e, props: t }) => {
          t.insertCommand({ editor: n, range: e });
        }
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      Ak({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
}), Nk = {
  props: {
    icon: {
      type: String,
      required: !1,
      default: ""
    },
    title: {
      type: String,
      required: !0
    },
    description: {
      type: String,
      required: !1
    },
    shotcut: {
      type: String,
      required: !1
    }
  }
}, Dk = { class: "vueberg-block-item" }, Bk = ["innerHTML"], Lk = { class: "vueberg-block-item-info" }, Ik = { class: "vueberg-block-item-info-title" }, Rk = {
  key: 0,
  class: "vueberg-block-item-info-description"
};
function Pk(n, e, t, r, i, o) {
  return O(), P("div", Dk, [
    F("div", {
      class: "vueberg-block-item-icon",
      innerHTML: t.icon
    }, null, 8, Bk),
    F("div", Lk, [
      F("div", Ik, Ke(t.title), 1),
      t.description ? (O(), P("div", Rk, Ke(t.description), 1)) : X("", !0)
    ])
  ]);
}
const Qd = /* @__PURE__ */ gt(Nk, [["render", Pk]]);
const Fk = {
  name: "BlocksModal",
  props: {
    removeFirstSymbol: {
      type: Boolean,
      default: !1
    },
    editor: {
      type: [Object, Function],
      required: !0
    }
  },
  components: {
    BlockItem: Qd
  },
  data() {
    return {
      titleLabel: this.editor.commands.getTranslation("extensions.Modal.BlocksModal.title"),
      blocks: this.editor.storage.vuebergBlocks.getAllowedBlocksByGroups(this.editor.storage.vuebergBlocks.currentNode, this.editor)
    };
  },
  methods: {
    clickBackdrop() {
      this.hideModal();
    },
    selectBlock(n) {
      const e = this.editor;
      e.chain().focus().run();
      const t = {
        from: this.removeFirstSymbol ? e.state.selection.from - 1 : e.state.selection.from,
        to: e.state.selection.to
      };
      n.insertCommand({ editor: e, range: t }), this.hideModal();
    },
    hideModal() {
      this.editor.chain().focus().run(), Do();
    }
  }
}, Hk = { class: "vueberg-modal-layout" }, zk = { class: "vueberg-modal vueberg-modal-md vueberg-blocks-modal" }, Vk = { class: "vueberg-modal-header" }, _k = { class: "vueberg-modal-header-title" }, jk = /* @__PURE__ */ F("svg", {
  width: "24px",
  height: "24px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ F("g", null, [
    /* @__PURE__ */ F("path", {
      id: "Vector",
      d: "M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ])
], -1), $k = [
  jk
], Wk = { class: "vueberg-modal-body" }, qk = { class: "vueberg-blocks-modal-group" }, Kk = { class: "vueberg-blocks-modal-group-title" }, Uk = { class: "vueberg-blocks-modal-group-blocks" };
function Jk(n, e, t, r, i, o) {
  const s = qe("BlockItem");
  return O(), P("div", Hk, [
    F("div", {
      class: "vueberg-modal-backdrop",
      onClick: e[0] || (e[0] = (...l) => o.clickBackdrop && o.clickBackdrop(...l))
    }),
    F("div", zk, [
      F("div", Vk, [
        F("div", _k, Ke(i.titleLabel), 1),
        F("div", {
          class: "vueberg-modal-header-close",
          onClick: e[1] || (e[1] = (...l) => o.hideModal && o.hideModal(...l))
        }, $k)
      ]),
      F("div", Wk, [
        (O(!0), P(Ae, null, $e(i.blocks, (l, a) => (O(), P("div", qk, [
          F("div", Kk, Ke(l.title), 1),
          F("div", Uk, [
            (O(!0), P(Ae, null, $e(l.blocks, (c, u) => (O(), be(s, {
              class: "vueberg-block-item--modal vueberg-block-item--clickable",
              onClick: Oe((d) => o.selectBlock(c), ["prevent"]),
              icon: c.icon,
              title: c.title,
              description: c.description
            }, null, 8, ["onClick", "icon", "title", "description"]))), 256))
          ])
        ]))), 256))
      ])
    ])
  ]);
}
const Qs = /* @__PURE__ */ gt(Fk, [["render", Jk]]), Gk = {
  components: {
    BlockItem: Qd
  },
  props: {
    editor: {
      type: [Function, Object]
    },
    onCloseMenu: {
      type: Function
    },
    items: {
      type: Array,
      required: !0
    },
    command: {
      type: Function,
      required: !0
    }
  },
  computed: {
    hiddenItems() {
      return this.editor.storage.vuebergBlocks.getAllowedBlocks(
        this.editor.storage.vuebergBlocks.currentNode,
        this.editor
      ).length - this.items.length;
    }
  },
  data() {
    return {
      selectedIndex: 0,
      nothingFoundLabel: this.editor.commands.getTranslation("extensions.SlashMenu.nothingFound"),
      showAllLabel: this.editor.commands.getTranslation("extensions.SlashMenu.showAll")
    };
  },
  watch: {
    items() {
      this.selectedIndex = 0;
    }
  },
  methods: {
    showAll() {
      this.onCloseMenu && this.onCloseMenu(), this.editor.commands.blur(), this.editor.commands.openModal({ removeFirstSymbol: !0 }, Qs);
    },
    onKeyDown({ event: n }) {
      return n.key === "ArrowUp" ? (this.upHandler(), !0) : n.key === "ArrowDown" ? (this.downHandler(), !0) : n.key === "Enter" ? (this.enterHandler(), !0) : n.key === "Tab" ? (this.showAll(), !0) : !1;
    },
    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
    },
    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    },
    enterHandler() {
      this.selectItem(this.selectedIndex);
    },
    selectItem(n) {
      const e = this.items[n];
      e && this.command(e);
    }
  }
}, Yk = { class: "vueberg-slash-menu" }, Qk = {
  key: 0,
  class: "vueberg-slash-menu-body vueberg-block-item--column"
}, Xk = {
  key: 1,
  class: "vueberg-slash-menu-empty"
};
function Zk(n, e, t, r, i, o) {
  const s = qe("BlockItem");
  return O(), P("div", Yk, [
    t.items.length ? (O(), P("div", Qk, [
      (O(!0), P(Ae, null, $e(t.items, (l, a) => (O(), be(s, {
        class: Ot(["vueberg-block-item--clickable", i.selectedIndex == a ? "vueberg-block-item--selected" : ""]),
        onClick: Oe((c) => o.selectItem(a), ["prevent"]),
        icon: l.icon,
        title: l.title,
        description: l.description
      }, null, 8, ["class", "onClick", "icon", "title", "description"]))), 256))
    ])) : (O(), P("div", Xk, Ke(i.nothingFoundLabel), 1)),
    o.hiddenItems > 0 ? (O(), P("div", {
      key: 2,
      class: "vueberg-slash-menu-show-all",
      onClick: e[0] || (e[0] = (...l) => o.showAll && o.showAll(...l))
    }, [
      Bc(Ke(i.showAllLabel) + " ", 1),
      F("small", null, "(+" + Ke(o.hiddenItems) + ")", 1)
    ])) : X("", !0)
  ]);
}
const ew = /* @__PURE__ */ gt(Gk, [["render", Zk]]);
function tw(n) {
  return {
    items: ({ query: e, editor: t }) => {
      let i = t.storage.vuebergBlocks.getAllowedBlocks(
        t.storage.vuebergBlocks.currentNode,
        t
      ).filter((o) => {
        var s;
        return !((s = o.settings) != null && s.hideCommand);
      });
      if (e) {
        const o = e.toLowerCase();
        i = i.filter((s) => {
          const l = s.title.toLowerCase().startsWith(o), a = s.keywords && s.keywords.some((c) => c.toLowerCase().startsWith(o));
          return l || a;
        });
      } else {
        let o = i.filter((s) => {
          var l;
          return (l = s.settings) == null ? void 0 : l.isDefaultCommand;
        });
        if (o.length >= n)
          i = o;
        else {
          let s = i.filter((l) => {
            var a;
            return !((a = l.settings) != null && a.isDefaultCommand);
          });
          i = o.concat(s).slice(0, n);
        }
      }
      return i.slice(0, n);
    },
    render: () => {
      let e, t;
      return {
        onStart: (r) => {
          if (!r.editor.storage.vuebergBlocks.hasAllowedBlocks(r.editor.storage.vuebergBlocks.currentNode, r.editor))
            return !1;
          e = new Lb(ew, {
            // using vue 2:
            // parent: this,
            // propsData: props,
            props: {
              ...r,
              onCloseMenu: () => {
                t[0].hide(), t[0].destroy(), e.destroy();
              }
            },
            editor: r.editor
            // props,
            // editor: props.editor,
          }), r.clientRect && (t = xn("body", {
            getReferenceClientRect: r.clientRect,
            appendTo: () => e.editor.view.dom.parentNode.parentNode,
            content: e.element,
            showOnCreate: !0,
            interactive: !0,
            trigger: "manual",
            placement: "bottom-start",
            onCreate: (o) => o.popper.classList.add("vueberg-slash-menu-wrapper")
          }));
        },
        onUpdate(r) {
          e && (e.updateProps(r), r.clientRect && t[0].setProps({
            getReferenceClientRect: r.clientRect
          }));
        },
        onKeyDown(r) {
          var i;
          return r.event.key === "Escape" ? (t && t[0].hide(), !0) : (i = e == null ? void 0 : e.ref) == null ? void 0 : i.onKeyDown(r);
        },
        onExit() {
          t && t[0].destroy(), e && e.destroy();
        }
      };
    }
  };
}
function nw() {
  return [
    { name: "Placeholder", extension: J1.configure({ considerAnyAsEmpty: !0, placeholder: "Начните писать" }) },
    { name: "Bold", extension: Rv },
    { name: "BulletList", extension: Fv },
    { name: "Code", extension: Vv },
    { name: "CodeBlock", extension: $v },
    { name: "Document", extension: Wv },
    // { name: 'Dropcursor', extension: Dropcursor },
    { name: "Gapcursor", extension: Xv },
    { name: "HardBreak", extension: Zv },
    { name: "Heading", extension: e1 },
    { name: "History", extension: u1 },
    { name: "HorizontalRule", extension: d1 },
    { name: "Italic", extension: g1 },
    { name: "ListItem", extension: y1 },
    { name: "OrderedList", extension: v1 },
    { name: "Paragraph", extension: k1 },
    { name: "Strike", extension: C1 },
    { name: "Text", extension: T1 },
    // {
    //   name: 'Blockquote',
    //   extension: Blockquote.extend({ content: "paragraph" }),
    // },
    { name: "TrailingNode", extension: Tk },
    { name: "Subscript", extension: G1 },
    { name: "Superscript", extension: Y1 },
    { name: "Highlight", extension: Z1 },
    {
      name: "Link",
      extension: U1.configure({ openOnClick: !1 })
    },
    {
      name: "slashMenu",
      extension: Ok.configure({
        suggestion: tw(5)
      })
    },
    { name: "Typography", extension: xk },
    {
      name: "Youtube",
      extension: Ck.configure(
        {
          inline: !1
        }
      )
    },
    {
      name: "Localize",
      extension: Sk.configure({
        translations: {
          control: {
            save: "Сохранить",
            cancel: "Отменить",
            delete: "Удалить"
          },
          inlineTools: {
            link: {
              modal: {
                title: "Введите ссылку"
              },
              form: {
                label: "Ссылка:",
                placeholder: "https://google.com"
              }
            }
          },
          blockTools: {
            youtube: {
              modal: {
                title: "Введите ссылку на видео в Youtube"
              },
              form: {
                label: "Ссылка",
                placeholder: "https://www.youtube.com/watch?v=...",
                error: "Невалидный адрес Youtube"
              }
            }
          },
          extensions: {
            SlashMenu: {
              nothingFound: "Ничего не найдено",
              showAll: "Все блоки"
            },
            Modal: {
              BlocksModal: {
                title: "Все блоки"
              }
            }
          },
          toolbar: {
            more: "Еще",
            up: "Вверх",
            down: "Ввниз",
            transformTo: "Заменить:"
          }
        }
      })
    }
  ];
}
function rw() {
  return [
    {
      name: "bold",
      title: "Жирный",
      icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M14.7 11.3c1-.6 1.5-1.6 1.5-3 0-2.3-1.3-3.4-4-3.4H7v14h5.8c1.4 0 2.5-.3 3.3-1 .8-.7 1.2-1.7 1.2-2.9.1-1.9-.8-3.1-2.6-3.7zm-5.1-4h2.3c.6 0 1.1.1 1.4.4.3.3.5.7.5 1.2s-.2 1-.5 1.2c-.3.3-.8.4-1.4.4H9.6V7.3zm4.6 9c-.4.3-1 .4-1.7.4H9.6v-3.9h2.9c.7 0 1.3.2 1.7.5.4.3.6.8.6 1.5s-.2 1.2-.6 1.5z"></path></svg>',
      command: (n) => {
        n.chain().focus().toggleBold().run();
      },
      isActiveTest: (n) => n.isActive("bold")
    },
    {
      name: "italic",
      title: "Курсив",
      icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M12.5 5L10 19h1.9l2.5-14z"></path></svg>',
      command: (n) => {
        n.chain().focus().toggleItalic().run();
      },
      isActiveTest: (n) => n.isActive("italic")
    },
    {
      name: "link",
      title: "Ссылка",
      icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path></svg>',
      command: async (n) => {
        let e = n.getAttributes("link").href, t = await n.commands.promptModal(
          {
            title: n.commands.getTranslation("inlineTools.link.modal.title"),
            form: [
              {
                label: n.commands.getTranslation("inlineTools.link.form.label"),
                name: "url",
                value: e,
                placeholder: n.commands.getTranslation("inlineTools.link.form.placeholder")
              }
            ],
            okButton: n.commands.getTranslation("control.save"),
            cancelButton: n.commands.getTranslation("control.cancel")
          }
        );
        if (t == null)
          return;
        let r = t[0].value;
        if (!r || r.trim() === "") {
          n.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }
        n.chain().focus().extendMarkRange("link").setLink({ href: r }).run();
      },
      isActiveTest: (n) => n.isActive("link")
    },
    {
      name: "strike",
      title: "Зачеркивание",
      icon: '<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="-1 -1 26 26" width="24" height="24" aria-hidden="true" focusable="false"><path d="M9.1 9v-.5c0-.6.2-1.1.7-1.4.5-.3 1.2-.5 2-.5.7 0 1.4.1 2.1.3.7.2 1.4.5 2.1.9l.2-1.9c-.6-.3-1.2-.5-1.9-.7-.8-.1-1.6-.2-2.4-.2-1.5 0-2.7.3-3.6 1-.8.7-1.2 1.5-1.2 2.6V9h2zM20 12H4v1h8.3c.3.1.6.2.8.3.5.2.9.5 1.1.8.3.3.4.7.4 1.2 0 .7-.2 1.1-.8 1.5-.5.3-1.2.5-2.1.5-.8 0-1.6-.1-2.4-.3-.8-.2-1.5-.5-2.2-.8L7 18.1c.5.2 1.2.4 2 .6.8.2 1.6.3 2.4.3 1.7 0 3-.3 3.9-1 .9-.7 1.3-1.6 1.3-2.8 0-.9-.2-1.7-.7-2.2H20v-1z"></path></svg>',
      // command: (editor) => editor.commands.toggleStrike(),
      command: (n) => {
        n.chain().focus().toggleStrike().run();
      },
      isActiveTest: (n) => n.isActive("strike")
    },
    {
      name: "highlight",
      title: "Выделение",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-3 -3 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
      // command: (editor) => editor.commands.toggleHighlight(),
      command: (n) => {
        n.chain().focus().toggleHighlight().run();
      },
      isActiveTest: (n) => n.isActive("highlight")
    }
    // {
    //   title: "Inline code",
    //   icon: '<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"></path></svg>',
    //   command: (editor) => editor.commands.toggleCode(),
    //   isActiveTest: (editor) => editor.isActive("code"),
    // },
    // {
    //   title: "Subscript",
    //   icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M16.9 18.3l.8-1.2c.4-.6.7-1.2.9-1.6.2-.4.3-.8.3-1.2 0-.3-.1-.7-.2-1-.1-.3-.4-.5-.6-.7-.3-.2-.6-.3-1-.3s-.8.1-1.1.2c-.3.1-.7.3-1 .6l.2 1.3c.3-.3.5-.5.8-.6s.6-.2.9-.2c.3 0 .5.1.7.2.2.2.2.4.2.7 0 .3-.1.5-.2.8-.1.3-.4.7-.8 1.3L15 19.4h4.3v-1.2h-2.4zM14.1 7.2h-2L9.5 11 6.9 7.2h-2l3.6 5.3L4.7 18h2l2.7-4 2.7 4h2l-3.8-5.5 3.8-5.3z"></path></svg>',
    //   command: (editor) => editor.commands.toggleSubscript(),
    //   isActiveTest: (editor) => editor.isActive("subscript"),
    // },
    // {
    //   title: "Superscript",
    //   icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M16.9 10.3l.8-1.3c.4-.6.7-1.2.9-1.6.2-.4.3-.8.3-1.2 0-.3-.1-.7-.2-1-.2-.2-.4-.4-.7-.6-.3-.2-.6-.3-1-.3s-.8.1-1.1.2c-.3.1-.7.3-1 .6l.1 1.3c.3-.3.5-.5.8-.6s.6-.2.9-.2c.3 0 .5.1.7.2.2.2.2.4.2.7 0 .3-.1.5-.2.8-.1.3-.4.7-.8 1.3l-1.8 2.8h4.3v-1.2h-2.2zm-2.8-3.1h-2L9.5 11 6.9 7.2h-2l3.6 5.3L4.7 18h2l2.7-4 2.7 4h2l-3.8-5.5 3.8-5.3z"></path></svg>',
    //   command: (editor) => editor.commands.toggleSuperscript(),
    //   isActiveTest: (editor) => editor.isActive("superscript"),
    // },
  ];
}
function iw() {
  return [
    {
      name: "textAlign",
      allowNested: !0,
      tools: [
        {
          name: "textAlignLeft",
          title: "По левому краю",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M4 19.8h8.9v-1.5H4v1.5zm8.9-15.6H4v1.5h8.9V4.2zm-8.9 7v1.5h16v-1.5H4z"></path></svg>',
          command: (n) => {
            n.chain().focus().setTextAlign("left").run();
          },
          isActiveTest: (n) => n.isActive({ textAlign: "left" })
        },
        {
          name: "textAlignCenter",
          title: "По центру",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M16.4 4.2H7.6v1.5h8.9V4.2zM4 11.2v1.5h16v-1.5H4zm3.6 8.6h8.9v-1.5H7.6v1.5z"></path></svg>',
          command: (n) => {
            n.chain().focus().setTextAlign("center").run();
          },
          isActiveTest: (n) => n.isActive({ textAlign: "center" })
        },
        {
          name: "textAlignRight",
          title: "По правому краю",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M11.1 19.8H20v-1.5h-8.9v1.5zm0-15.6v1.5H20V4.2h-8.9zM4 12.8h16v-1.5H4v1.5z"></path></svg>',
          command: (n) => {
            n.chain().focus().setTextAlign("right").run();
          },
          isActiveTest: (n) => n.isActive({ textAlign: "right" })
        }
      ]
    },
    {
      name: "blockWidth",
      allowNested: !1,
      tools: [
        {
          name: "blockWidthNormal",
          title: "Обычный блок",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5 15h14V9H5v6zm0 4.8h14v-1.5H5v1.5zM5 4.2v1.5h14V4.2H5z"></path></svg>',
          command: (n) => {
            n.chain().focus().setBlockWidth("normal").run();
          },
          isActiveTest: (n) => n.isActive({ blockWidth: "normal" })
        },
        {
          name: "blockWidthWide",
          title: "Широкий блок",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5 9v6h14V9H5zm11-4.8H8v1.5h8V4.2zM8 19.8h8v-1.5H8v1.5z"></path></svg>',
          command: (n) => {
            n.chain().focus().setBlockWidth("wide").run();
          },
          isActiveTest: (n, e) => n.isActive(e, { blockWidth: "wide" })
        },
        {
          name: "blockWidthFull",
          title: "На всю ширину",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="currentColor" aria-hidden="true" focusable="false"><path d="M5 4v11h14V4H5zm3 15.8h8v-1.5H8v1.5z"></path></svg>',
          command: (n) => {
            n.chain().focus().setBlockWidth("full").run();
          },
          isActiveTest: (n, e) => n.isActive(e, { blockWidth: "full" })
        }
      ]
    }
  ];
}
var fi, ow = new Uint8Array(16);
function sw() {
  if (!fi && (fi = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !fi))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return fi(ow);
}
const lw = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function aw(n) {
  return typeof n == "string" && lw.test(n);
}
var fe = [];
for (var ps = 0; ps < 256; ++ps)
  fe.push((ps + 256).toString(16).substr(1));
function cw(n) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = (fe[n[e + 0]] + fe[n[e + 1]] + fe[n[e + 2]] + fe[n[e + 3]] + "-" + fe[n[e + 4]] + fe[n[e + 5]] + "-" + fe[n[e + 6]] + fe[n[e + 7]] + "-" + fe[n[e + 8]] + fe[n[e + 9]] + "-" + fe[n[e + 10]] + fe[n[e + 11]] + fe[n[e + 12]] + fe[n[e + 13]] + fe[n[e + 14]] + fe[n[e + 15]]).toLowerCase();
  if (!aw(t))
    throw TypeError("Stringified UUID is invalid");
  return t;
}
function uw(n, e, t) {
  n = n || {};
  var r = n.random || (n.rng || sw)();
  if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, e) {
    t = t || 0;
    for (var i = 0; i < 16; ++i)
      e[t + i] = r[i];
    return e;
  }
  return cw(r);
}
const dw = ee.create({
  name: "uniqueId",
  addOptions() {
    return {
      types: []
      // Типы блоков, для которых нужно добавлять уникальные ID
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        // Добавьте нужные типы блоков
        attributes: {
          id: {
            default: null,
            parseHTML: (n) => n.getAttribute("data-id"),
            renderHTML: (n) => n.id ? { "data-id": n.id } : {},
            keepOnSplit: !1
          }
        }
      }
    ];
  },
  addProseMirrorPlugins() {
    return [
      new le({
        appendTransaction: (n, e, t) => {
          const r = t.tr;
          let i = !1;
          return t.doc.descendants((o, s) => {
            o.isBlock && !o.attrs.id && (r.setNodeMarkup(s, void 0, {
              ...o.attrs,
              id: uw()
            }), i = !0);
          }), i ? r : null;
        }
      })
    ];
  }
}), fw = {
  props: {
    modelValue: {},
    defaultContent: {
      type: [Object, Array],
      default: [{ type: "paragraph" }]
    },
    editable: {
      default: !0
    },
    mode: {
      type: String,
      default: "json"
    },
    settings: {
      type: Object,
      default: () => ({
        defaultExtensions: {}
      })
    },
    // placeholder: {
    //   type: [String, Function],
    //   default: "Начните писать",
    // },
    extensions: {
      type: Array,
      default: () => []
    },
    customTools: {
      type: [Array, Boolean],
      default: () => []
    },
    blockTools: {
      type: Array,
      default: () => []
    },
    inlineTools: {
      type: [Array, Boolean],
      default: () => []
    },
    alignmentTools: {
      type: [Array, Boolean],
      default: () => []
    }
  },
  components: {
    BubbleMenu: Ab,
    EditorContent: Nb,
    MenuButton: el,
    MenuItem: Lc,
    FloatingMenu: Db,
    WidgetContainerModal: Xb,
    Toolbar: Vh,
    BlocksModal: Qs
  },
  data() {
    return {
      vuebergWidth: 0,
      editor: null,
      defaultSettings: {
        toolbar: {
          style: "default"
        },
        editor: {
          autofocus: !1
        },
        defaultExtensions: {}
      },
      loaded: !1,
      allDefaultExtensions: nw(),
      allBlockTools: yi(Nv(), this.blockTools),
      allInlineTools: yi(rw(), this.inlineTools),
      allAlignmentTools: yi(iw(), this.alignmentTools),
      isTyping: !1,
      showMainToolbar: !1,
      // EventListners
      handleMouseMove: null,
      handleResize: null,
      currentBlockTool: null
    };
  },
  created() {
    this.handleMouseMove = this.cancelTyping.bind(this), this.handleResize = this.updateVuebergWidth.bind(this), window.addEventListener("mousemove", this.handleMouseMove), window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    this.updateVuebergWidth(), this.initializeEditor();
  },
  beforeUnmount() {
    this.editor.destroy();
  },
  watch: {
    editable(n) {
      this.editor.setEditable(n);
    }
  },
  computed: {
    mergedSettings() {
      return { ...this.defaultSettings, ...this.settings };
    },
    blocksWithVariant() {
      return this.filterBlocks((n) => {
        var e;
        return (e = n == null ? void 0 : n.settings) == null ? void 0 : e.variants;
      });
    },
    blocksWithBlockWidth() {
      return this.filterBlocks((n) => {
        var e;
        return ((e = n.settings) == null ? void 0 : e.blockWidth) === !0;
      });
    },
    blocksWithTextAlign() {
      return this.filterBlocks((n) => {
        var e;
        return ((e = n.settings) == null ? void 0 : e.textAlign) === !0;
      });
    }
  },
  methods: {
    openBlocksModal() {
      this.editor.commands.openModal({}, Qs);
    },
    filterBlocks(n) {
      return this.allBlockTools.flatMap((e) => e.blocks).filter(n).map((e) => e.name);
    },
    initializeEditor() {
      const n = this.getEnabledExtensions(), e = this.allBlockTools.map((t) => {
        const r = t.blocks.filter((i) => i.insertCommand);
        return r.length > 0 ? { ...t, blocks: r } : null;
      }).filter((t) => t !== null);
      this.editor = new Ob({
        extensions: [
          ...n,
          tv.configure({ blocks: e }),
          ev.configure({ types: this.blocksWithBlockWidth }),
          Mv.configure({ types: this.blocksWithVariant }),
          Rb.configure({ types: this.blocksWithTextAlign }),
          dw.configure({ types: this.filterBlocks((t) => t) }),
          Sv,
          ...this.extensions
        ],
        content: this.modelValue === null ? { type: "doc", content: this.defaultContent } : this.mode === "json" ? { type: "doc", content: this.cleanContent(this.modelValue) } : this.modelValue,
        editable: this.editable,
        onUpdate: this.handleEditorUpdate,
        onCreate: this.handleEditorCreate,
        onSelectionUpdate: this.handleSelectionUpdate,
        autofocus: this.mergedSettings.editor.autofocus
      });
    },
    cleanContent(n) {
      if (Array.isArray(n))
        return n.map(this.cleanContent).filter((e) => e !== null);
      if (n !== null && typeof n == "object") {
        n.type === "text" && (!n.text || n.text === "") && (n.text = " ");
        const e = {};
        for (const t in n) {
          const r = this.cleanContent(n[t]);
          r !== null && (e[t] = r);
        }
        return e;
      }
      return n;
    },
    handleEditorCreate() {
      this.updateCurrentBlockTool(), this.$emit(
        "update:modelValue",
        this.mode == "json" ? this.editor.getJSON().content : this.editor.getHTML()
      ), this.$emit("onCreate", this.editor), this.loaded = !0;
    },
    handleSelectionUpdate() {
      this.updateCurrentBlockTool();
    },
    handleEditorUpdate() {
      this.updateCurrentBlockTool(), this.$emit(
        "update:modelValue",
        this.mode == "json" ? this.editor.getJSON().content : this.editor.getHTML()
      );
    },
    getEnabledExtensions() {
      const n = [];
      return this.allDefaultExtensions.forEach(({ name: e, extension: t, methods: r, options: i }) => {
        var l, a, c, u;
        const o = this.mergedSettings.defaultExtensions[e];
        let s = t;
        (o === void 0 || o === !0 || typeof o == "object" && o.enabled !== !1) && (typeof o == "object" && o.options && ((l = o.options) != null && l.configure && (s = s.configure((a = o.options) == null ? void 0 : a.configure)), (c = o.options) != null && c.extend && (s = s.extend((u = o.options) == null ? void 0 : u.extend))), n.push(s));
      }), n;
    },
    updateVuebergWidth() {
      const n = this.$refs.vueberg;
      n && (this.vuebergWidth = n.clientWidth);
    },
    cancelTyping() {
      this.$nextTick(() => {
        this.isTyping = !1;
      });
    },
    shouldShowMainToolbar({ editor: n, state: e, view: t }) {
      return this.editable && t.hasFocus() && n.isActive() && this.modelValue && this.currentBlockTool;
    },
    shouldShowFloatingMenu({ editor: n, state: e, view: t }) {
      const { selection: r } = e, { $anchor: i, empty: o } = r, s = i.parent.isTextblock && !i.parent.type.spec.code && !i.parent.textContent;
      if (!t.hasFocus() || !o || !s || !this.editor.isEditable)
        return !1;
      const l = uu(n);
      return n.storage.vuebergBlocks.hasAllowedBlocks(l, n);
    },
    updateCurrentBlockTool() {
      this.currentBlockTool = this.editor.storage.vuebergBlocks.getBlockTool(this.editor.commands.getCurrentNodeName());
    },
    getMenuCoords() {
      return vh(this.editor);
    },
    getBlockEndCoords() {
      return kh(this.editor);
    }
  }
}, hw = {
  class: "vueberg",
  style: { position: "relative" },
  ref: "vueberg"
}, pw = {
  key: 2,
  class: "vueberg-sticky-menu"
};
function mw(n, e, t, r, i, o) {
  var f, h, p, g, y, b, x, T, m;
  const s = qe("widget-container-modal"), l = qe("Toolbar"), a = qe("bubble-menu"), c = qe("menu-button"), u = qe("floating-menu"), d = qe("editor-content");
  return O(), P("div", hw, [
    at(s),
    t.editable && i.loaded && ((h = (f = o.mergedSettings) == null ? void 0 : f.toolbar) == null ? void 0 : h.style) == "default" ? Dc((O(), be(a, {
      key: 0,
      pluginKey: "mainMenu",
      "should-show": o.shouldShowMainToolbar,
      updateDelay: 0,
      editor: i.editor,
      class: Ot([{
        "vueberg-bubble-menu-hidden": i.isTyping
      }, "vueberg-bubble-menu"]),
      "tippy-options": {
        delay: [0, 300],
        duration: [300, 400],
        maxWidth: "none",
        placement: "top-start",
        getReferenceClientRect: o.getMenuCoords,
        onCreate: (w) => w.popper.classList.add("vueberg-toolbar-wrapper")
      }
    }, {
      default: st(() => {
        var w;
        return [
          ((w = i.currentBlockTool) == null ? void 0 : w.nodeType) !== void 0 ? (O(), be(l, {
            key: 0,
            editor: i.editor,
            currentBlockTool: i.currentBlockTool,
            settings: o.mergedSettings,
            inlineTools: i.allInlineTools,
            alignmentTools: i.allAlignmentTools,
            vuebergWidth: i.vuebergWidth
          }, null, 8, ["editor", "currentBlockTool", "settings", "inlineTools", "alignmentTools", "vuebergWidth"])) : X("", !0)
        ];
      }),
      _: 1
    }, 8, ["should-show", "editor", "class", "tippy-options"])), [
      [gf, i.currentBlockTool]
    ]) : X("", !0),
    t.editable && i.loaded && ((g = (p = o.mergedSettings) == null ? void 0 : p.toolbar) == null ? void 0 : g.style) == "minimal" ? (O(), be(a, {
      key: 1,
      "tippy-options": {
        delay: [0, 300],
        duration: [300, 400],
        maxWidth: "none",
        placement: "top-start"
      },
      pluginKey: "mainMenu",
      editor: i.editor,
      class: "vueberg-bubble-menu vueberg-bubble-menu-minimal"
    }, {
      default: st(() => {
        var w;
        return [
          ((w = i.currentBlockTool) == null ? void 0 : w.nodeType) !== void 0 ? (O(), be(l, {
            key: 0,
            editor: i.editor,
            currentBlockTool: i.currentBlockTool,
            settings: o.mergedSettings,
            inlineTools: i.allInlineTools,
            alignmentTools: i.allAlignmentTools,
            vuebergWidth: i.vuebergWidth
          }, null, 8, ["editor", "currentBlockTool", "settings", "inlineTools", "alignmentTools", "vuebergWidth"])) : X("", !0)
        ];
      }),
      _: 1
    }, 8, ["editor"])) : X("", !0),
    t.editable && i.loaded && ((b = (y = o.mergedSettings) == null ? void 0 : y.toolbar) == null ? void 0 : b.style) == "sticky" ? (O(), P("div", pw, [
      ((x = i.currentBlockTool) == null ? void 0 : x.nodeType) !== void 0 ? (O(), be(l, {
        key: 0,
        editor: i.editor,
        currentBlockTool: i.currentBlockTool,
        settings: o.mergedSettings,
        inlineTools: i.allInlineTools,
        alignmentTools: i.allAlignmentTools,
        vuebergWidth: i.vuebergWidth,
        customTools: t.customTools
      }, null, 8, ["editor", "currentBlockTool", "settings", "inlineTools", "alignmentTools", "vuebergWidth", "customTools"])) : X("", !0)
    ])) : X("", !0),
    t.editable && i.currentBlockTool && i.editor && o.mergedSettings.floatingMenu !== !1 ? (O(), be(u, {
      key: 3,
      updateDelay: 1e3,
      "should-show": o.shouldShowFloatingMenu,
      editor: i.editor,
      "tippy-options": {
        delay: [0, 0],
        duration: [100, 100],
        getReferenceClientRect: o.getBlockEndCoords
      }
    }, {
      default: st(() => [
        at(c, {
          onClick: o.openBlocksModal,
          class: "vueberg-button-primary vueberg-button-text-only vueberg-button-blocks",
          content: "+"
        }, null, 8, ["onClick"])
      ]),
      _: 1
    }, 8, ["should-show", "editor", "tippy-options"])) : X("", !0),
    at(d, {
      class: Ot(["vueberg-editor", {
        "vueberg-editor--sticky-menu": ((m = (T = o.mergedSettings) == null ? void 0 : T.toolbar) == null ? void 0 : m.style) == "sticky"
      }]),
      onKeydown: [
        e[0] || (e[0] = (w) => i.isTyping = !0),
        e[1] || (e[1] = Hl((w) => i.isTyping = !1, ["esc"]))
      ],
      onKeyup: e[2] || (e[2] = Hl((w) => i.isTyping = !1, ["esc"])),
      ref: "editor",
      editor: i.editor
    }, null, 8, ["class", "editor"])
  ], 512);
}
const gw = /* @__PURE__ */ gt(fw, [["render", mw]]), yw = {
  props: Ib,
  components: {
    NodeViewWrapper: Bb
  },
  data() {
    return {
      isPreviewMode: !1,
      isEditable: this.editor.isEditable,
      vueBergBlock: this.editor.storage.vuebergBlocks.getBlockTool(this.node.type.name, !1),
      editIcon: '<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="currentColor"/></svg>',
      previewIcon: '<svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };
  },
  mounted() {
  },
  computed: {
    isPreviewModeComputed() {
      return this.isEditable ? this.isPreviewMode : !0;
    }
  },
  methods: {
    toggleMode() {
      this.isPreviewMode = !this.isPreviewMode;
    }
  }
}, bw = {
  key: 0,
  contenteditable: "false",
  class: "vueberg-customblock-header"
}, vw = { class: "vueberg-customblock-header-title" }, kw = ["innerHTML"], ww = ["innerHTML"], xw = { class: "vueberg-customblock-body" };
function Cw(n, e, t, r, i, o) {
  var l;
  const s = qe("node-view-wrapper");
  return O(), be(s, {
    class: Ot(["vueberg-customblock", {
      ["vueberg-customblock--" + (((l = i.vueBergBlock) == null ? void 0 : l.name) || "")]: !0,
      "vueberg-customblock--outline": i.isEditable,
      "vueberg-customblock--has-header": i.isEditable
    }]),
    "data-block-width": n.node.attrs.blockWidth
  }, {
    default: st(() => {
      var a, c, u, d, f;
      return [
        i.isEditable && ((a = i.vueBergBlock) != null && a.name) ? (O(), P("div", bw, [
          F("div", vw, [
            F("span", {
              class: "vueberg-customblock-header-title-icon",
              innerHTML: (c = i.vueBergBlock) == null ? void 0 : c.icon
            }, null, 8, kw),
            Bc(" " + Ke((u = i.vueBergBlock) == null ? void 0 : u.title), 1)
          ]),
          ((f = (d = i.vueBergBlock) == null ? void 0 : d.vueBergBlock) == null ? void 0 : f.hasPreviewMode) !== !1 ? (O(), P("div", {
            key: 0,
            class: "vueberg-customblock-header-mode",
            onClick: e[0] || (e[0] = (...h) => o.toggleMode && o.toggleMode(...h))
          }, [
            F("div", {
              innerHTML: i.isPreviewMode ? i.editIcon : i.previewIcon
            }, null, 8, ww)
          ])) : X("", !0)
        ])) : X("", !0),
        F("div", xw, [
          ms(n.$slots, "default", {
            isEditable: i.isEditable,
            isPreviewMode: o.isPreviewModeComputed,
            vueBergBlock: i.vueBergBlock
          })
        ])
      ];
    }),
    _: 3
  }, 8, ["data-block-width", "class"]);
}
const Tw = /* @__PURE__ */ gt(yw, [["render", Cw]]), Ew = gw, Aw = Tw;
export {
  Aw as BaseVueBergBlock,
  Ew as VueBerg
};
