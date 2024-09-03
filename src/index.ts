import './app/database'; // Connect with database
import './websocket'; // Use websocket
import server from './server';
import WAClient from './waclient';

// Initialize WAClient
WAClient.initialize();

// Initialize server
server.listen(3000, () => {
  console.log('Server listening on the port:', 3000);
});
