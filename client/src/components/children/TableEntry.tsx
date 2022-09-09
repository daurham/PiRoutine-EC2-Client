import React from 'react'
import { TableFont } from '../styles/ModalStyles';

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
  return (
    <tr className={classN}>
      <TableFont as={'td'}>{date_}</TableFont>
      <TableFont as={'td'}>{disarmedTime1}</TableFont>
      <TableFont as={'td'}>{alarm1}</TableFont>
      <TableFont as={'td'}>{disarmedTime2}</TableFont>
      <TableFont as={'td'}>{alarm2}</TableFont>
      <TableFont as={'td'} className={failed}>{success}</TableFont>
    </tr>
  )
}

export default TableEntry