import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const router = Router();

// ── Validation Schemas ────────────────────────────────────
const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ── POST /api/auth/signup ─────────────────────────────────
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = signupSchema.parse(req.body);

    // TODO: Check if user already exists via Prisma
    // const existing = await prisma.user.findUnique({ where: { email } });
    // if (existing) return res.status(409).json({ success: false, message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);

    // TODO: Create user in DB
    // const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });

    const token = jwt.sign(
      { id: 'stub-user-id', email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: { id: 'stub-user-id', name, email },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: err.errors });
    } else {
      res.status(500).json({ success: false, message: 'Signup failed' });
    }
  }
});

// ── POST /api/auth/login ──────────────────────────────────
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // TODO: Find user in DB
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    // const valid = await bcrypt.compare(password, user.password);
    // if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: 'stub-user-id', email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      token,
      user: { id: 'stub-user-id', email },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, errors: err.errors });
    } else {
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  }
});

// ── POST /api/auth/logout ─────────────────────────────────
router.post('/logout', (_req: Request, res: Response) => {
  // JWT is stateless — client drops the token
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
