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
// Custom non React hook
var initialState = {
    loadingApp: null,
    isLoading: false,
    cache: null,
};
var lazyLoaderState = __assign({}, initialState);
var userStack = [];
var setLazyLoaderState = function (_a) {
    var loadingApp = _a.loadingApp, isLoading = _a.isLoading, cache = _a.cache;
    if (loadingApp !== undefined)
        lazyLoaderState.loadingApp = loadingApp;
    if (isLoading !== undefined)
        lazyLoaderState.isLoading = isLoading;
    if (cache !== undefined)
        lazyLoaderState.cache = cache;
};
var popStack = function () {
    var latestEntry = userStack.pop();
    userStack.length = 0;
    return latestEntry;
};
var pushStack = function (latestEntry) {
    // @ts-expect-error
    userStack.push(latestEntry);
};
var isStackEmpty = function () {
    return userStack.length < 1;
};
export var useStack = function () { return [pushStack, popStack, isStackEmpty]; };
export var reset = function () { return setLazyLoaderState(initialState); };
export var useLazyLoaderState = function () { return [lazyLoaderState, setLazyLoaderState]; };
