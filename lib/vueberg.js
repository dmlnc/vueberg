import { openBlock as D, createElementBlock as z, normalizeClass as Ut, renderSlot as fs, createCommentVNode as se, resolveComponent as je, createElementVNode as P, withModifiers as Ie, createVNode as st, withCtx as Tt, toDisplayString as Fe, Fragment as Le, renderList as Ye, createBlock as We, defineComponent as Ir, ref as Rr, onMounted as ho, onBeforeUnmount as Gs, h as Mt, reactive as po, markRaw as Ys, getCurrentInstance as ef, watchEffect as tf, nextTick as nf, unref as di, Teleport as rf, customRef as of, watch as Ec, computed as sf, TransitionGroup as lf, resolveDynamicComponent as af, mergeProps as cf, toHandlers as uf, withDirectives as df, vModelText as ff, createTextVNode as Ac, withKeys as Rl } from "vue";
const pt = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, i] of e)
    t[r] = i;
  return t;
}, hf = {
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
}, pf = ["data-tooltip", "innerHTML"];
function mf(n, e, t, r, i, o) {
  return D(), z("button", {
    class: Ut(["vueberg-button", t.active ? t.activeClass : ""]),
    "data-tooltip": t.label,
    innerHTML: t.content
  }, null, 10, pf);
}
const Qs = /* @__PURE__ */ pt(hf, [["render", mf]]), gf = {
  data() {
    return {
      showDropdown: !1
    };
  },
  computed: {
    hasDropdown() {
      return !!this.$slots.dropdown;
    }
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
function yf(n, e, t, r, i, o) {
  return D(), z("div", {
    class: "vueberg-menu-item",
    onClick: e[0] || (e[0] = (...s) => o.toggleDropdown && o.toggleDropdown(...s))
  }, [
    fs(n.$slots, "default"),
    o.hasDropdown ? (D(), z("div", {
      key: 0,
      class: Ut([{
        "vueberg-menu-item-dropdown--left": t.align === "left",
        "vueberg-menu-item-dropdown--right": t.align === "right",
        "vueberg-menu-item-dropdown--open": i.showDropdown
      }, "vueberg-menu-item-dropdown"]),
      ref: "dropdown"
    }, [
      fs(n.$slots, "dropdown")
    ], 2)) : se("", !0)
  ]);
}
const Oc = /* @__PURE__ */ pt(gf, [["render", yf]]);
function fe(n) {
  this.content = n;
}
fe.prototype = {
  constructor: fe,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new fe(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1)
      return this;
    var t = this.content.slice();
    return t.splice(e, 2), new fe(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new fe([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new fe(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new fe(i);
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
    return n = fe.from(n), n.size ? new fe(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = fe.from(n), n.size ? new fe(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = fe.from(n);
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
fe.from = function(n) {
  if (n instanceof fe)
    return n;
  var e = [];
  if (n)
    for (var t in n)
      e.push(t, n[t]);
  return new fe(e);
};
function Nc(n, e, t) {
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
      let s = Nc(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function Dc(n, e, t, r) {
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
      let c = Dc(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
class x {
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
    return new x(i, this.size + e.size);
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
    return new x(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? x.empty : e == 0 && t == this.content.length ? this : new x(this.content.slice(e, t));
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
    return i[e] = t, new x(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new x([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new x(this.content.concat(e), this.size + e.nodeSize);
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
    return Nc(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Dc(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. (Not public.)
  */
  findIndex(e, t = -1) {
    if (e == 0)
      return ei(0, e);
    if (e == this.size)
      return ei(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let r = 0, i = 0; ; r++) {
      let o = this.child(r), s = i + o.nodeSize;
      if (s >= e)
        return s == e || t > 0 ? ei(r + 1, s) : ei(r, i);
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
      return x.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return new x(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return x.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new x(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return x.empty;
    if (e instanceof x)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new x([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
x.empty = new x([], 0);
const Lo = { index: 0, offset: 0 };
function ei(n, e) {
  return Lo.index = n, Lo.offset = e, Lo;
}
function vi(n, e) {
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
      if (!vi(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !vi(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let J = class hs {
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
    return this == e || this.type == e.type && vi(this.attrs, e.attrs);
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
      return hs.none;
    if (e instanceof hs)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
J.none = [];
class ki extends Error {
}
class E {
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
    let r = Lc(this.content, e + this.openStart, t);
    return r && new E(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new E(Bc(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return E.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new E(x.fromJSON(e, t.content), r, i);
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
    return new E(e, r, i);
  }
}
E.empty = new E(x.empty, 0, 0);
function Bc(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Bc(o.content, e - i - 1, t - i - 1)));
}
function Lc(n, e, t, r) {
  let { index: i, offset: o } = n.findIndex(e), s = n.maybeChild(i);
  if (o == e || s.isText)
    return r && !r.canReplace(i, i, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let l = Lc(s.content, e - o - 1, t);
  return l && n.replaceChild(i, s.copy(l));
}
function bf(n, e, t) {
  if (t.openStart > n.depth)
    throw new ki("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new ki("Inconsistent open depths");
  return Ic(n, e, t, 0);
}
function Ic(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Ic(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return un(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = vf(t, n);
      return un(o, Pc(n, s, l, e, r));
    }
  else
    return un(o, wi(n, e, r));
}
function Rc(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new ki("Cannot join " + e.type.name + " onto " + n.type.name);
}
function ps(n, e, t) {
  let r = n.node(t);
  return Rc(r, e.node(t)), r;
}
function cn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function ur(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (cn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    cn(i.child(l), r);
  e && e.depth == t && e.textOffset && cn(e.nodeBefore, r);
}
function un(n, e) {
  return n.type.checkContent(e), n.copy(e);
}
function Pc(n, e, t, r, i) {
  let o = n.depth > i && ps(n, e, i + 1), s = r.depth > i && ps(t, r, i + 1), l = [];
  return ur(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Rc(o, s), cn(un(o, Pc(n, e, t, r, i + 1)), l)) : (o && cn(un(o, wi(n, e, i + 1)), l), ur(e, t, i, l), s && cn(un(s, wi(t, r, i + 1)), l)), ur(r, null, i, l), new x(l);
}
function wi(n, e, t) {
  let r = [];
  if (ur(null, n, t, r), n.depth > t) {
    let i = ps(n, e, t + 1);
    cn(un(i, wi(n, e, t + 1)), r);
  }
  return ur(e, null, t, r), new x(r);
}
function vf(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(x.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class kr {
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
        return new xi(this, e, r);
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
    return new kr(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    for (let i = 0; i < Io.length; i++) {
      let o = Io[i];
      if (o.pos == t && o.doc == e)
        return o;
    }
    let r = Io[Ro] = kr.resolve(e, t);
    return Ro = (Ro + 1) % kf, r;
  }
}
let Io = [], Ro = 0, kf = 12;
class xi {
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
const wf = /* @__PURE__ */ Object.create(null);
let dn = class ms {
  /**
  @internal
  */
  constructor(e, t, r, i = J.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || x.empty;
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
    return this.type == e && vi(this.attrs, t || e.defaultAttrs || wf) && J.sameSet(this.marks, r || J.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new ms(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new ms(this.type, this.attrs, this.content, e);
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
      return E.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new E(c, i.depth - s, o.depth - s);
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
    return bf(this.resolve(e), this.resolve(t), r);
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
    return kr.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return kr.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Fc(this.marks, e);
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
  canReplace(e, t, r = x.empty, i = 0, o = r.childCount) {
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
    let i = x.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
dn.prototype.text = void 0;
class Ci extends dn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Fc(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Ci(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Ci(this.type, this.attrs, e, this.marks);
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
function Fc(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class gn {
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
    let r = new xf(e, t);
    if (r.next == null)
      return gn.empty;
    let i = zc(r);
    r.next && r.err("Unexpected trailing text");
    let o = Of(Af(i));
    return Nf(o, r), o;
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
        return x.from(l.map((c) => c.createAndFill()));
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
gn.empty = new gn(!0);
class xf {
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
function zc(n) {
  let e = [];
  do
    e.push(Cf(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Cf(n) {
  let e = [];
  do
    e.push(Tf(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Tf(n) {
  let e = Ef(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Sf(n, e);
    else
      break;
  return e;
}
function Pl(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Sf(n, e) {
  let t = Pl(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Pl(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Mf(n, e) {
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
function Ef(n) {
  if (n.eat("(")) {
    let e = zc(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Mf(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Af(n) {
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
function Hc(n, e) {
  return e - n;
}
function Fl(n, e) {
  let t = [];
  return r(e), t.sort(Hc);
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
function Of(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Fl(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Fl(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new gn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Hc);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Nf(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Vc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function $c(n, e) {
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
function _c(n) {
  let e = /* @__PURE__ */ Object.create(null);
  if (n)
    for (let t in n)
      e[t] = new Df(n[t]);
  return e;
}
let zl = class jc {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = _c(r.attrs), this.defaultAttrs = Vc(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == gn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : $c(this.attrs, e);
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
    return new dn(this, this.computeAttrs(e), x.from(t), J.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = x.from(t), this.checkContent(t), new dn(this, this.computeAttrs(e), t, J.setFrom(r));
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
    if (e = this.computeAttrs(e), t = x.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(x.empty, !0);
    return o ? new dn(this, e, t.append(o), J.setFrom(r)) : null;
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
    e.forEach((o, s) => r[o] = new jc(o, t, s));
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
class Df {
  constructor(e) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(e, "default"), this.default = e.default;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class mo {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = _c(i.attrs), this.excluded = null;
    let o = Vc(this.attrs);
    this.instance = o ? new J(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new J(this, $c(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new mo(o, i++, t, s)), r;
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
class Bf {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = fe.from(e.nodes), t.marks = fe.from(e.marks || {}), this.nodes = zl.compile(this.spec.nodes, this), this.marks = mo.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = gn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? Hl(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : Hl(this, s.split(" "));
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
    else if (e instanceof zl) {
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
    return new Ci(r, r.defaultAttrs, e, J.setFrom(t));
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
    return dn.fromJSON(this, e);
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
function Hl(n, e) {
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
function Lf(n) {
  return n.tag != null;
}
function If(n) {
  return n.style != null;
}
class jn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [], t.forEach((r) => {
      Lf(r) ? this.tags.push(r) : If(r) && this.styles.push(r);
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
    let r = new $l(this, t, !1);
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
    let r = new $l(this, t, !0);
    return r.addAll(e, t.from, t.to), E.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Ff(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = _l(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = _l(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new jn(e, jn.schemaRules(e)));
  }
}
const Wc = {
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
}, Rf = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, qc = { ol: !0, ul: !0 }, Ti = 1, Si = 2, dr = 4;
function Vl(n, e, t) {
  return e != null ? (e ? Ti : 0) | (e === "full" ? Si : 0) : n && n.whitespace == "pre" ? Ti | Si : t & ~dr;
}
class ti {
  constructor(e, t, r, i, o, s, l) {
    this.type = e, this.attrs = t, this.marks = r, this.pendingMarks = i, this.solid = o, this.options = l, this.content = [], this.activeMarks = J.none, this.stashMarks = [], this.match = s || (l & dr ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(x.from(e));
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
    if (!(this.options & Ti)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = x.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(x.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  popFromStashMark(e) {
    for (let t = this.stashMarks.length - 1; t >= 0; t--)
      if (e.eq(this.stashMarks[t]))
        return this.stashMarks.splice(t, 1)[0];
  }
  applyPending(e) {
    for (let t = 0, r = this.pendingMarks; t < r.length; t++) {
      let i = r[t];
      (this.type ? this.type.allowsMarkType(i.type) : Hf(i.type, e)) && !i.isInSet(this.activeMarks) && (this.activeMarks = i.addToSet(this.activeMarks), this.pendingMarks = i.removeFromSet(this.pendingMarks));
    }
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Wc.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class $l {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0;
    let i = t.topNode, o, s = Vl(null, t.preserveWhitespace, 0) | (r ? dr : 0);
    i ? o = new ti(i.type, i.attrs, J.none, J.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new ti(null, null, J.none, J.none, !0, null, s) : o = new ti(e.schema.topNodeType, null, J.none, J.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let i = this.readStyles(zf(r));
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
    if (r.options & Si || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(t)) {
      if (r.options & Ti)
        r.options & Si ? t = t.replace(/\r\n?/g, `
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
    qc.hasOwnProperty(r) && this.parser.normalizeLists && Pf(e);
    let o = this.options.ruleFromNode && this.options.ruleFromNode(e) || (i = this.parser.matchTag(e, this, t));
    if (o ? o.ignore : Rf.hasOwnProperty(r))
      this.findInside(e), this.ignoreFallback(e);
    else if (!o || o.skip || o.closeParent) {
      o && o.closeParent ? this.open = Math.max(0, this.open - 1) : o && o.skip.nodeType && (e = o.skip);
      let s, l = this.top, a = this.needsBlock;
      if (Wc.hasOwnProperty(r))
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
    let s = Vl(e, i, o.options);
    o.options & dr && o.content.length == 0 && (s |= dr), this.nodes.push(new ti(e, t, o.activeMarks, o.pendingMarks, r, null, s)), this.open++;
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
    let t = Vf(e, this.top.pendingMarks);
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
function Pf(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && qc.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ff(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function zf(n) {
  let e = /\s*([\w-]+)\s*:\s*([^;]+)/g, t, r = [];
  for (; t = e.exec(n); )
    r.push(t[1], t[2].trim());
  return r;
}
function _l(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Hf(n, e) {
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
function Vf(n, e) {
  for (let t = 0; t < e.length; t++)
    if (n.eq(e[t]))
      return e[t];
}
class at {
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
    r || (r = Po(t).createDocumentFragment());
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
    let { dom: r, contentDOM: i } = at.renderSpec(Po(t), this.nodes[e.type.name](e));
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
    return i && at.renderSpec(Po(r), i(e, t));
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
        let { dom: f, contentDOM: h } = at.renderSpec(e, d, r);
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
    return e.cached.domSerializer || (e.cached.domSerializer = new at(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = jl(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return jl(e.marks);
  }
}
function jl(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function Po(n) {
  return n.document || window.document;
}
const Kc = 65535, Uc = Math.pow(2, 16);
function $f(n, e) {
  return n + e * Uc;
}
function Wl(n) {
  return n & Kc;
}
function _f(n) {
  return (n - (n & Kc)) / Uc;
}
const Jc = 1, Gc = 2, fi = 4, Yc = 8;
class gs {
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
    return (this.delInfo & Yc) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Jc | fi)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Gc | fi)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & fi) > 0;
  }
}
class Re {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Re.empty)
      return Re.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Wl(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + _f(e);
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
        let p = e == (t < 0 ? a : d) ? null : $f(l / 3, e - a), m = e == a ? Gc : e == d ? Jc : fi;
        return (t < 0 ? e != a : e != d) && (m |= Yc), new gs(h, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new gs(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Wl(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new Re(this.ranges, !this.inverted);
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
    return e == 0 ? Re.empty : new Re(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Re.empty = new Re([]);
class Fn {
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
    return new Fn(this.maps, this.mirror, e, t);
  }
  /**
  @internal
  */
  copy() {
    return new Fn(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
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
    let e = new Fn();
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
    return r ? e : new gs(e, i, null);
  }
}
const Fo = /* @__PURE__ */ Object.create(null);
class be {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Re.empty;
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
    let r = Fo[t.stepType];
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
    if (e in Fo)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Fo[e] = t, t.prototype.jsonID = e, t;
  }
}
class ie {
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
    return new ie(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new ie(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return ie.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof ki)
        return ie.fail(o.message);
      throw o;
    }
  }
}
function Xs(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Xs(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return x.fromArray(r);
}
class zt extends be {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new E(Xs(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ie.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new ct(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new zt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof zt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new zt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new zt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
be.jsonID("addMark", zt);
class ct extends be {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new E(Xs(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ie.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new zt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new ct(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ct && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ct(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new ct(t.from, t.to, e.markFromJSON(t.mark));
  }
}
be.jsonID("removeMark", ct);
class Ht extends be {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ie.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ie.fromReplace(e, this.pos, this.pos + 1, new E(x.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new Ht(this.pos, t.marks[i]);
        return new Ht(this.pos, this.mark);
      }
    }
    return new Wn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ht(t.pos, this.mark);
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
    return new Ht(t.pos, e.markFromJSON(t.mark));
  }
}
be.jsonID("addNodeMark", Ht);
class Wn extends be {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ie.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ie.fromReplace(e, this.pos, this.pos + 1, new E(x.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new Ht(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Wn(t.pos, this.mark);
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
    return new Wn(t.pos, e.markFromJSON(t.mark));
  }
}
be.jsonID("removeNodeMark", Wn);
class oe extends be {
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
    return this.structure && ys(e, this.from, this.to) ? ie.fail("Structure replace would overwrite content") : ie.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Re([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new oe(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deletedAcross && r.deletedAcross ? null : new oe(t.pos, Math.max(t.pos, r.pos), this.slice);
  }
  merge(e) {
    if (!(e instanceof oe) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? E.empty : new E(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new oe(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? E.empty : new E(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new oe(e.from, this.to, t, this.structure);
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
    return new oe(t.from, t.to, E.fromJSON(e, t.slice), !!t.structure);
  }
}
be.jsonID("replace", oe);
class ce extends be {
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
    if (this.structure && (ys(e, this.from, this.gapFrom) || ys(e, this.gapTo, this.to)))
      return ie.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ie.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ie.fromReplace(e, this.from, this.to, r) : ie.fail("Content does not fit in gap");
  }
  getMap() {
    return new Re([
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
    return new ce(t.from, t.to, t.gapFrom, t.gapTo, E.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
be.jsonID("replaceAround", ce);
function ys(n, e, t) {
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
function jf(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (s && s.to == f && s.mark.eq(d[m]) ? s.to = h : i.push(s = new ct(f, h, d[m])));
      l && l.to == f ? l.to = h : o.push(l = new zt(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function Wf(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof mo) {
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
  }), i.forEach((s) => n.step(new ct(s.from, s.to, s.style)));
}
function Qc(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      s.push(new oe(l, u, E.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new ct(l, u, c.marks[f]));
      if (i && c.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new E(x.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new oe(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(x.empty, !0);
    n.replace(l, l, new E(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function qf(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Zn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth; ; --r) {
    let i = n.$from.node(r), o = n.$from.index(r), s = n.$to.indexAfter(r);
    if (r < n.depth && i.canReplace(o, s, t))
      return r;
    if (r == 0 || i.type.spec.isolating || !qf(i, o, s))
      break;
  }
  return null;
}
function Kf(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = x.empty, d = 0;
  for (let p = o, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = x.from(r.node(p).copy(u)), d++) : a--;
  let f = x.empty, h = 0;
  for (let p = o, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = x.from(i.node(p).copy(f)), h++) : c++;
  n.step(new ce(a, c, s, l, new E(u.append(f), d, h), u.size - d, !0));
}
function Zs(n, e, t = null, r = n) {
  let i = Uf(n, e), o = i && Jf(r, e);
  return o ? i.map(ql).concat({ type: e, attrs: t }).concat(o.map(ql)) : null;
}
function ql(n) {
  return { type: n, attrs: null };
}
function Uf(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Jf(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function Gf(n, e, t) {
  let r = x.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = x.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new ce(i, o, i, o, new E(r, 0, 0), t.length, !0));
}
function Yf(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (s.isTextblock && !s.hasMarkup(r, i) && Zf(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let f = r.whitespace == "pre", h = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        f && !h ? a = !1 : !f && h && (a = !0);
      }
      a === !1 && Xf(n, s, l, o), Qc(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let c = n.mapping.slice(o), u = c.map(l, 1), d = c.map(l + s.nodeSize, 1);
      return n.step(new ce(u, d, u + 1, d - 1, new E(x.from(r.create(i, null, s.marks)), 0, 0), 1, !0)), a === !0 && Qf(n, s, l, o), !1;
    }
  });
}
function Qf(n, e, t, r) {
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
function Xf(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Zf(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function eh(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new ce(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new E(x.from(s), 0, 0), 1, !0));
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
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function th(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = x.empty, s = x.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = x.from(i.node(l).copy(o));
    let u = r && r[c];
    s = x.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new oe(e, e, new E(o.append(s), t, t), !0));
}
function Jt(n, e) {
  let t = n.resolve(e), r = t.index();
  return Xc(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Xc(n, e) {
  return !!(n && e && !n.isLeaf && n.canAppend(e));
}
function go(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Xc(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function nh(n, e, t) {
  let r = new oe(e - t, e + t, E.empty, !0);
  n.step(r);
}
function rh(n, e, t) {
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
function ih(n, e, t) {
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
function yo(n, e, t = e, r = E.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Zc(i, o, r) ? new oe(e, t, r) : new oh(i, o, r).fit();
}
function Zc(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class oh {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = x.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = x.from(e.node(i).copy(this.placed));
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
    let a = new E(o, s, l);
    return e > -1 ? new ce(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new oe(r.pos, i.pos, a) : null;
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
        r ? (o = zo(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? c.matchType(s.type) || (d = c.fillBefore(x.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = zo(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new E(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = zo(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new E(lr(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new E(lr(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: o }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (o)
      for (let m = 0; m < o.length; m++)
        this.openFrontierNode(o[m]);
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), g = d.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (d = g, u.push(eu(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = ar(this.placed, t, x.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = l; m < h; m++) {
      let b = g.lastChild;
      this.frontier.push({ type: b.type, match: b.contentMatchAt(b.childCount) }), g = b.content;
    }
    this.unplaced = p ? e == 0 ? E.empty : new E(lr(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new E(lr(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Ho(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e:
      for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
        let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = Ho(e, t, i, r, o);
        if (s) {
          for (let l = t - 1; l >= 0; l--) {
            let { match: a, type: c } = this.frontier[l], u = Ho(e, l, c, a, !0);
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
    t.fit.childCount && (this.placed = ar(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = ar(this.placed, this.depth, x.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(x.empty, !0);
    t.childCount && (this.placed = ar(this.placed, this.frontier.length, t));
  }
}
function lr(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(lr(n.firstChild.content, e - 1, t)));
}
function ar(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(ar(n.lastChild.content, e - 1, t)));
}
function zo(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function eu(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, eu(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(x.empty, !0)))), n.copy(r);
}
function Ho(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !sh(t, o.content, s) ? l : null;
}
function sh(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function lh(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function ah(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Zc(i, o, r))
    return n.step(new oe(e, t, r));
  let s = nu(i, n.doc.resolve(t));
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
    let h = c[f], p = lh(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let m = 0; m < s.length; m++) {
        let g = s[(m + a) % s.length], b = !0;
        g < 0 && (b = !1, g = -g);
        let w = i.node(g - 1), C = i.index(g - 1);
        if (w.canReplaceWith(C, C, p.type, p.marks))
          return n.replace(i.before(g), b ? o.after(g) : t, new E(tu(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function tu(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(tu(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(x.empty, !0));
  }
  return n;
}
function ch(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = rh(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new E(x.from(r), 0, 0));
}
function uh(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t), o = nu(r, i);
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
function nu(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Hn extends be {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ie.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return ie.fromReplace(e, this.pos, this.pos + 1, new E(x.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Re.empty;
  }
  invert(e) {
    return new Hn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Hn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Hn(t.pos, t.attr, t.value);
  }
}
be.jsonID("attr", Hn);
class wr extends be {
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
    return ie.ok(r);
  }
  getMap() {
    return Re.empty;
  }
  invert(e) {
    return new wr(this.attr, e.attrs[this.attr]);
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
    return new wr(t.attr, t.value);
  }
}
be.jsonID("docAttr", wr);
let qn = class extends Error {
};
qn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
qn.prototype = Object.create(Error.prototype);
qn.prototype.constructor = qn;
qn.prototype.name = "TransformError";
class ru {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Fn();
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
      throw new qn(t.failed);
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
  replace(e, t = e, r = E.empty) {
    let i = yo(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new E(x.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, E.empty);
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
    return ah(this, e, t, r), this;
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
    return ch(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return uh(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Kf(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return nh(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Gf(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Yf(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return eh(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Hn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new wr(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new Ht(e, t)), this;
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
    return this.step(new Wn(e, t)), this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split.
  */
  split(e, t = 1, r) {
    return th(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return jf(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Wf(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Qc(this, e, t, r), this;
  }
}
const Vo = /* @__PURE__ */ Object.create(null);
class V {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new dh(e.min(t), e.max(t))];
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
  replace(e, t = E.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? E.empty : t), l == 0 && Jl(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Jl(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new F(e) : Dn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Dn(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Dn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Ze(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Dn(e, e, 0, 0, 1) || new Ze(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Dn(e, e, e.content.size, e.childCount, -1) || new Ze(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Vo[t.type];
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
    if (e in Vo)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Vo[e] = t, t.prototype.jsonID = e, t;
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
    return F.between(this.$anchor, this.$head).getBookmark();
  }
}
V.prototype.visible = !0;
class dh {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Kl = !1;
function Ul(n) {
  !Kl && !n.parent.inlineContent && (Kl = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class F extends V {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Ul(e), Ul(t), super(e, t);
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
    return new F(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = E.empty) {
    if (super.replace(e, t), t == E.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof F && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new bo(this.anchor, this.head);
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
    return new F(e.resolve(t.anchor), e.resolve(t.head));
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
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (V.findFrom(e, -r, !0) || V.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new F(e, t);
  }
}
V.jsonID("text", F);
class bo {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new bo(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return F.between(e.resolve(this.anchor), e.resolve(this.head));
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
    return new E(x.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof B && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new el(this.anchor);
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
class el {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new bo(r, r) : new el(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && B.isSelectable(r) ? new B(t) : V.near(t);
  }
}
class Ze extends V {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = E.empty) {
    if (t == E.empty) {
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
    return new Ze(e);
  }
  map(e) {
    return new Ze(e);
  }
  eq(e) {
    return e instanceof Ze;
  }
  getBookmark() {
    return fh;
  }
}
V.jsonID("all", Ze);
const fh = {
  map() {
    return this;
  },
  resolve(n) {
    return new Ze(n);
  }
};
function Dn(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return F.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && B.isSelectable(l))
        return B.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Dn(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Jl(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof oe || i instanceof ce))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(V.near(n.doc.resolve(s), t));
}
const Gl = 1, ni = 2, Yl = 4;
class hh extends ru {
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
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Gl) & ~ni, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & Gl) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= ni, this;
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
    return (this.updated & ni) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~ni, this.storedMarks = null;
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
    return this.updated |= Yl, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & Yl) > 0;
  }
}
function Ql(n, e) {
  return !e || !n ? n : n.bind(e);
}
class cr {
  constructor(e, t, r) {
    this.name = e, this.init = Ql(t.init, r), this.apply = Ql(t.apply, r);
  }
}
const ph = [
  new cr("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new cr("selection", {
    init(n, e) {
      return n.selection || V.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new cr("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new cr("scrollToSelection", {
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
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = ph.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new cr(r.key, r.spec.state, r));
    });
  }
}
class Rn {
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
    let t = new Rn(this.config), r = this.config.fields;
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
    return new hh(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new $o(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new Rn(t);
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
    let t = new $o(this.schema, e.plugins), r = t.fields, i = new Rn(t);
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
    let i = new $o(e.schema, e.plugins), o = new Rn(i);
    return i.fields.forEach((s) => {
      if (s.name == "doc")
        o.doc = dn.fromJSON(e.schema, t.doc);
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
function iu(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = iu(i, e, {})), t[r] = i;
  }
  return t;
}
class le {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && iu(e.props, this, this.props), this.key = e.key ? e.key.key : ou("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const _o = /* @__PURE__ */ Object.create(null);
function ou(n) {
  return n in _o ? n + "$" + ++_o[n] : (_o[n] = 0, n + "$");
}
class ve {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = ou(e);
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
const su = function(n, e = 0) {
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
}, mh = function(n) {
  const { state: e, view: t } = n, { selection: r } = e, i = n.commands.getCurrentNode();
  if (!i)
    return new DOMRect(0, 0, 0, 0);
  const o = r.$anchor.before(i.depth), s = t.coordsAtPos(o);
  return new DOMRect(s.left, s.top, 0, 0);
}, gh = function(n) {
  const e = n.view.state.selection.from, t = n.$pos(e).element;
  if (t) {
    const r = t.getBoundingClientRect();
    return new DOMRect(r.x + r.width - 50, r.top + r.height / 2, 0, 0);
  }
  return new DOMRect(0, 0, 0, 0);
}, yh = function(n) {
  const e = n.state.selection.$from;
  return e.node(1) == null && n.lastSelectedViewDesc ? n.lastSelectedViewDesc.node : e.node(1);
};
let bh = function(n, e) {
  const t = [];
  for (let r = 0; r < n.childCount; r++)
    t.push(
      e(n.child(r), r, n instanceof x ? n : n.content)
    );
  return t;
};
const vh = function({ view: n, dir: e, currentResolved: t }) {
  if (!t)
    return !1;
  let r = n.state.tr;
  const i = e === "DOWN", o = t.node(1) || t.nodeAfter, s = 0, l = t.node(s), a = t.start(s), c = bh(l, (g) => g);
  let u = c.indexOf(o);
  if (u == -1)
    return !1;
  let d = i ? u + 1 : u - 1;
  if (d >= c.length || d < 0)
    return !1;
  const f = c[d].nodeSize;
  [c[u], c[d]] = [c[d], c[u]];
  let h = a, p = t.end(s);
  const m = new E(x.fromArray(c), 0, 0);
  r.step(new oe(h, p, m, !1)), r.setSelection(
    V.near(
      r.doc.resolve(
        i ? t.pos + f : t.pos - f
      )
    )
  ), n.dispatch(r);
};
const kh = {
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
    }
  },
  components: {
    MenuButton: Qs,
    MenuItem: Oc
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
    // currentBlockTool(){
    //   if(!this.editor){
    //     return null;
    //   }
    //   return this.editor.storage.vuebergBlocks.currentBlockTool
    // },
    currentNode() {
      return this.editor ? this.editor.storage.vuebergBlocks.currentNode : null;
    },
    canBeConvertedTo() {
      var n, e;
      return ((e = (n = this.currentBlockTool) == null ? void 0 : n.toolbar) == null ? void 0 : e.canBeConverted) === !1 ? [] : this.editor.storage.vuebergBlocks.getFlatBlocks().filter((t) => {
        var r, i;
        return ((i = (r = this.currentBlockTool) == null ? void 0 : r.toolbar) == null ? void 0 : i.canBeConverted[t.name]) && t.convertCommand;
      });
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
      if (!this.currentBlockTool)
        return [];
      let n = this.menuCount;
      return this.menuItems.map((e) => {
        if (n <= 0)
          return { ...e, buttons: [] };
        if (!e.buttons)
          return { ...e, buttons: [] };
        if (e.buttons.length <= n)
          return n -= e.buttons.length, e;
        {
          const t = e.buttons.slice(0, n);
          return n = 0, { ...e, buttons: t };
        }
      }).filter((e) => {
        var t;
        return e && e.buttons && ((t = e == null ? void 0 : e.buttons) == null ? void 0 : t.length) > 0;
      });
    },
    remainingMenuItems() {
      if (!this.currentBlockTool)
        return [];
      let n = this.menuCount;
      return this.menuItems.map((e) => {
        if (n <= 0 || !e.buttons)
          return e;
        if (e.buttons.length <= n)
          return n -= e.buttons.length, { ...e, buttons: [] };
        {
          const t = e.buttons.slice(n);
          return n = 0, { ...e, buttons: t };
        }
      }).filter((e) => {
        var t;
        return e && e.buttons && ((t = e == null ? void 0 : e.buttons) == null ? void 0 : t.length) > 0;
      });
    },
    menuCount() {
      var a, c, u, d, f, h;
      let n = this.vuebergWidth > 700 ? 700 : this.vuebergWidth;
      const e = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vueberg-button-size")) || 30, t = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vueberg-toolbar-gap")) || 2, r = 2 * (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vueberg-toolbar-group-margin")) || 10), i = 1;
      n -= 15, n -= 2 * e, n -= t, n -= r + i, n -= this.activeAlignmentTools.length * e, n -= t * (this.activeAlignmentTools.length ? this.activeAlignmentTools.length - 1 : 0), n -= r + i;
      const o = (c = (a = this.currentBlockTool) == null ? void 0 : a.tools) == null ? void 0 : c.length;
      let s = 0, l = 0;
      return (d = (u = this.currentBlockTool) == null ? void 0 : u.tools) != null && d.length && (l = e * o, l += t * (o ? o - 1 : 0)), n < l + r + i ? Math.floor((n - r - i) / (e + t)) : (s = (h = (f = this.currentBlockTool) == null ? void 0 : f.tools) == null ? void 0 : h.length, n -= l, n -= r, n -= i, s == null && (s = 0), Math.floor(n / (t + e)) + s);
    },
    menuItems() {
      var n, e, t, r, i, o, s;
      return this.currentBlockTool ? [
        {
          type: "currentBlockTools",
          condition: (e = (n = this.currentBlockTool) == null ? void 0 : n.tools) == null ? void 0 : e.length,
          buttons: (r = (t = this.currentBlockTool) == null ? void 0 : t.tools) == null ? void 0 : r.map((l) => {
            var a, c;
            return {
              click: () => l.command.call(0, this.editor),
              icon: l.icon,
              label: l.title,
              activeClass: l.isActiveClass,
              disabled: (a = l.isDisabledTest) == null ? void 0 : a.call(0, this.editor),
              active: (c = l.isActiveTest) == null ? void 0 : c.call(0, this.editor)
            };
          })
        },
        {
          type: "inlineTools",
          condition: (o = (i = this.currentBlockTool) == null ? void 0 : i.toolbar) == null ? void 0 : o.inlineTools,
          buttons: (() => {
            var a, c;
            const l = (c = (a = this.currentBlockTool) == null ? void 0 : a.toolbar) == null ? void 0 : c.inlineTools;
            return l === !0 ? this.inlineTools.map((u) => ({
              click: () => u.command(this.editor),
              icon: u.icon,
              label: u.title,
              activeClass: u.isActiveClass,
              disabled: !1,
              active: u.isActiveTest(this.editor)
            })) : typeof l == "object" ? Object.keys(l).filter((d) => l[d]).map((d) => this.inlineTools.find((f) => f.name === d)).filter((d) => d).map((d) => ({
              click: () => d.command(this.editor),
              icon: d.icon,
              label: d.title,
              activeClass: d.isActiveClass,
              disabled: !1,
              active: d.isActiveTest(this.editor)
            })) : [];
          })()
        },
        {
          type: "control",
          condition: this.editor.can().deleteNode((s = this.currentBlockTool) == null ? void 0 : s.nodeType),
          buttons: [
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
          ]
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
      vh({
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
}, wh = { class: "vueberg-toolbar" }, xh = { class: "vueberg-button-group vueberg-button-group-separate" }, Ch = { class: "vueberg-button-group vueberg-button-group-column vueberg-toolbar-order" }, Th = ["disabled", "data-tooltip"], Sh = /* @__PURE__ */ P("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  "aria-hidden": "true",
  focusable: "false",
  viewBox: "6.5 8 11 5.6"
}, [
  /* @__PURE__ */ P("path", { d: "M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z" })
], -1), Mh = [
  Sh
], Eh = ["disabled", "data-tooltip"], Ah = /* @__PURE__ */ P("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  "aria-hidden": "true",
  viewBox: "6.5 10.4 11 5.6"
}, [
  /* @__PURE__ */ P("path", { d: "M17.5 11.6 12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" })
], -1), Oh = [
  Ah
], Nh = {
  key: 0,
  class: "vueberg-button-group vueberg-button-group-separate"
}, Dh = { class: "vueberg-toolbar-transform-to" }, Bh = {
  key: 0,
  class: "vueberg-button-group vueberg-button-group-separate"
}, Lh = {
  key: 1,
  class: "vueberg-button-group vueberg-button-group-separate"
};
function Ih(n, e, t, r, i, o) {
  var a, c;
  const s = je("menu-button"), l = je("menu-item");
  return D(), z("div", wh, [
    P("div", xh, [
      P("div", Ch, [
        P("button", {
          onClick: e[0] || (e[0] = Ie((u) => o.moveNode("UP"), ["prevent"])),
          disabled: !o.canMoveNodeUp(),
          "data-tooltip": i.upLabel,
          class: "vueberg-button--toolbar-order vueberg-button"
        }, Mh, 8, Th),
        P("button", {
          onClick: e[1] || (e[1] = Ie((u) => o.moveNode("DOWN"), ["prevent"])),
          disabled: !o.canMoveNodeDown(),
          "data-tooltip": i.downLabel,
          class: "vueberg-button--toolbar-order vueberg-button"
        }, Oh, 8, Eh)
      ]),
      (a = t.currentBlockTool) != null && a.icon && ((c = t.currentBlockTool) != null && c.name) ? (D(), z("div", Nh, [
        st(l, null, {
          dropdown: Tt(() => [
            P("div", Dh, Fe(i.transformToLabel), 1),
            (D(!0), z(Le, null, Ye(o.canBeConvertedTo, (u) => (D(), We(s, {
              content: u.icon + " " + u.title,
              key: u.title,
              onClick: Ie((d) => o.runConvertCommand(u), ["prevent"]),
              class: "vueberg-button-text vueberg-button-md"
            }, null, 8, ["content", "onClick"]))), 128))
          ]),
          default: Tt(() => {
            var u, d, f, h;
            return [
              st(s, {
                label: (u = t.currentBlockTool) == null ? void 0 : u.title,
                content: (d = t.currentBlockTool) == null ? void 0 : d.icon,
                class: Ut((h = (f = t.currentBlockTool) == null ? void 0 : f.toolbar) != null && h.canBeConverted && o.canBeConvertedTo.length ? "vueberg-button-secondary" : "")
              }, null, 8, ["label", "content", "class"])
            ];
          }),
          _: 1
        })
      ])) : se("", !0)
    ]),
    o.activeAlignmentTools.length ? (D(), z("div", Bh, [
      (D(!0), z(Le, null, Ye(o.activeAlignmentTools, (u, d) => (D(), We(l, { key: d }, {
        dropdown: Tt(() => [
          (D(!0), z(Le, null, Ye(u.tools, (f) => {
            var h;
            return D(), We(s, {
              class: "vueberg-button-text vueberg-button-md",
              key: f.title,
              content: f.icon + " " + f.title,
              onClick: Ie((p) => f.command(t.editor), ["prevent"]),
              active: f.isActiveTest(t.editor, (h = t.currentBlockTool) == null ? void 0 : h.nodeType)
            }, null, 8, ["content", "onClick", "active"]);
          }), 128))
        ]),
        default: Tt(() => [
          st(s, {
            onClick: e[2] || (e[2] = Ie(() => {
            }, ["prevent"])),
            label: o.getActiveAlignmentTool(u.tools).title,
            content: o.getActiveAlignmentTool(u.tools).icon
          }, null, 8, ["label", "content"])
        ]),
        _: 2
      }, 1024))), 128))
    ])) : se("", !0),
    (D(!0), z(Le, null, Ye(o.firstMenuItems, (u) => (D(), z(Le, null, [
      u.condition ? (D(), z("div", {
        key: u.type,
        class: "vueberg-button-group vueberg-button-group-separate"
      }, [
        (D(!0), z(Le, null, Ye(u.buttons, (d, f) => (D(), We(s, {
          key: f,
          content: d.icon,
          label: d.label,
          activeClass: d.activeClass,
          onClick: Ie(d.click, ["prevent"]),
          disabled: d.disabled,
          active: d.active
        }, null, 8, ["content", "label", "activeClass", "onClick", "disabled", "active"]))), 128))
      ])) : se("", !0)
    ], 64))), 256)),
    t.editor && o.remainingMenuItems.length ? (D(), z("div", Lh, [
      st(l, { align: "right" }, {
        dropdown: Tt(() => [
          (D(!0), z(Le, null, Ye(o.remainingMenuItems, (u) => (D(), z(Le, null, [
            u.condition ? (D(!0), z(Le, { key: 0 }, Ye(u.buttons, (d, f) => (D(), We(s, {
              key: f,
              class: "vueberg-button-md vueberg-button-text",
              content: d.icon + d.label,
              activeClass: d.activeClass,
              onClick: Ie(d.click, ["prevent"]),
              disabled: d.disabled,
              active: d.active
            }, null, 8, ["content", "activeClass", "onClick", "disabled", "active"]))), 128)) : se("", !0)
          ], 64))), 256))
        ]),
        default: Tt(() => [
          st(s, {
            class: "vueberg-button-secondary",
            onClick: e[3] || (e[3] = Ie(() => {
            }, ["prevent"])),
            label: i.moreLabel,
            content: i.moreIcon
          }, null, 8, ["label", "content"])
        ]),
        _: 1
      })
    ])) : se("", !0)
  ]);
}
const Rh = /* @__PURE__ */ pt(kh, [["render", Ih]]), he = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, xr = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let bs = null;
const xt = function(n, e, t) {
  let r = bs || (bs = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, Ph = function() {
  bs = null;
}, yn = function(n, e, t, r) {
  return t && (Xl(n, e, t, r, -1) || Xl(n, e, t, r, 1));
}, Fh = /^(img|br|input|textarea|hr)$/i;
function Xl(n, e, t, r, i) {
  for (; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : lt(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || Pr(n) || Fh.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = he(n) + (i < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (i < 0 ? -1 : 0)], n.contentEditable == "false")
        return !1;
      e = i < 0 ? lt(n) : 0;
    } else
      return !1;
  }
}
function lt(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function zh(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = lt(n);
    } else if (n.parentNode && !Pr(n))
      e = he(n), n = n.parentNode;
    else
      return null;
  }
}
function Hh(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !Pr(n))
      e = he(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function Vh(n, e, t) {
  for (let r = e == 0, i = e == lt(n); r || i; ) {
    if (n == t)
      return !0;
    let o = he(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && o == 0, i = i && o == lt(n);
  }
}
function Pr(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const vo = function(n) {
  return n.focusNode && yn(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function rn(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function $h(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function _h(n, e, t) {
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
const dt = typeof navigator < "u" ? navigator : null, Zl = typeof document < "u" ? document : null, Gt = dt && dt.userAgent || "", vs = /Edge\/(\d+)/.exec(Gt), lu = /MSIE \d/.exec(Gt), ks = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Gt), Ae = !!(lu || ks || vs), $t = lu ? document.documentMode : ks ? +ks[1] : vs ? +vs[1] : 0, et = !Ae && /gecko\/(\d+)/i.test(Gt);
et && +(/Firefox\/(\d+)/.exec(Gt) || [0, 0])[1];
const ws = !Ae && /Chrome\/(\d+)/.exec(Gt), we = !!ws, jh = ws ? +ws[1] : 0, xe = !Ae && !!dt && /Apple Computer/.test(dt.vendor), Kn = xe && (/Mobile\/\w+/.test(Gt) || !!dt && dt.maxTouchPoints > 2), _e = Kn || (dt ? /Mac/.test(dt.platform) : !1), Wh = dt ? /Win/.test(dt.platform) : !1, Qe = /Android \d/.test(Gt), Fr = !!Zl && "webkitFontSmoothing" in Zl.documentElement.style, qh = Fr ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Kh(n) {
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
function kt(n, e) {
  return typeof n == "number" ? n : n[e];
}
function Uh(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function ea(n, e, t) {
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, o = n.dom.ownerDocument;
  for (let s = t || n.dom; s; s = xr(s)) {
    if (s.nodeType != 1)
      continue;
    let l = s, a = l == o.body, c = a ? Kh(o) : Uh(l), u = 0, d = 0;
    if (e.top < c.top + kt(r, "top") ? d = -(c.top - e.top + kt(i, "top")) : e.bottom > c.bottom - kt(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + kt(i, "top") - c.top : e.bottom - c.bottom + kt(i, "bottom")), e.left < c.left + kt(r, "left") ? u = -(c.left - e.left + kt(i, "left")) : e.right > c.right - kt(r, "right") && (u = e.right - c.right + kt(i, "right")), u || d)
      if (a)
        o.defaultView.scrollBy(u, d);
      else {
        let f = l.scrollLeft, h = l.scrollTop;
        d && (l.scrollTop += d), u && (l.scrollLeft += u);
        let p = l.scrollLeft - f, m = l.scrollTop - h;
        e = { left: e.left - p, top: e.top - m, right: e.right - p, bottom: e.bottom - m };
      }
    if (a || /^(fixed|sticky)$/.test(getComputedStyle(s).position))
      break;
  }
}
function Jh(n) {
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
  return { refDOM: r, refTop: i, stack: au(n.dom) };
}
function au(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = xr(r))
    ;
  return e;
}
function Gh({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  cu(t, r == 0 ? 0 : r - e);
}
function cu(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: o } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != o && (r.scrollLeft = o);
  }
}
let En = null;
function Yh(n) {
  if (n.setActive)
    return n.setActive();
  if (En)
    return n.focus(En);
  let e = au(n);
  n.focus(En == null ? {
    get preventScroll() {
      return En = { preventScroll: !0 }, !0;
    }
  } : void 0), En || (En = !1, cu(e, 0));
}
function uu(n, e) {
  let t, r = 2e8, i, o = 0, s = e.top, l = e.top, a, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = xt(u).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= s && p.bottom >= l) {
        s = Math.max(p.bottom, s), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          t = u, r = m, i = m && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (o = d + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else
        p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (o = d + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? Qh(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: o } : uu(t, i);
}
function Qh(n, e) {
  let t = n.nodeValue.length, r = document.createRange();
  for (let i = 0; i < t; i++) {
    r.setEnd(n, i + 1), r.setStart(n, i);
    let o = Bt(r, 1);
    if (o.top != o.bottom && tl(e, o))
      return { node: n, offset: i + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
  }
  return { node: n, offset: 0 };
}
function tl(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function Xh(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function Zh(n, e, t) {
  let { node: r, offset: i } = uu(e, t), o = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let s = r.getBoundingClientRect();
    o = s.left != s.right && t.left > (s.left + s.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, o);
}
function ep(n, e, t, r) {
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
function du(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), o = i; ; ) {
      let s = n.childNodes[o];
      if (s.nodeType == 1) {
        let l = s.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (tl(e, c))
            return du(s, e, c);
        }
      }
      if ((o = (o + 1) % r) == i)
        break;
    }
  return n;
}
function tp(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, o = _h(t, e.left, e.top);
  o && ({ node: r, offset: i } = o);
  let s = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!s || !n.dom.contains(s.nodeType != 1 ? s.parentNode : s)) {
    let c = n.dom.getBoundingClientRect();
    if (!tl(e, c) || (s = du(n.dom, e, c), !s))
      return null;
  }
  if (xe)
    for (let c = s; r && c; c = xr(c))
      c.draggable && (r = void 0);
  if (s = Xh(s, e), r) {
    if (et && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && i++;
    }
    let c;
    Fr && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = ep(n, r, i, e));
  }
  l == null && (l = Zh(n, s, e));
  let a = n.docView.nearestDesc(s, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function ta(n) {
  return n.top < n.bottom || n.left < n.right;
}
function Bt(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (ta(r))
      return r;
  }
  return Array.prototype.find.call(t, ta) || n.getBoundingClientRect();
}
const np = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function fu(n, e, t) {
  let { node: r, offset: i, atom: o } = n.docView.domFromPos(e, t < 0 ? -1 : 1), s = Fr || et;
  if (r.nodeType == 3)
    if (s && (np.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = Bt(xt(r, i, i), t);
      if (et && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = Bt(xt(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = Bt(xt(r, i, i + 1), -1);
          if (u.top != a.top)
            return or(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, u = -1) : t >= 0 && i == r.nodeValue.length ? (a--, u = 1) : t < 0 ? a-- : c++, or(Bt(xt(r, a, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (o || 0)).parent.inlineContent) {
    if (o == null && i && (t < 0 || i == lt(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return jo(a.getBoundingClientRect(), !1);
    }
    if (o == null && i < lt(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return jo(a.getBoundingClientRect(), !0);
    }
    return jo(r.getBoundingClientRect(), t >= 0);
  }
  if (o == null && i && (t < 0 || i == lt(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? xt(a, lt(a) - (s ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return or(Bt(c, 1), !1);
  }
  if (o == null && i < lt(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? xt(a, 0, s ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return or(Bt(c, -1), !0);
  }
  return or(Bt(r.nodeType == 3 ? xt(r) : r, -t), t >= 0);
}
function or(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function jo(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function hu(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function rp(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return hu(n, e, () => {
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
    let s = fu(n, i.pos, 1);
    for (let l = o.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = xt(l, 0, l.nodeValue.length).getClientRects();
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
const ip = /[\u0590-\u08ac]/;
function op(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, o = !i, s = i == r.parent.content.size, l = n.domSelection();
  return !ip.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? o : s : hu(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", t, "character");
    let h = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: m } = n.domSelectionRange(), g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, d), a && (a != u || c != d) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), g;
  });
}
let na = null, ra = null, ia = !1;
function sp(n, e, t) {
  return na == e && ra == t ? ia : (na = e, ra = t, ia = t == "up" || t == "down" ? rp(n, e, t) : op(n, e, t));
}
const qe = 0, oa = 1, sn = 2, ft = 3;
class zr {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = qe, r.pmViewDesc = this;
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
      i = t > he(this.contentDOM);
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
      if (l > e || s instanceof mu) {
        i = e - o;
        break;
      }
      o = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let o; r && !(o = this.children[r - 1]).size && o instanceof pu && o.side >= 0; r--)
      ;
    if (t <= 0) {
      let o, s = !0;
      for (; o = r ? this.children[r - 1] : null, !(!o || o.dom.parentNode == this.contentDOM); r--, s = !1)
        ;
      return o && t && s && !o.border && !o.domAtom ? o.domFromPos(o.size, t) : { node: this.contentDOM, offset: o ? he(o.dom) + 1 : 0 };
    } else {
      let o, s = !0;
      for (; o = r < this.children.length ? this.children[r] : null, !(!o || o.dom.parentNode == this.contentDOM); r++, s = !1)
        ;
      return o && s && !o.border && !o.domAtom ? o.domFromPos(0, t) : { node: this.contentDOM, offset: o ? he(o.dom) : this.contentDOM.childNodes.length };
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
            i = he(f.dom) + 1;
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
            o = he(d.dom);
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
      let p = this.children[f], m = h + p.size;
      if (o > h && s < m)
        return p.setSelection(e - h - p.border, t - h - p.border, r, i);
      h = m;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.getSelection(), u = !1;
    if ((et || xe) && e == t) {
      let { node: f, offset: h } = l;
      if (f.nodeType == 3) {
        if (u = !!(h && f.nodeValue[h - 1] == `
`), u && h == f.nodeValue.length)
          for (let p = f, m; p; p = p.parentNode) {
            if (m = p.nextSibling) {
              m.nodeName == "BR" && (l = a = { node: m.parentNode, offset: he(m) + 1 });
              break;
            }
            let g = p.pmViewDesc;
            if (g && g.node && g.node.isBlock)
              break;
          }
      } else {
        let p = f.childNodes[h - 1];
        u = p && (p.nodeName == "BR" || p.contentEditable == "false");
      }
    }
    if (et && c.focusNode && c.focusNode != a.node && c.focusNode.nodeType == 1) {
      let f = c.focusNode.childNodes[c.focusOffset];
      f && f.contentEditable == "false" && (i = !0);
    }
    if (!(i || u && xe) && yn(l.node, l.offset, c.anchorNode, c.anchorOffset) && yn(a.node, a.offset, c.focusNode, c.focusOffset))
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
          this.dirty = e == r || t == s ? sn : oa, e == l && t == a && (o.contentLost || o.dom.parentNode != this.contentDOM) ? o.dirty = ft : o.markDirty(e - l, t - l);
          return;
        } else
          o.dirty = o.dom == o.contentDOM && o.dom.parentNode == this.contentDOM && !o.children.length ? sn : ft;
      }
      r = s;
    }
    this.dirty = sn;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? sn : oa;
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
class pu extends zr {
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
    return this.dirty == qe && e.type.eq(this.widget.type);
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
class lp extends zr {
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
class bn extends zr {
  constructor(e, t, r, i) {
    super(e, [], r, i), this.mark = t;
  }
  static create(e, t, r, i) {
    let o = i.nodeViews[t.type.name], s = o && o(t, i, r);
    return (!s || !s.dom) && (s = at.renderSpec(document, t.type.spec.toDOM(t, r))), new bn(e, t, s.dom, s.contentDOM || s.dom);
  }
  parseRule() {
    return this.dirty & ft || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != ft && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != qe) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = qe;
    }
  }
  slice(e, t, r) {
    let i = bn.create(this.parent, this.mark, !0, r), o = this.children, s = this.size;
    t < s && (o = Ts(o, t, s, r)), e > 0 && (o = Ts(o, 0, e, r));
    for (let l = 0; l < o.length; l++)
      o[l].parent = i;
    return i.children = o, i;
  }
}
class _t extends zr {
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
      u || ({ dom: u, contentDOM: d } = at.renderSpec(document, t.type.spec.toDOM(t)));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = bu(u, r, t), c ? a = new ap(e, t, r, i, u, d || null, f, c, o, s + 1) : t.isText ? new ko(e, t, r, i, u, f, o) : new _t(e, t, r, i, u, d || null, f, o, s + 1);
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
      e.contentElement || (e.getContent = () => x.empty);
    }
    return e;
  }
  matchesNode(e, t, r) {
    return this.dirty == qe && e.eq(this.node) && Cs(t, this.outerDeco) && r.eq(this.innerDeco);
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
    let r = this.node.inlineContent, i = t, o = e.composing ? this.localCompositionInfo(e, t) : null, s = o && o.pos > -1 ? o : null, l = o && o.pos < 0, a = new up(this, s && s.node, e);
    hp(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e) : c.type.side >= 0 && !d && a.syncToMarks(u == this.node.childCount ? J.none : this.node.child(u).marks, r, e), a.placeWidget(c, e, i);
    }, (c, u, d, f) => {
      a.syncToMarks(c.marks, r, e);
      let h;
      a.findNodeMatch(c, u, d, f) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(o.node)) > -1 && a.updateNodeAt(c, u, d, h, e) || a.updateNextNode(c, u, d, e, f, i) || a.addNode(c, u, d, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == sn) && (s && this.protectLocalComposition(e, s), gu(this.contentDOM, this.children, e), Kn && pp(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof F) || r < t || i > t + this.node.content.size)
      return null;
    let o = e.input.compositionNode;
    if (!o || !this.dom.contains(o.parentNode))
      return null;
    if (this.node.inlineContent) {
      let s = o.nodeValue, l = mp(this.node.content, s, r - t, i - t);
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
    let s = new lp(this, o, t, i);
    e.input.compositionNodes.push(s), this.children = Ts(this.children, r, r + i.length, e, s);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == ft || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = qe;
  }
  updateOuterDeco(e) {
    if (Cs(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = yu(this.dom, this.nodeDOM, xs(this.outerDeco, this.node, t), xs(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
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
function sa(n, e, t, r, i) {
  bu(r, e, n);
  let o = new _t(void 0, n, e, t, r, r, r, i, 0);
  return o.contentDOM && o.updateChildren(i, 0), o;
}
class ko extends _t {
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
    return this.dirty == ft || this.dirty != qe && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != qe || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = qe, !0);
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
    return new ko(this.parent, i, this.outerDeco, this.innerDeco, o, o, r);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = ft);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class mu extends zr {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == qe && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class ap extends _t {
  constructor(e, t, r, i, o, s, l, a, c, u) {
    super(e, t, r, i, o, s, l, c, u), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == ft)
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
function gu(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let o = 0; o < e.length; o++) {
    let s = e[o], l = s.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = la(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (s instanceof bn) {
      let a = r ? r.previousSibling : n.lastChild;
      gu(s.contentDOM, s.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = la(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const fr = function(n) {
  n && (this.nodeName = n);
};
fr.prototype = /* @__PURE__ */ Object.create(null);
const ln = [new fr()];
function xs(n, e, t) {
  if (n.length == 0)
    return ln;
  let r = t ? ln[0] : new fr(), i = [r];
  for (let o = 0; o < n.length; o++) {
    let s = n[o].type.attrs;
    if (s) {
      s.nodeName && i.push(r = new fr(s.nodeName));
      for (let l in s) {
        let a = s[l];
        a != null && (t && i.length == 1 && i.push(r = new fr(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function yu(n, e, t, r) {
  if (t == ln && r == ln)
    return e;
  let i = e;
  for (let o = 0; o < r.length; o++) {
    let s = r[o], l = t[o];
    if (o) {
      let a;
      l && l.nodeName == s.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == s.nodeName || (a = document.createElement(s.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = ln[0]), i = a;
    }
    cp(i, l || ln[0], s);
  }
  return i;
}
function cp(n, e, t) {
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
function bu(n, e, t) {
  return yu(n, n, ln, xs(e, t, n.nodeType != 1));
}
function Cs(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function la(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class up {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = dp(e.node.content, e);
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
      this.destroyRest(), this.top.dirty = qe, this.index = this.stack.pop(), this.top = this.stack.pop(), o--;
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
        let a = bn.create(this.top, e[o], t, r);
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
    return s.dirty == ft && s.dom == s.contentDOM && (s.dirty = sn), s.update(e, t, r, o) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
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
      if (a instanceof _t) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != o)
          return !1;
        let u = a.dom, d, f = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != ft && Cs(t, a.outerDeco));
        if (!f && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(a, e, t, r, i, s)))
          return this.top.children[this.index] = d, d.contentDOM && (d.dirty = sn, d.updateChildren(i, s + 1), d.dirty = qe), this.changed = !0, this.index++, !0;
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
    let l = _t.create(this.top, t, r, i, o, s);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, o) {
    let s = _t.create(this.top, e, t, r, i, o);
    s.contentDOM && s.updateChildren(i, o + 1), this.top.children.splice(this.index++, 0, s), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let o = new pu(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, o), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof bn; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof ko) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((xe || we) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new mu(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function dp(n, e) {
  let t = e, r = t.children.length, i = n.childCount, o = /* @__PURE__ */ new Map(), s = [];
  e:
    for (; i > 0; ) {
      let l;
      for (; ; )
        if (r) {
          let c = t.children[r - 1];
          if (c instanceof bn)
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
function fp(n, e) {
  return n.type.side - e.type.side;
}
function hp(n, e, t, r) {
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
      let g = i[s++];
      g.widget && (u ? (d || (d = [u])).push(g) : u = g);
    }
    if (u)
      if (d) {
        d.sort(fp);
        for (let g = 0; g < d.length; g++)
          t(d[g], c, !!a);
      } else
        t(u, c, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (c < n.childCount)
      h = c, f = n.child(c++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= o && l.splice(g--, 1);
    for (; s < i.length && i[s].from <= o && i[s].to > o; )
      l.push(i[s++]);
    let p = o + f.nodeSize;
    if (f.isText) {
      let g = p;
      s < i.length && i[s].from < g && (g = i[s].from);
      for (let b = 0; b < l.length; b++)
        l[b].to < g && (g = l[b].to);
      g < p && (a = f.cut(g - o), f = f.cut(0, g - o), p = g, h = -1);
    } else
      for (; s < i.length && i[s].to < p; )
        s++;
    let m = f.isInline && !f.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(f, m, e.forChild(o, f), h), o = p;
  }
}
function pp(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function mp(n, e, t, r) {
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
function Ts(n, e, t, r, i) {
  let o = [];
  for (let s = 0, l = 0; s < n.length; s++) {
    let a = n[s], c = l, u = l += a.size;
    c >= t || u <= e ? o.push(a) : (c < e && o.push(a.slice(0, e - c, r)), i && (o.push(i), i = void 0), u > t && o.push(a.slice(t - c, a.size, r)));
  }
  return o;
}
function nl(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), o = i && i.size == 0, s = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (s < 0)
    return null;
  let l = r.resolve(s), a, c;
  if (vo(t)) {
    for (a = l; i && !i.node; )
      i = i.parent;
    let u = i.node;
    if (i && u.isAtom && B.isSelectable(u) && i.parent && !(u.isInline && Vh(t.focusNode, t.focusOffset, i.dom))) {
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
    c = rl(n, a, l, u);
  }
  return c;
}
function vu(n) {
  return n.editable ? n.hasFocus() : wu(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function Et(n, e = !1) {
  let t = n.state.selection;
  if (ku(n, t), !!vu(n)) {
    if (!e && n.input.mouseDown && n.input.mouseDown.allowDefault && we) {
      let r = n.domSelectionRange(), i = n.domObserver.currentSelection;
      if (r.anchorNode && i.anchorNode && yn(r.anchorNode, r.anchorOffset, i.anchorNode, i.anchorOffset)) {
        n.input.mouseDown.delayedSelectionSync = !0, n.domObserver.setCurSelection();
        return;
      }
    }
    if (n.domObserver.disconnectSelection(), n.cursorWrapper)
      yp(n);
    else {
      let { anchor: r, head: i } = t, o, s;
      aa && !(t instanceof F) && (t.$from.parent.inlineContent || (o = ca(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (s = ca(n, t.to))), n.docView.setSelection(r, i, n.root, e), aa && (o && ua(o), s && ua(s)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && gp(n));
    }
    n.domObserver.setCurSelection(), n.domObserver.connectSelection();
  }
}
const aa = xe || we && jh < 63;
function ca(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, o = r ? t.childNodes[r - 1] : null;
  if (xe && i && i.contentEditable == "false")
    return Wo(i);
  if ((!i || i.contentEditable == "false") && (!o || o.contentEditable == "false")) {
    if (i)
      return Wo(i);
    if (o)
      return Wo(o);
  }
}
function Wo(n) {
  return n.contentEditable = "true", xe && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function ua(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function gp(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!vu(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function yp(n) {
  let e = n.domSelection(), t = document.createRange(), r = n.cursorWrapper.dom, i = r.nodeName == "IMG";
  i ? t.setEnd(r.parentNode, he(r) + 1) : t.setEnd(r, 0), t.collapse(!1), e.removeAllRanges(), e.addRange(t), !i && !n.state.selection.visible && Ae && $t <= 11 && (r.disabled = !0, r.disabled = !1);
}
function ku(n, e) {
  if (e instanceof B) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (da(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    da(n);
}
function da(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function rl(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || F.between(e, t, r);
}
function fa(n) {
  return n.editable && !n.hasFocus() ? !1 : wu(n);
}
function wu(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function bp(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return yn(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function Ss(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), o = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return o && V.findFrom(o, e);
}
function Lt(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function ha(n, e, t) {
  let r = n.state.selection;
  if (r instanceof F)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!o || o.isText || !o.isLeaf)
        return !1;
      let s = n.state.doc.resolve(i.pos + o.nodeSize * (e < 0 ? -1 : 1));
      return Lt(n, new F(r.$anchor, s));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Ss(n.state, e);
        return i && i instanceof B ? Lt(n, i) : !1;
      } else if (!(_e && t.indexOf("m") > -1)) {
        let i = r.$head, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, s;
        if (!o || o.isText)
          return !1;
        let l = e < 0 ? i.pos - o.nodeSize : i.pos;
        return o.isAtom || (s = n.docView.descAt(l)) && !s.contentDOM ? B.isSelectable(o) ? Lt(n, new B(e < 0 ? n.state.doc.resolve(i.pos - o.nodeSize) : i)) : Fr ? Lt(n, new F(n.state.doc.resolve(e < 0 ? l : l + o.nodeSize))) : !1 : !1;
      }
    } else
      return !1;
  else {
    if (r instanceof B && r.node.isInline)
      return Lt(n, new F(e > 0 ? r.$to : r.$from));
    {
      let i = Ss(n.state, e);
      return i ? Lt(n, i) : !1;
    }
  }
}
function Mi(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function hr(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function An(n, e) {
  return e < 0 ? vp(n) : kp(n);
}
function vp(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, o, s = !1;
  for (et && t.nodeType == 1 && r < Mi(t) && hr(t.childNodes[r], -1) && (s = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (hr(l, -1))
          i = t, o = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (xu(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && hr(l, -1); )
          i = t.parentNode, o = he(l), l = l.previousSibling;
        if (l)
          t = l, r = Mi(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  s ? Ms(n, t, r) : i && Ms(n, i, o);
}
function kp(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = Mi(t), o, s;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (hr(l, 1))
        o = t, s = ++r;
      else
        break;
    } else {
      if (xu(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && hr(l, 1); )
          o = l.parentNode, s = he(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = Mi(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  o && Ms(n, o, s);
}
function xu(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function wp(n, e) {
  for (; n && e == n.childNodes.length && !Pr(n); )
    e = he(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function xp(n, e) {
  for (; n && !e && !Pr(n); )
    e = he(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Ms(n, e, t) {
  if (e.nodeType != 3) {
    let o, s;
    (s = wp(e, t)) ? (e = s, t = 0) : (o = xp(e, t)) && (e = o, t = o.nodeValue.length);
  }
  let r = n.domSelection();
  if (vo(r)) {
    let o = document.createRange();
    o.setEnd(e, t), o.setStart(e, t), r.removeAllRanges(), r.addRange(o);
  } else
    r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && Et(n);
  }, 50);
}
function pa(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(we || Wh) && t.parent.inlineContent) {
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
function ma(n, e, t) {
  let r = n.state.selection;
  if (r instanceof F && !r.empty || t.indexOf("s") > -1 || _e && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: o } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let s = Ss(n.state, e);
    if (s && s instanceof B)
      return Lt(n, s);
  }
  if (!i.parent.inlineContent) {
    let s = e < 0 ? i : o, l = r instanceof Ze ? V.near(s, e) : V.findFrom(s, e);
    return l ? Lt(n, l) : !1;
  }
  return !1;
}
function ga(n, e) {
  if (!(n.state.selection instanceof F))
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
function ya(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function Cp(n) {
  if (!xe || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    ya(n, r, "true"), setTimeout(() => ya(n, r, "false"), 20);
  }
  return !1;
}
function Tp(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function Sp(n, e) {
  let t = e.keyCode, r = Tp(e);
  if (t == 8 || _e && t == 72 && r == "c")
    return ga(n, -1) || An(n, -1);
  if (t == 46 && !e.shiftKey || _e && t == 68 && r == "c")
    return ga(n, 1) || An(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || _e && t == 66 && r == "c") {
    let i = t == 37 ? pa(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return ha(n, i, r) || An(n, i);
  } else if (t == 39 || _e && t == 70 && r == "c") {
    let i = t == 39 ? pa(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return ha(n, i, r) || An(n, i);
  } else {
    if (t == 38 || _e && t == 80 && r == "c")
      return ma(n, -1, r) || An(n, -1);
    if (t == 40 || _e && t == 78 && r == "c")
      return Cp(n) || ma(n, 1, r) || An(n, 1);
    if (r == (_e ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function Cu(n, e) {
  n.someProp("transformCopied", (h) => {
    e = h(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: o } = e;
  for (; i > 1 && o > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, o--;
    let h = r.firstChild;
    t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let s = n.someProp("clipboardSerializer") || at.fromSchema(n.state.schema), l = Ou(), a = l.createElement("div");
  a.appendChild(s.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = Au[c.nodeName.toLowerCase()]); ) {
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
function Tu(n, e, t, r, i) {
  let o = i.parent.type.spec.code, s, l;
  if (!t && !e)
    return null;
  let a = e && (r || o || !t);
  if (a) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, o || r, n);
    }), o)
      return e ? new E(x.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0) : E.empty;
    let d = n.someProp("clipboardTextParser", (f) => f(e, i, r, n));
    if (d)
      l = d;
    else {
      let f = i.marks(), { schema: h } = n.state, p = at.fromSchema(h);
      s = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = s.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), s = Ap(t), Fr && Op(s);
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
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || jn.fromSchema(n.state.schema)).parseSlice(s, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !Mp.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = Np(ba(l, +u[1], +u[2]), u[4]);
  else if (l = E.maxOpen(Ep(l.content, i), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = ba(l, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    l = d(l, n);
  }), l;
}
const Mp = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Ep(n, e) {
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
      if (c = s.length && o.length && Mu(a, o, l, s[s.length - 1], 0))
        s[s.length - 1] = c;
      else {
        s.length && (s[s.length - 1] = Eu(s[s.length - 1], o.length));
        let u = Su(l, a);
        s.push(u), i = i.matchType(u.type), o = a;
      }
    }), s)
      return x.from(s);
  }
  return n;
}
function Su(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, x.from(n));
  return n;
}
function Mu(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let o = Mu(n, e, t, r.lastChild, i + 1);
    if (o)
      return r.copy(r.content.replaceChild(r.childCount - 1, o));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(x.from(Su(t, n, i + 1))));
  }
}
function Eu(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, Eu(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(x.empty, !0);
  return n.copy(t.append(r));
}
function Es(n, e, t, r, i, o) {
  let s = e < 0 ? n.firstChild : n.lastChild, l = s.content;
  return n.childCount > 1 && (o = 0), i < r - 1 && (l = Es(l, e, t, r, i + 1, o)), i >= t && (l = e < 0 ? s.contentMatchAt(0).fillBefore(l, o <= i).append(l) : l.append(s.contentMatchAt(s.childCount).fillBefore(x.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, s.copy(l));
}
function ba(n, e, t) {
  return e < n.openStart && (n = new E(Es(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new E(Es(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Au = {
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
let va = null;
function Ou() {
  return va || (va = document.implementation.createHTMLDocument("title"));
}
function Ap(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = Ou().createElement("div"), r = /<([a-z][^>\s]+)/i.exec(n), i;
  if ((i = r && Au[r[1].toLowerCase()]) && (n = i.map((o) => "<" + o + ">").join("") + n + i.map((o) => "</" + o + ">").reverse().join("")), t.innerHTML = n, i)
    for (let o = 0; o < i.length; o++)
      t = t.querySelector(i[o]) || t;
  return t;
}
function Op(n) {
  let e = n.querySelectorAll(we ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function Np(n, e) {
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
    i = x.from(a.create(r[l + 1], i)), o++, s++;
  }
  return new E(i, o, s);
}
const Ce = {}, Te = {}, Dp = { touchstart: !0, touchmove: !0 };
class Bp {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "" }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastAndroidDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function Lp(n) {
  for (let e in Ce) {
    let t = Ce[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      Rp(n, r) && !il(n, r) && (n.editable || !(r.type in Te)) && t(n, r);
    }, Dp[e] ? { passive: !0 } : void 0);
  }
  xe && n.dom.addEventListener("input", () => null), As(n);
}
function Vt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function Ip(n) {
  n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function As(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => il(n, r));
  });
}
function il(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function Rp(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function Pp(n, e) {
  !il(n, e) && Ce[e.type] && (n.editable || !(e.type in Te)) && Ce[e.type](n, e);
}
Te.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !Du(n, t) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(Qe && we && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), Kn && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, rn(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else
      n.someProp("handleKeyDown", (r) => r(n, t)) || Sp(n, t) ? t.preventDefault() : Vt(n, "key");
};
Te.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Te.keypress = (n, e) => {
  let t = e;
  if (Du(n, t) || !t.charCode || t.ctrlKey && !t.altKey || _e && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof F) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode);
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (o) => o(n, r.$from.pos, r.$to.pos, i)) && n.dispatch(n.state.tr.insertText(i).scrollIntoView()), t.preventDefault();
  }
};
function wo(n) {
  return { left: n.clientX, top: n.clientY };
}
function Fp(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function ol(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let o = n.state.doc.resolve(r);
  for (let s = o.depth + 1; s > 0; s--)
    if (n.someProp(e, (l) => s > o.depth ? l(n, t, o.nodeAfter, o.before(s), i, !0) : l(n, t, o.node(s), o.before(s), i, !1)))
      return !0;
  return !1;
}
function Vn(n, e, t) {
  n.focused || n.focus();
  let r = n.state.tr.setSelection(e);
  t == "pointer" && r.setMeta("pointer", !0), n.dispatch(r);
}
function zp(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && B.isSelectable(r) ? (Vn(n, new B(t), "pointer"), !0) : !1;
}
function Hp(n, e) {
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
  return i != null ? (Vn(n, B.create(n.state.doc, i), "pointer"), !0) : !1;
}
function Vp(n, e, t, r, i) {
  return ol(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (o) => o(n, e, r)) || (i ? Hp(n, t) : zp(n, t));
}
function $p(n, e, t, r) {
  return ol(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function _p(n, e, t, r) {
  return ol(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || jp(n, t, r);
}
function jp(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? (Vn(n, F.create(r, 0, r.content.size), "pointer"), !0) : !1;
  let i = r.resolve(e);
  for (let o = i.depth + 1; o > 0; o--) {
    let s = o > i.depth ? i.nodeAfter : i.node(o), l = i.before(o);
    if (s.inlineContent)
      Vn(n, F.create(r, l + 1, l + 1 + s.content.size), "pointer");
    else if (B.isSelectable(s))
      Vn(n, B.create(r, l), "pointer");
    else
      continue;
    return !0;
  }
}
function sl(n) {
  return Ei(n);
}
const Nu = _e ? "metaKey" : "ctrlKey";
Ce.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = sl(n), i = Date.now(), o = "singleClick";
  i - n.input.lastClick.time < 500 && Fp(t, n.input.lastClick) && !t[Nu] && (n.input.lastClick.type == "singleClick" ? o = "doubleClick" : n.input.lastClick.type == "doubleClick" && (o = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: o };
  let s = n.posAtCoords(wo(t));
  s && (o == "singleClick" ? (n.input.mouseDown && n.input.mouseDown.done(), n.input.mouseDown = new Wp(n, s, t, !!r)) : (o == "doubleClick" ? $p : _p)(n, s.pos, s.inside, t) ? t.preventDefault() : Vt(n, "pointer"));
};
class Wp {
  constructor(e, t, r, i) {
    this.view = e, this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.mightDrag = null, this.startDoc = e.state.doc, this.selectNode = !!r[Nu], this.allowDefault = r.shiftKey;
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
      setUneditable: !!(this.target && et && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this)), Vt(e, "pointer");
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => Et(this.view)), this.view.input.mouseDown = null;
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(wo(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Vt(this.view, "pointer") : Vp(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    xe && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    we && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Vn(this.view, V.near(this.view.state.doc.resolve(t.pos)), "pointer"), e.preventDefault()) : Vt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Vt(this.view, "pointer"), e.buttons == 0 && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
}
Ce.touchstart = (n) => {
  n.input.lastTouch = Date.now(), sl(n), Vt(n, "pointer");
};
Ce.touchmove = (n) => {
  n.input.lastTouch = Date.now(), Vt(n, "pointer");
};
Ce.contextmenu = (n) => sl(n);
function Du(n, e) {
  return n.composing ? !0 : xe && Math.abs(e.timeStamp - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const qp = Qe ? 5e3 : -1;
Te.compositionstart = Te.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$from;
    if (e.selection.empty && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1)))
      n.markCursor = n.state.storedMarks || t.marks(), Ei(n, !0), n.markCursor = null;
    else if (Ei(n), et && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
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
  Bu(n, qp);
};
Te.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = e.timeStamp, n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Bu(n, 20));
};
function Bu(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => Ei(n), e));
}
function Lu(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Up()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function Kp(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = zh(e.focusNode, e.focusOffset), r = Hh(e.focusNode, e.focusOffset);
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
function Up() {
  let n = document.createEvent("Event");
  return n.initEvent("event", !0, !0), n.timeStamp;
}
function Ei(n, e = !1) {
  if (!(Qe && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), Lu(n), e || n.docView && n.docView.dirty) {
      let t = nl(n);
      return t && !t.eq(n.state.selection) ? n.dispatch(n.state.tr.setSelection(t)) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Jp(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Cr = Ae && $t < 15 || Kn && qh < 604;
Ce.copy = Te.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let o = Cr ? null : t.clipboardData, s = r.content(), { dom: l, text: a } = Cu(n, s);
  o ? (t.preventDefault(), o.clearData(), o.setData("text/html", l.innerHTML), o.setData("text/plain", a)) : Jp(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Gp(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function Yp(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? Tr(n, r.value, null, i, e) : Tr(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function Tr(n, e, t, r, i) {
  let o = Tu(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, o || E.empty)))
    return !0;
  if (!o)
    return !1;
  let s = Gp(o), l = s ? n.state.tr.replaceSelectionWith(s, r) : n.state.tr.replaceSelection(o);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Iu(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Te.paste = (n, e) => {
  let t = e;
  if (n.composing && !Qe)
    return;
  let r = Cr ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Tr(n, Iu(r), r.getData("text/html"), i, t) ? t.preventDefault() : Yp(n, t);
};
class Ru {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const Pu = _e ? "altKey" : "ctrlKey";
Ce.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, o = i.empty ? null : n.posAtCoords(wo(t)), s;
  if (!(o && o.pos >= i.from && o.pos <= (i instanceof B ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      s = B.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (s = B.create(n.state.doc, d.posBefore));
    }
  }
  let l = (s || n.state.selection).content(), { dom: a, text: c, slice: u } = Cu(n, l);
  t.dataTransfer.clearData(), t.dataTransfer.setData(Cr ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Cr || t.dataTransfer.setData("text/plain", c), n.dragging = new Ru(u, !t[Pu], s);
};
Ce.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Te.dragover = Te.dragenter = (n, e) => e.preventDefault();
Te.drop = (n, e) => {
  let t = e, r = n.dragging;
  if (n.dragging = null, !t.dataTransfer)
    return;
  let i = n.posAtCoords(wo(t));
  if (!i)
    return;
  let o = n.state.doc.resolve(i.pos), s = r && r.slice;
  s ? n.someProp("transformPasted", (p) => {
    s = p(s, n);
  }) : s = Tu(n, Iu(t.dataTransfer), Cr ? null : t.dataTransfer.getData("text/html"), !1, o);
  let l = !!(r && !t[Pu]);
  if (n.someProp("handleDrop", (p) => p(n, t, s || E.empty, l))) {
    t.preventDefault();
    return;
  }
  if (!s)
    return;
  t.preventDefault();
  let a = s ? ih(n.state.doc, o.pos, s) : o.pos;
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
    c.mapping.maps[c.mapping.maps.length - 1].forEach((m, g, b, w) => p = w), c.setSelection(rl(n, h, c.doc.resolve(p)));
  }
  n.focus(), n.dispatch(c.setMeta("uiEvent", "drop"));
};
Ce.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && Et(n);
  }, 20));
};
Ce.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Ce.beforeinput = (n, e) => {
  if (we && Qe && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (o) => o(n, rn(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Te)
  Ce[n] = Te[n];
function Sr(n, e) {
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
class Ai {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || fn, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: o, deleted: s } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return s ? null : new Ee(o - r, o - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Ai && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && Sr(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class jt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || fn;
  }
  map(e, t, r, i) {
    let o = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, s = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return o >= s ? null : new Ee(o, s, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof jt && Sr(this.attrs, e.attrs) && Sr(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof jt;
  }
  destroy() {
  }
}
class ll {
  constructor(e, t) {
    this.attrs = e, this.spec = t || fn;
  }
  map(e, t, r, i) {
    let o = e.mapResult(t.from + i, 1);
    if (o.deleted)
      return null;
    let s = e.mapResult(t.to + i, -1);
    return s.deleted || s.pos <= o.pos ? null : new Ee(o.pos - r, s.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), o;
    return i == t.from && !(o = e.child(r)).isText && i + o.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof ll && Sr(this.attrs, e.attrs) && Sr(this.spec, e.spec);
  }
  destroy() {
  }
}
class Ee {
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
    return new Ee(e, t, this.type);
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
    return new Ee(e, e, new Ai(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new Ee(e, t, new jt(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new Ee(e, t, new ll(r, i));
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
    return this.type instanceof jt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Ai;
  }
}
const Bn = [], fn = {};
class re {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : Bn, this.children = t.length ? t : Bn;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? Oi(t, e, 0, fn) : ge;
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
    return this == ge || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || fn);
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
    return this.children.length ? Qp(this.children, s || [], e, t, r, i, o) : s ? new re(s.sort(hn), Bn) : ge;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == ge ? re.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, o = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = zu(t, l, c)) {
        for (i || (i = this.children.slice()); o < i.length && i[o] < a; )
          o += 3;
        i[o] == a ? i[o + 2] = i[o + 2].addInner(l, u, c + 1) : i.splice(o, 0, a, a + l.nodeSize, Oi(u, l, c + 1, fn)), o += 3;
      }
    });
    let s = Fu(o ? Hu(t) : t, -r);
    for (let l = 0; l < s.length; l++)
      s[l].type.valid(e, s[l]) || s.splice(l--, 1);
    return new re(s.length ? this.local.concat(s).sort(hn) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == ge ? this : this.removeInner(e, 0);
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
      c != ge ? r[o + 2] = c : (r.splice(o, 3), o -= 3);
    }
    if (i.length) {
      for (let o = 0, s; o < e.length; o++)
        if (s = e[o])
          for (let l = 0; l < i.length; l++)
            i[l].eq(s, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new re(i, r) : ge;
  }
  forChild(e, t) {
    if (this == ge)
      return this;
    if (t.isLeaf)
      return re.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let o = e + 1, s = o + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < s && a.to > o && a.type instanceof jt) {
        let c = Math.max(o, a.from) - o, u = Math.min(s, a.to) - o;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new re(i.sort(hn), Bn);
      return r ? new Pt([l, r]) : l;
    }
    return r || ge;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof re) || this.local.length != e.local.length || this.children.length != e.children.length)
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
    return al(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == ge)
      return Bn;
    if (e.inlineContent || !this.local.some(jt.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof jt || t.push(this.local[r]);
    return t;
  }
}
re.empty = new re([], []);
re.removeOverlap = al;
const ge = re.empty;
class Pt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, fn));
    return Pt.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return re.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].forChild(e, t);
      o != ge && (o instanceof Pt ? r = r.concat(o.members) : r.push(o));
    }
    return Pt.from(r);
  }
  eq(e) {
    if (!(e instanceof Pt) || e.members.length != this.members.length)
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
    return t ? al(r ? t : t.sort(hn)) : Bn;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return ge;
      case 1:
        return e[0];
      default:
        return new Pt(e.every((t) => t instanceof re) ? e : e.reduce((t, r) => t.concat(r instanceof re ? r : r.members), []));
    }
  }
}
function Qp(n, e, t, r, i, o, s) {
  let l = n.slice();
  for (let c = 0, u = o; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, h, p, m) => {
      let g = m - p - (h - f);
      for (let b = 0; b < l.length; b += 3) {
        let w = l[b + 1];
        if (w < 0 || f > w + u - d)
          continue;
        let C = l[b] + u - d;
        h >= C ? l[b + 1] = f <= C ? -2 : -1 : f >= u && g && (l[b] += g, l[b + 1] += g);
      }
      d += g;
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
      let f = t.map(n[c + 1] + o, -1), h = f - i, { index: p, offset: m } = r.content.findIndex(d), g = r.maybeChild(p);
      if (g && m == d && m + g.nodeSize == h) {
        let b = l[c + 2].mapInner(t, g, u + 1, n[c] + o + 1, s);
        b != ge ? (l[c] = d, l[c + 1] = h, l[c + 2] = b) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = Xp(l, n, e, t, i, o, s), u = Oi(c, r, 0, s);
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
  return new re(e.sort(hn), l);
}
function Fu(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new Ee(i.from + e, i.to + e, i.type));
  }
  return t;
}
function Xp(n, e, t, r, i, o, s) {
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
function zu(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let o = 0, s; o < n.length; o++)
    (s = n[o]) && s.from > t && s.to < r && ((i || (i = [])).push(s), n[o] = null);
  return i;
}
function Hu(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function Oi(n, e, t, r) {
  let i = [], o = !1;
  e.forEach((l, a) => {
    let c = zu(n, l, a + t);
    if (c) {
      o = !0;
      let u = Oi(c, l, t + a + 1, r);
      u != ge && i.push(a, a + l.nodeSize, u);
    }
  });
  let s = Fu(o ? Hu(n) : n, -t).sort(hn);
  for (let l = 0; l < s.length; l++)
    s[l].type.valid(e, s[l]) || (r.onRemove && r.onRemove(s[l].spec), s.splice(l--, 1));
  return s.length || i.length ? new re(s, i) : ge;
}
function hn(n, e) {
  return n.from - e.from || n.to - e.to;
}
function al(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let o = e[i];
        if (o.from == r.from) {
          o.to != r.to && (e == n && (e = n.slice()), e[i] = o.copy(o.from, r.to), ka(e, i + 1, o.copy(r.to, o.to)));
          continue;
        } else {
          o.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, o.from), ka(e, i, r.copy(o.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function ka(n, e, t) {
  for (; e < n.length && hn(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function qo(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != ge && e.push(r);
  }), n.cursorWrapper && e.push(re.create(n.state.doc, [n.cursorWrapper.deco])), Pt.from(e);
}
const Zp = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, em = Ae && $t <= 11;
class tm {
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
class nm {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new tm(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      Ae && $t <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), em && (this.onCharData = (r) => {
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
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Zp)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
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
    if (fa(this.view)) {
      if (this.suppressingSelectionUpdates)
        return Et(this.view);
      if (Ae && $t <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && yn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
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
    for (let o = e.focusNode; o; o = xr(o))
      t.add(o);
    for (let o = e.anchorNode; o; o = xr(o))
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
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && fa(e) && !this.ignoreSelectionChange(r), o = -1, s = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], a);
        d && (o = o < 0 ? d.from : Math.min(d.from, o), s = s < 0 ? d.to : Math.max(d.to, s), d.typeOver && (l = !0));
      }
    if (et && a.length > 1) {
      let u = a.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let d = u[0], f = u[1];
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      }
    }
    let c = null;
    o < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && vo(r) && (c = nl(e)) && c.eq(V.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Et(e), this.currentSelection.set(r), e.scrollToSelection()) : (o > -1 || i) && (o > -1 && (e.docView.markDirty(o, s), rm(e)), this.handleDOMChange(o, s, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || Et(e), this.currentSelection.set(r));
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
      if (Ae && $t <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (i = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (o = f);
        }
      let s = i && i.parentNode == e.target ? he(i) + 1 : 0, l = r.localPosFromDOM(e.target, s, -1), a = o && o.parentNode == e.target ? he(o) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
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
let wa = /* @__PURE__ */ new WeakMap(), xa = !1;
function rm(n) {
  if (!wa.has(n) && (wa.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = et, xa)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), xa = !0;
  }
}
function Ca(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, o = e.endOffset, s = n.domAtPos(n.state.selection.anchor);
  return yn(s.node, s.offset, i, o) && ([t, r, i, o] = [i, o, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: o };
}
function im(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return Ca(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? Ca(n, t) : null;
}
function om(n, e, t) {
  let { node: r, fromOffset: i, toOffset: o, from: s, to: l } = n.docView.parseRange(e, t), a = n.domSelectionRange(), c, u = a.anchorNode;
  if (u && n.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: a.anchorOffset }], vo(a) || c.push({ node: a.focusNode, offset: a.focusOffset })), we && n.input.lastKeyCode === 8)
    for (let g = o; g > i; g--) {
      let b = r.childNodes[g - 1], w = b.pmViewDesc;
      if (b.nodeName == "BR" && !w) {
        o = g;
        break;
      }
      if (!w || w.size)
        break;
    }
  let d = n.state.doc, f = n.someProp("domParser") || jn.fromSchema(n.state.schema), h = d.resolve(s), p = null, m = f.parse(r, {
    topNode: h.parent,
    topMatch: h.parent.contentMatchAt(h.index()),
    topOpen: !0,
    from: i,
    to: o,
    preserveWhitespace: h.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: sm,
    context: h
  });
  if (c && c[0].pos != null) {
    let g = c[0].pos, b = c[1] && c[1].pos;
    b == null && (b = g), p = { anchor: g + s, head: b + s };
  }
  return { doc: m, sel: p, from: s, to: l };
}
function sm(n) {
  let e = n.pmViewDesc;
  if (e)
    return e.parseRule();
  if (n.nodeName == "BR" && n.parentNode) {
    if (xe && /^(ul|ol)$/i.test(n.parentNode.nodeName)) {
      let t = document.createElement("div");
      return t.appendChild(document.createElement("li")), { skip: t };
    } else if (n.parentNode.lastChild == n || xe && /^(tr|table)$/i.test(n.parentNode.nodeName))
      return { ignore: !0 };
  } else if (n.nodeName == "IMG" && n.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}
const lm = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function am(n, e, t, r, i) {
  let o = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let S = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, I = nl(n, S);
    if (I && !n.state.selection.eq(I)) {
      if (we && Qe && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (W) => W(n, rn(13, "Enter"))))
        return;
      let _ = n.state.tr.setSelection(I);
      S == "pointer" ? _.setMeta("pointer", !0) : S == "key" && _.scrollIntoView(), o && _.setMeta("composition", o), n.dispatch(_);
    }
    return;
  }
  let s = n.state.doc.resolve(e), l = s.sharedDepth(t);
  e = s.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = om(n, e, t), u = n.state.doc, d = u.slice(c.from, c.to), f, h;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, h = "end") : (f = n.state.selection.from, h = "start"), n.input.lastKeyCode = null;
  let p = dm(d.content, c.doc.content, c.from, f, h);
  if ((Kn && n.input.lastIOSEnter > Date.now() - 225 || Qe) && i.some((S) => S.nodeType == 1 && !lm.test(S.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (S) => S(n, rn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof F && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let S = Ta(n, n.state.doc, c.sel);
        if (S && !S.eq(n.state.selection)) {
          let I = n.state.tr.setSelection(S);
          o && I.setMeta("composition", o), n.dispatch(I);
        }
      }
      return;
    }
  n.input.domChangeCount++, n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof F && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), Ae && $t <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), b = u.resolve(p.start), w = m.sameParent(g) && m.parent.inlineContent && b.end() >= p.endA, C;
  if ((Kn && n.input.lastIOSEnter > Date.now() - 225 && (!w || i.some((S) => S.nodeName == "DIV" || S.nodeName == "P")) || !w && m.pos < c.doc.content.size && !m.sameParent(g) && (C = V.findFrom(c.doc.resolve(m.pos + 1), 1, !0)) && C.head == g.pos) && n.someProp("handleKeyDown", (S) => S(n, rn(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && um(u, p.start, p.endA, m, g) && n.someProp("handleKeyDown", (S) => S(n, rn(8, "Backspace")))) {
    Qe && we && n.domObserver.suppressSelectionUpdates();
    return;
  }
  we && Qe && p.endB == p.start && (n.input.lastAndroidDelete = Date.now()), Qe && !w && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, g = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(S) {
      return S(n, rn(13, "Enter"));
    });
  }, 20));
  let y = p.start, M = p.endA, v, A, R;
  if (w) {
    if (m.pos == g.pos)
      Ae && $t <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => Et(n), 20)), v = n.state.tr.delete(y, M), A = u.resolve(p.start).marksAcross(u.resolve(p.endA));
    else if (
      // Adding or removing a mark
      p.endA == p.endB && (R = cm(m.parent.content.cut(m.parentOffset, g.parentOffset), b.parent.content.cut(b.parentOffset, p.endA - b.start())))
    )
      v = n.state.tr, R.type == "add" ? v.addMark(y, M, R.mark) : v.removeMark(y, M, R.mark);
    else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let S = m.parent.textBetween(m.parentOffset, g.parentOffset);
      if (n.someProp("handleTextInput", (I) => I(n, y, M, S)))
        return;
      v = n.state.tr.insertText(S, y, M);
    }
  }
  if (v || (v = n.state.tr.replace(y, M, c.doc.slice(p.start - c.from, p.endB - c.from))), c.sel) {
    let S = Ta(n, v.doc, c.sel);
    S && !(we && Qe && n.composing && S.empty && (p.start != p.endB || n.input.lastAndroidDelete < Date.now() - 100) && (S.head == y || S.head == v.mapping.map(M) - 1) || Ae && S.empty && S.head == y) && v.setSelection(S);
  }
  A && v.ensureMarks(A), o && v.setMeta("composition", o), n.dispatch(v.scrollIntoView());
}
function Ta(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : rl(n, e.resolve(t.anchor), e.resolve(t.head));
}
function cm(n, e) {
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
  if (x.from(c).eq(n))
    return { mark: l, type: s };
}
function um(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    Ko(r, !0, !1) < i.pos
  )
    return !1;
  let o = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = o.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (o.parentOffset < o.parent.content.size || !o.parent.isTextblock)
    return !1;
  let s = n.resolve(Ko(o, !0, !0));
  return !s.parent.isTextblock || s.pos > t || Ko(s, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(s.parent.content);
}
function Ko(n, e, t) {
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
function dm(n, e, t, r, i) {
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
    o -= a, o && o < e.size && Sa(e.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), l = o + (l - s), s = o;
  } else if (l < o) {
    let a = r <= o && r >= l ? o - r : 0;
    o -= a, o && o < n.size && Sa(n.textBetween(o - 1, o + 1)) && (o += a ? 1 : -1), s = o + (s - l), l = o;
  }
  return { start: o, endA: s, endB: l };
}
function Sa(n) {
  if (n.length != 2)
    return !1;
  let e = n.charCodeAt(0), t = n.charCodeAt(1);
  return e >= 56320 && e <= 57343 && t >= 55296 && t <= 56319;
}
class fm {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new Bp(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(Na), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Aa(this), Ea(this), this.nodeViews = Oa(this), this.docView = sa(this.state.doc, Ma(this), qo(this), this.dom, this), this.domObserver = new nm(this, (r, i, o, s) => am(this, r, i, o, s)), this.domObserver.start(), Lp(this), this.updatePluginViews();
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
    e.handleDOMEvents != this._props.handleDOMEvents && As(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Na), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
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
    e.storedMarks && this.composing && (Lu(this), s = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let h = Oa(this);
      pm(h, this.nodeViews) && (this.nodeViews = h, o = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && As(this), this.editable = Aa(this), Ea(this);
    let a = qo(this), c = Ma(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", d = o || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(i.selection)) && (s = !0);
    let f = u == "preserve" && s && this.dom.style.overflowAnchor == null && Jh(this);
    if (s) {
      this.domObserver.stop();
      let h = d && (Ae || we) && !this.composing && !i.selection.empty && !e.selection.empty && hm(i.selection, e.selection);
      if (d) {
        let p = we ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = Kp(this)), (o || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = sa(e.doc, c, a, this.dom, this)), p && !this.trackWrites && (h = !0);
      }
      h || !(this.input.mouseDown && this.domObserver.currentSelection.eq(this.domSelectionRange()) && bp(this)) ? Et(this, h) : (ku(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && Gh(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!this.someProp("handleScrollToSelection", (t) => t(this)))
      if (this.state.selection instanceof B) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && ea(this, t.getBoundingClientRect(), e);
      } else
        ea(this, this.coordsAtPos(this.state.selection.head, 1), e);
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
    this.dragging = new Ru(e.slice, e.move, i < 0 ? void 0 : B.create(this.state.doc, i));
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
    if (Ae) {
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
    this.domObserver.stop(), this.editable && Yh(this.dom), Et(this), this.domObserver.start();
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
    return tp(this, e);
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
    return fu(this, e, t);
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
    return sp(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return Tr(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return Tr(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (Ip(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], qo(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Ph());
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
    return Pp(this, e);
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
    return xe && this.root.nodeType === 11 && $h(this.dom.ownerDocument) == this.dom && im(this, e) || e;
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
function Ma(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [Ee.node(0, n.state.doc.content.size, e)];
}
function Ea(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: Ee.widget(n.state.selection.head, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function Aa(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function hm(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function Oa(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function pm(n, e) {
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
function Na(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var qt = {
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
}, Ni = {
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
}, mm = typeof navigator < "u" && /Mac/.test(navigator.platform), gm = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var pe = 0; pe < 10; pe++)
  qt[48 + pe] = qt[96 + pe] = String(pe);
for (var pe = 1; pe <= 24; pe++)
  qt[pe + 111] = "F" + pe;
for (var pe = 65; pe <= 90; pe++)
  qt[pe] = String.fromCharCode(pe + 32), Ni[pe] = String.fromCharCode(pe);
for (var Uo in qt)
  Ni.hasOwnProperty(Uo) || (Ni[Uo] = qt[Uo]);
function ym(n) {
  var e = mm && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || gm && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Ni : qt)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const bm = typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : !1;
function vm(n) {
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
      bm ? s = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), s && (t = "Meta-" + t), o && (t = "Shift-" + t), t;
}
function km(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[vm(t)] = n[t];
  return e;
}
function Jo(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function wm(n) {
  return new le({ props: { handleKeyDown: Vu(n) } });
}
function Vu(n) {
  let e = km(n);
  return function(t, r) {
    let i = ym(r), o, s = e[Jo(i, r)];
    if (s && s(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Jo(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.shiftKey || r.altKey || r.metaKey || i.charCodeAt(0) > 127) && (o = qt[r.keyCode]) && o != i) {
        let l = e[Jo(o, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
const xm = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function $u(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Cm = (n, e, t) => {
  let r = $u(n, t);
  if (!r)
    return !1;
  let i = cl(r);
  if (!i) {
    let s = r.blockRange(), l = s && Zn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (!o.type.spec.isolating && qu(n, i, e))
    return !0;
  if (r.parent.content.size == 0 && (Un(o, "end") || B.isSelectable(o))) {
    let s = yo(n.doc, r.before(), r.after(), E.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Un(o, "end") ? V.findFrom(l.doc.resolve(l.mapping.map(i.pos, -1)), -1) : B.create(l.doc, i.pos - o.nodeSize)), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Tm = (n, e, t) => {
  let r = $u(n, t);
  if (!r)
    return !1;
  let i = cl(r);
  return i ? _u(n, i, e) : !1;
}, Sm = (n, e, t) => {
  let r = ju(n, t);
  if (!r)
    return !1;
  let i = ul(r);
  return i ? _u(n, i, e) : !1;
};
function _u(n, e, t) {
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
  let c = yo(n.doc, o, a, E.empty);
  if (!c || c.from != o || c instanceof oe && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(F.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Un(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Mm = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = cl(r);
  }
  let s = o && o.nodeBefore;
  return !s || !B.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(B.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function cl(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function ju(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Em = (n, e, t) => {
  let r = ju(n, t);
  if (!r)
    return !1;
  let i = ul(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (qu(n, i, e))
    return !0;
  if (r.parent.content.size == 0 && (Un(o, "start") || B.isSelectable(o))) {
    let s = yo(n.doc, r.before(), r.after(), E.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Un(o, "start") ? V.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : B.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Am = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = ul(r);
  }
  let s = o && o.nodeAfter;
  return !s || !B.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(B.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function ul(n) {
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
const Om = (n, e) => {
  let t = n.selection, r = t instanceof B, i;
  if (r) {
    if (t.node.isTextblock || !Jt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = go(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(B.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Nm = (n, e) => {
  let t = n.selection, r;
  if (t instanceof B) {
    if (t.node.isTextblock || !Jt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = go(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Dm = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Zn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Bm = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Wu(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Lm = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Wu(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(V.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Im = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Ze || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Wu(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(F.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Rm = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (zn(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Zn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
}, Pm = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(B.create(n.doc, i))), !0);
};
function Fm(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Jt(n.doc, e.pos)) ? !1 : (t && t(n.tr.clearIncompatible(e.pos, r.type, r.contentMatchAt(r.childCount)).join(e.pos).scrollIntoView()), !0);
}
function qu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o, s;
  if (r.type.spec.isolating || i.type.spec.isolating)
    return !1;
  if (Fm(n, e, t))
    return !0;
  let l = e.parent.canReplace(e.index(), e.index() + 1);
  if (l && (o = (s = r.contentMatchAt(r.childCount)).findWrapping(i.type)) && s.matchType(o[0] || i.type).validEnd) {
    if (t) {
      let d = e.pos + i.nodeSize, f = x.empty;
      for (let m = o.length - 1; m >= 0; m--)
        f = x.from(o[m].create(null, f));
      f = x.from(r.copy(f));
      let h = n.tr.step(new ce(e.pos - 1, d, e.pos, d, new E(f, 1, 0), o.length, !0)), p = d + 2 * o.length;
      Jt(h.doc, p) && h.join(p), t(h.scrollIntoView());
    }
    return !0;
  }
  let a = V.findFrom(e, 1), c = a && a.$from.blockRange(a.$to), u = c && Zn(c);
  if (u != null && u >= e.depth)
    return t && t(n.tr.lift(c, u).scrollIntoView()), !0;
  if (l && Un(i, "start", !0) && Un(r, "end")) {
    let d = r, f = [];
    for (; f.push(d), !d.isTextblock; )
      d = d.lastChild;
    let h = i, p = 1;
    for (; !h.isTextblock; h = h.firstChild)
      p++;
    if (d.canReplace(d.childCount, d.childCount, h.content)) {
      if (t) {
        let m = x.empty;
        for (let b = f.length - 1; b >= 0; b--)
          m = x.from(f[b].copy(m));
        let g = n.tr.step(new ce(e.pos - f.length, e.pos + i.nodeSize, e.pos + p, e.pos + i.nodeSize - p, new E(m, f.length, 0), 0, !0));
        t(g.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Ku(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(F.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const zm = Ku(-1), Hm = Ku(1);
function Vm(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Zs(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Da(n, e = null) {
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
function $m(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = !1, a = s;
    if (!s)
      return !1;
    if (s.depth >= 2 && i.node(s.depth - 1).type.compatibleContent(n) && s.startIndex == 0) {
      if (i.index(s.depth - 1) == 0)
        return !1;
      let u = t.doc.resolve(s.start - 2);
      a = new xi(u, u, s.depth), s.endIndex < s.parent.childCount && (s = new xi(i, t.doc.resolve(o.end(s.depth)), s.depth)), l = !0;
    }
    let c = Zs(a, n, e, s);
    return c ? (r && r(_m(t.tr, s, c, l, n).scrollIntoView()), !0) : !1;
  };
}
function _m(n, e, t, r, i) {
  let o = x.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = x.from(t[u].type.create(t[u].attrs, o));
  n.step(new ce(e.start - (r ? 2 : 0), e.end, e.start, e.end, new E(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && zn(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function jm(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Wm(e, t, n, o) : qm(e, t, o) : !0 : !1;
  };
}
function Wm(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new ce(o - 1, s, o, s, new E(x.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new xi(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Zn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.mapping.map(o, -1) - 1;
  return Jt(i.doc, a) && i.join(a), e(i.scrollIntoView()), !0;
}
function qm(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? x.empty : x.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new ce(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new E((l ? x.empty : x.from(i.copy(x.empty))).append(a ? x.empty : x.from(i.copy(x.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Km(n) {
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
      let c = a.lastChild && a.lastChild.type == l.type, u = x.from(c ? n.create() : null), d = new E(x.from(n.create(null, x.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = o.start, h = o.end;
      t(e.tr.step(new ce(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function xo(n) {
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
class Co {
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
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...m) => {
        const g = this.buildProps(c, t), b = h(...m)(g);
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
      state: xo({
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
class Um {
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
function O(n, e, t) {
  return n.config[e] === void 0 && n.parent ? O(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? O(n.parent, e, t) : null
  }) : n.config[e];
}
function To(n) {
  const e = n.filter((i) => i.type === "extension"), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function Uu(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = To(n), i = [...t, ...r], o = {
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
    }, a = O(s, "addGlobalAttributes", l);
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
    }, a = O(s, "addAttributes", l);
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
function Q(...n) {
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
function Os(n, e) {
  return e.filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : {
    [t.name]: n.attrs[t.name]
  }).reduce((t, r) => Q(t, r), {});
}
function Ju(n) {
  return typeof n == "function";
}
function H(n, e = void 0, ...t) {
  return Ju(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Jm(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function Gm(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function Ba(n, e) {
  return n.style ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1)
        return !1;
      const i = e.reduce((o, s) => {
        const l = s.attribute.parseHTML ? s.attribute.parseHTML(t) : Gm(t.getAttribute(s.name));
        return l == null ? o : {
          ...o,
          [s.name]: l
        };
      }, {});
      return { ...r, ...i };
    }
  };
}
function La(n) {
  return Object.fromEntries(
    // @ts-ignore
    Object.entries(n).filter(([e, t]) => e === "attrs" && Jm(t) ? !1 : t != null)
  );
}
function Ym(n, e) {
  var t;
  const r = Uu(n), { nodeExtensions: i, markExtensions: o } = To(n), s = (t = i.find((c) => O(c, "topNode"))) === null || t === void 0 ? void 0 : t.name, l = Object.fromEntries(i.map((c) => {
    const u = r.filter((b) => b.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((b, w) => {
      const C = O(w, "extendNodeSchema", d);
      return {
        ...b,
        ...C ? C(c) : {}
      };
    }, {}), h = La({
      ...f,
      content: H(O(c, "content", d)),
      marks: H(O(c, "marks", d)),
      group: H(O(c, "group", d)),
      inline: H(O(c, "inline", d)),
      atom: H(O(c, "atom", d)),
      selectable: H(O(c, "selectable", d)),
      draggable: H(O(c, "draggable", d)),
      code: H(O(c, "code", d)),
      defining: H(O(c, "defining", d)),
      isolating: H(O(c, "isolating", d)),
      attrs: Object.fromEntries(u.map((b) => {
        var w;
        return [b.name, { default: (w = b == null ? void 0 : b.attribute) === null || w === void 0 ? void 0 : w.default }];
      }))
    }), p = H(O(c, "parseHTML", d));
    p && (h.parseDOM = p.map((b) => Ba(b, u)));
    const m = O(c, "renderHTML", d);
    m && (h.toDOM = (b) => m({
      node: b,
      HTMLAttributes: Os(b, u)
    }));
    const g = O(c, "renderText", d);
    return g && (h.toText = g), [c.name, h];
  })), a = Object.fromEntries(o.map((c) => {
    const u = r.filter((g) => g.type === c.name), d = {
      name: c.name,
      options: c.options,
      storage: c.storage,
      editor: e
    }, f = n.reduce((g, b) => {
      const w = O(b, "extendMarkSchema", d);
      return {
        ...g,
        ...w ? w(c) : {}
      };
    }, {}), h = La({
      ...f,
      inclusive: H(O(c, "inclusive", d)),
      excludes: H(O(c, "excludes", d)),
      group: H(O(c, "group", d)),
      spanning: H(O(c, "spanning", d)),
      code: H(O(c, "code", d)),
      attrs: Object.fromEntries(u.map((g) => {
        var b;
        return [g.name, { default: (b = g == null ? void 0 : g.attribute) === null || b === void 0 ? void 0 : b.default }];
      }))
    }), p = H(O(c, "parseHTML", d));
    p && (h.parseDOM = p.map((g) => Ba(g, u)));
    const m = O(c, "renderHTML", d);
    return m && (h.toDOM = (g) => m({
      mark: g,
      HTMLAttributes: Os(g, u)
    })), [c.name, h];
  }));
  return new Bf({
    topNode: s,
    nodes: l,
    marks: a
  });
}
function Go(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function Ia(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
const Qm = (n, e = 500) => {
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
function dl(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
class Hr {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const Xm = (n, e) => {
  if (dl(e))
    return e.exec(n);
  const t = e(n);
  if (!t)
    return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function ri(n) {
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
  const d = Qm(c) + o;
  return s.forEach((f) => {
    if (u)
      return;
    const h = Xm(d, f.find);
    if (!h)
      return;
    const p = a.state.tr, m = xo({
      state: a.state,
      transaction: p
    }), g = {
      from: r - (h[0].length - o.length),
      to: i
    }, { commands: b, chain: w, can: C } = new Co({
      editor: t,
      state: m
    });
    f.handler({
      state: m,
      range: g,
      match: h,
      commands: b,
      chain: w,
      can: C
    }) === null || !p.steps.length || (p.setMeta(l, {
      transform: p,
      from: r,
      to: i,
      text: o
    }), a.dispatch(p), u = !0);
  }), u;
}
function Zm(n) {
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
          ri({
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
        return ri({
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
          o && ri({
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
        return s ? ri({
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
function eg(n) {
  return typeof n == "number";
}
class Gu {
  constructor(e) {
    this.find = e.find, this.handler = e.handler;
  }
}
const tg = (n, e, t) => {
  if (dl(e))
    return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((i) => {
    const o = [i.text];
    return o.index = i.index, o.input = n, o.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), o.push(i.replaceWith)), o;
  }) : [];
};
function ng(n) {
  const { editor: e, state: t, from: r, to: i, rule: o, pasteEvent: s, dropEvent: l } = n, { commands: a, chain: c, can: u } = new Co({
    editor: e,
    state: t
  }), d = [];
  return t.doc.nodesBetween(r, i, (h, p) => {
    if (!h.isTextblock || h.type.spec.code)
      return;
    const m = Math.max(r, p), g = Math.min(i, p + h.content.size), b = h.textBetween(m - p, g - p, void 0, "￼");
    tg(b, o.find, s).forEach((C) => {
      if (C.index === void 0)
        return;
      const y = m + C.index + 1, M = y + C[0].length, v = {
        from: t.tr.mapping.map(y),
        to: t.tr.mapping.map(M)
      }, A = o.handler({
        state: t,
        range: v,
        match: C,
        commands: a,
        chain: c,
        can: u,
        pasteEvent: s,
        dropEvent: l
      });
      d.push(A);
    });
  }), d.every((h) => h !== null);
}
const rg = (n) => {
  var e;
  const t = new ClipboardEvent("paste", {
    clipboardData: new DataTransfer()
  });
  return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", n), t;
};
function ig(n) {
  const { editor: e, rules: t } = n;
  let r = null, i = !1, o = !1, s = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  const a = ({ state: u, from: d, to: f, rule: h, pasteEvt: p }) => {
    const m = u.tr, g = xo({
      state: u,
      transaction: m
    });
    if (!(!ng({
      editor: e,
      state: g,
      from: Math.max(d - 1, 0),
      to: f.b - 1,
      rule: h,
      pasteEvent: p,
      dropEvent: l
    }) || !m.steps.length))
      return l = typeof DragEvent < "u" ? new DragEvent("drop") : null, s = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, m;
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
      const p = d[0], m = p.getMeta("uiEvent") === "paste" && !i, g = p.getMeta("uiEvent") === "drop" && !o, b = p.getMeta("applyPasteRules"), w = !!b;
      if (!m && !g && !w)
        return;
      if (w) {
        const { from: M, text: v } = b, A = M + v.length, R = rg(v);
        return a({
          rule: u,
          state: h,
          from: M,
          to: { b: A },
          pasteEvt: R
        });
      }
      const C = f.doc.content.findDiffStart(h.doc.content), y = f.doc.content.findDiffEnd(h.doc.content);
      if (!(!eg(C) || !y || C === y.b))
        return a({
          rule: u,
          state: h,
          from: C,
          to: y,
          pasteEvt: s
        });
    }
  }));
}
function og(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return [...new Set(e)];
}
class Pn {
  constructor(e, t) {
    this.splittableMarks = [], this.editor = t, this.extensions = Pn.resolve(e), this.schema = Ym(this.extensions, t), this.setupExtensions();
  }
  /**
   * Returns a flattened and sorted extension list while
   * also checking for duplicated extensions and warns the user.
   * @param extensions An array of Tiptap extensions
   * @returns An flattened and sorted array of Tiptap extensions
   */
  static resolve(e) {
    const t = Pn.sort(Pn.flatten(e)), r = og(t.map((i) => i.name));
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
      }, i = O(t, "addExtensions", r);
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
      const o = O(r, "priority") || 100, s = O(i, "priority") || 100;
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
        type: Go(t.name, this.schema)
      }, i = O(t, "addCommands", r);
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
    const { editor: e } = this, t = Pn.sort([...this.extensions].reverse()), r = [], i = [], o = t.map((s) => {
      const l = {
        name: s.name,
        options: s.options,
        storage: s.storage,
        editor: e,
        type: Go(s.name, this.schema)
      }, a = [], c = O(s, "addKeyboardShortcuts", l);
      let u = {};
      if (s.type === "mark" && s.config.exitable && (u.ArrowRight = () => De.handleExit({ editor: e, mark: s })), c) {
        const m = Object.fromEntries(Object.entries(c()).map(([g, b]) => [g, () => b({ editor: e })]));
        u = { ...u, ...m };
      }
      const d = wm(u);
      a.push(d);
      const f = O(s, "addInputRules", l);
      Ia(s, e.options.enableInputRules) && f && r.push(...f());
      const h = O(s, "addPasteRules", l);
      Ia(s, e.options.enablePasteRules) && h && i.push(...h());
      const p = O(s, "addProseMirrorPlugins", l);
      if (p) {
        const m = p();
        a.push(...m);
      }
      return a;
    }).flat();
    return [
      Zm({
        editor: e,
        rules: r
      }),
      ...ig({
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
    return Uu(this.extensions);
  }
  /**
   * Get all node views from the extensions.
   * @returns An object with all node views where the key is the node name and the value is the node view function
   */
  get nodeViews() {
    const { editor: e } = this, { nodeExtensions: t } = To(this.extensions);
    return Object.fromEntries(t.filter((r) => !!O(r, "addNodeView")).map((r) => {
      const i = this.attributes.filter((a) => a.type === r.name), o = {
        name: r.name,
        options: r.options,
        storage: r.storage,
        editor: e,
        type: de(r.name, this.schema)
      }, s = O(r, "addNodeView", o);
      if (!s)
        return [];
      const l = (a, c, u, d) => {
        const f = Os(a, i);
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
        type: Go(e.name, this.schema)
      };
      e.type === "mark" && (!((t = H(O(e, "keepOnSplit", r))) !== null && t !== void 0) || t) && this.splittableMarks.push(e.name);
      const i = O(e, "onBeforeCreate", r), o = O(e, "onCreate", r), s = O(e, "onUpdate", r), l = O(e, "onSelectionUpdate", r), a = O(e, "onTransaction", r), c = O(e, "onFocus", r), u = O(e, "onBlur", r), d = O(e, "onDestroy", r);
      i && this.editor.on("beforeCreate", i), o && this.editor.on("create", o), s && this.editor.on("update", s), l && this.editor.on("selectionUpdate", l), a && this.editor.on("transaction", a), c && this.editor.on("focus", c), u && this.editor.on("blur", u), d && this.editor.on("destroy", d);
    });
  }
}
function sg(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Yo(n) {
  return sg(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function So(n, e) {
  const t = { ...n };
  return Yo(n) && Yo(e) && Object.keys(e).forEach((r) => {
    Yo(e[r]) ? r in n ? t[r] = So(n[r], e[r]) : Object.assign(t, { [r]: e[r] }) : Object.assign(t, { [r]: e[r] });
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
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = H(O(this, "addOptions", {
      name: this.name
    }))), this.storage = H(O(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ee(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.parent = this.parent, t.options = So(this.options, e), t.storage = H(O(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new ee({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = H(O(t, "addOptions", {
      name: t.name
    })), t.storage = H(O(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Yu(n, e, t) {
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
function Qu(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
const lg = ee.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ve("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, { ranges: o } = i, s = Math.min(...o.map((u) => u.$from.pos)), l = Math.max(...o.map((u) => u.$to.pos)), a = Qu(t);
            return Yu(r, { from: s, to: l }, {
              ...this.options.blockSeparator !== void 0 ? { blockSeparator: this.options.blockSeparator } : {},
              textSerializers: a
            });
          }
        }
      })
    ];
  }
}), ag = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) === null || t === void 0 || t.removeAllRanges());
}), !0), cg = (n = !1) => ({ commands: e }) => e.setContent("", n), ug = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = Zn(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, dg = (n) => (e) => n(e), fg = () => ({ state: n, dispatch: e }) => Im(n, e), hg = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new F(r.doc.resolve(s - 1))), !0;
}, pg = () => ({ tr: n, dispatch: e }) => {
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
}, mg = (n) => ({ tr: e, state: t, dispatch: r }) => {
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
}, gg = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, yg = () => ({ state: n, dispatch: e }) => xm(n, e), bg = () => ({ commands: n }) => n.keyboardShortcut("Enter"), vg = () => ({ state: n, dispatch: e }) => Lm(n, e);
function Di(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : dl(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Ns(n, e, t = {}) {
  return n.find((r) => r.type === e && Di(r.attrs, t));
}
function kg(n, e, t = {}) {
  return !!Ns(n, e, t);
}
function fl(n, e, t = {}) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if (n.parentOffset === r.offset && r.offset !== 0 && (r = n.parent.childBefore(n.parentOffset)), !r.node)
    return;
  const i = Ns([...r.node.marks], e, t);
  if (!i)
    return;
  let o = r.index, s = n.start() + r.offset, l = o + 1, a = s + r.node.nodeSize;
  for (Ns([...r.node.marks], e, t); o > 0 && i.isInSet(n.parent.child(o - 1).marks); )
    o -= 1, s -= n.parent.child(o).nodeSize;
  for (; l < n.parent.childCount && kg([...n.parent.child(l).marks], e, t); )
    a += n.parent.child(l).nodeSize, l += 1;
  return {
    from: s,
    to: a
  };
}
function Yt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const wg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const o = Yt(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = fl(a, o, e);
    if (d && d.from <= c && d.to >= u) {
      const f = F.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, xg = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function hl(n) {
  return n instanceof F;
}
function St(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Xu(n, e = null) {
  if (!e)
    return null;
  const t = V.atStart(n), r = V.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, o = r.to;
  return e === "all" ? F.create(n, St(0, i, o), St(n.content.size, i, o)) : F.create(n, St(e, i, o), St(e, i, o));
}
function pl() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
const Cg = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    pl() && r.dom.focus(), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  if (r.hasFocus() && n === null || n === !1)
    return !0;
  if (o && n === null && !hl(t.state.selection))
    return s(), !0;
  const l = Xu(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Tg = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), Sg = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({ from: t.selection.from, to: t.selection.to }, n, e), Zu = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Zu(r);
  }
  return n;
};
function Ra(n) {
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Zu(t);
}
function Bi(n, e, t) {
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const r = typeof n == "object" && n !== null, i = typeof n == "string";
  if (r)
    try {
      return Array.isArray(n) && n.length > 0 ? x.fromArray(n.map((s) => e.nodeFromJSON(s))) : e.nodeFromJSON(n);
    } catch (o) {
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Bi("", e, t);
    }
  if (i) {
    const o = jn.fromSchema(e);
    return t.slice ? o.parseSlice(Ra(n), t.parseOptions).content : o.parse(Ra(n), t.parseOptions);
  }
  return Bi("", e, t);
}
function Mg(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof oe || i instanceof ce))
    return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), n.setSelection(V.near(n.doc.resolve(s), t));
}
const Eg = (n) => n.toString().startsWith("<"), Ag = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    t = {
      parseOptions: {},
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    const s = Bi(e, o.schema, {
      parseOptions: {
        preserveWhitespace: "full",
        ...t.parseOptions
      }
    });
    if (s.toString() === "<>")
      return !0;
    let { from: l, to: a } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, c = !0, u = !0;
    if ((Eg(s) ? s : [s]).forEach((h) => {
      h.check(), c = c ? h.isText && h.marks.length === 0 : !1, u = u ? h.isBlock : !1;
    }), l === a && u) {
      const { parent: h } = r.doc.resolve(l);
      h.isTextblock && !h.type.spec.code && !h.childCount && (l -= 1, a += 1);
    }
    let f;
    c ? (Array.isArray(e) ? f = e.map((h) => h.text || "").join("") : typeof e == "object" && e && e.text ? f = e.text : f = e, r.insertText(f, l, a)) : (f = s, r.replaceWith(l, a, f)), t.updateSelection && Mg(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: l, text: f }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: l, text: f });
  }
  return !0;
}, Og = () => ({ state: n, dispatch: e }) => Om(n, e), Ng = () => ({ state: n, dispatch: e }) => Nm(n, e), Dg = () => ({ state: n, dispatch: e }) => Cm(n, e), Bg = () => ({ state: n, dispatch: e }) => Em(n, e), Lg = () => ({ tr: n, state: e, dispatch: t }) => {
  try {
    const r = go(e.doc, e.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), t && t(n), !0);
  } catch {
    return !1;
  }
}, Ig = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = go(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Rg = () => ({ state: n, dispatch: e }) => Tm(n, e), Pg = () => ({ state: n, dispatch: e }) => Sm(n, e);
function ed() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Fg(n) {
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
      pl() || ed() ? s = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const zg = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Fg(n).split(/-(?!$)/), s = o.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
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
function Mr(n, e, t = {}) {
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
  const a = i - r, c = l.filter((d) => s ? s.name === d.node.type.name : !0).filter((d) => Di(d.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= a;
}
const Hg = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = de(n, t.schema);
  return Mr(t, i, e) ? Dm(t, r) : !1;
}, Vg = () => ({ state: n, dispatch: e }) => Rm(n, e), $g = (n) => ({ state: e, dispatch: t }) => {
  const r = de(n, e.schema);
  return jm(r)(e, t);
}, _g = () => ({ state: n, dispatch: e }) => Bm(n, e);
function Mo(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Pa(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const jg = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Mo(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (o = de(n, r.schema)), l === "mark" && (s = Yt(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (c, u) => {
      o && o === c.type && t.setNodeMarkup(u, void 0, Pa(c.attrs, e)), s && c.marks.length && c.marks.forEach((d) => {
        s === d.type && t.addMark(u, u + c.nodeSize, s.create(Pa(d.attrs, e)));
      });
    });
  }), !0) : !1;
}, Wg = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), qg = () => ({ tr: n, commands: e }) => e.setTextSelection({
  from: 0,
  to: n.doc.content.size
}), Kg = () => ({ state: n, dispatch: e }) => Mm(n, e), Ug = () => ({ state: n, dispatch: e }) => Am(n, e), Jg = () => ({ state: n, dispatch: e }) => Pm(n, e), Gg = () => ({ state: n, dispatch: e }) => Hm(n, e), Yg = () => ({ state: n, dispatch: e }) => zm(n, e);
function td(n, e, t = {}) {
  return Bi(n, e, { slice: !1, parseOptions: t });
}
const Qg = (n, e = !1, t = {}) => ({ tr: r, editor: i, dispatch: o }) => {
  const { doc: s } = r, l = td(n, i.schema, t);
  return o && r.replaceWith(0, s.content.size, l).setMeta("preventUpdate", !e), !0;
};
function Eo(n, e) {
  const t = Yt(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Xg(n, e) {
  const t = new ru(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Zg(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
function ey(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (i, o) => {
    t(i) && r.push({
      node: i,
      pos: o
    });
  }), r;
}
function ty(n, e) {
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
function ml(n) {
  return (e) => ty(e.$from, n);
}
function ny(n, e) {
  const t = at.fromSchema(e).serializeFragment(n), i = document.implementation.createHTMLDocument().createElement("div");
  return i.appendChild(t), i.innerHTML;
}
function ry(n, e) {
  const t = {
    from: 0,
    to: n.content.size
  };
  return Yu(n, t, e);
}
function iy(n, e) {
  const t = de(e, n.schema), { from: r, to: i } = n.selection, o = [];
  n.doc.nodesBetween(r, i, (l) => {
    o.push(l);
  });
  const s = o.reverse().find((l) => l.type.name === t.name);
  return s ? { ...s.attrs } : {};
}
function nd(n, e) {
  const t = Mo(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? iy(n, e) : t === "mark" ? Eo(n, e) : {};
}
function oy(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function sy(n) {
  const e = oy(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((o, s) => s !== r).some((o) => t.oldRange.from >= o.oldRange.from && t.oldRange.to <= o.oldRange.to && t.newRange.from >= o.newRange.from && t.newRange.to <= o.newRange.to));
}
function ly(n) {
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
  }), sy(r);
}
function gl(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((i) => {
    const o = t.resolve(n - 1), s = fl(o, i.type);
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
function hi(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Ds(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? Yt(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => o ? o.name === d.type.name : !0).find((d) => Di(d.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    n.doc.nodesBetween(h, p, (m, g) => {
      if (!m.isText && !m.marks.length)
        return;
      const b = Math.max(h, g), w = Math.min(p, g + m.nodeSize), C = w - b;
      s += C, l.push(...m.marks.map((y) => ({
        mark: y,
        from: b,
        to: w
      })));
    });
  }), s === 0)
    return !1;
  const a = l.filter((d) => o ? o.name === d.mark.type.name : !0).filter((d) => Di(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = l.filter((d) => o ? d.mark.type !== o && d.mark.type.excludes(o) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function ay(n, e, t = {}) {
  if (!e)
    return Mr(n, null, t) || Ds(n, null, t);
  const r = Mo(e, n.schema);
  return r === "node" ? Mr(n, e, t) : r === "mark" ? Ds(n, e, t) : !1;
}
function Fa(n, e) {
  const { nodeExtensions: t } = To(e), r = t.find((s) => s.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = H(O(r, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function cy(n) {
  var e;
  const t = (e = n.type.createAndFill()) === null || e === void 0 ? void 0 : e.toJSON(), r = n.toJSON();
  return JSON.stringify(t) === JSON.stringify(r);
}
function uy(n) {
  return n instanceof B;
}
function rd(n, e, t) {
  const i = n.state.doc.content.size, o = St(e, 0, i), s = St(t, 0, i), l = n.coordsAtPos(o), a = n.coordsAtPos(s, -1), c = Math.min(l.top, a.top), u = Math.max(l.bottom, a.bottom), d = Math.min(l.left, a.left), f = Math.max(l.right, a.right), h = f - d, p = u - c, b = {
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
function dy(n, e, t) {
  var r;
  const { selection: i } = e;
  let o = null;
  if (hl(i) && (o = i.$cursor), o) {
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
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
const fy = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = Yt(n, r.schema);
  if (i)
    if (s) {
      const c = Eo(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else
      l.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
          f.marks.find((b) => b.type === a) ? f.marks.forEach((b) => {
            a === b.type && t.addMark(p, m, a.create({
              ...b.attrs,
              ...e
            }));
          }) : t.addMark(p, m, a.create(e));
        });
      });
  return dy(r, t, a);
}, hy = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), py = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = de(n, t.schema);
  return o.isTextblock ? i().command(({ commands: s }) => Da(o, e)(t) ? !0 : s.clearNodes()).command(({ state: s }) => Da(o, e)(s, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, my = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = St(n, 0, r.content.size), o = B.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, gy = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? { from: n, to: n } : n, s = F.atStart(r).from, l = F.atEnd(r).to, a = St(i, s, l), c = St(o, s, l), u = F.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, yy = (n) => ({ state: e, dispatch: t }) => {
  const r = de(n, e.schema);
  return Km(r)(e, t);
};
function za(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const by = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = hi(c, l.node().type.name, l.node().attrs);
  if (o instanceof B && o.node.isBlock)
    return !l.parentOffset || !zn(s, l.pos) ? !1 : (r && (n && za(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  if (r) {
    const d = a.parentOffset === a.parent.content.size;
    o instanceof F && e.deleteSelection();
    const f = l.depth === 0 ? void 0 : Zg(l.node(-1).contentMatchAt(l.indexAfter(-1)));
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
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && za(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return !0;
}, vy = (n) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
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
      let g = x.empty;
      const b = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let A = l.depth - b; A >= l.depth - 3; A -= 1)
        g = x.from(l.node(A).copy(g));
      const w = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, C = hi(d, l.node().type.name, l.node().attrs), y = ((o = s.contentMatch.defaultType) === null || o === void 0 ? void 0 : o.createAndFill(C)) || void 0;
      g = g.append(x.from(s.createAndFill(null, y) || void 0));
      const M = l.before(l.depth - (b - 1));
      e.replace(M, l.after(-w), new E(g, 4 - b, 0));
      let v = -1;
      e.doc.nodesBetween(M, e.doc.content.size, (A, R) => {
        if (v > -1)
          return !1;
        A.isTextblock && A.content.size === 0 && (v = R + 1);
      }), v > -1 && e.setSelection(F.near(e.doc.resolve(v))), e.scrollIntoView();
    }
    return !0;
  }
  const f = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, h = hi(d, u.type.name, u.attrs), p = hi(d, l.node().type.name, l.node().attrs);
  e.delete(l.pos, a.pos);
  const m = f ? [
    { type: s, attrs: h },
    { type: f, attrs: p }
  ] : [{ type: s, attrs: h }];
  if (!zn(e.doc, l.pos, 2))
    return !1;
  if (r) {
    const { selection: g, storedMarks: b } = t, { splittableMarks: w } = i.extensionManager, C = b || g.$to.parentOffset && g.$from.marks();
    if (e.split(l.pos, 2, m).scrollIntoView(), !C || !r)
      return !0;
    const y = C.filter((M) => w.includes(M.type.name));
    e.ensureMarks(y);
  }
  return !0;
}, Qo = (n, e) => {
  const t = ml((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Jt(n.doc, t.pos) && n.join(t.pos), !0;
}, Xo = (n, e) => {
  const t = ml((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return t.node.type === (i == null ? void 0 : i.type) && Jt(n.doc, r) && n.join(r), !0;
}, ky = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = de(n, s.schema), p = de(e, s.schema), { selection: m, storedMarks: g } = s, { $from: b, $to: w } = m, C = b.blockRange(w), y = g || m.$to.parentOffset && m.$from.marks();
  if (!C)
    return !1;
  const M = ml((v) => Fa(v.type.name, d))(m);
  if (C.depth >= 1 && M && C.depth - M.depth <= 1) {
    if (M.node.type === h)
      return c.liftListItem(p);
    if (Fa(M.node.type.name, d) && h.validContent(M.node.content) && l)
      return a().command(() => (o.setNodeMarkup(M.pos, h), !0)).command(() => Qo(o, h)).command(() => Xo(o, h)).run();
  }
  return !t || !y || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => Qo(o, h)).command(() => Xo(o, h)).run() : a().command(() => {
    const v = u().wrapInList(h, r), A = y.filter((R) => f.includes(R.type.name));
    return o.ensureMarks(A), v ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => Qo(o, h)).command(() => Xo(o, h)).run();
}, wy = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = Yt(n, r.schema);
  return Ds(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, xy = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = de(n, r.schema), s = de(e, r.schema);
  return Mr(r, o, t) ? i.setNode(s) : i.setNode(o, t);
}, Cy = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = de(n, t.schema);
  return Mr(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Ty = () => ({ state: n, dispatch: e }) => {
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
}, Sy = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, { empty: r, ranges: i } = t;
  return r || e && i.forEach((o) => {
    n.removeMark(o.$from.pos, o.$to.pos);
  }), !0;
}, My = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: s = !1 } = e, { selection: l } = t, a = Yt(n, r.schema), { $from: c, empty: u, ranges: d } = l;
  if (!i)
    return !0;
  if (u && s) {
    let { from: f, to: h } = l;
    const p = (o = c.marks().find((g) => g.type === a)) === null || o === void 0 ? void 0 : o.attrs, m = fl(c, a, p);
    m && (f = m.from, h = m.to), t.removeMark(f, h, a);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, Ey = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Mo(typeof n == "string" ? n : n.name, r.schema);
  return l ? (l === "node" && (o = de(n, r.schema)), l === "mark" && (s = Yt(n, r.schema)), i && t.selection.ranges.forEach((a) => {
    const c = a.$from.pos, u = a.$to.pos;
    r.doc.nodesBetween(c, u, (d, f) => {
      o && o === d.type && t.setNodeMarkup(f, void 0, {
        ...d.attrs,
        ...e
      }), s && d.marks.length && d.marks.forEach((h) => {
        if (s === h.type) {
          const p = Math.max(f, c), m = Math.min(f + d.nodeSize, u);
          t.addMark(p, m, s.create({
            ...h.attrs,
            ...e
          }));
        }
      });
    });
  }), !0) : !1;
}, Ay = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = de(n, t.schema);
  return Vm(i, e)(t, r);
}, Oy = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = de(n, t.schema);
  return $m(i, e)(t, r);
};
var Ny = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur: ag,
  clearContent: cg,
  clearNodes: ug,
  command: dg,
  createParagraphNear: fg,
  cut: hg,
  deleteCurrentNode: pg,
  deleteNode: mg,
  deleteRange: gg,
  deleteSelection: yg,
  enter: bg,
  exitCode: vg,
  extendMarkRange: wg,
  first: xg,
  focus: Cg,
  forEach: Tg,
  insertContent: Sg,
  insertContentAt: Ag,
  joinUp: Og,
  joinDown: Ng,
  joinBackward: Dg,
  joinForward: Bg,
  joinItemBackward: Lg,
  joinItemForward: Ig,
  joinTextblockBackward: Rg,
  joinTextblockForward: Pg,
  keyboardShortcut: zg,
  lift: Hg,
  liftEmptyBlock: Vg,
  liftListItem: $g,
  newlineInCode: _g,
  resetAttributes: jg,
  scrollIntoView: Wg,
  selectAll: qg,
  selectNodeBackward: Kg,
  selectNodeForward: Ug,
  selectParentNode: Jg,
  selectTextblockEnd: Gg,
  selectTextblockStart: Yg,
  setContent: Qg,
  setMark: fy,
  setMeta: hy,
  setNode: py,
  setNodeSelection: my,
  setTextSelection: gy,
  sinkListItem: yy,
  splitBlock: by,
  splitListItem: vy,
  toggleList: ky,
  toggleMark: wy,
  toggleNode: xy,
  toggleWrap: Cy,
  undoInputRule: Ty,
  unsetAllMarks: Sy,
  unsetMark: My,
  updateAttributes: Ey,
  wrapIn: Ay,
  wrapInList: Oy
});
const Dy = ee.create({
  name: "commands",
  addCommands() {
    return {
      ...Ny
    };
  }
}), By = ee.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ve("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), Ly = ee.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new le({
        key: new ve("focusEvents"),
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
}), Iy = ee.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      // maybe convert first text block node to default node
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, g = d.pos - d.parentOffset, b = m && p.parent.childCount === 1 ? g === d.pos : V.atStart(c).from === f;
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
    return pl() || ed() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new le({
        key: new ve("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (!(n.some((p) => p.docChanged) && !e.doc.eq(t.doc)))
            return;
          const { empty: i, from: o, to: s } = e.selection, l = V.atStart(e.doc).from, a = V.atEnd(e.doc).to;
          if (i || !(o === l && s === a) || !(t.doc.textBetween(0, t.doc.content.size, " ", " ").length === 0))
            return;
          const d = t.tr, f = xo({
            state: t,
            transaction: d
          }), { commands: h } = new Co({
            editor: this.editor,
            state: f
          });
          if (h.clearNodes(), !!d.steps.length)
            return d;
        }
      })
    ];
  }
}), Ry = ee.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new le({
        key: new ve("tabindex"),
        props: {
          attributes: this.editor.isEditable ? { tabindex: "0" } : {}
        }
      })
    ];
  }
});
class on {
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
    return new on(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new on(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new on(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const i = t.isBlock && !t.isTextblock, o = this.pos + r + 1, s = this.resolvedPos.doc.resolve(o);
      if (!i && s.depth <= this.depth)
        return;
      const l = new on(s, this.editor, i, i ? t : null);
      i && (l.actualDepth = this.depth + 1), e.push(new on(s, this.editor, i, i ? t : null));
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
const Py = `.ProseMirror {
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
function Fy(n, e, t) {
  const r = document.querySelector(`style[data-tiptap-style${t ? `-${t}` : ""}]`);
  if (r !== null)
    return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute(`data-tiptap-style${t ? `-${t}` : ""}`, ""), i.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(i), i;
}
let zy = class extends Um {
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
    this.options.injectCSS && document && (this.css = Fy(Py, this.options.injectNonce));
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
    const r = Ju(t) ? t(e, [...this.state.plugins]) : [...this.state.plugins, e], i = this.state.reconfigure({ plugins: r });
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
      By,
      lg.configure({
        blockSeparator: (t = (e = this.options.coreExtensionOptions) === null || e === void 0 ? void 0 : e.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator
      }),
      Dy,
      Ly,
      Iy,
      Ry
    ] : [], ...this.options.extensions].filter((o) => ["extension", "node", "mark"].includes(o == null ? void 0 : o.type));
    this.extensionManager = new Pn(i, this);
  }
  /**
   * Creates an command manager.
   */
  createCommandManager() {
    this.commandManager = new Co({
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
    const e = td(this.options.content, this.schema, this.options.parseOptions), t = Xu(e, this.options.autofocus);
    this.view = new fm(this.options.element, {
      ...this.options.editorProps,
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: Rn.create({
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
    return nd(this.state, e);
  }
  isActive(e, t) {
    const r = typeof e == "string" ? e : null, i = typeof e == "string" ? t : e;
    return ay(this.state, r, i);
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
    return ny(this.state.doc.content, this.schema);
  }
  /**
   * Get the document as text.
   */
  getText(e) {
    const { blockSeparator: t = `

`, textSerializers: r = {} } = e || {};
    return ry(this.state.doc, {
      blockSeparator: t,
      textSerializers: {
        ...Qu(this.schema),
        ...r
      }
    });
  }
  /**
   * Check if there is no content.
   */
  get isEmpty() {
    return cy(this.state.doc);
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
    return new on(t, this);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function vn(n) {
  return new Hr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = H(n.getAttributes, void 0, r);
      if (i === !1 || i === null)
        return null;
      const { tr: o } = e, s = r[r.length - 1], l = r[0];
      if (s) {
        const a = l.search(/\S/), c = t.from + l.indexOf(s), u = c + s.length;
        if (gl(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((m) => m === n.type && m !== h.mark.type)).filter((h) => h.to > c).length)
          return null;
        u < t.to && o.delete(u, t.to), c > t.from && o.delete(t.from + a, c);
        const f = t.from + a + s.length;
        o.addMark(t.from + a, f, n.type.create(i || {})), o.removeStoredMark(n.type);
      }
    }
  });
}
function Hy(n) {
  return new Hr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = H(n.getAttributes, void 0, r) || {}, { tr: o } = e, s = t.from;
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
function Bs(n) {
  return new Hr({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = e.doc.resolve(t.from), o = H(n.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), n.type))
        return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, o);
    }
  });
}
function ne(n) {
  return new Hr({
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
function Li(n) {
  return new Hr({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: i }) => {
      const o = H(n.getAttributes, void 0, r) || {}, s = e.tr.delete(t.from, t.to), a = s.doc.resolve(t.from).blockRange(), c = a && Zs(a, n.type, o);
      if (!c)
        return null;
      if (s.wrap(a, c), n.keepMarks && n.editor) {
        const { selection: d, storedMarks: f } = e, { splittableMarks: h } = n.editor.extensionManager, p = f || d.$to.parentOffset && d.$from.marks();
        if (p) {
          const m = p.filter((g) => h.includes(g.type.name));
          s.ensureMarks(m);
        }
      }
      if (n.keepAttributes) {
        const d = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(d, o).run();
      }
      const u = s.doc.resolve(t.from - 1).nodeBefore;
      u && u.type === n.type && Jt(s.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, u)) && s.join(t.from - 1);
    }
  });
}
class De {
  constructor(e = {}) {
    this.type = "mark", this.name = "mark", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = H(O(this, "addOptions", {
      name: this.name
    }))), this.storage = H(O(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new De(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = So(this.options, e), t.storage = H(O(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new De({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = H(O(t, "addOptions", {
      name: t.name
    })), t.storage = H(O(t, "addStorage", {
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
class ye {
  constructor(e = {}) {
    this.type = "node", this.name = "node", this.parent = null, this.child = null, this.config = {
      name: this.name,
      defaultOptions: {}
    }, this.config = {
      ...this.config,
      ...e
    }, this.name = this.config.name, e.defaultOptions && Object.keys(e.defaultOptions).length > 0 && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`), this.options = this.config.defaultOptions, this.config.addOptions && (this.options = H(O(this, "addOptions", {
      name: this.name
    }))), this.storage = H(O(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(e = {}) {
    return new ye(e);
  }
  configure(e = {}) {
    const t = this.extend();
    return t.options = So(this.options, e), t.storage = H(O(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
  extend(e = {}) {
    const t = new ye({ ...this.config, ...e });
    return t.parent = this, this.child = t, t.name = e.name ? e.name : t.parent.name, e.defaultOptions && console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`), t.options = H(O(t, "addOptions", {
      name: t.name
    })), t.storage = H(O(t, "addStorage", {
      name: t.name,
      options: t.options
    })), t;
  }
}
function Kt(n) {
  return new Gu({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: i }) => {
      const o = H(n.getAttributes, void 0, r, i);
      if (o === !1 || o === null)
        return null;
      const { tr: s } = e, l = r[r.length - 1], a = r[0];
      let c = t.to;
      if (l) {
        const u = a.search(/\S/), d = t.from + a.indexOf(l), f = d + l.length;
        if (gl(t.from, t.to, e.doc).filter((p) => p.mark.type.excluded.find((g) => g === n.type && g !== p.mark.type)).filter((p) => p.to > d).length)
          return null;
        f < t.to && s.delete(f, t.to), d > t.from && s.delete(t.from + u, d), c = t.from + u + l.length, s.addMark(t.from + u, c, n.type.create(o || {})), s.removeStoredMark(n.type);
      }
    }
  });
}
function Vy(n) {
  return n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function $y(n) {
  return new Gu({
    find: n.find,
    handler({ match: e, chain: t, range: r, pasteEvent: i }) {
      const o = H(n.getAttributes, void 0, e, i);
      if (o === !1 || o === null)
        return null;
      e.input && t().deleteRange(r).insertContentAt(r.from, {
        type: n.type.name,
        attrs: o
      });
    }
  });
}
var Oe = "top", Ue = "bottom", Je = "right", Ne = "left", yl = "auto", Vr = [Oe, Ue, Je, Ne], Jn = "start", Er = "end", _y = "clippingParents", id = "viewport", sr = "popper", jy = "reference", Ha = /* @__PURE__ */ Vr.reduce(function(n, e) {
  return n.concat([e + "-" + Jn, e + "-" + Er]);
}, []), od = /* @__PURE__ */ [].concat(Vr, [yl]).reduce(function(n, e) {
  return n.concat([e, e + "-" + Jn, e + "-" + Er]);
}, []), Wy = "beforeRead", qy = "read", Ky = "afterRead", Uy = "beforeMain", Jy = "main", Gy = "afterMain", Yy = "beforeWrite", Qy = "write", Xy = "afterWrite", Zy = [Wy, qy, Ky, Uy, Jy, Gy, Yy, Qy, Xy];
function ht(n) {
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
function kn(n) {
  var e = ze(n).Element;
  return n instanceof e || n instanceof Element;
}
function Ke(n) {
  var e = ze(n).HTMLElement;
  return n instanceof e || n instanceof HTMLElement;
}
function bl(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = ze(n).ShadowRoot;
  return n instanceof e || n instanceof ShadowRoot;
}
function e0(n) {
  var e = n.state;
  Object.keys(e.elements).forEach(function(t) {
    var r = e.styles[t] || {}, i = e.attributes[t] || {}, o = e.elements[t];
    !Ke(o) || !ht(o) || (Object.assign(o.style, r), Object.keys(i).forEach(function(s) {
      var l = i[s];
      l === !1 ? o.removeAttribute(s) : o.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function t0(n) {
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
      !Ke(i) || !ht(i) || (Object.assign(i.style, l), Object.keys(o).forEach(function(a) {
        i.removeAttribute(a);
      }));
    });
  };
}
const sd = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: e0,
  effect: t0,
  requires: ["computeStyles"]
};
function ut(n) {
  return n.split("-")[0];
}
var pn = Math.max, Ii = Math.min, Gn = Math.round;
function Ls() {
  var n = navigator.userAgentData;
  return n != null && n.brands && Array.isArray(n.brands) ? n.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ld() {
  return !/^((?!chrome|android).)*safari/i.test(Ls());
}
function Yn(n, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var r = n.getBoundingClientRect(), i = 1, o = 1;
  e && Ke(n) && (i = n.offsetWidth > 0 && Gn(r.width) / n.offsetWidth || 1, o = n.offsetHeight > 0 && Gn(r.height) / n.offsetHeight || 1);
  var s = kn(n) ? ze(n) : window, l = s.visualViewport, a = !ld() && t, c = (r.left + (a && l ? l.offsetLeft : 0)) / i, u = (r.top + (a && l ? l.offsetTop : 0)) / o, d = r.width / i, f = r.height / o;
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
function vl(n) {
  var e = Yn(n), t = n.offsetWidth, r = n.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: n.offsetLeft,
    y: n.offsetTop,
    width: t,
    height: r
  };
}
function ad(n, e) {
  var t = e.getRootNode && e.getRootNode();
  if (n.contains(e))
    return !0;
  if (t && bl(t)) {
    var r = e;
    do {
      if (r && n.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function At(n) {
  return ze(n).getComputedStyle(n);
}
function n0(n) {
  return ["table", "td", "th"].indexOf(ht(n)) >= 0;
}
function Qt(n) {
  return ((kn(n) ? n.ownerDocument : (
    // $FlowFixMe[prop-missing]
    n.document
  )) || window.document).documentElement;
}
function Ao(n) {
  return ht(n) === "html" ? n : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    n.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    n.parentNode || // DOM Element detected
    (bl(n) ? n.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Qt(n)
  );
}
function Va(n) {
  return !Ke(n) || // https://github.com/popperjs/popper-core/issues/837
  At(n).position === "fixed" ? null : n.offsetParent;
}
function r0(n) {
  var e = /firefox/i.test(Ls()), t = /Trident/i.test(Ls());
  if (t && Ke(n)) {
    var r = At(n);
    if (r.position === "fixed")
      return null;
  }
  var i = Ao(n);
  for (bl(i) && (i = i.host); Ke(i) && ["html", "body"].indexOf(ht(i)) < 0; ) {
    var o = At(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function $r(n) {
  for (var e = ze(n), t = Va(n); t && n0(t) && At(t).position === "static"; )
    t = Va(t);
  return t && (ht(t) === "html" || ht(t) === "body" && At(t).position === "static") ? e : t || r0(n) || e;
}
function kl(n) {
  return ["top", "bottom"].indexOf(n) >= 0 ? "x" : "y";
}
function pr(n, e, t) {
  return pn(n, Ii(e, t));
}
function i0(n, e, t) {
  var r = pr(n, e, t);
  return r > t ? t : r;
}
function cd() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ud(n) {
  return Object.assign({}, cd(), n);
}
function dd(n, e) {
  return e.reduce(function(t, r) {
    return t[r] = n, t;
  }, {});
}
var o0 = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, ud(typeof e != "number" ? e : dd(e, Vr));
};
function s0(n) {
  var e, t = n.state, r = n.name, i = n.options, o = t.elements.arrow, s = t.modifiersData.popperOffsets, l = ut(t.placement), a = kl(l), c = [Ne, Je].indexOf(l) >= 0, u = c ? "height" : "width";
  if (!(!o || !s)) {
    var d = o0(i.padding, t), f = vl(o), h = a === "y" ? Oe : Ne, p = a === "y" ? Ue : Je, m = t.rects.reference[u] + t.rects.reference[a] - s[a] - t.rects.popper[u], g = s[a] - t.rects.reference[a], b = $r(o), w = b ? a === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, C = m / 2 - g / 2, y = d[h], M = w - f[u] - d[p], v = w / 2 - f[u] / 2 + C, A = pr(y, v, M), R = a;
    t.modifiersData[r] = (e = {}, e[R] = A, e.centerOffset = A - v, e);
  }
}
function l0(n) {
  var e = n.state, t = n.options, r = t.element, i = r === void 0 ? "[data-popper-arrow]" : r;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || ad(e.elements.popper, i) && (e.elements.arrow = i));
}
const a0 = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: s0,
  effect: l0,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Qn(n) {
  return n.split("-")[1];
}
var c0 = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function u0(n, e) {
  var t = n.x, r = n.y, i = e.devicePixelRatio || 1;
  return {
    x: Gn(t * i) / i || 0,
    y: Gn(r * i) / i || 0
  };
}
function $a(n) {
  var e, t = n.popper, r = n.popperRect, i = n.placement, o = n.variation, s = n.offsets, l = n.position, a = n.gpuAcceleration, c = n.adaptive, u = n.roundOffsets, d = n.isFixed, f = s.x, h = f === void 0 ? 0 : f, p = s.y, m = p === void 0 ? 0 : p, g = typeof u == "function" ? u({
    x: h,
    y: m
  }) : {
    x: h,
    y: m
  };
  h = g.x, m = g.y;
  var b = s.hasOwnProperty("x"), w = s.hasOwnProperty("y"), C = Ne, y = Oe, M = window;
  if (c) {
    var v = $r(t), A = "clientHeight", R = "clientWidth";
    if (v === ze(t) && (v = Qt(t), At(v).position !== "static" && l === "absolute" && (A = "scrollHeight", R = "scrollWidth")), v = v, i === Oe || (i === Ne || i === Je) && o === Er) {
      y = Ue;
      var S = d && v === M && M.visualViewport ? M.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        v[A]
      );
      m -= S - r.height, m *= a ? 1 : -1;
    }
    if (i === Ne || (i === Oe || i === Ue) && o === Er) {
      C = Je;
      var I = d && v === M && M.visualViewport ? M.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        v[R]
      );
      h -= I - r.width, h *= a ? 1 : -1;
    }
  }
  var _ = Object.assign({
    position: l
  }, c && c0), W = u === !0 ? u0({
    x: h,
    y: m
  }, ze(t)) : {
    x: h,
    y: m
  };
  if (h = W.x, m = W.y, a) {
    var q;
    return Object.assign({}, _, (q = {}, q[y] = w ? "0" : "", q[C] = b ? "0" : "", q.transform = (M.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + m + "px)" : "translate3d(" + h + "px, " + m + "px, 0)", q));
  }
  return Object.assign({}, _, (e = {}, e[y] = w ? m + "px" : "", e[C] = b ? h + "px" : "", e.transform = "", e));
}
function d0(n) {
  var e = n.state, t = n.options, r = t.gpuAcceleration, i = r === void 0 ? !0 : r, o = t.adaptive, s = o === void 0 ? !0 : o, l = t.roundOffsets, a = l === void 0 ? !0 : l, c = {
    placement: ut(e.placement),
    variation: Qn(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, $a(Object.assign({}, c, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, $a(Object.assign({}, c, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const f0 = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: d0,
  data: {}
};
var ii = {
  passive: !0
};
function h0(n) {
  var e = n.state, t = n.instance, r = n.options, i = r.scroll, o = i === void 0 ? !0 : i, s = r.resize, l = s === void 0 ? !0 : s, a = ze(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && c.forEach(function(u) {
    u.addEventListener("scroll", t.update, ii);
  }), l && a.addEventListener("resize", t.update, ii), function() {
    o && c.forEach(function(u) {
      u.removeEventListener("scroll", t.update, ii);
    }), l && a.removeEventListener("resize", t.update, ii);
  };
}
const p0 = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: h0,
  data: {}
};
var m0 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function pi(n) {
  return n.replace(/left|right|bottom|top/g, function(e) {
    return m0[e];
  });
}
var g0 = {
  start: "end",
  end: "start"
};
function _a(n) {
  return n.replace(/start|end/g, function(e) {
    return g0[e];
  });
}
function wl(n) {
  var e = ze(n), t = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: r
  };
}
function xl(n) {
  return Yn(Qt(n)).left + wl(n).scrollLeft;
}
function y0(n, e) {
  var t = ze(n), r = Qt(n), i = t.visualViewport, o = r.clientWidth, s = r.clientHeight, l = 0, a = 0;
  if (i) {
    o = i.width, s = i.height;
    var c = ld();
    (c || !c && e === "fixed") && (l = i.offsetLeft, a = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: l + xl(n),
    y: a
  };
}
function b0(n) {
  var e, t = Qt(n), r = wl(n), i = (e = n.ownerDocument) == null ? void 0 : e.body, o = pn(t.scrollWidth, t.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), s = pn(t.scrollHeight, t.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), l = -r.scrollLeft + xl(n), a = -r.scrollTop;
  return At(i || t).direction === "rtl" && (l += pn(t.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: s,
    x: l,
    y: a
  };
}
function Cl(n) {
  var e = At(n), t = e.overflow, r = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + i + r);
}
function fd(n) {
  return ["html", "body", "#document"].indexOf(ht(n)) >= 0 ? n.ownerDocument.body : Ke(n) && Cl(n) ? n : fd(Ao(n));
}
function mr(n, e) {
  var t;
  e === void 0 && (e = []);
  var r = fd(n), i = r === ((t = n.ownerDocument) == null ? void 0 : t.body), o = ze(r), s = i ? [o].concat(o.visualViewport || [], Cl(r) ? r : []) : r, l = e.concat(s);
  return i ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(mr(Ao(s)))
  );
}
function Is(n) {
  return Object.assign({}, n, {
    left: n.x,
    top: n.y,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
function v0(n, e) {
  var t = Yn(n, !1, e === "fixed");
  return t.top = t.top + n.clientTop, t.left = t.left + n.clientLeft, t.bottom = t.top + n.clientHeight, t.right = t.left + n.clientWidth, t.width = n.clientWidth, t.height = n.clientHeight, t.x = t.left, t.y = t.top, t;
}
function ja(n, e, t) {
  return e === id ? Is(y0(n, t)) : kn(e) ? v0(e, t) : Is(b0(Qt(n)));
}
function k0(n) {
  var e = mr(Ao(n)), t = ["absolute", "fixed"].indexOf(At(n).position) >= 0, r = t && Ke(n) ? $r(n) : n;
  return kn(r) ? e.filter(function(i) {
    return kn(i) && ad(i, r) && ht(i) !== "body";
  }) : [];
}
function w0(n, e, t, r) {
  var i = e === "clippingParents" ? k0(n) : [].concat(e), o = [].concat(i, [t]), s = o[0], l = o.reduce(function(a, c) {
    var u = ja(n, c, r);
    return a.top = pn(u.top, a.top), a.right = Ii(u.right, a.right), a.bottom = Ii(u.bottom, a.bottom), a.left = pn(u.left, a.left), a;
  }, ja(n, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function hd(n) {
  var e = n.reference, t = n.element, r = n.placement, i = r ? ut(r) : null, o = r ? Qn(r) : null, s = e.x + e.width / 2 - t.width / 2, l = e.y + e.height / 2 - t.height / 2, a;
  switch (i) {
    case Oe:
      a = {
        x: s,
        y: e.y - t.height
      };
      break;
    case Ue:
      a = {
        x: s,
        y: e.y + e.height
      };
      break;
    case Je:
      a = {
        x: e.x + e.width,
        y: l
      };
      break;
    case Ne:
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
  var c = i ? kl(i) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (o) {
      case Jn:
        a[c] = a[c] - (e[u] / 2 - t[u] / 2);
        break;
      case Er:
        a[c] = a[c] + (e[u] / 2 - t[u] / 2);
        break;
    }
  }
  return a;
}
function Ar(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = r === void 0 ? n.placement : r, o = t.strategy, s = o === void 0 ? n.strategy : o, l = t.boundary, a = l === void 0 ? _y : l, c = t.rootBoundary, u = c === void 0 ? id : c, d = t.elementContext, f = d === void 0 ? sr : d, h = t.altBoundary, p = h === void 0 ? !1 : h, m = t.padding, g = m === void 0 ? 0 : m, b = ud(typeof g != "number" ? g : dd(g, Vr)), w = f === sr ? jy : sr, C = n.rects.popper, y = n.elements[p ? w : f], M = w0(kn(y) ? y : y.contextElement || Qt(n.elements.popper), a, u, s), v = Yn(n.elements.reference), A = hd({
    reference: v,
    element: C,
    strategy: "absolute",
    placement: i
  }), R = Is(Object.assign({}, C, A)), S = f === sr ? R : v, I = {
    top: M.top - S.top + b.top,
    bottom: S.bottom - M.bottom + b.bottom,
    left: M.left - S.left + b.left,
    right: S.right - M.right + b.right
  }, _ = n.modifiersData.offset;
  if (f === sr && _) {
    var W = _[i];
    Object.keys(I).forEach(function(q) {
      var ae = [Je, Ue].indexOf(q) >= 0 ? 1 : -1, X = [Oe, Ue].indexOf(q) >= 0 ? "y" : "x";
      I[q] += W[X] * ae;
    });
  }
  return I;
}
function x0(n, e) {
  e === void 0 && (e = {});
  var t = e, r = t.placement, i = t.boundary, o = t.rootBoundary, s = t.padding, l = t.flipVariations, a = t.allowedAutoPlacements, c = a === void 0 ? od : a, u = Qn(r), d = u ? l ? Ha : Ha.filter(function(p) {
    return Qn(p) === u;
  }) : Vr, f = d.filter(function(p) {
    return c.indexOf(p) >= 0;
  });
  f.length === 0 && (f = d);
  var h = f.reduce(function(p, m) {
    return p[m] = Ar(n, {
      placement: m,
      boundary: i,
      rootBoundary: o,
      padding: s
    })[ut(m)], p;
  }, {});
  return Object.keys(h).sort(function(p, m) {
    return h[p] - h[m];
  });
}
function C0(n) {
  if (ut(n) === yl)
    return [];
  var e = pi(n);
  return [_a(n), e, _a(e)];
}
function T0(n) {
  var e = n.state, t = n.options, r = n.name;
  if (!e.modifiersData[r]._skip) {
    for (var i = t.mainAxis, o = i === void 0 ? !0 : i, s = t.altAxis, l = s === void 0 ? !0 : s, a = t.fallbackPlacements, c = t.padding, u = t.boundary, d = t.rootBoundary, f = t.altBoundary, h = t.flipVariations, p = h === void 0 ? !0 : h, m = t.allowedAutoPlacements, g = e.options.placement, b = ut(g), w = b === g, C = a || (w || !p ? [pi(g)] : C0(g)), y = [g].concat(C).reduce(function(gt, Ge) {
      return gt.concat(ut(Ge) === yl ? x0(e, {
        placement: Ge,
        boundary: u,
        rootBoundary: d,
        padding: c,
        flipVariations: p,
        allowedAutoPlacements: m
      }) : Ge);
    }, []), M = e.rects.reference, v = e.rects.popper, A = /* @__PURE__ */ new Map(), R = !0, S = y[0], I = 0; I < y.length; I++) {
      var _ = y[I], W = ut(_), q = Qn(_) === Jn, ae = [Oe, Ue].indexOf(W) >= 0, X = ae ? "width" : "height", Y = Ar(e, {
        placement: _,
        boundary: u,
        rootBoundary: d,
        altBoundary: f,
        padding: c
      }), G = ae ? q ? Je : Ne : q ? Ue : Oe;
      M[X] > v[X] && (G = pi(G));
      var K = pi(G), Be = [];
      if (o && Be.push(Y[W] <= 0), l && Be.push(Y[G] <= 0, Y[K] <= 0), Be.every(function(gt) {
        return gt;
      })) {
        S = _, R = !1;
        break;
      }
      A.set(_, Be);
    }
    if (R)
      for (var me = p ? 3 : 1, mt = function(Ge) {
        var yt = y.find(function(xn) {
          var bt = A.get(xn);
          if (bt)
            return bt.slice(0, Ge).every(function(Cn) {
              return Cn;
            });
        });
        if (yt)
          return S = yt, "break";
      }, Se = me; Se > 0; Se--) {
        var Zt = mt(Se);
        if (Zt === "break")
          break;
      }
    e.placement !== S && (e.modifiersData[r]._skip = !0, e.placement = S, e.reset = !0);
  }
}
const S0 = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: T0,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Wa(n, e, t) {
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
function qa(n) {
  return [Oe, Je, Ue, Ne].some(function(e) {
    return n[e] >= 0;
  });
}
function M0(n) {
  var e = n.state, t = n.name, r = e.rects.reference, i = e.rects.popper, o = e.modifiersData.preventOverflow, s = Ar(e, {
    elementContext: "reference"
  }), l = Ar(e, {
    altBoundary: !0
  }), a = Wa(s, r), c = Wa(l, i, o), u = qa(a), d = qa(c);
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
const E0 = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: M0
};
function A0(n, e, t) {
  var r = ut(n), i = [Ne, Oe].indexOf(r) >= 0 ? -1 : 1, o = typeof t == "function" ? t(Object.assign({}, e, {
    placement: n
  })) : t, s = o[0], l = o[1];
  return s = s || 0, l = (l || 0) * i, [Ne, Je].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function O0(n) {
  var e = n.state, t = n.options, r = n.name, i = t.offset, o = i === void 0 ? [0, 0] : i, s = od.reduce(function(u, d) {
    return u[d] = A0(d, e.rects, o), u;
  }, {}), l = s[e.placement], a = l.x, c = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = s;
}
const N0 = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: O0
};
function D0(n) {
  var e = n.state, t = n.name;
  e.modifiersData[t] = hd({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const B0 = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: D0,
  data: {}
};
function L0(n) {
  return n === "x" ? "y" : "x";
}
function I0(n) {
  var e = n.state, t = n.options, r = n.name, i = t.mainAxis, o = i === void 0 ? !0 : i, s = t.altAxis, l = s === void 0 ? !1 : s, a = t.boundary, c = t.rootBoundary, u = t.altBoundary, d = t.padding, f = t.tether, h = f === void 0 ? !0 : f, p = t.tetherOffset, m = p === void 0 ? 0 : p, g = Ar(e, {
    boundary: a,
    rootBoundary: c,
    padding: d,
    altBoundary: u
  }), b = ut(e.placement), w = Qn(e.placement), C = !w, y = kl(b), M = L0(y), v = e.modifiersData.popperOffsets, A = e.rects.reference, R = e.rects.popper, S = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, I = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), _ = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, W = {
    x: 0,
    y: 0
  };
  if (v) {
    if (o) {
      var q, ae = y === "y" ? Oe : Ne, X = y === "y" ? Ue : Je, Y = y === "y" ? "height" : "width", G = v[y], K = G + g[ae], Be = G - g[X], me = h ? -R[Y] / 2 : 0, mt = w === Jn ? A[Y] : R[Y], Se = w === Jn ? -R[Y] : -A[Y], Zt = e.elements.arrow, gt = h && Zt ? vl(Zt) : {
        width: 0,
        height: 0
      }, Ge = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : cd(), yt = Ge[ae], xn = Ge[X], bt = pr(0, A[Y], gt[Y]), Cn = C ? A[Y] / 2 - me - bt - yt - I.mainAxis : mt - bt - yt - I.mainAxis, Ot = C ? -A[Y] / 2 + me + bt + xn + I.mainAxis : Se + bt + xn + I.mainAxis, Tn = e.elements.arrow && $r(e.elements.arrow), jr = Tn ? y === "y" ? Tn.clientTop || 0 : Tn.clientLeft || 0 : 0, er = (q = _ == null ? void 0 : _[y]) != null ? q : 0, Wr = G + Cn - er - jr, qr = G + Ot - er, tr = pr(h ? Ii(K, Wr) : K, G, h ? pn(Be, qr) : Be);
      v[y] = tr, W[y] = tr - G;
    }
    if (l) {
      var nr, Kr = y === "x" ? Oe : Ne, Ur = y === "x" ? Ue : Je, vt = v[M], Nt = M === "y" ? "height" : "width", rr = vt + g[Kr], en = vt - g[Ur], ir = [Oe, Ne].indexOf(b) !== -1, Jr = (nr = _ == null ? void 0 : _[M]) != null ? nr : 0, Gr = ir ? rr : vt - A[Nt] - R[Nt] - Jr + I.altAxis, Yr = ir ? vt + A[Nt] + R[Nt] - Jr - I.altAxis : en, Qr = h && ir ? i0(Gr, vt, Yr) : pr(h ? Gr : rr, vt, h ? Yr : en);
      v[M] = Qr, W[M] = Qr - vt;
    }
    e.modifiersData[r] = W;
  }
}
const R0 = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: I0,
  requiresIfExists: ["offset"]
};
function P0(n) {
  return {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  };
}
function F0(n) {
  return n === ze(n) || !Ke(n) ? wl(n) : P0(n);
}
function z0(n) {
  var e = n.getBoundingClientRect(), t = Gn(e.width) / n.offsetWidth || 1, r = Gn(e.height) / n.offsetHeight || 1;
  return t !== 1 || r !== 1;
}
function H0(n, e, t) {
  t === void 0 && (t = !1);
  var r = Ke(e), i = Ke(e) && z0(e), o = Qt(e), s = Yn(n, i, t), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (r || !r && !t) && ((ht(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Cl(o)) && (l = F0(e)), Ke(e) ? (a = Yn(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : o && (a.x = xl(o))), {
    x: s.left + l.scrollLeft - a.x,
    y: s.top + l.scrollTop - a.y,
    width: s.width,
    height: s.height
  };
}
function V0(n) {
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
function $0(n) {
  var e = V0(n);
  return Zy.reduce(function(t, r) {
    return t.concat(e.filter(function(i) {
      return i.phase === r;
    }));
  }, []);
}
function _0(n) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(n());
      });
    })), e;
  };
}
function j0(n) {
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
var Ka = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ua() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function W0(n) {
  n === void 0 && (n = {});
  var e = n, t = e.defaultModifiers, r = t === void 0 ? [] : t, i = e.defaultOptions, o = i === void 0 ? Ka : i;
  return function(l, a, c) {
    c === void 0 && (c = o);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ka, o),
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
        var w = typeof b == "function" ? b(u.options) : b;
        m(), u.options = Object.assign({}, o, u.options, w), u.scrollParents = {
          reference: kn(l) ? mr(l) : l.contextElement ? mr(l.contextElement) : [],
          popper: mr(a)
        };
        var C = $0(j0([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = C.filter(function(y) {
          return y.enabled;
        }), p(), h.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var b = u.elements, w = b.reference, C = b.popper;
          if (Ua(w, C)) {
            u.rects = {
              reference: H0(w, $r(C), u.options.strategy === "fixed"),
              popper: vl(C)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(I) {
              return u.modifiersData[I.name] = Object.assign({}, I.data);
            });
            for (var y = 0; y < u.orderedModifiers.length; y++) {
              if (u.reset === !0) {
                u.reset = !1, y = -1;
                continue;
              }
              var M = u.orderedModifiers[y], v = M.fn, A = M.options, R = A === void 0 ? {} : A, S = M.name;
              typeof v == "function" && (u = v({
                state: u,
                options: R,
                name: S,
                instance: h
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: _0(function() {
        return new Promise(function(g) {
          h.forceUpdate(), g(u);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!Ua(l, a))
      return h;
    h.setOptions(c).then(function(g) {
      !f && c.onFirstUpdate && c.onFirstUpdate(g);
    });
    function p() {
      u.orderedModifiers.forEach(function(g) {
        var b = g.name, w = g.options, C = w === void 0 ? {} : w, y = g.effect;
        if (typeof y == "function") {
          var M = y({
            state: u,
            name: b,
            instance: h,
            options: C
          }), v = function() {
          };
          d.push(M || v);
        }
      });
    }
    function m() {
      d.forEach(function(g) {
        return g();
      }), d = [];
    }
    return h;
  };
}
var q0 = [p0, B0, f0, sd, N0, S0, R0, a0, E0], K0 = /* @__PURE__ */ W0({
  defaultModifiers: q0
}), U0 = "tippy-box", pd = "tippy-content", J0 = "tippy-backdrop", md = "tippy-arrow", gd = "tippy-svg-arrow", nn = {
  passive: !0,
  capture: !0
}, yd = function() {
  return document.body;
};
function G0(n, e) {
  return {}.hasOwnProperty.call(n, e);
}
function Zo(n, e, t) {
  if (Array.isArray(n)) {
    var r = n[e];
    return r ?? (Array.isArray(t) ? t[e] : t);
  }
  return n;
}
function Tl(n, e) {
  var t = {}.toString.call(n);
  return t.indexOf("[object") === 0 && t.indexOf(e + "]") > -1;
}
function bd(n, e) {
  return typeof n == "function" ? n.apply(void 0, e) : n;
}
function Ja(n, e) {
  if (e === 0)
    return n;
  var t;
  return function(r) {
    clearTimeout(t), t = setTimeout(function() {
      n(r);
    }, e);
  };
}
function Y0(n, e) {
  var t = Object.assign({}, n);
  return e.forEach(function(r) {
    delete t[r];
  }), t;
}
function Q0(n) {
  return n.split(/\s+/).filter(Boolean);
}
function Ln(n) {
  return [].concat(n);
}
function Ga(n, e) {
  n.indexOf(e) === -1 && n.push(e);
}
function X0(n) {
  return n.filter(function(e, t) {
    return n.indexOf(e) === t;
  });
}
function Z0(n) {
  return n.split("-")[0];
}
function Ri(n) {
  return [].slice.call(n);
}
function Ya(n) {
  return Object.keys(n).reduce(function(e, t) {
    return n[t] !== void 0 && (e[t] = n[t]), e;
  }, {});
}
function gr() {
  return document.createElement("div");
}
function Or(n) {
  return ["Element", "Fragment"].some(function(e) {
    return Tl(n, e);
  });
}
function eb(n) {
  return Tl(n, "NodeList");
}
function tb(n) {
  return Tl(n, "MouseEvent");
}
function nb(n) {
  return !!(n && n._tippy && n._tippy.reference === n);
}
function rb(n) {
  return Or(n) ? [n] : eb(n) ? Ri(n) : Array.isArray(n) ? n : Ri(document.querySelectorAll(n));
}
function es(n, e) {
  n.forEach(function(t) {
    t && (t.style.transitionDuration = e + "ms");
  });
}
function Qa(n, e) {
  n.forEach(function(t) {
    t && t.setAttribute("data-state", e);
  });
}
function ib(n) {
  var e, t = Ln(n), r = t[0];
  return r != null && (e = r.ownerDocument) != null && e.body ? r.ownerDocument : document;
}
function ob(n, e) {
  var t = e.clientX, r = e.clientY;
  return n.every(function(i) {
    var o = i.popperRect, s = i.popperState, l = i.props, a = l.interactiveBorder, c = Z0(s.placement), u = s.modifiersData.offset;
    if (!u)
      return !0;
    var d = c === "bottom" ? u.top.y : 0, f = c === "top" ? u.bottom.y : 0, h = c === "right" ? u.left.x : 0, p = c === "left" ? u.right.x : 0, m = o.top - r + d > a, g = r - o.bottom - f > a, b = o.left - t + h > a, w = t - o.right - p > a;
    return m || g || b || w;
  });
}
function ts(n, e, t) {
  var r = e + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(i) {
    n[r](i, t);
  });
}
function Xa(n, e) {
  for (var t = e; t; ) {
    var r;
    if (n.contains(t))
      return !0;
    t = t.getRootNode == null || (r = t.getRootNode()) == null ? void 0 : r.host;
  }
  return !1;
}
var ot = {
  isTouch: !1
}, Za = 0;
function sb() {
  ot.isTouch || (ot.isTouch = !0, window.performance && document.addEventListener("mousemove", vd));
}
function vd() {
  var n = performance.now();
  n - Za < 20 && (ot.isTouch = !1, document.removeEventListener("mousemove", vd)), Za = n;
}
function lb() {
  var n = document.activeElement;
  if (nb(n)) {
    var e = n._tippy;
    n.blur && !e.state.isVisible && n.blur();
  }
}
function ab() {
  document.addEventListener("touchstart", sb, nn), window.addEventListener("blur", lb);
}
var cb = typeof window < "u" && typeof document < "u", ub = cb ? (
  // @ts-ignore
  !!window.msCrypto
) : !1;
function On(n) {
  var e = n === "destroy" ? "n already-" : " ";
  return [n + "() was called on a" + e + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ");
}
function ec(n) {
  var e = /[ \t]{2,}/g, t = /^[ \t]*/gm;
  return n.replace(e, " ").replace(t, "").trim();
}
function db(n) {
  return ec(`
  %ctippy.js

  %c` + ec(n) + `

  %c👷‍ This is a development-only message. It will be removed in production.
  `);
}
function kd(n) {
  return [
    db(n),
    // title
    "color: #00C584; font-size: 1.3em; font-weight: bold;",
    // message
    "line-height: 1.5",
    // footer
    "color: #a6a095;"
  ];
}
var Nr;
process.env.NODE_ENV !== "production" && fb();
function fb() {
  Nr = /* @__PURE__ */ new Set();
}
function Ct(n, e) {
  if (n && !Nr.has(e)) {
    var t;
    Nr.add(e), (t = console).warn.apply(t, kd(e));
  }
}
function Rs(n, e) {
  if (n && !Nr.has(e)) {
    var t;
    Nr.add(e), (t = console).error.apply(t, kd(e));
  }
}
function hb(n) {
  var e = !n, t = Object.prototype.toString.call(n) === "[object Object]" && !n.addEventListener;
  Rs(e, ["tippy() was passed", "`" + String(n) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), Rs(t, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "));
}
var wd = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, pb = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, Pe = Object.assign({
  appendTo: yd,
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
}, wd, pb), mb = Object.keys(Pe), gb = function(e) {
  process.env.NODE_ENV !== "production" && Cd(e, []);
  var t = Object.keys(e);
  t.forEach(function(r) {
    Pe[r] = e[r];
  });
};
function xd(n) {
  var e = n.plugins || [], t = e.reduce(function(r, i) {
    var o = i.name, s = i.defaultValue;
    if (o) {
      var l;
      r[o] = n[o] !== void 0 ? n[o] : (l = Pe[o]) != null ? l : s;
    }
    return r;
  }, {});
  return Object.assign({}, n, t);
}
function yb(n, e) {
  var t = e ? Object.keys(xd(Object.assign({}, Pe, {
    plugins: e
  }))) : mb, r = t.reduce(function(i, o) {
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
function tc(n, e) {
  var t = Object.assign({}, e, {
    content: bd(e.content, [n])
  }, e.ignoreAttributes ? {} : yb(n, e.plugins));
  return t.aria = Object.assign({}, Pe.aria, t.aria), t.aria = {
    expanded: t.aria.expanded === "auto" ? e.interactive : t.aria.expanded,
    content: t.aria.content === "auto" ? e.interactive ? null : "describedby" : t.aria.content
  }, t;
}
function Cd(n, e) {
  n === void 0 && (n = {}), e === void 0 && (e = []);
  var t = Object.keys(n);
  t.forEach(function(r) {
    var i = Y0(Pe, Object.keys(wd)), o = !G0(i, r);
    o && (o = e.filter(function(s) {
      return s.name === r;
    }).length === 0), Ct(o, ["`" + r + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`, `All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "));
  });
}
var bb = function() {
  return "innerHTML";
};
function Ps(n, e) {
  n[bb()] = e;
}
function nc(n) {
  var e = gr();
  return n === !0 ? e.className = md : (e.className = gd, Or(n) ? e.appendChild(n) : Ps(e, n)), e;
}
function rc(n, e) {
  Or(e.content) ? (Ps(n, ""), n.appendChild(e.content)) : typeof e.content != "function" && (e.allowHTML ? Ps(n, e.content) : n.textContent = e.content);
}
function Fs(n) {
  var e = n.firstElementChild, t = Ri(e.children);
  return {
    box: e,
    content: t.find(function(r) {
      return r.classList.contains(pd);
    }),
    arrow: t.find(function(r) {
      return r.classList.contains(md) || r.classList.contains(gd);
    }),
    backdrop: t.find(function(r) {
      return r.classList.contains(J0);
    })
  };
}
function Td(n) {
  var e = gr(), t = gr();
  t.className = U0, t.setAttribute("data-state", "hidden"), t.setAttribute("tabindex", "-1");
  var r = gr();
  r.className = pd, r.setAttribute("data-state", "hidden"), rc(r, n.props), e.appendChild(t), t.appendChild(r), i(n.props, n.props);
  function i(o, s) {
    var l = Fs(e), a = l.box, c = l.content, u = l.arrow;
    s.theme ? a.setAttribute("data-theme", s.theme) : a.removeAttribute("data-theme"), typeof s.animation == "string" ? a.setAttribute("data-animation", s.animation) : a.removeAttribute("data-animation"), s.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = typeof s.maxWidth == "number" ? s.maxWidth + "px" : s.maxWidth, s.role ? a.setAttribute("role", s.role) : a.removeAttribute("role"), (o.content !== s.content || o.allowHTML !== s.allowHTML) && rc(c, n.props), s.arrow ? u ? o.arrow !== s.arrow && (a.removeChild(u), a.appendChild(nc(s.arrow))) : a.appendChild(nc(s.arrow)) : u && a.removeChild(u);
  }
  return {
    popper: e,
    onUpdate: i
  };
}
Td.$$tippy = !0;
var vb = 1, oi = [], ns = [];
function kb(n, e) {
  var t = tc(n, Object.assign({}, Pe, xd(Ya(e)))), r, i, o, s = !1, l = !1, a = !1, c = !1, u, d, f, h = [], p = Ja(Wr, t.interactiveDebounce), m, g = vb++, b = null, w = X0(t.plugins), C = {
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
  }, y = {
    // properties
    id: g,
    reference: n,
    popper: gr(),
    popperInstance: b,
    props: t,
    state: C,
    plugins: w,
    // methods
    clearDelayTimeouts: Gr,
    setProps: Yr,
    setContent: Qr,
    show: Jd,
    hide: Gd,
    hideWithInteractivity: Yd,
    enable: ir,
    disable: Jr,
    unmount: Qd,
    destroy: Xd
  };
  if (!t.render)
    return process.env.NODE_ENV !== "production" && Rs(!0, "render() function has not been supplied."), y;
  var M = t.render(y), v = M.popper, A = M.onUpdate;
  v.setAttribute("data-tippy-root", ""), v.id = "tippy-" + y.id, y.popper = v, n._tippy = y, v._tippy = y;
  var R = w.map(function(k) {
    return k.fn(y);
  }), S = n.hasAttribute("aria-expanded");
  return Tn(), me(), G(), K("onCreate", [y]), t.showOnCreate && rr(), v.addEventListener("mouseenter", function() {
    y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
  }), v.addEventListener("mouseleave", function() {
    y.props.interactive && y.props.trigger.indexOf("mouseenter") >= 0 && ae().addEventListener("mousemove", p);
  }), y;
  function I() {
    var k = y.props.touch;
    return Array.isArray(k) ? k : [k, 0];
  }
  function _() {
    return I()[0] === "hold";
  }
  function W() {
    var k;
    return !!((k = y.props.render) != null && k.$$tippy);
  }
  function q() {
    return m || n;
  }
  function ae() {
    var k = q().parentNode;
    return k ? ib(k) : document;
  }
  function X() {
    return Fs(v);
  }
  function Y(k) {
    return y.state.isMounted && !y.state.isVisible || ot.isTouch || u && u.type === "focus" ? 0 : Zo(y.props.delay, k ? 0 : 1, Pe.delay);
  }
  function G(k) {
    k === void 0 && (k = !1), v.style.pointerEvents = y.props.interactive && !k ? "" : "none", v.style.zIndex = "" + y.props.zIndex;
  }
  function K(k, N, L) {
    if (L === void 0 && (L = !0), R.forEach(function(j) {
      j[k] && j[k].apply(j, N);
    }), L) {
      var U;
      (U = y.props)[k].apply(U, N);
    }
  }
  function Be() {
    var k = y.props.aria;
    if (k.content) {
      var N = "aria-" + k.content, L = v.id, U = Ln(y.props.triggerTarget || n);
      U.forEach(function(j) {
        var ke = j.getAttribute(N);
        if (y.state.isVisible)
          j.setAttribute(N, ke ? ke + " " + L : L);
        else {
          var He = ke && ke.replace(L, "").trim();
          He ? j.setAttribute(N, He) : j.removeAttribute(N);
        }
      });
    }
  }
  function me() {
    if (!(S || !y.props.aria.expanded)) {
      var k = Ln(y.props.triggerTarget || n);
      k.forEach(function(N) {
        y.props.interactive ? N.setAttribute("aria-expanded", y.state.isVisible && N === q() ? "true" : "false") : N.removeAttribute("aria-expanded");
      });
    }
  }
  function mt() {
    ae().removeEventListener("mousemove", p), oi = oi.filter(function(k) {
      return k !== p;
    });
  }
  function Se(k) {
    if (!(ot.isTouch && (a || k.type === "mousedown"))) {
      var N = k.composedPath && k.composedPath()[0] || k.target;
      if (!(y.props.interactive && Xa(v, N))) {
        if (Ln(y.props.triggerTarget || n).some(function(L) {
          return Xa(L, N);
        })) {
          if (ot.isTouch || y.state.isVisible && y.props.trigger.indexOf("click") >= 0)
            return;
        } else
          K("onClickOutside", [y, k]);
        y.props.hideOnClick === !0 && (y.clearDelayTimeouts(), y.hide(), l = !0, setTimeout(function() {
          l = !1;
        }), y.state.isMounted || yt());
      }
    }
  }
  function Zt() {
    a = !0;
  }
  function gt() {
    a = !1;
  }
  function Ge() {
    var k = ae();
    k.addEventListener("mousedown", Se, !0), k.addEventListener("touchend", Se, nn), k.addEventListener("touchstart", gt, nn), k.addEventListener("touchmove", Zt, nn);
  }
  function yt() {
    var k = ae();
    k.removeEventListener("mousedown", Se, !0), k.removeEventListener("touchend", Se, nn), k.removeEventListener("touchstart", gt, nn), k.removeEventListener("touchmove", Zt, nn);
  }
  function xn(k, N) {
    Cn(k, function() {
      !y.state.isVisible && v.parentNode && v.parentNode.contains(v) && N();
    });
  }
  function bt(k, N) {
    Cn(k, N);
  }
  function Cn(k, N) {
    var L = X().box;
    function U(j) {
      j.target === L && (ts(L, "remove", U), N());
    }
    if (k === 0)
      return N();
    ts(L, "remove", d), ts(L, "add", U), d = U;
  }
  function Ot(k, N, L) {
    L === void 0 && (L = !1);
    var U = Ln(y.props.triggerTarget || n);
    U.forEach(function(j) {
      j.addEventListener(k, N, L), h.push({
        node: j,
        eventType: k,
        handler: N,
        options: L
      });
    });
  }
  function Tn() {
    _() && (Ot("touchstart", er, {
      passive: !0
    }), Ot("touchend", qr, {
      passive: !0
    })), Q0(y.props.trigger).forEach(function(k) {
      if (k !== "manual")
        switch (Ot(k, er), k) {
          case "mouseenter":
            Ot("mouseleave", qr);
            break;
          case "focus":
            Ot(ub ? "focusout" : "blur", tr);
            break;
          case "focusin":
            Ot("focusout", tr);
            break;
        }
    });
  }
  function jr() {
    h.forEach(function(k) {
      var N = k.node, L = k.eventType, U = k.handler, j = k.options;
      N.removeEventListener(L, U, j);
    }), h = [];
  }
  function er(k) {
    var N, L = !1;
    if (!(!y.state.isEnabled || nr(k) || l)) {
      var U = ((N = u) == null ? void 0 : N.type) === "focus";
      u = k, m = k.currentTarget, me(), !y.state.isVisible && tb(k) && oi.forEach(function(j) {
        return j(k);
      }), k.type === "click" && (y.props.trigger.indexOf("mouseenter") < 0 || s) && y.props.hideOnClick !== !1 && y.state.isVisible ? L = !0 : rr(k), k.type === "click" && (s = !L), L && !U && en(k);
    }
  }
  function Wr(k) {
    var N = k.target, L = q().contains(N) || v.contains(N);
    if (!(k.type === "mousemove" && L)) {
      var U = Nt().concat(v).map(function(j) {
        var ke, He = j._tippy, Sn = (ke = He.popperInstance) == null ? void 0 : ke.state;
        return Sn ? {
          popperRect: j.getBoundingClientRect(),
          popperState: Sn,
          props: t
        } : null;
      }).filter(Boolean);
      ob(U, k) && (mt(), en(k));
    }
  }
  function qr(k) {
    var N = nr(k) || y.props.trigger.indexOf("click") >= 0 && s;
    if (!N) {
      if (y.props.interactive) {
        y.hideWithInteractivity(k);
        return;
      }
      en(k);
    }
  }
  function tr(k) {
    y.props.trigger.indexOf("focusin") < 0 && k.target !== q() || y.props.interactive && k.relatedTarget && v.contains(k.relatedTarget) || en(k);
  }
  function nr(k) {
    return ot.isTouch ? _() !== k.type.indexOf("touch") >= 0 : !1;
  }
  function Kr() {
    Ur();
    var k = y.props, N = k.popperOptions, L = k.placement, U = k.offset, j = k.getReferenceClientRect, ke = k.moveTransition, He = W() ? Fs(v).arrow : null, Sn = j ? {
      getBoundingClientRect: j,
      contextElement: j.contextElement || q()
    } : n, Il = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Xr) {
        var Mn = Xr.state;
        if (W()) {
          var Zd = X(), Bo = Zd.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(Zr) {
            Zr === "placement" ? Bo.setAttribute("data-placement", Mn.placement) : Mn.attributes.popper["data-popper-" + Zr] ? Bo.setAttribute("data-" + Zr, "") : Bo.removeAttribute("data-" + Zr);
          }), Mn.attributes.popper = {};
        }
      }
    }, tn = [{
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
        adaptive: !ke
      }
    }, Il];
    W() && He && tn.push({
      name: "arrow",
      options: {
        element: He,
        padding: 3
      }
    }), tn.push.apply(tn, (N == null ? void 0 : N.modifiers) || []), y.popperInstance = K0(Sn, v, Object.assign({}, N, {
      placement: L,
      onFirstUpdate: f,
      modifiers: tn
    }));
  }
  function Ur() {
    y.popperInstance && (y.popperInstance.destroy(), y.popperInstance = null);
  }
  function vt() {
    var k = y.props.appendTo, N, L = q();
    y.props.interactive && k === yd || k === "parent" ? N = L.parentNode : N = bd(k, [L]), N.contains(v) || N.appendChild(v), y.state.isMounted = !0, Kr(), process.env.NODE_ENV !== "production" && Ct(y.props.interactive && k === Pe.appendTo && L.nextElementSibling !== v, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`, "Using a wrapper <div> or <span> tag around the reference element", "solves this by creating a new parentNode context.", `

`, "Specifying `appendTo: document.body` silences this warning, but it", "assumes you are using a focus management solution to handle", "keyboard navigation.", `

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "));
  }
  function Nt() {
    return Ri(v.querySelectorAll("[data-tippy-root]"));
  }
  function rr(k) {
    y.clearDelayTimeouts(), k && K("onTrigger", [y, k]), Ge();
    var N = Y(!0), L = I(), U = L[0], j = L[1];
    ot.isTouch && U === "hold" && j && (N = j), N ? r = setTimeout(function() {
      y.show();
    }, N) : y.show();
  }
  function en(k) {
    if (y.clearDelayTimeouts(), K("onUntrigger", [y, k]), !y.state.isVisible) {
      yt();
      return;
    }
    if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(k.type) >= 0 && s)) {
      var N = Y(!1);
      N ? i = setTimeout(function() {
        y.state.isVisible && y.hide();
      }, N) : o = requestAnimationFrame(function() {
        y.hide();
      });
    }
  }
  function ir() {
    y.state.isEnabled = !0;
  }
  function Jr() {
    y.hide(), y.state.isEnabled = !1;
  }
  function Gr() {
    clearTimeout(r), clearTimeout(i), cancelAnimationFrame(o);
  }
  function Yr(k) {
    if (process.env.NODE_ENV !== "production" && Ct(y.state.isDestroyed, On("setProps")), !y.state.isDestroyed) {
      K("onBeforeUpdate", [y, k]), jr();
      var N = y.props, L = tc(n, Object.assign({}, N, Ya(k), {
        ignoreAttributes: !0
      }));
      y.props = L, Tn(), N.interactiveDebounce !== L.interactiveDebounce && (mt(), p = Ja(Wr, L.interactiveDebounce)), N.triggerTarget && !L.triggerTarget ? Ln(N.triggerTarget).forEach(function(U) {
        U.removeAttribute("aria-expanded");
      }) : L.triggerTarget && n.removeAttribute("aria-expanded"), me(), G(), A && A(N, L), y.popperInstance && (Kr(), Nt().forEach(function(U) {
        requestAnimationFrame(U._tippy.popperInstance.forceUpdate);
      })), K("onAfterUpdate", [y, k]);
    }
  }
  function Qr(k) {
    y.setProps({
      content: k
    });
  }
  function Jd() {
    process.env.NODE_ENV !== "production" && Ct(y.state.isDestroyed, On("show"));
    var k = y.state.isVisible, N = y.state.isDestroyed, L = !y.state.isEnabled, U = ot.isTouch && !y.props.touch, j = Zo(y.props.duration, 0, Pe.duration);
    if (!(k || N || L || U) && !q().hasAttribute("disabled") && (K("onShow", [y], !1), y.props.onShow(y) !== !1)) {
      if (y.state.isVisible = !0, W() && (v.style.visibility = "visible"), G(), Ge(), y.state.isMounted || (v.style.transition = "none"), W()) {
        var ke = X(), He = ke.box, Sn = ke.content;
        es([He, Sn], 0);
      }
      f = function() {
        var tn;
        if (!(!y.state.isVisible || c)) {
          if (c = !0, v.offsetHeight, v.style.transition = y.props.moveTransition, W() && y.props.animation) {
            var Do = X(), Xr = Do.box, Mn = Do.content;
            es([Xr, Mn], j), Qa([Xr, Mn], "visible");
          }
          Be(), me(), Ga(ns, y), (tn = y.popperInstance) == null || tn.forceUpdate(), K("onMount", [y]), y.props.animation && W() && bt(j, function() {
            y.state.isShown = !0, K("onShown", [y]);
          });
        }
      }, vt();
    }
  }
  function Gd() {
    process.env.NODE_ENV !== "production" && Ct(y.state.isDestroyed, On("hide"));
    var k = !y.state.isVisible, N = y.state.isDestroyed, L = !y.state.isEnabled, U = Zo(y.props.duration, 1, Pe.duration);
    if (!(k || N || L) && (K("onHide", [y], !1), y.props.onHide(y) !== !1)) {
      if (y.state.isVisible = !1, y.state.isShown = !1, c = !1, s = !1, W() && (v.style.visibility = "hidden"), mt(), yt(), G(!0), W()) {
        var j = X(), ke = j.box, He = j.content;
        y.props.animation && (es([ke, He], U), Qa([ke, He], "hidden"));
      }
      Be(), me(), y.props.animation ? W() && xn(U, y.unmount) : y.unmount();
    }
  }
  function Yd(k) {
    process.env.NODE_ENV !== "production" && Ct(y.state.isDestroyed, On("hideWithInteractivity")), ae().addEventListener("mousemove", p), Ga(oi, p), p(k);
  }
  function Qd() {
    process.env.NODE_ENV !== "production" && Ct(y.state.isDestroyed, On("unmount")), y.state.isVisible && y.hide(), y.state.isMounted && (Ur(), Nt().forEach(function(k) {
      k._tippy.unmount();
    }), v.parentNode && v.parentNode.removeChild(v), ns = ns.filter(function(k) {
      return k !== y;
    }), y.state.isMounted = !1, K("onHidden", [y]));
  }
  function Xd() {
    process.env.NODE_ENV !== "production" && Ct(y.state.isDestroyed, On("destroy")), !y.state.isDestroyed && (y.clearDelayTimeouts(), y.unmount(), jr(), delete n._tippy, y.state.isDestroyed = !0, K("onDestroy", [y]));
  }
}
function wn(n, e) {
  e === void 0 && (e = {});
  var t = Pe.plugins.concat(e.plugins || []);
  process.env.NODE_ENV !== "production" && (hb(n), Cd(e, t)), ab();
  var r = Object.assign({}, e, {
    plugins: t
  }), i = rb(n);
  if (process.env.NODE_ENV !== "production") {
    var o = Or(r.content), s = i.length > 1;
    Ct(o && s, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`, "Instead, pass the .innerHTML of the element, or use a function that", "returns a cloned version of the element instead.", `

`, `1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
  }
  var l = i.reduce(function(a, c) {
    var u = c && kb(c, r);
    return u && a.push(u), a;
  }, []);
  return Or(n) ? l[0] : l;
}
wn.defaultProps = Pe;
wn.setDefaultProps = gb;
wn.currentInput = ot;
Object.assign({}, sd, {
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
wn.setDefaultProps({
  render: Td
});
class wb {
  constructor({ editor: e, element: t, view: r, tippyOptions: i = {}, updateDelay: o = 250, shouldShow: s }) {
    this.preventHide = !1, this.shouldShow = ({ view: l, state: a, from: c, to: u }) => {
      const { doc: d, selection: f } = a, { empty: h } = f, p = !d.textBetween(c, u).length && hl(a.selection), m = this.element.contains(document.activeElement);
      return !(!(l.hasFocus() || m) || h || p || !this.editor.isEditable);
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
      const { state: p, composing: m } = l, { selection: g } = p;
      if (m || !a && !c)
        return;
      this.createTooltip();
      const { ranges: w } = g, C = Math.min(...w.map((v) => v.$from.pos)), y = Math.max(...w.map((v) => v.$to.pos));
      if (!((d = this.shouldShow) === null || d === void 0 ? void 0 : d.call(this, {
        editor: this.editor,
        view: l,
        state: p,
        oldState: u,
        from: C,
        to: y
      }))) {
        this.hide();
        return;
      }
      (f = this.tippy) === null || f === void 0 || f.setProps({
        getReferenceClientRect: ((h = this.tippyOptions) === null || h === void 0 ? void 0 : h.getReferenceClientRect) || (() => {
          if (uy(p.selection)) {
            let v = l.nodeDOM(C);
            const A = v.dataset.nodeViewWrapper ? v : v.querySelector("[data-node-view-wrapper]");
            if (A && (v = A.firstChild), v)
              return v.getBoundingClientRect();
          }
          return rd(l, C, y);
        })
      }), this.show();
    }, this.editor = e, this.element = t, this.view = r, this.updateDelay = o, s && (this.shouldShow = s), this.element.addEventListener("mousedown", this.mousedownHandler, { capture: !0 }), this.view.dom.addEventListener("dragstart", this.dragstartHandler), this.editor.on("focus", this.focusHandler), this.editor.on("blur", this.blurHandler), this.tippyOptions = i, this.element.remove(), this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: e } = this.editor.options, t = !!e.parentElement;
    this.tippy || !t || (this.tippy = wn(e, {
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
const Sd = (n) => new le({
  key: typeof n.pluginKey == "string" ? new ve(n.pluginKey) : n.pluginKey,
  view: (e) => new wb({ view: e, ...n })
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
      Sd({
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
class xb {
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
    this.tippy || !t || (this.tippy = wn(e, {
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
      getReferenceClientRect: ((o = this.tippyOptions) === null || o === void 0 ? void 0 : o.getReferenceClientRect) || (() => rd(e, c, u))
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
const Md = (n) => new le({
  key: typeof n.pluginKey == "string" ? new ve(n.pluginKey) : n.pluginKey,
  view: (e) => new xb({ view: e, ...n })
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
      Md({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ] : [];
  }
});
const Cb = Ir({
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
    const t = Rr(null);
    return ho(() => {
      const { updateDelay: r, editor: i, pluginKey: o, shouldShow: s, tippyOptions: l } = n;
      i.registerPlugin(Sd({
        updateDelay: r,
        editor: i,
        element: t.value,
        pluginKey: o,
        shouldShow: s,
        tippyOptions: l
      }));
    }), Gs(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return Mt("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
function ic(n) {
  return of((e, t) => ({
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
class Tb extends zy {
  constructor(e = {}) {
    return super(e), this.vueRenderers = po(/* @__PURE__ */ new Map()), this.contentComponent = null, this.reactiveState = ic(this.view.state), this.reactiveExtensionStorage = ic(this.extensionStorage), this.on("transaction", () => {
      this.reactiveState.value = this.view.state, this.reactiveExtensionStorage.value = this.extensionStorage;
    }), Ys(this);
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
const Sb = Ir({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(n) {
    const e = Rr(), t = ef();
    return tf(() => {
      const r = n.editor;
      r && r.options.element && e.value && nf(() => {
        if (!e.value || !r.options.element.firstChild)
          return;
        const i = di(e.value);
        e.value.append(...r.options.element.childNodes), r.contentComponent = t.ctx._, r.setOptions({
          element: i
        }), r.createNodeViews();
      });
    }), Gs(() => {
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
      const t = Mt(rf, {
        to: e.teleportElement,
        key: e.id
      }, Mt(e.component, {
        ref: e.id,
        ...e.props
      }));
      n.push(t);
    }), Mt("div", {
      ref: (e) => {
        this.rootEl = e;
      }
    }, ...n);
  }
}), Mb = Ir({
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
    const t = Rr(null);
    return ho(() => {
      const { pluginKey: r, editor: i, tippyOptions: o, shouldShow: s } = n;
      i.registerPlugin(Md({
        pluginKey: r,
        editor: i,
        element: t.value,
        tippyOptions: o,
        shouldShow: s
      }));
    }), Gs(() => {
      const { pluginKey: r, editor: i } = n;
      i.unregisterPlugin(r);
    }), () => {
      var r;
      return Mt("div", { ref: t }, (r = e.default) === null || r === void 0 ? void 0 : r.call(e));
    };
  }
});
Ir({
  name: "NodeViewContent",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return Mt(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
const Eb = Ir({
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
    return Mt(this.as, {
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
class Ab {
  constructor(e, { props: t = {}, editor: r }) {
    if (this.id = Math.floor(Math.random() * 4294967295).toString(), this.editor = r, this.component = Ys(e), this.teleportElement = document.createElement("div"), this.element = this.teleportElement, this.props = po(t), this.editor.vueRenderers.set(this.id, this), this.editor.contentComponent) {
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
const Ob = {
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
}, Nb = ee.create({
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
        key: new ve("placeholder"),
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
                const m = [this.options.emptyNodeClass];
                u && m.push(this.options.emptyEditorClass);
                const g = Ee.node(f, f + d.nodeSize, {
                  class: m.join(" "),
                  "data-placeholder": typeof this.options.placeholder == "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: d,
                    pos: f,
                    hasAnchor: h
                  }) : this.options.placeholder
                });
                o.push(g);
              }
              return this.options.includeChildren;
            }), re.create(n, o);
          }
        }
      })
    ];
  }
}), Db = ee.create({
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
var zs = function(n, e) {
  return zs = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var i in r)
      Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }, zs(n, e);
};
function Bb(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  zs(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
function oc(n, e, t, r) {
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
function sc(n, e) {
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
var Wt = (
  /** @class */
  function(n) {
    Bb(e, n);
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
), $n = (
  /** @class */
  function() {
    function n() {
      this.state = /* @__PURE__ */ new Map(), n.instance = this;
    }
    return n.prototype.getByName = function(e) {
      return e === void 0 && (e = n.DEFAULT_NAMESPACE), this.state.has(e) || this.state.set(e, {
        queue: po([]),
        initialized: !1
      }), this.state.get(e);
    }, n.prototype.forceClean = function() {
      this.state.forEach(function(e) {
        e.queue.splice(0, e.queue.length);
      });
    }, n.DEFAULT_NAMESPACE = "default", n;
  }()
), Ed = function() {
  var n = new $n(), e = {
    scrollLock: !0,
    animation: "modal-list",
    backgroundClose: !0,
    escClose: !0,
    store: {},
    skipInitCheck: !1,
    draggable: !1
  }, t = n.getByName().queue;
  return Ec(function() {
    return t;
  }, function() {
    t.length ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto";
  }, { deep: !0 }), {
    namespaceStore: n,
    configuration: e
  };
}();
function Xt(n) {
  return Ed.namespaceStore.getByName(n);
}
var Dr = Ed.configuration;
function Ad(n) {
  var e = {
    backgroundClose: Dr.backgroundClose,
    isRoute: !1,
    namespace: $n.DEFAULT_NAMESPACE,
    draggable: Dr.draggable
  };
  return n.backgroundClose !== void 0 && (e.backgroundClose = n.backgroundClose), n.isRoute && (e.isRoute = n.isRoute), n.namespace && (e.namespace = n.namespace), n.draggable !== void 0 && (e.draggable = n.draggable), e;
}
function lc(n) {
  n === void 0 && (n = {});
  var e = {
    background: !1,
    esc: !1
  };
  return Object.assign(e, n);
}
function Od(n) {
  return n || (n = {}), n;
}
function Sl(n, e) {
  e === void 0 && (e = {});
  var t = _r.STORE.get(n);
  if (!t)
    return Promise.reject(Wt.ModalNotFoundByID(n));
  var r = Xt(t.namespace), i = r.queue.findIndex(function(s) {
    return s.id === n;
  });
  if (i === -1)
    return Promise.reject(Wt.Undefined(n));
  var o = _n.get(n, "close").map(function(s) {
    return Ib(s, n, lc(e));
  });
  return Dd(o).then(function() {
    r.queue.splice(i, 1);
  }).then(function() {
    _n.get(n, "destroy").forEach(function(s) {
      return s(lc(e));
    });
  }).then(function() {
    _n.delete(n);
  });
}
var _r = (
  /** @class */
  function() {
    function n(e, t, r) {
      var i = this;
      this.events = po({}), this.backgroundClose = !0, this.isRoute = !1, this.id = n.modalId++, this.component = e, this.props = Rr(t), this.closed = sf(function() {
        return !Xt(r.namespace).queue.includes(i);
      }), e.beforeModalClose && _n.add(this.id, "close", e.beforeModalClose);
      var o = Ad(r);
      this.backgroundClose = o.backgroundClose, this.isRoute = o.isRoute, this.namespace = o.namespace, this.draggable = o.draggable, n.STORE.set(this.id, this);
    }
    return n.prototype.close = function() {
      return Sl(this.id);
    }, Object.defineProperty(n.prototype, "onclose", {
      /**
       * @description Hook for handling modal closing
       * */
      set: function(e) {
        _n.add(this.id, "close", e);
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "ondestroy", {
      /**
       * @description Hook for handling modal closing
       * */
      set: function(e) {
        _n.add(this.id, "destroy", e);
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
function Nd(n) {
  return _r.STORE.get(n);
}
var Lb = {
  store: {},
  add: function(n, e, t) {
    var r, i;
    if (typeof t != "function")
      throw Wt.GuardDeclarationType(t);
    this.store[n] || (this.store[n] = (r = {}, r[e] = [], r)), this.store[n][e] || (this.store[n][e] = []), (i = this.store[n][e]) === null || i === void 0 || i.push(t);
  },
  get: function(n, e) {
    return n in this.store ? e in this.store[n] ? this.store[n][e] || [] : [] : [];
  },
  delete: function(n) {
    n in this.store && delete this.store[n];
  }
};
const _n = Lb;
function Dd(n) {
  return n.reduce(function(e, t) {
    return e.then(function() {
      return t();
    });
  }, Promise.resolve());
}
function Ib(n, e, t) {
  return function() {
    return new Promise(function(r, i) {
      var o, s = function(l) {
        l === void 0 && (l = !0), l === !1 && i(Wt.NextReject(e)), r();
      };
      Promise.resolve(n.call((o = Nd(e)) === null || o === void 0 ? void 0 : o.instance, t)).then(s).catch(function(l) {
        return i(l);
      });
    });
  };
}
function Bd(n) {
  return n = Od(n), Dd(Xt(n.namespace).queue.map(function(e) {
    return function() {
      return e.close();
    };
  }));
}
function Ld(n) {
  var e = Xt(n), t = e.queue;
  if (t.length !== 0)
    return t[t.length - 1];
}
function Oo(n) {
  n = Od(n);
  var e = Ld(n.namespace);
  return e ? e.close() : Promise.resolve();
}
function Rb(n, e, t) {
  var r = Ad(t), i = Xt(r.namespace);
  if (r.namespace === $n.DEFAULT_NAMESPACE && !i.initialized && !Dr.skipInitCheck)
    throw Wt.NotInitialized(r.namespace);
  if (typeof n == "string") {
    var o = zb(n);
    if (!o)
      throw Wt.ModalNotExistsInStore(n);
    n = o;
  }
  if (!n)
    throw Wt.ModalComponentNotProvided();
  var s = new _r(n, e, r);
  return i.queue.push(Ys(s)), s;
}
function Id(n, e, t) {
  return e === void 0 && (e = {}), t === void 0 && (t = {}), Promise.resolve().then(function() {
    return Rb(n, e, t);
  });
}
function Pb(n, e, t) {
  return e === void 0 && (e = {}), t === void 0 && (t = {}), Bd({
    namespace: t.namespace
  }).then(function() {
    var r = Xt(t.namespace);
    if (r.queue.length)
      throw Wt.QueueNoEmpty();
  }).then(function() {
    return Id(n, e, t);
  });
}
function Fb(n, e, t) {
  return e === void 0 && (e = {}), t === void 0 && (t = {}), oc(this, void 0, void 0, function() {
    var r, i, o = this;
    return sc(this, function(s) {
      switch (s.label) {
        case 0:
          return [4, Id(n, e, t)];
        case 1:
          return r = s.sent(), i = !1, [2, new Promise(function(l) {
            r.on(_r.EVENT_PROMPT, function(a) {
              return oc(o, void 0, void 0, function() {
                return sc(this, function(c) {
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
function zb(n) {
  return Dr.store[n] || void 0;
}
function Hb(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Hs = { exports: {} }, rs, ac;
function Vb() {
  if (ac)
    return rs;
  ac = 1;
  var n = 1e3, e = n * 60, t = e * 60, r = t * 24, i = r * 7, o = r * 365.25;
  rs = function(u, d) {
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
  return rs;
}
function $b(n) {
  t.debug = t, t.default = t, t.coerce = a, t.disable = o, t.enable = i, t.enabled = s, t.humanize = Vb(), t.destroy = c, Object.keys(n).forEach((u) => {
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
    function m(...g) {
      if (!m.enabled)
        return;
      const b = m, w = Number(/* @__PURE__ */ new Date()), C = w - (d || w);
      b.diff = C, b.prev = d, b.curr = w, d = w, g[0] = t.coerce(g[0]), typeof g[0] != "string" && g.unshift("%O");
      let y = 0;
      g[0] = g[0].replace(/%([a-zA-Z%])/g, (M, v) => {
        if (M === "%%")
          return "%";
        y++;
        const A = t.formatters[v];
        if (typeof A == "function") {
          const R = g[y];
          M = A.call(b, R), g.splice(y, 1), y--;
        }
        return M;
      }), t.formatArgs.call(b, g), (b.log || t.log).apply(b, g);
    }
    return m.namespace = u, m.useColors = t.useColors(), m.color = t.selectColor(u), m.extend = r, m.destroy = t.destroy, Object.defineProperty(m, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => f !== null ? f : (h !== t.namespaces && (h = t.namespaces, p = t.enabled(u)), p),
      set: (g) => {
        f = g;
      }
    }), typeof t.init == "function" && t.init(m), m;
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
var _b = $b;
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
  n.exports = _b(e);
  const { formatters: l } = n.exports;
  l.j = function(a) {
    try {
      return JSON.stringify(a);
    } catch (c) {
      return "[UnexpectedJSONParseError]: " + c.message;
    }
  };
})(Hs, Hs.exports);
var jb = Hs.exports;
const Wb = /* @__PURE__ */ Hb(jb);
function qb(n) {
  return Wb("jenesius-vue-modal:".concat(n));
}
const Kb = ["onPointerdown"], cc = {
  __name: "WidgetModalContainerItem",
  props: {
    id: Number
  },
  setup(n) {
    const e = Rr(null), t = qb("modal-item"), r = n, i = Nd(r.id);
    function o() {
      if (i.backgroundClose)
        return Sl(i.id, { background: !0 }).catch(() => {
        });
    }
    Ec(() => e.value, (l) => {
      i.instance = l;
    }), ho(() => {
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
        const { clientX: p, clientY: m } = c, g = p, b = m;
        t(`movement started at (${b}, ${b})`), document.addEventListener("pointermove", w, { passive: !0 }), document.addEventListener("pointerup", C, { once: !0 });
        function w(y) {
          const { clientX: M, clientY: v } = y, A = f + M - g, R = h + v - b;
          t(`move at (${A}, ${R})`), a.style.transform = `translate(${A}px,${R}px)`;
        }
        function C(y) {
          t("movement completed"), document.removeEventListener("pointermove", w), y.preventDefault();
        }
      });
    }
    return (l, a) => (D(), z("div", {
      class: "widget__modal-container__item modal-container",
      onPointerdown: Ie(o, ["self", "stop"])
    }, [
      (D(), We(af(di(i).component), cf(di(i).props.value, {
        class: "modal-item widget__modal-wrap",
        modalId: `_modal_${n.id}`,
        ref_key: "modalRef",
        ref: e
      }, uf(di(i).events)), null, 16, ["modalId"]))
    ], 40, Kb));
  }
};
function Ub(n) {
  n === void 0 && (n = $n.DEFAULT_NAMESPACE);
  var e = $n.instance.getByName(n);
  e.initialized = !0, n === $n.DEFAULT_NAMESPACE && document.addEventListener("keyup", function(t) {
    if (t.key === "Escape" || t.code === "Escape") {
      var r = Ld(n);
      if (!r)
        return;
      Sl(r.id, { esc: !0 }).catch(function() {
      });
    }
  });
}
const Jb = {
  props: {
    namespace: String
  },
  setup(n) {
    return ho(() => {
      Ub(n.namespace);
    }), () => {
      const e = Xt(n.namespace);
      return Mt(lf, { name: Dr.animation, tag: "div" }, {
        default: () => e.queue.map((t) => Mt(cc, {
          key: t.id,
          id: t.id
        }))
      });
    };
  },
  components: { WidgetContainerModalItem: cc }
};
Xt().queue;
function is(n) {
  return n && typeof n == "object" && !Array.isArray(n);
}
function Gb(n) {
  return n && typeof n == "object" && Array.isArray(n);
}
function Rd(n, e) {
  if (is(n) && is(e))
    for (const t in e)
      is(e[t]) ? (n[t] || Object.assign(n, { [t]: {} }), Rd(n[t], e[t])) : Gb(e[t]) ? (n[t] || (n[t] = []), mi(n[t], e[t])) : Object.assign(n, { [t]: e[t] });
  return n;
}
const mi = function(n, e) {
  return e === !1 ? [] : (e.forEach((t, r) => {
    !n || !n.find((i) => i.name == t.name) ? n.push(t) : Rd(
      n.find((i) => i.name == t.name),
      t
    );
  }), n);
}, Yb = ee.create({
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
      setBlockWidth: (n) => ({ commands: e, view: t }) => this.options.alignments.includes(n) ? (e.updateAttributes(yh(t).type.name, {
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
}), Qb = ee.create({
  name: "vuebergBlocks",
  addOptions() {
    return {
      blocks: []
    };
  },
  addCommands() {
    return {
      getCurrentNodeName: () => ({ editor: n }) => n.commands.getCurrentNode().type.name,
      getCurrentNode: (n = !0) => ({ editor: e }) => {
        const t = su(e);
        return n == !0 && (this.storage.currentNode = t), t;
      }
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
      hasAllowedBlocks(n) {
        return this.getAllowedBlocks(n, this.getFlatBlocks()).length > 0;
      },
      getAllowedBlocks(n, e) {
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
        return n.depth > 1 && n.parent ? this.getAllowedBlocks(n.parent, e) : e;
      },
      getAllowedBlocksByGroups(n) {
        const e = this.getAllBlocks(), t = this.getAllowedBlocks(n, this.getFlatBlocks()), r = new Set(t.map((o) => o.name)), i = [];
        return e.forEach((o) => {
          const s = o.blocks.filter((l) => r.has(l.name));
          s.length > 0 && i.push({
            ...o,
            blocks: s
          });
        }), i;
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
}), Xb = {
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
    MenuButton: Qs
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
      Oo();
    },
    okHandler() {
      this.$emit(_r.EVENT_PROMPT, this.form);
    },
    handleEsc(n) {
      n.key === "Escape" && (n.preventDefault(), this.hideModal());
    }
  }
}, Zb = {
  class: "vueberg-modal-layout",
  role: "dialog",
  "aria-modal": "true",
  tabindex: "-1"
}, ev = {
  key: 0,
  class: "vueberg-modal-header"
}, tv = { class: "vueberg-modal-header-title" }, nv = /* @__PURE__ */ P("svg", {
  width: "24px",
  height: "24px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ P("g", null, [
    /* @__PURE__ */ P("path", {
      id: "Vector",
      d: "M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ])
], -1), rv = [
  nv
], iv = { class: "vueberg-modal-body" }, ov = { class: "vueberg-form" }, sv = ["for"], lv = ["id", "placeholder", "autofocus", "onUpdate:modelValue"], av = ["innerHTML"], cv = { class: "vueberg-form-buttons" };
function uv(n, e, t, r, i, o) {
  const s = je("menu-button");
  return D(), z("div", Zb, [
    P("div", {
      class: "vueberg-modal-backdrop",
      onClick: e[0] || (e[0] = (...l) => o.clickBackdrop && o.clickBackdrop(...l))
    }),
    P("div", {
      class: Ut(["vueberg-modal", `vueberg-modal-${t.size}`]),
      tabindex: "0"
    }, [
      t.showHeader ? (D(), z("div", ev, [
        P("div", tv, Fe(t.title), 1),
        t.closable ? (D(), z("div", {
          key: 0,
          class: "vueberg-modal-header-close",
          onClick: e[1] || (e[1] = (...l) => o.hideModal && o.hideModal(...l))
        }, rv)) : se("", !0)
      ])) : se("", !0),
      P("div", iv, [
        P("div", ov, [
          (D(!0), z(Le, null, Ye(t.form, (l, a) => (D(), z("div", {
            class: "vueberg-form-item",
            key: a
          }, [
            P("label", {
              for: `vueberg-modal-input-${l.name}-${a}`
            }, Fe(l.label), 9, sv),
            df(P("input", {
              id: `vueberg-modal-input-${l.name}-${a}`,
              placeholder: l.placeholder,
              autofocus: a == 0,
              class: "vueberg-form-control",
              type: "text",
              "onUpdate:modelValue": (c) => l.value = c
            }, null, 8, lv), [
              [ff, l.value]
            ]),
            l.text ? (D(), z("small", {
              key: 0,
              innerHTML: l.text
            }, null, 8, av)) : se("", !0)
          ]))), 128)),
          P("div", cv, [
            st(s, {
              class: "vueberg-button-lg vueberg-button-secondary vueberg-button-text vueberg-button-text-only",
              onClick: Ie(o.hideModal, ["prevent"]),
              content: t.cancelButton
            }, null, 8, ["onClick", "content"]),
            st(s, {
              class: "vueberg-button-lg vueberg-button-primary vueberg-button-text vueberg-button-text-only",
              onClick: Ie(o.okHandler, ["prevent"]),
              content: t.okButton
            }, null, 8, ["onClick", "content"])
          ])
        ])
      ])
    ], 2)
  ]);
}
const dv = /* @__PURE__ */ pt(Xb, [["render", uv]]), fv = {
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
      Oo();
    }
  }
}, hv = { class: "vueberg-modal-layout" }, pv = {
  key: 0,
  class: "vueberg-modal-header"
}, mv = { class: "vueberg-modal-header-title" }, gv = /* @__PURE__ */ P("svg", {
  width: "24px",
  height: "24px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ P("g", null, [
    /* @__PURE__ */ P("path", {
      id: "Vector",
      d: "M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ])
], -1), yv = [
  gv
], bv = ["innerHTML"];
function vv(n, e, t, r, i, o) {
  return D(), z("div", hv, [
    P("div", {
      class: "vueberg-modal-backdrop",
      onClick: e[0] || (e[0] = (...s) => o.clickBackdrop && o.clickBackdrop(...s))
    }),
    P("div", {
      class: Ut(["vueberg-modal", `vueberg-modal-${t.size}`])
    }, [
      t.showHeader ? (D(), z("div", pv, [
        P("div", mv, Fe(t.title), 1),
        t.closable ? (D(), z("div", {
          key: 0,
          class: "vueberg-modal-header-close",
          onClick: e[1] || (e[1] = (...s) => o.hideModal && o.hideModal(...s))
        }, yv)) : se("", !0)
      ])) : se("", !0),
      t.content ? (D(), z("div", {
        key: 1,
        class: "vueberg-modal-body",
        innerHTML: t.content
      }, null, 8, bv)) : se("", !0)
    ], 2)
  ]);
}
const kv = /* @__PURE__ */ pt(fv, [["render", vv]]), wv = ee.create({
  name: "modal",
  addOptions() {
    return {
      formModal: dv,
      contentModal: kv,
      defaultProps: {}
    };
  },
  addCommands() {
    return {
      popModal: () => async ({ editor: n }) => {
        Oo();
      },
      closeModal: () => async ({ editor: n }) => {
        Bd();
      },
      openModal: (n = {}, e = this.options.contentModal) => async ({ editor: t }) => {
        t.commands.blur();
        const r = { ...this.options.defaultProps, ...n, editor: t };
        return await Pb(
          e,
          r
        );
      },
      promptModal: (n = {}, e = this.options.formModal) => async ({ editor: t }) => {
        t.commands.blur();
        const r = { ...this.options.defaultProps, ...n, editor: t };
        return await Fb(
          e,
          r
        );
      }
    };
  }
}), xv = ee.create({
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
}), Cv = /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)(?!.*\/channel\/)(?!\/@)(.+)?$/, Tv = /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be)(?!.*\/channel\/)(?!\/@)(.+)?$/g, Vs = (n) => n.match(Cv), uc = (n) => n ? "https://www.youtube-nocookie.com/embed/" : "https://www.youtube.com/embed/", Sv = (n) => {
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
    origin: m,
    playlist: g,
    progressBarColor: b,
    startAt: w
  } = n;
  if (e.includes("/embed/"))
    return e;
  if (e.includes("youtu.be")) {
    const A = e.split("/").pop();
    return A ? `${uc(p)}${A}` : null;
  }
  const y = /v=([-\w]+)/gm.exec(e);
  if (!y || !y[1])
    return null;
  let M = `${uc(p)}${y[1]}`;
  const v = [];
  return t === !1 && v.push("fs=0"), r && v.push("autoplay=1"), i && v.push(`cc_lang_pref=${i}`), o && v.push("cc_load_policy=1"), s || v.push("controls=0"), l && v.push("disablekb=1"), a && v.push("enablejsapi=1"), c && v.push(`end=${c}`), u && v.push(`hl=${u}`), d && v.push(`iv_load_policy=${d}`), f && v.push("loop=1"), h && v.push("modestbranding=1"), m && v.push(`origin=${m}`), g && v.push(`playlist=${g}`), w && v.push(`start=${w}`), b && v.push(`color=${b}`), v.length && (M += `?${v.join("&")}`), M;
};
function Mv() {
  return [
    {
      title: "Текст",
      name: "typography",
      blocks: [
        {
          title: "Заголовок",
          name: "heading",
          keywords: ["h1", "h2", "h3", "heading"],
          description: "Просто заголовок страницы",
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
          description: "Описание",
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
          description: "Описание",
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
              name: "bulletList",
              icon: '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke-width="1"  fill="currentColor"  focusable="false"><path d="M4 4v1.5h16V4H4zm8 8.5h8V11h-8v1.5zM4 20h16v-1.5H4V20zm4-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"></path></svg>',
              command: (n) => {
                n.chain().focus().toggleBulletList().run();
              },
              isActiveTest: (n) => n.isActive("bulletList")
            },
            {
              title: "Нумер. список",
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
              Vs(o) ? t = !0 : (r = o, i = n.commands.getTranslation("blockTools.youtube.form.error"));
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
                  Vs(i) ? e = !0 : (t = i, r = n.commands.getTranslation("blockTools.youtube.form.error"));
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
const Ev = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, Av = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, Ov = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, Nv = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, Dv = De.create({
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
    return ["strong", Q(this.options.HTMLAttributes, n), 0];
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
      vn({
        find: Ev,
        type: this.type
      }),
      vn({
        find: Ov,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Kt({
        find: Av,
        type: this.type
      }),
      Kt({
        find: Nv,
        type: this.type
      })
    ];
  }
}), Bv = ye.create({
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
    return ["li", Q(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), dc = De.create({
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
    return ["span", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Eo(n, this.type);
        return Object.entries(t).some(([, i]) => !!i) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), fc = /^\s*([-+*])\s$/, Lv = ye.create({
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
    return ["ul", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Bv.name, this.editor.getAttributes(dc.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let n = Li({
      find: fc,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Li({
      find: fc,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(dc.name),
      editor: this.editor
    })), [
      n
    ];
  }
}), Iv = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))$/, Rv = /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))/g, Pv = De.create({
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
    return ["code", Q(this.options.HTMLAttributes, n), 0];
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
      vn({
        find: Iv,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Kt({
        find: Rv,
        type: this.type
      })
    ];
  }
}), Fv = /^```([a-z]+)?[\s\n]$/, zv = /^~~~([a-z]+)?[\s\n]$/, Hv = ye.create({
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
      Q(this.options.HTMLAttributes, e),
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
      Bs({
        find: Fv,
        type: this.type,
        getAttributes: (n) => ({
          language: n[1]
        })
      }),
      Bs({
        find: zv,
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
        key: new ve("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (n, e) => {
            if (!e.clipboardData || this.editor.isActive(this.type.name))
              return !1;
            const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), i = r ? JSON.parse(r) : void 0, o = i == null ? void 0 : i.mode;
            if (!t || !o)
              return !1;
            const { tr: s } = n.state;
            return n.state.selection.from === n.state.doc.nodeSize - (1 + n.state.selection.$to.depth * 2) ? s.insert(n.state.selection.from - 1, this.type.create({ language: o })) : s.replaceSelectionWith(this.type.create({ language: o })), s.setSelection(F.near(s.doc.resolve(Math.max(0, s.selection.from - 2)))), s.insertText(t.replace(/\r\n?/g, `
`)), s.setMeta("paste", !0), n.dispatch(s), !0;
          }
        }
      })
    ];
  }
}), Vv = ye.create({
  name: "doc",
  topNode: !0,
  content: "block+"
});
class te extends V {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return te.valid(r) ? new te(r) : V.near(r);
  }
  content() {
    return E.empty;
  }
  eq(e) {
    return e instanceof te && e.head == this.head;
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
    return new te(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new Ml(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.isTextblock || !$v(e) || !_v(e))
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
        if (!r && te.valid(e))
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
          if (te.valid(a))
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
          if (te.valid(l))
            return l;
        }
        return null;
      }
  }
}
te.prototype.visible = !1;
te.findFrom = te.findGapCursorFrom;
V.jsonID("gapcursor", te);
class Ml {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Ml(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return te.valid(t) ? new te(t) : V.near(t);
  }
}
function $v(n) {
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
function _v(n) {
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
function jv() {
  return new le({
    props: {
      decorations: Uv,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && te.valid(t) ? new te(t) : null;
      },
      handleClick: qv,
      handleKeyDown: Wv,
      handleDOMEvents: { beforeinput: Kv }
    }
  });
}
const Wv = Vu({
  ArrowLeft: si("horiz", -1),
  ArrowRight: si("horiz", 1),
  ArrowUp: si("vert", -1),
  ArrowDown: si("vert", 1)
});
function si(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, o) {
    let s = r.selection, l = e > 0 ? s.$to : s.$from, a = s.empty;
    if (s instanceof F) {
      if (!o.endOfTextblock(t) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = te.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new te(c))), !0) : !1;
  };
}
function qv(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!te.valid(r))
    return !1;
  let i = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && B.isSelectable(n.state.doc.nodeAt(i.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new te(r))), !0);
}
function Kv(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof te))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = x.empty;
  for (let s = r.length - 1; s >= 0; s--)
    i = x.from(r[s].createAndFill(null, i));
  let o = n.state.tr.replace(t.pos, t.pos, new E(i, 0, 0));
  return o.setSelection(F.near(o.doc.resolve(t.pos + 1))), n.dispatch(o), !1;
}
function Uv(n) {
  if (!(n.selection instanceof te))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", re.create(n.doc, [Ee.widget(n.selection.head, e, { key: "gapcursor" })]);
}
const Jv = ee.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      jv()
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
      allowGapCursor: (e = H(O(n, "allowGapCursor", t))) !== null && e !== void 0 ? e : null
    };
  }
}), Gv = ye.create({
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
    return ["br", Q(this.options.HTMLAttributes, n)];
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
}), Yv = ye.create({
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
    return [`h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`, Q(this.options.HTMLAttributes, e), 0];
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
    return this.options.levels.map((n) => Bs({
      find: new RegExp(`^(#{1,${n}})\\s$`),
      type: this.type,
      getAttributes: {
        level: n
      }
    }));
  }
});
var Pi = 200, ue = function() {
};
ue.prototype.append = function(e) {
  return e.length ? (e = ue.from(e), !this.length && e || e.length < Pi && this.leafAppend(e) || this.length < Pi && e.leafPrepend(this) || this.appendInner(e)) : this;
};
ue.prototype.prepend = function(e) {
  return e.length ? ue.from(e).append(this) : this;
};
ue.prototype.appendInner = function(e) {
  return new Qv(this, e);
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
  return e instanceof ue ? e : e && e.length ? new Pd(e) : ue.empty;
};
var Pd = /* @__PURE__ */ function(n) {
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
    if (this.length + i.length <= Pi)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= Pi)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
}(ue);
ue.empty = new Pd([]);
var Qv = /* @__PURE__ */ function(n) {
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
const Xv = 500;
class Xe {
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
        u.push(new tt(d.map));
        let h = d.step.map(i.slice(o)), p;
        h && s.maybeStep(h).doc && (p = s.mapping.maps[s.mapping.maps.length - 1], c.push(new tt(p, void 0, void 0, c.length + u.length))), o--, p && i.appendMap(p, o);
      } else
        s.maybeStep(d.step);
      if (d.selection)
        return l = i ? d.selection.map(i.slice(o)) : d.selection, a = new Xe(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: s, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let o = [], s = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new tt(e.mapping.maps[u], d, t), h;
      (h = a && a.merge(f)) && (f = h, u ? o.pop() : l = l.slice(0, l.length - 1)), o.push(f), t && (s++, t = void 0), i || (a = f);
    }
    let c = s - r.depth;
    return c > e1 && (l = Zv(l, c), s -= c), new Xe(l.append(o), s);
  }
  remapping(e, t) {
    let r = new Fn();
    return this.items.forEach((i, o) => {
      let s = i.mirrorOffset != null && o - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, s);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new Xe(this.items.append(e.map((t) => new tt(t))), this.eventCount);
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
        let m = e.steps[h].invert(e.docs[h]), g = f.selection && f.selection.map(o.slice(a + 1, h));
        g && l++, r.push(new tt(p, m, g));
      } else
        r.push(new tt(p));
    }, i);
    let c = [];
    for (let f = t; f < s; f++)
      c.push(new tt(o.maps[f]));
    let u = this.items.slice(0, i).append(c).append(r), d = new Xe(u, l);
    return d.emptyItemCount() > Xv && (d = d.compress(this.items.length - r.length)), d;
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
          let d = new tt(c.invert(), a, u), f, h = i.length - 1;
          (f = i.length && i[h].merge(d)) ? i[h] = f : i.push(d);
        }
      } else
        s.map && r--;
    }, this.items.length, 0), new Xe(ue.from(i.reverse()), o);
  }
}
Xe.empty = new Xe(ue.empty, 0);
function Zv(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class tt {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new tt(t.getMap().invert(), t, this.selection);
    }
  }
}
class It {
  constructor(e, t, r, i, o) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = o;
  }
}
const e1 = 20;
function t1(n, e, t, r) {
  let i = t.getMeta(mn), o;
  if (i)
    return i.historyState;
  t.getMeta(i1) && (n = new It(n.done, n.undone, null, 0, -1));
  let s = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (s && s.getMeta(mn))
    return s.getMeta(mn).redo ? new It(n.done.addTransform(t, void 0, r, gi(e)), n.undone, hc(t.mapping.maps[t.steps.length - 1]), n.prevTime, n.prevComposition) : new It(n.done, n.undone.addTransform(t, void 0, r, gi(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(s && s.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !s && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !n1(t, n.prevRanges)), c = s ? ss(n.prevRanges, t.mapping) : hc(t.mapping.maps[t.steps.length - 1]);
    return new It(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, gi(e)), Xe.empty, c, t.time, l ?? n.prevComposition);
  } else
    return (o = t.getMeta("rebased")) ? new It(n.done.rebased(t, o), n.undone.rebased(t, o), ss(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new It(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), ss(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function n1(n, e) {
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
function hc(n) {
  let e = [];
  return n.forEach((t, r, i, o) => e.push(i, o)), e;
}
function ss(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), o = e.map(n[r + 1], -1);
    i <= o && t.push(i, o);
  }
  return t;
}
function r1(n, e, t) {
  let r = gi(e), i = mn.get(e).spec.config, o = (t ? n.undone : n.done).popEvent(e, r);
  if (!o)
    return null;
  let s = o.selection.resolve(o.transform.doc), l = (t ? n.done : n.undone).addTransform(o.transform, e.selection.getBookmark(), i, r), a = new It(t ? l : o.remaining, t ? o.remaining : l, null, 0, -1);
  return o.transform.setSelection(s).setMeta(mn, { redo: t, historyState: a });
}
let ls = !1, pc = null;
function gi(n) {
  let e = n.plugins;
  if (pc != e) {
    ls = !1, pc = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        ls = !0;
        break;
      }
  }
  return ls;
}
const mn = new ve("history"), i1 = new ve("closeHistory");
function o1(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new le({
    key: mn,
    state: {
      init() {
        return new It(Xe.empty, Xe.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return t1(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? zd : r == "historyRedo" ? Hd : null;
          return i ? (t.preventDefault(), i(e.state, e.dispatch)) : !1;
        }
      }
    }
  });
}
function Fd(n, e) {
  return (t, r) => {
    let i = mn.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let o = r1(i, t, n);
      o && r(e ? o.scrollIntoView() : o);
    }
    return !0;
  };
}
const zd = Fd(!1, !0), Hd = Fd(!0, !0), s1 = ee.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => zd(n, e),
      redo: () => ({ state: n, dispatch: e }) => Hd(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [
      o1(this.options)
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
}), l1 = ye.create({
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
    return ["hr", Q(this.options.HTMLAttributes, n)];
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
              l.nodeAfter.isTextblock ? i.setSelection(F.create(i.doc, l.pos + 1)) : l.nodeAfter.isBlock ? i.setSelection(B.create(i.doc, l.pos)) : i.setSelection(F.create(i.doc, l.pos));
            else {
              const c = (s = l.parent.type.contentMatch.defaultType) === null || s === void 0 ? void 0 : s.create();
              c && (i.insert(a, c), i.setSelection(F.create(i.doc, a + 1)));
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
      Hy({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
}), a1 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, c1 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, u1 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, d1 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, f1 = De.create({
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
    return ["em", Q(this.options.HTMLAttributes, n), 0];
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
      vn({
        find: a1,
        type: this.type
      }),
      vn({
        find: u1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Kt({
        find: c1,
        type: this.type
      }),
      Kt({
        find: d1,
        type: this.type
      })
    ];
  }
}), h1 = ye.create({
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
    return ["li", Q(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), p1 = ye.create({
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
    return ["li", Q(this.options.HTMLAttributes, n), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), mc = De.create({
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
    return ["span", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state: n, commands: e }) => {
        const t = Eo(n, this.type);
        return Object.entries(t).some(([, i]) => !!i) ? !0 : e.unsetMark(this.name);
      }
    };
  }
}), gc = /^(\d+)\.\s$/, m1 = ye.create({
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
    return e === 1 ? ["ol", Q(this.options.HTMLAttributes, t), 0] : ["ol", Q(this.options.HTMLAttributes, n), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(p1.name, this.editor.getAttributes(mc.name)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let n = Li({
      find: gc,
      type: this.type,
      getAttributes: (e) => ({ start: +e[1] }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1]
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = Li({
      find: gc,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (e) => ({ start: +e[1], ...this.editor.getAttributes(mc.name) }),
      joinPredicate: (e, t) => t.childCount + t.attrs.start === +e[1],
      editor: this.editor
    })), [
      n
    ];
  }
}), g1 = ye.create({
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
    return ["p", Q(this.options.HTMLAttributes, n), 0];
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
}), y1 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, b1 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, v1 = De.create({
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
    return ["s", Q(this.options.HTMLAttributes, n), 0];
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
      vn({
        find: y1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Kt({
        find: b1,
        type: this.type
      })
    ];
  }
}), k1 = ye.create({
  name: "text",
  group: "inline"
}), w1 = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4vianca6w0s2x0a2z0ure5ba0by2idu3namex3narepublic11d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2ntley5rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0cast4mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dabur3d1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3nlop4pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2o0dyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0ardian6cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6logistics9properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3ncaster6d0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2psy3ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rckmsd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2tura4vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9dnavy5lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0america6xi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0stone5umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0a1b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp2w2ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2olterskluwer11odside6rk0s2ld3w2s1tc1f3xbox3erox4finity6ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", x1 = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", Xn = (n, e) => {
  for (const t in e)
    n[t] = e[t];
  return n;
}, $s = "numeric", _s = "ascii", js = "alpha", yi = "asciinumeric", li = "alphanumeric", Ws = "domain", Vd = "emoji", C1 = "scheme", T1 = "slashscheme", yc = "whitespace";
function S1(n, e) {
  return n in e || (e[n] = []), e[n];
}
function an(n, e, t) {
  e[$s] && (e[yi] = !0, e[li] = !0), e[_s] && (e[yi] = !0, e[js] = !0), e[yi] && (e[li] = !0), e[js] && (e[li] = !0), e[li] && (e[Ws] = !0), e[Vd] && (e[Ws] = !0);
  for (const r in e) {
    const i = S1(r, t);
    i.indexOf(n) < 0 && i.push(n);
  }
}
function M1(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function Me(n) {
  n === void 0 && (n = null), this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
Me.groups = {};
Me.prototype = {
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
    r = r || Me.groups;
    let i;
    return e && e.j ? i = e : (i = new Me(e), t && r && an(e, t, r)), this.jr.push([n, i]), i;
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
    r = r || Me.groups;
    const i = this;
    if (e && e.j)
      return i.j[n] = e, e;
    const o = e;
    let s, l = i.go(n);
    if (l ? (s = new Me(), Xn(s.j, l.j), s.jr.push.apply(s.jr, l.jr), s.jd = l.jd, s.t = l.t) : s = new Me(), o) {
      if (r)
        if (s.t && typeof s.t == "string") {
          const a = Xn(M1(s.t, r), t);
          an(o, a, r);
        } else
          t && an(o, t, r);
      s.t = o;
    }
    return i.j[n] = s, s;
  }
};
const $ = (n, e, t, r, i) => n.ta(e, t, r, i), Ve = (n, e, t, r, i) => n.tr(e, t, r, i), bc = (n, e, t, r, i) => n.ts(e, t, r, i), T = (n, e, t, r, i) => n.tt(e, t, r, i), wt = "WORD", qs = "UWORD", Br = "LOCALHOST", Ks = "TLD", Us = "UTLD", bi = "SCHEME", In = "SLASH_SCHEME", El = "NUM", $d = "WS", Al = "NL", yr = "OPENBRACE", br = "CLOSEBRACE", Fi = "OPENBRACKET", zi = "CLOSEBRACKET", Hi = "OPENPAREN", Vi = "CLOSEPAREN", $i = "OPENANGLEBRACKET", _i = "CLOSEANGLEBRACKET", ji = "FULLWIDTHLEFTPAREN", Wi = "FULLWIDTHRIGHTPAREN", qi = "LEFTCORNERBRACKET", Ki = "RIGHTCORNERBRACKET", Ui = "LEFTWHITECORNERBRACKET", Ji = "RIGHTWHITECORNERBRACKET", Gi = "FULLWIDTHLESSTHAN", Yi = "FULLWIDTHGREATERTHAN", Qi = "AMPERSAND", Xi = "APOSTROPHE", Zi = "ASTERISK", Rt = "AT", eo = "BACKSLASH", to = "BACKTICK", no = "CARET", Ft = "COLON", Ol = "COMMA", ro = "DOLLAR", nt = "DOT", io = "EQUALS", Nl = "EXCLAMATION", rt = "HYPHEN", oo = "PERCENT", so = "PIPE", lo = "PLUS", ao = "POUND", co = "QUERY", Dl = "QUOTE", Bl = "SEMI", it = "SLASH", vr = "TILDE", uo = "UNDERSCORE", _d = "EMOJI", fo = "SYM";
var jd = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WORD: wt,
  UWORD: qs,
  LOCALHOST: Br,
  TLD: Ks,
  UTLD: Us,
  SCHEME: bi,
  SLASH_SCHEME: In,
  NUM: El,
  WS: $d,
  NL: Al,
  OPENBRACE: yr,
  CLOSEBRACE: br,
  OPENBRACKET: Fi,
  CLOSEBRACKET: zi,
  OPENPAREN: Hi,
  CLOSEPAREN: Vi,
  OPENANGLEBRACKET: $i,
  CLOSEANGLEBRACKET: _i,
  FULLWIDTHLEFTPAREN: ji,
  FULLWIDTHRIGHTPAREN: Wi,
  LEFTCORNERBRACKET: qi,
  RIGHTCORNERBRACKET: Ki,
  LEFTWHITECORNERBRACKET: Ui,
  RIGHTWHITECORNERBRACKET: Ji,
  FULLWIDTHLESSTHAN: Gi,
  FULLWIDTHGREATERTHAN: Yi,
  AMPERSAND: Qi,
  APOSTROPHE: Xi,
  ASTERISK: Zi,
  AT: Rt,
  BACKSLASH: eo,
  BACKTICK: to,
  CARET: no,
  COLON: Ft,
  COMMA: Ol,
  DOLLAR: ro,
  DOT: nt,
  EQUALS: io,
  EXCLAMATION: Nl,
  HYPHEN: rt,
  PERCENT: oo,
  PIPE: so,
  PLUS: lo,
  POUND: ao,
  QUERY: co,
  QUOTE: Dl,
  SEMI: Bl,
  SLASH: it,
  TILDE: vr,
  UNDERSCORE: uo,
  EMOJI: _d,
  SYM: fo
});
const Nn = /[a-z]/, as = /\p{L}/u, cs = /\p{Emoji}/u, us = /\d/, vc = /\s/, kc = `
`, E1 = "️", A1 = "‍";
let ai = null, ci = null;
function O1(n) {
  n === void 0 && (n = []);
  const e = {};
  Me.groups = e;
  const t = new Me();
  ai == null && (ai = wc(w1)), ci == null && (ci = wc(x1)), T(t, "'", Xi), T(t, "{", yr), T(t, "}", br), T(t, "[", Fi), T(t, "]", zi), T(t, "(", Hi), T(t, ")", Vi), T(t, "<", $i), T(t, ">", _i), T(t, "（", ji), T(t, "）", Wi), T(t, "「", qi), T(t, "」", Ki), T(t, "『", Ui), T(t, "』", Ji), T(t, "＜", Gi), T(t, "＞", Yi), T(t, "&", Qi), T(t, "*", Zi), T(t, "@", Rt), T(t, "`", to), T(t, "^", no), T(t, ":", Ft), T(t, ",", Ol), T(t, "$", ro), T(t, ".", nt), T(t, "=", io), T(t, "!", Nl), T(t, "-", rt), T(t, "%", oo), T(t, "|", so), T(t, "+", lo), T(t, "#", ao), T(t, "?", co), T(t, '"', Dl), T(t, "/", it), T(t, ";", Bl), T(t, "~", vr), T(t, "_", uo), T(t, "\\", eo);
  const r = Ve(t, us, El, {
    [$s]: !0
  });
  Ve(r, us, r);
  const i = Ve(t, Nn, wt, {
    [_s]: !0
  });
  Ve(i, Nn, i);
  const o = Ve(t, as, qs, {
    [js]: !0
  });
  Ve(o, Nn), Ve(o, as, o);
  const s = Ve(t, vc, $d, {
    [yc]: !0
  });
  T(t, kc, Al, {
    [yc]: !0
  }), T(s, kc), Ve(s, vc, s);
  const l = Ve(t, cs, _d, {
    [Vd]: !0
  });
  Ve(l, cs, l), T(l, E1, l);
  const a = T(l, A1);
  Ve(a, cs, l);
  const c = [[Nn, i]], u = [[Nn, null], [as, o]];
  for (let d = 0; d < ai.length; d++)
    Dt(t, ai[d], Ks, wt, c);
  for (let d = 0; d < ci.length; d++)
    Dt(t, ci[d], Us, qs, u);
  an(Ks, {
    tld: !0,
    ascii: !0
  }, e), an(Us, {
    utld: !0,
    alpha: !0
  }, e), Dt(t, "file", bi, wt, c), Dt(t, "mailto", bi, wt, c), Dt(t, "http", In, wt, c), Dt(t, "https", In, wt, c), Dt(t, "ftp", In, wt, c), Dt(t, "ftps", In, wt, c), an(bi, {
    scheme: !0,
    ascii: !0
  }, e), an(In, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((d, f) => d[0] > f[0] ? 1 : -1);
  for (let d = 0; d < n.length; d++) {
    const f = n[d][0], p = n[d][1] ? {
      [C1]: !0
    } : {
      [T1]: !0
    };
    f.indexOf("-") >= 0 ? p[Ws] = !0 : Nn.test(f) ? us.test(f) ? p[yi] = !0 : p[_s] = !0 : p[$s] = !0, bc(t, f, f, p);
  }
  return bc(t, "localhost", Br, {
    ascii: !0
  }), t.jd = new Me(fo), {
    start: t,
    tokens: Xn({
      groups: e
    }, jd)
  };
}
function N1(n, e) {
  const t = D1(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, i = [];
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
function D1(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let i = n.charCodeAt(r), o, s = i < 55296 || i > 56319 || r + 1 === t || (o = n.charCodeAt(r + 1)) < 56320 || o > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(s), r += s.length;
  }
  return e;
}
function Dt(n, e, t, r, i) {
  let o;
  const s = e.length;
  for (let l = 0; l < s - 1; l++) {
    const a = e[l];
    n.j[a] ? o = n.j[a] : (o = new Me(r), o.jr = i.slice(), n.j[a] = o), n = o;
  }
  return o = new Me(t), o.jr = i.slice(), n.j[e[s - 1]] = o, o;
}
function wc(n) {
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
const Lr = {
  defaultProtocol: "http",
  events: null,
  format: xc,
  formatHref: xc,
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
function Ll(n, e) {
  e === void 0 && (e = null);
  let t = Xn({}, Lr);
  n && (t = Xn(t, n instanceof Ll ? n.o : n));
  const r = t.ignoreTags, i = [];
  for (let o = 0; o < r.length; o++)
    i.push(r[o].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
Ll.prototype = {
  o: Lr,
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
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : Lr[n], typeof i == "function" && r && (i = i(e, t))) : typeof i == "function" && r && (i = i(e, t.t, t)), i);
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
function xc(n) {
  return n;
}
function Wd(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
Wd.prototype = {
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
    return n === void 0 && (n = Lr.defaultProtocol), {
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
    return s.href = r, l && (s.class = l), a && (s.target = a), c && (s.rel = c), u && Xn(s, u), {
      tagName: i,
      attributes: s,
      content: o,
      eventListeners: d
    };
  }
};
function No(n, e) {
  class t extends Wd {
    constructor(i, o) {
      super(i, o), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const Cc = No("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Tc = No("text"), B1 = No("nl"), ui = No("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n) {
    return n === void 0 && (n = Lr.defaultProtocol), this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== Br && n[1].t === Ft;
  }
}), $e = (n) => new Me(n);
function L1(n) {
  let {
    groups: e
  } = n;
  const t = e.domain.concat([Qi, Zi, Rt, eo, to, no, ro, io, rt, El, oo, so, lo, ao, it, fo, vr, uo]), r = [Xi, Ft, Ol, nt, Nl, co, Dl, Bl, $i, _i, yr, br, zi, Fi, Hi, Vi, ji, Wi, qi, Ki, Ui, Ji, Gi, Yi], i = [Qi, Xi, Zi, eo, to, no, ro, io, rt, yr, br, oo, so, lo, ao, co, it, fo, vr, uo], o = $e(), s = T(o, vr);
  $(s, i, s), $(s, e.domain, s);
  const l = $e(), a = $e(), c = $e();
  $(o, e.domain, l), $(o, e.scheme, a), $(o, e.slashscheme, c), $(l, i, s), $(l, e.domain, l);
  const u = T(l, Rt);
  T(s, Rt, u), T(a, Rt, u), T(c, Rt, u);
  const d = T(s, nt);
  $(d, i, s), $(d, e.domain, s);
  const f = $e();
  $(u, e.domain, f), $(f, e.domain, f);
  const h = T(f, nt);
  $(h, e.domain, f);
  const p = $e(Cc);
  $(h, e.tld, p), $(h, e.utld, p), T(u, Br, p);
  const m = T(f, rt);
  $(m, e.domain, f), $(p, e.domain, f), T(p, nt, h), T(p, rt, m);
  const g = T(p, Ft);
  $(g, e.numeric, Cc);
  const b = T(l, rt), w = T(l, nt);
  $(b, e.domain, l), $(w, i, s), $(w, e.domain, l);
  const C = $e(ui);
  $(w, e.tld, C), $(w, e.utld, C), $(C, e.domain, l), $(C, i, s), T(C, nt, w), T(C, rt, b), T(C, Rt, u);
  const y = T(C, Ft), M = $e(ui);
  $(y, e.numeric, M);
  const v = $e(ui), A = $e();
  $(v, t, v), $(v, r, A), $(A, t, v), $(A, r, A), T(C, it, v), T(M, it, v);
  const R = T(a, Ft), S = T(c, Ft), I = T(S, it), _ = T(I, it);
  $(a, e.domain, l), T(a, nt, w), T(a, rt, b), $(c, e.domain, l), T(c, nt, w), T(c, rt, b), $(R, e.domain, v), T(R, it, v), $(_, e.domain, v), $(_, t, v), T(_, it, v);
  const W = [
    [yr, br],
    // {}
    [Fi, zi],
    // []
    [Hi, Vi],
    // ()
    [$i, _i],
    // <>
    [ji, Wi],
    // （）
    [qi, Ki],
    // 「」
    [Ui, Ji],
    // 『』
    [Gi, Yi]
    // ＜＞
  ];
  for (let q = 0; q < W.length; q++) {
    const [ae, X] = W[q], Y = T(v, ae);
    T(A, ae, Y), T(Y, X, v);
    const G = $e(ui);
    $(Y, t, G);
    const K = $e();
    $(Y, r), $(G, t, G), $(G, r, K), $(K, t, G), $(K, r, K), T(G, X, v), T(K, X, v);
  }
  return T(o, Br, C), T(o, Al, B1), {
    start: o,
    tokens: jd
  };
}
function I1(n, e, t) {
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
      s.length > 0 && (o.push(ds(Tc, e, s)), s = []), i -= f, u -= f;
      const h = d.t, p = t.slice(i - u, i);
      o.push(ds(h, e, p));
    }
  }
  return s.length > 0 && o.push(ds(Tc, e, s)), o;
}
function ds(n, e, t) {
  const r = t[0].s, i = t[t.length - 1].e, o = e.slice(r, i);
  return new n(o, t);
}
const R1 = typeof console < "u" && console && console.warn || (() => {
}), P1 = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", Z = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function F1() {
  Me.groups = {}, Z.scanner = null, Z.parser = null, Z.tokenQueue = [], Z.pluginQueue = [], Z.customSchemes = [], Z.initialized = !1;
}
function Sc(n, e) {
  if (e === void 0 && (e = !1), Z.initialized && R1(`linkifyjs: already initialized - will not register custom scheme "${n}" ${P1}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  Z.customSchemes.push([n, e]);
}
function z1() {
  Z.scanner = O1(Z.customSchemes);
  for (let n = 0; n < Z.tokenQueue.length; n++)
    Z.tokenQueue[n][1]({
      scanner: Z.scanner
    });
  Z.parser = L1(Z.scanner.tokens);
  for (let n = 0; n < Z.pluginQueue.length; n++)
    Z.pluginQueue[n][1]({
      scanner: Z.scanner,
      parser: Z.parser
    });
  Z.initialized = !0;
}
function qd(n) {
  return Z.initialized || z1(), I1(Z.parser.start, n, N1(Z.scanner.start, n));
}
function Kd(n, e, t) {
  if (e === void 0 && (e = null), t === void 0 && (t = null), e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new Ll(t), i = qd(n), o = [];
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    l.isLink && (!e || l.t === e) && r.check(l) && o.push(l.toFormattedObject(r));
  }
  return o;
}
function H1(n) {
  return n.length === 1 ? n[0].isLink : n.length === 3 && n[1].isLink ? ["()", "[]"].includes(n[0].value + n[2].value) : !1;
}
function V1(n) {
  return new le({
    key: new ve("autolink"),
    appendTransaction: (e, t, r) => {
      const i = e.some((c) => c.docChanged) && !t.doc.eq(r.doc), o = e.some((c) => c.getMeta("preventAutolink"));
      if (!i || o)
        return;
      const { tr: s } = r, l = Xg(t.doc, [...e]);
      if (ly(l).forEach(({ newRange: c }) => {
        const u = ey(r.doc, c, (h) => h.isTextblock);
        let d, f;
        if (u.length > 1 ? (d = u[0], f = r.doc.textBetween(d.pos, d.pos + d.node.nodeSize, void 0, " ")) : u.length && r.doc.textBetween(c.from, c.to, " ", " ").endsWith(" ") && (d = u[0], f = r.doc.textBetween(d.pos, c.to, void 0, " ")), d && f) {
          const h = f.split(" ").filter((b) => b !== "");
          if (h.length <= 0)
            return !1;
          const p = h[h.length - 1], m = d.pos + f.lastIndexOf(p);
          if (!p)
            return !1;
          const g = qd(p).map((b) => b.toObject());
          if (!H1(g))
            return !1;
          g.filter((b) => b.isLink).map((b) => ({
            ...b,
            from: m + b.start + 1,
            to: m + b.end + 1
          })).filter((b) => r.schema.marks.code ? !r.doc.rangeHasMark(b.from, b.to, r.schema.marks.code) : !0).filter((b) => n.validate ? n.validate(b.value) : !0).forEach((b) => {
            gl(b.from, b.to, r.doc).some((w) => w.mark.type === n.type) || s.addMark(b.from, b.to, n.type.create({
              href: b.href
            }));
          });
        }
      }), !!s.steps.length)
        return s;
    }
  });
}
function $1(n) {
  return new le({
    key: new ve("handleClickLink"),
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
        const a = nd(e.state, n.type.name), c = r.target, u = (i = c == null ? void 0 : c.href) !== null && i !== void 0 ? i : a.href, d = (o = c == null ? void 0 : c.target) !== null && o !== void 0 ? o : a.target;
        return c && u ? (window.open(u, d), !0) : !1;
      }
    }
  });
}
function _1(n) {
  return new le({
    key: new ve("handlePasteLink"),
    props: {
      handlePaste: (e, t, r) => {
        const { state: i } = e, { selection: o } = i, { empty: s } = o;
        if (s)
          return !1;
        let l = "";
        r.content.forEach((c) => {
          l += c.textContent;
        });
        const a = Kd(l).find((c) => c.isLink && c.value === l);
        return !l || !a ? !1 : (n.editor.commands.setMark(n.type, {
          href: a.href
        }), !0);
      }
    }
  });
}
const j1 = De.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  onCreate() {
    this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        Sc(n);
        return;
      }
      Sc(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    F1();
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
    return !((e = n.href) === null || e === void 0) && e.startsWith("javascript:") ? ["a", Q(this.options.HTMLAttributes, { ...n, href: "" }), 0] : ["a", Q(this.options.HTMLAttributes, n), 0];
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
      Kt({
        find: (n) => {
          const e = [];
          if (n) {
            const t = Kd(n).filter((r) => r.isLink);
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
    return this.options.autolink && n.push(V1({
      type: this.type,
      validate: this.options.validate
    })), this.options.openOnClick && n.push($1({
      type: this.type,
      whenNotEditable: this.options.openOnClick === "whenNotEditable"
    })), this.options.linkOnPaste && n.push(_1({
      editor: this.editor,
      type: this.type
    })), n;
  }
}), W1 = De.create({
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
    return ["sub", Q(this.options.HTMLAttributes, n), 0];
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
}), q1 = De.create({
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
    return ["sup", Q(this.options.HTMLAttributes, n), 0];
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
}), K1 = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/, U1 = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g, J1 = De.create({
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
    return ["mark", Q(this.options.HTMLAttributes, n), 0];
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
      vn({
        find: K1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      Kt({
        find: U1,
        type: this.type
      })
    ];
  }
}), G1 = (n) => ne({
  find: /--$/,
  replace: n ?? "—"
}), Y1 = (n) => ne({
  find: /\.\.\.$/,
  replace: n ?? "…"
}), Q1 = (n) => ne({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/,
  replace: n ?? "“"
}), X1 = (n) => ne({
  find: /"$/,
  replace: n ?? "”"
}), Z1 = (n) => ne({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/,
  replace: n ?? "‘"
}), ek = (n) => ne({
  find: /'$/,
  replace: n ?? "’"
}), tk = (n) => ne({
  find: /<-$/,
  replace: n ?? "←"
}), nk = (n) => ne({
  find: /->$/,
  replace: n ?? "→"
}), rk = (n) => ne({
  find: /\(c\)$/,
  replace: n ?? "©"
}), ik = (n) => ne({
  find: /\(tm\)$/,
  replace: n ?? "™"
}), ok = (n) => ne({
  find: /\(sm\)$/,
  replace: n ?? "℠"
}), sk = (n) => ne({
  find: /\(r\)$/,
  replace: n ?? "®"
}), lk = (n) => ne({
  find: /(?:^|\s)(1\/2)\s$/,
  replace: n ?? "½"
}), ak = (n) => ne({
  find: /\+\/-$/,
  replace: n ?? "±"
}), ck = (n) => ne({
  find: /!=$/,
  replace: n ?? "≠"
}), uk = (n) => ne({
  find: /<<$/,
  replace: n ?? "«"
}), dk = (n) => ne({
  find: />>$/,
  replace: n ?? "»"
}), fk = (n) => ne({
  find: /\d+\s?([*x])\s?\d+$/,
  replace: n ?? "×"
}), hk = (n) => ne({
  find: /\^2$/,
  replace: n ?? "²"
}), pk = (n) => ne({
  find: /\^3$/,
  replace: n ?? "³"
}), mk = (n) => ne({
  find: /(?:^|\s)(1\/4)\s$/,
  replace: n ?? "¼"
}), gk = (n) => ne({
  find: /(?:^|\s)(3\/4)\s$/,
  replace: n ?? "¾"
}), yk = ee.create({
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
    return this.options.emDash !== !1 && n.push(G1(this.options.emDash)), this.options.ellipsis !== !1 && n.push(Y1(this.options.ellipsis)), this.options.openDoubleQuote !== !1 && n.push(Q1(this.options.openDoubleQuote)), this.options.closeDoubleQuote !== !1 && n.push(X1(this.options.closeDoubleQuote)), this.options.openSingleQuote !== !1 && n.push(Z1(this.options.openSingleQuote)), this.options.closeSingleQuote !== !1 && n.push(ek(this.options.closeSingleQuote)), this.options.leftArrow !== !1 && n.push(tk(this.options.leftArrow)), this.options.rightArrow !== !1 && n.push(nk(this.options.rightArrow)), this.options.copyright !== !1 && n.push(rk(this.options.copyright)), this.options.trademark !== !1 && n.push(ik(this.options.trademark)), this.options.servicemark !== !1 && n.push(ok(this.options.servicemark)), this.options.registeredTrademark !== !1 && n.push(sk(this.options.registeredTrademark)), this.options.oneHalf !== !1 && n.push(lk(this.options.oneHalf)), this.options.plusMinus !== !1 && n.push(ak(this.options.plusMinus)), this.options.notEqual !== !1 && n.push(ck(this.options.notEqual)), this.options.laquo !== !1 && n.push(uk(this.options.laquo)), this.options.raquo !== !1 && n.push(dk(this.options.raquo)), this.options.multiplication !== !1 && n.push(fk(this.options.multiplication)), this.options.superscriptTwo !== !1 && n.push(hk(this.options.superscriptTwo)), this.options.superscriptThree !== !1 && n.push(pk(this.options.superscriptThree)), this.options.oneQuarter !== !1 && n.push(mk(this.options.oneQuarter)), this.options.threeQuarters !== !1 && n.push(gk(this.options.threeQuarters)), n;
  }
}), bk = ye.create({
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
      setYoutubeVideo: (n) => ({ commands: e }) => Vs(n.src) ? e.insertContent({
        type: this.name,
        attrs: n
      }) : !1
    };
  },
  addPasteRules() {
    return this.options.addPasteHandler ? [
      $y({
        find: Tv,
        type: this.type,
        getAttributes: (n) => ({ src: n.input })
      })
    ] : [];
  },
  renderHTML({ HTMLAttributes: n }) {
    const e = Sv({
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
    }), t = n["data-block-width"];
    return n["data-block-width"] = null, n.src = e, [
      "figure",
      {
        "data-youtube-video": "",
        "data-block-width": t,
        class: "vueberg-youtube-figure"
      },
      [
        "div",
        { class: "vueberg-youtube-figure-container" },
        [
          "iframe",
          Q(
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
function Mc({ types: n, node: e }) {
  return Array.isArray(n) && n.includes(e.type) || e.type === n;
}
const vk = ee.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: "paragraph",
      notAfter: ["paragraph"]
    };
  },
  addProseMirrorPlugins() {
    const n = new ve(this.name), e = Object.entries(this.editor.schema.nodes).map(([, t]) => t).filter((t) => this.options.notAfter.includes(t.name));
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
            return !Mc({ node: i, types: e });
          },
          apply: (t, r) => {
            if (!t.docChanged)
              return r;
            const i = t.doc.lastChild;
            return !Mc({ node: i, types: e });
          }
        }
      })
    ];
  }
}), kk = ee.create({
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
function wk(n) {
  var e;
  const { char: t, allowSpaces: r, allowedPrefixes: i, startOfLine: o, $position: s } = n, l = Vy(t), a = new RegExp(`\\s${l}$`), c = o ? "^" : "", u = r ? new RegExp(`${c}${l}.*?(?=\\s${l}|$)`, "gm") : new RegExp(`${c}(?:^)?${l}[^\\s${l}]*`, "gm"), d = ((e = s.nodeBefore) === null || e === void 0 ? void 0 : e.isText) && s.nodeBefore.text;
  if (!d)
    return null;
  const f = s.pos - d.length, h = Array.from(d.matchAll(u)).pop();
  if (!h || h.input === void 0 || h.index === void 0)
    return null;
  const p = h.input.slice(Math.max(0, h.index - 1), h.index), m = new RegExp(`^[${i == null ? void 0 : i.join("")}\0]?$`).test(p);
  if (i !== null && !m)
    return null;
  const g = f + h.index;
  let b = g + h[0].length;
  return r && a.test(d.slice(b - 1, b + 1)) && (h[0] += " ", b += 1), g < s.pos && b >= s.pos ? {
    range: {
      from: g,
      to: b
    },
    query: h[0].slice(t.length),
    text: h[0]
  } : null;
}
const xk = new ve("suggestion");
function Ck({ pluginKey: n = xk, editor: e, char: t = "@", allowSpaces: r = !1, allowedPrefixes: i = [" "], startOfLine: o = !1, decorationTag: s = "span", decorationClass: l = "suggestion", command: a = () => null, items: c = () => [], render: u = () => ({}), allow: d = () => !0, findSuggestionMatch: f = wk }) {
  let h;
  const p = u == null ? void 0 : u(), m = new le({
    key: n,
    view() {
      return {
        update: async (g, b) => {
          var w, C, y, M, v, A, R;
          const S = (w = this.key) === null || w === void 0 ? void 0 : w.getState(b), I = (C = this.key) === null || C === void 0 ? void 0 : C.getState(g.state), _ = S.active && I.active && S.range.from !== I.range.from, W = !S.active && I.active, q = S.active && !I.active, ae = !W && !q && S.query !== I.query, X = W || _, Y = ae && !_, G = q || _;
          if (!X && !Y && !G)
            return;
          const K = G && !X ? S : I, Be = g.dom.querySelector(`[data-decoration-id="${K.decorationId}"]`);
          h = {
            editor: e,
            range: K.range,
            query: K.query,
            text: K.text,
            items: [],
            command: (me) => a({
              editor: e,
              range: K.range,
              props: me
            }),
            decorationNode: Be,
            // virtual node for popper.js or tippy.js
            // this can be used for building popups without a DOM node
            clientRect: Be ? () => {
              var me;
              const { decorationId: mt } = (me = this.key) === null || me === void 0 ? void 0 : me.getState(e.state), Se = g.dom.querySelector(`[data-decoration-id="${mt}"]`);
              return (Se == null ? void 0 : Se.getBoundingClientRect()) || null;
            } : null
          }, X && ((y = p == null ? void 0 : p.onBeforeStart) === null || y === void 0 || y.call(p, h)), Y && ((M = p == null ? void 0 : p.onBeforeUpdate) === null || M === void 0 || M.call(p, h)), (Y || X) && (h.items = await c({
            editor: e,
            query: K.query
          })), G && ((v = p == null ? void 0 : p.onExit) === null || v === void 0 || v.call(p, h)), Y && ((A = p == null ? void 0 : p.onUpdate) === null || A === void 0 || A.call(p, h)), X && ((R = p == null ? void 0 : p.onStart) === null || R === void 0 || R.call(p, h));
        },
        destroy: () => {
          var g;
          h && ((g = p == null ? void 0 : p.onExit) === null || g === void 0 || g.call(p, h));
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
      apply(g, b, w, C) {
        const { isEditable: y } = e, { composing: M } = e.view, { selection: v } = g, { empty: A, from: R } = v, S = { ...b };
        if (S.composing = M, y && (A || e.view.composing)) {
          (R < b.range.from || R > b.range.to) && !M && !b.composing && (S.active = !1);
          const I = f({
            char: t,
            allowSpaces: r,
            allowedPrefixes: i,
            startOfLine: o,
            $position: v.$from
          }), _ = `id_${Math.floor(Math.random() * 4294967295)}`;
          I && d({ editor: e, state: C, range: I.range }) ? (S.active = !0, S.decorationId = b.decorationId ? b.decorationId : _, S.range = I.range, S.query = I.query, S.text = I.text) : S.active = !1;
        } else
          S.active = !1;
        return S.active || (S.decorationId = null, S.range = { from: 0, to: 0 }, S.query = null, S.text = null), S;
      }
    },
    props: {
      // Call the keydown hook if suggestion is active.
      handleKeyDown(g, b) {
        var w;
        const { active: C, range: y } = m.getState(g.state);
        return C && ((w = p == null ? void 0 : p.onKeyDown) === null || w === void 0 ? void 0 : w.call(p, { view: g, event: b, range: y })) || !1;
      },
      // Setup decorator on the currently active suggestion.
      decorations(g) {
        const { active: b, range: w, decorationId: C } = m.getState(g);
        return b ? re.create(g.doc, [
          Ee.inline(w.from, w.to, {
            nodeName: s,
            class: l,
            "data-decoration-id": C
          })
        ]) : null;
      }
    }
  });
  return m;
}
const Tk = ee.create({
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
      Ck({
        editor: this.editor,
        ...this.options.suggestion
      })
    ];
  }
}), Sk = {
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
}, Mk = { class: "vueberg-block-item" }, Ek = ["innerHTML"], Ak = { class: "vueberg-block-item-info" }, Ok = { class: "vueberg-block-item-info-title" }, Nk = {
  key: 0,
  class: "vueberg-block-item-info-description"
};
function Dk(n, e, t, r, i, o) {
  return D(), z("div", Mk, [
    P("div", {
      class: "vueberg-block-item-icon",
      innerHTML: t.icon
    }, null, 8, Ek),
    P("div", Ak, [
      P("div", Ok, Fe(t.title), 1),
      t.description ? (D(), z("div", Nk, Fe(t.description), 1)) : se("", !0)
    ])
  ]);
}
const Ud = /* @__PURE__ */ pt(Sk, [["render", Dk]]);
const Bk = {
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
    BlockItem: Ud
  },
  data() {
    return {
      titleLabel: this.editor.commands.getTranslation("extensions.Modal.BlocksModal.title"),
      blocks: this.editor.storage.vuebergBlocks.getAllowedBlocksByGroups(this.editor.storage.vuebergBlocks.currentNode)
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
      this.editor.chain().focus().run(), Oo();
    }
  }
}, Lk = { class: "vueberg-modal-layout" }, Ik = { class: "vueberg-modal vueberg-modal-md vueberg-blocks-modal" }, Rk = { class: "vueberg-modal-header" }, Pk = { class: "vueberg-modal-header-title" }, Fk = /* @__PURE__ */ P("svg", {
  width: "24px",
  height: "24px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ P("g", null, [
    /* @__PURE__ */ P("path", {
      id: "Vector",
      d: "M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ])
], -1), zk = [
  Fk
], Hk = { class: "vueberg-modal-body" }, Vk = { class: "vueberg-blocks-modal-group" }, $k = { class: "vueberg-blocks-modal-group-title" }, _k = { class: "vueberg-blocks-modal-group-blocks" };
function jk(n, e, t, r, i, o) {
  const s = je("BlockItem");
  return D(), z("div", Lk, [
    P("div", {
      class: "vueberg-modal-backdrop",
      onClick: e[0] || (e[0] = (...l) => o.clickBackdrop && o.clickBackdrop(...l))
    }),
    P("div", Ik, [
      P("div", Rk, [
        P("div", Pk, Fe(i.titleLabel), 1),
        P("div", {
          class: "vueberg-modal-header-close",
          onClick: e[1] || (e[1] = (...l) => o.hideModal && o.hideModal(...l))
        }, zk)
      ]),
      P("div", Hk, [
        (D(!0), z(Le, null, Ye(i.blocks, (l, a) => (D(), z("div", Vk, [
          P("div", $k, Fe(l.title), 1),
          P("div", _k, [
            (D(!0), z(Le, null, Ye(l.blocks, (c, u) => (D(), We(s, {
              class: "vueberg-block-item--modal vueberg-block-item--clickable",
              onClick: Ie((d) => o.selectBlock(c), ["prevent"]),
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
const Js = /* @__PURE__ */ pt(Bk, [["render", jk]]), Wk = {
  components: {
    BlockItem: Ud
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
        this.editor.storage.vuebergBlocks.getFlatBlocks()
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
      this.onCloseMenu && this.onCloseMenu(), this.editor.commands.blur(), this.editor.commands.openModal({ removeFirstSymbol: !0 }, Js);
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
}, qk = { class: "vueberg-slash-menu" }, Kk = {
  key: 0,
  class: "vueberg-slash-menu-body vueberg-block-item--column"
}, Uk = {
  key: 1,
  class: "vueberg-slash-menu-empty"
};
function Jk(n, e, t, r, i, o) {
  const s = je("BlockItem");
  return D(), z("div", qk, [
    t.items.length ? (D(), z("div", Kk, [
      (D(!0), z(Le, null, Ye(t.items, (l, a) => (D(), We(s, {
        class: Ut(["vueberg-block-item--clickable", i.selectedIndex == a ? "vueberg-block-item--selected" : ""]),
        onClick: Ie((c) => o.selectItem(a), ["prevent"]),
        icon: l.icon,
        title: l.title,
        description: l.description
      }, null, 8, ["class", "onClick", "icon", "title", "description"]))), 256))
    ])) : (D(), z("div", Uk, Fe(i.nothingFoundLabel), 1)),
    o.hiddenItems > 0 ? (D(), z("div", {
      key: 2,
      class: "vueberg-slash-menu-show-all",
      onClick: e[0] || (e[0] = (...l) => o.showAll && o.showAll(...l))
    }, [
      Ac(Fe(i.showAllLabel) + " ", 1),
      P("small", null, "(+" + Fe(o.hiddenItems) + ")", 1)
    ])) : se("", !0)
  ]);
}
const Gk = /* @__PURE__ */ pt(Wk, [["render", Jk]]);
function Yk(n) {
  return {
    items: ({ query: e, editor: t }) => {
      let i = t.storage.vuebergBlocks.getAllowedBlocks(
        t.storage.vuebergBlocks.currentNode,
        t.storage.vuebergBlocks.getFlatBlocks()
      ).filter((o) => !o.hideCommand);
      if (e) {
        const o = e.toLowerCase();
        i = i.filter((s) => {
          const l = s.title.toLowerCase().startsWith(o), a = s.keywords && s.keywords.some((c) => c.toLowerCase().startsWith(o));
          return l || a;
        });
      } else {
        let o = i.filter((s) => s.isDefaultCommand);
        if (o.length >= n)
          i = o;
        else {
          let s = i.filter((l) => !l.isDefaultCommand);
          i = o.concat(s).slice(0, n);
        }
      }
      return i.slice(0, n);
    },
    render: () => {
      let e, t;
      return {
        onStart: (r) => {
          if (!r.editor.storage.vuebergBlocks.hasAllowedBlocks(r.editor.storage.vuebergBlocks.currentNode))
            return !1;
          e = new Ab(Gk, {
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
          }), r.clientRect && (t = wn("body", {
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
          return r.event.key === "Escape" ? (t && t[0].hide(), !0) : (console.log("onKeyDown", r), (i = e == null ? void 0 : e.ref) == null ? void 0 : i.onKeyDown(r));
        },
        onExit() {
          console.log("onExit"), t && t[0].destroy(), e && e.destroy();
        }
      };
    }
  };
}
function Qk() {
  return [
    { name: "Bold", extension: Dv },
    { name: "BulletList", extension: Lv },
    { name: "Code", extension: Pv },
    { name: "CodeBlock", extension: Hv },
    { name: "Document", extension: Vv },
    // { name: 'Dropcursor', extension: Dropcursor },
    { name: "Gapcursor", extension: Jv },
    { name: "HardBreak", extension: Gv },
    { name: "Heading", extension: Yv },
    { name: "History", extension: s1 },
    { name: "HorizontalRule", extension: l1 },
    { name: "Italic", extension: f1 },
    { name: "ListItem", extension: h1 },
    { name: "OrderedList", extension: m1 },
    { name: "Paragraph", extension: g1 },
    { name: "Strike", extension: v1 },
    { name: "Text", extension: k1 },
    // {
    //   name: 'Blockquote',
    //   extension: Blockquote.extend({ content: "paragraph" }),
    // },
    { name: "TrailingNode", extension: vk },
    { name: "Subscript", extension: W1 },
    { name: "Superscript", extension: q1 },
    { name: "Highlight", extension: J1 },
    {
      name: "Link",
      extension: j1.configure({ openOnClick: !1 })
    },
    {
      name: "slashMenu",
      extension: Tk.configure({
        suggestion: Yk(5)
      })
    },
    { name: "Typography", extension: yk },
    {
      name: "Youtube",
      extension: bk.configure(
        {
          inline: !1
        }
      )
    },
    {
      name: "Localize",
      extension: kk.configure({
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
function Xk() {
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
function Zk() {
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
          title: "Обычный блок",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5 15h14V9H5v6zm0 4.8h14v-1.5H5v1.5zM5 4.2v1.5h14V4.2H5z"></path></svg>',
          command: (n) => {
            n.chain().focus().setBlockWidth("normal").run();
          },
          isActiveTest: (n) => n.isActive({ blockWidth: "normal" })
        },
        {
          title: "Широкий блок",
          icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M5 9v6h14V9H5zm11-4.8H8v1.5h8V4.2zM8 19.8h8v-1.5H8v1.5z"></path></svg>',
          command: (n) => {
            n.chain().focus().setBlockWidth("wide").run();
          },
          isActiveTest: (n, e) => n.isActive(e, { blockWidth: "wide" })
        },
        {
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
const ew = {
  props: {
    modelValue: {},
    editable: {
      default: !0
    },
    mode: {
      type: String,
      default: "html"
    },
    settings: {
      type: Object,
      default: () => ({
        defaultExtensions: {}
      })
    },
    // TODO:
    placeholder: {
      type: String,
      default: "Начните писать"
    },
    extensions: {
      type: Array,
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
    BubbleMenu: Cb,
    EditorContent: Sb,
    MenuButton: Qs,
    MenuItem: Oc,
    FloatingMenu: Mb,
    WidgetContainerModal: Jb,
    Toolbar: Rh,
    BlocksModal: Js
  },
  data() {
    return {
      vuebergWidth: 0,
      editor: null,
      defaultSettings: {
        defaultExtensions: {}
      },
      allDefaultExtensions: Qk(),
      allBlockTools: mi(Mv(), this.blockTools),
      allInlineTools: mi(Xk(), this.inlineTools),
      allAlignmentTools: mi(Zk(), this.alignmentTools),
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
      this.editor.commands.openModal({}, Js);
    },
    filterBlocks(n) {
      return this.allBlockTools.flatMap((e) => e.blocks).filter(n).map((e) => e.name);
    },
    initializeEditor() {
      const n = this.getEnabledExtensions(), e = this.allBlockTools.map((t) => {
        const r = t.blocks.filter((i) => i.insertCommand);
        return r.length > 0 ? { ...t, blocks: r } : null;
      }).filter((t) => t !== null);
      this.editor = new Tb({
        extensions: [
          ...n,
          Qb.configure({ blocks: e }),
          Nb.configure({ considerAnyAsEmpty: !0, placeholder: this.placeholder }),
          Yb.configure({ types: this.blocksWithBlockWidth }),
          xv.configure({ types: this.blocksWithVariant }),
          Db.configure({ types: this.blocksWithTextAlign }),
          wv,
          ...this.extensions
        ],
        content: this.mode === "json" ? { type: "doc", content: this.modelValue } : this.modelValue,
        editable: this.editable,
        onUpdate: this.handleEditorUpdate,
        onSelectionUpdate: this.updateCurrentBlockTool
      });
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
      return this.editable && t.hasFocus() && n.isActive() && this.modelValue;
    },
    shouldShowFloatingMenu({ editor: n, state: e, view: t }) {
      const { selection: r } = e, { $anchor: i, empty: o } = r, s = i.parent.isTextblock && !i.parent.type.spec.code && !i.parent.textContent;
      if (!t.hasFocus() || !o || !s || !this.editor.isEditable)
        return !1;
      const l = su(n);
      return n.storage.vuebergBlocks.hasAllowedBlocks(l);
    },
    updateCurrentBlockTool() {
      this.currentBlockTool = this.editor.storage.vuebergBlocks.getBlockTool(this.editor.commands.getCurrentNodeName());
    },
    getMenuCoords() {
      return mh(this.editor);
    },
    getBlockEndCoords() {
      return gh(this.editor);
    }
  }
}, tw = {
  class: "vueberg",
  style: { position: "relative" },
  ref: "vueberg"
};
function nw(n, e, t, r, i, o) {
  const s = je("widget-container-modal"), l = je("Toolbar"), a = je("bubble-menu"), c = je("menu-button"), u = je("floating-menu"), d = je("editor-content");
  return D(), z("div", tw, [
    st(s),
    i.editor ? (D(), We(a, {
      key: 0,
      pluginKey: "mainMenu",
      "should-show": o.shouldShowMainToolbar,
      updateDelay: 250,
      editor: i.editor,
      class: Ut([{
        "vueberg-bubble-menu-hidden": i.isTyping
      }, "vueberg-bubble-menu"]),
      "tippy-options": {
        delay: [0, 300],
        duration: [300, 400],
        maxWidth: "none",
        placement: "top-start",
        getReferenceClientRect: o.getMenuCoords,
        onCreate: (f) => f.popper.classList.add("vueberg-toolbar-wrapper")
      }
    }, {
      default: Tt(() => {
        var f;
        return [
          ((f = i.currentBlockTool) == null ? void 0 : f.nodeType) !== void 0 ? (D(), We(l, {
            key: 0,
            editor: i.editor,
            currentBlockTool: i.currentBlockTool,
            settings: o.mergedSettings,
            inlineTools: i.allInlineTools,
            alignmentTools: i.allAlignmentTools,
            vuebergWidth: i.vuebergWidth
          }, null, 8, ["editor", "currentBlockTool", "settings", "inlineTools", "alignmentTools", "vuebergWidth"])) : se("", !0)
        ];
      }),
      _: 1
    }, 8, ["should-show", "editor", "class", "tippy-options"])) : se("", !0),
    i.currentBlockTool ? (D(), We(u, {
      key: 1,
      updateDelay: 1e3,
      "should-show": o.shouldShowFloatingMenu,
      editor: i.editor,
      "tippy-options": {
        delay: [0, 0],
        duration: [100, 100],
        getReferenceClientRect: o.getBlockEndCoords
      }
    }, {
      default: Tt(() => [
        st(c, {
          onClick: o.openBlocksModal,
          class: "vueberg-button-primary vueberg-button-text-only vueberg-button-blocks",
          content: "+"
        }, null, 8, ["onClick"])
      ]),
      _: 1
    }, 8, ["should-show", "editor", "tippy-options"])) : se("", !0),
    st(d, {
      onKeydown: [
        e[0] || (e[0] = (f) => i.isTyping = !0),
        e[1] || (e[1] = Rl((f) => i.isTyping = !1, ["esc"]))
      ],
      onKeyup: e[2] || (e[2] = Rl((f) => i.isTyping = !1, ["esc"])),
      ref: "editor",
      editor: i.editor
    }, null, 8, ["editor"])
  ], 512);
}
const rw = /* @__PURE__ */ pt(ew, [["render", nw]]), iw = {
  props: Ob,
  components: {
    NodeViewWrapper: Eb
  },
  data() {
    return {
      isPreviewMode: !1,
      isEditable: this.editor.isEditable,
      vueBergBlock: this.editor.storage.vuebergBlocks.getBlockTool(this.node.type.name, !1),
      editLabel: this.editor.commands.getTranslation("control.edit"),
      previewLabel: this.editor.commands.getTranslation("control.preview")
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
}, ow = {
  key: 0,
  contenteditable: "false",
  class: "vueberg-customblock-header"
}, sw = { class: "vueberg-customblock-header-title" }, lw = ["innerHTML"], aw = {
  key: 0,
  class: "vueberg-customblock-header-mode"
}, cw = { class: "vueberg-customblock-body" };
function uw(n, e, t, r, i, o) {
  var l;
  const s = je("node-view-wrapper");
  return D(), We(s, {
    class: Ut(["vueberg-customblock", {
      ["vueberg-customblock--" + (((l = i.vueBergBlock) == null ? void 0 : l.name) || "")]: !0,
      "vueberg-customblock--outline": i.isEditable,
      "vueberg-customblock--has-header": i.isEditable
    }]),
    "data-block-width": n.node.attrs.blockWidth
  }, {
    default: Tt(() => {
      var a, c, u, d, f;
      return [
        i.isEditable && ((a = i.vueBergBlock) != null && a.name) ? (D(), z("div", ow, [
          P("div", sw, [
            P("span", {
              class: "vueberg-customblock-header-title-icon",
              innerHTML: (c = i.vueBergBlock) == null ? void 0 : c.icon
            }, null, 8, lw),
            Ac(" " + Fe((u = i.vueBergBlock) == null ? void 0 : u.title), 1)
          ]),
          ((f = (d = i.vueBergBlock) == null ? void 0 : d.vueBergBlock) == null ? void 0 : f.hasPreviewMode) !== !1 ? (D(), z("div", aw, [
            P("span", {
              onClick: e[0] || (e[0] = (...h) => o.toggleMode && o.toggleMode(...h))
            }, Fe(i.isPreviewMode ? i.editLabel : i.previewLabel), 1)
          ])) : se("", !0)
        ])) : se("", !0),
        P("div", cw, [
          fs(n.$slots, "default", {
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
const dw = /* @__PURE__ */ pt(iw, [["render", uw]]), pw = rw, mw = dw;
export {
  mw as BaseVueBergBlock,
  pw as VueBerg
};
