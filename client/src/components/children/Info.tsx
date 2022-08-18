import React from 'react';
import { useData } from '../../Context';
import { } from '../styles/InfoStyles';

// type Props = {}

export default function Info() {
  const {
    streak,
    currentAlarm,
  } = useData();

  return (
    <div>
      {`STREAK: ${streak}`}
      <br />
      {`ALARM: ${currentAlarm}`}
    </div>
  );
}
