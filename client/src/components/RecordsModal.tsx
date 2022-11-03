import React, { useEffect, useState } from 'react';
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
  const [currYear, setCurrYear] = useState<string>('');
  const [oldestMonth, setOldestMonth] = useState('');

  const thisMonth = String(new Date().getMonth() + 1);

  const getMonthName = (currentMonth: string) => {
    if (currentMonth === '1') return 'January';
    if (currentMonth === '2') return 'Febuary';
    if (currentMonth === '3') return 'March';
    if (currentMonth === '4') return 'April';
    if (currentMonth === '5') return 'May';
    if (currentMonth === '6') return 'June';
    if (currentMonth === '7') return 'July';
    if (currentMonth === '8') return 'August';
    if (currentMonth === '9') return 'September';
    if (currentMonth === '10') return 'October';
    if (currentMonth === '11') return 'November';
    if (currentMonth === '12') return 'December';
    return '';
  };

  const getDayFromDate = (d: string) => d.slice(d.indexOf('/') + 1, d.lastIndexOf('/'));
  const getMonthFromDate = (d: string) => d.slice(0, d.indexOf('/'));
  const getYearFromDate = (d: string) => d.slice(d.lastIndexOf('/') + 1, d.length);

  const incrementMonth = (): void => setCurrMonth((prevMonth) => String(Number(prevMonth) + 1));
  const decrementMonth = (): void => setCurrMonth((prevMonth) => String(Number(prevMonth) - 1));

  const makeTwoDigits = (n: string) => (n.length === 1 ? `0${n}` : n);

  const breakdownDate = (d: string) => {
    const day = makeTwoDigits(getDayFromDate(d));
    const month = makeTwoDigits(getMonthFromDate(d));
    const year = getYearFromDate(d);
    return { year, month, day };
  };

  const getDateStringsNumbericVal = (date: string) => {
    const { year, month, day } = breakdownDate(date);
    const numericVal = Number(`${year}${month}${day}`);
    return numericVal;
  };

  const filterRecordsByMonth = (currentMonth: string, currentYear: string) => disarmRecords.filter(
    ({ date_ }) => {
      const { year } = breakdownDate(date_!);
      const adjustedCurrentMonth = makeTwoDigits(currentMonth);
      const low = Number(`${year}${adjustedCurrentMonth}01`);
      const high = Number(`${year}${adjustedCurrentMonth}31`);
      const numericVal = getDateStringsNumbericVal(date_!);
      if (numericVal >= low && numericVal <= high && year !== currentYear) setCurrYear(year);
      return (numericVal >= low && numericVal <= high);
    },
  );

  useEffect(() => {
    if (!currMonth) setCurrMonth(thisMonth);

    if (!oldestMonth) {
      let lowestVal = '12';
      disarmRecords.forEach((rec) => {
        if (Number(lowestVal) > Number(getMonthFromDate(rec.date_!))) {
          lowestVal = getMonthFromDate(rec.date_!);
        }
      });
      setOldestMonth(lowestVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        scrollable
      >
        <Modal.Header>
          <Modal.Title>
            <h1 className="modal-headers">{'Routine Records: '}</h1>
          </Modal.Title>
          <h5 className="modal-headers">{`${getMonthName(currMonth)} '${currYear.slice(-2)}`}</h5>
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
            {filterRecordsByMonth(currMonth, currYear).reverse().map((rec, i) => (
              <tbody
                key={uuid()}
              >
                <TableEntry
                  classN={!(i % 2) ? 'oddtable' : 'eventable'}
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
            ⬅️
          </Button>
          <Button size="sm" variant={currMonth === thisMonth ? 'outline-secondary' : 'warning'} disabled={(currMonth === thisMonth) || false} onClick={incrementMonth}>
            ➡️
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});
