import { NextFunction, Request, Response, Router } from 'express';
import { sendMessageToPerson } from '../services/messages.services';
import ResponseError from '../classes/ResponseError';

const router = Router();

router.get('/send/:phone_number', async (req: Request, res: Response, next: NextFunction) => {
  const phone_number = req.params['phone_number'];
  const message = req.query['message']?.toString();

  try {
    if (!message) throw new ResponseError({ message: 'Message query not argumented' });
    const rsp = await sendMessageToPerson(phone_number, message);
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    next(err);
  }
});

export default router;
