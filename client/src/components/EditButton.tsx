import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UnlockContainer } from './styles/EditTimeStyles';
import EditModal from './EditModal';
import { TimeObj } from '../../../types';

type Props = {
  skipDate: string | undefined;
  notSignedIn: boolean;
  alarmTime: string | undefined;
  getSkipData: () => Promise<void>;
  updateAlarmData: (args0: TimeObj) => Promise<void>;
  launchUnlockModal: () => void;
};

export default React.memo(({
  skipDate,
  notSignedIn,
  alarmTime,
  getSkipData,
  updateAlarmData,
  launchUnlockModal,
}: Props) => {
  const [showEdit, setShowEdit] = useState(false);
  const closeEditModal = useCallback(() => setShowEdit(false), [setShowEdit]);
  const showEditModal = useCallback(() => setShowEdit(true), [setShowEdit]);

  return (
    <UnlockContainer>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={notSignedIn ? launchUnlockModal : showEditModal}
      >
        {notSignedIn ? 'Edit 🔒' : 'Edit'}
      </Button>

      <EditModal
        showModal={showEdit}
        skipDate={skipDate}
        alarmTime={alarmTime ? alarmTime : ''}
        getSkipData={getSkipData}
        updateAlarmData={updateAlarmData}
        handleCloseModal={closeEditModal}
      />
    </UnlockContainer>
  );
})
