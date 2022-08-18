import React,
{
  useEffect,
  useState,
  useMemo,
  useContext,
} from 'react';
import { Temporal } from '@js-temporal/polyfill';
import axios from 'axios';
import Spinner from './components/utils/Spinner';
import useGeolocation from './components/utils/useGeolocation';
import convert from './components/utils/convert';

const DataContext = React.createContext();

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
  const [initialLat, setInitialLat] = useState(latitude);
  const [initialLon, setInitialLon] = useState(longitude);
  const [once, setOnce] = useState(false);
  const [once2, setOnce2] = useState(false);
  const [distance, setDistance] = useState(0);

  const [currentTime, setCurrentTime] = useState();
  const [alarmTime, setAlarmTime] = useState();
  const [initialAlarmTime, setInitialAlarmTime] = useState();
  const [streak, setStreak] = useState();

  let interval;
  let clock: Date;

  const resetIntialAlarm = () => setInitialAlarmTime(() => alarmTime);

  if (!once2 && alarmTime) {
    resetIntialAlarm();
    setOnce2(() => true);
  }

  if (!once && latitude && longitude) {
    setInitialLat(() => latitude);
    setInitialLon(() => longitude);
    setOnce(() => true);
  }

  const dConvert = (input) => Math.floor(((input - 0) * 100) / (.003 - 0));

  let dif = (c, l, i, cb, ccb) => { // calucate the difference between geolocation reading
    if (i !== l) {
      if (l) {
        let v = c + Math.abs(Math.abs(i) - Math.abs(l));
        ccb(() => v);
        cb(() => l);
      }
    }
  };

  const getAlarmTime = async () => {
    try {
      const { hour, minute, tod } = await axios.get('/get-alarm-time')[0];
      console.log('context data alarm', data);
      // setAlarmTime(() => new Temporal.PlainTime(((data[0].hour === 24 ? 0 : data[0].hour)), data[0].minute));
      // setInitialAlarmTime(() => new Temporal.PlainTime(((data[0].hour === 24 ? 0 : data[0].hour)), data[0].minute));
      console.log('Made contact with PI, getting alarmtime @', Temporal.Now.plainTimeISO());
    } catch (err) {
      console.log('err?: ', err);
      // setInitialAlarmTime(() => new Temporal.PlainTime(6, 5).toString());
      // setAlarmTime(() => new Temporal.PlainTime(6, 5).toString());
    }
  };

  const getStreak = async () => {
    try {
      const { data } = await axios.get('/get-streak-count');
      console.log('streak get data', data);
      setStreak(() => data[0].streak);
    } catch (err) {
      console.log('err?: ', err);
      setStreak(() => 0);
    }
  };

  const getDisarmStatus = () => {

  };

  const handleCurrentTime = () => setCurrentTime(() => convert(Temporal.Now.plainTimeISO()));

  useEffect(() => { // TRACK STREAK CHANGE
    // if (!alarmTime)
    // getAlarmTime();
    // getStreak();
  }, []);

  useEffect(() => { // TRACK CURRENT LOCATION CHANGE
    dif(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
    dif(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
    setDistance(() => dConvert(changeLat));
  }, [latitude]);

  useEffect(() => { // TRACK TIME CHANGE
    clock = setInterval(() => handleCurrentTime(), 1000);
    return () => clearInterval(clock);
  }, [currentTime]);

  const value = useMemo(() => ({
    distance,
    setDistance,
    latitude,
    longitude,
    streak,
    setStreak,
    currentTime,
    setCurrentTime,
    alarmTime,
    setAlarmTime,
    initialAlarmTime,
    setInitialAlarmTime,
    getAlarmTime,
    getStreak,
  }), [currentTime]);

  return (!currentTime || !alarmTime) ? <Spinner /> : (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
