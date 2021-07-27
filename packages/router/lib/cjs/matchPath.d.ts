import Options from './OptionsInterface';
declare function matchPath(pathname: any, options: Options): {
    path: never;
    url: any;
    isExact: boolean;
    params: any;
} | null;
export default matchPath;
