import React, { createContext, forwardRef, createElement, Component, Fragment, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button as Button$1 } from '@material-ui/core';
import i from 'react-dom';
import require$$2 from '@material-ui/core/SvgIcon';

var HelloWorld = function () {
    return React.createElement("div", null, "Hello World");
};

var palette = {
    background: {
        default: '#FFFFFF',
    },
    primary: '#32C896',
    primaryContrastText: '#FFFFFF',
    secondary: '#19B3EE',
    secondaryContrastText: '#FFFFFF',
    tertiary: '#14283C',
    tertiaryContrastText: '#FFFFFF',
    active: '#51606E',
    error: '#FF1515',
    focus: '#19B3EE',
    info: '#19B3EE',
    label: '#BAC0C6',
    success: '#14DE2D',
    warning: '#F78E27',
    greyScales: {
        '50': '#EEEEEE',
        '100': '#E3E3E3',
        '300': '#D1D1D1',
        '400': '#ACACAC',
        '500': '#8B8B8B',
        '600': '#646464',
        '700': '#646464',
        '800': '#515151',
        '900': '#131313',
    },
    newGreyScales: {
        '25': '#F7F8F9',
        '50': '#ECEDEF',
        '100': '#DBDEE1',
        '300': '#BAC0C6',
        '400': '#85909A',
        '500': '#6A7783',
        '700': '#374858',
    },
    text: {
        primary: '#333333',
        secondary: '#424242',
    },
    feedback: {
        error: '#FF0000',
    },
    alert: {
        success: {
            background: '#BBECFF',
        },
    },
};
var theme = {
    palette: palette,
};

var __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var $Button = styled(Button$1)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &.MuiButton-contained {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  :disabled {\n    &.MuiButton-contained.Mui-disabled {\n      background-color: ", ";\n      cursor: default;\n      opacity: 0.6;\n      boxshadow: '0 2px 5px 0 rgba(0,0,0,0.05) !important';\n    }\n  }\n\n  :hover {\n    &.MuiButton-contained {\n      boxshadow: '0 4px 6px 0 rgba(0,0,0,0.35) !important';\n      background-color: ", ";\n    }\n  }\n"], ["\n  &.MuiButton-contained {\n    background-color: ",
    ";\n    color: ",
    ";\n  }\n\n  :disabled {\n    &.MuiButton-contained.Mui-disabled {\n      background-color: ", ";\n      cursor: default;\n      opacity: 0.6;\n      boxshadow: '0 2px 5px 0 rgba(0,0,0,0.05) !important';\n    }\n  }\n\n  :hover {\n    &.MuiButton-contained {\n      boxshadow: '0 4px 6px 0 rgba(0,0,0,0.35) !important';\n      background-color: ",
    ";\n    }\n  }\n"])), function (_a) {
    var btncolor = _a.btncolor;
    return (btncolor === 'primary' && theme.palette.primary) ||
        (btncolor === 'secondary' && theme.palette.secondary) ||
        (btncolor === 'tertiary' && theme.palette.tertiary) ||
        (btncolor === 'warning' && theme.palette.warning) ||
        theme.palette.primary;
}, function (_a) {
    var btncolor = _a.btncolor;
    return (btncolor === 'primary' && theme.palette.primaryContrastText) ||
        (btncolor === 'secondary' && theme.palette.secondaryContrastText) ||
        (btncolor === 'tertiary' && theme.palette.tertiaryContrastText) ||
        theme.palette.primaryContrastText;
}, theme.palette.newGreyScales['300'], function (_a) {
    var btncolor = _a.btncolor;
    return (btncolor === 'primary' && theme.palette.primary) ||
        (btncolor === 'secondary' && theme.palette.secondary) ||
        (btncolor === 'tertiary' && theme.palette.tertiary) ||
        (btncolor === 'warning' && theme.palette.warning) ||
        theme.palette.primary;
});
var templateObject_1;

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var Button = function (_a) {
    var children = _a.children, rest = __rest(_a, ["children"]);
    return (React.createElement($Button, __assign({ variant: "contained" }, rest), children));
};

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? process.env.NODE_ENV === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};
var removeLabel = function removeLabel(context, content) {
  if (context === 1 && // charcode for l
  content.charCodeAt(0) === 108 && // charcode for b
  content.charCodeAt(2) === 98 // this ignores label
  ) {
      return '';
    }
};

var isBrowser = typeof document !== 'undefined';
var rootServerStylisCache = {};
var getServerStylisCache = isBrowser ? undefined : weakMemoize(function () {
  var getCache = weakMemoize(function () {
    return {};
  });
  var prefixTrueCache = {};
  var prefixFalseCache = {};
  return function (prefix) {
    if (prefix === undefined || prefix === true) {
      return prefixTrueCache;
    }

    if (prefix === false) {
      return prefixFalseCache;
    }

    return getCache(prefix);
  };
});

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_min(stylisOptions);

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {}; // $FlowFixMe

  var container;

  if (isBrowser) {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  if (isBrowser) {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      if (process.env.NODE_ENV !== 'production' && serialized.map !== undefined) {
        var map = serialized.map;
        Sheet.current = {
          insert: function insert(rule) {
            sheet.insert(rule + map);
          }
        };
      }

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  } else {
    stylis.use(removeLabel);
    var serverStylisCache = rootServerStylisCache;

    if (options.stylisPlugins || options.prefix !== undefined) {
      stylis.use(options.stylisPlugins); // $FlowFixMe

      serverStylisCache = getServerStylisCache(options.stylisPlugins || rootServerStylisCache)(options.prefix);
    }

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = stylis(selector, serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if ( // using === development instead of !== production
        // because if people do ssr in tests, the source maps showing up would be annoying
        process.env.NODE_ENV === 'development' && serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    // https://esbench.com/bench/5bf7371a4cd7e6009ef61d0a
    var commentStart = /\/\*/g;
    var commentEnd = /\*\//g;
    stylis.use(function (context, content) {
      switch (context) {
        case -1:
          {
            while (commentStart.test(content)) {
              commentEnd.lastIndex = commentStart.lastIndex;

              if (commentEnd.test(content)) {
                commentStart.lastIndex = commentEnd.lastIndex;
                continue;
              }

              throw new Error('Your styles have an unterminated comment ("/*" without corresponding "*/").');
            }

            commentStart.lastIndex = 0;
            break;
          }
      }
    });
    stylis.use(function (context, content, selectors) {
      switch (context) {
        case -1:
          {
            var flag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';
            var unsafePseudoClasses = content.match(/(:first|:nth|:nth-last)-child/g);

            if (unsafePseudoClasses && cache.compat !== true) {
              unsafePseudoClasses.forEach(function (unsafePseudoClass) {
                var ignoreRegExp = new RegExp(unsafePseudoClass + ".*\\/\\* " + flag + " \\*\\/");
                var ignore = ignoreRegExp.test(content);

                if (unsafePseudoClass && !ignore) {
                  console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
                }
              });
            }

            break;
          }
      }
    });
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

var isBrowser$1 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      if (!isBrowser$1 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$1 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (process.env.NODE_ENV !== 'production') {
  var contentValuePattern = /(attr|calc|counters?|url)\(/;
  var contentValues = ['normal', 'none', 'counter', 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        console.error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var shouldWarnAboutInterpolatingClassNameFromCss = true;

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (process.env.NODE_ENV !== 'production' && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (process.env.NODE_ENV !== 'production' && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        } else if (process.env.NODE_ENV !== 'production') {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (process.env.NODE_ENV !== 'production') {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];

  if (process.env.NODE_ENV !== 'production' && couldBeSelectorInterpolation && shouldWarnAboutInterpolatingClassNameFromCss && cached !== undefined) {
    console.error('Interpolating a className from css`` is not recommended and will cause problems with composition.\n' + 'Interpolating a className from css`` will be completely unsupported in a future major version of Emotion');
    shouldWarnAboutInterpolatingClassNameFromCss = false;
  }

  return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (process.env.NODE_ENV !== 'production' && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
var sourceMapPattern;

if (process.env.NODE_ENV !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    if (process.env.NODE_ENV !== 'production' && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      if (process.env.NODE_ENV !== 'production' && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (process.env.NODE_ENV !== 'production') {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var isBrowser$2 = typeof document !== 'undefined';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var EmotionCacheContext = /*#__PURE__*/createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? createCache() : null);
var ThemeContext = /*#__PURE__*/createContext({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return /*#__PURE__*/createElement(EmotionCacheContext.Consumer, null, function (cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return /*#__PURE__*/forwardRef(render);
};

if (!isBrowser$2) {
  var BasicProvider = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(BasicProvider, _React$Component);

    function BasicProvider(props, context, updater) {
      var _this;

      _this = _React$Component.call(this, props, context, updater) || this;
      _this.state = {
        value: createCache()
      };
      return _this;
    }

    var _proto = BasicProvider.prototype;

    _proto.render = function render() {
      return /*#__PURE__*/createElement(EmotionCacheContext.Provider, this.state, this.props.children(this.state.value));
    };

    return BasicProvider;
  }(Component);

  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      return /*#__PURE__*/createElement(EmotionCacheContext.Consumer, null, function (context) {
        if (context === null) {
          return /*#__PURE__*/createElement(BasicProvider, null, function (newContext) {
            return func(props, newContext);
          });
        } else {
          return func(props, context);
        }
      });
    };
  };
}

// thus we only need to replace what is a valid character for JS, but not for CSS

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if (process.env.NODE_ENV !== 'production' && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // TODO: check if this still works with all of those different JSX functions

  if (process.env.NODE_ENV !== 'production') {
    var error = new Error();

    if (error.stack) {
      // chrome
      var match = error.stack.match(/at (?:Object\.|Module\.|)(?:jsx|createEmotionProps).*\n\s+at (?:Object\.|)([A-Z][A-Za-z$]+) /);

      if (!match) {
        // safari and firefox
        match = error.stack.match(/.*\n([A-Z][A-Za-z$]+)@/);
      }

      if (match) {
        newProps[labelPropName] = sanitizeIdentifier(match[1]);
      }
    }
  }

  return newProps;
};

var render = function render(cache, props, theme, ref) {
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles);

  if (process.env.NODE_ENV !== 'production' && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  var rules = insertStyles(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && (process.env.NODE_ENV === 'production' || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = /*#__PURE__*/createElement(type, newProps);

  if (!isBrowser$2 && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion-" + cache.key] = serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
}; // eslint-disable-next-line no-undef


var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  if (typeof props.css === 'function') {
    return /*#__PURE__*/createElement(ThemeContext.Consumer, null, function (theme) {
      return render(cache, props, theme, ref);
    });
  }

  return render(cache, props, null, ref);
});

if (process.env.NODE_ENV !== 'production') {
  Emotion.displayName = 'EmotionCssPropInternal';
}

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  createElementArgArray[1] = createEmotionProps(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return createElement.apply(null, createElementArgArray);
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = withEmotionCache(function (props, context) {
  return /*#__PURE__*/createElement(ThemeContext.Consumer, null, function (theme) {
    var rules = '';
    var serializedHashes = '';
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && process.env.NODE_ENV !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = serializeStyles(args, context.registered);

      if (isBrowser$2) {
        insertStyles(context, serialized, false);
      } else {
        var res = insertStyles(context, serialized, false);

        if (res !== undefined) {
          rules += res;
        }
      }

      if (!isBrowser$2) {
        serializedHashes += " " + serialized.name;
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && process.env.NODE_ENV !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    if (!isBrowser$2 && rules.length !== 0) {
      var _ref;

      return /*#__PURE__*/createElement(Fragment, null, /*#__PURE__*/createElement("style", (_ref = {}, _ref["data-emotion-" + context.key] = serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref.nonce = context.sheet.nonce, _ref)), ele);
    }

    return ele;
  });
});

function a(){return (a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e}).apply(this,arguments)}function s(e,t){if(null==e)return {};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}function c(e){return (c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){return e(t={exports:{}},t.exports),t.exports
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */}var l="function"==typeof Symbol&&Symbol.for,p=l?Symbol.for("react.element"):60103,f=l?Symbol.for("react.portal"):60106,d=l?Symbol.for("react.fragment"):60107,g=l?Symbol.for("react.strict_mode"):60108,y=l?Symbol.for("react.profiler"):60114,b=l?Symbol.for("react.provider"):60109,m=l?Symbol.for("react.context"):60110,C=l?Symbol.for("react.async_mode"):60111,v=l?Symbol.for("react.concurrent_mode"):60111,h=l?Symbol.for("react.forward_ref"):60112,I=l?Symbol.for("react.suspense"):60113,A=l?Symbol.for("react.suspense_list"):60120,x=l?Symbol.for("react.memo"):60115,E=l?Symbol.for("react.lazy"):60116,O=l?Symbol.for("react.block"):60121,N=l?Symbol.for("react.fundamental"):60117,S=l?Symbol.for("react.responder"):60118,w=l?Symbol.for("react.scope"):60119;function R(e){if("object"===c(e)&&null!==e){var t=e.$$typeof;switch(t){case p:switch(e=e.type){case C:case v:case d:case y:case g:case I:return e;default:switch(e=e&&e.$$typeof){case m:case h:case E:case x:case b:return e;default:return t}}case f:return t}}}function Z(e){return R(e)===v}var G={AsyncMode:C,ConcurrentMode:v,ContextConsumer:m,ContextProvider:b,Element:p,ForwardRef:h,Fragment:d,Lazy:E,Memo:x,Portal:f,Profiler:y,StrictMode:g,Suspense:I,isAsyncMode:function(e){return Z(e)||R(e)===C},isConcurrentMode:Z,isContextConsumer:function(e){return R(e)===m},isContextProvider:function(e){return R(e)===b},isElement:function(e){return "object"===c(e)&&null!==e&&e.$$typeof===p},isForwardRef:function(e){return R(e)===h},isFragment:function(e){return R(e)===d},isLazy:function(e){return R(e)===E},isMemo:function(e){return R(e)===x},isPortal:function(e){return R(e)===f},isProfiler:function(e){return R(e)===y},isStrictMode:function(e){return R(e)===g},isSuspense:function(e){return R(e)===I},isValidElementType:function(e){return "string"==typeof e||"function"==typeof e||e===d||e===v||e===y||e===g||e===I||e===A||"object"===c(e)&&null!==e&&(e.$$typeof===E||e.$$typeof===x||e.$$typeof===b||e.$$typeof===m||e.$$typeof===h||e.$$typeof===N||e.$$typeof===S||e.$$typeof===w||e.$$typeof===O)},typeOf:R},V=u((function(e,t){"production"!==process.env.NODE_ENV&&function(){var e="function"==typeof Symbol&&Symbol.for,n=e?Symbol.for("react.element"):60103,r=e?Symbol.for("react.portal"):60106,o=e?Symbol.for("react.fragment"):60107,i=e?Symbol.for("react.strict_mode"):60108,a=e?Symbol.for("react.profiler"):60114,s=e?Symbol.for("react.provider"):60109,u=e?Symbol.for("react.context"):60110,l=e?Symbol.for("react.async_mode"):60111,p=e?Symbol.for("react.concurrent_mode"):60111,f=e?Symbol.for("react.forward_ref"):60112,d=e?Symbol.for("react.suspense"):60113,g=e?Symbol.for("react.suspense_list"):60120,y=e?Symbol.for("react.memo"):60115,b=e?Symbol.for("react.lazy"):60116,m=e?Symbol.for("react.block"):60121,C=e?Symbol.for("react.fundamental"):60117,v=e?Symbol.for("react.responder"):60118,h=e?Symbol.for("react.scope"):60119;function I(e){if("object"===c(e)&&null!==e){var t=e.$$typeof;switch(t){case n:var g=e.type;switch(g){case l:case p:case o:case a:case i:case d:return g;default:var m=g&&g.$$typeof;switch(m){case u:case f:case b:case y:case s:return m;default:return t}}case r:return t}}}var A=l,x=p,E=u,O=s,N=n,S=f,w=o,R=b,Z=y,G=r,V=a,k=i,j=d,T=!1;function P(e){return I(e)===p}t.AsyncMode=A,t.ConcurrentMode=x,t.ContextConsumer=E,t.ContextProvider=O,t.Element=N,t.ForwardRef=S,t.Fragment=w,t.Lazy=R,t.Memo=Z,t.Portal=G,t.Profiler=V,t.StrictMode=k,t.Suspense=j,t.isAsyncMode=function(e){return T||(T=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),P(e)||I(e)===l},t.isConcurrentMode=P,t.isContextConsumer=function(e){return I(e)===u},t.isContextProvider=function(e){return I(e)===s},t.isElement=function(e){return "object"===c(e)&&null!==e&&e.$$typeof===n},t.isForwardRef=function(e){return I(e)===f},t.isFragment=function(e){return I(e)===o},t.isLazy=function(e){return I(e)===b},t.isMemo=function(e){return I(e)===y},t.isPortal=function(e){return I(e)===r},t.isProfiler=function(e){return I(e)===a},t.isStrictMode=function(e){return I(e)===i},t.isSuspense=function(e){return I(e)===d},t.isValidElementType=function(e){return "string"==typeof e||"function"==typeof e||e===o||e===p||e===a||e===i||e===d||e===g||"object"===c(e)&&null!==e&&(e.$$typeof===b||e.$$typeof===y||e.$$typeof===s||e.$$typeof===u||e.$$typeof===f||e.$$typeof===C||e.$$typeof===v||e.$$typeof===h||e.$$typeof===m)},t.typeOf=I;}();})),k=(V.AsyncMode,V.ConcurrentMode,V.ContextConsumer,V.ContextProvider,V.Element,V.ForwardRef,V.Fragment,V.Lazy,V.Memo,V.Portal,V.Profiler,V.StrictMode,V.Suspense,V.isAsyncMode,V.isConcurrentMode,V.isContextConsumer,V.isContextProvider,V.isElement,V.isForwardRef,V.isFragment,V.isLazy,V.isMemo,V.isPortal,V.isProfiler,V.isStrictMode,V.isSuspense,V.isValidElementType,V.typeOf,u((function(e){"production"===process.env.NODE_ENV?e.exports=G:e.exports=V;}))),j=Object.getOwnPropertySymbols,T=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;function W(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}var H=function(){try{if(!Object.assign)return !1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return !1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return !1;var r={};return "abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e;})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return !1}}()?Object.assign:function(e,t){for(var n,r,o=W(e),i=1;i<arguments.length;i++){for(var a in n=Object(arguments[i]))T.call(n,a)&&(o[a]=n[a]);if(j){r=j(n);for(var s=0;s<r.length;s++)P.call(n,r[s])&&(o[r[s]]=n[r[s]]);}}return o},_="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",J=function(){};if("production"!==process.env.NODE_ENV){var X=_,Y={},B=Function.call.bind(Object.prototype.hasOwnProperty);J=function(e){var t="Warning: "+e;"undefined"!=typeof console&&console.error(t);try{throw new Error(t)}catch(e){}};}function F(e,t,n,r,o){if("production"!==process.env.NODE_ENV)for(var i in e)if(B(e,i)){var a;try{if("function"!=typeof e[i]){var s=Error((r||"React class")+": "+n+" type `"+i+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+c(e[i])+"`.");throw s.name="Invariant Violation",s}a=e[i](t,i,r,n,null,X);}catch(e){a=e;}if(!a||a instanceof Error||J((r||"React class")+": type specification of "+n+" `"+i+"` is invalid; the type checker function must return `null` or an `Error` but returned a "+c(a)+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),a instanceof Error&&!(a.message in Y)){Y[a.message]=!0;var u=o?o():"";J("Failed "+n+" type: "+a.message+(null!=u?u:""));}}}F.resetWarningCache=function(){"production"!==process.env.NODE_ENV&&(Y={});};var D=F,$=Function.call.bind(Object.prototype.hasOwnProperty),L=function(){};function M(){return null}"production"!==process.env.NODE_ENV&&(L=function(e){var t="Warning: "+e;"undefined"!=typeof console&&console.error(t);try{throw new Error(t)}catch(e){}});var z=function(e,t){var n="function"==typeof Symbol&&Symbol.iterator;var r={array:s("array"),bool:s("boolean"),func:s("function"),number:s("number"),object:s("object"),string:s("string"),symbol:s("symbol"),any:a(M),arrayOf:function(e){return a((function(t,n,r,o,a){if("function"!=typeof e)return new i("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var s=t[n];if(!Array.isArray(s))return new i("Invalid "+o+" `"+a+"` of type `"+l(s)+"` supplied to `"+r+"`, expected an array.");for(var c=0;c<s.length;c++){var u=e(s,c,r,o,a+"["+c+"]",_);if(u instanceof Error)return u}return null}))},element:a((function(t,n,r,o,a){var s=t[n];return e(s)?null:new i("Invalid "+o+" `"+a+"` of type `"+l(s)+"` supplied to `"+r+"`, expected a single ReactElement.")})),elementType:a((function(e,t,n,r,o){var a=e[t];return k.isValidElementType(a)?null:new i("Invalid "+r+" `"+o+"` of type `"+l(a)+"` supplied to `"+n+"`, expected a single ReactElement type.")})),instanceOf:function(e){return a((function(t,n,r,o,a){if(!(t[n]instanceof e)){var s=e.name||"<<anonymous>>";return new i("Invalid "+o+" `"+a+"` of type `"+function(e){if(!e.constructor||!e.constructor.name)return "<<anonymous>>";return e.constructor.name}(t[n])+"` supplied to `"+r+"`, expected instance of `"+s+"`.")}return null}))},node:a((function(e,t,n,r,o){return u(e[t])?null:new i("Invalid "+r+" `"+o+"` supplied to `"+n+"`, expected a ReactNode.")})),objectOf:function(e){return a((function(t,n,r,o,a){if("function"!=typeof e)return new i("Property `"+a+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var s=t[n],c=l(s);if("object"!==c)return new i("Invalid "+o+" `"+a+"` of type `"+c+"` supplied to `"+r+"`, expected an object.");for(var u in s)if($(s,u)){var p=e(s,u,r,o,a+"."+u,_);if(p instanceof Error)return p}return null}))},oneOf:function(e){if(!Array.isArray(e))return "production"!==process.env.NODE_ENV&&(arguments.length>1?L("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):L("Invalid argument supplied to oneOf, expected an array.")),M;function t(t,n,r,a,s){for(var c=t[n],u=0;u<e.length;u++)if(o(c,e[u]))return null;var l=JSON.stringify(e,(function(e,t){return "symbol"===p(t)?String(t):t}));return new i("Invalid "+a+" `"+s+"` of value `"+String(c)+"` supplied to `"+r+"`, expected one of "+l+".")}return a(t)},oneOfType:function(e){if(!Array.isArray(e))return "production"!==process.env.NODE_ENV&&L("Invalid argument supplied to oneOfType, expected an instance of array."),M;for(var t=0;t<e.length;t++){var n=e[t];if("function"!=typeof n)return L("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+f(n)+" at index "+t+"."),M}return a((function(t,n,r,o,a){for(var s=0;s<e.length;s++){if(null==(0, e[s])(t,n,r,o,a,_))return null}return new i("Invalid "+o+" `"+a+"` supplied to `"+r+"`.")}))},shape:function(e){return a((function(t,n,r,o,a){var s=t[n],c=l(s);if("object"!==c)return new i("Invalid "+o+" `"+a+"` of type `"+c+"` supplied to `"+r+"`, expected `object`.");for(var u in e){var p=e[u];if(p){var f=p(s,u,r,o,a+"."+u,_);if(f)return f}}return null}))},exact:function(e){return a((function(t,n,r,o,a){var s=t[n],c=l(s);if("object"!==c)return new i("Invalid "+o+" `"+a+"` of type `"+c+"` supplied to `"+r+"`, expected `object`.");var u=H({},t[n],e);for(var p in u){var f=e[p];if(!f)return new i("Invalid "+o+" `"+a+"` key `"+p+"` supplied to `"+r+"`.\nBad object: "+JSON.stringify(t[n],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var d=f(s,p,r,o,a+"."+p,_);if(d)return d}return null}))}};function o(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}function i(e){this.message=e,this.stack="";}function a(e){if("production"!==process.env.NODE_ENV)var n={},r=0;function o(o,a,s,c,u,l,p){if(c=c||"<<anonymous>>",l=l||s,p!==_){if(t){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}if("production"!==process.env.NODE_ENV&&"undefined"!=typeof console){var d=c+":"+s;!n[d]&&r<3&&(L("You are manually calling a React.PropTypes validation function for the `"+l+"` prop on `"+c+"`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),n[d]=!0,r++);}}return null==a[s]?o?null===a[s]?new i("The "+u+" `"+l+"` is marked as required in `"+c+"`, but its value is `null`."):new i("The "+u+" `"+l+"` is marked as required in `"+c+"`, but its value is `undefined`."):null:e(a,s,c,u,l)}var a=o.bind(null,!1);return a.isRequired=o.bind(null,!0),a}function s(e){return a((function(t,n,r,o,a,s){var c=t[n];return l(c)!==e?new i("Invalid "+o+" `"+a+"` of type `"+p(c)+"` supplied to `"+r+"`, expected `"+e+"`."):null}))}function u(t){switch(c(t)){case"number":case"string":case"undefined":return !0;case"boolean":return !t;case"object":if(Array.isArray(t))return t.every(u);if(null===t||e(t))return !0;var r=function(e){var t=e&&(n&&e[n]||e["@@iterator"]);if("function"==typeof t)return t}(t);if(!r)return !1;var o,i=r.call(t);if(r!==t.entries){for(;!(o=i.next()).done;)if(!u(o.value))return !1}else for(;!(o=i.next()).done;){var a=o.value;if(a&&!u(a[1]))return !1}return !0;default:return !1}}function l(e){var t=c(e);return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,t){return "symbol"===e||!!t&&("Symbol"===t["@@toStringTag"]||"function"==typeof Symbol&&t instanceof Symbol)}(t,e)?"symbol":t}function p(e){if(null==e)return ""+e;var t=l(e);if("object"===t){if(e instanceof Date)return "date";if(e instanceof RegExp)return "regexp"}return t}function f(e){var t=p(e);switch(t){case"array":case"object":return "an "+t;case"boolean":case"date":case"regexp":return "a "+t;default:return t}}return i.prototype=Error.prototype,r.checkPropTypes=D,r.resetWarningCache=D.resetWarningCache,r.PropTypes=r,r};function U(){}function Q(){}Q.resetWarningCache=U;var K=u((function(e){if("production"!==process.env.NODE_ENV){var t=k;e.exports=z(t.isElement,!0);}else e.exports=function(){function e(e,t,n,r,o,i){if(i!==_){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:Q,resetWarningCache:U};return n.PropTypes=n,n}();})),q=!("undefined"==typeof window||!window.document||!window.document.createElement),ee=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function te(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ne(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t||"object"!==c(t)&&"function"!=typeof t?e:t}var re=function(e){function t(){return te(this,t),ne(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+c(t));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}(t,React.Component),ee(t,[{key:"componentWillUnmount",value:function(){this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null;}},{key:"render",value:function(){return q?(this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode)),i.createPortal(this.props.children,this.props.node||this.defaultNode)):null}}]),t}();re.propTypes={children:K.node.isRequired,node:K.any};var oe=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function ie(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ae(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t||"object"!==c(t)&&"function"!=typeof t?e:t}var se=function(e){function t(){return ie(this,t),ae(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+c(t));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}(t,React.Component),oe(t,[{key:"componentDidMount",value:function(){this.renderPortal();}},{key:"componentDidUpdate",value:function(e){this.renderPortal();}},{key:"componentWillUnmount",value:function(){i.unmountComponentAtNode(this.defaultNode||this.props.node),this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null,this.portal=null;}},{key:"renderPortal",value:function(e){this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode));var t=this.props.children;"function"==typeof this.props.children.type&&(t=React.cloneElement(this.props.children)),this.portal=i.unstable_renderSubtreeIntoContainer(this,t,this.props.node||this.defaultNode);}},{key:"render",value:function(){return null}}]),t}();se.propTypes={children:K.node.isRequired,node:K.any};var ce=i.createPortal?re:se;function ue(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t;}function le(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}var pe=!1,fe="production"!==process.env.NODE_ENV?K.oneOfType([K.number,K.shape({enter:K.number,exit:K.number,appear:K.number}).isRequired]):null,de="production"!==process.env.NODE_ENV?K.oneOfType([K.string,K.shape({enter:K.string,exit:K.string,active:K.string}),K.shape({enter:K.string,enterDone:K.string,enterActive:K.string,exit:K.string,exitDone:K.string,exitActive:K.string})]):null,ge=React.createContext(null),ye=function(e){function t(t,n){var r;r=e.call(this,t,n)||this;var o,i=n&&!n.isMounting?t.enter:t.appear;return r.appearStatus=null,t.in?i?(o="exited",r.appearStatus="entering"):o="entered":o=t.unmountOnExit||t.mountOnEnter?"unmounted":"exited",r.state={status:o},r.nextCallback=null,r}ue(t,e),t.getDerivedStateFromProps=function(e,t){return e.in&&"unmounted"===t.status?{status:"exited"}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus);},r.componentDidUpdate=function(e){var t=null;if(e!==this.props){var n=this.state.status;this.props.in?"entering"!==n&&"entered"!==n&&(t="entering"):"entering"!==n&&"entered"!==n||(t="exiting");}this.updateStatus(!1,t);},r.componentWillUnmount=function(){this.cancelNextCallback();},r.getTimeouts=function(){var e,t,n,r=this.props.timeout;return e=t=n=r,null!=r&&"number"!=typeof r&&(e=r.exit,t=r.enter,n=void 0!==r.appear?r.appear:t),{exit:e,enter:t,appear:n}},r.updateStatus=function(e,t){void 0===e&&(e=!1),null!==t?(this.cancelNextCallback(),"entering"===t?this.performEnter(e):this.performExit()):this.props.unmountOnExit&&"exited"===this.state.status&&this.setState({status:"unmounted"});},r.performEnter=function(e){var t=this,n=this.props.enter,r=this.context?this.context.isMounting:e,o=this.props.nodeRef?[r]:[i.findDOMNode(this),r],a=o[0],s=o[1],c=this.getTimeouts(),u=r?c.appear:c.enter;!e&&!n||pe?this.safeSetState({status:"entered"},(function(){t.props.onEntered(a);})):(this.props.onEnter(a,s),this.safeSetState({status:"entering"},(function(){t.props.onEntering(a,s),t.onTransitionEnd(u,(function(){t.safeSetState({status:"entered"},(function(){t.props.onEntered(a,s);}));}));})));},r.performExit=function(){var e=this,t=this.props.exit,n=this.getTimeouts(),r=this.props.nodeRef?void 0:i.findDOMNode(this);t&&!pe?(this.props.onExit(r),this.safeSetState({status:"exiting"},(function(){e.props.onExiting(r),e.onTransitionEnd(n.exit,(function(){e.safeSetState({status:"exited"},(function(){e.props.onExited(r);}));}));}))):this.safeSetState({status:"exited"},(function(){e.props.onExited(r);}));},r.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null);},r.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t);},r.setNextCallback=function(e){var t=this,n=!0;return this.nextCallback=function(r){n&&(n=!1,t.nextCallback=null,e(r));},this.nextCallback.cancel=function(){n=!1;},this.nextCallback},r.onTransitionEnd=function(e,t){this.setNextCallback(t);var n=this.props.nodeRef?this.props.nodeRef.current:i.findDOMNode(this),r=null==e&&!this.props.addEndListener;if(n&&!r){if(this.props.addEndListener){var o=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],a=o[0],s=o[1];this.props.addEndListener(a,s);}null!=e&&setTimeout(this.nextCallback,e);}else setTimeout(this.nextCallback,0);},r.render=function(){var e=this.state.status;if("unmounted"===e)return null;var t=this.props,r=t.children,o=(t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef,s(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return React.createElement(ge.Provider,{value:null},"function"==typeof r?r(e,o):React.cloneElement(React.Children.only(r),o))},t}(React.Component);function be(){}ye.contextType=ge,ye.propTypes="production"!==process.env.NODE_ENV?{nodeRef:K.shape({current:"undefined"==typeof Element?K.any:K.instanceOf(Element)}),children:K.oneOfType([K.func.isRequired,K.element.isRequired]).isRequired,in:K.bool,mountOnEnter:K.bool,unmountOnExit:K.bool,appear:K.bool,enter:K.bool,exit:K.bool,timeout:function(e){var t=fe;e.addEndListener||(t=t.isRequired);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.apply(void 0,[e].concat(r))},addEndListener:K.func,onEnter:K.func,onEntering:K.func,onEntered:K.func,onExit:K.func,onExiting:K.func,onExited:K.func}:{},ye.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:be,onEntering:be,onEntered:be,onExit:be,onExiting:be,onExited:be},ye.UNMOUNTED="unmounted",ye.EXITED="exited",ye.ENTERING="entering",ye.ENTERED="entered",ye.EXITING="exiting";var me=function(e,t){return e&&t&&t.split(" ").forEach((function(t){return r=t,void((n=e).classList?n.classList.add(r):function(e,t){return e.classList?!!t&&e.classList.contains(t):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" ")}(n,r)||("string"==typeof n.className?n.className=n.className+" "+r:n.setAttribute("class",(n.className&&n.className.baseVal||"")+" "+r)));var n,r;}))},Ce=function(e,t){return e&&t&&t.split(" ").forEach((function(t){return r=t,void((n=e).classList?n.classList.remove(r):"string"==typeof n.className?n.className=le(n.className,r):n.setAttribute("class",le(n.className&&n.className.baseVal||"",r)));var n,r;}))},ve=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return (t=e.call.apply(e,[this].concat(r))||this).appliedClasses={appear:{},enter:{},exit:{}},t.onEnter=function(e,n){var r=t.resolveArguments(e,n),o=r[0],i=r[1];t.removeClasses(o,"exit"),t.addClass(o,i?"appear":"enter","base"),t.props.onEnter&&t.props.onEnter(e,n);},t.onEntering=function(e,n){var r=t.resolveArguments(e,n),o=r[0],i=r[1]?"appear":"enter";t.addClass(o,i,"active"),t.props.onEntering&&t.props.onEntering(e,n);},t.onEntered=function(e,n){var r=t.resolveArguments(e,n),o=r[0],i=r[1]?"appear":"enter";t.removeClasses(o,i),t.addClass(o,i,"done"),t.props.onEntered&&t.props.onEntered(e,n);},t.onExit=function(e){var n=t.resolveArguments(e)[0];t.removeClasses(n,"appear"),t.removeClasses(n,"enter"),t.addClass(n,"exit","base"),t.props.onExit&&t.props.onExit(e);},t.onExiting=function(e){var n=t.resolveArguments(e)[0];t.addClass(n,"exit","active"),t.props.onExiting&&t.props.onExiting(e);},t.onExited=function(e){var n=t.resolveArguments(e)[0];t.removeClasses(n,"exit"),t.addClass(n,"exit","done"),t.props.onExited&&t.props.onExited(e);},t.resolveArguments=function(e,n){return t.props.nodeRef?[t.props.nodeRef.current,e]:[e,n]},t.getClassNames=function(e){var n=t.props.classNames,r="string"==typeof n,o=r?""+(r&&n?n+"-":"")+e:n[e];return {baseClassName:o,activeClassName:r?o+"-active":n[e+"Active"],doneClassName:r?o+"-done":n[e+"Done"]}},t}ue(t,e);var r=t.prototype;return r.addClass=function(e,t,n){var r=this.getClassNames(t)[n+"ClassName"],o=this.getClassNames("enter").doneClassName;"appear"===t&&"done"===n&&o&&(r+=" "+o),"active"===n&&e&&e.scrollTop,r&&(this.appliedClasses[t][n]=r,me(e,r));},r.removeClasses=function(e,t){var n=this.appliedClasses[t],r=n.base,o=n.active,i=n.done;this.appliedClasses[t]={},r&&Ce(e,r),o&&Ce(e,o),i&&Ce(e,i);},r.render=function(){var e=this.props,t=(e.classNames,s(e,["classNames"]));return React.createElement(ye,a({},t,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},t}(React.Component);function he(e){"undefined"!=typeof document&&(document.documentElement.style.overflow=e?"hidden":"");}function Ie(n){var i=n.open,c=n.portal,u=n.closeOnClick,l=n.closeOnEsc,p=void 0===l||l,f=n.defaultPortalStyles,d=void 0===f?{position:"relative",zIndex:999}:f,g=n.onClose,y=void 0===g?function(){return null}:g,b=n.animation,m=void 0===b?{duration:300,easing:"ease"}:b,C=n.children,v=function(e,t){if(null==e)return {};var n,r,o=s(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n]);}return o}(n,["open","portal","closeOnClick","closeOnEsc","defaultPortalStyles","onClose","animation","children"]),h=useRef(null);return !c&&h&&h.current&&d&&Object.keys(d).forEach((function(e){h.current.defaultNode.style[e]=d[e];})),he(!!i),useEffect((function(){function e(e){"Escape"===e.key&&p&&y();}return document.addEventListener("keydown",e),document.removeEventListener("keydown",e)}),[p]),jsx(ce,a({ref:h},c?{node:c}:{}),jsx(ve,{in:i,classNames:"overlay",unmountOnExit:!0,timeout:m.duration},jsx("div",a({css:css("position:fixed;top:0;left:0;width:100%;height:100%;overflow:scroll;transition:opacity ",m.duration,"ms ",m.easing,";-webkit-overflow-scrolling:touch;&.overlay-enter-done{opacity:1;}&.overlay-exit,&.overlay-enter{opacity:0;};label:Overlay;"+("production"===process.env.NODE_ENV?"":"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3Q3NCIiwiZmlsZSI6ImluZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUG9ydGFsIH0gZnJvbSAncmVhY3QtcG9ydGFsJztcbmltcG9ydCB7IENTU1RyYW5zaXRpb24gfSBmcm9tICdyZWFjdC10cmFuc2l0aW9uLWdyb3VwJztcbmZ1bmN0aW9uIGxvY2tTY3JvbGwoc3RhdGUpIHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IHN0YXRlID8gJ2hpZGRlbicgOiAnJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBPdmVybGF5KHsgb3BlbiwgcG9ydGFsLCBjbG9zZU9uQ2xpY2ssIGNsb3NlT25Fc2MgPSB0cnVlLCBkZWZhdWx0UG9ydGFsU3R5bGVzID0geyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgekluZGV4OiA5OTkgfSwgb25DbG9zZSA9ICgpID0+IG51bGwsIGFuaW1hdGlvbiA9IHtcbiAgICBkdXJhdGlvbjogMzAwLFxuICAgIGVhc2luZzogJ2Vhc2UnXG59LCBjaGlsZHJlbiwgLi4uYXR0cnMgfSkge1xuICAgIGNvbnN0IGRlZmF1bHRQb3J0YWwgPSB1c2VSZWYobnVsbCk7XG4gICAgaWYgKCFwb3J0YWwgJiZcbiAgICAgICAgZGVmYXVsdFBvcnRhbCAmJlxuICAgICAgICBkZWZhdWx0UG9ydGFsLmN1cnJlbnQgJiZcbiAgICAgICAgISFkZWZhdWx0UG9ydGFsU3R5bGVzKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGRlZmF1bHRQb3J0YWxTdHlsZXMpLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICAgIGRlZmF1bHRQb3J0YWwuY3VycmVudC5kZWZhdWx0Tm9kZS5zdHlsZVtwcm9wXSA9IGRlZmF1bHRQb3J0YWxTdHlsZXNbcHJvcF07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAob3Blbikge1xuICAgICAgICBsb2NrU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG9ja1Njcm9sbChmYWxzZSk7XG4gICAgfVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIG9uRXNjKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICBjbG9zZU9uRXNjICYmIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25Fc2MpO1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uRXNjKTtcbiAgICB9LCBbY2xvc2VPbkVzY10pO1xuICAgIHJldHVybiAoPFBvcnRhbCByZWY9e2RlZmF1bHRQb3J0YWx9IHsuLi4ocG9ydGFsID8geyBub2RlOiBwb3J0YWwgfSA6IHt9KX0+XG4gICAgICA8Q1NTVHJhbnNpdGlvbiBpbj17b3Blbn0gY2xhc3NOYW1lcz1cIm92ZXJsYXlcIiB1bm1vdW50T25FeGl0IHRpbWVvdXQ9e2FuaW1hdGlvbi5kdXJhdGlvbn0+XG4gICAgICAgIDxkaXYgY3NzPXtjc3MgYFxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgJHthbmltYXRpb24uZHVyYXRpb259bXMgJHthbmltYXRpb24uZWFzaW5nfTtcbiAgICAgICAgICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcblxuICAgICAgICAgICAgLyogVHJhbnNpdGlvbnMgKi9cbiAgICAgICAgICAgICYub3ZlcmxheS1lbnRlci1kb25lIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICYub3ZlcmxheS1leGl0LFxuICAgICAgICAgICAgJi5vdmVybGF5LWVudGVyIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgfSBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICBpZiAoY2xvc2VPbkNsaWNrKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCkge1xuICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH19IHsuLi5hdHRyc30+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQ1NTVHJhbnNpdGlvbj5cbiAgICA8L1BvcnRhbD4pO1xufSJdfQ== */")),onClick:function(e){u&&(e.preventDefault(),e.target===e.currentTarget&&y());}},v),C)))}ve.defaultProps={classNames:""},ve.propTypes="production"!==process.env.NODE_ENV?a({},ye.propTypes,{classNames:de,onEnter:K.func,onEntering:K.func,onEntered:K.func,onExit:K.func,onExiting:K.func,onExited:K.func}):{};

var __makeTemplateObject$1 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var $Overlay = styled(Ie)(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject$1(["\n  &.overlay {\n    display: flex;\n    background-color: ", ";\n    width: 100%;\n    padding: 30px;\n    flex-direction: column;\n  }\n"], ["\n  &.overlay {\n    display: flex;\n    background-color: ", ";\n    width: 100%;\n    padding: 30px;\n    flex-direction: column;\n  }\n"])), theme.palette.background.default);
var $Nav = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject$1(["\n  top: 0;\n  padding-top: 20px;\n  background-color: ", ";\n  display: flex;\n  justify-content: flex-end;\n  position: fixed;\n  width: inherit;\n  flex-direction: rows;\n\n  &.transparent {\n    background-color: transparent !important;\n  }\n\n  &.spaced {\n    justify-content: space-between !important;\n  }\n"], ["\n  top: 0;\n  padding-top: 20px;\n  background-color: ", ";\n  display: flex;\n  justify-content: flex-end;\n  position: fixed;\n  width: inherit;\n  flex-direction: rows;\n\n  &.transparent {\n    background-color: transparent !important;\n  }\n\n  &.spaced {\n    justify-content: space-between !important;\n  }\n"])), theme.palette.background.default);
var $LogoContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject$1(["\n  color: ", ";\n  height: auto;\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n"], ["\n  color: ", ";\n  height: auto;\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n"])), theme.palette.greyScales[900]);
var $Logo = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject$1(["\n  color: ", ";\n  height: auto;\n  margin-right: 20px;\n  width: 60px;\n\n  &.blank {\n    color: #ffffff;\n  }\n\n  .big-logo {\n    font-size: 4em;\n  }\n"], ["\n  color: ", ";\n  height: auto;\n  margin-right: 20px;\n  width: 60px;\n\n  &.blank {\n    color: #ffffff;\n  }\n\n  .big-logo {\n    font-size: 4em;\n  }\n"])), theme.palette.primary);
var $Clickable = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject$1(["\n  color: ", ";\n  display: flex;\n  cursor: pointer;\n  align-self: center;\n\n  :hover {\n    text-decoration: underline;\n  }\n"], ["\n  color: ", ";\n  display: flex;\n  cursor: pointer;\n  align-self: center;\n\n  :hover {\n    text-decoration: underline;\n  }\n"])), theme.palette.newGreyScales[400]);
var $Close = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject$1(["\n  font-size: 0.9em;\n  margin-right: 10px;\n  align-self: center;\n"], ["\n  font-size: 0.9em;\n  margin-right: 10px;\n  align-self: center;\n"])));
var $Container = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject$1(["\n  margin-top: 50px;\n  margin-bottom: 100px;\n"], ["\n  margin-top: 50px;\n  margin-bottom: 100px;\n"])));
var templateObject_1$1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

var createSvgIcon_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _extends2 = interopRequireDefault(_extends_1);

var _react = interopRequireDefault(React);

var _SvgIcon = interopRequireDefault(require$$2);

function createSvgIcon(path, displayName) {
  var Component = _react.default.memo(_react.default.forwardRef(function (props, ref) {
    return _react.default.createElement(_SvgIcon.default, (0, _extends2.default)({
      ref: ref
    }, props), path);
  }));

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = "".concat(displayName, "Icon");
  }

  Component.muiName = _SvgIcon.default.muiName;
  return Component;
}
});

var Close = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), 'Close');

exports.default = _default;
});

var CloseIcon = /*@__PURE__*/getDefaultExportFromCjs(Close);

var AmpStoriesRounded = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M16 4H8c-.55 0-1 .45-1 1v13c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM4 6c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1zM20 6c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1z"
}), 'AmpStoriesRounded');

exports.default = _default;
});

var AmpStoriesRoundedIcon = /*@__PURE__*/getDefaultExportFromCjs(AmpStoriesRounded);

var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
var __rest$1 = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var Overlay = function (_a) {
    var children = _a.children, showLogo = _a.showLogo, noTopBg = _a.noTopBg, blankLogo = _a.blankLogo, title = _a.title, onClose = _a.onClose, rest = __rest$1(_a, ["children", "showLogo", "noTopBg", "blankLogo", "title", "onClose"]);
    return (React.createElement($Overlay, __assign$1({ className: "overlay" }, rest),
        React.createElement($Nav, { className: (showLogo ? 'spaced' : '') + " " + (noTopBg ? 'transparent' : '') },
            React.createElement($LogoContainer, null, showLogo && (React.createElement(React.Fragment, null,
                React.createElement($Logo, { className: "" + (blankLogo ? 'blank' : '') },
                    React.createElement(AmpStoriesRoundedIcon, { className: "big-logo" })),
                title))),
            React.createElement($Clickable, { onClick: function () { return onClose(); } },
                React.createElement($Close, null, "close"),
                React.createElement(CloseIcon, null))),
        React.createElement($Container, null, children)));
};

export { Button, HelloWorld, Overlay };
//# sourceMappingURL=index.es.js.map
