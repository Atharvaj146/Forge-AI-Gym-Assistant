import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load env early
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Health Check ──────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'FORGE API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

async function startServer() {
  // Import routes after env is loaded so modules that use process.env work correctly
  const authRoutes = (await import('./routes/auth.routes')).default;
  const userRoutes = (await import('./routes/user.routes')).default;
  const workoutRoutes = (await import('./routes/workout.routes')).default;
  const nutritionRoutes = (await import('./routes/nutrition.routes')).default;
  const progressRoutes = (await import('./routes/progress.routes')).default;
  const chatRoutes = (await import('./routes/chat.routes')).default;

  // ── API Routes ───────────────────────────────────────────-
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/workouts', workoutRoutes);
  app.use('/api/nutrition', nutritionRoutes);
  app.use('/api/progress', progressRoutes);
  app.use('/api/chat', chatRoutes);

  // ── 404 Handler ───────────────────────────────────────────
  app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  // ── Error Handler ─────────────────────────────────────────
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  });

  app.listen(PORT, () => {
    console.log(`🚀 FORGE API running at http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});

export default app;
