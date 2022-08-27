import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useData } from '../../Context';
import { ButtonContainer, DisarmButtonContainer } from '../styles/DisarmButtonStyles';
import Unlock from './Unlock';

// type Props = {}

export default function DisarmButton() {
  const [isLocked, setIsLocked] = useState(false);
  const [inEditMode, setEditMode] = useState(false);

  const {
    currentPhase,
    hideDisarmBtn,
    setHideDisarmBtn,
    distance,
    failed,
    isDisarmed,
    setDisarmTime1,
    currentTime,
    updateDisarmStatus,
    notSignedIn,
  } = useData();

  const collectDisarmData = () => {
    if (currentPhase === 1) {
      setDisarmTime1(currentTime);
    }
    if (currentPhase === 2) {
      setDisarmTime1(currentTime);
    }
  };

  const handleDisarm = () => {
    if (!isDisarmed) {
      updateDisarmStatus(!isDisarmed);
      collectDisarmData();
    }
  };

  useEffect(() => {
    if (currentPhase === 1) {
      if (hideDisarmBtn) setHideDisarmBtn(false);
      if (isLocked) setIsLocked(false);
    }

    // Unhide in phase 2 when use disarms alarm1
    if (currentPhase === 2 && !failed) {
      // lock if user hasnt traveled
      if (distance < 100) {
        if (hideDisarmBtn) setHideDisarmBtn(false);

        if (!isLocked) setIsLocked(true);
      }

      // Unlock when traveled
      if (distance >= 100) {
        if (isLocked) setIsLocked(false);
      }
    }

    // Hide after my alarms
    if (currentPhase === 3 && !hideDisarmBtn) {
      setHideDisarmBtn(true);
    }
  }, [currentPhase, distance])

  if (failed) return null;

  return hideDisarmBtn ? null : (
    <DisarmButtonContainer>
      <ButtonContainer>
        {/* For spectators outside disarming hours */}
        {notSignedIn
          && isLocked
          && <Button variant="outline-danger" size="lg" onClick={() => setEditMode(!inEditMode)}>{!inEditMode ? 'Locked' : 'Locked 🕐'}</Button>}

        {/* For anyone not logged in during disarming hours */}
        {notSignedIn
          && !isLocked
          && !isDisarmed
          && <Button variant={!inEditMode ? 'outline-secondary' : 'outline-danger'} size="lg" onClick={() => setEditMode(!inEditMode)}>{!inEditMode ? 'Disarm' : 'Locked 🔒'}</Button>}
      </ButtonContainer>
      {/* NOT SIGNED IN ABOVE */}

      {inEditMode && <div><br /><Unlock /></div>}

      {/* SIGNED IN BELOW */}
      <ButtonContainer>
        {/* During run: need to travel more: locked */}
        {!notSignedIn
          && isLocked
          && currentPhase === 2
          && <Button variant="outline-danger" size="lg" onClick={() => console.log('shake the button & tell user to get moving')}>Locked 🔒</Button>}
        {/* During run: travel complete: unlocked */}
        {!notSignedIn
          && !isLocked
          && !isDisarmed
          && <Button variant="secondary" size="lg" onClick={handleDisarm}>Disarm</Button>}
        {/* During disarm hours: disarmed */}
        {!notSignedIn
          && isDisarmed
          && !isLocked
          && <Button variant="outline-info" size="lg" disabled>Disarmed</Button>}

      </ButtonContainer>
      <br />
    </DisarmButtonContainer>
  );
}
