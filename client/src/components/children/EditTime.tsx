import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Unlock from './Unlock';
import { useData } from '../../Context';
// import { } from '../styles/EditTimeStyles';
import range from '../utils/range';
import { EditTimeContainer, FormContainer, UnlockContainer, SelectStyle, OptionStyle } from '../styles/EditTimeStyles';

// type Props = { va: 2 };

export default function EditTime() {
  const [hour, setHr] = useState(1);
  const [minute, setMin] = useState(0);
  const [tod, setTOD] = useState('AM');
  const {
    streak,
    updateAlarmTime,
    updateStreakCount,
    updateDisarmStatus,
    inEditMode,
    setEditMode,
    notSignedIn,
  } = useData();
  const minuteSelections = [...range(0, 59)].map((n) => (n < 10 ? `0${n}` : n));
  // console.log('input:', inputPin);


  // const handleLock = () => { };
  return (
    <EditTimeContainer>
      <UnlockContainer>
        <Button variant={inEditMode ? 'outline-info' : 'outline-secondary'} size="sm" onClick={() => setEditMode(!inEditMode)}>Edit Alarm</Button>
      </UnlockContainer>
      <br />
      {inEditMode
        && (
          <div>
            {
              notSignedIn
                ? <UnlockContainer><br /><Unlock /></UnlockContainer>
                : (
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

                      <Button variant="info" style={{ 'verticalAlign': 'baseline' }} onClick={(e) => { e.preventDefault(); updateAlarmTime({ hour, minute, tod }) }}>Submit</Button>
                    </Form>
                  </FormContainer>
                )
            }
          </div>
        )
      }
    </EditTimeContainer>
  );
}
