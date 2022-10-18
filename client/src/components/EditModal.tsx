import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { getHour, getMinute, getTOD, range } from './utils';
import { skipToday, skipNextDay, removeSkip } from './requests/updateData';
import {
  FormContainer,
  UnlockContainer,
  SelectStyle,
  OptionStyle,
} from './styles/EditTimeStyles';
import { TimeObj } from '../../../types';

const minuteSelections = [...range(0, 59)].map((n) => (n < 10 ? `0${n}` : n));

type Props = {
  showModal: boolean;
  skipDate: string | undefined;
  alarmTime: string;
  getSkipData: () => Promise<void>;
  updateAlarmData: (args0: TimeObj) => Promise<void>;
  handleCloseModal: () => void;
};

export default React.memo(({
  showModal,
  skipDate,
  alarmTime,
  getSkipData,
  updateAlarmData,
  handleCloseModal,
}: Props) => {
  const [hour, setHr] = useState<HTMLSelectElement | string>(String(getHour(alarmTime)));
  const [minute, setMin] = useState<HTMLSelectElement | string>(String(getMinute(alarmTime)));
  const [tod, setTOD] = useState(getTOD(alarmTime));

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
            <SelectStyle
              defaultValue={String(getHour(alarmTime))}
              onChange={(e) => setHr(e.target.value)}
            >
              {[...range(1, 12)].map((t, i) => (
                <OptionStyle style={{ color: 'white', background: 'transparent' }} value={t} key={i}>{t}</OptionStyle>
              ))}
            </SelectStyle>

            <SelectStyle
              defaultValue={String(getMinute(alarmTime))}
              onChange={(e) => setMin(e.target.value)}
            >
              {minuteSelections.map((t, i) => (
                <OptionStyle value={t} key={i}>{t}</OptionStyle>
              ))}
            </SelectStyle>

            <SelectStyle
              defaultValue={String(getTOD(alarmTime))}
                  // @ts-ignore
              onChange={(e) => setTOD(e.target.value!)}
            >
              {['AM', 'PM'].map((t, i) => (
                <OptionStyle value={t} key={i}>{t}</OptionStyle>
              ))}
            </SelectStyle>

            <Button
              variant="info"
              className="base-btn"
              onClick={() => {
                updateAlarmData({ hour, minute, tod }).catch(console.error);
                handleCloseModal();
              }}
            >
              Submit
            </Button>

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

          <Button
            size="sm"
            variant="outline-danger"
            className="base-btn"
            onClick={() => { skipToday(getSkipData).catch(console.error); }}
          >
            Skip Today
          </Button>

          {' '}

          <Button
            size="sm"
            variant="outline-danger"
            className="base-btn"
            onClick={() => { skipNextDay(getSkipData).catch(console.error); }}
          >
            Skip Tomorrow
          </Button>

          {' '}

          <Button
            size="sm"
            variant="info"
            className="base-btn"
            onClick={() => { removeSkip(getSkipData).catch(console.error); }}
          >
            Remove Skip
          </Button>

        </UnlockContainer>
      </Modal.Footer>
    </Modal>
  );
})
