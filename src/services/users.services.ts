import { Request } from 'express';
import BaseResponse from '../classes/BaseResponse';
import { transformUser, transformUsers } from '../helpers/transform.helper';
import IUser from '../interfaces/IUser';
import ICreateUserRequest from '../interfaces/requests/user/ICreateUserRequest';
import IUpdateUserRequest from '../interfaces/requests/user/IUpdateUserRequest';
import {
  createUser,
  deleteUser,
  getUserById,
  getUserByUsername,
  getUsers,
  updateUser,
} from '../repository/User.repository';
import { UserRoleEnum } from '../interfaces/miscellaneous/Enums';

/**
 * Create a user service
 * @param req
 * @returns
 */
export async function createUserService(req: Request) {
  const { username, password, role } = req.body;
  const rsp = new BaseResponse<IUser>({});

  try {
    if (req.user.role !== UserRoleEnum.SuperUser) return rsp.Unauthorized('This action is only allowed for superusers');

    const crtUser = await createUser({ username, password, role });
    if (!crtUser) return rsp.BadRequest('User creation failed');

    const mpUser = transformUser(crtUser);

    return rsp.Ok(mpUser, 'User created correctly');
  } catch (err) {
    return rsp.BadRequest();
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
    if (!gtUser) return rsp.BadRequest();

    const mpUser = transformUser(gtUser);

    return rsp.Ok(mpUser, 'Show user');
  } catch (err) {
    return rsp.BadRequest();
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
    if (!gtUser) return rsp.BadRequest();

    const mpUser = transformUser(gtUser);

    return rsp.Ok(mpUser, 'Show user');
  } catch (err) {
    return rsp.BadRequest();
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
    if (!gtUsers) return rsp.BadRequest();

    const mpUsers = transformUsers(gtUsers);

    return rsp.Ok(mpUsers, 'Show users');
  } catch (err) {
    return rsp.BadRequest();
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
    if (req.user.role !== UserRoleEnum.SuperUser) return rsp.Unauthorized('This action is only allowed for superusers');

    const updUser = await updateUser({ username, password, role, id });
    if (!updUser) return rsp.BadRequest();

    const mpUser = transformUser(updUser);

    return rsp.Updated(mpUser, 'User updated correctly');
  } catch (err) {
    return rsp.BadRequest();
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
    if (req.user.role !== UserRoleEnum.SuperUser) return rsp.Unauthorized('This action is only allowed for superusers');

    const updUser = await deleteUser(id);
    if (!updUser) return rsp.BadRequest();

    return rsp.Ok(true, 'User updated correctly');
  } catch (err) {
    return rsp.BadRequest();
  }
}
