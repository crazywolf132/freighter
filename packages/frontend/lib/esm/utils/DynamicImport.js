import externalRequire from './externalRequire.js';
var requireHandler = function (providedLibrary) { return function (module) {
    var internal = externalRequire(module);
    if (internal)
        return internal;
    // We are here... so it must not have found anything...
    // We are just going to return the result of the provided one...
    return providedLibrary(module);
}; };
var dynamicImport = function (bundle, dynamicLibraries) {
    var _a;
    var importer = Function('exports', 'module', 'require', bundle);
    var module = {};
    importer({}, module, requireHandler(dynamicLibraries));
    // @ts-expect-error
    return 'default' in (module === null || module === void 0 ? void 0 : module.exports) ? (_a = module === null || module === void 0 ? void 0 : module.exports) === null || _a === void 0 ? void 0 : _a.default : module.exports;
};
export default dynamicImport;
