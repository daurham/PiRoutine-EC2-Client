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
      {`PHASE: ${currentPhase}`}
      <br />
      <br />
      {`isDisarmed: ${String(isDisarmed).toUpperCase()}`}
      <br />
      <br />
      {`ALARM1: ${alarm1}`}
      <br />
      {`ALARM2: ${alarm2}`}
    </div>
  );
}
