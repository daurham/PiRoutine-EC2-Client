import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useData } from '../../Context';
import { } from '../styles/DisarmButtonStyles';
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
  return (
    <div>

      {!hideDisarmBtn
        && isLocked
        && lockedDisarm
        && <Button variant="danger" size="lg" onClick={() => setEditMode(true)}>Locked</Button>}

      {!hideDisarmBtn
        && isLocked
        && !lockedDisarm
        && !isDisarmed
        && <Button variant={!isDisarmed?"success":'outline-success'} size="lg" onClick={() => setEditMode(true)}>{!isDisarmed ? 'Disarm' : 'Keep goin!'}</Button>}

      {inEditMode && <Unlock />}

      {!hideDisarmBtn
        && lockedDisarm
        && <Button variant="danger" size="lg" onClick={() => console.log('shake the button & tell user to get moving')}>Locked</Button>}

      {!hideDisarmBtn
        && !isLocked
        && !lockedDisarm
        && !isDisarmed
        && <Button variant={!isDisarmed?"success":'outline-success'} size="lg" onClick={handleDisarm}>{!isDisarmed ? 'Disarm' : 'Keep goin!'}</Button>}

      {!hideDisarmBtn
        && !isLocked
        && isDisarmed
        && !lockedDisarm
        && <Button variant="outline-info" size="lg" disabled>Disarmed</Button>}
      <br />
    </div>
  );
}
