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
  const [currYear, setCurrYear] = useState<string>('');
  const [oldestMonth, setOldestMonth] = useState('');
  // const [currMonthOfData, setCurrMonthOfData] = useState([]);

  const thisMonth = String(new Date().getMonth() + 1);

  const changeMonth = (shouldIncrmement?: any) => {
    let month = currMonth;
    if (shouldIncrmement) month = String(Number(month) + 1);
    if (!shouldIncrmement) month = String(Number(month) - 1);
    setCurrMonth(month);
  };

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

  const getDayFromDate = (d: string): string => d.slice(d.indexOf('/') + 1, d.lastIndexOf('/'));
  const getMonthFromDate = (d: string): string => d.slice(0, d.indexOf('/'));

  const incrementMonth = (): void => changeMonth(true);
  const decrementMonth = (): void => changeMonth();

  const breakdownDate = (d: string) => {
    let day = getDayFromDate(d);
    if (day.length === 1) day = `0${day}`;
    let month = getMonthFromDate(d);
    if (month.length === 1) month = `0${month}`;
    const year = `${d.slice(d.lastIndexOf('/') + 1, d.length)}`;
    return {
      year,
      month,
      day,
    };
  };

  // Create funtion that returns a datestrings numeric place
  const getDateStringsNumbericVal = (date: string) => {
    const { year, month, day } = breakdownDate(date);
    const numericVal = Number(`${year}${month}${day}`);
    // console.log('day, month, year', day, month, year, numericVal);
    return numericVal;
  };

  // filter array of days that range between numberic values
  const filterDataset = (currentMonth: string) => disarmRecords.filter(({ date_ }) => {
    const { year } = breakdownDate(date_!);
    let curMonth = currentMonth;
    if (curMonth.length < 1) curMonth = `0${curMonth}`;
    const low = Number(`${year}${currentMonth.length > 1 ? currentMonth : `0${currentMonth}`}01`);
    const high = Number(`${year}${currentMonth.length > 1 ? currentMonth : `0${currentMonth}`}31`);
    const numericVal = getDateStringsNumbericVal(date_!);
    // console.log('low, high, numV', low, high, numericVal);
    if (numericVal >= low && numericVal <= high && year !== currYear) setCurrYear(year);
    return (numericVal >= low && numericVal <= high);
  });

  if (currMonth.length < 1) setCurrMonth(thisMonth);
  if (oldestMonth.length < 1) {
    let lowestVal = '12';
    disarmRecords.forEach((rec) => {
      if (Number(lowestVal) > Number(getMonthFromDate(rec.date_!))) {
        lowestVal = getMonthFromDate(rec.date_!);
      }
    });
    setOldestMonth(lowestVal);
  }
  // console.log(filterDataset(currMonth));

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
            {/* {disarmRecords.filter( */}
            {/* (r) => (getMonthFromDate(r.date_!) === currMonth), */}
            {/* ).reverse().map((rec, i) => ( */}
            {filterDataset(currMonth).reverse().map((rec, i) => (
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
            ⬅️
          </Button>
          {/* <Button size="sm" variant="warning" onClick={handleClose}>Close</Button> */}

          <Button size="sm" variant={currMonth === thisMonth ? 'outline-secondary' : 'warning'} disabled={(currMonth === thisMonth) || false} onClick={incrementMonth}>
            ➡️
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});
