import { Server } from 'socket.io';
import server from '../server';
import connectionEvent from './events/connection.event';

const WebSocket = new Server(server);

// Events
WebSocket.on('connection', connectionEvent);

export default WebSocket;
