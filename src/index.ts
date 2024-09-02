import { Client } from 'whatsapp-web.js';
import path from 'path';
import express from 'express';

const client = new Client({
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  },
});

const publicDirectory = path.join(__dirname, '../public');
let qrcode = '';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', 'public/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { qr: qrcode });
});

client.on('ready', () => console.log('wh-client is ready'));

client.on('qr', (qr) => {
  qrcode = qr;
  console.log(qr);
});

client.initialize();

app.listen(3000, () => console.log('server listening on the port'));
