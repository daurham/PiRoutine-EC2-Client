import React, { useState } from 'react';
import { Button } from 'react-bootstrap/lib/InputGroup';
import { useData } from '../../Context';
import { } from '../styles/EditTimeStyles';

// type Props = { va: 2 };

export default function EditTime() {
  const [hour, setHr] = useState();
  const [minute, setMin] = useState();
  const [tod, setTOD] = useState();
  const { streak, updateAlarmTime, updateStreakCount, updateDisarmStatus } = useData();
  return (
    <div>
      <form>
        <input type="number" onChange={(e) => setHr(e.target.value)} />
        <input type="number" onChange={(e) => setMin(e.target.value)} />
        <select onChange={(e) => setTOD(e.target.value)}>
          {['AM', 'PM'].map((t, i) => (
            <option value={t} key={i}>{t}</option>
          ))}
        </select>
        <button onClick={(e) => { e.preventDefault(); updateAlarmTime({ hour, minute, tod }) }}>EditTime</button>
      </form>
      <br />
      <button type="button" onClick={(e) => updateStreakCount(streak + 1)}>➕ Streak</button>

      <br />
      <button type="button" onClick={(e) => updateStreakCount(streak - 1)}>➖ Streak</button>

    </div>
  );
}
