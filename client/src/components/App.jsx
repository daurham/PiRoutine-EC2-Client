import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Spinner from './Spinner';
import css from '../styles/css.css';
import Technology from '../fonts/Technology.ttf';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
import { Form, ProgressBar, Button } from 'react-bootstrap';
import { useData } from './Context';
import range from './Utils/range';
import useGeolocation from "./Utils/useGeolocation";
import convert from './Utils/convert';



const App = () => {
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

  const now = Temporal.Now.plainTimeISO(); // move to context

  const [status, setStatus] = useState('Stick to your goals');
  const [isDisarmed, toggleDisarmed] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState('');
  const [currAlarmTime, setCurrAlarmTime] = useState(convert(alarmTime));
  const [currentAlarm, setCurrentAlarm] = useState(1);
  const [active, setActive] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [inputHr, setInputHr] = useState(1);
  const [inputMin, setInputMin] = useState('00');
  const [inputTod, setInputTod] = useState('AM');
  const hours = [1, ...range(2, 12)];
  const minutes = ['00', ...range(1, 59).map(n => n < 10 ? '0' + n : n)];

  let clock;
  let interval;
  let isArmed = (isDisarmed ? 'LOCKED' : 'DISARM');

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
    } else if (currentAlarm === 1) { // first alarm defused
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
        await axios.put(`/streak/${streak + 1}`); // update the streak val
        getStreak();
        await axios.put(`/defused/${1}`); // update the backend's defused value
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
      console.log(finalInputHour, finalInputMinute, inputTod)
      await axios.put(`/updateAlarm/${finalInputHour}/${finalInputMinute}/${inputTod}`);
      getAlarmTime();
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
    setAlarmMessage(() => "Your alarm is set for " + convert(alarmTime) + ".");
    if (currentTime === convert(alarmTime)) {
      try {
        setStatus(() => 'Do Better...');
        await axios.post('/pi/run');
      } catch (err) {
        console.error('Err running the pump: ', err);
        try {
          await axios.put(`/streak/${0}`);
          getStreak();
        } catch (err) {
          console.error('Err getting streak data from server: ', err);
          setStreak(() => 0);
          console.log('get wet bish!');
        };
      };
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


  return (!currentTime || !alarmMessage) ? <Spinner /> : (

    <AppnContainer className="Technology">

      <Container>
        <Header style={{ fontFamily: 'Righteous' }}>PiRoutine</Header>
      </Container>
      <Container>
        <Header style={{ fontFamily: Technology, color: 'red' }}>
          {currentTime}
        </Header>
      </Container>
      <Container>
        <Subsubheader style={{ fontFamily: 'Righteous' }}>{alarmMessage}</Subsubheader>
      </Container>
      {active ?
        <ButtonContainer>
          <Button size='lg' variant='dark' onClick={handleDisarm}>{isArmed}</Button>
        </ButtonContainer>
        : null}
      {active ?
        (currentAlarm === 2 ?
          <ProgressBar now={distance} label={`${distance}%`} />
          : null)
        : null}
      <Container>
        <ListContainer>
          <Subsubheader>
            {status}
          </Subsubheader>
          <Subsubheader>
            Streak: {streak}
          </Subsubheader>
          <Container>
            {dropdown ?
              <>
                <Form.Select value={inputHr} onChange={handleHr} aria-label="Select alarm hour">
                  {hours.map((hr, index) =>
                    <option key={index} value={hr}>{hr}</option>
                  )}
                </Form.Select>
                <Subheader>:</Subheader>
                <Form.Select onChange={handleMin} aria-label="Select alarm minute">
                  {minutes.map((min, index) =>
                    <option key={index} value={min}>{min}</option>
                  )}
                </Form.Select>
                <Form.Select onChange={handleTod} aria-label="Select alarms time of day">
                  {['AM', 'PM'].map((tod, index) =>
                    <option key={index} value={tod}>{tod}</option>
                  )}
                </Form.Select>
                <Button onClick={handleUpdateAlarm}>Submit</Button>
              </>
              : null}
          </Container>
        </ListContainer>
      </Container>
      {/* <button onClick={failsafe}>failsafe</button> */}
      {/*<Button variant='dark' onClick={demo}>testing</Button>*/}
      {dropdown ?
        <Button variant='secondary-outline' onClick={handleFormDropdown}>Close</Button>
        :
        <Button variant='dark' onClick={handleFormDropdown}>Edit</Button>
      }
    </AppnContainer>
  )
}


export default App;


const Location = styled.h1``;
const Header = styled.h1`
font-size: 4rem;
`;
const Subheader = styled.h2`
font-size: 3rem;
`;
const Subsubheader = styled.h3`
font-size: 2rem;
`;
const InputBar = styled.input`
size: 400%;
`;
const DisarmButton = styled.button`
  background-color: black;
  padding: 10px 60px;
  border-radius: 20px;
  margin: 10px 0px;
  width: 79vw;
  height: 30vh;
  cursor: pointer;
`;
const AppnContainer = styled.div`
  display: block;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ListContainer = styled.div`
  display: block;
  justify-content: center;
`;
const List = styled.ul`
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
