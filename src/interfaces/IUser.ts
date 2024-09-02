import { UserRoleEnum } from './miscellaneous/Enums';

export default interface IUser {
  id: string;
  username: string;
  role: UserRoleEnum;
}
