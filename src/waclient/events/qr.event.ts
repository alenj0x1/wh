import IOWebSocket from '../../websocket';

export default function qrEvent(qr: string) {
  console.log(qr);
  IOWebSocket.emit('qrcode', qr);
}
