import React, { useContext, useEffect } from "react";
import Axios from 'axios';
import PropTypes from 'prop-types';
import ErrorHandlerContainer from "./components/errorHandler";
import DynamicRoutes from "./components/dynamicRoutes";
import Spinner from './components/Spinner';
import CoreContext from './context';


const CoreHandler = (props: any) => {
	const { modules = {},
		appBundleUrl,
		initializer,
		routePrefix,
		areAppsLoaded,
		navigationLoaded,
		dynamicLibraries,
		extraInformation,
		onError,
		loadingComponent: Spinner, wrapperComponent: Wrapper, ...rest } = props;

	//@ts-expect-error
	const { dispatch, appState } = useContext(CoreContext);

	const setApps = (apps) => {
		dispatch({
			type: 'SET_APPS',
			apps
		})
	}

	useEffect(() => {
		// Before we do anything... we are going to setup the context correctly.
		dispatch({
			type: "SET_ALL_DETAILS",
			information: {
				appBundleUrl,
				dynamicLibraries,
				spinner: Spinner,
				onError,
				extraInformation
			}
		});

		if (initializer && typeof initializer === 'function') {
			initializer(providedApps => getRoutes(setApps(providedApps)));
		} else {
			throw Error("Please provide an initializer, that takes 1 argument. As described in the docs.")
		}

	}, []);

	const getRoutes = (apps) => (apps ?? []).map(app => ({ ...app, routeURL: app.appName.replace(/\s/g, ''), appName: app.appName }));

	return appState.areAppsLoaded && navigationLoaded ? (<Wrapper>
		<ErrorHandlerContainer>
			<DynamicRoutes prefix={routePrefix} routes={appState.apps} module={modules}/>
		</ErrorHandlerContainer>
	</Wrapper>) : <Spinner />
}

CoreHandler.defaultProps = {
	appListMethod: "GET",
	appListBody: {},
	appListHeaders: {},
	appListCallback: () => { },
	appLink: "",
	disableAppCheck: false,
	initializer: (saveApps) => { },
	routePrefix: 'dashboard',
	wrapperComponent: React.Fragment,
	loadingComponent: Spinner
}

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

}

export default CoreHandler