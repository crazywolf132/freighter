import pathToRegexp from 'path-to-regexp';
import Options from './OptionsInterface';

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path, options) {
	// console.log('start of compilePath');
	const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
	const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

	if (pathCache[path]) return pathCache[path];

	const keys = [];
	const regexp = pathToRegexp(path, keys, options);
	const result = {regexp, keys};

	if (cacheCount < cacheLimit) {
		pathCache[path] = result;
		cacheCount++;
	}
	// console.log('end of compilePath');

	return result;
}

function matchPath(pathname, options: Options) {
	// console.log('start of matchPath');
	if (typeof options === 'string' || Array.isArray(options)) {
		options = {path: options};
	}

	const {path, exact = false, strict = false, sensitive = false} = options;

	// @ts-expect-error
	const paths = [].concat(path);
	// console.log('after concat');

	return paths.reduce((matched, path) => {
		// console.log('inside the reduce');
		if (!path && path !== '') return null;
		if (matched) return matched;

		const {regexp, keys} = compilePath(path, {
			end: exact,
			strict,
			sensitive,
		});
		// console.log('compiled path');

		const match = regexp.exec(pathname);
		// console.log('after match :::', match);

		if (!match) return null;

		const [url, ...values] = match;
		const isExact = pathname === url;

		// console.log('after the declarations');

		if (exact && !isExact) return null;

		return {
			path, // the path used to match
			url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
			isExact,
			params: keys.reduce((memo, key, index) => {
				memo[key.name] = values[index];
				return memo;
			}, {}),
		};
	}, null);

	// console.log('end of matchPath');
}

export default matchPath;
