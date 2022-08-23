import React from 'react';
import { Form, ProgressBar, Button } from 'react-bootstrap';
import { useData } from '../../Context';
// import {  } from '../styles/GeoTrackerStyles';

export default function GeoTracker() {
  const { currentAlarm, alarm2, alarm1, distance } = useData();
  return currentAlarm !== alarm2 ? null : (
    <div>
      <ProgressBar animated variant='info' now={distance} label={`${distance}%`} />
      <br />
    </div>
  );
}
