var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import Animation from './animation';
function LoadingComponent(props) {
    var style = props.style, height = props.height, width = props.width;
    var defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (React.createElement("div", { style: __assign(__assign({}, style), { display: 'flex', alignItems: 'center', justifyContent: 'center' }) },
        React.createElement(Lottie, { options: defaultOptions, height: height, width: width })));
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
