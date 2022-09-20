import React from 'react';
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

function RecordsModal({ show, handleClose, disarmRecords }: Props) {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Routine Records</Modal.Title>
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
            {[...disarmRecords].reverse().map((rec, i) => (
              <tbody
                key={i}
                // key={uuid()}
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
          <Button size="sm" variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecordsModal;
