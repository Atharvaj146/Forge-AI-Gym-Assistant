import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// ── Routes ────────────────────────────────────────────────
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import workoutRoutes from './routes/workout.routes';
import nutritionRoutes from './routes/nutrition.routes';
import progressRoutes from './routes/progress.routes';
import chatRoutes from './routes/chat.routes';

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

// ── Health Check ──────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'FORGE API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ── API Routes ────────────────────────────────────────────
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

export default app;
