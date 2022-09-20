import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
// import { v4 as uuidv4 } from 'uuid';
import { range } from './utils';
import { skipToday, skipNextDay, removeSkip } from './requests/updateData';
import {
  FormContainer,
  UnlockContainer,
  SelectStyle,
  OptionStyle,
} from './styles/EditTimeStyles';
import { TimeObj } from '../../../types';
// import useCountRenders from './utils/useCountRenders';

// const uuid = (): string => uuidv4(); // Can't use until I get it to stop rerendering.

type Props = {
  showModal: boolean;
  skipDate: string | undefined;
  getSkipData: () => Promise<void>;
  updateAlarmData: (args0: TimeObj) => Promise<void>;
  handleCloseModal: () => void;
};

export default function EditModal({
  showModal,
  skipDate,
  getSkipData,
  updateAlarmData,
  handleCloseModal,
}: Props) {
  const [hour, setHr] = useState<HTMLSelectElement | string>('1');
  const [minute, setMin] = useState<HTMLSelectElement | string>('0');
  const [tod, setTOD] = useState<'AM' | 'PM'>('AM');
  const minuteSelections = [...range(0, 59)].map((n) => (n < 10 ? `0${n}` : n));

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Alarm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormContainer>
          <Form>
            <SelectStyle onChange={(e) => setHr(e.target.value)}>
              {[...range(1, 12)].map((t, i) => (
                <OptionStyle style={{ color: 'white', background: 'transparent' }} value={t} key={i}>{t}</OptionStyle>
              ))}
            </SelectStyle>

            <SelectStyle onChange={(e) => setMin(e.target.value)}>
              {minuteSelections.map((t, i) => (
                <OptionStyle value={t} key={i}>{t}</OptionStyle>
              ))}
            </SelectStyle>

            <SelectStyle onChange={(e) => setTOD(e.target.value)}>
              {['AM', 'PM'].map((t, i) => (
                <OptionStyle value={t} key={i}>{t}</OptionStyle>
              ))}
            </SelectStyle>

            <Button variant="info" className="base-btn" onClick={(e) => { updateAlarmData({ hour, minute, tod }); }}>Submit</Button>
          </Form>
        </FormContainer>
      </Modal.Body>
      <Modal.Footer
        className="edit-alarm"
      >
        <UnlockContainer>
          <h6>{`Skipping: ${skipDate || '-'}`}</h6>
        </UnlockContainer>
        <UnlockContainer>
          <Button size="sm" variant="outline-danger" className="base-btn" onClick={() => skipToday(getSkipData)}>Skip Today</Button>
          {' '}
          <Button size="sm" variant="outline-danger" className="base-btn" onClick={() => skipNextDay(getSkipData)}>Skip Tomorrow</Button>
          {' '}
          <Button size="sm" variant="info" className="base-btn" onClick={() => removeSkip(getSkipData)}>Remove Skip</Button>
        </UnlockContainer>
      </Modal.Footer>
    </Modal>
  );
}
