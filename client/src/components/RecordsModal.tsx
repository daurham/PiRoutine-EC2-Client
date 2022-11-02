import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import TableEntry from './TableEntry';
import { TableFont } from './styles/ModalStyles';
import { swapBinaryAndBool } from './utils';
import { DisarmRecordsObj } from '../../../types';

const uuid = (): string => uuidv4();

type Props = {
  show: boolean;
  handleClose: () => void
  disarmRecords: DisarmRecordsObj[];
};

export default React.memo(({ show, handleClose, disarmRecords }: Props) => {
  const [currMonth, setCurrMonth] = useState<string>('');
  const [oldestMonth, setOldestMonth] = useState('');

  const thisMonth = String(new Date().getMonth() + 1);

  const changeMonth = (shouldIncrmement?: any) => {
    let month = currMonth;
    if (shouldIncrmement) month = String(Number(month) + 1);
    if (!shouldIncrmement) month = String(Number(month) - 1);
    setCurrMonth(month);
  };

  const getMonthName = () => {
    if (currMonth === '1') return 'January';
    if (currMonth === '2') return 'Febuary';
    if (currMonth === '3') return 'March';
    if (currMonth === '4') return 'April';
    if (currMonth === '5') return 'May';
    if (currMonth === '6') return 'June';
    if (currMonth === '7') return 'July';
    if (currMonth === '8') return 'August';
    if (currMonth === '9') return 'September';
    if (currMonth === '10') return 'October';
    if (currMonth === '11') return 'November';
    if (currMonth === '12') return 'December';
    return '';
  };

  const getDateMonth = (d: string): string => d.slice(0, d.indexOf('/'));
  const incrementMonth = (): void => changeMonth(true);
  const decrementMonth = (): void => changeMonth();

  if (currMonth.length < 1) setCurrMonth(thisMonth);
  if (oldestMonth.length < 1) {
    let lowestVal = '20';
    disarmRecords.forEach((rec) => {
      if (lowestVal === undefined) lowestVal = getDateMonth(rec.date_!);
      if (Number(lowestVal) > Number(getDateMonth(rec.date_!))) {
        lowestVal = getDateMonth(rec.date_!);
      }
    });
    setOldestMonth(lowestVal);
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className="modal-headers">{'Routine Records: '}</h1>
          </Modal.Title>
          <h5 className="modal-headers">{getMonthName()}</h5>
        </Modal.Header>
        <Modal.Body style={{
          maxHeight: '40vh',
          overflowY: 'auto',
        }}
        >
          <Table size="sm">
            <thead>
              <tr>
                <TableFont as="th">Date</TableFont>
                <TableFont as="th">Disarm 1</TableFont>
                <TableFont as="th">Alarm 1</TableFont>
                <TableFont as="th">Disarm 2</TableFont>
                <TableFont as="th">Alarm 2</TableFont>
              </tr>
            </thead>
            {disarmRecords.filter(
              (r) => (getDateMonth(r.date_!) === currMonth),
            ).reverse().map((rec, i) => (
              <tbody
                key={uuid()}
              >
                <TableEntry
                  classN={!(i % 2) ? 'oddtable' : 'eventable'}
                  /* TODO: Add "Skip" Possibility */
                  failed={(!swapBinaryAndBool(rec.success) ? 'failed' : 'succeeded')}
                  key={uuid()}
                  date_={rec.date_}
                  alarm1={rec.alarm1}
                  alarm2={rec.alarm2}
                  disarmedTime1={rec.disarmedtime1}
                  disarmedTime2={rec.disarmedtime2}
                />
              </tbody>
            ))}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant={currMonth === oldestMonth ? 'outline-secondary' : 'warning'} disabled={(currMonth === oldestMonth) || false} onClick={decrementMonth}>
            ⬅️ Back
          </Button>
          <Button size="sm" variant="warning" onClick={handleClose}>
            Close
          </Button>

          <Button size="sm" variant={currMonth === thisMonth ? 'outline-secondary' : 'warning'} disabled={(currMonth === thisMonth) || false} onClick={incrementMonth}>
            Next ➡️
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});
