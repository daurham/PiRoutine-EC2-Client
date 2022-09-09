import React from 'react'
import { TableFont, TableFontSm } from '../styles/ModalStyles';

type Props = {
  date_: string;
  alarm1: string;
  alarm2: string;
  disarmedTime1: string;
  disarmedTime2: string;
  success: string;
  username: string;
  id: number;
  classN: string;
  failed: string | boolean;
}

function TableEntry({
  date_,
  alarm1,
  alarm2,
  disarmedTime1,
  disarmedTime2,
  success,
  classN,
  failed,
  id,
}: Props) {
  const editedDate = date_.slice(0, -4) + date_.slice(-2);
  const lowerCaseTOD = (time: string) => time.slice(0, -3) + time.slice(-2).toLowerCase();
  
  return (
    <tr className={classN}>
      <TableFontSm as={'td'} className={failed}>{editedDate}</TableFontSm>
      <TableFontSm as={'td'} className={failed}>{lowerCaseTOD(disarmedTime1)}</TableFontSm>
      <TableFontSm as={'td'} className={failed}>{lowerCaseTOD(alarm1)}</TableFontSm>
      <TableFontSm as={'td'} className={failed}>{lowerCaseTOD(disarmedTime2)}</TableFontSm>
      <TableFontSm as={'td'} className={failed}>{lowerCaseTOD(alarm2)}</TableFontSm>
      {/* <TableFontSm as={'td'} className={failed}>{success.toUpperCase()}</TableFontSm> */}
    </tr>
  )
}

export default TableEntry