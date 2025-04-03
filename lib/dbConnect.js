// lib/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new database connection promise');
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        console.log('Database connection established successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error.message);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log('Database connection cached');
    return cached.conn;
  } catch (error) {
    console.error('Error during database connection caching:', error.message);
    throw error;
  }
}

export default dbConnect;