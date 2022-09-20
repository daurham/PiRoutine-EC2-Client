import axios from 'axios';
import { getTomorrow, swapBinaryAndBool } from '../utils';
import {
  UpdateAlarmDataParams,
  UpdateDisarmDataParams,
} from '../../../../types';

export const updateAlarmTime = async ({
  timeData,
  getAlarmData,
}: UpdateAlarmDataParams): Promise<void> => {
  const { hour, minute, tod } = timeData;
  const hr = Number(hour);
  const min = Number(minute);
  try {
    await axios.patch('/update-alarm-time', { hour: hr, minute: min, tod });
    getAlarmData();
  } catch (err) {
    console.error('Error UPDATING alarm data:', err);
  }
};

export const updateDisarmStatus = async ({
  disarmData,
  getDisarmData,
}: UpdateDisarmDataParams): Promise<void> => {
  const convertedStatusData = swapBinaryAndBool(disarmData);
  try {
    await axios.patch('/update-disarm-status', { data: convertedStatusData });
    getDisarmData();
  } catch (err) {
    console.error('Error UPDATING disarm data:', err);
  }
};

export const skipNextDay = async (getSkipData: () => Promise<void>): Promise<void> => {
  await axios.patch('/update-skipped-date', { data: getTomorrow() });
  getSkipData()
    .catch(console.error);
};

export const skipToday = async (getSkipData: () => Promise<void>): Promise<void> => {
  await axios.patch('/update-skipped-date', { data: new Date().toLocaleDateString() });
  getSkipData()
    .catch(console.error);
};

export const removeSkip = async (getSkipData: () => Promise<void>): Promise<void> => {
  await axios.patch('/update-skipped-date', { data: 'None 💪🏼' });
  getSkipData()
    .catch(console.error);
};
