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
    await getAlarmData();
  } catch (err) {
    console.warn('Error UPDATING alarm data:', err);
  }
};

export const updateDisarmStatus = async ({
  disarmData,
  getDisarmData,
}: UpdateDisarmDataParams): Promise<void> => {
  const convertedStatusData = swapBinaryAndBool(disarmData);
  try {
    await axios.patch('/update-disarm-status', { data: convertedStatusData });
    await getDisarmData();
  } catch (err) {
    console.warn('Error UPDATING disarm data:', err);
  }
};

export const skipNextDay = async (getSkipData: () => Promise<void>): Promise<void> => {
  try {
    await axios.patch('/update-skipped-date', { data: getTomorrow() });
    await getSkipData();
  } catch (err) {
    console.warn('Error UPDATING skip data:', err);
  }
};

export const skipToday = async (getSkipData: () => Promise<void>): Promise<void> => {
  try {
    await axios.patch('/update-skipped-date', { data: new Date().toLocaleDateString() });
    await getSkipData();
  } catch (err) {
    console.warn('Error UPDATING skip data:', err);
  }
};

export const removeSkip = async (getSkipData: () => Promise<void>): Promise<void> => {
  try {
    await axios.patch('/update-skipped-date', { data: 'None 💪🏼' });
    await getSkipData();
  } catch (err) {
    console.warn('Error UPDATING skip data:', err);
  }
};
