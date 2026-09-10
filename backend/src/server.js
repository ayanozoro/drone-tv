import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers
app.use(helmet());

// Private Network Access (PNA) header support
app.use((req, res, next) => {
  if (req.headers['access-control-request-private-network']) {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
  }
  next();
});

// CORS configuration supporting local development and deployed production frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://drone-tv-xi.vercel.app',
];

if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL.split(',').forEach((url) => {
    const cleaned = url.trim().replace(/\/$/, '');
    if (cleaned && !allowedOrigins.includes(cleaned)) {
      allowedOrigins.push(cleaned);
    }
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      let isVercel = false;
      try {
        isVercel = /\.vercel\.app$/.test(new URL(origin).hostname);
      } catch {
        isVercel = false;
      }

      if (allowedOrigins.includes(origin) || isVercel || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key', 'Access-Control-Request-Private-Network'],
  })
);

// Body parser with safe size limit to prevent memory exhaustion attacks
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Rate limiting to protect against abuse and brute force
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests created from this IP, please try again after 15 minutes',
  },
});

app.use('/api', apiLimiter);

// Connect to Database
connectDB();

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'DroneTV AI Support & Lead Assistant API',
    version: '1.0.0',
    documentation: '/api/health',
    status: 'Operational',
  });
});

// 404 handler for undefined routes
app.use(notFound);

// Centralized error handling middleware
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(` DroneTV API Server is running on port ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=========================================`);
  });
}

export default app;
