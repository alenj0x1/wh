import { Request } from 'express';
import BaseResponse from '../classes/BaseResponse';
import { transformUser, transformUsers } from '../helpers/transform.helper';
import IUser from '../interfaces/IUser';
import {
  createUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  getUsers,
  updateUser,
} from '../repository/users.repository';
import { UserRoleEnum } from '../interfaces/miscellaneous/Enums';
import ResponseError from '../classes/ResponseError';

/**
 * Create a user service
 * @param req
 * @returns
 */
export async function createUserService(req: Request) {
  const { username, password, role } = req.body;
  const rsp = new BaseResponse<IUser>({});

  try {
    if (req.user.role !== UserRoleEnum.SuperUser)
      throw new ResponseError({ message: 'This action is only allowed for superusers', status: 401 });

    const crtUser = await createUser({ username, password, role });
    if (!crtUser) throw new ResponseError({ message: 'User creation failed' });

    const mpUser = transformUser(crtUser);

    return rsp.Ok(mpUser, 'User created correctly');
  } catch (err) {
    throw err;
  }
}

/**
 * Get a user by Id service
 * @param req
 * @returns
 */
export async function getUserByIdService(id: string) {
  const rsp = new BaseResponse<IUser>({});

  try {
    const gtUser = await getUserById(id);
    if (!gtUser) throw new ResponseError({ message: 'User not found' });

    const mpUser = transformUser(gtUser);

    return rsp.Ok(mpUser, 'Show user');
  } catch (err) {
    throw err;
  }
}

/**
 * Get a user by Username service
 * @param req
 * @returns
 */
export async function getUserByUsernameService(name: string) {
  const rsp = new BaseResponse<IUser>({});

  try {
    const gtUser = await getUserByUsername(name);
    if (!gtUser) throw new ResponseError({ message: 'User not found' });

    const mpUser = transformUser(gtUser);

    return rsp.Ok(mpUser, 'Show user');
  } catch (err) {
    throw err;
  }
}

/**
 * Get all users service
 * @param req
 * @returns
 */
export async function getUsersService() {
  const rsp = new BaseResponse<IUser[]>({});

  try {
    const gtUsers = await getUsers();
    if (!gtUsers) throw new ResponseError({ message: 'Is rare, but, without users' });

    const mpUsers = transformUsers(gtUsers);

    return rsp.Ok(mpUsers, 'Show users');
  } catch (err) {
    throw err;
  }
}

/**
 * Update a user service
 * @param req
 * @returns
 */
export async function updateUserService(req: Request) {
  const { username, password, role, id } = req.body;
  const rsp = new BaseResponse<IUser>({});

  try {
    if (req.user.role !== UserRoleEnum.SuperUser)
      throw new ResponseError({ message: 'This action is only allowed for superusers', status: 401 });

    const updUser = await updateUser({ username, password, role, id });
    if (!updUser) throw new ResponseError({ message: 'Failed to update user' });

    const mpUser = transformUser(updUser);

    return rsp.Updated(mpUser, 'User updated correctly');
  } catch (err) {
    throw err;
  }
}

/**
 * Delete a user service
 * @param req
 * @returns
 */
export async function deleteUserService(req: Request, id: string) {
  const rsp = new BaseResponse<boolean>({});

  try {
    if (req.user.role !== UserRoleEnum.SuperUser)
      throw new ResponseError({ message: 'This action is only allowed for superusers', status: 401 });

    const delUser = await deleteUser(id);
    if (!delUser) throw new ResponseError({ message: 'Failed to delete user' });

    return rsp.Ok(true, 'User updated correctly');
  } catch (err) {
    throw err;
  }
}
