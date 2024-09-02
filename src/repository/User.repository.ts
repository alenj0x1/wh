import UserSchema from '../database/schemas/User.schema';
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
    const gtUser = await getUser(username);
    if (gtUser) throw new Error('the user is created.');

    return await UserSchema.create({
      username,
      password,
      role,
    });
  } catch (error) {}
}

/**
 * Get all users
 * @returns
 */
export async function getUsers() {
  try {
    return await UserSchema.find({});
  } catch (error) {}
}

/**
 * Get a user by id
 * @param id
 * @returns
 */
export async function getUser(id: string) {
  try {
    return await UserSchema.findOne({ _id: id });
  } catch (error) {}
}

/**
 * Update a user
 * @param req
 */
export async function updateUser(req: IUpdateUserRequest) {
  const { id, username, password, role } = req;

  try {
    const gtUser = await getUser(id);
    if (!gtUser) throw new Error('the user not exists.');

    gtUser.username = username ?? gtUser.username;
    gtUser.password = username ?? gtUser.password;
    gtUser.role = role ?? gtUser.role;

    await UserSchema.updateOne({ _id: id }, gtUser);

    return gtUser;
  } catch (error) {}
}

export async function deleteUser(id: string) {
  try {
    const gtUser = await getUser(id);
    if (!gtUser) throw new Error('the user not exists.');

    const delUser = await UserSchema.deleteOne({ _id: id });
    if (delUser.deletedCount == 0) return false;

    return true;
  } catch (error) {}
}
