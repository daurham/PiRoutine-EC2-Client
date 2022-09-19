import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { getUserPassword } from './requests/getData';
import {
  InputContainer,
  OutterContainer,
  PasswordInput,
} from './styles/UnlockStyles';

type Props = {
  handleClose: () => void;
  show: boolean;
  inputStatus: string;
  inputPin: string;
  setInputPin: (arg0: string) => void;
  setInputStatus: (arg0: string) => void;
  setLock: (arg0: boolean) => void;
};

export default function UnlockModal({
  inputPin,
  inputStatus,
  show,
  handleClose,
  setInputPin,
  setInputStatus,
  setLock,
}: Props) {

  const [password, setPassword] = useState<string>();

  useEffect(() => {
    getUserPassword(setPassword);
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="sm"
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Unlock 🔒 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OutterContainer>
          <InputContainer>
            <PasswordInput
              placeholder="Passcode"
              inputMode="numeric"
              pattern="[0-9]*"
              type="password"
              onChange={(e) => {
                setInputPin(e.target.value);
                (inputStatus !== 'Submit' ? setInputStatus('Submit') : null)
              }}
            />
            <Button
              type="submit"
              variant={inputStatus === 'Submit' ? 'outline-info' : 'danger'}
              onClick={(e) => {
                e.preventDefault();
                (inputPin === password
                  ? setLock(false)
                  : setInputStatus('Invalid'))
              }}>
              {inputStatus}
            </Button>
          </InputContainer>
        </OutterContainer>
      </Modal.Body>
    </Modal>
  );
}
