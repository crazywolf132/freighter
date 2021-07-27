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
import React from 'react';
import { useRouter } from 'next/router';
import matchPath from './matchPath';
export default (function (props) {
    var router = useRouter();
    var handleChildren = function () {
        var location = props.children;
        var actualLocation = String(router.asPath + "/").replace(props.baseURL, '');
        var element;
        var match;
        // We use React.Children.forEach instead of React.Children.toArray().find()
        // here because toArray adds keys to all child elements and we do not want
        // to trigger an unmount/remount for two <Route>s that render the same
        // component at different URLs.
        React.Children.forEach(props.children, function (child) {
            if (match == null && React.isValidElement(child)) {
                element = child;
                var path = child.props.path || child.props.from;
                match = path
                    ? matchPath(actualLocation, __assign(__assign({}, child.props), { path: path }))
                    : null;
            }
        });
        return match
            ? React.cloneElement(element, { location: location, computedMatch: match })
            : null;
    };
    return handleChildren();
});
