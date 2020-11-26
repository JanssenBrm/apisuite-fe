var __assign = (this && this.__assign) || function () {
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
var __rest = (this && this.__rest) || function (s, e) {
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
import React from 'react';
import { $Overlay, $Nav, $Logo, $LogoContainer, $Clickable, $Close, $Container, } from './overlay.styles';
import CloseIcon from '@material-ui/icons/Close';
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded';
var Overlay = function (_a) {
    var children = _a.children, showLogo = _a.showLogo, noTopBg = _a.noTopBg, blankLogo = _a.blankLogo, title = _a.title, onClose = _a.onClose, rest = __rest(_a, ["children", "showLogo", "noTopBg", "blankLogo", "title", "onClose"]);
    return (React.createElement($Overlay, __assign({ className: "overlay" }, rest),
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
export default Overlay;
//# sourceMappingURL=overlay.js.map