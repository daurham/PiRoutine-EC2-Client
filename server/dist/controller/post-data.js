"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.URL || `http://localhost:${process.env.PORT || 3000}`;
// POST
exports.default = {
    disarmRecord: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.post(`${URL}/post-disarm-record`, req.body);
            res.sendStatus(201);
        }
        catch (err) {
            console.warn('Issue posting disarm record: ', err);
            res.sendStatus(500);
        }
    })),
};
