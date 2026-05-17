const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (uri) {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`MongoDB connection failed: ${error.message}`);
      console.warn('Server will start without database — auth and data endpoints will return errors');
      return;
    }
  }

  console.warn('MONGO_URI not set — server will start without database');
};

module.exports = connectDB;

