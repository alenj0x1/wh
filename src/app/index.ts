import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import authMiddleware from './middlewares/auth.middleware';
import errorHandler from './middlewares/errorHandler.middleware';
import userRouter from './routes/users.routes';
import messagesRouter from './routes/messages.routes';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.render('index');
});

app.use('/users', [authMiddleware], userRouter);
app.use('/messages', [authMiddleware], messagesRouter);

// Public and render
app.use(express.static(path.join(__dirname, '../../public')));
app.set('views', 'public/views');
app.set('view engine', 'pug');

// Error handler middleware
app.use(errorHandler);

export default app;
