import { Server } from 'socket.io';
import server from '../server';

const WebSocket = new Server(server);

WebSocket.on('connection', (socket) => {
  console.log('User connected with WebSocket');

  socket.on('disconnect', () => {
    console.log('User disconnected with WebSocket');
  });
});

export default WebSocket;
