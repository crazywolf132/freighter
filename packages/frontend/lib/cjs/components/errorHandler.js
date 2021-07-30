"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
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
    };
    ErrorHandlerContainer.prototype.render = function () {
        if (this.state.hasError) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("h1", null, "An error occurred in this component...."),
                react_1.default.createElement("h4", null, String(this.state.error)),
                react_1.default.createElement("span", null, this.state.info)));
        }
        return this.props.children;
    };
    return ErrorHandlerContainer;
}(react_1.default.Component));
exports.default = ErrorHandlerContainer;
ErrorHandlerContainer.propTypes = {
    children: prop_types_1.default.node.isRequired
};
