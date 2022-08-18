/**
 * Utils contains a list of various utility functions.
 */
interface TimeObj { hour: number; minute: number; }
export const parseTimeData = (timeObj: TimeObj[]): TimeObj => {
  const { hour, minute } = timeObj[0];
  return { hour, minute };
};

export const theCurrentTime = (): string => new Date().toLocaleTimeString();
export const addMinutes = (date: Date, minutes: number) => new Date(
  date.getTime() + (minutes * 60000),
);
export const addSeconds = (date: Date, seconds: number) => new Date(
  date.getTime() + (seconds * 1000),
);
export const today = new Date();

export const getFirstAlarm = (hour: number, minute: number) => new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  hour,
  minute,
  0,
);

// Adds 7 min to initial alarm
export const getSecondAlarm = (alarm1: Date) => addMinutes(alarm1, 7);

type BinaryOrBool = 1 | 0 | '1' | '0' | true | false | 'true' | 'false';
export const swapBinaryAndBool = (val: BinaryOrBool) => {
  if (val === true) return 1;
  if (val === false) return 0;
  if (val === 'true') return 1;
  if (val === 'false') return 0;
  if (val === 1) return true;
  if (val === 0) return false;
  if (val === '1') return true;
  if (val === '0') return false;
  return undefined;
};
