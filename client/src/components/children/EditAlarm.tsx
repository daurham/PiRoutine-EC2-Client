import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Unlock from './Unlock';
import { useData } from '../../Context';
import Modal from 'react-bootstrap/Modal';
import range from '../utils/range';
import { EditTimeContainer, FormContainer, UnlockContainer, SelectStyle, OptionStyle } from '../styles/EditTimeStyles';
import axios from 'axios';

type Props = {
  showModal: boolean;
  setShowModal: Function;
};

export default function EditTime({ showModal, setShowModal }: Props) {
  const [hour, setHr] = useState<HTMLSelectElement | string>('1');
  const [minute, setMin] = useState<HTMLSelectElement | string>('0');
  const [tod, setTOD] = useState('AM');
  const {
    updateAlarmTime,
    notSignedIn,
    getSkipData,
    skipDate,
  } = useData();

  const minuteSelections = [...range(0, 59)].map((n) => (n < 10 ? `0${n}` : n));
  const handleCloseModal = () => setShowModal(false);

  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString();
  };

  const skipNextDay = async () => {
    await axios.patch('/update-skipped-date', { data: getTomorrow() });
    getSkipData();
  };

  const skipToday = async () => {
    await axios.patch('/update-skipped-date', { data: new Date().toLocaleDateString() });
    getSkipData();
  };

  const removeSkip = async () => {
    await axios.patch('/update-skipped-date', { data: 'None 💪🏼' });
    getSkipData();
  };

  return (
    <EditTimeContainer>
      {showModal
        && (
          <div>
            {
              notSignedIn
                ? <Unlock show={showModal} handleClose={handleCloseModal} />
                : (
                  <>
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

                            <Button variant="info" style={{ 'verticalAlign': 'baseline' }} onClick={(e) => { e.preventDefault(); updateAlarmTime({ hour, minute, tod }); }}>Submit</Button>
                          </Form>
                        </FormContainer>
                      </Modal.Body>
                      <Modal.Footer
                        className="edit-alarm"
                      >
                        <UnlockContainer>
                          <h6>Skipping: {skipDate}</h6>
                        </UnlockContainer>
                        <UnlockContainer>
                          <Button size="sm" variant="outline-danger" style={{ 'verticalAlign': 'baseline' }} onClick={skipToday}>Skip Today</Button>
                          {' '}
                          <Button size="sm" variant="outline-danger" style={{ 'verticalAlign': 'baseline' }} onClick={skipNextDay}>Skip Tomorrow</Button>
                          {' '}
                          <Button size="sm" variant="info" style={{ 'verticalAlign': 'baseline' }} onClick={removeSkip}>Remove Skip</Button>
                        </UnlockContainer>
                      </Modal.Footer>
                    </Modal>
                  </>
                )
            }
          </div>
        )
      }
    </EditTimeContainer >
  );
}
