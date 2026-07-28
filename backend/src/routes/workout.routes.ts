import { Router, Request, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// ── GET /api/workouts/exercises ───────────────────────────
// Public: exercise library (pre-login browsable)
router.get('/exercises', (_req: Request, res: Response) => {
  // TODO: Fetch from Prisma Exercise table
  res.json({
    success: true,
    exercises: [
      { id: '1', name: 'Bench Press', muscleGroup: 'chest', description: 'Barbell chest press', sets: 3, reps: 10 },
      { id: '2', name: 'Pull-Ups', muscleGroup: 'back', description: 'Bodyweight pull-ups', sets: 3, reps: 8 },
      { id: '3', name: 'Squats', muscleGroup: 'legs', description: 'Barbell back squat', sets: 4, reps: 8 },
    ],
  });
});

// ── GET /api/workouts/plan ────────────────────────────────
// Protected: user's current week plan
router.get('/plan', authenticate, (req: AuthRequest, res: Response) => {
  // TODO: Fetch from Prisma WorkoutPlan for req.user!.id
  res.json({
    success: true,
    plan: {
      id: 'stub-plan-1',
      userId: req.user!.id,
      weekOf: new Date().toISOString(),
      days: [
        { day: 'Monday', sessionType: 'Chest & Triceps', exercises: [] },
        { day: 'Tuesday', sessionType: 'Back & Biceps', exercises: [] },
        { day: 'Wednesday', sessionType: 'Rest / Mobility', exercises: [] },
        { day: 'Thursday', sessionType: 'Legs', exercises: [] },
        { day: 'Friday', sessionType: 'Shoulders & Core', exercises: [] },
        { day: 'Saturday', sessionType: 'HIIT / Cardio', exercises: [] },
        { day: 'Sunday', sessionType: 'Rest', exercises: [] },
      ],
    },
  });
});

// ── POST /api/workouts/generate ───────────────────────────
// Protected: generate AI workout plan
router.post('/generate', authenticate, (req: AuthRequest, res: Response) => {
  // TODO: Call OpenAI with user profile context, save plan in Prisma
  res.status(201).json({
    success: true,
    message: 'AI workout plan generated (stub)',
    planId: 'stub-plan-1',
  });
});

// ── POST /api/workouts/log ────────────────────────────────
// Protected: log a completed workout session
router.post('/log', authenticate, (req: AuthRequest, res: Response) => {
  const { planDayId, exerciseLogs } = req.body;
  // TODO: Save to Prisma WorkoutLog
  res.status(201).json({ success: true, message: 'Workout logged', planDayId, exerciseLogs });
});

export default router;
