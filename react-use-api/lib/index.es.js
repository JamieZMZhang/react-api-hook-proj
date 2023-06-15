var gr = (n, a, f) => {
  if (!a.has(n))
    throw TypeError("Cannot " + f);
};
var Y = (n, a, f) => (gr(n, a, "read from private field"), f ? f.call(n) : a.get(n)), Ne = (n, a, f) => {
  if (a.has(n))
    throw TypeError("Cannot add the same private member more than once");
  a instanceof WeakSet ? a.add(n) : a.set(n, f);
};
import br from "axios";
import w from "react";
var L = /* @__PURE__ */ ((n) => (n[n.NotInit = -1] = "NotInit", n[n.Pending = 0] = "Pending", n[n.Loaded = 1] = "Loaded", n[n.Error = 2] = "Error", n))(L || {});
const We = () => {
};
function Ye() {
  let n = We, a = We;
  return { promise: new Promise((u, E) => {
    n = u, a = E;
  }), resolve: n, reject: a };
}
var k;
class yr {
  constructor(a) {
    Ne(this, k, []);
    this.abortController = a;
  }
  get subscriptions() {
    return Y(this, k).length;
  }
  subscribe(a, f) {
    const u = { onNext: a, onError: f };
    return Y(this, k).push(u), () => {
      const E = Y(this, k).indexOf(u);
      Y(this, k).splice(E, 1), Y(this, k).length === 0 && this.abortController.abort();
    };
  }
  next(a) {
    for (const f of Y(this, k))
      try {
        f.onNext(a);
      } catch (u) {
        if (f.onError)
          f.onError(u);
        else
          throw u;
      }
  }
  error(a) {
    var f;
    for (const u of Y(this, k))
      (f = u.onError) == null || f.call(u, a);
  }
}
k = new WeakMap();
const Me = w.createContext({});
function Rr(...n) {
  const a = /^\/|\/$/g;
  return n.map((u) => u.replace(a, "")).join("/");
}
let ae = {}, M = {};
function Or(n) {
  n ? delete ae[n] : ae = {};
}
function xr(n) {
  const a = w.useContext(Me), [f, u] = w.useState(n.initialValue), [E, I] = w.useState(L.NotInit), [h, A] = w.useState({
    trigger: 0
  }), d = w.useRef(Ye()), P = w.useRef(), b = w.useRef(0), O = w.useCallback((_) => {
    const x = () => (A({ ..._, trigger: +new Date() }), d.current = Ye(), d.current.promise);
    return typeof n.debounce == "number" ? (P.current && (clearTimeout(P.current), P.current = void 0), new Promise(($, N) => {
      P.current = window.setTimeout(
        () => x().then($).catch(N),
        n.debounce
      );
    })) : x();
  }, []);
  if (w.useEffect(() => {
    var G, H, X, Z;
    if (h.trigger === 0)
      return;
    const _ = (y) => {
      I(L.Error), process.env.NODE_ENV === "development" && console.error(y), typeof n.onError == "function" && n.onError(y, u), d.current.reject(y);
    }, x = (y) => {
      try {
        const W = typeof n.onSuccess == "function" ? n.onSuccess(y.data, y, h) : y.data;
        u(W), I(L.Loaded), d.current.resolve(W);
      } catch (W) {
        _(W);
      }
    }, $ = Er(a.baseUrl, n.url, h.params), N = Ue($, (G = h.api) == null ? void 0 : G.cacheKey, n.cacheKey);
    if (N !== null) {
      const y = ae[N];
      if (y)
        return void x(y);
    }
    I(L.Pending);
    const T = Ue(
      $,
      (H = h.api) == null ? void 0 : H.parallelKey,
      n.parallelKey
    );
    let m = T ? M[T] : void 0;
    if (!m) {
      const y = new AbortController();
      m = new yr(y), T && (M[T] = m);
      const W = ((X = h.api) == null ? void 0 : X.method) || n.method;
      let S = {
        ...h.requestConfig,
        url: $,
        params: { ...h.query, ...(Z = h.requestConfig) == null ? void 0 : Z.params },
        method: W,
        data: h.body,
        signal: y.signal
      };
      a.accessToken && (S.headers = {
        ...S.headers,
        Authorization: "Bearer " + a.accessToken
      }), typeof a.onBeforeRequest == "function" && (S = a.onBeforeRequest(S)), typeof n.onBeforeRequest == "function" && (S = n.onBeforeRequest(S));
      const Q = () => {
        br(S).then(
          (j) => typeof a.onResponse == "function" && !a.onResponse(j) ? null : j
        ).then((j) => {
          !j || (N && (ae[N] = j), m.next(j));
        }).catch((j) => {
          if (Number(n.retry) > b.current) {
            b.current += 1, Q();
            return;
          }
          m.error(j);
        }).finally(() => {
          T && M[T] && delete M[T];
        });
      };
      Q();
    }
    const g = m.subscribe(x, _);
    return () => {
      g(), T && M[T] && delete M[T];
    };
  }, [h.trigger]), n.suspense && E === L.Pending)
    throw d.current.promise;
  return [f, E, O];
}
function Er(n, a, f) {
  let u = a;
  if (f)
    for (const E in f)
      u = u.replaceAll(`{${E}}`, f[E]);
  return !!n && !/^([a-zA-z]+\:)?\/\//.test(u) && (u = Rr(n, u)), u;
}
function Ue(n, a, f) {
  const u = a !== void 0 ? a : f;
  return typeof u == "string" ? u : u === !0 ? n : null;
}
var Le = { exports: {} }, z = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function mr() {
  if (qe)
    return z;
  qe = 1;
  var n = w, a = Symbol.for("react.element"), f = Symbol.for("react.fragment"), u = Object.prototype.hasOwnProperty, E = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, I = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(A, d, P) {
    var b, O = {}, _ = null, x = null;
    P !== void 0 && (_ = "" + P), d.key !== void 0 && (_ = "" + d.key), d.ref !== void 0 && (x = d.ref);
    for (b in d)
      u.call(d, b) && !I.hasOwnProperty(b) && (O[b] = d[b]);
    if (A && A.defaultProps)
      for (b in d = A.defaultProps, d)
        O[b] === void 0 && (O[b] = d[b]);
    return { $$typeof: a, type: A, key: _, ref: x, props: O, _owner: E.current };
  }
  return z.Fragment = f, z.jsx = h, z.jsxs = h, z;
}
var J = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ve;
function _r() {
  return Ve || (Ve = 1, process.env.NODE_ENV !== "production" && function() {
    var n = w, a = Symbol.for("react.element"), f = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), I = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), A = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), $ = Symbol.iterator, N = "@@iterator";
    function T(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = $ && e[$] || e[N];
      return typeof r == "function" ? r : null;
    }
    var m = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function g(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          t[o - 1] = arguments[o];
        G("error", e, t);
      }
    }
    function G(e, r, t) {
      {
        var o = m.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var l = t.map(function(s) {
          return String(s);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var H = !1, X = !1, Z = !1, y = !1, W = !1, S;
    S = Symbol.for("react.module.reference");
    function Q(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === u || e === I || W || e === E || e === P || e === b || y || e === x || H || X || Z || typeof e == "object" && e !== null && (e.$$typeof === _ || e.$$typeof === O || e.$$typeof === h || e.$$typeof === A || e.$$typeof === d || e.$$typeof === S || e.getModuleId !== void 0));
    }
    function j(e, r, t) {
      var o = e.displayName;
      if (o)
        return o;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function pe(e) {
      return e.displayName || "Context";
    }
    function D(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case u:
          return "Fragment";
        case f:
          return "Portal";
        case I:
          return "Profiler";
        case E:
          return "StrictMode";
        case P:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case A:
            var r = e;
            return pe(r) + ".Consumer";
          case h:
            var t = e;
            return pe(t._context) + ".Provider";
          case d:
            return j(e, e.render, "ForwardRef");
          case O:
            var o = e.displayName || null;
            return o !== null ? o : D(e.type) || "Memo";
          case _: {
            var c = e, l = c._payload, s = c._init;
            try {
              return D(s(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var U = Object.assign, B = 0, he, ge, be, ye, Re, Ee, me;
    function _e() {
    }
    _e.__reactDisabledLog = !0;
    function Be() {
      {
        if (B === 0) {
          he = console.log, ge = console.info, be = console.warn, ye = console.error, Re = console.group, Ee = console.groupCollapsed, me = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: _e,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        B++;
      }
    }
    function Ke() {
      {
        if (B--, B === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: U({}, e, {
              value: he
            }),
            info: U({}, e, {
              value: ge
            }),
            warn: U({}, e, {
              value: be
            }),
            error: U({}, e, {
              value: ye
            }),
            group: U({}, e, {
              value: Re
            }),
            groupCollapsed: U({}, e, {
              value: Ee
            }),
            groupEnd: U({}, e, {
              value: me
            })
          });
        }
        B < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = m.ReactCurrentDispatcher, ue;
    function ee(e, r, t) {
      {
        if (ue === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            ue = o && o[1] || "";
          }
        return `
` + ue + e;
      }
    }
    var se = !1, re;
    {
      var ze = typeof WeakMap == "function" ? WeakMap : Map;
      re = new ze();
    }
    function Te(e, r) {
      if (!e || se)
        return "";
      {
        var t = re.get(e);
        if (t !== void 0)
          return t;
      }
      var o;
      se = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = ie.current, ie.current = null, Be();
      try {
        if (r) {
          var s = function() {
            throw Error();
          };
          if (Object.defineProperty(s.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(s, []);
            } catch (F) {
              o = F;
            }
            Reflect.construct(e, [], s);
          } else {
            try {
              s.call();
            } catch (F) {
              o = F;
            }
            e.call(s.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            o = F;
          }
          e();
        }
      } catch (F) {
        if (F && o && typeof F.stack == "string") {
          for (var i = F.stack.split(`
`), R = o.stack.split(`
`), v = i.length - 1, p = R.length - 1; v >= 1 && p >= 0 && i[v] !== R[p]; )
            p--;
          for (; v >= 1 && p >= 0; v--, p--)
            if (i[v] !== R[p]) {
              if (v !== 1 || p !== 1)
                do
                  if (v--, p--, p < 0 || i[v] !== R[p]) {
                    var C = `
` + i[v].replace(" at new ", " at ");
                    return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), typeof e == "function" && re.set(e, C), C;
                  }
                while (v >= 1 && p >= 0);
              break;
            }
        }
      } finally {
        se = !1, ie.current = l, Ke(), Error.prepareStackTrace = c;
      }
      var V = e ? e.displayName || e.name : "", $e = V ? ee(V) : "";
      return typeof e == "function" && re.set(e, $e), $e;
    }
    function Je(e, r, t) {
      return Te(e, !1);
    }
    function Ge(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function te(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Te(e, Ge(e));
      if (typeof e == "string")
        return ee(e);
      switch (e) {
        case P:
          return ee("Suspense");
        case b:
          return ee("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Je(e.render);
          case O:
            return te(e.type, r, t);
          case _: {
            var o = e, c = o._payload, l = o._init;
            try {
              return te(l(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var ne = Object.prototype.hasOwnProperty, Ce = {}, we = m.ReactDebugCurrentFrame;
    function oe(e) {
      if (e) {
        var r = e._owner, t = te(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    function He(e, r, t, o, c) {
      {
        var l = Function.call.bind(ne);
        for (var s in e)
          if (l(e, s)) {
            var i = void 0;
            try {
              if (typeof e[s] != "function") {
                var R = Error((o || "React class") + ": " + t + " type `" + s + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[s] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw R.name = "Invariant Violation", R;
              }
              i = e[s](r, s, o, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (v) {
              i = v;
            }
            i && !(i instanceof Error) && (oe(c), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", t, s, typeof i), oe(null)), i instanceof Error && !(i.message in Ce) && (Ce[i.message] = !0, oe(c), g("Failed %s type: %s", t, i.message), oe(null));
          }
      }
    }
    var Xe = Array.isArray;
    function ce(e) {
      return Xe(e);
    }
    function Ze(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Qe(e) {
      try {
        return Pe(e), !1;
      } catch {
        return !0;
      }
    }
    function Pe(e) {
      return "" + e;
    }
    function Oe(e) {
      if (Qe(e))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ze(e)), Pe(e);
    }
    var K = m.ReactCurrentOwner, er = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, xe, Se, fe;
    fe = {};
    function rr(e) {
      if (ne.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function tr(e) {
      if (ne.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function nr(e, r) {
      if (typeof e.ref == "string" && K.current && r && K.current.stateNode !== r) {
        var t = D(K.current.type);
        fe[t] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', D(K.current.type), e.ref), fe[t] = !0);
      }
    }
    function or(e, r) {
      {
        var t = function() {
          xe || (xe = !0, g("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function ar(e, r) {
      {
        var t = function() {
          Se || (Se = !0, g("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var ir = function(e, r, t, o, c, l, s) {
      var i = {
        $$typeof: a,
        type: e,
        key: r,
        ref: t,
        props: s,
        _owner: l
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(i, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(i, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function ur(e, r, t, o, c) {
      {
        var l, s = {}, i = null, R = null;
        t !== void 0 && (Oe(t), i = "" + t), tr(r) && (Oe(r.key), i = "" + r.key), rr(r) && (R = r.ref, nr(r, c));
        for (l in r)
          ne.call(r, l) && !er.hasOwnProperty(l) && (s[l] = r[l]);
        if (e && e.defaultProps) {
          var v = e.defaultProps;
          for (l in v)
            s[l] === void 0 && (s[l] = v[l]);
        }
        if (i || R) {
          var p = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && or(s, p), R && ar(s, p);
        }
        return ir(e, i, R, c, o, K.current, s);
      }
    }
    var le = m.ReactCurrentOwner, je = m.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var r = e._owner, t = te(e.type, e._source, r ? r.type : null);
        je.setExtraStackFrame(t);
      } else
        je.setExtraStackFrame(null);
    }
    var de;
    de = !1;
    function ve(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function ke() {
      {
        if (le.current) {
          var e = D(le.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function sr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var Ae = {};
    function cr(e) {
      {
        var r = ke();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function De(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = cr(r);
        if (Ae[t])
          return;
        Ae[t] = !0;
        var o = "";
        e && e._owner && e._owner !== le.current && (o = " It was passed a child from " + D(e._owner.type) + "."), q(e), g('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, o), q(null);
      }
    }
    function Fe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ce(e))
          for (var t = 0; t < e.length; t++) {
            var o = e[t];
            ve(o) && De(o, r);
          }
        else if (ve(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = T(e);
          if (typeof c == "function" && c !== e.entries)
            for (var l = c.call(e), s; !(s = l.next()).done; )
              ve(s.value) && De(s.value, r);
        }
      }
    }
    function fr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === d || r.$$typeof === O))
          t = r.propTypes;
        else
          return;
        if (t) {
          var o = D(r);
          He(t, e.props, "prop", o, e);
        } else if (r.PropTypes !== void 0 && !de) {
          de = !0;
          var c = D(r);
          g("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && g("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var o = r[t];
          if (o !== "children" && o !== "key") {
            q(e), g("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), q(null);
            break;
          }
        }
        e.ref !== null && (q(e), g("Invalid attribute `ref` supplied to `React.Fragment`."), q(null));
      }
    }
    function Ie(e, r, t, o, c, l) {
      {
        var s = Q(e);
        if (!s) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var R = sr(c);
          R ? i += R : i += ke();
          var v;
          e === null ? v = "null" : ce(e) ? v = "array" : e !== void 0 && e.$$typeof === a ? (v = "<" + (D(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : v = typeof e, g("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", v, i);
        }
        var p = ur(e, r, t, c, l);
        if (p == null)
          return p;
        if (s) {
          var C = r.children;
          if (C !== void 0)
            if (o)
              if (ce(C)) {
                for (var V = 0; V < C.length; V++)
                  Fe(C[V], e);
                Object.freeze && Object.freeze(C);
              } else
                g("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Fe(C, e);
        }
        return e === u ? lr(p) : fr(p), p;
      }
    }
    function dr(e, r, t) {
      return Ie(e, r, t, !0);
    }
    function vr(e, r, t) {
      return Ie(e, r, t, !1);
    }
    var pr = vr, hr = dr;
    J.Fragment = u, J.jsx = pr, J.jsxs = hr;
  }()), J;
}
(function(n) {
  process.env.NODE_ENV === "production" ? n.exports = mr() : n.exports = _r();
})(Le);
const Tr = Le.exports.jsx, Sr = ({
  config: n,
  children: a
}) => /* @__PURE__ */ Tr(Me.Provider, {
  value: n,
  children: a
});
export {
  L as LoadingState,
  Me as UseApiContext,
  Sr as UseApiProvider,
  Or as clearApiCache,
  xr as useApi
};
