import fs from 'fs-extra';
import path from 'path';
import Axios from 'axios';
import Options from './interfaces/options';
import process from 'process';
import ApplicationInformation from './interfaces/applicationInformation';
import * as fileUtils from './utils/fileUtils'

function uninstallApplication(name: string, options: Options) {
	return new Promise(async (resolve, reject) => {
		const company = `@${String(options.company).replace('@', '')}`; // Replacing the first @ incase there is a duplicate
		// Path to the applications folder, or whatever they choose to call it.
		const CWD = `${options.path}/${options.applicationFolderName ?? 'applications'}/`

		// Directory of the applications and company name.
		const rootDir = `${CWD}/${company}`
		// Directory of the app
		const appDir = `${rootDir}/${name}`;

		try {
			// Checking to see if `applications` even exists...
			if (!fs.existsSync(CWD)) {
				resolve('finished');
			}

			// Checking to see if `@auto-it` even exists...
			if (!fs.existsSync(rootDir)) {
				resolve('finished');
			}

			// Checking to see if the app dir exists...
			if (!fs.existsSync(appDir)) {
				resolve('finished');
			} else {
				// It does exist... so lets delete it.
				await fileUtils.rmdir(appDir);
				resolve('finished');
			}
		} catch (e) {
			// Something bad happened, we will let the other people handle it 😂
			reject(e);
		}
	})
}

function installApplication(name: string, info: ApplicationInformation, options: Options) {
	// Regardless of if the app exists... if this function was called, it was because
	// we want to install a new version of the application. So we will remove any pre-existing
	// evidence of the application and start fresh every time.
	return new Promise(async (resolve, reject) => {
		const company = `@${String(options.company).replace('@', '')}`; // Replacing the first @ incase there is a duplicate
		// Creating zip name, as we will use this when we download the file.
		const filename = `${name}-${info.version}.tgz`;
		const fileURL = `${options.repository}/${company}%2f${name}/-/${filename}`;
		const CWD = `${options.path}/${options.applicationFolderName ?? 'applications'}/`
		const downloadDir = `${CWD}/${company}`

		try {

			// Creating the readstream of the file.
			const response = await Axios.get(fileURL, {
				responseType: 'stream',
			});

			// Making the core folder structure if it doesn't exist.
			if (!fs.existsSync(CWD)) {
				fs.mkdirSync(CWD);
			}

			// Creating the company folder, if it doesn't exist
			if (!fs.existsSync(downloadDir)) {
				fs.mkdirSync(downloadDir);
			}

			// Creating the download path, of where we are going to put the downloaded zip file.
			const tarFilepath = `${downloadDir}/${filename}`;
			// Creating a write stream to that new location
			const writeStream = fs.createWriteStream(tarFilepath);

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
					fs.renameSync(`${CWD}/package`, destDir);

					// Now getting the new package.json from the application
					const mainFilepath = await fileUtils.getPackageJson(
						destDir,
						'main'
					);

					// Creating a path to the main file
					const appFilepath = `${destDir}/${mainFilepath}`;
					const gZipAppFilepath = `${appFilepath}.gz`;

					// We are checking if the file exists before we create a gzip version of the main file
					if (!fs.existsSync(gZipAppFilepath)) {
						// Creating a gzip version of the mainfile. As this is what we send in production mode.
						await fileUtils.gzip(appFilepath, gZipAppFilepath);
					}

					// Just doing a bit of cleanup, and removing the old tarfile, from when we downloaded it.
					await fileUtils.rm(tarFilepath);

					resolve('Installed');
				} catch (err) {
					reject(err);
				}
			}).on('error', (err) => {
				reject(err);
			})
		} catch (err) {
			reject(err);
		}
	});
}

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
function getApplication(name: string, db: any, options: Options) {
	return new Promise(async (resolve, reject) => {
		const notProduction = process.env.NODE_ENV !== 'production';

		const company = `@${String(options.company).replace('@', '')}`; // We replace it if it exists, because we are adding it anyways.

		// ONLY IN DEVELOPMENT MODE, DO WE NOT USE .GZ FILES
		if (notProduction) {
			// We are going to check to see if the application is listed as a dependency...
			const applicationModulesPath: string = path.resolve(
				options.path ?? process.cwd(),
				`./node_modules/${company}/${name}`
			);

			if (fs.pathExistsSync(applicationModulesPath)) {
				// This means that the requested application does actually exist...

				// We are now getting the package.json from the application, so we can workout what the main file is called.
				const mainFile = await fileUtils.getPackageJson(
					applicationModulesPath,
					'main'
				);

				// Creating a readStream for the pain file.
				var readStream = fs.createReadStream(
					path.resolve(applicationModulesPath, `${mainFile}`)
				);

				// Sending back the readStream in the resolve
				// We are also letting the final person know that this is not a .gz encoding
				return resolve({ readStream, gz: false });
			}
		}

		// We are clearly not in development mode, or we simply could not find the application.

		const applicationPath: string = path.resolve(
			options.path ?? process.cwd(),
			`./${options.applicationFolderName ?? 'applications'}/${company}/${name}`
		);

		// Checking to see if the application is installed instead
		if (fs.pathExistsSync(applicationPath)) {
			// The path exists... lets send its package.min.js file.

			// Getting the main file name....
			const mainFile = await fileUtils.getPackageJson(
				applicationPath,
				'main'
			);

			// Creating a readstream for the main file (.gz);
			var readStream = fs.createReadStream(
				path.resolve(applicationPath, `${mainFile}.gz`)
			);

			// Sending the readstream... but also letting them know that it is of .gz encoding.
			return resolve({ readStream, gz: true });
		} else {
			if (options.neverDownload) {
				return reject({ error: "Could not find application. Elected to not download." })
			}

			db.findOne({ appName: name }, (err, application) => {
				if (err) {
					return reject({ error: err || "Could not find application, with `appName`: ", name });
				} else if (application) {
					// We have the application, so we are going to get the version they are using...
					// hoping that they have a `version` on the db object.
					if (!application.hasOwnProperty("version")) {
						return reject({ error: "No version on application document. Please ensure there is a valid version provided." });
					}

					installApplication(name, { version: application.version }, options).then(() => {
						getApplication(name, db, options).then(result => resolve(result)).catch(err => reject(err))
					}).catch((error) => reject({ error: error ?? "There was a problem installing the application" }))
				} else {
					reject({ error: "Application 404" });
				}
			})
		}

	})

}

export { getApplication as default, installApplication, uninstallApplication };