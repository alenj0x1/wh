import IOWebSocket from '../../websocket';

export default async function disconnectedEvent() {
  console.log('WAClient disconnected');
  IOWebSocket.emit('waclient_status', false);
}
