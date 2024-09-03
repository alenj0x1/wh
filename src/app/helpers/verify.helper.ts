import 'dotenv/config';
import { createUser, getUsers } from '../repository/users.repository';
import { UserRoleEnum } from '../interfaces/miscellaneous/Enums';
import { hashPassword } from './hasher.helper';

/**
 * Verify if database has users. If not has, create a superuser
 */
export async function verifyFirstTimeApp() {
  const users = await getUsers();
  if (users && users.length === 0) {
    const suUsername = process.env.SUPERUSER_USERNAME;
    const suPassword = process.env.SUPERUSER_PASSWORD;

    if (!suUsername || !suPassword) throw new Error('first time app variables not setted.');

    await createUser({
      username: suUsername,
      password: await hashPassword(suPassword),
      role: UserRoleEnum.SuperUser,
    });
  }
}
