import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useData } from '../../Context';
import {
  InputContainer,
  OutterContainer,
  PasswordInput,
  UnlockContainer,
} from '../styles/UnlockStyles';

export default function Unlock() {
  const {
    notSignedIn,
    setLock,
    inputPin,
    setInputPin,
    inputStatus,
    setInputStatus,
    inEditMode,
    setEditMode,
  } = useData();

  const [password, setPassword] = useState<string>();

  // Defaults on getting password for User #1
  const getUserPassword = async () => {
    try {
      const { data } = await axios.get('/get-user-info');
      let { password_ } = data[0];
      setPassword(() => password_);
    } catch (err) {
      console.error('Erro getting User Info: ', err);
      setPassword(() => '1234');
    }
  };
  
  useEffect(()=> {
    getUserPassword();
  }, []);

  return !notSignedIn ? null : (
    <UnlockContainer>
      <br />
      <OutterContainer>
        <InputContainer>
          <PasswordInput placeholder="Passcode" inputMode="numeric" pattern="[0-9]*" type="password" onChange={(e) => { setInputPin(e.target.value); (inputStatus !== 'Submit' ? setInputStatus('Submit') : null) }} />
          <Button type="submit" variant={inputStatus === 'Submit' ? 'outline-info' : 'danger'} onClick={(e) => { e.preventDefault(); (inputPin === password ? setLock(false) : setInputStatus('Invalid')) }}>{inputStatus}</Button>
        </InputContainer>
      </OutterContainer>
    </UnlockContainer>
  );
}
