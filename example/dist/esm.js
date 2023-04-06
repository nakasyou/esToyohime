(() => {
  // example/src/x.ts
  var x_default = "nakasyou!!";

  // https://esm.sh/v114/unlicensed@0.4.0/deno/unlicensed.mjs
  var n = Object.create;
  var u = Object.defineProperty;
  var x = Object.getOwnPropertyDescriptor;
  var i = Object.getOwnPropertyNames;
  var c = Object.getPrototypeOf;
  var b = Object.prototype.hasOwnProperty;
  var g = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
  var h = (t, e) => {
    for (var o in e)
      u(t, o, { get: e[o], enumerable: true });
  };
  var _ = (t, e, o, l) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let f of i(e))
        !b.call(t, f) && f !== o && u(t, f, { get: () => e[f], enumerable: !(l = x(e, f)) || l.enumerable });
    return t;
  };
  var d = (t, e, o) => (_(t, e, "default"), o && _(o, e, "default"));
  var m = (t, e, o) => (o = t != null ? n(c(t)) : {}, _(e || !t || !t.__esModule ? u(o, "default", { value: t, enumerable: true }) : o, t));
  var a = g((w, p) => {
    p.exports = {};
  });
  var r = {};
  h(r, { default: () => q });
  var j = m(a());
  d(r, m(a()));
  var { default: s, ...k } = j;
  var q = s !== void 0 ? s : k;

  // example/src/index.ts
  var src_default = class {
    constructor() {
      console.log(x_default);
      console.log(q);
    }
  };
})();
