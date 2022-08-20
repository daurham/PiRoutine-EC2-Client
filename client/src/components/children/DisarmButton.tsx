import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useData } from '../../Context';
import { } from '../styles/DisarmButtonStyles';

// type Props = {}

export default function DisarmButton() {
  const [locked, setLocked] = useState(false);
  // const [failed, setFailed] = useState(false);
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
  } = useData();

  useEffect(() => {
    if (currentPhase === 1) {
      if (hideDisarmBtn) {
        setHideDisarmBtn(false);
      }
      if (locked) {
        setLocked(false);
      }
    }
    // Unhide in phase 2 when use disarms alarm1
    if (currentPhase === 2 && !failed) {
      // lock if user hasnt traveled
      if (distance < 100) {
        if (hideDisarmBtn) {
          setHideDisarmBtn(false);
        }
        if (!locked) {
          setLocked(true);
        }
      }
      // Unlock when traveled
      if (distance >= 100) {
        if (locked) {
          // setHideDisarmBtn(false);
          setLocked(false);
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
        && locked
        && <Button variant="danger" size="lg" onClick={() => console.log('shake the button & tell user to get moving')}>{'LOCKED'}</Button>}

      {!hideDisarmBtn
        && !locked
        && !isDisarmed
        && <Button variant="success" size="lg" onClick={handleDisarm}>{!isDisarmed ? 'Disarm' : 'Ayyoo!'}</Button>}

      {!hideDisarmBtn
        && isDisarmed
        && !locked
        && <Button variant="outline-info" size="lg" disabled>Disarmed</Button>}
      <br />
      {/* <button type="button" onClick={() => setDisarmStatus(!isDisarmed)}>Disarm Toggle</button> */}
      {/* <button type="button" onClick={() => getDisarmStatus()}>Disarm ToggleDB</button> */}
      {/* <button type="button" onClick={() => updateDisarmStatus(!isDisarmed)}>Disarm ToggleDB_PATCH</button> */}
    </div>
  );
}
