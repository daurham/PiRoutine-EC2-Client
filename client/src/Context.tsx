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
  children: JSX.Element;
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

  const [isLocked, setLock] = useState(true);
  const [inEditMode, setEditMode] = useState(false);
  const [inputPin, setInputPin] = useState();
  const [inputStatus, setInputStatus] = useState('Submit');
  const [stamp, setStamp] = useState();

  let interval;
  let clock: Timer;
  let temp;

  const dConvert = (input: number) => Math.floor(((input - 0) * 100) / (0.003 - 0));

  // calucate the difference between geolocation reading
  const dif = (change: number, lonLat: number, init: number, setInitCb: Function, setChangeCb: Function) => {
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
      console.log('got data alarm; h, m:', hour, minute);
      const firstAlarmTimestamp = getFirstAlarm(hour, minute);
      const secondAlarmTimestamp = getSecondAlarm(firstAlarmTimestamp, 7); // arg2 = phase2 duration
      const tenSecAfterTimestamp1 = addSeconds(firstAlarmTimestamp, 2);
      const tenSecAfterTimestamp2 = addSeconds(secondAlarmTimestamp, 10);
      // setStamp(firstAlarmTimestamp);
      setAlarm1(() => firstAlarmTimestamp.toLocaleTimeString());
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
      console.log('got disarm data', data);
      let { disarmedstatus } = data[0];
      disarmedstatus = swapBinaryAndBool(disarmedstatus);
      setDisarmStatus(() => disarmedstatus);
    } catch (err) {
      console.log('err?: ', err);
      setDisarmStatus(() => false);
    }
  };

  const getStreak = async () => {
    try {
      const { data } = await axios.get('/get-streak-count');
      const { streak } = data[0];
      console.log('got streak data', data);
      setStreak(() => streak);
    } catch (err) {
      console.log('err?: ', err);
      setStreak(() => 0);
    }
  };

  interface TimeObj { hour: number; minute: number; tod: string }
  const updateAlarmTime = async (timeData: TimeObj) => {
    const { hour, minute, tod } = timeData;
    const hr = Number(hour);
    const min = Number(minute);
    console.log('time data', timeData);
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
    console.log('sending streak data:', newData);
    try {
      await axios.patch('/update-streak-count', { data: newData });
      await getStreak();
    } catch (err) {
      console.log('Error update streak data:', err);
    }
  };

  const handleCurrentTime = async () => {
    setCurrentTime(() => theCurrentTime());

    if (alarm1 && currentTime && alarm2) {
      let phase = getPhase(alarm1, alarm2, currentTime);
      console.log('phase: ', phase)
      if (!currentPhase || currentPhase !== phase) {
        setCurrentPhase(phase);
      }

      const alarm1TOD = alarm1.slice(-2);
      const alarm2TOD = alarm2.slice(-2);
      const currentTOD = currentTime.slice(-2);

      // __ IF IN PHASE I __
      if (currentPhase === 1) {
        if (hideDisarmBtn) { // show disarm button
          setHideDisarmBtn(false);
        }
        if (currentAlarm !== alarm1) { // set alarm
          setCurrentAlarm(alarm1);
        }
        if (currentPhase !== 1) { // set phase
          setCurrentPhase(1);
        }
        if (currentTime === alarm1 && !isDisarmed) { // Handle alarm1 Failure
          // Run Sad functions
          setFailed(true);
        }
      }

      // __ IF IN PHASE II __
      if (currentPhase === 2) {
        if (currentAlarm !== alarm2) { // set alarm
          setCurrentAlarm(alarm2);
        }
        if (currentTime === tenSecAfterAlarm1) {
          await getDisarmStatus();
          await getStreak();
        }
        if (currentPhase !== 2) { // set phase
          setCurrentPhase(2);
        }
        if (currentTime === alarm2 && !isDisarmed) { // Handle alarm2 Failure
          setFailed(true);
        }
      }

      // __IF IN PHASE III__
      if (currentPhase === 3) {
        if (currentAlarm !== alarm1) {
          setCurrentAlarm(alarm1);
        }
        if (currentTime === tenSecAfterAlarm2) {
          await getStreak();
          await getDisarmStatus();
        }
      }
    }
  };

  // useEffect(() => { // KEEP ALARM2 UP TO DATE
  //   setAlarm2(() => getSecondAlarm(alarm1).toLocaleTimeString());
  // }, [alarm1]);

  useEffect(() => { // TRACK CURRENT LOCATION CHANGE
    // console.log('lat INNER:', latitude);
    // console.log('lon INNER:', longitude);
    // console.log('changeLat INNER:', changeLat);
    if (currentPhase === 2 && distance < 100) {
      // if (initialLat && initialLon) {
      // console.log('lat OUTTER:', latitude);
      // console.log('lon OUTTER:', longitude);
      // console.log('changeLat OUTTER:', changeLat);
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
    clock = setInterval(() => handleCurrentTime(), 1000);
    // if (distance < 100) setDistance(() => distance + 5);
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
    isLocked,
    setLock,
    inputPin,
    setInputPin,
    inputStatus,
    setInputStatus,
    inEditMode,
    setEditMode,
    //   setCurrentTime,
    //   setAlarm1,
    //   setAlarm2,
    //   getAlarmTime,
    //   getStreak,
    setHideDisarmBtn,
    setDisarmStatus,
    getDisarmStatus,
    updateAlarmTime,
    updateDisarmStatus,
    updateStreakCount,
  }), [
    stamp,
    alarm1,
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
    isLocked,
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
