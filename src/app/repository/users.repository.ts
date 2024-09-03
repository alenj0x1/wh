import ResponseError from '../classes/ResponseError';
import UserSchema from '../database/schemas/User.schema';
import { hashPassword } from '../helpers/hasher.helper';
import ICreateUserRequest from '../interfaces/requests/user/ICreateUserRequest';
import IUpdateUserRequest from '../interfaces/requests/user/IUpdateUserRequest';

/**
 * Create a new user
 * @param req
 * @returns
 */
export async function createUser(req: ICreateUserRequest) {
  const { username, password, role } = req;

  try {
    const gtUser = await getUserByUsername(username);
    if (gtUser) throw new ResponseError({ message: 'The user is previously created.' });

    return await UserSchema.create({
      username,
      password: await hashPassword(password),
      role,
    });
  } catch (err: any) {
    throw new ResponseError({ message: err.message });
  }
}

/**
 * Get all users
 * @returns
 */
export async function getUsers() {
  try {
    return await UserSchema.find({});
  } catch (err: any) {
    throw new ResponseError({ message: err.message });
  }
}

/**
 * Get a user by id
 * @param id
 * @returns
 */
export async function getUserById(id: string) {
  try {
    return await UserSchema.findOne({ _id: id });
  } catch (err: any) {
    throw new ResponseError({ message: err.message });
  }
}

/**
 * Get a user by id
 * @param id
 * @returns
 */
export async function getUserByUsername(username: string) {
  try {
    return await UserSchema.findOne({ username });
  } catch (err: any) {
    throw new ResponseError({ message: err.message });
  }
}

/**
 * Update a user
 * @param req
 */
export async function updateUser(req: IUpdateUserRequest) {
  const { id, username, password, role } = req;

  try {
    const gtUser = await getUserById(id);
    if (!gtUser) throw new Error('The user not exists.');

    gtUser.username = username ?? gtUser.username;
    gtUser.password = password ?? gtUser.password;
    gtUser.role = role ?? gtUser.role;

    await UserSchema.updateOne({ _id: id }, gtUser);

    return gtUser;
  } catch (err: any) {
    throw new ResponseError({ message: err.message });
  }
}

export async function deleteUser(id: string) {
  try {
    const gtUser = await getUserById(id);
    if (!gtUser) throw new Error('The user not exists.');

    const delUser = await UserSchema.deleteOne({ _id: id });
    if (delUser.deletedCount == 0) return false;

    return true;
  } catch (err: any) {
    throw new ResponseError({ message: err.message });
  }
}
