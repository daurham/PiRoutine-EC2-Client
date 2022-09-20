import React from 'react';
import { Time, TimeDisplayContainer } from './styles/TimeDisplayStyles';

type Props = {
  currentTime: string;
};

export default function TimeDisplay({ currentTime }: Props) {
  return (
    <TimeDisplayContainer>
      <Time className="time">{currentTime}</Time>
    </TimeDisplayContainer>
  );
}
