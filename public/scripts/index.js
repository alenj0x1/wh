const socket = io();
const dockerPet = document.getElementById('docker');

socket.on('qrcode', (code) => {
  const mainQr = document.getElementById('qr-code');

  mainQr.innerHTML = '';

  QrCreator.render(
    {
      text: code,
      radius: 0.5, // 0.0 to 0.5
      ecLevel: 'H', // L, M, Q, H
      fill: '#0f0f0f', // foreground color
      background: null, // color or null for transparent
      size: 250, // in pixels
    },
    mainQr
  );
});

socket.on('waclient_status', (status) => {
  const statusElement = document.getElementById('status');

  if (!status) {
    dockerPet.classList.remove('grayscale');
    statusElement.textContent = 'Client disconnected';
    return;
  }

  dockerPet.classList.remove('grayscale');
  statusElement.innerHTML = 'Client connected';
});
