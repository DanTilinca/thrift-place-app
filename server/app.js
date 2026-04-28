import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js';
import { register, login } from './controllers/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.post('/api/users/signup', register);
app.post('/api/users/signin', login);
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
