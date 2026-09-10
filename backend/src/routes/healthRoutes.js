import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

/**
 * GET /api/health
 * Public health check endpoint
 */
router.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
