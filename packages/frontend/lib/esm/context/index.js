import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import CoreReducer from '../reducer';
import Spinner from '../components/Spinner';
var CoreContext = createContext(null);
export var initialState = {
    apps: [],
    areAppsLoaded: false,
    appBundleUrl: '',
    spinner: Spinner,
    dynamicLibraries: function () { return null; },
    onError: function () { },
    extraInformation: {}
};
function CoreProvider(props) {
    var _a = useReducer(CoreReducer, initialState), appState = _a[0], dispatch = _a[1];
    return (
    // @ts-expect-error
    React.createElement(CoreContext.Provider, { value: { appState: appState, dispatch: dispatch } }, props.children));
}
;
CoreProvider.propTypes = {
    /** The children elements that should have access to this context. */
    children: PropTypes.node,
};
export { CoreContext as default, CoreProvider };
