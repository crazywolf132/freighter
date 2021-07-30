import React from "react";
import PropTypes from 'prop-types';
import Spinner from './components/Spinner';
declare const CoreHandler: {
    (props: any): JSX.Element;
    defaultProps: {
        appListMethod: string;
        appListBody: {};
        appListHeaders: {};
        appListCallback: () => void;
        appLink: string;
        disableAppCheck: boolean;
        initializer: (saveApps: any) => void;
        routePrefix: string;
        wrapperComponent: React.ExoticComponent<{
            children?: React.ReactNode;
        }>;
        loadingComponent: typeof Spinner;
    };
    propTypes: {
        /** Incase you want sideload an application, rather than request it */
        modules: PropTypes.Requireable<PropTypes.InferProps<{
            /** The name of the application */
            name: PropTypes.Validator<string>;
            /** The actual application code */
            module: PropTypes.Requireable<any>;
        }>>;
        /** Endpoint to use, to get app bundle */
        appBundleUrl: PropTypes.Validator<string>;
        /** A function that will be called, to let you handle the initiation process yourself. You will be provided with a callback to kick off the different steps */
        initializer: PropTypes.Requireable<(...args: any[]) => any>;
        /** Route prefix to use on all micro-applications. (It is best to use the same starting route as the orchestrator. eg. 'dashboard') */
        routePrefix: PropTypes.Requireable<string>;
        /** Context vale of, navigationLoaded. This is used so we can hold off loading the apps until the navigation bar is completely rendered. */
        navigationLoaded: PropTypes.Validator<boolean>;
        /** Component to be shown whilst a micro-application is loading */
        loadingComponent: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        /** Wrapper component for putting the apps inside. Either use this, or provide a child */
        wrapperComponent: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /** Extra Information to be provided to all micro-applications */
        extraInformation: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        /** Dynamic import libraries */
        dynamicLibraries: PropTypes.Requireable<(...args: any[]) => any>;
        /** Error handler for failed package bundle */
        onError: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export default CoreHandler;
