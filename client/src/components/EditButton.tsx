import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { UnlockContainer } from './styles/EditTimeStyles';
import EditModal from './EditModal';
import { TimeObj } from '../../../types';

type Props = {
  skipDate: string | undefined;
  notSignedIn: boolean;
  getSkipData: () => Promise<void>;
  updateAlarmData: (args0: TimeObj) => Promise<void>;
  launchUnlockModal: () => void;
};

export default function EditButton({
  skipDate,
  notSignedIn,
  getSkipData,
  updateAlarmData,
  launchUnlockModal,
}: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const closeEditModal = () => setShowEdit(false);
  const showEditModal = () => setShowEdit(true);

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
        getSkipData={getSkipData}
        updateAlarmData={updateAlarmData}
        handleCloseModal={closeEditModal}
      />
    </UnlockContainer>
  );
}
