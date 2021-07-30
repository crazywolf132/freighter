"use strict";
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
exports.CoreProvider = exports.default = exports.initialState = void 0;
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var reducer_1 = __importDefault(require("../reducer"));
var Spinner_1 = __importDefault(require("../components/Spinner"));
var CoreContext = react_1.createContext(null);
exports.default = CoreContext;
exports.initialState = {
    apps: [],
    areAppsLoaded: false,
    appBundleUrl: '',
    spinner: Spinner_1.default,
    dynamicLibraries: function () { return null; },
    onError: function () { },
    extraInformation: {}
};
function CoreProvider(props) {
    var _a = react_1.useReducer(reducer_1.default, exports.initialState), appState = _a[0], dispatch = _a[1];
    return (
    // @ts-expect-error
    react_1.default.createElement(CoreContext.Provider, { value: { appState: appState, dispatch: dispatch } }, props.children));
}
exports.CoreProvider = CoreProvider;
;
CoreProvider.propTypes = {
    /** The children elements that should have access to this context. */
    children: prop_types_1.default.node,
};
