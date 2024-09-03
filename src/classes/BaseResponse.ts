import IBaseResponse from '../interfaces/responses/IBaseResponse';

export default class BaseResponse<T> {
  public ok: boolean = false;
  public data: T | null = null;
  public status: number = 404;
  public message: string = '';
  public timestamp: Date = new Date();

  constructor(options: IBaseResponse<T>) {
    const { ok, data, status, message, timestamp } = options;
    this.ok = ok ?? this.ok;
    this.data = data ?? this.data;
    this.status = status ?? this.status;
    this.message = message ?? this.message;
    this.timestamp = timestamp ?? this.timestamp;
  }

  Ok(data: T, message: string = 'Success') {
    this.ok = true;
    this.status = 200;
    this.message = message;
    this.data = data;

    return this;
  }

  BadRequest(message: string = 'Bad request') {
    this.ok = false;
    this.status = 404;
    this.message = message;
    this.data = null;

    return this;
  }

  Created(data: T, message: string = 'Created') {
    this.ok = true;
    this.status = 201;
    this.message = message;
    this.data = data;

    return this;
  }

  Updated(data: T, message: string = 'Updated') {
    this.ok = true;
    this.status = 204;
    this.message = message;
    this.data = data;

    return this;
  }

  Unauthorized(message: string = 'Unauthorized') {
    this.ok = true;
    this.status = 204;
    this.message = message;
    this.data = null;

    return this;
  }
}
