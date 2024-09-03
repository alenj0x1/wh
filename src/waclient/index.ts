import { Client } from 'whatsapp-web.js';
import IOWebSocket from '../websocket';

const WAClient = new Client({
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  },
});

let clientSigned = false;

WAClient.on('ready', () => {
  clientSigned = true;
  console.log('wh-client is ready');
});

WAClient.on('qr', (qr) => {
  IOWebSocket.emit('qrcode', qr);
});

export default WAClient;
