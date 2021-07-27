// @ts-nocheck

import React from 'react';
import {useRouter} from 'next/router';
import matchPath from './matchPath';

export default (props) => {
	const router = useRouter();

	const handleChildren = () => {
		const location = props.children;

		const actualLocation = String(`${router.asPath}/`).replace(
			props.baseURL,
			''
		);

		let element; let match;

		// We use React.Children.forEach instead of React.Children.toArray().find()
		// here because toArray adds keys to all child elements and we do not want
		// to trigger an unmount/remount for two <Route>s that render the same
		// component at different URLs.
		React.Children.forEach(props.children, (child) => {
			if (match == null && React.isValidElement(child)) {
				element = child;

				const path = child.props.path || child.props.from;

				match = path
					? matchPath(actualLocation, {...child.props, path})
					: null;
			}
		});

		return match
			? React.cloneElement(element, {location, computedMatch: match})
			: null;
	};

	return handleChildren();
};
