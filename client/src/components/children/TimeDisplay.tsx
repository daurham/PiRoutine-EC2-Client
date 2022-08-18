import React from 'react';
import { theCurrentTime } from '../utils';
import {} from '../styles/TimeDisplayStyles';

// type Props = {}

export default function TimeDisplay() {
  return (
    <h1>{theCurrentTime()}</h1>
  );
}
