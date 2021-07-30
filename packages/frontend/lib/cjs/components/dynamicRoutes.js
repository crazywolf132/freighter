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
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var Router = __importStar(require("@freighter/router"));
var AppLazyLoader_1 = __importDefault(require("./AppLazyLoader"));
function DynamicRoutes(props) {
    var routes = props.routes, module = props.module, prefix = props.prefix;
    function renderRoutes() {
        if (routes && routes.length > 0) {
            return routes.map(function (_a) {
                var appName = _a.appName, preferences = _a.preferences;
                return (react_1.default.createElement(Router.Route, { key: "/" + prefix + "/" + appName, path: "/" + prefix + "/" + appName, render: function (props) { return (react_1.default.createElement(AppLazyLoader_1.default, { preRendered: appName === (module === null || module === void 0 ? void 0 : module.name) ? module.module : null, history: props.history, module: appName, urlDomain: "/" + prefix + "/" + appName })); } }));
            });
        }
    }
    return (react_1.default.createElement(Router.Router, null,
        react_1.default.createElement(Router.Switch, null, routes && renderRoutes())));
}
exports.default = DynamicRoutes;
DynamicRoutes.propTypes = {
    /** All the known routes. */
    routes: prop_types_1.default.shape({
        length: prop_types_1.default.func.isRequired,
        map: prop_types_1.default.func.isRequired,
    }),
    /** Pre-rendered micro-application */
    module: prop_types_1.default.string.isRequired,
    /** Extra information you would like to provide to the micro-application */
    routeStates: prop_types_1.default.shape({}),
    /** Prefix of the route for each micro-application */
    prefix: prop_types_1.default.string.isRequired
};
