import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import {
  getHour,
  getMinute,
  getTOD,
  range,
} from './utils';
import { skipToday, skipNextDay, removeSkip } from './requests/updateData';
import {
  FormContainer,
  UnlockContainer,
  SelectStyle,
  OptionStyle,
} from './styles/EditTimeStyles';
import { TimeObj } from '../../../types';

const uuid = (): string => uuidv4();

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
  const [hour, setHr] = useState<string>(String(getHour(alarmTime)));
  const [minute, setMin] = useState<string>(String(getMinute(alarmTime)));
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
              value={hour}
              onChange={(e) => setHr(e.target.value)}
            >
              {[...range(1, 12)].map((t) => (
                <OptionStyle value={t} key={uuid()}>{t}</OptionStyle>
              ))}
            </SelectStyle>

            <SelectStyle
              value={minute}
              onChange={(e) => setMin(e.target.value)}
            >
              {minuteSelections.map((t) => (
                <OptionStyle value={t} key={uuid()}>{t}</OptionStyle>
              ))}
            </SelectStyle>

            <SelectStyle
              value={tod}
              // @ts-ignore
              onChange={(e) => setTOD(e.target.value)}
            >
              {['AM', 'PM'].map((t) => (
                <OptionStyle value={t} key={uuid()}>{t}</OptionStyle>
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
});
