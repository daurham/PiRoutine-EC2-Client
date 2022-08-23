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
export const getSecondAlarm = (alarm1: Date, minDelay = 7) => addMinutes(alarm1, minDelay);
// export const getSecondAlarm = (alarm1: Date, minDelay = 7) => addSeconds(alarm1, minDelay);

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

export const getHour = (time: string) => Number(time.slice(0, time.indexOf(':')));

export const getPhase = (alarm1: string, alarm2: string, currentTime: string) => {
  // get TOD
  const alarm1TOD = alarm1.slice(-2);
  const alarm2TOD = alarm2.slice(-2);
  const currentTOD = currentTime.slice(-2);
  // get Hr
  const alarm1Hour = getHour(alarm1);
  const alarm2Hour = getHour(alarm2);
  const currentHour = getHour(currentTime);
  // get total Hrs
  // console.log('1, 2, ct:', alarm1Hour, alarm2Hour, currentHour)
  let alarm1TotalHours = alarm1Hour;
  alarm1TotalHours += (alarm1TOD === 'AM' || (alarm1TOD === 'AM' && Number(alarm1Hour)) === 12 ? 0 : 12);
  let alarm2TotalHours = alarm2Hour;
  alarm2TotalHours += (alarm2TOD === 'AM' || (alarm2TOD === 'AM' && Number(alarm2Hour)) === 12 ? 0 : 12);
  let currentTotalHours = currentHour;
  currentTotalHours += (currentTOD === 'AM' || (currentTOD === 'AM' && Number(currentHour)) === 12 ? 0 : 12);

  // console.log('1, 2, ct:', alarm1TotalHours, alarm2TotalHours, currentTotalHours)
  // Handle polar ranges
  if (currentTotalHours < alarm1TotalHours) return 1;
  if (currentTotalHours > alarm2TotalHours) return 3;
  // Hanlde shared TOD ranges
  if (
    currentTotalHours === alarm1TotalHours
    || currentTotalHours === alarm2TotalHours
  ) {
    //  Phase 1
    if (currentTime <= alarm1 && alarm1TOD === currentTOD) return 1;
    //  Phase 2
    if (currentTime > alarm1 && currentTime <= alarm2) return 2;
    //  Phase 3
    if (currentTime > alarm2) return 3;
  };
  return 1; // default
};
