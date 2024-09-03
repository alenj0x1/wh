export default interface IBaseResponse<T> {
  ok?: boolean;
  status?: number;
  message?: string;
  data?: T;
  timestamp?: Date;
}
