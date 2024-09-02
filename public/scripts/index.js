const socket = io();

socket.on('qrcode', (ev) => {
  console.log(ev);
});
