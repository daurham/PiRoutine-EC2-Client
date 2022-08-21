import React from 'react';
import { useData } from '../../Context';
import { Form, Button } from 'react-bootstrap';

export default function Unlock() {
  const {
    isLocked,
    setLock,
    inputPin,
    setInputPin,
    inputStatus,
    setInputStatus,
    inEditMode,
    setEditMode,
  } = useData();
  return isLocked && (
    <div>
      <input placeholder="Passcode" onChange={(e) => { setInputPin(e.target.value); (inputStatus !== 'Submit' ? setInputStatus('Submit') : null) }} />
      <Button variant={inputStatus === 'Submit' ? 'secondary' : 'danger'} onClick={() => (inputPin === '1946' ? setLock(false) : setInputStatus('Invalid'))}>{inputStatus}</Button>
    </div>
  );
}
