"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var externalRequire_js_1 = __importDefault(require("./externalRequire.js"));
var requireHandler = function (providedLibrary) { return function (module) {
    var internal = externalRequire_js_1.default(module);
    if (internal != null)
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
exports.default = dynamicImport;
