"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const controller_1 = require("./controller");
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    console.log(`Request recieved at: ${new Date().toLocaleTimeString()} -> \n${req.url}`);
    next();
});
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
exports.default = router;
