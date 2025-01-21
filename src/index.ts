import 'whatsapp-web.js';
import './waclient';
import './app/database'; // Connect with database
import './websocket'; // Use websocket
import server from './server';
import { verifyFirstTimeApp } from './app/helpers/verify.helper';

// Initialize server
server.listen(3000, async () => {
  await verifyFirstTimeApp()
  console.log('Server listening on the port:', 3000);
});
