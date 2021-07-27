// @ts-nocheck
import React, {useContext, useEffect, useState} from 'react';
import CoreContext from '../context';
import { reset, useLazyLoaderState, useStack} from '../utils/LazyLoaderUtils.js';
import dynamicImport from '../utils/DynamicImport';
import axios from 'axios';

const [lazyLoaderState, setLazyLoaderState] = useLazyLoaderState();

function AppLazyLoader(props) {
	const {
		module,
		urlDomain,
		onError,
		preRendered,
		extraInfo
	} = props;

	const [app, setApp] = useState({
		name: null,
		element: null
	});

	const {appState: {appBundleUrl, Spinner, dynamicLibraries}} = useContext(CoreContext);

	const lazyLoadModule = async (
		appName,
		urlDomain_,
		history_,
		extraInfo_
	) => {
		setLazyLoaderState({
			loadingApp: appName,
			isLoading: true
		});

		if (preRendered == null) {
			axios.get(`${appBundleUrl}/${appName}`).then(({data}) => {
				if (lazyLoaderState.loadingApp === appName) {
					const module = dynamicImport(data, dynamicLibraries);
					const element = React.isValidElement(module) ? module : React.createElement(module, { urlDomain: urlDomain_, history: history_, ...extraInfo_});
					setLazyLoaderState({
						isLoading: false,
						cache: module
					});
					// @ts-expect-error
					setApp({name: appName, element});
				}
			}).catch(error => {
				if (lazyLoaderState.loadingApp === appName) {
					reset();
					if (onError) onError();
				}
			})
		} else {
			// We already have this page's data... so lets use it.
			const module = dynamicImport(preRendered, dynamicLibraries);
			const element = React.isValidElement(module) ? module : React.createElement(module, { urlDomain: urlDomain_, history: history_, ...extraInfo_});
			setLazyLoaderState({ isLoading: false, cache: module });
			// @ts-expect-error
			setApp({name: appName, element});
		}
	}

	useEffect(() => {
		const {loadingApp, isLoading, cache} = lazyLoaderState;
		if (isLoading) {
			if (loadingApp !== module) {
				lazyLoadModule(module, urlDomain, history, extraInfo);
			}
		} else if (loadingApp === null || loadingApp !== module) {
			lazyLoadModule(
				module, urlDomain, history, extraInfo
			);
		} else {
			setTimeout(() => {
				// @ts-expect-error
				setApp({ element: React.createElement(cache, {
						urlDomain,
						history,
						...extraInfo
					})
				});
			}, 100);
		}
	}, []);

	if (app.element !== null) {
		return app.element;
	}

	return <Spinner />;

}

export default AppLazyLoader;