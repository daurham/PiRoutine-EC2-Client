"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.update = exports.get = void 0;
const get_data_1 = __importDefault(require("./get-data"));
exports.get = get_data_1.default;
const update_data_1 = __importDefault(require("./update-data"));
exports.update = update_data_1.default;
const post_data_1 = __importDefault(require("./post-data"));
exports.post = post_data_1.default;
