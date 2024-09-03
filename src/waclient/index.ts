import { Client, LocalAuth } from 'whatsapp-web.js';
import qrEvent from './events/qr.event';
import readyEvent from './events/ready.event';
import disconnectedEvent from './events/disconnected.event';

// Client setup
const WAClient = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: 'none',
  },
  puppeteer: {
    headless: true,
  },
});

// Events
WAClient.once('ready', readyEvent);
WAClient.on('qr', qrEvent);
WAClient.on('disconnected', disconnectedEvent);

WAClient.initialize();

export default WAClient;
