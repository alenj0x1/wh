import './database';
import { Client } from 'whatsapp-web.js';
import { createServer } from 'node:http';
import path from 'path';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { verifyFirstTimeApp } from './helpers/verify.helper';
import userRoutes from './routes/users.routes';
import authMiddleware from './middlewares/auth.middleware';
import errorHandler from './middlewares/errorHandler.middleware';

const client = new Client({
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  },
});

let clientSigned = false;

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/users', [authMiddleware], userRoutes);

const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', 'public/views');
app.set('view engine', 'pug');

app.get('/', (_req: Request, res: Response) => {
  res.render('index');
});

// Error handler middleware
app.use(errorHandler);

client.on('ready', () => {
  clientSigned = true;
  console.log('wh-client is ready');
});

client.on('qr', (qr) => {
  io.emit('qrcode', qr);
});

client.initialize();

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, async () => {
  await verifyFirstTimeApp();
  console.log('server listening on the port: ');
});
