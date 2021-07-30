import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import Animation from './animation';

function LoadingComponent(props) {
	const {style, height, width} = props;

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: Animation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div
			style={{
				...style,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Lottie options={defaultOptions} height={height} width={width} />
		</div>
	);
}

LoadingComponent.defaultProps = {
	color: "#1C1D21",
	style: {},
	height: 50,
	width: 50,
};
LoadingComponent.propTypes = {
	/** Specifies the default color for the spinner */
	color: PropTypes.string,
	/** Additional styles */
};

export default LoadingComponent;
