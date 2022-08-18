import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Form, ProgressBar, Button } from 'react-bootstrap';
import Spinner from './utils/Spinner';
import {
  AppnContainer,
} from './styles/AppStyles';
// import css from '../styles/css.css';
// import Technology from '../fonts/Technology.ttf';
// import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
// import useGeolocation from './utils/useGeolocation';
import { useData } from '../Context';
import range from './utils/range';
import convert from './utils/convert';
import EditTime from './children/EditTime';
import DisarmButton from './children/DisarmButton';
import Header from './children/Header';
import Info from './children/Info';
import TimeDisplay from './children/TimeDisplay';

export default function App() {
  const {
    latitude,
    longitude,
    currentTime,
    setCurrentTime,
    alarmTime,
    setAlarmTime,
    distance,
    setDistance,
    initialAlarmTime,
    setInitialAlarmTime,
    streak,
    setStreak,
    getStreak,
    getAlarmTime
  } = useData();

  // const now = Temporal.Now.plainTimeISO(); // move to context
  const now = new Date().toLocaleTimeString();

  const [status, setStatus] = useState('Stick to your goals');
  const [isDisarmed, toggleDisarmed] = useState();
  const [alarmMessage, setAlarmMessage] = useState('');
  const [currAlarmTime, setCurrAlarmTime] = useState(convert(alarmTime));
  const [currentAlarm, setCurrentAlarm] = useState(1);
  const [active, setActive] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [inputHr, setInputHr] = useState(1);
  const [inputMin, setInputMin] = useState('00');
  const [inputTod, setInputTod] = useState('AM');
  const hours: number[] = [1, ...range(2, 12)];
  const minutes: number[] = ['00', ...range(1, 59).map(n => n < 10 ? '0' + n : n)];

  let clock;
  let interval;
  let isArmed = (isDisarmed ? 'LOCKED' : 'DISARM');

  const switchAlarms = () => { // runs after button is pressed.
    setCurrentAlarm(() => (currentAlarm === 1 ? 2 : 1));
  }

  const handleCurrentTime = () => {
    setCurrentTime(() => convert(Temporal.Now.plainTimeISO()));
  };

  const statusGenerator = () => { // randomly returns a positive phrase
    const phrases = ['Make them proud', 'Keep it up', 'Keep proving you\'ve had enough', 'Keep crushing it!', 'Captain the fuck out this day!', 'Stick to your goals', 'Trust your wiser self', 'Keep going cap'];
    const random = Math.floor(Math.random() * (phrases.length));
    return phrases[random];
  };

  const handleUpdateAlarm = async e => {
    // if (typeof inputHr === 'number' && typeof inputMin === 'number') {
    try {
      let finalInputHour = inputHr;
      let finalInputMinute = inputMin;
      if (inputTod === 'PM') finalInputHour = Number(finalInputHour) + 12;
      if (inputMin[0] == 0) finalInputMinute = finalInputMinute[1];
      console.log(finalInputHour, finalInputMinute, inputTod, ' :vs: ', inputHr, inputMin, inputTod)
      updateAlarmTime({ hour: inputHr, minute: inputMin, tod: inputTod })
      // await axios.patch(`/update-alarm-time/${finalInputHour}/${finalInputMinute}/${inputTod}`);
      // getAlarmTime();
    } catch (err) {
      console.error('Err updating alarmtime data to server: ', err);
      setInitialAlarmTime(() => new Temporal.PlainTime(6, 5).toString());
    }
  };

  // run after progressBar is filled.
  const handleProgressBar = () => { // enables button to be clicked again and diffuses alarm
    if (currentAlarm === 2) {
      if (distance < 100) setDistance(() => distance + 5); // remove after testing
      if (distance >= 100) toggleDisarmed(() => false);
    }
  };

  const checkAlarmClock = () => {
    handleProgressBar();
    isActive(alarmTime);
    setAlarmMessage(() => 'Your alarm is set for ' + convert(alarmTime) + '.');
    if (currentTime === convert(alarmTime)) {
      setStatus(() => 'Do Better...');
      console.error('Err running the pump: ', err);
      updateStreakCount(0);
      // getStreak();
    }
  };

  useEffect(() => {
    clock = setInterval(() => handleCurrentTime(), 1000);
    interval = setInterval(() => checkAlarmClock(), 1000);
    return () => {
      clearInterval(clock);
      clearInterval(interval);
    }
  }, [currentTime]);

  const updateAlarmTime = async (timeData) => {
    try {
      await axios.patch('/update-alarm-time', timeData);
      const { data } = await axios.get('/get-alarm-time');
      console.log('update alarm data:', data);
      setAlarmTime(() =>
        new Temporal.PlainTime(((data[0].hour === 24 ? 0 : data[0].hour)), data[0].minute));
    } catch (err) {
      console.log('err:', err);
    }
  };

  const updateDisarmStatus = async (data) => {
    try {
      await axios.patch(`/update-disarm-status`, { data: data || !isDisarmed });
      const { data } = await axios.get('/get-disarm-status');
      console.log('update defuse data:', data);
      toggleDisarmed(data);
    } catch (err) {
      console.log('Error update defuse data:', data);
    }
  };

  const updateStreakCount = async (data) => {
    try {
      await axios.patch('/update-streak-count', { data: data || streak + 1 });
      const { data } = await axios.get('/get-streak-count');
      console.log('update streak data:', data);
      setStreak(data);
    } catch (err) {
      console.log('Error update streak data:', data);
    }
  };

  return (!currentTime || !alarmMessage) ? <Spinner /> : (

    <AppnContainer>
      <div>
        <h1>PIROUTINE</h1>
        <Header />
        <TimeDisplay />
        <DisarmButton />
        <Info />
        <EditTime />
      </div>
    </AppnContainer>
  );
}
