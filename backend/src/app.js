const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { getAllowedOrigins } = require('./config/corsOrigins');

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

/** Behind Render/nginx — needed for correct IP in rate limiting */
app.set('trust proxy', 1);

const allowedOrigins = getAllowedOrigins();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (process.env.NODE_ENV !== 'production') return callback(null, true);
      console.warn(`CORS: Unrecognized origin "${origin}" — allowing anyway`);
      callback(null, true);
    },
    credentials: true
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    status: 'OK',
    message: 'Server is running',
    database: dbStatus[dbState] || 'unknown'
  });
});

/** Middleware that blocks endpoints when DB is down */
app.use('/api', (req, res, next) => {
  if (req.path === '/health') return next();
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database not connected. Please check MONGO_URI environment variable.'
    });
  }
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || undefined
  });
});

module.exports = app;
