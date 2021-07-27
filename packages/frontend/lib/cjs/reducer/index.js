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
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context");
var coreReducer = function (state, action) {
    switch (action.type) {
        case 'SET_APPS':
            return __assign(__assign({}, state), { apps: action.apps, areAppsLoaded: true });
        case 'SET_ALL_DETAILS':
            return __assign(__assign({}, state), action.information);
        case 'SET_APPBUNDLE_URL':
            return __assign(__assign({}, state), { appBundleUrl: action.appBundleUrl });
        case 'RESET':
            return __assign(__assign({}, state), context_1.initialState);
        default:
            throw new Error();
    }
};
exports.default = coreReducer;
