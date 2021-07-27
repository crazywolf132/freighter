export declare const useStack: () => ((latestEntry: any) => void)[];
export declare const reset: () => void;
export declare const useLazyLoaderState: () => ({
    loadingApp: null;
    isLoading: boolean;
    cache: null;
} | (({ loadingApp, isLoading, cache }: {
    loadingApp: any;
    isLoading: any;
    cache: any;
}) => void))[];
