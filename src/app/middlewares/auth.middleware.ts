import { NextFunction, Request, Response } from 'express';
import { getUserByUsername } from '../repository/users.repository';
import BaseResponse from '../classes/BaseResponse';
import { comparePassword } from '../helpers/hasher.helper';
import { transformUser } from '../helpers/transform.helper';

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const username = req.headers.username?.toString();
  const password = req.headers.password?.toString();

  const rsp = new BaseResponse({});
  if (!username || !password) {
    console.log(username, password);
    return res.status(rsp.status).json(rsp.Unauthorized());
  }

  const findUser = await getUserByUsername(username);
  if (!findUser || !(await comparePassword(password, findUser.password))) {
    return res.status(rsp.status).json(rsp.Unauthorized());
  }

  req.user = transformUser(findUser);
  next();
}
