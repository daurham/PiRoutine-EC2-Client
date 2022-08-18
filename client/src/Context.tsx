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
  getFirstAlarm,
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
  // const {
  //   loading,
  //   error,
  //   data: { latitude, longitude },
  // } = useGeolocation();

  // const [changeLat, getChangeLat] = useState(0);
  // const [changeLon, getChangeLon] = useState(0);
  // type LType = number | undefined;
  // const [initialLat, setInitialLat] = useState<LType>(latitude);
  // const [initialLon, setInitialLon] = useState<LType>(longitude);
  // const [once, setOnce] = useState<boolean>(false);
  // const [once2, setOnce2] = useState<boolean>(false);
  // const [distance, setDistance] = useState<number>(0);
  // const [isDisarmed, setDisarmStatus] = useState<boolean>();

  const [alarm1, setAlarm1] = useState<string>();
  const [alarm2, setAlarm2] = useState<string>();
  const [currentAlarm, setCurrentAlarm] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>();
  const [streak, setStreak] = useState<number>(0);
  const [isDisarmed, setDisarmStatus] = useState<boolean>();

  let interval;
  let clock: Timer;

  // if (!once && latitude && longitude) {
  //   setInitialLat(() => latitude);
  //   setInitialLon(() => longitude);
  //   setOnce(() => true);
  // }

  // const dConvert = (input) => Math.floor(((input - 0) * 100) / (.003 - 0));

  // let dif = (c, l, i, cb, ccb) => { // calucate the difference between geolocation reading
  //   if (i !== l) {
  //     if (l) {
  //       let v = c + Math.abs(Math.abs(i) - Math.abs(l));
  //       ccb(() => v);
  //       cb(() => l);
  //     }
  //   }
  // };

  // const getAlarmTime = async () => {
  //   try {
  //     const { data } = await axios.get('/api/get-alarm-time');
  //     const { hour, minute } = parseTimeData(data);
  //     console.log('context data alar; h, m:', hour, minute);
  //     await setAlarm1(() => getFirstAlarm(hour, minute));
  //     setAlarm2(() => getSecondAlarm());
  //   } catch (err) {
  //     console.log('err?: ', err);
  //     await setAlarm1(() => getFirstAlarm(6, 0));
  //     setAlarm2(() => getSecondAlarm());
  //   }
  // };

  // const getStreak = async () => {
  //   try {
  //     const { data } = await axios.get('/api/get-streak-count');
  //     const { streak } = data[0];
  //     console.log('streak get data', data);
  //     setStreak(() => streak);
  //   } catch (err) {
  //     console.log('err?: ', err);
  //     setStreak(() => 0);
  //   }
  // };

  // const getDisarmStatus = async () => {
  //   try {
  //     const { data } = await axios.get('/api/get-disarm-count');
  //     console.log('streak get data', data);
  //     let { isDisarmed } = data[0];
  //     isDisarmed = swapBinaryAndBool(isDisarmed);
  //     setDisarmStatus(() => data[0].isdisarmed);
  //   } catch (err) {
  //     console.log('err?: ', err);
  //     setDisarmStatus(() => 0);
  //   }
  // };
  // interface TimeObj { hour: number; minute: number; }
  // const updateAlarmTime = async (timeData: TimeObj) => {
  //   try {
  //     await axios.patch('/api/update-alarm-time', timeData);
  //     const { data } = await axios.get('/api/get-alarm-time');
  //     const { hour, minute } = parseTimeData(data);
  //     console.log('update alarm data:', data);
  //     setAlarm1(() => getFirstAlarm(hour, minute));
  //   } catch (err) {
  //     console.log('err:', err);
  //   }
  // };

  // const updateDisarmStatus = async (data: boolean) => {
  //   try {
  //     await axios.patch('/api/update-disarm-status', { data: data || !isDisarmed });
  //     const { data } = await axios.get('/api/get-disarm-status');
  //     console.log('update defuse data:', data);
  //     // setDisarmStatus(data); // need to deconstruct
  //   } catch (err) {
  //     console.log('Error update defuse data:', data);
  //   }
  // };

  // const updateStreakCount = useCallback(() => async (data: number) => {
  //   try {
  //     await axios.patch('/api/update-streak-count', { data: data || streak + 1 });
  //     const { data } = await axios.get('/api/get-streak-count');
  //     console.log('update streak data:', data);
  //     setStreak(data);
  //   } catch (err) {
  //     console.log('Error update streak data:', data);
  //   }
  // }, [streak]);

  const handleCurrentTime = () => setCurrentTime(() => theCurrentTime());

  // useEffect(() => { // TRACK STREAK CHANGE
  //   // if (!alarmTime)
  //   getAlarmTime();
  //   getStreak();
  // }, []);

  // useEffect(() => { // TRACK CURRENT LOCATION CHANGE
  //   dif(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
  //   dif(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
  //   setDistance(() => dConvert(changeLat));
  // }, [latitude]);

  useEffect(() => { // TRACK TIME CHANGE
    clock = setInterval(() => handleCurrentTime(), 1000);
    return () => clearInterval(clock);
  }, [currentTime]);

  const value = useMemo(() => ({
    //   distance,
    //   setDistance,
    //   latitude,
    //   longitude,
    alarm1,
    alarm2,
    currentTime,
    currentAlarm,
    streak,
    isDisarmed,
    //   setCurrentTime,
    //   setAlarm1,
    //   setAlarm2,
    //   getAlarmTime,
    //   getStreak,
    //   setDisarmStatus,
    //   getDisarmStatus,
    //   updateAlarmTime,
    //   updateDisarmStatus,
    //   updateStreakCount,
  }), [
    alarm1,
    alarm2,
    currentAlarm,
    currentTime,
    streak,
    isDisarmed,
    //   distance,
    //   latitude,
    //   longitude,
    //   updateAlarmTime,
    //   updateDisarmStatus,
    //   updateStreakCount,
  ]);

  // return (!currentTime || !alarm1) ? <Loading /> : (
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
