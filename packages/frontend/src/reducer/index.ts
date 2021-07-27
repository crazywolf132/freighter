import { initialState } from '../context';

const coreReducer = (state, action) => {
	switch (action.type) {
		case 'SET_APPS':
			return { ...state, apps: action.apps, areAppsLoaded: true };
		case 'SET_ALL_DETAILS':
			return { ...state, ...action.information };
		case 'SET_APPBUNDLE_URL':
			return { ...state, appBundleUrl: action.appBundleUrl };
		case 'RESET':
			return { ...state, ...initialState };
		default:
			throw new Error();
	}
};

export default coreReducer;
