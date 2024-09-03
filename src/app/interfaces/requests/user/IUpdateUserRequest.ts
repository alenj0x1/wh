import { UserRoleEnum } from '../../miscellaneous/Enums';

export default interface IUpdateUserRequest {
  id: string;
  username?: string;
  password?: string;
  role?: UserRoleEnum;
}
