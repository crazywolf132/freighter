export declare function gzip(sourcePath: string, destPath: string): Promise<unknown>;
export declare function untar(file: string, cwd: string): any;
export declare function getPackageJson(dirPath: string, property: string): Promise<unknown>;
export declare function rm(filepath: string): Promise<unknown>;
export declare function mkdir(dirPath: string): Promise<unknown>;
export declare function rmdir(dirPath: string): Promise<unknown>;
