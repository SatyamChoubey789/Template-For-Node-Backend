import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { pinoMiddleware, winstonLogging } from './utils/logger.js';

// Express configuration
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  }),
);
app.use(pinoMiddleware);
app.use(winstonLogging);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Rate limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Routes import
import { authRoutes } from './routes/user.routes.js';

// routes implementation
app.use("/api/v1/user",authRoutes);

// export application to our main file
export { app };
