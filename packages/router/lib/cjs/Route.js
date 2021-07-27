"use strict";
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
function isEmptyChildren(children) {
    return react_1.default.Children.count(children) === 0;
}
exports.default = (function (props) {
    var router = router_1.useRouter();
    var routerFuncs = __assign({}, router);
    var RouteChildren = function () {
        var _a;
        var location = props.location;
        var match = props.computedMatch
            ? props.computedMatch // <Switch> already computed the match for us
            : props.path
                ? matchPath_1.default((_a = location.pathname) !== null && _a !== void 0 ? _a : '', props)
                : null;
        var localProps = {
            location: location,
            match: match,
            history: __assign(__assign({}, routerFuncs), { 
                // We are forcefully overriding the default method, so we can append the `/dashboard` part of the URL
                // without changing the entire codebase.
                push: function (data, useDashboard) {
                    if (useDashboard === void 0) { useDashboard = true; }
                    if (typeof data === 'string') {
                        // We will check to make sure it doesn't already have the '/dashboard' part.
                        data = useDashboard
                            ? "" + (data.startsWith('/dashboard')
                                ? ''
                                : '/dashboard') + data
                            : data;
                    }
                    else {
                        data.pathname = "" + (useDashboard
                            ? data.pathname.startsWith('/dashboard')
                                ? ""
                                : "/dashboard"
                            : "") + data.pathname;
                    }
                    router.push(data);
                } }),
        };
        var children = props.children, component = props.component, render = props.render;
        // React uses an empty array as children by
        // default, so use null if that's the case.
        if (Array.isArray(children) && isEmptyChildren(children)) {
            children = null;
        }
        return localProps.match
            ? children
                ? typeof children === 'function'
                    ? children(localProps)
                    : children
                : component
                    ? react_1.default.createElement(component, localProps)
                    : render
                        ? render(localProps)
                        : null
            : typeof children === 'function'
                ? children(localProps)
                : null;
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, RouteChildren()));
});
