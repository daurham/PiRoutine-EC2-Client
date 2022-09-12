import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button, ModalBody } from 'react-bootstrap';
import { useData } from '../../Context';
import {
  InputContainer,
  OutterContainer,
  PasswordInput,
  UnlockContainer,
} from '../styles/UnlockStyles';

type Props = {
  handleClose: Function;
  show: boolean;
};

export default function Unlock({ handleClose, show }: Props) {
  const {
    setLock,
    inputPin,
    setInputPin,
    inputStatus,
    setInputStatus,
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

  useEffect(() => {
    getUserPassword();
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          🔒 Unlock
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OutterContainer>
          <InputContainer>
            <PasswordInput placeholder="Passcode" inputMode="numeric" pattern="[0-9]*" type="password" onChange={(e) => { setInputPin(e.target.value); (inputStatus !== 'Submit' ? setInputStatus('Submit') : null) }} />
            <Button type="submit" variant={inputStatus === 'Submit' ? 'outline-info' : 'danger'} onClick={(e) => { e.preventDefault(); (inputPin === password ? setLock(false) : setInputStatus('Invalid')) }}>{inputStatus}</Button>
          </InputContainer>
        </OutterContainer>
      </Modal.Body>
    </Modal>
  );
}
