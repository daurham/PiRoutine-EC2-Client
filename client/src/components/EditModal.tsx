import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { range } from './utils';
import { FormContainer, UnlockContainer, SelectStyle, OptionStyle } from './styles/EditTimeStyles';
import { TimeObj } from '../../../types';
import { skipToday, skipNextDay, removeSkip } from './requests/updateData';

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
  const [tod, setTOD] = useState<string>('AM');

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

            <Button variant="info" style={{ 'verticalAlign': 'baseline' }} onClick={(e) => { e.preventDefault(); updateAlarmData({ hour, minute, tod }); }}>Submit</Button>
          </Form>
        </FormContainer>
      </Modal.Body>
      <Modal.Footer
        className="edit-alarm"
      >
        <UnlockContainer>
          <h6>{`Skipping: ${skipDate}`}</h6>
        </UnlockContainer>
        <UnlockContainer>
          <Button size="sm" variant="outline-danger" style={{ 'verticalAlign': 'baseline' }} onClick={() => skipToday(getSkipData)}>Skip Today</Button>
          {' '}
          <Button size="sm" variant="outline-danger" style={{ 'verticalAlign': 'baseline' }} onClick={() => skipNextDay(getSkipData)}>Skip Tomorrow</Button>
          {' '}
          <Button size="sm" variant="info" style={{ 'verticalAlign': 'baseline' }} onClick={() => removeSkip(getSkipData)}>Remove Skip</Button>
        </UnlockContainer>
      </Modal.Footer>
    </Modal>
  );
}
