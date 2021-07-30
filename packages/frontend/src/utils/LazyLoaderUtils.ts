// Custom non React hook
const initialState = {
	loadingApp: null,
	isLoading: false,
	cache: null,
};

const lazyLoaderState = { ...initialState };
const userStack = [];

const setLazyLoaderState = ({ loadingApp, isLoading, cache }) => {
	if (loadingApp !== undefined) lazyLoaderState.loadingApp = loadingApp;
	if (isLoading !== undefined) lazyLoaderState.isLoading = isLoading;
	if (cache !== undefined) lazyLoaderState.cache = cache;
};

const popStack = () => {
	const latestEntry = userStack.pop();
	userStack.length = 0;
	return latestEntry;
};

const pushStack = latestEntry => {
	// @ts-expect-error
	userStack.push(latestEntry);
};

const isStackEmpty = () => {
	return userStack.length < 1;
};

export const useStack = () => [pushStack, popStack, isStackEmpty];
export const reset = () => setLazyLoaderState(initialState);
export const useLazyLoaderState = () => [lazyLoaderState, setLazyLoaderState];
