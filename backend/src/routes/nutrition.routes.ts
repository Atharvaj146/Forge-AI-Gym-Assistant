import { Router, Request, Response } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// ── GET /api/nutrition/recipes ────────────────────────────
// Public: general recipe library
router.get('/recipes', (_req: Request, res: Response) => {
  // TODO: Fetch from Prisma Recipe table, filter by diet tags if provided
  res.json({
    success: true,
    recipes: [
      { id: '1', name: 'Grilled Chicken Salad', dietTags: ['non_vegetarian', 'high_protein'], calories: 350 },
      { id: '2', name: 'Paneer Tikka', dietTags: ['vegetarian'], calories: 280 },
      { id: '3', name: 'Oats Smoothie', dietTags: ['vegan', 'vegetarian'], calories: 220 },
    ],
  });
});

// ── GET /api/nutrition/meal-plan ──────────────────────────
// Protected: user's personalised meal plan
router.get('/meal-plan', authenticate, (req: AuthRequest, res: Response) => {
  // TODO: Filter recipes by user's dietary preference + calorie target
  res.json({
    success: true,
    mealPlan: {
      userId: req.user!.id,
      calorieTarget: 2200,
      meals: {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
      },
    },
  });
});

// ── POST /api/nutrition/log ───────────────────────────────
// Protected: log a meal
router.post('/log', authenticate, (req: AuthRequest, res: Response) => {
  const { mealType, recipeId, portionGrams } = req.body;
  // TODO: Save to Prisma MealLog, check dietary conflicts + suggest substitutes
  res.status(201).json({
    success: true,
    message: 'Meal logged',
    data: { mealType, recipeId, portionGrams },
    substitute: null, // TODO: return substitute if dietary conflict detected
  });
});

export default router;
