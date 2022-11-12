"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const controller_1 = require("./controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const CLIENT = path_1.default.join(__dirname, '../../client/dist/');
const PORT = process.env.PORT || 3000;
app.use(express_1.default.static(CLIENT));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// ALARM TIME
app.get('/get-alarm-time', controller_1.get.alarmTime);
app.patch('/update-alarm-time', controller_1.update.alarmTime);
// DISARM STATUS
app.get('/get-disarm-status', controller_1.get.disarmStatus);
app.patch('/update-disarm-status', controller_1.update.disarmStatus);
// STREAK COUNT
app.get('/get-streak-count', controller_1.get.streakCount);
app.patch('/update-streak-count', controller_1.update.streakCount);
// SKIPPED COUNT
app.get('/get-skipped-data', controller_1.get.skippedData);
app.patch('/update-skipped-date', controller_1.update.skipTomorrow);
// SOAKED COUNT
app.get('/get-soaked-count', controller_1.get.soakedCount);
// USER INFO
app.get('/get-user-info', controller_1.get.userInfo);
// DISARM RECORDS
app.get('/get-disarm-records', controller_1.get.disarmRecords);
app.post('/post-disarm-record', controller_1.post.disarmRecord);
app.listen(PORT, () => console.log(`Listening and running: http://localhost:${PORT}`));
