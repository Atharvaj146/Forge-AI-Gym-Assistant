import { Router, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// GET /api/chat/history
router.get('/history', authenticate, (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    messages: [],
    disclaimer: "FORGE's AI Coach does not provide medical advice.",
  });
});

// POST /api/chat/message
router.post('/message', authenticate, (req: AuthRequest, res: Response) => {
  const { message } = req.body;
  // TODO: Call OpenAI, save to Prisma ChatMessage
  res.json({
    success: true,
    reply: `[AI stub] You said: "${message}". Real AI responses coming in Week 4.`,
    disclaimer: "FORGE's AI Coach does not provide medical advice.",
  });
});

export default router;
