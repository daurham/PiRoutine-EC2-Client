import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Unlock from './Unlock';
import { useData } from '../../Context';
// import { } from '../styles/EditTimeStyles';
import range from '../utils/range';

// type Props = { va: 2 };

export default function EditTime() {
  const [hour, setHr] = useState(1);
  const [minute, setMin] = useState(0);
  const [tod, setTOD] = useState('AM');
  const {
    streak,
    updateAlarmTime,
     updateStreakCount,
     updateDisarmStatus,
     inEditMode,
     setEditMode,
     isLocked,
     } = useData();
  const minuteSelections = [...range(0, 59)].map((n) => (n < 10 ? `0${n}` : n));
  // console.log('input:', inputPin);

  const handleLock = () => { };
  return (
    <div>
      <Button variant={inEditMode ? 'outline-info' : 'outline-secondary'} size="sm" onClick={() => setEditMode(!inEditMode)}>Edit Alarm</Button>
      {inEditMode
        && (
          <div>
            {
              isLocked ? <Unlock />
                : (
                  <Form>
                    <select onChange={(e) => setHr(e.target.value)}>
                      {[...range(1, 12)].map((t, i) => (
                        <option value={t} key={i}>{t}</option>
                      ))}
                    </select>

                    <select onChange={(e) => setMin(e.target.value)}>
                      {minuteSelections.map((t, i) => (
                        <option value={t} key={i}>{t}</option>
                      ))}
                    </select>

                    <select onChange={(e) => setTOD(e.target.value)}>
                      {['AM', 'PM'].map((t, i) => (
                        <option value={t} key={i}>{t}</option>
                      ))}
                    </select>

                    <Button onClick={(e) => { e.preventDefault(); updateAlarmTime({ hour, minute, tod }) }}>Submit</Button>
                  </Form>
                )
            }
          </div>
        )
      }
    </div>
  );
}
