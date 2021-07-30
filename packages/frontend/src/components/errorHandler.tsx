// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';

class ErrorHandlerContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			info: null
		}
	}

	componentDidCatch(error, info) {
		this.setState({
			hasError: true,
			error,
			info
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<h1>An error occurred in this component....</h1>
					<h4>{String(this.state.error)}</h4>
					<span>{this.state.info}</span>
				</>
			)
		}

		return this.props.children;
	}
}

export default ErrorHandlerContainer;

ErrorHandlerContainer.propTypes = {
	children: PropTypes.node.isRequired
}