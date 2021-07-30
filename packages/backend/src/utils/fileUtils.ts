import fs from 'fs-extra';
import tar from 'tar';
import zlib from 'zlib';
import rimraf from 'rimraf';


export function gzip(sourcePath: string, destPath: string) {
	return new Promise((resolve, reject) => {
		fs.createReadStream(sourcePath)
			.on('error', (err) => reject(err))
			.pipe(zlib.createGzip({ level: 9 }))
			.on('error', (err) => reject(err))
			.pipe(fs.createWriteStream(destPath))
			.on('error', (err) => reject(err))
			.on('finish', () => resolve(null));
	});
}

export function untar(file: string, cwd: string) {
	return tar.x({ file, cwd });
}

export function getPackageJson(dirPath: string, property: string) {
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
}

export function rm(filepath: string) {
	return new Promise((resolve, reject) => {
		fs.unlink(filepath, (err) => {
			if (err) {
				reject(err);
			}
			resolve(null);
		});
	});
}

export function mkdir(dirPath: string) {
	return new Promise((resolve) => {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}
		resolve(null);
	});
}

export function rmdir(dirPath: string) {
	return new Promise((resolve, reject) => {
		rimraf(dirPath, (err) => {
			if (err) {
				reject(err);
			}
			resolve(null);
		});
	});
}
