import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import useGeolocation from "./useGeolocation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
import { ContextExclusionPlugin } from 'webpack';

const now = Temporal.Now.plainTimeISO();
const alarmTime = new Temporal.PlainTime(6, 5);
const activateTime = alarmTime.subtract({ hours: 1 });
const activeTime2 = alarmTime.add({ minutes: 7 });
let tod = (now.hour > 11 ? 'PM' : 'AM');
let hr = (now.hour > 12 ? now.hour % 12 : now.hour);
let time = `${hr}:${now.minute}:${now.second} ${tod}`
let at = now.add({ hours: 10 });
const nowLegacy = new Date().toLocaleTimeString('en-US', { hour12: true })

export default function GeolocationComponent({ distance }) {
  return (
    <ProgressBar isChild={true} now={distance} label={`${distance}%`} />
  )
}