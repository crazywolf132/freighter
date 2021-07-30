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
import React, { useContext, useEffect, useState } from 'react';
import { reset, useLazyLoaderState, useStack } from '../utils/LazyLoaderUtils';
import dynamicImport from '../utils/DynamicImport';
import CoreContext from '../context';
import axios from 'axios';
import MySpinner from '../components/Spinner';
// Use to prevent state updates on unmounted component
// eslint-disable-next-line
var _a = useLazyLoaderState(), lazyLoaderState = _a[0], setLazyLoaderState = _a[1];
// eslint-disable-next-line
var _b = useStack(), pushStack = _b[0], popStack = _b[1], isStackEmpty = _b[2];
function AppLazyLoader(props) {
    var _a = useState({
        name: null,
        element: null,
    }), app = _a[0], setApp = _a[1];
    var module = props.module, urlDomain = props.urlDomain, history = props.history, onError = props.onError, preRendered = props.preRendered;
    var _b = useContext(CoreContext).appState, appBundleUrl = _b.appBundleUrl, onError = _b.onError, Spinner = _b.Spinner, dynamicLibraries = _b.dynamicLibraries, extraInformation = _b.extraInformation;
    var lazyLoadModule = function (appName, urlDomain_, history_) {
        setLazyLoaderState({
            loadingApp: appName,
            isLoading: true,
        });
        if (preRendered == null) {
            axios("" + appBundleUrl + appName).then(function (_a) {
                var data = _a.data;
                if (lazyLoaderState.loadingApp === appName) {
                    var module_1 = dynamicImport(data, dynamicLibraries);
                    var element = React.isValidElement(module_1)
                        ? module_1
                        : React.createElement(module_1, __assign({ urlDomain: urlDomain_, history: history_ }, extraInformation));
                    setLazyLoaderState({
                        isLoading: false,
                        cache: module_1,
                    });
                    setApp({ name: appName, element: element });
                }
            }).catch(function (error) {
                if (lazyLoaderState.loadingApp === appName) {
                    reset();
                    if (onError)
                        onError(error);
                }
            });
        }
        else {
            // We already have this page's data... so lets use it.
            var module_2 = dynamicImport(preRendered, dynamicLibraries);
            var element = React.isValidElement(module_2)
                ? module_2
                : React.createElement(module_2, __assign({ urlDomain: urlDomain_, history: history_ }, extraInformation));
            setLazyLoaderState({
                isLoading: false,
                cache: module_2,
            });
            setApp({ name: appName, element: element });
        }
    };
    useEffect(function () {
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
                    element: React.createElement(cache, {
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
    return React.isValidElement(Spinner) ? React.createElement(Spinner) : React.createElement(MySpinner, null);
}
export default AppLazyLoader;
