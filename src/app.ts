import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import qrRoutes from './routes/qr.routes';
import authRoutes from './routes/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

/*
|--------------------------------------------------------------------------
| CORS CONFIG
|--------------------------------------------------------------------------
*/

const corsOptions = {
  origin: 'https://smartlink-fe-kmm6.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  credentials: true,
};

app.use(cors(corsOptions));

/*
|--------------------------------------------------------------------------
| MANUAL CORS HEADERS
|--------------------------------------------------------------------------
*/

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://smartlink-fe-kmm6.vercel.app'
  );

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  res.header('Access-Control-Allow-Credentials', 'true');

  // HANDLE PREFLIGHT REQUEST
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

/*
|--------------------------------------------------------------------------
| SECURITY
|--------------------------------------------------------------------------
*/

app.use(helmet());

/*
|--------------------------------------------------------------------------
| RATE LIMIT
|--------------------------------------------------------------------------
*/

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/*
|--------------------------------------------------------------------------
| BODY PARSER
|--------------------------------------------------------------------------
*/

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

/*
|--------------------------------------------------------------------------
| ROUTES
|--------------------------------------------------------------------------
*/

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/qr', qrRoutes);

/*
|--------------------------------------------------------------------------
| ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;
