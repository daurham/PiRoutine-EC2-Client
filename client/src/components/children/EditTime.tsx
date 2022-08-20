import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useData } from '../../Context';
// import { } from '../styles/EditTimeStyles';
import range from '../utils/range';

// type Props = { va: 2 };

export default function EditTime() {
  const [hour, setHr] = useState(1);
  const [minute, setMin] = useState(0);
  const [tod, setTOD] = useState('AM');
  const { streak, updateAlarmTime, updateStreakCount, updateDisarmStatus } = useData();
  const minuteSelections = [...range(0, 59)].map((n) => (n < 10 ? `0${n}` : n));
  return (
    <div>
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

        <Button onClick={(e) => { e.preventDefault(); updateAlarmTime({ hour, minute, tod }) }}>EditTime</Button>
      </Form>
      <br />
      <Button type="button" onClick={(e) => updateStreakCount(streak + 1)}>➕ Streak</Button>

      <br />
      <Button type="button" onClick={(e) => updateStreakCount(streak - 1)}>➖ Streak</Button>

    </div>
  );
}
