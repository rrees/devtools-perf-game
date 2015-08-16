var defs = {

  teamColor: ["#ff4444", "#00aaff"],

  frozenSprite: [193, 86, 11, 19],

  buttons: {
    "fighter": [4, 345, 64, 64],
    "speed": [132, 345, 64, 64],
    "life": [68, 345, 64, 64],
    "damage": [196, 345, 64, 64]
  },

  ships: {

    "fighter": {

      preference: ["small"],
      cooldown: 0.5,
      damage: 1,
      hp: 10,
      sprite: [407, 18, 32, 32],
      price: 1,
      speed: 80

    },

    "freelancer": {

      cooldown: 0.5,
      damage: 1,
      hp: 10,
      sprite: [367, 59, 31, 32],
      speed: 80

    },


    "creep1": {

      preference: ["big"],
      damage: 2,
      cooldown: 2,
      hp: 4,
      sprite: [444, 23, 22, 21],
      price: 5,
      speed: 60

    },

    "creep2": {

      preference: ["big"],
      damage: 2,
      cooldown: 2,
      hp: 10,
      sprite: [471, 23, 32, 23],
      price: 5,
      speed: 80

    },

    "creep3": {

      preference: ["big"],
      damage: 4,
      cooldown: 2,
      hp: 30,
      sprite: [503, 19, 32, 29],
      price: 5,
      speed: 50

    },

    "creep4": {

      preference: ["big"],
      damage: 6,
      cooldown: 2,
      hp: 50,
      sprite: [535, 18, 32, 32],
      price: 5,
      speed: 50

    },

    "boss": {

      damage: 10,
      cooldown: 2,
      hp: 500,
      sprite: [456, 53, 64, 64],
      speed: 32,
      boss: true

    }

  },

  tooltips: {

    "fighter": "build a fighter",
    "speed": "upgrade fighters speed",
    "life": "upgrade fighters life",
    "damage": "upgrade fighters damage"

  },

  bonuses: {
    shield: "asteroids shield",
    laser: "cursor laser",
    magnet: "coin magnet"
  },


  downloadLinks: {

    "ffdev": ["Learn more about Performance Tools in Developer Edition", "https://hacks.mozilla.org/?utm_source=codepen&utm_medium=referral&utm_campaign=firefox-developer-game&utm_content=learn-perf-tools"],
    "default": ["Get Firefox Developer Edition to try out the new performance tools", "https://www.mozilla.org/firefox/developer/?utm_source=codepen&utm_medium=referral&utm_campaign=firefox-developer-game&utm_content=game-promo"]

  }

};
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new
Date();a=s.createElement(o),

m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49796218-26', 'auto');
ga('send', 'pageview');
var Utils = {

  extend: function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  },

  distance: function(a, b) {

    var dx = a.x - b.x;
    var dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);

  },

  nearest: function(from, entities) {

    var min = -1;
    var result = null;

    for (var i = 0; i < entities.length; i++) {

      var to = entities[i];

      if (from === to) continue;

      var distance = this.distance(from, to);

      if (distance < min || min < 0) {
        min = distance;
        result = to;
      }

    }

    return result;
  },

  circWrap: function(val) {

    return this.wrap(val, 0, Math.PI * 2);

  },

  wrap: function(value, min, max) {

    if (value < min) return max + (value % max);
    if (value >= max) return value % max;
    return value;

  },

  wrapTo: function(value, target, max, step) {

    if (value === target) return target;

    var result = value;

    var d = this.wrappedDistance(value, target, max);

    if (Math.abs(d) < step) return target;

    result += (d < 0 ? -1 : 1) * step;

    if (result > max) {
      result = result - max;
    } else if (result < 0) {
      result = max + result;
    }

    return result;

  },

  circWrapTo: function(value, target, step) {

    return this.wrapTo(value, target, Math.PI * 2, step);

  },

  circDistance: function(a, b) {

    return this.wrappedDistance(a, b, Math.PI * 2);

  },

  wrappedDistance: function(a, b, max) {

    if (a === b) return 0;
    else if (a < b) {
      var l = -a - max + b;
      var r = b - a;
    } else {
      var l = b - a;
      var r = max - a + b;
    }

    if (Math.abs(l) > Math.abs(r)) return r;
    else return l;

  },

  random: function(a, b) {

    if (a === undefined) {

      return Math.random();

    } else if (b !== undefined) {

      return Math.floor(a + Math.random() * Math.abs(b - a + 1));

    } else {

      if (a instanceof Array) return a[(a.length + 1) * Math.random() - 1 | 0];
      else {
        return a[this.random(Object.keys(a))];
      }

    }

  },

  sincos: function(angle, radius) {

    if (arguments.length === 1) {
      radius = angle;
      angle = Math.random() * 6.28;
    }

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  },

  ground: function(num, threshold) {

    return (num / threshold | 0) * threshold;

  },

  shuffle: function(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },

  sign: function(value) {

    return value / Math.abs(value);

  },

  moveTo: function(value, target, step) {

    if (value < target) {
      value += step;
      if (value > target) value = target;
    }

    if (value > target) {
      value -= step;
      if (value < target) value = target;
    }

    return value;

  },

  interval: function(key, interval, object) {

    if (!object.throttles) object.throttles = {};
    if (!object.throttles[key]) object.throttles[key] = object.lifetime - interval;

    if (object.lifetime - object.throttles[key] >= interval) {
      object.throttles[key] = object.lifetime;
      return true;
    } else return false;

  },

  moveInDirection: function(direction, value) {

    this.x += Math.cos(direction) * value;
    this.y += Math.sin(direction) * value;

  },

  osc: function(time, period) {

    return Math.sin(Math.PI * (time % period / period));

  },

  filter: function(array, test) {

    var result = [];

    for (var i = 0; i < array.length; i++) {
      if (test(array[i])) result.push(array[i]);
    }

    return result;

  },

  rectInRect: function(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return !(r2x > r1x + r1w ||
      r2x + r2w < r1x ||
      r2y > r1y + r1h ||
      r2y + r2h < r1y);
  }



};
/* file: license.txt */

/*

  PlaygroundJS r4

  http://playgroundjs.com

  (c) 2012-2015 http://rezoner.net

  Playground may be freely distributed under the MIT license.

  latest major changes:

  r4

  + tweens with events
  + context argument for events

  r3

  + pointer = mouse + touch

*/


/* file: src/lib/Ease.js */

/*

  Ease 1.0

  http://canvasquery.com

  (c) 2015 by Rezoner - http://rezoner.net

  `ease` may be freely distributed under the MIT license.

*/

(function() {

  var ease = function(progress, easing) {

    if (typeof ease.cache[easing] === "function") {

      return ease.cache[easing](progress);

    } else {

      return ease.spline(progress, easing || ease.defaultEasing);

    }

  };

  var extend = function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  };

  extend(ease, {

    defaultEasing: "016",

    cache: {

      linear: function(t) {
        return t
      },

      inQuad: function(t) {
        return t * t
      },
      outQuad: function(t) {
        return t * (2 - t)
      },
      inOutQuad: function(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      },
      inCubic: function(t) {
        return t * t * t
      },
      outCubic: function(t) {
        return (--t) * t * t + 1
      },
      inOutCubic: function(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      },
      inQuart: function(t) {
        return t * t * t * t
      },
      outQuart: function(t) {
        return 1 - (--t) * t * t * t
      },
      inOutQuart: function(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
      },
      inQuint: function(t) {
        return t * t * t * t * t
      },
      outQuint: function(t) {
        return 1 + (--t) * t * t * t * t
      },
      inOutQuint: function(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
      },
      inSine: function(t) {
        return -1 * Math.cos(t / 1 * (Math.PI * 0.5)) + 1;
      },
      outSine: function(t) {
        return Math.sin(t / 1 * (Math.PI * 0.5));
      },
      inOutSine: function(t) {
        return -1 / 2 * (Math.cos(Math.PI * t) - 1);
      },
      inExpo: function(t) {
        return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
      },
      outExpo: function(t) {
        return (t == 1) ? 1 : (-Math.pow(2, -10 * t) + 1);
      },
      inOutExpo: function(t) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
      },
      inCirc: function(t) {
        return -1 * (Math.sqrt(1 - t * t) - 1);
      },
      outCirc: function(t) {
        return Math.sqrt(1 - (t = t - 1) * t);
      },
      inOutCirc: function(t) {
        if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      },
      inElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if (t == 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
      },
      outElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if (t == 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
      },
      inOutElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if ((t /= 1 / 2) == 2) return 1;
        if (!p) p = (0.3 * 1.5);
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
      },
      inBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        return 1 * t * t * ((s + 1) * t - s);
      },
      outBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
      },
      inOutBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
        return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
      },
      inBounce: function(t) {
        return 1 - this.outBounce(1 - t);
      },
      outBounce: function(t) {
        if ((t /= 1) < (1 / 2.75)) {
          return (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
          return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
        } else if (t < (2.5 / 2.75)) {
          return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
        } else {
          return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
        }
      },
      inOutBounce: function(t) {
        if (t < 1 / 2) return this.inBounce(t * 2) * 0.5;
        return this.outBounce(t * 2 - 1) * 0.5 + 0.5;
      }
    },

    translateEasing: function(key) {

      if (!this.cache[key]) {
        var array = key.split('');

        var sign = 1;
        var signed = false;

        for (var i = 0; i < array.length; i++) {

          var char = array[i];

          if (char === "-") {
            sign = -1;
            signed = true;
            array.splice(i--, 1);
          } else if (char === "+") {
            sign = 1;
            array.splice(i--, 1);
          } else array[i] = parseInt(array[i], 16) * sign;

        }

        var min = Math.min.apply(null, array);
        var max = Math.max.apply(null, array);
        var diff = max - min;
        var cache = [];
        var normalized = [];

        for (var i = 0; i < array.length; i++) {
          if (signed) {
            var diff = Math.max(Math.abs(min), Math.abs(max))
            normalized.push((array[i]) / diff);
          } else {
            var diff = max - min;
            normalized.push((array[i] - min) / diff);
          }
        }

        this.cache[key] = normalized;

      }

      return this.cache[key]

    },

    /*

      Cubic-spline interpolation by Ivan Kuckir

      http://blog.ivank.net/interpolation-with-cubic-splines.html

      With slight modifications by Morgan Herlocker

      https://github.com/morganherlocker/cubic-spline

    */

    splineK: {},
    splineX: {},
    splineY: {},

    insertIntermediateValues: function(a) {
      var result = [];
      for (var i = 0; i < a.length; i++) {
        result.push(a[i]);

        if (i < a.length - 1) result.push(a[i + 1] + (a[i] - a[i + 1]) * 0.6);
      }

      return result;
    },

    spline: function(x, key) {

      if (!this.splineK[key]) {

        var xs = [];
        var ys = this.translateEasing(key);

        // ys = this.insertIntermediateValues(ys);

        if (!ys.length) return 0;

        for (var i = 0; i < ys.length; i++) xs.push(i * (1 / (ys.length - 1)));

        var ks = xs.map(function() {
          return 0
        });

        ks = this.getNaturalKs(xs, ys, ks);

        this.splineX[key] = xs;
        this.splineY[key] = ys;
        this.splineK[key] = ks;

      }

      if (x > 1) return this.splineY[key][this.splineY[key].length - 1];

      var ks = this.splineK[key];
      var xs = this.splineX[key];
      var ys = this.splineY[key];

      var i = 1;

      while (xs[i] < x) i++;

      var t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
      var a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
      var b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
      var q = (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);

      /*
      var py = ys[i - 2];
      var cy = ys[i - 1];
      var ny = (i < ys.length - 1) ? ys[i] : ys[i - 1];

      if (q > ny) {
        var diff = (q - py);
        //q = py + diff;

      }

    if (cy === ny && cy === py) q = py;
    */


      return q;
    },

    getNaturalKs: function(xs, ys, ks) {
      var n = xs.length - 1;
      var A = this.zerosMat(n + 1, n + 2);

      for (var i = 1; i < n; i++) // rows
      {
        A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
        A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
        A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
        A[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
      }

      A[0][0] = 2 / (xs[1] - xs[0]);
      A[0][1] = 1 / (xs[1] - xs[0]);
      A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

      A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
      A[n][n] = 2 / (xs[n] - xs[n - 1]);
      A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

      return this.solve(A, ks);
    },

    solve: function(A, ks) {
      var m = A.length;
      for (var k = 0; k < m; k++) // column
      {
        // pivot for column
        var i_max = 0;
        var vali = Number.NEGATIVE_INFINITY;
        for (var i = k; i < m; i++)
          if (A[i][k] > vali) {
            i_max = i;
            vali = A[i][k];
          }
        this.splineSwapRows(A, k, i_max);

        // for all rows below pivot
        for (var i = k + 1; i < m; i++) {
          for (var j = k + 1; j < m + 1; j++)
            A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
          A[i][k] = 0;
        }
      }
      for (var i = m - 1; i >= 0; i--) // rows = columns
      {
        var v = A[i][m] / A[i][i];
        ks[i] = v;
        for (var j = i - 1; j >= 0; j--) // rows
        {
          A[j][m] -= A[j][i] * v;
          A[j][i] = 0;
        }
      }
      return ks;
    },

    zerosMat: function(r, c) {
      var A = [];
      for (var i = 0; i < r; i++) {
        A.push([]);
        for (var j = 0; j < c; j++) A[i].push(0);
      }
      return A;
    },

    splineSwapRows: function(m, k, l) {
      var p = m[k];
      m[k] = m[l];
      m[l] = p;
    }
  });

  window.ease = ease;

})();


/* file: src/Playground.js */

PLAYGROUND = {};

function playground(args) {

  return new PLAYGROUND.Application(args);

};

/* file: src/Utils.js */

PLAYGROUND.Utils = {

  extend: function() {

    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];

  },

  merge: function(a) {

    for (var i = 1; i < arguments.length; i++) {

      var b = arguments[i];

      for (var key in b) {

        var value = b[key];

        if (typeof a[key] !== "undefined") {
          if (typeof a[key] === "object") this.merge(a[key], value);
          else a[key] = value;
        } else {
          a[key] = value;
        }
      }
    }
    return a;

  },

  invoke: function(object, methodName) {

    var args = Array.prototype.slice.call(arguments, 2);

    for (var i = 0; i < object.length; i++) {
      var current = object[i];

      if (current[methodName]) current[methodName].apply(current, args);

    }

  },

  throttle: function(fn, threshold) {
    threshold || (threshold = 250);
    var last,
      deferTimer;
    return function() {
      var context = this;

      var now = +new Date,
        args = arguments;
      if (last && now < last + threshold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

};

PLAYGROUND.Utils.ease = ease;


/* file: src/Events.js */

PLAYGROUND.Events = function() {

  this.listeners = {};

};

PLAYGROUND.Events.prototype = {

  on: function(event, callback, context) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.on(key, event[key], context)
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    var listener = {
      once: false,
      callback: callback,
      context: context
    };

    this.listeners[event].push(listener);

    return listener;
  },

  once: function(event, callback, context) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.once(key, event[key], context)
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    var listener = {
      once: true,
      callback: callback,
      context: context
    };

    this.listeners[event].push(listener);

    return listener;
  },

  off: function(event, callback) {

    for (var i = 0, len = this.listeners[event].length; i < len; i++) {
      if (this.listeners[event][i]._remove) {
        this.listeners[event].splice(i--, 1);
        len--;
      }
    }

  },

  trigger: function(event, data) {

    /* if you prefer events pipe */

    if (this.listeners["event"]) {

      for (var i = 0, len = this.listeners["event"].length; i < len; i++) {

        var listener = this.listeners["event"][i];

        listener.callback.call(listener.context || this, event, data);

      }

    }

    /* or subscribed to single event */

    if (this.listeners[event]) {
      for (var i = 0, len = this.listeners[event].length; i < len; i++) {

        var listener = this.listeners[event][i];

        listener.callback.call(listener.context || this, data);

        if (listener.once) {
          this.listeners[event].splice(i--, 1);
          len--;
        }
      }
    }

  }

};

/* file: src/States.js */

PLAYGROUND.States = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  app.on("step", this.step.bind(this));

};

PLAYGROUND.States.prototype = {

  step: function(delta) {

    if (!this.next) return;

    if (this.current && this.current.locked) return;

    var state = this.next;

    if (typeof state === "function") state = new state;

    /* create state if object has never been used as a state before */

    if (!state.__created) {

      state.__created = true;

      state.app = this.app;

      this.trigger("createstate", {
        state: state
      });

      if (state.create) state.create();

    }

    /* enter new state */

    if (this.current) {
      this.trigger("leavestate", {
        prev: this.current,
        next: state,
        state: this.current
      });
    }

    this.trigger("enterstate", {
      prev: this.current,
      next: state,
      state: state
    });

    this.current = state;

    if (this.current && this.current.enter) {
      this.current.enter();
    }

    this.app.state = this.current;

    this.next = false;


  },

  set: function(state) {

    if (this.current && this.current.leave) this.current.leave();

    this.next = state;

    this.step(0);

  }


};

PLAYGROUND.Utils.extend(PLAYGROUND.States.prototype, PLAYGROUND.Events.prototype);

/* file: src/Application.js */

PLAYGROUND.Application = function(args) {

  var app = this;

  /* events */

  PLAYGROUND.Events.call(this);

  /* defaults */

  PLAYGROUND.Utils.merge(this, this.defaults, args);

  /* guess scaling mode */

  this.autoWidth = this.width ? false : true;
  this.autoHeight = this.height ? false : true;
  this.autoScale = this.scale ? false : true;

  /* get container */

  if (!this.container) this.container = document.body;

  if (this.container !== document.body) this.customContainer = true;

  if (typeof this.container === "string") this.container = document.querySelector(this.container);

  this.updateSize();

  /* events */

  // this.emitLocalEvent = this.emitLocalEvent.bind(this);
  // this.emitGlobalEvent = this.emitGlobalEvent.bind(this);

  /* states manager */

  this.states = new PLAYGROUND.States(this);
  this.states.on("event", this.emitLocalEvent, this);

  /* mouse */

  this.mouse = new PLAYGROUND.Mouse(this, this.container);
  this.mouse.on("event", this.emitGlobalEvent, this);

  /* touch */

  this.touch = new PLAYGROUND.Touch(this, this.container);
  this.touch.on("event", this.emitGlobalEvent, this);

  /* keyboard */

  this.keyboard = new PLAYGROUND.Keyboard();
  this.keyboard.on("event", this.emitGlobalEvent, this);

  /* gamepads */

  this.gamepads = new PLAYGROUND.Gamepads(this);
  this.gamepads.on("event", this.emitGlobalEvent, this);

  /* tweens */

  this.tweens = new PLAYGROUND.TweenManager(this);

  /* ease */

  this.ease = PLAYGROUND.Utils.ease;

  /* sound */

  PLAYGROUND.Sound(this);

  /* window resize */

  window.addEventListener("resize", this.handleResize.bind(this));

  /* visilibitychange */

  document.addEventListener("visibilitychange", function() {
    var hidden = document.visibilityState == 'hidden';
    app.emitGlobalEvent("visibilitychange", hidden);
  });

  /* assets containers */

  this.images = {};
  this.atlases = {};
  this.data = {};

  this.loader = new PLAYGROUND.Loader(this);

  this.loadFoo(0.25);

  /* create plugins in the same way */

  this.plugins = [];

  for (var key in PLAYGROUND) {

    var property = PLAYGROUND[key];

    if (property.plugin) this.plugins.push(new property(this));

  }

  /* flow */

  this.emitGlobalEvent("preload");

  this.firstBatch = true;

  function onPreloadEnd() {

    app.loadFoo(0.25);

    /* run everything in the next frame */

    setTimeout(function() {

      app.emitLocalEvent("create");

      app.setState(PLAYGROUND.DefaultState);
      app.handleResize();
      app.setState(PLAYGROUND.LoadingScreen);

      /* game loop */

      PLAYGROUND.GameLoop(app);

    });

    /* stage proper loading step */

    app.loader.once("ready", function() {

      app.firstBatch = false;

      app.setState(PLAYGROUND.DefaultState);

      app.emitLocalEvent("ready");
      app.handleResize();


    });


  };


  this.loader.once("ready", onPreloadEnd);

};

PLAYGROUND.Application.prototype = {

  defaults: {
    smoothing: 1,
    paths: {
      base: "",
      images: "images/"
    },
    offsetX: 0,
    offsetY: 0
  },

  setState: function(state) {

    this.states.set(state);

  },

  getPath: function(to) {

    return this.paths.base + (this.paths[to] || (to + "/"));

  },

  getAssetEntry: function(path, folder, defaultExtension) {

    /* translate folder according to user provided paths
       or leave as is */

    var folder = this.paths[folder] || (folder + "/");

    var fileinfo = path.match(/(.*)\..*/);
    var key = fileinfo ? fileinfo[1] : path;

    var temp = path.split(".");
    var basename = path;

    if (temp.length > 1) {
      var ext = temp.pop();
      path = temp.join(".");
    } else {
      var ext = defaultExtension;
      basename += "." + defaultExtension;
    }

    return {
      key: key,
      url: this.paths.base + folder + basename,
      path: this.paths.base + folder + path,
      ext: ext
    };

  },

  /* events that shouldn't flow down to the state */

  emitLocalEvent: function(event, data) {

    this.trigger(event, data);

    if ((!this.firstBatch || this.loader.ready) && this[event]) this[event](data);

  },

  /* events that should be passed to the state */

  emitGlobalEvent: function(event, data) {

    if (!this.state) return this.emitLocalEvent(event, data);

    this.trigger(event, data);

    if ((!this.firstBatch || this.loader.ready) && this.event) this.event(event, data);

    if ((!this.firstBatch || this.loader.ready) && this[event]) this[event](data);

    if (this.state.event) this.state.event(event, data);

    if (this.state[event]) this.state[event](data);

    this.trigger("post" + event, data);

    // if (this.state.proxy) this.state.proxy(event, data);

  },

  updateSize: function() {

    if (this.customContainer) {

      var containerWidth = this.container.offsetWidth;
      var containerHeight = this.container.offsetHeight;

    } else {

      var containerWidth = window.innerWidth;
      var containerHeight = window.innerHeight;

    }

    if (!this.autoScale && !this.autoWidth && !this.autoHeight) {

    } else if (!this.autoHeight && this.autoWidth) {

      if (this.autoScale) this.scale = containerHeight / this.height;

      this.width = Math.ceil(containerWidth / this.scale);

    } else if (!this.autoWidth && this.autoHeight) {

      if (this.autoScale) this.scale = containerWidth / this.width;

      this.height = Math.ceil(containerHeight / this.scale);


    } else if (this.autoWidth && this.autoHeight && this.autoScale) {

      this.scale = 1;
      this.width = containerWidth;
      this.height = containerHeight;

    } else if (this.autoWidth && this.autoHeight) {

      this.width = Math.ceil(containerWidth / this.scale);
      this.height = Math.ceil(containerHeight / this.scale);

    } else {

      this.scale = Math.min(containerWidth / this.width, containerHeight / this.height);

    }

    this.offsetX = (containerWidth - this.width * this.scale) / 2 | 0;
    this.offsetY = (containerHeight - this.height * this.scale) / 2 | 0;

    this.center = {
      x: this.width / 2 | 0,
      y: this.height / 2 | 0
    };

  },

  handleResize: PLAYGROUND.Utils.throttle(function() {

    this.updateSize();

    this.mouse.handleResize();
    this.touch.handleResize();

    this.emitGlobalEvent("resize", {});

  }, 16),

  /*
    request a file over http
    it shall be later an abstraction using 'fs' in node-webkit

    returns a promise
  */

  request: function(url) {

    function promise(success, fail) {

      var request = new XMLHttpRequest();

      var app = this;

      request.open("GET", url, true);

      request.onload = function(event) {

        var xhr = event.target;

        if (xhr.status !== 200 && xhr.status !== 0) {

          return fail(new Error("Failed to get " + url));

        }

        success(xhr);

      }

      request.send();

    }

    return new Promise(promise);

  },

  /* imaginary timeout to delay loading */

  loadFoo: function(timeout) {

    var loader = this.loader;

    this.loader.add("foo " + timeout);

    setTimeout(function() {
      loader.success("foo " + timeout);
    }, timeout * 1000);

  },

  /* data/json */

  loadData: function() {

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      if (typeof arg === "object") {

        for (var key in arg) this.loadData(arg[key]);

      } else {

        this.loadDataItem(arg);

      }

    }

  },

  loadDataItem: function(name) {

    var entry = this.getAssetEntry(name, "data", "json");

    var app = this;

    this.loader.add();

    this.request(entry.url).then(processData);

    function processData(request) {

      if (entry.ext === "json") {
        app.data[entry.key] = JSON.parse(request.responseText);
      } else {
        app.data[entry.key] = request.responseText;
      }

      app.loader.success(entry.url);

    }

  },

  /* images */

  loadImage: function() {

    return this.loadImages.apply(this, arguments);

  },

  loadImages: function() {

    var promises = [];

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      /* polymorphism at its finest */

      if (typeof arg === "object") {

        for (var key in arg) promises = promises.concat(this.loadImages(arg[key]));

      } else {

        promises.push(this.loadOneImage(arg));

      }

    }

    return Promise.all(promises);

  },

  loadOneImage: function(name) {

    var app = this;

    if (!this._imageLoaders) this._imageLoaders = {};

    if (!this._imageLoaders[name]) {

      var promise = function(resolve, reject) {

        /* if argument is not an object/array let's try to load it */

        var loader = app.loader;

        var entry = app.getAssetEntry(name, "images", "png");

        app.loader.add(entry.path);

        var image = app.images[entry.key] = new Image;

        image.addEventListener("load", function() {

          resolve(image);
          loader.success(entry.url);

        });

        image.addEventListener("error", function() {

          reject("can't load " + entry.url);
          loader.error(entry.url);

        });

        image.src = entry.url;

      };

      app._imageLoaders[name] = new Promise(promise);

    }

    return this._imageLoaders[name];

  },

  render: function() {

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Application.prototype, PLAYGROUND.Events.prototype);



/* file: src/GameLoop.js */

PLAYGROUND.GameLoop = function(app) {

  app.lifetime = 0;
  app.ops = 0;
  app.opcost = 0;

  var lastTick = Date.now();
  var frame = 0;
  var unbounded = false;

  function render(dt) {

    app.emitGlobalEvent("render", dt)
    app.emitGlobalEvent("postrender", dt)

  };

  function step(dt) {

    app.emitGlobalEvent("step", dt)

  };

  function gameLoop() {
    if (requestId == 0) { // Window is blurred
      return;
    }

    if (!app.unbound) {
      if (app.immidiate) {
        setZeroTimeout(gameLoop);
      } else {
        requestId = requestAnimationFrame(gameLoop);
      }
    }

    var delta = Date.now() - lastTick;

    lastTick = Date.now();

    if (app.unbound) {
      delta = 20;
    }

    if (delta > 1000) return;

    var dt = delta / 1000;

    app.lifetime += dt;
    app.elapsed = dt;

    step(dt);

    render(dt);

    if (app.unbound && !unbounded) {
      unbounded = true;
      while (app.unbound) {
        gameLoop();
      }
      unbounded = false;
    }

  };

  window.addEventListener('blur', function() {
    if (requestId != 0) {
      cancelAnimationFrame(requestId);
      app.emitGlobalEvent("visibilitychange", true);
      requestId = 0;
    }
  });

  window.addEventListener('focus', function() {
    if (!requestId) {
      requestId = requestAnimationFrame(gameLoop);
      app.emitGlobalEvent("visibilitychange", false);
    }
  });

  var requestId = requestAnimationFrame(gameLoop);

};

// Copyright dbaron, via http://dbaron.org/log/20100309-faster-timeouts
// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
(function() {
  var timeouts = [];
  var messageName = "zero-timeout-message";

  // Like setTimeout, but only takes a function argument.  There's
  // no time argument (always zero) and no arguments (you have to
  // use a closure).
  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {

    if (event.source == window && event.data == messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        var fn = timeouts.shift();
        fn();
      }
    }

  }

  window.addEventListener("message", handleMessage, true);

  // Add the one thing we want added to the window object.
  window.setZeroTimeout = setZeroTimeout;
})();

/* file: src/Gamepads.js */

PLAYGROUND.Gamepads = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;

  this.gamepadmoveEvent = {};
  this.gamepaddownEvent = {};
  this.gamepadupEvent = {};

  this.gamepads = {};

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.Gamepads.prototype = {

  buttons: {
    0: "1",
    1: "2",
    2: "3",
    3: "4",
    4: "l1",
    5: "r1",
    6: "l2",
    7: "r2",
    8: "select",
    9: "start",
    12: "up",
    13: "down",
    14: "left",
    15: "right"
  },

  zeroState: function() {

    var buttons = [];

    for (var i = 0; i <= 15; i++) {
      buttons.push({
        pressed: false,
        value: 0
      });
    }

    return {
      axes: [],
      buttons: buttons
    };

  },

  createGamepad: function() {

    var result = {
      buttons: {},
      sticks: [{
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }]
    };


    for (var i = 0; i < 16; i++) {
      var key = this.buttons[i];
      result.buttons[key] = false;
    }

    return result;

  },

  step: function() {

    if (!navigator.getGamepads) return;

    var gamepads = navigator.getGamepads();

    for (var i = 0; i < gamepads.length; i++) {

      var current = gamepads[i];

      if (!current) continue;

      if (!this[i]) this[i] = this.createGamepad();

      /* have to concat the current.buttons because the are read-only */

      var buttons = [].concat(current.buttons);

      /* hack for missing  dpads */

      for (var h = 12; h <= 15; h++) {
        if (!buttons[h]) buttons[h] = {
          pressed: false,
          value: 0
        };
      }

      var previous = this[i];

      /* axes (sticks) to buttons */

      if (current.axes) {

        if (current.axes[0] < 0) buttons[14].pressed = true;
        if (current.axes[0] > 0) buttons[15].pressed = true;
        if (current.axes[1] < 0) buttons[12].pressed = true;
        if (current.axes[1] > 0) buttons[13].pressed = true;

        previous.sticks[0].x = current.axes[0].value;
        previous.sticks[0].y = current.axes[1].value;
        previous.sticks[1].x = current.axes[2].value;
        previous.sticks[1].y = current.axes[3].value;

      }

      /* check buttons changes */

      for (var j = 0; j < buttons.length; j++) {

        var key = this.buttons[j];

        /* gamepad down */

        if (buttons[j].pressed && !previous.buttons[key]) {

          previous.buttons[key] = true;
          this.gamepaddownEvent.button = this.buttons[j];
          this.gamepaddownEvent.gamepad = i;
          this.trigger("gamepaddown", this.gamepaddownEvent);

        }

        /* gamepad up */
        else if (!buttons[j].pressed && previous.buttons[key]) {

          previous.buttons[key] = false;
          this.gamepadupEvent.button = this.buttons[j];
          this.gamepadupEvent.gamepad = i;
          this.trigger("gamepadup", this.gamepadupEvent);

        }

      }

    }

  }
};

PLAYGROUND.Utils.extend(PLAYGROUND.Gamepads.prototype, PLAYGROUND.Events.prototype);


/* file: src/Keyboard.js */

PLAYGROUND.Keyboard = function() {

  PLAYGROUND.Events.call(this);

  this.keys = {};

  document.addEventListener("keydown", this.keydown.bind(this));
  document.addEventListener("keyup", this.keyup.bind(this));
  document.addEventListener("keypress", this.keypress.bind(this));

  this.keydownEvent = {};
  this.keyupEvent = {};

  this.preventDefault = true;

};

PLAYGROUND.Keyboard.prototype = {

  keycodes: {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "delete",
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "capslock",
    27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock",
    186: "semicolon",
    187: "equal",
    188: "comma",
    189: "dash",
    190: "period",
    191: "slash",
    192: "graveaccent",
    219: "openbracket",
    220: "backslash",
    221: "closebraket",
    222: "singlequote"
  },

  keypress: function(e) {

  },

  keydown: function(e) {
    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    if (this.keys[keyName]) return;

    this.keydownEvent.key = keyName;
    this.keydownEvent.original = e;

    this.keys[keyName] = true;

    this.trigger("keydown", this.keydownEvent);

    if (this.preventDefault && document.activeElement === document.body) {
      e.returnValue = false;
      e.keyCode = 0;
      e.preventDefault();
      e.stopPropagation();
    }
  },

  keyup: function(e) {

    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    this.keyupEvent.key = keyName;
    this.keyupEvent.original = e;

    this.keys[keyName] = false;

    this.trigger("keyup", this.keyupEvent);
  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Keyboard.prototype, PLAYGROUND.Events.prototype);



/* file: src/Pointer.js */

PLAYGROUND.Pointer = function(app) {

  this.app = app;

  app.on("touchstart", this.touchstart, this);
  app.on("touchend", this.touchend, this);
  app.on("touchmove", this.touchmove, this);

  app.on("mousemove", this.mousemove, this);
  app.on("mousedown", this.mousedown, this);
  app.on("mouseup", this.mouseup, this);

  this.pointers = app.pointers = {};

};

PLAYGROUND.Pointer.plugin = true;

PLAYGROUND.Pointer.prototype = {

  updatePointer: function(pointer) {

    this.pointers[pointer.id] = pointer;

  },

  removePointer: function(pointer) {

    delete this.pointers[pointer.id];

  },

  touchstart: function(e) {

    e.touch = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointerdown", e);

  },

  touchend: function(e) {

    e.touch = true;

    this.removePointer(e);

    this.app.emitGlobalEvent("pointerup", e);

  },

  touchmove: function(e) {

    e.touch = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousemove: function(e) {

    e.mouse = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousedown: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerdown", e);

  },

  mouseup: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerup", e);

  },

  mousewheel: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerwheel", e);

  }

};

/* file: src/Loader.js */

/* Loader */

PLAYGROUND.Loader = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.reset();

};

PLAYGROUND.Loader.prototype = {

  /* loader */

  add: function(id) {

    this.queue++;
    this.count++;
    this.ready = false;
    this.trigger("add", id);

    return id;

  },

  error: function(id) {

    this.trigger("error", id);

  },

  success: function(id) {

    this.queue--;

    this.progress = 1 - this.queue / this.count;

    this.trigger("load", id);

    if (this.queue <= 0) {
      this.trigger("ready");
      this.reset();
    }

  },

  reset: function() {

    this.progress = 0;
    this.queue = 0;
    this.count = 0;
    this.ready = true;

  }
};

PLAYGROUND.Utils.extend(PLAYGROUND.Loader.prototype, PLAYGROUND.Events.prototype);

/* file: src/Mouse.js */

PLAYGROUND.Mouse = function(app, element) {

  var self = this;

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.element = element;

  this.buttons = {};

  this.preventContextMenu = true;

  this.mousemoveEvent = {};
  this.mousedownEvent = {};
  this.mouseupEvent = {};
  this.mousewheelEvent = {};

  this.x = 0;
  this.y = 0;

  element.addEventListener("mousemove", this.mousemove.bind(this));
  element.addEventListener("mousedown", this.mousedown.bind(this));
  element.addEventListener("mouseup", this.mouseup.bind(this));

  this.enableMousewheel();

  this.element.addEventListener("contextmenu", function(e) {
    if (self.preventContextMenu) e.preventDefault();
  });

  element.requestPointerLock = element.requestPointerLock ||
    element.mozRequestPointerLock ||
    element.webkitRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;


  this.handleResize();
};

PLAYGROUND.Mouse.prototype = {

  lock: function() {

    this.locked = true;
    this.element.requestPointerLock();

  },

  unlock: function() {

    this.locked = false;
    document.exitPointerLock();

  },

  getElementOffset: function(element) {

    var offsetX = 0;
    var offsetY = 0;

    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    }

    while ((element = element.offsetParent));

    return {
      x: offsetX,
      y: offsetY
    };

  },

  handleResize: function() {

    this.elementOffset = this.getElementOffset(this.element);

  },

  mousemove: PLAYGROUND.Utils.throttle(function(e) {

    this.x = this.mousemoveEvent.x = (e.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
    this.y = this.mousemoveEvent.y = (e.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

    this.mousemoveEvent.original = e;

    if (this.locked) {
      this.mousemoveEvent.movementX = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;

      this.mousemoveEvent.movementY = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;
    }

    if (this.app.mouseToTouch) {
      //      if (this.left) {
      this.mousemoveEvent.id = this.mousemoveEvent.identifier = 255;
      this.trigger("touchmove", this.mousemoveEvent);
      //      }
    } else {
      this.mousemoveEvent.id = this.mousemoveEvent.identifier = 255;
      this.trigger("mousemove", this.mousemoveEvent);
    }

  }, 16),

  mousedown: function(e) {

    var buttonName = ["left", "middle", "right"][e.button];

    this.mousedownEvent.x = this.mousemoveEvent.x;
    this.mousedownEvent.y = this.mousemoveEvent.y;
    this.mousedownEvent.button = buttonName;
    this.mousedownEvent.original = e;

    this[buttonName] = true;

    this.mousedownEvent.id = this.mousedownEvent.identifier = 255;

    if (this.app.mouseToTouch) {
      this.trigger("touchmove", this.mousedownEvent);
      this.trigger("touchstart", this.mousedownEvent);
    } else {
      this.trigger("mousedown", this.mousedownEvent);
    }

  },

  mouseup: function(e) {

    var buttonName = ["left", "middle", "right"][e.button];

    this.mouseupEvent.x = this.mousemoveEvent.x;
    this.mouseupEvent.y = this.mousemoveEvent.y;
    this.mouseupEvent.button = buttonName;
    this.mouseupEvent.original = e;

    this.mouseupEvent.id = this.mouseupEvent.identifier = 255;

    if (this.app.mouseToTouch) {

      this.trigger("touchend", this.mouseupEvent);

    } else {

      this.trigger("mouseup", this.mouseupEvent);

    }

    this[buttonName] = false;

  },

  mousewheel: function(e) {

    this.mousewheelEvent.x = this.mousemoveEvent.x;
    this.mousewheelEvent.y = this.mousemoveEvent.y;
    this.mousewheelEvent.button = ["none", "left", "middle", "right"][e.button];
    this.mousewheelEvent.original = e;
    this.mousewheelEvent.id = this.mousewheelEvent.identifier = 255;

    this[e.button] = false;

    this.trigger("mousewheel", this.mousewheelEvent);

  },


  enableMousewheel: function() {

    var eventNames = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var callback = this.mousewheel.bind(this);
    var self = this;

    for (var i = eventNames.length; i;) {

      self.element.addEventListener(eventNames[--i], PLAYGROUND.Utils.throttle(function(event) {

        var orgEvent = event || window.event,
          args = [].slice.call(arguments, 1),
          delta = 0,
          deltaX = 0,
          deltaY = 0,
          absDelta = 0,
          absDeltaXY = 0,
          fn;

        orgEvent.type = "mousewheel";

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
          delta = orgEvent.wheelDelta;
        }

        if (orgEvent.detail) {
          delta = orgEvent.detail * -1;
        }

        // New school wheel delta (wheel event)
        if (orgEvent.deltaY) {
          deltaY = orgEvent.deltaY * -1;
          delta = deltaY;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
          deltaY = orgEvent.wheelDeltaY;
        }

        var result = delta ? delta : deltaY;

        self.mousewheelEvent.x = self.mousemoveEvent.x;
        self.mousewheelEvent.y = self.mousemoveEvent.y;
        self.mousewheelEvent.delta = result / Math.abs(result);
        self.mousewheelEvent.original = orgEvent;

        callback(self.mousewheelEvent);

        orgEvent.preventDefault();

      }, 40), false);
    }

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Mouse.prototype, PLAYGROUND.Events.prototype);

/* file: src/Sound.js */

PLAYGROUND.Sound = function(app) {

  var audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

  if (audioContext) {

    if (!PLAYGROUND.audioContext) PLAYGROUND.audioContext = new audioContext;

    app.audioContext = PLAYGROUND.audioContext;
    app.sound = new PLAYGROUND.SoundWebAudioAPI(app, app.audioContext);
    app.music = new PLAYGROUND.SoundWebAudioAPI(app, app.audioContext);

  } else {

    app.sound = new PLAYGROUND.SoundAudio(app);
    app.music = new PLAYGROUND.SoundAudio(app);

  }

};

PLAYGROUND.Application.prototype.playSound = function(key, loop) {

  return this.sound.play(key, loop);

};

PLAYGROUND.Application.prototype.stopSound = function(sound) {

  this.sound.stop(sound);

};

PLAYGROUND.Application.prototype.loadSound = function() {

  return this.loadSounds.apply(this, arguments);

};

PLAYGROUND.Application.prototype.loadSounds = function() {

  for (var i = 0; i < arguments.length; i++) {

    var arg = arguments[i];

    /* polymorphism at its finest */

    if (typeof arg === "object") {

      for (var key in arg) this.loadSounds(arg[key]);

    } else {
      this.sound.load(arg);
    }
  }

};

/* file: src/SoundWebAudioAPI.js */

PLAYGROUND.SoundWebAudioAPI = function(app, audioContext) {

  this.app = app;

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.app.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

  this.context = audioContext;

  this.gainNode = this.context.createGain()
  this.gainNode.connect(this.context.destination);

  this.compressor = this.context.createDynamicsCompressor();
  this.compressor.connect(this.gainNode);

  this.output = this.gainNode;

  this.gainNode.gain.value = 1.0;

  this.pool = [];
  this.volume = 1.0;

  this.setMasterPosition(0, 0, 0);

  this.loops = [];

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.SoundWebAudioAPI.prototype = {

  buffers: {},
  aliases: {},

  alias: function(alias, source, volume, rate) {

    this.aliases[alias] = {
      source: source,
      volume: volume,
      rate: rate
    };

  },

  setMaster: function(volume) {

    this.volume = volume;

    this.gainNode.gain.value = volume;

  },

  load: function(file) {

    var entry = this.app.getAssetEntry(file, "sounds", this.audioFormat);

    var sampler = this;

    var request = new XMLHttpRequest();

    request.open("GET", entry.url, true);
    request.responseType = "arraybuffer";

    var id = this.app.loader.add(entry.url);

    request.onload = function() {

      sampler.context.decodeAudioData(this.response, function(decodedBuffer) {
        sampler.buffers[entry.key] = decodedBuffer;
        sampler.app.loader.success(entry.url);
      });

    }

    request.send();

  },

  cleanArray: function(array, property) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === null || (property && array[i][property])) {
        array.splice(i--, 1);
        len--;
      }
    }
  },

  setMasterPosition: function(x, y, z) {

    this.masterPosition = {
      x: x,
      y: y,
      z: z
    };

    this.context.listener.setPosition(x, y, z)
      // this.context.listener.setOrientation(0, 0, -1, 0, 1, 0);
      // this.context.listener.dopplerFactor = 1;
      // this.context.listener.speedOfSound = 343.3;
  },

  getSoundBuffer: function() {
    if (!this.pool.length) {
      for (var i = 0; i < 100; i++) {

        var buffer, gain, panner;

        var nodes = [
          buffer = this.context.createBufferSource(),
          gain = this.context.createGain(),
          panner = this.context.createPanner()
        ];

        panner.distanceModel = "linear";

        // 1 - rolloffFactor * (distance - refDistance) / (maxDistance - refDistance)
        // refDistance / (refDistance + rolloffFactor * (distance - refDistance))
        panner.refDistance = 1;
        panner.maxDistance = 600;
        panner.rolloffFactor = 1.0;


        // panner.setOrientation(-1, -1, 0);

        this.pool.push(nodes);

        nodes[0].connect(nodes[1]);
        // nodes[1].connect(nodes[2]);
        nodes[1].connect(this.output);
      }
    }

    return this.pool.pop();
  },

  play: function(name, loop) {

    var alias = this.aliases[name];

    var nodes = this.getSoundBuffer();

    if (alias) name = alias.source;

    bufferSource = nodes[0];
    bufferSource.gainNode = nodes[1];
    bufferSource.pannerNode = nodes[2];
    bufferSource.buffer = this.buffers[name];
    bufferSource.loop = loop || false;
    bufferSource.key = name;

    bufferSource.alias = alias;

    this.setVolume(bufferSource, 1.0);
    this.setPlaybackRate(bufferSource, 1.0);

    if (this.loop) {
      //  bufferSource.loopStart = this.loopStart;
      // bufferSource.loopEnd = this.loopEnd;
    }


    bufferSource.start(0);

    bufferSource.volumeLimit = 1;

    this.setPosition(bufferSource, this.masterPosition.x, this.masterPosition.y, this.masterPosition.z);

    return bufferSource;
  },

  stop: function(what) {

    if (!what) return;

    what.stop(0);

  },

  setPlaybackRate: function(sound, rate) {

    if (!sound) return;

    if (sound.alias) rate *= sound.alias.rate;

    return sound.playbackRate.value = rate;
  },

  setPosition: function(sound, x, y, z) {

    if (!sound) return;

    sound.pannerNode.setPosition(x, y || 0, z || 0);
  },

  setVelocity: function(sound, x, y, z) {

    if (!sound) return;

    sound.pannerNode.setPosition(x, y || 0, z || 0);

  },

  getVolume: function(sound) {

    if (!sound) return;

    return sound.gainNode.gain.value;

  },

  setVolume: function(sound, volume) {

    if (!sound) return;

    if (sound.alias) volume *= sound.alias.volume;

    return sound.gainNode.gain.value = Math.max(0, volume);
  },

  fadeOut: function(sound) {

    if (!sound) return;

    sound.fadeOut = true;

    this.loops.push(sound);

    return sound;

  },

  fadeIn: function(sound) {

    if (!sound) return;

    sound.fadeIn = true;

    this.loops.push(sound);
    this.setVolume(sound, 0);


    return sound;

  },

  step: function(delta) {

    for (var i = 0; i < this.loops.length; i++) {

      var loop = this.loops[i];

      if (loop.fadeIn) {
        var volume = this.getVolume(loop);
        volume = this.setVolume(loop, Math.min(1.0, volume + delta * 0.5));

        if (volume >= 1.0) {
          this.loops.splice(i--, 1);
        }
      }

      if (loop.fadeOut) {
        var volume = this.getVolume(loop);
        volume = this.setVolume(loop, Math.min(1.0, volume - delta * 0.5));

        if (volume <= 0) {
          this.loops.splice(i--, 1);
          this.stop(loop);
        }
      }

    }

  }

};

/* file: src/SoundAudio.js */

PLAYGROUND.SoundAudio = function(app) {

  this.app = app;

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.app.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

};

PLAYGROUND.SoundAudio.prototype = {

  samples: {},

  setMaster: function(volume) {

    this.volume = volume;

  },

  setMasterPosition: function() {

  },

  setPosition: function(x, y, z) {
    return;
  },

  load: function(file) {

    var url = "sounds/" + file + "." + this.audioFormat;

    var loader = this.app.loader;

    this.app.loader.add(url);

    var audio = this.samples[file] = new Audio;

    audio.addEventListener("canplay", function() {
      loader.success(url);
    });

    audio.addEventListener("error", function() {
      loader.error(url);
    });

    audio.src = url;

  },

  play: function(key, loop) {

    var sound = this.samples[key];

    sound.currentTime = 0;
    sound.loop = loop;
    sound.play();

    return sound;

  },

  stop: function(what) {

    if (!what) return;

    what.pause();

  },

  step: function(delta) {

  },

  setPlaybackRate: function(sound, rate) {

    return;
  },

  setVolume: function(sound, volume) {

    sound.volume = volume * this.volume;

  },

  setPosition: function() {

  }

};

/* file: src/Touch.js */

PLAYGROUND.Touch = function(app, element) {

  PLAYGROUND.Events.call(this);

  this.app = app;

  this.element = element;

  this.buttons = {};

  this.touches = {};

  this.x = 0;
  this.y = 0;

  element.addEventListener("touchmove", this.touchmove.bind(this));
  element.addEventListener("touchstart", this.touchstart.bind(this));
  element.addEventListener("touchend", this.touchend.bind(this));

};

PLAYGROUND.Touch.prototype = {

  getElementOffset: function(element) {

    var offsetX = 0;
    var offsetY = 0;

    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    }

    while ((element = element.offsetParent));

    return {
      x: offsetX,
      y: offsetY
    };

  },

  handleResize: function() {

    this.elementOffset = this.getElementOffset(this.element);

  },

  touchmove: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];

      touchmoveEvent = {}

      this.x = touchmoveEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      this.y = touchmoveEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchmoveEvent.original = touch;
      touchmoveEvent.id = touchmoveEvent.identifier = touch.identifier;

      this.touches[touch.identifier].x = touchmoveEvent.x;
      this.touches[touch.identifier].y = touchmoveEvent.y;

      this.trigger("touchmove", touchmoveEvent);

    }

    e.preventDefault();

  },

  touchstart: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];

      var touchstartEvent = {}

      this.x = touchstartEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      this.y = touchstartEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchstartEvent.original = e.touch;
      touchstartEvent.id = touchstartEvent.identifier = touch.identifier;

      this.touches[touch.identifier] = {
        x: touchstartEvent.x,
        y: touchstartEvent.y
      };

      this.trigger("touchstart", touchstartEvent);

    }

    e.preventDefault();

  },

  touchend: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];
      var touchendEvent = {};

      touchendEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      touchendEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchendEvent.original = touch;
      touchendEvent.id = touchendEvent.identifier = touch.identifier;

      delete this.touches[touch.identifier];

      this.trigger("touchend", touchendEvent);

    }

    e.preventDefault();

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Touch.prototype, PLAYGROUND.Events.prototype);

/* file: src/Tween.js */

PLAYGROUND.Tween = function(manager, context) {

  PLAYGROUND.Events.call(this);

  this.manager = manager;
  this.context = context;

  PLAYGROUND.Utils.extend(this, {

    actions: [],
    index: -1,

    prevEasing: "045",
    prevDuration: 0.5

  });

  this.current = false;

};

PLAYGROUND.Tween.prototype = {

  add: function(properties, duration, easing) {

    if (duration) this.prevDuration = duration;
    else duration = 0.5;
    if (easing) this.prevEasing = easing;
    else easing = "045";

    this.actions.push([properties, duration, easing]);

    return this;

  },

  discard: function() {

    this.manager.discard(this.context, this);

    return this;

  },

  to: function(properties, duration, easing) {
    return this.add(properties, duration, easing);
  },

  loop: function() {

    this.looped = true;

    return this;

  },

  repeat: function(times) {

    this.actions.push(["repeat", times]);

  },

  wait: function(time) {

    this.actions.push(["wait", time]);

    return this;

  },

  delay: function(time) {

    this.actions.push(["wait", time]);

  },

  stop: function() {

    this.manager.remove(this);

    return this;

  },

  play: function() {

    this.manager.add(this);

    this.finished = false;

    return this;

  },


  end: function() {

    var lastAnimationIndex = 0;

    for (var i = this.index + 1; i < this.actions.length; i++) {
      if (typeof this.actions[i][0] === "object") lastAnimationIndex = i;
    }

    this.index = lastAnimationIndex - 1;
    this.next();
    this.delta = this.duration;
    this.step(0);

    return this;

  },

  forward: function() {

    this.delta = this.duration;
    this.step(0);

  },

  rewind: function() {

    this.delta = 0;
    this.step(0);

  },

  next: function() {

    this.delta = 0;

    this.index++;

    if (this.index >= this.actions.length) {

      if (this.looped) {

        this.trigger("loop", {
          tween: this
        });

        this.index = 0;
      } else {

        this.trigger("finished", {
          tween: this
        });

        this.finished = true;
        this.manager.remove(this);
        return;
      }
    }

    this.current = this.actions[this.index];

    if (this.current[0] === "wait") {

      this.duration = this.current[1];
      this.currentAction = "wait";

    } else {

      /* calculate changes */

      var properties = this.current[0];

      /* keep keys as array for 0.0001% performance boost */

      this.keys = Object.keys(properties);

      this.change = [];
      this.before = [];
      this.types = [];

      for (i = 0; i < this.keys.length; i++) {
        var key = this.keys[i];

        if (typeof this.context[key] === "number") {
          this.before.push(this.context[key]);
          this.change.push(properties[key] - this.context[key]);
          this.types.push(0);
        } else {
          var before = cq.color(this.context[key]);

          this.before.push(before);

          var after = cq.color(properties[key]);

          var temp = [];

          for (var j = 0; j < 3; j++) {
            temp.push(after[j] - before[j]);
          }

          this.change.push(temp);

          this.types.push(1);
        }

      }

      this.currentAction = "animate";

      this.duration = this.current[1];
      this.easing = this.current[2];

    }


  },

  prev: function() {

  },

  step: function(delta) {

    this.delta += delta;

    if (!this.current) this.next();

    switch (this.currentAction) {

      case "animate":
        this.doAnimate(delta);
        break;

      case "wait":
        this.doWait(delta);
        break;

    }

    if (this.onstep) this.onstep(this.context);

  },

  doAnimate: function(delta) {

    this.progress = Math.min(1, this.delta / this.duration);

    var mod = PLAYGROUND.Utils.ease(this.progress, this.easing);

    for (var i = 0; i < this.keys.length; i++) {

      var key = this.keys[i];

      switch (this.types[i]) {

        /* number */

        case 0:

          this.context[key] = this.before[i] + this.change[i] * mod;

          break;

          /* color */

        case 1:

          var change = this.change[i];
          var before = this.before[i];
          var color = [];

          for (var j = 0; j < 3; j++) {
            color.push(before[j] + change[j] * mod | 0);
          }

          this.context[key] = "rgb(" + color.join(",") + ")";

          break;
      }
    }

    if (this.progress >= 1) {
      this.next();
    }

  },

  doWait: function(delta) {

    if (this.delta >= this.duration) this.next();

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Tween.prototype, PLAYGROUND.Events.prototype);

PLAYGROUND.TweenManager = function(app) {

  this.tweens = [];

  if (app) {
    this.app = app;
    this.app.tween = this.tween.bind(this);
  }

  this.delta = 0;

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.TweenManager.prototype = {

  defaultEasing: "128",

  discard: function(object, safe) {

    for (var i = 0; i < this.tweens.length; i++) {

      var tween = this.tweens[i];

      if (tween.context === object && tween !== safe) this.remove(tween);

    }

  },

  tween: function(context) {

    var tween = new PLAYGROUND.Tween(this, context);

    this.add(tween);

    return tween;

  },

  step: function(delta) {

    this.delta += delta;

    for (var i = 0; i < this.tweens.length; i++) {

      var tween = this.tweens[i];

      if (!tween._remove) tween.step(delta);

      if (tween._remove) this.tweens.splice(i--, 1);

    }

  },

  add: function(tween) {

    tween._remove = false;

    var index = this.tweens.indexOf(tween);

    if (index === -1) this.tweens.push(tween);

  },

  remove: function(tween) {

    tween._remove = true;

  }

};

/* file: src/Atlases.js */

PLAYGROUND.Application.prototype.loadAtlases = function() {

  for (var i = 0; i < arguments.length; i++) {

    var arg = arguments[i];

    /* polymorphism at its finest */

    if (typeof arg === "object") {

      for (var key in arg) this.loadAtlases(arg[key]);

    } else {

      /* if argument is not an object/array let's try to load it */

      this._loadAtlas(arg)

    }
  }

};

PLAYGROUND.Application.prototype.loadAtlas = function() {

  return this.loadAtlases.apply(this, arguments);

};

PLAYGROUND.Application.prototype._loadAtlas = function(filename) {

  var entry = this.getAssetEntry(filename, "atlases", "png");

  this.loader.add(entry.url);

  var atlas = this.atlases[entry.key] = {};

  var image = atlas.image = new Image;

  image.addEventListener("load", function() {
    loader.success(entry.url);
  });

  image.addEventListener("error", function() {
    loader.error(entry.url);
  });

  image.src = entry.url;

  /* data */

  var request = new XMLHttpRequest();

  request.open("GET", entry.path + ".json", true);

  this.loader.add(entry.path + ".json");

  var loader = this.loader;

  request.onload = function() {

    var data = JSON.parse(this.response);

    atlas.frames = [];

    for (var i = 0; i < data.frames.length; i++) {
      var frame = data.frames[i];

      atlas.frames.push({
        region: [frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h],
        offset: [frame.spriteSourceSize.x || 0, frame.spriteSourceSize.y || 0],
        width: frame.sourceSize.w,
        height: frame.sourceSize.h
      });
    }

    loader.success(entry.path + ".json");

  }

  request.send();
};

/* file: src/Fonts.js */

PLAYGROUND.Application.prototype.loadFont = function(name) {

  var styleNode = document.createElement("style");
  styleNode.type = "text/css";

  var formats = {
    "woff": "woff",
    "ttf": "truetype"
  };

  var sources = "";

  for (var ext in formats) {
    var type = formats[ext];
    sources += " url(\"fonts/" + name + "." + ext + "\") format('" + type + "');"
  }

  styleNode.textContent = "@font-face { font-family: '" + name + "'; src: " + sources + " }";

  document.head.appendChild(styleNode);

  var layer = cq(32, 32);

  layer.font("10px Testing");
  layer.fillText(16, 16, 16).trim();

  var width = layer.width;
  var height = layer.height;

  this.loader.add("font " + name);

  var self = this;

  function check() {

    var layer = cq(32, 32);

    layer.font("10px " + name).fillText(16, 16, 16);
    layer.trim();

    if (layer.width !== width || layer.height !== height) {

      self.loader.ready("font " + name);

    } else {

      setTimeout(check, 250);

    }

  };

  check();

};

/* file: src/DefaultState.js */

PLAYGROUND.DefaultState = {

};

/* file: src/LoadingScreen.js */

PLAYGROUND.LoadingScreen = {

  /* basic loading screen using DOM */

  logoRaw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",

  create: function() {

    var self = this;

    this.logo = new Image;

    this.logo.addEventListener("load", function() {
      self.ready = true;
      self.createElements();
    });

    this.logo.src = this.logoRaw;

    this.background = "#000";

    if (window.getComputedStyle) {
      this.background = window.getComputedStyle(document.body).backgroundColor || "#000";
    }


  },

  enter: function() {

    this.current = 0;

  },

  leave: function() {

    this.locked = true;

    this.animation = this.app.tween(this)
      .to({
        current: 1
      }, 0.5);

  },

  step: function(delta) {

    if (this.locked) {

      if (this.animation.finished) {
        this.locked = false;
        this.wrapper.parentNode.removeChild(this.wrapper);
      }

    } else {

      this.current = this.current + Math.abs(this.app.loader.progress - this.current) * delta;
    }

  },

  createElements: function() {

    this.width = window.innerWidth * 0.6 | 0;
    this.height = window.innerHeight * 0.1 | 0;

    this.wrapper = document.createElement("div");
    this.wrapper.style.width = this.width + "px";
    this.wrapper.style.height = this.height + "px";
    this.wrapper.style.background = "#000";
    this.wrapper.style.border = "4px solid #fff";
    this.wrapper.style.position = "absolute";
    this.wrapper.style.left = (window.innerWidth / 2 - this.width / 2 | 0) + "px";
    this.wrapper.style.top = (window.innerHeight / 2 - this.height / 2 | 0) + "px";
    this.wrapper.style.zIndex = 100;

    this.app.container.appendChild(this.wrapper);

    this.progressBar = document.createElement("div");
    this.progressBar.style.width = "0%";
    this.progressBar.style.height = this.height + "px";
    this.progressBar.style.background = "#fff";

    this.wrapper.appendChild(this.progressBar);

  },


  render: function() {

    if (!this.ready) return;

    this.progressBar.style.width = (this.current * 100 | 0) + "%";


  }

};

/* file: src/lib/CanvasQuery.js */

/*

  Canvas Query r2

  http://canvasquery.com

  (c) 2012-2015 http://rezoner.net

  Canvas Query may be freely distributed under the MIT license.

  ! fixed color parsers

*/


(function() {

  var COCOONJS = false;

  var Canvas = window.HTMLCanvasElement;
  var Image = window.HTMLImageElement;
  var COCOONJS = navigator.isCocoonJS;

  var cq = function(selector) {
    if (arguments.length === 0) {
      var canvas = cq.createCanvas(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", function() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
      });
    } else if (typeof selector === "string") {
      var canvas = document.querySelector(selector);
    } else if (typeof selector === "number") {
      var canvas = cq.createCanvas(arguments[0], arguments[1]);
    } else if (selector instanceof Image) {
      var canvas = cq.createCanvas(selector);
    } else if (selector instanceof cq.Layer) {
      return selector;
    } else {
      var canvas = selector;
    }

    return new cq.Layer(canvas);
  };

  cq.lineSpacing = 1.0;
  cq.defaultFont = "Arial";

  cq.cocoon = function(selector) {
    if (arguments.length === 0) {
      var canvas = cq.createCocoonCanvas(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", function() {});
    } else if (typeof selector === "string") {
      var canvas = document.querySelector(selector);
    } else if (typeof selector === "number") {
      var canvas = cq.createCocoonCanvas(arguments[0], arguments[1]);
    } else if (selector instanceof Image) {
      var canvas = cq.createCocoonCanvas(selector);
    } else if (selector instanceof cq.Layer) {
      return selector;
    } else {
      var canvas = selector;
    }

    return new cq.Layer(canvas);
  }

  /* fast.js */

  cq.fastApply = function(subject, thisContext, args) {

    switch (args.length) {
      case 0:
        return subject.call(thisContext);
      case 1:
        return subject.call(thisContext, args[0]);
      case 2:
        return subject.call(thisContext, args[0], args[1]);
      case 3:
        return subject.call(thisContext, args[0], args[1], args[2]);
      case 4:
        return subject.call(thisContext, args[0], args[1], args[2], args[3]);
      case 5:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
      case 8:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
      case 9:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
      default:
        return subject.apply(thisContext, args);
    }

  };

  cq.extend = function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  };

  cq.augment = function() {
    for (var i = 1; i < arguments.length; i++) {
      _.extend(arguments[0], arguments[i]);
      arguments[i](arguments[0]);
    }
  };

  cq.distance = function(x1, y1, x2, y2) {
    if (arguments.length > 2) {
      var dx = x1 - x2;
      var dy = y1 - y2;

      return Math.sqrt(dx * dx + dy * dy);
    } else {
      return Math.abs(x1 - y1);
    }
  };

  cq.extend(cq, {

    smoothing: true,

    blend: function(below, above, mode, mix) {

      if (typeof mix === "undefined") mix = 1;

      var below = cq(below);
      var mask = below.clone();
      var above = cq(above);

      below.save();
      below.globalAlpha(mix);
      below.globalCompositeOperation(mode);
      below.drawImage(above.canvas, 0, 0);
      below.restore();

      mask.save();
      mask.globalCompositeOperation("source-in");
      mask.drawImage(below.canvas, 0, 0);
      mask.restore();

      return mask;
    },

    matchColor: function(color, palette) {
      var rgbPalette = [];

      for (var i = 0; i < palette.length; i++) {
        rgbPalette.push(cq.color(palette[i]));
      }

      var imgData = cq.color(color);

      var difList = [];
      for (var j = 0; j < rgbPalette.length; j++) {
        var rgbVal = rgbPalette[j];
        var rDif = Math.abs(imgData[0] - rgbVal[0]),
          gDif = Math.abs(imgData[1] - rgbVal[1]),
          bDif = Math.abs(imgData[2] - rgbVal[2]);
        difList.push(rDif + gDif + bDif);
      }

      var closestMatch = 0;
      for (var j = 0; j < palette.length; j++) {
        if (difList[j] < difList[closestMatch]) {
          closestMatch = j;
        }
      }

      return palette[closestMatch];
    },

    temp: function(width, height) {
      if (!this.tempLayer) {
        this.tempLayer = cq(1, 1);
      }

      if (width instanceof Image) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width, 0, 0);
      } else if (width instanceof Canvas) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width, 0, 0);
      } else if (width instanceof CanvasQuery.Layer) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width.canvas, 0, 0);
      } else {
        this.tempLayer.width = width;
        this.tempLayer.height = height;
      }

      return this.tempLayer;
    },

    wrapValue: function(value, min, max) {
      if (value < min) return max + (value % max);
      if (value >= max) return value % max;
      return value;
    },

    limitValue: function(value, min, max) {
      return value < min ? min : value > max ? max : value;
    },

    mix: function(a, b, amount) {
      return a + (b - a) * amount;
    },

    hexToRgb: function(hex) {
      if (hex.length === 7) return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
      else return ['0x' + hex[1] + hex[1] | 0, '0x' + hex[2] + hex[2] | 0, '0x' + hex[3] + hex[3] | 0];
    },

    rgbToHex: function(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
    },

    /* author: http://mjijackson.com/ */

    rgbToHsl: function(r, g, b) {

      if (r instanceof Array) {
        b = r[2];
        g = r[1];
        r = r[0];
      }

      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, l];
    },

    /* author: http://mjijackson.com/ */

    hue2rgb: function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    },

    hslToRgb: function(h, s, l) {
      var r, g, b;

      if (s == 0) {
        r = g = b = l; // achromatic
      } else {

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = this.hue2rgb(p, q, h + 1 / 3);
        g = this.hue2rgb(p, q, h);
        b = this.hue2rgb(p, q, h - 1 / 3);
      }

      return [r * 255 | 0, g * 255 | 0, b * 255 | 0];
    },

    rgbToHsv: function(r, g, b) {
      if (r instanceof Array) {
        b = r[2];
        g = r[1];
        r = r[0];
      }

      r = r / 255, g = g / 255, b = b / 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, v = max;

      var d = max - min;
      s = max == 0 ? 0 : d / max;

      if (max == min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, v];
    },

    hsvToRgb: function(h, s, v) {
      var r, g, b;

      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v, g = t, b = p;
          break;
        case 1:
          r = q, g = v, b = p;
          break;
        case 2:
          r = p, g = v, b = t;
          break;
        case 3:
          r = p, g = q, b = v;
          break;
        case 4:
          r = t, g = p, b = v;
          break;
        case 5:
          r = v, g = p, b = q;
          break;
      }

      return [r * 255, g * 255, b * 255];
    },

    color: function() {
      var result = new cq.Color();
      result.parse(arguments[0], arguments[1]);
      return result;
    },

    poolArray: [],

    pool: function() {

      if (!this.poolArray.length) {
        for (var i = 0; i < 100; i++) {
          this.poolArray.push(this.createCanvas(1, 1));
        }
      }

      return this.poolArray.pop();

    },

    createCanvas: function(width, height) {
      var result = document.createElement("canvas");

      if (arguments[0] instanceof Image || arguments[0] instanceof Canvas) {
        var image = arguments[0];
        result.width = image.width;
        result.height = image.height;
        result.getContext("2d").drawImage(image, 0, 0);
      } else {
        result.width = width;
        result.height = height;
      }


      return result;
    },

    createCocoonCanvas: function(width, height) {
      var result = document.createElement("screencanvas");

      if (arguments[0] instanceof Image) {
        var image = arguments[0];
        result.width = image.width;
        result.height = image.height;
        result.getContext("2d").drawImage(image, 0, 0);
      } else {
        result.width = width;
        result.height = height;
      }

      return result;
    },

    createImageData: function(width, height) {
      return cq.createCanvas(width, height).getContext("2d").createImageData(width, height);
    }

  });

  cq.Layer = function(canvas) {
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.alignX = 0;
    this.alignY = 0;
    this.aligned = false;
    this.update();
  };

  cq.Layer.prototype = {

    update: function() {

      var smoothing = cq.smoothing;

      if (typeof this.smoothing !== "undefined") smoothing = this.smoothing;

      this.context.mozImageSmoothingEnabled = smoothing;
      this.context.msImageSmoothingEnabled = smoothing;
      this.context.imageSmoothingEnabled = smoothing;

      if (COCOONJS) Cocoon.Utils.setAntialias(smoothing);
    },

    appendTo: function(selector) {
      if (typeof selector === "object") {
        var element = selector;
      } else {
        var element = document.querySelector(selector);
      }

      element.appendChild(this.canvas);

      return this;
    },

    a: function(a) {
      if (arguments.length) {
        this.previousAlpha = this.globalAlpha();
        return this.globalAlpha(a);
      } else
        return this.globalAlpha();
    },

    ra: function() {
      return this.a(this.previousAlpha);
    },
    /*
        drawImage: function() {

          if (!this.alignX && !this.alignY) {
            this.context.call
          }

            return this;


        },

        restore: function() {
          this.context.restore();
          this.alignX = 0;
          this.alignY = 0;
        },
        */

    realign: function() {

      this.alignX = this.prevAlignX;
      this.alignY = this.prevAlignY;

      return this;

    },

    align: function(x, y) {

      if (typeof y === "undefined") y = x;

      this.alignX = x;
      this.alignY = y;

      return this;
    },


    /* save translate align rotate scale */

    stars: function(x, y, alignX, alignY, rotation, scaleX, scaleY) {

      if (typeof alignX === "undefined") alignX = 0.5;
      if (typeof alignY === "undefined") alignY = 0.5;
      if (typeof rotation === "undefined") rotation = 0;
      if (typeof scaleX === "undefined") scaleX = 1.0;
      if (typeof scaleY === "undefined") scaleY = scaleX;

      this.save();
      this.translate(x, y);
      this.align(alignX, alignY);
      this.rotate(rotation);
      this.scale(scaleX, scaleY);

      return this;
    },

    tars: function(x, y, alignX, alignY, rotation, scaleX, scaleY) {

      if (typeof alignX === "undefined") alignX = 0.5;
      if (typeof alignY === "undefined") alignY = 0.5;
      if (typeof rotation === "undefined") rotation = 0;
      if (typeof scaleX === "undefined") scaleX = 1.0;
      if (typeof scaleY === "undefined") scaleY = scaleX;

      this.translate(x, y);
      this.align(alignX, alignY);
      this.rotate(rotation);
      this.scale(scaleX, scaleY);

      return this;

    },

    fillRect: function(x, y, w, h) {

      if (this.alignX || this.alignY) {
        x -= w * this.alignX | 0;
        y -= h * this.alignY | 0;
      }

      this.context.fillRect(x, y, w, h);

      return this;

    },

    strokeRect: function(x, y, w, h) {

      if (this.alignX || this.alignY) {
        x -= w * this.alignX | 0;
        y -= h * this.alignY | 0;
      }

      this.context.strokeRect(x, y, w, h);

      return this;

    },

    drawImage: function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {

      if (this.alignX || this.alignY) {
        if (sWidth == null) {
          sx -= image.width * this.alignX | 0;
          sy -= image.height * this.alignY | 0;
        } else {
          dx -= dWidth * this.alignX | 0;
          dy -= dHeight * this.alignY | 0;
        }
      }

      if (sWidth == null) {
        this.context.drawImage(image, sx, sy);
      } else if (dx == null) {
        this.context.drawImage(image, sx, sy, sWidth, sHeight);
      } else {
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      }

      // cq.fastApply(this.context.drawImage, this.context, arguments);

      return this;

    },

    save: function() {
      this.prevAlignX = this.alignX;
      this.prevAlignY = this.alignY;

      this.context.save();

      return this;
    },

    restore: function() {

      this.realign();
      this.context.restore();
      return this;
    },

    drawTile: function(image, x, y, frameX, frameY, frameWidth, frameHeight, frames, frame) {

    },

    drawAtlasFrame: function(atlas, frame, x, y) {

      var frame = atlas.frames[frame];

      this.drawRegion(
        atlas.image,
        frame.region,
        x - frame.width * this.alignX + frame.offset[0] + frame.region[2] * this.alignX, y - frame.height * this.alignY + frame.offset[1] + frame.region[3] * this.alignY
      );

      return this;

    },


    imageFill: function(image, width, height) {

      var scale = Math.max(width / image.width, height / image.height);

      this.save();
      this.scale(scale, scale);
      this.drawImage(image, 0, 0);
      this.restore();

    },

    drawRegion: function(image, region, x, y, scale) {

      scale = scale || 1;

      var dWidth = region[2] * scale | 0;
      var dHeight = region[3] * scale | 0;

      this.context.drawImage(
        image, region[0], region[1], region[2], region[3],
        x - dWidth * this.alignX | 0, y - dHeight * this.alignY | 0, dWidth, dHeight
      );

      return this;
    },

    cache: function() {

      return this.clone().canvas;

    },

    blendOn: function(what, mode, mix) {

      cq.blend(what, this, mode, mix);

      return this;
      
    },

    posterize: function(pc, inc) {
      pc = pc || 32;
      inc = inc || 4;
      var imgdata = this.getImageData(0, 0, this.width, this.height);
      var data = imgdata.data;

      for (var i = 0; i < data.length; i += inc) {
        data[i] -= data[i] % pc; // set value to nearest of 8 possibilities
        data[i + 1] -= data[i + 1] % pc; // set value to nearest of 8 possibilities
        data[i + 2] -= data[i + 2] % pc; // set value to nearest of 8 possibilities
      }

      this.putImageData(imgdata, 0, 0); // put image data to canvas

      return this;
    },


    bw: function(pc) {
      pc = 128;
      var imgdata = this.getImageData(0, 0, this.width, this.height);
      var data = imgdata.data;
      // 8-bit: rrr ggg bb
      for (var i = 0; i < data.length; i += 4) {
        var v = ((data[i] + data[i + 1] + data[i + 2]) / 3);

        v = (v / 128 | 0) * 128;
        //data[i] = v; // set value to nearest of 8 possibilities
        //data[i + 1] = v; // set value to nearest of 8 possibilities
        data[i + 2] = (v / 255) * data[i]; // set value to nearest of 8 possibilities

      }

      this.putImageData(imgdata, 0, 0); // put image data to canvas
    },

    blend: function(what, mode, mix) {
      if (typeof what === "string") {
        var color = what;
        what = cq(this.canvas.width, this.canvas.height);
        what.fillStyle(color).fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      var result = cq.blend(this, what, mode, mix);

      this.canvas = result.canvas;
      this.context = result.context;

      return this;
    },

    textWithBackground: function(text, x, y, background, padding) {
      var w = this.measureText(text).width;
      var h = this.fontHeight() * 0.8;
      var f = this.fillStyle();
      var padding = padding || 2;

      this.fillStyle(background).fillRect(x - w / 2 - padding * 2, y - padding, w + padding * 4, h + padding * 2)
      this.fillStyle(f).textAlign("center").textBaseline("top").fillText(text, x, y);

      return this;
    },

    fillCircle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      this.context.fill();
      return this;
    },

    strokeCircle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      this.context.stroke();
      return this;
    },

    circle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      return this;
    },

    crop: function(x, y, w, h) {

      if (arguments.length === 1) {

        var y = arguments[0][1];
        var w = arguments[0][2];
        var h = arguments[0][3];
        var x = arguments[0][0];
      }

      var canvas = cq.createCanvas(w, h);
      var context = canvas.getContext("2d");

      context.drawImage(this.canvas, x, y, w, h, 0, 0, w, h);
      this.canvas.width = w;
      this.canvas.height = h;
      this.clear();
      this.context.drawImage(canvas, 0, 0);

      return this;
    },

    set: function(properties) {
      cq.extend(this.context, properties);
    },

    resize: function(width, height) {
      var w = width,
        h = height;

      if (arguments.length === 1) {
        w = arguments[0] * this.canvas.width | 0;
        h = arguments[0] * this.canvas.height | 0;
      } else {

        if (height === false) {
          if (this.canvas.width > width) {
            h = this.canvas.height * (width / this.canvas.width) | 0;
            w = width;
          } else {
            w = this.canvas.width;
            h = this.canvas.height;
          }
        } else if (width === false) {
          if (this.canvas.width > width) {
            w = this.canvas.width * (height / this.canvas.height) | 0;
            h = height;
          } else {
            w = this.canvas.width;
            h = this.canvas.height;
          }
        }
      }

      var cqresized = cq(w, h).drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, w, h);
      this.canvas = cqresized.canvas;
      this.context = cqresized.context;

      return this;
    },

    imageLine: function(image, region, x, y, ex, ey, scale) {
      if (!region) region = [0, 0, image.width, image.height];

      var distance = cq.distance(x, y, ex, ey);
      var count = distance / region[3] + 0.5 | 0;
      var angle = Math.atan2(ey - y, ex - x) + Math.PI / 2;

      this.save();

      this.translate(x, y);
      this.rotate(angle);

      if (scale) this.scale(scale, 1.0);

      for (var i = 0; i <= count; i++) {
        this.drawRegion(image, region, -region[2] / 2 | 0, -region[3] * (i + 1));
      }

      this.restore();

      return this;
    },

    trim: function(color, changes) {
      var transparent;

      if (color) {
        color = cq.color(color).toArray();
        transparent = !color[3];
      } else transparent = true;

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var bound = [this.canvas.width, this.canvas.height, 0, 0];

      var width = this.canvas.width;
      var height = this.canvas.height;

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (transparent) {
          if (!sourcePixels[i + 3]) continue;
        } else if (sourcePixels[i + 0] === color[0] && sourcePixels[i + 1] === color[1] && sourcePixels[i + 2] === color[2]) continue;

        var x = (i / 4 | 0) % this.canvas.width | 0;
        var y = (i / 4 | 0) / this.canvas.width | 0;

        if (x < bound[0]) bound[0] = x;
        if (x > bound[2]) bound[2] = x;

        if (y < bound[1]) bound[1] = y;
        if (y > bound[3]) bound[3] = y;
      }


      if (bound[2] === 0 && bound[3] === 0) {} else {
        if (changes) {
          changes.left = bound[0];
          changes.top = bound[1];

          changes.bottom = height - bound[3];
          changes.right = width - bound[2] - bound[0];

          changes.width = bound[2] - bound[0];
          changes.height = bound[3] - bound[1];
        }

        this.crop(bound[0], bound[1], bound[2] - bound[0] + 1, bound[3] - bound[1] + 1);
      }

      return this;
    },

    matchPalette: function(palette) {
      var imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

      var rgbPalette = [];

      for (var i = 0; i < palette.length; i++) {
        rgbPalette.push(cq.color(palette[i]));
      }


      for (var i = 0; i < imgData.data.length; i += 4) {
        var difList = [];
        if (!imgData.data[i + 3]) continue;

        for (var j = 0; j < rgbPalette.length; j++) {
          var rgbVal = rgbPalette[j];
          var rDif = Math.abs(imgData.data[i] - rgbVal[0]),
            gDif = Math.abs(imgData.data[i + 1] - rgbVal[1]),
            bDif = Math.abs(imgData.data[i + 2] - rgbVal[2]);
          difList.push(rDif + gDif + bDif);
        }

        var closestMatch = 0;

        for (var j = 0; j < palette.length; j++) {
          if (difList[j] < difList[closestMatch]) {
            closestMatch = j;
          }
        }

        var paletteRgb = cq.hexToRgb(palette[closestMatch]);
        imgData.data[i] = paletteRgb[0];
        imgData.data[i + 1] = paletteRgb[1];
        imgData.data[i + 2] = paletteRgb[2];

        /* dithering */
        //imgData.data[i + 3] = (255 * Math.random() < imgData.data[i + 3]) ? 255 : 0;

        //imgData.data[i + 3] = imgData.data[i + 3] > 128 ? 255 : 0;
        /*
        if (i % 3 === 0) {
          imgData.data[i] -= cq.limitValue(imgData.data[i] - 50, 0, 255);
          imgData.data[i + 1] -= cq.limitValue(imgData.data[i + 1] - 50, 0, 255);
          imgData.data[i + 2] -= cq.limitValue(imgData.data[i + 2] - 50, 0, 255);
        }
        */

      }

      this.context.putImageData(imgData, 0, 0);

      return this;
    },

    getPalette: function() {
      var palette = [];
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (sourcePixels[i + 3]) {
          var hex = cq.rgbToHex(sourcePixels[i + 0], sourcePixels[i + 1], sourcePixels[i + 2]);
          if (palette.indexOf(hex) === -1) palette.push(hex);
        }
      }

      return palette;
    },

    mapPalette: function() {

    },

    beginPath: function() {

      this.context.beginPath();

      return this;

    },

    moveTo: function(x, y) {

      this.context.moveTo(x, y);

      return this;

    },

    fillText: function(text, x, y) {

      this.context.fillText(text, x, y);

      return this;

    },

    stroke: function() {

      this.context.stroke();

      return this;

    },

    polygon: function(array) {

      this.beginPath();

      this.moveTo(array[0][0], array[0][1]);

      for (var i = 1; i < array.length; i++) {
        this.lineTo(array[i][0], array[i][1]);
      }

      this.closePath();

      return this;
    },

    fillPolygon: function(polygon) {
      this.beginPath();
      this.polygon(polygon);
      this.fill();
    },

    strokePolygon: function(polygon) {
      this.beginPath();
      this.polygon(polygon);
      this.stroke();
    },

    colorToMask: function(color, inverted) {
      color = cq.color(color).toArray();
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mask = [];

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (sourcePixels[i + 3] > 0) mask.push(inverted ? false : true);
        else mask.push(inverted ? true : false);
      }

      return mask;
    },

    grayscaleToMask: function() {

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mask = [];

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        mask.push(((sourcePixels[i + 0] + sourcePixels[i + 1] + sourcePixels[i + 2]) / 3) / 255);
      }

      return mask;
    },

    applyMask: function(mask) {
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mode = typeof mask[0] === "boolean" ? "bool" : "byte";

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        var value = mask[i / 4];
        sourcePixels[i + 3] = value * 255 | 0;
      }

      this.context.putImageData(sourceData, 0, 0);
      return this;
    },

    fillMask: function(mask) {

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var maskType = typeof mask[0] === "boolean" ? "bool" : "byte";
      var colorMode = arguments.length === 2 ? "normal" : "gradient";

      var color = cq.color(arguments[1]);
      if (colorMode === "gradient") colorB = cq.color(arguments[2]);

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        var value = mask[i / 4];

        if (maskType === "byte") value /= 255;

        if (colorMode === "normal") {
          if (value) {
            sourcePixels[i + 0] = color[0] | 0;
            sourcePixels[i + 1] = color[1] | 0;
            sourcePixels[i + 2] = color[2] | 0;
            sourcePixels[i + 3] = value * 255 | 0;
          }
        } else {
          sourcePixels[i + 0] = color[0] + (colorB[0] - color[0]) * value | 0;
          sourcePixels[i + 1] = color[1] + (colorB[1] - color[1]) * value | 0;
          sourcePixels[i + 2] = color[2] + (colorB[2] - color[2]) * value | 0;
          sourcePixels[i + 3] = 255;
        }
      }

      this.context.putImageData(sourceData, 0, 0);
      return this;
    },

    clear: function(color) {
      if (color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      return this;
    },

    clone: function() {

      // var result = cq.createCanvas(this.canvas);

      var result = cq.pool();
      result.width = this.width;
      result.height = this.height;
      result.getContext("2d").drawImage(this.canvas, 0, 0);

      return cq(result);
    },

    gradientText: function(text, x, y, maxWidth, gradient) {

      var words = text.split(" ");

      var h = this.fontHeight() * 2;

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth) {
            lines[++line] = "";
            ox = 0;
          }

          lines[line] += word;

          ox += wordWidth;
        }
      } else var lines = [text];

      for (var i = 0; i < lines.length; i++) {
        var oy = y + i * h * 0.6 | 0;
        var lingrad = this.context.createLinearGradient(0, oy, 0, oy + h * 0.6 | 0);

        for (var j = 0; j < gradient.length; j += 2) {
          lingrad.addColorStop(gradient[j], gradient[j + 1]);
        }

        var text = lines[i];

        this.fillStyle(lingrad).fillText(text, x, oy);
      }

      return this;
    },

    removeColor: function(color) {

      color = cq.color(color);

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;

      for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {
          var i = (y * this.canvas.width + x) * 4;

          if (pixels[i + 0] === color[0] && pixels[i + 1] === color[1] && pixels[i + 2] === color[2]) {
            pixels[i + 3] = 0;
          }


        }
      }

      this.clear();
      this.context.putImageData(data, 0, 0);

      return this;
    },

    outline: function() {
      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;

      var newData = this.createImageData(this.canvas.width, this.canvas.height);
      var newPixels = newData.data;

      var canvas = this.canvas;

      function check(x, y) {

        if (x < 0) return 0;
        if (x >= canvas.width) return 0;
        if (y < 0) return 0;
        if (y >= canvas.height) return 0;

        var i = (x + y * canvas.width) * 4;

        return pixels[i + 3] > 0;

      }

      for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {

          var full = 0;
          var i = (y * canvas.width + x) * 4;

          if (!pixels[i + 3]) continue;

          full += check(x - 1, y);
          full += check(x + 1, y);
          full += check(x, y - 1);
          full += check(x, y + 1);

          if (full !== 4) {

            newPixels[i] = 255;
            newPixels[i + 1] = 255;
            newPixels[i + 2] = 255;
            newPixels[i + 3] = 255;
          }

        }
      }

      this.context.putImageData(newData, 0, 0);

      return this;
    },

    setHsl: function() {

      if (arguments.length === 1) {
        var args = arguments[0];
      } else {
        var args = arguments;
      }

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        hsl = cq.rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);

        h = args[0] === false ? hsl[0] : cq.limitValue(args[0], 0, 1);
        s = args[1] === false ? hsl[1] : cq.limitValue(args[1], 0, 1);
        l = args[2] === false ? hsl[2] : cq.limitValue(args[2], 0, 1);

        newPixel = cq.hslToRgb(h, s, l);

        pixels[i + 0] = newPixel[0];
        pixels[i + 1] = newPixel[1];
        pixels[i + 2] = newPixel[2];
      }

      this.context.putImageData(data, 0, 0);

      return this;
    },

    shiftHsl: function() {

      if (arguments.length === 1) {
        var args = arguments[0];
      } else {
        var args = arguments;
      }

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        hsl = cq.rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);

        if (pixels[i + 0] !== pixels[i + 1] || pixels[i + 1] !== pixels[i + 2]) {
          h = args[0] === false ? hsl[0] : cq.wrapValue(hsl[0] + args[0], 0, 1);
          s = args[1] === false ? hsl[1] : cq.limitValue(hsl[1] + args[1], 0, 1);
        } else {
          h = hsl[0];
          s = hsl[1];
        }

        l = args[2] === false ? hsl[2] : cq.limitValue(hsl[2] + args[2], 0, 1);

        newPixel = cq.hslToRgb(h, s, l);

        pixels[i + 0] = newPixel[0];
        pixels[i + 1] = newPixel[1];
        pixels[i + 2] = newPixel[2];
      }


      this.context.putImageData(data, 0, 0);

      return this;
    },

    applyColor: function(color) {

      if (COCOONJS) return this;
      this.save();

      this.globalCompositeOperation("source-in");
      this.clear(color);

      this.restore();

      return this;
    },

    negative: function(src, dst) {

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        pixels[i + 0] = 255 - pixels[i + 0];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
      }

      this.context.putImageData(data, 0, 0);

      return this;
    },

    roundRect: function(x, y, width, height, radius) {

      this.beginPath();
      this.moveTo(x + radius, y);
      this.lineTo(x + width - radius, y);
      this.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.lineTo(x + width, y + height - radius);
      this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.lineTo(x + radius, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.lineTo(x, y + radius);
      this.quadraticCurveTo(x, y, x + radius, y);
      this.closePath();

      return this;
    },

    markupText: function(text) {


    },

    wrappedText: function(text, x, y, maxWidth, lineHeight) {

      var words = text.split(" ");

      var lineHeight = lineHeight || this.fontHeight();

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth || words[i] === "\n") {
            lines[++line] = "";
            ox = 0;
          }
          if (words[i] !== "\n") {
            lines[line] += word;

            ox += wordWidth;
          }


        }
      } else {
        var lines = [text];
      }

      for (var i = 0; i < lines.length; i++) {
        var oy = y + i * lineHeight | 0;

        var text = lines[i];

        this.fillText(text, x, oy);
      }

      return this;
    },

    fontHeights: {},

    fontHeight: function() {
      var font = this.font();

      if (!this.fontHeights[font]) {
        var temp = cq(100, 100);
        var height = 0;
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("bottom").fillText("gM", 25, 100);
        temp.trim(false, changes);
        height += changes.bottom;

        var temp = cq(100, 100);
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("top").fillText("gM", 25, 0);
        temp.trim(false, changes);
        height += changes.top;

        var temp = cq(100, 100);
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("alphabetic").fillText("gM", 50, 50);
        temp.trim(false, changes);
        height += temp.height;

        this.fontHeights[font] = height;
      }

      return this.fontHeights[font];
    },

    textBoundaries: function(text, maxWidth) {
      var words = text.split(" ");

      var h = this.fontHeight();

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth || words[i] === "\n") {
            lines[++line] = "";
            ox = 0;
          }

          if (words[i] !== "\n") {
            lines[line] += word;
            ox += wordWidth;
          }
        }
      } else {
        var lines = [text];
        maxWidth = this.measureText(text).width;
      }

      return {
        height: lines.length * h,
        width: maxWidth,
        lines: lines.length,
        lineHeight: h
      }
    },

    repeatImageRegion: function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
      this.save();
      this.rect(dx, dy, dw, dh);
      this.clip();

      for (var x = 0, len = Math.ceil(dw / sw); x < len; x++) {
        for (var y = 0, leny = Math.ceil(dh / sh); y < leny; y++) {
          this.drawImage(image, sx, sy, sw, sh, dx + x * sw, dy + y * sh, sw, sh);
        }
      }

      this.restore();

      return this;
    },

    repeatImage: function(image, x, y, w, h) {
      // if (!env.details) return this;

      if (arguments.length < 9) {
        this.repeatImageRegion(image, 0, 0, image.width, image.height, x, y, w, h);
      } else {
        this.repeatImageRegion.apply(this, arguments);
      }

      return this;
    },

    borderImage: function(image, x, y, w, h, t, r, b, l, fill) {

      // if (!env.details) return this;

      if (typeof t === "object") {

        var bottomLeft = t.bottomLeft || [0, 0, 0, 0];
        var bottomRight = t.bottomRight || [0, 0, 0, 0];
        var topLeft = t.topLeft || [0, 0, 0, 0];
        var topRight = t.topRight || [0, 0, 0, 0];

        var clh = bottomLeft[3] + topLeft[3];
        var crh = bottomRight[3] + topRight[3];
        var ctw = topLeft[2] + topRight[2];
        var cbw = bottomLeft[2] + bottomRight[2];

        t.fillPadding = [0, 0, 0, 0];

        if (t.left) t.fillPadding[0] = t.left[2];
        if (t.top) t.fillPadding[1] = t.top[3];
        if (t.right) t.fillPadding[2] = t.right[2];
        if (t.bottom) t.fillPadding[3] = t.bottom[3];

        // if (!t.fillPadding) t.fillPadding = [0, 0, 0, 0];

        if (t.fill) {
          this.drawImage(image, t.fill[0], t.fill[1], t.fill[2], t.fill[3], x + t.fillPadding[0], y + t.fillPadding[1], w - t.fillPadding[2] - t.fillPadding[0], h - t.fillPadding[3] - t.fillPadding[1]);
        } else {
          // this.fillRect(x + t.fillPadding[0], y + t.fillPadding[1], w - t.fillPadding[2] - t.fillPadding[0], h - t.fillPadding[3] - t.fillPadding[1]);
        }

        if (t.left) this[t.left[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.left[0], t.left[1], t.left[2], t.left[3], x, y + topLeft[3], t.left[2], h - clh);
        if (t.right) this[t.right[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.right[0], t.right[1], t.right[2], t.right[3], x + w - t.right[2], y + topRight[3], t.right[2], h - crh);
        if (t.top) this[t.top[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.top[0], t.top[1], t.top[2], t.top[3], x + topLeft[2], y, w - ctw, t.top[3]);
        if (t.bottom) this[t.bottom[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.bottom[0], t.bottom[1], t.bottom[2], t.bottom[3], x + bottomLeft[2], y + h - t.bottom[3], w - cbw, t.bottom[3]);

        if (t.bottomLeft) this.drawImage(image, t.bottomLeft[0], t.bottomLeft[1], t.bottomLeft[2], t.bottomLeft[3], x, y + h - t.bottomLeft[3], t.bottomLeft[2], t.bottomLeft[3]);
        if (t.topLeft) this.drawImage(image, t.topLeft[0], t.topLeft[1], t.topLeft[2], t.topLeft[3], x, y, t.topLeft[2], t.topLeft[3]);
        if (t.topRight) this.drawImage(image, t.topRight[0], t.topRight[1], t.topRight[2], t.topRight[3], x + w - t.topRight[2], y, t.topRight[2], t.topRight[3]);
        if (t.bottomRight) this.drawImage(image, t.bottomRight[0], t.bottomRight[1], t.bottomRight[2], t.bottomRight[3], x + w - t.bottomRight[2], y + h - t.bottomRight[3], t.bottomRight[2], t.bottomRight[3]);


      } else {


        /* top */
        if (t > 0 && w - l - r > 0) this.drawImage(image, l, 0, image.width - l - r, t, x + l, y, w - l - r, t);

        /* bottom */
        if (b > 0 && w - l - r > 0) this.drawImage(image, l, image.height - b, image.width - l - r, b, x + l, y + h - b, w - l - r, b);
        //      console.log(x, y, w, h, t, r, b, l);
        //      console.log(image, 0, t, l, image.height - b - t, x, y + t, l, h - b - t);
        /* left */
        if (l > 0 && h - b - t > 0) this.drawImage(image, 0, t, l, image.height - b - t, x, y + t, l, h - b - t);


        /* right */
        if (r > 0 && h - b - t > 0) this.drawImage(image, image.width - r, t, r, image.height - b - t, x + w - r, y + t, r, h - b - t);

        /* top-left */
        if (l > 0 && t > 0) this.drawImage(image, 0, 0, l, t, x, y, l, t);

        /* top-right */
        if (r > 0 && t > 0) this.drawImage(image, image.width - r, 0, r, t, x + w - r, y, r, t);

        /* bottom-right */
        if (r > 0 && b > 0) this.drawImage(image, image.width - r, image.height - b, r, b, x + w - r, y + h - b, r, b);

        /* bottom-left */
        if (l > 0 && b > 0) this.drawImage(image, 0, image.height - b, l, b, x, y + h - b, l, b);

        if (fill) {
          if (typeof fill === "string") {
            this.fillStyle(fill).fillRect(x + l, y + t, w - l - r, h - t - b);
          } else {
            if (w - l - r > 0 && h - t - b > 0)
              this.drawImage(image, l, t, image.width - r - l, image.height - b - t, x + l, y + t, w - l - r, h - t - b);
          }
        }
      }
    },

    setPixel: function(color, x, y) {

      return this.fillStyle(color).fillRect(x, y, 1, 1);

    },

    getPixel: function(x, y) {
      var pixel = this.context.getImageData(x, y, 1, 1).data;
      return cq.color([pixel[0], pixel[1], pixel[2], pixel[3]]);
    },

    createImageData: function(width, height) {
      if (false && this.context.createImageData) {
        return this.context.createImageData.apply(this.context, arguments);
      } else {
        if (!this.emptyCanvas) {
          this.emptyCanvas = cq.createCanvas(width, height);
          this.emptyCanvasContext = this.emptyCanvas.getContext("2d");
        }

        this.emptyCanvas.width = width;
        this.emptyCanvas.height = height;
        return this.emptyCanvasContext.getImageData(0, 0, width, height);
      }
    },

    strokeLine: function(x1, y1, x2, y2) {

      this.beginPath();

      if (typeof x2 === "undefined") {
        this.moveTo(x1.x, x1.y);
        this.lineTo(y1.x, y1.y);
      } else {
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
      }

      this.stroke();

      return this;

    },

    setLineDash: function(dash) {
      if (this.context.setLineDash) {
        this.context.setLineDash(dash);
        return this;
      } else return this;
    },

    measureText: function() {
      return this.context.measureText.apply(this.context, arguments);
    },

    getLineDash: function() {
      return this.context.getLineDash();
    },

    createRadialGradient: function() {
      return this.context.createRadialGradient.apply(this.context, arguments);
    },

    createLinearGradient: function() {
      return this.context.createLinearGradient.apply(this.context, arguments);
    },

    createPattern: function() {
      return this.context.createPattern.apply(this.context, arguments);
    },

    getImageData: function() {
      return this.context.getImageData.apply(this.context, arguments);
    },

    /* If you think that I am retarded because I use fillRect to set
       pixels - read about premultipled alpha in canvas */

    writeMeta: function(data) {

      var json = JSON.stringify(data);

      json = encodeURIComponent(json);

      var bytes = [];

      for (var i = 0; i < json.length; i++) {
        bytes.push(json.charCodeAt(i));
        //      console.log(json[i])
      }

      bytes.push(127);

      var x = this.width - 1;
      var y = this.height - 1;

      var pixel = [];

      while (bytes.length) {

        var byte = bytes.shift();

        pixel.unshift(byte * 2);
        //        console.log(x + String.fromCharCode(byte), byte);

        if (!bytes.length)
          for (var i = 0; i < 3 - pixel.length; i++) pixel.unshift(254);

        if (pixel.length === 3) {
          this.fillStyle(cq.color(pixel).toRgb()).fillRect(x, y, 1, 1);
          pixel = [];
          x--;

          if (x < 0) {
            y--;
            x = this.width - 1;
          }
        }
      }

      return this;

    },

    readMeta: function() {

      var bytes = [];

      var x = this.width - 1;
      var y = this.height - 1;

      while (true) {
        var pixel = this.getPixel(x, y);

        var stop = false;

        for (var i = 0; i < 3; i++) {

          if (pixel[2 - i] === 254) stop = true;

          else bytes.push(pixel[2 - i] / 2 | 0);

        }

        if (stop) break;

        x--;

        if (x < 0) {
          y--;
          x = this.width - 1;
          break;
        }
      }


      var json = "";

      while (bytes.length) {
        json += String.fromCharCode(bytes.shift());
      }

      var data = false;

      console.log(json);

      try {
        data = JSON.parse(decodeURIComponent(json));
      } catch (e) {

      }

      return data;

    },

    get width() {
      return this.canvas.width;
    },

    get height() {
      return this.canvas.height;
    },

    set width(w) {
      this.canvas.width = w;
      this.update();
      return this.canvas.width;
    },

    set height(h) {
      this.canvas.height = h;
      this.update();
      return this.canvas.height;
    }


  };

  /* extend Layer with drawing context methods */

  var methods = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createRadialGradient", "createPattern", "drawFocusRing", "drawImage", "fill", "fillRect", "fillText", "getImageData", "isPointInPath", "lineTo", "measureText", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setTransform", "stroke", "strokeRect", "strokeText", "transform", "translate", "setLineDash"];

  for (var i = 0; i < methods.length; i++) {
    var name = methods[i];

    if (cq.Layer.prototype[name]) continue;

    cq.Layer.prototype[name] = (function(method) {

      return function() {

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; ++i) {

          args[i] = arguments[i];

        }

        cq.fastApply(method, this.context, args);

        return this;
      }

    })(CanvasRenderingContext2D.prototype[name]);


    continue;


    if (!this.debug) {
      // if (!cq.Layer.prototype[name]) cq.Layer.prototype[name] = Function("this.context." + name + ".apply(this.context, arguments); return this;");

      var self = this;

      (function(name) {

        cq.Layer.prototype[name] = function() {
          // this.context[name].apply(this.context, arguments);

          cq.fastApply(this.context[name], this.context, arguments);

          return this;
        }

      })(name);

    } else {

      var self = this;

      (function(name) {

        cq.Layer.prototype[name] = function() {
          try {
            this.context[name].apply(this.context, arguments);
            return this;
          } catch (e) {
            var err = new Error();
            console.log(err.stack);
            throw (e + err.stack);

            console.log(e, name, arguments);
          }
        }

      })(name);

    }

  };

  /* create setters and getters */

  var properties = ["canvas", "fillStyle", "font", "globalAlpha", "globalCompositeOperation", "lineCap", "lineJoin", "lineWidth", "miterLimit", "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "strokeStyle", "textAlign", "textBaseline", "lineDashOffset"];

  for (var i = 0; i < properties.length; i++) {
    var name = properties[i];
    if (!cq.Layer.prototype[name]) cq.Layer.prototype[name] = Function("if(arguments.length) { this.context." + name + " = arguments[0]; return this; } else { return this.context." + name + "; }");
  };

  /* color */

  cq.Color = function(data, type) {

    if (arguments.length) this.parse(data, type);
  }

  cq.Color.prototype = {

    toString: function() {
      return this.toRgb();
    },

    parse: function(args, type) {
      if (args[0] instanceof cq.Color) {
        this[0] = args[0][0];
        this[1] = args[0][1];
        this[2] = args[0][2];
        this[3] = args[0][3];
        return;
      }

      if (typeof args === "string") {
        var match = null;

        if (args[0] === "#") {
          var rgb = cq.hexToRgb(args);
          this[0] = rgb[0];
          this[1] = rgb[1];
          this[2] = rgb[2];
          this[3] = 1.0;
        } else if (match = args.match(/rgb\((.*),(.*),(.*)\)/)) {
          this[0] = match[1] | 0;
          this[1] = match[2] | 0;
          this[2] = match[3] | 0;
          this[3] = 1.0;
        } else if (match = args.match(/rgba\((.*),(.*),(.*)\)/)) {
          this[0] = match[1] | 0;
          this[1] = match[2] | 0;
          this[2] = match[3] | 0;
          this[3] = match[4] | 0;
        } else if (match = args.match(/hsl\((.*),(.*),(.*)\)/)) {
          this.fromHsl(match[1], match[2], match[3]);
        } else if (match = args.match(/hsv\((.*),(.*),(.*)\)/)) {
          this.fromHsv(match[1], match[2], match[3]);
        }
      } else {
        switch (type) {
          case "hsl":
          case "hsla":

            this.fromHsl(args[0], args[1], args[2], args[3]);
            break;

          case "hsv":
          case "hsva":

            this.fromHsv(args[0], args[1], args[2], args[3]);
            break;

          default:
            this[0] = args[0];
            this[1] = args[1];
            this[2] = args[2];
            this[3] = typeof args[3] === "undefined" ? 1.0 : args[3];
            break;
        }
      }
    },

    a: function(a) {
      return this.alpha(a);
    },

    alpha: function(a) {
      this[3] = a;
      return this;
    },

    fromHsl: function() {
      var components = arguments[0] instanceof Array ? arguments[0] : arguments;

      var color = cq.hslToRgb(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]));

      this[0] = color[0];
      this[1] = color[1];
      this[2] = color[2];
      this[3] = typeof arguments[3] === "undefined" ? 1.0 : arguments[3];
    },

    fromHsv: function() {
      var components = arguments[0] instanceof Array ? arguments[0] : arguments;
      var color = cq.hsvToRgb(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]));

      this[0] = color[0];
      this[1] = color[1];
      this[2] = color[2];
      this[3] = typeof arguments[3] === "undefined" ? 1.0 : arguments[3];
    },

    toArray: function() {
      return [this[0], this[1], this[2], this[3]];
    },

    toRgb: function() {
      return "rgb(" + this[0] + ", " + this[1] + ", " + this[2] + ")";
    },

    toRgba: function() {
      return "rgba(" + this[0] + ", " + this[1] + ", " + this[2] + ", " + this[3] + ")";
    },

    toHex: function() {
      return cq.rgbToHex(this[0], this[1], this[2]);
    },

    toHsl: function() {
      var c = cq.rgbToHsl(this[0], this[1], this[2]);
      c[3] = this[3];
      return c;
    },

    toHsv: function() {
      var c = cq.rgbToHsv(this[0], this[1], this[2]);
      c[3] = this[3];
      return c;
    },

    gradient: function(target, steps) {
      var targetColor = cq.color(target);
    },

    shiftHsl: function() {
      var hsl = this.toHsl();

      if (this[0] !== this[1] || this[1] !== this[2]) {
        var h = arguments[0] === false ? hsl[0] : cq.wrapValue(hsl[0] + arguments[0], 0, 1);
        var s = arguments[1] === false ? hsl[1] : cq.limitValue(hsl[1] + arguments[1], 0, 1);
      } else {
        var h = hsl[0];
        var s = hsl[1];
      }

      var l = arguments[2] === false ? hsl[2] : cq.limitValue(hsl[2] + arguments[2], 0, 1);

      this.fromHsl(h, s, l);

      return this;
    },

    setHsl: function() {
      var hsl = this.toHsl();

      var h = arguments[0] === false ? hsl[0] : cq.limitValue(arguments[0], 0, 1);
      var s = arguments[1] === false ? hsl[1] : cq.limitValue(arguments[1], 0, 1);
      var l = arguments[2] === false ? hsl[2] : cq.limitValue(arguments[2], 0, 1);

      this.fromHsl(h, s, l);

      return this;
    },

    mix: function(color, amount) {
      color = cq.color(color);

      for (var i = 0; i < 4; i++)
        this[i] = cq.mix(this[i], color[i], amount);

      return this;
    }

  };

  window["cq"] = window["CanvasQuery"] = cq;


  return cq;

})();

/* file: src/layer/Layer.js */

PLAYGROUND.Renderer = function(app) {

  this.app = app;

  app.on("create", this.create.bind(this));
  app.on("resize", this.resize.bind(this));

  app.renderer = this;

};

PLAYGROUND.Renderer.plugin = true;

PLAYGROUND.Renderer.prototype = {

  create: function(data) {

    this.app.layer = cq().appendTo(this.app.container);

    if (!this.app.customContainer) {
      this.app.container.style.margin = "0px";
      this.app.container.style.overflow = "hidden";
    }

  },

  resize: function(data) {

    var app = this.app;

    var layer = app.layer;

    layer.width = app.width;
    layer.height = app.height;

    layer.canvas.style.transformOrigin = "0 0";
    layer.canvas.style.transform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.transformStyle = "preserve-3d";

    layer.canvas.style.webkitTransformOrigin = "0 0";
    layer.canvas.style.webkitTransform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.webkitTransformStyle = "preserve-3d";

    layer.smoothing = this.app.smoothing;
    layer.update();

    this.setSmoothing(this.app.smoothing);

  },

  setSmoothing: function(smoothing) {

    var layer = this.app.layer;

    this.app.smoothing = smoothing;


    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {

      layer.canvas.style.imageRendering = smoothing ? "auto" : "-moz-crisp-edges";

    } else {

      layer.canvas.style.imageRendering = smoothing ? "auto" : "pixelated";

    }

    layer.smoothing = smoothing;
    layer.update();

  }

};

/* file: src/layer/Transitions.js */

PLAYGROUND.Transitions = function(app) {

  this.app = app;

  app.on("enterstate", this.enterstate.bind(this));
  app.on("postrender", this.postrender.bind(this));
  app.on("step", this.step.bind(this));

  this.progress = 1;
  this.lifetime = 0;
};

PLAYGROUND.Transitions.plugin = true;

PLAYGROUND.Transitions.prototype = {

  enterstate: function(data) {

    this.screenshot = this.app.layer.cache();

    if (data.prev) {
      this.lifetime = 0;
      this.progress = 0;
    }

  },

  postrender: function() {

    if (this.progress >= 1) return;

    PLAYGROUND.Transitions.Split(this, this.progress);

  },

  step: function(delta) {

    if (this.progress >= 1) return;

    this.lifetime += delta;

    this.progress = Math.min(this.lifetime / 0.5, 1);

  }

};

PLAYGROUND.Transitions.Implode = function(manager, progress) {

  var app = manager.app;
  var layer = app.layer;

  progress = app.ease(progress, "outCubic");

  var negative = 1 - progress;

  layer.save();
  layer.tars(app.center.x, app.center.y, 0.5, 0.5, 0, 0.5 + 0.5 * negative, negative);
  layer.drawImage(manager.screenshot, 0, 0);

  layer.restore();

};

PLAYGROUND.Transitions.Split = function(manager, progress) {

  var app = manager.app;
  var layer = app.layer;

  progress = app.ease(progress, "inOutCubic");

  var negative = 1 - progress;

  layer.save();

  layer.a(negative).clear("#fff").ra();

  layer.drawImage(manager.screenshot, 0, 0, app.width, app.height / 2 | 0, 0, 0, app.width, negative * app.height / 2 | 0);
  layer.drawImage(manager.screenshot, 0, app.height / 2 | 0, app.width, app.height / 2 | 0, 0, app.height / 2 + progress * app.height / 2 + 1 | 0, app.width, Math.max(1, negative * app.height * 0.5 | 0));

  layer.restore();

};

/* file: src/layer/LoadingScreen.js */

PLAYGROUND.LoadingScreen = {

  logoRaw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",

  create: function() {

    var self = this;

    this.logo = new Image;

    this.logo.addEventListener("load", function() {
      self.ready = true;
    });

    this.logo.src = this.logoRaw;

    this.background = "#282245";

    if (window.getComputedStyle) {
      // this.background = window.getComputedStyle(document.body).backgroundColor || "#000";
    }


  },

  enter: function() {

    this.current = 0;

  },

  leave: function() {

    this.locked = true;

    this.animation = this.app.tween(this)
      .to({
        current: 1
      }, 0.5);

  },

  step: function(delta) {

    if (this.locked) {
      if (this.animation.finished) this.locked = false;
    } else {
      this.current = this.current + Math.abs(this.app.loader.progress - this.current) * delta;
    }

  },

  ready: function() {


  },

  render: function() {

    if (!this.ready) return;

    this.app.layer.clear(this.background);

    this.app.layer.fillStyle("#fff");

    this.app.layer.save();
    this.app.layer.align(0.5, 0.5);
    this.app.layer.globalCompositeOperation("lighter");
    this.app.layer.drawImage(this.logo, this.app.center.x, this.app.center.y);

    var w = this.current * this.logo.width;

    this.app.layer.fillStyle("#fff");

    this.app.layer.fillRect(this.app.center.x, this.app.center.y + 32, w, 12);
    this.app.layer.fillRect(this.app.center.x, this.app.center.y + 32, this.logo.width, 4);

    this.app.layer.restore();

  }

};
/* scanlines plugin for playground's default renderer */

PLAYGROUND.Scanlines = function(app) {

  this.app = app;

  app.on("resize", this.resize.bind(this));
  app.on("postrender", this.postrender.bind(this));

};

PLAYGROUND.Scanlines.plugin = true;

PLAYGROUND.Scanlines.prototype = {

  resize: function() {

    this.image = cq(this.app.width, this.app.height);

    this.image.globalAlpha(0.1);
    this.image.fillStyle("#008");

    for (var i = 1; i < this.image.canvas.height; i += 8){
      
      this.image.fillRect(0, i, this.image.canvas.width, 4);

    }

    this.image = this.image.cache();

  },

  postrender: function() {

    if (this.image) {

      // this.app.layer.drawImage(this.image, 0, 0);

    }

  }

};
/*

  SoundOnDemand r1

  (c) 2012-2015 http://rezoner.net

  This library may be freely distributed under the MIT license.

*/

/* options */

/* output: output node, default */
/* audioContext: audioContext */

SoundOnDemand = function(options) {

  options = options || {};

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

  if (!options.audioContext) {
    console.warn('Possible duplicated AudioContext, use options.audioContext');
  }
  this.audioContext = options.audioContext || new AudioContext;

  this.compressor = this.audioContext.createDynamicsCompressor();
  this.compressor.connect(this.audioContext.destination);

  this.gainNode = this.audioContext.createGain()
  this.gainNode.connect(this.compressor);

  this.input = this.gainNode;

  this.gainNode.gain.value = 1.0;

  this.buffers = {};

  this.channels = {};
  this.aliases = {};

  var lastTick = Date.now();
  var engine = this;

  setInterval(function() {

    var delta = (Date.now() - lastTick) / 1000;

    lastTick = Date.now();

    engine.step(delta);

  }, 1000 / 60);

};

SoundOnDemand.moveTo = function(value, target, step) {

  if (value < target) {
    value += step;
    if (value > target) value = target;
  }

  if (value > target) {
    value -= step;
    if (value < target) value = target;
  }

  return value;

};

SoundOnDemand.prototype = {

  constructor: SoundOnDemand,

  path: "sounds/",

  channel: function(name) {

    if (!this.channels[name]) this.channels[name] = new SoundOnDemand.Channel(this);

    return this.channels[name];

  },

  getAssetEntry: function(path, defaultExtension) {

    /* translate folder according to user provided paths
       or leave as is */

    var fileinfo = path.match(/(.*)\..*/);
    var key = fileinfo ? fileinfo[1] : path;

    var temp = path.split(".");
    var basename = path;

    if (temp.length > 1) {
      var ext = temp.pop();
      path = temp.join(".");
    } else {
      var ext = defaultExtension;
      basename += "." + defaultExtension;
    }

    return {
      key: key,
      url: this.path + basename,
      path: this.path + path,
      ext: ext
    };

  },

  loaders: {},

  load: function(key) {

    var engine = this;
    var entry = engine.getAssetEntry(key, engine.audioFormat);

    if (!this.loaders[key]) {

      this.loaders[key] = new Promise(function(resolve, reject) {

        if (engine.buffers[entry.key]) return resolve(engine.buffers[entry.key]);

        var request = new XMLHttpRequest();

        request.open("GET", entry.url, true);
        request.responseType = "arraybuffer";

        request.onload = function() {
          engine.audioContext.decodeAudioData(this.response, function(decodedBuffer) {

            engine.buffers[entry.key] = decodedBuffer;
            resolve(decodedBuffer);

          });

        }

        request.send();

      });

    }

    return this.loaders[key];

  },

  step: function(delta) {

    for (var key in this.channels) {

      this.channels[key].step(delta);

    }

  },

  duplicate: function(source, as, volume, rate) {

    var engine = this;

    this.load(source).then(function() {

      engine.buffers[source];

      engine.buffers[as] = engine.buffers[source];

    });

  },

  alias: function(name, source, rate, volume) {

    this.aliases[name] = {
      source: source,
      rate: rate,
      volume: volume
    };

  }

};
SoundOnDemand.Events = function() {

  this.listeners = {};

};

SoundOnDemand.Events.prototype = {

  on: function(event, callback) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.on(key, event[key])
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(callback);

    return callback;
  },

  once: function(event, callback) {

    callback.once = true;

    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(callback);

    return callback;

  },

  off: function(event, callback) {

    for (var i = 0, len = this.listeners[event].length; i < len; i++) {
      if (this.listeners[event][i]._remove) {
        this.listeners[event].splice(i--, 1);
        len--;
      }
    }

  },

  trigger: function(event, data) {

    /* if you prefer events pipe */

    if (this.listeners["event"]) {
      for (var i = 0, len = this.listeners["event"].length; i < len; i++) {
        this.listeners["event"][i](event, data);
      }
    }

    /* or subscribed to single event */

    if (this.listeners[event]) {
      for (var i = 0, len = this.listeners[event].length; i < len; i++) {
        var listener = this.listeners[event][i];
        listener.call(this, data);

        if (listener.once) {
          this.listeners[event].splice(i--, 1);
          len--;
        }
      }
    }

  }

};
SoundOnDemand.Channel = function(engine) {

  this.engine = engine;
  this.audioContext = engine.audioContext;

  /* connection order goes from bottom to top */

  /* gain node */

  this.gainNode = this.audioContext.createGain();

  /* convolver */

  this.convolverWetNode = this.audioContext.createGain();
  this.convolverDryNode = this.audioContext.createGain();
  this.convolverNode = this.audioContext.createConvolver();
  this.convolverEnabled = false;

  this.route();

  this.queue = [];
  this.loops = [];

};

SoundOnDemand.Channel.prototype = {

  constructor: SoundOnDemand.Channel,

  /* get a sound for further usage */

  xroute: function() {

    if (this.currentRoute) {

      for (var i = 0; i < this.currentRoute.length - 1; i++) {

        this.currentRoute[i].disconnect();

      }

    }

    this.currentRoute = [];

    for (var i = 0; i < arguments.length; i++) {

      if (i < arguments.length - 1) {

        var node = arguments[i];

        node.connect(arguments[i + 1]);

      }

      this.currentRoute.push(node);

    }

    this.input = arguments[0];

  },

  get: function(key) {

    return new SoundOnDemand.Sound(key, this);

  },

  play: function(key) {

    var sound = this.get(key);

    this.add(sound);

    return sound;

  },

  remove: function(sound) {

    sound._remove = true;

  },

  add: function(sound) {

    sound._remove = false;

    this.queue.push(sound);

  },

  step: function(delta) {

    /* process queue */

    for (var i = 0; i < this.queue.length; i++) {

      var sound = this.queue[i];

      sound.step(delta);

      if (sound._remove) this.queue.splice(i--, 1);

    }

    /* process sounds being played */

  },

  volume: function(value) {

    if (arguments.length) {

      this.gainNode.gain.value = value;

      return this;

    } else {

      return this.gainNode.gain.value;

    }

  },

  swapConvolver: function(key) {

    var engine = this.engine;
    var channel = this;

    return new Promise(function(resolve, fail) {

      if (channel.currentConvolverImpulse === key) {

        resolve();

      } else {

        engine.load(key).then(function(buffer) {
          channel.currentConvolverImpulse = key;
          channel.convolverNode.buffer = buffer;
          resolve();
        });

      }

    });

  },

  updateConvovlerState: function(enabled) {

    this.convolverEnabled = enabled;
    this.route();

  },

  subroute: function(nodes) {

    for (var i = 0; i < nodes.length; i++) {

      if (i < nodes.length - 1) {

        var node = nodes[i];
        node.disconnect();
        node.connect(nodes[i + 1]);

      }

    }

    this.input = nodes[0];

  },

  route: function() {

    this.gainNode.disconnect();

    if (this.convolverEnabled) {

      this.gainNode.connect(this.convolverDryNode);

      this.gainNode.connect(this.convolverNode);
      this.convolverNode.connect(this.convolverWetNode);

      this.convolverWetNode.connect(this.engine.input);
      this.convolverDryNode.connect(this.engine.input);

    } else {

      this.gainNode.connect(this.engine.input);

    }

    this.input = this.gainNode;

  },

  convolver: function(value, key) {

    var enabled = value > 0;
    var channel = this;

    this.swapConvolver(key).then(function() {

      if (enabled !== channel.convolverEnabled) channel.updateConvovlerState(enabled);

    });

    this.convolverWetNode.gain.value = value;
    this.convolverDryNode.gain.value = 1 - value;

    return this;

  }

};
SoundOnDemand.Sound = function(key, channel) {

  this.key = key;
  this.bufferKey = key;

  if (channel.engine.aliases[key]) {

    this.alias = channel.engine.aliases[key];

    this.bufferKey = this.alias.source;

  }

  if (!channel.engine.buffers[this.bufferKey]) channel.engine.load(this.bufferKey);

  this.channel = channel;
  this.audioContext = this.channel.engine.audioContext;

  this.current = {
    volume: 1.0,
    rate: 1.0
  };

  this.fadeMod = 1.0;

  this.createNodes();

};

SoundOnDemand.Sound.prototype = {

  constructor: SoundOnDemand.Sound,

  alias: {
    volume: 1.0,
    rate: 1.0
  },

  createNodes: function() {

    var bufferSource = this.audioContext.createBufferSource();
    var gainNode = this.audioContext.createGain();
    var panNode = this.audioContext.createStereoPanner();

    bufferSource.connect(panNode);
    panNode.connect(gainNode);
    gainNode.connect(this.channel.input);

    this.bufferSource = bufferSource;
    this.gainNode = gainNode;
    this.panNode = panNode;

  },

  volume: function(volume) {

    volume *= this.alias.volume;

    this.current.volume = volume;

    this.updateVolume();

    return this;

  },

  updateVolume: function() {

    this.gainNode.gain.value = this.current.volume * this.fadeMod;

  },

  pan: function(pan) {

    this.current.pan = pan;

    this.updatePanning();

    return this;

  },

  updatePanning: function() {

    this.panNode.pan.value = this.current.pan;

  },

  loop: function() {

    this.bufferSource.loop = true;
    this.current.loop = true;

    return this;

  },

  rrate: function(range) {

    return this.rate(this.current.rate + (-1 + Math.random() * 2) * range);

  },

  rate: function(rate) {

    rate *= this.alias.rate;

    this.bufferSource.playbackRate.value = rate;

    this.current.rate = rate;

    return this;

  },

  onended: function() {

    if (!this.current.loop) this.stop();

  },

  step: function(delta) {

    if (!this.ready) {

      if (!this.channel.engine.buffers[this.bufferKey]) return;

      this.ready = true;
      this.playing = true;

      this.buffer = this.channel.engine.buffers[this.bufferKey];

      this.bufferSource.buffer = this.buffer;

      this.bufferSource.start(0);
      this.bufferSource.onended = this.onended.bind(this);

      this.currentTime = 0;

      this.currentTime += this.bufferSource.playbackRate.value * delta;
    }

    if (this.fadeTarget !== this.fadeMod) {

      this.fadeMod = SoundOnDemand.moveTo(this.fadeMod, this.fadeTarget, delta * this.fadeSpeed);

      this.updateVolume();

    } else if (this.fadeTarget === 0) {

      this.pause();

    }



  },

  pause: function() {

    this.channel.remove(this);

    this.bufferSource.stop(0);

    this.playing = false;

  },

  stop: function() {

    this.channel.remove(this);

    this.bufferSource.stop(0);

    this.playing = false;

  },

  resume: function() {

    this.createNodes();

    this.bufferSource.buffer = this.buffer;

    this.currentTime = this.currentTime % this.buffer.duration;
    this.bufferSource.start(0, this.currentTime);

    this.rate(this.current.rate);
    this.volume(this.current.volume);
    this.loop(this.current.loop);

    this.channel.add(this);

    this.playing = true;

  },

  fadeTo: function(target, duration) {

    if (!this.playing && this.ready) this.resume();

    duration = duration || 1.0;

    this.fadeTime = 0;
    this.fadeTarget = target;
    this.fadeDuration = duration;

    this.fadeSpeed = Math.abs(target - this.fadeMod) / duration;

    return this;

  },

  fadeIn: function(duration) {

    if (!this.playing && this.ready) this.resume();

    this.fadeMod = 0;
    this.fadeTo(1.0, duration);

    return this;

  },

  fadeOut: function(duration) {

    this.fadeTo(0, duration || 1.0);

    return this;

  },



};

PLAYGROUND.SoundOnDemand = function(app) {
  app.audio = new SoundOnDemand({
    audioContext: app.audioContext
  });

  app.audio.path = app.getPath("sounds");

  app.loadSounds = function() {

    for (var i = 0; i < arguments.length; i++) {

      var key = arguments[i];

      this.loader.add();

      this.audio.load(key).then(
        this.loader.success.bind(this.loader),
        this.loader.error.bind(this.loader)
      );

    }

  };

};

PLAYGROUND.SoundOnDemand.plugin = true;
ENGINE = { };
ENGINE.Benchmark = {

  create: function() {

    this.music = app.music.play("gameover").fadeIn(4).loop();

    this.ready = false;

    // this.gradient = app.layer.createRadialGradient(app.center.x, app.center.y, 0, app.center.x, app.center.y, app.center.x);
    // this.gradient.addColorStop(0.0, "transparent");
    // this.gradient.addColorStop(1.0, "#000");

    // JIT warmup
    this.didWarmup = false;
    this.steps = 0;
    this.iotaList = [];
    this.frameTimes = [];
    this.scores = [];
    this.runCount = 0;
    this.skipCount = 0;
    this.skipResetCount = 0;
    this.resetCount = 0;
    this.scoreStack = [];
    this.frameTime = 0.0;
    this.startTime = Date.now();
  },


  pointerdown: function() {

    if (this.ready) {
      if (window.ga) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': 'game',
          'eventAction': 'start'
        });
      }

      this.music.fadeOut();

      app.setState(ENGINE.Game);
    }

  },

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Splashpage'
      });
    }

    this.startMod = 0;

    this.iotaCount = this.app.baseline ? Math.floor(this.app.baseline * 0.7) : 1;

    this.app.baseline = 0;

    this.reset();

  },

  // Called between benchmark loops
  reset: function() {
    this.steps = 0;
    this.frameTimes.length = 0;
    this.skipCount = 0;
    // JIT warmup settings (run unbound loops)
    if (!this.didWarmup) {
      // console.time('Warmup');
      this.app.unbound = true;
      this.app.immidiate = false;
    } else {
      this.app.unbound = false;
      this.app.immidiate = true;
    }
    if (this.iotaList.length == 0) {
      this.addIotas(this.didWarmup ? this.iotaCount : 1);
    }
  },

  step: function(dt) {
    if (this.ready) {
      return;
    }

    var before = performance.now();

    this.iotaList.forEach(function(iota) {
      iota.step(dt);
    });

    this.frameTime = performance.now() - before;

    if (!this.didWarmup) {
      // State: JIT Warmup
      this.stepWarmUp();
    } else if (this.frameTime) {
      // Stresstesting
      this.stepStressTest()
    }

  },

  stepWarmUp: function() {

    this.steps++;

    if (this.steps > 1100) {
      this.didWarmup = true;
      // console.timeEnd('Warmup');
      // console.log('Warmup with %d iotas', this.iotaList.length);
      this.reset();
    }
  },

  stepStressTest: function() {
    var add = 1;
    var frameTimes = this.frameTimes;
    var MAX_FRAMES = 45;
    var MIN_FRAMES = 15;
    var COST = 8;
    var ERROR = 0.25;
    var frameTime = this.frameTime;
    if (frameTimes.unshift(frameTime) > MAX_FRAMES) {
      frameTimes.length = MAX_FRAMES;
    }
    if (frameTimes.length >= MIN_FRAMES) {
      var sample = this.analyze(frameTimes);
      var score = this.iotaList.length;
      if (sample.rse <= ERROR && sample.mean > COST) {
        this.pushScore(score);
        return;
      }
      if (sample.rse > ERROR || sample.mean > COST) {
        // console.log('Skip #' + this.skipCount);
        this.skipCount++;
        if (this.skipCount > 60) {
          console.log(
            '[RESET STEP] High sampling error %f%% or mean %fms for %d entities.',
            sample.rse * 100, sample.mean, score
          );
          this.iotaCount = Math.floor(this.lastScore * 0.7);
          this.skipResetCount++;
          if (this.skipResetCount > 10) {
            this.finalize(false);
            return;
          }
          this.finalize(true);
        }
        return;
      }
      this.skipCount = 0;
      add = Math.round(COST / sample.mean);
    }

    this.addIotas(add);
  },

  pushScore: function(score) {
    var SAVE_SCORES = 3;
    var MIN_SCORES = 5;
    var MAX_SCORES = 10;
    var ERROR = 0.15;

    this.skipResetCount = 0;
    var scores = this.scores;
    this.runCount++;
    if (scores.unshift(score) > MAX_SCORES) {
      scores.length = MAX_SCORES;
    }
    this.iotaCount = Math.ceil(score * 0.7);
    var l = scores.length;
    if (l >= MIN_SCORES) {
      var sample = this.analyze(scores);
      if (sample.rse < ERROR) {
        this.resetCount = 0;
        this.app.baseline = Math.round(sample.mean);
        if (window.ga) {
          ga('send', {
            'hitType': 'event',
            'eventCategory': 'game',
            'eventAction': 'baselined',
            'eventValue': this.app.baseline,
            'nonInteraction': true
          });
        }
        this.app.baselineErr = sample.rse;
        this.scores.splice(SAVE_SCORES);
        this.finalize(false);
        return;
      } else {
        console.log(
          '[SCORE RESET] Standard error %f%% too high in score samples.',
          sample.rse * 100
        );
        this.resetCount++;
        if (this.resetCount > 10) {
          this.scores.splice(0);
          console.log('[BAIL] Too many [RESET SCORE].');
          if (window.ga) {
            ga('send', 'exception', {
              'exDescription': 'BenchmarkResetOverflow',
              'exFatal': false
            });
          }
          this.finalize(false);
          return;
        }
      }
    }
    this.finalize(true);
  },

  finalize: function(restart) {

    if (!restart) {
      // Remove iotas
      this.iotaCount = 0;
      this.runCount = 0;
      // Reset benchmark engine settings
      this.app.unbound = false;
      this.app.immidiate = false;
    }
    // Reduce iotaList to iotaCount
    this.iotaList.splice(this.iotaCount).forEach(function(iota) {
      iota.destroy();
    });
    if (restart) {
      this.reset();
    } else {
      if (window.ga) {
        ga('send', {
          'hitType': 'timing',
          'timingCategory': 'Benchmark',
          'timingVar': 'Loading',
          'timingValue': Date.now() - this.startTime
        });
      }
      this.ready = true;
      app.tween(this).to({
        startMod: 1.0
      }, 1.0, "outElastic");
    }

  },

  addIotas: function(count) {

    for (var j = 0; j < count; j++) {

      this.iotaList.push(new Iota(this.app, this));

    }

  },

  render: function() {

    /* get reference to the application */

    var app = this.app;

    /* get reference to drawing surface */

    var layer = this.app.layer;

    /* clear screen */

    layer.clear("#282245");


    layer.drawImage(app.images.splash, app.center.x - app.images.splash.width / 2 | 0, app.center.y - app.images.splash.height / 2 | 0)

    layer.save();
    layer.translate(600, 290);

    layer.align(0.5, 0.5);
    layer.scale(4, 4);
    layer.globalAlpha(0.4);
    layer.globalCompositeOperation("lighter");
    layer.drawImage(app.images.flare, 128 * (32 * (app.lifetime % 1.5 / 1.5) | 0), 0, 128, 128, 0, 0, 128, 128);
    layer.restore();


    app.fontSize(48);



    if (!this.ready) {
      var textX = app.center.x;
      var textY = app.center.y - 16;

      layer.fillStyle("rgba(0,0,0,0.5").fillRect(0, textY - 54, app.width, 74);

      layer.fillStyle("#000").textAlign("center").fillText("LOADING... please wait", textX, textY - 4);
      layer.fillStyle("#fff").textAlign("center").fillText("LOADING... please wait", textX, textY);

    } else {

      var textX = app.center.x + 100 + (1 - this.startMod) * 1000;
      var textY = app.center.y - 10;

      layer.a(0.5 + Utils.osc(app.lifetime, 1) * 0.5);
      layer.fillStyle("#000").textAlign("center").fillText("CLICK TO START!", textX, textY - 4);
      layer.fillStyle("#fa0").textAlign("center").fillText("CLICK TO START!", textX, textY);
      layer.a(1.0);

    }


    // app.ctx.fillStyle = this.gradient;
    // app.ctx.fillRect(0, 0, app.width, app.height);

    // this.iotaList.forEach(function(iota) {
    //   iota.render(layer);
    // });

    // layer
    //   .fillStyle('#fff')
    //   .font("14px 'arial'")
    //   .fillText('Stress test #' + this.runCount, 5, 15)
    //   .fillText('Entities: ' + this.iotaList.length, 5, 30)
    //   .fillText('Frametime:' + this.frameTime.toFixed(1), 5, 45);
  },

  analyze: function(population) {

    var l = population.length;
    var sum = 0.0;
    var sumsq = 0.0;
    for (var i = 0; i < l; i++) {
      sum += population[i];
      sumsq += population[i] * population[i];
    }
    var mean = sum / l;
    var sd = Math.sqrt(sumsq / l - sum * sum / (l * l));
    var se = sd / Math.sqrt(l);
    // standard error at 95% confidence
    var se95 = 1.96 * se;
    var rse = se / mean;
    return {
      mean: mean,
      sd: sd,
      se: se,
      se95: se95,
      rse: rse
    }

  },

  nearest: function(from, entities) {

    var min = -1;
    var result = null;

    for (var i = 0; i < entities.length; i++) {

      var to = entities[i];

      if (from === to) continue;

      var distance = this.distance(from, to);

      if (distance < min || min < 0) {
        min = distance;
        result = to;
      }

    }

    return result;
  },

  distance: function(a, b) {

    var dx = a.x - b.x;
    var dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);

  }
};

var images = ['firefox', 'firefox_beta', 'firefox_developer_edition', 'firefox_nightly'];

function Iota(app, parent) {
  this.x = 0.0;
  this.y = 0.0;
  this.vx = 0.0;
  this.vy = 0.0;
  this.vr = 0.0;
  this.alpha = 0.0;
  this.angle = 0.0;
  this.app = app;
  this.parent = parent;
  this.x = Math.random() * app.width;
  this.y = Math.random() * app.height;
  this.maxVel = 100.0;
  this.maxTorq = Math.PI * 10;
  this.vx = Math.random() * this.maxVel * 2 - this.maxVel;
  this.vy = Math.random() * this.maxVel * 2 - this.maxVel;
  this.vr = Math.random() * this.maxTorq * 2 - this.maxTorq;
  this.image = app.images[images[Math.round(Math.random() * 3)]];
  this.region = Utils.random([
    [548, 88, 46, 47],
    [544, 142, 46, 48],
    [544, 200, 46, 47],
    [545, 253, 44, 48]
  ]);
  this.maxForce = 100.0;
  this.alpha = 0.2 + Math.random() * 0.8;
  this.angle = Math.random() * Math.PI;
}

Iota.prototype = {

  step: function(dt) {

    app.state.nearest(this, this.parent.iotaList);

    var iotaList = this.parent.iotaList;
    var forcex = 0.0;
    var forcey = 0.0;
    var forces = 0;
    var maxDist = 60.0;
    for (var i = 0, l = iotaList.length; i < l; i++) {
      var distx = (this.x - iotaList[i].x) / maxDist;
      var disty = (this.y - iotaList[i].y) / maxDist;
      var signx = Math.sign(distx);
      var signy = Math.sign(disty);
      var absx = Math.abs(distx);
      var absy = Math.abs(disty);
      if (absx < 1 && absy < 1) {
        forcex += signx + absx * signx;
        forcey += signy + absy * signy;
        forces++;
      }
    }

    if (forces == 0) {
      forces = 1;
    }
    forcex = Math.max(-this.maxForce, Math.min(this.maxForce, forcex / forces)) * 500;
    forcey = Math.max(-this.maxForce, Math.min(this.maxForce, forcey / forces)) * 500;
    this.vx = this.vx * 0.99 + forcex * 0.01;
    this.vy = this.vy * 0.99 + forcey * 0.01;

    var x = this.x + this.vx * dt;
    if (x < 0 || x > this.app.width) {
      x = Math.random() * this.app.width;
    }
    this.x = x;

    var y = this.y + this.vy * dt;
    if (y < 0 || y > this.app.height) {
      y = Math.random() * this.app.height;
    }
    this.y = y;
    this.angle += this.vr * dt;
  },

  // render: function(layer) {

  //   return;

  //   layer.context.save();
  //   layer.context.translate(this.x | 0, this.y | 0);
  //   // layer.a(this.alpha);
  //   layer.context.fillStyle = "#f00";
  //   layer.context.fillRect(this.x, this.y, 64, 64);
  //   layer.context.fillStyle = "#fff";
  //   layer.context.beginPath();
  //   layer.context.moveTo(this.x, this.y);
  //   layer.context.arc(this.x, this.y, 64, 0, Math.PI * 2);
  //   layer.context.rotate(this.angle);
  //   layer.drawRegion(app.images.spritesheet, this.region, 0, 0);
  //   layer.context.restore();
  // },

  destroy: function() {
    this.app = null;
    this.parent = null;
  }

}
ENGINE.BackgroundStars = function() {

  this.color = "#0af";

  this.count = Math.max(app.height, app.width) / 16 | 0;

  this.x = 0;
  this.y = 0;

  this.populated = false;
  this.image = app.getColoredImage(app.images.particles, this.color);

};

ENGINE.BackgroundStars.prototype = {

  images: {},

  colors: ["#afc", "#fa0"],

  sprites: [
    [0, 13, 5, 5],
    [1, 19, 3, 3]
  ],

  quota: 0.5,

  populate: function(fill) {

    this.stars = [];

    for (var i = 0; i < this.count; i++) {
      this.spawnStar(fill);
    }

  },

  spawnStar: function(fill) {

    var star = {
      x: Math.random() * app.width,
      y: Math.random() * app.height,
      z: 0.1 + 0.9 * Math.random(),
      s: Utils.random([1, 2, 3]),
      spriteIndex: Math.random() * this.sprites.length | 0
    };

    star.lx = star.x;
    star.ly = star.y;

    this.stars.push(star);

  },

  wrap: function(star) {

    if (star.x > app.width) star.x = 0;
    if (star.y > app.height) star.y = 0;

    if (star.x < 0) star.x = app.width;
    if (star.y < 0) star.y = app.height;

  },

  step: function(dt) {

    if (!this.populated) {
      this.populated = true;
      this.populate(true);
    }

    var diffX = (10 + app.game.score) * dt;
    var diffY = (10 + app.game.score) * dt;


    for (var i = 0; i < this.stars.length; i++) {

      var star = this.stars[i];

      this.wrap(star);

      star.x += diffX * star.z;
      star.y += diffY * star.z;

    }

  },

  render: function(dt) {


    for (var i = 0; i < this.stars.length; i++) {

      var star = this.stars[i];

      var sprite = this.sprites[star.spriteIndex];

      app.ctx.drawImage(this.image, sprite[0], sprite[1], sprite[2], sprite[3],
        star.x, star.y, sprite[2], sprite[3]);


    }

  }

};
ENGINE.CircleExplosion = function(args) {

  Utils.extend(this, {

    attachedTo: false,
    radius: 0,
    alpha: 1.0,
    duration: 0.5

  }, args);

  this.radius = 0;

  this.tween = app.tween(this).discard().to({
    radius: args.radius
  }, this.duration, "outElastic").to({
    radius: 0
  }, this.duration, "outElastic");

};

ENGINE.CircleExplosion.prototype = {

  constructor: ENGINE.CircleExplosion,

  type: "circleExplosion",

  action: function() {

    app.sound.play("laser");

  },

  step: function() {

    if(this.attachedTo) {
      this.x = this.attachedTo.x;
      this.y = this.attachedTo.y;
    }

    if (this.tween.finished) this.dead = true;

  },

  render: function() {

    if (this.radius > 0) {
      
      app.ctx.beginPath();
      app.ctx.fillStyle = this.color;
      app.ctx.globalCompositeOperation = "lighter";
      app.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      app.ctx.fill();
      app.ctx.globalCompositeOperation = "source-over";


    }

  }

};
ENGINE.Ship = function(args) {

  Utils.extend(this, {

    damage: 1,
    firerate: 0.5,
    speed: 160,
    radius: 16,
    rotationSpeed: 5,
    hp: 10,
    range: 200,
    force: 0,
    forceDirection: 0,
    targetTimeout: 0,
    hitLifespan: 0,
    scale: 1.0,
    rank: 0,
    kills: 0

  }, defs.ships[args.type], args);

  this.random = this.game.random();

  this.maxHp = this.hp;

  this.lifetime = this.game.random() * 10;
  this.cooldown = this.firerate;
  this.desiredDirection = this.direction = this.game.random() * 6;

  this.color = defs.teamColor[this.team];

  this.image = app.images.spritesheet;

  if (this.team) this.applyUpgrades(this.game.upgrades);
  else this.applyDifficulty();

};

ENGINE.Ship.prototype = {

  constructor: ENGINE.Ship,

  hoverable: true,

  frozenSprite: [193, 86, 11, 19],

  quota: 2,

  pointerenter: function() {

    this.repair();

  },

  ranks: [
    [318, 131, 10, 5],
    [333, 131, 10, 10],
    [348, 131, 10, 15],
    [360, 131, 10, 8],
    [372, 131, 10, 13],
    [384, 131, 10, 18],
    [396, 131, 15, 16]
  ],

  applyDifficulty: function() {

    var difficulty = this.game.wave / 30;

    this.speed *= 1 + difficulty;
    this.damage *= 1 + difficulty;

  },

  applyUpgrades: function(upgrades) {

    var hpmod = this.hp / this.maxHp;

    this.damage = 1 + upgrades.damage * 0.25;
    this.maxHp = upgrades.life * 10;
    this.hp = hpmod * this.maxHp;
    this.speed = 80 + 10 * upgrades.speed;


    if (this.free) {
      this.damage *= 2;
      this.maxHp *= 2;
      this.hp *= 2;
    }

  },

  die: function() {

    if (!this.team) this.game.score++;

    if (this.game.benchmark) {

      this.hp = this.maxHp;

    } else {

      this.dead = true;

    }

    if (this.boss) {

      this.game.shake();

      for (var i = 0; i < 16; i++) {

        this.game.add(ENGINE.Resource, {
          x: this.x,
          y: this.y
        });

      }

    }

    this.game.explosion(this.x, this.y, 16, this.color);

    this.game.add(ENGINE.Resource, {
      x: this.x,
      y: this.y,
      parent: this
    });

    if (this.planet) this.planet.ships--;

    if (!this.team) this.game.onenemydeath(this);

    app.sound.play("explosion").rrate(0.2);

  },

  applyDamage: function(damage, attacker) {

    if (this.dead) return;

    this.hitLifespan = 0.1;

    this.hp -= damage;

    if (this.hp <= 0) {
      this.die();
      if (attacker) attacker.onscore();
    }

    this.game.explosion(this.x, this.y, 3, this.color);


  },

  step: function(dt) {

    dt *= this.game.timeFactor;

    // if (!this.team) dt *= Math.sin((app.lifetime % 2 / 2) * Math.PI);

    this.lifetime += dt;

    if ((this.targetTimeout -= dt) <= 0) {

      this.target = false;
      this.targetTimeout = 0.25;

    }

    if (!this.target) {

      this.target = this.getTarget(this.game.entities);

    } else if (this.target.dead) {

      this.target = null;

    }


    this.foresightCollision();

    var destination = false;
    var speed = this.speed;

    var ox = 0;
    var oy = 0;

    if (this.team && this.target) {

      ox = Math.cos(this.random * 6.28) * 100;
      oy = Math.sin(this.random * 6.28) * 100;

      destination = this.target;

    } else destination = this.game.player.planet;

    if (this.team && Utils.distance(this, app.center) > app.center.y) {

      destination = app.center;

    }

    if (this.collisionDanger) {

      /*

        var angle = Math.atan2(this.collisionDanger.y - this.y, this.collisionDanger.x - this.x) - Math.PI / 2;

        destination = {
          x: this.collisionDanger.x + Math.cos(angle) * 150,
          y: this.collisionDanger.y + Math.cos(angle) * 150
        }

        speed *= 1 - 0.5 * Math.abs(Utils.circDistance(this.direction, angle) / (Math.PI));

      */

      if (this.collisionDistance < 50) {

        var angle = Math.atan2(this.collisionDanger.y - this.y, this.collisionDanger.x - this.x) - Math.PI;

        this.x = this.collisionDanger.x + Math.cos(angle) * 50;
        this.y = this.collisionDanger.y + Math.sin(angle) * 50;

      }

      // speed *= this.collisionDistance / 200;

    }


    if (destination) {

      this.desiredDirection = Math.atan2(destination.y - this.y + ox, destination.x - this.x + oy);

    }

    if (!this.frozen) {

      this.direction = Utils.circWrapTo(this.direction, this.desiredDirection, dt * this.rotationSpeed);

    }

    this.move(dt);

    /* firing mechanics */

    this.cooldown -= dt;

    if (this.canFire()) {

      this.fire();

    }

    if (!this.team && Utils.distance(this, this.game.playerPlanet) < this.game.playerPlanet.radius) {

      if (!this.game.benchmark) {

        this.game.player.planet.applyDamage(1, this);
        this.die();

      }

    }

    this.hitLifespan -= dt;

  },


  move: function(dt) {

    if (!this.frozen) {

      Utils.moveInDirection.call(this, this.direction, this.speed * dt);

    }

    if (this.force > 0) {

      this.force -= 200 * dt;

      Utils.moveInDirection.call(this, this.forceDirection, this.force * dt);

    }

  },

  canFire: function() {

    if (this.frozen) return false;

    if (this.cooldown > 0) return;
    if (!this.target) return;
    if (Utils.distance(this, this.target) > this.range) return;

    this.cooldown = this.firerate;

    this.fire();

  },

  fire: function() {

    this.game.add(ENGINE.Bullet, {
      x: this.x,
      y: this.y,
      team: this.team,
      target: this.target,
      damage: this.damage,
      parent: this
    });

    if (!this.game.benchmark) app.sound.play("laser");

  },

  render: function() {

    /* sprite */

    app.ctx.save();
    app.ctx.translate(this.x, this.y);

    this.renderHUD();

    if (this.hitLifespan > 0) {

      var image = app.getColoredImage(this.image, "#fff", "source-in");

    } else {

      var image = this.image;

    }

    app.ctx.rotate(this.direction - Math.PI / 2);
    app.ctx.scale(this.scale, this.scale);
    app.ctx.drawImage(image, this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]);
    app.ctx.restore();

    if (this.frozen) {

      app.ctx.drawImage(app.images.spritesheet,
        this.frozenSprite[0], this.frozenSprite[1], this.frozenSprite[2], this.frozenSprite[3],
        this.x - this.frozenSprite[2] / 2, this.y - this.frozenSprite[3] / 2, this.frozenSprite[2], this.frozenSprite[3]);

    }

    if (this.team) {

      var rankSprite = this.ranks[this.rank];

      app.ctx.drawImage(app.images.spritesheet,
        rankSprite[0], rankSprite[1], rankSprite[2], rankSprite[3],
        this.x + 24, this.y - 24, rankSprite[2], rankSprite[3]);


    }

  },

  renderHUD: function() {

    if (this.frozen) return;

    var w = Math.min(100, (this.maxHp / 160) * 100 | 0);

    var mod = this.hp / this.maxHp;

    app.ctx.fillStyle = this.color;
    app.ctx.strokeStyle = this.color;
    app.ctx.lineWidth = 2;
    app.ctx.fillRect(-w * mod / 2 | 0, 32, w * mod, 5);
    app.ctx.strokeRect(-w * 0.5 | 0, 32, w, 5);

  },

  collisionRange: 100,

  foresightCollision: function() {

    this.collisionDanger = false;

    var self = this;

    var pool = Utils.filter(this.game.entities, function(e) {

      if (e.type !== "asteroid") return false;

      if (Utils.distance(self, e) > self.collisionRange) return false;

      return true;

    });

    this.collisionDanger = Utils.nearest(this, pool);

    if (this.collisionDanger) this.collisionDistance = Utils.distance(this, this.collisionDanger);

  },

  getTarget: function() {

    var pool = [];

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;

      if (entity.team !== this.team) pool.push(entity);

    }

    return Utils.nearest(this, pool);

  },

  repair: function() {

    if (this.hp >= this.maxHp) return;

    this.game.add(ENGINE.CircleExplosion, {
      color: "#a04",
      radius: 32,
      attachedTo: this
    });

    this.hp = this.maxHp;

  },

  onscore: function() {

    this.kills++;

    this.rank = Math.min(this.ranks.length - 1, this.kills / 3 | 0);

  }

};
ENGINE.Bullet = function(args) {

  Utils.extend(this, {
    speed: 400
  }, args);

  this.color = defs.teamColor[this.team];
  this.radius = 4;
  this.direction = 0;

  this.sprite = this.sprites[this.team];

};

ENGINE.Bullet.prototype = {

  sprites: [
    [126, 25, 4, 37],
    [133, 25, 4, 37]
  ],

  quota: 0.5,

  constructor: ENGINE.Bullet,

  step: function(dt) {

    dt *= this.game.timeFactor;

    this.direction = Math.atan2(this.target.y - this.y, this.target.x - this.x);

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    if (Utils.distance(this, this.target) < this.radius + this.target.radius) {

      this.hit(this.target);

    }

  },

  hit: function(target) {

    target.applyDamage(this.damage, this.parent);

    this.die();

  },

  die: function() {

    this.dead = true;

  },

  render: function() {

    app.ctx.save();

    app.ctx.translate(this.x, this.y);
    app.ctx.rotate(this.direction + Math.PI / 2);
    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.Asteroid = function(args) {

  this.max = this.resources = 5;

  Utils.extend(this, {

    hitLifespan: 0

  }, args);

  this.radius = 32;

  this.direction = Math.atan2(app.center.y - this.y, app.center.x - this.x);
  this.speed = 8 + this.game.random() * 32;

  this.lifetime = 0;

  this.kind = this.game.random() > 0.8 ? "gold" : "normal";

  this.spriteIndex = Utils.random(0, 2);

  this.collectibles = 0;


};

ENGINE.Asteroid.prototype = {

  constructor: ENGINE.Asteroid,

  quota: 0.5,

  hoverable: "mining",
  silent: true,
  instant: true,

  type: "asteroid",


  sprites: {

    normal: [
      [341, 239, 52, 39],
      [337, 288, 61, 61],
      [338, 354, 57, 58]
    ],

    gold: [
      [408, 238, 52, 39],
      [404, 287, 59, 61],
      [403, 353, 59, 58]
    ],

    hit: [
      [476, 127, 52, 39],
      [472, 176, 61, 61],
      [473, 242, 57, 58]
    ]

  },

  pointerenter: function() {

    this.slowdown = true;

  },

  pointerleave: function() {

    this.slowdown = false;

  },

  die: function() {

    app.sound.play("explosion").rate(0.6);

    if (Math.random() > 0.7) {

      this.game.add(ENGINE.Powerup, {
        x: this.x,
        y: this.y
      });

    }

    this.game.remove(this);
    this.game.explosion(this.x, this.y, 16, "#aaa");
    this.game.spawnAsteroid();

  },

  dig: function() {

    this.hitLifespan = 0.1;

    this.resources--;

    if (this.resources <= 0) {
      this.die();
    }

    var count = this.kind === "gold" ? 2 : 1;

    this.spawnResources(count);

    this.game.explosion(this.x, this.y, 4, "#fa0");

    if (!this.game.benchmark) app.sound.play("dig");

  },

  spawnResources: function(count) {

    for (var i = 0; i < count; i++) {

      this.game.add(ENGINE.Resource, {
        x: this.x,
        y: this.y,
        parent: this
      });

    }

  },

  step: function(dt) {

    dt *= this.game.timeFactor;

    this.lifetime += dt;

    this.hitLifespan -= dt;

    var speed = this.speed * (this.slowdown ? 0.25 : 1.0);

    this.x += Math.cos(this.direction) * speed * dt;
    this.y += Math.sin(this.direction) * speed * dt;

    this.game.wrap(this);

    if (Utils.distance(this, app.center) < this.game.player.planet.radius + this.radius) {

      if (this.game.player.planet.asteroidsShield) {

        this.spawnResources(5);

      } else {

        this.game.player.planet.applyDamage(1, this);

      }

      this.die();

    }

  },

  render: function() {

    if (this.hitLifespan > 0) {
    
      var sprite = this.sprites.hit[this.spriteIndex];
    
    } else {
      
      var sprite = this.sprites[this.kind][this.spriteIndex];

    }

    var scale = 0.5 + 0.5 * this.resources / this.max;

    app.ctx.save();

    app.ctx.translate(this.x, this.y)
    app.ctx.rotate(this.lifetime)
    app.ctx.scale(scale, scale)
    app.ctx.drawImage(app.images.spritesheet,
      sprite[0], sprite[1], sprite[2], sprite[3], -sprite[2] / 2, -sprite[3] / 2, sprite[2], sprite[3]
    );
    app.ctx.restore();

  }

};
ENGINE.Cursor = function(game, team, planet) {

  this.game = game;

  this.actionTimeout = 0;

  this.dotRadius = 8;
  this.capacity = 10;
  this.resources = 4;
  this.x = 0;
  this.y = 0;
  this.hoverTime = 0;
  this.team = team;
  this.color = defs.teamColor[team];
  this.planet = planet;

  this.targetTimeout = this.targetInterval = 0.25;
  this.fireCooldown = this.fireInterval = 0.25;

  /* timers */

  this.times = {
    mining: 0.5,
    collect: 0.05,
    build: 0.5,
    repair: 2
  };


  this.tween = app.tween(this);

  if (!this.team) {

    this.ai = new ENGINE.Ai(this);
    this.ai.set("idle");

  }

  this.trail = new ENGINE.Trail(this, {
    interval: 0.05,
    maxPoints: 10,
    color: this.color
  });


};

ENGINE.Cursor.prototype = {

  constructor: ENGINE.Cursor,

  poke: function() {

    this.tween = app.tween(this).discard()

    .to({
      dotRadius: 16
    }, 0.1, "outSine")

    .to({
      dotRadius: 8
    }, 0.05, "inSine");

  },

  step: function(dt) {

    var prevEntity = this.entity;

    this.entity = this.getHoveredEntity();

    if (this.entity !== prevEntity) {

      if (prevEntity && prevEntity.pointerleave) prevEntity.pointerleave(this);
      if (this.entity && this.entity.pointerenter) this.entity.pointerenter(this);

      this.onentitychange();

    }

    if (this.action) {

      this.hoverTime += dt;

      this.progressAction(dt);

    }

    /* firing mechanics */

    if (this.target && this.target.dead) this.target = false;

    if ((this.targetTimeout -= dt) <= 0) {

      this.targetTimeout = 0.5;

      this.target = this.getTarget();

    }


    this.fireCooldown -= dt;

    if (this.canFire()) {

      this.fire();

    }

    this.trail.step(dt);


  },

  getTarget: function() {

    var pool = [];

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;

      if (Utils.distance(entity, this) > 200) continue;
      if (entity.team !== this.team) pool.push(entity);

    }

    return Utils.nearest(this, pool);

  },

  onentitychange: function() {

    this.actionComplete = false;

    this.hoverTime = 0;

    if (this.entity) {

      this.action = this.entity.hoverable;
      this.resetAction();

      if (this.entity.instant) this.actionTimeout = 0;


    } else this.action = false;

    /*
        if (!this.actionSound) this.actionSound = app.sound.play("action").loop().rate(0.5);

        if (!this.action) {
          this.actionSound.stop();
        } else {
          this.actionSound.fadeIn();
        }
        */
    this.updateTooltip();


  },

  resetAction: function() {


    this.actionTimeout = this.times[this.action];

    this.actionDuration = this.actionTimeout;

  },

  upgrade: function(key) {

    this.game.upgrades[key] ++;

    this.game.buttons[key].count = this.getPrice(key);

    var ships = Utils.filter(this.game.entities, function(e) {

      return (e instanceof ENGINE.Ship) && e.team;

    });

    for (var i = 0; i < ships.length; i++) {

      var ship = ships[i];

      this.game.add(ENGINE.CircleExplosion, {
        color: "#0af",
        radius: 32,
        attachedTo: ship
      });

      ship.applyUpgrades(this.game.upgrades)

    }

  },

  getPrice: function(key) {

    return Math.pow(2, this.game.upgrades[key]);

  },

  canProgress: function() {

    switch (this.action) {

      case "repair":

        return this.planet.hp < this.planet.maxHP;

        break;

      case "build":

        if (this.entity.key === "fighter") {

          if (this.game.playerPlanet.max - this.game.playerPlanet.ships <= 0) return false;

          return this.resources > 0;
        } else {

          return this.resources >= this.getPrice(this.entity.key);

        }

        break;

      default:

        return true;

        break;

    }
  },

  progressAction: function(dt) {

    if (this.canProgress() && (this.actionTimeout -= dt) < 0) {

      this.finalizeAction();
      this.resetAction();

    };

    this.progress = 1 - this.actionTimeout / this.actionDuration;


  },

  finalizeAction: function() {

    this.actionComplete = true;

    switch (this.action) {

      case "repair":

        this.planet.repair();

        break;

      case "mining":

        this.entity.dig();

        break;


      case "build":

        switch (this.entity.key) {

          case "fighter":

            this.planet.spawnShip("fighter");
            this.resources -= 1;
            if (!this.game.benchmark) app.sound.play("build");

            break;

          case "life":
          case "damage":
          case "speed":

            this.resources -= this.getPrice(this.entity.key);

            this.upgrade(this.entity.key);

            if (!this.game.benchmark) app.sound.play("upgrade");


            break;

        }

        break;
    }

  },

  hit: function() {

    this.game.shake();

    this.planet.applyDamage(1, this.planet);

    this.game.add(ENGINE.CircleExplosion, {
      x: this.x,
      y: this.y,
      color: "#c02",
      radius: 32
    })

  },

  getHoveredEntity: function() {

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (entity.hoverable && Utils.distance(entity, this) < entity.radius) return entity;

    }

    return null;

  },

  render: function() {

    this.trail.render();

    app.layer.fillStyle(this.color).fillCircle(this.x, this.y, this.dotRadius);

    if (this.action && !this.entity.silent) {

      var mod = Math.min(1, app.ease(2 * this.hoverTime, "outBounce"));

      app.ctx.save();
      app.ctx.translate(this.entity.x, this.entity.y);

      app.ctx.strokeStyle = this.color;
      app.ctx.lineWidth = 2;
      app.ctx.beginPath();
      app.ctx.arc(0, 0, (this.entity.radius + 2) * mod, 0, Math.PI * 2);
      app.ctx.stroke();

      app.ctx.lineWidth = 8;
      app.ctx.beginPath();
      app.ctx.globalAlpha = 0.25;
      app.ctx.arc(0, 0, this.entity.radius + 8, 0, Math.PI * 2)
      app.ctx.stroke()
      app.ctx.globalAlpha = 1.0;

      app.ctx.lineWidth = 8;
      app.ctx.beginPath();
      app.ctx.arc(0, 0, this.entity.radius + 8, 0, this.progress * Math.PI * 2)
      app.ctx.stroke();

      app.ctx.restore();

    }



  },

  canFire: function() {

    if (!this.game.checkBonus("laser")) return;

    if (this.fireCooldown > 0) return;
    if (!this.target) return;
    if (Utils.distance(this, this.target) > this.range) return;

    this.fireCooldown = this.fireInterval;

    this.fire();

  },

  fire: function() {

    this.game.add(ENGINE.Bullet, {
      x: this.x,
      y: this.y,
      team: this.team,
      target: this.target,
      damage: 2,
      speed: 1000
    });

    if (!this.game.benchmark) app.sound.play("laser");

  },

  moveTo: function(destination) {

    this.destination = destination;

  },

  updateTooltip: function() {

    if (this.entity) {
      if (this.entity.tooltip) this.game.tooltip = this.entity.tooltip;
    } else {
      this.game.tooltip = false;
    }

  }

}
ENGINE.Resource = function(args) {

  Utils.extend(this, args);

  this.radius = 32;

  this.direction = Math.random() * 6.28;
  this.speed = 32;

  this.forceDirection = Math.random() * 6.28;
  this.force = 64 + Math.random() * 128;

  this.force *= 3;
  this.forceDamping = this.force;

  this.lifetime = 0;
  this.duration = 10;

  this.value = Math.random() * 3 | 0;

  this.sprite = this.sprites[this.value];
};

ENGINE.Resource.prototype = {

  constructor: ENGINE.Resource,

  quota: 0.7,

  sprites: [
    [333, 105, 10, 10],
    [320, 104, 12, 12],
    [303, 102, 16, 16]
  ],

  type: "resource",


  collect: function() {

    this.game.remove(this);

    if (!this.game.benchmark) app.sound.play("coin");

    this.game.player.poke();

    this.game.add(ENGINE.CircleExplosion, {
      color: "#fc0",
      radius: 8,
      attachedTo: this,
      duration: 0.25
    });

    this.game.player.resources += this.value;

  },

  step: function(dt) {

    this.lifetime += dt;

    var playerDistance = Utils.distance(this, this.game.player);

    if (this.force) {

      this.x += Math.cos(this.forceDirection) * this.force * dt;
      this.y += Math.sin(this.forceDirection) * this.force * dt;

      this.force = Math.max(0, this.force - this.forceDamping * dt);

    }

    if (this.poked && this.game.checkBonus("magnet")) {

      this.direction = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);

      this.x += Math.cos(this.direction) * this.speed * dt;
      this.y += Math.sin(this.direction) * this.speed * dt;


      if (!this.force) {
        this.speed += 256 * dt;
      }

    } else {

      if (playerDistance < 100) {
        this.poked = true;
        this.speed = 128;
      }

    }


    if (this.lifetime > 0.5) {
      if (playerDistance < 32) {
        this.collect();
      }
    }

    if (this.lifetime > this.duration) this.game.remove(this);

  },

  render: function() {

    var scale = 0.2 + 0.8 * Math.sin(Math.PI * (app.lifetime % 0.2 / 0.2));

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.ctx.scale(scale, 1.0);

    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.Button = function(args) {

  Utils.extend(this, {

    radius: 32

  }, args);


  this.image = app.images.spritesheet;

};

ENGINE.Button.prototype = {

  constructor: ENGINE.Button,

  type: "button",

  pointerenter: function() {

    app.tween(this).discard().to({
      radius: 24
    }, 0.1).to({
      radius: 32
    }, 0.2, "outSine");

  },

  action: function() {


    app.sound.play("laser");

  },

  step: function() {

  },

  render: function() {


    if (this.sprite) {
      var scale = this.radius / 32;

      app.ctx.save();

      app.ctx.translate(this.x, this.y);
      app.ctx.drawImage(this.image,
        this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
      );

      app.ctx.restore();

    }

    if (this.count) {
      app.layer.textAlign("center").font("bold 32px Arial").fillStyle(this.color).fillText(this.count, this.x, this.y - this.radius - 48);
    }

  }

};
ENGINE.Particle = function(args) {

  Utils.extend(this, {
    color: "#0fa",
    radius: 4
  }, args)

  this.spriteIndex = 0;

  this.reset();

};

ENGINE.Particle.prototype = {

  constructor: ENGINE.Particle,

  quota: 0.5,

  sprites: [
    [0, 0, 6, 6],
    [0, 7, 5, 5],
    [0, 13, 5, 5],
    [1, 19, 3, 3]
  ],

  reset: function() {

    this.lifetime = 0;
    this.duration = 0.5;

    this.direction = this.game.random() * 6.28;
    this.speed = 32 + this.game.random() * 128;

    this.speed *= 3;

    this.damping = this.speed * 2;

  },

  step: function(dt) {

    this.lifetime += dt;

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    this.speed = Math.max(0, this.speed - this.damping * dt);

    this.progress = Math.min(this.lifetime / this.duration, 1.0);

    if (this.progress >= 1.0) {
      this.x = 0;
      this.y = 0;
      this.progress = 0;
    }

    this.spriteIndex = this.progress * this.sprites.length | 0;

  },

  render: function() {


    // var s = this.size * (1 - this.progress);

    // if (s > 0) {
    if (this.progress >= 1.0) return;

    this.image = app.getColoredImage(app.images.particles, this.color || "#0fa");

    // app.ctx.fillStyle = this.color;
    // app.ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s)

    var sprite = this.sprites[this.spriteIndex];

    app.ctx.drawImage(this.image, sprite[0], sprite[1], sprite[2], sprite[3],
      this.x, this.y, sprite[2], sprite[3])

    // }

  }

};
ENGINE.Planet = function(args) {

  Utils.extend(this, {

    radius: 48,
    hp: 20,
    max: 100,
    ships: 0,
    repairProgress: 0,
    repairTime: 4,
    asteroidsShield: true,
    shieldScale: 0.0

  }, args);

  this.maxHP = this.hp;

  this.lifetime = 0;

};

ENGINE.Planet.prototype = {

  constructor: ENGINE.Planet,

  type: "planet",

  hoverable: "repair",

  sprite: [201, 215, 104, 104],

  shieldSprite: [492, 320, 124, 124],

  repair: function() {

    this.hp++;

  },

  applyDamage: function(damage, attacker) {

    this.game.shake();

    this.hp--;

    if (this.hp <= 0 && !this.game.benchmark) this.game.gameover();

    if (!this.game.benchmark) app.sound.play("planetHit");

    this.game.add(ENGINE.CircleExplosion, {
      x: attacker.x,
      y: attacker.y,
      color: "#a04",
      radius: 32
    })

  },

  step: function(dt) {

    this.lifetime += dt;

    var prevShield = this.asteroidsShield;
    this.asteroidsShield = false;this.game.checkBonus("shield");

    if (prevShield !== this.asteroidsShield) {

      app.tween(this).discard().to({
        shieldScale: this.asteroidsShield ? 1.0 : 0.0
      }, 0.5, "outElastic");

    }

  },

  spawnShip: function(type) {

    var ship = this.game.add(ENGINE.Ship, {
      x: this.x,
      y: this.y,
      type: type,
      team: 1,
      planet: this
    });

    ship.forceDirection = Math.random() * 6;
    ship.force = 200;

    this.ships++;

  },

  render: function() {

    app.layer.align(0.5, 0.5);
    app.layer.drawRegion(app.images.spritesheet, this.sprite, this.x, this.y);
    app.layer.textAlign("center").font("bold 48px Arial").fillStyle("#fff").fillText(this.hp, this.x, this.y - 24);
    app.layer.realign();

    if (this.asteroidsShield && this.shieldScale > 0) {
      var scale = this.shieldScale;
      app.ctx.save();
      app.ctx.globalAlpha = 0.5;
      app.ctx.globalCompositeOperation = "lighter";
      app.ctx.translate(this.x, this.y);
      app.ctx.scale(scale, scale);
      app.ctx.drawImage(app.images.spritesheet, this.shieldSprite[0], this.shieldSprite[1], this.shieldSprite[2], this.shieldSprite[3], -this.shieldSprite[2] / 2, -this.shieldSprite[3] / 2, this.shieldSprite[2], this.shieldSprite[3]);
      app.ctx.restore();
    }

  }

};
/* The counter in the top-left corner is:

AVERAGE FRAME TIME |  DEVICE  POWER   | ENTITIES COUNT
                     (baselineFactor)
*/


/* Reference baseline to calculate device power */

REFERENCE_BASELINE = 378;

/* Reference frame time to tell how well the game has been optimized */
/* Make it higher to give user more CPU power */

REFERENCE_FRAME_TIME = 0.8;

/* How much optimization value one ship drains */

SHIP_CPU_COST = 0.1;

ENGINE.Game = {

  bonuses: {

    magnet: 0.1,
    laser: 0.2,
    shield: 0.4

  },

  explosion: function(x, y, count, color) {

    if (!this.particlesPool) {

      this.particlesPool = [];

      for (var i = 0; i < 100; i++) {

        var particle = this.add(ENGINE.Particle, {
          x: x,
          y: y
        });

        this.particlesPool.push(particle);

      }

      this.particleIndex = 0;

    }

    for (var i = 0; i <= count; i++) {

      if (++this.particleIndex >= this.particlesPool.length) this.particleIndex = 0;;

      var particle = this.particlesPool[this.particleIndex];

      particle.x = x;
      particle.y = y;
      particle.color = color;

      particle.reset();

    }

  },

  random: function() {

    return this.benchmark ? 0.5 : Math.random();

  },

  add: function(constructor, args) {

    args = args || {};

    args.game = this;

    var entity = new constructor(args);

    this.entities.push(entity);

    return entity;

  },

  remove: function(entity) {

    entity.dead = true;

  },

  scaleComicBubble: function() {

    this.comicScale = 1.0;

    $comicbubble = document.body.querySelector("#comicbubble");

    var tween = app.tween(this).to({
      comicScale: 0.5
    });

    tween.onstep = function(app) {

      $comicbubble.style.transform = "scale(" + app.comicScale + "," + app.comicScale + ")";

    }

  },

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Game'
      });
    }

    app.renderer.setSmoothing(false);

    this.scaleComicBubble();

    localStorage.setItem("baseline", app.baseline);

    this.music = app.music.play("dust").volume(0.5).fadeIn(4).loop();

    this.gradient = app.ctx.createRadialGradient(app.center.x, app.center.y, 0, app.center.x, app.center.y, app.center.x);

    this.gradient.addColorStop(0.0, "transparent");
    this.gradient.addColorStop(1.0, "#000");

    this.reset();

  },

  leave: function() {

    this.music.fadeOut(2);

  },

  getScale: function(entity) {

    return 1 - Math.min(1.0, Utils.distance(entity, app.center) / (app.width * 0.5)) * 0.75;

  },

  spawnAsteroid: function() {

    var angle = Math.random() * Math.PI * 2;
    var radius = app.width / 2;
    var ox = Math.cos(angle) * radius;
    var oy = Math.sin(angle) * radius;

    this.add(ENGINE.Asteroid, {
      x: app.center.x + ox,
      y: app.center.y + oy
    });

  },

  reset: function() {

    this.spawnTimeout = 0;
    this.cpuUsage = 0;
    this.cpuBarProgress = 0;

    this.upgrades = {

      speed: 1,
      damage: 1,
      life: 1

    };

    delete this.particlesPool;

    this.score = 0;

    this.wave = 0;

    this.tooltip = false;

    this.entities = [];

    this.stars = this.add(ENGINE.BackgroundStars);

    this.playerPlanet = this.add(ENGINE.Planet, {
      x: app.center.x,
      y: app.center.y,
      team: 1
    });

    this.player = new ENGINE.Cursor(this, 1, this.playerPlanet);

    this.player.x = app.center.x;
    this.player.y = app.center.y;

    for (var i = 0; i < 8; i++) {

      this.spawnAsteroid();

    }

    var buttons = ["speed", "life", "damage"];

    this.buttons = {};

    for (var i = 0; i < buttons.length; i++) {

      var key = buttons[i];

      this.buttons[key] = this.add(ENGINE.Button, {
        color: defs.teamColor[1],
        x: app.center.x - 80 + i * 100,
        y: app.height - 70,
        sprite: defs.buttons[key],
        key: key,
        count: 1,
        hoverable: "build",
        tooltip: defs.tooltips[key]
      })
    }

    this.nextWave();

    this.explosion(app.center.x, app.center.y, 1);

  },

  cpuHistory: [],

  step: function(dt) {

    var before = performance.now();

    /* slow motion - when you collect freeze powerup */

    this.timeFactor = 1.0;

    if (this.freezeLifespan > 0) {

      this.freezeLifespan -= dt;
      this.timeFactor = 0.1;

    }

    /* update the game 10 times to magnitude results in profiler */

    var MAGNIFY = 5;

    var quota = 0.0;

    for (var i = 0; i < this.entities.length; i++) {
      var entity = this.entities[i];
      quota += entity.quota || 0.7;

      for (var j = 0; j < MAGNIFY; j++) {
        entity.step(dt / MAGNIFY);

        if (entity.dead) {
          this.entities.splice(i--, 1);
          break;
        }
      }
    }

    this.quota = quota;

    var frameTime = (performance.now() - before) / MAGNIFY;

    /* measure optimization */

    /* It's the average of 100 frame times */

    /*

      baselineFactor      - baseline vs reference sample to get device power
                            if the device is over-powered we artificialy
                            make frameTime higher to make it more fair among the players

      optimizationRating  - reference frame time divided by (current) average frame time
                            handicaped by baselineFactor - this gives a factor of
                            how well user optimized the game

                            Make REFERENCE_FRAME_TIME higher to give player MORE cpu output

    */


    this.cpuHistory.push(frameTime / quota);

    if (this.cpuHistory.length > 60) this.cpuHistory.shift();

    this.averageFrameTime = this.average(this.cpuHistory);

    this.optimizationRating = ((0.8 / app.baseline) / (this.averageFrameTime));

    this.player.step(dt);

    /* use optimization results to affect the game */

    this.applyOptimization(dt);


  },

  average: function(array) {

    if (!array.length) return 0;

    var sum = 0;

    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }

    return sum / array.length;

  },

  applyOptimization: function(dt) {

    var cpuUsage = 0;

    /* calculate (artificial) cpuUsage of ships
       if cpuUsage is greater than optimizationRating
       freeze a ship
    */

    for (var i = 0; i < this.entities.length; i++) {

      var entity = this.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;
      if (!entity.team) continue;
      if (entity.free) continue;

      cpuUsage += SHIP_CPU_COST;

      if (cpuUsage < this.optimizationRating) {

        entity.frozen = false;

      } else {

        entity.frozen = true;

      }

    }

    /* tween cpuUsage instead of setting it instantly (less jittering) */

    this.cpuUsage = Utils.moveTo(this.cpuUsage, cpuUsage, Math.abs(this.cpuUsage - cpuUsage) * 0.25 * dt);
    this.realCpuUsage = cpuUsage;

    /* that's the value 0.0 - 1.0 that coresponds with the yellow power bar */

    this.cpuRatio = 1 - Math.min(1.0, this.cpuUsage / this.optimizationRating);
    this.cpuBarProgress = Utils.moveTo(this.cpuBarProgress, this.cpuRatio, 0.2 * dt);

    /* spawn ships if there is enough power */

    if ((this.spawnTimeout -= dt) <= 0) {

      this.spawnTimeout = 0.5;

      //if (this.cpuRatio > 0.5) this.playerPlanet.spawnShip("fighter");
      if (this.optimizationRating > this.realCpuUsage + 0.1) this.playerPlanet.spawnShip("fighter");

    }

  },

  shake: function() {

    this.shakeLifespan = 0.4;

  },

  render: function(dt) {

    if (!this.averageFrameTime) return;

    app.ctx.textBaseline = "top";
    app.ctx.save();

    app.ctx.fillStyle = "#282245";
    app.ctx.fillRect(0, 0, app.width, app.height);

    // app.ctx.fillStyle = this.gradient;
    //app.ctx.fillRect(0, 0, app.width, app.height);

    if (this.shakeLifespan > 0) {
      this.shakeLifespan -= dt;
      var chaos = Utils.random(-6, 6);
      app.ctx.translate(chaos, chaos)
    }

    for (var i = 0; i < this.entities.length; i++) {

      this.entities[i].render();

    }

    this.player.render();

    this.renderTooltip();

    app.ctx.textAlign = "right";
    app.ctx.font = "bold 16px Arial";
    app.ctx.fillStyle = "#fff";
    app.ctx.fillText("SCORE: " + this.score, app.width - 20, 20);

    this.renderCPUBar();
    // this.renderBonuses();

    app.ctx.textAlign = "center";
    app.ctx.font = "bold 64px Arial";
    app.ctx.fillStyle = "#fa0";
    app.ctx.fillText(this.player.resources, app.center.x - 180, app.height - 104);

    // app.ctx.textAlign = "left";
    // app.ctx.font = "bold 16px Arial";
    // app.ctx.fillStyle = "#fff";
    // app.ctx.fillText(
    //   this.optimizationRating.toFixed(2) + " | " +
    //   // this.baselineFactor.toFixed(2) + " | " +
    //   this.entities.length + ' + ' +
    //   this.quota.toFixed(1), 16, 16);

    app.ctx.restore();

  },

  barWidth: 200,

  renderCPUBar: function() {


    var width = 200;
    var currentWidth = this.barWidth * this.cpuBarProgress;

    app.ctx.drawImage(app.images.spritesheet,
      defs.frozenSprite[0], defs.frozenSprite[1], defs.frozenSprite[2], defs.frozenSprite[3],
      app.center.x - this.barWidth / 2 - 32, 24, defs.frozenSprite[2], defs.frozenSprite[3]);


    app.ctx.strokeStyle = "#fa0";
    app.ctx.fillStyle = "#fa0";
    app.ctx.lineWidth = 2;

    app.ctx.strokeRect(app.center.x - this.barWidth / 2, 16, this.barWidth, 32)
    app.ctx.fillRect(app.center.x - this.barWidth / 2, 16, currentWidth, 32)

    app.ctx.fillStyle = "#fff";
    app.ctx.textAlign = "center";
    app.fontSize(16);
    app.ctx.fillText("AVAILABLE CPU", app.center.x, 24);

    app.ctx.textAlign = "left";
    app.ctx.fillStyle = "#fa0";

    app.ctx.fillText("+ " + this.optimizationRating.toFixed(2), app.center.x + width / 2 + 16, 16);

    app.ctx.fillStyle = "#c40";
    app.ctx.fillText("- " + this.realCpuUsage.toFixed(2), app.center.x + width / 2 + 16, 32);

  },


  renderBonuses: function() {

    app.ctx.save();
    app.ctx.translate(app.center.x - this.barWidth / 2, 54);
    app.ctx.textAlign = "left";
    app.ctx.textBaseline = "top";

    var i = Object.keys(this.bonuses).length;

    for (var key in this.bonuses) {

      var threshold = this.bonuses[key];

      var x = this.barWidth * threshold;
      var y = i * 16;

      app.ctx.globalAlpha = this.checkBonus(key) ? 1.0 : 0.4;

      app.ctx.fillStyle = "#fff";
      app.ctx.fillRect(x, 0, 2, y);
      app.ctx.fillRect(x, y, 16, 2);

      app.ctx.fillStyle = "#fff";
      app.fontSize(12);
      app.ctx.fillText(defs.bonuses[key].toUpperCase(), x + 20, y - 6);

      i--;

    }

    app.ctx.restore();

  },


  renderTooltip: function() {

    if (!this.tooltip) return;

    app.layer.textAlign("center").fillStyle("#fff").font("16px Arial").textWithBackground(this.tooltip, app.center.x, app.height - 64, "rgba(0,0,0,0.6)", 16);

  },

  pointermove: function(e) {

    this.player.x = e.x;
    this.player.y = e.y;

  },

  wrap: function(entity) {

    if (entity.x + entity.radius < 0) entity.x = app.width + entity.radius;
    if (entity.x - entity.radius > app.width) entity.x = -entity.radius;
    if (entity.y + entity.radius < 0) entity.y = app.height + entity.radius;
    if (entity.y - entity.radius > app.height) entity.y = -entity.radius;

  },

  keydown: function(e) {

  },

  nextWave: function() {

    if (this.benchmark) return;

    this.wave++;

    this.shipsLeft = 0;

    var streamsPositions = [
      [0.0, 1.0],
      [0.0, 0.5],
      [0.0, 0.0],
      [1.0, 0.0],
      [1.0, 0.5],
      [1.0, 1.0]
    ];

    var difficulty = this.wave / 20;

    Utils.shuffle(streamsPositions);

    var streamsCount = Math.min(3, 1 + difficulty) + 0.3 | 0;
    var shipsPerStream = Math.min(16, 4 + difficulty * 4) | 0;

    var possibleShips = [];

    if (this.wave > 0) possibleShips.push("creep1");
    if (this.wave > 3) possibleShips.push("creep2");
    if (this.wave > 6) possibleShips.push("creep3");
    if (this.wave > 10) possibleShips.push("creep4");

    if (this.wave % 5 === 0) possibleShips = ["boss"];

    for (var i = 0; i < streamsCount; i++) {

      var stream = streamsPositions.pop();

      var x = stream[0] * app.width;
      var y = stream[1] * app.height;

      var ship = Utils.random(possibleShips);
      var shipData = defs.ships[ship];
      var angle = Math.atan2(y - app.center.y, x - app.center.x);

      for (var j = 0; j < shipsPerStream; j++) {

        var entity = this.add(ENGINE.Ship, {
          type: ship,
          x: x + Math.cos(angle) * j * 100,
          y: y + Math.sin(angle) * j * 100,
          team: 0
        });

        this.shipsLeft++;

        if (shipData.boss) {

          entity.hp = entity.maxHp = this.score;
          entity.damage = this.score / 50 | 0;
          entity.scale = 0.5 + this.score / 200;

          break;

        }

      }

    }

  },

  repairShips: function() {

    var ships = Utils.filter(this.entities, function(e) {
      return (e instanceof ENGINE.Ship) && e.team;
    });

    for (var i = 0; i < ships.length; i++) {

      ships[i].repair();

    }

  },

  onenemydeath: function(ship) {

    this.shipsLeft--;

    if (this.shipsLeft <= 0) this.nextWave();

  },

  pointerdown: function(e) {

  },

  gameover: function() {

    ENGINE.Gameover.score = this.score;

    if (window.ga) {
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'game',
        'eventAction': 'over',
        'eventValue': this.score,
        'nonInteraction': true
      });
    }

    app.setState(ENGINE.Gameover);

  },

  checkBonus: function(key) {

    return true;

  }

};
ENGINE.Powerup = function(args) {

  Utils.extend(this, args);

  this.radius = 32;

  this.direction = Math.random() * 6.28;
  this.speed = 32;

  this.forceDirection = Math.random() * 6.28;
  this.force = 64 + Math.random() * 128;

  this.force *= 3;
  this.forceDamping = this.force;

  this.lifetime = 0;
  this.duration = 10;

  var keys = ["repair", "missiles", "freeze"];

  var freelanersCount = Utils.filter(this.game.entities, function(e) {
    return e.free && e instanceof ENGINE.Ship;
  }).length;

  if (freelanersCount < 2) keys.push("freelancer");

  this.key = Utils.random(keys);
  this.sprite = this.sprites[this.key];

};

ENGINE.Powerup.prototype = {

  constructor: ENGINE.Powerup,

  sprite: [216, 159, 14, 14],

  type: "powerup",

  sprites: {

    "repair": [245, 89, 23, 25],
    "freelancer": [276, 51, 32, 32],
    "freeze": [242, 119, 19, 21],
    "missiles": [311, 13, 28, 32]

  },

  collect: function() {

    this.game.explosion(this.x, this.y, 16, "#fff");

    this.game.remove(this);

    app.sound.play("powerup");

    this.game.player.poke();

    this.game.add(ENGINE.TextOut, {
      x: this.x,
      y: this.y,
      text: this.key
    });

    switch (this.key) {

      case "freeze":

        this.game.freezeLifespan = 4.0;

        break;

      case "missiles":

        for (var i = 0; i < 4; i++) this.game.add(ENGINE.Missile, {
          x: this.x,
          y: this.y,
          team: 1
        });

        break;

      case "repair":

        this.game.repairShips();

        break;


      case "freelancer":

        var ship = this.game.add(ENGINE.Ship, {
          x: this.x,
          y: this.y,
          type: "freelancer",
          team: 1,
          free: true,
          planet: this.game.playerPlanet
        });

        ship.forceDirection = Math.random() * 6;
        ship.force = 200;

        break;
    }

  },

  step: function(dt) {

    this.lifetime += dt;

    var playerDistance = Utils.distance(this, this.game.player);

    if (this.force) {

      this.x += Math.cos(this.forceDirection) * this.force * dt;
      this.y += Math.sin(this.forceDirection) * this.force * dt;

      this.force = Math.max(0, this.force - this.forceDamping * dt);

    }

    if (this.lifetime > 0.5) {
      if (playerDistance < 32) {
        this.collect();
        this.game.player.resources++;
      }
    }

    if (this.lifetime > this.duration) this.game.remove(this);

  },

  render: function() {

    var linear = app.lifetime % 0.5 / 0.5;
    var scale = 0.8 + Math.sin(Math.PI * linear) * 0.4;

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.ctx.scale(scale, scale);

    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.TextOut = function(args) {

  Utils.extend(this, {
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    fontSize: 24,
    scaleX: 0,
    scaleY: 1.0,
    text: "void",
    duration: 2.0
  }, args);

  var textout = this;

  app.tween(this)
    .to({
      scaleX: 1.0
    }, this.duration * 0.25, "outElastic")
    .wait(this.duration * 0.5)
    .to({
      scaleY: 0.0
    }, this.duration * 0.25, "outCirc")
    .on("finish", function() {
      textout.game.remove(textout);
    });

    ttt = this;

};

ENGINE.TextOut.prototype = {

  constructor: ENGINE.TextOut,

  sprite: [216, 159, 14, 14],

  type: "textout",

  step: function(dt) {

  },

  render: function() {

    if (!this.scaleX || !this.scaleY) return;

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.fontSize(this.fontSize);

    app.ctx.fillStyle = this.color;
    app.ctx.textAlign = "center";

    app.ctx.scale(this.scaleX, this.scaleY);
    app.ctx.fillText(this.text, 0, 0)

    app.ctx.restore();

  }

};
ENGINE.Trail = function(parent, args) {

  this.parent = parent;

  Utils.extend(this, {
    color: "#0fc",
    points: [],
    maxPoints: 5,
    width: 10,
    lifetime: 0,
    lifespan: 0,
    paused: false,
    interval: 0.15,
    stroke: true
  }, args);

};

ENGINE.Trail.prototype = {

  zIndex: 200,

  quota: 0.3,

  reaction: 8,

  clear: function() {

    this.points = [];

  },

  step: function(delta) {

    this.lifetime += delta;

    if (Utils.interval("point", this.interval, this)) {

      if (!this.paused) this.points.push(this.parent.x, this.parent.y);

      if (
        (this.points.length > this.maxPoints * 2) ||
        (this.paused && this.points.length > 0)
      ) {
        this.points.shift();
        this.points.shift();
      }
    }

    this.points[this.points.length - 2] = this.parent.x;
    this.points[this.points.length - 1] = this.parent.y;

    if(this.lifespan && this.lifetime > this.lifespan) {
      this.paused = true;
    }

  },

  render: function() {

    if(this.points.length <= 0) return;

    app.layer.save();
    app.layer.strokeStyle(this.color);
    app.layer.lineCap("square");

    // if (!this.stroke) app.layer.strokeStyle("rgba(0,0,0,0.1)");

    for (var i = 2; i < this.points.length; i += 2) {

      var ratio = i / (2 * this.maxPoints);
      var px = this.points[i - 2];
      var py = this.points[i - 1];
      var nx = this.points[i];
      var ny = this.points[i + 1];
      app.layer.beginPath();
      app.layer.moveTo(px | 0, py | 0);
      app.layer.lineTo(nx | 0, ny | 0);
      app.layer.a(ratio).lineWidth(ratio * this.width);
      app.layer.stroke();
    }

    app.layer.restore();


  }

};
ENGINE.Missile = function(args) {

  Utils.extend(this, {
    speed: 400
  }, args);

  this.color = defs.teamColor[this.team];
  this.radius = 4;
  this.direction = 0;

  this.force = 400;
  this.forceDirection = Math.random() * 6;

  this.trail = new ENGINE.Trail(this, {
    interval: 0.05,
    maxPoints: 10,
    color: "#fa0"
  });

  for (var i = 0; i < this.game.entities.length; i++) {

    var e = this.game.entities[i];

    if (!(e instanceof ENGINE.Ship)) continue;

    if (e.missileTarget) continue;
    if (e.team === this.team) continue;

    e.missileTarget = this;
    this.target = e;

    break;

  }

};

ENGINE.Missile.prototype = {

  sprite: [145, 25, 6, 39],

  quota: 0.5,

  constructor: ENGINE.Missile,

  step: function(dt) {

    if(!this.target) return this.die();

    this.direction = Math.atan2(this.target.y - this.y, this.target.x - this.x);

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    this.force = Math.max(this.force - dt * 400, 0);

    this.x += Math.cos(this.forceDirection) * this.force * dt;
    this.y += Math.sin(this.forceDirection) * this.force * dt;


    if (Utils.distance(this, this.target) < this.radius + this.target.radius) {

      this.hit(this.target);

    }

    this.trail.step(dt);


  },

  hit: function(target) {

    target.applyDamage(10 + this.game.score / 10);

    this.die();

  },

  die: function() {

    this.dead = true;

  },

  render: function() {

    this.trail.render();

  }

};
ENGINE.Gameover = {

  score: 737,
  hiscore: 0,

  starOff: [382, 177, 15, 16],
  starOn: [339, 169, 37, 37],

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Gameover'
      });
    }

    this.done = false;

    app.renderer.setSmoothing(true);

    var hiscore = localStorage.getItem("hiscore") | 0;

    if (hiscore < this.score) {

      this.hiscore = this.score;
      localStorage.setItem("hiscore", hiscore);

    }

    this.music = app.music.play("gameover").fadeIn(3).loop();

    this.currentScore = 0;
    this.stars = [];
    this.scoreOffset = -app.width;
    this.achievedStars = Math.min(10, (this.score / 500) * 10 | 0);

    for (var i = 0; i < 10; i++) {

      this.stars.push({
        x: i * 64,
        y: 64,
        scale: 0
      });

    }

    for (var i = 0; i < this.achievedStars; i++) {

      var star = this.stars[i];

      app.tween(star).wait(i * 0.1).to({
        scale: 1.0,
        y: 64
      }, 2.5, "outElastic");

    }

    app.tween(this).to({

      currentScore: this.score,
      scoreOffset: 0

    }, 2.5, "outElastic").on("finished", function() {

      app.state.done = true;

    });


  },

  step: function() {

  },

  renderStars: function(x, y) {


    for (var i = 0; i < 10; i++) {

      var star = this.stars[i];

      app.layer.save();

      app.layer.translate(star.x + x, star.y + y);

      app.layer.align(0.5, 0.5);

      app.layer.drawRegion(app.images.spritesheet, this.starOff, 0, 0);

      if (star.scale > 0) {

        app.layer.rotate(app.lifetime);
        app.layer.scale(star.scale, star.scale);
        app.layer.drawRegion(app.images.spritesheet, this.starOn, 0, 0);
      }

      app.layer.restore();

    }

  },

  render: function() {

    app.ctx.fillStyle = "#282245";

    app.ctx.fillRect(0, 0, app.width, app.height);

    app.ctx.drawImage(app.images.help, app.center.x - app.images.help.width * 0.5 | 0, -50)

    this.renderStars(app.center.x - 320, 0);

    app.fontSize(48);

    app.ctx.fillStyle = "#fa0";
    app.ctx.textAlign = "center";

    app.ctx.fillText("SCORE: " + (this.currentScore | 0), app.center.x + this.scoreOffset, 180)

    app.fontSize(32);

    app.ctx.fillStyle = "#f40";
    app.ctx.textAlign = "center";

    app.ctx.fillText("HI-SCORE: " + (this.hiscore | 0), app.center.x - this.scoreOffset, 220);

    if (this.done) {

      app.ctx.fillStyle = "#cef";
      app.ctx.textAlign = "center";

      if (app.lifetime % 1 < 0.5) {

        app.ctx.fillText("CLICK TO TRY AGAIN ", app.center.x - this.scoreOffset, 260)

      }

    }

  },

  pointerdown: function() {

    if (this.done) {
      if (window.ga) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': 'game',
          'eventAction': 'restart'
        });
      }

      app.setState(ENGINE.Game);

      ENGINE.Game.reset();

    }

  }

};
document.addEventListener("DOMContentLoaded", function(event) {

  app = playground({

    width: 1024,
    height: 640,

    smoothing: true,

    paths: {

      base: "//mozilla.github.io/devtools-perf-game/"

    },

    updateDownloadText: function() {

      if (navigator.userAgent.indexOf("Firefox/40") > -1) {

        var text = defs.downloadLinks["ffdev"][0];
        var link = defs.downloadLinks["ffdev"][1];

      } else {

        var text = defs.downloadLinks["default"][0];
        var link = defs.downloadLinks["default"][1];

      }

      document.body.querySelector("#comicbubble").innerHTML = text;
      document.body.querySelector("#comicbubble").setAttribute("href", link);

    },

    /* set context font size with default font */

    fontSize: function(size) {

      return this.ctx.font = size + "px 'Squada One'";

    },

    create: function() {

      this.loadImages("spritesheet", "help", "splash", "flare", "particles");

      this.keyboard.preventDefault = false;

      this.sound = this.audio.channel("sound").volume(0.5);
      this.music = this.audio.channel("music").volume(0.5);

      this.ctx = app.layer.context;

      this.game = ENGINE.Game;

    },

    /* all images loaded */

    ready: function() {

      this.updateDownloadText();

      /* cache some known colors for spritesheet */

      this.getColoredImage(this.images.spritesheet, "#fff");

      /* start the benchmark */

      this.setState(ENGINE.Benchmark);

    },

    resize: function() {

      this.state.render(0);

    },

    getColoredImage: function(key, color, mode) {

      if (typeof mode === "undefined") mode = "hard-light";

      if (typeof key === "string") {
        var image = this.images[key];
      } else {
        var image = key;
      }

      var storekey = "color-" + color;

      if (!image[storekey]) {

        if (typeof mix === "undefined") mix = 1;

        var below = document.createElement("canvas");
        belowCtx = below.getContext("2d");

        below.width = image.width;
        below.height = image.height;

        belowCtx.drawImage(image, 0, 0);
        belowCtx.globalCompositeOperation = "source-atop";
        belowCtx.fillStyle = color;
        belowCtx.fillRect(0, 0, image.width, image.height);

        image[storekey] = below;

      }

      return image[storekey];

    },

    roundAngle: function(angle) {

      return Utils.ground(angle - Math.PI / 16, Math.PI / 8);

    },

    visibilitychange: function(hidden) {

      if (hidden) {
        if (!this.storedSoundVolume) {
          this.storedSoundVolume = this.sound.volume();
          this.storedMusicVolume = this.music.volume();
          this.sound.volume(0);
          this.music.volume(0);
        }
      } else {
        if (this.storedSoundVolume) {
          this.sound.volume(this.storedSoundVolume);
          this.music.volume(this.storedMusicVolume);
          this.storedSoundVolume = 0;
          this.storedMusicVolume = 0;
        }
      }

    }

  });

});

var performance = window.performance || window.webkitPerformance || Date;

Math.sign = Math.sign || function(x) {

  x = +x; // convert to a number

  if (x === 0 || isNaN(x)) {

    return x;

  }

  return x > 0 ? 1 : -1;

};
/**
 * This is bad and unoptimized code just for you to fix :)
 *
 * Get Firefox Developer Edition to try the new Performance Tools:
 *   https://www.mozilla.org/firefox/developer/
 *
 * 1. Open the `Performance` tool in Firefox Developer Edition
 * 2. Start recording a performance profile
 * 3. Play the game
 * 4. Stop profiling and check the Call Tree or Flame Chart for the maleficent
 *
 * Got ideas for better bottlenecks or even faster code, file
 * an issue or send us a pull request:
 *   https://github.com/mozilla/devtools-perf-game/issues
 */

/**
 * Creates a new array with all elements that pass the `test` function
 * @param {Array} array The array to filter
 * @param {Function} test Function to test each element, invoked with (element)
 * @return {Array} A new array with only passed elements
 */
Utils.filter = function(array, test) {
  var result = array.slice(); // Clone array
  for (var i = 0; i < result.length; i++) {
    if (!test(result[i])) {
      result.splice(i, 1); // Remove element
      i--;
    }
  }
  return result;
};

/**
 * Find nearest entity from a list of entities
 * @param {Entity} from Entity
 * @param {Entity[]} entities List of entities to compare
 * @return {Entity} Nearest Entity
 */
Utils.nearest = function(from, entities) {
    if (entities.length == 0) {
      return null;
    }
    var nearestEntity = undefined;
    var currentShortestDistance = undefined;

  for (var i = 0; i < entities.length; i++) {
    var to = entities[i];
    if (from === to) continue;
    var distance = this.distance(from, to);
    if(!nearestEntity) {
        nearestEntity = to;
        currentShortestDistance = distance;
        continue;
    }

    if(distance < currentShortestDistance) {
        nearestEntity = to;
        currentShortestDistance = distance;
    }
  }

  return nearestEntity;
};

/**
 * Returns nearest ship of opposite team
 * @return {Ship} Nearest enemy ship
 */
ENGINE.Ship.prototype.getTarget = function() {
  var pool = [];
  for (var i = 0; i < this.game.entities.length; i++) {
    var entity = this.game.entities[i];
    if (!(entity instanceof ENGINE.Ship)) continue;
    if (entity.team !== this.team) pool.push(entity);
  }
  // Is Utils.nearest fast enough?
  return Utils.nearest(this, pool);
};

// We update those for positions, maybe we don't need it?
var axes = {
  x: Math.cos,
  y: Math.sin
};

/**
 * Update position for an entity that has speed and direction.
 * @param {Number} direction Angle given in radians
 * @param {Number} value Distance to move
 */
Utils.moveInDirection = function(direction, value) {
  value /= 100;
  for (var i = 0; i < 100; i++) {
    for (var axis in axes) {
      this[axis] += axes[axis](this.direction) * value;
    }
  }
};

/**
 * Update ship position with current direction and speed
 * @param {Number} dt Time delta for current frame in seconds
 */
ENGINE.Ship.prototype.move = function(dt) {
  if (!this.frozen) {
    Utils.moveInDirection.apply(this, [this.direction, this.speed * dt]);
  }

  if (this.force > 0) {
    this.force -= 200 * dt;
    Utils.moveInDirection.apply(this, [this.forceDirection, this.force * dt]);
  }
};

/**
 * Frame step for a particle
 * @param {Number} dt Time delta for current frame in seconds
 */
ENGINE.Particle.prototype.step = function(dt) {
  this.lifetime += dt;
  // Update position
  for (var axis in axes) {
    this[axis] += axes[axis](this.direction) * this.speed * dt;
  }
  this.speed = Math.max(0, this.speed - this.damping * dt);

  this.progress = Math.min(this.lifetime / this.duration, 1.0);
  // Put particle offscreen for pooling and to keep render time constant
  if (this.progress >= 1.0) {
    this.x = 0;
    this.y = 0;
    this.progress = 0;
  }
  // Update index for current sprite to render
  this.spriteIndex = Math.floor(this.progress * this.sprites.length);
}

/**
 * Check if star is in screen boundaries.
 * Otherwise wrap it to the opposite side of screen.
 * @param {Star} star Probed star
 */
ENGINE.BackgroundStars.prototype.wrap = function(star) {
  var pos = [star.x, star.y, 1, 1];
  var bounds = [0, 0, app.width, app.height];

  if (pos[0] < bounds[0]) star.x = app.width;
  if (pos[1] < bounds[1]) star.y = app.height;

  if (pos[0] > bounds[2]) star.x = 0;
  if (pos[1] > bounds[3]) star.y = 0;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEuanMiLCJzdGF0cy5qcyIsIlV0aWxzLmpzIiwiUGxheWdyb3VuZC5qcyIsIlBsYXlncm91bmQuU2NhbmxpbmVzLmpzIiwiUGxheWdyb3VuZC5Tb3VuZE9uRGVtYW5kLmpzIiwiRW5naW5lLmpzIiwiQmVuY2htYXJrLmpzIiwiQmFja2dyb3VuZFN0YXJzLmpzIiwiQ2lyY2xlRXhwbG9zaW9uLmpzIiwiU2hpcC5qcyIsIkJ1bGxldC5qcyIsIkFzdGVyb2lkLmpzIiwiQ3Vyc29yLmpzIiwiUmVzb3VyY2UuanMiLCJCdXR0b24uanMiLCJQYXJ0aWNsZS5qcyIsIlBsYW5ldC5qcyIsIkdhbWUuanMiLCJQb3dlcnVwLmpzIiwiVGV4dE91dC5qcyIsIlRyYWlsLmpzIiwiTWlzc2lsZS5qcyIsIkdhbWVvdmVyLmpzIiwiTWFpbi5qcyIsImJvdHRsZW5lY2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4M0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNydkJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzViQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGVmcyA9IHtcblxuICB0ZWFtQ29sb3I6IFtcIiNmZjQ0NDRcIiwgXCIjMDBhYWZmXCJdLFxuXG4gIGZyb3plblNwcml0ZTogWzE5MywgODYsIDExLCAxOV0sXG5cbiAgYnV0dG9uczoge1xuICAgIFwiZmlnaHRlclwiOiBbNCwgMzQ1LCA2NCwgNjRdLFxuICAgIFwic3BlZWRcIjogWzEzMiwgMzQ1LCA2NCwgNjRdLFxuICAgIFwibGlmZVwiOiBbNjgsIDM0NSwgNjQsIDY0XSxcbiAgICBcImRhbWFnZVwiOiBbMTk2LCAzNDUsIDY0LCA2NF1cbiAgfSxcblxuICBzaGlwczoge1xuXG4gICAgXCJmaWdodGVyXCI6IHtcblxuICAgICAgcHJlZmVyZW5jZTogW1wic21hbGxcIl0sXG4gICAgICBjb29sZG93bjogMC41LFxuICAgICAgZGFtYWdlOiAxLFxuICAgICAgaHA6IDEwLFxuICAgICAgc3ByaXRlOiBbNDA3LCAxOCwgMzIsIDMyXSxcbiAgICAgIHByaWNlOiAxLFxuICAgICAgc3BlZWQ6IDgwXG5cbiAgICB9LFxuXG4gICAgXCJmcmVlbGFuY2VyXCI6IHtcblxuICAgICAgY29vbGRvd246IDAuNSxcbiAgICAgIGRhbWFnZTogMSxcbiAgICAgIGhwOiAxMCxcbiAgICAgIHNwcml0ZTogWzM2NywgNTksIDMxLCAzMl0sXG4gICAgICBzcGVlZDogODBcblxuICAgIH0sXG5cblxuICAgIFwiY3JlZXAxXCI6IHtcblxuICAgICAgcHJlZmVyZW5jZTogW1wiYmlnXCJdLFxuICAgICAgZGFtYWdlOiAyLFxuICAgICAgY29vbGRvd246IDIsXG4gICAgICBocDogNCxcbiAgICAgIHNwcml0ZTogWzQ0NCwgMjMsIDIyLCAyMV0sXG4gICAgICBwcmljZTogNSxcbiAgICAgIHNwZWVkOiA2MFxuXG4gICAgfSxcblxuICAgIFwiY3JlZXAyXCI6IHtcblxuICAgICAgcHJlZmVyZW5jZTogW1wiYmlnXCJdLFxuICAgICAgZGFtYWdlOiAyLFxuICAgICAgY29vbGRvd246IDIsXG4gICAgICBocDogMTAsXG4gICAgICBzcHJpdGU6IFs0NzEsIDIzLCAzMiwgMjNdLFxuICAgICAgcHJpY2U6IDUsXG4gICAgICBzcGVlZDogODBcblxuICAgIH0sXG5cbiAgICBcImNyZWVwM1wiOiB7XG5cbiAgICAgIHByZWZlcmVuY2U6IFtcImJpZ1wiXSxcbiAgICAgIGRhbWFnZTogNCxcbiAgICAgIGNvb2xkb3duOiAyLFxuICAgICAgaHA6IDMwLFxuICAgICAgc3ByaXRlOiBbNTAzLCAxOSwgMzIsIDI5XSxcbiAgICAgIHByaWNlOiA1LFxuICAgICAgc3BlZWQ6IDUwXG5cbiAgICB9LFxuXG4gICAgXCJjcmVlcDRcIjoge1xuXG4gICAgICBwcmVmZXJlbmNlOiBbXCJiaWdcIl0sXG4gICAgICBkYW1hZ2U6IDYsXG4gICAgICBjb29sZG93bjogMixcbiAgICAgIGhwOiA1MCxcbiAgICAgIHNwcml0ZTogWzUzNSwgMTgsIDMyLCAzMl0sXG4gICAgICBwcmljZTogNSxcbiAgICAgIHNwZWVkOiA1MFxuXG4gICAgfSxcblxuICAgIFwiYm9zc1wiOiB7XG5cbiAgICAgIGRhbWFnZTogMTAsXG4gICAgICBjb29sZG93bjogMixcbiAgICAgIGhwOiA1MDAsXG4gICAgICBzcHJpdGU6IFs0NTYsIDUzLCA2NCwgNjRdLFxuICAgICAgc3BlZWQ6IDMyLFxuICAgICAgYm9zczogdHJ1ZVxuXG4gICAgfVxuXG4gIH0sXG5cbiAgdG9vbHRpcHM6IHtcblxuICAgIFwiZmlnaHRlclwiOiBcImJ1aWxkIGEgZmlnaHRlclwiLFxuICAgIFwic3BlZWRcIjogXCJ1cGdyYWRlIGZpZ2h0ZXJzIHNwZWVkXCIsXG4gICAgXCJsaWZlXCI6IFwidXBncmFkZSBmaWdodGVycyBsaWZlXCIsXG4gICAgXCJkYW1hZ2VcIjogXCJ1cGdyYWRlIGZpZ2h0ZXJzIGRhbWFnZVwiXG5cbiAgfSxcblxuICBib251c2VzOiB7XG4gICAgc2hpZWxkOiBcImFzdGVyb2lkcyBzaGllbGRcIixcbiAgICBsYXNlcjogXCJjdXJzb3IgbGFzZXJcIixcbiAgICBtYWduZXQ6IFwiY29pbiBtYWduZXRcIlxuICB9LFxuXG5cbiAgZG93bmxvYWRMaW5rczoge1xuXG4gICAgXCJmZmRldlwiOiBbXCJMZWFybiBtb3JlIGFib3V0IFBlcmZvcm1hbmNlIFRvb2xzIGluIERldmVsb3BlciBFZGl0aW9uXCIsIFwiaHR0cHM6Ly9oYWNrcy5tb3ppbGxhLm9yZy8/dXRtX3NvdXJjZT1jb2RlcGVuJnV0bV9tZWRpdW09cmVmZXJyYWwmdXRtX2NhbXBhaWduPWZpcmVmb3gtZGV2ZWxvcGVyLWdhbWUmdXRtX2NvbnRlbnQ9bGVhcm4tcGVyZi10b29sc1wiXSxcbiAgICBcImRlZmF1bHRcIjogW1wiR2V0IEZpcmVmb3ggRGV2ZWxvcGVyIEVkaXRpb24gdG8gdHJ5IG91dCB0aGUgbmV3IHBlcmZvcm1hbmNlIHRvb2xzXCIsIFwiaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZmlyZWZveC9kZXZlbG9wZXIvP3V0bV9zb3VyY2U9Y29kZXBlbiZ1dG1fbWVkaXVtPXJlZmVycmFsJnV0bV9jYW1wYWlnbj1maXJlZm94LWRldmVsb3Blci1nYW1lJnV0bV9jb250ZW50PWdhbWUtcHJvbW9cIl1cblxuICB9XG5cbn07IiwiKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1xuKGlbcl0ucT1pW3JdLnF8fFtdKS5wdXNoKGFyZ3VtZW50cyl9LGlbcl0ubD0xKm5ld1xuRGF0ZSgpO2E9cy5jcmVhdGVFbGVtZW50KG8pLFxuXG5tPXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobylbMF07YS5hc3luYz0xO2Euc3JjPWc7bS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLG0pXG59KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XG5cbmdhKCdjcmVhdGUnLCAnVUEtNDk3OTYyMTgtMjYnLCAnYXV0bycpO1xuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTsiLCJ2YXIgVXRpbHMgPSB7XG5cbiAgZXh0ZW5kOiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgICAgYXJndW1lbnRzWzBdW2pdID0gYXJndW1lbnRzW2ldW2pdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gIH0sXG5cbiAgZGlzdGFuY2U6IGZ1bmN0aW9uKGEsIGIpIHtcblxuICAgIHZhciBkeCA9IGEueCAtIGIueDtcbiAgICB2YXIgZHkgPSBhLnkgLSBiLnk7XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICB9LFxuXG4gIG5lYXJlc3Q6IGZ1bmN0aW9uKGZyb20sIGVudGl0aWVzKSB7XG5cbiAgICB2YXIgbWluID0gLTE7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHZhciB0byA9IGVudGl0aWVzW2ldO1xuXG4gICAgICBpZiAoZnJvbSA9PT0gdG8pIGNvbnRpbnVlO1xuXG4gICAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlKGZyb20sIHRvKTtcblxuICAgICAgaWYgKGRpc3RhbmNlIDwgbWluIHx8IG1pbiA8IDApIHtcbiAgICAgICAgbWluID0gZGlzdGFuY2U7XG4gICAgICAgIHJlc3VsdCA9IHRvO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICBjaXJjV3JhcDogZnVuY3Rpb24odmFsKSB7XG5cbiAgICByZXR1cm4gdGhpcy53cmFwKHZhbCwgMCwgTWF0aC5QSSAqIDIpO1xuXG4gIH0sXG5cbiAgd3JhcDogZnVuY3Rpb24odmFsdWUsIG1pbiwgbWF4KSB7XG5cbiAgICBpZiAodmFsdWUgPCBtaW4pIHJldHVybiBtYXggKyAodmFsdWUgJSBtYXgpO1xuICAgIGlmICh2YWx1ZSA+PSBtYXgpIHJldHVybiB2YWx1ZSAlIG1heDtcbiAgICByZXR1cm4gdmFsdWU7XG5cbiAgfSxcblxuICB3cmFwVG86IGZ1bmN0aW9uKHZhbHVlLCB0YXJnZXQsIG1heCwgc3RlcCkge1xuXG4gICAgaWYgKHZhbHVlID09PSB0YXJnZXQpIHJldHVybiB0YXJnZXQ7XG5cbiAgICB2YXIgcmVzdWx0ID0gdmFsdWU7XG5cbiAgICB2YXIgZCA9IHRoaXMud3JhcHBlZERpc3RhbmNlKHZhbHVlLCB0YXJnZXQsIG1heCk7XG5cbiAgICBpZiAoTWF0aC5hYnMoZCkgPCBzdGVwKSByZXR1cm4gdGFyZ2V0O1xuXG4gICAgcmVzdWx0ICs9IChkIDwgMCA/IC0xIDogMSkgKiBzdGVwO1xuXG4gICAgaWYgKHJlc3VsdCA+IG1heCkge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0IC0gbWF4O1xuICAgIH0gZWxzZSBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgcmVzdWx0ID0gbWF4ICsgcmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG5cbiAgfSxcblxuICBjaXJjV3JhcFRvOiBmdW5jdGlvbih2YWx1ZSwgdGFyZ2V0LCBzdGVwKSB7XG5cbiAgICByZXR1cm4gdGhpcy53cmFwVG8odmFsdWUsIHRhcmdldCwgTWF0aC5QSSAqIDIsIHN0ZXApO1xuXG4gIH0sXG5cbiAgY2lyY0Rpc3RhbmNlOiBmdW5jdGlvbihhLCBiKSB7XG5cbiAgICByZXR1cm4gdGhpcy53cmFwcGVkRGlzdGFuY2UoYSwgYiwgTWF0aC5QSSAqIDIpO1xuXG4gIH0sXG5cbiAgd3JhcHBlZERpc3RhbmNlOiBmdW5jdGlvbihhLCBiLCBtYXgpIHtcblxuICAgIGlmIChhID09PSBiKSByZXR1cm4gMDtcbiAgICBlbHNlIGlmIChhIDwgYikge1xuICAgICAgdmFyIGwgPSAtYSAtIG1heCArIGI7XG4gICAgICB2YXIgciA9IGIgLSBhO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbCA9IGIgLSBhO1xuICAgICAgdmFyIHIgPSBtYXggLSBhICsgYjtcbiAgICB9XG5cbiAgICBpZiAoTWF0aC5hYnMobCkgPiBNYXRoLmFicyhyKSkgcmV0dXJuIHI7XG4gICAgZWxzZSByZXR1cm4gbDtcblxuICB9LFxuXG4gIHJhbmRvbTogZnVuY3Rpb24oYSwgYikge1xuXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuXG4gICAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcblxuICAgIH0gZWxzZSBpZiAoYiAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGEgKyBNYXRoLnJhbmRvbSgpICogTWF0aC5hYnMoYiAtIGEgKyAxKSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBpZiAoYSBpbnN0YW5jZW9mIEFycmF5KSByZXR1cm4gYVsoYS5sZW5ndGggKyAxKSAqIE1hdGgucmFuZG9tKCkgLSAxIHwgMF07XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFbdGhpcy5yYW5kb20oT2JqZWN0LmtleXMoYSkpXTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9LFxuXG4gIHNpbmNvczogZnVuY3Rpb24oYW5nbGUsIHJhZGl1cykge1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJhZGl1cyA9IGFuZ2xlO1xuICAgICAgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogNi4yODtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzLFxuICAgICAgeTogTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzXG4gICAgfTtcbiAgfSxcblxuICBncm91bmQ6IGZ1bmN0aW9uKG51bSwgdGhyZXNob2xkKSB7XG5cbiAgICByZXR1cm4gKG51bSAvIHRocmVzaG9sZCB8IDApICogdGhyZXNob2xkO1xuXG4gIH0sXG5cbiAgc2h1ZmZsZTogZnVuY3Rpb24obykge1xuICAgIGZvciAodmFyIGosIHgsIGkgPSBvLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgIHJldHVybiBvO1xuICB9LFxuXG4gIHNpZ246IGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICByZXR1cm4gdmFsdWUgLyBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgfSxcblxuICBtb3ZlVG86IGZ1bmN0aW9uKHZhbHVlLCB0YXJnZXQsIHN0ZXApIHtcblxuICAgIGlmICh2YWx1ZSA8IHRhcmdldCkge1xuICAgICAgdmFsdWUgKz0gc3RlcDtcbiAgICAgIGlmICh2YWx1ZSA+IHRhcmdldCkgdmFsdWUgPSB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID4gdGFyZ2V0KSB7XG4gICAgICB2YWx1ZSAtPSBzdGVwO1xuICAgICAgaWYgKHZhbHVlIDwgdGFyZ2V0KSB2YWx1ZSA9IHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG5cbiAgfSxcblxuICBpbnRlcnZhbDogZnVuY3Rpb24oa2V5LCBpbnRlcnZhbCwgb2JqZWN0KSB7XG5cbiAgICBpZiAoIW9iamVjdC50aHJvdHRsZXMpIG9iamVjdC50aHJvdHRsZXMgPSB7fTtcbiAgICBpZiAoIW9iamVjdC50aHJvdHRsZXNba2V5XSkgb2JqZWN0LnRocm90dGxlc1trZXldID0gb2JqZWN0LmxpZmV0aW1lIC0gaW50ZXJ2YWw7XG5cbiAgICBpZiAob2JqZWN0LmxpZmV0aW1lIC0gb2JqZWN0LnRocm90dGxlc1trZXldID49IGludGVydmFsKSB7XG4gICAgICBvYmplY3QudGhyb3R0bGVzW2tleV0gPSBvYmplY3QubGlmZXRpbWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuXG4gIH0sXG5cbiAgbW92ZUluRGlyZWN0aW9uOiBmdW5jdGlvbihkaXJlY3Rpb24sIHZhbHVlKSB7XG5cbiAgICB0aGlzLnggKz0gTWF0aC5jb3MoZGlyZWN0aW9uKSAqIHZhbHVlO1xuICAgIHRoaXMueSArPSBNYXRoLnNpbihkaXJlY3Rpb24pICogdmFsdWU7XG5cbiAgfSxcblxuICBvc2M6IGZ1bmN0aW9uKHRpbWUsIHBlcmlvZCkge1xuXG4gICAgcmV0dXJuIE1hdGguc2luKE1hdGguUEkgKiAodGltZSAlIHBlcmlvZCAvIHBlcmlvZCkpO1xuXG4gIH0sXG5cbiAgZmlsdGVyOiBmdW5jdGlvbihhcnJheSwgdGVzdCkge1xuXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRlc3QoYXJyYXlbaV0pKSByZXN1bHQucHVzaChhcnJheVtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcblxuICB9LFxuXG4gIHJlY3RJblJlY3Q6IGZ1bmN0aW9uKHIxeCwgcjF5LCByMXcsIHIxaCwgcjJ4LCByMnksIHIydywgcjJoKSB7XG4gICAgcmV0dXJuICEocjJ4ID4gcjF4ICsgcjF3IHx8XG4gICAgICByMnggKyByMncgPCByMXggfHxcbiAgICAgIHIyeSA+IHIxeSArIHIxaCB8fFxuICAgICAgcjJ5ICsgcjJoIDwgcjF5KTtcbiAgfVxuXG5cblxufTsiLCIvKiBmaWxlOiBsaWNlbnNlLnR4dCAqL1xuXG4vKlxuXG4gIFBsYXlncm91bmRKUyByNFxuXG4gIGh0dHA6Ly9wbGF5Z3JvdW5kanMuY29tXG5cbiAgKGMpIDIwMTItMjAxNSBodHRwOi8vcmV6b25lci5uZXRcblxuICBQbGF5Z3JvdW5kIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG4gIGxhdGVzdCBtYWpvciBjaGFuZ2VzOlxuXG4gIHI0XG5cbiAgKyB0d2VlbnMgd2l0aCBldmVudHNcbiAgKyBjb250ZXh0IGFyZ3VtZW50IGZvciBldmVudHNcblxuICByM1xuXG4gICsgcG9pbnRlciA9IG1vdXNlICsgdG91Y2hcblxuKi9cblxuXG4vKiBmaWxlOiBzcmMvbGliL0Vhc2UuanMgKi9cblxuLypcblxuICBFYXNlIDEuMFxuXG4gIGh0dHA6Ly9jYW52YXNxdWVyeS5jb21cblxuICAoYykgMjAxNSBieSBSZXpvbmVyIC0gaHR0cDovL3Jlem9uZXIubmV0XG5cbiAgYGVhc2VgIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG4qL1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGVhc2UgPSBmdW5jdGlvbihwcm9ncmVzcywgZWFzaW5nKSB7XG5cbiAgICBpZiAodHlwZW9mIGVhc2UuY2FjaGVbZWFzaW5nXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cbiAgICAgIHJldHVybiBlYXNlLmNhY2hlW2Vhc2luZ10ocHJvZ3Jlc3MpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGVhc2Uuc3BsaW5lKHByb2dyZXNzLCBlYXNpbmcgfHwgZWFzZS5kZWZhdWx0RWFzaW5nKTtcblxuICAgIH1cblxuICB9O1xuXG4gIHZhciBleHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgICAgYXJndW1lbnRzWzBdW2pdID0gYXJndW1lbnRzW2ldW2pdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gIH07XG5cbiAgZXh0ZW5kKGVhc2UsIHtcblxuICAgIGRlZmF1bHRFYXNpbmc6IFwiMDE2XCIsXG5cbiAgICBjYWNoZToge1xuXG4gICAgICBsaW5lYXI6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHRcbiAgICAgIH0sXG5cbiAgICAgIGluUXVhZDogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdCAqIHRcbiAgICAgIH0sXG4gICAgICBvdXRRdWFkOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0ICogKDIgLSB0KVxuICAgICAgfSxcbiAgICAgIGluT3V0UXVhZDogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdCA8IC41ID8gMiAqIHQgKiB0IDogLTEgKyAoNCAtIDIgKiB0KSAqIHRcbiAgICAgIH0sXG4gICAgICBpbkN1YmljOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0ICogdCAqIHRcbiAgICAgIH0sXG4gICAgICBvdXRDdWJpYzogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gKC0tdCkgKiB0ICogdCArIDFcbiAgICAgIH0sXG4gICAgICBpbk91dEN1YmljOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0IDwgLjUgPyA0ICogdCAqIHQgKiB0IDogKHQgLSAxKSAqICgyICogdCAtIDIpICogKDIgKiB0IC0gMikgKyAxXG4gICAgICB9LFxuICAgICAgaW5RdWFydDogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdCAqIHQgKiB0ICogdFxuICAgICAgfSxcbiAgICAgIG91dFF1YXJ0OiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiAxIC0gKC0tdCkgKiB0ICogdCAqIHRcbiAgICAgIH0sXG4gICAgICBpbk91dFF1YXJ0OiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0IDwgLjUgPyA4ICogdCAqIHQgKiB0ICogdCA6IDEgLSA4ICogKC0tdCkgKiB0ICogdCAqIHRcbiAgICAgIH0sXG4gICAgICBpblF1aW50OiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0ICogdCAqIHQgKiB0ICogdFxuICAgICAgfSxcbiAgICAgIG91dFF1aW50OiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiAxICsgKC0tdCkgKiB0ICogdCAqIHQgKiB0XG4gICAgICB9LFxuICAgICAgaW5PdXRRdWludDogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdCA8IC41ID8gMTYgKiB0ICogdCAqIHQgKiB0ICogdCA6IDEgKyAxNiAqICgtLXQpICogdCAqIHQgKiB0ICogdFxuICAgICAgfSxcbiAgICAgIGluU2luZTogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gLTEgKiBNYXRoLmNvcyh0IC8gMSAqIChNYXRoLlBJICogMC41KSkgKyAxO1xuICAgICAgfSxcbiAgICAgIG91dFNpbmU6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgLyAxICogKE1hdGguUEkgKiAwLjUpKTtcbiAgICAgIH0sXG4gICAgICBpbk91dFNpbmU6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIC0xIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogdCkgLSAxKTtcbiAgICAgIH0sXG4gICAgICBpbkV4cG86IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuICh0ID09IDApID8gMCA6IE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XG4gICAgICB9LFxuICAgICAgb3V0RXhwbzogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gKHQgPT0gMSkgPyAxIDogKC1NYXRoLnBvdygyLCAtMTAgKiB0KSArIDEpO1xuICAgICAgfSxcbiAgICAgIGluT3V0RXhwbzogZnVuY3Rpb24odCkge1xuICAgICAgICBpZiAodCA9PSAwKSByZXR1cm4gMDtcbiAgICAgICAgaWYgKHQgPT0gMSkgcmV0dXJuIDE7XG4gICAgICAgIGlmICgodCAvPSAxIC8gMikgPCAxKSByZXR1cm4gMSAvIDIgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xuICAgICAgICByZXR1cm4gMSAvIDIgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKTtcbiAgICAgIH0sXG4gICAgICBpbkNpcmM6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIC0xICogKE1hdGguc3FydCgxIC0gdCAqIHQpIC0gMSk7XG4gICAgICB9LFxuICAgICAgb3V0Q2lyYzogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSAodCA9IHQgLSAxKSAqIHQpO1xuICAgICAgfSxcbiAgICAgIGluT3V0Q2lyYzogZnVuY3Rpb24odCkge1xuICAgICAgICBpZiAoKHQgLz0gMSAvIDIpIDwgMSkgcmV0dXJuIC0xIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICByZXR1cm4gMSAvIDIgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSk7XG4gICAgICB9LFxuICAgICAgaW5FbGFzdGljOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICB2YXIgYSA9IDE7XG4gICAgICAgIGlmICh0ID09IDApIHJldHVybiAwO1xuICAgICAgICBpZiAodCA9PSAxKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKCFwKSBwID0gMC4zO1xuICAgICAgICBpZiAoYSA8IDEpIHtcbiAgICAgICAgICBhID0gMTtcbiAgICAgICAgICB2YXIgcyA9IHAgLyA0O1xuICAgICAgICB9IGVsc2UgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbigxIC8gYSk7XG4gICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuICAgICAgfSxcbiAgICAgIG91dEVsYXN0aWM6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICB2YXIgcCA9IDA7XG4gICAgICAgIHZhciBhID0gMTtcbiAgICAgICAgaWYgKHQgPT0gMCkgcmV0dXJuIDA7XG4gICAgICAgIGlmICh0ID09IDEpIHJldHVybiAxO1xuICAgICAgICBpZiAoIXApIHAgPSAwLjM7XG4gICAgICAgIGlmIChhIDwgMSkge1xuICAgICAgICAgIGEgPSAxO1xuICAgICAgICAgIHZhciBzID0gcCAvIDQ7XG4gICAgICAgIH0gZWxzZSB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyAxO1xuICAgICAgfSxcbiAgICAgIGluT3V0RWxhc3RpYzogZnVuY3Rpb24odCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICBpZiAodCA9PSAwKSByZXR1cm4gMDtcbiAgICAgICAgaWYgKCh0IC89IDEgLyAyKSA9PSAyKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKCFwKSBwID0gKDAuMyAqIDEuNSk7XG4gICAgICAgIGlmIChhIDwgMSkge1xuICAgICAgICAgIGEgPSAxO1xuICAgICAgICAgIHZhciBzID0gcCAvIDQ7XG4gICAgICAgIH0gZWxzZSB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgaWYgKHQgPCAxKSByZXR1cm4gLS41ICogKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAwLjUgKyAxO1xuICAgICAgfSxcbiAgICAgIGluQmFjazogZnVuY3Rpb24odCwgcykge1xuICAgICAgICBpZiAocyA9PSB1bmRlZmluZWQpIHMgPSAxLjcwMTU4O1xuICAgICAgICByZXR1cm4gMSAqIHQgKiB0ICogKChzICsgMSkgKiB0IC0gcyk7XG4gICAgICB9LFxuICAgICAgb3V0QmFjazogZnVuY3Rpb24odCwgcykge1xuICAgICAgICBpZiAocyA9PSB1bmRlZmluZWQpIHMgPSAxLjcwMTU4O1xuICAgICAgICByZXR1cm4gMSAqICgodCA9IHQgLyAxIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKTtcbiAgICAgIH0sXG4gICAgICBpbk91dEJhY2s6IGZ1bmN0aW9uKHQsIHMpIHtcbiAgICAgICAgaWYgKHMgPT0gdW5kZWZpbmVkKSBzID0gMS43MDE1ODtcbiAgICAgICAgaWYgKCh0IC89IDEgLyAyKSA8IDEpIHJldHVybiAxIC8gMiAqICh0ICogdCAqICgoKHMgKj0gKDEuNTI1KSkgKyAxKSAqIHQgLSBzKSk7XG4gICAgICAgIHJldHVybiAxIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiB0ICsgcykgKyAyKTtcbiAgICAgIH0sXG4gICAgICBpbkJvdW5jZTogZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gMSAtIHRoaXMub3V0Qm91bmNlKDEgLSB0KTtcbiAgICAgIH0sXG4gICAgICBvdXRCb3VuY2U6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgaWYgKCh0IC89IDEpIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICAgIHJldHVybiAoNy41NjI1ICogdCAqIHQpO1xuICAgICAgICB9IGVsc2UgaWYgKHQgPCAoMiAvIDIuNzUpKSB7XG4gICAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAodCAtPSAoMS41IC8gMi43NSkpICogdCArIC43NSk7XG4gICAgICAgIH0gZWxzZSBpZiAodCA8ICgyLjUgLyAyLjc1KSkge1xuICAgICAgICAgIHJldHVybiAoNy41NjI1ICogKHQgLT0gKDIuMjUgLyAyLjc1KSkgKiB0ICsgLjkzNzUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAoNy41NjI1ICogKHQgLT0gKDIuNjI1IC8gMi43NSkpICogdCArIC45ODQzNzUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5PdXRCb3VuY2U6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgaWYgKHQgPCAxIC8gMikgcmV0dXJuIHRoaXMuaW5Cb3VuY2UodCAqIDIpICogMC41O1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRCb3VuY2UodCAqIDIgLSAxKSAqIDAuNSArIDAuNTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdHJhbnNsYXRlRWFzaW5nOiBmdW5jdGlvbihrZXkpIHtcblxuICAgICAgaWYgKCF0aGlzLmNhY2hlW2tleV0pIHtcbiAgICAgICAgdmFyIGFycmF5ID0ga2V5LnNwbGl0KCcnKTtcblxuICAgICAgICB2YXIgc2lnbiA9IDE7XG4gICAgICAgIHZhciBzaWduZWQgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICB2YXIgY2hhciA9IGFycmF5W2ldO1xuXG4gICAgICAgICAgaWYgKGNoYXIgPT09IFwiLVwiKSB7XG4gICAgICAgICAgICBzaWduID0gLTE7XG4gICAgICAgICAgICBzaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaGFyID09PSBcIitcIikge1xuICAgICAgICAgICAgc2lnbiA9IDE7XG4gICAgICAgICAgICBhcnJheS5zcGxpY2UoaS0tLCAxKTtcbiAgICAgICAgICB9IGVsc2UgYXJyYXlbaV0gPSBwYXJzZUludChhcnJheVtpXSwgMTYpICogc2lnbjtcblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluLmFwcGx5KG51bGwsIGFycmF5KTtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGFycmF5KTtcbiAgICAgICAgdmFyIGRpZmYgPSBtYXggLSBtaW47XG4gICAgICAgIHZhciBjYWNoZSA9IFtdO1xuICAgICAgICB2YXIgbm9ybWFsaXplZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc2lnbmVkKSB7XG4gICAgICAgICAgICB2YXIgZGlmZiA9IE1hdGgubWF4KE1hdGguYWJzKG1pbiksIE1hdGguYWJzKG1heCkpXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2goKGFycmF5W2ldKSAvIGRpZmYpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZGlmZiA9IG1heCAtIG1pbjtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaCgoYXJyYXlbaV0gLSBtaW4pIC8gZGlmZik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWNoZVtrZXldID0gbm9ybWFsaXplZDtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jYWNoZVtrZXldXG5cbiAgICB9LFxuXG4gICAgLypcblxuICAgICAgQ3ViaWMtc3BsaW5lIGludGVycG9sYXRpb24gYnkgSXZhbiBLdWNraXJcblxuICAgICAgaHR0cDovL2Jsb2cuaXZhbmsubmV0L2ludGVycG9sYXRpb24td2l0aC1jdWJpYy1zcGxpbmVzLmh0bWxcblxuICAgICAgV2l0aCBzbGlnaHQgbW9kaWZpY2F0aW9ucyBieSBNb3JnYW4gSGVybG9ja2VyXG5cbiAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3JnYW5oZXJsb2NrZXIvY3ViaWMtc3BsaW5lXG5cbiAgICAqL1xuXG4gICAgc3BsaW5lSzoge30sXG4gICAgc3BsaW5lWDoge30sXG4gICAgc3BsaW5lWToge30sXG5cbiAgICBpbnNlcnRJbnRlcm1lZGlhdGVWYWx1ZXM6IGZ1bmN0aW9uKGEpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaChhW2ldKTtcblxuICAgICAgICBpZiAoaSA8IGEubGVuZ3RoIC0gMSkgcmVzdWx0LnB1c2goYVtpICsgMV0gKyAoYVtpXSAtIGFbaSArIDFdKSAqIDAuNik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIHNwbGluZTogZnVuY3Rpb24oeCwga2V5KSB7XG5cbiAgICAgIGlmICghdGhpcy5zcGxpbmVLW2tleV0pIHtcblxuICAgICAgICB2YXIgeHMgPSBbXTtcbiAgICAgICAgdmFyIHlzID0gdGhpcy50cmFuc2xhdGVFYXNpbmcoa2V5KTtcblxuICAgICAgICAvLyB5cyA9IHRoaXMuaW5zZXJ0SW50ZXJtZWRpYXRlVmFsdWVzKHlzKTtcblxuICAgICAgICBpZiAoIXlzLmxlbmd0aCkgcmV0dXJuIDA7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB5cy5sZW5ndGg7IGkrKykgeHMucHVzaChpICogKDEgLyAoeXMubGVuZ3RoIC0gMSkpKTtcblxuICAgICAgICB2YXIga3MgPSB4cy5tYXAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAga3MgPSB0aGlzLmdldE5hdHVyYWxLcyh4cywgeXMsIGtzKTtcblxuICAgICAgICB0aGlzLnNwbGluZVhba2V5XSA9IHhzO1xuICAgICAgICB0aGlzLnNwbGluZVlba2V5XSA9IHlzO1xuICAgICAgICB0aGlzLnNwbGluZUtba2V5XSA9IGtzO1xuXG4gICAgICB9XG5cbiAgICAgIGlmICh4ID4gMSkgcmV0dXJuIHRoaXMuc3BsaW5lWVtrZXldW3RoaXMuc3BsaW5lWVtrZXldLmxlbmd0aCAtIDFdO1xuXG4gICAgICB2YXIga3MgPSB0aGlzLnNwbGluZUtba2V5XTtcbiAgICAgIHZhciB4cyA9IHRoaXMuc3BsaW5lWFtrZXldO1xuICAgICAgdmFyIHlzID0gdGhpcy5zcGxpbmVZW2tleV07XG5cbiAgICAgIHZhciBpID0gMTtcblxuICAgICAgd2hpbGUgKHhzW2ldIDwgeCkgaSsrO1xuXG4gICAgICB2YXIgdCA9ICh4IC0geHNbaSAtIDFdKSAvICh4c1tpXSAtIHhzW2kgLSAxXSk7XG4gICAgICB2YXIgYSA9IGtzW2kgLSAxXSAqICh4c1tpXSAtIHhzW2kgLSAxXSkgLSAoeXNbaV0gLSB5c1tpIC0gMV0pO1xuICAgICAgdmFyIGIgPSAta3NbaV0gKiAoeHNbaV0gLSB4c1tpIC0gMV0pICsgKHlzW2ldIC0geXNbaSAtIDFdKTtcbiAgICAgIHZhciBxID0gKDEgLSB0KSAqIHlzW2kgLSAxXSArIHQgKiB5c1tpXSArIHQgKiAoMSAtIHQpICogKGEgKiAoMSAtIHQpICsgYiAqIHQpO1xuXG4gICAgICAvKlxuICAgICAgdmFyIHB5ID0geXNbaSAtIDJdO1xuICAgICAgdmFyIGN5ID0geXNbaSAtIDFdO1xuICAgICAgdmFyIG55ID0gKGkgPCB5cy5sZW5ndGggLSAxKSA/IHlzW2ldIDogeXNbaSAtIDFdO1xuXG4gICAgICBpZiAocSA+IG55KSB7XG4gICAgICAgIHZhciBkaWZmID0gKHEgLSBweSk7XG4gICAgICAgIC8vcSA9IHB5ICsgZGlmZjtcblxuICAgICAgfVxuXG4gICAgaWYgKGN5ID09PSBueSAmJiBjeSA9PT0gcHkpIHEgPSBweTtcbiAgICAqL1xuXG5cbiAgICAgIHJldHVybiBxO1xuICAgIH0sXG5cbiAgICBnZXROYXR1cmFsS3M6IGZ1bmN0aW9uKHhzLCB5cywga3MpIHtcbiAgICAgIHZhciBuID0geHMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBBID0gdGhpcy56ZXJvc01hdChuICsgMSwgbiArIDIpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykgLy8gcm93c1xuICAgICAge1xuICAgICAgICBBW2ldW2kgLSAxXSA9IDEgLyAoeHNbaV0gLSB4c1tpIC0gMV0pO1xuICAgICAgICBBW2ldW2ldID0gMiAqICgxIC8gKHhzW2ldIC0geHNbaSAtIDFdKSArIDEgLyAoeHNbaSArIDFdIC0geHNbaV0pKTtcbiAgICAgICAgQVtpXVtpICsgMV0gPSAxIC8gKHhzW2kgKyAxXSAtIHhzW2ldKTtcbiAgICAgICAgQVtpXVtuICsgMV0gPSAzICogKCh5c1tpXSAtIHlzW2kgLSAxXSkgLyAoKHhzW2ldIC0geHNbaSAtIDFdKSAqICh4c1tpXSAtIHhzW2kgLSAxXSkpICsgKHlzW2kgKyAxXSAtIHlzW2ldKSAvICgoeHNbaSArIDFdIC0geHNbaV0pICogKHhzW2kgKyAxXSAtIHhzW2ldKSkpO1xuICAgICAgfVxuXG4gICAgICBBWzBdWzBdID0gMiAvICh4c1sxXSAtIHhzWzBdKTtcbiAgICAgIEFbMF1bMV0gPSAxIC8gKHhzWzFdIC0geHNbMF0pO1xuICAgICAgQVswXVtuICsgMV0gPSAzICogKHlzWzFdIC0geXNbMF0pIC8gKCh4c1sxXSAtIHhzWzBdKSAqICh4c1sxXSAtIHhzWzBdKSk7XG5cbiAgICAgIEFbbl1bbiAtIDFdID0gMSAvICh4c1tuXSAtIHhzW24gLSAxXSk7XG4gICAgICBBW25dW25dID0gMiAvICh4c1tuXSAtIHhzW24gLSAxXSk7XG4gICAgICBBW25dW24gKyAxXSA9IDMgKiAoeXNbbl0gLSB5c1tuIC0gMV0pIC8gKCh4c1tuXSAtIHhzW24gLSAxXSkgKiAoeHNbbl0gLSB4c1tuIC0gMV0pKTtcblxuICAgICAgcmV0dXJuIHRoaXMuc29sdmUoQSwga3MpO1xuICAgIH0sXG5cbiAgICBzb2x2ZTogZnVuY3Rpb24oQSwga3MpIHtcbiAgICAgIHZhciBtID0gQS5sZW5ndGg7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IG07IGsrKykgLy8gY29sdW1uXG4gICAgICB7XG4gICAgICAgIC8vIHBpdm90IGZvciBjb2x1bW5cbiAgICAgICAgdmFyIGlfbWF4ID0gMDtcbiAgICAgICAgdmFyIHZhbGkgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIGZvciAodmFyIGkgPSBrOyBpIDwgbTsgaSsrKVxuICAgICAgICAgIGlmIChBW2ldW2tdID4gdmFsaSkge1xuICAgICAgICAgICAgaV9tYXggPSBpO1xuICAgICAgICAgICAgdmFsaSA9IEFbaV1ba107XG4gICAgICAgICAgfVxuICAgICAgICB0aGlzLnNwbGluZVN3YXBSb3dzKEEsIGssIGlfbWF4KTtcblxuICAgICAgICAvLyBmb3IgYWxsIHJvd3MgYmVsb3cgcGl2b3RcbiAgICAgICAgZm9yICh2YXIgaSA9IGsgKyAxOyBpIDwgbTsgaSsrKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IGsgKyAxOyBqIDwgbSArIDE7IGorKylcbiAgICAgICAgICAgIEFbaV1bal0gPSBBW2ldW2pdIC0gQVtrXVtqXSAqIChBW2ldW2tdIC8gQVtrXVtrXSk7XG4gICAgICAgICAgQVtpXVtrXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSBtIC0gMTsgaSA+PSAwOyBpLS0pIC8vIHJvd3MgPSBjb2x1bW5zXG4gICAgICB7XG4gICAgICAgIHZhciB2ID0gQVtpXVttXSAvIEFbaV1baV07XG4gICAgICAgIGtzW2ldID0gdjtcbiAgICAgICAgZm9yICh2YXIgaiA9IGkgLSAxOyBqID49IDA7IGotLSkgLy8gcm93c1xuICAgICAgICB7XG4gICAgICAgICAgQVtqXVttXSAtPSBBW2pdW2ldICogdjtcbiAgICAgICAgICBBW2pdW2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGtzO1xuICAgIH0sXG5cbiAgICB6ZXJvc01hdDogZnVuY3Rpb24ociwgYykge1xuICAgICAgdmFyIEEgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcjsgaSsrKSB7XG4gICAgICAgIEEucHVzaChbXSk7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYzsgaisrKSBBW2ldLnB1c2goMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gQTtcbiAgICB9LFxuXG4gICAgc3BsaW5lU3dhcFJvd3M6IGZ1bmN0aW9uKG0sIGssIGwpIHtcbiAgICAgIHZhciBwID0gbVtrXTtcbiAgICAgIG1ba10gPSBtW2xdO1xuICAgICAgbVtsXSA9IHA7XG4gICAgfVxuICB9KTtcblxuICB3aW5kb3cuZWFzZSA9IGVhc2U7XG5cbn0pKCk7XG5cblxuLyogZmlsZTogc3JjL1BsYXlncm91bmQuanMgKi9cblxuUExBWUdST1VORCA9IHt9O1xuXG5mdW5jdGlvbiBwbGF5Z3JvdW5kKGFyZ3MpIHtcblxuICByZXR1cm4gbmV3IFBMQVlHUk9VTkQuQXBwbGljYXRpb24oYXJncyk7XG5cbn07XG5cbi8qIGZpbGU6IHNyYy9VdGlscy5qcyAqL1xuXG5QTEFZR1JPVU5ELlV0aWxzID0ge1xuXG4gIGV4dGVuZDogZnVuY3Rpb24oKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgICAgYXJndW1lbnRzWzBdW2pdID0gYXJndW1lbnRzW2ldW2pdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XG5cbiAgfSxcblxuICBtZXJnZTogZnVuY3Rpb24oYSkge1xuXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIGIgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBiKSB7XG5cbiAgICAgICAgdmFyIHZhbHVlID0gYltrZXldO1xuXG4gICAgICAgIGlmICh0eXBlb2YgYVtrZXldICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhW2tleV0gPT09IFwib2JqZWN0XCIpIHRoaXMubWVyZ2UoYVtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgZWxzZSBhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYTtcblxuICB9LFxuXG4gIGludm9rZTogZnVuY3Rpb24ob2JqZWN0LCBtZXRob2ROYW1lKSB7XG5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGN1cnJlbnQgPSBvYmplY3RbaV07XG5cbiAgICAgIGlmIChjdXJyZW50W21ldGhvZE5hbWVdKSBjdXJyZW50W21ldGhvZE5hbWVdLmFwcGx5KGN1cnJlbnQsIGFyZ3MpO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgdGhyb3R0bGU6IGZ1bmN0aW9uKGZuLCB0aHJlc2hvbGQpIHtcbiAgICB0aHJlc2hvbGQgfHwgKHRocmVzaG9sZCA9IDI1MCk7XG4gICAgdmFyIGxhc3QsXG4gICAgICBkZWZlclRpbWVyO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgICAgdmFyIG5vdyA9ICtuZXcgRGF0ZSxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmIChsYXN0ICYmIG5vdyA8IGxhc3QgKyB0aHJlc2hvbGQpIHtcbiAgICAgICAgLy8gaG9sZCBvbiB0byBpdFxuICAgICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XG4gICAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIHRocmVzaG9sZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbn07XG5cblBMQVlHUk9VTkQuVXRpbHMuZWFzZSA9IGVhc2U7XG5cblxuLyogZmlsZTogc3JjL0V2ZW50cy5qcyAqL1xuXG5QTEFZR1JPVU5ELkV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gIHRoaXMubGlzdGVuZXJzID0ge307XG5cbn07XG5cblBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSA9IHtcblxuICBvbjogZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cbiAgICBpZiAodHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnQpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLm9uKGtleSwgZXZlbnRba2V5XSwgY29udGV4dClcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudF0pIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuXG4gICAgdmFyIGxpc3RlbmVyID0ge1xuICAgICAgb25jZTogZmFsc2UsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgfTtcblxuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgfSxcblxuICBvbmNlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcblxuICAgIGlmICh0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBldmVudCkge1xuICAgICAgICByZXN1bHRba2V5XSA9IHRoaXMub25jZShrZXksIGV2ZW50W2tleV0sIGNvbnRleHQpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB0aGlzLmxpc3RlbmVyc1tldmVudF0gPSBbXTtcblxuICAgIHZhciBsaXN0ZW5lciA9IHtcbiAgICAgIG9uY2U6IHRydWUsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgfTtcblxuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XVtpXS5fcmVtb3ZlKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5zcGxpY2UoaS0tLCAxKTtcbiAgICAgICAgbGVuLS07XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgdHJpZ2dlcjogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcblxuICAgIC8qIGlmIHlvdSBwcmVmZXIgZXZlbnRzIHBpcGUgKi9cblxuICAgIGlmICh0aGlzLmxpc3RlbmVyc1tcImV2ZW50XCJdKSB7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxpc3RlbmVyc1tcImV2ZW50XCJdLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbXCJldmVudFwiXVtpXTtcblxuICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLmNvbnRleHQgfHwgdGhpcywgZXZlbnQsIGRhdGEpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICAvKiBvciBzdWJzY3JpYmVkIHRvIHNpbmdsZSBldmVudCAqL1xuXG4gICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XVtpXTtcblxuICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLmNvbnRleHQgfHwgdGhpcywgZGF0YSk7XG5cbiAgICAgICAgaWYgKGxpc3RlbmVyLm9uY2UpIHtcbiAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgbGVuLS07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG59O1xuXG4vKiBmaWxlOiBzcmMvU3RhdGVzLmpzICovXG5cblBMQVlHUk9VTkQuU3RhdGVzID0gZnVuY3Rpb24oYXBwKSB7XG5cbiAgdGhpcy5hcHAgPSBhcHA7XG5cbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcblxuICBhcHAub24oXCJzdGVwXCIsIHRoaXMuc3RlcC5iaW5kKHRoaXMpKTtcblxufTtcblxuUExBWUdST1VORC5TdGF0ZXMucHJvdG90eXBlID0ge1xuXG4gIHN0ZXA6IGZ1bmN0aW9uKGRlbHRhKSB7XG5cbiAgICBpZiAoIXRoaXMubmV4dCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudCAmJiB0aGlzLmN1cnJlbnQubG9ja2VkKSByZXR1cm47XG5cbiAgICB2YXIgc3RhdGUgPSB0aGlzLm5leHQ7XG5cbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIpIHN0YXRlID0gbmV3IHN0YXRlO1xuXG4gICAgLyogY3JlYXRlIHN0YXRlIGlmIG9iamVjdCBoYXMgbmV2ZXIgYmVlbiB1c2VkIGFzIGEgc3RhdGUgYmVmb3JlICovXG5cbiAgICBpZiAoIXN0YXRlLl9fY3JlYXRlZCkge1xuXG4gICAgICBzdGF0ZS5fX2NyZWF0ZWQgPSB0cnVlO1xuXG4gICAgICBzdGF0ZS5hcHAgPSB0aGlzLmFwcDtcblxuICAgICAgdGhpcy50cmlnZ2VyKFwiY3JlYXRlc3RhdGVcIiwge1xuICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3RhdGUuY3JlYXRlKSBzdGF0ZS5jcmVhdGUoKTtcblxuICAgIH1cblxuICAgIC8qIGVudGVyIG5ldyBzdGF0ZSAqL1xuXG4gICAgaWYgKHRoaXMuY3VycmVudCkge1xuICAgICAgdGhpcy50cmlnZ2VyKFwibGVhdmVzdGF0ZVwiLCB7XG4gICAgICAgIHByZXY6IHRoaXMuY3VycmVudCxcbiAgICAgICAgbmV4dDogc3RhdGUsXG4gICAgICAgIHN0YXRlOiB0aGlzLmN1cnJlbnRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMudHJpZ2dlcihcImVudGVyc3RhdGVcIiwge1xuICAgICAgcHJldjogdGhpcy5jdXJyZW50LFxuICAgICAgbmV4dDogc3RhdGUsXG4gICAgICBzdGF0ZTogc3RhdGVcbiAgICB9KTtcblxuICAgIHRoaXMuY3VycmVudCA9IHN0YXRlO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudCAmJiB0aGlzLmN1cnJlbnQuZW50ZXIpIHtcbiAgICAgIHRoaXMuY3VycmVudC5lbnRlcigpO1xuICAgIH1cblxuICAgIHRoaXMuYXBwLnN0YXRlID0gdGhpcy5jdXJyZW50O1xuXG4gICAgdGhpcy5uZXh0ID0gZmFsc2U7XG5cblxuICB9LFxuXG4gIHNldDogZnVuY3Rpb24oc3RhdGUpIHtcblxuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmxlYXZlKSB0aGlzLmN1cnJlbnQubGVhdmUoKTtcblxuICAgIHRoaXMubmV4dCA9IHN0YXRlO1xuXG4gICAgdGhpcy5zdGVwKDApO1xuXG4gIH1cblxuXG59O1xuXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELlN0YXRlcy5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XG5cbi8qIGZpbGU6IHNyYy9BcHBsaWNhdGlvbi5qcyAqL1xuXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uID0gZnVuY3Rpb24oYXJncykge1xuXG4gIHZhciBhcHAgPSB0aGlzO1xuXG4gIC8qIGV2ZW50cyAqL1xuXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XG5cbiAgLyogZGVmYXVsdHMgKi9cblxuICBQTEFZR1JPVU5ELlV0aWxzLm1lcmdlKHRoaXMsIHRoaXMuZGVmYXVsdHMsIGFyZ3MpO1xuXG4gIC8qIGd1ZXNzIHNjYWxpbmcgbW9kZSAqL1xuXG4gIHRoaXMuYXV0b1dpZHRoID0gdGhpcy53aWR0aCA/IGZhbHNlIDogdHJ1ZTtcbiAgdGhpcy5hdXRvSGVpZ2h0ID0gdGhpcy5oZWlnaHQgPyBmYWxzZSA6IHRydWU7XG4gIHRoaXMuYXV0b1NjYWxlID0gdGhpcy5zY2FsZSA/IGZhbHNlIDogdHJ1ZTtcblxuICAvKiBnZXQgY29udGFpbmVyICovXG5cbiAgaWYgKCF0aGlzLmNvbnRhaW5lcikgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5ib2R5O1xuXG4gIGlmICh0aGlzLmNvbnRhaW5lciAhPT0gZG9jdW1lbnQuYm9keSkgdGhpcy5jdXN0b21Db250YWluZXIgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgdGhpcy5jb250YWluZXIgPT09IFwic3RyaW5nXCIpIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcik7XG5cbiAgdGhpcy51cGRhdGVTaXplKCk7XG5cbiAgLyogZXZlbnRzICovXG5cbiAgLy8gdGhpcy5lbWl0TG9jYWxFdmVudCA9IHRoaXMuZW1pdExvY2FsRXZlbnQuYmluZCh0aGlzKTtcbiAgLy8gdGhpcy5lbWl0R2xvYmFsRXZlbnQgPSB0aGlzLmVtaXRHbG9iYWxFdmVudC5iaW5kKHRoaXMpO1xuXG4gIC8qIHN0YXRlcyBtYW5hZ2VyICovXG5cbiAgdGhpcy5zdGF0ZXMgPSBuZXcgUExBWUdST1VORC5TdGF0ZXModGhpcyk7XG4gIHRoaXMuc3RhdGVzLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0TG9jYWxFdmVudCwgdGhpcyk7XG5cbiAgLyogbW91c2UgKi9cblxuICB0aGlzLm1vdXNlID0gbmV3IFBMQVlHUk9VTkQuTW91c2UodGhpcywgdGhpcy5jb250YWluZXIpO1xuICB0aGlzLm1vdXNlLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0R2xvYmFsRXZlbnQsIHRoaXMpO1xuXG4gIC8qIHRvdWNoICovXG5cbiAgdGhpcy50b3VjaCA9IG5ldyBQTEFZR1JPVU5ELlRvdWNoKHRoaXMsIHRoaXMuY29udGFpbmVyKTtcbiAgdGhpcy50b3VjaC5vbihcImV2ZW50XCIsIHRoaXMuZW1pdEdsb2JhbEV2ZW50LCB0aGlzKTtcblxuICAvKiBrZXlib2FyZCAqL1xuXG4gIHRoaXMua2V5Ym9hcmQgPSBuZXcgUExBWUdST1VORC5LZXlib2FyZCgpO1xuICB0aGlzLmtleWJvYXJkLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0R2xvYmFsRXZlbnQsIHRoaXMpO1xuXG4gIC8qIGdhbWVwYWRzICovXG5cbiAgdGhpcy5nYW1lcGFkcyA9IG5ldyBQTEFZR1JPVU5ELkdhbWVwYWRzKHRoaXMpO1xuICB0aGlzLmdhbWVwYWRzLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0R2xvYmFsRXZlbnQsIHRoaXMpO1xuXG4gIC8qIHR3ZWVucyAqL1xuXG4gIHRoaXMudHdlZW5zID0gbmV3IFBMQVlHUk9VTkQuVHdlZW5NYW5hZ2VyKHRoaXMpO1xuXG4gIC8qIGVhc2UgKi9cblxuICB0aGlzLmVhc2UgPSBQTEFZR1JPVU5ELlV0aWxzLmVhc2U7XG5cbiAgLyogc291bmQgKi9cblxuICBQTEFZR1JPVU5ELlNvdW5kKHRoaXMpO1xuXG4gIC8qIHdpbmRvdyByZXNpemUgKi9cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAvKiB2aXNpbGliaXR5Y2hhbmdlICovXG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhpZGRlbiA9IGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PSAnaGlkZGVuJztcbiAgICBhcHAuZW1pdEdsb2JhbEV2ZW50KFwidmlzaWJpbGl0eWNoYW5nZVwiLCBoaWRkZW4pO1xuICB9KTtcblxuICAvKiBhc3NldHMgY29udGFpbmVycyAqL1xuXG4gIHRoaXMuaW1hZ2VzID0ge307XG4gIHRoaXMuYXRsYXNlcyA9IHt9O1xuICB0aGlzLmRhdGEgPSB7fTtcblxuICB0aGlzLmxvYWRlciA9IG5ldyBQTEFZR1JPVU5ELkxvYWRlcih0aGlzKTtcblxuICB0aGlzLmxvYWRGb28oMC4yNSk7XG5cbiAgLyogY3JlYXRlIHBsdWdpbnMgaW4gdGhlIHNhbWUgd2F5ICovXG5cbiAgdGhpcy5wbHVnaW5zID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIFBMQVlHUk9VTkQpIHtcblxuICAgIHZhciBwcm9wZXJ0eSA9IFBMQVlHUk9VTkRba2V5XTtcblxuICAgIGlmIChwcm9wZXJ0eS5wbHVnaW4pIHRoaXMucGx1Z2lucy5wdXNoKG5ldyBwcm9wZXJ0eSh0aGlzKSk7XG5cbiAgfVxuXG4gIC8qIGZsb3cgKi9cblxuICB0aGlzLmVtaXRHbG9iYWxFdmVudChcInByZWxvYWRcIik7XG5cbiAgdGhpcy5maXJzdEJhdGNoID0gdHJ1ZTtcblxuICBmdW5jdGlvbiBvblByZWxvYWRFbmQoKSB7XG5cbiAgICBhcHAubG9hZEZvbygwLjI1KTtcblxuICAgIC8qIHJ1biBldmVyeXRoaW5nIGluIHRoZSBuZXh0IGZyYW1lICovXG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICBhcHAuZW1pdExvY2FsRXZlbnQoXCJjcmVhdGVcIik7XG5cbiAgICAgIGFwcC5zZXRTdGF0ZShQTEFZR1JPVU5ELkRlZmF1bHRTdGF0ZSk7XG4gICAgICBhcHAuaGFuZGxlUmVzaXplKCk7XG4gICAgICBhcHAuc2V0U3RhdGUoUExBWUdST1VORC5Mb2FkaW5nU2NyZWVuKTtcblxuICAgICAgLyogZ2FtZSBsb29wICovXG5cbiAgICAgIFBMQVlHUk9VTkQuR2FtZUxvb3AoYXBwKTtcblxuICAgIH0pO1xuXG4gICAgLyogc3RhZ2UgcHJvcGVyIGxvYWRpbmcgc3RlcCAqL1xuXG4gICAgYXBwLmxvYWRlci5vbmNlKFwicmVhZHlcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGFwcC5maXJzdEJhdGNoID0gZmFsc2U7XG5cbiAgICAgIGFwcC5zZXRTdGF0ZShQTEFZR1JPVU5ELkRlZmF1bHRTdGF0ZSk7XG5cbiAgICAgIGFwcC5lbWl0TG9jYWxFdmVudChcInJlYWR5XCIpO1xuICAgICAgYXBwLmhhbmRsZVJlc2l6ZSgpO1xuXG5cbiAgICB9KTtcblxuXG4gIH07XG5cblxuICB0aGlzLmxvYWRlci5vbmNlKFwicmVhZHlcIiwgb25QcmVsb2FkRW5kKTtcblxufTtcblxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUgPSB7XG5cbiAgZGVmYXVsdHM6IHtcbiAgICBzbW9vdGhpbmc6IDEsXG4gICAgcGF0aHM6IHtcbiAgICAgIGJhc2U6IFwiXCIsXG4gICAgICBpbWFnZXM6IFwiaW1hZ2VzL1wiXG4gICAgfSxcbiAgICBvZmZzZXRYOiAwLFxuICAgIG9mZnNldFk6IDBcbiAgfSxcblxuICBzZXRTdGF0ZTogZnVuY3Rpb24oc3RhdGUpIHtcblxuICAgIHRoaXMuc3RhdGVzLnNldChzdGF0ZSk7XG5cbiAgfSxcblxuICBnZXRQYXRoOiBmdW5jdGlvbih0bykge1xuXG4gICAgcmV0dXJuIHRoaXMucGF0aHMuYmFzZSArICh0aGlzLnBhdGhzW3RvXSB8fCAodG8gKyBcIi9cIikpO1xuXG4gIH0sXG5cbiAgZ2V0QXNzZXRFbnRyeTogZnVuY3Rpb24ocGF0aCwgZm9sZGVyLCBkZWZhdWx0RXh0ZW5zaW9uKSB7XG5cbiAgICAvKiB0cmFuc2xhdGUgZm9sZGVyIGFjY29yZGluZyB0byB1c2VyIHByb3ZpZGVkIHBhdGhzXG4gICAgICAgb3IgbGVhdmUgYXMgaXMgKi9cblxuICAgIHZhciBmb2xkZXIgPSB0aGlzLnBhdGhzW2ZvbGRlcl0gfHwgKGZvbGRlciArIFwiL1wiKTtcblxuICAgIHZhciBmaWxlaW5mbyA9IHBhdGgubWF0Y2goLyguKilcXC4uKi8pO1xuICAgIHZhciBrZXkgPSBmaWxlaW5mbyA/IGZpbGVpbmZvWzFdIDogcGF0aDtcblxuICAgIHZhciB0ZW1wID0gcGF0aC5zcGxpdChcIi5cIik7XG4gICAgdmFyIGJhc2VuYW1lID0gcGF0aDtcblxuICAgIGlmICh0ZW1wLmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBleHQgPSB0ZW1wLnBvcCgpO1xuICAgICAgcGF0aCA9IHRlbXAuam9pbihcIi5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBleHQgPSBkZWZhdWx0RXh0ZW5zaW9uO1xuICAgICAgYmFzZW5hbWUgKz0gXCIuXCIgKyBkZWZhdWx0RXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IGtleSxcbiAgICAgIHVybDogdGhpcy5wYXRocy5iYXNlICsgZm9sZGVyICsgYmFzZW5hbWUsXG4gICAgICBwYXRoOiB0aGlzLnBhdGhzLmJhc2UgKyBmb2xkZXIgKyBwYXRoLFxuICAgICAgZXh0OiBleHRcbiAgICB9O1xuXG4gIH0sXG5cbiAgLyogZXZlbnRzIHRoYXQgc2hvdWxkbid0IGZsb3cgZG93biB0byB0aGUgc3RhdGUgKi9cblxuICBlbWl0TG9jYWxFdmVudDogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcblxuICAgIHRoaXMudHJpZ2dlcihldmVudCwgZGF0YSk7XG5cbiAgICBpZiAoKCF0aGlzLmZpcnN0QmF0Y2ggfHwgdGhpcy5sb2FkZXIucmVhZHkpICYmIHRoaXNbZXZlbnRdKSB0aGlzW2V2ZW50XShkYXRhKTtcblxuICB9LFxuXG4gIC8qIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBwYXNzZWQgdG8gdGhlIHN0YXRlICovXG5cbiAgZW1pdEdsb2JhbEV2ZW50OiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xuXG4gICAgaWYgKCF0aGlzLnN0YXRlKSByZXR1cm4gdGhpcy5lbWl0TG9jYWxFdmVudChldmVudCwgZGF0YSk7XG5cbiAgICB0aGlzLnRyaWdnZXIoZXZlbnQsIGRhdGEpO1xuXG4gICAgaWYgKCghdGhpcy5maXJzdEJhdGNoIHx8IHRoaXMubG9hZGVyLnJlYWR5KSAmJiB0aGlzLmV2ZW50KSB0aGlzLmV2ZW50KGV2ZW50LCBkYXRhKTtcblxuICAgIGlmICgoIXRoaXMuZmlyc3RCYXRjaCB8fCB0aGlzLmxvYWRlci5yZWFkeSkgJiYgdGhpc1tldmVudF0pIHRoaXNbZXZlbnRdKGRhdGEpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuZXZlbnQpIHRoaXMuc3RhdGUuZXZlbnQoZXZlbnQsIGRhdGEpO1xuXG4gICAgaWYgKHRoaXMuc3RhdGVbZXZlbnRdKSB0aGlzLnN0YXRlW2V2ZW50XShkYXRhKTtcblxuICAgIHRoaXMudHJpZ2dlcihcInBvc3RcIiArIGV2ZW50LCBkYXRhKTtcblxuICAgIC8vIGlmICh0aGlzLnN0YXRlLnByb3h5KSB0aGlzLnN0YXRlLnByb3h5KGV2ZW50LCBkYXRhKTtcblxuICB9LFxuXG4gIHVwZGF0ZVNpemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXMuY3VzdG9tQ29udGFpbmVyKSB7XG5cbiAgICAgIHZhciBjb250YWluZXJXaWR0aCA9IHRoaXMuY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgdmFyIGNvbnRhaW5lckhlaWdodCA9IHRoaXMuY29udGFpbmVyLm9mZnNldEhlaWdodDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHZhciBjb250YWluZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgdmFyIGNvbnRhaW5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIH1cblxuICAgIGlmICghdGhpcy5hdXRvU2NhbGUgJiYgIXRoaXMuYXV0b1dpZHRoICYmICF0aGlzLmF1dG9IZWlnaHQpIHtcblxuICAgIH0gZWxzZSBpZiAoIXRoaXMuYXV0b0hlaWdodCAmJiB0aGlzLmF1dG9XaWR0aCkge1xuXG4gICAgICBpZiAodGhpcy5hdXRvU2NhbGUpIHRoaXMuc2NhbGUgPSBjb250YWluZXJIZWlnaHQgLyB0aGlzLmhlaWdodDtcblxuICAgICAgdGhpcy53aWR0aCA9IE1hdGguY2VpbChjb250YWluZXJXaWR0aCAvIHRoaXMuc2NhbGUpO1xuXG4gICAgfSBlbHNlIGlmICghdGhpcy5hdXRvV2lkdGggJiYgdGhpcy5hdXRvSGVpZ2h0KSB7XG5cbiAgICAgIGlmICh0aGlzLmF1dG9TY2FsZSkgdGhpcy5zY2FsZSA9IGNvbnRhaW5lcldpZHRoIC8gdGhpcy53aWR0aDtcblxuICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLmNlaWwoY29udGFpbmVySGVpZ2h0IC8gdGhpcy5zY2FsZSk7XG5cblxuICAgIH0gZWxzZSBpZiAodGhpcy5hdXRvV2lkdGggJiYgdGhpcy5hdXRvSGVpZ2h0ICYmIHRoaXMuYXV0b1NjYWxlKSB7XG5cbiAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgdGhpcy53aWR0aCA9IGNvbnRhaW5lcldpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSBjb250YWluZXJIZWlnaHQ7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1dpZHRoICYmIHRoaXMuYXV0b0hlaWdodCkge1xuXG4gICAgICB0aGlzLndpZHRoID0gTWF0aC5jZWlsKGNvbnRhaW5lcldpZHRoIC8gdGhpcy5zY2FsZSk7XG4gICAgICB0aGlzLmhlaWdodCA9IE1hdGguY2VpbChjb250YWluZXJIZWlnaHQgLyB0aGlzLnNjYWxlKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuc2NhbGUgPSBNYXRoLm1pbihjb250YWluZXJXaWR0aCAvIHRoaXMud2lkdGgsIGNvbnRhaW5lckhlaWdodCAvIHRoaXMuaGVpZ2h0KTtcblxuICAgIH1cblxuICAgIHRoaXMub2Zmc2V0WCA9IChjb250YWluZXJXaWR0aCAtIHRoaXMud2lkdGggKiB0aGlzLnNjYWxlKSAvIDIgfCAwO1xuICAgIHRoaXMub2Zmc2V0WSA9IChjb250YWluZXJIZWlnaHQgLSB0aGlzLmhlaWdodCAqIHRoaXMuc2NhbGUpIC8gMiB8IDA7XG5cbiAgICB0aGlzLmNlbnRlciA9IHtcbiAgICAgIHg6IHRoaXMud2lkdGggLyAyIHwgMCxcbiAgICAgIHk6IHRoaXMuaGVpZ2h0IC8gMiB8IDBcbiAgICB9O1xuXG4gIH0sXG5cbiAgaGFuZGxlUmVzaXplOiBQTEFZR1JPVU5ELlV0aWxzLnRocm90dGxlKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy51cGRhdGVTaXplKCk7XG5cbiAgICB0aGlzLm1vdXNlLmhhbmRsZVJlc2l6ZSgpO1xuICAgIHRoaXMudG91Y2guaGFuZGxlUmVzaXplKCk7XG5cbiAgICB0aGlzLmVtaXRHbG9iYWxFdmVudChcInJlc2l6ZVwiLCB7fSk7XG5cbiAgfSwgMTYpLFxuXG4gIC8qXG4gICAgcmVxdWVzdCBhIGZpbGUgb3ZlciBodHRwXG4gICAgaXQgc2hhbGwgYmUgbGF0ZXIgYW4gYWJzdHJhY3Rpb24gdXNpbmcgJ2ZzJyBpbiBub2RlLXdlYmtpdFxuXG4gICAgcmV0dXJucyBhIHByb21pc2VcbiAgKi9cblxuICByZXF1ZXN0OiBmdW5jdGlvbih1cmwpIHtcblxuICAgIGZ1bmN0aW9uIHByb21pc2Uoc3VjY2VzcywgZmFpbCkge1xuXG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICB2YXIgYXBwID0gdGhpcztcblxuICAgICAgcmVxdWVzdC5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG5cbiAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgeGhyID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgJiYgeGhyLnN0YXR1cyAhPT0gMCkge1xuXG4gICAgICAgICAgcmV0dXJuIGZhaWwobmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCBcIiArIHVybCkpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBzdWNjZXNzKHhocik7XG5cbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5zZW5kKCk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocHJvbWlzZSk7XG5cbiAgfSxcblxuICAvKiBpbWFnaW5hcnkgdGltZW91dCB0byBkZWxheSBsb2FkaW5nICovXG5cbiAgbG9hZEZvbzogZnVuY3Rpb24odGltZW91dCkge1xuXG4gICAgdmFyIGxvYWRlciA9IHRoaXMubG9hZGVyO1xuXG4gICAgdGhpcy5sb2FkZXIuYWRkKFwiZm9vIFwiICsgdGltZW91dCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgbG9hZGVyLnN1Y2Nlc3MoXCJmb28gXCIgKyB0aW1lb3V0KTtcbiAgICB9LCB0aW1lb3V0ICogMTAwMCk7XG5cbiAgfSxcblxuICAvKiBkYXRhL2pzb24gKi9cblxuICBsb2FkRGF0YTogZnVuY3Rpb24oKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIikge1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhcmcpIHRoaXMubG9hZERhdGEoYXJnW2tleV0pO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMubG9hZERhdGFJdGVtKGFyZyk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9LFxuXG4gIGxvYWREYXRhSXRlbTogZnVuY3Rpb24obmFtZSkge1xuXG4gICAgdmFyIGVudHJ5ID0gdGhpcy5nZXRBc3NldEVudHJ5KG5hbWUsIFwiZGF0YVwiLCBcImpzb25cIik7XG5cbiAgICB2YXIgYXBwID0gdGhpcztcblxuICAgIHRoaXMubG9hZGVyLmFkZCgpO1xuXG4gICAgdGhpcy5yZXF1ZXN0KGVudHJ5LnVybCkudGhlbihwcm9jZXNzRGF0YSk7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzRGF0YShyZXF1ZXN0KSB7XG5cbiAgICAgIGlmIChlbnRyeS5leHQgPT09IFwianNvblwiKSB7XG4gICAgICAgIGFwcC5kYXRhW2VudHJ5LmtleV0gPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwcC5kYXRhW2VudHJ5LmtleV0gPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICAgIH1cblxuICAgICAgYXBwLmxvYWRlci5zdWNjZXNzKGVudHJ5LnVybCk7XG5cbiAgICB9XG5cbiAgfSxcblxuICAvKiBpbWFnZXMgKi9cblxuICBsb2FkSW1hZ2U6IGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHRoaXMubG9hZEltYWdlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gIH0sXG5cbiAgbG9hZEltYWdlczogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIC8qIHBvbHltb3JwaGlzbSBhdCBpdHMgZmluZXN0ICovXG5cbiAgICAgIGlmICh0eXBlb2YgYXJnID09PSBcIm9iamVjdFwiKSB7XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZykgcHJvbWlzZXMgPSBwcm9taXNlcy5jb25jYXQodGhpcy5sb2FkSW1hZ2VzKGFyZ1trZXldKSk7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRPbmVJbWFnZShhcmcpKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICB9LFxuXG4gIGxvYWRPbmVJbWFnZTogZnVuY3Rpb24obmFtZSkge1xuXG4gICAgdmFyIGFwcCA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMuX2ltYWdlTG9hZGVycykgdGhpcy5faW1hZ2VMb2FkZXJzID0ge307XG5cbiAgICBpZiAoIXRoaXMuX2ltYWdlTG9hZGVyc1tuYW1lXSkge1xuXG4gICAgICB2YXIgcHJvbWlzZSA9IGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIC8qIGlmIGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvYXJyYXkgbGV0J3MgdHJ5IHRvIGxvYWQgaXQgKi9cblxuICAgICAgICB2YXIgbG9hZGVyID0gYXBwLmxvYWRlcjtcblxuICAgICAgICB2YXIgZW50cnkgPSBhcHAuZ2V0QXNzZXRFbnRyeShuYW1lLCBcImltYWdlc1wiLCBcInBuZ1wiKTtcblxuICAgICAgICBhcHAubG9hZGVyLmFkZChlbnRyeS5wYXRoKTtcblxuICAgICAgICB2YXIgaW1hZ2UgPSBhcHAuaW1hZ2VzW2VudHJ5LmtleV0gPSBuZXcgSW1hZ2U7XG5cbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICByZXNvbHZlKGltYWdlKTtcbiAgICAgICAgICBsb2FkZXIuc3VjY2VzcyhlbnRyeS51cmwpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIHJlamVjdChcImNhbid0IGxvYWQgXCIgKyBlbnRyeS51cmwpO1xuICAgICAgICAgIGxvYWRlci5lcnJvcihlbnRyeS51cmwpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGltYWdlLnNyYyA9IGVudHJ5LnVybDtcblxuICAgICAgfTtcblxuICAgICAgYXBwLl9pbWFnZUxvYWRlcnNbbmFtZV0gPSBuZXcgUHJvbWlzZShwcm9taXNlKTtcblxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pbWFnZUxvYWRlcnNbbmFtZV07XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gIH1cblxufTtcblxuUExBWUdST1VORC5VdGlscy5leHRlbmQoUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XG5cblxuXG4vKiBmaWxlOiBzcmMvR2FtZUxvb3AuanMgKi9cblxuUExBWUdST1VORC5HYW1lTG9vcCA9IGZ1bmN0aW9uKGFwcCkge1xuXG4gIGFwcC5saWZldGltZSA9IDA7XG4gIGFwcC5vcHMgPSAwO1xuICBhcHAub3Bjb3N0ID0gMDtcblxuICB2YXIgbGFzdFRpY2sgPSBEYXRlLm5vdygpO1xuICB2YXIgZnJhbWUgPSAwO1xuICB2YXIgdW5ib3VuZGVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gcmVuZGVyKGR0KSB7XG5cbiAgICBhcHAuZW1pdEdsb2JhbEV2ZW50KFwicmVuZGVyXCIsIGR0KVxuICAgIGFwcC5lbWl0R2xvYmFsRXZlbnQoXCJwb3N0cmVuZGVyXCIsIGR0KVxuXG4gIH07XG5cbiAgZnVuY3Rpb24gc3RlcChkdCkge1xuXG4gICAgYXBwLmVtaXRHbG9iYWxFdmVudChcInN0ZXBcIiwgZHQpXG5cbiAgfTtcblxuICBmdW5jdGlvbiBnYW1lTG9vcCgpIHtcbiAgICBpZiAocmVxdWVzdElkID09IDApIHsgLy8gV2luZG93IGlzIGJsdXJyZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWFwcC51bmJvdW5kKSB7XG4gICAgICBpZiAoYXBwLmltbWlkaWF0ZSkge1xuICAgICAgICBzZXRaZXJvVGltZW91dChnYW1lTG9vcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBkZWx0YSA9IERhdGUubm93KCkgLSBsYXN0VGljaztcblxuICAgIGxhc3RUaWNrID0gRGF0ZS5ub3coKTtcblxuICAgIGlmIChhcHAudW5ib3VuZCkge1xuICAgICAgZGVsdGEgPSAyMDtcbiAgICB9XG5cbiAgICBpZiAoZGVsdGEgPiAxMDAwKSByZXR1cm47XG5cbiAgICB2YXIgZHQgPSBkZWx0YSAvIDEwMDA7XG5cbiAgICBhcHAubGlmZXRpbWUgKz0gZHQ7XG4gICAgYXBwLmVsYXBzZWQgPSBkdDtcblxuICAgIHN0ZXAoZHQpO1xuXG4gICAgcmVuZGVyKGR0KTtcblxuICAgIGlmIChhcHAudW5ib3VuZCAmJiAhdW5ib3VuZGVkKSB7XG4gICAgICB1bmJvdW5kZWQgPSB0cnVlO1xuICAgICAgd2hpbGUgKGFwcC51bmJvdW5kKSB7XG4gICAgICAgIGdhbWVMb29wKCk7XG4gICAgICB9XG4gICAgICB1bmJvdW5kZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uKCkge1xuICAgIGlmIChyZXF1ZXN0SWQgIT0gMCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxdWVzdElkKTtcbiAgICAgIGFwcC5lbWl0R2xvYmFsRXZlbnQoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIHRydWUpO1xuICAgICAgcmVxdWVzdElkID0gMDtcbiAgICB9XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKCkge1xuICAgIGlmICghcmVxdWVzdElkKSB7XG4gICAgICByZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgYXBwLmVtaXRHbG9iYWxFdmVudChcInZpc2liaWxpdHljaGFuZ2VcIiwgZmFsc2UpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIHJlcXVlc3RJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG5cbn07XG5cbi8vIENvcHlyaWdodCBkYmFyb24sIHZpYSBodHRwOi8vZGJhcm9uLm9yZy9sb2cvMjAxMDAzMDktZmFzdGVyLXRpbWVvdXRzXG4vLyBPbmx5IGFkZCBzZXRaZXJvVGltZW91dCB0byB0aGUgd2luZG93IG9iamVjdCwgYW5kIGhpZGUgZXZlcnl0aGluZ1xuLy8gZWxzZSBpbiBhIGNsb3N1cmUuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciB0aW1lb3V0cyA9IFtdO1xuICB2YXIgbWVzc2FnZU5hbWUgPSBcInplcm8tdGltZW91dC1tZXNzYWdlXCI7XG5cbiAgLy8gTGlrZSBzZXRUaW1lb3V0LCBidXQgb25seSB0YWtlcyBhIGZ1bmN0aW9uIGFyZ3VtZW50LiAgVGhlcmUnc1xuICAvLyBubyB0aW1lIGFyZ3VtZW50IChhbHdheXMgemVybykgYW5kIG5vIGFyZ3VtZW50cyAoeW91IGhhdmUgdG9cbiAgLy8gdXNlIGEgY2xvc3VyZSkuXG4gIGZ1bmN0aW9uIHNldFplcm9UaW1lb3V0KGZuKSB7XG4gICAgdGltZW91dHMucHVzaChmbik7XG4gICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2VOYW1lLCBcIipcIik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XG5cbiAgICBpZiAoZXZlbnQuc291cmNlID09IHdpbmRvdyAmJiBldmVudC5kYXRhID09IG1lc3NhZ2VOYW1lKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICh0aW1lb3V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBmbiA9IHRpbWVvdXRzLnNoaWZ0KCk7XG4gICAgICAgIGZuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlTWVzc2FnZSwgdHJ1ZSk7XG5cbiAgLy8gQWRkIHRoZSBvbmUgdGhpbmcgd2Ugd2FudCBhZGRlZCB0byB0aGUgd2luZG93IG9iamVjdC5cbiAgd2luZG93LnNldFplcm9UaW1lb3V0ID0gc2V0WmVyb1RpbWVvdXQ7XG59KSgpO1xuXG4vKiBmaWxlOiBzcmMvR2FtZXBhZHMuanMgKi9cblxuUExBWUdST1VORC5HYW1lcGFkcyA9IGZ1bmN0aW9uKGFwcCkge1xuXG4gIHRoaXMuYXBwID0gYXBwO1xuXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5nZXRHYW1lcGFkcyA9IG5hdmlnYXRvci5nZXRHYW1lcGFkcyB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0R2FtZXBhZHM7XG5cbiAgdGhpcy5nYW1lcGFkbW92ZUV2ZW50ID0ge307XG4gIHRoaXMuZ2FtZXBhZGRvd25FdmVudCA9IHt9O1xuICB0aGlzLmdhbWVwYWR1cEV2ZW50ID0ge307XG5cbiAgdGhpcy5nYW1lcGFkcyA9IHt9O1xuXG4gIHRoaXMuYXBwLm9uKFwic3RlcFwiLCB0aGlzLnN0ZXAuYmluZCh0aGlzKSk7XG5cbn07XG5cblBMQVlHUk9VTkQuR2FtZXBhZHMucHJvdG90eXBlID0ge1xuXG4gIGJ1dHRvbnM6IHtcbiAgICAwOiBcIjFcIixcbiAgICAxOiBcIjJcIixcbiAgICAyOiBcIjNcIixcbiAgICAzOiBcIjRcIixcbiAgICA0OiBcImwxXCIsXG4gICAgNTogXCJyMVwiLFxuICAgIDY6IFwibDJcIixcbiAgICA3OiBcInIyXCIsXG4gICAgODogXCJzZWxlY3RcIixcbiAgICA5OiBcInN0YXJ0XCIsXG4gICAgMTI6IFwidXBcIixcbiAgICAxMzogXCJkb3duXCIsXG4gICAgMTQ6IFwibGVmdFwiLFxuICAgIDE1OiBcInJpZ2h0XCJcbiAgfSxcblxuICB6ZXJvU3RhdGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGJ1dHRvbnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDE1OyBpKyspIHtcbiAgICAgIGJ1dHRvbnMucHVzaCh7XG4gICAgICAgIHByZXNzZWQ6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogMFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGF4ZXM6IFtdLFxuICAgICAgYnV0dG9uczogYnV0dG9uc1xuICAgIH07XG5cbiAgfSxcblxuICBjcmVhdGVHYW1lcGFkOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBidXR0b25zOiB7fSxcbiAgICAgIHN0aWNrczogW3tcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfSwge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9XVxuICAgIH07XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgdmFyIGtleSA9IHRoaXMuYnV0dG9uc1tpXTtcbiAgICAgIHJlc3VsdC5idXR0b25zW2tleV0gPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuXG4gIH0sXG5cbiAgc3RlcDogZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoIW5hdmlnYXRvci5nZXRHYW1lcGFkcykgcmV0dXJuO1xuXG4gICAgdmFyIGdhbWVwYWRzID0gbmF2aWdhdG9yLmdldEdhbWVwYWRzKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdhbWVwYWRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHZhciBjdXJyZW50ID0gZ2FtZXBhZHNbaV07XG5cbiAgICAgIGlmICghY3VycmVudCkgY29udGludWU7XG5cbiAgICAgIGlmICghdGhpc1tpXSkgdGhpc1tpXSA9IHRoaXMuY3JlYXRlR2FtZXBhZCgpO1xuXG4gICAgICAvKiBoYXZlIHRvIGNvbmNhdCB0aGUgY3VycmVudC5idXR0b25zIGJlY2F1c2UgdGhlIGFyZSByZWFkLW9ubHkgKi9cblxuICAgICAgdmFyIGJ1dHRvbnMgPSBbXS5jb25jYXQoY3VycmVudC5idXR0b25zKTtcblxuICAgICAgLyogaGFjayBmb3IgbWlzc2luZyAgZHBhZHMgKi9cblxuICAgICAgZm9yICh2YXIgaCA9IDEyOyBoIDw9IDE1OyBoKyspIHtcbiAgICAgICAgaWYgKCFidXR0b25zW2hdKSBidXR0b25zW2hdID0ge1xuICAgICAgICAgIHByZXNzZWQ6IGZhbHNlLFxuICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHZhciBwcmV2aW91cyA9IHRoaXNbaV07XG5cbiAgICAgIC8qIGF4ZXMgKHN0aWNrcykgdG8gYnV0dG9ucyAqL1xuXG4gICAgICBpZiAoY3VycmVudC5heGVzKSB7XG5cbiAgICAgICAgaWYgKGN1cnJlbnQuYXhlc1swXSA8IDApIGJ1dHRvbnNbMTRdLnByZXNzZWQgPSB0cnVlO1xuICAgICAgICBpZiAoY3VycmVudC5heGVzWzBdID4gMCkgYnV0dG9uc1sxNV0ucHJlc3NlZCA9IHRydWU7XG4gICAgICAgIGlmIChjdXJyZW50LmF4ZXNbMV0gPCAwKSBidXR0b25zWzEyXS5wcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGN1cnJlbnQuYXhlc1sxXSA+IDApIGJ1dHRvbnNbMTNdLnByZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIHByZXZpb3VzLnN0aWNrc1swXS54ID0gY3VycmVudC5heGVzWzBdLnZhbHVlO1xuICAgICAgICBwcmV2aW91cy5zdGlja3NbMF0ueSA9IGN1cnJlbnQuYXhlc1sxXS52YWx1ZTtcbiAgICAgICAgcHJldmlvdXMuc3RpY2tzWzFdLnggPSBjdXJyZW50LmF4ZXNbMl0udmFsdWU7XG4gICAgICAgIHByZXZpb3VzLnN0aWNrc1sxXS55ID0gY3VycmVudC5heGVzWzNdLnZhbHVlO1xuXG4gICAgICB9XG5cbiAgICAgIC8qIGNoZWNrIGJ1dHRvbnMgY2hhbmdlcyAqL1xuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJ1dHRvbnMubGVuZ3RoOyBqKyspIHtcblxuICAgICAgICB2YXIga2V5ID0gdGhpcy5idXR0b25zW2pdO1xuXG4gICAgICAgIC8qIGdhbWVwYWQgZG93biAqL1xuXG4gICAgICAgIGlmIChidXR0b25zW2pdLnByZXNzZWQgJiYgIXByZXZpb3VzLmJ1dHRvbnNba2V5XSkge1xuXG4gICAgICAgICAgcHJldmlvdXMuYnV0dG9uc1trZXldID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmdhbWVwYWRkb3duRXZlbnQuYnV0dG9uID0gdGhpcy5idXR0b25zW2pdO1xuICAgICAgICAgIHRoaXMuZ2FtZXBhZGRvd25FdmVudC5nYW1lcGFkID0gaTtcbiAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJnYW1lcGFkZG93blwiLCB0aGlzLmdhbWVwYWRkb3duRXZlbnQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKiBnYW1lcGFkIHVwICovXG4gICAgICAgIGVsc2UgaWYgKCFidXR0b25zW2pdLnByZXNzZWQgJiYgcHJldmlvdXMuYnV0dG9uc1trZXldKSB7XG5cbiAgICAgICAgICBwcmV2aW91cy5idXR0b25zW2tleV0gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmdhbWVwYWR1cEV2ZW50LmJ1dHRvbiA9IHRoaXMuYnV0dG9uc1tqXTtcbiAgICAgICAgICB0aGlzLmdhbWVwYWR1cEV2ZW50LmdhbWVwYWQgPSBpO1xuICAgICAgICAgIHRoaXMudHJpZ2dlcihcImdhbWVwYWR1cFwiLCB0aGlzLmdhbWVwYWR1cEV2ZW50KTtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG59O1xuXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELkdhbWVwYWRzLnByb3RvdHlwZSwgUExBWUdST1VORC5FdmVudHMucHJvdG90eXBlKTtcblxuXG4vKiBmaWxlOiBzcmMvS2V5Ym9hcmQuanMgKi9cblxuUExBWUdST1VORC5LZXlib2FyZCA9IGZ1bmN0aW9uKCkge1xuXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5rZXlzID0ge307XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5rZXlkb3duLmJpbmQodGhpcykpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5rZXl1cC5iaW5kKHRoaXMpKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIHRoaXMua2V5cHJlc3MuYmluZCh0aGlzKSk7XG5cbiAgdGhpcy5rZXlkb3duRXZlbnQgPSB7fTtcbiAgdGhpcy5rZXl1cEV2ZW50ID0ge307XG5cbiAgdGhpcy5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG5cbn07XG5cblBMQVlHUk9VTkQuS2V5Ym9hcmQucHJvdG90eXBlID0ge1xuXG4gIGtleWNvZGVzOiB7XG4gICAgMzc6IFwibGVmdFwiLFxuICAgIDM4OiBcInVwXCIsXG4gICAgMzk6IFwicmlnaHRcIixcbiAgICA0MDogXCJkb3duXCIsXG4gICAgNDU6IFwiaW5zZXJ0XCIsXG4gICAgNDY6IFwiZGVsZXRlXCIsXG4gICAgODogXCJiYWNrc3BhY2VcIixcbiAgICA5OiBcInRhYlwiLFxuICAgIDEzOiBcImVudGVyXCIsXG4gICAgMTY6IFwic2hpZnRcIixcbiAgICAxNzogXCJjdHJsXCIsXG4gICAgMTg6IFwiYWx0XCIsXG4gICAgMTk6IFwicGF1c2VcIixcbiAgICAyMDogXCJjYXBzbG9ja1wiLFxuICAgIDI3OiBcImVzY2FwZVwiLFxuICAgIDMyOiBcInNwYWNlXCIsXG4gICAgMzM6IFwicGFnZXVwXCIsXG4gICAgMzQ6IFwicGFnZWRvd25cIixcbiAgICAzNTogXCJlbmRcIixcbiAgICAzNjogXCJob21lXCIsXG4gICAgMTEyOiBcImYxXCIsXG4gICAgMTEzOiBcImYyXCIsXG4gICAgMTE0OiBcImYzXCIsXG4gICAgMTE1OiBcImY0XCIsXG4gICAgMTE2OiBcImY1XCIsXG4gICAgMTE3OiBcImY2XCIsXG4gICAgMTE4OiBcImY3XCIsXG4gICAgMTE5OiBcImY4XCIsXG4gICAgMTIwOiBcImY5XCIsXG4gICAgMTIxOiBcImYxMFwiLFxuICAgIDEyMjogXCJmMTFcIixcbiAgICAxMjM6IFwiZjEyXCIsXG4gICAgMTQ0OiBcIm51bWxvY2tcIixcbiAgICAxNDU6IFwic2Nyb2xsbG9ja1wiLFxuICAgIDE4NjogXCJzZW1pY29sb25cIixcbiAgICAxODc6IFwiZXF1YWxcIixcbiAgICAxODg6IFwiY29tbWFcIixcbiAgICAxODk6IFwiZGFzaFwiLFxuICAgIDE5MDogXCJwZXJpb2RcIixcbiAgICAxOTE6IFwic2xhc2hcIixcbiAgICAxOTI6IFwiZ3JhdmVhY2NlbnRcIixcbiAgICAyMTk6IFwib3BlbmJyYWNrZXRcIixcbiAgICAyMjA6IFwiYmFja3NsYXNoXCIsXG4gICAgMjIxOiBcImNsb3NlYnJha2V0XCIsXG4gICAgMjIyOiBcInNpbmdsZXF1b3RlXCJcbiAgfSxcblxuICBrZXlwcmVzczogZnVuY3Rpb24oZSkge1xuXG4gIH0sXG5cbiAga2V5ZG93bjogZnVuY3Rpb24oZSkge1xuICAgIGlmIChlLndoaWNoID49IDQ4ICYmIGUud2hpY2ggPD0gOTApIHZhciBrZXlOYW1lID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpO1xuICAgIGVsc2UgdmFyIGtleU5hbWUgPSB0aGlzLmtleWNvZGVzW2Uud2hpY2hdO1xuXG4gICAgaWYgKHRoaXMua2V5c1trZXlOYW1lXSkgcmV0dXJuO1xuXG4gICAgdGhpcy5rZXlkb3duRXZlbnQua2V5ID0ga2V5TmFtZTtcbiAgICB0aGlzLmtleWRvd25FdmVudC5vcmlnaW5hbCA9IGU7XG5cbiAgICB0aGlzLmtleXNba2V5TmFtZV0gPSB0cnVlO1xuXG4gICAgdGhpcy50cmlnZ2VyKFwia2V5ZG93blwiLCB0aGlzLmtleWRvd25FdmVudCk7XG5cbiAgICBpZiAodGhpcy5wcmV2ZW50RGVmYXVsdCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICBlLmtleUNvZGUgPSAwO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0sXG5cbiAga2V5dXA6IGZ1bmN0aW9uKGUpIHtcblxuICAgIGlmIChlLndoaWNoID49IDQ4ICYmIGUud2hpY2ggPD0gOTApIHZhciBrZXlOYW1lID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpO1xuICAgIGVsc2UgdmFyIGtleU5hbWUgPSB0aGlzLmtleWNvZGVzW2Uud2hpY2hdO1xuXG4gICAgdGhpcy5rZXl1cEV2ZW50LmtleSA9IGtleU5hbWU7XG4gICAgdGhpcy5rZXl1cEV2ZW50Lm9yaWdpbmFsID0gZTtcblxuICAgIHRoaXMua2V5c1trZXlOYW1lXSA9IGZhbHNlO1xuXG4gICAgdGhpcy50cmlnZ2VyKFwia2V5dXBcIiwgdGhpcy5rZXl1cEV2ZW50KTtcbiAgfVxuXG59O1xuXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELktleWJvYXJkLnByb3RvdHlwZSwgUExBWUdST1VORC5FdmVudHMucHJvdG90eXBlKTtcblxuXG5cbi8qIGZpbGU6IHNyYy9Qb2ludGVyLmpzICovXG5cblBMQVlHUk9VTkQuUG9pbnRlciA9IGZ1bmN0aW9uKGFwcCkge1xuXG4gIHRoaXMuYXBwID0gYXBwO1xuXG4gIGFwcC5vbihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaHN0YXJ0LCB0aGlzKTtcbiAgYXBwLm9uKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaGVuZCwgdGhpcyk7XG4gIGFwcC5vbihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNobW92ZSwgdGhpcyk7XG5cbiAgYXBwLm9uKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlLCB0aGlzKTtcbiAgYXBwLm9uKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2Vkb3duLCB0aGlzKTtcbiAgYXBwLm9uKFwibW91c2V1cFwiLCB0aGlzLm1vdXNldXAsIHRoaXMpO1xuXG4gIHRoaXMucG9pbnRlcnMgPSBhcHAucG9pbnRlcnMgPSB7fTtcblxufTtcblxuUExBWUdST1VORC5Qb2ludGVyLnBsdWdpbiA9IHRydWU7XG5cblBMQVlHUk9VTkQuUG9pbnRlci5wcm90b3R5cGUgPSB7XG5cbiAgdXBkYXRlUG9pbnRlcjogZnVuY3Rpb24ocG9pbnRlcikge1xuXG4gICAgdGhpcy5wb2ludGVyc1twb2ludGVyLmlkXSA9IHBvaW50ZXI7XG5cbiAgfSxcblxuICByZW1vdmVQb2ludGVyOiBmdW5jdGlvbihwb2ludGVyKSB7XG5cbiAgICBkZWxldGUgdGhpcy5wb2ludGVyc1twb2ludGVyLmlkXTtcblxuICB9LFxuXG4gIHRvdWNoc3RhcnQ6IGZ1bmN0aW9uKGUpIHtcblxuICAgIGUudG91Y2ggPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGVQb2ludGVyKGUpO1xuXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcmRvd25cIiwgZSk7XG5cbiAgfSxcblxuICB0b3VjaGVuZDogZnVuY3Rpb24oZSkge1xuXG4gICAgZS50b3VjaCA9IHRydWU7XG5cbiAgICB0aGlzLnJlbW92ZVBvaW50ZXIoZSk7XG5cbiAgICB0aGlzLmFwcC5lbWl0R2xvYmFsRXZlbnQoXCJwb2ludGVydXBcIiwgZSk7XG5cbiAgfSxcblxuICB0b3VjaG1vdmU6IGZ1bmN0aW9uKGUpIHtcblxuICAgIGUudG91Y2ggPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGVQb2ludGVyKGUpO1xuXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcm1vdmVcIiwgZSk7XG5cbiAgfSxcblxuICBtb3VzZW1vdmU6IGZ1bmN0aW9uKGUpIHtcblxuICAgIGUubW91c2UgPSB0cnVlO1xuXG4gICAgdGhpcy51cGRhdGVQb2ludGVyKGUpO1xuXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcm1vdmVcIiwgZSk7XG5cbiAgfSxcblxuICBtb3VzZWRvd246IGZ1bmN0aW9uKGUpIHtcblxuICAgIGUubW91c2UgPSB0cnVlO1xuXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcmRvd25cIiwgZSk7XG5cbiAgfSxcblxuICBtb3VzZXVwOiBmdW5jdGlvbihlKSB7XG5cbiAgICBlLm1vdXNlID0gdHJ1ZTtcblxuICAgIHRoaXMuYXBwLmVtaXRHbG9iYWxFdmVudChcInBvaW50ZXJ1cFwiLCBlKTtcblxuICB9LFxuXG4gIG1vdXNld2hlZWw6IGZ1bmN0aW9uKGUpIHtcblxuICAgIGUubW91c2UgPSB0cnVlO1xuXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcndoZWVsXCIsIGUpO1xuXG4gIH1cblxufTtcblxuLyogZmlsZTogc3JjL0xvYWRlci5qcyAqL1xuXG4vKiBMb2FkZXIgKi9cblxuUExBWUdST1VORC5Mb2FkZXIgPSBmdW5jdGlvbihhcHApIHtcblxuICB0aGlzLmFwcCA9IGFwcDtcblxuICBQTEFZR1JPVU5ELkV2ZW50cy5jYWxsKHRoaXMpO1xuXG4gIHRoaXMucmVzZXQoKTtcblxufTtcblxuUExBWUdST1VORC5Mb2FkZXIucHJvdG90eXBlID0ge1xuXG4gIC8qIGxvYWRlciAqL1xuXG4gIGFkZDogZnVuY3Rpb24oaWQpIHtcblxuICAgIHRoaXMucXVldWUrKztcbiAgICB0aGlzLmNvdW50Kys7XG4gICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMudHJpZ2dlcihcImFkZFwiLCBpZCk7XG5cbiAgICByZXR1cm4gaWQ7XG5cbiAgfSxcblxuICBlcnJvcjogZnVuY3Rpb24oaWQpIHtcblxuICAgIHRoaXMudHJpZ2dlcihcImVycm9yXCIsIGlkKTtcblxuICB9LFxuXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKGlkKSB7XG5cbiAgICB0aGlzLnF1ZXVlLS07XG5cbiAgICB0aGlzLnByb2dyZXNzID0gMSAtIHRoaXMucXVldWUgLyB0aGlzLmNvdW50O1xuXG4gICAgdGhpcy50cmlnZ2VyKFwibG9hZFwiLCBpZCk7XG5cbiAgICBpZiAodGhpcy5xdWV1ZSA8PSAwKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoXCJyZWFkeVwiKTtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgfSxcblxuICByZXNldDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB0aGlzLnF1ZXVlID0gMDtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcblxuICB9XG59O1xuXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELkxvYWRlci5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XG5cbi8qIGZpbGU6IHNyYy9Nb3VzZS5qcyAqL1xuXG5QTEFZR1JPVU5ELk1vdXNlID0gZnVuY3Rpb24oYXBwLCBlbGVtZW50KSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuYXBwID0gYXBwO1xuXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICB0aGlzLmJ1dHRvbnMgPSB7fTtcblxuICB0aGlzLnByZXZlbnRDb250ZXh0TWVudSA9IHRydWU7XG5cbiAgdGhpcy5tb3VzZW1vdmVFdmVudCA9IHt9O1xuICB0aGlzLm1vdXNlZG93bkV2ZW50ID0ge307XG4gIHRoaXMubW91c2V1cEV2ZW50ID0ge307XG4gIHRoaXMubW91c2V3aGVlbEV2ZW50ID0ge307XG5cbiAgdGhpcy54ID0gMDtcbiAgdGhpcy55ID0gMDtcblxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5tb3VzZW1vdmUuYmluZCh0aGlzKSk7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlZG93bi5iaW5kKHRoaXMpKTtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLm1vdXNldXAuYmluZCh0aGlzKSk7XG5cbiAgdGhpcy5lbmFibGVNb3VzZXdoZWVsKCk7XG5cbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHNlbGYucHJldmVudENvbnRleHRNZW51KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH0pO1xuXG4gIGVsZW1lbnQucmVxdWVzdFBvaW50ZXJMb2NrID0gZWxlbWVudC5yZXF1ZXN0UG9pbnRlckxvY2sgfHxcbiAgICBlbGVtZW50Lm1velJlcXVlc3RQb2ludGVyTG9jayB8fFxuICAgIGVsZW1lbnQud2Via2l0UmVxdWVzdFBvaW50ZXJMb2NrO1xuXG4gIGRvY3VtZW50LmV4aXRQb2ludGVyTG9jayA9IGRvY3VtZW50LmV4aXRQb2ludGVyTG9jayB8fFxuICAgIGRvY3VtZW50Lm1vekV4aXRQb2ludGVyTG9jayB8fFxuICAgIGRvY3VtZW50LndlYmtpdEV4aXRQb2ludGVyTG9jaztcblxuXG4gIHRoaXMuaGFuZGxlUmVzaXplKCk7XG59O1xuXG5QTEFZR1JPVU5ELk1vdXNlLnByb3RvdHlwZSA9IHtcblxuICBsb2NrOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubG9ja2VkID0gdHJ1ZTtcbiAgICB0aGlzLmVsZW1lbnQucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG5cbiAgfSxcblxuICB1bmxvY2s6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcbiAgICBkb2N1bWVudC5leGl0UG9pbnRlckxvY2soKTtcblxuICB9LFxuXG4gIGdldEVsZW1lbnRPZmZzZXQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblxuICAgIHZhciBvZmZzZXRYID0gMDtcbiAgICB2YXIgb2Zmc2V0WSA9IDA7XG5cbiAgICBkbyB7XG4gICAgICBvZmZzZXRYICs9IGVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICAgIG9mZnNldFkgKz0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgfVxuXG4gICAgd2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpKTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBvZmZzZXRYLFxuICAgICAgeTogb2Zmc2V0WVxuICAgIH07XG5cbiAgfSxcblxuICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5lbGVtZW50T2Zmc2V0ID0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHRoaXMuZWxlbWVudCk7XG5cbiAgfSxcblxuICBtb3VzZW1vdmU6IFBMQVlHUk9VTkQuVXRpbHMudGhyb3R0bGUoZnVuY3Rpb24oZSkge1xuXG4gICAgdGhpcy54ID0gdGhpcy5tb3VzZW1vdmVFdmVudC54ID0gKGUucGFnZVggLSB0aGlzLmVsZW1lbnRPZmZzZXQueCAtIHRoaXMuYXBwLm9mZnNldFgpIC8gdGhpcy5hcHAuc2NhbGUgfCAwO1xuICAgIHRoaXMueSA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueSA9IChlLnBhZ2VZIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnkgLSB0aGlzLmFwcC5vZmZzZXRZKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcblxuICAgIHRoaXMubW91c2Vtb3ZlRXZlbnQub3JpZ2luYWwgPSBlO1xuXG4gICAgaWYgKHRoaXMubG9ja2VkKSB7XG4gICAgICB0aGlzLm1vdXNlbW92ZUV2ZW50Lm1vdmVtZW50WCA9IGUubW92ZW1lbnRYIHx8XG4gICAgICAgIGUubW96TW92ZW1lbnRYIHx8XG4gICAgICAgIGUud2Via2l0TW92ZW1lbnRYIHx8XG4gICAgICAgIDA7XG5cbiAgICAgIHRoaXMubW91c2Vtb3ZlRXZlbnQubW92ZW1lbnRZID0gZS5tb3ZlbWVudFkgfHxcbiAgICAgICAgZS5tb3pNb3ZlbWVudFkgfHxcbiAgICAgICAgZS53ZWJraXRNb3ZlbWVudFkgfHxcbiAgICAgICAgMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hcHAubW91c2VUb1RvdWNoKSB7XG4gICAgICAvLyAgICAgIGlmICh0aGlzLmxlZnQpIHtcbiAgICAgIHRoaXMubW91c2Vtb3ZlRXZlbnQuaWQgPSB0aGlzLm1vdXNlbW92ZUV2ZW50LmlkZW50aWZpZXIgPSAyNTU7XG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5tb3VzZW1vdmVFdmVudCk7XG4gICAgICAvLyAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3VzZW1vdmVFdmVudC5pZCA9IHRoaXMubW91c2Vtb3ZlRXZlbnQuaWRlbnRpZmllciA9IDI1NTtcbiAgICAgIHRoaXMudHJpZ2dlcihcIm1vdXNlbW92ZVwiLCB0aGlzLm1vdXNlbW92ZUV2ZW50KTtcbiAgICB9XG5cbiAgfSwgMTYpLFxuXG4gIG1vdXNlZG93bjogZnVuY3Rpb24oZSkge1xuXG4gICAgdmFyIGJ1dHRvbk5hbWUgPSBbXCJsZWZ0XCIsIFwibWlkZGxlXCIsIFwicmlnaHRcIl1bZS5idXR0b25dO1xuXG4gICAgdGhpcy5tb3VzZWRvd25FdmVudC54ID0gdGhpcy5tb3VzZW1vdmVFdmVudC54O1xuICAgIHRoaXMubW91c2Vkb3duRXZlbnQueSA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueTtcbiAgICB0aGlzLm1vdXNlZG93bkV2ZW50LmJ1dHRvbiA9IGJ1dHRvbk5hbWU7XG4gICAgdGhpcy5tb3VzZWRvd25FdmVudC5vcmlnaW5hbCA9IGU7XG5cbiAgICB0aGlzW2J1dHRvbk5hbWVdID0gdHJ1ZTtcblxuICAgIHRoaXMubW91c2Vkb3duRXZlbnQuaWQgPSB0aGlzLm1vdXNlZG93bkV2ZW50LmlkZW50aWZpZXIgPSAyNTU7XG5cbiAgICBpZiAodGhpcy5hcHAubW91c2VUb1RvdWNoKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5tb3VzZWRvd25FdmVudCk7XG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMubW91c2Vkb3duRXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRyaWdnZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZWRvd25FdmVudCk7XG4gICAgfVxuXG4gIH0sXG5cbiAgbW91c2V1cDogZnVuY3Rpb24oZSkge1xuXG4gICAgdmFyIGJ1dHRvbk5hbWUgPSBbXCJsZWZ0XCIsIFwibWlkZGxlXCIsIFwicmlnaHRcIl1bZS5idXR0b25dO1xuXG4gICAgdGhpcy5tb3VzZXVwRXZlbnQueCA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueDtcbiAgICB0aGlzLm1vdXNldXBFdmVudC55ID0gdGhpcy5tb3VzZW1vdmVFdmVudC55O1xuICAgIHRoaXMubW91c2V1cEV2ZW50LmJ1dHRvbiA9IGJ1dHRvbk5hbWU7XG4gICAgdGhpcy5tb3VzZXVwRXZlbnQub3JpZ2luYWwgPSBlO1xuXG4gICAgdGhpcy5tb3VzZXVwRXZlbnQuaWQgPSB0aGlzLm1vdXNldXBFdmVudC5pZGVudGlmaWVyID0gMjU1O1xuXG4gICAgaWYgKHRoaXMuYXBwLm1vdXNlVG9Ub3VjaCkge1xuXG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLm1vdXNldXBFdmVudCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLnRyaWdnZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2V1cEV2ZW50KTtcblxuICAgIH1cblxuICAgIHRoaXNbYnV0dG9uTmFtZV0gPSBmYWxzZTtcblxuICB9LFxuXG4gIG1vdXNld2hlZWw6IGZ1bmN0aW9uKGUpIHtcblxuICAgIHRoaXMubW91c2V3aGVlbEV2ZW50LnggPSB0aGlzLm1vdXNlbW92ZUV2ZW50Lng7XG4gICAgdGhpcy5tb3VzZXdoZWVsRXZlbnQueSA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueTtcbiAgICB0aGlzLm1vdXNld2hlZWxFdmVudC5idXR0b24gPSBbXCJub25lXCIsIFwibGVmdFwiLCBcIm1pZGRsZVwiLCBcInJpZ2h0XCJdW2UuYnV0dG9uXTtcbiAgICB0aGlzLm1vdXNld2hlZWxFdmVudC5vcmlnaW5hbCA9IGU7XG4gICAgdGhpcy5tb3VzZXdoZWVsRXZlbnQuaWQgPSB0aGlzLm1vdXNld2hlZWxFdmVudC5pZGVudGlmaWVyID0gMjU1O1xuXG4gICAgdGhpc1tlLmJ1dHRvbl0gPSBmYWxzZTtcblxuICAgIHRoaXMudHJpZ2dlcihcIm1vdXNld2hlZWxcIiwgdGhpcy5tb3VzZXdoZWVsRXZlbnQpO1xuXG4gIH0sXG5cblxuICBlbmFibGVNb3VzZXdoZWVsOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBldmVudE5hbWVzID0gJ29ud2hlZWwnIGluIGRvY3VtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50TW9kZSA+PSA5ID8gWyd3aGVlbCddIDogWydtb3VzZXdoZWVsJywgJ0RvbU1vdXNlU2Nyb2xsJywgJ01vek1vdXNlUGl4ZWxTY3JvbGwnXTtcbiAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLm1vdXNld2hlZWwuYmluZCh0aGlzKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmb3IgKHZhciBpID0gZXZlbnROYW1lcy5sZW5ndGg7IGk7KSB7XG5cbiAgICAgIHNlbGYuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZXNbLS1pXSwgUExBWUdST1VORC5VdGlscy50aHJvdHRsZShmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBvcmdFdmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCxcbiAgICAgICAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgIGRlbHRhID0gMCxcbiAgICAgICAgICBkZWx0YVggPSAwLFxuICAgICAgICAgIGRlbHRhWSA9IDAsXG4gICAgICAgICAgYWJzRGVsdGEgPSAwLFxuICAgICAgICAgIGFic0RlbHRhWFkgPSAwLFxuICAgICAgICAgIGZuO1xuXG4gICAgICAgIG9yZ0V2ZW50LnR5cGUgPSBcIm1vdXNld2hlZWxcIjtcblxuICAgICAgICAvLyBPbGQgc2Nob29sIHNjcm9sbHdoZWVsIGRlbHRhXG4gICAgICAgIGlmIChvcmdFdmVudC53aGVlbERlbHRhKSB7XG4gICAgICAgICAgZGVsdGEgPSBvcmdFdmVudC53aGVlbERlbHRhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9yZ0V2ZW50LmRldGFpbCkge1xuICAgICAgICAgIGRlbHRhID0gb3JnRXZlbnQuZGV0YWlsICogLTE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBOZXcgc2Nob29sIHdoZWVsIGRlbHRhICh3aGVlbCBldmVudClcbiAgICAgICAgaWYgKG9yZ0V2ZW50LmRlbHRhWSkge1xuICAgICAgICAgIGRlbHRhWSA9IG9yZ0V2ZW50LmRlbHRhWSAqIC0xO1xuICAgICAgICAgIGRlbHRhID0gZGVsdGFZO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Via2l0XG4gICAgICAgIGlmIChvcmdFdmVudC53aGVlbERlbHRhWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsdGFZID0gb3JnRXZlbnQud2hlZWxEZWx0YVk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzdWx0ID0gZGVsdGEgPyBkZWx0YSA6IGRlbHRhWTtcblxuICAgICAgICBzZWxmLm1vdXNld2hlZWxFdmVudC54ID0gc2VsZi5tb3VzZW1vdmVFdmVudC54O1xuICAgICAgICBzZWxmLm1vdXNld2hlZWxFdmVudC55ID0gc2VsZi5tb3VzZW1vdmVFdmVudC55O1xuICAgICAgICBzZWxmLm1vdXNld2hlZWxFdmVudC5kZWx0YSA9IHJlc3VsdCAvIE1hdGguYWJzKHJlc3VsdCk7XG4gICAgICAgIHNlbGYubW91c2V3aGVlbEV2ZW50Lm9yaWdpbmFsID0gb3JnRXZlbnQ7XG5cbiAgICAgICAgY2FsbGJhY2soc2VsZi5tb3VzZXdoZWVsRXZlbnQpO1xuXG4gICAgICAgIG9yZ0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIH0sIDQwKSwgZmFsc2UpO1xuICAgIH1cblxuICB9XG5cbn07XG5cblBMQVlHUk9VTkQuVXRpbHMuZXh0ZW5kKFBMQVlHUk9VTkQuTW91c2UucHJvdG90eXBlLCBQTEFZR1JPVU5ELkV2ZW50cy5wcm90b3R5cGUpO1xuXG4vKiBmaWxlOiBzcmMvU291bmQuanMgKi9cblxuUExBWUdST1VORC5Tb3VuZCA9IGZ1bmN0aW9uKGFwcCkge1xuXG4gIHZhciBhdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQgfHwgd2luZG93Lm1vekF1ZGlvQ29udGV4dDtcblxuICBpZiAoYXVkaW9Db250ZXh0KSB7XG5cbiAgICBpZiAoIVBMQVlHUk9VTkQuYXVkaW9Db250ZXh0KSBQTEFZR1JPVU5ELmF1ZGlvQ29udGV4dCA9IG5ldyBhdWRpb0NvbnRleHQ7XG5cbiAgICBhcHAuYXVkaW9Db250ZXh0ID0gUExBWUdST1VORC5hdWRpb0NvbnRleHQ7XG4gICAgYXBwLnNvdW5kID0gbmV3IFBMQVlHUk9VTkQuU291bmRXZWJBdWRpb0FQSShhcHAsIGFwcC5hdWRpb0NvbnRleHQpO1xuICAgIGFwcC5tdXNpYyA9IG5ldyBQTEFZR1JPVU5ELlNvdW5kV2ViQXVkaW9BUEkoYXBwLCBhcHAuYXVkaW9Db250ZXh0KTtcblxuICB9IGVsc2Uge1xuXG4gICAgYXBwLnNvdW5kID0gbmV3IFBMQVlHUk9VTkQuU291bmRBdWRpbyhhcHApO1xuICAgIGFwcC5tdXNpYyA9IG5ldyBQTEFZR1JPVU5ELlNvdW5kQXVkaW8oYXBwKTtcblxuICB9XG5cbn07XG5cblBMQVlHUk9VTkQuQXBwbGljYXRpb24ucHJvdG90eXBlLnBsYXlTb3VuZCA9IGZ1bmN0aW9uKGtleSwgbG9vcCkge1xuXG4gIHJldHVybiB0aGlzLnNvdW5kLnBsYXkoa2V5LCBsb29wKTtcblxufTtcblxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUuc3RvcFNvdW5kID0gZnVuY3Rpb24oc291bmQpIHtcblxuICB0aGlzLnNvdW5kLnN0b3Aoc291bmQpO1xuXG59O1xuXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkU291bmQgPSBmdW5jdGlvbigpIHtcblxuICByZXR1cm4gdGhpcy5sb2FkU291bmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbn07XG5cblBMQVlHUk9VTkQuQXBwbGljYXRpb24ucHJvdG90eXBlLmxvYWRTb3VuZHMgPSBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblxuICAgIC8qIHBvbHltb3JwaGlzbSBhdCBpdHMgZmluZXN0ICovXG5cbiAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIikge1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXJnKSB0aGlzLmxvYWRTb3VuZHMoYXJnW2tleV0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc291bmQubG9hZChhcmcpO1xuICAgIH1cbiAgfVxuXG59O1xuXG4vKiBmaWxlOiBzcmMvU291bmRXZWJBdWRpb0FQSS5qcyAqL1xuXG5QTEFZR1JPVU5ELlNvdW5kV2ViQXVkaW9BUEkgPSBmdW5jdGlvbihhcHAsIGF1ZGlvQ29udGV4dCkge1xuXG4gIHRoaXMuYXBwID0gYXBwO1xuXG4gIHZhciBjYW5QbGF5TXAzID0gKG5ldyBBdWRpbykuY2FuUGxheVR5cGUoXCJhdWRpby9tcDNcIik7XG4gIHZhciBjYW5QbGF5T2dnID0gKG5ldyBBdWRpbykuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKTtcblxuICBpZiAodGhpcy5hcHAucHJlZmVyZWRBdWRpb0Zvcm1hdCA9PT0gXCJtcDNcIikge1xuXG4gICAgaWYgKGNhblBsYXlNcDMpIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm1wM1wiO1xuICAgIGVsc2UgdGhpcy5hdWRpb0Zvcm1hdCA9IFwib2dnXCI7XG5cbiAgfSBlbHNlIHtcblxuICAgIGlmIChjYW5QbGF5T2dnKSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJvZ2dcIjtcbiAgICBlbHNlIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm1wM1wiO1xuXG4gIH1cblxuICB0aGlzLmNvbnRleHQgPSBhdWRpb0NvbnRleHQ7XG5cbiAgdGhpcy5nYWluTm9kZSA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKClcbiAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XG5cbiAgdGhpcy5jb21wcmVzc29yID0gdGhpcy5jb250ZXh0LmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpO1xuICB0aGlzLmNvbXByZXNzb3IuY29ubmVjdCh0aGlzLmdhaW5Ob2RlKTtcblxuICB0aGlzLm91dHB1dCA9IHRoaXMuZ2Fpbk5vZGU7XG5cbiAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gMS4wO1xuXG4gIHRoaXMucG9vbCA9IFtdO1xuICB0aGlzLnZvbHVtZSA9IDEuMDtcblxuICB0aGlzLnNldE1hc3RlclBvc2l0aW9uKDAsIDAsIDApO1xuXG4gIHRoaXMubG9vcHMgPSBbXTtcblxuICB0aGlzLmFwcC5vbihcInN0ZXBcIiwgdGhpcy5zdGVwLmJpbmQodGhpcykpO1xuXG59O1xuXG5QTEFZR1JPVU5ELlNvdW5kV2ViQXVkaW9BUEkucHJvdG90eXBlID0ge1xuXG4gIGJ1ZmZlcnM6IHt9LFxuICBhbGlhc2VzOiB7fSxcblxuICBhbGlhczogZnVuY3Rpb24oYWxpYXMsIHNvdXJjZSwgdm9sdW1lLCByYXRlKSB7XG5cbiAgICB0aGlzLmFsaWFzZXNbYWxpYXNdID0ge1xuICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICB2b2x1bWU6IHZvbHVtZSxcbiAgICAgIHJhdGU6IHJhdGVcbiAgICB9O1xuXG4gIH0sXG5cbiAgc2V0TWFzdGVyOiBmdW5jdGlvbih2b2x1bWUpIHtcblxuICAgIHRoaXMudm9sdW1lID0gdm9sdW1lO1xuXG4gICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gdm9sdW1lO1xuXG4gIH0sXG5cbiAgbG9hZDogZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgdmFyIGVudHJ5ID0gdGhpcy5hcHAuZ2V0QXNzZXRFbnRyeShmaWxlLCBcInNvdW5kc1wiLCB0aGlzLmF1ZGlvRm9ybWF0KTtcblxuICAgIHZhciBzYW1wbGVyID0gdGhpcztcblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgZW50cnkudXJsLCB0cnVlKTtcbiAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcblxuICAgIHZhciBpZCA9IHRoaXMuYXBwLmxvYWRlci5hZGQoZW50cnkudXJsKTtcblxuICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIHNhbXBsZXIuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEodGhpcy5yZXNwb25zZSwgZnVuY3Rpb24oZGVjb2RlZEJ1ZmZlcikge1xuICAgICAgICBzYW1wbGVyLmJ1ZmZlcnNbZW50cnkua2V5XSA9IGRlY29kZWRCdWZmZXI7XG4gICAgICAgIHNhbXBsZXIuYXBwLmxvYWRlci5zdWNjZXNzKGVudHJ5LnVybCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHJlcXVlc3Quc2VuZCgpO1xuXG4gIH0sXG5cbiAgY2xlYW5BcnJheTogZnVuY3Rpb24oYXJyYXksIHByb3BlcnR5KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoYXJyYXlbaV0gPT09IG51bGwgfHwgKHByb3BlcnR5ICYmIGFycmF5W2ldW3Byb3BlcnR5XSkpIHtcbiAgICAgICAgYXJyYXkuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgIGxlbi0tO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzZXRNYXN0ZXJQb3NpdGlvbjogZnVuY3Rpb24oeCwgeSwgeikge1xuXG4gICAgdGhpcy5tYXN0ZXJQb3NpdGlvbiA9IHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgejogelxuICAgIH07XG5cbiAgICB0aGlzLmNvbnRleHQubGlzdGVuZXIuc2V0UG9zaXRpb24oeCwgeSwgeilcbiAgICAgIC8vIHRoaXMuY29udGV4dC5saXN0ZW5lci5zZXRPcmllbnRhdGlvbigwLCAwLCAtMSwgMCwgMSwgMCk7XG4gICAgICAvLyB0aGlzLmNvbnRleHQubGlzdGVuZXIuZG9wcGxlckZhY3RvciA9IDE7XG4gICAgICAvLyB0aGlzLmNvbnRleHQubGlzdGVuZXIuc3BlZWRPZlNvdW5kID0gMzQzLjM7XG4gIH0sXG5cbiAgZ2V0U291bmRCdWZmZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5wb29sLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuXG4gICAgICAgIHZhciBidWZmZXIsIGdhaW4sIHBhbm5lcjtcblxuICAgICAgICB2YXIgbm9kZXMgPSBbXG4gICAgICAgICAgYnVmZmVyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpLFxuICAgICAgICAgIGdhaW4gPSB0aGlzLmNvbnRleHQuY3JlYXRlR2FpbigpLFxuICAgICAgICAgIHBhbm5lciA9IHRoaXMuY29udGV4dC5jcmVhdGVQYW5uZXIoKVxuICAgICAgICBdO1xuXG4gICAgICAgIHBhbm5lci5kaXN0YW5jZU1vZGVsID0gXCJsaW5lYXJcIjtcblxuICAgICAgICAvLyAxIC0gcm9sbG9mZkZhY3RvciAqIChkaXN0YW5jZSAtIHJlZkRpc3RhbmNlKSAvIChtYXhEaXN0YW5jZSAtIHJlZkRpc3RhbmNlKVxuICAgICAgICAvLyByZWZEaXN0YW5jZSAvIChyZWZEaXN0YW5jZSArIHJvbGxvZmZGYWN0b3IgKiAoZGlzdGFuY2UgLSByZWZEaXN0YW5jZSkpXG4gICAgICAgIHBhbm5lci5yZWZEaXN0YW5jZSA9IDE7XG4gICAgICAgIHBhbm5lci5tYXhEaXN0YW5jZSA9IDYwMDtcbiAgICAgICAgcGFubmVyLnJvbGxvZmZGYWN0b3IgPSAxLjA7XG5cblxuICAgICAgICAvLyBwYW5uZXIuc2V0T3JpZW50YXRpb24oLTEsIC0xLCAwKTtcblxuICAgICAgICB0aGlzLnBvb2wucHVzaChub2Rlcyk7XG5cbiAgICAgICAgbm9kZXNbMF0uY29ubmVjdChub2Rlc1sxXSk7XG4gICAgICAgIC8vIG5vZGVzWzFdLmNvbm5lY3Qobm9kZXNbMl0pO1xuICAgICAgICBub2Rlc1sxXS5jb25uZWN0KHRoaXMub3V0cHV0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wb29sLnBvcCgpO1xuICB9LFxuXG4gIHBsYXk6IGZ1bmN0aW9uKG5hbWUsIGxvb3ApIHtcblxuICAgIHZhciBhbGlhcyA9IHRoaXMuYWxpYXNlc1tuYW1lXTtcblxuICAgIHZhciBub2RlcyA9IHRoaXMuZ2V0U291bmRCdWZmZXIoKTtcblxuICAgIGlmIChhbGlhcykgbmFtZSA9IGFsaWFzLnNvdXJjZTtcblxuICAgIGJ1ZmZlclNvdXJjZSA9IG5vZGVzWzBdO1xuICAgIGJ1ZmZlclNvdXJjZS5nYWluTm9kZSA9IG5vZGVzWzFdO1xuICAgIGJ1ZmZlclNvdXJjZS5wYW5uZXJOb2RlID0gbm9kZXNbMl07XG4gICAgYnVmZmVyU291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyc1tuYW1lXTtcbiAgICBidWZmZXJTb3VyY2UubG9vcCA9IGxvb3AgfHwgZmFsc2U7XG4gICAgYnVmZmVyU291cmNlLmtleSA9IG5hbWU7XG5cbiAgICBidWZmZXJTb3VyY2UuYWxpYXMgPSBhbGlhcztcblxuICAgIHRoaXMuc2V0Vm9sdW1lKGJ1ZmZlclNvdXJjZSwgMS4wKTtcbiAgICB0aGlzLnNldFBsYXliYWNrUmF0ZShidWZmZXJTb3VyY2UsIDEuMCk7XG5cbiAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAvLyAgYnVmZmVyU291cmNlLmxvb3BTdGFydCA9IHRoaXMubG9vcFN0YXJ0O1xuICAgICAgLy8gYnVmZmVyU291cmNlLmxvb3BFbmQgPSB0aGlzLmxvb3BFbmQ7XG4gICAgfVxuXG5cbiAgICBidWZmZXJTb3VyY2Uuc3RhcnQoMCk7XG5cbiAgICBidWZmZXJTb3VyY2Uudm9sdW1lTGltaXQgPSAxO1xuXG4gICAgdGhpcy5zZXRQb3NpdGlvbihidWZmZXJTb3VyY2UsIHRoaXMubWFzdGVyUG9zaXRpb24ueCwgdGhpcy5tYXN0ZXJQb3NpdGlvbi55LCB0aGlzLm1hc3RlclBvc2l0aW9uLnopO1xuXG4gICAgcmV0dXJuIGJ1ZmZlclNvdXJjZTtcbiAgfSxcblxuICBzdG9wOiBmdW5jdGlvbih3aGF0KSB7XG5cbiAgICBpZiAoIXdoYXQpIHJldHVybjtcblxuICAgIHdoYXQuc3RvcCgwKTtcblxuICB9LFxuXG4gIHNldFBsYXliYWNrUmF0ZTogZnVuY3Rpb24oc291bmQsIHJhdGUpIHtcblxuICAgIGlmICghc291bmQpIHJldHVybjtcblxuICAgIGlmIChzb3VuZC5hbGlhcykgcmF0ZSAqPSBzb3VuZC5hbGlhcy5yYXRlO1xuXG4gICAgcmV0dXJuIHNvdW5kLnBsYXliYWNrUmF0ZS52YWx1ZSA9IHJhdGU7XG4gIH0sXG5cbiAgc2V0UG9zaXRpb246IGZ1bmN0aW9uKHNvdW5kLCB4LCB5LCB6KSB7XG5cbiAgICBpZiAoIXNvdW5kKSByZXR1cm47XG5cbiAgICBzb3VuZC5wYW5uZXJOb2RlLnNldFBvc2l0aW9uKHgsIHkgfHwgMCwgeiB8fCAwKTtcbiAgfSxcblxuICBzZXRWZWxvY2l0eTogZnVuY3Rpb24oc291bmQsIHgsIHksIHopIHtcblxuICAgIGlmICghc291bmQpIHJldHVybjtcblxuICAgIHNvdW5kLnBhbm5lck5vZGUuc2V0UG9zaXRpb24oeCwgeSB8fCAwLCB6IHx8IDApO1xuXG4gIH0sXG5cbiAgZ2V0Vm9sdW1lOiBmdW5jdGlvbihzb3VuZCkge1xuXG4gICAgaWYgKCFzb3VuZCkgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHNvdW5kLmdhaW5Ob2RlLmdhaW4udmFsdWU7XG5cbiAgfSxcblxuICBzZXRWb2x1bWU6IGZ1bmN0aW9uKHNvdW5kLCB2b2x1bWUpIHtcblxuICAgIGlmICghc291bmQpIHJldHVybjtcblxuICAgIGlmIChzb3VuZC5hbGlhcykgdm9sdW1lICo9IHNvdW5kLmFsaWFzLnZvbHVtZTtcblxuICAgIHJldHVybiBzb3VuZC5nYWluTm9kZS5nYWluLnZhbHVlID0gTWF0aC5tYXgoMCwgdm9sdW1lKTtcbiAgfSxcblxuICBmYWRlT3V0OiBmdW5jdGlvbihzb3VuZCkge1xuXG4gICAgaWYgKCFzb3VuZCkgcmV0dXJuO1xuXG4gICAgc291bmQuZmFkZU91dCA9IHRydWU7XG5cbiAgICB0aGlzLmxvb3BzLnB1c2goc291bmQpO1xuXG4gICAgcmV0dXJuIHNvdW5kO1xuXG4gIH0sXG5cbiAgZmFkZUluOiBmdW5jdGlvbihzb3VuZCkge1xuXG4gICAgaWYgKCFzb3VuZCkgcmV0dXJuO1xuXG4gICAgc291bmQuZmFkZUluID0gdHJ1ZTtcblxuICAgIHRoaXMubG9vcHMucHVzaChzb3VuZCk7XG4gICAgdGhpcy5zZXRWb2x1bWUoc291bmQsIDApO1xuXG5cbiAgICByZXR1cm4gc291bmQ7XG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxvb3BzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHZhciBsb29wID0gdGhpcy5sb29wc1tpXTtcblxuICAgICAgaWYgKGxvb3AuZmFkZUluKSB7XG4gICAgICAgIHZhciB2b2x1bWUgPSB0aGlzLmdldFZvbHVtZShsb29wKTtcbiAgICAgICAgdm9sdW1lID0gdGhpcy5zZXRWb2x1bWUobG9vcCwgTWF0aC5taW4oMS4wLCB2b2x1bWUgKyBkZWx0YSAqIDAuNSkpO1xuXG4gICAgICAgIGlmICh2b2x1bWUgPj0gMS4wKSB7XG4gICAgICAgICAgdGhpcy5sb29wcy5zcGxpY2UoaS0tLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobG9vcC5mYWRlT3V0KSB7XG4gICAgICAgIHZhciB2b2x1bWUgPSB0aGlzLmdldFZvbHVtZShsb29wKTtcbiAgICAgICAgdm9sdW1lID0gdGhpcy5zZXRWb2x1bWUobG9vcCwgTWF0aC5taW4oMS4wLCB2b2x1bWUgLSBkZWx0YSAqIDAuNSkpO1xuXG4gICAgICAgIGlmICh2b2x1bWUgPD0gMCkge1xuICAgICAgICAgIHRoaXMubG9vcHMuc3BsaWNlKGktLSwgMSk7XG4gICAgICAgICAgdGhpcy5zdG9wKGxvb3ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG59O1xuXG4vKiBmaWxlOiBzcmMvU291bmRBdWRpby5qcyAqL1xuXG5QTEFZR1JPVU5ELlNvdW5kQXVkaW8gPSBmdW5jdGlvbihhcHApIHtcblxuICB0aGlzLmFwcCA9IGFwcDtcblxuICB2YXIgY2FuUGxheU1wMyA9IChuZXcgQXVkaW8pLmNhblBsYXlUeXBlKFwiYXVkaW8vbXAzXCIpO1xuICB2YXIgY2FuUGxheU9nZyA9IChuZXcgQXVkaW8pLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJyk7XG5cbiAgaWYgKHRoaXMuYXBwLnByZWZlcmVkQXVkaW9Gb3JtYXQgPT09IFwibXAzXCIpIHtcblxuICAgIGlmIChjYW5QbGF5TXAzKSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJtcDNcIjtcbiAgICBlbHNlIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm9nZ1wiO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBpZiAoY2FuUGxheU9nZykgdGhpcy5hdWRpb0Zvcm1hdCA9IFwib2dnXCI7XG4gICAgZWxzZSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJtcDNcIjtcblxuICB9XG5cbn07XG5cblBMQVlHUk9VTkQuU291bmRBdWRpby5wcm90b3R5cGUgPSB7XG5cbiAgc2FtcGxlczoge30sXG5cbiAgc2V0TWFzdGVyOiBmdW5jdGlvbih2b2x1bWUpIHtcblxuICAgIHRoaXMudm9sdW1lID0gdm9sdW1lO1xuXG4gIH0sXG5cbiAgc2V0TWFzdGVyUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXG4gIH0sXG5cbiAgc2V0UG9zaXRpb246IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgICByZXR1cm47XG4gIH0sXG5cbiAgbG9hZDogZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgdmFyIHVybCA9IFwic291bmRzL1wiICsgZmlsZSArIFwiLlwiICsgdGhpcy5hdWRpb0Zvcm1hdDtcblxuICAgIHZhciBsb2FkZXIgPSB0aGlzLmFwcC5sb2FkZXI7XG5cbiAgICB0aGlzLmFwcC5sb2FkZXIuYWRkKHVybCk7XG5cbiAgICB2YXIgYXVkaW8gPSB0aGlzLnNhbXBsZXNbZmlsZV0gPSBuZXcgQXVkaW87XG5cbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCBmdW5jdGlvbigpIHtcbiAgICAgIGxvYWRlci5zdWNjZXNzKHVybCk7XG4gICAgfSk7XG5cbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBsb2FkZXIuZXJyb3IodXJsKTtcbiAgICB9KTtcblxuICAgIGF1ZGlvLnNyYyA9IHVybDtcblxuICB9LFxuXG4gIHBsYXk6IGZ1bmN0aW9uKGtleSwgbG9vcCkge1xuXG4gICAgdmFyIHNvdW5kID0gdGhpcy5zYW1wbGVzW2tleV07XG5cbiAgICBzb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgc291bmQubG9vcCA9IGxvb3A7XG4gICAgc291bmQucGxheSgpO1xuXG4gICAgcmV0dXJuIHNvdW5kO1xuXG4gIH0sXG5cbiAgc3RvcDogZnVuY3Rpb24od2hhdCkge1xuXG4gICAgaWYgKCF3aGF0KSByZXR1cm47XG5cbiAgICB3aGF0LnBhdXNlKCk7XG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xuXG4gIH0sXG5cbiAgc2V0UGxheWJhY2tSYXRlOiBmdW5jdGlvbihzb3VuZCwgcmF0ZSkge1xuXG4gICAgcmV0dXJuO1xuICB9LFxuXG4gIHNldFZvbHVtZTogZnVuY3Rpb24oc291bmQsIHZvbHVtZSkge1xuXG4gICAgc291bmQudm9sdW1lID0gdm9sdW1lICogdGhpcy52b2x1bWU7XG5cbiAgfSxcblxuICBzZXRQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cbiAgfVxuXG59O1xuXG4vKiBmaWxlOiBzcmMvVG91Y2guanMgKi9cblxuUExBWUdST1VORC5Ub3VjaCA9IGZ1bmN0aW9uKGFwcCwgZWxlbWVudCkge1xuXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5hcHAgPSBhcHA7XG5cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICB0aGlzLmJ1dHRvbnMgPSB7fTtcblxuICB0aGlzLnRvdWNoZXMgPSB7fTtcblxuICB0aGlzLnggPSAwO1xuICB0aGlzLnkgPSAwO1xuXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnRvdWNobW92ZS5iaW5kKHRoaXMpKTtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLnRvdWNoc3RhcnQuYmluZCh0aGlzKSk7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudG91Y2hlbmQuYmluZCh0aGlzKSk7XG5cbn07XG5cblBMQVlHUk9VTkQuVG91Y2gucHJvdG90eXBlID0ge1xuXG4gIGdldEVsZW1lbnRPZmZzZXQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcblxuICAgIHZhciBvZmZzZXRYID0gMDtcbiAgICB2YXIgb2Zmc2V0WSA9IDA7XG5cbiAgICBkbyB7XG4gICAgICBvZmZzZXRYICs9IGVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICAgIG9mZnNldFkgKz0gZWxlbWVudC5vZmZzZXRUb3A7XG4gICAgfVxuXG4gICAgd2hpbGUgKChlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQpKTtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBvZmZzZXRYLFxuICAgICAgeTogb2Zmc2V0WVxuICAgIH07XG5cbiAgfSxcblxuICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5lbGVtZW50T2Zmc2V0ID0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHRoaXMuZWxlbWVudCk7XG5cbiAgfSxcblxuICB0b3VjaG1vdmU6IGZ1bmN0aW9uKGUpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzW2ldO1xuXG4gICAgICB0b3VjaG1vdmVFdmVudCA9IHt9XG5cbiAgICAgIHRoaXMueCA9IHRvdWNobW92ZUV2ZW50LnggPSAodG91Y2gucGFnZVggLSB0aGlzLmVsZW1lbnRPZmZzZXQueCAtIHRoaXMuYXBwLm9mZnNldFgpIC8gdGhpcy5hcHAuc2NhbGUgfCAwO1xuICAgICAgdGhpcy55ID0gdG91Y2htb3ZlRXZlbnQueSA9ICh0b3VjaC5wYWdlWSAtIHRoaXMuZWxlbWVudE9mZnNldC55IC0gdGhpcy5hcHAub2Zmc2V0WSkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XG5cbiAgICAgIHRvdWNobW92ZUV2ZW50Lm9yaWdpbmFsID0gdG91Y2g7XG4gICAgICB0b3VjaG1vdmVFdmVudC5pZCA9IHRvdWNobW92ZUV2ZW50LmlkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG4gICAgICB0aGlzLnRvdWNoZXNbdG91Y2guaWRlbnRpZmllcl0ueCA9IHRvdWNobW92ZUV2ZW50Lng7XG4gICAgICB0aGlzLnRvdWNoZXNbdG91Y2guaWRlbnRpZmllcl0ueSA9IHRvdWNobW92ZUV2ZW50Lnk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihcInRvdWNobW92ZVwiLCB0b3VjaG1vdmVFdmVudCk7XG5cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgfSxcblxuICB0b3VjaHN0YXJ0OiBmdW5jdGlvbihlKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1tpXTtcblxuICAgICAgdmFyIHRvdWNoc3RhcnRFdmVudCA9IHt9XG5cbiAgICAgIHRoaXMueCA9IHRvdWNoc3RhcnRFdmVudC54ID0gKHRvdWNoLnBhZ2VYIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnggLSB0aGlzLmFwcC5vZmZzZXRYKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcbiAgICAgIHRoaXMueSA9IHRvdWNoc3RhcnRFdmVudC55ID0gKHRvdWNoLnBhZ2VZIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnkgLSB0aGlzLmFwcC5vZmZzZXRZKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcblxuICAgICAgdG91Y2hzdGFydEV2ZW50Lm9yaWdpbmFsID0gZS50b3VjaDtcbiAgICAgIHRvdWNoc3RhcnRFdmVudC5pZCA9IHRvdWNoc3RhcnRFdmVudC5pZGVudGlmaWVyID0gdG91Y2guaWRlbnRpZmllcjtcblxuICAgICAgdGhpcy50b3VjaGVzW3RvdWNoLmlkZW50aWZpZXJdID0ge1xuICAgICAgICB4OiB0b3VjaHN0YXJ0RXZlbnQueCxcbiAgICAgICAgeTogdG91Y2hzdGFydEV2ZW50LnlcbiAgICAgIH07XG5cbiAgICAgIHRoaXMudHJpZ2dlcihcInRvdWNoc3RhcnRcIiwgdG91Y2hzdGFydEV2ZW50KTtcblxuICAgIH1cblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICB9LFxuXG4gIHRvdWNoZW5kOiBmdW5jdGlvbihlKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgIHZhciB0b3VjaGVuZEV2ZW50ID0ge307XG5cbiAgICAgIHRvdWNoZW5kRXZlbnQueCA9ICh0b3VjaC5wYWdlWCAtIHRoaXMuZWxlbWVudE9mZnNldC54IC0gdGhpcy5hcHAub2Zmc2V0WCkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XG4gICAgICB0b3VjaGVuZEV2ZW50LnkgPSAodG91Y2gucGFnZVkgLSB0aGlzLmVsZW1lbnRPZmZzZXQueSAtIHRoaXMuYXBwLm9mZnNldFkpIC8gdGhpcy5hcHAuc2NhbGUgfCAwO1xuXG4gICAgICB0b3VjaGVuZEV2ZW50Lm9yaWdpbmFsID0gdG91Y2g7XG4gICAgICB0b3VjaGVuZEV2ZW50LmlkID0gdG91Y2hlbmRFdmVudC5pZGVudGlmaWVyID0gdG91Y2guaWRlbnRpZmllcjtcblxuICAgICAgZGVsZXRlIHRoaXMudG91Y2hlc1t0b3VjaC5pZGVudGlmaWVyXTtcblxuICAgICAgdGhpcy50cmlnZ2VyKFwidG91Y2hlbmRcIiwgdG91Y2hlbmRFdmVudCk7XG5cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgfVxuXG59O1xuXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELlRvdWNoLnByb3RvdHlwZSwgUExBWUdST1VORC5FdmVudHMucHJvdG90eXBlKTtcblxuLyogZmlsZTogc3JjL1R3ZWVuLmpzICovXG5cblBMQVlHUk9VTkQuVHdlZW4gPSBmdW5jdGlvbihtYW5hZ2VyLCBjb250ZXh0KSB7XG5cbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcblxuICB0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuXG4gIFBMQVlHUk9VTkQuVXRpbHMuZXh0ZW5kKHRoaXMsIHtcblxuICAgIGFjdGlvbnM6IFtdLFxuICAgIGluZGV4OiAtMSxcblxuICAgIHByZXZFYXNpbmc6IFwiMDQ1XCIsXG4gICAgcHJldkR1cmF0aW9uOiAwLjVcblxuICB9KTtcblxuICB0aGlzLmN1cnJlbnQgPSBmYWxzZTtcblxufTtcblxuUExBWUdST1VORC5Ud2Vlbi5wcm90b3R5cGUgPSB7XG5cbiAgYWRkOiBmdW5jdGlvbihwcm9wZXJ0aWVzLCBkdXJhdGlvbiwgZWFzaW5nKSB7XG5cbiAgICBpZiAoZHVyYXRpb24pIHRoaXMucHJldkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgZWxzZSBkdXJhdGlvbiA9IDAuNTtcbiAgICBpZiAoZWFzaW5nKSB0aGlzLnByZXZFYXNpbmcgPSBlYXNpbmc7XG4gICAgZWxzZSBlYXNpbmcgPSBcIjA0NVwiO1xuXG4gICAgdGhpcy5hY3Rpb25zLnB1c2goW3Byb3BlcnRpZXMsIGR1cmF0aW9uLCBlYXNpbmddKTtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgZGlzY2FyZDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLm1hbmFnZXIuZGlzY2FyZCh0aGlzLmNvbnRleHQsIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICB0bzogZnVuY3Rpb24ocHJvcGVydGllcywgZHVyYXRpb24sIGVhc2luZykge1xuICAgIHJldHVybiB0aGlzLmFkZChwcm9wZXJ0aWVzLCBkdXJhdGlvbiwgZWFzaW5nKTtcbiAgfSxcblxuICBsb29wOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubG9vcGVkID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgcmVwZWF0OiBmdW5jdGlvbih0aW1lcykge1xuXG4gICAgdGhpcy5hY3Rpb25zLnB1c2goW1wicmVwZWF0XCIsIHRpbWVzXSk7XG5cbiAgfSxcblxuICB3YWl0OiBmdW5jdGlvbih0aW1lKSB7XG5cbiAgICB0aGlzLmFjdGlvbnMucHVzaChbXCJ3YWl0XCIsIHRpbWVdKTtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgZGVsYXk6IGZ1bmN0aW9uKHRpbWUpIHtcblxuICAgIHRoaXMuYWN0aW9ucy5wdXNoKFtcIndhaXRcIiwgdGltZV0pO1xuXG4gIH0sXG5cbiAgc3RvcDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLm1hbmFnZXIucmVtb3ZlKHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICBwbGF5OiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubWFuYWdlci5hZGQodGhpcyk7XG5cbiAgICB0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9LFxuXG5cbiAgZW5kOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBsYXN0QW5pbWF0aW9uSW5kZXggPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IHRoaXMuaW5kZXggKyAxOyBpIDwgdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuYWN0aW9uc1tpXVswXSA9PT0gXCJvYmplY3RcIikgbGFzdEFuaW1hdGlvbkluZGV4ID0gaTtcbiAgICB9XG5cbiAgICB0aGlzLmluZGV4ID0gbGFzdEFuaW1hdGlvbkluZGV4IC0gMTtcbiAgICB0aGlzLm5leHQoKTtcbiAgICB0aGlzLmRlbHRhID0gdGhpcy5kdXJhdGlvbjtcbiAgICB0aGlzLnN0ZXAoMCk7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9LFxuXG4gIGZvcndhcmQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5kZWx0YSA9IHRoaXMuZHVyYXRpb247XG4gICAgdGhpcy5zdGVwKDApO1xuXG4gIH0sXG5cbiAgcmV3aW5kOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZGVsdGEgPSAwO1xuICAgIHRoaXMuc3RlcCgwKTtcblxuICB9LFxuXG4gIG5leHQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5kZWx0YSA9IDA7XG5cbiAgICB0aGlzLmluZGV4Kys7XG5cbiAgICBpZiAodGhpcy5pbmRleCA+PSB0aGlzLmFjdGlvbnMubGVuZ3RoKSB7XG5cbiAgICAgIGlmICh0aGlzLmxvb3BlZCkge1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcihcImxvb3BcIiwge1xuICAgICAgICAgIHR3ZWVuOiB0aGlzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoXCJmaW5pc2hlZFwiLCB7XG4gICAgICAgICAgdHdlZW46IHRoaXNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubWFuYWdlci5yZW1vdmUodGhpcyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmFjdGlvbnNbdGhpcy5pbmRleF07XG5cbiAgICBpZiAodGhpcy5jdXJyZW50WzBdID09PSBcIndhaXRcIikge1xuXG4gICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy5jdXJyZW50WzFdO1xuICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gXCJ3YWl0XCI7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKiBjYWxjdWxhdGUgY2hhbmdlcyAqL1xuXG4gICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuY3VycmVudFswXTtcblxuICAgICAgLyoga2VlcCBrZXlzIGFzIGFycmF5IGZvciAwLjAwMDElIHBlcmZvcm1hbmNlIGJvb3N0ICovXG5cbiAgICAgIHRoaXMua2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXG4gICAgICB0aGlzLmNoYW5nZSA9IFtdO1xuICAgICAgdGhpcy5iZWZvcmUgPSBbXTtcbiAgICAgIHRoaXMudHlwZXMgPSBbXTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMua2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5rZXlzW2ldO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb250ZXh0W2tleV0gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICB0aGlzLmJlZm9yZS5wdXNoKHRoaXMuY29udGV4dFtrZXldKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZS5wdXNoKHByb3BlcnRpZXNba2V5XSAtIHRoaXMuY29udGV4dFtrZXldKTtcbiAgICAgICAgICB0aGlzLnR5cGVzLnB1c2goMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGJlZm9yZSA9IGNxLmNvbG9yKHRoaXMuY29udGV4dFtrZXldKTtcblxuICAgICAgICAgIHRoaXMuYmVmb3JlLnB1c2goYmVmb3JlKTtcblxuICAgICAgICAgIHZhciBhZnRlciA9IGNxLmNvbG9yKHByb3BlcnRpZXNba2V5XSk7XG5cbiAgICAgICAgICB2YXIgdGVtcCA9IFtdO1xuXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgICAgIHRlbXAucHVzaChhZnRlcltqXSAtIGJlZm9yZVtqXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jaGFuZ2UucHVzaCh0ZW1wKTtcblxuICAgICAgICAgIHRoaXMudHlwZXMucHVzaCgxKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IFwiYW5pbWF0ZVwiO1xuXG4gICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy5jdXJyZW50WzFdO1xuICAgICAgdGhpcy5lYXNpbmcgPSB0aGlzLmN1cnJlbnRbMl07XG5cbiAgICB9XG5cblxuICB9LFxuXG4gIHByZXY6IGZ1bmN0aW9uKCkge1xuXG4gIH0sXG5cbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcblxuICAgIHRoaXMuZGVsdGEgKz0gZGVsdGE7XG5cbiAgICBpZiAoIXRoaXMuY3VycmVudCkgdGhpcy5uZXh0KCk7XG5cbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudEFjdGlvbikge1xuXG4gICAgICBjYXNlIFwiYW5pbWF0ZVwiOlxuICAgICAgICB0aGlzLmRvQW5pbWF0ZShkZWx0YSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwid2FpdFwiOlxuICAgICAgICB0aGlzLmRvV2FpdChkZWx0YSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub25zdGVwKSB0aGlzLm9uc3RlcCh0aGlzLmNvbnRleHQpO1xuXG4gIH0sXG5cbiAgZG9BbmltYXRlOiBmdW5jdGlvbihkZWx0YSkge1xuXG4gICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKDEsIHRoaXMuZGVsdGEgLyB0aGlzLmR1cmF0aW9uKTtcblxuICAgIHZhciBtb2QgPSBQTEFZR1JPVU5ELlV0aWxzLmVhc2UodGhpcy5wcm9ncmVzcywgdGhpcy5lYXNpbmcpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmtleXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIGtleSA9IHRoaXMua2V5c1tpXTtcblxuICAgICAgc3dpdGNoICh0aGlzLnR5cGVzW2ldKSB7XG5cbiAgICAgICAgLyogbnVtYmVyICovXG5cbiAgICAgICAgY2FzZSAwOlxuXG4gICAgICAgICAgdGhpcy5jb250ZXh0W2tleV0gPSB0aGlzLmJlZm9yZVtpXSArIHRoaXMuY2hhbmdlW2ldICogbW9kO1xuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvKiBjb2xvciAqL1xuXG4gICAgICAgIGNhc2UgMTpcblxuICAgICAgICAgIHZhciBjaGFuZ2UgPSB0aGlzLmNoYW5nZVtpXTtcbiAgICAgICAgICB2YXIgYmVmb3JlID0gdGhpcy5iZWZvcmVbaV07XG4gICAgICAgICAgdmFyIGNvbG9yID0gW107XG5cbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICAgICAgY29sb3IucHVzaChiZWZvcmVbal0gKyBjaGFuZ2Vbal0gKiBtb2QgfCAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNvbnRleHRba2V5XSA9IFwicmdiKFwiICsgY29sb3Iuam9pbihcIixcIikgKyBcIilcIjtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEpIHtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgIH1cblxuICB9LFxuXG4gIGRvV2FpdDogZnVuY3Rpb24oZGVsdGEpIHtcblxuICAgIGlmICh0aGlzLmRlbHRhID49IHRoaXMuZHVyYXRpb24pIHRoaXMubmV4dCgpO1xuXG4gIH1cblxufTtcblxuUExBWUdST1VORC5VdGlscy5leHRlbmQoUExBWUdST1VORC5Ud2Vlbi5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XG5cblBMQVlHUk9VTkQuVHdlZW5NYW5hZ2VyID0gZnVuY3Rpb24oYXBwKSB7XG5cbiAgdGhpcy50d2VlbnMgPSBbXTtcblxuICBpZiAoYXBwKSB7XG4gICAgdGhpcy5hcHAgPSBhcHA7XG4gICAgdGhpcy5hcHAudHdlZW4gPSB0aGlzLnR3ZWVuLmJpbmQodGhpcyk7XG4gIH1cblxuICB0aGlzLmRlbHRhID0gMDtcblxuICB0aGlzLmFwcC5vbihcInN0ZXBcIiwgdGhpcy5zdGVwLmJpbmQodGhpcykpO1xuXG59O1xuXG5QTEFZR1JPVU5ELlR3ZWVuTWFuYWdlci5wcm90b3R5cGUgPSB7XG5cbiAgZGVmYXVsdEVhc2luZzogXCIxMjhcIixcblxuICBkaXNjYXJkOiBmdW5jdGlvbihvYmplY3QsIHNhZmUpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50d2VlbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIHR3ZWVuID0gdGhpcy50d2VlbnNbaV07XG5cbiAgICAgIGlmICh0d2Vlbi5jb250ZXh0ID09PSBvYmplY3QgJiYgdHdlZW4gIT09IHNhZmUpIHRoaXMucmVtb3ZlKHR3ZWVuKTtcblxuICAgIH1cblxuICB9LFxuXG4gIHR3ZWVuOiBmdW5jdGlvbihjb250ZXh0KSB7XG5cbiAgICB2YXIgdHdlZW4gPSBuZXcgUExBWUdST1VORC5Ud2Vlbih0aGlzLCBjb250ZXh0KTtcblxuICAgIHRoaXMuYWRkKHR3ZWVuKTtcblxuICAgIHJldHVybiB0d2VlbjtcblxuICB9LFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKGRlbHRhKSB7XG5cbiAgICB0aGlzLmRlbHRhICs9IGRlbHRhO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnR3ZWVucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgdHdlZW4gPSB0aGlzLnR3ZWVuc1tpXTtcblxuICAgICAgaWYgKCF0d2Vlbi5fcmVtb3ZlKSB0d2Vlbi5zdGVwKGRlbHRhKTtcblxuICAgICAgaWYgKHR3ZWVuLl9yZW1vdmUpIHRoaXMudHdlZW5zLnNwbGljZShpLS0sIDEpO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgYWRkOiBmdW5jdGlvbih0d2Vlbikge1xuXG4gICAgdHdlZW4uX3JlbW92ZSA9IGZhbHNlO1xuXG4gICAgdmFyIGluZGV4ID0gdGhpcy50d2VlbnMuaW5kZXhPZih0d2Vlbik7XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB0aGlzLnR3ZWVucy5wdXNoKHR3ZWVuKTtcblxuICB9LFxuXG4gIHJlbW92ZTogZnVuY3Rpb24odHdlZW4pIHtcblxuICAgIHR3ZWVuLl9yZW1vdmUgPSB0cnVlO1xuXG4gIH1cblxufTtcblxuLyogZmlsZTogc3JjL0F0bGFzZXMuanMgKi9cblxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUubG9hZEF0bGFzZXMgPSBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblxuICAgIC8qIHBvbHltb3JwaGlzbSBhdCBpdHMgZmluZXN0ICovXG5cbiAgICBpZiAodHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIikge1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXJnKSB0aGlzLmxvYWRBdGxhc2VzKGFyZ1trZXldKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8qIGlmIGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvYXJyYXkgbGV0J3MgdHJ5IHRvIGxvYWQgaXQgKi9cblxuICAgICAgdGhpcy5fbG9hZEF0bGFzKGFyZylcblxuICAgIH1cbiAgfVxuXG59O1xuXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkQXRsYXMgPSBmdW5jdGlvbigpIHtcblxuICByZXR1cm4gdGhpcy5sb2FkQXRsYXNlcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG59O1xuXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5fbG9hZEF0bGFzID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcblxuICB2YXIgZW50cnkgPSB0aGlzLmdldEFzc2V0RW50cnkoZmlsZW5hbWUsIFwiYXRsYXNlc1wiLCBcInBuZ1wiKTtcblxuICB0aGlzLmxvYWRlci5hZGQoZW50cnkudXJsKTtcblxuICB2YXIgYXRsYXMgPSB0aGlzLmF0bGFzZXNbZW50cnkua2V5XSA9IHt9O1xuXG4gIHZhciBpbWFnZSA9IGF0bGFzLmltYWdlID0gbmV3IEltYWdlO1xuXG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgIGxvYWRlci5zdWNjZXNzKGVudHJ5LnVybCk7XG4gIH0pO1xuXG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbigpIHtcbiAgICBsb2FkZXIuZXJyb3IoZW50cnkudXJsKTtcbiAgfSk7XG5cbiAgaW1hZ2Uuc3JjID0gZW50cnkudXJsO1xuXG4gIC8qIGRhdGEgKi9cblxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBlbnRyeS5wYXRoICsgXCIuanNvblwiLCB0cnVlKTtcblxuICB0aGlzLmxvYWRlci5hZGQoZW50cnkucGF0aCArIFwiLmpzb25cIik7XG5cbiAgdmFyIGxvYWRlciA9IHRoaXMubG9hZGVyO1xuXG4gIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG5cbiAgICBhdGxhcy5mcmFtZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5mcmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBmcmFtZSA9IGRhdGEuZnJhbWVzW2ldO1xuXG4gICAgICBhdGxhcy5mcmFtZXMucHVzaCh7XG4gICAgICAgIHJlZ2lvbjogW2ZyYW1lLmZyYW1lLngsIGZyYW1lLmZyYW1lLnksIGZyYW1lLmZyYW1lLncsIGZyYW1lLmZyYW1lLmhdLFxuICAgICAgICBvZmZzZXQ6IFtmcmFtZS5zcHJpdGVTb3VyY2VTaXplLnggfHwgMCwgZnJhbWUuc3ByaXRlU291cmNlU2l6ZS55IHx8IDBdLFxuICAgICAgICB3aWR0aDogZnJhbWUuc291cmNlU2l6ZS53LFxuICAgICAgICBoZWlnaHQ6IGZyYW1lLnNvdXJjZVNpemUuaFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZGVyLnN1Y2Nlc3MoZW50cnkucGF0aCArIFwiLmpzb25cIik7XG5cbiAgfVxuXG4gIHJlcXVlc3Quc2VuZCgpO1xufTtcblxuLyogZmlsZTogc3JjL0ZvbnRzLmpzICovXG5cblBMQVlHUk9VTkQuQXBwbGljYXRpb24ucHJvdG90eXBlLmxvYWRGb250ID0gZnVuY3Rpb24obmFtZSkge1xuXG4gIHZhciBzdHlsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHN0eWxlTm9kZS50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG4gIHZhciBmb3JtYXRzID0ge1xuICAgIFwid29mZlwiOiBcIndvZmZcIixcbiAgICBcInR0ZlwiOiBcInRydWV0eXBlXCJcbiAgfTtcblxuICB2YXIgc291cmNlcyA9IFwiXCI7XG5cbiAgZm9yICh2YXIgZXh0IGluIGZvcm1hdHMpIHtcbiAgICB2YXIgdHlwZSA9IGZvcm1hdHNbZXh0XTtcbiAgICBzb3VyY2VzICs9IFwiIHVybChcXFwiZm9udHMvXCIgKyBuYW1lICsgXCIuXCIgKyBleHQgKyBcIlxcXCIpIGZvcm1hdCgnXCIgKyB0eXBlICsgXCInKTtcIlxuICB9XG5cbiAgc3R5bGVOb2RlLnRleHRDb250ZW50ID0gXCJAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6ICdcIiArIG5hbWUgKyBcIic7IHNyYzogXCIgKyBzb3VyY2VzICsgXCIgfVwiO1xuXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVOb2RlKTtcblxuICB2YXIgbGF5ZXIgPSBjcSgzMiwgMzIpO1xuXG4gIGxheWVyLmZvbnQoXCIxMHB4IFRlc3RpbmdcIik7XG4gIGxheWVyLmZpbGxUZXh0KDE2LCAxNiwgMTYpLnRyaW0oKTtcblxuICB2YXIgd2lkdGggPSBsYXllci53aWR0aDtcbiAgdmFyIGhlaWdodCA9IGxheWVyLmhlaWdodDtcblxuICB0aGlzLmxvYWRlci5hZGQoXCJmb250IFwiICsgbmFtZSk7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIGNoZWNrKCkge1xuXG4gICAgdmFyIGxheWVyID0gY3EoMzIsIDMyKTtcblxuICAgIGxheWVyLmZvbnQoXCIxMHB4IFwiICsgbmFtZSkuZmlsbFRleHQoMTYsIDE2LCAxNik7XG4gICAgbGF5ZXIudHJpbSgpO1xuXG4gICAgaWYgKGxheWVyLndpZHRoICE9PSB3aWR0aCB8fCBsYXllci5oZWlnaHQgIT09IGhlaWdodCkge1xuXG4gICAgICBzZWxmLmxvYWRlci5yZWFkeShcImZvbnQgXCIgKyBuYW1lKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHNldFRpbWVvdXQoY2hlY2ssIDI1MCk7XG5cbiAgICB9XG5cbiAgfTtcblxuICBjaGVjaygpO1xuXG59O1xuXG4vKiBmaWxlOiBzcmMvRGVmYXVsdFN0YXRlLmpzICovXG5cblBMQVlHUk9VTkQuRGVmYXVsdFN0YXRlID0ge1xuXG59O1xuXG4vKiBmaWxlOiBzcmMvTG9hZGluZ1NjcmVlbi5qcyAqL1xuXG5QTEFZR1JPVU5ELkxvYWRpbmdTY3JlZW4gPSB7XG5cbiAgLyogYmFzaWMgbG9hZGluZyBzY3JlZW4gdXNpbmcgRE9NICovXG5cbiAgbG9nb1JhdzogXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU5vQUFBQVNCQU1BQUFEUGlOMHhBQUFBR0ZCTVZFVUFBUUF0TGl4SFNVZG5hR2FKaW9pbXFLWE16c3Y3L2ZyNXNoZ1ZBQUFBQVdKTFIwUUFpQVVkU0FBQUFBbHdTRmx6QUFBTEV3QUFDeE1CQUpxY0dBQUFBQWQwU1UxRkI5OEVBd2tlQTRvUVdKNEFBQUFaZEVWWWRFTnZiVzFsYm5RQVEzSmxZWFJsWkNCM2FYUm9JRWRKVFZCWGdRNFhBQUFCOWtsRVFWUTR5NzJVdlcrck1CREF6K0ZycFZLcnJGbWVzbWFwV05PbHJLalNlMWtaK3VvVkF2aisvZnJ1akcxU2FKY3FKd1U3dm9PZjd4TVF6UW1zSURpNU5QVE1zTFJudEgzVStGNlNBWm8zTmxDdmNnQkZKejhvK3ZrRGlFNjNsSTk1WS9VbXBpbnNaV2tnSldKaURiQVZRMTZodHB0eFNUTmxvSWx1Z3dhdzAwMUV5M0FTRjNzbzZMMXFMTlh6UVM1UzBVR0tML0NJNXdXTnJpRTBVSDlZdHkzN0xxSVZnK3dzcXU3SXgwTXdWQlNGL2RVK2p2MlNObm1hMDIxTEVkUHFWbk1lVTN4QXUwa1hjU0dqbXE3T3g0RTJXbjg4TFoyK0VGajNhdmppeHphaTZWUFZ5dVl2ZVpMSEYyWGZkRG52QXEyN0RJSEd1cSswREpGc0UzME90QjFLcU93ZDhEcjdQY000YitqZmoyZzVscDRXeW50Qks2NnF1YTNKekVBK3VYSnB3SC9ObFZ1elJWUFkva1RMQjJtanVOK0t3ZFo4Rk95OGoyZ0RiRVVTcXVtblNDWTRsZjRpYnEzSWhWTTR5Y1pRUm52K3pGcVZkSlFWbjZCeHZVcWViR3B1YU5vM3NaeHdCemphamlNWk9vQml3eVZGK2tDcituVWFKT2FHcG5BZVJQUEpaVHI0RnFtSFJYY25lRW80RHFRL2Z0ZmRuTGVEclVBTUU4eFdLUGVLQ3dXNllrRXBYZnMzcDFFV0poZGNVQVlQMFRJL3VZYVY4Y2dqd0JvdmFleVd3amkyVDlyVEZJZFMvY1AvTW5rVExSVVd4Z05OWlZpbjdiVDVmcVQ5bWlEY1VWSnpSMWdScGZJT05NbXVsVSs1UXFyNnpYQVVxQUFBQUFCSlJVNUVya0pnZ2c9PVwiLFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmxvZ28gPSBuZXcgSW1hZ2U7XG5cbiAgICB0aGlzLmxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnJlYWR5ID0gdHJ1ZTtcbiAgICAgIHNlbGYuY3JlYXRlRWxlbWVudHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9nby5zcmMgPSB0aGlzLmxvZ29SYXc7XG5cbiAgICB0aGlzLmJhY2tncm91bmQgPSBcIiMwMDBcIjtcblxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuYmFja2dyb3VuZENvbG9yIHx8IFwiIzAwMFwiO1xuICAgIH1cblxuXG4gIH0sXG5cbiAgZW50ZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jdXJyZW50ID0gMDtcblxuICB9LFxuXG4gIGxlYXZlOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubG9ja2VkID0gdHJ1ZTtcblxuICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hcHAudHdlZW4odGhpcylcbiAgICAgIC50byh7XG4gICAgICAgIGN1cnJlbnQ6IDFcbiAgICAgIH0sIDAuNSk7XG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xuXG4gICAgaWYgKHRoaXMubG9ja2VkKSB7XG5cbiAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5maW5pc2hlZCkge1xuICAgICAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLndyYXBwZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLndyYXBwZXIpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50ICsgTWF0aC5hYnModGhpcy5hcHAubG9hZGVyLnByb2dyZXNzIC0gdGhpcy5jdXJyZW50KSAqIGRlbHRhO1xuICAgIH1cblxuICB9LFxuXG4gIGNyZWF0ZUVsZW1lbnRzOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNiB8IDA7XG4gICAgdGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjEgfCAwO1xuXG4gICAgdGhpcy53cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgXCJweFwiO1xuICAgIHRoaXMud3JhcHBlci5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodCArIFwicHhcIjtcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUuYmFja2dyb3VuZCA9IFwiIzAwMFwiO1xuICAgIHRoaXMud3JhcHBlci5zdHlsZS5ib3JkZXIgPSBcIjRweCBzb2xpZCAjZmZmXCI7XG4gICAgdGhpcy53cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHRoaXMud3JhcHBlci5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIHRoaXMud2lkdGggLyAyIHwgMCkgKyBcInB4XCI7XG4gICAgdGhpcy53cmFwcGVyLnN0eWxlLnRvcCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gdGhpcy5oZWlnaHQgLyAyIHwgMCkgKyBcInB4XCI7XG4gICAgdGhpcy53cmFwcGVyLnN0eWxlLnpJbmRleCA9IDEwMDtcblxuICAgIHRoaXMuYXBwLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xuXG4gICAgdGhpcy5wcm9ncmVzc0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IFwiMCVcIjtcbiAgICB0aGlzLnByb2dyZXNzQmFyLnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgXCJweFwiO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc3R5bGUuYmFja2dyb3VuZCA9IFwiI2ZmZlwiO1xuXG4gICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMucHJvZ3Jlc3NCYXIpO1xuXG4gIH0sXG5cblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKCF0aGlzLnJlYWR5KSByZXR1cm47XG5cbiAgICB0aGlzLnByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gKHRoaXMuY3VycmVudCAqIDEwMCB8IDApICsgXCIlXCI7XG5cblxuICB9XG5cbn07XG5cbi8qIGZpbGU6IHNyYy9saWIvQ2FudmFzUXVlcnkuanMgKi9cblxuLypcblxuICBDYW52YXMgUXVlcnkgcjJcblxuICBodHRwOi8vY2FudmFzcXVlcnkuY29tXG5cbiAgKGMpIDIwMTItMjAxNSBodHRwOi8vcmV6b25lci5uZXRcblxuICBDYW52YXMgUXVlcnkgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbiAgISBmaXhlZCBjb2xvciBwYXJzZXJzXG5cbiovXG5cblxuKGZ1bmN0aW9uKCkge1xuXG4gIHZhciBDT0NPT05KUyA9IGZhbHNlO1xuXG4gIHZhciBDYW52YXMgPSB3aW5kb3cuSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHZhciBJbWFnZSA9IHdpbmRvdy5IVE1MSW1hZ2VFbGVtZW50O1xuICB2YXIgQ09DT09OSlMgPSBuYXZpZ2F0b3IuaXNDb2Nvb25KUztcblxuICB2YXIgY3EgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ2FudmFzKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAvLyBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJudW1iZXJcIikge1xuICAgICAgdmFyIGNhbnZhcyA9IGNxLmNyZWF0ZUNhbnZhcyhhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEltYWdlKSB7XG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ2FudmFzKHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgY3EuTGF5ZXIpIHtcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNhbnZhcyA9IHNlbGVjdG9yO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgY3EuTGF5ZXIoY2FudmFzKTtcbiAgfTtcblxuICBjcS5saW5lU3BhY2luZyA9IDEuMDtcbiAgY3EuZGVmYXVsdEZvbnQgPSBcIkFyaWFsXCI7XG5cbiAgY3EuY29jb29uID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFyIGNhbnZhcyA9IGNxLmNyZWF0ZUNvY29vbkNhbnZhcyh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uKCkge30pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHZhciBjYW52YXMgPSBjcS5jcmVhdGVDb2Nvb25DYW52YXMoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBJbWFnZSkge1xuICAgICAgdmFyIGNhbnZhcyA9IGNxLmNyZWF0ZUNvY29vbkNhbnZhcyhzZWxlY3Rvcik7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIGNxLkxheWVyKSB7XG4gICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjYW52YXMgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGNxLkxheWVyKGNhbnZhcyk7XG4gIH1cblxuICAvKiBmYXN0LmpzICovXG5cbiAgY3EuZmFzdEFwcGx5ID0gZnVuY3Rpb24oc3ViamVjdCwgdGhpc0NvbnRleHQsIGFyZ3MpIHtcblxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCk7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICAgICAgY2FzZSA1OlxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSwgYXJnc1s1XSk7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0sIGFyZ3NbNV0sIGFyZ3NbNl0pO1xuICAgICAgY2FzZSA4OlxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdLCBhcmdzWzVdLCBhcmdzWzZdLCBhcmdzWzddKTtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSwgYXJnc1s1XSwgYXJnc1s2XSwgYXJnc1s3XSwgYXJnc1s4XSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gc3ViamVjdC5hcHBseSh0aGlzQ29udGV4dCwgYXJncyk7XG4gICAgfVxuXG4gIH07XG5cbiAgY3EuZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogaW4gYXJndW1lbnRzW2ldKSB7XG4gICAgICAgIGFyZ3VtZW50c1swXVtqXSA9IGFyZ3VtZW50c1tpXVtqXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICB9O1xuXG4gIGNxLmF1Z21lbnQgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgXy5leHRlbmQoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbaV0pO1xuICAgICAgYXJndW1lbnRzW2ldKGFyZ3VtZW50c1swXSk7XG4gICAgfVxuICB9O1xuXG4gIGNxLmRpc3RhbmNlID0gZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgIHZhciBkeCA9IHgxIC0geDI7XG4gICAgICB2YXIgZHkgPSB5MSAtIHkyO1xuXG4gICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKHgxIC0geTEpO1xuICAgIH1cbiAgfTtcblxuICBjcS5leHRlbmQoY3EsIHtcblxuICAgIHNtb290aGluZzogdHJ1ZSxcblxuICAgIGJsZW5kOiBmdW5jdGlvbihiZWxvdywgYWJvdmUsIG1vZGUsIG1peCkge1xuXG4gICAgICBpZiAodHlwZW9mIG1peCA9PT0gXCJ1bmRlZmluZWRcIikgbWl4ID0gMTtcblxuICAgICAgdmFyIGJlbG93ID0gY3EoYmVsb3cpO1xuICAgICAgdmFyIG1hc2sgPSBiZWxvdy5jbG9uZSgpO1xuICAgICAgdmFyIGFib3ZlID0gY3EoYWJvdmUpO1xuXG4gICAgICBiZWxvdy5zYXZlKCk7XG4gICAgICBiZWxvdy5nbG9iYWxBbHBoYShtaXgpO1xuICAgICAgYmVsb3cuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKG1vZGUpO1xuICAgICAgYmVsb3cuZHJhd0ltYWdlKGFib3ZlLmNhbnZhcywgMCwgMCk7XG4gICAgICBiZWxvdy5yZXN0b3JlKCk7XG5cbiAgICAgIG1hc2suc2F2ZSgpO1xuICAgICAgbWFzay5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oXCJzb3VyY2UtaW5cIik7XG4gICAgICBtYXNrLmRyYXdJbWFnZShiZWxvdy5jYW52YXMsIDAsIDApO1xuICAgICAgbWFzay5yZXN0b3JlKCk7XG5cbiAgICAgIHJldHVybiBtYXNrO1xuICAgIH0sXG5cbiAgICBtYXRjaENvbG9yOiBmdW5jdGlvbihjb2xvciwgcGFsZXR0ZSkge1xuICAgICAgdmFyIHJnYlBhbGV0dGUgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWxldHRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJnYlBhbGV0dGUucHVzaChjcS5jb2xvcihwYWxldHRlW2ldKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbWdEYXRhID0gY3EuY29sb3IoY29sb3IpO1xuXG4gICAgICB2YXIgZGlmTGlzdCA9IFtdO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZ2JQYWxldHRlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciByZ2JWYWwgPSByZ2JQYWxldHRlW2pdO1xuICAgICAgICB2YXIgckRpZiA9IE1hdGguYWJzKGltZ0RhdGFbMF0gLSByZ2JWYWxbMF0pLFxuICAgICAgICAgIGdEaWYgPSBNYXRoLmFicyhpbWdEYXRhWzFdIC0gcmdiVmFsWzFdKSxcbiAgICAgICAgICBiRGlmID0gTWF0aC5hYnMoaW1nRGF0YVsyXSAtIHJnYlZhbFsyXSk7XG4gICAgICAgIGRpZkxpc3QucHVzaChyRGlmICsgZ0RpZiArIGJEaWYpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2xvc2VzdE1hdGNoID0gMDtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGFsZXR0ZS5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoZGlmTGlzdFtqXSA8IGRpZkxpc3RbY2xvc2VzdE1hdGNoXSkge1xuICAgICAgICAgIGNsb3Nlc3RNYXRjaCA9IGo7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhbGV0dGVbY2xvc2VzdE1hdGNoXTtcbiAgICB9LFxuXG4gICAgdGVtcDogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuICAgICAgaWYgKCF0aGlzLnRlbXBMYXllcikge1xuICAgICAgICB0aGlzLnRlbXBMYXllciA9IGNxKDEsIDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAod2lkdGggaW5zdGFuY2VvZiBJbWFnZSkge1xuICAgICAgICB0aGlzLnRlbXBMYXllci53aWR0aCA9IHdpZHRoLndpZHRoO1xuICAgICAgICB0aGlzLnRlbXBMYXllci5oZWlnaHQgPSB3aWR0aC5oZWlnaHQ7XG4gICAgICAgIHRoaXMudGVtcExheWVyLmNvbnRleHQuZHJhd0ltYWdlKHdpZHRoLCAwLCAwKTtcbiAgICAgIH0gZWxzZSBpZiAod2lkdGggaW5zdGFuY2VvZiBDYW52YXMpIHtcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIud2lkdGggPSB3aWR0aC53aWR0aDtcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuaGVpZ2h0ID0gd2lkdGguaGVpZ2h0O1xuICAgICAgICB0aGlzLnRlbXBMYXllci5jb250ZXh0LmRyYXdJbWFnZSh3aWR0aCwgMCwgMCk7XG4gICAgICB9IGVsc2UgaWYgKHdpZHRoIGluc3RhbmNlb2YgQ2FudmFzUXVlcnkuTGF5ZXIpIHtcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIud2lkdGggPSB3aWR0aC53aWR0aDtcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuaGVpZ2h0ID0gd2lkdGguaGVpZ2h0O1xuICAgICAgICB0aGlzLnRlbXBMYXllci5jb250ZXh0LmRyYXdJbWFnZSh3aWR0aC5jYW52YXMsIDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy50ZW1wTGF5ZXI7XG4gICAgfSxcblxuICAgIHdyYXBWYWx1ZTogZnVuY3Rpb24odmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgICBpZiAodmFsdWUgPCBtaW4pIHJldHVybiBtYXggKyAodmFsdWUgJSBtYXgpO1xuICAgICAgaWYgKHZhbHVlID49IG1heCkgcmV0dXJuIHZhbHVlICUgbWF4O1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG5cbiAgICBsaW1pdFZhbHVlOiBmdW5jdGlvbih2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA8IG1pbiA/IG1pbiA6IHZhbHVlID4gbWF4ID8gbWF4IDogdmFsdWU7XG4gICAgfSxcblxuICAgIG1peDogZnVuY3Rpb24oYSwgYiwgYW1vdW50KSB7XG4gICAgICByZXR1cm4gYSArIChiIC0gYSkgKiBhbW91bnQ7XG4gICAgfSxcblxuICAgIGhleFRvUmdiOiBmdW5jdGlvbihoZXgpIHtcbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSA3KSByZXR1cm4gWycweCcgKyBoZXhbMV0gKyBoZXhbMl0gfCAwLCAnMHgnICsgaGV4WzNdICsgaGV4WzRdIHwgMCwgJzB4JyArIGhleFs1XSArIGhleFs2XSB8IDBdO1xuICAgICAgZWxzZSByZXR1cm4gWycweCcgKyBoZXhbMV0gKyBoZXhbMV0gfCAwLCAnMHgnICsgaGV4WzJdICsgaGV4WzJdIHwgMCwgJzB4JyArIGhleFszXSArIGhleFszXSB8IDBdO1xuICAgIH0sXG5cbiAgICByZ2JUb0hleDogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgcmV0dXJuIFwiI1wiICsgKCgxIDw8IDI0KSArIChyIDw8IDE2KSArIChnIDw8IDgpICsgYikudG9TdHJpbmcoMTYpLnNsaWNlKDEsIDcpO1xuICAgIH0sXG5cbiAgICAvKiBhdXRob3I6IGh0dHA6Ly9tamlqYWNrc29uLmNvbS8gKi9cblxuICAgIHJnYlRvSHNsOiBmdW5jdGlvbihyLCBnLCBiKSB7XG5cbiAgICAgIGlmIChyIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgYiA9IHJbMl07XG4gICAgICAgIGcgPSByWzFdO1xuICAgICAgICByID0gclswXTtcbiAgICAgIH1cblxuICAgICAgciAvPSAyNTUsIGcgLz0gMjU1LCBiIC89IDI1NTtcbiAgICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgICB2YXIgaCwgcywgbCA9IChtYXggKyBtaW4pIC8gMjtcblxuICAgICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgICAgaCA9IHMgPSAwOyAvLyBhY2hyb21hdGljXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIGI6XG4gICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaCAvPSA2O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2gsIHMsIGxdO1xuICAgIH0sXG5cbiAgICAvKiBhdXRob3I6IGh0dHA6Ly9tamlqYWNrc29uLmNvbS8gKi9cblxuICAgIGh1ZTJyZ2I6IGZ1bmN0aW9uKHAsIHEsIHQpIHtcbiAgICAgIGlmICh0IDwgMCkgdCArPSAxO1xuICAgICAgaWYgKHQgPiAxKSB0IC09IDE7XG4gICAgICBpZiAodCA8IDEgLyA2KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgICAgIGlmICh0IDwgMSAvIDIpIHJldHVybiBxO1xuICAgICAgaWYgKHQgPCAyIC8gMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xuICAgICAgcmV0dXJuIHA7XG4gICAgfSxcblxuICAgIGhzbFRvUmdiOiBmdW5jdGlvbihoLCBzLCBsKSB7XG4gICAgICB2YXIgciwgZywgYjtcblxuICAgICAgaWYgKHMgPT0gMCkge1xuICAgICAgICByID0gZyA9IGIgPSBsOyAvLyBhY2hyb21hdGljXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICAgICAgdmFyIHAgPSAyICogbCAtIHE7XG4gICAgICAgIHIgPSB0aGlzLmh1ZTJyZ2IocCwgcSwgaCArIDEgLyAzKTtcbiAgICAgICAgZyA9IHRoaXMuaHVlMnJnYihwLCBxLCBoKTtcbiAgICAgICAgYiA9IHRoaXMuaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW3IgKiAyNTUgfCAwLCBnICogMjU1IHwgMCwgYiAqIDI1NSB8IDBdO1xuICAgIH0sXG5cbiAgICByZ2JUb0hzdjogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgaWYgKHIgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBiID0gclsyXTtcbiAgICAgICAgZyA9IHJbMV07XG4gICAgICAgIHIgPSByWzBdO1xuICAgICAgfVxuXG4gICAgICByID0gciAvIDI1NSwgZyA9IGcgLyAyNTUsIGIgPSBiIC8gMjU1O1xuICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICAgIHZhciBoLCBzLCB2ID0gbWF4O1xuXG4gICAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICAgIHMgPSBtYXggPT0gMCA/IDAgOiBkIC8gbWF4O1xuXG4gICAgICBpZiAobWF4ID09IG1pbikge1xuICAgICAgICBoID0gMDsgLy8gYWNocm9tYXRpY1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICBjYXNlIHI6XG4gICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtoLCBzLCB2XTtcbiAgICB9LFxuXG4gICAgaHN2VG9SZ2I6IGZ1bmN0aW9uKGgsIHMsIHYpIHtcbiAgICAgIHZhciByLCBnLCBiO1xuXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoaCAqIDYpO1xuICAgICAgdmFyIGYgPSBoICogNiAtIGk7XG4gICAgICB2YXIgcCA9IHYgKiAoMSAtIHMpO1xuICAgICAgdmFyIHEgPSB2ICogKDEgLSBmICogcyk7XG4gICAgICB2YXIgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKTtcblxuICAgICAgc3dpdGNoIChpICUgNikge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgciA9IHYsIGcgPSB0LCBiID0gcDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHIgPSBxLCBnID0gdiwgYiA9IHA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICByID0gcCwgZyA9IHYsIGIgPSB0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgciA9IHAsIGcgPSBxLCBiID0gdjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHIgPSB0LCBnID0gcCwgYiA9IHY7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICByID0gdiwgZyA9IHAsIGIgPSBxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW3IgKiAyNTUsIGcgKiAyNTUsIGIgKiAyNTVdO1xuICAgIH0sXG5cbiAgICBjb2xvcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gbmV3IGNxLkNvbG9yKCk7XG4gICAgICByZXN1bHQucGFyc2UoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgcG9vbEFycmF5OiBbXSxcblxuICAgIHBvb2w6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIXRoaXMucG9vbEFycmF5Lmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5wb29sQXJyYXkucHVzaCh0aGlzLmNyZWF0ZUNhbnZhcygxLCAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucG9vbEFycmF5LnBvcCgpO1xuXG4gICAgfSxcblxuICAgIGNyZWF0ZUNhbnZhczogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuICAgICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICAgIGlmIChhcmd1bWVudHNbMF0gaW5zdGFuY2VvZiBJbWFnZSB8fCBhcmd1bWVudHNbMF0gaW5zdGFuY2VvZiBDYW52YXMpIHtcbiAgICAgICAgdmFyIGltYWdlID0gYXJndW1lbnRzWzBdO1xuICAgICAgICByZXN1bHQud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgcmVzdWx0LmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgcmVzdWx0LmdldENvbnRleHQoXCIyZFwiKS5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LndpZHRoID0gd2lkdGg7XG4gICAgICAgIHJlc3VsdC5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICB9XG5cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgY3JlYXRlQ29jb29uQ2FudmFzOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmVlbmNhbnZhc1wiKTtcblxuICAgICAgaWYgKGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEltYWdlKSB7XG4gICAgICAgIHZhciBpbWFnZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgcmVzdWx0LndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIHJlc3VsdC5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICAgIHJlc3VsdC5nZXRDb250ZXh0KFwiMmRcIikuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC53aWR0aCA9IHdpZHRoO1xuICAgICAgICByZXN1bHQuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBjcmVhdGVJbWFnZURhdGE6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHJldHVybiBjcS5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCkuZ2V0Q29udGV4dChcIjJkXCIpLmNyZWF0ZUltYWdlRGF0YSh3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgY3EuTGF5ZXIgPSBmdW5jdGlvbihjYW52YXMpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuYWxpZ25YID0gMDtcbiAgICB0aGlzLmFsaWduWSA9IDA7XG4gICAgdGhpcy5hbGlnbmVkID0gZmFsc2U7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfTtcblxuICBjcS5MYXllci5wcm90b3R5cGUgPSB7XG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgc21vb3RoaW5nID0gY3Euc21vb3RoaW5nO1xuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc21vb3RoaW5nICE9PSBcInVuZGVmaW5lZFwiKSBzbW9vdGhpbmcgPSB0aGlzLnNtb290aGluZztcblxuICAgICAgdGhpcy5jb250ZXh0Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHNtb290aGluZztcbiAgICAgIHRoaXMuY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHNtb290aGluZztcbiAgICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBzbW9vdGhpbmc7XG5cbiAgICAgIGlmIChDT0NPT05KUykgQ29jb29uLlV0aWxzLnNldEFudGlhbGlhcyhzbW9vdGhpbmcpO1xuICAgIH0sXG5cbiAgICBhcHBlbmRUbzogZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzZWxlY3RvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgYTogZnVuY3Rpb24oYSkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c0FscGhhID0gdGhpcy5nbG9iYWxBbHBoYSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWxBbHBoYShhKTtcbiAgICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWxBbHBoYSgpO1xuICAgIH0sXG5cbiAgICByYTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5hKHRoaXMucHJldmlvdXNBbHBoYSk7XG4gICAgfSxcbiAgICAvKlxuICAgICAgICBkcmF3SW1hZ2U6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmFsaWduWCAmJiAhdGhpcy5hbGlnblkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYWxsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVzdG9yZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICB0aGlzLmFsaWduWCA9IDA7XG4gICAgICAgICAgdGhpcy5hbGlnblkgPSAwO1xuICAgICAgICB9LFxuICAgICAgICAqL1xuXG4gICAgcmVhbGlnbjogZnVuY3Rpb24oKSB7XG5cbiAgICAgIHRoaXMuYWxpZ25YID0gdGhpcy5wcmV2QWxpZ25YO1xuICAgICAgdGhpcy5hbGlnblkgPSB0aGlzLnByZXZBbGlnblk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcblxuICAgIGFsaWduOiBmdW5jdGlvbih4LCB5KSB7XG5cbiAgICAgIGlmICh0eXBlb2YgeSA9PT0gXCJ1bmRlZmluZWRcIikgeSA9IHg7XG5cbiAgICAgIHRoaXMuYWxpZ25YID0geDtcbiAgICAgIHRoaXMuYWxpZ25ZID0geTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuXG4gICAgLyogc2F2ZSB0cmFuc2xhdGUgYWxpZ24gcm90YXRlIHNjYWxlICovXG5cbiAgICBzdGFyczogZnVuY3Rpb24oeCwgeSwgYWxpZ25YLCBhbGlnblksIHJvdGF0aW9uLCBzY2FsZVgsIHNjYWxlWSkge1xuXG4gICAgICBpZiAodHlwZW9mIGFsaWduWCA9PT0gXCJ1bmRlZmluZWRcIikgYWxpZ25YID0gMC41O1xuICAgICAgaWYgKHR5cGVvZiBhbGlnblkgPT09IFwidW5kZWZpbmVkXCIpIGFsaWduWSA9IDAuNTtcbiAgICAgIGlmICh0eXBlb2Ygcm90YXRpb24gPT09IFwidW5kZWZpbmVkXCIpIHJvdGF0aW9uID0gMDtcbiAgICAgIGlmICh0eXBlb2Ygc2NhbGVYID09PSBcInVuZGVmaW5lZFwiKSBzY2FsZVggPSAxLjA7XG4gICAgICBpZiAodHlwZW9mIHNjYWxlWSA9PT0gXCJ1bmRlZmluZWRcIikgc2NhbGVZID0gc2NhbGVYO1xuXG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICAgIHRoaXMudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgdGhpcy5hbGlnbihhbGlnblgsIGFsaWduWSk7XG4gICAgICB0aGlzLnJvdGF0ZShyb3RhdGlvbik7XG4gICAgICB0aGlzLnNjYWxlKHNjYWxlWCwgc2NhbGVZKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHRhcnM6IGZ1bmN0aW9uKHgsIHksIGFsaWduWCwgYWxpZ25ZLCByb3RhdGlvbiwgc2NhbGVYLCBzY2FsZVkpIHtcblxuICAgICAgaWYgKHR5cGVvZiBhbGlnblggPT09IFwidW5kZWZpbmVkXCIpIGFsaWduWCA9IDAuNTtcbiAgICAgIGlmICh0eXBlb2YgYWxpZ25ZID09PSBcInVuZGVmaW5lZFwiKSBhbGlnblkgPSAwLjU7XG4gICAgICBpZiAodHlwZW9mIHJvdGF0aW9uID09PSBcInVuZGVmaW5lZFwiKSByb3RhdGlvbiA9IDA7XG4gICAgICBpZiAodHlwZW9mIHNjYWxlWCA9PT0gXCJ1bmRlZmluZWRcIikgc2NhbGVYID0gMS4wO1xuICAgICAgaWYgKHR5cGVvZiBzY2FsZVkgPT09IFwidW5kZWZpbmVkXCIpIHNjYWxlWSA9IHNjYWxlWDtcblxuICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gICAgICB0aGlzLmFsaWduKGFsaWduWCwgYWxpZ25ZKTtcbiAgICAgIHRoaXMucm90YXRlKHJvdGF0aW9uKTtcbiAgICAgIHRoaXMuc2NhbGUoc2NhbGVYLCBzY2FsZVkpO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cbiAgICBmaWxsUmVjdDogZnVuY3Rpb24oeCwgeSwgdywgaCkge1xuXG4gICAgICBpZiAodGhpcy5hbGlnblggfHwgdGhpcy5hbGlnblkpIHtcbiAgICAgICAgeCAtPSB3ICogdGhpcy5hbGlnblggfCAwO1xuICAgICAgICB5IC09IGggKiB0aGlzLmFsaWduWSB8IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4LCB5LCB3LCBoKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9LFxuXG4gICAgc3Ryb2tlUmVjdDogZnVuY3Rpb24oeCwgeSwgdywgaCkge1xuXG4gICAgICBpZiAodGhpcy5hbGlnblggfHwgdGhpcy5hbGlnblkpIHtcbiAgICAgICAgeCAtPSB3ICogdGhpcy5hbGlnblggfCAwO1xuICAgICAgICB5IC09IGggKiB0aGlzLmFsaWduWSB8IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KHgsIHksIHcsIGgpO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cbiAgICBkcmF3SW1hZ2U6IGZ1bmN0aW9uKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpIHtcblxuICAgICAgaWYgKHRoaXMuYWxpZ25YIHx8IHRoaXMuYWxpZ25ZKSB7XG4gICAgICAgIGlmIChzV2lkdGggPT0gbnVsbCkge1xuICAgICAgICAgIHN4IC09IGltYWdlLndpZHRoICogdGhpcy5hbGlnblggfCAwO1xuICAgICAgICAgIHN5IC09IGltYWdlLmhlaWdodCAqIHRoaXMuYWxpZ25ZIHwgMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkeCAtPSBkV2lkdGggKiB0aGlzLmFsaWduWCB8IDA7XG4gICAgICAgICAgZHkgLT0gZEhlaWdodCAqIHRoaXMuYWxpZ25ZIHwgMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc1dpZHRoID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5KTtcbiAgICAgIH0gZWxzZSBpZiAoZHggPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBjcS5mYXN0QXBwbHkodGhpcy5jb250ZXh0LmRyYXdJbWFnZSwgdGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cbiAgICBzYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucHJldkFsaWduWCA9IHRoaXMuYWxpZ25YO1xuICAgICAgdGhpcy5wcmV2QWxpZ25ZID0gdGhpcy5hbGlnblk7XG5cbiAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZXN0b3JlOiBmdW5jdGlvbigpIHtcblxuICAgICAgdGhpcy5yZWFsaWduKCk7XG4gICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGRyYXdUaWxlOiBmdW5jdGlvbihpbWFnZSwgeCwgeSwgZnJhbWVYLCBmcmFtZVksIGZyYW1lV2lkdGgsIGZyYW1lSGVpZ2h0LCBmcmFtZXMsIGZyYW1lKSB7XG5cbiAgICB9LFxuXG4gICAgZHJhd0F0bGFzRnJhbWU6IGZ1bmN0aW9uKGF0bGFzLCBmcmFtZSwgeCwgeSkge1xuXG4gICAgICB2YXIgZnJhbWUgPSBhdGxhcy5mcmFtZXNbZnJhbWVdO1xuXG4gICAgICB0aGlzLmRyYXdSZWdpb24oXG4gICAgICAgIGF0bGFzLmltYWdlLFxuICAgICAgICBmcmFtZS5yZWdpb24sXG4gICAgICAgIHggLSBmcmFtZS53aWR0aCAqIHRoaXMuYWxpZ25YICsgZnJhbWUub2Zmc2V0WzBdICsgZnJhbWUucmVnaW9uWzJdICogdGhpcy5hbGlnblgsIHkgLSBmcmFtZS5oZWlnaHQgKiB0aGlzLmFsaWduWSArIGZyYW1lLm9mZnNldFsxXSArIGZyYW1lLnJlZ2lvblszXSAqIHRoaXMuYWxpZ25ZXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cblxuICAgIGltYWdlRmlsbDogZnVuY3Rpb24oaW1hZ2UsIHdpZHRoLCBoZWlnaHQpIHtcblxuICAgICAgdmFyIHNjYWxlID0gTWF0aC5tYXgod2lkdGggLyBpbWFnZS53aWR0aCwgaGVpZ2h0IC8gaW1hZ2UuaGVpZ2h0KTtcblxuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICB0aGlzLnNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgICB0aGlzLmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XG4gICAgICB0aGlzLnJlc3RvcmUoKTtcblxuICAgIH0sXG5cbiAgICBkcmF3UmVnaW9uOiBmdW5jdGlvbihpbWFnZSwgcmVnaW9uLCB4LCB5LCBzY2FsZSkge1xuXG4gICAgICBzY2FsZSA9IHNjYWxlIHx8IDE7XG5cbiAgICAgIHZhciBkV2lkdGggPSByZWdpb25bMl0gKiBzY2FsZSB8IDA7XG4gICAgICB2YXIgZEhlaWdodCA9IHJlZ2lvblszXSAqIHNjYWxlIHwgMDtcblxuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgaW1hZ2UsIHJlZ2lvblswXSwgcmVnaW9uWzFdLCByZWdpb25bMl0sIHJlZ2lvblszXSxcbiAgICAgICAgeCAtIGRXaWR0aCAqIHRoaXMuYWxpZ25YIHwgMCwgeSAtIGRIZWlnaHQgKiB0aGlzLmFsaWduWSB8IDAsIGRXaWR0aCwgZEhlaWdodFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGNhY2hlOiBmdW5jdGlvbigpIHtcblxuICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5jYW52YXM7XG5cbiAgICB9LFxuXG4gICAgYmxlbmRPbjogZnVuY3Rpb24od2hhdCwgbW9kZSwgbWl4KSB7XG5cbiAgICAgIGNxLmJsZW5kKHdoYXQsIHRoaXMsIG1vZGUsIG1peCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgICAgXG4gICAgfSxcblxuICAgIHBvc3Rlcml6ZTogZnVuY3Rpb24ocGMsIGluYykge1xuICAgICAgcGMgPSBwYyB8fCAzMjtcbiAgICAgIGluYyA9IGluYyB8fCA0O1xuICAgICAgdmFyIGltZ2RhdGEgPSB0aGlzLmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICB2YXIgZGF0YSA9IGltZ2RhdGEuZGF0YTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSBpbmMpIHtcbiAgICAgICAgZGF0YVtpXSAtPSBkYXRhW2ldICUgcGM7IC8vIHNldCB2YWx1ZSB0byBuZWFyZXN0IG9mIDggcG9zc2liaWxpdGllc1xuICAgICAgICBkYXRhW2kgKyAxXSAtPSBkYXRhW2kgKyAxXSAlIHBjOyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcbiAgICAgICAgZGF0YVtpICsgMl0gLT0gZGF0YVtpICsgMl0gJSBwYzsgLy8gc2V0IHZhbHVlIHRvIG5lYXJlc3Qgb2YgOCBwb3NzaWJpbGl0aWVzXG4gICAgICB9XG5cbiAgICAgIHRoaXMucHV0SW1hZ2VEYXRhKGltZ2RhdGEsIDAsIDApOyAvLyBwdXQgaW1hZ2UgZGF0YSB0byBjYW52YXNcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuXG4gICAgYnc6IGZ1bmN0aW9uKHBjKSB7XG4gICAgICBwYyA9IDEyODtcbiAgICAgIHZhciBpbWdkYXRhID0gdGhpcy5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgdmFyIGRhdGEgPSBpbWdkYXRhLmRhdGE7XG4gICAgICAvLyA4LWJpdDogcnJyIGdnZyBiYlxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIHZhciB2ID0gKChkYXRhW2ldICsgZGF0YVtpICsgMV0gKyBkYXRhW2kgKyAyXSkgLyAzKTtcblxuICAgICAgICB2ID0gKHYgLyAxMjggfCAwKSAqIDEyODtcbiAgICAgICAgLy9kYXRhW2ldID0gdjsgLy8gc2V0IHZhbHVlIHRvIG5lYXJlc3Qgb2YgOCBwb3NzaWJpbGl0aWVzXG4gICAgICAgIC8vZGF0YVtpICsgMV0gPSB2OyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcbiAgICAgICAgZGF0YVtpICsgMl0gPSAodiAvIDI1NSkgKiBkYXRhW2ldOyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcblxuICAgICAgfVxuXG4gICAgICB0aGlzLnB1dEltYWdlRGF0YShpbWdkYXRhLCAwLCAwKTsgLy8gcHV0IGltYWdlIGRhdGEgdG8gY2FudmFzXG4gICAgfSxcblxuICAgIGJsZW5kOiBmdW5jdGlvbih3aGF0LCBtb2RlLCBtaXgpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2hhdCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgY29sb3IgPSB3aGF0O1xuICAgICAgICB3aGF0ID0gY3EodGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIHdoYXQuZmlsbFN0eWxlKGNvbG9yKS5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc3VsdCA9IGNxLmJsZW5kKHRoaXMsIHdoYXQsIG1vZGUsIG1peCk7XG5cbiAgICAgIHRoaXMuY2FudmFzID0gcmVzdWx0LmNhbnZhcztcbiAgICAgIHRoaXMuY29udGV4dCA9IHJlc3VsdC5jb250ZXh0O1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgdGV4dFdpdGhCYWNrZ3JvdW5kOiBmdW5jdGlvbih0ZXh0LCB4LCB5LCBiYWNrZ3JvdW5kLCBwYWRkaW5nKSB7XG4gICAgICB2YXIgdyA9IHRoaXMubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XG4gICAgICB2YXIgaCA9IHRoaXMuZm9udEhlaWdodCgpICogMC44O1xuICAgICAgdmFyIGYgPSB0aGlzLmZpbGxTdHlsZSgpO1xuICAgICAgdmFyIHBhZGRpbmcgPSBwYWRkaW5nIHx8IDI7XG5cbiAgICAgIHRoaXMuZmlsbFN0eWxlKGJhY2tncm91bmQpLmZpbGxSZWN0KHggLSB3IC8gMiAtIHBhZGRpbmcgKiAyLCB5IC0gcGFkZGluZywgdyArIHBhZGRpbmcgKiA0LCBoICsgcGFkZGluZyAqIDIpXG4gICAgICB0aGlzLmZpbGxTdHlsZShmKS50ZXh0QWxpZ24oXCJjZW50ZXJcIikudGV4dEJhc2VsaW5lKFwidG9wXCIpLmZpbGxUZXh0KHRleHQsIHgsIHkpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZmlsbENpcmNsZTogZnVuY3Rpb24oeCwgeSwgcikge1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCByLCAwLCBNYXRoLlBJICogMik7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHN0cm9rZUNpcmNsZTogZnVuY3Rpb24oeCwgeSwgcikge1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCByLCAwLCBNYXRoLlBJICogMik7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2lyY2xlOiBmdW5jdGlvbih4LCB5LCByKSB7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHgsIHksIHIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBjcm9wOiBmdW5jdGlvbih4LCB5LCB3LCBoKSB7XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cbiAgICAgICAgdmFyIHkgPSBhcmd1bWVudHNbMF1bMV07XG4gICAgICAgIHZhciB3ID0gYXJndW1lbnRzWzBdWzJdO1xuICAgICAgICB2YXIgaCA9IGFyZ3VtZW50c1swXVszXTtcbiAgICAgICAgdmFyIHggPSBhcmd1bWVudHNbMF1bMF07XG4gICAgICB9XG5cbiAgICAgIHZhciBjYW52YXMgPSBjcS5jcmVhdGVDYW52YXModywgaCk7XG4gICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuY2FudmFzLCB4LCB5LCB3LCBoLCAwLCAwLCB3LCBoKTtcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdztcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGg7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGNhbnZhcywgMCwgMCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKHByb3BlcnRpZXMpIHtcbiAgICAgIGNxLmV4dGVuZCh0aGlzLmNvbnRleHQsIHByb3BlcnRpZXMpO1xuICAgIH0sXG5cbiAgICByZXNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHZhciB3ID0gd2lkdGgsXG4gICAgICAgIGggPSBoZWlnaHQ7XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHcgPSBhcmd1bWVudHNbMF0gKiB0aGlzLmNhbnZhcy53aWR0aCB8IDA7XG4gICAgICAgIGggPSBhcmd1bWVudHNbMF0gKiB0aGlzLmNhbnZhcy5oZWlnaHQgfCAwO1xuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAoaGVpZ2h0ID09PSBmYWxzZSkge1xuICAgICAgICAgIGlmICh0aGlzLmNhbnZhcy53aWR0aCA+IHdpZHRoKSB7XG4gICAgICAgICAgICBoID0gdGhpcy5jYW52YXMuaGVpZ2h0ICogKHdpZHRoIC8gdGhpcy5jYW52YXMud2lkdGgpIHwgMDtcbiAgICAgICAgICAgIHcgPSB3aWR0aDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdyA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgICAgICAgICAgaCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY2FudmFzLndpZHRoID4gd2lkdGgpIHtcbiAgICAgICAgICAgIHcgPSB0aGlzLmNhbnZhcy53aWR0aCAqIChoZWlnaHQgLyB0aGlzLmNhbnZhcy5oZWlnaHQpIHwgMDtcbiAgICAgICAgICAgIGggPSBoZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHcgPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIGggPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBjcXJlc2l6ZWQgPSBjcSh3LCBoKS5kcmF3SW1hZ2UodGhpcy5jYW52YXMsIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQsIDAsIDAsIHcsIGgpO1xuICAgICAgdGhpcy5jYW52YXMgPSBjcXJlc2l6ZWQuY2FudmFzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY3FyZXNpemVkLmNvbnRleHQ7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBpbWFnZUxpbmU6IGZ1bmN0aW9uKGltYWdlLCByZWdpb24sIHgsIHksIGV4LCBleSwgc2NhbGUpIHtcbiAgICAgIGlmICghcmVnaW9uKSByZWdpb24gPSBbMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodF07XG5cbiAgICAgIHZhciBkaXN0YW5jZSA9IGNxLmRpc3RhbmNlKHgsIHksIGV4LCBleSk7XG4gICAgICB2YXIgY291bnQgPSBkaXN0YW5jZSAvIHJlZ2lvblszXSArIDAuNSB8IDA7XG4gICAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKGV5IC0geSwgZXggLSB4KSArIE1hdGguUEkgLyAyO1xuXG4gICAgICB0aGlzLnNhdmUoKTtcblxuICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XG4gICAgICB0aGlzLnJvdGF0ZShhbmdsZSk7XG5cbiAgICAgIGlmIChzY2FsZSkgdGhpcy5zY2FsZShzY2FsZSwgMS4wKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gY291bnQ7IGkrKykge1xuICAgICAgICB0aGlzLmRyYXdSZWdpb24oaW1hZ2UsIHJlZ2lvbiwgLXJlZ2lvblsyXSAvIDIgfCAwLCAtcmVnaW9uWzNdICogKGkgKyAxKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVzdG9yZSgpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgdHJpbTogZnVuY3Rpb24oY29sb3IsIGNoYW5nZXMpIHtcbiAgICAgIHZhciB0cmFuc3BhcmVudDtcblxuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIGNvbG9yID0gY3EuY29sb3IoY29sb3IpLnRvQXJyYXkoKTtcbiAgICAgICAgdHJhbnNwYXJlbnQgPSAhY29sb3JbM107XG4gICAgICB9IGVsc2UgdHJhbnNwYXJlbnQgPSB0cnVlO1xuXG4gICAgICB2YXIgc291cmNlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgc291cmNlUGl4ZWxzID0gc291cmNlRGF0YS5kYXRhO1xuXG4gICAgICB2YXIgYm91bmQgPSBbdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCwgMCwgMF07XG5cbiAgICAgIHZhciB3aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgICAgdmFyIGhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNvdXJjZVBpeGVscy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICBpZiAodHJhbnNwYXJlbnQpIHtcbiAgICAgICAgICBpZiAoIXNvdXJjZVBpeGVsc1tpICsgM10pIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZVBpeGVsc1tpICsgMF0gPT09IGNvbG9yWzBdICYmIHNvdXJjZVBpeGVsc1tpICsgMV0gPT09IGNvbG9yWzFdICYmIHNvdXJjZVBpeGVsc1tpICsgMl0gPT09IGNvbG9yWzJdKSBjb250aW51ZTtcblxuICAgICAgICB2YXIgeCA9IChpIC8gNCB8IDApICUgdGhpcy5jYW52YXMud2lkdGggfCAwO1xuICAgICAgICB2YXIgeSA9IChpIC8gNCB8IDApIC8gdGhpcy5jYW52YXMud2lkdGggfCAwO1xuXG4gICAgICAgIGlmICh4IDwgYm91bmRbMF0pIGJvdW5kWzBdID0geDtcbiAgICAgICAgaWYgKHggPiBib3VuZFsyXSkgYm91bmRbMl0gPSB4O1xuXG4gICAgICAgIGlmICh5IDwgYm91bmRbMV0pIGJvdW5kWzFdID0geTtcbiAgICAgICAgaWYgKHkgPiBib3VuZFszXSkgYm91bmRbM10gPSB5O1xuICAgICAgfVxuXG5cbiAgICAgIGlmIChib3VuZFsyXSA9PT0gMCAmJiBib3VuZFszXSA9PT0gMCkge30gZWxzZSB7XG4gICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgY2hhbmdlcy5sZWZ0ID0gYm91bmRbMF07XG4gICAgICAgICAgY2hhbmdlcy50b3AgPSBib3VuZFsxXTtcblxuICAgICAgICAgIGNoYW5nZXMuYm90dG9tID0gaGVpZ2h0IC0gYm91bmRbM107XG4gICAgICAgICAgY2hhbmdlcy5yaWdodCA9IHdpZHRoIC0gYm91bmRbMl0gLSBib3VuZFswXTtcblxuICAgICAgICAgIGNoYW5nZXMud2lkdGggPSBib3VuZFsyXSAtIGJvdW5kWzBdO1xuICAgICAgICAgIGNoYW5nZXMuaGVpZ2h0ID0gYm91bmRbM10gLSBib3VuZFsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3JvcChib3VuZFswXSwgYm91bmRbMV0sIGJvdW5kWzJdIC0gYm91bmRbMF0gKyAxLCBib3VuZFszXSAtIGJvdW5kWzFdICsgMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBtYXRjaFBhbGV0dGU6IGZ1bmN0aW9uKHBhbGV0dGUpIHtcbiAgICAgIHZhciBpbWdEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuICAgICAgdmFyIHJnYlBhbGV0dGUgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWxldHRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJnYlBhbGV0dGUucHVzaChjcS5jb2xvcihwYWxldHRlW2ldKSk7XG4gICAgICB9XG5cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdEYXRhLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgdmFyIGRpZkxpc3QgPSBbXTtcbiAgICAgICAgaWYgKCFpbWdEYXRhLmRhdGFbaSArIDNdKSBjb250aW51ZTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJnYlBhbGV0dGUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgcmdiVmFsID0gcmdiUGFsZXR0ZVtqXTtcbiAgICAgICAgICB2YXIgckRpZiA9IE1hdGguYWJzKGltZ0RhdGEuZGF0YVtpXSAtIHJnYlZhbFswXSksXG4gICAgICAgICAgICBnRGlmID0gTWF0aC5hYnMoaW1nRGF0YS5kYXRhW2kgKyAxXSAtIHJnYlZhbFsxXSksXG4gICAgICAgICAgICBiRGlmID0gTWF0aC5hYnMoaW1nRGF0YS5kYXRhW2kgKyAyXSAtIHJnYlZhbFsyXSk7XG4gICAgICAgICAgZGlmTGlzdC5wdXNoKHJEaWYgKyBnRGlmICsgYkRpZik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2xvc2VzdE1hdGNoID0gMDtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBhbGV0dGUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoZGlmTGlzdFtqXSA8IGRpZkxpc3RbY2xvc2VzdE1hdGNoXSkge1xuICAgICAgICAgICAgY2xvc2VzdE1hdGNoID0gajtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFsZXR0ZVJnYiA9IGNxLmhleFRvUmdiKHBhbGV0dGVbY2xvc2VzdE1hdGNoXSk7XG4gICAgICAgIGltZ0RhdGEuZGF0YVtpXSA9IHBhbGV0dGVSZ2JbMF07XG4gICAgICAgIGltZ0RhdGEuZGF0YVtpICsgMV0gPSBwYWxldHRlUmdiWzFdO1xuICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDJdID0gcGFsZXR0ZVJnYlsyXTtcblxuICAgICAgICAvKiBkaXRoZXJpbmcgKi9cbiAgICAgICAgLy9pbWdEYXRhLmRhdGFbaSArIDNdID0gKDI1NSAqIE1hdGgucmFuZG9tKCkgPCBpbWdEYXRhLmRhdGFbaSArIDNdKSA/IDI1NSA6IDA7XG5cbiAgICAgICAgLy9pbWdEYXRhLmRhdGFbaSArIDNdID0gaW1nRGF0YS5kYXRhW2kgKyAzXSA+IDEyOCA/IDI1NSA6IDA7XG4gICAgICAgIC8qXG4gICAgICAgIGlmIChpICUgMyA9PT0gMCkge1xuICAgICAgICAgIGltZ0RhdGEuZGF0YVtpXSAtPSBjcS5saW1pdFZhbHVlKGltZ0RhdGEuZGF0YVtpXSAtIDUwLCAwLCAyNTUpO1xuICAgICAgICAgIGltZ0RhdGEuZGF0YVtpICsgMV0gLT0gY3EubGltaXRWYWx1ZShpbWdEYXRhLmRhdGFbaSArIDFdIC0gNTAsIDAsIDI1NSk7XG4gICAgICAgICAgaW1nRGF0YS5kYXRhW2kgKyAyXSAtPSBjcS5saW1pdFZhbHVlKGltZ0RhdGEuZGF0YVtpICsgMl0gLSA1MCwgMCwgMjU1KTtcbiAgICAgICAgfVxuICAgICAgICAqL1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEoaW1nRGF0YSwgMCwgMCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBnZXRQYWxldHRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYWxldHRlID0gW107XG4gICAgICB2YXIgc291cmNlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgc291cmNlUGl4ZWxzID0gc291cmNlRGF0YS5kYXRhO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlUGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIGlmIChzb3VyY2VQaXhlbHNbaSArIDNdKSB7XG4gICAgICAgICAgdmFyIGhleCA9IGNxLnJnYlRvSGV4KHNvdXJjZVBpeGVsc1tpICsgMF0sIHNvdXJjZVBpeGVsc1tpICsgMV0sIHNvdXJjZVBpeGVsc1tpICsgMl0pO1xuICAgICAgICAgIGlmIChwYWxldHRlLmluZGV4T2YoaGV4KSA9PT0gLTEpIHBhbGV0dGUucHVzaChoZXgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYWxldHRlO1xuICAgIH0sXG5cbiAgICBtYXBQYWxldHRlOiBmdW5jdGlvbigpIHtcblxuICAgIH0sXG5cbiAgICBiZWdpblBhdGg6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcblxuICAgIG1vdmVUbzogZnVuY3Rpb24oeCwgeSkge1xuXG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgsIHkpO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cbiAgICBmaWxsVGV4dDogZnVuY3Rpb24odGV4dCwgeCwgeSkge1xuXG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgeSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcblxuICAgIHN0cm9rZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9LFxuXG4gICAgcG9seWdvbjogZnVuY3Rpb24oYXJyYXkpIHtcblxuICAgICAgdGhpcy5iZWdpblBhdGgoKTtcblxuICAgICAgdGhpcy5tb3ZlVG8oYXJyYXlbMF1bMF0sIGFycmF5WzBdWzFdKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmxpbmVUbyhhcnJheVtpXVswXSwgYXJyYXlbaV1bMV0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNsb3NlUGF0aCgpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZmlsbFBvbHlnb246IGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICAgIHRoaXMuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLnBvbHlnb24ocG9seWdvbik7XG4gICAgICB0aGlzLmZpbGwoKTtcbiAgICB9LFxuXG4gICAgc3Ryb2tlUG9seWdvbjogZnVuY3Rpb24ocG9seWdvbikge1xuICAgICAgdGhpcy5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMucG9seWdvbihwb2x5Z29uKTtcbiAgICAgIHRoaXMuc3Ryb2tlKCk7XG4gICAgfSxcblxuICAgIGNvbG9yVG9NYXNrOiBmdW5jdGlvbihjb2xvciwgaW52ZXJ0ZWQpIHtcbiAgICAgIGNvbG9yID0gY3EuY29sb3IoY29sb3IpLnRvQXJyYXkoKTtcbiAgICAgIHZhciBzb3VyY2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgIHZhciBzb3VyY2VQaXhlbHMgPSBzb3VyY2VEYXRhLmRhdGE7XG5cbiAgICAgIHZhciBtYXNrID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzb3VyY2VQaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgaWYgKHNvdXJjZVBpeGVsc1tpICsgM10gPiAwKSBtYXNrLnB1c2goaW52ZXJ0ZWQgPyBmYWxzZSA6IHRydWUpO1xuICAgICAgICBlbHNlIG1hc2sucHVzaChpbnZlcnRlZCA/IHRydWUgOiBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXNrO1xuICAgIH0sXG5cbiAgICBncmF5c2NhbGVUb01hc2s6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgc291cmNlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgc291cmNlUGl4ZWxzID0gc291cmNlRGF0YS5kYXRhO1xuXG4gICAgICB2YXIgbWFzayA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlUGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIG1hc2sucHVzaCgoKHNvdXJjZVBpeGVsc1tpICsgMF0gKyBzb3VyY2VQaXhlbHNbaSArIDFdICsgc291cmNlUGl4ZWxzW2kgKyAyXSkgLyAzKSAvIDI1NSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXNrO1xuICAgIH0sXG5cbiAgICBhcHBseU1hc2s6IGZ1bmN0aW9uKG1hc2spIHtcbiAgICAgIHZhciBzb3VyY2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgIHZhciBzb3VyY2VQaXhlbHMgPSBzb3VyY2VEYXRhLmRhdGE7XG5cbiAgICAgIHZhciBtb2RlID0gdHlwZW9mIG1hc2tbMF0gPT09IFwiYm9vbGVhblwiID8gXCJib29sXCIgOiBcImJ5dGVcIjtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNvdXJjZVBpeGVscy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBtYXNrW2kgLyA0XTtcbiAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAzXSA9IHZhbHVlICogMjU1IHwgMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShzb3VyY2VEYXRhLCAwLCAwKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBmaWxsTWFzazogZnVuY3Rpb24obWFzaykge1xuXG4gICAgICB2YXIgc291cmNlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgc291cmNlUGl4ZWxzID0gc291cmNlRGF0YS5kYXRhO1xuXG4gICAgICB2YXIgbWFza1R5cGUgPSB0eXBlb2YgbWFza1swXSA9PT0gXCJib29sZWFuXCIgPyBcImJvb2xcIiA6IFwiYnl0ZVwiO1xuICAgICAgdmFyIGNvbG9yTW9kZSA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDIgPyBcIm5vcm1hbFwiIDogXCJncmFkaWVudFwiO1xuXG4gICAgICB2YXIgY29sb3IgPSBjcS5jb2xvcihhcmd1bWVudHNbMV0pO1xuICAgICAgaWYgKGNvbG9yTW9kZSA9PT0gXCJncmFkaWVudFwiKSBjb2xvckIgPSBjcS5jb2xvcihhcmd1bWVudHNbMl0pO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlUGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG1hc2tbaSAvIDRdO1xuXG4gICAgICAgIGlmIChtYXNrVHlwZSA9PT0gXCJieXRlXCIpIHZhbHVlIC89IDI1NTtcblxuICAgICAgICBpZiAoY29sb3JNb2RlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBzb3VyY2VQaXhlbHNbaSArIDBdID0gY29sb3JbMF0gfCAwO1xuICAgICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAxXSA9IGNvbG9yWzFdIHwgMDtcbiAgICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgMl0gPSBjb2xvclsyXSB8IDA7XG4gICAgICAgICAgICBzb3VyY2VQaXhlbHNbaSArIDNdID0gdmFsdWUgKiAyNTUgfCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzb3VyY2VQaXhlbHNbaSArIDBdID0gY29sb3JbMF0gKyAoY29sb3JCWzBdIC0gY29sb3JbMF0pICogdmFsdWUgfCAwO1xuICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgMV0gPSBjb2xvclsxXSArIChjb2xvckJbMV0gLSBjb2xvclsxXSkgKiB2YWx1ZSB8IDA7XG4gICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAyXSA9IGNvbG9yWzJdICsgKGNvbG9yQlsyXSAtIGNvbG9yWzJdKSAqIHZhbHVlIHwgMDtcbiAgICAgICAgICBzb3VyY2VQaXhlbHNbaSArIDNdID0gMjU1O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEoc291cmNlRGF0YSwgMCwgMCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2xlYXI6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgY2xvbmU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyB2YXIgcmVzdWx0ID0gY3EuY3JlYXRlQ2FudmFzKHRoaXMuY2FudmFzKTtcblxuICAgICAgdmFyIHJlc3VsdCA9IGNxLnBvb2woKTtcbiAgICAgIHJlc3VsdC53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICByZXN1bHQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICByZXN1bHQuZ2V0Q29udGV4dChcIjJkXCIpLmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgMCwgMCk7XG5cbiAgICAgIHJldHVybiBjcShyZXN1bHQpO1xuICAgIH0sXG5cbiAgICBncmFkaWVudFRleHQ6IGZ1bmN0aW9uKHRleHQsIHgsIHksIG1heFdpZHRoLCBncmFkaWVudCkge1xuXG4gICAgICB2YXIgd29yZHMgPSB0ZXh0LnNwbGl0KFwiIFwiKTtcblxuICAgICAgdmFyIGggPSB0aGlzLmZvbnRIZWlnaHQoKSAqIDI7XG5cbiAgICAgIHZhciBveCA9IDA7XG4gICAgICB2YXIgb3kgPSAwO1xuXG4gICAgICBpZiAobWF4V2lkdGgpIHtcbiAgICAgICAgdmFyIGxpbmUgPSAwO1xuICAgICAgICB2YXIgbGluZXMgPSBbXCJcIl07XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciB3b3JkID0gd29yZHNbaV0gKyBcIiBcIjtcbiAgICAgICAgICB2YXIgd29yZFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHdvcmQpLndpZHRoO1xuXG4gICAgICAgICAgaWYgKG94ICsgd29yZFdpZHRoID4gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGxpbmVzWysrbGluZV0gPSBcIlwiO1xuICAgICAgICAgICAgb3ggPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpbmVzW2xpbmVdICs9IHdvcmQ7XG5cbiAgICAgICAgICBveCArPSB3b3JkV2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB2YXIgbGluZXMgPSBbdGV4dF07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG95ID0geSArIGkgKiBoICogMC42IHwgMDtcbiAgICAgICAgdmFyIGxpbmdyYWQgPSB0aGlzLmNvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgb3ksIDAsIG95ICsgaCAqIDAuNiB8IDApO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZ3JhZGllbnQubGVuZ3RoOyBqICs9IDIpIHtcbiAgICAgICAgICBsaW5ncmFkLmFkZENvbG9yU3RvcChncmFkaWVudFtqXSwgZ3JhZGllbnRbaiArIDFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ZXh0ID0gbGluZXNbaV07XG5cbiAgICAgICAgdGhpcy5maWxsU3R5bGUobGluZ3JhZCkuZmlsbFRleHQodGV4dCwgeCwgb3kpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ29sb3I6IGZ1bmN0aW9uKGNvbG9yKSB7XG5cbiAgICAgIGNvbG9yID0gY3EuY29sb3IoY29sb3IpO1xuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgcGl4ZWxzID0gZGF0YS5kYXRhO1xuXG4gICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHRoaXMuY2FudmFzLndpZHRoOyB4KyspIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCB0aGlzLmNhbnZhcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgIHZhciBpID0gKHkgKiB0aGlzLmNhbnZhcy53aWR0aCArIHgpICogNDtcblxuICAgICAgICAgIGlmIChwaXhlbHNbaSArIDBdID09PSBjb2xvclswXSAmJiBwaXhlbHNbaSArIDFdID09PSBjb2xvclsxXSAmJiBwaXhlbHNbaSArIDJdID09PSBjb2xvclsyXSkge1xuICAgICAgICAgICAgcGl4ZWxzW2kgKyAzXSA9IDA7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGRhdGEsIDAsIDApO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgb3V0bGluZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgcGl4ZWxzID0gZGF0YS5kYXRhO1xuXG4gICAgICB2YXIgbmV3RGF0YSA9IHRoaXMuY3JlYXRlSW1hZ2VEYXRhKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgdmFyIG5ld1BpeGVscyA9IG5ld0RhdGEuZGF0YTtcblxuICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuY2FudmFzO1xuXG4gICAgICBmdW5jdGlvbiBjaGVjayh4LCB5KSB7XG5cbiAgICAgICAgaWYgKHggPCAwKSByZXR1cm4gMDtcbiAgICAgICAgaWYgKHggPj0gY2FudmFzLndpZHRoKSByZXR1cm4gMDtcbiAgICAgICAgaWYgKHkgPCAwKSByZXR1cm4gMDtcbiAgICAgICAgaWYgKHkgPj0gY2FudmFzLmhlaWdodCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGkgPSAoeCArIHkgKiBjYW52YXMud2lkdGgpICogNDtcblxuICAgICAgICByZXR1cm4gcGl4ZWxzW2kgKyAzXSA+IDA7XG5cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLmNhbnZhcy53aWR0aDsgeCsrKSB7XG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgdGhpcy5jYW52YXMuaGVpZ2h0OyB5KyspIHtcblxuICAgICAgICAgIHZhciBmdWxsID0gMDtcbiAgICAgICAgICB2YXIgaSA9ICh5ICogY2FudmFzLndpZHRoICsgeCkgKiA0O1xuXG4gICAgICAgICAgaWYgKCFwaXhlbHNbaSArIDNdKSBjb250aW51ZTtcblxuICAgICAgICAgIGZ1bGwgKz0gY2hlY2soeCAtIDEsIHkpO1xuICAgICAgICAgIGZ1bGwgKz0gY2hlY2soeCArIDEsIHkpO1xuICAgICAgICAgIGZ1bGwgKz0gY2hlY2soeCwgeSAtIDEpO1xuICAgICAgICAgIGZ1bGwgKz0gY2hlY2soeCwgeSArIDEpO1xuXG4gICAgICAgICAgaWYgKGZ1bGwgIT09IDQpIHtcblxuICAgICAgICAgICAgbmV3UGl4ZWxzW2ldID0gMjU1O1xuICAgICAgICAgICAgbmV3UGl4ZWxzW2kgKyAxXSA9IDI1NTtcbiAgICAgICAgICAgIG5ld1BpeGVsc1tpICsgMl0gPSAyNTU7XG4gICAgICAgICAgICBuZXdQaXhlbHNbaSArIDNdID0gMjU1O1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEobmV3RGF0YSwgMCwgMCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBzZXRIc2w6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgcGl4ZWxzID0gZGF0YS5kYXRhO1xuICAgICAgdmFyIHIsIGcsIGIsIGEsIGgsIHMsIGwsIGhzbCA9IFtdLFxuICAgICAgICBuZXdQaXhlbCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIGhzbCA9IGNxLnJnYlRvSHNsKHBpeGVsc1tpICsgMF0sIHBpeGVsc1tpICsgMV0sIHBpeGVsc1tpICsgMl0pO1xuXG4gICAgICAgIGggPSBhcmdzWzBdID09PSBmYWxzZSA/IGhzbFswXSA6IGNxLmxpbWl0VmFsdWUoYXJnc1swXSwgMCwgMSk7XG4gICAgICAgIHMgPSBhcmdzWzFdID09PSBmYWxzZSA/IGhzbFsxXSA6IGNxLmxpbWl0VmFsdWUoYXJnc1sxXSwgMCwgMSk7XG4gICAgICAgIGwgPSBhcmdzWzJdID09PSBmYWxzZSA/IGhzbFsyXSA6IGNxLmxpbWl0VmFsdWUoYXJnc1syXSwgMCwgMSk7XG5cbiAgICAgICAgbmV3UGl4ZWwgPSBjcS5oc2xUb1JnYihoLCBzLCBsKTtcblxuICAgICAgICBwaXhlbHNbaSArIDBdID0gbmV3UGl4ZWxbMF07XG4gICAgICAgIHBpeGVsc1tpICsgMV0gPSBuZXdQaXhlbFsxXTtcbiAgICAgICAgcGl4ZWxzW2kgKyAyXSA9IG5ld1BpeGVsWzJdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGRhdGEsIDAsIDApO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgc2hpZnRIc2w6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50c1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgcGl4ZWxzID0gZGF0YS5kYXRhO1xuICAgICAgdmFyIHIsIGcsIGIsIGEsIGgsIHMsIGwsIGhzbCA9IFtdLFxuICAgICAgICBuZXdQaXhlbCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIGhzbCA9IGNxLnJnYlRvSHNsKHBpeGVsc1tpICsgMF0sIHBpeGVsc1tpICsgMV0sIHBpeGVsc1tpICsgMl0pO1xuXG4gICAgICAgIGlmIChwaXhlbHNbaSArIDBdICE9PSBwaXhlbHNbaSArIDFdIHx8IHBpeGVsc1tpICsgMV0gIT09IHBpeGVsc1tpICsgMl0pIHtcbiAgICAgICAgICBoID0gYXJnc1swXSA9PT0gZmFsc2UgPyBoc2xbMF0gOiBjcS53cmFwVmFsdWUoaHNsWzBdICsgYXJnc1swXSwgMCwgMSk7XG4gICAgICAgICAgcyA9IGFyZ3NbMV0gPT09IGZhbHNlID8gaHNsWzFdIDogY3EubGltaXRWYWx1ZShoc2xbMV0gKyBhcmdzWzFdLCAwLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoID0gaHNsWzBdO1xuICAgICAgICAgIHMgPSBoc2xbMV07XG4gICAgICAgIH1cblxuICAgICAgICBsID0gYXJnc1syXSA9PT0gZmFsc2UgPyBoc2xbMl0gOiBjcS5saW1pdFZhbHVlKGhzbFsyXSArIGFyZ3NbMl0sIDAsIDEpO1xuXG4gICAgICAgIG5ld1BpeGVsID0gY3EuaHNsVG9SZ2IoaCwgcywgbCk7XG5cbiAgICAgICAgcGl4ZWxzW2kgKyAwXSA9IG5ld1BpeGVsWzBdO1xuICAgICAgICBwaXhlbHNbaSArIDFdID0gbmV3UGl4ZWxbMV07XG4gICAgICAgIHBpeGVsc1tpICsgMl0gPSBuZXdQaXhlbFsyXTtcbiAgICAgIH1cblxuXG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGRhdGEsIDAsIDApO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgYXBwbHlDb2xvcjogZnVuY3Rpb24oY29sb3IpIHtcblxuICAgICAgaWYgKENPQ09PTkpTKSByZXR1cm4gdGhpcztcbiAgICAgIHRoaXMuc2F2ZSgpO1xuXG4gICAgICB0aGlzLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbihcInNvdXJjZS1pblwiKTtcbiAgICAgIHRoaXMuY2xlYXIoY29sb3IpO1xuXG4gICAgICB0aGlzLnJlc3RvcmUoKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIG5lZ2F0aXZlOiBmdW5jdGlvbihzcmMsIGRzdCkge1xuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgICB2YXIgcGl4ZWxzID0gZGF0YS5kYXRhO1xuICAgICAgdmFyIHIsIGcsIGIsIGEsIGgsIHMsIGwsIGhzbCA9IFtdLFxuICAgICAgICBuZXdQaXhlbCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIHBpeGVsc1tpICsgMF0gPSAyNTUgLSBwaXhlbHNbaSArIDBdO1xuICAgICAgICBwaXhlbHNbaSArIDFdID0gMjU1IC0gcGl4ZWxzW2kgKyAxXTtcbiAgICAgICAgcGl4ZWxzW2kgKyAyXSA9IDI1NSAtIHBpeGVsc1tpICsgMl07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEoZGF0YSwgMCwgMCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByb3VuZFJlY3Q6IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cykge1xuXG4gICAgICB0aGlzLmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5tb3ZlVG8oeCArIHJhZGl1cywgeSk7XG4gICAgICB0aGlzLmxpbmVUbyh4ICsgd2lkdGggLSByYWRpdXMsIHkpO1xuICAgICAgdGhpcy5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSwgeCArIHdpZHRoLCB5ICsgcmFkaXVzKTtcbiAgICAgIHRoaXMubGluZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCAtIHJhZGl1cyk7XG4gICAgICB0aGlzLnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0LCB4ICsgd2lkdGggLSByYWRpdXMsIHkgKyBoZWlnaHQpO1xuICAgICAgdGhpcy5saW5lVG8oeCArIHJhZGl1cywgeSArIGhlaWdodCk7XG4gICAgICB0aGlzLnF1YWRyYXRpY0N1cnZlVG8oeCwgeSArIGhlaWdodCwgeCwgeSArIGhlaWdodCAtIHJhZGl1cyk7XG4gICAgICB0aGlzLmxpbmVUbyh4LCB5ICsgcmFkaXVzKTtcbiAgICAgIHRoaXMucXVhZHJhdGljQ3VydmVUbyh4LCB5LCB4ICsgcmFkaXVzLCB5KTtcbiAgICAgIHRoaXMuY2xvc2VQYXRoKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBtYXJrdXBUZXh0OiBmdW5jdGlvbih0ZXh0KSB7XG5cblxuICAgIH0sXG5cbiAgICB3cmFwcGVkVGV4dDogZnVuY3Rpb24odGV4dCwgeCwgeSwgbWF4V2lkdGgsIGxpbmVIZWlnaHQpIHtcblxuICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XG5cbiAgICAgIHZhciBsaW5lSGVpZ2h0ID0gbGluZUhlaWdodCB8fCB0aGlzLmZvbnRIZWlnaHQoKTtcblxuICAgICAgdmFyIG94ID0gMDtcbiAgICAgIHZhciBveSA9IDA7XG5cbiAgICAgIGlmIChtYXhXaWR0aCkge1xuICAgICAgICB2YXIgbGluZSA9IDA7XG4gICAgICAgIHZhciBsaW5lcyA9IFtcIlwiXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXSArIFwiIFwiO1xuICAgICAgICAgIHZhciB3b3JkV2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQod29yZCkud2lkdGg7XG5cbiAgICAgICAgICBpZiAob3ggKyB3b3JkV2lkdGggPiBtYXhXaWR0aCB8fCB3b3Jkc1tpXSA9PT0gXCJcXG5cIikge1xuICAgICAgICAgICAgbGluZXNbKytsaW5lXSA9IFwiXCI7XG4gICAgICAgICAgICBveCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3b3Jkc1tpXSAhPT0gXCJcXG5cIikge1xuICAgICAgICAgICAgbGluZXNbbGluZV0gKz0gd29yZDtcblxuICAgICAgICAgICAgb3ggKz0gd29yZFdpZHRoO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBsaW5lcyA9IFt0ZXh0XTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgb3kgPSB5ICsgaSAqIGxpbmVIZWlnaHQgfCAwO1xuXG4gICAgICAgIHZhciB0ZXh0ID0gbGluZXNbaV07XG5cbiAgICAgICAgdGhpcy5maWxsVGV4dCh0ZXh0LCB4LCBveSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBmb250SGVpZ2h0czoge30sXG5cbiAgICBmb250SGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmb250ID0gdGhpcy5mb250KCk7XG5cbiAgICAgIGlmICghdGhpcy5mb250SGVpZ2h0c1tmb250XSkge1xuICAgICAgICB2YXIgdGVtcCA9IGNxKDEwMCwgMTAwKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IDA7XG4gICAgICAgIHZhciBjaGFuZ2VzID0ge307XG4gICAgICAgIHRlbXAuZm9udChmb250KS5maWxsU3R5bGUoXCIjZmZmXCIpO1xuICAgICAgICB0ZW1wLnRleHRCYXNlbGluZShcImJvdHRvbVwiKS5maWxsVGV4dChcImdNXCIsIDI1LCAxMDApO1xuICAgICAgICB0ZW1wLnRyaW0oZmFsc2UsIGNoYW5nZXMpO1xuICAgICAgICBoZWlnaHQgKz0gY2hhbmdlcy5ib3R0b207XG5cbiAgICAgICAgdmFyIHRlbXAgPSBjcSgxMDAsIDEwMCk7XG4gICAgICAgIHZhciBjaGFuZ2VzID0ge307XG4gICAgICAgIHRlbXAuZm9udChmb250KS5maWxsU3R5bGUoXCIjZmZmXCIpO1xuICAgICAgICB0ZW1wLnRleHRCYXNlbGluZShcInRvcFwiKS5maWxsVGV4dChcImdNXCIsIDI1LCAwKTtcbiAgICAgICAgdGVtcC50cmltKGZhbHNlLCBjaGFuZ2VzKTtcbiAgICAgICAgaGVpZ2h0ICs9IGNoYW5nZXMudG9wO1xuXG4gICAgICAgIHZhciB0ZW1wID0gY3EoMTAwLCAxMDApO1xuICAgICAgICB2YXIgY2hhbmdlcyA9IHt9O1xuICAgICAgICB0ZW1wLmZvbnQoZm9udCkuZmlsbFN0eWxlKFwiI2ZmZlwiKTtcbiAgICAgICAgdGVtcC50ZXh0QmFzZWxpbmUoXCJhbHBoYWJldGljXCIpLmZpbGxUZXh0KFwiZ01cIiwgNTAsIDUwKTtcbiAgICAgICAgdGVtcC50cmltKGZhbHNlLCBjaGFuZ2VzKTtcbiAgICAgICAgaGVpZ2h0ICs9IHRlbXAuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZm9udEhlaWdodHNbZm9udF0gPSBoZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmZvbnRIZWlnaHRzW2ZvbnRdO1xuICAgIH0sXG5cbiAgICB0ZXh0Qm91bmRhcmllczogZnVuY3Rpb24odGV4dCwgbWF4V2lkdGgpIHtcbiAgICAgIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoXCIgXCIpO1xuXG4gICAgICB2YXIgaCA9IHRoaXMuZm9udEhlaWdodCgpO1xuXG4gICAgICB2YXIgb3ggPSAwO1xuICAgICAgdmFyIG95ID0gMDtcblxuICAgICAgaWYgKG1heFdpZHRoKSB7XG4gICAgICAgIHZhciBsaW5lID0gMDtcbiAgICAgICAgdmFyIGxpbmVzID0gW1wiXCJdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgd29yZCA9IHdvcmRzW2ldICsgXCIgXCI7XG4gICAgICAgICAgdmFyIHdvcmRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh3b3JkKS53aWR0aDtcblxuICAgICAgICAgIGlmIChveCArIHdvcmRXaWR0aCA+IG1heFdpZHRoIHx8IHdvcmRzW2ldID09PSBcIlxcblwiKSB7XG4gICAgICAgICAgICBsaW5lc1srK2xpbmVdID0gXCJcIjtcbiAgICAgICAgICAgIG94ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAod29yZHNbaV0gIT09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgIGxpbmVzW2xpbmVdICs9IHdvcmQ7XG4gICAgICAgICAgICBveCArPSB3b3JkV2lkdGg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbGluZXMgPSBbdGV4dF07XG4gICAgICAgIG1heFdpZHRoID0gdGhpcy5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiBsaW5lcy5sZW5ndGggKiBoLFxuICAgICAgICB3aWR0aDogbWF4V2lkdGgsXG4gICAgICAgIGxpbmVzOiBsaW5lcy5sZW5ndGgsXG4gICAgICAgIGxpbmVIZWlnaHQ6IGhcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVwZWF0SW1hZ2VSZWdpb246IGZ1bmN0aW9uKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpIHtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgdGhpcy5yZWN0KGR4LCBkeSwgZHcsIGRoKTtcbiAgICAgIHRoaXMuY2xpcCgpO1xuXG4gICAgICBmb3IgKHZhciB4ID0gMCwgbGVuID0gTWF0aC5jZWlsKGR3IC8gc3cpOyB4IDwgbGVuOyB4KyspIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IDAsIGxlbnkgPSBNYXRoLmNlaWwoZGggLyBzaCk7IHkgPCBsZW55OyB5KyspIHtcbiAgICAgICAgICB0aGlzLmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzdywgc2gsIGR4ICsgeCAqIHN3LCBkeSArIHkgKiBzaCwgc3csIHNoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJlc3RvcmUoKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlcGVhdEltYWdlOiBmdW5jdGlvbihpbWFnZSwgeCwgeSwgdywgaCkge1xuICAgICAgLy8gaWYgKCFlbnYuZGV0YWlscykgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgOSkge1xuICAgICAgICB0aGlzLnJlcGVhdEltYWdlUmVnaW9uKGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCB4LCB5LCB3LCBoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVwZWF0SW1hZ2VSZWdpb24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGJvcmRlckltYWdlOiBmdW5jdGlvbihpbWFnZSwgeCwgeSwgdywgaCwgdCwgciwgYiwgbCwgZmlsbCkge1xuXG4gICAgICAvLyBpZiAoIWVudi5kZXRhaWxzKSByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiB0ID09PSBcIm9iamVjdFwiKSB7XG5cbiAgICAgICAgdmFyIGJvdHRvbUxlZnQgPSB0LmJvdHRvbUxlZnQgfHwgWzAsIDAsIDAsIDBdO1xuICAgICAgICB2YXIgYm90dG9tUmlnaHQgPSB0LmJvdHRvbVJpZ2h0IHx8IFswLCAwLCAwLCAwXTtcbiAgICAgICAgdmFyIHRvcExlZnQgPSB0LnRvcExlZnQgfHwgWzAsIDAsIDAsIDBdO1xuICAgICAgICB2YXIgdG9wUmlnaHQgPSB0LnRvcFJpZ2h0IHx8IFswLCAwLCAwLCAwXTtcblxuICAgICAgICB2YXIgY2xoID0gYm90dG9tTGVmdFszXSArIHRvcExlZnRbM107XG4gICAgICAgIHZhciBjcmggPSBib3R0b21SaWdodFszXSArIHRvcFJpZ2h0WzNdO1xuICAgICAgICB2YXIgY3R3ID0gdG9wTGVmdFsyXSArIHRvcFJpZ2h0WzJdO1xuICAgICAgICB2YXIgY2J3ID0gYm90dG9tTGVmdFsyXSArIGJvdHRvbVJpZ2h0WzJdO1xuXG4gICAgICAgIHQuZmlsbFBhZGRpbmcgPSBbMCwgMCwgMCwgMF07XG5cbiAgICAgICAgaWYgKHQubGVmdCkgdC5maWxsUGFkZGluZ1swXSA9IHQubGVmdFsyXTtcbiAgICAgICAgaWYgKHQudG9wKSB0LmZpbGxQYWRkaW5nWzFdID0gdC50b3BbM107XG4gICAgICAgIGlmICh0LnJpZ2h0KSB0LmZpbGxQYWRkaW5nWzJdID0gdC5yaWdodFsyXTtcbiAgICAgICAgaWYgKHQuYm90dG9tKSB0LmZpbGxQYWRkaW5nWzNdID0gdC5ib3R0b21bM107XG5cbiAgICAgICAgLy8gaWYgKCF0LmZpbGxQYWRkaW5nKSB0LmZpbGxQYWRkaW5nID0gWzAsIDAsIDAsIDBdO1xuXG4gICAgICAgIGlmICh0LmZpbGwpIHtcbiAgICAgICAgICB0aGlzLmRyYXdJbWFnZShpbWFnZSwgdC5maWxsWzBdLCB0LmZpbGxbMV0sIHQuZmlsbFsyXSwgdC5maWxsWzNdLCB4ICsgdC5maWxsUGFkZGluZ1swXSwgeSArIHQuZmlsbFBhZGRpbmdbMV0sIHcgLSB0LmZpbGxQYWRkaW5nWzJdIC0gdC5maWxsUGFkZGluZ1swXSwgaCAtIHQuZmlsbFBhZGRpbmdbM10gLSB0LmZpbGxQYWRkaW5nWzFdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGlzLmZpbGxSZWN0KHggKyB0LmZpbGxQYWRkaW5nWzBdLCB5ICsgdC5maWxsUGFkZGluZ1sxXSwgdyAtIHQuZmlsbFBhZGRpbmdbMl0gLSB0LmZpbGxQYWRkaW5nWzBdLCBoIC0gdC5maWxsUGFkZGluZ1szXSAtIHQuZmlsbFBhZGRpbmdbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHQubGVmdCkgdGhpc1t0LmxlZnRbNF0gPT09IFwic3RyZXRjaFwiID8gXCJkcmF3SW1hZ2VcIiA6IFwicmVwZWF0SW1hZ2VcIl0oaW1hZ2UsIHQubGVmdFswXSwgdC5sZWZ0WzFdLCB0LmxlZnRbMl0sIHQubGVmdFszXSwgeCwgeSArIHRvcExlZnRbM10sIHQubGVmdFsyXSwgaCAtIGNsaCk7XG4gICAgICAgIGlmICh0LnJpZ2h0KSB0aGlzW3QucmlnaHRbNF0gPT09IFwic3RyZXRjaFwiID8gXCJkcmF3SW1hZ2VcIiA6IFwicmVwZWF0SW1hZ2VcIl0oaW1hZ2UsIHQucmlnaHRbMF0sIHQucmlnaHRbMV0sIHQucmlnaHRbMl0sIHQucmlnaHRbM10sIHggKyB3IC0gdC5yaWdodFsyXSwgeSArIHRvcFJpZ2h0WzNdLCB0LnJpZ2h0WzJdLCBoIC0gY3JoKTtcbiAgICAgICAgaWYgKHQudG9wKSB0aGlzW3QudG9wWzRdID09PSBcInN0cmV0Y2hcIiA/IFwiZHJhd0ltYWdlXCIgOiBcInJlcGVhdEltYWdlXCJdKGltYWdlLCB0LnRvcFswXSwgdC50b3BbMV0sIHQudG9wWzJdLCB0LnRvcFszXSwgeCArIHRvcExlZnRbMl0sIHksIHcgLSBjdHcsIHQudG9wWzNdKTtcbiAgICAgICAgaWYgKHQuYm90dG9tKSB0aGlzW3QuYm90dG9tWzRdID09PSBcInN0cmV0Y2hcIiA/IFwiZHJhd0ltYWdlXCIgOiBcInJlcGVhdEltYWdlXCJdKGltYWdlLCB0LmJvdHRvbVswXSwgdC5ib3R0b21bMV0sIHQuYm90dG9tWzJdLCB0LmJvdHRvbVszXSwgeCArIGJvdHRvbUxlZnRbMl0sIHkgKyBoIC0gdC5ib3R0b21bM10sIHcgLSBjYncsIHQuYm90dG9tWzNdKTtcblxuICAgICAgICBpZiAodC5ib3R0b21MZWZ0KSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgdC5ib3R0b21MZWZ0WzBdLCB0LmJvdHRvbUxlZnRbMV0sIHQuYm90dG9tTGVmdFsyXSwgdC5ib3R0b21MZWZ0WzNdLCB4LCB5ICsgaCAtIHQuYm90dG9tTGVmdFszXSwgdC5ib3R0b21MZWZ0WzJdLCB0LmJvdHRvbUxlZnRbM10pO1xuICAgICAgICBpZiAodC50b3BMZWZ0KSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgdC50b3BMZWZ0WzBdLCB0LnRvcExlZnRbMV0sIHQudG9wTGVmdFsyXSwgdC50b3BMZWZ0WzNdLCB4LCB5LCB0LnRvcExlZnRbMl0sIHQudG9wTGVmdFszXSk7XG4gICAgICAgIGlmICh0LnRvcFJpZ2h0KSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgdC50b3BSaWdodFswXSwgdC50b3BSaWdodFsxXSwgdC50b3BSaWdodFsyXSwgdC50b3BSaWdodFszXSwgeCArIHcgLSB0LnRvcFJpZ2h0WzJdLCB5LCB0LnRvcFJpZ2h0WzJdLCB0LnRvcFJpZ2h0WzNdKTtcbiAgICAgICAgaWYgKHQuYm90dG9tUmlnaHQpIHRoaXMuZHJhd0ltYWdlKGltYWdlLCB0LmJvdHRvbVJpZ2h0WzBdLCB0LmJvdHRvbVJpZ2h0WzFdLCB0LmJvdHRvbVJpZ2h0WzJdLCB0LmJvdHRvbVJpZ2h0WzNdLCB4ICsgdyAtIHQuYm90dG9tUmlnaHRbMl0sIHkgKyBoIC0gdC5ib3R0b21SaWdodFszXSwgdC5ib3R0b21SaWdodFsyXSwgdC5ib3R0b21SaWdodFszXSk7XG5cblxuICAgICAgfSBlbHNlIHtcblxuXG4gICAgICAgIC8qIHRvcCAqL1xuICAgICAgICBpZiAodCA+IDAgJiYgdyAtIGwgLSByID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGwsIDAsIGltYWdlLndpZHRoIC0gbCAtIHIsIHQsIHggKyBsLCB5LCB3IC0gbCAtIHIsIHQpO1xuXG4gICAgICAgIC8qIGJvdHRvbSAqL1xuICAgICAgICBpZiAoYiA+IDAgJiYgdyAtIGwgLSByID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGwsIGltYWdlLmhlaWdodCAtIGIsIGltYWdlLndpZHRoIC0gbCAtIHIsIGIsIHggKyBsLCB5ICsgaCAtIGIsIHcgLSBsIC0gciwgYik7XG4gICAgICAgIC8vICAgICAgY29uc29sZS5sb2coeCwgeSwgdywgaCwgdCwgciwgYiwgbCk7XG4gICAgICAgIC8vICAgICAgY29uc29sZS5sb2coaW1hZ2UsIDAsIHQsIGwsIGltYWdlLmhlaWdodCAtIGIgLSB0LCB4LCB5ICsgdCwgbCwgaCAtIGIgLSB0KTtcbiAgICAgICAgLyogbGVmdCAqL1xuICAgICAgICBpZiAobCA+IDAgJiYgaCAtIGIgLSB0ID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIDAsIHQsIGwsIGltYWdlLmhlaWdodCAtIGIgLSB0LCB4LCB5ICsgdCwgbCwgaCAtIGIgLSB0KTtcblxuXG4gICAgICAgIC8qIHJpZ2h0ICovXG4gICAgICAgIGlmIChyID4gMCAmJiBoIC0gYiAtIHQgPiAwKSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgaW1hZ2Uud2lkdGggLSByLCB0LCByLCBpbWFnZS5oZWlnaHQgLSBiIC0gdCwgeCArIHcgLSByLCB5ICsgdCwgciwgaCAtIGIgLSB0KTtcblxuICAgICAgICAvKiB0b3AtbGVmdCAqL1xuICAgICAgICBpZiAobCA+IDAgJiYgdCA+IDApIHRoaXMuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBsLCB0LCB4LCB5LCBsLCB0KTtcblxuICAgICAgICAvKiB0b3AtcmlnaHQgKi9cbiAgICAgICAgaWYgKHIgPiAwICYmIHQgPiAwKSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgaW1hZ2Uud2lkdGggLSByLCAwLCByLCB0LCB4ICsgdyAtIHIsIHksIHIsIHQpO1xuXG4gICAgICAgIC8qIGJvdHRvbS1yaWdodCAqL1xuICAgICAgICBpZiAociA+IDAgJiYgYiA+IDApIHRoaXMuZHJhd0ltYWdlKGltYWdlLCBpbWFnZS53aWR0aCAtIHIsIGltYWdlLmhlaWdodCAtIGIsIHIsIGIsIHggKyB3IC0gciwgeSArIGggLSBiLCByLCBiKTtcblxuICAgICAgICAvKiBib3R0b20tbGVmdCAqL1xuICAgICAgICBpZiAobCA+IDAgJiYgYiA+IDApIHRoaXMuZHJhd0ltYWdlKGltYWdlLCAwLCBpbWFnZS5oZWlnaHQgLSBiLCBsLCBiLCB4LCB5ICsgaCAtIGIsIGwsIGIpO1xuXG4gICAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmaWxsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGxTdHlsZShmaWxsKS5maWxsUmVjdCh4ICsgbCwgeSArIHQsIHcgLSBsIC0gciwgaCAtIHQgLSBiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHcgLSBsIC0gciA+IDAgJiYgaCAtIHQgLSBiID4gMClcbiAgICAgICAgICAgICAgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGwsIHQsIGltYWdlLndpZHRoIC0gciAtIGwsIGltYWdlLmhlaWdodCAtIGIgLSB0LCB4ICsgbCwgeSArIHQsIHcgLSBsIC0gciwgaCAtIHQgLSBiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0UGl4ZWw6IGZ1bmN0aW9uKGNvbG9yLCB4LCB5KSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmZpbGxTdHlsZShjb2xvcikuZmlsbFJlY3QoeCwgeSwgMSwgMSk7XG5cbiAgICB9LFxuXG4gICAgZ2V0UGl4ZWw6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIHZhciBwaXhlbCA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSkuZGF0YTtcbiAgICAgIHJldHVybiBjcS5jb2xvcihbcGl4ZWxbMF0sIHBpeGVsWzFdLCBwaXhlbFsyXSwgcGl4ZWxbM11dKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlSW1hZ2VEYXRhOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICBpZiAoZmFsc2UgJiYgdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YS5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuZW1wdHlDYW52YXMpIHtcbiAgICAgICAgICB0aGlzLmVtcHR5Q2FudmFzID0gY3EuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgIHRoaXMuZW1wdHlDYW52YXNDb250ZXh0ID0gdGhpcy5lbXB0eUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtcHR5Q2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuZW1wdHlDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eUNhbnZhc0NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHJva2VMaW5lOiBmdW5jdGlvbih4MSwgeTEsIHgyLCB5Mikge1xuXG4gICAgICB0aGlzLmJlZ2luUGF0aCgpO1xuXG4gICAgICBpZiAodHlwZW9mIHgyID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHRoaXMubW92ZVRvKHgxLngsIHgxLnkpO1xuICAgICAgICB0aGlzLmxpbmVUbyh5MS54LCB5MS55KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubW92ZVRvKHgxLCB5MSk7XG4gICAgICAgIHRoaXMubGluZVRvKHgyLCB5Mik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3Ryb2tlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfSxcblxuICAgIHNldExpbmVEYXNoOiBmdW5jdGlvbihkYXNoKSB7XG4gICAgICBpZiAodGhpcy5jb250ZXh0LnNldExpbmVEYXNoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5zZXRMaW5lRGFzaChkYXNoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9IGVsc2UgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIG1lYXN1cmVUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQuYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICBnZXRMaW5lRGFzaDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmdldExpbmVEYXNoKCk7XG4gICAgfSxcblxuICAgIGNyZWF0ZVJhZGlhbEdyYWRpZW50OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQuYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICBjcmVhdGVMaW5lYXJHcmFkaWVudDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50LmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9LFxuXG4gICAgY3JlYXRlUGF0dGVybjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNyZWF0ZVBhdHRlcm4uYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICBnZXRJbWFnZURhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEuYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICAvKiBJZiB5b3UgdGhpbmsgdGhhdCBJIGFtIHJldGFyZGVkIGJlY2F1c2UgSSB1c2UgZmlsbFJlY3QgdG8gc2V0XG4gICAgICAgcGl4ZWxzIC0gcmVhZCBhYm91dCBwcmVtdWx0aXBsZWQgYWxwaGEgaW4gY2FudmFzICovXG5cbiAgICB3cml0ZU1ldGE6IGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgdmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcblxuICAgICAganNvbiA9IGVuY29kZVVSSUNvbXBvbmVudChqc29uKTtcblxuICAgICAgdmFyIGJ5dGVzID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwganNvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBieXRlcy5wdXNoKGpzb24uY2hhckNvZGVBdChpKSk7XG4gICAgICAgIC8vICAgICAgY29uc29sZS5sb2coanNvbltpXSlcbiAgICAgIH1cblxuICAgICAgYnl0ZXMucHVzaCgxMjcpO1xuXG4gICAgICB2YXIgeCA9IHRoaXMud2lkdGggLSAxO1xuICAgICAgdmFyIHkgPSB0aGlzLmhlaWdodCAtIDE7XG5cbiAgICAgIHZhciBwaXhlbCA9IFtdO1xuXG4gICAgICB3aGlsZSAoYnl0ZXMubGVuZ3RoKSB7XG5cbiAgICAgICAgdmFyIGJ5dGUgPSBieXRlcy5zaGlmdCgpO1xuXG4gICAgICAgIHBpeGVsLnVuc2hpZnQoYnl0ZSAqIDIpO1xuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coeCArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZSksIGJ5dGUpO1xuXG4gICAgICAgIGlmICghYnl0ZXMubGVuZ3RoKVxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMyAtIHBpeGVsLmxlbmd0aDsgaSsrKSBwaXhlbC51bnNoaWZ0KDI1NCk7XG5cbiAgICAgICAgaWYgKHBpeGVsLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgIHRoaXMuZmlsbFN0eWxlKGNxLmNvbG9yKHBpeGVsKS50b1JnYigpKS5maWxsUmVjdCh4LCB5LCAxLCAxKTtcbiAgICAgICAgICBwaXhlbCA9IFtdO1xuICAgICAgICAgIHgtLTtcblxuICAgICAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICAgICAgeS0tO1xuICAgICAgICAgICAgeCA9IHRoaXMud2lkdGggLSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH0sXG5cbiAgICByZWFkTWV0YTogZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBieXRlcyA9IFtdO1xuXG4gICAgICB2YXIgeCA9IHRoaXMud2lkdGggLSAxO1xuICAgICAgdmFyIHkgPSB0aGlzLmhlaWdodCAtIDE7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBwaXhlbCA9IHRoaXMuZ2V0UGl4ZWwoeCwgeSk7XG5cbiAgICAgICAgdmFyIHN0b3AgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuXG4gICAgICAgICAgaWYgKHBpeGVsWzIgLSBpXSA9PT0gMjU0KSBzdG9wID0gdHJ1ZTtcblxuICAgICAgICAgIGVsc2UgYnl0ZXMucHVzaChwaXhlbFsyIC0gaV0gLyAyIHwgMCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdG9wKSBicmVhaztcblxuICAgICAgICB4LS07XG5cbiAgICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgICAgeS0tO1xuICAgICAgICAgIHggPSB0aGlzLndpZHRoIC0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIHZhciBqc29uID0gXCJcIjtcblxuICAgICAgd2hpbGUgKGJ5dGVzLmxlbmd0aCkge1xuICAgICAgICBqc29uICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXMuc2hpZnQoKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRhID0gZmFsc2U7XG5cbiAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkZWNvZGVVUklDb21wb25lbnQoanNvbikpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkYXRhO1xuXG4gICAgfSxcblxuICAgIGdldCB3aWR0aCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICB9LFxuXG4gICAgZ2V0IGhlaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgfSxcblxuICAgIHNldCB3aWR0aCh3KSB7XG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHc7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLndpZHRoO1xuICAgIH0sXG5cbiAgICBzZXQgaGVpZ2h0KGgpIHtcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGg7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICB9XG5cblxuICB9O1xuXG4gIC8qIGV4dGVuZCBMYXllciB3aXRoIGRyYXdpbmcgY29udGV4dCBtZXRob2RzICovXG5cbiAgdmFyIG1ldGhvZHMgPSBbXCJhcmNcIiwgXCJhcmNUb1wiLCBcImJlZ2luUGF0aFwiLCBcImJlemllckN1cnZlVG9cIiwgXCJjbGVhclJlY3RcIiwgXCJjbGlwXCIsIFwiY2xvc2VQYXRoXCIsIFwiY3JlYXRlTGluZWFyR3JhZGllbnRcIiwgXCJjcmVhdGVSYWRpYWxHcmFkaWVudFwiLCBcImNyZWF0ZVBhdHRlcm5cIiwgXCJkcmF3Rm9jdXNSaW5nXCIsIFwiZHJhd0ltYWdlXCIsIFwiZmlsbFwiLCBcImZpbGxSZWN0XCIsIFwiZmlsbFRleHRcIiwgXCJnZXRJbWFnZURhdGFcIiwgXCJpc1BvaW50SW5QYXRoXCIsIFwibGluZVRvXCIsIFwibWVhc3VyZVRleHRcIiwgXCJtb3ZlVG9cIiwgXCJwdXRJbWFnZURhdGFcIiwgXCJxdWFkcmF0aWNDdXJ2ZVRvXCIsIFwicmVjdFwiLCBcInJlc3RvcmVcIiwgXCJyb3RhdGVcIiwgXCJzYXZlXCIsIFwic2NhbGVcIiwgXCJzZXRUcmFuc2Zvcm1cIiwgXCJzdHJva2VcIiwgXCJzdHJva2VSZWN0XCIsIFwic3Ryb2tlVGV4dFwiLCBcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVwiLCBcInNldExpbmVEYXNoXCJdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuYW1lID0gbWV0aG9kc1tpXTtcblxuICAgIGlmIChjcS5MYXllci5wcm90b3R5cGVbbmFtZV0pIGNvbnRpbnVlO1xuXG4gICAgY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdID0gKGZ1bmN0aW9uKG1ldGhvZCkge1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjcS5mYXN0QXBwbHkobWV0aG9kLCB0aGlzLmNvbnRleHQsIGFyZ3MpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgfSkoQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELnByb3RvdHlwZVtuYW1lXSk7XG5cblxuICAgIGNvbnRpbnVlO1xuXG5cbiAgICBpZiAoIXRoaXMuZGVidWcpIHtcbiAgICAgIC8vIGlmICghY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdKSBjcS5MYXllci5wcm90b3R5cGVbbmFtZV0gPSBGdW5jdGlvbihcInRoaXMuY29udGV4dC5cIiArIG5hbWUgKyBcIi5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7IHJldHVybiB0aGlzO1wiKTtcblxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAoZnVuY3Rpb24obmFtZSkge1xuXG4gICAgICAgIGNxLkxheWVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHRoaXMuY29udGV4dFtuYW1lXS5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICBjcS5mYXN0QXBwbHkodGhpcy5jb250ZXh0W25hbWVdLCB0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICB9KShuYW1lKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgKGZ1bmN0aW9uKG5hbWUpIHtcblxuICAgICAgICBjcS5MYXllci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0W25hbWVdLmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG4gICAgICAgICAgICB0aHJvdyAoZSArIGVyci5zdGFjayk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUsIG5hbWUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pKG5hbWUpO1xuXG4gICAgfVxuXG4gIH07XG5cbiAgLyogY3JlYXRlIHNldHRlcnMgYW5kIGdldHRlcnMgKi9cblxuICB2YXIgcHJvcGVydGllcyA9IFtcImNhbnZhc1wiLCBcImZpbGxTdHlsZVwiLCBcImZvbnRcIiwgXCJnbG9iYWxBbHBoYVwiLCBcImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvblwiLCBcImxpbmVDYXBcIiwgXCJsaW5lSm9pblwiLCBcImxpbmVXaWR0aFwiLCBcIm1pdGVyTGltaXRcIiwgXCJzaGFkb3dPZmZzZXRYXCIsIFwic2hhZG93T2Zmc2V0WVwiLCBcInNoYWRvd0JsdXJcIiwgXCJzaGFkb3dDb2xvclwiLCBcInN0cm9rZVN0eWxlXCIsIFwidGV4dEFsaWduXCIsIFwidGV4dEJhc2VsaW5lXCIsIFwibGluZURhc2hPZmZzZXRcIl07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5hbWUgPSBwcm9wZXJ0aWVzW2ldO1xuICAgIGlmICghY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdKSBjcS5MYXllci5wcm90b3R5cGVbbmFtZV0gPSBGdW5jdGlvbihcImlmKGFyZ3VtZW50cy5sZW5ndGgpIHsgdGhpcy5jb250ZXh0LlwiICsgbmFtZSArIFwiID0gYXJndW1lbnRzWzBdOyByZXR1cm4gdGhpczsgfSBlbHNlIHsgcmV0dXJuIHRoaXMuY29udGV4dC5cIiArIG5hbWUgKyBcIjsgfVwiKTtcbiAgfTtcblxuICAvKiBjb2xvciAqL1xuXG4gIGNxLkNvbG9yID0gZnVuY3Rpb24oZGF0YSwgdHlwZSkge1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHRoaXMucGFyc2UoZGF0YSwgdHlwZSk7XG4gIH1cblxuICBjcS5Db2xvci5wcm90b3R5cGUgPSB7XG5cbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50b1JnYigpO1xuICAgIH0sXG5cbiAgICBwYXJzZTogZnVuY3Rpb24oYXJncywgdHlwZSkge1xuICAgICAgaWYgKGFyZ3NbMF0gaW5zdGFuY2VvZiBjcS5Db2xvcikge1xuICAgICAgICB0aGlzWzBdID0gYXJnc1swXVswXTtcbiAgICAgICAgdGhpc1sxXSA9IGFyZ3NbMF1bMV07XG4gICAgICAgIHRoaXNbMl0gPSBhcmdzWzBdWzJdO1xuICAgICAgICB0aGlzWzNdID0gYXJnc1swXVszXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGFyZ3MgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gbnVsbDtcblxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gXCIjXCIpIHtcbiAgICAgICAgICB2YXIgcmdiID0gY3EuaGV4VG9SZ2IoYXJncyk7XG4gICAgICAgICAgdGhpc1swXSA9IHJnYlswXTtcbiAgICAgICAgICB0aGlzWzFdID0gcmdiWzFdO1xuICAgICAgICAgIHRoaXNbMl0gPSByZ2JbMl07XG4gICAgICAgICAgdGhpc1szXSA9IDEuMDtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaCA9IGFyZ3MubWF0Y2goL3JnYlxcKCguKiksKC4qKSwoLiopXFwpLykpIHtcbiAgICAgICAgICB0aGlzWzBdID0gbWF0Y2hbMV0gfCAwO1xuICAgICAgICAgIHRoaXNbMV0gPSBtYXRjaFsyXSB8IDA7XG4gICAgICAgICAgdGhpc1syXSA9IG1hdGNoWzNdIHwgMDtcbiAgICAgICAgICB0aGlzWzNdID0gMS4wO1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoID0gYXJncy5tYXRjaCgvcmdiYVxcKCguKiksKC4qKSwoLiopXFwpLykpIHtcbiAgICAgICAgICB0aGlzWzBdID0gbWF0Y2hbMV0gfCAwO1xuICAgICAgICAgIHRoaXNbMV0gPSBtYXRjaFsyXSB8IDA7XG4gICAgICAgICAgdGhpc1syXSA9IG1hdGNoWzNdIHwgMDtcbiAgICAgICAgICB0aGlzWzNdID0gbWF0Y2hbNF0gfCAwO1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoID0gYXJncy5tYXRjaCgvaHNsXFwoKC4qKSwoLiopLCguKilcXCkvKSkge1xuICAgICAgICAgIHRoaXMuZnJvbUhzbChtYXRjaFsxXSwgbWF0Y2hbMl0sIG1hdGNoWzNdKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaCA9IGFyZ3MubWF0Y2goL2hzdlxcKCguKiksKC4qKSwoLiopXFwpLykpIHtcbiAgICAgICAgICB0aGlzLmZyb21Ic3YobWF0Y2hbMV0sIG1hdGNoWzJdLCBtYXRjaFszXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgXCJoc2xcIjpcbiAgICAgICAgICBjYXNlIFwiaHNsYVwiOlxuXG4gICAgICAgICAgICB0aGlzLmZyb21Ic2woYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgXCJoc3ZcIjpcbiAgICAgICAgICBjYXNlIFwiaHN2YVwiOlxuXG4gICAgICAgICAgICB0aGlzLmZyb21Ic3YoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzWzBdID0gYXJnc1swXTtcbiAgICAgICAgICAgIHRoaXNbMV0gPSBhcmdzWzFdO1xuICAgICAgICAgICAgdGhpc1syXSA9IGFyZ3NbMl07XG4gICAgICAgICAgICB0aGlzWzNdID0gdHlwZW9mIGFyZ3NbM10gPT09IFwidW5kZWZpbmVkXCIgPyAxLjAgOiBhcmdzWzNdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYTogZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWxwaGEoYSk7XG4gICAgfSxcblxuICAgIGFscGhhOiBmdW5jdGlvbihhKSB7XG4gICAgICB0aGlzWzNdID0gYTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBmcm9tSHNsOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjb21wb25lbnRzID0gYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgQXJyYXkgPyBhcmd1bWVudHNbMF0gOiBhcmd1bWVudHM7XG5cbiAgICAgIHZhciBjb2xvciA9IGNxLmhzbFRvUmdiKHBhcnNlRmxvYXQoY29tcG9uZW50c1swXSksIHBhcnNlRmxvYXQoY29tcG9uZW50c1sxXSksIHBhcnNlRmxvYXQoY29tcG9uZW50c1syXSkpO1xuXG4gICAgICB0aGlzWzBdID0gY29sb3JbMF07XG4gICAgICB0aGlzWzFdID0gY29sb3JbMV07XG4gICAgICB0aGlzWzJdID0gY29sb3JbMl07XG4gICAgICB0aGlzWzNdID0gdHlwZW9mIGFyZ3VtZW50c1szXSA9PT0gXCJ1bmRlZmluZWRcIiA/IDEuMCA6IGFyZ3VtZW50c1szXTtcbiAgICB9LFxuXG4gICAgZnJvbUhzdjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29tcG9uZW50cyA9IGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEFycmF5ID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xuICAgICAgdmFyIGNvbG9yID0gY3EuaHN2VG9SZ2IocGFyc2VGbG9hdChjb21wb25lbnRzWzBdKSwgcGFyc2VGbG9hdChjb21wb25lbnRzWzFdKSwgcGFyc2VGbG9hdChjb21wb25lbnRzWzJdKSk7XG5cbiAgICAgIHRoaXNbMF0gPSBjb2xvclswXTtcbiAgICAgIHRoaXNbMV0gPSBjb2xvclsxXTtcbiAgICAgIHRoaXNbMl0gPSBjb2xvclsyXTtcbiAgICAgIHRoaXNbM10gPSB0eXBlb2YgYXJndW1lbnRzWzNdID09PSBcInVuZGVmaW5lZFwiID8gMS4wIDogYXJndW1lbnRzWzNdO1xuICAgIH0sXG5cbiAgICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbdGhpc1swXSwgdGhpc1sxXSwgdGhpc1syXSwgdGhpc1szXV07XG4gICAgfSxcblxuICAgIHRvUmdiOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBcInJnYihcIiArIHRoaXNbMF0gKyBcIiwgXCIgKyB0aGlzWzFdICsgXCIsIFwiICsgdGhpc1syXSArIFwiKVwiO1xuICAgIH0sXG5cbiAgICB0b1JnYmE6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwicmdiYShcIiArIHRoaXNbMF0gKyBcIiwgXCIgKyB0aGlzWzFdICsgXCIsIFwiICsgdGhpc1syXSArIFwiLCBcIiArIHRoaXNbM10gKyBcIilcIjtcbiAgICB9LFxuXG4gICAgdG9IZXg6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNxLnJnYlRvSGV4KHRoaXNbMF0sIHRoaXNbMV0sIHRoaXNbMl0pO1xuICAgIH0sXG5cbiAgICB0b0hzbDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYyA9IGNxLnJnYlRvSHNsKHRoaXNbMF0sIHRoaXNbMV0sIHRoaXNbMl0pO1xuICAgICAgY1szXSA9IHRoaXNbM107XG4gICAgICByZXR1cm4gYztcbiAgICB9LFxuXG4gICAgdG9Ic3Y6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGMgPSBjcS5yZ2JUb0hzdih0aGlzWzBdLCB0aGlzWzFdLCB0aGlzWzJdKTtcbiAgICAgIGNbM10gPSB0aGlzWzNdO1xuICAgICAgcmV0dXJuIGM7XG4gICAgfSxcblxuICAgIGdyYWRpZW50OiBmdW5jdGlvbih0YXJnZXQsIHN0ZXBzKSB7XG4gICAgICB2YXIgdGFyZ2V0Q29sb3IgPSBjcS5jb2xvcih0YXJnZXQpO1xuICAgIH0sXG5cbiAgICBzaGlmdEhzbDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xuXG4gICAgICBpZiAodGhpc1swXSAhPT0gdGhpc1sxXSB8fCB0aGlzWzFdICE9PSB0aGlzWzJdKSB7XG4gICAgICAgIHZhciBoID0gYXJndW1lbnRzWzBdID09PSBmYWxzZSA/IGhzbFswXSA6IGNxLndyYXBWYWx1ZShoc2xbMF0gKyBhcmd1bWVudHNbMF0sIDAsIDEpO1xuICAgICAgICB2YXIgcyA9IGFyZ3VtZW50c1sxXSA9PT0gZmFsc2UgPyBoc2xbMV0gOiBjcS5saW1pdFZhbHVlKGhzbFsxXSArIGFyZ3VtZW50c1sxXSwgMCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaCA9IGhzbFswXTtcbiAgICAgICAgdmFyIHMgPSBoc2xbMV07XG4gICAgICB9XG5cbiAgICAgIHZhciBsID0gYXJndW1lbnRzWzJdID09PSBmYWxzZSA/IGhzbFsyXSA6IGNxLmxpbWl0VmFsdWUoaHNsWzJdICsgYXJndW1lbnRzWzJdLCAwLCAxKTtcblxuICAgICAgdGhpcy5mcm9tSHNsKGgsIHMsIGwpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgc2V0SHNsOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XG5cbiAgICAgIHZhciBoID0gYXJndW1lbnRzWzBdID09PSBmYWxzZSA/IGhzbFswXSA6IGNxLmxpbWl0VmFsdWUoYXJndW1lbnRzWzBdLCAwLCAxKTtcbiAgICAgIHZhciBzID0gYXJndW1lbnRzWzFdID09PSBmYWxzZSA/IGhzbFsxXSA6IGNxLmxpbWl0VmFsdWUoYXJndW1lbnRzWzFdLCAwLCAxKTtcbiAgICAgIHZhciBsID0gYXJndW1lbnRzWzJdID09PSBmYWxzZSA/IGhzbFsyXSA6IGNxLmxpbWl0VmFsdWUoYXJndW1lbnRzWzJdLCAwLCAxKTtcblxuICAgICAgdGhpcy5mcm9tSHNsKGgsIHMsIGwpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgbWl4OiBmdW5jdGlvbihjb2xvciwgYW1vdW50KSB7XG4gICAgICBjb2xvciA9IGNxLmNvbG9yKGNvbG9yKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspXG4gICAgICAgIHRoaXNbaV0gPSBjcS5taXgodGhpc1tpXSwgY29sb3JbaV0sIGFtb3VudCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICB9O1xuXG4gIHdpbmRvd1tcImNxXCJdID0gd2luZG93W1wiQ2FudmFzUXVlcnlcIl0gPSBjcTtcblxuXG4gIHJldHVybiBjcTtcblxufSkoKTtcblxuLyogZmlsZTogc3JjL2xheWVyL0xheWVyLmpzICovXG5cblBMQVlHUk9VTkQuUmVuZGVyZXIgPSBmdW5jdGlvbihhcHApIHtcblxuICB0aGlzLmFwcCA9IGFwcDtcblxuICBhcHAub24oXCJjcmVhdGVcIiwgdGhpcy5jcmVhdGUuYmluZCh0aGlzKSk7XG4gIGFwcC5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICBhcHAucmVuZGVyZXIgPSB0aGlzO1xuXG59O1xuXG5QTEFZR1JPVU5ELlJlbmRlcmVyLnBsdWdpbiA9IHRydWU7XG5cblBMQVlHUk9VTkQuUmVuZGVyZXIucHJvdG90eXBlID0ge1xuXG4gIGNyZWF0ZTogZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgdGhpcy5hcHAubGF5ZXIgPSBjcSgpLmFwcGVuZFRvKHRoaXMuYXBwLmNvbnRhaW5lcik7XG5cbiAgICBpZiAoIXRoaXMuYXBwLmN1c3RvbUNvbnRhaW5lcikge1xuICAgICAgdGhpcy5hcHAuY29udGFpbmVyLnN0eWxlLm1hcmdpbiA9IFwiMHB4XCI7XG4gICAgICB0aGlzLmFwcC5jb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIH1cblxuICB9LFxuXG4gIHJlc2l6ZTogZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgdmFyIGFwcCA9IHRoaXMuYXBwO1xuXG4gICAgdmFyIGxheWVyID0gYXBwLmxheWVyO1xuXG4gICAgbGF5ZXIud2lkdGggPSBhcHAud2lkdGg7XG4gICAgbGF5ZXIuaGVpZ2h0ID0gYXBwLmhlaWdodDtcblxuICAgIGxheWVyLmNhbnZhcy5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBcIjAgMFwiO1xuICAgIGxheWVyLmNhbnZhcy5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIGFwcC5vZmZzZXRYICsgXCJweCxcIiArIGFwcC5vZmZzZXRZICsgXCJweCkgc2NhbGUoXCIgKyBhcHAuc2NhbGUgKyBcIiwgXCIgKyBhcHAuc2NhbGUgKyBcIilcIjtcbiAgICBsYXllci5jYW52YXMuc3R5bGUudHJhbnNmb3JtU3R5bGUgPSBcInByZXNlcnZlLTNkXCI7XG5cbiAgICBsYXllci5jYW52YXMuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gXCIwIDBcIjtcbiAgICBsYXllci5jYW52YXMuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyBhcHAub2Zmc2V0WCArIFwicHgsXCIgKyBhcHAub2Zmc2V0WSArIFwicHgpIHNjYWxlKFwiICsgYXBwLnNjYWxlICsgXCIsIFwiICsgYXBwLnNjYWxlICsgXCIpXCI7XG4gICAgbGF5ZXIuY2FudmFzLnN0eWxlLndlYmtpdFRyYW5zZm9ybVN0eWxlID0gXCJwcmVzZXJ2ZS0zZFwiO1xuXG4gICAgbGF5ZXIuc21vb3RoaW5nID0gdGhpcy5hcHAuc21vb3RoaW5nO1xuICAgIGxheWVyLnVwZGF0ZSgpO1xuXG4gICAgdGhpcy5zZXRTbW9vdGhpbmcodGhpcy5hcHAuc21vb3RoaW5nKTtcblxuICB9LFxuXG4gIHNldFNtb290aGluZzogZnVuY3Rpb24oc21vb3RoaW5nKSB7XG5cbiAgICB2YXIgbGF5ZXIgPSB0aGlzLmFwcC5sYXllcjtcblxuICAgIHRoaXMuYXBwLnNtb290aGluZyA9IHNtb290aGluZztcblxuXG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMSkge1xuXG4gICAgICBsYXllci5jYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmcgPSBzbW9vdGhpbmcgPyBcImF1dG9cIiA6IFwiLW1vei1jcmlzcC1lZGdlc1wiO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgbGF5ZXIuY2FudmFzLnN0eWxlLmltYWdlUmVuZGVyaW5nID0gc21vb3RoaW5nID8gXCJhdXRvXCIgOiBcInBpeGVsYXRlZFwiO1xuXG4gICAgfVxuXG4gICAgbGF5ZXIuc21vb3RoaW5nID0gc21vb3RoaW5nO1xuICAgIGxheWVyLnVwZGF0ZSgpO1xuXG4gIH1cblxufTtcblxuLyogZmlsZTogc3JjL2xheWVyL1RyYW5zaXRpb25zLmpzICovXG5cblBMQVlHUk9VTkQuVHJhbnNpdGlvbnMgPSBmdW5jdGlvbihhcHApIHtcblxuICB0aGlzLmFwcCA9IGFwcDtcblxuICBhcHAub24oXCJlbnRlcnN0YXRlXCIsIHRoaXMuZW50ZXJzdGF0ZS5iaW5kKHRoaXMpKTtcbiAgYXBwLm9uKFwicG9zdHJlbmRlclwiLCB0aGlzLnBvc3RyZW5kZXIuYmluZCh0aGlzKSk7XG4gIGFwcC5vbihcInN0ZXBcIiwgdGhpcy5zdGVwLmJpbmQodGhpcykpO1xuXG4gIHRoaXMucHJvZ3Jlc3MgPSAxO1xuICB0aGlzLmxpZmV0aW1lID0gMDtcbn07XG5cblBMQVlHUk9VTkQuVHJhbnNpdGlvbnMucGx1Z2luID0gdHJ1ZTtcblxuUExBWUdST1VORC5UcmFuc2l0aW9ucy5wcm90b3R5cGUgPSB7XG5cbiAgZW50ZXJzdGF0ZTogZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgdGhpcy5zY3JlZW5zaG90ID0gdGhpcy5hcHAubGF5ZXIuY2FjaGUoKTtcblxuICAgIGlmIChkYXRhLnByZXYpIHtcbiAgICAgIHRoaXMubGlmZXRpbWUgPSAwO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgfVxuXG4gIH0sXG5cbiAgcG9zdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAodGhpcy5wcm9ncmVzcyA+PSAxKSByZXR1cm47XG5cbiAgICBQTEFZR1JPVU5ELlRyYW5zaXRpb25zLlNwbGl0KHRoaXMsIHRoaXMucHJvZ3Jlc3MpO1xuXG4gIH0sXG5cbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcblxuICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEpIHJldHVybjtcblxuICAgIHRoaXMubGlmZXRpbWUgKz0gZGVsdGE7XG5cbiAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4odGhpcy5saWZldGltZSAvIDAuNSwgMSk7XG5cbiAgfVxuXG59O1xuXG5QTEFZR1JPVU5ELlRyYW5zaXRpb25zLkltcGxvZGUgPSBmdW5jdGlvbihtYW5hZ2VyLCBwcm9ncmVzcykge1xuXG4gIHZhciBhcHAgPSBtYW5hZ2VyLmFwcDtcbiAgdmFyIGxheWVyID0gYXBwLmxheWVyO1xuXG4gIHByb2dyZXNzID0gYXBwLmVhc2UocHJvZ3Jlc3MsIFwib3V0Q3ViaWNcIik7XG5cbiAgdmFyIG5lZ2F0aXZlID0gMSAtIHByb2dyZXNzO1xuXG4gIGxheWVyLnNhdmUoKTtcbiAgbGF5ZXIudGFycyhhcHAuY2VudGVyLngsIGFwcC5jZW50ZXIueSwgMC41LCAwLjUsIDAsIDAuNSArIDAuNSAqIG5lZ2F0aXZlLCBuZWdhdGl2ZSk7XG4gIGxheWVyLmRyYXdJbWFnZShtYW5hZ2VyLnNjcmVlbnNob3QsIDAsIDApO1xuXG4gIGxheWVyLnJlc3RvcmUoKTtcblxufTtcblxuUExBWUdST1VORC5UcmFuc2l0aW9ucy5TcGxpdCA9IGZ1bmN0aW9uKG1hbmFnZXIsIHByb2dyZXNzKSB7XG5cbiAgdmFyIGFwcCA9IG1hbmFnZXIuYXBwO1xuICB2YXIgbGF5ZXIgPSBhcHAubGF5ZXI7XG5cbiAgcHJvZ3Jlc3MgPSBhcHAuZWFzZShwcm9ncmVzcywgXCJpbk91dEN1YmljXCIpO1xuXG4gIHZhciBuZWdhdGl2ZSA9IDEgLSBwcm9ncmVzcztcblxuICBsYXllci5zYXZlKCk7XG5cbiAgbGF5ZXIuYShuZWdhdGl2ZSkuY2xlYXIoXCIjZmZmXCIpLnJhKCk7XG5cbiAgbGF5ZXIuZHJhd0ltYWdlKG1hbmFnZXIuc2NyZWVuc2hvdCwgMCwgMCwgYXBwLndpZHRoLCBhcHAuaGVpZ2h0IC8gMiB8IDAsIDAsIDAsIGFwcC53aWR0aCwgbmVnYXRpdmUgKiBhcHAuaGVpZ2h0IC8gMiB8IDApO1xuICBsYXllci5kcmF3SW1hZ2UobWFuYWdlci5zY3JlZW5zaG90LCAwLCBhcHAuaGVpZ2h0IC8gMiB8IDAsIGFwcC53aWR0aCwgYXBwLmhlaWdodCAvIDIgfCAwLCAwLCBhcHAuaGVpZ2h0IC8gMiArIHByb2dyZXNzICogYXBwLmhlaWdodCAvIDIgKyAxIHwgMCwgYXBwLndpZHRoLCBNYXRoLm1heCgxLCBuZWdhdGl2ZSAqIGFwcC5oZWlnaHQgKiAwLjUgfCAwKSk7XG5cbiAgbGF5ZXIucmVzdG9yZSgpO1xuXG59O1xuXG4vKiBmaWxlOiBzcmMvbGF5ZXIvTG9hZGluZ1NjcmVlbi5qcyAqL1xuXG5QTEFZR1JPVU5ELkxvYWRpbmdTY3JlZW4gPSB7XG5cbiAgbG9nb1JhdzogXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU5vQUFBQVNCQU1BQUFEUGlOMHhBQUFBR0ZCTVZFVUFBUUF0TGl4SFNVZG5hR2FKaW9pbXFLWE16c3Y3L2ZyNXNoZ1ZBQUFBQVdKTFIwUUFpQVVkU0FBQUFBbHdTRmx6QUFBTEV3QUFDeE1CQUpxY0dBQUFBQWQwU1UxRkI5OEVBd2tlQTRvUVdKNEFBQUFaZEVWWWRFTnZiVzFsYm5RQVEzSmxZWFJsWkNCM2FYUm9JRWRKVFZCWGdRNFhBQUFCOWtsRVFWUTR5NzJVdlcrck1CREF6K0ZycFZLcnJGbWVzbWFwV05PbHJLalNlMWtaK3VvVkF2aisvZnJ1akcxU2FKY3FKd1U3dm9PZjd4TVF6UW1zSURpNU5QVE1zTFJudEgzVStGNlNBWm8zTmxDdmNnQkZKejhvK3ZrRGlFNjNsSTk1WS9VbXBpbnNaV2tnSldKaURiQVZRMTZodHB0eFNUTmxvSWx1Z3dhdzAwMUV5M0FTRjNzbzZMMXFMTlh6UVM1UzBVR0tML0NJNXdXTnJpRTBVSDlZdHkzN0xxSVZnK3dzcXU3SXgwTXdWQlNGL2RVK2p2MlNObm1hMDIxTEVkUHFWbk1lVTN4QXUwa1hjU0dqbXE3T3g0RTJXbjg4TFoyK0VGajNhdmppeHphaTZWUFZ5dVl2ZVpMSEYyWGZkRG52QXEyN0RJSEd1cSswREpGc0UzME90QjFLcU93ZDhEcjdQY000YitqZmoyZzVscDRXeW50Qks2NnF1YTNKekVBK3VYSnB3SC9ObFZ1elJWUFkva1RMQjJtanVOK0t3ZFo4Rk95OGoyZ0RiRVVTcXVtblNDWTRsZjRpYnEzSWhWTTR5Y1pRUm52K3pGcVZkSlFWbjZCeHZVcWViR3B1YU5vM3NaeHdCemphamlNWk9vQml3eVZGK2tDcituVWFKT2FHcG5BZVJQUEpaVHI0RnFtSFJYY25lRW80RHFRL2Z0ZmRuTGVEclVBTUU4eFdLUGVLQ3dXNllrRXBYZnMzcDFFV0poZGNVQVlQMFRJL3VZYVY4Y2dqd0JvdmFleVd3amkyVDlyVEZJZFMvY1AvTW5rVExSVVd4Z05OWlZpbjdiVDVmcVQ5bWlEY1VWSnpSMWdScGZJT05NbXVsVSs1UXFyNnpYQVVxQUFBQUFCSlJVNUVya0pnZ2c9PVwiLFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmxvZ28gPSBuZXcgSW1hZ2U7XG5cbiAgICB0aGlzLmxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnJlYWR5ID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMubG9nby5zcmMgPSB0aGlzLmxvZ29SYXc7XG5cbiAgICB0aGlzLmJhY2tncm91bmQgPSBcIiMyODIyNDVcIjtcblxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuYmFja2dyb3VuZENvbG9yIHx8IFwiIzAwMFwiO1xuICAgIH1cblxuXG4gIH0sXG5cbiAgZW50ZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jdXJyZW50ID0gMDtcblxuICB9LFxuXG4gIGxlYXZlOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubG9ja2VkID0gdHJ1ZTtcblxuICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hcHAudHdlZW4odGhpcylcbiAgICAgIC50byh7XG4gICAgICAgIGN1cnJlbnQ6IDFcbiAgICAgIH0sIDAuNSk7XG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xuXG4gICAgaWYgKHRoaXMubG9ja2VkKSB7XG4gICAgICBpZiAodGhpcy5hbmltYXRpb24uZmluaXNoZWQpIHRoaXMubG9ja2VkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudCArIE1hdGguYWJzKHRoaXMuYXBwLmxvYWRlci5wcm9ncmVzcyAtIHRoaXMuY3VycmVudCkgKiBkZWx0YTtcbiAgICB9XG5cbiAgfSxcblxuICByZWFkeTogZnVuY3Rpb24oKSB7XG5cblxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoIXRoaXMucmVhZHkpIHJldHVybjtcblxuICAgIHRoaXMuYXBwLmxheWVyLmNsZWFyKHRoaXMuYmFja2dyb3VuZCk7XG5cbiAgICB0aGlzLmFwcC5sYXllci5maWxsU3R5bGUoXCIjZmZmXCIpO1xuXG4gICAgdGhpcy5hcHAubGF5ZXIuc2F2ZSgpO1xuICAgIHRoaXMuYXBwLmxheWVyLmFsaWduKDAuNSwgMC41KTtcbiAgICB0aGlzLmFwcC5sYXllci5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oXCJsaWdodGVyXCIpO1xuICAgIHRoaXMuYXBwLmxheWVyLmRyYXdJbWFnZSh0aGlzLmxvZ28sIHRoaXMuYXBwLmNlbnRlci54LCB0aGlzLmFwcC5jZW50ZXIueSk7XG5cbiAgICB2YXIgdyA9IHRoaXMuY3VycmVudCAqIHRoaXMubG9nby53aWR0aDtcblxuICAgIHRoaXMuYXBwLmxheWVyLmZpbGxTdHlsZShcIiNmZmZcIik7XG5cbiAgICB0aGlzLmFwcC5sYXllci5maWxsUmVjdCh0aGlzLmFwcC5jZW50ZXIueCwgdGhpcy5hcHAuY2VudGVyLnkgKyAzMiwgdywgMTIpO1xuICAgIHRoaXMuYXBwLmxheWVyLmZpbGxSZWN0KHRoaXMuYXBwLmNlbnRlci54LCB0aGlzLmFwcC5jZW50ZXIueSArIDMyLCB0aGlzLmxvZ28ud2lkdGgsIDQpO1xuXG4gICAgdGhpcy5hcHAubGF5ZXIucmVzdG9yZSgpO1xuXG4gIH1cblxufTsiLCIvKiBzY2FubGluZXMgcGx1Z2luIGZvciBwbGF5Z3JvdW5kJ3MgZGVmYXVsdCByZW5kZXJlciAqL1xuXG5QTEFZR1JPVU5ELlNjYW5saW5lcyA9IGZ1bmN0aW9uKGFwcCkge1xuXG4gIHRoaXMuYXBwID0gYXBwO1xuXG4gIGFwcC5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgYXBwLm9uKFwicG9zdHJlbmRlclwiLCB0aGlzLnBvc3RyZW5kZXIuYmluZCh0aGlzKSk7XG5cbn07XG5cblBMQVlHUk9VTkQuU2NhbmxpbmVzLnBsdWdpbiA9IHRydWU7XG5cblBMQVlHUk9VTkQuU2NhbmxpbmVzLnByb3RvdHlwZSA9IHtcblxuICByZXNpemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5pbWFnZSA9IGNxKHRoaXMuYXBwLndpZHRoLCB0aGlzLmFwcC5oZWlnaHQpO1xuXG4gICAgdGhpcy5pbWFnZS5nbG9iYWxBbHBoYSgwLjEpO1xuICAgIHRoaXMuaW1hZ2UuZmlsbFN0eWxlKFwiIzAwOFwiKTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGhpcy5pbWFnZS5jYW52YXMuaGVpZ2h0OyBpICs9IDgpe1xuICAgICAgXG4gICAgICB0aGlzLmltYWdlLmZpbGxSZWN0KDAsIGksIHRoaXMuaW1hZ2UuY2FudmFzLndpZHRoLCA0KTtcblxuICAgIH1cblxuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmltYWdlLmNhY2hlKCk7XG5cbiAgfSxcblxuICBwb3N0cmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgIGlmICh0aGlzLmltYWdlKSB7XG5cbiAgICAgIC8vIHRoaXMuYXBwLmxheWVyLmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLCAwKTtcblxuICAgIH1cblxuICB9XG5cbn07IiwiLypcblxuICBTb3VuZE9uRGVtYW5kIHIxXG5cbiAgKGMpIDIwMTItMjAxNSBodHRwOi8vcmV6b25lci5uZXRcblxuICBUaGlzIGxpYnJhcnkgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbiovXG5cbi8qIG9wdGlvbnMgKi9cblxuLyogb3V0cHV0OiBvdXRwdXQgbm9kZSwgZGVmYXVsdCAqL1xuLyogYXVkaW9Db250ZXh0OiBhdWRpb0NvbnRleHQgKi9cblxuU291bmRPbkRlbWFuZCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY2FuUGxheU1wMyA9IChuZXcgQXVkaW8pLmNhblBsYXlUeXBlKFwiYXVkaW8vbXAzXCIpO1xuICB2YXIgY2FuUGxheU9nZyA9IChuZXcgQXVkaW8pLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJyk7XG5cbiAgaWYgKHRoaXMucHJlZmVyZWRBdWRpb0Zvcm1hdCA9PT0gXCJtcDNcIikge1xuXG4gICAgaWYgKGNhblBsYXlNcDMpIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm1wM1wiO1xuICAgIGVsc2UgdGhpcy5hdWRpb0Zvcm1hdCA9IFwib2dnXCI7XG5cbiAgfSBlbHNlIHtcblxuICAgIGlmIChjYW5QbGF5T2dnKSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJvZ2dcIjtcbiAgICBlbHNlIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm1wM1wiO1xuXG4gIH1cblxuICBpZiAoIW9wdGlvbnMuYXVkaW9Db250ZXh0KSB7XG4gICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBkdXBsaWNhdGVkIEF1ZGlvQ29udGV4dCwgdXNlIG9wdGlvbnMuYXVkaW9Db250ZXh0Jyk7XG4gIH1cbiAgdGhpcy5hdWRpb0NvbnRleHQgPSBvcHRpb25zLmF1ZGlvQ29udGV4dCB8fCBuZXcgQXVkaW9Db250ZXh0O1xuXG4gIHRoaXMuY29tcHJlc3NvciA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpO1xuICB0aGlzLmNvbXByZXNzb3IuY29ubmVjdCh0aGlzLmF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG5cbiAgdGhpcy5nYWluTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb21wcmVzc29yKTtcblxuICB0aGlzLmlucHV0ID0gdGhpcy5nYWluTm9kZTtcblxuICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSAxLjA7XG5cbiAgdGhpcy5idWZmZXJzID0ge307XG5cbiAgdGhpcy5jaGFubmVscyA9IHt9O1xuICB0aGlzLmFsaWFzZXMgPSB7fTtcblxuICB2YXIgbGFzdFRpY2sgPSBEYXRlLm5vdygpO1xuICB2YXIgZW5naW5lID0gdGhpcztcblxuICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblxuICAgIHZhciBkZWx0YSA9IChEYXRlLm5vdygpIC0gbGFzdFRpY2spIC8gMTAwMDtcblxuICAgIGxhc3RUaWNrID0gRGF0ZS5ub3coKTtcblxuICAgIGVuZ2luZS5zdGVwKGRlbHRhKTtcblxuICB9LCAxMDAwIC8gNjApO1xuXG59O1xuXG5Tb3VuZE9uRGVtYW5kLm1vdmVUbyA9IGZ1bmN0aW9uKHZhbHVlLCB0YXJnZXQsIHN0ZXApIHtcblxuICBpZiAodmFsdWUgPCB0YXJnZXQpIHtcbiAgICB2YWx1ZSArPSBzdGVwO1xuICAgIGlmICh2YWx1ZSA+IHRhcmdldCkgdmFsdWUgPSB0YXJnZXQ7XG4gIH1cblxuICBpZiAodmFsdWUgPiB0YXJnZXQpIHtcbiAgICB2YWx1ZSAtPSBzdGVwO1xuICAgIGlmICh2YWx1ZSA8IHRhcmdldCkgdmFsdWUgPSB0YXJnZXQ7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG5cbn07XG5cblNvdW5kT25EZW1hbmQucHJvdG90eXBlID0ge1xuXG4gIGNvbnN0cnVjdG9yOiBTb3VuZE9uRGVtYW5kLFxuXG4gIHBhdGg6IFwic291bmRzL1wiLFxuXG4gIGNoYW5uZWw6IGZ1bmN0aW9uKG5hbWUpIHtcblxuICAgIGlmICghdGhpcy5jaGFubmVsc1tuYW1lXSkgdGhpcy5jaGFubmVsc1tuYW1lXSA9IG5ldyBTb3VuZE9uRGVtYW5kLkNoYW5uZWwodGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcy5jaGFubmVsc1tuYW1lXTtcblxuICB9LFxuXG4gIGdldEFzc2V0RW50cnk6IGZ1bmN0aW9uKHBhdGgsIGRlZmF1bHRFeHRlbnNpb24pIHtcblxuICAgIC8qIHRyYW5zbGF0ZSBmb2xkZXIgYWNjb3JkaW5nIHRvIHVzZXIgcHJvdmlkZWQgcGF0aHNcbiAgICAgICBvciBsZWF2ZSBhcyBpcyAqL1xuXG4gICAgdmFyIGZpbGVpbmZvID0gcGF0aC5tYXRjaCgvKC4qKVxcLi4qLyk7XG4gICAgdmFyIGtleSA9IGZpbGVpbmZvID8gZmlsZWluZm9bMV0gOiBwYXRoO1xuXG4gICAgdmFyIHRlbXAgPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIgYmFzZW5hbWUgPSBwYXRoO1xuXG4gICAgaWYgKHRlbXAubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGV4dCA9IHRlbXAucG9wKCk7XG4gICAgICBwYXRoID0gdGVtcC5qb2luKFwiLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV4dCA9IGRlZmF1bHRFeHRlbnNpb247XG4gICAgICBiYXNlbmFtZSArPSBcIi5cIiArIGRlZmF1bHRFeHRlbnNpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleToga2V5LFxuICAgICAgdXJsOiB0aGlzLnBhdGggKyBiYXNlbmFtZSxcbiAgICAgIHBhdGg6IHRoaXMucGF0aCArIHBhdGgsXG4gICAgICBleHQ6IGV4dFxuICAgIH07XG5cbiAgfSxcblxuICBsb2FkZXJzOiB7fSxcblxuICBsb2FkOiBmdW5jdGlvbihrZXkpIHtcblxuICAgIHZhciBlbmdpbmUgPSB0aGlzO1xuICAgIHZhciBlbnRyeSA9IGVuZ2luZS5nZXRBc3NldEVudHJ5KGtleSwgZW5naW5lLmF1ZGlvRm9ybWF0KTtcblxuICAgIGlmICghdGhpcy5sb2FkZXJzW2tleV0pIHtcblxuICAgICAgdGhpcy5sb2FkZXJzW2tleV0gPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICBpZiAoZW5naW5lLmJ1ZmZlcnNbZW50cnkua2V5XSkgcmV0dXJuIHJlc29sdmUoZW5naW5lLmJ1ZmZlcnNbZW50cnkua2V5XSk7XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgZW50cnkudXJsLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG5cbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbmdpbmUuYXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YSh0aGlzLnJlc3BvbnNlLCBmdW5jdGlvbihkZWNvZGVkQnVmZmVyKSB7XG5cbiAgICAgICAgICAgIGVuZ2luZS5idWZmZXJzW2VudHJ5LmtleV0gPSBkZWNvZGVkQnVmZmVyO1xuICAgICAgICAgICAgcmVzb2x2ZShkZWNvZGVkQnVmZmVyKTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkZXJzW2tleV07XG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuY2hhbm5lbHMpIHtcblxuICAgICAgdGhpcy5jaGFubmVsc1trZXldLnN0ZXAoZGVsdGEpO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgZHVwbGljYXRlOiBmdW5jdGlvbihzb3VyY2UsIGFzLCB2b2x1bWUsIHJhdGUpIHtcblxuICAgIHZhciBlbmdpbmUgPSB0aGlzO1xuXG4gICAgdGhpcy5sb2FkKHNvdXJjZSkudGhlbihmdW5jdGlvbigpIHtcblxuICAgICAgZW5naW5lLmJ1ZmZlcnNbc291cmNlXTtcblxuICAgICAgZW5naW5lLmJ1ZmZlcnNbYXNdID0gZW5naW5lLmJ1ZmZlcnNbc291cmNlXTtcblxuICAgIH0pO1xuXG4gIH0sXG5cbiAgYWxpYXM6IGZ1bmN0aW9uKG5hbWUsIHNvdXJjZSwgcmF0ZSwgdm9sdW1lKSB7XG5cbiAgICB0aGlzLmFsaWFzZXNbbmFtZV0gPSB7XG4gICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgIHJhdGU6IHJhdGUsXG4gICAgICB2b2x1bWU6IHZvbHVtZVxuICAgIH07XG5cbiAgfVxuXG59O1xuU291bmRPbkRlbWFuZC5FdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuXG59O1xuXG5Tb3VuZE9uRGVtYW5kLkV2ZW50cy5wcm90b3R5cGUgPSB7XG5cbiAgb246IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuXG4gICAgaWYgKHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgZm9yICh2YXIga2V5IGluIGV2ZW50KSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5vbihrZXksIGV2ZW50W2tleV0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB0aGlzLmxpc3RlbmVyc1tldmVudF0gPSBbXTtcblxuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcblxuICAgIHJldHVybiBjYWxsYmFjaztcbiAgfSxcblxuICBvbmNlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcblxuICAgIGNhbGxiYWNrLm9uY2UgPSB0cnVlO1xuXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudF0pIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuXG4gICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrO1xuXG4gIH0sXG5cbiAgb2ZmOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxpc3RlbmVyc1tldmVudF0ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF1baV0uX3JlbW92ZSkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uc3BsaWNlKGktLSwgMSk7XG4gICAgICAgIGxlbi0tO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XG5cbiAgICAvKiBpZiB5b3UgcHJlZmVyIGV2ZW50cyBwaXBlICovXG5cbiAgICBpZiAodGhpcy5saXN0ZW5lcnNbXCJldmVudFwiXSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW1wiZXZlbnRcIl0ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbXCJldmVudFwiXVtpXShldmVudCwgZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogb3Igc3Vic2NyaWJlZCB0byBzaW5nbGUgZXZlbnQgKi9cblxuICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxpc3RlbmVyc1tldmVudF0ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdW2ldO1xuICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGRhdGEpO1xuXG4gICAgICAgIGlmIChsaXN0ZW5lci5vbmNlKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnNwbGljZShpLS0sIDEpO1xuICAgICAgICAgIGxlbi0tO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufTtcblNvdW5kT25EZW1hbmQuQ2hhbm5lbCA9IGZ1bmN0aW9uKGVuZ2luZSkge1xuXG4gIHRoaXMuZW5naW5lID0gZW5naW5lO1xuICB0aGlzLmF1ZGlvQ29udGV4dCA9IGVuZ2luZS5hdWRpb0NvbnRleHQ7XG5cbiAgLyogY29ubmVjdGlvbiBvcmRlciBnb2VzIGZyb20gYm90dG9tIHRvIHRvcCAqL1xuXG4gIC8qIGdhaW4gbm9kZSAqL1xuXG4gIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cbiAgLyogY29udm9sdmVyICovXG5cbiAgdGhpcy5jb252b2x2ZXJXZXROb2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICB0aGlzLmNvbnZvbHZlckRyeU5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gIHRoaXMuY29udm9sdmVyTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpO1xuICB0aGlzLmNvbnZvbHZlckVuYWJsZWQgPSBmYWxzZTtcblxuICB0aGlzLnJvdXRlKCk7XG5cbiAgdGhpcy5xdWV1ZSA9IFtdO1xuICB0aGlzLmxvb3BzID0gW107XG5cbn07XG5cblNvdW5kT25EZW1hbmQuQ2hhbm5lbC5wcm90b3R5cGUgPSB7XG5cbiAgY29uc3RydWN0b3I6IFNvdW5kT25EZW1hbmQuQ2hhbm5lbCxcblxuICAvKiBnZXQgYSBzb3VuZCBmb3IgZnVydGhlciB1c2FnZSAqL1xuXG4gIHhyb3V0ZTogZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50Um91dGUpIHtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRSb3V0ZS5sZW5ndGggLSAxOyBpKyspIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRSb3V0ZVtpXS5kaXNjb25uZWN0KCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFJvdXRlID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICBpZiAoaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxKSB7XG5cbiAgICAgICAgdmFyIG5vZGUgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgICAgbm9kZS5jb25uZWN0KGFyZ3VtZW50c1tpICsgMV0pO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudFJvdXRlLnB1c2gobm9kZSk7XG5cbiAgICB9XG5cbiAgICB0aGlzLmlucHV0ID0gYXJndW1lbnRzWzBdO1xuXG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcblxuICAgIHJldHVybiBuZXcgU291bmRPbkRlbWFuZC5Tb3VuZChrZXksIHRoaXMpO1xuXG4gIH0sXG5cbiAgcGxheTogZnVuY3Rpb24oa2V5KSB7XG5cbiAgICB2YXIgc291bmQgPSB0aGlzLmdldChrZXkpO1xuXG4gICAgdGhpcy5hZGQoc291bmQpO1xuXG4gICAgcmV0dXJuIHNvdW5kO1xuXG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbihzb3VuZCkge1xuXG4gICAgc291bmQuX3JlbW92ZSA9IHRydWU7XG5cbiAgfSxcblxuICBhZGQ6IGZ1bmN0aW9uKHNvdW5kKSB7XG5cbiAgICBzb3VuZC5fcmVtb3ZlID0gZmFsc2U7XG5cbiAgICB0aGlzLnF1ZXVlLnB1c2goc291bmQpO1xuXG4gIH0sXG5cbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcblxuICAgIC8qIHByb2Nlc3MgcXVldWUgKi9cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWV1ZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgc291bmQgPSB0aGlzLnF1ZXVlW2ldO1xuXG4gICAgICBzb3VuZC5zdGVwKGRlbHRhKTtcblxuICAgICAgaWYgKHNvdW5kLl9yZW1vdmUpIHRoaXMucXVldWUuc3BsaWNlKGktLSwgMSk7XG5cbiAgICB9XG5cbiAgICAvKiBwcm9jZXNzIHNvdW5kcyBiZWluZyBwbGF5ZWQgKi9cblxuICB9LFxuXG4gIHZvbHVtZTogZnVuY3Rpb24odmFsdWUpIHtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cbiAgICAgIHRoaXMuZ2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWU7XG5cbiAgICB9XG5cbiAgfSxcblxuICBzd2FwQ29udm9sdmVyOiBmdW5jdGlvbihrZXkpIHtcblxuICAgIHZhciBlbmdpbmUgPSB0aGlzLmVuZ2luZTtcbiAgICB2YXIgY2hhbm5lbCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgZmFpbCkge1xuXG4gICAgICBpZiAoY2hhbm5lbC5jdXJyZW50Q29udm9sdmVySW1wdWxzZSA9PT0ga2V5KSB7XG5cbiAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGVuZ2luZS5sb2FkKGtleSkudGhlbihmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgICBjaGFubmVsLmN1cnJlbnRDb252b2x2ZXJJbXB1bHNlID0ga2V5O1xuICAgICAgICAgIGNoYW5uZWwuY29udm9sdmVyTm9kZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfSxcblxuICB1cGRhdGVDb252b3ZsZXJTdGF0ZTogZnVuY3Rpb24oZW5hYmxlZCkge1xuXG4gICAgdGhpcy5jb252b2x2ZXJFbmFibGVkID0gZW5hYmxlZDtcbiAgICB0aGlzLnJvdXRlKCk7XG5cbiAgfSxcblxuICBzdWJyb3V0ZTogZnVuY3Rpb24obm9kZXMpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgaWYgKGkgPCBub2Rlcy5sZW5ndGggLSAxKSB7XG5cbiAgICAgICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgbm9kZS5kaXNjb25uZWN0KCk7XG4gICAgICAgIG5vZGUuY29ubmVjdChub2Rlc1tpICsgMV0pO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmlucHV0ID0gbm9kZXNbMF07XG5cbiAgfSxcblxuICByb3V0ZTogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdhaW5Ob2RlLmRpc2Nvbm5lY3QoKTtcblxuICAgIGlmICh0aGlzLmNvbnZvbHZlckVuYWJsZWQpIHtcblxuICAgICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udm9sdmVyRHJ5Tm9kZSk7XG5cbiAgICAgIHRoaXMuZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLmNvbnZvbHZlck5vZGUpO1xuICAgICAgdGhpcy5jb252b2x2ZXJOb2RlLmNvbm5lY3QodGhpcy5jb252b2x2ZXJXZXROb2RlKTtcblxuICAgICAgdGhpcy5jb252b2x2ZXJXZXROb2RlLmNvbm5lY3QodGhpcy5lbmdpbmUuaW5wdXQpO1xuICAgICAgdGhpcy5jb252b2x2ZXJEcnlOb2RlLmNvbm5lY3QodGhpcy5lbmdpbmUuaW5wdXQpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuZW5naW5lLmlucHV0KTtcblxuICAgIH1cblxuICAgIHRoaXMuaW5wdXQgPSB0aGlzLmdhaW5Ob2RlO1xuXG4gIH0sXG5cbiAgY29udm9sdmVyOiBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG5cbiAgICB2YXIgZW5hYmxlZCA9IHZhbHVlID4gMDtcbiAgICB2YXIgY2hhbm5lbCA9IHRoaXM7XG5cbiAgICB0aGlzLnN3YXBDb252b2x2ZXIoa2V5KS50aGVuKGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoZW5hYmxlZCAhPT0gY2hhbm5lbC5jb252b2x2ZXJFbmFibGVkKSBjaGFubmVsLnVwZGF0ZUNvbnZvdmxlclN0YXRlKGVuYWJsZWQpO1xuXG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbnZvbHZlcldldE5vZGUuZ2Fpbi52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuY29udm9sdmVyRHJ5Tm9kZS5nYWluLnZhbHVlID0gMSAtIHZhbHVlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG59O1xuU291bmRPbkRlbWFuZC5Tb3VuZCA9IGZ1bmN0aW9uKGtleSwgY2hhbm5lbCkge1xuXG4gIHRoaXMua2V5ID0ga2V5O1xuICB0aGlzLmJ1ZmZlcktleSA9IGtleTtcblxuICBpZiAoY2hhbm5lbC5lbmdpbmUuYWxpYXNlc1trZXldKSB7XG5cbiAgICB0aGlzLmFsaWFzID0gY2hhbm5lbC5lbmdpbmUuYWxpYXNlc1trZXldO1xuXG4gICAgdGhpcy5idWZmZXJLZXkgPSB0aGlzLmFsaWFzLnNvdXJjZTtcblxuICB9XG5cbiAgaWYgKCFjaGFubmVsLmVuZ2luZS5idWZmZXJzW3RoaXMuYnVmZmVyS2V5XSkgY2hhbm5lbC5lbmdpbmUubG9hZCh0aGlzLmJ1ZmZlcktleSk7XG5cbiAgdGhpcy5jaGFubmVsID0gY2hhbm5lbDtcbiAgdGhpcy5hdWRpb0NvbnRleHQgPSB0aGlzLmNoYW5uZWwuZW5naW5lLmF1ZGlvQ29udGV4dDtcblxuICB0aGlzLmN1cnJlbnQgPSB7XG4gICAgdm9sdW1lOiAxLjAsXG4gICAgcmF0ZTogMS4wXG4gIH07XG5cbiAgdGhpcy5mYWRlTW9kID0gMS4wO1xuXG4gIHRoaXMuY3JlYXRlTm9kZXMoKTtcblxufTtcblxuU291bmRPbkRlbWFuZC5Tb3VuZC5wcm90b3R5cGUgPSB7XG5cbiAgY29uc3RydWN0b3I6IFNvdW5kT25EZW1hbmQuU291bmQsXG5cbiAgYWxpYXM6IHtcbiAgICB2b2x1bWU6IDEuMCxcbiAgICByYXRlOiAxLjBcbiAgfSxcblxuICBjcmVhdGVOb2RlczogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYnVmZmVyU291cmNlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgdmFyIGdhaW5Ob2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIHZhciBwYW5Ob2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlU3RlcmVvUGFubmVyKCk7XG5cbiAgICBidWZmZXJTb3VyY2UuY29ubmVjdChwYW5Ob2RlKTtcbiAgICBwYW5Ob2RlLmNvbm5lY3QoZ2Fpbk5vZGUpO1xuICAgIGdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jaGFubmVsLmlucHV0KTtcblxuICAgIHRoaXMuYnVmZmVyU291cmNlID0gYnVmZmVyU291cmNlO1xuICAgIHRoaXMuZ2Fpbk5vZGUgPSBnYWluTm9kZTtcbiAgICB0aGlzLnBhbk5vZGUgPSBwYW5Ob2RlO1xuXG4gIH0sXG5cbiAgdm9sdW1lOiBmdW5jdGlvbih2b2x1bWUpIHtcblxuICAgIHZvbHVtZSAqPSB0aGlzLmFsaWFzLnZvbHVtZTtcblxuICAgIHRoaXMuY3VycmVudC52b2x1bWUgPSB2b2x1bWU7XG5cbiAgICB0aGlzLnVwZGF0ZVZvbHVtZSgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICB1cGRhdGVWb2x1bWU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gdGhpcy5jdXJyZW50LnZvbHVtZSAqIHRoaXMuZmFkZU1vZDtcblxuICB9LFxuXG4gIHBhbjogZnVuY3Rpb24ocGFuKSB7XG5cbiAgICB0aGlzLmN1cnJlbnQucGFuID0gcGFuO1xuXG4gICAgdGhpcy51cGRhdGVQYW5uaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9LFxuXG4gIHVwZGF0ZVBhbm5pbmc6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5wYW5Ob2RlLnBhbi52YWx1ZSA9IHRoaXMuY3VycmVudC5wYW47XG5cbiAgfSxcblxuICBsb29wOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuYnVmZmVyU291cmNlLmxvb3AgPSB0cnVlO1xuICAgIHRoaXMuY3VycmVudC5sb29wID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgcnJhdGU6IGZ1bmN0aW9uKHJhbmdlKSB7XG5cbiAgICByZXR1cm4gdGhpcy5yYXRlKHRoaXMuY3VycmVudC5yYXRlICsgKC0xICsgTWF0aC5yYW5kb20oKSAqIDIpICogcmFuZ2UpO1xuXG4gIH0sXG5cbiAgcmF0ZTogZnVuY3Rpb24ocmF0ZSkge1xuXG4gICAgcmF0ZSAqPSB0aGlzLmFsaWFzLnJhdGU7XG5cbiAgICB0aGlzLmJ1ZmZlclNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWUgPSByYXRlO1xuXG4gICAgdGhpcy5jdXJyZW50LnJhdGUgPSByYXRlO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICBvbmVuZGVkOiBmdW5jdGlvbigpIHtcblxuICAgIGlmICghdGhpcy5jdXJyZW50Lmxvb3ApIHRoaXMuc3RvcCgpO1xuXG4gIH0sXG5cbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcblxuICAgIGlmICghdGhpcy5yZWFkeSkge1xuXG4gICAgICBpZiAoIXRoaXMuY2hhbm5lbC5lbmdpbmUuYnVmZmVyc1t0aGlzLmJ1ZmZlcktleV0pIHJldHVybjtcblxuICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuXG4gICAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuY2hhbm5lbC5lbmdpbmUuYnVmZmVyc1t0aGlzLmJ1ZmZlcktleV07XG5cbiAgICAgIHRoaXMuYnVmZmVyU291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuXG4gICAgICB0aGlzLmJ1ZmZlclNvdXJjZS5zdGFydCgwKTtcbiAgICAgIHRoaXMuYnVmZmVyU291cmNlLm9uZW5kZWQgPSB0aGlzLm9uZW5kZWQuYmluZCh0aGlzKTtcblxuICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XG5cbiAgICAgIHRoaXMuY3VycmVudFRpbWUgKz0gdGhpcy5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlICogZGVsdGE7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmFkZVRhcmdldCAhPT0gdGhpcy5mYWRlTW9kKSB7XG5cbiAgICAgIHRoaXMuZmFkZU1vZCA9IFNvdW5kT25EZW1hbmQubW92ZVRvKHRoaXMuZmFkZU1vZCwgdGhpcy5mYWRlVGFyZ2V0LCBkZWx0YSAqIHRoaXMuZmFkZVNwZWVkKTtcblxuICAgICAgdGhpcy51cGRhdGVWb2x1bWUoKTtcblxuICAgIH0gZWxzZSBpZiAodGhpcy5mYWRlVGFyZ2V0ID09PSAwKSB7XG5cbiAgICAgIHRoaXMucGF1c2UoKTtcblxuICAgIH1cblxuXG5cbiAgfSxcblxuICBwYXVzZTogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoYW5uZWwucmVtb3ZlKHRoaXMpO1xuXG4gICAgdGhpcy5idWZmZXJTb3VyY2Uuc3RvcCgwKTtcblxuICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xuXG4gIH0sXG5cbiAgc3RvcDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoYW5uZWwucmVtb3ZlKHRoaXMpO1xuXG4gICAgdGhpcy5idWZmZXJTb3VyY2Uuc3RvcCgwKTtcblxuICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xuXG4gIH0sXG5cbiAgcmVzdW1lOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY3JlYXRlTm9kZXMoKTtcblxuICAgIHRoaXMuYnVmZmVyU291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuXG4gICAgdGhpcy5jdXJyZW50VGltZSA9IHRoaXMuY3VycmVudFRpbWUgJSB0aGlzLmJ1ZmZlci5kdXJhdGlvbjtcbiAgICB0aGlzLmJ1ZmZlclNvdXJjZS5zdGFydCgwLCB0aGlzLmN1cnJlbnRUaW1lKTtcblxuICAgIHRoaXMucmF0ZSh0aGlzLmN1cnJlbnQucmF0ZSk7XG4gICAgdGhpcy52b2x1bWUodGhpcy5jdXJyZW50LnZvbHVtZSk7XG4gICAgdGhpcy5sb29wKHRoaXMuY3VycmVudC5sb29wKTtcblxuICAgIHRoaXMuY2hhbm5lbC5hZGQodGhpcyk7XG5cbiAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuXG4gIH0sXG5cbiAgZmFkZVRvOiBmdW5jdGlvbih0YXJnZXQsIGR1cmF0aW9uKSB7XG5cbiAgICBpZiAoIXRoaXMucGxheWluZyAmJiB0aGlzLnJlYWR5KSB0aGlzLnJlc3VtZSgpO1xuXG4gICAgZHVyYXRpb24gPSBkdXJhdGlvbiB8fCAxLjA7XG5cbiAgICB0aGlzLmZhZGVUaW1lID0gMDtcbiAgICB0aGlzLmZhZGVUYXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5mYWRlRHVyYXRpb24gPSBkdXJhdGlvbjtcblxuICAgIHRoaXMuZmFkZVNwZWVkID0gTWF0aC5hYnModGFyZ2V0IC0gdGhpcy5mYWRlTW9kKSAvIGR1cmF0aW9uO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfSxcblxuICBmYWRlSW46IGZ1bmN0aW9uKGR1cmF0aW9uKSB7XG5cbiAgICBpZiAoIXRoaXMucGxheWluZyAmJiB0aGlzLnJlYWR5KSB0aGlzLnJlc3VtZSgpO1xuXG4gICAgdGhpcy5mYWRlTW9kID0gMDtcbiAgICB0aGlzLmZhZGVUbygxLjAsIGR1cmF0aW9uKTtcblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH0sXG5cbiAgZmFkZU91dDogZnVuY3Rpb24oZHVyYXRpb24pIHtcblxuICAgIHRoaXMuZmFkZVRvKDAsIGR1cmF0aW9uIHx8IDEuMCk7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9LFxuXG5cblxufTtcblxuUExBWUdST1VORC5Tb3VuZE9uRGVtYW5kID0gZnVuY3Rpb24oYXBwKSB7XG4gIGFwcC5hdWRpbyA9IG5ldyBTb3VuZE9uRGVtYW5kKHtcbiAgICBhdWRpb0NvbnRleHQ6IGFwcC5hdWRpb0NvbnRleHRcbiAgfSk7XG5cbiAgYXBwLmF1ZGlvLnBhdGggPSBhcHAuZ2V0UGF0aChcInNvdW5kc1wiKTtcblxuICBhcHAubG9hZFNvdW5kcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgdGhpcy5sb2FkZXIuYWRkKCk7XG5cbiAgICAgIHRoaXMuYXVkaW8ubG9hZChrZXkpLnRoZW4oXG4gICAgICAgIHRoaXMubG9hZGVyLnN1Y2Nlc3MuYmluZCh0aGlzLmxvYWRlciksXG4gICAgICAgIHRoaXMubG9hZGVyLmVycm9yLmJpbmQodGhpcy5sb2FkZXIpXG4gICAgICApO1xuXG4gICAgfVxuXG4gIH07XG5cbn07XG5cblBMQVlHUk9VTkQuU291bmRPbkRlbWFuZC5wbHVnaW4gPSB0cnVlOyIsIkVOR0lORSA9IHsgfTsiLCJFTkdJTkUuQmVuY2htYXJrID0ge1xuXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLm11c2ljID0gYXBwLm11c2ljLnBsYXkoXCJnYW1lb3ZlclwiKS5mYWRlSW4oNCkubG9vcCgpO1xuXG4gICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuXG4gICAgLy8gdGhpcy5ncmFkaWVudCA9IGFwcC5sYXllci5jcmVhdGVSYWRpYWxHcmFkaWVudChhcHAuY2VudGVyLngsIGFwcC5jZW50ZXIueSwgMCwgYXBwLmNlbnRlci54LCBhcHAuY2VudGVyLnksIGFwcC5jZW50ZXIueCk7XG4gICAgLy8gdGhpcy5ncmFkaWVudC5hZGRDb2xvclN0b3AoMC4wLCBcInRyYW5zcGFyZW50XCIpO1xuICAgIC8vIHRoaXMuZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMCwgXCIjMDAwXCIpO1xuXG4gICAgLy8gSklUIHdhcm11cFxuICAgIHRoaXMuZGlkV2FybXVwID0gZmFsc2U7XG4gICAgdGhpcy5zdGVwcyA9IDA7XG4gICAgdGhpcy5pb3RhTGlzdCA9IFtdO1xuICAgIHRoaXMuZnJhbWVUaW1lcyA9IFtdO1xuICAgIHRoaXMuc2NvcmVzID0gW107XG4gICAgdGhpcy5ydW5Db3VudCA9IDA7XG4gICAgdGhpcy5za2lwQ291bnQgPSAwO1xuICAgIHRoaXMuc2tpcFJlc2V0Q291bnQgPSAwO1xuICAgIHRoaXMucmVzZXRDb3VudCA9IDA7XG4gICAgdGhpcy5zY29yZVN0YWNrID0gW107XG4gICAgdGhpcy5mcmFtZVRpbWUgPSAwLjA7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICB9LFxuXG5cbiAgcG9pbnRlcmRvd246IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXMucmVhZHkpIHtcbiAgICAgIGlmICh3aW5kb3cuZ2EpIHtcbiAgICAgICAgZ2EoJ3NlbmQnLCB7XG4gICAgICAgICAgJ2hpdFR5cGUnOiAnZXZlbnQnLFxuICAgICAgICAgICdldmVudENhdGVnb3J5JzogJ2dhbWUnLFxuICAgICAgICAgICdldmVudEFjdGlvbic6ICdzdGFydCdcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubXVzaWMuZmFkZU91dCgpO1xuXG4gICAgICBhcHAuc2V0U3RhdGUoRU5HSU5FLkdhbWUpO1xuICAgIH1cblxuICB9LFxuXG4gIGVudGVyOiBmdW5jdGlvbigpIHtcbiAgICBpZiAod2luZG93LmdhKSB7XG4gICAgICBnYSgnc2VuZCcsICdzY3JlZW52aWV3Jywge1xuICAgICAgICAnYXBwTmFtZSc6ICdQb3dlclN1cmdlJyxcbiAgICAgICAgJ3NjcmVlbk5hbWUnOiAnU3BsYXNocGFnZSdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc3RhcnRNb2QgPSAwO1xuXG4gICAgdGhpcy5pb3RhQ291bnQgPSB0aGlzLmFwcC5iYXNlbGluZSA/IE1hdGguZmxvb3IodGhpcy5hcHAuYmFzZWxpbmUgKiAwLjcpIDogMTtcblxuICAgIHRoaXMuYXBwLmJhc2VsaW5lID0gMDtcblxuICAgIHRoaXMucmVzZXQoKTtcblxuICB9LFxuXG4gIC8vIENhbGxlZCBiZXR3ZWVuIGJlbmNobWFyayBsb29wc1xuICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGVwcyA9IDA7XG4gICAgdGhpcy5mcmFtZVRpbWVzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5za2lwQ291bnQgPSAwO1xuICAgIC8vIEpJVCB3YXJtdXAgc2V0dGluZ3MgKHJ1biB1bmJvdW5kIGxvb3BzKVxuICAgIGlmICghdGhpcy5kaWRXYXJtdXApIHtcbiAgICAgIC8vIGNvbnNvbGUudGltZSgnV2FybXVwJyk7XG4gICAgICB0aGlzLmFwcC51bmJvdW5kID0gdHJ1ZTtcbiAgICAgIHRoaXMuYXBwLmltbWlkaWF0ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcC51bmJvdW5kID0gZmFsc2U7XG4gICAgICB0aGlzLmFwcC5pbW1pZGlhdGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5pb3RhTGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5hZGRJb3Rhcyh0aGlzLmRpZFdhcm11cCA/IHRoaXMuaW90YUNvdW50IDogMSk7XG4gICAgfVxuICB9LFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XG4gICAgaWYgKHRoaXMucmVhZHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYmVmb3JlID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICB0aGlzLmlvdGFMaXN0LmZvckVhY2goZnVuY3Rpb24oaW90YSkge1xuICAgICAgaW90YS5zdGVwKGR0KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZnJhbWVUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLSBiZWZvcmU7XG5cbiAgICBpZiAoIXRoaXMuZGlkV2FybXVwKSB7XG4gICAgICAvLyBTdGF0ZTogSklUIFdhcm11cFxuICAgICAgdGhpcy5zdGVwV2FybVVwKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZyYW1lVGltZSkge1xuICAgICAgLy8gU3RyZXNzdGVzdGluZ1xuICAgICAgdGhpcy5zdGVwU3RyZXNzVGVzdCgpXG4gICAgfVxuXG4gIH0sXG5cbiAgc3RlcFdhcm1VcDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLnN0ZXBzKys7XG5cbiAgICBpZiAodGhpcy5zdGVwcyA+IDExMDApIHtcbiAgICAgIHRoaXMuZGlkV2FybXVwID0gdHJ1ZTtcbiAgICAgIC8vIGNvbnNvbGUudGltZUVuZCgnV2FybXVwJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnV2FybXVwIHdpdGggJWQgaW90YXMnLCB0aGlzLmlvdGFMaXN0Lmxlbmd0aCk7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICB9LFxuXG4gIHN0ZXBTdHJlc3NUZXN0OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYWRkID0gMTtcbiAgICB2YXIgZnJhbWVUaW1lcyA9IHRoaXMuZnJhbWVUaW1lcztcbiAgICB2YXIgTUFYX0ZSQU1FUyA9IDQ1O1xuICAgIHZhciBNSU5fRlJBTUVTID0gMTU7XG4gICAgdmFyIENPU1QgPSA4O1xuICAgIHZhciBFUlJPUiA9IDAuMjU7XG4gICAgdmFyIGZyYW1lVGltZSA9IHRoaXMuZnJhbWVUaW1lO1xuICAgIGlmIChmcmFtZVRpbWVzLnVuc2hpZnQoZnJhbWVUaW1lKSA+IE1BWF9GUkFNRVMpIHtcbiAgICAgIGZyYW1lVGltZXMubGVuZ3RoID0gTUFYX0ZSQU1FUztcbiAgICB9XG4gICAgaWYgKGZyYW1lVGltZXMubGVuZ3RoID49IE1JTl9GUkFNRVMpIHtcbiAgICAgIHZhciBzYW1wbGUgPSB0aGlzLmFuYWx5emUoZnJhbWVUaW1lcyk7XG4gICAgICB2YXIgc2NvcmUgPSB0aGlzLmlvdGFMaXN0Lmxlbmd0aDtcbiAgICAgIGlmIChzYW1wbGUucnNlIDw9IEVSUk9SICYmIHNhbXBsZS5tZWFuID4gQ09TVCkge1xuICAgICAgICB0aGlzLnB1c2hTY29yZShzY29yZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChzYW1wbGUucnNlID4gRVJST1IgfHwgc2FtcGxlLm1lYW4gPiBDT1NUKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdTa2lwICMnICsgdGhpcy5za2lwQ291bnQpO1xuICAgICAgICB0aGlzLnNraXBDb3VudCsrO1xuICAgICAgICBpZiAodGhpcy5za2lwQ291bnQgPiA2MCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgJ1tSRVNFVCBTVEVQXSBIaWdoIHNhbXBsaW5nIGVycm9yICVmJSUgb3IgbWVhbiAlZm1zIGZvciAlZCBlbnRpdGllcy4nLFxuICAgICAgICAgICAgc2FtcGxlLnJzZSAqIDEwMCwgc2FtcGxlLm1lYW4sIHNjb3JlXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmlvdGFDb3VudCA9IE1hdGguZmxvb3IodGhpcy5sYXN0U2NvcmUgKiAwLjcpO1xuICAgICAgICAgIHRoaXMuc2tpcFJlc2V0Q291bnQrKztcbiAgICAgICAgICBpZiAodGhpcy5za2lwUmVzZXRDb3VudCA+IDEwKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmFsaXplKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5maW5hbGl6ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNraXBDb3VudCA9IDA7XG4gICAgICBhZGQgPSBNYXRoLnJvdW5kKENPU1QgLyBzYW1wbGUubWVhbik7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRJb3RhcyhhZGQpO1xuICB9LFxuXG4gIHB1c2hTY29yZTogZnVuY3Rpb24oc2NvcmUpIHtcbiAgICB2YXIgU0FWRV9TQ09SRVMgPSAzO1xuICAgIHZhciBNSU5fU0NPUkVTID0gNTtcbiAgICB2YXIgTUFYX1NDT1JFUyA9IDEwO1xuICAgIHZhciBFUlJPUiA9IDAuMTU7XG5cbiAgICB0aGlzLnNraXBSZXNldENvdW50ID0gMDtcbiAgICB2YXIgc2NvcmVzID0gdGhpcy5zY29yZXM7XG4gICAgdGhpcy5ydW5Db3VudCsrO1xuICAgIGlmIChzY29yZXMudW5zaGlmdChzY29yZSkgPiBNQVhfU0NPUkVTKSB7XG4gICAgICBzY29yZXMubGVuZ3RoID0gTUFYX1NDT1JFUztcbiAgICB9XG4gICAgdGhpcy5pb3RhQ291bnQgPSBNYXRoLmNlaWwoc2NvcmUgKiAwLjcpO1xuICAgIHZhciBsID0gc2NvcmVzLmxlbmd0aDtcbiAgICBpZiAobCA+PSBNSU5fU0NPUkVTKSB7XG4gICAgICB2YXIgc2FtcGxlID0gdGhpcy5hbmFseXplKHNjb3Jlcyk7XG4gICAgICBpZiAoc2FtcGxlLnJzZSA8IEVSUk9SKSB7XG4gICAgICAgIHRoaXMucmVzZXRDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuYXBwLmJhc2VsaW5lID0gTWF0aC5yb3VuZChzYW1wbGUubWVhbik7XG4gICAgICAgIGlmICh3aW5kb3cuZ2EpIHtcbiAgICAgICAgICBnYSgnc2VuZCcsIHtcbiAgICAgICAgICAgICdoaXRUeXBlJzogJ2V2ZW50JyxcbiAgICAgICAgICAgICdldmVudENhdGVnb3J5JzogJ2dhbWUnLFxuICAgICAgICAgICAgJ2V2ZW50QWN0aW9uJzogJ2Jhc2VsaW5lZCcsXG4gICAgICAgICAgICAnZXZlbnRWYWx1ZSc6IHRoaXMuYXBwLmJhc2VsaW5lLFxuICAgICAgICAgICAgJ25vbkludGVyYWN0aW9uJzogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwLmJhc2VsaW5lRXJyID0gc2FtcGxlLnJzZTtcbiAgICAgICAgdGhpcy5zY29yZXMuc3BsaWNlKFNBVkVfU0NPUkVTKTtcbiAgICAgICAgdGhpcy5maW5hbGl6ZShmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICdbU0NPUkUgUkVTRVRdIFN0YW5kYXJkIGVycm9yICVmJSUgdG9vIGhpZ2ggaW4gc2NvcmUgc2FtcGxlcy4nLFxuICAgICAgICAgIHNhbXBsZS5yc2UgKiAxMDBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5yZXNldENvdW50Kys7XG4gICAgICAgIGlmICh0aGlzLnJlc2V0Q291bnQgPiAxMCkge1xuICAgICAgICAgIHRoaXMuc2NvcmVzLnNwbGljZSgwKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnW0JBSUxdIFRvbyBtYW55IFtSRVNFVCBTQ09SRV0uJyk7XG4gICAgICAgICAgaWYgKHdpbmRvdy5nYSkge1xuICAgICAgICAgICAgZ2EoJ3NlbmQnLCAnZXhjZXB0aW9uJywge1xuICAgICAgICAgICAgICAnZXhEZXNjcmlwdGlvbic6ICdCZW5jaG1hcmtSZXNldE92ZXJmbG93JyxcbiAgICAgICAgICAgICAgJ2V4RmF0YWwnOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZmluYWxpemUoZmFsc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmZpbmFsaXplKHRydWUpO1xuICB9LFxuXG4gIGZpbmFsaXplOiBmdW5jdGlvbihyZXN0YXJ0KSB7XG5cbiAgICBpZiAoIXJlc3RhcnQpIHtcbiAgICAgIC8vIFJlbW92ZSBpb3Rhc1xuICAgICAgdGhpcy5pb3RhQ291bnQgPSAwO1xuICAgICAgdGhpcy5ydW5Db3VudCA9IDA7XG4gICAgICAvLyBSZXNldCBiZW5jaG1hcmsgZW5naW5lIHNldHRpbmdzXG4gICAgICB0aGlzLmFwcC51bmJvdW5kID0gZmFsc2U7XG4gICAgICB0aGlzLmFwcC5pbW1pZGlhdGUgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmVkdWNlIGlvdGFMaXN0IHRvIGlvdGFDb3VudFxuICAgIHRoaXMuaW90YUxpc3Quc3BsaWNlKHRoaXMuaW90YUNvdW50KS5mb3JFYWNoKGZ1bmN0aW9uKGlvdGEpIHtcbiAgICAgIGlvdGEuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGlmIChyZXN0YXJ0KSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh3aW5kb3cuZ2EpIHtcbiAgICAgICAgZ2EoJ3NlbmQnLCB7XG4gICAgICAgICAgJ2hpdFR5cGUnOiAndGltaW5nJyxcbiAgICAgICAgICAndGltaW5nQ2F0ZWdvcnknOiAnQmVuY2htYXJrJyxcbiAgICAgICAgICAndGltaW5nVmFyJzogJ0xvYWRpbmcnLFxuICAgICAgICAgICd0aW1pbmdWYWx1ZSc6IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgYXBwLnR3ZWVuKHRoaXMpLnRvKHtcbiAgICAgICAgc3RhcnRNb2Q6IDEuMFxuICAgICAgfSwgMS4wLCBcIm91dEVsYXN0aWNcIik7XG4gICAgfVxuXG4gIH0sXG5cbiAgYWRkSW90YXM6IGZ1bmN0aW9uKGNvdW50KSB7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcblxuICAgICAgdGhpcy5pb3RhTGlzdC5wdXNoKG5ldyBJb3RhKHRoaXMuYXBwLCB0aGlzKSk7XG5cbiAgICB9XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgLyogZ2V0IHJlZmVyZW5jZSB0byB0aGUgYXBwbGljYXRpb24gKi9cblxuICAgIHZhciBhcHAgPSB0aGlzLmFwcDtcblxuICAgIC8qIGdldCByZWZlcmVuY2UgdG8gZHJhd2luZyBzdXJmYWNlICovXG5cbiAgICB2YXIgbGF5ZXIgPSB0aGlzLmFwcC5sYXllcjtcblxuICAgIC8qIGNsZWFyIHNjcmVlbiAqL1xuXG4gICAgbGF5ZXIuY2xlYXIoXCIjMjgyMjQ1XCIpO1xuXG5cbiAgICBsYXllci5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcGxhc2gsIGFwcC5jZW50ZXIueCAtIGFwcC5pbWFnZXMuc3BsYXNoLndpZHRoIC8gMiB8IDAsIGFwcC5jZW50ZXIueSAtIGFwcC5pbWFnZXMuc3BsYXNoLmhlaWdodCAvIDIgfCAwKVxuXG4gICAgbGF5ZXIuc2F2ZSgpO1xuICAgIGxheWVyLnRyYW5zbGF0ZSg2MDAsIDI5MCk7XG5cbiAgICBsYXllci5hbGlnbigwLjUsIDAuNSk7XG4gICAgbGF5ZXIuc2NhbGUoNCwgNCk7XG4gICAgbGF5ZXIuZ2xvYmFsQWxwaGEoMC40KTtcbiAgICBsYXllci5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oXCJsaWdodGVyXCIpO1xuICAgIGxheWVyLmRyYXdJbWFnZShhcHAuaW1hZ2VzLmZsYXJlLCAxMjggKiAoMzIgKiAoYXBwLmxpZmV0aW1lICUgMS41IC8gMS41KSB8IDApLCAwLCAxMjgsIDEyOCwgMCwgMCwgMTI4LCAxMjgpO1xuICAgIGxheWVyLnJlc3RvcmUoKTtcblxuXG4gICAgYXBwLmZvbnRTaXplKDQ4KTtcblxuXG5cbiAgICBpZiAoIXRoaXMucmVhZHkpIHtcbiAgICAgIHZhciB0ZXh0WCA9IGFwcC5jZW50ZXIueDtcbiAgICAgIHZhciB0ZXh0WSA9IGFwcC5jZW50ZXIueSAtIDE2O1xuXG4gICAgICBsYXllci5maWxsU3R5bGUoXCJyZ2JhKDAsMCwwLDAuNVwiKS5maWxsUmVjdCgwLCB0ZXh0WSAtIDU0LCBhcHAud2lkdGgsIDc0KTtcblxuICAgICAgbGF5ZXIuZmlsbFN0eWxlKFwiIzAwMFwiKS50ZXh0QWxpZ24oXCJjZW50ZXJcIikuZmlsbFRleHQoXCJMT0FESU5HLi4uIHBsZWFzZSB3YWl0XCIsIHRleHRYLCB0ZXh0WSAtIDQpO1xuICAgICAgbGF5ZXIuZmlsbFN0eWxlKFwiI2ZmZlwiKS50ZXh0QWxpZ24oXCJjZW50ZXJcIikuZmlsbFRleHQoXCJMT0FESU5HLi4uIHBsZWFzZSB3YWl0XCIsIHRleHRYLCB0ZXh0WSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB2YXIgdGV4dFggPSBhcHAuY2VudGVyLnggKyAxMDAgKyAoMSAtIHRoaXMuc3RhcnRNb2QpICogMTAwMDtcbiAgICAgIHZhciB0ZXh0WSA9IGFwcC5jZW50ZXIueSAtIDEwO1xuXG4gICAgICBsYXllci5hKDAuNSArIFV0aWxzLm9zYyhhcHAubGlmZXRpbWUsIDEpICogMC41KTtcbiAgICAgIGxheWVyLmZpbGxTdHlsZShcIiMwMDBcIikudGV4dEFsaWduKFwiY2VudGVyXCIpLmZpbGxUZXh0KFwiQ0xJQ0sgVE8gU1RBUlQhXCIsIHRleHRYLCB0ZXh0WSAtIDQpO1xuICAgICAgbGF5ZXIuZmlsbFN0eWxlKFwiI2ZhMFwiKS50ZXh0QWxpZ24oXCJjZW50ZXJcIikuZmlsbFRleHQoXCJDTElDSyBUTyBTVEFSVCFcIiwgdGV4dFgsIHRleHRZKTtcbiAgICAgIGxheWVyLmEoMS4wKTtcblxuICAgIH1cblxuXG4gICAgLy8gYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmdyYWRpZW50O1xuICAgIC8vIGFwcC5jdHguZmlsbFJlY3QoMCwgMCwgYXBwLndpZHRoLCBhcHAuaGVpZ2h0KTtcblxuICAgIC8vIHRoaXMuaW90YUxpc3QuZm9yRWFjaChmdW5jdGlvbihpb3RhKSB7XG4gICAgLy8gICBpb3RhLnJlbmRlcihsYXllcik7XG4gICAgLy8gfSk7XG5cbiAgICAvLyBsYXllclxuICAgIC8vICAgLmZpbGxTdHlsZSgnI2ZmZicpXG4gICAgLy8gICAuZm9udChcIjE0cHggJ2FyaWFsJ1wiKVxuICAgIC8vICAgLmZpbGxUZXh0KCdTdHJlc3MgdGVzdCAjJyArIHRoaXMucnVuQ291bnQsIDUsIDE1KVxuICAgIC8vICAgLmZpbGxUZXh0KCdFbnRpdGllczogJyArIHRoaXMuaW90YUxpc3QubGVuZ3RoLCA1LCAzMClcbiAgICAvLyAgIC5maWxsVGV4dCgnRnJhbWV0aW1lOicgKyB0aGlzLmZyYW1lVGltZS50b0ZpeGVkKDEpLCA1LCA0NSk7XG4gIH0sXG5cbiAgYW5hbHl6ZTogZnVuY3Rpb24ocG9wdWxhdGlvbikge1xuXG4gICAgdmFyIGwgPSBwb3B1bGF0aW9uLmxlbmd0aDtcbiAgICB2YXIgc3VtID0gMC4wO1xuICAgIHZhciBzdW1zcSA9IDAuMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgc3VtICs9IHBvcHVsYXRpb25baV07XG4gICAgICBzdW1zcSArPSBwb3B1bGF0aW9uW2ldICogcG9wdWxhdGlvbltpXTtcbiAgICB9XG4gICAgdmFyIG1lYW4gPSBzdW0gLyBsO1xuICAgIHZhciBzZCA9IE1hdGguc3FydChzdW1zcSAvIGwgLSBzdW0gKiBzdW0gLyAobCAqIGwpKTtcbiAgICB2YXIgc2UgPSBzZCAvIE1hdGguc3FydChsKTtcbiAgICAvLyBzdGFuZGFyZCBlcnJvciBhdCA5NSUgY29uZmlkZW5jZVxuICAgIHZhciBzZTk1ID0gMS45NiAqIHNlO1xuICAgIHZhciByc2UgPSBzZSAvIG1lYW47XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lYW46IG1lYW4sXG4gICAgICBzZDogc2QsXG4gICAgICBzZTogc2UsXG4gICAgICBzZTk1OiBzZTk1LFxuICAgICAgcnNlOiByc2VcbiAgICB9XG5cbiAgfSxcblxuICBuZWFyZXN0OiBmdW5jdGlvbihmcm9tLCBlbnRpdGllcykge1xuXG4gICAgdmFyIG1pbiA9IC0xO1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdGllcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgdG8gPSBlbnRpdGllc1tpXTtcblxuICAgICAgaWYgKGZyb20gPT09IHRvKSBjb250aW51ZTtcblxuICAgICAgdmFyIGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZShmcm9tLCB0byk7XG5cbiAgICAgIGlmIChkaXN0YW5jZSA8IG1pbiB8fCBtaW4gPCAwKSB7XG4gICAgICAgIG1pbiA9IGRpc3RhbmNlO1xuICAgICAgICByZXN1bHQgPSB0bztcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgZGlzdGFuY2U6IGZ1bmN0aW9uKGEsIGIpIHtcblxuICAgIHZhciBkeCA9IGEueCAtIGIueDtcbiAgICB2YXIgZHkgPSBhLnkgLSBiLnk7XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcblxuICB9XG59O1xuXG52YXIgaW1hZ2VzID0gWydmaXJlZm94JywgJ2ZpcmVmb3hfYmV0YScsICdmaXJlZm94X2RldmVsb3Blcl9lZGl0aW9uJywgJ2ZpcmVmb3hfbmlnaHRseSddO1xuXG5mdW5jdGlvbiBJb3RhKGFwcCwgcGFyZW50KSB7XG4gIHRoaXMueCA9IDAuMDtcbiAgdGhpcy55ID0gMC4wO1xuICB0aGlzLnZ4ID0gMC4wO1xuICB0aGlzLnZ5ID0gMC4wO1xuICB0aGlzLnZyID0gMC4wO1xuICB0aGlzLmFscGhhID0gMC4wO1xuICB0aGlzLmFuZ2xlID0gMC4wO1xuICB0aGlzLmFwcCA9IGFwcDtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMueCA9IE1hdGgucmFuZG9tKCkgKiBhcHAud2lkdGg7XG4gIHRoaXMueSA9IE1hdGgucmFuZG9tKCkgKiBhcHAuaGVpZ2h0O1xuICB0aGlzLm1heFZlbCA9IDEwMC4wO1xuICB0aGlzLm1heFRvcnEgPSBNYXRoLlBJICogMTA7XG4gIHRoaXMudnggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5tYXhWZWwgKiAyIC0gdGhpcy5tYXhWZWw7XG4gIHRoaXMudnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5tYXhWZWwgKiAyIC0gdGhpcy5tYXhWZWw7XG4gIHRoaXMudnIgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5tYXhUb3JxICogMiAtIHRoaXMubWF4VG9ycTtcbiAgdGhpcy5pbWFnZSA9IGFwcC5pbWFnZXNbaW1hZ2VzW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMpXV07XG4gIHRoaXMucmVnaW9uID0gVXRpbHMucmFuZG9tKFtcbiAgICBbNTQ4LCA4OCwgNDYsIDQ3XSxcbiAgICBbNTQ0LCAxNDIsIDQ2LCA0OF0sXG4gICAgWzU0NCwgMjAwLCA0NiwgNDddLFxuICAgIFs1NDUsIDI1MywgNDQsIDQ4XVxuICBdKTtcbiAgdGhpcy5tYXhGb3JjZSA9IDEwMC4wO1xuICB0aGlzLmFscGhhID0gMC4yICsgTWF0aC5yYW5kb20oKSAqIDAuODtcbiAgdGhpcy5hbmdsZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJO1xufVxuXG5Jb3RhLnByb3RvdHlwZSA9IHtcblxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xuXG4gICAgYXBwLnN0YXRlLm5lYXJlc3QodGhpcywgdGhpcy5wYXJlbnQuaW90YUxpc3QpO1xuXG4gICAgdmFyIGlvdGFMaXN0ID0gdGhpcy5wYXJlbnQuaW90YUxpc3Q7XG4gICAgdmFyIGZvcmNleCA9IDAuMDtcbiAgICB2YXIgZm9yY2V5ID0gMC4wO1xuICAgIHZhciBmb3JjZXMgPSAwO1xuICAgIHZhciBtYXhEaXN0ID0gNjAuMDtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGlvdGFMaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGRpc3R4ID0gKHRoaXMueCAtIGlvdGFMaXN0W2ldLngpIC8gbWF4RGlzdDtcbiAgICAgIHZhciBkaXN0eSA9ICh0aGlzLnkgLSBpb3RhTGlzdFtpXS55KSAvIG1heERpc3Q7XG4gICAgICB2YXIgc2lnbnggPSBNYXRoLnNpZ24oZGlzdHgpO1xuICAgICAgdmFyIHNpZ255ID0gTWF0aC5zaWduKGRpc3R5KTtcbiAgICAgIHZhciBhYnN4ID0gTWF0aC5hYnMoZGlzdHgpO1xuICAgICAgdmFyIGFic3kgPSBNYXRoLmFicyhkaXN0eSk7XG4gICAgICBpZiAoYWJzeCA8IDEgJiYgYWJzeSA8IDEpIHtcbiAgICAgICAgZm9yY2V4ICs9IHNpZ254ICsgYWJzeCAqIHNpZ254O1xuICAgICAgICBmb3JjZXkgKz0gc2lnbnkgKyBhYnN5ICogc2lnbnk7XG4gICAgICAgIGZvcmNlcysrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmb3JjZXMgPT0gMCkge1xuICAgICAgZm9yY2VzID0gMTtcbiAgICB9XG4gICAgZm9yY2V4ID0gTWF0aC5tYXgoLXRoaXMubWF4Rm9yY2UsIE1hdGgubWluKHRoaXMubWF4Rm9yY2UsIGZvcmNleCAvIGZvcmNlcykpICogNTAwO1xuICAgIGZvcmNleSA9IE1hdGgubWF4KC10aGlzLm1heEZvcmNlLCBNYXRoLm1pbih0aGlzLm1heEZvcmNlLCBmb3JjZXkgLyBmb3JjZXMpKSAqIDUwMDtcbiAgICB0aGlzLnZ4ID0gdGhpcy52eCAqIDAuOTkgKyBmb3JjZXggKiAwLjAxO1xuICAgIHRoaXMudnkgPSB0aGlzLnZ5ICogMC45OSArIGZvcmNleSAqIDAuMDE7XG5cbiAgICB2YXIgeCA9IHRoaXMueCArIHRoaXMudnggKiBkdDtcbiAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuYXBwLndpZHRoKSB7XG4gICAgICB4ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMuYXBwLndpZHRoO1xuICAgIH1cbiAgICB0aGlzLnggPSB4O1xuXG4gICAgdmFyIHkgPSB0aGlzLnkgKyB0aGlzLnZ5ICogZHQ7XG4gICAgaWYgKHkgPCAwIHx8IHkgPiB0aGlzLmFwcC5oZWlnaHQpIHtcbiAgICAgIHkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5hcHAuaGVpZ2h0O1xuICAgIH1cbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuYW5nbGUgKz0gdGhpcy52ciAqIGR0O1xuICB9LFxuXG4gIC8vIHJlbmRlcjogZnVuY3Rpb24obGF5ZXIpIHtcblxuICAvLyAgIHJldHVybjtcblxuICAvLyAgIGxheWVyLmNvbnRleHQuc2F2ZSgpO1xuICAvLyAgIGxheWVyLmNvbnRleHQudHJhbnNsYXRlKHRoaXMueCB8IDAsIHRoaXMueSB8IDApO1xuICAvLyAgIC8vIGxheWVyLmEodGhpcy5hbHBoYSk7XG4gIC8vICAgbGF5ZXIuY29udGV4dC5maWxsU3R5bGUgPSBcIiNmMDBcIjtcbiAgLy8gICBsYXllci5jb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCA2NCwgNjQpO1xuICAvLyAgIGxheWVyLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjZmZmXCI7XG4gIC8vICAgbGF5ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgLy8gICBsYXllci5jb250ZXh0Lm1vdmVUbyh0aGlzLngsIHRoaXMueSk7XG4gIC8vICAgbGF5ZXIuY29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIDY0LCAwLCBNYXRoLlBJICogMik7XG4gIC8vICAgbGF5ZXIuY29udGV4dC5yb3RhdGUodGhpcy5hbmdsZSk7XG4gIC8vICAgbGF5ZXIuZHJhd1JlZ2lvbihhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LCB0aGlzLnJlZ2lvbiwgMCwgMCk7XG4gIC8vICAgbGF5ZXIuY29udGV4dC5yZXN0b3JlKCk7XG4gIC8vIH0sXG5cbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hcHAgPSBudWxsO1xuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgfVxuXG59IiwiRU5HSU5FLkJhY2tncm91bmRTdGFycyA9IGZ1bmN0aW9uKCkge1xuXG4gIHRoaXMuY29sb3IgPSBcIiMwYWZcIjtcblxuICB0aGlzLmNvdW50ID0gTWF0aC5tYXgoYXBwLmhlaWdodCwgYXBwLndpZHRoKSAvIDE2IHwgMDtcblxuICB0aGlzLnggPSAwO1xuICB0aGlzLnkgPSAwO1xuXG4gIHRoaXMucG9wdWxhdGVkID0gZmFsc2U7XG4gIHRoaXMuaW1hZ2UgPSBhcHAuZ2V0Q29sb3JlZEltYWdlKGFwcC5pbWFnZXMucGFydGljbGVzLCB0aGlzLmNvbG9yKTtcblxufTtcblxuRU5HSU5FLkJhY2tncm91bmRTdGFycy5wcm90b3R5cGUgPSB7XG5cbiAgaW1hZ2VzOiB7fSxcblxuICBjb2xvcnM6IFtcIiNhZmNcIiwgXCIjZmEwXCJdLFxuXG4gIHNwcml0ZXM6IFtcbiAgICBbMCwgMTMsIDUsIDVdLFxuICAgIFsxLCAxOSwgMywgM11cbiAgXSxcblxuICBxdW90YTogMC41LFxuXG4gIHBvcHVsYXRlOiBmdW5jdGlvbihmaWxsKSB7XG5cbiAgICB0aGlzLnN0YXJzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY291bnQ7IGkrKykge1xuICAgICAgdGhpcy5zcGF3blN0YXIoZmlsbCk7XG4gICAgfVxuXG4gIH0sXG5cbiAgc3Bhd25TdGFyOiBmdW5jdGlvbihmaWxsKSB7XG5cbiAgICB2YXIgc3RhciA9IHtcbiAgICAgIHg6IE1hdGgucmFuZG9tKCkgKiBhcHAud2lkdGgsXG4gICAgICB5OiBNYXRoLnJhbmRvbSgpICogYXBwLmhlaWdodCxcbiAgICAgIHo6IDAuMSArIDAuOSAqIE1hdGgucmFuZG9tKCksXG4gICAgICBzOiBVdGlscy5yYW5kb20oWzEsIDIsIDNdKSxcbiAgICAgIHNwcml0ZUluZGV4OiBNYXRoLnJhbmRvbSgpICogdGhpcy5zcHJpdGVzLmxlbmd0aCB8IDBcbiAgICB9O1xuXG4gICAgc3Rhci5seCA9IHN0YXIueDtcbiAgICBzdGFyLmx5ID0gc3Rhci55O1xuXG4gICAgdGhpcy5zdGFycy5wdXNoKHN0YXIpO1xuXG4gIH0sXG5cbiAgd3JhcDogZnVuY3Rpb24oc3Rhcikge1xuXG4gICAgaWYgKHN0YXIueCA+IGFwcC53aWR0aCkgc3Rhci54ID0gMDtcbiAgICBpZiAoc3Rhci55ID4gYXBwLmhlaWdodCkgc3Rhci55ID0gMDtcblxuICAgIGlmIChzdGFyLnggPCAwKSBzdGFyLnggPSBhcHAud2lkdGg7XG4gICAgaWYgKHN0YXIueSA8IDApIHN0YXIueSA9IGFwcC5oZWlnaHQ7XG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xuXG4gICAgaWYgKCF0aGlzLnBvcHVsYXRlZCkge1xuICAgICAgdGhpcy5wb3B1bGF0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wb3B1bGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICB2YXIgZGlmZlggPSAoMTAgKyBhcHAuZ2FtZS5zY29yZSkgKiBkdDtcbiAgICB2YXIgZGlmZlkgPSAoMTAgKyBhcHAuZ2FtZS5zY29yZSkgKiBkdDtcblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXJzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHZhciBzdGFyID0gdGhpcy5zdGFyc1tpXTtcblxuICAgICAgdGhpcy53cmFwKHN0YXIpO1xuXG4gICAgICBzdGFyLnggKz0gZGlmZlggKiBzdGFyLno7XG4gICAgICBzdGFyLnkgKz0gZGlmZlkgKiBzdGFyLno7XG5cbiAgICB9XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKGR0KSB7XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGFycy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgc3RhciA9IHRoaXMuc3RhcnNbaV07XG5cbiAgICAgIHZhciBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbc3Rhci5zcHJpdGVJbmRleF07XG5cbiAgICAgIGFwcC5jdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHNwcml0ZVswXSwgc3ByaXRlWzFdLCBzcHJpdGVbMl0sIHNwcml0ZVszXSxcbiAgICAgICAgc3Rhci54LCBzdGFyLnksIHNwcml0ZVsyXSwgc3ByaXRlWzNdKTtcblxuXG4gICAgfVxuXG4gIH1cblxufTsiLCJFTkdJTkUuQ2lyY2xlRXhwbG9zaW9uID0gZnVuY3Rpb24oYXJncykge1xuXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XG5cbiAgICBhdHRhY2hlZFRvOiBmYWxzZSxcbiAgICByYWRpdXM6IDAsXG4gICAgYWxwaGE6IDEuMCxcbiAgICBkdXJhdGlvbjogMC41XG5cbiAgfSwgYXJncyk7XG5cbiAgdGhpcy5yYWRpdXMgPSAwO1xuXG4gIHRoaXMudHdlZW4gPSBhcHAudHdlZW4odGhpcykuZGlzY2FyZCgpLnRvKHtcbiAgICByYWRpdXM6IGFyZ3MucmFkaXVzXG4gIH0sIHRoaXMuZHVyYXRpb24sIFwib3V0RWxhc3RpY1wiKS50byh7XG4gICAgcmFkaXVzOiAwXG4gIH0sIHRoaXMuZHVyYXRpb24sIFwib3V0RWxhc3RpY1wiKTtcblxufTtcblxuRU5HSU5FLkNpcmNsZUV4cGxvc2lvbi5wcm90b3R5cGUgPSB7XG5cbiAgY29uc3RydWN0b3I6IEVOR0lORS5DaXJjbGVFeHBsb3Npb24sXG5cbiAgdHlwZTogXCJjaXJjbGVFeHBsb3Npb25cIixcblxuICBhY3Rpb246IGZ1bmN0aW9uKCkge1xuXG4gICAgYXBwLnNvdW5kLnBsYXkoXCJsYXNlclwiKTtcblxuICB9LFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYodGhpcy5hdHRhY2hlZFRvKSB7XG4gICAgICB0aGlzLnggPSB0aGlzLmF0dGFjaGVkVG8ueDtcbiAgICAgIHRoaXMueSA9IHRoaXMuYXR0YWNoZWRUby55O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR3ZWVuLmZpbmlzaGVkKSB0aGlzLmRlYWQgPSB0cnVlO1xuXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgIGlmICh0aGlzLnJhZGl1cyA+IDApIHtcbiAgICAgIFxuICAgICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIGFwcC5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJsaWdodGVyXCI7XG4gICAgICBhcHAuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGFwcC5jdHguZmlsbCgpO1xuICAgICAgYXBwLmN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XG5cblxuICAgIH1cblxuICB9XG5cbn07IiwiRU5HSU5FLlNoaXAgPSBmdW5jdGlvbihhcmdzKSB7XG5cbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIHtcblxuICAgIGRhbWFnZTogMSxcbiAgICBmaXJlcmF0ZTogMC41LFxuICAgIHNwZWVkOiAxNjAsXG4gICAgcmFkaXVzOiAxNixcbiAgICByb3RhdGlvblNwZWVkOiA1LFxuICAgIGhwOiAxMCxcbiAgICByYW5nZTogMjAwLFxuICAgIGZvcmNlOiAwLFxuICAgIGZvcmNlRGlyZWN0aW9uOiAwLFxuICAgIHRhcmdldFRpbWVvdXQ6IDAsXG4gICAgaGl0TGlmZXNwYW46IDAsXG4gICAgc2NhbGU6IDEuMCxcbiAgICByYW5rOiAwLFxuICAgIGtpbGxzOiAwXG5cbiAgfSwgZGVmcy5zaGlwc1thcmdzLnR5cGVdLCBhcmdzKTtcblxuICB0aGlzLnJhbmRvbSA9IHRoaXMuZ2FtZS5yYW5kb20oKTtcblxuICB0aGlzLm1heEhwID0gdGhpcy5ocDtcblxuICB0aGlzLmxpZmV0aW1lID0gdGhpcy5nYW1lLnJhbmRvbSgpICogMTA7XG4gIHRoaXMuY29vbGRvd24gPSB0aGlzLmZpcmVyYXRlO1xuICB0aGlzLmRlc2lyZWREaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuZ2FtZS5yYW5kb20oKSAqIDY7XG5cbiAgdGhpcy5jb2xvciA9IGRlZnMudGVhbUNvbG9yW3RoaXMudGVhbV07XG5cbiAgdGhpcy5pbWFnZSA9IGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQ7XG5cbiAgaWYgKHRoaXMudGVhbSkgdGhpcy5hcHBseVVwZ3JhZGVzKHRoaXMuZ2FtZS51cGdyYWRlcyk7XG4gIGVsc2UgdGhpcy5hcHBseURpZmZpY3VsdHkoKTtcblxufTtcblxuRU5HSU5FLlNoaXAucHJvdG90eXBlID0ge1xuXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuU2hpcCxcblxuICBob3ZlcmFibGU6IHRydWUsXG5cbiAgZnJvemVuU3ByaXRlOiBbMTkzLCA4NiwgMTEsIDE5XSxcblxuICBxdW90YTogMixcblxuICBwb2ludGVyZW50ZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5yZXBhaXIoKTtcblxuICB9LFxuXG4gIHJhbmtzOiBbXG4gICAgWzMxOCwgMTMxLCAxMCwgNV0sXG4gICAgWzMzMywgMTMxLCAxMCwgMTBdLFxuICAgIFszNDgsIDEzMSwgMTAsIDE1XSxcbiAgICBbMzYwLCAxMzEsIDEwLCA4XSxcbiAgICBbMzcyLCAxMzEsIDEwLCAxM10sXG4gICAgWzM4NCwgMTMxLCAxMCwgMThdLFxuICAgIFszOTYsIDEzMSwgMTUsIDE2XVxuICBdLFxuXG4gIGFwcGx5RGlmZmljdWx0eTogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZGlmZmljdWx0eSA9IHRoaXMuZ2FtZS53YXZlIC8gMzA7XG5cbiAgICB0aGlzLnNwZWVkICo9IDEgKyBkaWZmaWN1bHR5O1xuICAgIHRoaXMuZGFtYWdlICo9IDEgKyBkaWZmaWN1bHR5O1xuXG4gIH0sXG5cbiAgYXBwbHlVcGdyYWRlczogZnVuY3Rpb24odXBncmFkZXMpIHtcblxuICAgIHZhciBocG1vZCA9IHRoaXMuaHAgLyB0aGlzLm1heEhwO1xuXG4gICAgdGhpcy5kYW1hZ2UgPSAxICsgdXBncmFkZXMuZGFtYWdlICogMC4yNTtcbiAgICB0aGlzLm1heEhwID0gdXBncmFkZXMubGlmZSAqIDEwO1xuICAgIHRoaXMuaHAgPSBocG1vZCAqIHRoaXMubWF4SHA7XG4gICAgdGhpcy5zcGVlZCA9IDgwICsgMTAgKiB1cGdyYWRlcy5zcGVlZDtcblxuXG4gICAgaWYgKHRoaXMuZnJlZSkge1xuICAgICAgdGhpcy5kYW1hZ2UgKj0gMjtcbiAgICAgIHRoaXMubWF4SHAgKj0gMjtcbiAgICAgIHRoaXMuaHAgKj0gMjtcbiAgICB9XG5cbiAgfSxcblxuICBkaWU6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKCF0aGlzLnRlYW0pIHRoaXMuZ2FtZS5zY29yZSsrO1xuXG4gICAgaWYgKHRoaXMuZ2FtZS5iZW5jaG1hcmspIHtcblxuICAgICAgdGhpcy5ocCA9IHRoaXMubWF4SHA7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmRlYWQgPSB0cnVlO1xuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYm9zcykge1xuXG4gICAgICB0aGlzLmdhbWUuc2hha2UoKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cbiAgICAgICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuUmVzb3VyY2UsIHtcbiAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgeTogdGhpcy55XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmdhbWUuZXhwbG9zaW9uKHRoaXMueCwgdGhpcy55LCAxNiwgdGhpcy5jb2xvcik7XG5cbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5SZXNvdXJjZSwge1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55LFxuICAgICAgcGFyZW50OiB0aGlzXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wbGFuZXQpIHRoaXMucGxhbmV0LnNoaXBzLS07XG5cbiAgICBpZiAoIXRoaXMudGVhbSkgdGhpcy5nYW1lLm9uZW5lbXlkZWF0aCh0aGlzKTtcblxuICAgIGFwcC5zb3VuZC5wbGF5KFwiZXhwbG9zaW9uXCIpLnJyYXRlKDAuMik7XG5cbiAgfSxcblxuICBhcHBseURhbWFnZTogZnVuY3Rpb24oZGFtYWdlLCBhdHRhY2tlcikge1xuXG4gICAgaWYgKHRoaXMuZGVhZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5oaXRMaWZlc3BhbiA9IDAuMTtcblxuICAgIHRoaXMuaHAgLT0gZGFtYWdlO1xuXG4gICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgdGhpcy5kaWUoKTtcbiAgICAgIGlmIChhdHRhY2tlcikgYXR0YWNrZXIub25zY29yZSgpO1xuICAgIH1cblxuICAgIHRoaXMuZ2FtZS5leHBsb3Npb24odGhpcy54LCB0aGlzLnksIDMsIHRoaXMuY29sb3IpO1xuXG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xuXG4gICAgZHQgKj0gdGhpcy5nYW1lLnRpbWVGYWN0b3I7XG5cbiAgICAvLyBpZiAoIXRoaXMudGVhbSkgZHQgKj0gTWF0aC5zaW4oKGFwcC5saWZldGltZSAlIDIgLyAyKSAqIE1hdGguUEkpO1xuXG4gICAgdGhpcy5saWZldGltZSArPSBkdDtcblxuICAgIGlmICgodGhpcy50YXJnZXRUaW1lb3V0IC09IGR0KSA8PSAwKSB7XG5cbiAgICAgIHRoaXMudGFyZ2V0ID0gZmFsc2U7XG4gICAgICB0aGlzLnRhcmdldFRpbWVvdXQgPSAwLjI1O1xuXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnRhcmdldCkge1xuXG4gICAgICB0aGlzLnRhcmdldCA9IHRoaXMuZ2V0VGFyZ2V0KHRoaXMuZ2FtZS5lbnRpdGllcyk7XG5cbiAgICB9IGVsc2UgaWYgKHRoaXMudGFyZ2V0LmRlYWQpIHtcblxuICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuXG4gICAgfVxuXG5cbiAgICB0aGlzLmZvcmVzaWdodENvbGxpc2lvbigpO1xuXG4gICAgdmFyIGRlc3RpbmF0aW9uID0gZmFsc2U7XG4gICAgdmFyIHNwZWVkID0gdGhpcy5zcGVlZDtcblxuICAgIHZhciBveCA9IDA7XG4gICAgdmFyIG95ID0gMDtcblxuICAgIGlmICh0aGlzLnRlYW0gJiYgdGhpcy50YXJnZXQpIHtcblxuICAgICAgb3ggPSBNYXRoLmNvcyh0aGlzLnJhbmRvbSAqIDYuMjgpICogMTAwO1xuICAgICAgb3kgPSBNYXRoLnNpbih0aGlzLnJhbmRvbSAqIDYuMjgpICogMTAwO1xuXG4gICAgICBkZXN0aW5hdGlvbiA9IHRoaXMudGFyZ2V0O1xuXG4gICAgfSBlbHNlIGRlc3RpbmF0aW9uID0gdGhpcy5nYW1lLnBsYXllci5wbGFuZXQ7XG5cbiAgICBpZiAodGhpcy50ZWFtICYmIFV0aWxzLmRpc3RhbmNlKHRoaXMsIGFwcC5jZW50ZXIpID4gYXBwLmNlbnRlci55KSB7XG5cbiAgICAgIGRlc3RpbmF0aW9uID0gYXBwLmNlbnRlcjtcblxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbGxpc2lvbkRhbmdlcikge1xuXG4gICAgICAvKlxuXG4gICAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy5jb2xsaXNpb25EYW5nZXIueSAtIHRoaXMueSwgdGhpcy5jb2xsaXNpb25EYW5nZXIueCAtIHRoaXMueCkgLSBNYXRoLlBJIC8gMjtcblxuICAgICAgICBkZXN0aW5hdGlvbiA9IHtcbiAgICAgICAgICB4OiB0aGlzLmNvbGxpc2lvbkRhbmdlci54ICsgTWF0aC5jb3MoYW5nbGUpICogMTUwLFxuICAgICAgICAgIHk6IHRoaXMuY29sbGlzaW9uRGFuZ2VyLnkgKyBNYXRoLmNvcyhhbmdsZSkgKiAxNTBcbiAgICAgICAgfVxuXG4gICAgICAgIHNwZWVkICo9IDEgLSAwLjUgKiBNYXRoLmFicyhVdGlscy5jaXJjRGlzdGFuY2UodGhpcy5kaXJlY3Rpb24sIGFuZ2xlKSAvIChNYXRoLlBJKSk7XG5cbiAgICAgICovXG5cbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbkRpc3RhbmNlIDwgNTApIHtcblxuICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMuY29sbGlzaW9uRGFuZ2VyLnkgLSB0aGlzLnksIHRoaXMuY29sbGlzaW9uRGFuZ2VyLnggLSB0aGlzLngpIC0gTWF0aC5QSTtcblxuICAgICAgICB0aGlzLnggPSB0aGlzLmNvbGxpc2lvbkRhbmdlci54ICsgTWF0aC5jb3MoYW5nbGUpICogNTA7XG4gICAgICAgIHRoaXMueSA9IHRoaXMuY29sbGlzaW9uRGFuZ2VyLnkgKyBNYXRoLnNpbihhbmdsZSkgKiA1MDtcblxuICAgICAgfVxuXG4gICAgICAvLyBzcGVlZCAqPSB0aGlzLmNvbGxpc2lvbkRpc3RhbmNlIC8gMjAwO1xuXG4gICAgfVxuXG5cbiAgICBpZiAoZGVzdGluYXRpb24pIHtcblxuICAgICAgdGhpcy5kZXNpcmVkRGlyZWN0aW9uID0gTWF0aC5hdGFuMihkZXN0aW5hdGlvbi55IC0gdGhpcy55ICsgb3gsIGRlc3RpbmF0aW9uLnggLSB0aGlzLnggKyBveSk7XG5cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZnJvemVuKSB7XG5cbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gVXRpbHMuY2lyY1dyYXBUbyh0aGlzLmRpcmVjdGlvbiwgdGhpcy5kZXNpcmVkRGlyZWN0aW9uLCBkdCAqIHRoaXMucm90YXRpb25TcGVlZCk7XG5cbiAgICB9XG5cbiAgICB0aGlzLm1vdmUoZHQpO1xuXG4gICAgLyogZmlyaW5nIG1lY2hhbmljcyAqL1xuXG4gICAgdGhpcy5jb29sZG93biAtPSBkdDtcblxuICAgIGlmICh0aGlzLmNhbkZpcmUoKSkge1xuXG4gICAgICB0aGlzLmZpcmUoKTtcblxuICAgIH1cblxuICAgIGlmICghdGhpcy50ZWFtICYmIFV0aWxzLmRpc3RhbmNlKHRoaXMsIHRoaXMuZ2FtZS5wbGF5ZXJQbGFuZXQpIDwgdGhpcy5nYW1lLnBsYXllclBsYW5ldC5yYWRpdXMpIHtcblxuICAgICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSB7XG5cbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5wbGFuZXQuYXBwbHlEYW1hZ2UoMSwgdGhpcyk7XG4gICAgICAgIHRoaXMuZGllKCk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMuaGl0TGlmZXNwYW4gLT0gZHQ7XG5cbiAgfSxcblxuXG4gIG1vdmU6IGZ1bmN0aW9uKGR0KSB7XG5cbiAgICBpZiAoIXRoaXMuZnJvemVuKSB7XG5cbiAgICAgIFV0aWxzLm1vdmVJbkRpcmVjdGlvbi5jYWxsKHRoaXMsIHRoaXMuZGlyZWN0aW9uLCB0aGlzLnNwZWVkICogZHQpO1xuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZm9yY2UgPiAwKSB7XG5cbiAgICAgIHRoaXMuZm9yY2UgLT0gMjAwICogZHQ7XG5cbiAgICAgIFV0aWxzLm1vdmVJbkRpcmVjdGlvbi5jYWxsKHRoaXMsIHRoaXMuZm9yY2VEaXJlY3Rpb24sIHRoaXMuZm9yY2UgKiBkdCk7XG5cbiAgICB9XG5cbiAgfSxcblxuICBjYW5GaXJlOiBmdW5jdGlvbigpIHtcblxuICAgIGlmICh0aGlzLmZyb3plbikgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuY29vbGRvd24gPiAwKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLnRhcmdldCkgcmV0dXJuO1xuICAgIGlmIChVdGlscy5kaXN0YW5jZSh0aGlzLCB0aGlzLnRhcmdldCkgPiB0aGlzLnJhbmdlKSByZXR1cm47XG5cbiAgICB0aGlzLmNvb2xkb3duID0gdGhpcy5maXJlcmF0ZTtcblxuICAgIHRoaXMuZmlyZSgpO1xuXG4gIH0sXG5cbiAgZmlyZTogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5CdWxsZXQsIHtcbiAgICAgIHg6IHRoaXMueCxcbiAgICAgIHk6IHRoaXMueSxcbiAgICAgIHRlYW06IHRoaXMudGVhbSxcbiAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXG4gICAgICBkYW1hZ2U6IHRoaXMuZGFtYWdlLFxuICAgICAgcGFyZW50OiB0aGlzXG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwibGFzZXJcIik7XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgLyogc3ByaXRlICovXG5cbiAgICBhcHAuY3R4LnNhdmUoKTtcbiAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG5cbiAgICB0aGlzLnJlbmRlckhVRCgpO1xuXG4gICAgaWYgKHRoaXMuaGl0TGlmZXNwYW4gPiAwKSB7XG5cbiAgICAgIHZhciBpbWFnZSA9IGFwcC5nZXRDb2xvcmVkSW1hZ2UodGhpcy5pbWFnZSwgXCIjZmZmXCIsIFwic291cmNlLWluXCIpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdmFyIGltYWdlID0gdGhpcy5pbWFnZTtcblxuICAgIH1cblxuICAgIGFwcC5jdHgucm90YXRlKHRoaXMuZGlyZWN0aW9uIC0gTWF0aC5QSSAvIDIpO1xuICAgIGFwcC5jdHguc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHRoaXMuc3ByaXRlWzBdLCB0aGlzLnNwcml0ZVsxXSwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdLCAtdGhpcy5zcHJpdGVbMl0gLyAyLCAtdGhpcy5zcHJpdGVbM10gLyAyLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM10pO1xuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuXG4gICAgaWYgKHRoaXMuZnJvemVuKSB7XG5cbiAgICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXG4gICAgICAgIHRoaXMuZnJvemVuU3ByaXRlWzBdLCB0aGlzLmZyb3plblNwcml0ZVsxXSwgdGhpcy5mcm96ZW5TcHJpdGVbMl0sIHRoaXMuZnJvemVuU3ByaXRlWzNdLFxuICAgICAgICB0aGlzLnggLSB0aGlzLmZyb3plblNwcml0ZVsyXSAvIDIsIHRoaXMueSAtIHRoaXMuZnJvemVuU3ByaXRlWzNdIC8gMiwgdGhpcy5mcm96ZW5TcHJpdGVbMl0sIHRoaXMuZnJvemVuU3ByaXRlWzNdKTtcblxuICAgIH1cblxuICAgIGlmICh0aGlzLnRlYW0pIHtcblxuICAgICAgdmFyIHJhbmtTcHJpdGUgPSB0aGlzLnJhbmtzW3RoaXMucmFua107XG5cbiAgICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXG4gICAgICAgIHJhbmtTcHJpdGVbMF0sIHJhbmtTcHJpdGVbMV0sIHJhbmtTcHJpdGVbMl0sIHJhbmtTcHJpdGVbM10sXG4gICAgICAgIHRoaXMueCArIDI0LCB0aGlzLnkgLSAyNCwgcmFua1Nwcml0ZVsyXSwgcmFua1Nwcml0ZVszXSk7XG5cblxuICAgIH1cblxuICB9LFxuXG4gIHJlbmRlckhVRDogZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAodGhpcy5mcm96ZW4pIHJldHVybjtcblxuICAgIHZhciB3ID0gTWF0aC5taW4oMTAwLCAodGhpcy5tYXhIcCAvIDE2MCkgKiAxMDAgfCAwKTtcblxuICAgIHZhciBtb2QgPSB0aGlzLmhwIC8gdGhpcy5tYXhIcDtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgYXBwLmN0eC5maWxsUmVjdCgtdyAqIG1vZCAvIDIgfCAwLCAzMiwgdyAqIG1vZCwgNSk7XG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KC13ICogMC41IHwgMCwgMzIsIHcsIDUpO1xuXG4gIH0sXG5cbiAgY29sbGlzaW9uUmFuZ2U6IDEwMCxcblxuICBmb3Jlc2lnaHRDb2xsaXNpb246IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jb2xsaXNpb25EYW5nZXIgPSBmYWxzZTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBwb29sID0gVXRpbHMuZmlsdGVyKHRoaXMuZ2FtZS5lbnRpdGllcywgZnVuY3Rpb24oZSkge1xuXG4gICAgICBpZiAoZS50eXBlICE9PSBcImFzdGVyb2lkXCIpIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKFV0aWxzLmRpc3RhbmNlKHNlbGYsIGUpID4gc2VsZi5jb2xsaXNpb25SYW5nZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0pO1xuXG4gICAgdGhpcy5jb2xsaXNpb25EYW5nZXIgPSBVdGlscy5uZWFyZXN0KHRoaXMsIHBvb2wpO1xuXG4gICAgaWYgKHRoaXMuY29sbGlzaW9uRGFuZ2VyKSB0aGlzLmNvbGxpc2lvbkRpc3RhbmNlID0gVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy5jb2xsaXNpb25EYW5nZXIpO1xuXG4gIH0sXG5cbiAgZ2V0VGFyZ2V0OiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBwb29sID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2FtZS5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgZW50aXR5ID0gdGhpcy5nYW1lLmVudGl0aWVzW2ldO1xuXG4gICAgICBpZiAoIShlbnRpdHkgaW5zdGFuY2VvZiBFTkdJTkUuU2hpcCkpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoZW50aXR5LnRlYW0gIT09IHRoaXMudGVhbSkgcG9vbC5wdXNoKGVudGl0eSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gVXRpbHMubmVhcmVzdCh0aGlzLCBwb29sKTtcblxuICB9LFxuXG4gIHJlcGFpcjogZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAodGhpcy5ocCA+PSB0aGlzLm1heEhwKSByZXR1cm47XG5cbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5DaXJjbGVFeHBsb3Npb24sIHtcbiAgICAgIGNvbG9yOiBcIiNhMDRcIixcbiAgICAgIHJhZGl1czogMzIsXG4gICAgICBhdHRhY2hlZFRvOiB0aGlzXG4gICAgfSk7XG5cbiAgICB0aGlzLmhwID0gdGhpcy5tYXhIcDtcblxuICB9LFxuXG4gIG9uc2NvcmU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5raWxscysrO1xuXG4gICAgdGhpcy5yYW5rID0gTWF0aC5taW4odGhpcy5yYW5rcy5sZW5ndGggLSAxLCB0aGlzLmtpbGxzIC8gMyB8IDApO1xuXG4gIH1cblxufTsiLCJFTkdJTkUuQnVsbGV0ID0gZnVuY3Rpb24oYXJncykge1xuXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XG4gICAgc3BlZWQ6IDQwMFxuICB9LCBhcmdzKTtcblxuICB0aGlzLmNvbG9yID0gZGVmcy50ZWFtQ29sb3JbdGhpcy50ZWFtXTtcbiAgdGhpcy5yYWRpdXMgPSA0O1xuICB0aGlzLmRpcmVjdGlvbiA9IDA7XG5cbiAgdGhpcy5zcHJpdGUgPSB0aGlzLnNwcml0ZXNbdGhpcy50ZWFtXTtcblxufTtcblxuRU5HSU5FLkJ1bGxldC5wcm90b3R5cGUgPSB7XG5cbiAgc3ByaXRlczogW1xuICAgIFsxMjYsIDI1LCA0LCAzN10sXG4gICAgWzEzMywgMjUsIDQsIDM3XVxuICBdLFxuXG4gIHF1b3RhOiAwLjUsXG5cbiAgY29uc3RydWN0b3I6IEVOR0lORS5CdWxsZXQsXG5cbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcblxuICAgIGR0ICo9IHRoaXMuZ2FtZS50aW1lRmFjdG9yO1xuXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBNYXRoLmF0YW4yKHRoaXMudGFyZ2V0LnkgLSB0aGlzLnksIHRoaXMudGFyZ2V0LnggLSB0aGlzLngpO1xuXG4gICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcbiAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xuXG4gICAgaWYgKFV0aWxzLmRpc3RhbmNlKHRoaXMsIHRoaXMudGFyZ2V0KSA8IHRoaXMucmFkaXVzICsgdGhpcy50YXJnZXQucmFkaXVzKSB7XG5cbiAgICAgIHRoaXMuaGl0KHRoaXMudGFyZ2V0KTtcblxuICAgIH1cblxuICB9LFxuXG4gIGhpdDogZnVuY3Rpb24odGFyZ2V0KSB7XG5cbiAgICB0YXJnZXQuYXBwbHlEYW1hZ2UodGhpcy5kYW1hZ2UsIHRoaXMucGFyZW50KTtcblxuICAgIHRoaXMuZGllKCk7XG5cbiAgfSxcblxuICBkaWU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcblxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICBhcHAuY3R4LnNhdmUoKTtcblxuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICBhcHAuY3R4LnJvdGF0ZSh0aGlzLmRpcmVjdGlvbiArIE1hdGguUEkgLyAyKTtcbiAgICBhcHAuY3R4LmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LFxuICAgICAgdGhpcy5zcHJpdGVbMF0sIHRoaXMuc3ByaXRlWzFdLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM10sIC10aGlzLnNwcml0ZVsyXSAvIDIsIC10aGlzLnNwcml0ZVszXSAvIDIsIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXVxuICAgICk7XG5cbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcblxuICB9XG5cbn07IiwiRU5HSU5FLkFzdGVyb2lkID0gZnVuY3Rpb24oYXJncykge1xuXG4gIHRoaXMubWF4ID0gdGhpcy5yZXNvdXJjZXMgPSA1O1xuXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XG5cbiAgICBoaXRMaWZlc3BhbjogMFxuXG4gIH0sIGFyZ3MpO1xuXG4gIHRoaXMucmFkaXVzID0gMzI7XG5cbiAgdGhpcy5kaXJlY3Rpb24gPSBNYXRoLmF0YW4yKGFwcC5jZW50ZXIueSAtIHRoaXMueSwgYXBwLmNlbnRlci54IC0gdGhpcy54KTtcbiAgdGhpcy5zcGVlZCA9IDggKyB0aGlzLmdhbWUucmFuZG9tKCkgKiAzMjtcblxuICB0aGlzLmxpZmV0aW1lID0gMDtcblxuICB0aGlzLmtpbmQgPSB0aGlzLmdhbWUucmFuZG9tKCkgPiAwLjggPyBcImdvbGRcIiA6IFwibm9ybWFsXCI7XG5cbiAgdGhpcy5zcHJpdGVJbmRleCA9IFV0aWxzLnJhbmRvbSgwLCAyKTtcblxuICB0aGlzLmNvbGxlY3RpYmxlcyA9IDA7XG5cblxufTtcblxuRU5HSU5FLkFzdGVyb2lkLnByb3RvdHlwZSA9IHtcblxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLkFzdGVyb2lkLFxuXG4gIHF1b3RhOiAwLjUsXG5cbiAgaG92ZXJhYmxlOiBcIm1pbmluZ1wiLFxuICBzaWxlbnQ6IHRydWUsXG4gIGluc3RhbnQ6IHRydWUsXG5cbiAgdHlwZTogXCJhc3Rlcm9pZFwiLFxuXG5cbiAgc3ByaXRlczoge1xuXG4gICAgbm9ybWFsOiBbXG4gICAgICBbMzQxLCAyMzksIDUyLCAzOV0sXG4gICAgICBbMzM3LCAyODgsIDYxLCA2MV0sXG4gICAgICBbMzM4LCAzNTQsIDU3LCA1OF1cbiAgICBdLFxuXG4gICAgZ29sZDogW1xuICAgICAgWzQwOCwgMjM4LCA1MiwgMzldLFxuICAgICAgWzQwNCwgMjg3LCA1OSwgNjFdLFxuICAgICAgWzQwMywgMzUzLCA1OSwgNThdXG4gICAgXSxcblxuICAgIGhpdDogW1xuICAgICAgWzQ3NiwgMTI3LCA1MiwgMzldLFxuICAgICAgWzQ3MiwgMTc2LCA2MSwgNjFdLFxuICAgICAgWzQ3MywgMjQyLCA1NywgNThdXG4gICAgXVxuXG4gIH0sXG5cbiAgcG9pbnRlcmVudGVyOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuc2xvd2Rvd24gPSB0cnVlO1xuXG4gIH0sXG5cbiAgcG9pbnRlcmxlYXZlOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuc2xvd2Rvd24gPSBmYWxzZTtcblxuICB9LFxuXG4gIGRpZTogZnVuY3Rpb24oKSB7XG5cbiAgICBhcHAuc291bmQucGxheShcImV4cGxvc2lvblwiKS5yYXRlKDAuNik7XG5cbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNykge1xuXG4gICAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5Qb3dlcnVwLCB7XG4gICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgeTogdGhpcy55XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5nYW1lLmV4cGxvc2lvbih0aGlzLngsIHRoaXMueSwgMTYsIFwiI2FhYVwiKTtcbiAgICB0aGlzLmdhbWUuc3Bhd25Bc3Rlcm9pZCgpO1xuXG4gIH0sXG5cbiAgZGlnOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaGl0TGlmZXNwYW4gPSAwLjE7XG5cbiAgICB0aGlzLnJlc291cmNlcy0tO1xuXG4gICAgaWYgKHRoaXMucmVzb3VyY2VzIDw9IDApIHtcbiAgICAgIHRoaXMuZGllKCk7XG4gICAgfVxuXG4gICAgdmFyIGNvdW50ID0gdGhpcy5raW5kID09PSBcImdvbGRcIiA/IDIgOiAxO1xuXG4gICAgdGhpcy5zcGF3blJlc291cmNlcyhjb3VudCk7XG5cbiAgICB0aGlzLmdhbWUuZXhwbG9zaW9uKHRoaXMueCwgdGhpcy55LCA0LCBcIiNmYTBcIik7XG5cbiAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwiZGlnXCIpO1xuXG4gIH0sXG5cbiAgc3Bhd25SZXNvdXJjZXM6IGZ1bmN0aW9uKGNvdW50KSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblxuICAgICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuUmVzb3VyY2UsIHtcbiAgICAgICAgeDogdGhpcy54LFxuICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgIHBhcmVudDogdGhpc1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xuXG4gICAgZHQgKj0gdGhpcy5nYW1lLnRpbWVGYWN0b3I7XG5cbiAgICB0aGlzLmxpZmV0aW1lICs9IGR0O1xuXG4gICAgdGhpcy5oaXRMaWZlc3BhbiAtPSBkdDtcblxuICAgIHZhciBzcGVlZCA9IHRoaXMuc3BlZWQgKiAodGhpcy5zbG93ZG93biA/IDAuMjUgOiAxLjApO1xuXG4gICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHNwZWVkICogZHQ7XG4gICAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZGlyZWN0aW9uKSAqIHNwZWVkICogZHQ7XG5cbiAgICB0aGlzLmdhbWUud3JhcCh0aGlzKTtcblxuICAgIGlmIChVdGlscy5kaXN0YW5jZSh0aGlzLCBhcHAuY2VudGVyKSA8IHRoaXMuZ2FtZS5wbGF5ZXIucGxhbmV0LnJhZGl1cyArIHRoaXMucmFkaXVzKSB7XG5cbiAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyLnBsYW5ldC5hc3Rlcm9pZHNTaGllbGQpIHtcblxuICAgICAgICB0aGlzLnNwYXduUmVzb3VyY2VzKDUpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIucGxhbmV0LmFwcGx5RGFtYWdlKDEsIHRoaXMpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGllKCk7XG5cbiAgICB9XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXMuaGl0TGlmZXNwYW4gPiAwKSB7XG4gICAgXG4gICAgICB2YXIgc3ByaXRlID0gdGhpcy5zcHJpdGVzLmhpdFt0aGlzLnNwcml0ZUluZGV4XTtcbiAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgXG4gICAgICB2YXIgc3ByaXRlID0gdGhpcy5zcHJpdGVzW3RoaXMua2luZF1bdGhpcy5zcHJpdGVJbmRleF07XG5cbiAgICB9XG5cbiAgICB2YXIgc2NhbGUgPSAwLjUgKyAwLjUgKiB0aGlzLnJlc291cmNlcyAvIHRoaXMubWF4O1xuXG4gICAgYXBwLmN0eC5zYXZlKCk7XG5cbiAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSlcbiAgICBhcHAuY3R4LnJvdGF0ZSh0aGlzLmxpZmV0aW1lKVxuICAgIGFwcC5jdHguc2NhbGUoc2NhbGUsIHNjYWxlKVxuICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXG4gICAgICBzcHJpdGVbMF0sIHNwcml0ZVsxXSwgc3ByaXRlWzJdLCBzcHJpdGVbM10sIC1zcHJpdGVbMl0gLyAyLCAtc3ByaXRlWzNdIC8gMiwgc3ByaXRlWzJdLCBzcHJpdGVbM11cbiAgICApO1xuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuXG4gIH1cblxufTsiLCJFTkdJTkUuQ3Vyc29yID0gZnVuY3Rpb24oZ2FtZSwgdGVhbSwgcGxhbmV0KSB7XG5cbiAgdGhpcy5nYW1lID0gZ2FtZTtcblxuICB0aGlzLmFjdGlvblRpbWVvdXQgPSAwO1xuXG4gIHRoaXMuZG90UmFkaXVzID0gODtcbiAgdGhpcy5jYXBhY2l0eSA9IDEwO1xuICB0aGlzLnJlc291cmNlcyA9IDQ7XG4gIHRoaXMueCA9IDA7XG4gIHRoaXMueSA9IDA7XG4gIHRoaXMuaG92ZXJUaW1lID0gMDtcbiAgdGhpcy50ZWFtID0gdGVhbTtcbiAgdGhpcy5jb2xvciA9IGRlZnMudGVhbUNvbG9yW3RlYW1dO1xuICB0aGlzLnBsYW5ldCA9IHBsYW5ldDtcblxuICB0aGlzLnRhcmdldFRpbWVvdXQgPSB0aGlzLnRhcmdldEludGVydmFsID0gMC4yNTtcbiAgdGhpcy5maXJlQ29vbGRvd24gPSB0aGlzLmZpcmVJbnRlcnZhbCA9IDAuMjU7XG5cbiAgLyogdGltZXJzICovXG5cbiAgdGhpcy50aW1lcyA9IHtcbiAgICBtaW5pbmc6IDAuNSxcbiAgICBjb2xsZWN0OiAwLjA1LFxuICAgIGJ1aWxkOiAwLjUsXG4gICAgcmVwYWlyOiAyXG4gIH07XG5cblxuICB0aGlzLnR3ZWVuID0gYXBwLnR3ZWVuKHRoaXMpO1xuXG4gIGlmICghdGhpcy50ZWFtKSB7XG5cbiAgICB0aGlzLmFpID0gbmV3IEVOR0lORS5BaSh0aGlzKTtcbiAgICB0aGlzLmFpLnNldChcImlkbGVcIik7XG5cbiAgfVxuXG4gIHRoaXMudHJhaWwgPSBuZXcgRU5HSU5FLlRyYWlsKHRoaXMsIHtcbiAgICBpbnRlcnZhbDogMC4wNSxcbiAgICBtYXhQb2ludHM6IDEwLFxuICAgIGNvbG9yOiB0aGlzLmNvbG9yXG4gIH0pO1xuXG5cbn07XG5cbkVOR0lORS5DdXJzb3IucHJvdG90eXBlID0ge1xuXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuQ3Vyc29yLFxuXG4gIHBva2U6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy50d2VlbiA9IGFwcC50d2Vlbih0aGlzKS5kaXNjYXJkKClcblxuICAgIC50byh7XG4gICAgICBkb3RSYWRpdXM6IDE2XG4gICAgfSwgMC4xLCBcIm91dFNpbmVcIilcblxuICAgIC50byh7XG4gICAgICBkb3RSYWRpdXM6IDhcbiAgICB9LCAwLjA1LCBcImluU2luZVwiKTtcblxuICB9LFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XG5cbiAgICB2YXIgcHJldkVudGl0eSA9IHRoaXMuZW50aXR5O1xuXG4gICAgdGhpcy5lbnRpdHkgPSB0aGlzLmdldEhvdmVyZWRFbnRpdHkoKTtcblxuICAgIGlmICh0aGlzLmVudGl0eSAhPT0gcHJldkVudGl0eSkge1xuXG4gICAgICBpZiAocHJldkVudGl0eSAmJiBwcmV2RW50aXR5LnBvaW50ZXJsZWF2ZSkgcHJldkVudGl0eS5wb2ludGVybGVhdmUodGhpcyk7XG4gICAgICBpZiAodGhpcy5lbnRpdHkgJiYgdGhpcy5lbnRpdHkucG9pbnRlcmVudGVyKSB0aGlzLmVudGl0eS5wb2ludGVyZW50ZXIodGhpcyk7XG5cbiAgICAgIHRoaXMub25lbnRpdHljaGFuZ2UoKTtcblxuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGlvbikge1xuXG4gICAgICB0aGlzLmhvdmVyVGltZSArPSBkdDtcblxuICAgICAgdGhpcy5wcm9ncmVzc0FjdGlvbihkdCk7XG5cbiAgICB9XG5cbiAgICAvKiBmaXJpbmcgbWVjaGFuaWNzICovXG5cbiAgICBpZiAodGhpcy50YXJnZXQgJiYgdGhpcy50YXJnZXQuZGVhZCkgdGhpcy50YXJnZXQgPSBmYWxzZTtcblxuICAgIGlmICgodGhpcy50YXJnZXRUaW1lb3V0IC09IGR0KSA8PSAwKSB7XG5cbiAgICAgIHRoaXMudGFyZ2V0VGltZW91dCA9IDAuNTtcblxuICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLmdldFRhcmdldCgpO1xuXG4gICAgfVxuXG5cbiAgICB0aGlzLmZpcmVDb29sZG93biAtPSBkdDtcblxuICAgIGlmICh0aGlzLmNhbkZpcmUoKSkge1xuXG4gICAgICB0aGlzLmZpcmUoKTtcblxuICAgIH1cblxuICAgIHRoaXMudHJhaWwuc3RlcChkdCk7XG5cblxuICB9LFxuXG4gIGdldFRhcmdldDogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgcG9vbCA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWUuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIGVudGl0eSA9IHRoaXMuZ2FtZS5lbnRpdGllc1tpXTtcblxuICAgICAgaWYgKCEoZW50aXR5IGluc3RhbmNlb2YgRU5HSU5FLlNoaXApKSBjb250aW51ZTtcblxuICAgICAgaWYgKFV0aWxzLmRpc3RhbmNlKGVudGl0eSwgdGhpcykgPiAyMDApIGNvbnRpbnVlO1xuICAgICAgaWYgKGVudGl0eS50ZWFtICE9PSB0aGlzLnRlYW0pIHBvb2wucHVzaChlbnRpdHkpO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIFV0aWxzLm5lYXJlc3QodGhpcywgcG9vbCk7XG5cbiAgfSxcblxuICBvbmVudGl0eWNoYW5nZTogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmFjdGlvbkNvbXBsZXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLmhvdmVyVGltZSA9IDA7XG5cbiAgICBpZiAodGhpcy5lbnRpdHkpIHtcblxuICAgICAgdGhpcy5hY3Rpb24gPSB0aGlzLmVudGl0eS5ob3ZlcmFibGU7XG4gICAgICB0aGlzLnJlc2V0QWN0aW9uKCk7XG5cbiAgICAgIGlmICh0aGlzLmVudGl0eS5pbnN0YW50KSB0aGlzLmFjdGlvblRpbWVvdXQgPSAwO1xuXG5cbiAgICB9IGVsc2UgdGhpcy5hY3Rpb24gPSBmYWxzZTtcblxuICAgIC8qXG4gICAgICAgIGlmICghdGhpcy5hY3Rpb25Tb3VuZCkgdGhpcy5hY3Rpb25Tb3VuZCA9IGFwcC5zb3VuZC5wbGF5KFwiYWN0aW9uXCIpLmxvb3AoKS5yYXRlKDAuNSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFjdGlvbikge1xuICAgICAgICAgIHRoaXMuYWN0aW9uU291bmQuc3RvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYWN0aW9uU291bmQuZmFkZUluKCk7XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICB0aGlzLnVwZGF0ZVRvb2x0aXAoKTtcblxuXG4gIH0sXG5cbiAgcmVzZXRBY3Rpb246IGZ1bmN0aW9uKCkge1xuXG5cbiAgICB0aGlzLmFjdGlvblRpbWVvdXQgPSB0aGlzLnRpbWVzW3RoaXMuYWN0aW9uXTtcblxuICAgIHRoaXMuYWN0aW9uRHVyYXRpb24gPSB0aGlzLmFjdGlvblRpbWVvdXQ7XG5cbiAgfSxcblxuICB1cGdyYWRlOiBmdW5jdGlvbihrZXkpIHtcblxuICAgIHRoaXMuZ2FtZS51cGdyYWRlc1trZXldICsrO1xuXG4gICAgdGhpcy5nYW1lLmJ1dHRvbnNba2V5XS5jb3VudCA9IHRoaXMuZ2V0UHJpY2Uoa2V5KTtcblxuICAgIHZhciBzaGlwcyA9IFV0aWxzLmZpbHRlcih0aGlzLmdhbWUuZW50aXRpZXMsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgcmV0dXJuIChlIGluc3RhbmNlb2YgRU5HSU5FLlNoaXApICYmIGUudGVhbTtcblxuICAgIH0pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgc2hpcCA9IHNoaXBzW2ldO1xuXG4gICAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5DaXJjbGVFeHBsb3Npb24sIHtcbiAgICAgICAgY29sb3I6IFwiIzBhZlwiLFxuICAgICAgICByYWRpdXM6IDMyLFxuICAgICAgICBhdHRhY2hlZFRvOiBzaGlwXG4gICAgICB9KTtcblxuICAgICAgc2hpcC5hcHBseVVwZ3JhZGVzKHRoaXMuZ2FtZS51cGdyYWRlcylcblxuICAgIH1cblxuICB9LFxuXG4gIGdldFByaWNlOiBmdW5jdGlvbihrZXkpIHtcblxuICAgIHJldHVybiBNYXRoLnBvdygyLCB0aGlzLmdhbWUudXBncmFkZXNba2V5XSk7XG5cbiAgfSxcblxuICBjYW5Qcm9ncmVzczogZnVuY3Rpb24oKSB7XG5cbiAgICBzd2l0Y2ggKHRoaXMuYWN0aW9uKSB7XG5cbiAgICAgIGNhc2UgXCJyZXBhaXJcIjpcblxuICAgICAgICByZXR1cm4gdGhpcy5wbGFuZXQuaHAgPCB0aGlzLnBsYW5ldC5tYXhIUDtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcImJ1aWxkXCI6XG5cbiAgICAgICAgaWYgKHRoaXMuZW50aXR5LmtleSA9PT0gXCJmaWdodGVyXCIpIHtcblxuICAgICAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyUGxhbmV0Lm1heCAtIHRoaXMuZ2FtZS5wbGF5ZXJQbGFuZXQuc2hpcHMgPD0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VzID4gMDtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlcyA+PSB0aGlzLmdldFByaWNlKHRoaXMuZW50aXR5LmtleSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgfVxuICB9LFxuXG4gIHByb2dyZXNzQWN0aW9uOiBmdW5jdGlvbihkdCkge1xuXG4gICAgaWYgKHRoaXMuY2FuUHJvZ3Jlc3MoKSAmJiAodGhpcy5hY3Rpb25UaW1lb3V0IC09IGR0KSA8IDApIHtcblxuICAgICAgdGhpcy5maW5hbGl6ZUFjdGlvbigpO1xuICAgICAgdGhpcy5yZXNldEFjdGlvbigpO1xuXG4gICAgfTtcblxuICAgIHRoaXMucHJvZ3Jlc3MgPSAxIC0gdGhpcy5hY3Rpb25UaW1lb3V0IC8gdGhpcy5hY3Rpb25EdXJhdGlvbjtcblxuXG4gIH0sXG5cbiAgZmluYWxpemVBY3Rpb246IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5hY3Rpb25Db21wbGV0ZSA9IHRydWU7XG5cbiAgICBzd2l0Y2ggKHRoaXMuYWN0aW9uKSB7XG5cbiAgICAgIGNhc2UgXCJyZXBhaXJcIjpcblxuICAgICAgICB0aGlzLnBsYW5ldC5yZXBhaXIoKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIm1pbmluZ1wiOlxuXG4gICAgICAgIHRoaXMuZW50aXR5LmRpZygpO1xuXG4gICAgICAgIGJyZWFrO1xuXG5cbiAgICAgIGNhc2UgXCJidWlsZFwiOlxuXG4gICAgICAgIHN3aXRjaCAodGhpcy5lbnRpdHkua2V5KSB7XG5cbiAgICAgICAgICBjYXNlIFwiZmlnaHRlclwiOlxuXG4gICAgICAgICAgICB0aGlzLnBsYW5ldC5zcGF3blNoaXAoXCJmaWdodGVyXCIpO1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMgLT0gMTtcbiAgICAgICAgICAgIGlmICghdGhpcy5nYW1lLmJlbmNobWFyaykgYXBwLnNvdW5kLnBsYXkoXCJidWlsZFwiKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIFwibGlmZVwiOlxuICAgICAgICAgIGNhc2UgXCJkYW1hZ2VcIjpcbiAgICAgICAgICBjYXNlIFwic3BlZWRcIjpcblxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMgLT0gdGhpcy5nZXRQcmljZSh0aGlzLmVudGl0eS5rZXkpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGUodGhpcy5lbnRpdHkua2V5KTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSBhcHAuc291bmQucGxheShcInVwZ3JhZGVcIik7XG5cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9LFxuXG4gIGhpdDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdhbWUuc2hha2UoKTtcblxuICAgIHRoaXMucGxhbmV0LmFwcGx5RGFtYWdlKDEsIHRoaXMucGxhbmV0KTtcblxuICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLkNpcmNsZUV4cGxvc2lvbiwge1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55LFxuICAgICAgY29sb3I6IFwiI2MwMlwiLFxuICAgICAgcmFkaXVzOiAzMlxuICAgIH0pXG5cbiAgfSxcblxuICBnZXRIb3ZlcmVkRW50aXR5OiBmdW5jdGlvbigpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nYW1lLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHZhciBlbnRpdHkgPSB0aGlzLmdhbWUuZW50aXRpZXNbaV07XG5cbiAgICAgIGlmIChlbnRpdHkuaG92ZXJhYmxlICYmIFV0aWxzLmRpc3RhbmNlKGVudGl0eSwgdGhpcykgPCBlbnRpdHkucmFkaXVzKSByZXR1cm4gZW50aXR5O1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy50cmFpbC5yZW5kZXIoKTtcblxuICAgIGFwcC5sYXllci5maWxsU3R5bGUodGhpcy5jb2xvcikuZmlsbENpcmNsZSh0aGlzLngsIHRoaXMueSwgdGhpcy5kb3RSYWRpdXMpO1xuXG4gICAgaWYgKHRoaXMuYWN0aW9uICYmICF0aGlzLmVudGl0eS5zaWxlbnQpIHtcblxuICAgICAgdmFyIG1vZCA9IE1hdGgubWluKDEsIGFwcC5lYXNlKDIgKiB0aGlzLmhvdmVyVGltZSwgXCJvdXRCb3VuY2VcIikpO1xuXG4gICAgICBhcHAuY3R4LnNhdmUoKTtcbiAgICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMuZW50aXR5LngsIHRoaXMuZW50aXR5LnkpO1xuXG4gICAgICBhcHAuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgIGFwcC5jdHgubGluZVdpZHRoID0gMjtcbiAgICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBhcHAuY3R4LmFyYygwLCAwLCAodGhpcy5lbnRpdHkucmFkaXVzICsgMikgKiBtb2QsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGFwcC5jdHguc3Ryb2tlKCk7XG5cbiAgICAgIGFwcC5jdHgubGluZVdpZHRoID0gODtcbiAgICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XG4gICAgICBhcHAuY3R4Lmdsb2JhbEFscGhhID0gMC4yNTtcbiAgICAgIGFwcC5jdHguYXJjKDAsIDAsIHRoaXMuZW50aXR5LnJhZGl1cyArIDgsIDAsIE1hdGguUEkgKiAyKVxuICAgICAgYXBwLmN0eC5zdHJva2UoKVxuICAgICAgYXBwLmN0eC5nbG9iYWxBbHBoYSA9IDEuMDtcblxuICAgICAgYXBwLmN0eC5saW5lV2lkdGggPSA4O1xuICAgICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGFwcC5jdHguYXJjKDAsIDAsIHRoaXMuZW50aXR5LnJhZGl1cyArIDgsIDAsIHRoaXMucHJvZ3Jlc3MgKiBNYXRoLlBJICogMilcbiAgICAgIGFwcC5jdHguc3Ryb2tlKCk7XG5cbiAgICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuXG4gICAgfVxuXG5cblxuICB9LFxuXG4gIGNhbkZpcmU6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKCF0aGlzLmdhbWUuY2hlY2tCb251cyhcImxhc2VyXCIpKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5maXJlQ29vbGRvd24gPiAwKSByZXR1cm47XG4gICAgaWYgKCF0aGlzLnRhcmdldCkgcmV0dXJuO1xuICAgIGlmIChVdGlscy5kaXN0YW5jZSh0aGlzLCB0aGlzLnRhcmdldCkgPiB0aGlzLnJhbmdlKSByZXR1cm47XG5cbiAgICB0aGlzLmZpcmVDb29sZG93biA9IHRoaXMuZmlyZUludGVydmFsO1xuXG4gICAgdGhpcy5maXJlKCk7XG5cbiAgfSxcblxuICBmaXJlOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLkJ1bGxldCwge1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55LFxuICAgICAgdGVhbTogdGhpcy50ZWFtLFxuICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgIGRhbWFnZTogMixcbiAgICAgIHNwZWVkOiAxMDAwXG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwibGFzZXJcIik7XG5cbiAgfSxcblxuICBtb3ZlVG86IGZ1bmN0aW9uKGRlc3RpbmF0aW9uKSB7XG5cbiAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG5cbiAgfSxcblxuICB1cGRhdGVUb29sdGlwOiBmdW5jdGlvbigpIHtcblxuICAgIGlmICh0aGlzLmVudGl0eSkge1xuICAgICAgaWYgKHRoaXMuZW50aXR5LnRvb2x0aXApIHRoaXMuZ2FtZS50b29sdGlwID0gdGhpcy5lbnRpdHkudG9vbHRpcDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYW1lLnRvb2x0aXAgPSBmYWxzZTtcbiAgICB9XG5cbiAgfVxuXG59IiwiRU5HSU5FLlJlc291cmNlID0gZnVuY3Rpb24oYXJncykge1xuXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCBhcmdzKTtcblxuICB0aGlzLnJhZGl1cyA9IDMyO1xuXG4gIHRoaXMuZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIDYuMjg7XG4gIHRoaXMuc3BlZWQgPSAzMjtcblxuICB0aGlzLmZvcmNlRGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIDYuMjg7XG4gIHRoaXMuZm9yY2UgPSA2NCArIE1hdGgucmFuZG9tKCkgKiAxMjg7XG5cbiAgdGhpcy5mb3JjZSAqPSAzO1xuICB0aGlzLmZvcmNlRGFtcGluZyA9IHRoaXMuZm9yY2U7XG5cbiAgdGhpcy5saWZldGltZSA9IDA7XG4gIHRoaXMuZHVyYXRpb24gPSAxMDtcblxuICB0aGlzLnZhbHVlID0gTWF0aC5yYW5kb20oKSAqIDMgfCAwO1xuXG4gIHRoaXMuc3ByaXRlID0gdGhpcy5zcHJpdGVzW3RoaXMudmFsdWVdO1xufTtcblxuRU5HSU5FLlJlc291cmNlLnByb3RvdHlwZSA9IHtcblxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLlJlc291cmNlLFxuXG4gIHF1b3RhOiAwLjcsXG5cbiAgc3ByaXRlczogW1xuICAgIFszMzMsIDEwNSwgMTAsIDEwXSxcbiAgICBbMzIwLCAxMDQsIDEyLCAxMl0sXG4gICAgWzMwMywgMTAyLCAxNiwgMTZdXG4gIF0sXG5cbiAgdHlwZTogXCJyZXNvdXJjZVwiLFxuXG5cbiAgY29sbGVjdDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xuXG4gICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSBhcHAuc291bmQucGxheShcImNvaW5cIik7XG5cbiAgICB0aGlzLmdhbWUucGxheWVyLnBva2UoKTtcblxuICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLkNpcmNsZUV4cGxvc2lvbiwge1xuICAgICAgY29sb3I6IFwiI2ZjMFwiLFxuICAgICAgcmFkaXVzOiA4LFxuICAgICAgYXR0YWNoZWRUbzogdGhpcyxcbiAgICAgIGR1cmF0aW9uOiAwLjI1XG4gICAgfSk7XG5cbiAgICB0aGlzLmdhbWUucGxheWVyLnJlc291cmNlcyArPSB0aGlzLnZhbHVlO1xuXG4gIH0sXG5cbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcblxuICAgIHRoaXMubGlmZXRpbWUgKz0gZHQ7XG5cbiAgICB2YXIgcGxheWVyRGlzdGFuY2UgPSBVdGlscy5kaXN0YW5jZSh0aGlzLCB0aGlzLmdhbWUucGxheWVyKTtcblxuICAgIGlmICh0aGlzLmZvcmNlKSB7XG5cbiAgICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmZvcmNlRGlyZWN0aW9uKSAqIHRoaXMuZm9yY2UgKiBkdDtcbiAgICAgIHRoaXMueSArPSBNYXRoLnNpbih0aGlzLmZvcmNlRGlyZWN0aW9uKSAqIHRoaXMuZm9yY2UgKiBkdDtcblxuICAgICAgdGhpcy5mb3JjZSA9IE1hdGgubWF4KDAsIHRoaXMuZm9yY2UgLSB0aGlzLmZvcmNlRGFtcGluZyAqIGR0KTtcblxuICAgIH1cblxuICAgIGlmICh0aGlzLnBva2VkICYmIHRoaXMuZ2FtZS5jaGVja0JvbnVzKFwibWFnbmV0XCIpKSB7XG5cbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gTWF0aC5hdGFuMih0aGlzLmdhbWUucGxheWVyLnkgLSB0aGlzLnksIHRoaXMuZ2FtZS5wbGF5ZXIueCAtIHRoaXMueCk7XG5cbiAgICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XG4gICAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xuXG5cbiAgICAgIGlmICghdGhpcy5mb3JjZSkge1xuICAgICAgICB0aGlzLnNwZWVkICs9IDI1NiAqIGR0O1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgaWYgKHBsYXllckRpc3RhbmNlIDwgMTAwKSB7XG4gICAgICAgIHRoaXMucG9rZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTI4O1xuICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBpZiAodGhpcy5saWZldGltZSA+IDAuNSkge1xuICAgICAgaWYgKHBsYXllckRpc3RhbmNlIDwgMzIpIHtcbiAgICAgICAgdGhpcy5jb2xsZWN0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGlmZXRpbWUgPiB0aGlzLmR1cmF0aW9uKSB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xuXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzY2FsZSA9IDAuMiArIDAuOCAqIE1hdGguc2luKE1hdGguUEkgKiAoYXBwLmxpZmV0aW1lICUgMC4yIC8gMC4yKSk7XG5cbiAgICBhcHAuY3R4LnNhdmUoKTtcblxuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcblxuICAgIGFwcC5jdHguc2NhbGUoc2NhbGUsIDEuMCk7XG5cbiAgICBhcHAuY3R4LmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LFxuICAgICAgdGhpcy5zcHJpdGVbMF0sIHRoaXMuc3ByaXRlWzFdLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM10sIC10aGlzLnNwcml0ZVsyXSAvIDIsIC10aGlzLnNwcml0ZVszXSAvIDIsIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXVxuICAgICk7XG5cbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcblxuICB9XG5cbn07IiwiRU5HSU5FLkJ1dHRvbiA9IGZ1bmN0aW9uKGFyZ3MpIHtcblxuICBVdGlscy5leHRlbmQodGhpcywge1xuXG4gICAgcmFkaXVzOiAzMlxuXG4gIH0sIGFyZ3MpO1xuXG5cbiAgdGhpcy5pbWFnZSA9IGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQ7XG5cbn07XG5cbkVOR0lORS5CdXR0b24ucHJvdG90eXBlID0ge1xuXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuQnV0dG9uLFxuXG4gIHR5cGU6IFwiYnV0dG9uXCIsXG5cbiAgcG9pbnRlcmVudGVyOiBmdW5jdGlvbigpIHtcblxuICAgIGFwcC50d2Vlbih0aGlzKS5kaXNjYXJkKCkudG8oe1xuICAgICAgcmFkaXVzOiAyNFxuICAgIH0sIDAuMSkudG8oe1xuICAgICAgcmFkaXVzOiAzMlxuICAgIH0sIDAuMiwgXCJvdXRTaW5lXCIpO1xuXG4gIH0sXG5cbiAgYWN0aW9uOiBmdW5jdGlvbigpIHtcblxuXG4gICAgYXBwLnNvdW5kLnBsYXkoXCJsYXNlclwiKTtcblxuICB9LFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKCkge1xuXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuXG4gICAgaWYgKHRoaXMuc3ByaXRlKSB7XG4gICAgICB2YXIgc2NhbGUgPSB0aGlzLnJhZGl1cyAvIDMyO1xuXG4gICAgICBhcHAuY3R4LnNhdmUoKTtcblxuICAgICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgICAgYXBwLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSxcbiAgICAgICAgdGhpcy5zcHJpdGVbMF0sIHRoaXMuc3ByaXRlWzFdLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM10sIC10aGlzLnNwcml0ZVsyXSAvIDIsIC10aGlzLnNwcml0ZVszXSAvIDIsIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXVxuICAgICAgKTtcblxuICAgICAgYXBwLmN0eC5yZXN0b3JlKCk7XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb3VudCkge1xuICAgICAgYXBwLmxheWVyLnRleHRBbGlnbihcImNlbnRlclwiKS5mb250KFwiYm9sZCAzMnB4IEFyaWFsXCIpLmZpbGxTdHlsZSh0aGlzLmNvbG9yKS5maWxsVGV4dCh0aGlzLmNvdW50LCB0aGlzLngsIHRoaXMueSAtIHRoaXMucmFkaXVzIC0gNDgpO1xuICAgIH1cblxuICB9XG5cbn07IiwiRU5HSU5FLlBhcnRpY2xlID0gZnVuY3Rpb24oYXJncykge1xuXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XG4gICAgY29sb3I6IFwiIzBmYVwiLFxuICAgIHJhZGl1czogNFxuICB9LCBhcmdzKVxuXG4gIHRoaXMuc3ByaXRlSW5kZXggPSAwO1xuXG4gIHRoaXMucmVzZXQoKTtcblxufTtcblxuRU5HSU5FLlBhcnRpY2xlLnByb3RvdHlwZSA9IHtcblxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLlBhcnRpY2xlLFxuXG4gIHF1b3RhOiAwLjUsXG5cbiAgc3ByaXRlczogW1xuICAgIFswLCAwLCA2LCA2XSxcbiAgICBbMCwgNywgNSwgNV0sXG4gICAgWzAsIDEzLCA1LCA1XSxcbiAgICBbMSwgMTksIDMsIDNdXG4gIF0sXG5cbiAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saWZldGltZSA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDAuNTtcblxuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5nYW1lLnJhbmRvbSgpICogNi4yODtcbiAgICB0aGlzLnNwZWVkID0gMzIgKyB0aGlzLmdhbWUucmFuZG9tKCkgKiAxMjg7XG5cbiAgICB0aGlzLnNwZWVkICo9IDM7XG5cbiAgICB0aGlzLmRhbXBpbmcgPSB0aGlzLnNwZWVkICogMjtcblxuICB9LFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XG5cbiAgICB0aGlzLmxpZmV0aW1lICs9IGR0O1xuXG4gICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcbiAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xuXG4gICAgdGhpcy5zcGVlZCA9IE1hdGgubWF4KDAsIHRoaXMuc3BlZWQgLSB0aGlzLmRhbXBpbmcgKiBkdCk7XG5cbiAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4odGhpcy5saWZldGltZSAvIHRoaXMuZHVyYXRpb24sIDEuMCk7XG5cbiAgICBpZiAodGhpcy5wcm9ncmVzcyA+PSAxLjApIHtcbiAgICAgIHRoaXMueCA9IDA7XG4gICAgICB0aGlzLnkgPSAwO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5zcHJpdGVJbmRleCA9IHRoaXMucHJvZ3Jlc3MgKiB0aGlzLnNwcml0ZXMubGVuZ3RoIHwgMDtcblxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cblxuICAgIC8vIHZhciBzID0gdGhpcy5zaXplICogKDEgLSB0aGlzLnByb2dyZXNzKTtcblxuICAgIC8vIGlmIChzID4gMCkge1xuICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEuMCkgcmV0dXJuO1xuXG4gICAgdGhpcy5pbWFnZSA9IGFwcC5nZXRDb2xvcmVkSW1hZ2UoYXBwLmltYWdlcy5wYXJ0aWNsZXMsIHRoaXMuY29sb3IgfHwgXCIjMGZhXCIpO1xuXG4gICAgLy8gYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIC8vIGFwcC5jdHguZmlsbFJlY3QodGhpcy54IC0gcyAvIDIsIHRoaXMueSAtIHMgLyAyLCBzLCBzKVxuXG4gICAgdmFyIHNwcml0ZSA9IHRoaXMuc3ByaXRlc1t0aGlzLnNwcml0ZUluZGV4XTtcblxuICAgIGFwcC5jdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHNwcml0ZVswXSwgc3ByaXRlWzFdLCBzcHJpdGVbMl0sIHNwcml0ZVszXSxcbiAgICAgIHRoaXMueCwgdGhpcy55LCBzcHJpdGVbMl0sIHNwcml0ZVszXSlcblxuICAgIC8vIH1cblxuICB9XG5cbn07IiwiRU5HSU5FLlBsYW5ldCA9IGZ1bmN0aW9uKGFyZ3MpIHtcblxuICBVdGlscy5leHRlbmQodGhpcywge1xuXG4gICAgcmFkaXVzOiA0OCxcbiAgICBocDogMjAsXG4gICAgbWF4OiAxMDAsXG4gICAgc2hpcHM6IDAsXG4gICAgcmVwYWlyUHJvZ3Jlc3M6IDAsXG4gICAgcmVwYWlyVGltZTogNCxcbiAgICBhc3Rlcm9pZHNTaGllbGQ6IHRydWUsXG4gICAgc2hpZWxkU2NhbGU6IDAuMFxuXG4gIH0sIGFyZ3MpO1xuXG4gIHRoaXMubWF4SFAgPSB0aGlzLmhwO1xuXG4gIHRoaXMubGlmZXRpbWUgPSAwO1xuXG59O1xuXG5FTkdJTkUuUGxhbmV0LnByb3RvdHlwZSA9IHtcblxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLlBsYW5ldCxcblxuICB0eXBlOiBcInBsYW5ldFwiLFxuXG4gIGhvdmVyYWJsZTogXCJyZXBhaXJcIixcblxuICBzcHJpdGU6IFsyMDEsIDIxNSwgMTA0LCAxMDRdLFxuXG4gIHNoaWVsZFNwcml0ZTogWzQ5MiwgMzIwLCAxMjQsIDEyNF0sXG5cbiAgcmVwYWlyOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaHArKztcblxuICB9LFxuXG4gIGFwcGx5RGFtYWdlOiBmdW5jdGlvbihkYW1hZ2UsIGF0dGFja2VyKSB7XG5cbiAgICB0aGlzLmdhbWUuc2hha2UoKTtcblxuICAgIHRoaXMuaHAtLTtcblxuICAgIGlmICh0aGlzLmhwIDw9IDAgJiYgIXRoaXMuZ2FtZS5iZW5jaG1hcmspIHRoaXMuZ2FtZS5nYW1lb3ZlcigpO1xuXG4gICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSBhcHAuc291bmQucGxheShcInBsYW5ldEhpdFwiKTtcblxuICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLkNpcmNsZUV4cGxvc2lvbiwge1xuICAgICAgeDogYXR0YWNrZXIueCxcbiAgICAgIHk6IGF0dGFja2VyLnksXG4gICAgICBjb2xvcjogXCIjYTA0XCIsXG4gICAgICByYWRpdXM6IDMyXG4gICAgfSlcblxuICB9LFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XG5cbiAgICB0aGlzLmxpZmV0aW1lICs9IGR0O1xuXG4gICAgdmFyIHByZXZTaGllbGQgPSB0aGlzLmFzdGVyb2lkc1NoaWVsZDtcbiAgICB0aGlzLmFzdGVyb2lkc1NoaWVsZCA9IGZhbHNlO3RoaXMuZ2FtZS5jaGVja0JvbnVzKFwic2hpZWxkXCIpO1xuXG4gICAgaWYgKHByZXZTaGllbGQgIT09IHRoaXMuYXN0ZXJvaWRzU2hpZWxkKSB7XG5cbiAgICAgIGFwcC50d2Vlbih0aGlzKS5kaXNjYXJkKCkudG8oe1xuICAgICAgICBzaGllbGRTY2FsZTogdGhpcy5hc3Rlcm9pZHNTaGllbGQgPyAxLjAgOiAwLjBcbiAgICAgIH0sIDAuNSwgXCJvdXRFbGFzdGljXCIpO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgc3Bhd25TaGlwOiBmdW5jdGlvbih0eXBlKSB7XG5cbiAgICB2YXIgc2hpcCA9IHRoaXMuZ2FtZS5hZGQoRU5HSU5FLlNoaXAsIHtcbiAgICAgIHg6IHRoaXMueCxcbiAgICAgIHk6IHRoaXMueSxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICB0ZWFtOiAxLFxuICAgICAgcGxhbmV0OiB0aGlzXG4gICAgfSk7XG5cbiAgICBzaGlwLmZvcmNlRGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIDY7XG4gICAgc2hpcC5mb3JjZSA9IDIwMDtcblxuICAgIHRoaXMuc2hpcHMrKztcblxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICBhcHAubGF5ZXIuYWxpZ24oMC41LCAwLjUpO1xuICAgIGFwcC5sYXllci5kcmF3UmVnaW9uKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsIHRoaXMuc3ByaXRlLCB0aGlzLngsIHRoaXMueSk7XG4gICAgYXBwLmxheWVyLnRleHRBbGlnbihcImNlbnRlclwiKS5mb250KFwiYm9sZCA0OHB4IEFyaWFsXCIpLmZpbGxTdHlsZShcIiNmZmZcIikuZmlsbFRleHQodGhpcy5ocCwgdGhpcy54LCB0aGlzLnkgLSAyNCk7XG4gICAgYXBwLmxheWVyLnJlYWxpZ24oKTtcblxuICAgIGlmICh0aGlzLmFzdGVyb2lkc1NoaWVsZCAmJiB0aGlzLnNoaWVsZFNjYWxlID4gMCkge1xuICAgICAgdmFyIHNjYWxlID0gdGhpcy5zaGllbGRTY2FsZTtcbiAgICAgIGFwcC5jdHguc2F2ZSgpO1xuICAgICAgYXBwLmN0eC5nbG9iYWxBbHBoYSA9IDAuNTtcbiAgICAgIGFwcC5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJsaWdodGVyXCI7XG4gICAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG4gICAgICBhcHAuY3R4LnNjYWxlKHNjYWxlLCBzY2FsZSk7XG4gICAgICBhcHAuY3R4LmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LCB0aGlzLnNoaWVsZFNwcml0ZVswXSwgdGhpcy5zaGllbGRTcHJpdGVbMV0sIHRoaXMuc2hpZWxkU3ByaXRlWzJdLCB0aGlzLnNoaWVsZFNwcml0ZVszXSwgLXRoaXMuc2hpZWxkU3ByaXRlWzJdIC8gMiwgLXRoaXMuc2hpZWxkU3ByaXRlWzNdIC8gMiwgdGhpcy5zaGllbGRTcHJpdGVbMl0sIHRoaXMuc2hpZWxkU3ByaXRlWzNdKTtcbiAgICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICB9XG5cbn07IiwiLyogVGhlIGNvdW50ZXIgaW4gdGhlIHRvcC1sZWZ0IGNvcm5lciBpczpcblxuQVZFUkFHRSBGUkFNRSBUSU1FIHwgIERFVklDRSAgUE9XRVIgICB8IEVOVElUSUVTIENPVU5UXG4gICAgICAgICAgICAgICAgICAgICAoYmFzZWxpbmVGYWN0b3IpXG4qL1xuXG5cbi8qIFJlZmVyZW5jZSBiYXNlbGluZSB0byBjYWxjdWxhdGUgZGV2aWNlIHBvd2VyICovXG5cblJFRkVSRU5DRV9CQVNFTElORSA9IDM3ODtcblxuLyogUmVmZXJlbmNlIGZyYW1lIHRpbWUgdG8gdGVsbCBob3cgd2VsbCB0aGUgZ2FtZSBoYXMgYmVlbiBvcHRpbWl6ZWQgKi9cbi8qIE1ha2UgaXQgaGlnaGVyIHRvIGdpdmUgdXNlciBtb3JlIENQVSBwb3dlciAqL1xuXG5SRUZFUkVOQ0VfRlJBTUVfVElNRSA9IDAuODtcblxuLyogSG93IG11Y2ggb3B0aW1pemF0aW9uIHZhbHVlIG9uZSBzaGlwIGRyYWlucyAqL1xuXG5TSElQX0NQVV9DT1NUID0gMC4xO1xuXG5FTkdJTkUuR2FtZSA9IHtcblxuICBib251c2VzOiB7XG5cbiAgICBtYWduZXQ6IDAuMSxcbiAgICBsYXNlcjogMC4yLFxuICAgIHNoaWVsZDogMC40XG5cbiAgfSxcblxuICBleHBsb3Npb246IGZ1bmN0aW9uKHgsIHksIGNvdW50LCBjb2xvcikge1xuXG4gICAgaWYgKCF0aGlzLnBhcnRpY2xlc1Bvb2wpIHtcblxuICAgICAgdGhpcy5wYXJ0aWNsZXNQb29sID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcblxuICAgICAgICB2YXIgcGFydGljbGUgPSB0aGlzLmFkZChFTkdJTkUuUGFydGljbGUsIHtcbiAgICAgICAgICB4OiB4LFxuICAgICAgICAgIHk6IHlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNQb29sLnB1c2gocGFydGljbGUpO1xuXG4gICAgICB9XG5cbiAgICAgIHRoaXMucGFydGljbGVJbmRleCA9IDA7XG5cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBjb3VudDsgaSsrKSB7XG5cbiAgICAgIGlmICgrK3RoaXMucGFydGljbGVJbmRleCA+PSB0aGlzLnBhcnRpY2xlc1Bvb2wubGVuZ3RoKSB0aGlzLnBhcnRpY2xlSW5kZXggPSAwOztcblxuICAgICAgdmFyIHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNQb29sW3RoaXMucGFydGljbGVJbmRleF07XG5cbiAgICAgIHBhcnRpY2xlLnggPSB4O1xuICAgICAgcGFydGljbGUueSA9IHk7XG4gICAgICBwYXJ0aWNsZS5jb2xvciA9IGNvbG9yO1xuXG4gICAgICBwYXJ0aWNsZS5yZXNldCgpO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgcmFuZG9tOiBmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiB0aGlzLmJlbmNobWFyayA/IDAuNSA6IE1hdGgucmFuZG9tKCk7XG5cbiAgfSxcblxuICBhZGQ6IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBhcmdzKSB7XG5cbiAgICBhcmdzID0gYXJncyB8fCB7fTtcblxuICAgIGFyZ3MuZ2FtZSA9IHRoaXM7XG5cbiAgICB2YXIgZW50aXR5ID0gbmV3IGNvbnN0cnVjdG9yKGFyZ3MpO1xuXG4gICAgdGhpcy5lbnRpdGllcy5wdXNoKGVudGl0eSk7XG5cbiAgICByZXR1cm4gZW50aXR5O1xuXG4gIH0sXG5cbiAgcmVtb3ZlOiBmdW5jdGlvbihlbnRpdHkpIHtcblxuICAgIGVudGl0eS5kZWFkID0gdHJ1ZTtcblxuICB9LFxuXG4gIHNjYWxlQ29taWNCdWJibGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jb21pY1NjYWxlID0gMS4wO1xuXG4gICAgJGNvbWljYnViYmxlID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiI2NvbWljYnViYmxlXCIpO1xuXG4gICAgdmFyIHR3ZWVuID0gYXBwLnR3ZWVuKHRoaXMpLnRvKHtcbiAgICAgIGNvbWljU2NhbGU6IDAuNVxuICAgIH0pO1xuXG4gICAgdHdlZW4ub25zdGVwID0gZnVuY3Rpb24oYXBwKSB7XG5cbiAgICAgICRjb21pY2J1YmJsZS5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKFwiICsgYXBwLmNvbWljU2NhbGUgKyBcIixcIiArIGFwcC5jb21pY1NjYWxlICsgXCIpXCI7XG5cbiAgICB9XG5cbiAgfSxcblxuICBlbnRlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHdpbmRvdy5nYSkge1xuICAgICAgZ2EoJ3NlbmQnLCAnc2NyZWVudmlldycsIHtcbiAgICAgICAgJ2FwcE5hbWUnOiAnUG93ZXJTdXJnZScsXG4gICAgICAgICdzY3JlZW5OYW1lJzogJ0dhbWUnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhcHAucmVuZGVyZXIuc2V0U21vb3RoaW5nKGZhbHNlKTtcblxuICAgIHRoaXMuc2NhbGVDb21pY0J1YmJsZSgpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJiYXNlbGluZVwiLCBhcHAuYmFzZWxpbmUpO1xuXG4gICAgdGhpcy5tdXNpYyA9IGFwcC5tdXNpYy5wbGF5KFwiZHVzdFwiKS52b2x1bWUoMC41KS5mYWRlSW4oNCkubG9vcCgpO1xuXG4gICAgdGhpcy5ncmFkaWVudCA9IGFwcC5jdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoYXBwLmNlbnRlci54LCBhcHAuY2VudGVyLnksIDAsIGFwcC5jZW50ZXIueCwgYXBwLmNlbnRlci55LCBhcHAuY2VudGVyLngpO1xuXG4gICAgdGhpcy5ncmFkaWVudC5hZGRDb2xvclN0b3AoMC4wLCBcInRyYW5zcGFyZW50XCIpO1xuICAgIHRoaXMuZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMCwgXCIjMDAwXCIpO1xuXG4gICAgdGhpcy5yZXNldCgpO1xuXG4gIH0sXG5cbiAgbGVhdmU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5tdXNpYy5mYWRlT3V0KDIpO1xuXG4gIH0sXG5cbiAgZ2V0U2NhbGU6IGZ1bmN0aW9uKGVudGl0eSkge1xuXG4gICAgcmV0dXJuIDEgLSBNYXRoLm1pbigxLjAsIFV0aWxzLmRpc3RhbmNlKGVudGl0eSwgYXBwLmNlbnRlcikgLyAoYXBwLndpZHRoICogMC41KSkgKiAwLjc1O1xuXG4gIH0sXG5cbiAgc3Bhd25Bc3Rlcm9pZDogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgdmFyIHJhZGl1cyA9IGFwcC53aWR0aCAvIDI7XG4gICAgdmFyIG94ID0gTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xuICAgIHZhciBveSA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcblxuICAgIHRoaXMuYWRkKEVOR0lORS5Bc3Rlcm9pZCwge1xuICAgICAgeDogYXBwLmNlbnRlci54ICsgb3gsXG4gICAgICB5OiBhcHAuY2VudGVyLnkgKyBveVxuICAgIH0pO1xuXG4gIH0sXG5cbiAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5zcGF3blRpbWVvdXQgPSAwO1xuICAgIHRoaXMuY3B1VXNhZ2UgPSAwO1xuICAgIHRoaXMuY3B1QmFyUHJvZ3Jlc3MgPSAwO1xuXG4gICAgdGhpcy51cGdyYWRlcyA9IHtcblxuICAgICAgc3BlZWQ6IDEsXG4gICAgICBkYW1hZ2U6IDEsXG4gICAgICBsaWZlOiAxXG5cbiAgICB9O1xuXG4gICAgZGVsZXRlIHRoaXMucGFydGljbGVzUG9vbDtcblxuICAgIHRoaXMuc2NvcmUgPSAwO1xuXG4gICAgdGhpcy53YXZlID0gMDtcblxuICAgIHRoaXMudG9vbHRpcCA9IGZhbHNlO1xuXG4gICAgdGhpcy5lbnRpdGllcyA9IFtdO1xuXG4gICAgdGhpcy5zdGFycyA9IHRoaXMuYWRkKEVOR0lORS5CYWNrZ3JvdW5kU3RhcnMpO1xuXG4gICAgdGhpcy5wbGF5ZXJQbGFuZXQgPSB0aGlzLmFkZChFTkdJTkUuUGxhbmV0LCB7XG4gICAgICB4OiBhcHAuY2VudGVyLngsXG4gICAgICB5OiBhcHAuY2VudGVyLnksXG4gICAgICB0ZWFtOiAxXG4gICAgfSk7XG5cbiAgICB0aGlzLnBsYXllciA9IG5ldyBFTkdJTkUuQ3Vyc29yKHRoaXMsIDEsIHRoaXMucGxheWVyUGxhbmV0KTtcblxuICAgIHRoaXMucGxheWVyLnggPSBhcHAuY2VudGVyLng7XG4gICAgdGhpcy5wbGF5ZXIueSA9IGFwcC5jZW50ZXIueTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG5cbiAgICAgIHRoaXMuc3Bhd25Bc3Rlcm9pZCgpO1xuXG4gICAgfVxuXG4gICAgdmFyIGJ1dHRvbnMgPSBbXCJzcGVlZFwiLCBcImxpZmVcIiwgXCJkYW1hZ2VcIl07XG5cbiAgICB0aGlzLmJ1dHRvbnMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIga2V5ID0gYnV0dG9uc1tpXTtcblxuICAgICAgdGhpcy5idXR0b25zW2tleV0gPSB0aGlzLmFkZChFTkdJTkUuQnV0dG9uLCB7XG4gICAgICAgIGNvbG9yOiBkZWZzLnRlYW1Db2xvclsxXSxcbiAgICAgICAgeDogYXBwLmNlbnRlci54IC0gODAgKyBpICogMTAwLFxuICAgICAgICB5OiBhcHAuaGVpZ2h0IC0gNzAsXG4gICAgICAgIHNwcml0ZTogZGVmcy5idXR0b25zW2tleV0sXG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBjb3VudDogMSxcbiAgICAgICAgaG92ZXJhYmxlOiBcImJ1aWxkXCIsXG4gICAgICAgIHRvb2x0aXA6IGRlZnMudG9vbHRpcHNba2V5XVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLm5leHRXYXZlKCk7XG5cbiAgICB0aGlzLmV4cGxvc2lvbihhcHAuY2VudGVyLngsIGFwcC5jZW50ZXIueSwgMSk7XG5cbiAgfSxcblxuICBjcHVIaXN0b3J5OiBbXSxcblxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xuXG4gICAgdmFyIGJlZm9yZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgLyogc2xvdyBtb3Rpb24gLSB3aGVuIHlvdSBjb2xsZWN0IGZyZWV6ZSBwb3dlcnVwICovXG5cbiAgICB0aGlzLnRpbWVGYWN0b3IgPSAxLjA7XG5cbiAgICBpZiAodGhpcy5mcmVlemVMaWZlc3BhbiA+IDApIHtcblxuICAgICAgdGhpcy5mcmVlemVMaWZlc3BhbiAtPSBkdDtcbiAgICAgIHRoaXMudGltZUZhY3RvciA9IDAuMTtcblxuICAgIH1cblxuICAgIC8qIHVwZGF0ZSB0aGUgZ2FtZSAxMCB0aW1lcyB0byBtYWduaXR1ZGUgcmVzdWx0cyBpbiBwcm9maWxlciAqL1xuXG4gICAgdmFyIE1BR05JRlkgPSA1O1xuXG4gICAgdmFyIHF1b3RhID0gMC4wO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcbiAgICAgIHF1b3RhICs9IGVudGl0eS5xdW90YSB8fCAwLjc7XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgTUFHTklGWTsgaisrKSB7XG4gICAgICAgIGVudGl0eS5zdGVwKGR0IC8gTUFHTklGWSk7XG5cbiAgICAgICAgaWYgKGVudGl0eS5kZWFkKSB7XG4gICAgICAgICAgdGhpcy5lbnRpdGllcy5zcGxpY2UoaS0tLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucXVvdGEgPSBxdW90YTtcblxuICAgIHZhciBmcmFtZVRpbWUgPSAocGVyZm9ybWFuY2Uubm93KCkgLSBiZWZvcmUpIC8gTUFHTklGWTtcblxuICAgIC8qIG1lYXN1cmUgb3B0aW1pemF0aW9uICovXG5cbiAgICAvKiBJdCdzIHRoZSBhdmVyYWdlIG9mIDEwMCBmcmFtZSB0aW1lcyAqL1xuXG4gICAgLypcblxuICAgICAgYmFzZWxpbmVGYWN0b3IgICAgICAtIGJhc2VsaW5lIHZzIHJlZmVyZW5jZSBzYW1wbGUgdG8gZ2V0IGRldmljZSBwb3dlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoZSBkZXZpY2UgaXMgb3Zlci1wb3dlcmVkIHdlIGFydGlmaWNpYWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFrZSBmcmFtZVRpbWUgaGlnaGVyIHRvIG1ha2UgaXQgbW9yZSBmYWlyIGFtb25nIHRoZSBwbGF5ZXJzXG5cbiAgICAgIG9wdGltaXphdGlvblJhdGluZyAgLSByZWZlcmVuY2UgZnJhbWUgdGltZSBkaXZpZGVkIGJ5IChjdXJyZW50KSBhdmVyYWdlIGZyYW1lIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kaWNhcGVkIGJ5IGJhc2VsaW5lRmFjdG9yIC0gdGhpcyBnaXZlcyBhIGZhY3RvciBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdyB3ZWxsIHVzZXIgb3B0aW1pemVkIHRoZSBnYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYWtlIFJFRkVSRU5DRV9GUkFNRV9USU1FIGhpZ2hlciB0byBnaXZlIHBsYXllciBNT1JFIGNwdSBvdXRwdXRcblxuICAgICovXG5cblxuICAgIHRoaXMuY3B1SGlzdG9yeS5wdXNoKGZyYW1lVGltZSAvIHF1b3RhKTtcblxuICAgIGlmICh0aGlzLmNwdUhpc3RvcnkubGVuZ3RoID4gNjApIHRoaXMuY3B1SGlzdG9yeS5zaGlmdCgpO1xuXG4gICAgdGhpcy5hdmVyYWdlRnJhbWVUaW1lID0gdGhpcy5hdmVyYWdlKHRoaXMuY3B1SGlzdG9yeSk7XG5cbiAgICB0aGlzLm9wdGltaXphdGlvblJhdGluZyA9ICgoMC44IC8gYXBwLmJhc2VsaW5lKSAvICh0aGlzLmF2ZXJhZ2VGcmFtZVRpbWUpKTtcblxuICAgIHRoaXMucGxheWVyLnN0ZXAoZHQpO1xuXG4gICAgLyogdXNlIG9wdGltaXphdGlvbiByZXN1bHRzIHRvIGFmZmVjdCB0aGUgZ2FtZSAqL1xuXG4gICAgdGhpcy5hcHBseU9wdGltaXphdGlvbihkdCk7XG5cblxuICB9LFxuXG4gIGF2ZXJhZ2U6IGZ1bmN0aW9uKGFycmF5KSB7XG5cbiAgICBpZiAoIWFycmF5Lmxlbmd0aCkgcmV0dXJuIDA7XG5cbiAgICB2YXIgc3VtID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN1bSArPSBhcnJheVtpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VtIC8gYXJyYXkubGVuZ3RoO1xuXG4gIH0sXG5cbiAgYXBwbHlPcHRpbWl6YXRpb246IGZ1bmN0aW9uKGR0KSB7XG5cbiAgICB2YXIgY3B1VXNhZ2UgPSAwO1xuXG4gICAgLyogY2FsY3VsYXRlIChhcnRpZmljaWFsKSBjcHVVc2FnZSBvZiBzaGlwc1xuICAgICAgIGlmIGNwdVVzYWdlIGlzIGdyZWF0ZXIgdGhhbiBvcHRpbWl6YXRpb25SYXRpbmdcbiAgICAgICBmcmVlemUgYSBzaGlwXG4gICAgKi9cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICB2YXIgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcblxuICAgICAgaWYgKCEoZW50aXR5IGluc3RhbmNlb2YgRU5HSU5FLlNoaXApKSBjb250aW51ZTtcbiAgICAgIGlmICghZW50aXR5LnRlYW0pIGNvbnRpbnVlO1xuICAgICAgaWYgKGVudGl0eS5mcmVlKSBjb250aW51ZTtcblxuICAgICAgY3B1VXNhZ2UgKz0gU0hJUF9DUFVfQ09TVDtcblxuICAgICAgaWYgKGNwdVVzYWdlIDwgdGhpcy5vcHRpbWl6YXRpb25SYXRpbmcpIHtcblxuICAgICAgICBlbnRpdHkuZnJvemVuID0gZmFsc2U7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZW50aXR5LmZyb3plbiA9IHRydWU7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8qIHR3ZWVuIGNwdVVzYWdlIGluc3RlYWQgb2Ygc2V0dGluZyBpdCBpbnN0YW50bHkgKGxlc3Mgaml0dGVyaW5nKSAqL1xuXG4gICAgdGhpcy5jcHVVc2FnZSA9IFV0aWxzLm1vdmVUbyh0aGlzLmNwdVVzYWdlLCBjcHVVc2FnZSwgTWF0aC5hYnModGhpcy5jcHVVc2FnZSAtIGNwdVVzYWdlKSAqIDAuMjUgKiBkdCk7XG4gICAgdGhpcy5yZWFsQ3B1VXNhZ2UgPSBjcHVVc2FnZTtcblxuICAgIC8qIHRoYXQncyB0aGUgdmFsdWUgMC4wIC0gMS4wIHRoYXQgY29yZXNwb25kcyB3aXRoIHRoZSB5ZWxsb3cgcG93ZXIgYmFyICovXG5cbiAgICB0aGlzLmNwdVJhdGlvID0gMSAtIE1hdGgubWluKDEuMCwgdGhpcy5jcHVVc2FnZSAvIHRoaXMub3B0aW1pemF0aW9uUmF0aW5nKTtcbiAgICB0aGlzLmNwdUJhclByb2dyZXNzID0gVXRpbHMubW92ZVRvKHRoaXMuY3B1QmFyUHJvZ3Jlc3MsIHRoaXMuY3B1UmF0aW8sIDAuMiAqIGR0KTtcblxuICAgIC8qIHNwYXduIHNoaXBzIGlmIHRoZXJlIGlzIGVub3VnaCBwb3dlciAqL1xuXG4gICAgaWYgKCh0aGlzLnNwYXduVGltZW91dCAtPSBkdCkgPD0gMCkge1xuXG4gICAgICB0aGlzLnNwYXduVGltZW91dCA9IDAuNTtcblxuICAgICAgLy9pZiAodGhpcy5jcHVSYXRpbyA+IDAuNSkgdGhpcy5wbGF5ZXJQbGFuZXQuc3Bhd25TaGlwKFwiZmlnaHRlclwiKTtcbiAgICAgIGlmICh0aGlzLm9wdGltaXphdGlvblJhdGluZyA+IHRoaXMucmVhbENwdVVzYWdlICsgMC4xKSB0aGlzLnBsYXllclBsYW5ldC5zcGF3blNoaXAoXCJmaWdodGVyXCIpO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgc2hha2U6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5zaGFrZUxpZmVzcGFuID0gMC40O1xuXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbihkdCkge1xuXG4gICAgaWYgKCF0aGlzLmF2ZXJhZ2VGcmFtZVRpbWUpIHJldHVybjtcblxuICAgIGFwcC5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcbiAgICBhcHAuY3R4LnNhdmUoKTtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjMjgyMjQ1XCI7XG4gICAgYXBwLmN0eC5maWxsUmVjdCgwLCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHQpO1xuXG4gICAgLy8gYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmdyYWRpZW50O1xuICAgIC8vYXBwLmN0eC5maWxsUmVjdCgwLCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHQpO1xuXG4gICAgaWYgKHRoaXMuc2hha2VMaWZlc3BhbiA+IDApIHtcbiAgICAgIHRoaXMuc2hha2VMaWZlc3BhbiAtPSBkdDtcbiAgICAgIHZhciBjaGFvcyA9IFV0aWxzLnJhbmRvbSgtNiwgNik7XG4gICAgICBhcHAuY3R4LnRyYW5zbGF0ZShjaGFvcywgY2hhb3MpXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIHRoaXMuZW50aXRpZXNbaV0ucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICB0aGlzLnBsYXllci5yZW5kZXIoKTtcblxuICAgIHRoaXMucmVuZGVyVG9vbHRpcCgpO1xuXG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgYXBwLmN0eC5mb250ID0gXCJib2xkIDE2cHggQXJpYWxcIjtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiO1xuICAgIGFwcC5jdHguZmlsbFRleHQoXCJTQ09SRTogXCIgKyB0aGlzLnNjb3JlLCBhcHAud2lkdGggLSAyMCwgMjApO1xuXG4gICAgdGhpcy5yZW5kZXJDUFVCYXIoKTtcbiAgICAvLyB0aGlzLnJlbmRlckJvbnVzZXMoKTtcblxuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICBhcHAuY3R4LmZvbnQgPSBcImJvbGQgNjRweCBBcmlhbFwiO1xuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmEwXCI7XG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLnBsYXllci5yZXNvdXJjZXMsIGFwcC5jZW50ZXIueCAtIDE4MCwgYXBwLmhlaWdodCAtIDEwNCk7XG5cbiAgICAvLyBhcHAuY3R4LnRleHRBbGlnbiA9IFwibGVmdFwiO1xuICAgIC8vIGFwcC5jdHguZm9udCA9IFwiYm9sZCAxNnB4IEFyaWFsXCI7XG4gICAgLy8gYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcbiAgICAvLyBhcHAuY3R4LmZpbGxUZXh0KFxuICAgIC8vICAgdGhpcy5vcHRpbWl6YXRpb25SYXRpbmcudG9GaXhlZCgyKSArIFwiIHwgXCIgK1xuICAgIC8vICAgLy8gdGhpcy5iYXNlbGluZUZhY3Rvci50b0ZpeGVkKDIpICsgXCIgfCBcIiArXG4gICAgLy8gICB0aGlzLmVudGl0aWVzLmxlbmd0aCArICcgKyAnICtcbiAgICAvLyAgIHRoaXMucXVvdGEudG9GaXhlZCgxKSwgMTYsIDE2KTtcblxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuXG4gIH0sXG5cbiAgYmFyV2lkdGg6IDIwMCxcblxuICByZW5kZXJDUFVCYXI6IGZ1bmN0aW9uKCkge1xuXG5cbiAgICB2YXIgd2lkdGggPSAyMDA7XG4gICAgdmFyIGN1cnJlbnRXaWR0aCA9IHRoaXMuYmFyV2lkdGggKiB0aGlzLmNwdUJhclByb2dyZXNzO1xuXG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcHJpdGVzaGVldCxcbiAgICAgIGRlZnMuZnJvemVuU3ByaXRlWzBdLCBkZWZzLmZyb3plblNwcml0ZVsxXSwgZGVmcy5mcm96ZW5TcHJpdGVbMl0sIGRlZnMuZnJvemVuU3ByaXRlWzNdLFxuICAgICAgYXBwLmNlbnRlci54IC0gdGhpcy5iYXJXaWR0aCAvIDIgLSAzMiwgMjQsIGRlZnMuZnJvemVuU3ByaXRlWzJdLCBkZWZzLmZyb3plblNwcml0ZVszXSk7XG5cblxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBcIiNmYTBcIjtcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2ZhMFwiO1xuICAgIGFwcC5jdHgubGluZVdpZHRoID0gMjtcblxuICAgIGFwcC5jdHguc3Ryb2tlUmVjdChhcHAuY2VudGVyLnggLSB0aGlzLmJhcldpZHRoIC8gMiwgMTYsIHRoaXMuYmFyV2lkdGgsIDMyKVxuICAgIGFwcC5jdHguZmlsbFJlY3QoYXBwLmNlbnRlci54IC0gdGhpcy5iYXJXaWR0aCAvIDIsIDE2LCBjdXJyZW50V2lkdGgsIDMyKVxuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgYXBwLmZvbnRTaXplKDE2KTtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KFwiQVZBSUxBQkxFIENQVVwiLCBhcHAuY2VudGVyLngsIDI0KTtcblxuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJsZWZ0XCI7XG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmYTBcIjtcblxuICAgIGFwcC5jdHguZmlsbFRleHQoXCIrIFwiICsgdGhpcy5vcHRpbWl6YXRpb25SYXRpbmcudG9GaXhlZCgyKSwgYXBwLmNlbnRlci54ICsgd2lkdGggLyAyICsgMTYsIDE2KTtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjYzQwXCI7XG4gICAgYXBwLmN0eC5maWxsVGV4dChcIi0gXCIgKyB0aGlzLnJlYWxDcHVVc2FnZS50b0ZpeGVkKDIpLCBhcHAuY2VudGVyLnggKyB3aWR0aCAvIDIgKyAxNiwgMzIpO1xuXG4gIH0sXG5cblxuICByZW5kZXJCb251c2VzOiBmdW5jdGlvbigpIHtcblxuICAgIGFwcC5jdHguc2F2ZSgpO1xuICAgIGFwcC5jdHgudHJhbnNsYXRlKGFwcC5jZW50ZXIueCAtIHRoaXMuYmFyV2lkdGggLyAyLCA1NCk7XG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImxlZnRcIjtcbiAgICBhcHAuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG5cbiAgICB2YXIgaSA9IE9iamVjdC5rZXlzKHRoaXMuYm9udXNlcykubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuYm9udXNlcykge1xuXG4gICAgICB2YXIgdGhyZXNob2xkID0gdGhpcy5ib251c2VzW2tleV07XG5cbiAgICAgIHZhciB4ID0gdGhpcy5iYXJXaWR0aCAqIHRocmVzaG9sZDtcbiAgICAgIHZhciB5ID0gaSAqIDE2O1xuXG4gICAgICBhcHAuY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5jaGVja0JvbnVzKGtleSkgPyAxLjAgOiAwLjQ7XG5cbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7XG4gICAgICBhcHAuY3R4LmZpbGxSZWN0KHgsIDAsIDIsIHkpO1xuICAgICAgYXBwLmN0eC5maWxsUmVjdCh4LCB5LCAxNiwgMik7XG5cbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7XG4gICAgICBhcHAuZm9udFNpemUoMTIpO1xuICAgICAgYXBwLmN0eC5maWxsVGV4dChkZWZzLmJvbnVzZXNba2V5XS50b1VwcGVyQ2FzZSgpLCB4ICsgMjAsIHkgLSA2KTtcblxuICAgICAgaS0tO1xuXG4gICAgfVxuXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XG5cbiAgfSxcblxuXG4gIHJlbmRlclRvb2x0aXA6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKCF0aGlzLnRvb2x0aXApIHJldHVybjtcblxuICAgIGFwcC5sYXllci50ZXh0QWxpZ24oXCJjZW50ZXJcIikuZmlsbFN0eWxlKFwiI2ZmZlwiKS5mb250KFwiMTZweCBBcmlhbFwiKS50ZXh0V2l0aEJhY2tncm91bmQodGhpcy50b29sdGlwLCBhcHAuY2VudGVyLngsIGFwcC5oZWlnaHQgLSA2NCwgXCJyZ2JhKDAsMCwwLDAuNilcIiwgMTYpO1xuXG4gIH0sXG5cbiAgcG9pbnRlcm1vdmU6IGZ1bmN0aW9uKGUpIHtcblxuICAgIHRoaXMucGxheWVyLnggPSBlLng7XG4gICAgdGhpcy5wbGF5ZXIueSA9IGUueTtcblxuICB9LFxuXG4gIHdyYXA6IGZ1bmN0aW9uKGVudGl0eSkge1xuXG4gICAgaWYgKGVudGl0eS54ICsgZW50aXR5LnJhZGl1cyA8IDApIGVudGl0eS54ID0gYXBwLndpZHRoICsgZW50aXR5LnJhZGl1cztcbiAgICBpZiAoZW50aXR5LnggLSBlbnRpdHkucmFkaXVzID4gYXBwLndpZHRoKSBlbnRpdHkueCA9IC1lbnRpdHkucmFkaXVzO1xuICAgIGlmIChlbnRpdHkueSArIGVudGl0eS5yYWRpdXMgPCAwKSBlbnRpdHkueSA9IGFwcC5oZWlnaHQgKyBlbnRpdHkucmFkaXVzO1xuICAgIGlmIChlbnRpdHkueSAtIGVudGl0eS5yYWRpdXMgPiBhcHAuaGVpZ2h0KSBlbnRpdHkueSA9IC1lbnRpdHkucmFkaXVzO1xuXG4gIH0sXG5cbiAga2V5ZG93bjogZnVuY3Rpb24oZSkge1xuXG4gIH0sXG5cbiAgbmV4dFdhdmU6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXMuYmVuY2htYXJrKSByZXR1cm47XG5cbiAgICB0aGlzLndhdmUrKztcblxuICAgIHRoaXMuc2hpcHNMZWZ0ID0gMDtcblxuICAgIHZhciBzdHJlYW1zUG9zaXRpb25zID0gW1xuICAgICAgWzAuMCwgMS4wXSxcbiAgICAgIFswLjAsIDAuNV0sXG4gICAgICBbMC4wLCAwLjBdLFxuICAgICAgWzEuMCwgMC4wXSxcbiAgICAgIFsxLjAsIDAuNV0sXG4gICAgICBbMS4wLCAxLjBdXG4gICAgXTtcblxuICAgIHZhciBkaWZmaWN1bHR5ID0gdGhpcy53YXZlIC8gMjA7XG5cbiAgICBVdGlscy5zaHVmZmxlKHN0cmVhbXNQb3NpdGlvbnMpO1xuXG4gICAgdmFyIHN0cmVhbXNDb3VudCA9IE1hdGgubWluKDMsIDEgKyBkaWZmaWN1bHR5KSArIDAuMyB8IDA7XG4gICAgdmFyIHNoaXBzUGVyU3RyZWFtID0gTWF0aC5taW4oMTYsIDQgKyBkaWZmaWN1bHR5ICogNCkgfCAwO1xuXG4gICAgdmFyIHBvc3NpYmxlU2hpcHMgPSBbXTtcblxuICAgIGlmICh0aGlzLndhdmUgPiAwKSBwb3NzaWJsZVNoaXBzLnB1c2goXCJjcmVlcDFcIik7XG4gICAgaWYgKHRoaXMud2F2ZSA+IDMpIHBvc3NpYmxlU2hpcHMucHVzaChcImNyZWVwMlwiKTtcbiAgICBpZiAodGhpcy53YXZlID4gNikgcG9zc2libGVTaGlwcy5wdXNoKFwiY3JlZXAzXCIpO1xuICAgIGlmICh0aGlzLndhdmUgPiAxMCkgcG9zc2libGVTaGlwcy5wdXNoKFwiY3JlZXA0XCIpO1xuXG4gICAgaWYgKHRoaXMud2F2ZSAlIDUgPT09IDApIHBvc3NpYmxlU2hpcHMgPSBbXCJib3NzXCJdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJlYW1zQ291bnQ7IGkrKykge1xuXG4gICAgICB2YXIgc3RyZWFtID0gc3RyZWFtc1Bvc2l0aW9ucy5wb3AoKTtcblxuICAgICAgdmFyIHggPSBzdHJlYW1bMF0gKiBhcHAud2lkdGg7XG4gICAgICB2YXIgeSA9IHN0cmVhbVsxXSAqIGFwcC5oZWlnaHQ7XG5cbiAgICAgIHZhciBzaGlwID0gVXRpbHMucmFuZG9tKHBvc3NpYmxlU2hpcHMpO1xuICAgICAgdmFyIHNoaXBEYXRhID0gZGVmcy5zaGlwc1tzaGlwXTtcbiAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIoeSAtIGFwcC5jZW50ZXIueSwgeCAtIGFwcC5jZW50ZXIueCk7XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2hpcHNQZXJTdHJlYW07IGorKykge1xuXG4gICAgICAgIHZhciBlbnRpdHkgPSB0aGlzLmFkZChFTkdJTkUuU2hpcCwge1xuICAgICAgICAgIHR5cGU6IHNoaXAsXG4gICAgICAgICAgeDogeCArIE1hdGguY29zKGFuZ2xlKSAqIGogKiAxMDAsXG4gICAgICAgICAgeTogeSArIE1hdGguc2luKGFuZ2xlKSAqIGogKiAxMDAsXG4gICAgICAgICAgdGVhbTogMFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNoaXBzTGVmdCsrO1xuXG4gICAgICAgIGlmIChzaGlwRGF0YS5ib3NzKSB7XG5cbiAgICAgICAgICBlbnRpdHkuaHAgPSBlbnRpdHkubWF4SHAgPSB0aGlzLnNjb3JlO1xuICAgICAgICAgIGVudGl0eS5kYW1hZ2UgPSB0aGlzLnNjb3JlIC8gNTAgfCAwO1xuICAgICAgICAgIGVudGl0eS5zY2FsZSA9IDAuNSArIHRoaXMuc2NvcmUgLyAyMDA7XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9LFxuXG4gIHJlcGFpclNoaXBzOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzaGlwcyA9IFV0aWxzLmZpbHRlcih0aGlzLmVudGl0aWVzLCBmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gKGUgaW5zdGFuY2VvZiBFTkdJTkUuU2hpcCkgJiYgZS50ZWFtO1xuICAgIH0pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICBzaGlwc1tpXS5yZXBhaXIoKTtcblxuICAgIH1cblxuICB9LFxuXG4gIG9uZW5lbXlkZWF0aDogZnVuY3Rpb24oc2hpcCkge1xuXG4gICAgdGhpcy5zaGlwc0xlZnQtLTtcblxuICAgIGlmICh0aGlzLnNoaXBzTGVmdCA8PSAwKSB0aGlzLm5leHRXYXZlKCk7XG5cbiAgfSxcblxuICBwb2ludGVyZG93bjogZnVuY3Rpb24oZSkge1xuXG4gIH0sXG5cbiAgZ2FtZW92ZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgRU5HSU5FLkdhbWVvdmVyLnNjb3JlID0gdGhpcy5zY29yZTtcblxuICAgIGlmICh3aW5kb3cuZ2EpIHtcbiAgICAgIGdhKCdzZW5kJywge1xuICAgICAgICAnaGl0VHlwZSc6ICdldmVudCcsXG4gICAgICAgICdldmVudENhdGVnb3J5JzogJ2dhbWUnLFxuICAgICAgICAnZXZlbnRBY3Rpb24nOiAnb3ZlcicsXG4gICAgICAgICdldmVudFZhbHVlJzogdGhpcy5zY29yZSxcbiAgICAgICAgJ25vbkludGVyYWN0aW9uJzogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXBwLnNldFN0YXRlKEVOR0lORS5HYW1lb3Zlcik7XG5cbiAgfSxcblxuICBjaGVja0JvbnVzOiBmdW5jdGlvbihrZXkpIHtcblxuICAgIHJldHVybiB0cnVlO1xuXG4gIH1cblxufTsiLCJFTkdJTkUuUG93ZXJ1cCA9IGZ1bmN0aW9uKGFyZ3MpIHtcblxuICBVdGlscy5leHRlbmQodGhpcywgYXJncyk7XG5cbiAgdGhpcy5yYWRpdXMgPSAzMjtcblxuICB0aGlzLmRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiA2LjI4O1xuICB0aGlzLnNwZWVkID0gMzI7XG5cbiAgdGhpcy5mb3JjZURpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiA2LjI4O1xuICB0aGlzLmZvcmNlID0gNjQgKyBNYXRoLnJhbmRvbSgpICogMTI4O1xuXG4gIHRoaXMuZm9yY2UgKj0gMztcbiAgdGhpcy5mb3JjZURhbXBpbmcgPSB0aGlzLmZvcmNlO1xuXG4gIHRoaXMubGlmZXRpbWUgPSAwO1xuICB0aGlzLmR1cmF0aW9uID0gMTA7XG5cbiAgdmFyIGtleXMgPSBbXCJyZXBhaXJcIiwgXCJtaXNzaWxlc1wiLCBcImZyZWV6ZVwiXTtcblxuICB2YXIgZnJlZWxhbmVyc0NvdW50ID0gVXRpbHMuZmlsdGVyKHRoaXMuZ2FtZS5lbnRpdGllcywgZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiBlLmZyZWUgJiYgZSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwO1xuICB9KS5sZW5ndGg7XG5cbiAgaWYgKGZyZWVsYW5lcnNDb3VudCA8IDIpIGtleXMucHVzaChcImZyZWVsYW5jZXJcIik7XG5cbiAgdGhpcy5rZXkgPSBVdGlscy5yYW5kb20oa2V5cyk7XG4gIHRoaXMuc3ByaXRlID0gdGhpcy5zcHJpdGVzW3RoaXMua2V5XTtcblxufTtcblxuRU5HSU5FLlBvd2VydXAucHJvdG90eXBlID0ge1xuXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuUG93ZXJ1cCxcblxuICBzcHJpdGU6IFsyMTYsIDE1OSwgMTQsIDE0XSxcblxuICB0eXBlOiBcInBvd2VydXBcIixcblxuICBzcHJpdGVzOiB7XG5cbiAgICBcInJlcGFpclwiOiBbMjQ1LCA4OSwgMjMsIDI1XSxcbiAgICBcImZyZWVsYW5jZXJcIjogWzI3NiwgNTEsIDMyLCAzMl0sXG4gICAgXCJmcmVlemVcIjogWzI0MiwgMTE5LCAxOSwgMjFdLFxuICAgIFwibWlzc2lsZXNcIjogWzMxMSwgMTMsIDI4LCAzMl1cblxuICB9LFxuXG4gIGNvbGxlY3Q6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5nYW1lLmV4cGxvc2lvbih0aGlzLngsIHRoaXMueSwgMTYsIFwiI2ZmZlwiKTtcblxuICAgIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XG5cbiAgICBhcHAuc291bmQucGxheShcInBvd2VydXBcIik7XG5cbiAgICB0aGlzLmdhbWUucGxheWVyLnBva2UoKTtcblxuICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLlRleHRPdXQsIHtcbiAgICAgIHg6IHRoaXMueCxcbiAgICAgIHk6IHRoaXMueSxcbiAgICAgIHRleHQ6IHRoaXMua2V5XG4gICAgfSk7XG5cbiAgICBzd2l0Y2ggKHRoaXMua2V5KSB7XG5cbiAgICAgIGNhc2UgXCJmcmVlemVcIjpcblxuICAgICAgICB0aGlzLmdhbWUuZnJlZXplTGlmZXNwYW4gPSA0LjA7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJtaXNzaWxlc1wiOlxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB0aGlzLmdhbWUuYWRkKEVOR0lORS5NaXNzaWxlLCB7XG4gICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICB0ZWFtOiAxXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwicmVwYWlyXCI6XG5cbiAgICAgICAgdGhpcy5nYW1lLnJlcGFpclNoaXBzKCk7XG5cbiAgICAgICAgYnJlYWs7XG5cblxuICAgICAgY2FzZSBcImZyZWVsYW5jZXJcIjpcblxuICAgICAgICB2YXIgc2hpcCA9IHRoaXMuZ2FtZS5hZGQoRU5HSU5FLlNoaXAsIHtcbiAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgIHR5cGU6IFwiZnJlZWxhbmNlclwiLFxuICAgICAgICAgIHRlYW06IDEsXG4gICAgICAgICAgZnJlZTogdHJ1ZSxcbiAgICAgICAgICBwbGFuZXQ6IHRoaXMuZ2FtZS5wbGF5ZXJQbGFuZXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hpcC5mb3JjZURpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiA2O1xuICAgICAgICBzaGlwLmZvcmNlID0gMjAwO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9LFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XG5cbiAgICB0aGlzLmxpZmV0aW1lICs9IGR0O1xuXG4gICAgdmFyIHBsYXllckRpc3RhbmNlID0gVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy5nYW1lLnBsYXllcik7XG5cbiAgICBpZiAodGhpcy5mb3JjZSkge1xuXG4gICAgICB0aGlzLnggKz0gTWF0aC5jb3ModGhpcy5mb3JjZURpcmVjdGlvbikgKiB0aGlzLmZvcmNlICogZHQ7XG4gICAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5mb3JjZURpcmVjdGlvbikgKiB0aGlzLmZvcmNlICogZHQ7XG5cbiAgICAgIHRoaXMuZm9yY2UgPSBNYXRoLm1heCgwLCB0aGlzLmZvcmNlIC0gdGhpcy5mb3JjZURhbXBpbmcgKiBkdCk7XG5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5saWZldGltZSA+IDAuNSkge1xuICAgICAgaWYgKHBsYXllckRpc3RhbmNlIDwgMzIpIHtcbiAgICAgICAgdGhpcy5jb2xsZWN0KCk7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIucmVzb3VyY2VzKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGlmZXRpbWUgPiB0aGlzLmR1cmF0aW9uKSB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xuXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBsaW5lYXIgPSBhcHAubGlmZXRpbWUgJSAwLjUgLyAwLjU7XG4gICAgdmFyIHNjYWxlID0gMC44ICsgTWF0aC5zaW4oTWF0aC5QSSAqIGxpbmVhcikgKiAwLjQ7XG5cbiAgICBhcHAuY3R4LnNhdmUoKTtcblxuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcblxuICAgIGFwcC5jdHguc2NhbGUoc2NhbGUsIHNjYWxlKTtcblxuICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXG4gICAgICB0aGlzLnNwcml0ZVswXSwgdGhpcy5zcHJpdGVbMV0sIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXSwgLXRoaXMuc3ByaXRlWzJdIC8gMiwgLXRoaXMuc3ByaXRlWzNdIC8gMiwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdXG4gICAgKTtcblxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuXG4gIH1cblxufTsiLCJFTkdJTkUuVGV4dE91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcblxuICBVdGlscy5leHRlbmQodGhpcywge1xuICAgIGJhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjUpXCIsXG4gICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgIGZvbnRTaXplOiAyNCxcbiAgICBzY2FsZVg6IDAsXG4gICAgc2NhbGVZOiAxLjAsXG4gICAgdGV4dDogXCJ2b2lkXCIsXG4gICAgZHVyYXRpb246IDIuMFxuICB9LCBhcmdzKTtcblxuICB2YXIgdGV4dG91dCA9IHRoaXM7XG5cbiAgYXBwLnR3ZWVuKHRoaXMpXG4gICAgLnRvKHtcbiAgICAgIHNjYWxlWDogMS4wXG4gICAgfSwgdGhpcy5kdXJhdGlvbiAqIDAuMjUsIFwib3V0RWxhc3RpY1wiKVxuICAgIC53YWl0KHRoaXMuZHVyYXRpb24gKiAwLjUpXG4gICAgLnRvKHtcbiAgICAgIHNjYWxlWTogMC4wXG4gICAgfSwgdGhpcy5kdXJhdGlvbiAqIDAuMjUsIFwib3V0Q2lyY1wiKVxuICAgIC5vbihcImZpbmlzaFwiLCBmdW5jdGlvbigpIHtcbiAgICAgIHRleHRvdXQuZ2FtZS5yZW1vdmUodGV4dG91dCk7XG4gICAgfSk7XG5cbiAgICB0dHQgPSB0aGlzO1xuXG59O1xuXG5FTkdJTkUuVGV4dE91dC5wcm90b3R5cGUgPSB7XG5cbiAgY29uc3RydWN0b3I6IEVOR0lORS5UZXh0T3V0LFxuXG4gIHNwcml0ZTogWzIxNiwgMTU5LCAxNCwgMTRdLFxuXG4gIHR5cGU6IFwidGV4dG91dFwiLFxuXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKCF0aGlzLnNjYWxlWCB8fCAhdGhpcy5zY2FsZVkpIHJldHVybjtcblxuICAgIGFwcC5jdHguc2F2ZSgpO1xuXG4gICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuXG4gICAgYXBwLmZvbnRTaXplKHRoaXMuZm9udFNpemUpO1xuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblxuICAgIGFwcC5jdHguc2NhbGUodGhpcy5zY2FsZVgsIHRoaXMuc2NhbGVZKTtcbiAgICBhcHAuY3R4LmZpbGxUZXh0KHRoaXMudGV4dCwgMCwgMClcblxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xuXG4gIH1cblxufTsiLCJFTkdJTkUuVHJhaWwgPSBmdW5jdGlvbihwYXJlbnQsIGFyZ3MpIHtcblxuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcblxuICBVdGlscy5leHRlbmQodGhpcywge1xuICAgIGNvbG9yOiBcIiMwZmNcIixcbiAgICBwb2ludHM6IFtdLFxuICAgIG1heFBvaW50czogNSxcbiAgICB3aWR0aDogMTAsXG4gICAgbGlmZXRpbWU6IDAsXG4gICAgbGlmZXNwYW46IDAsXG4gICAgcGF1c2VkOiBmYWxzZSxcbiAgICBpbnRlcnZhbDogMC4xNSxcbiAgICBzdHJva2U6IHRydWVcbiAgfSwgYXJncyk7XG5cbn07XG5cbkVOR0lORS5UcmFpbC5wcm90b3R5cGUgPSB7XG5cbiAgekluZGV4OiAyMDAsXG5cbiAgcXVvdGE6IDAuMyxcblxuICByZWFjdGlvbjogOCxcblxuICBjbGVhcjogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLnBvaW50cyA9IFtdO1xuXG4gIH0sXG5cbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcblxuICAgIHRoaXMubGlmZXRpbWUgKz0gZGVsdGE7XG5cbiAgICBpZiAoVXRpbHMuaW50ZXJ2YWwoXCJwb2ludFwiLCB0aGlzLmludGVydmFsLCB0aGlzKSkge1xuXG4gICAgICBpZiAoIXRoaXMucGF1c2VkKSB0aGlzLnBvaW50cy5wdXNoKHRoaXMucGFyZW50LngsIHRoaXMucGFyZW50LnkpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICh0aGlzLnBvaW50cy5sZW5ndGggPiB0aGlzLm1heFBvaW50cyAqIDIpIHx8XG4gICAgICAgICh0aGlzLnBhdXNlZCAmJiB0aGlzLnBvaW50cy5sZW5ndGggPiAwKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucG9pbnRzLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMucG9pbnRzLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wb2ludHNbdGhpcy5wb2ludHMubGVuZ3RoIC0gMl0gPSB0aGlzLnBhcmVudC54O1xuICAgIHRoaXMucG9pbnRzW3RoaXMucG9pbnRzLmxlbmd0aCAtIDFdID0gdGhpcy5wYXJlbnQueTtcblxuICAgIGlmKHRoaXMubGlmZXNwYW4gJiYgdGhpcy5saWZldGltZSA+IHRoaXMubGlmZXNwYW4pIHtcbiAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYodGhpcy5wb2ludHMubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIGFwcC5sYXllci5zYXZlKCk7XG4gICAgYXBwLmxheWVyLnN0cm9rZVN0eWxlKHRoaXMuY29sb3IpO1xuICAgIGFwcC5sYXllci5saW5lQ2FwKFwic3F1YXJlXCIpO1xuXG4gICAgLy8gaWYgKCF0aGlzLnN0cm9rZSkgYXBwLmxheWVyLnN0cm9rZVN0eWxlKFwicmdiYSgwLDAsMCwwLjEpXCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCB0aGlzLnBvaW50cy5sZW5ndGg7IGkgKz0gMikge1xuXG4gICAgICB2YXIgcmF0aW8gPSBpIC8gKDIgKiB0aGlzLm1heFBvaW50cyk7XG4gICAgICB2YXIgcHggPSB0aGlzLnBvaW50c1tpIC0gMl07XG4gICAgICB2YXIgcHkgPSB0aGlzLnBvaW50c1tpIC0gMV07XG4gICAgICB2YXIgbnggPSB0aGlzLnBvaW50c1tpXTtcbiAgICAgIHZhciBueSA9IHRoaXMucG9pbnRzW2kgKyAxXTtcbiAgICAgIGFwcC5sYXllci5iZWdpblBhdGgoKTtcbiAgICAgIGFwcC5sYXllci5tb3ZlVG8ocHggfCAwLCBweSB8IDApO1xuICAgICAgYXBwLmxheWVyLmxpbmVUbyhueCB8IDAsIG55IHwgMCk7XG4gICAgICBhcHAubGF5ZXIuYShyYXRpbykubGluZVdpZHRoKHJhdGlvICogdGhpcy53aWR0aCk7XG4gICAgICBhcHAubGF5ZXIuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgYXBwLmxheWVyLnJlc3RvcmUoKTtcblxuXG4gIH1cblxufTsiLCJFTkdJTkUuTWlzc2lsZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcblxuICBVdGlscy5leHRlbmQodGhpcywge1xuICAgIHNwZWVkOiA0MDBcbiAgfSwgYXJncyk7XG5cbiAgdGhpcy5jb2xvciA9IGRlZnMudGVhbUNvbG9yW3RoaXMudGVhbV07XG4gIHRoaXMucmFkaXVzID0gNDtcbiAgdGhpcy5kaXJlY3Rpb24gPSAwO1xuXG4gIHRoaXMuZm9yY2UgPSA0MDA7XG4gIHRoaXMuZm9yY2VEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogNjtcblxuICB0aGlzLnRyYWlsID0gbmV3IEVOR0lORS5UcmFpbCh0aGlzLCB7XG4gICAgaW50ZXJ2YWw6IDAuMDUsXG4gICAgbWF4UG9pbnRzOiAxMCxcbiAgICBjb2xvcjogXCIjZmEwXCJcbiAgfSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWUuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcblxuICAgIHZhciBlID0gdGhpcy5nYW1lLmVudGl0aWVzW2ldO1xuXG4gICAgaWYgKCEoZSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwKSkgY29udGludWU7XG5cbiAgICBpZiAoZS5taXNzaWxlVGFyZ2V0KSBjb250aW51ZTtcbiAgICBpZiAoZS50ZWFtID09PSB0aGlzLnRlYW0pIGNvbnRpbnVlO1xuXG4gICAgZS5taXNzaWxlVGFyZ2V0ID0gdGhpcztcbiAgICB0aGlzLnRhcmdldCA9IGU7XG5cbiAgICBicmVhaztcblxuICB9XG5cbn07XG5cbkVOR0lORS5NaXNzaWxlLnByb3RvdHlwZSA9IHtcblxuICBzcHJpdGU6IFsxNDUsIDI1LCA2LCAzOV0sXG5cbiAgcXVvdGE6IDAuNSxcblxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLk1pc3NpbGUsXG5cbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcblxuICAgIGlmKCF0aGlzLnRhcmdldCkgcmV0dXJuIHRoaXMuZGllKCk7XG5cbiAgICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguYXRhbjIodGhpcy50YXJnZXQueSAtIHRoaXMueSwgdGhpcy50YXJnZXQueCAtIHRoaXMueCk7XG5cbiAgICB0aGlzLnggKz0gTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xuICAgIHRoaXMueSArPSBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XG5cbiAgICB0aGlzLmZvcmNlID0gTWF0aC5tYXgodGhpcy5mb3JjZSAtIGR0ICogNDAwLCAwKTtcblxuICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmZvcmNlRGlyZWN0aW9uKSAqIHRoaXMuZm9yY2UgKiBkdDtcbiAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5mb3JjZURpcmVjdGlvbikgKiB0aGlzLmZvcmNlICogZHQ7XG5cblxuICAgIGlmIChVdGlscy5kaXN0YW5jZSh0aGlzLCB0aGlzLnRhcmdldCkgPCB0aGlzLnJhZGl1cyArIHRoaXMudGFyZ2V0LnJhZGl1cykge1xuXG4gICAgICB0aGlzLmhpdCh0aGlzLnRhcmdldCk7XG5cbiAgICB9XG5cbiAgICB0aGlzLnRyYWlsLnN0ZXAoZHQpO1xuXG5cbiAgfSxcblxuICBoaXQ6IGZ1bmN0aW9uKHRhcmdldCkge1xuXG4gICAgdGFyZ2V0LmFwcGx5RGFtYWdlKDEwICsgdGhpcy5nYW1lLnNjb3JlIC8gMTApO1xuXG4gICAgdGhpcy5kaWUoKTtcblxuICB9LFxuXG4gIGRpZTogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMudHJhaWwucmVuZGVyKCk7XG5cbiAgfVxuXG59OyIsIkVOR0lORS5HYW1lb3ZlciA9IHtcblxuICBzY29yZTogNzM3LFxuICBoaXNjb3JlOiAwLFxuXG4gIHN0YXJPZmY6IFszODIsIDE3NywgMTUsIDE2XSxcbiAgc3Rhck9uOiBbMzM5LCAxNjksIDM3LCAzN10sXG5cbiAgZW50ZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cuZ2EpIHtcbiAgICAgIGdhKCdzZW5kJywgJ3NjcmVlbnZpZXcnLCB7XG4gICAgICAgICdhcHBOYW1lJzogJ1Bvd2VyU3VyZ2UnLFxuICAgICAgICAnc2NyZWVuTmFtZSc6ICdHYW1lb3ZlcidcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuXG4gICAgYXBwLnJlbmRlcmVyLnNldFNtb290aGluZyh0cnVlKTtcblxuICAgIHZhciBoaXNjb3JlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJoaXNjb3JlXCIpIHwgMDtcblxuICAgIGlmIChoaXNjb3JlIDwgdGhpcy5zY29yZSkge1xuXG4gICAgICB0aGlzLmhpc2NvcmUgPSB0aGlzLnNjb3JlO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoaXNjb3JlXCIsIGhpc2NvcmUpO1xuXG4gICAgfVxuXG4gICAgdGhpcy5tdXNpYyA9IGFwcC5tdXNpYy5wbGF5KFwiZ2FtZW92ZXJcIikuZmFkZUluKDMpLmxvb3AoKTtcblxuICAgIHRoaXMuY3VycmVudFNjb3JlID0gMDtcbiAgICB0aGlzLnN0YXJzID0gW107XG4gICAgdGhpcy5zY29yZU9mZnNldCA9IC1hcHAud2lkdGg7XG4gICAgdGhpcy5hY2hpZXZlZFN0YXJzID0gTWF0aC5taW4oMTAsICh0aGlzLnNjb3JlIC8gNTAwKSAqIDEwIHwgMCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblxuICAgICAgdGhpcy5zdGFycy5wdXNoKHtcbiAgICAgICAgeDogaSAqIDY0LFxuICAgICAgICB5OiA2NCxcbiAgICAgICAgc2NhbGU6IDBcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjaGlldmVkU3RhcnM7IGkrKykge1xuXG4gICAgICB2YXIgc3RhciA9IHRoaXMuc3RhcnNbaV07XG5cbiAgICAgIGFwcC50d2VlbihzdGFyKS53YWl0KGkgKiAwLjEpLnRvKHtcbiAgICAgICAgc2NhbGU6IDEuMCxcbiAgICAgICAgeTogNjRcbiAgICAgIH0sIDIuNSwgXCJvdXRFbGFzdGljXCIpO1xuXG4gICAgfVxuXG4gICAgYXBwLnR3ZWVuKHRoaXMpLnRvKHtcblxuICAgICAgY3VycmVudFNjb3JlOiB0aGlzLnNjb3JlLFxuICAgICAgc2NvcmVPZmZzZXQ6IDBcblxuICAgIH0sIDIuNSwgXCJvdXRFbGFzdGljXCIpLm9uKFwiZmluaXNoZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGFwcC5zdGF0ZS5kb25lID0gdHJ1ZTtcblxuICAgIH0pO1xuXG5cbiAgfSxcblxuICBzdGVwOiBmdW5jdGlvbigpIHtcblxuICB9LFxuXG4gIHJlbmRlclN0YXJzOiBmdW5jdGlvbih4LCB5KSB7XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXG4gICAgICB2YXIgc3RhciA9IHRoaXMuc3RhcnNbaV07XG5cbiAgICAgIGFwcC5sYXllci5zYXZlKCk7XG5cbiAgICAgIGFwcC5sYXllci50cmFuc2xhdGUoc3Rhci54ICsgeCwgc3Rhci55ICsgeSk7XG5cbiAgICAgIGFwcC5sYXllci5hbGlnbigwLjUsIDAuNSk7XG5cbiAgICAgIGFwcC5sYXllci5kcmF3UmVnaW9uKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsIHRoaXMuc3Rhck9mZiwgMCwgMCk7XG5cbiAgICAgIGlmIChzdGFyLnNjYWxlID4gMCkge1xuXG4gICAgICAgIGFwcC5sYXllci5yb3RhdGUoYXBwLmxpZmV0aW1lKTtcbiAgICAgICAgYXBwLmxheWVyLnNjYWxlKHN0YXIuc2NhbGUsIHN0YXIuc2NhbGUpO1xuICAgICAgICBhcHAubGF5ZXIuZHJhd1JlZ2lvbihhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LCB0aGlzLnN0YXJPbiwgMCwgMCk7XG4gICAgICB9XG5cbiAgICAgIGFwcC5sYXllci5yZXN0b3JlKCk7XG5cbiAgICB9XG5cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiMyODIyNDVcIjtcblxuICAgIGFwcC5jdHguZmlsbFJlY3QoMCwgMCwgYXBwLndpZHRoLCBhcHAuaGVpZ2h0KTtcblxuICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuaGVscCwgYXBwLmNlbnRlci54IC0gYXBwLmltYWdlcy5oZWxwLndpZHRoICogMC41IHwgMCwgLTUwKVxuXG4gICAgdGhpcy5yZW5kZXJTdGFycyhhcHAuY2VudGVyLnggLSAzMjAsIDApO1xuXG4gICAgYXBwLmZvbnRTaXplKDQ4KTtcblxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmEwXCI7XG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuXG4gICAgYXBwLmN0eC5maWxsVGV4dChcIlNDT1JFOiBcIiArICh0aGlzLmN1cnJlbnRTY29yZSB8IDApLCBhcHAuY2VudGVyLnggKyB0aGlzLnNjb3JlT2Zmc2V0LCAxODApXG5cbiAgICBhcHAuZm9udFNpemUoMzIpO1xuXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmNDBcIjtcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG5cbiAgICBhcHAuY3R4LmZpbGxUZXh0KFwiSEktU0NPUkU6IFwiICsgKHRoaXMuaGlzY29yZSB8IDApLCBhcHAuY2VudGVyLnggLSB0aGlzLnNjb3JlT2Zmc2V0LCAyMjApO1xuXG4gICAgaWYgKHRoaXMuZG9uZSkge1xuXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2NlZlwiO1xuICAgICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuXG4gICAgICBpZiAoYXBwLmxpZmV0aW1lICUgMSA8IDAuNSkge1xuXG4gICAgICAgIGFwcC5jdHguZmlsbFRleHQoXCJDTElDSyBUTyBUUlkgQUdBSU4gXCIsIGFwcC5jZW50ZXIueCAtIHRoaXMuc2NvcmVPZmZzZXQsIDI2MClcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH0sXG5cbiAgcG9pbnRlcmRvd246IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgaWYgKHdpbmRvdy5nYSkge1xuICAgICAgICBnYSgnc2VuZCcsIHtcbiAgICAgICAgICAnaGl0VHlwZSc6ICdldmVudCcsXG4gICAgICAgICAgJ2V2ZW50Q2F0ZWdvcnknOiAnZ2FtZScsXG4gICAgICAgICAgJ2V2ZW50QWN0aW9uJzogJ3Jlc3RhcnQnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBhcHAuc2V0U3RhdGUoRU5HSU5FLkdhbWUpO1xuXG4gICAgICBFTkdJTkUuR2FtZS5yZXNldCgpO1xuXG4gICAgfVxuXG4gIH1cblxufTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbihldmVudCkge1xuXG4gIGFwcCA9IHBsYXlncm91bmQoe1xuXG4gICAgd2lkdGg6IDEwMjQsXG4gICAgaGVpZ2h0OiA2NDAsXG5cbiAgICBzbW9vdGhpbmc6IHRydWUsXG5cbiAgICBwYXRoczoge1xuXG4gICAgICBiYXNlOiBcIi8vbW96aWxsYS5naXRodWIuaW8vZGV2dG9vbHMtcGVyZi1nYW1lL1wiXG5cbiAgICB9LFxuXG4gICAgdXBkYXRlRG93bmxvYWRUZXh0OiBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3gvNDBcIikgPiAtMSkge1xuXG4gICAgICAgIHZhciB0ZXh0ID0gZGVmcy5kb3dubG9hZExpbmtzW1wiZmZkZXZcIl1bMF07XG4gICAgICAgIHZhciBsaW5rID0gZGVmcy5kb3dubG9hZExpbmtzW1wiZmZkZXZcIl1bMV07XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdmFyIHRleHQgPSBkZWZzLmRvd25sb2FkTGlua3NbXCJkZWZhdWx0XCJdWzBdO1xuICAgICAgICB2YXIgbGluayA9IGRlZnMuZG93bmxvYWRMaW5rc1tcImRlZmF1bHRcIl1bMV07XG5cbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiI2NvbWljYnViYmxlXCIpLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIjY29taWNidWJibGVcIikuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBsaW5rKTtcblxuICAgIH0sXG5cbiAgICAvKiBzZXQgY29udGV4dCBmb250IHNpemUgd2l0aCBkZWZhdWx0IGZvbnQgKi9cblxuICAgIGZvbnRTaXplOiBmdW5jdGlvbihzaXplKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmN0eC5mb250ID0gc2l6ZSArIFwicHggJ1NxdWFkYSBPbmUnXCI7XG5cbiAgICB9LFxuXG4gICAgY3JlYXRlOiBmdW5jdGlvbigpIHtcblxuICAgICAgdGhpcy5sb2FkSW1hZ2VzKFwic3ByaXRlc2hlZXRcIiwgXCJoZWxwXCIsIFwic3BsYXNoXCIsIFwiZmxhcmVcIiwgXCJwYXJ0aWNsZXNcIik7XG5cbiAgICAgIHRoaXMua2V5Ym9hcmQucHJldmVudERlZmF1bHQgPSBmYWxzZTtcblxuICAgICAgdGhpcy5zb3VuZCA9IHRoaXMuYXVkaW8uY2hhbm5lbChcInNvdW5kXCIpLnZvbHVtZSgwLjUpO1xuICAgICAgdGhpcy5tdXNpYyA9IHRoaXMuYXVkaW8uY2hhbm5lbChcIm11c2ljXCIpLnZvbHVtZSgwLjUpO1xuXG4gICAgICB0aGlzLmN0eCA9IGFwcC5sYXllci5jb250ZXh0O1xuXG4gICAgICB0aGlzLmdhbWUgPSBFTkdJTkUuR2FtZTtcblxuICAgIH0sXG5cbiAgICAvKiBhbGwgaW1hZ2VzIGxvYWRlZCAqL1xuXG4gICAgcmVhZHk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB0aGlzLnVwZGF0ZURvd25sb2FkVGV4dCgpO1xuXG4gICAgICAvKiBjYWNoZSBzb21lIGtub3duIGNvbG9ycyBmb3Igc3ByaXRlc2hlZXQgKi9cblxuICAgICAgdGhpcy5nZXRDb2xvcmVkSW1hZ2UodGhpcy5pbWFnZXMuc3ByaXRlc2hlZXQsIFwiI2ZmZlwiKTtcblxuICAgICAgLyogc3RhcnQgdGhlIGJlbmNobWFyayAqL1xuXG4gICAgICB0aGlzLnNldFN0YXRlKEVOR0lORS5CZW5jaG1hcmspO1xuXG4gICAgfSxcblxuICAgIHJlc2l6ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgIHRoaXMuc3RhdGUucmVuZGVyKDApO1xuXG4gICAgfSxcblxuICAgIGdldENvbG9yZWRJbWFnZTogZnVuY3Rpb24oa2V5LCBjb2xvciwgbW9kZSkge1xuXG4gICAgICBpZiAodHlwZW9mIG1vZGUgPT09IFwidW5kZWZpbmVkXCIpIG1vZGUgPSBcImhhcmQtbGlnaHRcIjtcblxuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIGltYWdlID0gdGhpcy5pbWFnZXNba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpbWFnZSA9IGtleTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0b3Jla2V5ID0gXCJjb2xvci1cIiArIGNvbG9yO1xuXG4gICAgICBpZiAoIWltYWdlW3N0b3Jla2V5XSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWl4ID09PSBcInVuZGVmaW5lZFwiKSBtaXggPSAxO1xuXG4gICAgICAgIHZhciBiZWxvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGJlbG93Q3R4ID0gYmVsb3cuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIGJlbG93LndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIGJlbG93LmhlaWdodCA9IGltYWdlLmhlaWdodDtcblxuICAgICAgICBiZWxvd0N0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xuICAgICAgICBiZWxvd0N0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICAgIGJlbG93Q3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICBiZWxvd0N0eC5maWxsUmVjdCgwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcblxuICAgICAgICBpbWFnZVtzdG9yZWtleV0gPSBiZWxvdztcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW1hZ2Vbc3RvcmVrZXldO1xuXG4gICAgfSxcblxuICAgIHJvdW5kQW5nbGU6IGZ1bmN0aW9uKGFuZ2xlKSB7XG5cbiAgICAgIHJldHVybiBVdGlscy5ncm91bmQoYW5nbGUgLSBNYXRoLlBJIC8gMTYsIE1hdGguUEkgLyA4KTtcblxuICAgIH0sXG5cbiAgICB2aXNpYmlsaXR5Y2hhbmdlOiBmdW5jdGlvbihoaWRkZW4pIHtcblxuICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICBpZiAoIXRoaXMuc3RvcmVkU291bmRWb2x1bWUpIHtcbiAgICAgICAgICB0aGlzLnN0b3JlZFNvdW5kVm9sdW1lID0gdGhpcy5zb3VuZC52b2x1bWUoKTtcbiAgICAgICAgICB0aGlzLnN0b3JlZE11c2ljVm9sdW1lID0gdGhpcy5tdXNpYy52b2x1bWUoKTtcbiAgICAgICAgICB0aGlzLnNvdW5kLnZvbHVtZSgwKTtcbiAgICAgICAgICB0aGlzLm11c2ljLnZvbHVtZSgwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVkU291bmRWb2x1bWUpIHtcbiAgICAgICAgICB0aGlzLnNvdW5kLnZvbHVtZSh0aGlzLnN0b3JlZFNvdW5kVm9sdW1lKTtcbiAgICAgICAgICB0aGlzLm11c2ljLnZvbHVtZSh0aGlzLnN0b3JlZE11c2ljVm9sdW1lKTtcbiAgICAgICAgICB0aGlzLnN0b3JlZFNvdW5kVm9sdW1lID0gMDtcbiAgICAgICAgICB0aGlzLnN0b3JlZE11c2ljVm9sdW1lID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH0pO1xuXG59KTtcblxudmFyIHBlcmZvcm1hbmNlID0gd2luZG93LnBlcmZvcm1hbmNlIHx8IHdpbmRvdy53ZWJraXRQZXJmb3JtYW5jZSB8fCBEYXRlO1xuXG5NYXRoLnNpZ24gPSBNYXRoLnNpZ24gfHwgZnVuY3Rpb24oeCkge1xuXG4gIHggPSAreDsgLy8gY29udmVydCB0byBhIG51bWJlclxuXG4gIGlmICh4ID09PSAwIHx8IGlzTmFOKHgpKSB7XG5cbiAgICByZXR1cm4geDtcblxuICB9XG5cbiAgcmV0dXJuIHggPiAwID8gMSA6IC0xO1xuXG59OyIsIi8qKlxuICogVGhpcyBpcyBiYWQgYW5kIHVub3B0aW1pemVkIGNvZGUganVzdCBmb3IgeW91IHRvIGZpeCA6KVxuICpcbiAqIEdldCBGaXJlZm94IERldmVsb3BlciBFZGl0aW9uIHRvIHRyeSB0aGUgbmV3IFBlcmZvcm1hbmNlIFRvb2xzOlxuICogICBodHRwczovL3d3dy5tb3ppbGxhLm9yZy9maXJlZm94L2RldmVsb3Blci9cbiAqXG4gKiAxLiBPcGVuIHRoZSBgUGVyZm9ybWFuY2VgIHRvb2wgaW4gRmlyZWZveCBEZXZlbG9wZXIgRWRpdGlvblxuICogMi4gU3RhcnQgcmVjb3JkaW5nIGEgcGVyZm9ybWFuY2UgcHJvZmlsZVxuICogMy4gUGxheSB0aGUgZ2FtZVxuICogNC4gU3RvcCBwcm9maWxpbmcgYW5kIGNoZWNrIHRoZSBDYWxsIFRyZWUgb3IgRmxhbWUgQ2hhcnQgZm9yIHRoZSBtYWxlZmljZW50XG4gKlxuICogR290IGlkZWFzIGZvciBiZXR0ZXIgYm90dGxlbmVja3Mgb3IgZXZlbiBmYXN0ZXIgY29kZSwgZmlsZVxuICogYW4gaXNzdWUgb3Igc2VuZCB1cyBhIHB1bGwgcmVxdWVzdDpcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvZGV2dG9vbHMtcGVyZi1nYW1lL2lzc3Vlc1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBhcnJheSB3aXRoIGFsbCBlbGVtZW50cyB0aGF0IHBhc3MgdGhlIGB0ZXN0YCBmdW5jdGlvblxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZpbHRlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gdGVzdCBGdW5jdGlvbiB0byB0ZXN0IGVhY2ggZWxlbWVudCwgaW52b2tlZCB3aXRoIChlbGVtZW50KVxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5IHdpdGggb25seSBwYXNzZWQgZWxlbWVudHNcbiAqL1xuVXRpbHMuZmlsdGVyID0gZnVuY3Rpb24oYXJyYXksIHRlc3QpIHtcbiAgdmFyIHJlc3VsdCA9IGFycmF5LnNsaWNlKCk7IC8vIENsb25lIGFycmF5XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCF0ZXN0KHJlc3VsdFtpXSkpIHtcbiAgICAgIHJlc3VsdC5zcGxpY2UoaSwgMSk7IC8vIFJlbW92ZSBlbGVtZW50XG4gICAgICBpLS07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEZpbmQgbmVhcmVzdCBlbnRpdHkgZnJvbSBhIGxpc3Qgb2YgZW50aXRpZXNcbiAqIEBwYXJhbSB7RW50aXR5fSBmcm9tIEVudGl0eVxuICogQHBhcmFtIHtFbnRpdHlbXX0gZW50aXRpZXMgTGlzdCBvZiBlbnRpdGllcyB0byBjb21wYXJlXG4gKiBAcmV0dXJuIHtFbnRpdHl9IE5lYXJlc3QgRW50aXR5XG4gKi9cblV0aWxzLm5lYXJlc3QgPSBmdW5jdGlvbihmcm9tLCBlbnRpdGllcykge1xuICAgIGlmIChlbnRpdGllcy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBuZWFyZXN0RW50aXR5ID0gdW5kZWZpbmVkO1xuICAgIHZhciBjdXJyZW50U2hvcnRlc3REaXN0YW5jZSA9IHVuZGVmaW5lZDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRvID0gZW50aXRpZXNbaV07XG4gICAgaWYgKGZyb20gPT09IHRvKSBjb250aW51ZTtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlKGZyb20sIHRvKTtcbiAgICBpZighbmVhcmVzdEVudGl0eSkge1xuICAgICAgICBuZWFyZXN0RW50aXR5ID0gdG87XG4gICAgICAgIGN1cnJlbnRTaG9ydGVzdERpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmKGRpc3RhbmNlIDwgY3VycmVudFNob3J0ZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgbmVhcmVzdEVudGl0eSA9IHRvO1xuICAgICAgICBjdXJyZW50U2hvcnRlc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZWFyZXN0RW50aXR5O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG5lYXJlc3Qgc2hpcCBvZiBvcHBvc2l0ZSB0ZWFtXG4gKiBAcmV0dXJuIHtTaGlwfSBOZWFyZXN0IGVuZW15IHNoaXBcbiAqL1xuRU5HSU5FLlNoaXAucHJvdG90eXBlLmdldFRhcmdldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcG9vbCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2FtZS5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlbnRpdHkgPSB0aGlzLmdhbWUuZW50aXRpZXNbaV07XG4gICAgaWYgKCEoZW50aXR5IGluc3RhbmNlb2YgRU5HSU5FLlNoaXApKSBjb250aW51ZTtcbiAgICBpZiAoZW50aXR5LnRlYW0gIT09IHRoaXMudGVhbSkgcG9vbC5wdXNoKGVudGl0eSk7XG4gIH1cbiAgLy8gSXMgVXRpbHMubmVhcmVzdCBmYXN0IGVub3VnaD9cbiAgcmV0dXJuIFV0aWxzLm5lYXJlc3QodGhpcywgcG9vbCk7XG59O1xuXG4vLyBXZSB1cGRhdGUgdGhvc2UgZm9yIHBvc2l0aW9ucywgbWF5YmUgd2UgZG9uJ3QgbmVlZCBpdD9cbnZhciBheGVzID0ge1xuICB4OiBNYXRoLmNvcyxcbiAgeTogTWF0aC5zaW5cbn07XG5cbi8qKlxuICogVXBkYXRlIHBvc2l0aW9uIGZvciBhbiBlbnRpdHkgdGhhdCBoYXMgc3BlZWQgYW5kIGRpcmVjdGlvbi5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkaXJlY3Rpb24gQW5nbGUgZ2l2ZW4gaW4gcmFkaWFuc1xuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIERpc3RhbmNlIHRvIG1vdmVcbiAqL1xuVXRpbHMubW92ZUluRGlyZWN0aW9uID0gZnVuY3Rpb24oZGlyZWN0aW9uLCB2YWx1ZSkge1xuICB2YWx1ZSAvPSAxMDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBmb3IgKHZhciBheGlzIGluIGF4ZXMpIHtcbiAgICAgIHRoaXNbYXhpc10gKz0gYXhlc1theGlzXSh0aGlzLmRpcmVjdGlvbikgKiB2YWx1ZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogVXBkYXRlIHNoaXAgcG9zaXRpb24gd2l0aCBjdXJyZW50IGRpcmVjdGlvbiBhbmQgc3BlZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdCBUaW1lIGRlbHRhIGZvciBjdXJyZW50IGZyYW1lIGluIHNlY29uZHNcbiAqL1xuRU5HSU5FLlNoaXAucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihkdCkge1xuICBpZiAoIXRoaXMuZnJvemVuKSB7XG4gICAgVXRpbHMubW92ZUluRGlyZWN0aW9uLmFwcGx5KHRoaXMsIFt0aGlzLmRpcmVjdGlvbiwgdGhpcy5zcGVlZCAqIGR0XSk7XG4gIH1cblxuICBpZiAodGhpcy5mb3JjZSA+IDApIHtcbiAgICB0aGlzLmZvcmNlIC09IDIwMCAqIGR0O1xuICAgIFV0aWxzLm1vdmVJbkRpcmVjdGlvbi5hcHBseSh0aGlzLCBbdGhpcy5mb3JjZURpcmVjdGlvbiwgdGhpcy5mb3JjZSAqIGR0XSk7XG4gIH1cbn07XG5cbi8qKlxuICogRnJhbWUgc3RlcCBmb3IgYSBwYXJ0aWNsZVxuICogQHBhcmFtIHtOdW1iZXJ9IGR0IFRpbWUgZGVsdGEgZm9yIGN1cnJlbnQgZnJhbWUgaW4gc2Vjb25kc1xuICovXG5FTkdJTkUuUGFydGljbGUucHJvdG90eXBlLnN0ZXAgPSBmdW5jdGlvbihkdCkge1xuICB0aGlzLmxpZmV0aW1lICs9IGR0O1xuICAvLyBVcGRhdGUgcG9zaXRpb25cbiAgZm9yICh2YXIgYXhpcyBpbiBheGVzKSB7XG4gICAgdGhpc1theGlzXSArPSBheGVzW2F4aXNdKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcbiAgfVxuICB0aGlzLnNwZWVkID0gTWF0aC5tYXgoMCwgdGhpcy5zcGVlZCAtIHRoaXMuZGFtcGluZyAqIGR0KTtcblxuICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4odGhpcy5saWZldGltZSAvIHRoaXMuZHVyYXRpb24sIDEuMCk7XG4gIC8vIFB1dCBwYXJ0aWNsZSBvZmZzY3JlZW4gZm9yIHBvb2xpbmcgYW5kIHRvIGtlZXAgcmVuZGVyIHRpbWUgY29uc3RhbnRcbiAgaWYgKHRoaXMucHJvZ3Jlc3MgPj0gMS4wKSB7XG4gICAgdGhpcy54ID0gMDtcbiAgICB0aGlzLnkgPSAwO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICB9XG4gIC8vIFVwZGF0ZSBpbmRleCBmb3IgY3VycmVudCBzcHJpdGUgdG8gcmVuZGVyXG4gIHRoaXMuc3ByaXRlSW5kZXggPSBNYXRoLmZsb29yKHRoaXMucHJvZ3Jlc3MgKiB0aGlzLnNwcml0ZXMubGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBzdGFyIGlzIGluIHNjcmVlbiBib3VuZGFyaWVzLlxuICogT3RoZXJ3aXNlIHdyYXAgaXQgdG8gdGhlIG9wcG9zaXRlIHNpZGUgb2Ygc2NyZWVuLlxuICogQHBhcmFtIHtTdGFyfSBzdGFyIFByb2JlZCBzdGFyXG4gKi9cbkVOR0lORS5CYWNrZ3JvdW5kU3RhcnMucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbihzdGFyKSB7XG4gIHZhciBwb3MgPSBbc3Rhci54LCBzdGFyLnksIDEsIDFdO1xuICB2YXIgYm91bmRzID0gWzAsIDAsIGFwcC53aWR0aCwgYXBwLmhlaWdodF07XG5cbiAgaWYgKHBvc1swXSA8IGJvdW5kc1swXSkgc3Rhci54ID0gYXBwLndpZHRoO1xuICBpZiAocG9zWzFdIDwgYm91bmRzWzFdKSBzdGFyLnkgPSBhcHAuaGVpZ2h0O1xuXG4gIGlmIChwb3NbMF0gPiBib3VuZHNbMl0pIHN0YXIueCA9IDA7XG4gIGlmIChwb3NbMV0gPiBib3VuZHNbM10pIHN0YXIueSA9IDA7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9