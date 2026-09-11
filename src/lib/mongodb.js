import mongoose from 'mongoose';

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).catch((error) => {
      cached.promise = null;
      console.error('MongoDB connection error:', error);
      throw new Error('Failed to connect to MongoDB');
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectMongoDB;