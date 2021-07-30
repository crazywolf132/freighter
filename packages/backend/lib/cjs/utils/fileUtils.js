"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmdir = exports.mkdir = exports.rm = exports.getPackageJson = exports.untar = exports.gzip = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const tar_1 = __importDefault(require("tar"));
const zlib_1 = __importDefault(require("zlib"));
const rimraf_1 = __importDefault(require("rimraf"));
function gzip(sourcePath, destPath) {
    return new Promise((resolve, reject) => {
        fs_extra_1.default.createReadStream(sourcePath)
            .on('error', (err) => reject(err))
            .pipe(zlib_1.default.createGzip({ level: 9 }))
            .on('error', (err) => reject(err))
            .pipe(fs_extra_1.default.createWriteStream(destPath))
            .on('error', (err) => reject(err))
            .on('finish', () => resolve(null));
    });
}
exports.gzip = gzip;
function untar(file, cwd) {
    return tar_1.default.x({ file, cwd });
}
exports.untar = untar;
function getPackageJson(dirPath, property) {
    return new Promise((resolve, reject) => {
        fs_extra_1.default.readFile(`${dirPath}/package.json`, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data)[property]);
        });
    });
}
exports.getPackageJson = getPackageJson;
function rm(filepath) {
    return new Promise((resolve, reject) => {
        fs_extra_1.default.unlink(filepath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(null);
        });
    });
}
exports.rm = rm;
function mkdir(dirPath) {
    return new Promise((resolve) => {
        if (!fs_extra_1.default.existsSync(dirPath)) {
            fs_extra_1.default.mkdirSync(dirPath, { recursive: true });
        }
        resolve(null);
    });
}
exports.mkdir = mkdir;
function rmdir(dirPath) {
    return new Promise((resolve, reject) => {
        rimraf_1.default(dirPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(null);
        });
    });
}
exports.rmdir = rmdir;
