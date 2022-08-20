import React, { useState } from 'react';
import { useData } from '../../Context';
import range from '../utils/range';

export default function TEST() {
  const {
    streak,
    currentAlarm,
    alarm1,
    alarm2,
    isDisarmed,
    tenSecAfterAlarm1,
    currentPhase,
    setDisarmStatus,
    getDisarmStatus,
    updateDisarmStatus,
    updateAlarmTime,
    updateStreakCount,
  } = useData();
  const [hour, setHr] = useState();
  const [minute, setMin] = useState();
  const [tod, setTOD] = useState();
  const minuteSelections = [...range(0, 59)].map((n) => (n < 10 ? `0${n}` : n));

  return (
    <div>
      <div>
        <button type="button" onClick={() => setDisarmStatus(!isDisarmed)}>Disarm Toggle</button>
        <button type="button" onClick={() => getDisarmStatus()}>Disarm ToggleDB</button>
        <button type="button" onClick={() => updateDisarmStatus(!isDisarmed)}>Disarm ToggleDB_PATCH</button>
      </div>
      {`STREAK: ${streak}`}
      <br />
      {`CURRENT ALARM: ${currentAlarm}`}
      <br />
      {`ALARM1: ${alarm1}`}
      <br />
      {`ALARM1.1: ${tenSecAfterAlarm1}`}
      <br />
      {`ALARM2: ${alarm2}`}
      <br />
      {`isDisarmed: ${String(isDisarmed).toUpperCase()}`}
      <br />
      {`PHASE: ${currentPhase}`}
      <div>
        <form>
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

          <button onClick={(e) => { e.preventDefault(); updateAlarmTime({ hour, minute, tod }) }}>EditTime</button>
        </form>

        <br />
        <button type="button" onClick={(e) => updateStreakCount(streak + 1)}>➕ Streak</button>
        <br />
        <button type="button" onClick={(e) => updateStreakCount(streak - 1)}>➖ Streak</button>

      </div>
    </div>
  );
}
