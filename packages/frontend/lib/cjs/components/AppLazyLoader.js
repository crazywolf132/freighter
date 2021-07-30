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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var LazyLoaderUtils_1 = require("../utils/LazyLoaderUtils");
var DynamicImport_1 = __importDefault(require("../utils/DynamicImport"));
var context_1 = __importDefault(require("../context"));
var axios_1 = __importDefault(require("axios"));
var Spinner_1 = __importDefault(require("../components/Spinner"));
// Use to prevent state updates on unmounted component
// eslint-disable-next-line
var _a = LazyLoaderUtils_1.useLazyLoaderState(), lazyLoaderState = _a[0], setLazyLoaderState = _a[1];
// eslint-disable-next-line
var _b = LazyLoaderUtils_1.useStack(), pushStack = _b[0], popStack = _b[1], isStackEmpty = _b[2];
function AppLazyLoader(props) {
    var _a = react_1.useState({
        name: null,
        element: null,
    }), app = _a[0], setApp = _a[1];
    var module = props.module, urlDomain = props.urlDomain, history = props.history, onError = props.onError, preRendered = props.preRendered;
    var _b = react_1.useContext(context_1.default).appState, appBundleUrl = _b.appBundleUrl, onError = _b.onError, Spinner = _b.Spinner, dynamicLibraries = _b.dynamicLibraries, extraInformation = _b.extraInformation;
    var lazyLoadModule = function (appName, urlDomain_, history_) {
        setLazyLoaderState({
            loadingApp: appName,
            isLoading: true,
        });
        if (preRendered == null) {
            axios_1.default("" + appBundleUrl + appName).then(function (_a) {
                var data = _a.data;
                if (lazyLoaderState.loadingApp === appName) {
                    var module_1 = DynamicImport_1.default(data, dynamicLibraries);
                    var element = react_1.default.isValidElement(module_1)
                        ? module_1
                        : react_1.default.createElement(module_1, __assign({ urlDomain: urlDomain_, history: history_ }, extraInformation));
                    setLazyLoaderState({
                        isLoading: false,
                        cache: module_1,
                    });
                    setApp({ name: appName, element: element });
                }
            }).catch(function (error) {
                if (lazyLoaderState.loadingApp === appName) {
                    LazyLoaderUtils_1.reset();
                    if (onError)
                        onError(error);
                }
            });
        }
        else {
            // We already have this page's data... so lets use it.
            var module_2 = DynamicImport_1.default(preRendered, dynamicLibraries);
            var element = react_1.default.isValidElement(module_2)
                ? module_2
                : react_1.default.createElement(module_2, __assign({ urlDomain: urlDomain_, history: history_ }, extraInformation));
            setLazyLoaderState({
                isLoading: false,
                cache: module_2,
            });
            setApp({ name: appName, element: element });
        }
    };
    react_1.useEffect(function () {
        var loadingApp = lazyLoaderState.loadingApp, isLoading = lazyLoaderState.isLoading, cache = lazyLoaderState.cache;
        if (isLoading) {
            if (loadingApp !== module) {
                lazyLoadModule(module, urlDomain, history);
            }
        }
        else if (loadingApp === null || loadingApp !== module) {
            lazyLoadModule(module, urlDomain, history);
        }
        else {
            setTimeout(function () {
                setApp({
                    element: react_1.default.createElement(cache, {
                        urlDomain: urlDomain,
                        history: history,
                    }),
                });
            }, 100);
        }
    }, []);
    if (app.element !== null) {
        return app.element;
    }
    return react_1.default.isValidElement(Spinner) ? react_1.default.createElement(Spinner) : react_1.default.createElement(Spinner_1.default, null);
}
exports.default = AppLazyLoader;
