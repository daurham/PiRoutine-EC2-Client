import axios from 'axios';
import dotenv from 'dotenv';
import { Response, Request, RequestHandler } from 'express';

dotenv.config();
const URL = process.env.URL || `http://localhost:${process.env.PORT || 3000}`;

// POST
export default {
  disarmRecord: (async (req: Request, res: Response) => {
    try {
      await axios.post(`${URL}/post-disarm-record`, req.body);
      res.sendStatus(201);
    }
    catch (err) {
      console.warn('Issue posting disarm record: ', err);
      res.sendStatus(500);
    }
  }) as RequestHandler,
};
