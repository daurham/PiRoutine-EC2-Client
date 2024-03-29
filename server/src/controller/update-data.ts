import axios from 'axios';
import dotenv from 'dotenv';
import { Response, Request, RequestHandler } from 'express';

dotenv.config();
const URL = process.env.URL || `http://localhost:${process.env.PORT || 3000}`;

// PATCH
export default {
  alarmTime: (async (req: Request, res: Response) => {
    try {
      await axios.patch(`${URL}/update-alarm-time`, req.body);
      res.sendStatus(203);
    }
    catch (err) {
      console.warn('Issue updating alarm data: ', err);
      res.sendStatus(203);
    }
  }) as RequestHandler,

  disarmStatus: (async (req: Request, res: Response) => {
    try {
      await axios.patch(`${URL}/update-disarm-status`, req.body);
      res.sendStatus(203);
    }
    catch (err) {
      console.warn('Issue updating defuse data: ', err);
      res.sendStatus(203);
    }
  }) as RequestHandler,

  streakCount: (async (req: Request, res: Response) => {
    try {
      await axios.patch(`${URL}/update-streak-count`, req.body);
      res.sendStatus(203);
    }
    catch (err) {
      console.warn('Issue updating streak data: ', err);
      res.sendStatus(203);
    }
  }) as RequestHandler,

  skippedData: (async (req: Request, res: Response) => {
    try {
      await axios.patch(`${URL}/update-skipped-count`, req.body);
      res.sendStatus(203);
    }
    catch (err) {
      console.warn('Issue updating skipped data: ', err);
      res.sendStatus(203);
    }
  }) as RequestHandler,

  skipTomorrow: (async (req: Request, res: Response) => {
    try {
      await axios.patch(`${URL}/update-skipped-date`, req.body);
      res.sendStatus(201);
    }
    catch (err) {
      console.warn('Issue skipping tomorrow: ', err);
      res.sendStatus(500);
    }
  }) as RequestHandler,
};
