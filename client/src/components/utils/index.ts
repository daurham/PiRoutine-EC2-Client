/**
 * Utils contains a list of various utility functions.
 */

export const range = (start: number, end: number, step = 1): number[] => {
  let result = [start];
  if (start === end) { return [end]; }
  if (start < end) { result = [...result, ...range(start + step, end)]; }
  return result;
};

export const statusGenerator = (setMotivation: (arg0: string) => void, failed: boolean) => {
  const goodPhrases = [
    'Make them proud',
    'Keep it up',
    'Keep proving you\'ve had enough',
    'Keep crushing it!',
    // 'Crush the fuck out this day!',
    'Stick to your goals',
    'Trust your wiser self',
    'Keep going',
  ];
  const badPhrases = [
    'Do Better',
    'You\'re better than this',
    'It\'s only an L if you let it happen twice',
    'I can do better',
    'I know better',
    'Do or Don\'t, There\'s no "try"',
    'How will you redeem yourself?',
  ];
  if (failed) {
    const random = Math.floor(Math.random() * (badPhrases.length));
    setMotivation(badPhrases[random]);
  } else {
    const random = Math.floor(Math.random() * (goodPhrases.length));
    setMotivation(goodPhrases[random]);
  }
};

interface TimeObj { hour: number; minute: number; tod?: 'AM' | 'PM'}
type AlarmTimeRes = [
  {
    id: number;
    hour: number;
    minute: number;
    tod: 'AM' | 'PM';
  },
];
export const parseTimeData = (timeObj: AlarmTimeRes): TimeObj => {
  const { hour, minute } = timeObj[0];
  return { hour, minute };
};

export const theCurrentTime = (): string => new Date().toLocaleTimeString();

export const addMinutes = (date: Date, minutes: number): Date => new Date(
  date.getTime() + (minutes * 60000),
);
export const addSeconds = (date: Date, seconds: number): Date => new Date(
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

type BinaryOrBool = 1 | 0 | '1' | '0' | true | false | 'true' | 'false' | undefined;
export const swapBinaryAndBool = (val: BinaryOrBool): BinaryOrBool => {
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

export const getHour = (time: string): number => Number(time.slice(0, time.indexOf(':')));
export const getMinute = (time: string): number => Number(time.slice(time.indexOf(':') + 1, time.lastIndexOf(':')));
export const getTOD = (time: string): 'AM' | 'PM' => time.slice(-2);

/**
 * GET THE TRUE RANGE OF PHASES
 * time1 < time2 was unreliable... Until now.
 */
export const getPhase = (alarm1: string, alarm2: string, currentTime: string): 1 | 2 | 3 => {
  // get TOD
  const alarm1TOD = alarm1.slice(-2);
  const alarm2TOD = alarm2.slice(-2);
  const currentTOD = currentTime.slice(-2);
  // get Hr
  const alarm1Hour = getHour(alarm1);
  const alarm2Hour = getHour(alarm2);
  const currentHour = getHour(currentTime);
  // get total Hrs
  let alarm1TotalHours = alarm1Hour;
  if (alarm1TotalHours === 12 && alarm1TOD === 'AM') alarm1TotalHours = 0;

  alarm1TotalHours += (
    alarm1TOD === 'AM'
      || (alarm1TOD === 'PM' && alarm1Hour === 12) ? 0 : 12
  );
  let alarm2TotalHours = alarm2Hour;
  if (alarm2TotalHours === 12 && alarm2TOD === 'AM') alarm2TotalHours = 0;

  alarm2TotalHours += (
    alarm2TOD === 'AM'
      || (alarm2TOD === 'PM' && alarm2Hour === 12) ? 0 : 12
  );
  let currentTotalHours = currentHour;
  if (currentTotalHours === 12 && currentTOD === 'AM') currentTotalHours = 0;

  currentTotalHours += (
    currentTOD === 'AM'
      || (currentTOD === 'PM' && currentHour === 12) ? 0 : 12
  );

  // Handle 12AM edgecase
  if (alarm1TotalHours === 0 && currentTotalHours === 23) return 1;
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
  }
  return 1; // default
};

export const getTomorrow = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString();
};
