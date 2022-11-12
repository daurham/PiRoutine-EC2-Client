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

export default React.memo(
  ({
    inputPin,
    inputStatus,
    show,
    handleClose,
    setInputPin,
    setInputStatus,
    setLock,
  }: Props) => {
    const [password, setPassword] = useState<string>();

    useEffect(() => {
      getUserPassword(setPassword).catch((err) => console.warn(err));
    }, []);

    return (
      <Modal show={show} onHide={handleClose} size="sm" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Unlock 🔒</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OutterContainer>
            <InputContainer>
              <PasswordInput
                placeholder="Passcode"
                inputMode="numeric"
                pattern="[0-9]*"
                type="password"
                autoFocus
                onChange={(e) => {
                  setInputPin(e.target.value);
                  if (inputStatus !== 'Submit') setInputStatus('Submit');
                }}
              />
              <Button
                type="submit"
                variant={inputStatus === 'Submit' ? 'outline-info' : 'danger'}
                onClick={(e) => {
                  e.preventDefault();
                  if (inputPin === password) {
                    setLock(false);
                  }
                  else {
                    setInputStatus('Invalid');
                  }
                }}
              >
                {inputStatus}
              </Button>
            </InputContainer>
          </OutterContainer>
        </Modal.Body>
      </Modal>
    );
  },
);
