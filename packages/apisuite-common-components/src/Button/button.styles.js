var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { theme } from '../theme';
export var $Button = styled(Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &.MuiButton-contained {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  :disabled {\n    &.MuiButton-contained.Mui-disabled {\n      background-color: ", ";\n      cursor: default;\n      opacity: 0.6;\n      boxshadow: '0 2px 5px 0 rgba(0,0,0,0.05) !important';\n    }\n  }\n\n  :hover {\n    &.MuiButton-contained {\n      boxshadow: '0 4px 6px 0 rgba(0,0,0,0.35) !important';\n      background-color: ", ";\n    }\n  }\n"], ["\n  &.MuiButton-contained {\n    background-color: ",
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
//# sourceMappingURL=button.styles.js.map