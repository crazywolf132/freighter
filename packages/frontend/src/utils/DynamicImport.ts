import externalRequire from './externalRequire.js';

const requireHandler = (providedLibrary: any) => (module: string) => {
	const internal = externalRequire(module);
	if (internal) return internal;

	// We are here... so it must not have found anything...
	// We are just going to return the result of the provided one...
	return providedLibrary(module);
}

const dynamicImport = (bundle, dynamicLibraries) => {
	const importer = Function('exports', 'module', 'require', bundle);
	const module = {};
	importer({}, module, requireHandler(dynamicLibraries));
	// @ts-expect-error
	return 'default' in module?.exports ? module?.exports?.default : module.exports;
}

export default dynamicImport;