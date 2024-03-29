import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response, RequestHandler } from 'express';
import {
  DisarmRes,
  UserRes,
  SkipRes,
  AlarmTimeRes,
  SoakedRes,
  StreakRes,
  DisarmRecordsData,
} from '../../../types';

dotenv.config();

const URL = process.env.URL || `http://localhost:${process.env.PORT || 3000}`;

// GET
export default {
  alarmTime: (async (req: Request, res: Response) => {
    try {
      const { data } = await axios.get<AlarmTimeRes>(
        `${URL}/get-alarm-time/?table=alarmtime`,
      );
      res.status(200).send(data);
    }
    catch (err) {
      console.warn('Issue getting alarm data: ', err);
      res.status(200).send([{ hour: 6, minute: 5 }]);
    }
  }) as RequestHandler,

  disarmStatus: (async (req: Request, res: Response) => {
    try {
      const { data } = await axios.get<DisarmRes>(
        `${URL}/get-disarm-status/?table=isdisarmed`,
      );
      res.status(200).send(data);
    }
    catch (err) {
      console.warn('Issue getting defuse data: ', err);
      res.status(200).send([{ isDisarmed: 0 }]);
    }
  }) as RequestHandler,

  streakCount: (async (req: Request, res: Response) => {
    try {
      const { data } = await axios.get<StreakRes>(
        `${URL}/get-streak-count/?table=streakcount`,
      );
      res.status(200).send(data);
    }
    catch (err) {
      console.warn('Issue getting streak data: ', err);
      res.status(200).send([{ streak: true }]);
    }
  }) as RequestHandler,

  userInfo: (async (req: Request, res: Response) => {
    try {
      const { data } = await axios.get<UserRes>(
        `${URL}/get-user-info/?table=users`,
      );
      res.status(200).send(data);
    }
    catch (err) {
      console.warn('Issue getting user info data: ', err);
      res.status(200).send([{ password: '1234' }]);
    }
  }) as RequestHandler,

  soakedCount: (async (req: Request, res: Response) => {
    try {
      const { data } = await axios.get<SoakedRes>(
        `${URL}/get-soaked-count/?table=soakedcount`,
      );
      res.status(200).send(data);
    }
    catch (err) {
      console.warn('Issue getting soakedCount data: ', err);
      res.status(200).send([{ soakedCount: 0 }]);
    }
  }) as RequestHandler,

  skippedData: (async (req: Request, res: Response) => {
    try {
      const { data } = await axios.get<SkipRes>(
        `${URL}/get-skipped-data/?table=skippedcount`,
      );
      res.status(200).send(data);
    }
    catch (err) {
      console.warn('Issue getting skippedCount data: ', err);
      res.status(200).send([{ skippedCount: 0 }]);
    }
  }) as RequestHandler,

  disarmRecords: (async (req: Request, res: Response) => {
    try {
      const { data } = await axios.get<DisarmRecordsData>(
        `${URL}/get-disarm-records/?table=disarmrecords`,
      );
      res.status(200).send(data);
    }
    catch (err) {
      console.warn('Issue getting disarmRecords data: ', err);
      res.sendStatus(500);
    }
  }) as RequestHandler,
};
