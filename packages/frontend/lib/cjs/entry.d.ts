import React from "react";
import PropTypes from 'prop-types';
declare const CoreHandler: {
    (props: any): JSX.Element;
    defaultProps: {
        appListMethod: string;
        appListBody: {};
        appListHeaders: {};
        appListCallback: () => void;
        appLink: string;
        disableAppCheck: boolean;
        selfHandleInitiation: (getSessionApps: any, getRoutes: any) => void;
        routePrefix: string;
        wrapperComponent: React.ExoticComponent<{
            children?: React.ReactNode;
        }>;
        loadingComponent: JSX.Element;
    };
    propTypes: {
        /** Incase you want sideload an application, rather than request it */
        modules: PropTypes.Requireable<PropTypes.InferProps<{
            /** The name of the application */
            name: PropTypes.Validator<string>;
            /** The actual application code */
            module: PropTypes.Requireable<any>;
        }>>;
        /** Link to the endpoint where we will get a list of all the available apps */
        appLink: PropTypes.Requireable<string>;
        /** List of applications for the UI */
        appList: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
        /** Endpoint to use, to get app bundle */
        appBundleUrl: PropTypes.Validator<string>;
        /** Disables manual check for apps, incase you prefer to hand them to us */
        disableAppCheck: PropTypes.Requireable<boolean>;
        /** App List callback, incase you would like to set the appList into a context or something */
        appListCallback: PropTypes.Requireable<(...args: any[]) => any>;
        /** Addition headers to be sent when performing an App list fetch */
        appListHeaders: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        /** Additional body to be sent when performing an App list fetch */
        appListBody: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        /** Network request type, for fetching an App List */
        appListMethod: PropTypes.Requireable<string>;
        /** Lets the system know if you are using an auth system */
        usingAuth: PropTypes.Requireable<boolean>;
        /** Callback to check see if the user is valid */
        isValidCheck: PropTypes.Requireable<(...args: any[]) => any>;
        /** Callback for when the user is not valid */
        invalidUserCallback: PropTypes.Requireable<(...args: any[]) => any>;
        /** A function that will be called, to let you handle the initiation process yourself. You will be provided with a callback to kick off the different steps */
        selfHandleInitiation: PropTypes.Requireable<(...args: any[]) => any>;
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
    };
};
export default CoreHandler;
