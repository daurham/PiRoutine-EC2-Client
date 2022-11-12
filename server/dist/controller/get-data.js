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
// GET
exports.default = {
    alarmTime: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${URL}/get-alarm-time/?table=alarmtime`);
            res.status(200).send(data);
        }
        catch (err) {
            console.warn('Issue getting alarm data: ', err);
            res.status(200).send([{ hour: 6, minute: 5 }]);
        }
    })),
    disarmStatus: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${URL}/get-disarm-status/?table=isdisarmed`);
            res.status(200).send(data);
        }
        catch (err) {
            console.warn('Issue getting defuse data: ', err);
            res.status(200).send([{ isDisarmed: 0 }]);
        }
    })),
    streakCount: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${URL}/get-streak-count/?table=streakcount`);
            res.status(200).send(data);
        }
        catch (err) {
            console.warn('Issue getting streak data: ', err);
            res.status(200).send([{ streak: true }]);
        }
    })),
    userInfo: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${URL}/get-user-info/?table=users`);
            res.status(200).send(data);
        }
        catch (err) {
            console.warn('Issue getting user info data: ', err);
            res.status(200).send([{ password: '1234' }]);
        }
    })),
    soakedCount: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${URL}/get-soaked-count/?table=soakedcount`);
            res.status(200).send(data);
        }
        catch (err) {
            console.warn('Issue getting soakedCount data: ', err);
            res.status(200).send([{ soakedCount: 0 }]);
        }
    })),
    skippedData: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${URL}/get-skipped-data/?table=skippedcount`);
            res.status(200).send(data);
        }
        catch (err) {
            console.warn('Issue getting skippedCount data: ', err);
            res.status(200).send([{ skippedCount: 0 }]);
        }
    })),
    disarmRecords: ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${URL}/get-disarm-records/?table=disarmrecords`);
            res.status(200).send(data);
        }
        catch (err) {
            console.warn('Issue getting disarmRecords data: ', err);
            res.sendStatus(500);
        }
    })),
};
