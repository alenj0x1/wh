import WAClient from '../../waclient';
import BaseResponse from '../classes/BaseResponse';

export async function sendMessageToPerson(phone_number: string, message: string) {
  const rsp = new BaseResponse<boolean>({});

  try {
    await WAClient.sendMessage(`${phone_number}@c.us`, message);
    return rsp.Ok(true);
  } catch (err) {
    throw err;
  }
}
