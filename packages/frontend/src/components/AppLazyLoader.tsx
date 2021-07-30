// @ts-nocheck

import React, { useContext, useEffect, useState } from 'react';
import { reset, useLazyLoaderState, useStack } from '../utils/LazyLoaderUtils';
import dynamicImport from '../utils/DynamicImport';
import CoreContext from '../context';
import axios from 'axios';
import MySpinner from '../components/Spinner'

// Use to prevent state updates on unmounted component
// eslint-disable-next-line
const [lazyLoaderState, setLazyLoaderState] = useLazyLoaderState();
// eslint-disable-next-line
const [pushStack, popStack, isStackEmpty] = useStack();

function AppLazyLoader(props) {
	const [app, setApp] = useState({
		name: null,
		element: null,
	});

	const {
		module,
		urlDomain,
		history,
		onError,
		preRendered,
	} = props;

	const { appState: { appBundleUrl, onError, Spinner, dynamicLibraries, extraInformation } } = useContext(CoreContext);

	const lazyLoadModule = (
		appName,
		urlDomain_,
		history_,
	) => {

		setLazyLoaderState({
			loadingApp: appName,
			isLoading: true,
		});

		if (preRendered == null) {
			axios(`${appBundleUrl}${appName}`).then(({ data }) => {
				if (lazyLoaderState.loadingApp === appName) {
					const module = dynamicImport(data, dynamicLibraries);
					const element = React.isValidElement(module)
						? module
						: React.createElement(module, {
							urlDomain: urlDomain_,
							history: history_,
							...extraInformation
						});
					setLazyLoaderState({
						isLoading: false,
						cache: module,
					});
					setApp({ name: appName, element });
				}
			}).catch(error => {
				if (lazyLoaderState.loadingApp === appName) {
					reset();
					if (onError) onError(error);
				}
			})
		} else {
			// We already have this page's data... so lets use it.
			const module = dynamicImport(preRendered, dynamicLibraries);
			const element = React.isValidElement(module)
				? module
				: React.createElement(module, {
					urlDomain: urlDomain_,
					history: history_,
					...extraInformation
				});
			setLazyLoaderState({
				isLoading: false,
				cache: module,
			});
			setApp({ name: appName, element });
		}
	};

	useEffect(() => {
		const { loadingApp, isLoading, cache } = lazyLoaderState;
		if (isLoading) {
			if (loadingApp !== module) {
				lazyLoadModule(
					module,
					urlDomain,
					history
				);
			}
		} else if (loadingApp === null || loadingApp !== module) {
			lazyLoadModule(
				module,
				urlDomain,
				history
			);
		} else {
			setTimeout(() => {
				setApp({
					element: React.createElement(cache, {
						urlDomain,
						history,
					}),
				});
			}, 100);
		}
	}, []);

	if (app.element !== null) {
		return app.element;
	}
	return React.isValidElement(Spinner) ? React.createElement(Spinner) : <MySpinner />;
}

export default AppLazyLoader;
