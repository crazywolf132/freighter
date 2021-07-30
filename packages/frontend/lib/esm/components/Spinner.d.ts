/// <reference types="react" />
import PropTypes from 'prop-types';
declare function LoadingComponent(props: any): JSX.Element;
declare namespace LoadingComponent {
    var defaultProps: {
        color: string;
        style: {};
        height: number;
        width: number;
    };
    var propTypes: {
        /** Specifies the default color for the spinner */
        color: PropTypes.Requireable<string>;
    };
}
export default LoadingComponent;
