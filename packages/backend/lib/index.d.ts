import Options from './interfaces/options';
import ApplicationInformation from './interfaces/applicationInformation';
declare function uninstallApplication(name: string, options: Options): Promise<unknown>;
declare function installApplication(name: string, info: ApplicationInformation, options: Options): Promise<unknown>;
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
declare function getApplication(name: string, db: any, options: Options): Promise<unknown>;
export { getApplication as default, installApplication, uninstallApplication };
