import React, { useContext } from "react";
import PropTypes from 'prop-types';
import * as Router from '@freighter/router';
import AppLazyLoader from './AppLazyLoader'

export default function DynamicRoutes(props) {
	const { routes, module, prefix } = props;


	function renderRoutes() {
		if (routes && routes.length > 0) {
			return routes.map(({ appName, preferences }) => {
				return (
					<Router.Route
						key={`/${prefix}/${appName}`}
						path={`/${prefix}/${appName}`}
						render={props => (
							<AppLazyLoader
								preRendered={appName === module?.name ? module.module : null}
								history={props.history}
								module={appName}
								urlDomain={`/${prefix}/${appName}`}
							/>
						)} />
				);
			})
		}
	}

	return (
		<Router.Router>
			<Router.Switch>{routes && renderRoutes()}</Router.Switch>
		</Router.Router>
	)
}

DynamicRoutes.propTypes = {
	/** All the known routes. */
	routes: PropTypes.shape({
		length: PropTypes.func.isRequired,
		map: PropTypes.func.isRequired,
	}),
	/** Pre-rendered micro-application */
	module: PropTypes.string.isRequired,
	/** Extra information you would like to provide to the micro-application */
	routeStates: PropTypes.shape({}),
	/** Prefix of the route for each micro-application */
	prefix: PropTypes.string.isRequired
}