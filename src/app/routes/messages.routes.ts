import { NextFunction, Request, Response, Router } from 'express';
import { sendMessageToPerson } from '../services/messages.services';

const router = Router();

router.get('/person/:personId', async (req: Request, res: Response, next: NextFunction) => {
  const personId = req.params['personId'];

  try {
    const rsp = await sendMessageToPerson(personId);
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    next(err);
  }
});
