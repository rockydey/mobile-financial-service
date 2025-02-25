import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/User/User.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1/auth', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the server');
});

export default app;
