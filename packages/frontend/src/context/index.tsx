import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import CoreReducer from '../reducer';

const CoreContext = createContext(null);

export const initialState = {
	apps: [],
	areAppsLoaded: false,
	appBundleUrl: '',
	spinner: <h1>Loading...</h1>,
	dynamicLibraries: () => {},
};

function CoreProvider (props) {
	const [appState, dispatch] = useReducer(CoreReducer, initialState);

	return (
		// @ts-expect-error
		<CoreContext.Provider value={{ appState, dispatch }}>
			{props.children}
		</CoreContext.Provider>
	);
};

CoreProvider.propTypes = {
	/** The children elements that should have access to this context. */
	children: PropTypes.node,
};

export { CoreContext as default, CoreProvider };
