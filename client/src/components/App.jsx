import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Spinner from './Spinner';
import css from '../styles/css.css';
// import font from '../styles/font.css';
import Technology from '../fonts/Technology.ttf';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
import { Form, ProgressBar, Button } from 'react-bootstrap';
import { useData } from './Context';
import range from './Utils/range';
import useGeolocation from "./Utils/useGeolocation";
import convert from './Utils/convert';



const App = () => {
  const { latitude, longitude, currentTime, setCurrentTime, alarmTime, setAlarmTime, distance, setDistance, initialAlarmTime, setInitialAlarmTime, streak, setStreak, getStreak, getAlarmTime } = useData(); // works
  // console.log(latitude, time);

  const now = Temporal.Now.plainTimeISO(); // move to context

  const [status, setStatus] = useState('Stick to your goals');
  const [isDisarmed, toggleDisarmed] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState('');
  const [currAlarmTime, setCurrAlarmTime] = useState(convert(alarmTime));
  const [currentAlarm, setCurrentAlarm] = useState(1);
  const [active, setActive] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [inputHr, setInputHr] = useState();
  const [inputMin, setInputMin] = useState(0);
  const [inputTod, setInputTod] = useState('AM');
  const hours = [0, ...range(1, 12)];
  const minutes = [0, ...range(1, 59)];

  let clock;
  let interval;
  let isArmed = (isDisarmed ? 'LOCKED' : 'DISARM');


  const switchAlarms = () => { // runs after button is pressed.
    setCurrentAlarm(() => (currentAlarm === 1 ? 2 : 1));
  }



  const handleCurrentTime = () => {
    setCurrentTime(() => convert(Temporal.Now.plainTimeISO()));
  };


  // identify the current phase:
  // determine if phase is active
  const isActive = (aTime) => {
    if (((now.hour >= aTime.hour - 2) && now.hour < aTime.hour) || // if within a safe hour block or
      (now.hour === aTime.hour && now.minute < aTime.minute) || // if during alarm hour, its within a safe min / sec block
      (now.hour === aTime.hour && now.minute === aTime.minute && now.second < aTime.second)) { // if current time is within the active block.
      // console.log('should open');
      if (!active) {
        setActive(() => true);
      }
    } else {
      // console.log('should close');
      if (active) {
        setActive(() => false);
      }
    }
  };

  const statusGenerator = () => { // randomly returns a positive phrase
    let phrases = ['Make them proud', 'Keep it up', 'Keep proving you\'ve had enough', 'Keep crushing it!', 'Captain the fuck out this day!', 'Stick to your goals', 'Trust your wiser self', 'Keep going cap'];
    let r = Math.floor(Math.random() * (phrases.length));
    // console.log(phrases[r]);
    return phrases[r];
  };


  const handleDisarm = () => {
    if (isDisarmed) {
      return;
    } else {
      if (currentAlarm === 1) { // first alarm defused
        setStatus(() => 'Nice, Now lets get moving!');
        setAlarmTime(() => now.add({ minutes: 7 }));
        switchAlarms();
        toggleDisarmed(() => true);
      } else if (currentAlarm === 2) { // second alarm defused
        setStatus(() => statusGenerator())
        setAlarmTime(() => initialAlarmTime);
        setDistance(() => 0);
        switchAlarms();
        //axios.post('/');

	      	.then(() => getStreak())
	      	.catch(() => {      
			console.log('err?: ', err)
      console.log('Err updating streak data from server, filling in 0 to avoid crash. Fix err though.');
      setStreak(() => 0);
//      axios.post('/err')
//        .catch((err) => console.log('err in sending the error warning: ', err));
    });

//	      .then((res) => {console.log(res.data); setStreak(() => res.data[0].streak)})
		//.catch((err) => console.log('err catching: ', err); // update the streak val.
      }
    }
  };

  const demo = () => { setAlarmTime(() => now.add({ seconds: 10 })) }

  const handleFormDropdown = () => {
    setDropdown(() => (dropdown === true ? false : true));
  };
  const handleHr = (e) => {
    setInputHr(() => Number(e.target.value));
  };
  const handleMin = (e) => {
    setInputMin(() => Number(e.target.value));
  };
  const handleTod = (e) => {
	  //console.log(e.target.value);
    setInputTod(() => e.target.value);
  };

  const handleUpdateAlarm = (e) => {
    let data;
    if (typeof inputHr === 'number' && typeof inputMin === 'number') {
      data = { newAlarm: { h: inputHr, m: inputMin }, oldAlarm: { h: alarmTime.hour, m: alarmTime.minute } };
      if (inputTod === 'PM') {
	      //console.log('tod: ', inputTod);
        data.newAlarm.h = data.newAlarm.h + 12;
      }
      axios.put('/updateAlarm', data)
	    .then((res) => getAlarmTime())
	    .catch((err) => {
  console.log('Err: ', err)
  console.log('Err updating alarmtime data to server. This .PUT request is ran via App.jsx. The new data was: ');
  console.log(data);
  setInitialAlarmTime(() => new Temporal.PlainTime(6, 5).toString());
//  axios.post('/err')
//    .catch((err) => console.log('err in sending the error warning: ', err));
});
    } else {
      alert('Select numbers to update the time.')
      console.log('Niceee bish!');
    }
  };

  // run after progressBar is filled.
  const handleProgressBar = () => { // enables button to be clicked again and diffuses alarm
    if (currentAlarm === 2) {
      if (distance < 100) {
        //setDistance(() => distance + 50); // remove after testing
      }
      if (distance >= 100) {
        toggleDisarmed(() => false);
      }
    }
  };

  const checkAlarmClock = () => {
    handleProgressBar();
    isActive(alarmTime);
    setAlarmMessage(() => "Your alarm is set for " + convert(alarmTime) + ".");
    if (currentTime === convert(alarmTime)) {
      setStatus(() => 'Do Better...');
      axios.post('/pi/run')
	    .catch((err) => console.log('err running the pump: ', err));
      axios.put(`/streak/${streak}/${0}`)
	    .then(() => getStreak())
	    .catch((err) => {
      console.log('err?: ', err)
      console.log('Err getting streak data from server, filling in 0 to avoid crash. Fix err though.');
      setStreak(() => 0);
  //    axios.post('/err')
  //      .catch((err) => console.log('err in sending the error warning: ', err));
    });
	    //.then((res) => { console.log(res.data); setStreak(() => res.data[0].streak) });
      console.log('get wet bish!');
    // later, add a streak for counting times soaked.
    }
  }

//console.log('appside: ', streak);

  useEffect(() => {
    clock = setInterval(() => handleCurrentTime(), 1000);
    interval = setInterval(() => checkAlarmClock(), 1000);
    return () => {
      clearInterval(clock);
      clearInterval(interval);
    }
  }, [currentTime]);

  //useEffect(() => {}, [streak])
  //console.log('distance?: ', distance);

  return (!currentTime || !alarmMessage) ? <Spinner /> : (

    <AppnContainer className="Technology">

      <Container>
        <Header style={{ fontFamily: 'Righteous' }}>PiRoutine</Header>
      </Container>
      <Container>
        <Header style={{ fontFamily: Technology, color: 'red' }}>
          {currentTime}
        </Header>
        {/* <timeCSS>{currentTime}</timeCSS> */}
      </Container>
      <Container>
        <Subsubheader style={{ fontFamily: 'Righteous' }}>{alarmMessage}</Subsubheader>
        {/* <Subheader style={{ fontFamily: 'Righteous' }}>{goal ? goal : null}</Subheader> */}
      </Container>
      {active ?
        <ButtonContainer>
          <Button size='lg' variant='dark' onClick={handleDisarm}>{isArmed}</Button>
          {/* <DisarmButton onClick={handleDisarm}>{isArmed}</DisarmButton> */}
          {/* <DisarmButton onClick={handleDisarm}><HeaderB>{isArmed}</HeaderB></DisarmButton> */}
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
                <Form.Select value={inputMin} onChange={handleMin} aria-label="Select alarm minute">
                  {minutes.map((min, index) =>
                    <option key={index} value={min}>{min}</option>
                  )}
                </Form.Select>
                <Form.Select value={inputTod} onChange={handleTod} aria-label="Select alarms time of day">
                  {['AM', 'PM'].map((tod, index) =>
                    <option key={index} value={tod}>{tod}</option>
                  )}
                </Form.Select>
                <Button onClick={handleUpdateAlarm}>Submit</Button>
              </>
              : null}
          </Container>
          {/* <List> */}
          {/* {routines.length < 2 ? null : <h3 style={{ fontFamily: 'Righteous' }}>Upcoming Routines</h3>} */}
          {/* {routines.length < 2 ? null : (routines.map((t, index) => ( */}
          {/* // <Habit key={index} habit={t} currentTime={currentTime} /> */}
          {/* // )))} */}
          {/* </List> */}
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


const Location = styled.h1`
`;
const Header = styled.h1`
font-size: 4rem;
`;
// const HeaderB = styled.h1`
// font-size: 5rem;
// color: white;
// `;
const Subheader = styled.h2`
font-size: 3rem;
`;
const Subsubheader = styled.h3`
font-size: 2rem;
`;
const InputBar = styled.input`
size: 400%;
`;

// width: 90%;
// height: 100%;
// background-color: rgb(56, 55, 61);
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
// width: 80vw;
// height: 50hw;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  `;
// width: 80vw;
// height: 20rem;
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
