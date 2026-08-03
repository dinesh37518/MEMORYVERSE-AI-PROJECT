import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/authMiddleware';
import { logger } from './utils/logger';

const app = express();

// Configure CORS allowing Vercel frontend or local dev
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

app.use(authMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'memoryverse-backend', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/', routes);

// Global Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`MemoryVerse AI Backend Server running on http://localhost:${config.port}`);
});

export default app;
