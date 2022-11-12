import axios from 'axios';
import {
  parseTimeData,
  getFirstAlarm,
  getSecondAlarm,
  addSeconds,
  swapBinaryAndBool,
} from '../utils';
import {
  AlarmTimeRes,
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
  DisarmRes,
  StreakRes,
  SkipRes,
  SoakedRes,
  UserRes,
} from '../../../../types';

export const getAlarmTime = async ({
  setAlarmData,
}: GetAlarmTimeParams): Promise<void> => {
  try {
    const { data } = await axios.get<AlarmTimeRes>('/get-alarm-time');
    const { hour, minute } = parseTimeData(data);
    const firstAlarmTimestamp = getFirstAlarm(hour, minute);
    const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp, 7);
    const threeSecAfterTimestamp1 = addSeconds(firstAlarmTimestamp, 3);
    const threeSecAfterTimestamp2 = addSeconds(secondAlarmTimestamp, 3);
    const state: TempAlarmState = {
      alarm1: firstAlarmTimestamp.toLocaleTimeString(),
      alarm2: secondAlarmTimestamp.toLocaleTimeString(),
      threeSecAfterAlarm1: threeSecAfterTimestamp1.toLocaleTimeString(),
      threeSecAfterAlarm2: threeSecAfterTimestamp2.toLocaleTimeString(),
    };
    setAlarmData(
      (prevState: AlarmStateObj): AlarmStateObj => ({ ...prevState, ...state }),
    );
  }
  catch (err) {
    console.error('Error GETTING alarm data: ', err);
    const firstAlarmTimestamp = getFirstAlarm(6, 0);
    const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp);
    const state = {
      alarm1: firstAlarmTimestamp.toLocaleTimeString(),
      alarm2: secondAlarmTimestamp.toLocaleTimeString(),
    };
    setAlarmData(
      (prevState: AlarmStateObj): AlarmStateObj => ({ ...prevState, ...state }),
    );
  }
};

export const getDisarmStatus = async ({
  setDisarmData,
}: GetDisarmDataParams): Promise<void> => {
  try {
    const { data } = await axios.get<DisarmRes>('/get-disarm-status');
    const { disarmedstatus } = data[0];
    const convertStatus = !!swapBinaryAndBool(disarmedstatus) === true;
    setDisarmData((prevState: DisarmDataObj) => ({
      ...prevState,
      isDisarmed: convertStatus,
    }));
  }
  catch (err) {
    console.error('Error GETTING disarm status: ', err);
    setDisarmData((prevState: DisarmDataObj) => ({
      ...prevState,
      isDisarmed: false,
    }));
  }
};

export const getStreakCount = async ({
  setStreakData,
}: GetStreakDataParams): Promise<void> => {
  try {
    const { data } = await axios.get<StreakRes>('/get-streak-count');
    const { streak, maxstreak } = data[0];
    setStreakData((prevState: StreakDataObj) => ({
      ...prevState,
      streak,
      maxStreak: maxstreak,
    }));
  }
  catch (err) {
    setStreakData((prevState: StreakDataObj) => ({ ...prevState, streak: 0 }));
    console.error('Error GETTING streak data: ', err);
  }
};

export const getSkipDateAndCount = async ({
  setSkipData,
}: GetSkipDataParams): Promise<void> => {
  try {
    const skippedData = await axios.get<SkipRes>('/get-skipped-data');
    const { skipped, skipdate } = skippedData.data[0];
    setSkipData((prevState: SkipDataObj) => ({
      ...prevState,
      skippedCount: skipped,
      skipDate: skipdate,
    }));
  }
  catch (err) {
    console.warn('Error GETTING skipped data: ', err);
  }
};

export const getSoakedCount = async ({
  setSoakedData,
}: GetSoakedDataParams): Promise<void> => {
  try {
    const { data } = await axios.get<SoakedRes>('/get-soaked-count');
    const { soaked } = data[0];
    setSoakedData(soaked);
  }
  catch (err) {
    console.warn('Error GETTING soaked data: ', err);
  }
};

export const getDisarmRecords = async ({
  setDisarmRecords,
}: GetDisarmRecordsDataParams): Promise<void> => {
  try {
    const { data } = await axios.get<DisarmRecordsData>('/get-disarm-records');
    setDisarmRecords(data);
  }
  catch (err) {
    console.warn('Error GETTTING disarm records: ', err);
  }
};

export const getUserPassword = async (
  setPassword: (arg0: string) => void,
): Promise<void> => {
  try {
    const { data } = await axios.get<UserRes>('/get-user-info');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { password_ } = data[0];
    setPassword(password_);
  }
  catch (err) {
    setPassword('1234');
    console.warn('Error GETTING user data: ', err);
  }
};
