import React from 'react';
import { TableFontSm } from './styles/ModalStyles';

type Props = {
  date_: string | undefined;
  alarm1: string | undefined;
  alarm2: string | undefined;
  disarmedTime1: string | undefined;
  disarmedTime2: string | undefined;
  classN: string;
  failed: string;
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
  const editedDate = date_ ? (date_.slice(0, -4) + date_.slice(-2)) : '-';
  const editedDisTime1 = disarmedTime1 ? lowerCaseTOD(disarmedTime1) : '-';
  const editedDisTime2 = disarmedTime2 ? lowerCaseTOD(disarmedTime2) : '-';
  const editedAlarm1 = lowerCaseTOD(alarm1 ? alarm1 : 'null');
  const editedAlarm2 = lowerCaseTOD(alarm2 ? alarm2 : 'null');

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
