/**
 * Utils contains a list of various utility functions.
 */
interface TimeObj { hour: number; minute: number; }
const parseTimeData = (timeObj: TimeObj[]): TimeObj => {
  const { hour, minute } = timeObj[0];
  return { hour, minute };
};

const theCurrentTime = () => new Date().toLocaleTimeString();
const addMinutes = (date: Date, minutes: number) => new Date(date.getTime() + minutes * 60000);
const addSeconds = (date: Date, seconds: number) => new Date(date.getTime() + seconds * 1000);
const today = new Date();

const getFirstAlarm = (hour: number, minute: number) => new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  hour,
  minute,
  0,
);

const getSecondAlarm = (alarm1: Date) => addMinutes(alarm1, 7); // Adds 7 min to initial alarm

type BinaryOrBool = 1 | 0 | '1' | '0' | true | false | 'true' | 'false';
const swapBinaryAndBool = (val: BinaryOrBool) => {
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

export = {
  swapBinaryAndBool,
  theCurrentTime,
  addMinutes,
  addSeconds,
  getFirstAlarm,
  getSecondAlarm,
  parseTimeData,
};
