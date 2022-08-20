import React from 'react';
import { useData } from '../../Context';
import { } from '../styles/InfoStyles';

// type Props = {}

export default function Info() {
  const {
    streak,
    currentAlarm,
    alarm1,
    alarm2,
    isDisarmed,
    tenSecAfterAlarm1,
    currentPhase,
    longitude,
    latitude,
    distance,
    initialLat,
    initialLon,
  } = useData();

  return (
    <div>
      {`STREAK: ${streak}`}
      <br />
      {`CURRENT ALARM: ${currentAlarm}`}
      <br />
      {`ALARM1: ${alarm1}`}
      <br />
      {`ALARM1.1: ${tenSecAfterAlarm1}`}
      <br />
      {`ALARM2: ${alarm2}`}
      <br />
      {`isDisarmed: ${String(isDisarmed).toUpperCase()}`}
      <br />
      {`PHASE: ${currentPhase}`}
      <br />
      {`DISTANCE: ${distance}`}
      <br />
      {`LON: ${longitude}`}
      <br />
      {`LAT: ${latitude}`}
      <br />
      {`LONINIT: ${initialLon}`}
      <br />
      {`LATINIT: ${initialLat}`}
    </div>
  );
}
