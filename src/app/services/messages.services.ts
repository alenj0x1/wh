import BaseResponse from '../classes/BaseResponse';
import ResponseError from '../classes/ResponseError';

export async function sendMessageToPerson(personId: string) {
  const rsp = new BaseResponse<boolean>({});

  try {
    return rsp.Ok(true);
  } catch (err) {
    throw err;
  }
}
