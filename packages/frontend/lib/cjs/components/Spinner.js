"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_lottie_1 = __importDefault(require("react-lottie"));
var animation_1 = __importDefault(require("./animation"));
function LoadingComponent(props) {
    var style = props.style, height = props.height, width = props.width;
    var defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation_1.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (react_1.default.createElement("div", { style: __assign(__assign({}, style), { display: 'flex', alignItems: 'center', justifyContent: 'center' }) },
        react_1.default.createElement(react_lottie_1.default, { options: defaultOptions, height: height, width: width })));
}
LoadingComponent.defaultProps = {
    color: "#1C1D21",
    style: {},
    height: 50,
    width: 50,
};
LoadingComponent.propTypes = {
    /** Specifies the default color for the spinner */
    color: prop_types_1.default.string,
    /** Additional styles */
};
exports.default = LoadingComponent;
