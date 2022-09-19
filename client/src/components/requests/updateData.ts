import axios from 'axios';
import { getTomorrow, swapBinaryAndBool } from '../utils';
import { 
  GetSkipDataParams,
  UpdateAlarmDataParams,
  UpdateDisarmDataParams,
 } from '../../../../types';

export const updateAlarmTime = async ({
  timeData,
  getAlarmData,
}: UpdateAlarmDataParams) => {
  const { hour, minute, tod } = timeData;
  const hr = Number(hour);
  const min = Number(minute);
  console.log('time data', timeData);
  try {
    await axios.patch('/update-alarm-time', { hour: hr, minute: min, tod });
    await getAlarmData();
  } catch (err) {
    console.log('Error UPDATING alarm data:', err);
  }
};

export const updateDisarmStatus = async ({
  disarmData,
  getDisarmData,
}: UpdateDisarmDataParams) => {
  const convertedStatusData = swapBinaryAndBool(disarmData);
  try {
    await axios.patch('/update-disarm-status', { data: convertedStatusData });
    await getDisarmData();
  } catch (err) {
    console.log('Error UPDATING defuse data:', err);
  }
};

export const skipNextDay = async (getSkipData: () => Promise<void>): Promise<void> => {
  await axios.patch('/update-skipped-date', { data: getTomorrow() });
  getSkipData();
};

export const skipToday = async (getSkipData: () => Promise<void>): Promise<void>=> {
  await axios.patch('/update-skipped-date', { data: new Date().toLocaleDateString() });
  getSkipData();
};

export const removeSkip = async (getSkipData: () => Promise<void>): Promise<void> => {
  await axios.patch('/update-skipped-date', { data: 'None 💪🏼' });
  getSkipData();
};
