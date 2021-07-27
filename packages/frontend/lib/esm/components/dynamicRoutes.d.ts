/// <reference types="react" />
import PropTypes from 'prop-types';
declare function DynamicRoutes(props: any): JSX.Element;
declare namespace DynamicRoutes {
    var propTypes: {
        /** All the known routes. */
        routes: PropTypes.Requireable<PropTypes.InferProps<{
            length: PropTypes.Validator<(...args: any[]) => any>;
            map: PropTypes.Validator<(...args: any[]) => any>;
        }>>;
        /** Pre-rendered micro-application */
        module: PropTypes.Validator<string>;
        /** Extra information you would like to provide to the micro-application */
        routeStates: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        /** Prefix of the route for each micro-application */
        prefix: PropTypes.Validator<string>;
    };
}
export default DynamicRoutes;
