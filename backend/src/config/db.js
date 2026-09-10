import mongoose from 'mongoose';

/**
 * Connect to MongoDB database instance
 * Supports local MongoDB or MongoDB Atlas via MONGODB_URI
 */
export const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dronetv_db';
    
    // Mask credentials for safe logging
    const safeUri = connUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
    console.log(`[Database] Connecting to MongoDB: ${safeUri}`);

    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    // In production, exit process on database connection failure
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[Database Warning] MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Database Error] MongoDB connection error: ${err.message}`);
});
