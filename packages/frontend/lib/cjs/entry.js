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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var errorHandler_1 = __importDefault(require("./components/errorHandler"));
var dynamicRoutes_1 = __importDefault(require("./components/dynamicRoutes"));
var Spinner_1 = __importDefault(require("./components/Spinner"));
var context_1 = __importDefault(require("./context"));
var CoreHandler = function (props) {
    var _a = props.modules, modules = _a === void 0 ? {} : _a, appBundleUrl = props.appBundleUrl, initializer = props.initializer, routePrefix = props.routePrefix, areAppsLoaded = props.areAppsLoaded, navigationLoaded = props.navigationLoaded, dynamicLibraries = props.dynamicLibraries, extraInformation = props.extraInformation, onError = props.onError, Spinner = props.loadingComponent, Wrapper = props.wrapperComponent, rest = __rest(props, ["modules", "appBundleUrl", "initializer", "routePrefix", "areAppsLoaded", "navigationLoaded", "dynamicLibraries", "extraInformation", "onError", "loadingComponent", "wrapperComponent"]);
    //@ts-expect-error
    var _b = react_1.useContext(context_1.default), dispatch = _b.dispatch, appState = _b.appState;
    var setApps = function (apps) {
        dispatch({
            type: 'SET_APPS',
            apps: apps
        });
    };
    react_1.useEffect(function () {
        // Before we do anything... we are going to setup the context correctly.
        dispatch({
            type: "SET_ALL_DETAILS",
            information: {
                appBundleUrl: appBundleUrl,
                dynamicLibraries: dynamicLibraries,
                spinner: Spinner,
                onError: onError,
                extraInformation: extraInformation
            }
        });
        if (initializer && typeof initializer === 'function') {
            initializer(function (providedApps) { return getRoutes(setApps(providedApps)); });
        }
        else {
            throw Error("Please provide an initializer, that takes 1 argument. As described in the docs.");
        }
    }, []);
    var getRoutes = function (apps) { return (apps !== null && apps !== void 0 ? apps : []).map(function (app) { return (__assign(__assign({}, app), { routeURL: app.appName.replace(/\s/g, ''), appName: app.appName })); }); };
    return appState.areAppsLoaded && navigationLoaded ? (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(errorHandler_1.default, null,
            react_1.default.createElement(dynamicRoutes_1.default, { prefix: routePrefix, routes: appState.apps, module: modules })))) : react_1.default.createElement(Spinner, null);
};
CoreHandler.defaultProps = {
    appListMethod: "GET",
    appListBody: {},
    appListHeaders: {},
    appListCallback: function () { },
    appLink: "",
    disableAppCheck: false,
    initializer: function (saveApps) { },
    routePrefix: 'dashboard',
    wrapperComponent: react_1.default.Fragment,
    loadingComponent: Spinner_1.default
};
CoreHandler.propTypes = {
    /** Incase you want sideload an application, rather than request it */
    modules: prop_types_1.default.shape({
        /** The name of the application */
        name: prop_types_1.default.string.isRequired,
        /** The actual application code */
        module: prop_types_1.default.any
    }),
    /** Endpoint to use, to get app bundle */
    appBundleUrl: prop_types_1.default.string.isRequired,
    /** A function that will be called, to let you handle the initiation process yourself. You will be provided with a callback to kick off the different steps */
    initializer: prop_types_1.default.func,
    /** Route prefix to use on all micro-applications. (It is best to use the same starting route as the orchestrator. eg. 'dashboard') */
    routePrefix: prop_types_1.default.string,
    /** Context vale of, navigationLoaded. This is used so we can hold off loading the apps until the navigation bar is completely rendered. */
    navigationLoaded: prop_types_1.default.bool.isRequired,
    /** Component to be shown whilst a micro-application is loading */
    loadingComponent: prop_types_1.default.node.isRequired,
    /** Wrapper component for putting the apps inside. Either use this, or provide a child */
    wrapperComponent: prop_types_1.default.node,
    /** Extra Information to be provided to all micro-applications */
    extraInformation: prop_types_1.default.shape({}),
    /** Dynamic import libraries */
    dynamicLibraries: prop_types_1.default.func,
    /** Error handler for failed package bundle */
    onError: prop_types_1.default.func
};
exports.default = CoreHandler;
