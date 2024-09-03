import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export default function connectionEvent(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
  console.log('User connected with WebSocket');

  socket.on('disconnect', () => {
    console.log('User disconnected with WebSocket');
  });
}
