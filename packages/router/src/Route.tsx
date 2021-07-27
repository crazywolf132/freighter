import React from 'react';
import {useRouter} from 'next/router';

import matchPath from './matchPath';

function isEmptyChildren(children) {
	return React.Children.count(children) === 0;
}

export default (props) => {
	const router = useRouter();
	const routerFuncs = {...router};

	const RouteChildren = () => {
		const {location} = props;

		const match = props.computedMatch
			? props.computedMatch // <Switch> already computed the match for us
			: props.path
			? matchPath(location.pathname ?? '', props)
			: null;

		const localProps = {
			location,
			match,
			history: {
				...routerFuncs,
				// We are forcefully overriding the default method, so we can append the `/dashboard` part of the URL
				// without changing the entire codebase.
				push: (data, useDashboard = true) => {
					if (typeof data === 'string') {
						// We will check to make sure it doesn't already have the '/dashboard' part.
						data = useDashboard
							? `${
									data.startsWith('/dashboard')
										? ''
										: '/dashboard'
							  }${data}`
							: data;
					} else {
						data.pathname = `${
							useDashboard
								? data.pathname.startsWith('/dashboard')
									? ``
									: `/dashboard`
								: ``
						}${data.pathname}`;
					}

					router.push(data);
				},
			},
		};

		let {children, component, render} = props;

		// React uses an empty array as children by
		// default, so use null if that's the case.
		if (Array.isArray(children) && isEmptyChildren(children)) {
			children = null;
		}

		return localProps.match
			? children
				? typeof children === 'function'
					? children(localProps)
					: children
				: component
				? React.createElement(component, localProps)
				: render
				? render(localProps)
				: null
			: typeof children === 'function'
			? children(localProps)
			: null;
	};

	return (<>{RouteChildren()}</>);
};
