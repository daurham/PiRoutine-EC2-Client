import React from 'react';
import { Form, ProgressBar, Button } from 'react-bootstrap';
import { useData } from '../../Context';

export default function GeoTracker() {
  const { currentAlarm, alarm2, distance } = useData();
  return (
    <div>
      {/* <h3>GeoTracker</h3> */}
      {
      (currentAlarm === alarm2)
      && <ProgressBar now={distance} label={`${distance}%`} />
      }
    </div>
  );
}
