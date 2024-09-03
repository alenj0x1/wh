import WAClient from '../../waclient';
import BaseResponse from '../classes/BaseResponse';

export async function sendMessageToPerson(id: string, message: string) {
  const rsp = new BaseResponse<boolean>({});

  try {
    await WAClient.sendMessage(`${id}@c.us`, message);
    return rsp.Ok(true);
  } catch (err) {
    throw err;
  }
}
