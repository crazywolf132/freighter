const fs = require('fs-extra');
const tar = require('tar');
const zlib = require('zlib');
const rimraf = require('rimraf');

const fileUtils = {
	gzip(sourcePath: string, destPath: string) {
		return new Promise((resolve, reject) => {
			fs.createReadStream(sourcePath)
				.on('error', (err) => reject(err))
				.pipe(zlib.createGzip({ level: 9 }))
				.on('error', (err) => reject(err))
				.pipe(fs.createWriteStream(destPath))
				.on('error', (err) => reject(err))
				.on('finish', () => resolve(null));
		});
	},
	untar(file: string, cwd: string) {
		return tar.x({ file, cwd });
	},
	getPackageJson(dirPath: string, property: string) {
		return new Promise((resolve, reject) => {
			fs.readFile(
				`${dirPath}/package.json`,
				{ encoding: 'utf8' },
				(err, data) => {
					if (err) {
						reject(err);
					}
					resolve(JSON.parse(data)[property]);
				}
			);
		});
	},
	rm(filepath: string) {
		return new Promise((resolve, reject) => {
			fs.unlink(filepath, (err) => {
				if (err) {
					reject(err);
				}
				resolve(null);
			});
		});
	},
	mkdir(dirPath: string) {
		return new Promise((resolve) => {
			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath, { recursive: true });
			}
			resolve(null);
		});
	},
	rmdir(dirPath: string) {
		return new Promise((resolve, reject) => {
			rimraf(dirPath, (err) => {
				if (err) {
					reject(err);
				}
				resolve(null);
			});
		});
	},
};

module.exports = fileUtils;
