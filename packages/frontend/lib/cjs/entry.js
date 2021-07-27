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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var axios_1 = __importDefault(require("axios"));
var prop_types_1 = __importDefault(require("prop-types"));
var errorHandler_1 = __importDefault(require("./components/errorHandler"));
var dynamicRoutes_1 = __importDefault(require("./components/dynamicRoutes"));
var context_1 = __importDefault(require("./context"));
var CoreHandler = function (props) {
    var _a = props.modules, modules = _a === void 0 ? {} : _a, appLink = props.appLink, appList = props.appList, appBundleUrl = props.appBundleUrl, disableAppCheck = props.disableAppCheck, appListCallback = props.appListCallback, appListHeaders = props.appListHeaders, appListBody = props.appListBody, appListMethod = props.appListMethod, usingAuth = props.usingAuth, isValidCheck = props.isValidCheck, invalidUserCallback = props.invalidUserCallback, selfHandleInitiation = props.selfHandleInitiation, routePrefix = props.routePrefix, areAppsLoaded = props.areAppsLoaded, navigationLoaded = props.navigationLoaded, dynamicLibraries = props.dynamicLibraries, extraInformation = props.extraInformation, Spinner = props.loadingComponent, Wrapper = props.wrapperComponent, rest = __rest(props, ["modules", "appLink", "appList", "appBundleUrl", "disableAppCheck", "appListCallback", "appListHeaders", "appListBody", "appListMethod", "usingAuth", "isValidCheck", "invalidUserCallback", "selfHandleInitiation", "routePrefix", "areAppsLoaded", "navigationLoaded", "dynamicLibraries", "extraInformation", "loadingComponent", "wrapperComponent"]);
    //@ts-expect-error
    var _b = react_1.useContext(context_1.default), dispatch = _b.dispatch, appState = _b.appState;
    var init = function () {
        getSessionApps();
    };
    var setApps = function (apps) {
        dispatch({
            type: 'SET_APPS',
            apps: apps
        });
    };
    var getSessionApps = function () { return __awaiter(void 0, void 0, void 0, function () {
        var results, apps, routes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (disableAppCheck)
                        return [2 /*return*/];
                    return [4 /*yield*/, axios_1.default.get(appLink, { headers: __assign({}, appListHeaders) })];
                case 1:
                    results = _a.sent();
                    apps = results.data;
                    routes = getRoutes(apps);
                    if (appListCallback)
                        appListCallback(routes);
                    setApps(routes);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        // Before we do anything... we are going to setup the context correctly.
        dispatch({
            type: "SET_ALL_DETAILS",
            information: {
                appBundleUrl: appBundleUrl,
                apps: appList,
                dynamicLibraries: dynamicLibraries,
                spinner: Spinner
            }
        });
        if (selfHandleInitiation && typeof selfHandleInitiation === 'function')
            return selfHandleInitiation(setApps);
        if (usingAuth && isValidCheck()) {
            init();
        }
        else if (usingAuth && !isValidCheck()) {
            return invalidUserCallback();
        }
        else {
            init();
        }
    }, []);
    var getRoutes = function (apps) { return apps.map(function (app) { return (__assign(__assign({}, app), { routeURL: app.appName.replace(/\s/g, ''), appName: app.appName })); }); };
    return appState.areAppsLoaded && navigationLoaded ? (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(errorHandler_1.default, null,
            react_1.default.createElement(dynamicRoutes_1.default, { prefix: routePrefix, routes: appState.apps, module: modules, routeStates: __assign({}, extraInformation) })))) : react_1.default.createElement(Spinner, null);
};
CoreHandler.defaultProps = {
    appListMethod: "GET",
    appListBody: {},
    appListHeaders: {},
    appListCallback: function () { },
    appLink: "",
    disableAppCheck: false,
    selfHandleInitiation: function (getSessionApps, getRoutes) { },
    routePrefix: 'dashboard',
    wrapperComponent: react_1.default.Fragment,
    loadingComponent: react_1.default.createElement("h1", null, "Loading...")
};
CoreHandler.propTypes = {
    /** Incase you want sideload an application, rather than request it */
    modules: prop_types_1.default.shape({
        /** The name of the application */
        name: prop_types_1.default.string.isRequired,
        /** The actual application code */
        module: prop_types_1.default.any
    }),
    /** Link to the endpoint where we will get a list of all the available apps */
    appLink: prop_types_1.default.string,
    /** List of applications for the UI */
    appList: prop_types_1.default.arrayOf(prop_types_1.default.shape({})),
    /** Endpoint to use, to get app bundle */
    appBundleUrl: prop_types_1.default.string.isRequired,
    /** Disables manual check for apps, incase you prefer to hand them to us */
    disableAppCheck: prop_types_1.default.bool,
    /** App List callback, incase you would like to set the appList into a context or something */
    appListCallback: prop_types_1.default.func,
    /** Addition headers to be sent when performing an App list fetch */
    appListHeaders: prop_types_1.default.shape({}),
    /** Additional body to be sent when performing an App list fetch */
    appListBody: prop_types_1.default.shape({}),
    /** Network request type, for fetching an App List */
    appListMethod: prop_types_1.default.string,
    /** Lets the system know if you are using an auth system */
    usingAuth: prop_types_1.default.bool,
    /** Callback to check see if the user is valid */
    isValidCheck: prop_types_1.default.func,
    /** Callback for when the user is not valid */
    invalidUserCallback: prop_types_1.default.func,
    /** A function that will be called, to let you handle the initiation process yourself. You will be provided with a callback to kick off the different steps */
    selfHandleInitiation: prop_types_1.default.func,
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
    dynamicLibraries: prop_types_1.default.func
};
exports.default = CoreHandler;
