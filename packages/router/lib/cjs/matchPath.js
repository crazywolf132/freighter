"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_to_regexp_1 = __importDefault(require("path-to-regexp"));
var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;
function compilePath(path, options) {
    // console.log('start of compilePath');
    var cacheKey = "" + options.end + options.strict + options.sensitive;
    var pathCache = cache[cacheKey] || (cache[cacheKey] = {});
    if (pathCache[path])
        return pathCache[path];
    var keys = [];
    var regexp = path_to_regexp_1.default(path, keys, options);
    var result = { regexp: regexp, keys: keys };
    if (cacheCount < cacheLimit) {
        pathCache[path] = result;
        cacheCount++;
    }
    // console.log('end of compilePath');
    return result;
}
function matchPath(pathname, options) {
    // console.log('start of matchPath');
    if (typeof options === 'string' || Array.isArray(options)) {
        options = { path: options };
    }
    var path = options.path, _a = options.exact, exact = _a === void 0 ? false : _a, _b = options.strict, strict = _b === void 0 ? false : _b, _c = options.sensitive, sensitive = _c === void 0 ? false : _c;
    // @ts-expect-error
    var paths = [].concat(path);
    // console.log('after concat');
    return paths.reduce(function (matched, path) {
        // console.log('inside the reduce');
        if (!path && path !== '')
            return null;
        if (matched)
            return matched;
        var _a = compilePath(path, {
            end: exact,
            strict: strict,
            sensitive: sensitive,
        }), regexp = _a.regexp, keys = _a.keys;
        // console.log('compiled path');
        var match = regexp.exec(pathname);
        // console.log('after match :::', match);
        if (!match)
            return null;
        var url = match[0], values = match.slice(1);
        var isExact = pathname === url;
        // console.log('after the declarations');
        if (exact && !isExact)
            return null;
        return {
            path: path,
            url: path === '/' && url === '' ? '/' : url,
            isExact: isExact,
            params: keys.reduce(function (memo, key, index) {
                memo[key.name] = values[index];
                return memo;
            }, {}),
        };
    }, null);
    // console.log('end of matchPath');
}
exports.default = matchPath;
