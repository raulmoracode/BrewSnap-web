// biome-ignore-all lint: vendored canvas engine; not maintained as application code
// biome-ignore-all format: vendored canvas engine; not maintained as application code
/*!
 * Reel — canvas text engine.
 *
 * Self-contained: layout, the character reels and the embedded faces all live in
 * this file. The UMD wrapper registers the API on `window.ReelEngine` and on
 * `module.exports`.
 *
 * Exports: BASE, DEFAULTS, DEFAULT_EFFECT, DEFAULT_FONT, EFFECTS, FONTS, PALETTE,
 *          PRESETS, SYMBOLS, bake, coerce, createReel, defaultsFor
 * API:     createReel(containerEl, optionsObj) -> controller
 */
(function (global) {
  var __exports = {};
  var e = {
    // Turbopack export shim: list = ["NAME", flags, value, ...]
    s: function (list /*, moduleId */) {
      for (var i = 0; i < list.length; i += 3) __exports[list[i]] = list[i + 2];
    },
  };


    "use strict";
    let t = [
        "#ec3b53",
        "#eb8317",
        "#e2b023",
        "#92cb45",
        "#4bbc82",
        "#2bb197",
        "#31accf",
        "#317eea",
        "#486fe9",
        "#7256eb",
        "#9b4eee",
        "#d03fe8",
        "#df428b",
      ],
      l =
        "←→↑↓↔⇄⇌↗↘↦⇒⇔∀∃¬∧∨⊢⊨∈∉⊂⊆∪∩∅±×÷≈≠≤≥∑∏√∞∂∇∫⊕⊗∘∴∵≺≻∼αβγδεθκλμπσφψωΔΣΩΓΛ0123456789",
      o = "slot",
      r = '"ReelMath"',
      a = {
        "Geist Mono": {
          stack: `"ReelMono", ${r}, ui-monospace, monospace`,
        },
        "System mono": {
          stack: `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", ${r}, monospace`,
        },
        "System sans": {
          stack: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, ${r}, sans-serif`,
        },
        "JetBrains Mono": {
          google: "JetBrains+Mono:wght@400;700",
          family: "JetBrains Mono",
          stack: `"JetBrains Mono", ${r}, ui-monospace, monospace`,
        },
        "IBM Plex Mono": {
          google: "IBM+Plex+Mono:wght@400;700",
          family: "IBM Plex Mono",
          stack: `"IBM Plex Mono", ${r}, ui-monospace, monospace`,
        },
        "Space Mono": {
          google: "Space+Mono:wght@400;700",
          family: "Space Mono",
          stack: `"Space Mono", ${r}, ui-monospace, monospace`,
        },
        "DM Mono": {
          google: "DM+Mono:wght@400;500",
          family: "DM Mono",
          stack: `"DM Mono", ${r}, ui-monospace, monospace`,
        },
      },
      n = "Geist Mono",
      i = {
        effect: o,
        text: "move over a word and its letters spin like reels, then stop one by one on the *right* letter",
        lineChars: 24,
        size: 2.55,
        minSize: 16,
        lineHeight: 1.19,
        tracking: 0,
        font: n,
        weight: 400,
        brightWeight: 700,
        yShift: 0,
        appearance: "auto",
        clear: !0,
        ground: "#ffffff",
        groundDark: "#000000",
        ink: "#8a8a8a",
        inkDark: "#6b6b6b",
        bright: "#000000",
        brightDark: "#ffffff",
        c1: t[0],
        c2: t[1],
        c3: t[2],
        c4: t[3],
        c5: t[4],
        c6: t[5],
        c7: t[6],
        c8: t[7],
        c9: t[8],
        c10: t[9],
        c11: t[10],
        c12: t[11],
        c13: t[12],
        colors: 13,
        boxStroke: 0.017,
        boxRadius: 0.11,
        boxGap: 0.012,
        boxLift: 0.18,
        radius: 1.6,
        settle: 0.6,
        stagger: 1,
        flicker: 22,
        holdFlicker: 6,
        widen: 0.3,
        widenTime: 0.09,
        spinTime: 0.5,
        stopStagger: 0.09,
        reelSpeed: 16,
        reelBounce: 0.7,
        reelShade: 0.75,
        dialIn: 0.38,
        dialSpin: 1.1,
        dialTurns: 1,
        dialSize: 1.25,
        dripReach: 0.6,
        dripTime: 1,
        dripRate: 9,
        dripLife: 1.4,
        dripGravity: 9,
        dripSize: 0.6,
        dripBox: 0.3,
        marqueeTime: 1.8,
        marqueeGap: 3,
        marqueeSign: 9,
        marqueeFade: 1.2,
        swingPeriod: 0.9,
        swingDamp: 0.18,
        swingPush: 0.8,
        swingLink: 0.3,
        swingSignAt: 0.35,
        gravity: 34,
        bounce: 0.32,
        grip: 0.45,
        kick: 6,
        spin: 7,
        holdTime: 3,
        returnTime: 0.6,
        returnStagger: 0.04,
        fallRest: 0.8,
        keep: 2.2,
        decodeFlick: 0.22,
        encodeSpread: 1,
        wSymBox: 0.34,
        wSym: 0.14,
        wColor: 0.16,
        wGreyBox: 0.12,
        wBold: 0.1,
        wAlt: 0.14,
        symbols: l,
        seed: 7,
      },
      h = {
        slot: {
          text: "move over a word and its letters spin like reels, then stop one by one on the *right* letter",
          lineChars: 24,
          size: 2.6,
          settle: 0.7,
        },
        dial: {
          text: "move over a word and it curls into a ring, takes a full turn and *unrolls*",
          lineChars: 24,
          size: 2.6,
        },
        fall: {
          text: "move over a word|and watch it *fall*",
          lineChars: 20,
          size: 3.75,
          settle: 0.5,
        },
        reveal: {
          text: "a sentence is hidden under all of these signs and *you found it*",
          lineChars: 16,
          size: 2.7,
          radius: 1.6,
        },
        unreveal: {
          text: "these words are real until you move across them and they turn to *signs*",
          lineChars: 16,
          size: 2.7,
          radius: 1.6,
          keep: 0.7,
          encodeSpread: 0.3,
        },
        drip: {
          text: "move slowly over these letters and they start to drip signs onto the *floor*",
          lineChars: 24,
          size: 2.6,
          settle: 0.8,
        },
        marquee: {
          text: "move along a line and it runs past like a ticker, then stops right where it *began*",
          lineChars: 26,
          size: 2.4,
        },
        swing: {
          text: "push these letters as you pass and they swing like chimes until they come to *rest*",
          lineChars: 24,
          size: 2.6,
        },
      },
      s = { effect: null, diff: {} };
    function f(e) {
      let t = h[e] ? e : o;
      return Object.assign({}, i, h[t], s.diff[t] || {}, { effect: t });
    }
    let c = Object.assign({}, i, h[o]);
    function d(e) {
      let t = {};
      for (let l in e) {
        if (!(l in i)) continue;
        let o = e[l];
        if (null == o) continue;
        let r = typeof i[l];
        if ("number" === r) {
          let e = Number(o);
          Number.isFinite(e) && (t[l] = e);
        } else
          "boolean" === r
            ? (t[l] = !0 === o || "true" === o || "" === o)
            : (t[l] = String(o));
      }
      return t;
    }
    let u = new Set(["dial", "drip", "marquee", "swing"]),
      A = new Set([
        "text",
        "lineChars",
        "size",
        "minSize",
        "lineHeight",
        "tracking",
        "seed",
        "weight",
        "brightWeight",
        "font",
      ]),
      m = null;
    function p(e) {
      return function () {
        e |= 0;
        let t = Math.imul((e = (e + 0x6d2b79f5) | 0) ^ (e >>> 15), 1 | e);
        return (
          (((t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t) ^ (t >>> 14)) >>>
            0) /
          0x100000000
        );
      };
    }
    let g = (e) => e * e * e * (e * (6 * e - 15) + 10),
      x = (e) => 30 * e * e * (e - 1) * (e - 1),
      b = (e, t) => ((e % t) + t) % t,
      v = (e, t, l) => Math.min(l, Math.max(t, e));
    function M(e) {
      let t = String(e).replace("#", ""),
        l = parseInt(3 === t.length ? t.replace(/./g, "$&$&") : t, 16) || 0;
      return [(l >> 16) & 255, (l >> 8) & 255, 255 & l];
    }
    function y(e, t) {
      let [l, o, r] = M(e);
      return "rgba(" + l + "," + o + "," + r + "," + t + ")";
    }
    let S = { C: 8450, H: 8461, N: 8469, P: 8473, Q: 8474, R: 8477, Z: 8484 },
      B = {
        B: 8492,
        E: 8496,
        F: 8497,
        H: 8459,
        I: 8464,
        L: 8466,
        M: 8499,
        R: 8475,
      },
      w = { e: 8495, g: 8458, o: 8500 };
    function k(e, t) {
      let l = [],
        o = [],
        r = 0;
      for (let a of e) {
        let e = +!!o.length + a.length;
        o.length && r + e > t
          ? (l.push(o), (o = [a]), (r = a.length))
          : (o.push(a), (r += e));
      }
      return (o.length && l.push(o), l);
    }
    e.s(
      [
        "BASE",
        0,
        i,
        "DEFAULTS",
        0,
        c,
        "DEFAULT_EFFECT",
        0,
        o,
        "DEFAULT_FONT",
        0,
        n,
        "EFFECTS",
        0,
        [
          { id: "slot", label: "Slot", hint: "Move over a word" },
          { id: "dial", label: "Dial", hint: "Move over a word" },
          { id: "fall", label: "Fall", hint: "Move over a word" },
          { id: "reveal", label: "Reveal", hint: "Move over the signs" },
          { id: "unreveal", label: "Unreveal", hint: "Move over the words" },
          { id: "drip", label: "Drip", hint: "Move slowly over the letters" },
          { id: "marquee", label: "Marquee", hint: "Move along a line" },
          { id: "swing", label: "Swing", hint: "Sweep across the letters" },
        ],
        "FONTS",
        0,
        a,
        "PALETTE",
        0,
        t,
        "PRESETS",
        0,
        h,
        "SYMBOLS",
        0,
        l,
        "bake",
        0,
        function (e, t) {
          h[e] && ((s.effect = e), (s.diff[e] = d(t || {})));
        },
        "coerce",
        0,
        d,
        "createReel",
        0,
        function (e, t, r) {
          r = r || {};
          let c =
              null != (t = t || {}).effect ? String(t.effect) : s.effect || o,
            V = h[c] ? c : o,
            E = Object.assign(f(V), d(t), { effect: V }),
            U = () => (a[E.font] || a[n]).stack,
            F = document.createElement("canvas");
          ((F.style.cssText =
            "position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;outline:none"),
            "static" === getComputedStyle(e).position &&
              (e.style.position = "relative"),
            e.appendChild(F));
          let D = F.getContext("2d"),
            Y = () => {
              let t;
              return (
                "dark" === E.appearance ||
                ("light" !== E.appearance &&
                  ("dark" ===
                    (t = (getComputedStyle(e).colorScheme || "").trim()) ||
                    "only dark" === t ||
                    ("light" !== t &&
                      "only light" !== t &&
                      "function" == typeof matchMedia &&
                      matchMedia("(prefers-color-scheme: dark)").matches)))
              );
            },
            R = Y(),
            Z = () => (R ? E.groundDark : E.ground),
            q = () => (R ? E.inkDark : E.ink),
            I = () => (R ? E.brightDark : E.bright),
            C = 1,
            K = 1,
            O = 1,
            T = 1,
            P = 0.6,
            G = 0.71,
            Q = 0,
            X = 0,
            z = 0,
            L = 0,
            H = [],
            j = [],
            N = [],
            W = [],
            J = 0,
            $ = p(E.seed),
            _ = !1,
            ee = 0,
            et = 0,
            el = !0,
            eo = !1,
            er = { on: !1, t: 0 },
            ea = () => (er.on ? er.t : performance.now() / 1e3),
            en = ea(),
            ei = [],
            eh = null,
            es = new Map(),
            ef = [],
            ec = 0,
            ed = () => {
              let e = Math.max(1, Math.min(13, Math.round(E.colors))),
                t = [];
              for (let l = 1; l <= e; l++) t.push(E["c" + l]);
              return t;
            },
            eu = () => ed().length,
            eA = () => {
              let e,
                t = (e = Array.from(String(E.symbols || "").replace(/\s/g, "")))
                  .length
                  ? e
                  : Array.from(l);
              return t[Math.floor($() * t.length)];
            },
            em = (e) => " " !== e.ch;
          function ep(e) {
            return "reveal" === V
              ? E.flicker
              : e.held && "fall" === V
                ? E.holdFlicker
                : E.flicker;
          }
          function eg(e, t, l) {
            let o,
              r = [
                E.wSymBox,
                E.wSym,
                E.wColor,
                E.wGreyBox,
                E.wBold,
                E.wAlt,
              ].map((e) => Math.max(0, +e || 0));
            ("signs" === l && (r[2] = r[3] = r[4] = r[5] = 0),
              r.reduce((e, t) => e + t, 0) > 0 || (r[0] = 1));
            let a = r.reduce((e, t) => e + t, 0),
              n = $() * a,
              i = 0;
            for (; i < r.length - 1 && n >= r[i];) ((n -= r[i]), i++);
            let h = eu();
            if (
              (e.hue >= 0
                ? (o = b(
                    e.hue + Math.round((2 * $() - 1) * Math.min(e.spread, 6)),
                    h,
                  ))
                : ((o = Math.floor($() * h)),
                  h > 1 &&
                    o === e.col &&
                    (o = (o + 1 + Math.floor($() * (h - 1))) % h)),
              (e.col = o),
              (e.grey = !1),
              (e.bold = !1),
              0 === i)
            )
              ((e.draw = eA()), (e.box = !0));
            else if (1 === i) ((e.draw = eA()), (e.box = !1));
            else if (2 === i) ((e.draw = e.ch), (e.box = !1));
            else if (3 === i) ((e.draw = e.ch), (e.box = !0), (e.grey = !0));
            else if (4 === i) ((e.draw = e.ch), (e.bold = !0), (e.box = !1));
            else {
              let t = (function (e, t) {
                let l = e >= "A" && e <= "Z",
                  o = e >= "a" && e <= "z";
                if (!l && !o) return null;
                let r = e.charCodeAt(0) - (l ? 65 : 97);
                return 0 === t
                  ? l && S[e]
                    ? String.fromCodePoint(S[e])
                    : String.fromCodePoint((l ? 120120 : 120146) + r)
                  : 1 === t
                    ? l && B[e]
                      ? String.fromCodePoint(B[e])
                      : o && w[e]
                        ? String.fromCodePoint(w[e])
                        : String.fromCodePoint((l ? 119964 : 119990) + r)
                    : 2 === t
                      ? "h" === e
                        ? "ℎ"
                        : String.fromCodePoint((l ? 119860 : 119886) + r)
                      : 4 === t
                        ? String.fromCodePoint((l ? 119808 : 119834) + r)
                        : String.fromCodePoint((l ? 120224 : 120250) + r);
              })(e.ch, Math.floor(5 * $()));
              ((e.draw = t || eA()), (e.box = !1));
            }
            e.forceBox && (e.box = !0);
            let s = Math.max(0.001, +ep(e) || 0),
              f = e.held || "reveal" === V ? 1 : 0.35 + 0.65 * e.h;
            e.nextRoll = t + (0.6 + 0.8 * $()) / s / f;
          }
          function ex(e) {
            ((e.on = !1),
              (e.draw = e.ch),
              (e.box = !1),
              (e.forceBox = !1),
              (e.grey = !1),
              (e.bold = !1),
              (e.hue = -1),
              (e.spread = 13),
              (e.thr = e.thr0),
              (e.flick = !1),
              (e.landed = !1));
          }
          function eb(e) {
            return "home" !== e.st || "marquee" === V
              ? 1
              : e.on
                ? 1 + E.widen * (e.box ? 1 : 0.55)
                : 1;
          }
          function ev() {
            if (
              (($ = p(Math.round(E.seed) || 1)),
              (H = []),
              (N = []),
              (ef.length = 0),
              (W = (j = (function (e, t) {
                let l = (function (e) {
                    let t = [],
                      l = !1;
                    for (let o of String(e).replace(/\r/g, "")) {
                      if ("*" === o) {
                        l = !l;
                        continue;
                      }
                      t.push({ ch: "\n" === o ? "|" : o, bright: l });
                    }
                    return t;
                  })(e),
                  o = [],
                  r = [];
                for (let e of l)
                  "|" === e.ch ? (o.push(r), (r = [])) : r.push(e);
                o.push(r);
                let a = o.length > 1,
                  n = [];
                for (let e of o) {
                  let l = (function (e) {
                      let t = [],
                        l = [];
                      for (let o of e)
                        " " === o.ch
                          ? (l.length && t.push(l), (l = []))
                          : l.push(o);
                      return (l.length && t.push(l), t);
                    })(e),
                    o = a
                      ? k(l, t)
                      : (function (e, t) {
                          if (!e.length) return [];
                          let l =
                              e.reduce((e, t) => e + t.length, 0) +
                              e.length -
                              1,
                            o = Math.max(1, Math.ceil(l / t)),
                            r = Math.max(...e.map((e) => e.length));
                          for (let t = r; t <= l; t++) {
                            let l = k(e, t);
                            if (l.length <= o) return l;
                          }
                          return [e];
                        })(l, t);
                  for (let e of o) {
                    let t = [];
                    (e.forEach((e, l) => {
                      for (let o of (l && t.push({ ch: " ", bright: !1 }), e))
                        t.push(o);
                    }),
                      n.push(t));
                  }
                  !o.length && a && n.push([]);
                }
                return n;
              })(E.text, Math.max(1, Math.round(E.lineChars))).map((e, t) => {
                let l = null;
                return e.map((e) => {
                  var o, r;
                  let a,
                    n =
                      ((o = e.ch),
                      (r = e.bright),
                      {
                        ch: o,
                        bright: r,
                        h: 0,
                        thr: (a = 0.04 + 0.72 * E.stagger * $()),
                        thr0: a,
                        on: !1,
                        draw: o,
                        col: -1,
                        hue: -1,
                        spread: 13,
                        box: !1,
                        forceBox: !1,
                        grey: !1,
                        bold: !1,
                        w: 1,
                        nextRoll: 0,
                        flick: !1,
                        cx: 0,
                        cy: 0,
                        left: 0,
                        right: 0,
                        row: 0,
                        i: 0,
                        word: -1,
                        held: !1,
                        st: "home",
                        x: 0,
                        y: 0,
                        vx: 0,
                        vy: 0,
                        a: 0,
                        va: 0,
                        ret: 0,
                        rest: 0,
                        floor: !1,
                        sup: !1,
                        cool: -1e9,
                        reel: null,
                        landed: !1,
                        an: null,
                        th: 0,
                        om: 0,
                        hit: -1e9,
                        drip: null,
                        rv: "plain",
                        until: 0,
                        touch: -1e9,
                        jit: $(),
                      });
                  return (
                    (n.i = H.length),
                    (n.row = t),
                    H.push(n),
                    " " === e.ch
                      ? (l = null)
                      : (l ||
                          ((l = {
                            a: n.i,
                            b: n.i,
                            free: -1e9,
                            row: t,
                            t0: 0,
                            dial: !1,
                          }),
                          N.push(l)),
                        (l.b = n.i),
                        (n.word = N.length - 1)),
                    n
                  );
                });
              })).map(() => ({
                free: -1e9,
                t0: -1e9,
                dir: -1,
                x0: 0,
                x1: 0,
                run: !1,
              }))),
              ("reveal" === V || "unreveal" === V))
            ) {
              let e = ea();
              for (let t of H)
                em(t) &&
                  ("reveal" === V
                    ? ((t.rv = "coded"),
                      (t.on = !0),
                      (t.held = !0),
                      eg(t, e, "signs"),
                      (t.w = eb(t)))
                    : ((t.rv = "open"), ex(t), (t.touch = e)));
            }
            eM();
          }
          function eM() {
            let t = e.getBoundingClientRect();
            ((K = Math.max(1, t.width)),
              (O = Math.max(1, t.height)),
              (T = Math.min(r.maxDpr || 2, window.devicePixelRatio || 1)),
              (F.width = Math.round(K * T)),
              (F.height = Math.round(O * T)),
              (D.font = E.weight + " 100px " + U()),
              (P = D.measureText("0").width / 100 || 0.6),
              (G = D.measureText("H").actualBoundingBoxAscent / 100 || 0.71));
            let l = Math.max(1, ...j.map((e) => e.length)),
              o = "marquee" === V ? 1 : 1 + 0.5 * E.widen,
              a = (0.94 * K) / (l * (P + E.tracking) * o),
              n = Math.max(E.minSize, (E.size / 100) * K);
            if (
              ((Q = r.fit
                ? Math.max(4, Math.min(n, a))
                : Math.max(
                    4,
                    Math.min(
                      n,
                      a,
                      (0.9 * O) / (Math.max(1, j.length) * E.lineHeight),
                    ),
                  ) * C),
              (X = P * Q),
              (z = G * Q),
              (L = E.lineHeight * Q),
              r.fit)
            ) {
              let e = Math.ceil((j.length + ("fall" === V ? 3 : 1)) * L);
              Math.abs(e - O) > 0.5 &&
                ((F.height = Math.round((O = e) * T)),
                r.onHeight && r.onHeight(e));
            }
            es.clear();
          }
          function ey(e, t) {
            let l = [];
            for (let [o, r, a, n] of e) {
              let e = Math.hypot(a - o, n - r),
                i = Math.max(1, Math.ceil(e / t));
              for (let t = 1; t <= i; t++)
                l.push([
                  o + ((a - o) * t) / i,
                  r + ((n - r) * t) / i,
                  (a - o) / (e || 1),
                  (n - r) / (e || 1),
                  a - o,
                ]);
            }
            return l;
          }
          function eS(e, t) {
            for (let l of H)
              if (
                " " !== l.ch &&
                "home" === l.st &&
                Math.abs(l.cy - t) <= L / 2 &&
                Math.abs(l.cx - e) <=
                  (l.right - l.left) / 2 + E.tracking * Q * 0.5 + 0.5
              )
                return l;
            return null;
          }
          function eB(e, t, l) {
            for (let o of ey(e, Math.max(2, X / 2))) {
              let e = eS(o[0], o[1]);
              if (!e || e.word < 0) continue;
              let r = N[e.word];
              t < r.free || l(r, o);
            }
          }
          function ew(e, t) {
            var l, o, r, a;
            let n = t - e.t0,
              i =
                ((l = n),
                (o = E.dialIn),
                (r = E.dialSpin),
                (a = E.dialIn),
                l < 0
                  ? 0
                  : l < o
                    ? g(l / o)
                    : (l -= o) < r
                      ? 1
                      : (l -= r) < a
                        ? 1 - g(l / a)
                        : -1),
              h = v((n - E.dialIn) / Math.max(0.001, E.dialSpin), 0, 1);
            return {
              c: i,
              add: 2 * Math.PI * E.dialTurns * g(h),
              speed: n > E.dialIn && n < E.dialIn + E.dialSpin ? x(h) : 0,
            };
          }
          function ek(e, t) {
            let l = !1,
              o = 1 / 0,
              r = ei;
            ei = [];
            let a = Math.max(1, E.radius * Q);
            if (
              (("reveal" === V || "unreveal" === V) &&
                (function (e, t, l) {
                  for (let [n, i, h, s] of e) {
                    let e = h - n,
                      f = s - i,
                      c = e * e + f * f;
                    for (let h of H) {
                      if (!em(h) || "home" !== h.st) continue;
                      let s = c ? ((h.cx - n) * e + (h.cy - i) * f) / c : 0,
                        d = n + e * (s = Math.max(0, Math.min(1, s))) - h.cx,
                        u = i + f * s - h.cy,
                        A =
                          1 -
                          (function (e, t, l) {
                            let o = Math.min(1, Math.max(0, (l - e) / (t - e)));
                            return o * o * (3 - 2 * o);
                          })(0.5 * l, l, Math.sqrt(d * d + u * u));
                      if (A > 0)
                        if ("reveal" === V) {
                          var o, r, a;
                          ((o = h),
                            (r = A),
                            (a = t),
                            r < 0.5 ||
                              ("coded" === o.rv || "encoding" === o.rv
                                ? ((o.rv = "decoding"),
                                  (o.held = !0),
                                  (o.on = !0),
                                  (o.until =
                                    a + E.decodeFlick * (0.6 + 0.8 * o.jit)),
                                  (o.nextRoll = a))
                                : "open" === o.rv && (o.touch = a)));
                        } else if ("unreveal" === V) {
                          A < 0.5 ||
                            ("open" === h.rv || "decoding" === h.rv
                              ? ((h.rv = "encoding"),
                                (h.held = !0),
                                (h.on = !0),
                                (h.until =
                                  t + E.decodeFlick * (0.6 + 0.8 * h.jit)),
                                (h.nextRoll = t))
                              : "coded" === h.rv && (h.touch = t));
                        } else
                          !em(h) ||
                            "home" !== h.st ||
                            h.reel ||
                            h.an ||
                            h.held ||
                            (A > h.h && (h.h = A),
                            !h.on && h.h > h.thr && ((h.on = !0), eg(h, t)));
                    }
                  }
                })(r, t, a),
              "slot" === V)
            ) {
              let e;
              for (let o of ((e = eu()),
              eB(r, t, (l) => {
                let o = t;
                for (let r = l.a; r <= l.b; r++) {
                  let a = H[r],
                    n = t + E.spinTime + (r - l.a) * E.stopStagger,
                    i = Math.max(3, Math.round(E.reelSpeed * (n - t))),
                    h = [[a.ch, -1]];
                  for (let t = 1; t < i; t++)
                    h.push([eA(), Math.floor($() * e)]);
                  ((a.col = Math.floor($() * e)), h.push([a.ch, a.col]));
                  for (let t = 0; t < 2; t++)
                    h.push([eA(), Math.floor($() * e)]);
                  ((a.reel = { t0: t, t1: n, D: i, seq: h }),
                    (a.on = !0),
                    (a.held = !0),
                    (a.box = !0),
                    (a.forceBox = !0),
                    (a.grey = !1),
                    (a.bold = !1),
                    (a.draw = a.ch),
                    (a.h = 1),
                    (a.landed = !0),
                    (o = Math.max(o, n)));
                }
                l.free = o + E.settle + 0.2;
              }),
              H))
                o.reel &&
                  ((l = !0),
                  t >= o.reel.t1 &&
                    ((o.reel = null),
                    (o.held = !1),
                    (o.h = 1),
                    (o.draw = o.ch)));
            } else if ("dial" === V) {
              let e;
              for (let o of ((e = eu()),
              eB(r, t, (l) => {
                let o = l.b - l.a + 1;
                if (o < 2) return;
                ((l.dial = !0), (l.t0 = t));
                let r = Math.max(1, Math.round(e / o));
                for (let n = l.a; n <= l.b; n++) {
                  var a;
                  let i = H[n];
                  ((a = b(ec + (n - l.a) * r, e)),
                    (i.held = !0),
                    (i.on = !0),
                    (i.forceBox = !0),
                    (i.h = 0),
                    (i.hue = a),
                    (i.spread = 0),
                    eg(i, t, void 0),
                    (i.draw = i.ch),
                    (i.grey = !1),
                    (i.bold = !1),
                    (i.an = { k: n - l.a, n: o }));
                }
                ((ec = b(ec + 4, e)),
                  (l.free = t + 2 * E.dialIn + E.dialSpin + 0.1));
              }),
              N)) {
                if (!o.dial) continue;
                l = !0;
                let e = ew(o, t);
                for (let l = o.a; l <= o.b; l++) {
                  let o = H[l],
                    r = e.speed > 1.1;
                  r && !o.flick
                    ? (eg(o, t), (o.flick = !0))
                    : !r &&
                      o.flick &&
                      ((o.flick = !1),
                      (o.draw = o.ch),
                      (o.box = !0),
                      (o.grey = !1),
                      (o.bold = !1));
                }
                if (e.c < 0) {
                  o.dial = !1;
                  for (let e = o.a; e <= o.b; e++)
                    (((n = H[e]).held = !1), (n.an = null), ex(n));
                }
              }
            } else if ("fall" === V) {
              for (let [e, l, o, a] of ey(r, Math.max(2, X / 2))) {
                let r = eS(e, l);
                r &&
                  t >= r.cool &&
                  (function (e, t, l, o) {
                    let r = e.i,
                      a = e.i;
                    for (
                      ;
                      r > 0 && " " !== H[r - 1].ch && H[r - 1].row === e.row;
                    )
                      r--;
                    for (
                      ;
                      a < H.length - 1 &&
                      " " !== H[a + 1].ch &&
                      H[a + 1].row === e.row;
                    )
                      a++;
                    for (let n = r; n <= a; n++) {
                      let a = H[n];
                      if ("home" !== a.st || t < a.cool) continue;
                      let i = Math.sign(a.cx - e.cx) || (0.5 > $() ? -1 : 1);
                      ((a.st = "fall"),
                        (a.held = !0),
                        (a.on = !0),
                        (a.forceBox = !0),
                        (a.h = 1),
                        eg(a, t),
                        (a.x = a.cx),
                        (a.y = a.cy),
                        (a.a = 0),
                        (a.rest = 0),
                        (a.vx =
                          (0.7 * l + 0.25 * i + ($() - 0.5) * 0.6) *
                          E.kick *
                          Q),
                        (a.vy = (-(0.35 + 0.55 * $()) + 0.35 * o) * E.kick * Q),
                        (a.va = ($() - 0.5) * 2 * E.spin),
                        (a.ret = t + E.holdTime + (n - r) * E.returnStagger));
                    }
                  })(r, t, o, a);
              }
              let a = (function (e, t) {
                let l = H.filter((e) => "fall" === e.st || "return" === e.st);
                if (!l.length) return { busy: !1, due: 1 / 0 };
                let o = e / 3,
                  r = E.gravity * Q,
                  a = 0.46 * L,
                  n = O - 0.08 * Q,
                  i = 0.9 * Q,
                  h = 0.5 * Math.max((1 + E.widen) * X, L),
                  s = (2 * Math.PI) / Math.max(0.05, E.returnTime),
                  f = Math.PI / 2;
                for (let e = 0; e < 3; e++) {
                  for (let e of l) e.sup = !1;
                  for (let e = 0; e < l.length; e++) {
                    let t = l[e];
                    if ("fall" === t.st)
                      for (let o = e + 1; o < l.length; o++) {
                        let e = l[o];
                        if ("fall" !== e.st) continue;
                        let r = e.x - t.x,
                          n = e.y - t.y,
                          i = r * r + n * n;
                        if (i >= 4 * a * a) continue;
                        let h = Math.sqrt(i) || 1e-6,
                          s = r / h,
                          f = n / h,
                          c = 2 * a - h;
                        ((t.x -= (s * c) / 2),
                          (t.y -= (f * c) / 2),
                          (e.x += (s * c) / 2),
                          (e.y += (f * c) / 2));
                        let d = (e.vx - t.vx) * s + (e.vy - t.vy) * f;
                        if (d < 0) {
                          let l = (-(1 + E.bounce) * d) / 2;
                          ((t.vx -= l * s),
                            (t.vy -= l * f),
                            (e.vx += l * s),
                            (e.vy += l * f));
                        }
                        f > 0.55 ? (t.sup = !0) : f < -0.55 && (e.sup = !0);
                      }
                  }
                  for (let e of l)
                    if ("fall" === e.st)
                      if (
                        ((e.vy += r * o),
                        (e.x += e.vx * o),
                        (e.y += e.vy * o),
                        (e.a += e.va * o),
                        (e.floor = !1),
                        e.y + a > n &&
                          ((e.y = n - a),
                          e.vy > 0 &&
                            ((e.vy = -e.vy * E.bounce),
                            Math.abs(e.vy) < i && (e.vy = 0)),
                          (e.floor = !0)),
                        e.x - h < 0 &&
                          ((e.x = h), (e.vx = Math.abs(e.vx) * E.bounce)),
                        e.x + h > K &&
                          ((e.x = K - h), (e.vx = -Math.abs(e.vx) * E.bounce)),
                        e.floor || e.sup)
                      ) {
                        e.vx *= Math.exp(-(10 * E.grip) * o);
                        let t = Math.round(e.a / f) * f;
                        e.va += (-(60 * (e.a - t)) - 10 * e.va) * o;
                      } else e.va *= Math.exp(-0.4 * o);
                    else if (t >= e.ret) {
                      let t = -s * s * (e.x - e.cx) - 1.44 * s * e.vx,
                        l = -s * s * (e.y - e.cy) - 1.44 * s * e.vy,
                        r = -s * s * e.a - 1.44 * s * e.va;
                      ((e.vx += t * o),
                        (e.vy += l * o),
                        (e.va += r * o),
                        (e.x += e.vx * o),
                        (e.y += e.vy * o),
                        (e.a += e.va * o));
                    }
                }
                let c = !1,
                  d = 1 / 0;
                for (let o of l)
                  if ("fall" === o.st) {
                    let l = Math.hypot(o.vx, o.vy);
                    ((o.rest =
                      l < i && (o.floor || o.sup) && 0.3 > Math.abs(o.va)
                        ? o.rest + e
                        : 0),
                      t >= o.ret
                        ? ((o.st = "return"),
                          (o.a = Math.atan2(Math.sin(o.a), Math.cos(o.a))),
                          (c = !0))
                        : o.rest > 0.4
                          ? (d = Math.min(d, o.ret))
                          : (c = !0));
                  } else
                    ((c = !0),
                      0.6 > Math.hypot(o.x - o.cx, o.y - o.cy) &&
                        Math.hypot(o.vx, o.vy) < 0.4 * Q &&
                        0.01 > Math.abs(o.a) &&
                        ((o.st = "home"),
                        (o.held = !1),
                        (o.h = 1),
                        (o.rest = 0),
                        (o.cool = t + E.fallRest)));
                return { busy: c, due: d };
              })(e, t);
              ((l = a.busy || l), (o = Math.min(o, a.due)));
            } else if ("reveal" === V) {
              let e = (function (e) {
                let t = !1,
                  l = 1 / 0;
                for (let o of H)
                  if ("decoding" === o.rv)
                    ((t = !0),
                      e >= o.until &&
                        ((o.rv = "open"), (o.held = !1), ex(o), (o.touch = e)));
                  else if ("open" === o.rv) {
                    let r = o.touch + E.keep + o.jit * E.encodeSpread;
                    e >= r
                      ? ((o.rv = "encoding"),
                        (o.held = !0),
                        (o.on = !0),
                        (o.until = e + E.decodeFlick * (0.6 + 0.8 * o.jit)),
                        eg(o, e, "signs"),
                        (t = !0))
                      : (l = Math.min(l, r));
                  } else
                    "encoding" === o.rv &&
                      ((t = !0), e >= o.until && (o.rv = "coded"));
                return { busy: t, due: l };
              })(t);
              ((l = e.busy || l), (o = Math.min(o, e.due)));
            } else if ("unreveal" === V) {
              let e = (function (e) {
                let t = !1,
                  l = 1 / 0;
                for (let o of H)
                  if ("encoding" === o.rv)
                    ((t = !0),
                      e >= o.until && ((o.rv = "coded"), (o.touch = e)));
                  else if ("coded" === o.rv) {
                    let r = o.touch + E.keep + o.jit * E.encodeSpread;
                    e >= r
                      ? ((o.rv = "decoding"),
                        (o.held = !0),
                        (o.on = !0),
                        (o.until = e + E.decodeFlick * (0.6 + 0.8 * o.jit)),
                        eg(o, e, "signs"),
                        (t = !0))
                      : (l = Math.min(l, r));
                  } else
                    "decoding" === o.rv &&
                      ((t = !0),
                        e >= o.until &&
                          ((o.rv = "open"),
                          (o.held = !1),
                          ex(o),
                          (o.touch = e)));
                return { busy: t, due: l };
              })(t);
              ((l = e.busy || l), (o = Math.min(o, e.due)));
            } else if ("drip" === V) {
              let o = Math.max(1, E.dripReach * Q),
                a = eu();
              for (let [e, l] of ey(r, Math.max(2, X / 3)))
                for (let r of H)
                  !em(r) ||
                    Math.abs(r.cy - l) > L / 2 ||
                    Math.abs(r.cx - e) > o ||
                    (r.drip
                      ? (r.drip.until = t + E.dripTime)
                      : ((r.held = !0),
                        (r.on = !0),
                        (r.box = !1),
                        (r.forceBox = !1),
                        (r.grey = !1),
                        (r.bold = !1),
                        (r.draw = r.ch),
                        (r.col = Math.floor($() * a)),
                        (r.drip = { until: t + E.dripTime, next: t })));
              l =
                (function (e, t) {
                  let l = eu(),
                    o = !1;
                  for (let e of H)
                    if (e.drip) {
                      if (((o = !0), t >= e.drip.until)) {
                        ((e.drip = null),
                          (e.held = !1),
                          (e.h = 1),
                          (e.landed = !0));
                        continue;
                      }
                      for (; e.drip.next <= t && ef.length < 800;)
                        (ef.push({
                          x: e.cx + ($() - 0.5) * X * 0.5,
                          y: e.cy + 0.55 * z,
                          vx: ($() - 0.5) * 0.4 * Q,
                          vy: (0.3 + 0.6 * $()) * Q,
                          ch: eA(),
                          col: b(e.col + Math.round(2 * $() - 1), l),
                          t0: t,
                          life: E.dripLife * (0.7 + 0.6 * $()),
                          s: E.dripSize * (0.8 + 0.4 * $()),
                          box: $() < E.dripBox,
                        }),
                          (e.drip.next +=
                            (0.6 + 0.8 * $()) / Math.max(0.1, E.dripRate)));
                    }
                  let r = E.dripGravity * Q;
                  for (let l = ef.length - 1; l >= 0; l--) {
                    let o = ef[l];
                    ((o.vy += r * e),
                      (o.x += o.vx * e),
                      (o.y += o.vy * e),
                      (t - o.t0 > o.life || o.y > O + L) && ef.splice(l, 1));
                  }
                  return o || ef.length > 0;
                })(e, t) || l;
            } else if ("marquee" === V) {
              var n;
              let e, o;
              for (let [e, l, , , o] of ey(r, Math.max(2, X / 2))) {
                let r = Math.floor((l - J) / L);
                if (r < 0 || r >= j.length) continue;
                let a = W[r];
                t < a.free ||
                  e < a.x0 - X ||
                  e > a.x1 + X ||
                  ((a.t0 = t),
                  (a.dir = Math.sign(o) || -1),
                  (a.run = !0),
                  (a.free = t + E.marqueeTime + 0.15),
                  (a.off = ec),
                  (ec = b(ec + 4, eu())));
              }
              ((e = !1),
                (o = eu()),
                W.forEach((l, r) => {
                  if (!l.run) return;
                  let a = (t - l.t0) / Math.max(0.05, E.marqueeTime);
                  if (a >= 1) {
                    for (let e of ((l.run = !1), j[r]))
                      e.held && ((e.held = !1), ex(e));
                    return;
                  }
                  e = !0;
                  let n =
                    ((l.x1 - l.x0 + E.marqueeGap * Q) * x(v(a, 0, 1))) /
                    Math.max(0.05, E.marqueeTime) /
                    Q;
                  j[r].forEach((e, r) => {
                    em(e) &&
                      (n > E.marqueeSign
                        ? ((e.held && e.flick) ||
                            ((e.held = !0),
                            (e.on = !0),
                            (e.forceBox = !0),
                            (e.hue = b(l.off + r, o)),
                            (e.spread = 0),
                            eg(e, t)),
                          (e.flick = !0))
                        : n > 0.4 * E.marqueeSign
                          ? ((e.held = !0),
                            (e.on = !0),
                            (e.forceBox = !1),
                            (e.box = !1),
                            (e.grey = !1),
                            (e.bold = !1),
                            (e.draw = e.ch),
                            (e.flick = !1),
                            (e.col = b(l.off + r, o)))
                          : e.held && ((e.held = !1), ex(e)));
                  });
                }),
                (l = e || l));
            } else if ("swing" === V) {
              for (let [e, l, , , o] of ey(r, Math.max(2, X / 3)))
                for (let r of H)
                  em(r) &&
                    !(t - r.hit < 0.08) &&
                    (Math.abs(r.cy - l) > 0.6 * L ||
                      Math.abs(r.cx - e) > 0.6 * X ||
                      ((r.om += v((o / Q) * 6, -9, 9) * E.swingPush),
                      (r.hit = t)));
              l =
                (function (e, t) {
                  let l = (2 * Math.PI) / Math.max(0.05, E.swingPeriod),
                    o = E.swingDamp,
                    r = eu(),
                    a = e / 4,
                    n = !1;
                  for (let e = 0; e < 4; e++) {
                    for (let e of H) {
                      if (!em(e)) continue;
                      let t =
                          e.i > 0 && H[e.i - 1].word === e.word
                            ? H[e.i - 1].th
                            : e.th,
                        r =
                          e.i < H.length - 1 && H[e.i + 1].word === e.word
                            ? H[e.i + 1].th
                            : e.th,
                        n =
                          -l * l * e.th -
                          2 * o * l * e.om +
                          E.swingLink * l * l * (t + r - 2 * e.th);
                      e.om += n * a;
                    }
                    for (let e of H) em(e) && (e.th += e.om * a);
                  }
                  for (let e of H) {
                    if (!em(e)) continue;
                    if (0.004 > Math.abs(e.th) && 0.02 > Math.abs(e.om)) {
                      ((e.th = 0),
                        (e.om = 0),
                        e.held && ((e.held = !1), ex(e)));
                      continue;
                    }
                    n = !0;
                    let l = Math.abs(e.th);
                    l > E.swingSignAt
                      ? ((e.held && e.flick) ||
                          ((e.held = !0),
                          (e.on = !0),
                          (e.forceBox = !0),
                          (e.hue = -1),
                          eg(e, t)),
                        (e.flick = !0))
                      : l > 0.06
                        ? (!e.held || e.flick) &&
                          ((e.held = !0),
                          (e.on = !0),
                          (e.forceBox = !1),
                          (e.box = !1),
                          (e.grey = !1),
                          (e.bold = !1),
                          (e.draw = e.ch),
                          (e.flick = !1),
                          e.col < 0 && (e.col = Math.floor($() * r)))
                        : e.held && ((e.held = !1), ex(e));
                  }
                  return n;
                })(e, t) || l;
            }
            let i = e / Math.max(0.01, E.settle),
              h = 1 - Math.exp(-e / Math.max(0.001, E.widenTime));
            for (let e of H) {
              (!e.held && e.h > 0 && ((e.h = Math.max(0, e.h - i)), (l = !0)),
                e.on &&
                  !e.held &&
                  "home" === e.st &&
                  "reveal" !== V &&
                  "unreveal" !== V &&
                  e.h <= e.thr &&
                  ex(e),
                e.on &&
                  ep(e) > 0 &&
                  ("reveal" === V || "unreveal" === V
                    ? "decoding" === e.rv || "encoding" === e.rv
                    : !e.reel &&
                      !e.landed &&
                      (u.has(V) && e.held
                        ? e.flick
                        : "fall" !== V ||
                          "fall" !== e.st ||
                          !(e.rest > 0.15))) &&
                  ((l = !0),
                  t >= e.nextRoll &&
                    eg(e, t, "reveal" === V || "unreveal" === V ? "signs" : void 0)));
              let o = eb(e);
              ((e.w += (o - e.w) * h),
                1e-4 > Math.abs(o - e.w) ? (e.w = o) : (l = !0));
            }
            return { busy: l, due: o };
          }
          function eV(e, t, l, o, r, a) {
            let n, i;
            ((D.font = t), (D.fillStyle = l));
            let h =
                ((n = t + "|" + e),
                void 0 === (i = es.get(n)) &&
                  (es.size > 4e3 && es.clear(),
                  (D.font = t),
                  (i = D.measureText(e).width),
                  es.set(n, i)),
                i),
              s = 0.92 * a;
            h > s && h > 0 && s > 0
              ? (D.save(),
                D.translate(o, r),
                D.scale(s / h, 1),
                D.fillText(e, 0, 0),
                D.restore())
              : D.fillText(e, o, r);
          }
          function eE(e) {
            if (
              (D.setTransform(T, 0, 0, T, 0, 0),
              E.clear
                ? D.clearRect(0, 0, K, O)
                : ((D.fillStyle = Z()), D.fillRect(0, 0, K, O)),
              !_)
            )
              return;
            let t = ed(),
              l = t.length,
              o = t.map((e) =>
                (function (e, t) {
                  let [l, o, r] = M(e),
                    a = (e) => Math.round(e + (255 - e) * t);
                  return "rgb(" + a(l) + "," + a(o) + "," + a(r) + ")";
                })(e, E.boxLift),
              ),
              r = E.tracking * Q,
              a = E.boxGap * Q,
              n = Math.max(1 / T, E.boxStroke * Q),
              i = E.boxRadius * Q;
            ((J = O / 2 + E.yShift * O - (j.length * L) / 2),
              (D.textAlign = "center"),
              (D.textBaseline = "alphabetic"));
            let h = (e, t) => e + " " + Q * (t || 1) + "px " + U(),
              s = (e, t, l, o, r) => {
                let a = Math.max(0, l - n),
                  h = Math.max(0, o - n);
                (D.beginPath(),
                  D.roundRect(
                    e + n / 2,
                    t + n / 2,
                    a,
                    h,
                    Math.min(void 0 === r ? i : r, a / 2, h / 2),
                  ));
              },
              f = (e, t, l, o, r, a) => {
                (s(e, t, l, o),
                  a && ((D.fillStyle = a), D.fill()),
                  r && ((D.strokeStyle = r), (D.lineWidth = n), D.stroke()));
              },
              c = (e) =>
                e.on ? (e.grey ? q() : t[e.col % l]) : e.bright ? I() : q(),
              d = (e, t) =>
                h(
                  e.bright && !e.on
                    ? E.brightWeight
                    : e.on && e.bold
                      ? 700
                      : E.weight,
                  t,
                ),
              u = (e) => (e.bright ? I() : q()),
              A = (e, t, r, n, i) => {
                (D.save(),
                  D.translate(t, r),
                  i && i.rot && D.rotate(i.rot),
                  i &&
                    (void 0 !== i.sx || void 0 !== i.sy) &&
                    D.scale(
                      void 0 === i.sx ? 1 : i.sx,
                      void 0 === i.sy ? 1 : i.sy,
                    ),
                  i && void 0 !== i.alpha && (D.globalAlpha = i.alpha));
                let h = n - 2 * a,
                  s = L - 2 * a,
                  u = i && void 0 !== i.ch ? i.ch : e.on ? e.draw : e.ch,
                  A = i && void 0 !== i.box ? i.box : e.on && e.box,
                  m = i && i.fill && !E.clear ? Z() : null;
                ((A || m) &&
                  f(
                    -h / 2,
                    -s / 2,
                    h,
                    s,
                    A ? (i && i.stroke) || o[e.col % l] : null,
                    m,
                  ),
                  eV(
                    u,
                    (i && i.font) || d(e),
                    (i && i.colour) || c(e),
                    0,
                    z / 2,
                    n,
                  ),
                  D.restore());
              };
            if ("drip" === V && ef.length)
              for (let r of ef) {
                let n = (e - r.t0) / r.life,
                  i = v(1 - n * n, 0, 1);
                (D.save(),
                  (D.globalAlpha = i),
                  D.translate(r.x, r.y),
                  D.scale(r.s, r.s),
                  r.box &&
                    f(
                      -(0.65 * X),
                      -L / 2 + a,
                      1.3 * X,
                      L - 2 * a,
                      o[r.col % l],
                    ),
                  eV(r.ch, h(E.weight), t[r.col % l], 0, z / 2, 1.3 * X),
                  D.restore());
              }
            let m = [];
            for (let i = 0; i < j.length; i++) {
              let p = j[i],
                x = (e) => e.w,
                M = 0;
              for (let e = 0; e < p.length; e++) M += x(p[e]) * X + (e ? r : 0);
              let S = K / 2 - M / 2,
                B = J + i * L,
                w = B + L / 2 + z / 2,
                k = W[i];
              for (let e of (k && !k.run && ((k.x0 = S), (k.x1 = S + M)), p)) {
                let t = x(e) * X;
                ((e.cx = S + t / 2),
                  (e.cy = B + L / 2),
                  (e.left = S),
                  (e.right = S + t),
                  (S += t + r));
              }
              if ("marquee" === V && k && k.run) {
                !(function (e, t, l, o, r) {
                  let a = j[e],
                    n = v((l - t.t0) / Math.max(0.05, E.marqueeTime), 0, 1),
                    i = t.x1 - t.x0,
                    h = i + E.marqueeGap * Q,
                    s = h * g(n) * t.dir,
                    f = E.marqueeFade * Q;
                  for (let e of (D.save(),
                  D.beginPath(),
                  D.rect(t.x0 - f, o - 2, i + 2 * f, L + 4),
                  D.clip(),
                  a)) {
                    if (" " === e.ch) continue;
                    let l = e.right - e.left,
                      a = b(e.left - t.x0 + s, h);
                    for (let n of [t.x0 + a, t.x0 + a - h])
                      n + l < t.x0 - f ||
                        n > t.x1 + f ||
                        r(e, n + l / 2, o + L / 2, l);
                  }
                  if (f > 0) {
                    let e = Z();
                    E.clear && (D.globalCompositeOperation = "destination-out");
                    let l = D.createLinearGradient(
                      t.x0 - f,
                      0,
                      t.x0 + 0.6 * f,
                      0,
                    );
                    (l.addColorStop(0, y(e, 1)),
                      l.addColorStop(1, y(e, 0)),
                      (D.fillStyle = l),
                      D.fillRect(t.x0 - f, o - 2, 1.6 * f, L + 4));
                    let r = D.createLinearGradient(
                      t.x1 - 0.6 * f,
                      0,
                      t.x1 + f,
                      0,
                    );
                    (r.addColorStop(0, y(e, 0)),
                      r.addColorStop(1, y(e, 1)),
                      (D.fillStyle = r),
                      D.fillRect(t.x1 - 0.6 * f, o - 2, 1.6 * f, L + 4));
                  }
                  D.restore();
                })(i, k, e, B, A);
                continue;
              }
              for (let r of p) {
                if (" " === r.ch) continue;
                let i = r.right - r.left;
                if (!(i <= 0.5)) {
                  if ("home" !== r.st || ("dial" === V && r.an)) {
                    m.push(r);
                    continue;
                  }
                  if (r.reel) {
                    let c = (function (e, t) {
                        let l = v(
                            (t - e.t0) / Math.max(0.001, e.t1 - e.t0),
                            0,
                            1,
                          ),
                          o = 1.70158 * E.reelBounce;
                        return (
                          e.D *
                          (1 +
                            (o + 1) * Math.pow(l - 1, 3) +
                            o * Math.pow(l - 1, 2))
                        );
                      })(r.reel, e),
                      d = r.left + a,
                      A = B + a,
                      m = i - 2 * a,
                      p = L - 2 * a;
                    (f(d, A, m, p, o[r.col % l]),
                      D.save(),
                      s(d + n, A + n, m - 2 * n, p - 2 * n),
                      D.clip());
                    let g = Math.floor(c);
                    for (let e = g - 1; e <= g + 2; e++) {
                      let o = r.reel.seq[e];
                      o &&
                        eV(
                          o[0],
                          h(E.weight),
                          o[1] < 0 ? u(r) : t[o[1] % l],
                          r.cx,
                          w - (e - c) * L,
                          i,
                        );
                    }
                    if (E.reelShade > 0) {
                      let e = Z(),
                        t = D.createLinearGradient(0, A, 0, A + p);
                      (t.addColorStop(0, y(e, E.reelShade)),
                        t.addColorStop(0.32, y(e, 0)),
                        t.addColorStop(0.68, y(e, 0)),
                        t.addColorStop(1, y(e, E.reelShade)),
                        E.clear &&
                          (D.globalCompositeOperation = "destination-out"),
                        (D.fillStyle = t),
                        D.fillRect(d, A, m, p));
                    }
                    D.restore();
                    continue;
                  }
                  if ("swing" === V && r.th) {
                    (D.save(),
                      D.translate(r.cx, B + a),
                      D.rotate(r.th),
                      D.translate(-r.cx, -(B + a)),
                      A(r, r.cx, r.cy, i),
                      D.restore());
                    continue;
                  }
                  (r.on &&
                    r.box &&
                    f(r.left + a, B + a, i - 2 * a, L - 2 * a, o[r.col % l]),
                    eV(r.on ? r.draw : r.ch, d(r), c(r), r.cx, w, i));
                }
              }
            }
            for (let t of m) {
              let l = (1 + E.widen) * X;
              if ("home" !== t.st) A(t, t.x, t.y, l, { rot: t.a, box: !0 });
              else if ("dial" === V && t.an) {
                let l = N[t.word],
                  o = ew(l, e),
                  r = Math.max(0, o.c),
                  a = 0,
                  n = 0;
                for (let e = l.a; e <= l.b; e++)
                  ((a += H[e].cx), (n += H[e].cy));
                ((a /= t.an.n), (n /= t.an.n));
                let i = Math.max(
                    0.75 * L,
                    (t.an.n * X * E.dialSize) / (2 * Math.PI),
                  ),
                  h = -Math.PI / 2 + (2 * Math.PI * t.an.k) / t.an.n + o.add,
                  s = a + i * Math.cos(h),
                  f = n + i * Math.sin(h),
                  c = Math.atan2(
                    Math.sin(h + Math.PI / 2),
                    Math.cos(h + Math.PI / 2),
                  );
                A(
                  t,
                  t.cx + (s - t.cx) * r,
                  t.cy + (f - t.cy) * r,
                  t.right - t.left,
                  { rot: c * r, box: r > 0.02, fill: r > 0.02 },
                );
              }
            }
          }
          function eU() {
            var e, t, l;
            if (((ee = 0), eo)) return;
            let o = ea(),
              r = Math.min(0.05, Math.max(0, o - en));
            en = o;
            let a = ek(r, o);
            (eE(o),
              (e = a.busy || ei.length > 0),
              (t = a.due),
              (l = o),
              clearTimeout(et),
              (et = 0),
              er.on ||
                eo ||
                !el ||
                document.hidden ||
                (e
                  ? (ee = requestAnimationFrame(eU))
                  : t < 1 / 0 &&
                    (et = setTimeout(eF, Math.max(0, (t - l) * 1e3) + 5))));
          }
          function eF() {
            ee ||
              eo ||
              er.on ||
              !el ||
              document.hidden ||
              (clearTimeout(et), (en = ea()), (ee = requestAnimationFrame(eU)));
          }
          function eD(e) {
            let t = F.getBoundingClientRect();
            return [e.clientX - t.left, e.clientY - t.top];
          }
          function eY(e, t) {
            (eh && ei.push([eh[0], eh[1], e[0], e[1]]), (eh = e), eF());
          }
          function eR() {
            ((eh = null), eF());
          }
          (F.addEventListener("pointermove", (e) => {
            let t = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
            for (let l of t.length ? t : [e]) eY(eD(l), ea());
          }),
            F.addEventListener("pointerdown", (e) => eY(eD(e), ea())),
            F.addEventListener("pointerup", (e) => {
              "mouse" !== e.pointerType && eR();
            }),
            F.addEventListener("pointercancel", eR),
            F.addEventListener("pointerleave", eR));
          let eZ = new ResizeObserver(() => {
            (eM(), eE(ea()), eF());
          });
          eZ.observe(e);
          let eq = new IntersectionObserver((e) => {
            (el = e[0].isIntersecting) && eF();
          });
          eq.observe(e);
          let eI = () => {
            document.hidden || eF();
          };
          document.addEventListener("visibilitychange", eI);
          let eC =
              "function" == typeof matchMedia
                ? matchMedia("(prefers-color-scheme: dark)")
                : null,
            eK = () => {
              let e = Y();
              e !== R && ((R = e), eE(ea()), eF());
            };
          eC && eC.addEventListener && eC.addEventListener("change", eK);
          let eO =
            "u" > typeof MutationObserver ? new MutationObserver(eK) : null;
          function eT() {
            let e = a[E.font];
            if (!e || !e.google || "u" < typeof document || !document.fonts)
              return Promise.resolve();
            !(function (e) {
              let t = a[e];
              if (!t || !t.google || "u" < typeof document) return;
              let l = `reel-font-${e.replace(/\W+/g, "-")}`;
              if (document.getElementById(l)) return;
              let o = document.createElement("link");
              ((o.id = l),
                (o.rel = "stylesheet"),
                (o.href = `https://fonts.googleapis.com/css2?family=${t.google}&display=swap`),
                document.head.appendChild(o));
            })(E.font);
            let t = E.font;
            return Promise.race([
              document.fonts.load(`${Math.round(E.weight)} 40px "${e.family}"`),
              new Promise((e) => setTimeout(e, 4e3)),
            ])
              .catch(() => {})
              .then(() => {
                eo || E.font !== t || (eM(), eE(ea()), eF());
              });
          }
          return (
            eO &&
              eO.observe(document.documentElement, {
                attributes: !0,
                attributeFilter: ["class", "style", "data-theme"],
              }),
            ev(),
            eE(ea()),
            Promise.all([
              (function () {
                if (m) return m;
                if (
                  "u" < typeof document ||
                  "u" < typeof FontFace ||
                  !document.fonts
                )
                  return (m = Promise.resolve());
                let e = (e) => `url(data:font/woff2;base64,${e})`;
                return (m = Promise.race([
                  Promise.all(
                    [
                      new FontFace(
                        "ReelMono",
                        e(
                          "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",
                        ),
                        { weight: "400" },
                      ),
                      new FontFace(
                        "ReelMono",
                        e(
                          "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",
                        ),
                        { weight: "700" },
                      ),
                      new FontFace(
                        "ReelMath",
                        e(
                          "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",
                        ),
                        { weight: "100 900" },
                      ),
                    ].map((e) =>
                      e
                        .load()
                        .then((e) => document.fonts.add(e))
                        .catch(() => {}),
                    ),
                  ),
                  new Promise((e) => setTimeout(e, 4e3)),
                ]).then(() => {}));
              })(),
              r.fontsReady || null,
            ]).then(() => {
              !eo && ((_ = !0), eM(), eE(ea()), eT(), r.onReady && r.onReady());
            }),
            {
              ok: !0,
              canvas: F,
              effect: V,
              set(e) {
                let t = d(e || {}),
                  l = !1,
                  o = !1;
                for (let e in t)
                  "effect" !== e &&
                    e in i &&
                    E[e] !== t[e] &&
                    ((E[e] = t[e]),
                    A.has(e) && (l = !0),
                    "font" === e && (o = !0));
                ("appearance" in t && (R = Y()),
                  l ? ev() : "widen" in t && eM(),
                  o && eT(),
                  eE(ea()),
                  eF());
              },
              values: () => Object.assign({}, E),
              setViewZoom(e) {
                let t = v(Number(e) || 1, 0.25, 4);
                t !== C && ((C = t), eM(), eE(ea()), eF());
              },
              dark: () => R,
              dispose() {
                ((eo = !0),
                  ee && cancelAnimationFrame(ee),
                  clearTimeout(et),
                  eZ.disconnect(),
                  eq.disconnect(),
                  document.removeEventListener("visibilitychange", eI),
                  eC &&
                    eC.removeEventListener &&
                    eC.removeEventListener("change", eK),
                  eO && eO.disconnect(),
                  F.remove());
              },
              debug: {
                freeze(e) {
                  ((er.on = !0),
                    (er.t = e || 0),
                    (en = er.t),
                    ee && cancelAnimationFrame(ee),
                    (ee = 0),
                    clearTimeout(et));
                },
                step(e) {
                  er.t += e;
                  let t = er.t,
                    l = t - en;
                  ((en = t), ek(l, t), eE(t));
                },
                thaw() {
                  ((er.on = !1), (en = ea()), eF());
                },
                reset() {
                  ((ei = []), (eh = null), ev(), eE(ea()));
                },
                move: (e, t) => eY([e, t], ea()),
                leave: eR,
                ready: () => _,
                state: () => ({
                  px: Q,
                  pitch: L,
                  adv: X,
                  H: O,
                  rows: j.length,
                  characters: H.length,
                  on: H.filter((e) => e.on).length,
                  held: H.filter((e) => e.held).length,
                  away: H.filter((e) => "home" !== e.st).length,
                  reels: H.filter((e) => e.reel).length,
                  an: H.filter((e) => e.an).length,
                  drops: ef.length,
                  swinging: H.filter((e) => e.th).length,
                  runs: W.filter((e) => e.run).length,
                  dial: N.filter((e) => e.dial).length,
                }),
              },
            }
          );
        },
        "defaultsFor",
        0,
        f,
      ],
      278089,
    );
  global.ReelEngine = __exports;
  if (typeof module !== "undefined" && module.exports) module.exports = __exports;
})(typeof window !== "undefined" ? window : globalThis);
