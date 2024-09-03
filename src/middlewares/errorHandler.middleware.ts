import { NextFunction, Request, Response } from 'express';
import ResponseError from '../classes/ResponseError';

export default function errorHandler(err: ResponseError, _req: Request, res: Response, _next: NextFunction) {
  return res.status(err.status).json(err);
}
