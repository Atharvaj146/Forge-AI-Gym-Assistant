import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// ── GET /api/users/profile ────────────────────────────────
router.get('/profile', authenticate, (req: AuthRequest, res: Response) => {
  // TODO: Fetch from Prisma
  // const profile = await prisma.profile.findUnique({ where: { userId: req.user!.id } });
  res.json({
    success: true,
    user: {
      id: req.user!.id,
      email: req.user!.email,
      // stub — replace with real Prisma data
      name: 'John Doe',
      goal: 'muscle_gain',
      experience: 'intermediate',
      height: 175,
      weight: 75,
      age: 25,
      sex: 'male',
      dietaryPreference: 'non_vegetarian',
      location: 'gym',
    },
  });
});

// ── PATCH /api/users/profile ──────────────────────────────
router.patch('/profile', authenticate, (req: AuthRequest, res: Response) => {
  const updates = req.body;
  // TODO: Update in Prisma
  // await prisma.profile.update({ where: { userId: req.user!.id }, data: updates });
  res.json({ success: true, message: 'Profile updated', updates });
});

// ── POST /api/users/onboarding ────────────────────────────
router.post('/onboarding', authenticate, (req: AuthRequest, res: Response) => {
  const { goal, experience, height, weight, age, sex, dietaryPreference, location, equipment } = req.body;
  // TODO: Save onboarding data + trigger AI plan generation
  res.status(201).json({
    success: true,
    message: 'Onboarding complete. Your plan is being generated.',
    data: { goal, experience, height, weight, age, sex, dietaryPreference, location, equipment },
  });
});

export default router;
