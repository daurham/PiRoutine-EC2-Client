import axios from 'axios';
import {
  parseTimeData,
  getFirstAlarm,
  getSecondAlarm,
  addSeconds,
  swapBinaryAndBool,
} from "../utils";
import {
  GetAlarmTimeParams,
  GetDisarmDataParams,
  GetDisarmRecordsDataParams,
  GetSkipDataParams,
  GetSoakedDataParams,
  GetStreakDataParams,
  TempAlarmState,
  AlarmStateObj,
  DisarmDataObj,
  StreakDataObj,
  SkipDataObj,
  DisarmRecordsData,
} from '../../../../types';

export const getAlarmTime = async ({
  setAlarmData,
}: GetAlarmTimeParams) => {
  try {
    const { data } = await axios.get('/get-alarm-time');
    const { hour, minute } = parseTimeData(data);
    const firstAlarmTimestamp = getFirstAlarm(hour, minute);
    const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp, 7); // arg2 = phase2 duration
    const tenSecAfterTimestamp1 = addSeconds(firstAlarmTimestamp, 10);
    const tenSecAfterTimestamp2 = addSeconds(secondAlarmTimestamp, 10);
    const state: TempAlarmState = {
      alarm1: firstAlarmTimestamp.toLocaleTimeString(),
      alarm2: secondAlarmTimestamp.toLocaleTimeString(),
      tenSecAfterAlarm1: tenSecAfterTimestamp1.toLocaleTimeString(),
      tenSecAfterAlarm2: tenSecAfterTimestamp2.toLocaleTimeString(),
    };
    setAlarmData((prevState: AlarmStateObj): AlarmStateObj => ({ ...prevState, ...state }));
  } catch (err) {
    console.log('err?: ', err);
    const firstAlarmTimestamp = getFirstAlarm(6, 0);
    const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp);
    const state = {
      alarm1: firstAlarmTimestamp.toLocaleTimeString(),
      alarm2: secondAlarmTimestamp.toLocaleTimeString(),
    };
    setAlarmData((prevState: AlarmStateObj): AlarmStateObj => ({ ...prevState, ...state }));
  }
};

export const getDisarmStatus = async ({
  setDisarmData,
}: GetDisarmDataParams) => {
  try {
    const { data } = await axios.get('/get-disarm-status');
    let { disarmedstatus } = data[0];
    disarmedstatus = swapBinaryAndBool(disarmedstatus);
    setDisarmData((prevState: DisarmDataObj) => ({ ...prevState, isDisarmed: disarmedstatus }));
  } catch (err) {
    console.log('err?: ', err);
    setDisarmData((prevState: DisarmDataObj) => ({ ...prevState, isDisarmed: false }));
  }
};

export const getStreakCount = async ({
  setStreakData,
}: GetStreakDataParams) => {
  try {
    const { data } = await axios.get('/get-streak-count');
    const { streak, maxstreak } = data[0];
    setStreakData((prevState: StreakDataObj) => ({ ...prevState, streak, maxStreak: maxstreak }))
  } catch (err) {
    console.error('Error GETTING streak data: ', err);
    setStreakData((prevState: StreakDataObj) => ({ ...prevState, streak: 0 }))
  }
};

export const getSkipDateAndCount = async ({
  setSkipData,
}: GetSkipDataParams) => {
  try {
    const skippedData = await axios.get('/get-skipped-data');
    const { skipped, skipdate } = skippedData.data[0];
    setSkipData((prevState: SkipDataObj) => ({ ...prevState, skippedCount: skipped, skipDate: skipdate }))
  } catch (err) {
    console.error('Error GETTING skipped data: ', err);
  }
};

export const getSoakedCount = async ({
  setSoakedData,
}: GetSoakedDataParams) => {
  try {
    const soakedData = await axios.get('/get-soaked-count');
    const { soaked } = soakedData.data[0];
    setSoakedData(soaked);
  } catch (err) {
    console.error('Error GETTING soaked data: ', err);
  }
};

export const getDisarmRecords = async ({
  setDisarmRecords,
}: GetDisarmRecordsDataParams) => {
  try {
    const disarmData = await axios.get('/get-disarm-records');
    const records: DisarmRecordsData = disarmData.data;
    setDisarmRecords(records);
  } catch (err) {
    console.error('Error getting disarm records: ', err);
  }
};

export const getUserPassword = async (setPassword: (arg0: string) => void) => {
  try {
    const { data } = await axios.get('/get-user-info');
    const { password_ } = data[0];
    setPassword(password_);
  } catch (err) {
    console.error('Error getting User Info: ', err);
    setPassword('1234');
  }
};