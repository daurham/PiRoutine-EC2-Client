import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { DisarmDataObj } from '../../../types';
import { ButtonContainer, DisarmButtonContainer } from './styles/DisarmButtonStyles';

type Props = {
  currentPhase: 1 | 2 | 3 | undefined;
  hideDisarmBtn: boolean | undefined;
  setDisarmData: (arg0: DisarmDataObj | ((arg0: DisarmDataObj) => DisarmDataObj)) => void;
  distance: number | undefined;
  hasFailed: boolean | undefined;
  isDisarmed: boolean | undefined;
  currentTime: string | undefined;
  updateDisarmData: (arg0: boolean) => Promise<void>;
  notSignedIn: boolean | undefined;
  showModal: boolean;
  setShowModal: (arg0: boolean) => void;
  inputStatus: string;
  inputPin: string;
  setInputPin: (arg0: string) => void;
  setInputStatus: (arg0: string) => void;
  setLock: (arg0: boolean) => void;
  launchUnlockModal: () => void;
}

export default function DisarmButton({
  currentPhase,
  hideDisarmBtn,
  setDisarmData,
  distance,
  hasFailed,
  isDisarmed,
  updateDisarmData,
  notSignedIn,
  launchUnlockModal,
}: Props) {
  const [isLocked, setIsLocked] = useState(false);
  const [variant, setVariant] = useState<string>('outline-danger');
  const [btnStatus, setBtnStatus] = useState<string>();
  const [clickEvent, setClickEvent] = useState<any>();

  const handleDisarm = () => {
    if (!isDisarmed) {
      updateDisarmData(!isDisarmed);
    }
  };

  useEffect(() => {
    // reguardless of visiblity, lock if not signed in.
    if (notSignedIn) setIsLocked(true);
    // And unlock is signed in
    if (!notSignedIn) setIsLocked(false);

    if (currentPhase === 1) {
      setBtnStatus('Disarm');
      // If hidden, unhide
      if (hideDisarmBtn) setDisarmData((prevState) => ({ ...prevState, hideDisarmBtn: false }));
      // if (isLocked) setIsLocked(false);
      if (notSignedIn) {
        setBtnStatus('Locked 🕐');
        setVariant('outline-danger');
      } else {
        setBtnStatus('Disarm');
        setVariant('outline-secondary');
      }
    }
    
    // Unhide in phase 2 when use disarms alarm1
    if (currentPhase === 2 && !hasFailed && distance) {
      // lock if user hasnt fully traveled
      if (distance < 100) {
        // Unhide
        if (hideDisarmBtn) setDisarmData((prevState) => ({ ...prevState, hideDisarmBtn: false }));
        // set Btn status
        // if (btnStatus !== 'Locked🏃') setBtnStatus('Locked🏃');
        // lock
        if (!isLocked) setIsLocked(true);
      }
      if (notSignedIn) {
        setBtnStatus('Locked ❗');
        setVariant('outline-danger');
      } else {
        setBtnStatus('Locked 🏃');
        setVariant('outline-secondary');
      }

      // Unlock when traveled
      if (distance >= 100) {
        if (!isDisarmed) {
          // unlock
          if (isLocked && !notSignedIn) setIsLocked(false);
          // set Btn status
          if (btnStatus !== 'Disarm') setBtnStatus('Disarm');
        } else {
          // Hide
          if (!hideDisarmBtn) setDisarmData((prevState) => ({ ...prevState, hideDisarmBtn: true }));
        }
      }
    }

    if (currentPhase === 3 && !hideDisarmBtn) {
      // Hide after my alarms
      setDisarmData((prevState) => ({ ...prevState, hideDisarmBtn: true }));
    }
  }, [notSignedIn, currentPhase, isDisarmed, distance]);

  if (hideDisarmBtn) return null;
  if (hasFailed) return null;

  return (
    <DisarmButtonContainer>
      <ButtonContainer>
        <Button
          size="lg"
          variant={variant}
          disabled={notSignedIn ? true : false}
          onClick={notSignedIn ? launchUnlockModal : handleDisarm}
        >
          {btnStatus}
        </Button>
      </ButtonContainer>
      <br />
    </DisarmButtonContainer>
  );
}
        /* For spectators outside disarming hours
{notSignedIn
&& isLocked
&& <Button variant="outline-danger" size="lg" onClick={() => setEditMode(!inEditMode)}>{!inEditMode ? 'Locked' : 'Locked 🕐'}</Button>}

// For anyone not logged in during disarming hours 
{notSignedIn
&& !isLocked
&& !isDisarmed
&& <Button variant={!inEditMode ? 'outline-secondary' : 'outline-danger'} size="lg" onClick={() => setEditMode(!inEditMode)}>{!inEditMode ? 'Disarm' : 'Locked 🔒'}</Button>}
</ButtonContainer>
NOT SIGNED IN ABOVE 

{inEditMode && <UnlockModal
dependancies={unlockDeps}
/>}

SIGNED IN BELOW 
<ButtonContainer>
During run: need to travel more: locked
{!notSignedIn
&& isLocked
&& currentPhase === 2
&& <Button variant="outline-danger" size="lg" onClick={() => console.log('shake the button & tell user to get moving')}>Locked 🔒</Button>}
During run: travel complete: unlocked
{!notSignedIn
&& !isLocked
&& !isDisarmed
&& <Button variant="secondary" size="lg" onClick={handleDisarm}>Disarm</Button>}
During disarm hours: disarmed
{!notSignedIn
&& isDisarmed
&& !isLocked
&& <Button variant="outline-info" size="lg" disabled>Disarmed</Button>} */

