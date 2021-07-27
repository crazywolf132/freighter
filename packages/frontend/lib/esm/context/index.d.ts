import React from 'react';
import PropTypes from 'prop-types';
declare const CoreContext: React.Context<null>;
export declare const initialState: {
    apps: never[];
    areAppsLoaded: boolean;
    appBundleUrl: string;
    spinner: JSX.Element;
    dynamicLibraries: () => void;
};
declare function CoreProvider(props: any): JSX.Element;
declare namespace CoreProvider {
    var propTypes: {
        /** The children elements that should have access to this context. */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
}
export { CoreContext as default, CoreProvider };
