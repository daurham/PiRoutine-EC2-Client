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
// PATCH
exports.default = {
    alarmTime: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`${URL}/update-alarm-time`, req.body);
            res.sendStatus(203);
        }
        catch (err) {
            console.warn('Issue updating alarm data: ', err);
            res.sendStatus(203);
        }
    })),
    disarmStatus: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`${URL}/update-disarm-status`, req.body);
            res.sendStatus(203);
        }
        catch (err) {
            console.warn('Issue updating defuse data: ', err);
            res.sendStatus(203);
        }
    })),
    streakCount: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`${URL}/update-streak-count`, req.body);
            res.sendStatus(203);
        }
        catch (err) {
            console.warn('Issue updating streak data: ', err);
            res.sendStatus(203);
        }
    })),
    skippedData: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`${URL}/update-skipped-count`, req.body);
            res.sendStatus(203);
        }
        catch (err) {
            console.warn('Issue updating skipped data: ', err);
            res.sendStatus(203);
        }
    })),
    skipTomorrow: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.patch(`${URL}/update-skipped-date`, req.body);
            res.sendStatus(201);
        }
        catch (err) {
            console.warn('Issue skipping tomorrow: ', err);
            res.sendStatus(500);
        }
    })),
};
