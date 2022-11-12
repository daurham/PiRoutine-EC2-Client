export interface AlarmStateObj {
  alarm1?: string | undefined;
  alarm2?: string | undefined;
  tenSecAfterAlarm1?: string | undefined;
  threeSecAfterAlarm1?: string | undefined;
  threeSecAfterAlarm2?: string | undefined;
  tenSecAfterAlarm2?: string | undefined;
  currentAlarm?: string | undefined;
}
export interface DisarmDataObj {
  isDisarmed?: boolean | undefined;
  hideDisarmBtn?: boolean;
}
export interface SkipDataObj {
  skipDate?: string | undefined;
  skippedCount?: number | undefined;
}
export interface StreakDataObj {
  streak?: number | undefined;
  maxStreak?: number | undefined;
}

export interface TimeObj {
  hour: string | HTMLSelectElement;
  minute: string | HTMLSelectElement;
  tod: 'AM' | 'PM';
}
export type AlarmTimeRes = [
  {
    id: number;
    hour: number;
    minute: number;
    tod: 'AM' | 'PM';
  },
];

export type DisarmRes = [
  {
    id: number;
    disarmedstatus: 0 | 1;
  },
];

export type StreakRes = [
  {
    id: number;
    streak: number;
    maxstreak: number;
  },
];

export type SkipRes = [
  {
    id: number;
    skipped: number;
    skipdate: string;
  },
];

export type SoakedRes = [
  {
    id: number;
    soaked: number;
  },
];

export type RecordsRes = DisarmDataObj[];

export type UserRes = [
  {
    id: number;
    username: string;
    password_: string;
  },
];

export interface UpdateAlarmDataParams {
  timeData: TimeObj;
  getAlarmData: () => Promise<void>;
}

export interface UpdateDisarmDataParams {
  disarmData: boolean;
  getDisarmData: () => Promise<void>;
}

export interface GetAlarmTimeParams {
  alarmData?: AlarmStateObj;
  setAlarmData: (
    arg0: AlarmStateObj | ((arg0: AlarmStateObj) => AlarmStateObj),
  ) => void;
}
export interface TempAlarmState {
  alarm1?: string;
  alarm2?: string;
  threeSecAfterAlarm1?: string;
  threeSecAfterAlarm2?: string;
  tenSecAfterAlarm1?: string;
  tenSecAfterAlarm2?: string;
}

export interface GetDisarmDataParams {
  disarmData?: DisarmDataObj;
  setDisarmData: (
    arg0: DisarmDataObj | ((arg0: DisarmDataObj) => DisarmDataObj),
  ) => void;
}

export interface GetStreakDataParams {
  streakData?: StreakDataObj;
  setStreakData: (
    arg0: StreakDataObj | ((arg0: StreakDataObj) => StreakDataObj),
  ) => void;
}

export interface GetSkipDataParams {
  SkipData?: SkipDataObj;
  setSkipData: (
    arg0: SkipDataObj | ((arg0: SkipDataObj) => SkipDataObj),
  ) => void;
}

export type SoakedData = number;

export interface GetSoakedDataParams {
  soakedCount?: number | undefined;
  setSoakedData: (
    arg0: SoakedData | ((arg0: SoakedData) => SoakedData),
  ) => void;
}

export interface DisarmRecordsObj {
  alarm1?: string;
  alarm2?: string;
  disarmedtime1?: string;
  disarmedtime2?: string;
  success?: 0 | 1 | boolean;
  date_?: string;
  username?: string;
  id?: number;
}
export type DisarmRecordsData = DisarmRecordsObj[];

export interface SoakedDataObj {
  skipDate?: string | undefined;
  skippedCount?: number | undefined;
}
export interface GetDisarmRecordsDataParams {
  disarmRecords?: DisarmRecordsData | undefined;
  setDisarmRecords: (
    arg0: DisarmRecordsData | ((arg0: DisarmRecordsData) => DisarmRecordsData),
  ) => void;
}

export interface UnlockPropsObj {
  show: boolean;
  handleClose: (arg0: boolean) => void;
  inputStatus: string;
  setInputStatus: (arg0: string) => void;
  inputPin: string;
  setInputPin: (arg0: string) => void;
  setLock: (arg0: string) => void;
}
