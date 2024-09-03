import IBaseResponse from '../interfaces/responses/IBaseResponse';

export default class ResponseError extends Error {
  public ok: boolean = false;
  public data: null = null;
  public status: number = 404;
  public message: string;
  public timestamp: Date = new Date();

  constructor(options: IBaseResponse<string>) {
    super();
    this.status = options.status ?? this.status;
    this.message = options.message ?? 'Bad request';

    return this;
  }
}
