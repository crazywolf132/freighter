// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import PropTypes from 'prop-types';
var ErrorHandlerContainer = /** @class */ (function (_super) {
    __extends(ErrorHandlerContainer, _super);
    function ErrorHandlerContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hasError: false,
            error: null,
            info: null
        };
        return _this;
    }
    ErrorHandlerContainer.prototype.componentDidCatch = function (error, info) {
        this.setState({
            hasError: true,
            error: error,
            info: info
        });
        console.log({ error: error, info: info, wasError: true });
    };
    ErrorHandlerContainer.prototype.render = function () {
        if (this.state.hasError) {
            return (React.createElement(React.Fragment, null,
                React.createElement("h1", null, "An error occurred in this component...."),
                React.createElement("h4", null, String(this.state.error)),
                React.createElement("span", null, this.state.info)));
        }
        return this.props.children;
    };
    return ErrorHandlerContainer;
}(React.Component));
export default ErrorHandlerContainer;
ErrorHandlerContainer.propTypes = {
    children: PropTypes.node.isRequired
};
