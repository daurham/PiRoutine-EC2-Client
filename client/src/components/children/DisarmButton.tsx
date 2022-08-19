import React from 'react';
import { useData } from '../../Context';
import { } from '../styles/DisarmButtonStyles';

// type Props = {}

export default function DisarmButton() {
  const { setDisarmStatus, isDisarmed, getDisarmStatus, updateDisarmStatus } = useData();
  return (
    <div>
      <button type="button" onClick={() => setDisarmStatus(!isDisarmed)}>Disarm Toggle</button>
      <button type="button" onClick={() => getDisarmStatus()}>Disarm ToggleDB</button>
      <button type="button" onClick={() => updateDisarmStatus(!isDisarmed)}>Disarm ToggleDB_PATCH</button>
    </div>
  );
}
