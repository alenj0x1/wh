import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import authMiddleware from './middlewares/auth.middleware';
import userRouter from './routes/users.routes';
import errorHandler from './middlewares/errorHandler.middleware';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.render('index');
});

app.use('/users', [authMiddleware], userRouter);

// Public and render
app.use(express.static(path.join(__dirname, '../../public')));
app.set('views', 'public/views');
app.set('view engine', 'pug');

// Error handler middleware
app.use(errorHandler);

export default app;
