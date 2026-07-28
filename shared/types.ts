## Shared API Type Contracts
## Both frontend and backend MUST agree on these before coding features

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

// ── AUTH ─────────────────────────────────────────────────

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

// ── PROFILE / ONBOARDING ──────────────────────────────────

export type Goal = 'weight_loss' | 'muscle_gain' | 'endurance' | 'general_fitness';
export type Experience = 'beginner' | 'intermediate' | 'advanced';
export type Sex = 'male' | 'female' | 'other';
export type DietaryPreference = 'vegetarian' | 'non_vegetarian' | 'vegan' | 'lactose_free' | 'jain' | 'diabetic_friendly';
export type WorkoutLocation = 'home' | 'gym';
export type SubscriptionTier = 'basic' | 'intermediate' | 'hardcore';

export type UserProfile = {
  id: string;
  userId: string;
  name: string;
  email: string;
  goal: Goal;
  experienceLevel: Experience;
  height: number;   // cm
  weight: number;   // kg
  age: number;
  sex: Sex;
  dietaryPreference: DietaryPreference;
  location: WorkoutLocation;
  equipment: string[];
  onboardingDone: boolean;
};

export type OnboardingPayload = {
  goal: Goal;
  experience: Experience;
  height: number;
  weight: number;
  age: number;
  sex: Sex;
  dietaryPreference: DietaryPreference;
  location: WorkoutLocation;
  equipment: string[];
};

// ── WORKOUT ───────────────────────────────────────────────

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  description: string;
  difficulty: string;
  equipment: string[];
  animationUrl?: string;
};

export type WorkoutPlanExercise = {
  id: string;
  exerciseId: string;
  exercise: Exercise;
  sets: number;
  reps: number;
  restSecs: number;
  order: number;
};

export type WorkoutPlanDay = {
  id: string;
  dayOfWeek: string;
  sessionType: string;
  exercises: WorkoutPlanExercise[];
};

export type WorkoutPlan = {
  id: string;
  userId: string;
  weekOf: string;
  isActive: boolean;
  days: WorkoutPlanDay[];
};

// ── NUTRITION ─────────────────────────────────────────────

export type Recipe = {
  id: string;
  name: string;
  dietTags: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export type MealLog = {
  id: string;
  recipeId: string;
  recipe: Recipe;
  mealType: MealType;
  portionGrams: number;
  loggedAt: string;
};

// ── PROGRESS ──────────────────────────────────────────────

export type ProgressSummary = {
  currentBMI: number;
  bmiCategory: string;
  streak: number;
  sessionsThisWeek: number;
  sessionsPlanned: number;
};

export type WeightLog = {
  id: string;
  weight: number;
  bmi: number;
  loggedAt: string;
};

// ── CHAT ─────────────────────────────────────────────────

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
};
