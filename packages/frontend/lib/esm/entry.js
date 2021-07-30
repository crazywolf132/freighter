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
import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import ErrorHandlerContainer from "./components/errorHandler";
import DynamicRoutes from "./components/dynamicRoutes";
import Spinner from './components/Spinner';
import CoreContext from './context';
var CoreHandler = function (props) {
    var _a = props.modules, modules = _a === void 0 ? {} : _a, appBundleUrl = props.appBundleUrl, initializer = props.initializer, routePrefix = props.routePrefix, areAppsLoaded = props.areAppsLoaded, navigationLoaded = props.navigationLoaded, dynamicLibraries = props.dynamicLibraries, extraInformation = props.extraInformation, onError = props.onError, Spinner = props.loadingComponent, Wrapper = props.wrapperComponent, rest = __rest(props, ["modules", "appBundleUrl", "initializer", "routePrefix", "areAppsLoaded", "navigationLoaded", "dynamicLibraries", "extraInformation", "onError", "loadingComponent", "wrapperComponent"]);
    //@ts-expect-error
    var _b = useContext(CoreContext), dispatch = _b.dispatch, appState = _b.appState;
    var setApps = function (apps) {
        dispatch({
            type: 'SET_APPS',
            apps: apps
        });
    };
    useEffect(function () {
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
    return appState.areAppsLoaded && navigationLoaded ? (React.createElement(Wrapper, null,
        React.createElement(ErrorHandlerContainer, null,
            React.createElement(DynamicRoutes, { prefix: routePrefix, routes: appState.apps, module: modules })))) : React.createElement(Spinner, null);
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
    wrapperComponent: React.Fragment,
    loadingComponent: Spinner
};
CoreHandler.propTypes = {
    /** Incase you want sideload an application, rather than request it */
    modules: PropTypes.shape({
        /** The name of the application */
        name: PropTypes.string.isRequired,
        /** The actual application code */
        module: PropTypes.any
    }),
    /** Endpoint to use, to get app bundle */
    appBundleUrl: PropTypes.string.isRequired,
    /** A function that will be called, to let you handle the initiation process yourself. You will be provided with a callback to kick off the different steps */
    initializer: PropTypes.func,
    /** Route prefix to use on all micro-applications. (It is best to use the same starting route as the orchestrator. eg. 'dashboard') */
    routePrefix: PropTypes.string,
    /** Context vale of, navigationLoaded. This is used so we can hold off loading the apps until the navigation bar is completely rendered. */
    navigationLoaded: PropTypes.bool.isRequired,
    /** Component to be shown whilst a micro-application is loading */
    loadingComponent: PropTypes.node.isRequired,
    /** Wrapper component for putting the apps inside. Either use this, or provide a child */
    wrapperComponent: PropTypes.node,
    /** Extra Information to be provided to all micro-applications */
    extraInformation: PropTypes.shape({}),
    /** Dynamic import libraries */
    dynamicLibraries: PropTypes.func,
    /** Error handler for failed package bundle */
    onError: PropTypes.func
};
export default CoreHandler;
