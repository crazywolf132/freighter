"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uninstallApplication = exports.installApplication = exports.default = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const process_1 = __importDefault(require("process"));
const fileUtils = __importStar(require("./utils/fileUtils"));
function uninstallApplication(name, options) {
    return new Promise(async (resolve, reject) => {
        const company = `@${String(options.company).replace('@', '')}`; // Replacing the first @ incase there is a duplicate
        // Path to the applications folder, or whatever they choose to call it.
        const CWD = `${options.path}/${options.applicationFolderName ?? 'applications'}/`;
        // Directory of the applications and company name.
        const rootDir = `${CWD}/${company}`;
        // Directory of the app
        const appDir = `${rootDir}/${name}`;
        try {
            // Checking to see if `applications` even exists...
            if (!fs_extra_1.default.existsSync(CWD)) {
                resolve('finished');
            }
            // Checking to see if `@auto-it` even exists...
            if (!fs_extra_1.default.existsSync(rootDir)) {
                resolve('finished');
            }
            // Checking to see if the app dir exists...
            if (!fs_extra_1.default.existsSync(appDir)) {
                resolve('finished');
            }
            else {
                // It does exist... so lets delete it.
                await fileUtils.rmdir(appDir);
                resolve('finished');
            }
        }
        catch (e) {
            // Something bad happened, we will let the other people handle it 😂
            reject(e);
        }
    });
}
exports.uninstallApplication = uninstallApplication;
function installApplication(name, info, options) {
    // Regardless of if the app exists... if this function was called, it was because
    // we want to install a new version of the application. So we will remove any pre-existing
    // evidence of the application and start fresh every time.
    return new Promise(async (resolve, reject) => {
        const company = `@${String(options.company).replace('@', '')}`; // Replacing the first @ incase there is a duplicate
        // Creating zip name, as we will use this when we download the file.
        const filename = `${name}-${info.version}.tgz`;
        const fileURL = `${options.repository}/${company}%2f${name}/-/${filename}`;
        const CWD = `${options.path}/${options.applicationFolderName ?? 'applications'}/`;
        const downloadDir = `${CWD}/${company}`;
        try {
            // Creating the readstream of the file.
            const response = await axios_1.default.get(fileURL, {
                responseType: 'stream',
            });
            // Making the core folder structure if it doesn't exist.
            if (!fs_extra_1.default.existsSync(CWD)) {
                fs_extra_1.default.mkdirSync(CWD);
            }
            // Creating the company folder, if it doesn't exist
            if (!fs_extra_1.default.existsSync(downloadDir)) {
                fs_extra_1.default.mkdirSync(downloadDir);
            }
            // Creating the download path, of where we are going to put the downloaded zip file.
            const tarFilepath = `${downloadDir}/${filename}`;
            // Creating a write stream to that new location
            const writeStream = fs_extra_1.default.createWriteStream(tarFilepath);
            // Saving the actual file from the network request.
            response.data.pipe(writeStream).on('finish', async () => {
                try {
                    const destDir = `${downloadDir}/${name}`;
                    // Removing the old application folder, incase it exists...
                    // We do this because we have a new version
                    await fileUtils.rmdir(destDir);
                    // Unzipping the new created file, into the newly created directory
                    await fileUtils.untar(tarFilepath, CWD);
                    // Renaming the unzipped package
                    fs_extra_1.default.renameSync(`${CWD}/package`, destDir);
                    // Now getting the new package.json from the application
                    const mainFilepath = await fileUtils.getPackageJson(destDir, 'main');
                    // Creating a path to the main file
                    const appFilepath = `${destDir}/${mainFilepath}`;
                    const gZipAppFilepath = `${appFilepath}.gz`;
                    // We are checking if the file exists before we create a gzip version of the main file
                    if (!fs_extra_1.default.existsSync(gZipAppFilepath)) {
                        // Creating a gzip version of the mainfile. As this is what we send in production mode.
                        await fileUtils.gzip(appFilepath, gZipAppFilepath);
                    }
                    // Just doing a bit of cleanup, and removing the old tarfile, from when we downloaded it.
                    await fileUtils.rm(tarFilepath);
                    resolve('Installed');
                }
                catch (err) {
                    reject(err);
                }
            }).on('error', (err) => {
                reject(err);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.installApplication = installApplication;
/**
 * The application handler plays the most important part of this entire project. It serves the applications to the UI.
 *
 * This is how it works.
 *
 * 1. Checks to see if we are in DEV mode. If not, GOTO 4.
 * 2. Checks to see if the `name` is a known dependency... if it is, we know it is installed via npm-link. If not, GOTO 4.
 * 3. Serves dependency version.
 * 4. Check if the application has a physical path inside `CWD/applications`, if it does GOTO 5. Else GOTO 6.
 * 5. Serve local copy
 * 6. Check if MONGO knows of this application. If it exists, GOTO 7. Else GOTO 10
 * 7. Get latest version of application.
 * 8. Make a local copy of the application, after we have received it.
 * 9. Serve application
 * 10. Tell the user that application doesn't exist.
 *
 * @param {String} name
 * @param {Object} db
 * @param {Options} options
 * @param {Function} callback
 */
function getApplication(name, db, options) {
    return new Promise(async (resolve, reject) => {
        const notProduction = process_1.default.env.NODE_ENV !== 'production';
        const company = `@${String(options.company).replace('@', '')}`; // We replace it if it exists, because we are adding it anyways.
        // ONLY IN DEVELOPMENT MODE, DO WE NOT USE .GZ FILES
        if (notProduction) {
            // We are going to check to see if the application is listed as a dependency...
            const applicationModulesPath = path_1.default.resolve(options.path ?? process_1.default.cwd(), `./node_modules/${company}/${name}`);
            if (fs_extra_1.default.pathExistsSync(applicationModulesPath)) {
                // This means that the requested application does actually exist...
                // We are now getting the package.json from the application, so we can workout what the main file is called.
                const mainFile = await fileUtils.getPackageJson(applicationModulesPath, 'main');
                // Creating a readStream for the pain file.
                var readStream = fs_extra_1.default.createReadStream(path_1.default.resolve(applicationModulesPath, `${mainFile}`));
                // Sending back the readStream in the resolve
                // We are also letting the final person know that this is not a .gz encoding
                return resolve({ readStream, gz: false });
            }
        }
        // We are clearly not in development mode, or we simply could not find the application.
        const applicationPath = path_1.default.resolve(options.path ?? process_1.default.cwd(), `./${options.applicationFolderName ?? 'applications'}/${company}/${name}`);
        // Checking to see if the application is installed instead
        if (fs_extra_1.default.pathExistsSync(applicationPath)) {
            // The path exists... lets send its package.min.js file.
            // Getting the main file name....
            const mainFile = await fileUtils.getPackageJson(applicationPath, 'main');
            // Creating a readstream for the main file (.gz);
            var readStream = fs_extra_1.default.createReadStream(path_1.default.resolve(applicationPath, `${mainFile}.gz`));
            // Sending the readstream... but also letting them know that it is of .gz encoding.
            return resolve({ readStream, gz: true });
        }
        else {
            if (options.neverDownload) {
                return reject({ error: "Could not find application. Elected to not download." });
            }
            db.findOne({ appName: name }, (err, application) => {
                if (err) {
                    return reject({ error: err || "Could not find application, with `appName`: ", name });
                }
                else if (application) {
                    // We have the application, so we are going to get the version they are using...
                    // hoping that they have a `version` on the db object.
                    if (!application.hasOwnProperty("version")) {
                        return reject({ error: "No version on application document. Please ensure there is a valid version provided." });
                    }
                    installApplication(name, { version: application.version }, options).then(() => {
                        getApplication(name, db, options).then(result => resolve(result)).catch(err => reject(err));
                    }).catch((error) => reject({ error: error ?? "There was a problem installing the application" }));
                }
                else {
                    reject({ error: "Application 404" });
                }
            });
        }
    });
}
exports.default = getApplication;
