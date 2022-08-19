import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Form, ProgressBar, Button } from 'react-bootstrap';
import Spinner from './utils/Spinner';
import {
  AppContainer,
} from './styles/AppStyles';
// import css from '../styles/css.css';
// import Technology from '../fonts/Technology.ttf';
// import useGeolocation from './utils/useGeolocation';
import { useData } from '../Context';
import range from './utils/range';
import EditTime from './children/EditTime';
import DisarmButton from './children/DisarmButton';
import Header from './children/Header';
import Info from './children/Info';
import TimeDisplay from './children/TimeDisplay';
import { getFirstAlarm, parseTimeData, theCurrentTime } from './utils';
import Loading from './Loading';

export default function App() {
  const {
    //   updateAlarmTime,
    //   updateDisarmStatus,
    //   updateStreakCount,
    //   latitude,
    //   longitude,
    currentTime,
    //   setCurrentTime,
    //   alarm1,
    //   alarm2,
    //   setAlarm1,
    //   setAlarm2,
    //   isDisarmed,
    //   setDisarmStatus,
    //   getDisarmStatus,
    //   distance,
    //   setDistance,
    //   initialAlarmTime,
    //   setInitialAlarmTime,
    //   streak,
    //   setStreak,
    //   getStreak,
    //   getAlarmTime,
  } = useData();

  // const [status, setStatus] = useState('Stick to your goals');
  // const [alarmMessage, setAlarmMessage] = useState('');
  // const [currAlarmTime, setCurrAlarmTime] = useState(alarm1);
  // const [currentAlarm, setCurrentAlarm] = useState(1);
  // // const [active, setActive] = useState(true);
  // // const [dropdown, setDropdown] = useState(false);
  // const [inputHr, setInputHr] = useState(1);
  // const [inputMin, setInputMin] = useState('00');
  // const [inputTod, setInputTod] = useState('AM');
  // const hours: number[] = [1, ...range(2, 12)];
  // const minutes: number[] = ['00', ...range(1, 59).map(n => n < 10 ? '0' + n : n)];

  let clock;
  let interval;
  // let isArmed = (isDisarmed ? 'LOCKED' : 'DISARM');

  // const switchAlarms = () => { // runs after button is pressed.
  //   setCurrentAlarm(() => (currentAlarm === 1 ? 2 : 1));
  // }

  // const handleCurrentTime = () => {
  //   setCurrentTime(() => theCurrentTime());
  // };

  // const statusGenerator = () => { // randomly returns a positive phrase
  // const phrases = [
  //   'Make them proud',
  //   'Keep it up',
  //   'Keep proving you\'ve had enough',
  //   'Keep crushing it!',
  //   'Captain the fuck out this day!',
  //   'Stick to your goals',
  //   'Trust your wiser self',
  //   'Keep going cap',
  // ];
  //   const random = Math.floor(Math.random() * (phrases.length));
  //   return phrases[random];
  // };

  // const handleUpdateAlarm = (e) => {
  //   // let finalInputHour = inputHr;
  //   // let finalInputMinute = inputMin;
  //   // if (inputTod === 'PM') finalInputHour = Number(finalInputHour) + 12;
  //   // if (inputMin[0] == 0) finalInputMinute = finalInputMinute[1];
  //   // console.log(finalInputHour, finalInputMinute, inputTod, ' :vs: ', inputHr, inputMin)
  //   updateAlarmTime({ hour: inputHr, minute: inputMin, tod: inputTod });
  // };

  // // run after progressBar is filled.
  // const handleProgressBar = () => { // enables button to be clicked again and diffuses alarm
  //   if (currentAlarm === 2) {
  //     if (distance < 100) setDistance(() => distance + 5); // remove after testing
  //     if (distance >= 100) setDisarmStatus(() => false);
  //   }
  // };

  // const checkAlarmClock = () => {
  // //   handleProgressBar();
  // //   isActive(alarmTime);
  // //   setAlarmMessage(() => 'Your alarm is set for ' + convert(alarmTime) + '.');
  //   if (currentTime === currentAlarm) {
  // //     setStatus(() => 'Do Better...');
  // //     console.error('Err running the pump: ', err);
  // //     updateStreakCount(0);
  // //     // getStreak();
  //   }
  // };

  // useEffect(() => {
  //   // clock = setInterval(() => handleCurrentTime(), 1000);
  //   interval = setInterval(() => checkAlarmClock(), 1000);
  //   return () => {
  //     // clearInterval(clock);
  //     clearInterval(interval);
  //   };
  // }, [currentTime]);

  // return (!currentTime || !alarmMessage) ? <Spinner /> : (
  return (!currentTime) ? <Loading /> : (

    <AppContainer>
      <Header />
      <TimeDisplay />
      <DisarmButton />
      <Info />
      <EditTime />
    </AppContainer>
  );
}
