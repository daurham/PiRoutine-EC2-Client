import React from 'react';
import { Button } from 'react-bootstrap';
import { useData } from '../../Context';
import {
  InputContainer,
  OutterContainer,
  PasscodeInput,
  UnlockContainer,
} from '../styles/UnlockStyles';

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
  return !isLocked ? null : (
    <UnlockContainer>
      <br />
      <OutterContainer>
        <InputContainer>
          <PasscodeInput placeholder="Passcode" onChange={(e) => { setInputPin(e.target.value); (inputStatus !== 'Submit' ? setInputStatus('Submit') : null) }} />
          <Button type="submit" variant={inputStatus === 'Submit' ? 'outline-info' : 'danger'} onClick={(e) => { e.preventDefault(); (inputPin === '1946' ? setLock(false) : setInputStatus('Invalid')) }}>{inputStatus}</Button>
        </InputContainer>
      </OutterContainer>
    </UnlockContainer>
  );
}
