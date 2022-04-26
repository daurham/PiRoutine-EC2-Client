import React, { useState, useEffect } from 'react';
// import { ProgressBar } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import useGeolocation from "./useGeolocation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
import { ContextExclusionPlugin } from 'webpack';
// Date.prototype.toTemporalInstant = toTemporalInstant;
// let d = new Date().toTemporalInstant();
// const now = Temporal.Now.plainDateTimeISO(); //2022-04-02T19:50:31.137231135
// const now = Temporal.Now.plainTimeISO(); //19:50:14.593214591
// const now = Temporal.Now.zonedDateTimeISO(); //2022-04-02T19:50:44.010244008-07:00[America/Phoenix]
const now = Temporal.Now.plainTimeISO(); //
const alarmTime = new Temporal.PlainTime(6, 5);
console.log(now.toString().slice(0, 8));
console.log(alarmTime.hour);
const activateTime = alarmTime.subtract({ hours: 1});
console.log(activateTime.toString());
const activeTime2 = alarmTime.add({ minutes: 7 });
console.log(activeTime2.toString());
console.log(alarmTime.toString());
// console.log()
console.log(now.toString().slice(0, 8));
let tod = (now.hour > 11 ? 'PM' : 'AM');
let hr = (now.hour > 12 ? now.hour % 12 : now.hour);
let time = `${hr}:${now.minute}:${now.second} ${tod}`
console.log('time:', time); // 20
let at = now.add({ hours: 10 }); //
// if (now.hour === 6 && now.minute)

console.log(at.hour); //6
const nowLegacy = new Date().toLocaleTimeString('en-US', { hour12: true })

console.log(nowLegacy)
console.log(nowLegacy === time);
export default function GeolocationComponent({distance}) {


  // Date.prototype.toTemporalInstant = toTemporalInstant;
  // let d = new Date().toTemporalInstant();
  // console.log(d);

  // const {
  //   loading,
  //   error,
  //   data: { latitude, longitude },
  // } = useGeolocation();
  // let distance = 100;

  // const [changeLat, getChangeLat] = useState(0);
  // const [changeLon, getChangeLon] = useState(0);
  // const [initialLat, setInitialLat] = useState(latitude);
  // const [initialLon, setInitialLon] = useState(longitude);
  // const [once, setOnce] = useState(false);

  // if (!once && latitude && longitude) {
  //   setInitialLat(() => latitude);
  //   setInitialLon(() => longitude);
  //   setOnce(() => true);
  // }
  // const dConvert = (input) => Math.floor(((input - 0) * 100) / (.003 - 0));

  // let dif = (c, l, i, cb, ccb) => {
  //   if (i !== l) {
  //     if (l === undefined) { console.log('not yet...', l) } else {
  //       let v = c + Math.abs(Math.abs(i) - Math.abs(l));
  //       ccb(() => v);
  //       cb(() => l);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   dif(changeLat, latitude, initialLat, setInitialLat, getChangeLat);
  //   dif(changeLon, longitude, initialLon, setInitialLon, getChangeLon);
  //   distance = dConvert(changeLat);
  // }, [latitude]);

  // if (changeLat > 0.003) { enableButton(() => true) }

  // <div>Loading: {loading.toString()}</div>
  // <div>Error: {error?.message}</div>
  // <div>
  // </div>
  // <div>~Change In Lon:{changeLon}~</div>
  // <div>~Change In Lat:{changeLat}~</div>
  return (
    <ProgressBar isChild={true} now={distance} label={`${distance}%`} />
  )
}