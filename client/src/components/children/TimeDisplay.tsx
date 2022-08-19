import React from 'react';
import { } from '../styles/TimeDisplayStyles';
import { useData } from '../../Context';

// type Props = {}

export default function TimeDisplay() {
  const { currentTime } = useData();

  return (
    <h1 style={{ color: 'red' }}>{currentTime}</h1>
  );
}
