"use strict";
// @ts-nocheck
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var router_1 = require("next/router");
var matchPath_1 = __importDefault(require("./matchPath"));
exports.default = (function (props) {
    var router = router_1.useRouter();
    var handleChildren = function () {
        var location = props.children;
        var actualLocation = String(router.asPath + "/").replace(props.baseURL, '');
        var element;
        var match;
        // We use React.Children.forEach instead of React.Children.toArray().find()
        // here because toArray adds keys to all child elements and we do not want
        // to trigger an unmount/remount for two <Route>s that render the same
        // component at different URLs.
        react_1.default.Children.forEach(props.children, function (child) {
            if (match == null && react_1.default.isValidElement(child)) {
                element = child;
                var path = child.props.path || child.props.from;
                match = path
                    ? matchPath_1.default(actualLocation, __assign(__assign({}, child.props), { path: path }))
                    : null;
            }
        });
        return match
            ? react_1.default.cloneElement(element, { location: location, computedMatch: match })
            : null;
    };
    return handleChildren();
});
