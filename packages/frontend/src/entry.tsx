import React, {useContext, useEffect} from "react";
import Axios from 'axios';
import PropTypes from 'prop-types';
import ErrorHandlerContainer from "./components/errorHandler";
import DynamicRoutes from "./components/dynamicRoutes";
import CoreContext from './context';

const CoreHandler = (props: any) => {
	const { modules = {},
			appLink,
			appList,
			appBundleUrl,
			disableAppCheck,
			appListCallback,
			appListHeaders,
			appListBody,
			appListMethod,
			usingAuth,
			isValidCheck,
			invalidUserCallback,
			selfHandleInitiation,
			routePrefix,
			areAppsLoaded,
			navigationLoaded,
			dynamicLibraries,
			extraInformation,
			loadingComponent: Spinner, wrapperComponent: Wrapper, ...rest} = props;

			//@ts-expect-error
	const {dispatch, appState} = useContext(CoreContext);

	const init = () => {
		getSessionApps();
	}

	const setApps = (apps) => {
		dispatch({
			type: 'SET_APPS',
			apps
		})
	}
		
	const getSessionApps = async () => {
		if (disableAppCheck) return

		const results = await Axios.get(appLink, {headers: {...appListHeaders}});

		const apps = results.data;

		const routes = getRoutes(apps);
		if (appListCallback) appListCallback(routes);
		setApps(routes);
	}

	useEffect(() => {
		// Before we do anything... we are going to setup the context correctly.
		dispatch({
			type: "SET_ALL_DETAILS",
			information: {
				appBundleUrl,
				apps: appList, // this is incase they provide the apps to us.
				dynamicLibraries,
				spinner: Spinner
			}
		})

		if (selfHandleInitiation && typeof selfHandleInitiation === 'function') return selfHandleInitiation(setApps);

		if (usingAuth && isValidCheck()) {
			init();
		} else if (usingAuth && !isValidCheck()) {
			return invalidUserCallback();
		} else {
			init();
		}
	}, []);

	const getRoutes = (apps) => apps.map(app => ({...app, routeURL: app.appName.replace(/\s/g, ''), appName: app.appName}));

	return appState.areAppsLoaded && navigationLoaded ? (<Wrapper>
		<ErrorHandlerContainer>
			<DynamicRoutes prefix={routePrefix} routes={appState.apps} module={modules} routeStates={{...extraInformation}} />
		</ErrorHandlerContainer>
	</Wrapper>) : <Spinner />
}

CoreHandler.defaultProps = {
	appListMethod: "GET",
	appListBody: {},
	appListHeaders: {},
	appListCallback: () => {},
	appLink: "",
	disableAppCheck: false,
	selfHandleInitiation: (getSessionApps, getRoutes) => {},
	routePrefix: 'dashboard',
	wrapperComponent: React.Fragment,
	loadingComponent: <h1>Loading...</h1>
}

CoreHandler.propTypes = {
	/** Incase you want sideload an application, rather than request it */
	modules: PropTypes.shape({
		/** The name of the application */
		name: PropTypes.string.isRequired,
		/** The actual application code */
		module: PropTypes.any
	}),
	/** Link to the endpoint where we will get a list of all the available apps */
	appLink: PropTypes.string,
	/** List of applications for the UI */
	appList: PropTypes.arrayOf(PropTypes.shape({})),
	/** Endpoint to use, to get app bundle */
	appBundleUrl: PropTypes.string.isRequired,
	/** Disables manual check for apps, incase you prefer to hand them to us */
	disableAppCheck: PropTypes.bool,
	/** App List callback, incase you would like to set the appList into a context or something */
	appListCallback: PropTypes.func,
	/** Addition headers to be sent when performing an App list fetch */
	appListHeaders: PropTypes.shape({}),
	/** Additional body to be sent when performing an App list fetch */
	appListBody: PropTypes.shape({}),
	/** Network request type, for fetching an App List */
	appListMethod: PropTypes.string,
	/** Lets the system know if you are using an auth system */
	usingAuth: PropTypes.bool,
	/** Callback to check see if the user is valid */
	isValidCheck: PropTypes.func,
	/** Callback for when the user is not valid */
	invalidUserCallback: PropTypes.func,
	/** A function that will be called, to let you handle the initiation process yourself. You will be provided with a callback to kick off the different steps */
	selfHandleInitiation: PropTypes.func,
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
	dynamicLibraries: PropTypes.func
	
}

export default CoreHandler