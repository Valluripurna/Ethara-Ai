const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const isProd = process.env.NODE_ENV === 'production';

  if (uri) {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`MongoDB connection failed: ${error.message}`);
      if (isProd) {
        process.exit(1);
      }
    }
  } else if (isProd) {
    console.error('MONGO_URI is required in production');
    process.exit(1);
  }

  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const memoryUri = mongod.getUri();
    const conn = await mongoose.connect(memoryUri);
    console.log(`In-memory MongoDB (dev): ${conn.connection.host}`);
  } catch (error) {
    console.error('Failed to start in-memory MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

