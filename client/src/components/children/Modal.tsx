import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TableEntry from './TableEntry';
import { TableFont } from '../styles/ModalStyles';
import { swapBinaryAndBool } from '../utils';

type RecordData = {
  date_: string;
  alarm1: string;
  alarm2: string;
  disarmedtime1: string;
  disarmedtime2: string;
  success: 0 | 1;
  username: string;
  id: number;
};

type Props = {
  show: boolean;
  handleClose: Function;
  disarmRecords: RecordData[];
};

function RecordsModal({ show, handleClose, disarmRecords }: Props) {
  // console.log('disarmRecords', disarmRecords);
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Routine Records</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table size="sm">
            <thead>
              <tr>
                <TableFont as="th">Date</TableFont>
                <TableFont as="th">Disarm 1</TableFont>
                <TableFont as="th">Alarm 1</TableFont>
                <TableFont as="th">Disarm 2</TableFont>
                <TableFont as="th">Alarm 2</TableFont>
                {/* <TableFont as={'th'}>Success?</TableFont> */}
              </tr>
            </thead>
            {[...disarmRecords].reverse().map((rec, i) => (
              <tbody
                key={i}
              >
                <TableEntry
                  classN={!(i % 2) ? 'oddtable' : 'eventable'}
                  failed={(!swapBinaryAndBool(rec.success) ? 'failed' : 'succeeded')}
                  key={i}
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
          <Button size="sm" variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecordsModal;
