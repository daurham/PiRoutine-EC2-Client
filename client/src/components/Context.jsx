import React, { useEffect, useState, useMemo, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
import axios from 'axios';
import styled from 'styled-components';
import App from './App';
import Spinner from './Spinner';
import useGeolocation from "./Utils/useGeolocation";
import convert from './Utils/convert';

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

const Context = () => {
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
  let clock;

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
      let res = await axios.get('/alarmTime');
      setAlarmTime(() => new Temporal.PlainTime(((res.data[0].hour === 24 ? 0 : res.data[0].hour)), res.data[0].minute));
      setInitialAlarmTime(() => new Temporal.PlainTime(((res.data[0].hour === 24 ? 0 : res.data[0].hour)), res.data[0].minute));
      console.log('Made contact with PI, getting alarmtime @', Temporal.Now.plainTimeISO());
    } catch (err) {
      console.log('err?: ', err);
      console.log('Err getting alarm data from db, setting time to 6:05am to avoid crash. Fix err though.');
      setInitialAlarmTime(() => new Temporal.PlainTime(6, 5).toString());
      console.log('Err contacting PI, setting default alarmtime @', Temporal.Now.plainTimeISO());
    }
  };

  const getStreak = async () => {
    try {
      let res = await axios.get('/streak');
      setStreak(() => res.data[0].streak)
      console.log(res.data[0].streak);
      console.log('Made contact with PI, getting current streak @', Temporal.Now.plainTimeISO());
    } catch (err) {
      console.log('err?: ', err);
      console.log('Err getting streak data from db, filling in 0 to avoid crash. Fix err though.');
      setStreak(() => 0);
      console.log('Err contacting PI, setting default streak @', Temporal.Now.plainTimeISO());
    }
  };

  const handleCurrentTime = () => setCurrentTime(() => convert(Temporal.Now.plainTimeISO()));

  useEffect(() => { // TRACK STREAK CHANGE
    if (!alarmTime) getAlarmTime();
    getStreak();
  }, [streak]);

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
    getStreak
  }), [currentTime]);

  return (!currentTime || !alarmTime) ? <Spinner /> : (
    <DataContext.Provider value={value}>
      <App />
    </DataContext.Provider>
  );
};

export default Context;
