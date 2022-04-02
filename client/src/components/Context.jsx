import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import App from './App';
import Spinner from './Spinner';
import useGeolocation from "./useGeolocation";



const Context = () => {
  const {
    loading,
    error,
    data: { latitude, longitude },
  } = useGeolocation();
  const [time, setTime] = useState();
  const [changeLat, getChangeLat] = useState(0);
  const [changeLon, getChangeLon] = useState(0);
  const [initialLat, setInitialLat] = useState(latitude);
  const [initialLon, setInitialLon] = useState(longitude);
  const [once, setOnce] = useState(false);
  const [distance, updateDistance] = useState(0);
  // let distance = 0;

  if (!once && latitude && longitude) {
    setInitialLat(() => latitude);
    setInitialLon(() => longitude);
    setOnce(() => true);
  }
  const dConvert = (input) => Math.floor(((input - 0) * 100) / (.003 - 0));

  let dif = (c, l, i, cb, ccb) => {
    if (i !== l) {
      if (l === undefined) { console.log('not yet...', l) } else {
        let v = c + Math.abs(Math.abs(i) - Math.abs(l));
        ccb(() => v);
        cb(() => l);
      }
    }
  }


  // get alarm data
  const getAlarmTime = () => {
    axios.get('/alarm')
      .then((res) => { setTime(() => res.data) })
      .catch((err) => console.log('err?: ', err));
  };
  // uncomment:
  // if (!time) {
  //   getAlarmTime();
  // }

  // useEffect(() => {
  // }, [time,])

  useEffect(() => {
    dif(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
    dif(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
    updateDistance(() => dConvert(changeLat));
  }, [latitude]);

  // // delete testing code:
  if (!time) {
    setTime(() => [
      { 'time_': '6:05:00 AM', 'habit': 'Wake Up' },
      { 'time_': '6:12:00 AM', 'habit': 'Run' }
    ]);
  }

  return !time ? <Spinner /> : (
    <App times={time} lat={latitude} distance={distance} getTime={getAlarmTime} />
  );
};

export default Context;