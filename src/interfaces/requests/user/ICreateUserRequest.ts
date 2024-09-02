import { UserRoleEnum } from '../../miscellaneous/Enums';

export default interface ICreateUserRequest {
  username: string;
  password: string;
  role: UserRoleEnum;
}
