import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { DisarmDataObj } from '../../../types';
import { ButtonContainer, DisarmButtonContainer } from './styles/DisarmButtonStyles';

type Props = {
  currentPhase: 1 | 2 | 3 | undefined;
  hideDisarmBtn: boolean | undefined;
  currentTime: string;
  setDisarmData: (arg0: DisarmDataObj | ((arg0: DisarmDataObj) => DisarmDataObj)) => void;
  distance: number | undefined;
  hasFailed: boolean | undefined;
  isDisarmed: boolean | undefined;
  updateDisarmData: (arg0: boolean) => Promise<void>;
  notSignedIn: boolean | undefined;
  launchUnlockModal: () => void;
};

export default function DisarmButton({
  currentPhase,
  currentTime,
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
  const [btnStatus, setBtnStatus] = useState<string>('Disarm');
  const handleDisarm = () => {
    if (!isDisarmed) {
      updateDisarmData(!isDisarmed)
        .catch(console.warn);
    }
  };

  useEffect(() => {
    // Lock if disarmed. (Prevents extra clicks)
    if (isDisarmed && !notSignedIn && !isLocked) setIsLocked(true);

    if (currentPhase === 1) {
      // If hidden, unhide
      if (hideDisarmBtn) setDisarmData((prevS) => ({ ...prevS, hideDisarmBtn: false }));

      if (notSignedIn) {
        if (isDisarmed && btnStatus !== 'Disarmed') setBtnStatus('Disarmed');
        if (!isDisarmed && btnStatus !== 'Disarm') setBtnStatus('Disarm');
        if (variant !== 'outline-danger') setVariant('outline-danger');
      } else {
        // Unlock if signedIn & armed & locked
        if (!isDisarmed && isLocked) setIsLocked(false);
        if (isDisarmed && btnStatus !== 'Disarmed') setBtnStatus('Disarmed');
        if (!isDisarmed && btnStatus !== 'Disarm') setBtnStatus('Disarm');
        if (variant !== 'outline-secondary') setVariant('outline-secondary');
      }
    }

    if (currentPhase === 2 && typeof distance === 'number') {
      if (distance < 100) {
        // While NOT Signed In

        if (notSignedIn) {
          if (isDisarmed && btnStatus !== 'Disarmed') setBtnStatus('Disarmed');
          if (!isDisarmed && btnStatus !== 'Locked ❗') setBtnStatus('Locked ❗');
          if (variant !== 'outline-danger') setVariant('outline-danger');
        } else {
          // While Signed In

          // Lock if logged in & running
          if (!isLocked) setIsLocked(true);
          if (isDisarmed && btnStatus !== 'Disarmed') setBtnStatus('Disarmed');
          if (!isDisarmed && btnStatus !== 'Locked 🏃') setBtnStatus('Locked 🏃');

          // Change the DisarmButton Variant based on distance, if logged in & not disarmed.
          if (!isDisarmed && distance <= 30) {
            if (variant !== 'outline-danger') setVariant('outline-danger');
          }
          if (!isDisarmed && distance > 30 && distance <= 75) {
            if (variant !== 'outline-warning') setVariant('outline-warning');
          }
          if (!isDisarmed && distance > 75 && distance < 100) {
            if (variant !== 'outline-secondary') setVariant('outline-secondary');
          }
        }
      }

      // When Finished Traveling
      if (distance >= 100) {
        // When Disarmed

        if (isDisarmed) {
          if (btnStatus !== 'Disarmed') setBtnStatus('Disarmed');
        } else {
          if (isLocked) setIsLocked(false);
          if (btnStatus !== 'Disarm') setBtnStatus('Disarm');
          if (variant !== 'outline-light') setVariant('outline-light');
        }
      }
    }

    if (currentPhase === 3 && !hideDisarmBtn) {
      // Hide after my alarms
      if (!hideDisarmBtn) setDisarmData((prevS) => ({ ...prevS, hideDisarmBtn: true }));
    }
  }, [currentTime]);

  if (hideDisarmBtn) return null;
  if (hasFailed) return null;

  return (
    <DisarmButtonContainer>
      <ButtonContainer>
        <Button
          size="lg"
          variant={variant}
          disabled={isLocked}
          onClick={notSignedIn ? launchUnlockModal : handleDisarm}
        >
          {btnStatus}
        </Button>
      </ButtonContainer>
      <br />
    </DisarmButtonContainer>
  );
}
