import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useData } from '../../Context';
import { ButtonContainer, DisarmButtonContainer } from '../styles/DisarmButtonStyles';
import Unlock from './Unlock';

// type Props = {}

export default function DisarmButton() {
  const [lockedDisarm, setLockedDisarm] = useState(false);
  const [inEditMode, setEditMode] = useState(false);
  // const [failedPasscode, setFailedPasscode] = useState(false); // change the button if you don't get the passcode right?
  // const [hideDisarmBtn, setHideDisarmBtn] = useState(false);
  const {
    currentPhase,
    hideDisarmBtn,
    setDisarmStatus,
    setHideDisarmBtn,
    distance,
    failed,
    isDisarmed,
    getDisarmStatus,
    updateDisarmStatus,
    isLocked, // passcode kinda locked
    // lockedDisarm is unavailible type..
  } = useData();

  useEffect(() => {
    if (currentPhase === 1) {
      if (hideDisarmBtn) {
        setHideDisarmBtn(false);
      }
      if (lockedDisarm) {
        setLockedDisarm(false);
      }
    }
    // Unhide in phase 2 when use disarms alarm1
    if (currentPhase === 2 && !failed) {
      // lock if user hasnt traveled
      if (distance < 100) {
        if (hideDisarmBtn) {
          setHideDisarmBtn(false);
        }
        if (!lockedDisarm) {
          setLockedDisarm(true);
        }
      }
      // Unlock when traveled
      if (distance >= 100) {
        if (lockedDisarm) {
          // setHideDisarmBtn(false);
          setLockedDisarm(false);
        }
      }
    }
    // Hide after my alarms
    if (currentPhase === 3 && !hideDisarmBtn) {
      setHideDisarmBtn(true);
    }
  }, [currentPhase, distance])

  const handleDisarm = () => {
    if (!isDisarmed) {
      updateDisarmStatus(!isDisarmed);
    }
  };
  return hideDisarmBtn ? null : (
    <DisarmButtonContainer>
      <ButtonContainer>
        {/* TODO: remove duplicates */}
        {!hideDisarmBtn
          && isLocked
          && lockedDisarm
          && <Button variant="outline-danger" size="lg" onClick={() => setEditMode(true)}>Locked</Button>}
      </ButtonContainer>

      <ButtonContainer>
        {!hideDisarmBtn
          && isLocked
          && !lockedDisarm
          && !isDisarmed
          && <Button variant="outline-secondary" size="lg" onClick={() => setEditMode(true)}>Disarm</Button>}
      </ButtonContainer>

      {inEditMode && <div><br /><Unlock /></div>}

      <ButtonContainer>
        {!hideDisarmBtn
          && lockedDisarm
          && <Button variant="danger" size="lg" onClick={() => console.log('shake the button & tell user to get moving')}>Locked</Button>}
      </ButtonContainer>

      <ButtonContainer>
        {!hideDisarmBtn
          && !isLocked
          && !lockedDisarm
          && !isDisarmed
          && <Button variant="secondary" size="lg" onClick={handleDisarm}>Disarm</Button>}
      </ButtonContainer>

      <ButtonContainer>
        {!hideDisarmBtn
          && !isLocked
          && isDisarmed
          && !lockedDisarm
          && <Button variant="outline-info" size="lg" disabled>Disarmed</Button>}
      </ButtonContainer>
        <br />
    </DisarmButtonContainer>
  );
}
