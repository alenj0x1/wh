import { Router, Request, Response, NextFunction } from 'express';
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUserByUsernameService,
  getUsersService,
  updateUserService,
} from '../services/users.services';

const router = Router();

/**
 * POST | Create a user
 */
router.post('/new', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rsp = await createUserService(req);
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    next(err);
  }
});

/**
 * GET | Get a user by id
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params['id'];

  try {
    const rsp = await getUserByIdService(userId);
    return res.status(rsp.status).json(rsp);
  } catch (err: any) {
    next(err);
  }
});

/**
 * GET | Get a user by username
 */
router.get('/byUsername/:username', async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params['username'];

  try {
    const rsp = await getUserByUsernameService(username);
    return res.status(rsp.status).json(rsp);
  } catch (err: any) {
    next(err);
  }
});

/**
 * GET | Get all users
 */
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rsp = await getUsersService();
    return res.status(rsp.status).json(rsp);
  } catch (err: any) {
    next(err);
  }
});

/**
 * PUT | Update a user
 */
router.put('/update', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rsp = await updateUserService(req);
    return res.status(rsp.status).json(rsp);
  } catch (err: any) {
    next(err);
  }
});

/**
 * DELETE | Delete a user
 */
router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params['id'];

  try {
    const rsp = await deleteUserService(req, id);
    return res.status(rsp.status).json(rsp);
  } catch (err: any) {
    next(err);
  }
});

export default router;
