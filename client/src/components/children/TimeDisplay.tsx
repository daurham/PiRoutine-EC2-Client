import React from 'react';
import { Time, TimeDisplayContainer } from '../styles/TimeDisplayStyles';
import { useData } from '../../Context';

// type Props = {}

export default function TimeDisplay() {
  const { currentTime } = useData();

  return (
    <TimeDisplayContainer>
      <Time>{currentTime}</Time>
    </TimeDisplayContainer>
  );
}
