"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.HashRouter = exports.Route = exports.Switch = void 0;
var Switch_1 = require("./Switch");
Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return __importDefault(Switch_1).default; } });
var Route_1 = require("./Route");
Object.defineProperty(exports, "Route", { enumerable: true, get: function () { return __importDefault(Route_1).default; } });
var HashRouter_1 = require("./HashRouter");
Object.defineProperty(exports, "HashRouter", { enumerable: true, get: function () { return __importDefault(HashRouter_1).default; } });
var HashRouter_2 = require("./HashRouter");
Object.defineProperty(exports, "Router", { enumerable: true, get: function () { return __importDefault(HashRouter_2).default; } });
