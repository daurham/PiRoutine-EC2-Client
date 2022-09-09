import React from 'react';
import { TableFont, TableFontSm } from '../styles/ModalStyles';

type Props = {
  date_: string;
  alarm1: string;
  alarm2: string;
  disarmedTime1: string;
  disarmedTime2: string;
  classN: string;
  failed: string | boolean;
};

function TableEntry({
  date_,
  alarm1,
  alarm2,
  disarmedTime1,
  disarmedTime2,
  classN,
  failed,
}: Props) {
  const lowerCaseTOD = (time: string) => time.slice(0, -3) + time.slice(-2).toLowerCase();
  const editedDate = date_.slice(0, -4) + date_.slice(-2);
  const editedDisTime1 = disarmedTime1 ? lowerCaseTOD(disarmedTime1) : '-';
  const editedDisTime2 = disarmedTime2 ? lowerCaseTOD(disarmedTime2) : '-';
  const editedAlarm1 = lowerCaseTOD(alarm1);
  const editedAlarm2 = lowerCaseTOD(alarm2);

  return (
    <tr className={classN}>
      <TableFontSm as="td" className={failed}>{editedDate}</TableFontSm>
      <TableFontSm as="td" className={failed}>{editedDisTime1}</TableFontSm>
      <TableFontSm as="td" className={failed}>{editedAlarm1}</TableFontSm>
      <TableFontSm as="td" className={failed}>{editedDisTime2}</TableFontSm>
      <TableFontSm as="td" className={failed}>{editedAlarm2}</TableFontSm>
    </tr>
  );
}

export default TableEntry;
