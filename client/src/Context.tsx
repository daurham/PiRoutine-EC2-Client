import React,
{
  useEffect,
  useState,
  useMemo,
  useContext,
  useCallback,
} from 'react';
import axios from 'axios';
import useGeolocation from './components/utils/useGeolocation';
import Loading from './components/Loading';
import {
  addMinutes,
  addSeconds,
  getFirstAlarm,
  getPhase,
  getSecondAlarm,
  parseTimeData,
  swapBinaryAndBool,
  theCurrentTime,
} from './components/utils';

// type ContextType = string | number | Date | undefined;
type MemoContext = {
  currentTime: string | undefined;
  currentAlarm: string | null;
  alarm1: string | null;
  alarm2: string | null;
  streak: number;
  isDisarmed: boolean;
} | string | number;
const DataContext = React.createContext<MemoContext>(0);
// const DataContext = React.createContext<ContextType>(0);

export function useData() {
  return useContext(DataContext);
}

type ContextProps = {
  children: JSX.Element
  // GlobalStyleComponent
  // DefaultTheme;
  // <{}, DefaultTheme>
};

export default function Context({ children }: ContextProps) {
  const {
    loading,
    error,
    data: { latitude, longitude },
  } = useGeolocation();

  const [changeLat, getChangeLat] = useState(0);
  const [changeLon, getChangeLon] = useState(0);
  type LType = number | undefined;
  const [initialLat, setInitialLat] = useState<LType>(latitude);
  const [initialLon, setInitialLon] = useState<LType>(longitude);
  const [distance, setDistance] = useState<number>(0);

  const [alarm1, setAlarm1] = useState<string>();
  const [alarm2, setAlarm2] = useState<string>();
  const [tenSecAfterAlarm1, setTenSecAfterAlarm1] = useState<string>();
  const [tenSecAfterAlarm2, setTenSecAfterAlarm2] = useState<string>();
  const [currentAlarm, setCurrentAlarm] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>();
  const [streak, setStreak] = useState<number>(0);
  const [isDisarmed, setDisarmStatus] = useState<boolean>();
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [hideDisarmBtn, setHideDisarmBtn] = useState(true);
  const [failed, setFailed] = useState(false);

  const [notSignedIn, setLock] = useState(true);
  const [inEditMode, setEditMode] = useState(false);
  const [inputPin, setInputPin] = useState();
  const [inputStatus, setInputStatus] = useState('Submit');
  const [stamp, setStamp] = useState();
  const [maxStreak, setMaxStreak] = useState();

  // MetaData
  const [skippedCount, setSkippedCount] = useState();
  const [soakedCount, setSoakedCount] = useState();
  const [disarmRecords, setDisarmRecords] = useState();

  const [disarmTime1, setDisarmTime1] = useState('N/A');
  const [disarmTime2, setDisarmTime2] = useState('N/A');

  let interval;
  let clock: any;
  let temp;

  const dConvert = (input: number) => Math.floor(((input - 0) * 100) / (0.003 - 0));

  // calucate the difference between geolocation reading
  const dif = (
    change: number,
    lonLat: number,
    init: number,
    setInitCb: Function,
    setChangeCb: Function,
  ) => {
    if (init !== lonLat && init && lonLat) {
      const v = change + Math.abs(Math.abs(init) - Math.abs(lonLat));
      setChangeCb(() => v);
      setInitCb(() => lonLat);
    }
  };

  const getAlarmTime = async () => {
    try {
      const { data } = await axios.get('/get-alarm-time');
      const { hour, minute } = parseTimeData(data);
      // console.log('got data alarm; h, m:', hour, minute);
      const firstAlarmTimestamp = getFirstAlarm(hour, minute);
      const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp, 7); // arg2 = phase2 duration
      const tenSecAfterTimestamp1 = addSeconds(firstAlarmTimestamp, 2);
      const tenSecAfterTimestamp2 = addSeconds(secondAlarmTimestamp, 10);
      // setStamp(firstAlarmTimestamp);
      setAlarm1(() => firstAlarmTimestamp.toLocaleTimeString());
      // console.log('alarm1 is made: ');
      setAlarm2(() => secondAlarmTimestamp.toLocaleTimeString());
      setTenSecAfterAlarm1(() => tenSecAfterTimestamp1.toLocaleTimeString());
      setTenSecAfterAlarm2(() => tenSecAfterTimestamp2.toLocaleTimeString());
    } catch (err) {
      console.log('err?: ', err);
      const firstAlarmTimestamp = getFirstAlarm(6, 0);
      const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp);
      setAlarm1(() => firstAlarmTimestamp.toLocaleTimeString());
      setAlarm2(() => secondAlarmTimestamp.toLocaleTimeString());
    }
  };

  // console.log('stamp', stamp);

  const getDisarmStatus = async () => {
    try {
      const { data } = await axios.get('/get-disarm-status');
      // console.log('got disarm data', data);
      let { disarmedstatus } = data[0];
      disarmedstatus = swapBinaryAndBool(disarmedstatus);
      setDisarmStatus(disarmedstatus);
    } catch (err) {
      console.log('err?: ', err);
      setDisarmStatus(false);
    }
  };

  const getStreak = async () => {
    try {
      const { data } = await axios.get('/get-streak-count');
      const { streak, maxstreak } = data[0];
      // console.log('got streak data', data);
      setStreak(streak);
      setMaxStreak(maxstreak);
    } catch (err) {
      console.log('err?: ', err);
      setStreak(0);
    }
  };

  interface TimeObj { hour: number; minute: number; tod: string }
  const updateAlarmTime = async (timeData: TimeObj) => {
    const { hour, minute, tod } = timeData;
    const hr = Number(hour);
    const min = Number(minute);
    // console.log('time data', timeData);
    try {
      await axios.patch('/update-alarm-time', { hour: hr, minute: min, tod });
      await getAlarmTime();
    } catch (err) {
      console.log('err:', err);
    }
  };

  const updateDisarmStatus = async (statusData: boolean) => {
    const convertedStatusData = swapBinaryAndBool(statusData);
    try {
      await axios.patch('/update-disarm-status', { data: convertedStatusData });
      await getDisarmStatus();
    } catch (err) {
      console.log('Error update defuse data:', err);
    }
  };

  const updateStreakCount = async (newData: number) => {
    // console.log('sending streak data:', newData);
    try {
      await axios.patch('/update-streak-count', { data: newData });
      await getStreak();
    } catch (err) {
      console.log('Error update streak data:', err);
    }
  };

  const getSkippedCount = async () => {
    try {
      const skippedData = await axios.get('/get-skipped-count');
      const { skipped } = skippedData.data[0];
      setSkippedCount(skipped);
      // console.log('Skipped: ', skipped);
    } catch (err) {
      console.error('Error getting skipped data: ', err);
    }
  }

  const getSoaked = async () => {
    try {
      const soakedData = await axios.get('/get-soaked-count');
      const { soaked } = soakedData.data[0];
      setSoakedCount(soaked);
      // console.log('Soaked: ', soaked);
    } catch (err) {
      console.error('Error getting soaked data: ', err);
    }
  }

  const getDisarmRecords = async () => {
    try {
      const disarmData = await axios.get('/get-disarm-records');
      const records = disarmData.data;
      console.log('Disarm Records: ', !!records);
      setDisarmRecords(records);
    } catch (err) {
      console.error('Error getting disarm Records: ', err);
    }
  }


  const getMetaData = (): void => {
    getSkippedCount();
    getSoaked();
    getDisarmRecords();
  };


  const postDailyRecord = async () => {
    try {
      const data = {
        alarm1,
        alarm2,
        disarmTime1,
        disarmTime2,
        date_: new Date().toLocaleDateString(),
        success: swapBinaryAndBool(!!failed),
        username: 'daurham',
      };
      await axios.post('/post-disarm-record', data);
      getDisarmRecords();
    } catch (err) {
      console.log('Error update streak data:', err);
    }
  };


  const handleCurrentTime = async () => {
    setCurrentTime(() => theCurrentTime());

    // Set Phase
    if (alarm1 && currentTime && alarm2) {
      const phase = getPhase(alarm1, alarm2, currentTime);
      if (!currentPhase || currentPhase !== phase) {
        setCurrentPhase(phase);
      }

      // __ IF IN PHASE I __
      if (currentPhase === 1) {

        // show disarm button
        if (hideDisarmBtn) setHideDisarmBtn(false);

        // set alarm
        if (currentAlarm !== alarm1) setCurrentAlarm(alarm1);

        // Handle alarm1 Failure
        if (currentTime === alarm1 && !isDisarmed) { 
          // Run Sad functions
          setFailed(true);
        }
      }

      // __ IF IN PHASE II __
      if (currentPhase === 2) {
        // Set Alarm
        if (currentAlarm !== alarm2) setCurrentAlarm(alarm2);

        if (currentTime === tenSecAfterAlarm1) {
          await getDisarmStatus();
          await getStreak();
        }

        // Handle alarm2 Failure
        if (currentTime === alarm2 && !isDisarmed) setFailed(true);
      }

      // __IF IN PHASE III__
      if (currentPhase === 3) {
        if (currentAlarm !== alarm1) setCurrentAlarm(alarm1);

        if (currentTime === tenSecAfterAlarm2) {
          await getStreak();
          await getDisarmStatus();
          postDailyRecord();
          // After 5 sec, reset values
          setTimeout(() => {
            setDisarmTime1('N/A');
            setDisarmTime2('N/A');
            setFailed(false);
          }, 5000);
        }
      }
    }
  };

  useEffect(() => { // TRACK CURRENT LOCATION CHANGE
    if (currentPhase === 2 && distance < 100) {
      dif(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
      dif(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
      setDistance(() => dConvert(changeLat));
    }
  }, [latitude, longitude, initialLat, initialLon]);

  useEffect(() => {
    if (!initialLat) {
      setInitialLat(() => latitude);
    }
    if (!initialLon) {
      setInitialLon(() => longitude);
    }
  }, [latitude, longitude]);

  useEffect(() => { // TRACK TIME CHANGE
    if (alarm1 && !currentAlarm) setCurrentAlarm(alarm1);
    clock = setInterval(() => handleCurrentTime(), 1000);
    // if (distance < 100) setDistance(() => distance + 5); // TESTING
    // console.log('lat:', latitude);
    return () => clearInterval(clock);
  }, [currentTime]);

  useEffect(() => { // INITIAL GET ALARM DATA / ON MOUNT
    getAlarmTime();
    getStreak();
    getDisarmStatus();
    handleCurrentTime();
  }, []);

  const value = useMemo(() => ({
    distance,
    setDistance,
    //   latitude,
    //   longitude,
    alarm1,
    alarm2,
    tenSecAfterAlarm1,
    currentAlarm,
    currentTime,
    streak,
    isDisarmed,
    currentPhase,
    hideDisarmBtn,
    failed,
    longitude,
    latitude,
    initialLat,
    initialLon,
    notSignedIn,
    setLock,
    inputPin,
    setInputPin,
    inputStatus,
    setInputStatus,
    inEditMode,
    setEditMode,
    maxStreak,
    skippedCount,
    soakedCount,
    disarmRecords,
    //   setCurrentTime,
    //   setAlarm1,
    //   setAlarm2,
    //   getAlarmTime,
    getMetaData,
    //   getStreak,
    setDisarmTime1,
    setDisarmTime2,
    setHideDisarmBtn,
    setDisarmStatus,
    getDisarmStatus,
    updateAlarmTime,
    updateDisarmStatus,
    updateStreakCount,
  }), [
    stamp,
    alarm1,
    soakedCount,
    skippedCount,
    maxStreak,
    alarm2,
    tenSecAfterAlarm1,
    currentAlarm,
    currentTime,
    streak,
    isDisarmed,
    currentPhase,
    distance,
    hideDisarmBtn,
    failed,
    longitude,
    latitude,
    initialLat,
    initialLon,
    notSignedIn,
    disarmRecords,
    // setLock,
    inputPin,
    // setInputPin,
    inputStatus,
    // setInputStatus,
    inEditMode,
    // setEditMode,
    // latitude,
    //   longitude,
    //   updateAlarmTime,
    //   updateDisarmStatus,
    //   updateStreakCount,
  ]);

  // return (!currentTime || !alarm1) ? <Loading /> : (
  return !currentTime ? <Loading /> : (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
