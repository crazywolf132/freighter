import React from "react";
import PropTypes from 'prop-types';
import * as Router from '@freighter/router';
import AppLazyLoader from './AppLazyLoader';
export default function DynamicRoutes(props) {
    var routes = props.routes, module = props.module, prefix = props.prefix;
    function renderRoutes() {
        if (routes && routes.length > 0) {
            return routes.map(function (_a) {
                var appName = _a.appName, preferences = _a.preferences;
                return (React.createElement(Router.Route, { key: "/" + prefix + "/" + appName, path: "/" + prefix + "/" + appName, render: function (props) { return (React.createElement(AppLazyLoader, { preRendered: appName === (module === null || module === void 0 ? void 0 : module.name) ? module.module : null, history: props.history, module: appName, urlDomain: "/" + prefix + "/" + appName })); } }));
            });
        }
    }
    return (React.createElement(Router.Router, null,
        React.createElement(Router.Switch, null, routes && renderRoutes())));
}
DynamicRoutes.propTypes = {
    /** All the known routes. */
    routes: PropTypes.shape({
        length: PropTypes.func.isRequired,
        map: PropTypes.func.isRequired,
    }),
    /** Pre-rendered micro-application */
    module: PropTypes.string.isRequired,
    /** Extra information you would like to provide to the micro-application */
    routeStates: PropTypes.shape({}),
    /** Prefix of the route for each micro-application */
    prefix: PropTypes.string.isRequired
};
