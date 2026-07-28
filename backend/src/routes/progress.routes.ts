import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// ── GET /api/progress/summary ─────────────────────────────
router.get('/summary', authenticate, (req: AuthRequest, res: Response) => {
  // TODO: Aggregate data from Prisma (BMI, streak, sessions)
  res.json({
    success: true,
    summary: {
      userId: req.user!.id,
      currentBMI: 23.1,
      bmiCategory: 'Normal',
      streak: 5,
      sessionsThisWeek: 3,
      sessionsPlanned: 5,
    },
  });
});

// ── GET /api/progress/bmi-trend ───────────────────────────
router.get('/bmi-trend', authenticate, (req: AuthRequest, res: Response) => {
  // TODO: Fetch WeightLog from Prisma, compute BMI over time
  res.json({
    success: true,
    data: [
      { date: '2026-07-01', bmi: 24.0 },
      { date: '2026-07-07', bmi: 23.8 },
      { date: '2026-07-14', bmi: 23.5 },
      { date: '2026-07-21', bmi: 23.1 },
    ],
  });
});

// ── POST /api/progress/weight ─────────────────────────────
router.post('/weight', authenticate, (req: AuthRequest, res: Response) => {
  const { weight } = req.body;
  // TODO: Save to Prisma WeightLog, recompute BMI
  res.status(201).json({ success: true, message: 'Weight logged', weight });
});

// ── GET /api/progress/history ─────────────────────────────
router.get('/history', authenticate, (req: AuthRequest, res: Response) => {
  const { type, from, to } = req.query;
  // TODO: Fetch from Prisma with filters
  res.json({
    success: true,
    history: [],
    filters: { type, from, to },
  });
});

export default router;
