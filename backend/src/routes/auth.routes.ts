import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { supabase } from '../lib/supabase';

const router = Router();

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const signToken = (user: { id: string; email: string; name: string }) =>
  jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = signupSchema.parse(req.body);

    console.log('[DEBUG] Signup payload:', { name, email });

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          name: name,
        },
      },
    });

    console.log('[DEBUG] Supabase signUp result:', { authError, authData: authData ? { user: authData.user?.id } : null });

    if (authError || !authData?.user) {
      console.error('[DEBUG] signUp failed detail:', authError);
      return res.status(400).json({ success: false, message: authError?.message || 'Signup failed' });
    }

    const user = {
      id: authData.user.id,
      name: name || authData.user.user_metadata?.full_name || authData.user.email?.split('@')[0] || 'User',
      email: authData.user.email || email,
    };

    const token = signToken(user);
    res.cookie('auth_token', token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: err.errors });
    }

    console.error('Signup failed (exception):', err);
    return res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : 'Signup failed',
      error: err instanceof Error ? err.stack : undefined,
    });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    console.log('[DEBUG] Login payload:', { email });

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    console.log('[DEBUG] Supabase signInWithPassword result:', { authError, userId: authData?.user?.id });

    if (authError || !authData?.user) {
      console.error('[DEBUG] login failed detail:', authError);
      return res.status(401).json({ success: false, message: authError?.message || 'Invalid credentials', error: authError });
    }

    const userName =
      authData.user.user_metadata?.full_name ||
      authData.user.user_metadata?.name ||
      (authData.user.email ? authData.user.email.split('@')[0] : 'User');

    const user = {
      id: authData.user.id,
      name: userName,
      email: authData.user.email || email,
    };

    const token = signToken(user);
    res.cookie('auth_token', token, cookieOptions);

    return res.json({
      success: true,
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: err.errors });
    }

    console.error('Login failed:', err);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
});

router.get('/me', authenticate, async (_req: AuthRequest, res: Response) => {
  try {
    return res.json({ success: true, user: { id: _req.user?.id, email: _req.user?.email, name: _req.user?.name } });
  } catch (err) {
    console.error('Fetch current user failed:', err);
    return res.status(500).json({ success: false, message: 'Unable to fetch user profile' });
  }
});

router.post('/google-callback', async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ success: false, message: 'Missing access token' });
    }

    // Verify the token with Supabase and get the user
    const { data, error } = await supabase.auth.getUser(access_token);

    if (error || !data?.user) {
      console.error('[DEBUG] Google callback token verification failed:', error);
      return res.status(401).json({ success: false, message: error?.message || 'Invalid token' });
    }

    const supabaseUser = data.user;
    const userName =
      supabaseUser.user_metadata?.full_name ||
      supabaseUser.user_metadata?.name ||
      (supabaseUser.email ? supabaseUser.email.split('@')[0] : 'User');

    const user = {
      id: supabaseUser.id,
      name: userName,
      email: supabaseUser.email || '',
    };

    const token = signToken(user);
    res.cookie('auth_token', token, cookieOptions);

    return res.json({
      success: true,
      message: 'Google login successful',
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Google callback failed:', err);
    return res.status(500).json({ success: false, message: 'Google login failed' });
  }
});

router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('auth_token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax' });
  return res.json({ success: true, message: 'Logged out successfully' });
});

export default router;

