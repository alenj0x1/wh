import { Router, Request, Response } from 'express';
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
router.post('/new', async (req: Request, res: Response) => {
  try {
    const rsp = await createUserService(req);
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    console.log('internal server error');
  }
});

/**
 * GET | Get a user by id
 */
router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.params['id'];

  try {
    const rsp = await getUserByIdService(userId);
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    console.log('internal server error');
  }
});

/**
 * GET | Get a user by username
 */
router.get('/byUsername/:username', async (req: Request, res: Response) => {
  const username = req.params['username'];

  try {
    const rsp = await getUserByUsernameService(username);
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    console.log('internal server error');
  }
});

/**
 * GET | Get all users
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const rsp = await getUsersService();
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    console.log(err);
    console.log('internal server error');
  }
});

/**
 * PUT | Update a user
 */
router.put('/update', async (req: Request, res: Response) => {
  const { username, password, role, id } = req.body;

  try {
    const rsp = await updateUserService(req);
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    console.log('internal server error');
  }
});

/**
 * DELETE | Delete a user
 */
router.delete('/delete/:id', async (req: Request, res: Response) => {
  const id = req.params['id'];

  try {
    const rsp = await deleteUserService(req, id);
    return res.status(rsp.status).json(rsp);
  } catch (err) {
    console.log('internal server error');
  }
});

export default router;
