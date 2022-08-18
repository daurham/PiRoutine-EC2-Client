// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { Form, ProgressBar, Button } from 'react-bootstrap';
// import Spinner from './utils/Spinner';
// import {
//   AppnContainer,
// } from './styles/AppStyles';
// // import css from '../styles/css.css';=ation';
// import { useData } from '../Context';
// import range from './utils/range';
// import convert from './utils/convert';
// import EditTime from './children/EditTime';
// import DisarmButton from './children/DisarmButton';
// import Header from './children/Header';
// import Info from './children/Info';
// import TimeDisplay from './children/TimeDisplay';

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

  if (isDisarmed === undefined) {
    toggleDisarmed(false)
    // socket.emit('get-defuse');
  }
  // useEffect(() => {
  //   // socket.on('got-defuse-value', (value) => {
  //     console.log('updated defuse:', value);
  //     toggleDisarmed(value)
  //   });

  //   socket.on('updated-defuse-value', (value) => {
  //     console.log('updated defuse:', value);
  //     toggleDisarmed(value)
  //   });
  //   return () => {
  //     socket.off('got-defuse-value');
  //     socket.off('updated-defuse-value');
  //   }
  // });

  const switchAlarms = () => { // runs after button is pressed.
    setCurrentAlarm(() => (currentAlarm === 1 ? 2 : 1));
  }

  const handleCurrentTime = () => {
    setCurrentTime(() => convert(Temporal.Now.plainTimeISO()));
  };

  const isActive = (aTime) => {
    if (((now.hour >= aTime.hour - 2) && now.hour < aTime.hour) || // if within a safe hour block or
      (now.hour === aTime.hour && now.minute < aTime.minute) || // if during alarm hour, its within a safe min / sec block
      (now.hour === aTime.hour && now.minute === aTime.minute && now.second < aTime.second)) { // if current time is within the active block.
      if (!active) {
        setActive(() => true);
      }
    } else {
      if (active) {
        setActive(() => false);
      }
    }
  };

  const statusGenerator = () => { // randomly returns a positive phrase
    let phrases = ['Make them proud', 'Keep it up', 'Keep proving you\'ve had enough', 'Keep crushing it!', 'Captain the fuck out this day!', 'Stick to your goals', 'Trust your wiser self', 'Keep going cap'];
    let r = Math.floor(Math.random() * (phrases.length));
    return phrases[r];
  };

  const handleDisarm = async () => {
    if (isDisarmed) {
      return;
    }
    if (currentAlarm === 1) { // first alarm defused
      setStatus(() => 'Nice, Now lets get moving!');
      console.log(now);
      setAlarmTime(() => now.add({ minutes: 7 }));
      console.log(now);
      switchAlarms();
      toggleDisarmed(() => true);
    } else if (currentAlarm === 2) { // second alarm defused
      try {
        setStatus(() => statusGenerator());
        setAlarmTime(() => initialAlarmTime);
        setDistance(() => 0);
        switchAlarms();
        updateStreakCount(streak + 1);
        // await axios.patch(`/update-streak-count/${streak + 1}`); // update the streak val
        // getStreak();
        updateDisarmStatus(!isDisarmed);
        // await axios.patch(`/update-disarm-status/${1}`); // update the backend's defused value
      } catch (err) {
        console.error('Err updating streak data from server', err);
        setStreak(() => 0);
      };
    }
  };

  const demo = () => { setAlarmTime(() => now.add({ seconds: 10 })) }

  const handleFormDropdown = () => setDropdown(() => (dropdown === true ? false : true));
  const handleHr = e => setInputHr(() => e.target.value);
  const handleMin = e => setInputMin(() => e.target.value);
  const handleTod = e => setInputTod(() => { console.log(e.target.value); return e.target.value });

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
    };
    // } else {
    // alert('Select numbers to update the time.');
    // console.log('Niceee bish!');
    // }
  };

  // run after progressBar is filled.
  const handleProgressBar = () => { // enables button to be clicked again and diffuses alarm
    if (currentAlarm === 2) {
      if (distance < 100) setDistance(() => distance + 5); // remove after testing
      if (distance >= 100) toggleDisarmed(() => false);
    }
  };

  const checkAlarmClock = async () => {
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
