export interface FoodItem {
  id: string;
  name: string;
  category: "protein" | "carbs" | "fats" | "vegetables" | "dairy" | "fruits";
  per100g: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  emoji: string;
  description: string;
}

export const popularFoods: FoodItem[] = [
  {
    id: "chicken-breast",
    name: "Chicken Breast",
    category: "protein",
    per100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    emoji: "🍗",
    description: "Lean protein powerhouse, ideal for muscle building and fat loss.",
  },
  {
    id: "brown-rice",
    name: "Brown Rice",
    category: "carbs",
    per100g: { calories: 216, protein: 4.5, carbs: 45, fat: 1.8, fiber: 3.5 },
    emoji: "🍚",
    description: "Complex carbohydrate with sustained energy release and gut-friendly fiber.",
  },
  {
    id: "whole-eggs",
    name: "Whole Eggs",
    category: "protein",
    per100g: { calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
    emoji: "🥚",
    description: "Complete protein source with all essential amino acids and healthy fats.",
  },
  {
    id: "rolled-oats",
    name: "Rolled Oats",
    category: "carbs",
    per100g: { calories: 379, protein: 13, carbs: 68, fat: 6.5, fiber: 10 },
    emoji: "🌾",
    description: "High-fiber slow-digesting carbohydrate, perfect for sustained morning energy.",
  },
  {
    id: "salmon",
    name: "Atlantic Salmon",
    category: "protein",
    per100g: { calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
    emoji: "🐟",
    description: "Rich in omega-3 fatty acids and high-quality protein for recovery.",
  },
  {
    id: "sweet-potato",
    name: "Sweet Potato",
    category: "carbs",
    per100g: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 },
    emoji: "🍠",
    description: "Nutrient-dense complex carb loaded with beta-carotene and potassium.",
  },
  {
    id: "almonds",
    name: "Almonds",
    category: "fats",
    per100g: { calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5 },
    emoji: "🌰",
    description: "Heart-healthy monounsaturated fats with vitamin E and magnesium.",
  },
  {
    id: "greek-yogurt",
    name: "Greek Yogurt",
    category: "dairy",
    per100g: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0 },
    emoji: "🥛",
    description: "Probiotic-rich high-protein dairy ideal for muscle repair and gut health.",
  },
  {
    id: "banana",
    name: "Banana",
    category: "fruits",
    per100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
    emoji: "🍌",
    description: "Quick-digesting carbohydrate with potassium — ideal pre/post workout fuel.",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    category: "vegetables",
    per100g: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6 },
    emoji: "🥦",
    description: "High-volume, low-calorie vegetable packed with Vitamin C and antioxidants.",
  },
  {
    id: "cottage-cheese",
    name: "Cottage Cheese",
    category: "dairy",
    per100g: { calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0 },
    emoji: "🧀",
    description: "Casein-rich slow-digesting protein, excellent as a bedtime snack.",
  },
  {
    id: "quinoa",
    name: "Quinoa",
    category: "carbs",
    per100g: { calories: 222, protein: 8.1, carbs: 39, fat: 3.6, fiber: 5 },
    emoji: "🌿",
    description: "Complete plant protein with all 9 essential amino acids and complex carbs.",
  },
  {
    id: "avocado",
    name: "Avocado",
    category: "fats",
    per100g: { calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 6.7 },
    emoji: "🥑",
    description: "Rich in heart-healthy monounsaturated fats, fiber, and folate.",
  },
  {
    id: "tuna",
    name: "Canned Tuna",
    category: "protein",
    per100g: { calories: 116, protein: 26, carbs: 0, fat: 1, fiber: 0 },
    emoji: "🐠",
    description: "Ultra-lean protein with minimal fat — the athlete's budget protein source.",
  },
  {
    id: "olive-oil",
    name: "Olive Oil",
    category: "fats",
    per100g: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
    emoji: "🫒",
    description: "Anti-inflammatory extra virgin oil, cornerstone of the Mediterranean diet.",
  },
  {
    id: "lentils",
    name: "Lentils (Cooked)",
    category: "protein",
    per100g: { calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9 },
    emoji: "🫘",
    description: "Plant-based protein rich in iron, folate, and cholesterol-lowering fiber.",
  },
  {
    id: "blueberries",
    name: "Blueberries",
    category: "fruits",
    per100g: { calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4 },
    emoji: "🫐",
    description: "Antioxidant powerhouse reducing inflammation and oxidative stress post-workout.",
  },
  {
    id: "spinach",
    name: "Spinach",
    category: "vegetables",
    per100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
    emoji: "🥬",
    description: "Iron-rich leafy green with nitrates that improve exercise efficiency.",
  },
  {
    id: "whey-protein",
    name: "Whey Protein (Powder)",
    category: "protein",
    per100g: { calories: 400, protein: 80, carbs: 8, fat: 5, fiber: 0 },
    emoji: "💪",
    description: "Fast-absorbing complete protein supplement for immediate post-workout muscle synthesis.",
  },
  {
    id: "peanut-butter",
    name: "Peanut Butter",
    category: "fats",
    per100g: { calories: 588, protein: 25, carbs: 20, fat: 50, fiber: 6 },
    emoji: "🥜",
    description: "Calorie-dense fat and protein combo, excellent for bulking calorie targets.",
  },
];

export const nutritionFacts = [
  {
    title: "Protein Builds & Repairs Muscle",
    tag: "PROTEIN SCIENCE",
    desc: "Every gram of protein you eat is broken into amino acids your muscles use to rebuild damaged fibers after training. Aim for 1.6–2.2g per kg of bodyweight daily.",
  },
  {
    title: "Carbs Are Not the Enemy",
    tag: "CARBOHYDRATES",
    desc: "Carbohydrates are your body's primary fuel source. Cutting them too low crashes workout performance. The quality and timing of carbs matter far more than the amount.",
  },
  {
    title: "Eating Fat Won't Make You Fat",
    tag: "DIETARY FATS",
    desc: "Healthy fats from sources like avocado, olive oil, and nuts support testosterone production, joint health, and fat-soluble vitamin absorption.",
  },
  {
    title: "Calories In vs. Calories Out",
    tag: "ENERGY BALANCE",
    desc: "Body composition changes are fundamentally driven by the calorie balance equation. Protein intake and training determine whether you gain muscle or lose fat within that deficit.",
  },
  {
    title: "Nutrient Timing Matters for Athletes",
    tag: "MEAL TIMING",
    desc: "Consuming 30–40g protein within 2 hours post-workout maximizes muscle protein synthesis. Pre-workout carbs of 30–60g improve performance in sessions over 60 minutes.",
  },
  {
    title: "Fiber Regulates Everything",
    tag: "GUT HEALTH",
    desc: "25–35g of daily fiber improves gut microbiome diversity, regulates blood sugar, reduces hunger, and supports better hormone production including insulin sensitivity.",
  },
];

export const mealPlans = [
  {
    id: "bulking",
    name: "Bulking Plan",
    goal: "Build Maximum Muscle Mass",
    emoji: "📈",
    adjustment: "+400 kcal above TDEE",
    macroSplit: { protein: 25, carbs: 50, fat: 25 },
    keyFoods: ["Chicken Breast", "Brown Rice", "Whole Eggs", "Oats", "Peanut Butter", "Banana"],
    principles: [
      "Eat in a controlled caloric surplus of 300–500 kcal to maximize muscle gain while minimizing fat storage.",
      "Prioritize 1.6–2.0g protein per kg bodyweight (ISSN recommendation) to support muscle protein synthesis.",
      "Time the majority of carbohydrates around workouts for peak performance and glycogen replenishment.",
      "Keep fat at 25%+ of calories to support testosterone production and hormonal health.",
    ],
  },
  {
    id: "cutting",
    name: "Cutting Plan",
    goal: "Lose Fat While Preserving Muscle",
    emoji: "🔥",
    adjustment: "−400 kcal below TDEE",
    macroSplit: { protein: 35, carbs: 40, fat: 25 },
    keyFoods: ["Chicken Breast", "Broccoli", "Greek Yogurt", "Spinach", "Sweet Potato", "Tuna"],
    principles: [
      "Maintain a moderate calorie deficit of 300–500 kcal to lose fat without sacrificing hard-earned muscle.",
      "Keep protein at 1.6–2.2g per kg (ISSN-backed) to preserve lean mass during a caloric deficit.",
      "Fill your plate with high-volume, low-calorie vegetables to stay satiated throughout the day.",
      "Maintain fat at 25% of calories — the USDA minimum for hormonal health and nutrient absorption.",
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance Plan",
    goal: "Sustain Bodyweight & Performance",
    emoji: "⚖️",
    adjustment: "At TDEE",
    macroSplit: { protein: 25, carbs: 50, fat: 25 },
    keyFoods: ["Quinoa", "Salmon", "Avocado", "Greek Yogurt", "Blueberries", "Lentils"],
    principles: [
      "Match calorie intake to energy expenditure to maintain current body composition.",
      "Keep protein at 1.4–1.6g per kg (ISSN baseline) to preserve muscle mass during consistent training.",
      "Prioritize whole food micronutrient density — vitamins, minerals, and antioxidants for longevity.",
      "Balanced 25/50/25 split aligns with USDA AMDR guidelines for long-term health and sustainability.",
    ],
  },
  {
    id: "athletic",
    name: "Athletic Performance Plan",
    goal: "Maximize Sport Performance",
    emoji: "⚡",
    adjustment: "+200 kcal + high carb ratio",
    macroSplit: { protein: 20, carbs: 55, fat: 25 },
    keyFoods: ["Brown Rice", "Banana", "Salmon", "Sweet Potato", "Oats", "Blueberries"],
    principles: [
      "Carbohydrates are your primary performance fuel — prioritize 5–7g per kg bodyweight on training days.",
      "Optimize glycogen stores before competition with a carb-loading protocol 24–48 hours prior.",
      "Keep fat at 25% minimum — essential for joint health and fat-soluble vitamin absorption during high-volume training.",
      "Electrolyte and hydration management is as important as solid food — aim for 3–4L water daily during training.",
    ],
  },
  {
    id: "weight-loss",
    name: "Weight Loss Plan",
    goal: "Aggressive Fat Loss",
    emoji: "🎯",
    adjustment: "−500 kcal below TDEE",
    macroSplit: { protein: 30, carbs: 45, fat: 25 },
    keyFoods: ["Chicken Breast", "Eggs", "Broccoli", "Spinach", "Cottage Cheese", "Almonds"],
    principles: [
      "Maintain a sustainable deficit of 400–600 kcal — aggressive crash diets lead to muscle loss and metabolic slowdown.",
      "Include at least 2 resistance training sessions per week to preserve metabolic rate and lean mass.",
      "Keep carbs at 45% of calories (USDA AMDR minimum) — too-low carbs cause fatigue and poor training performance.",
      "Track adherence — consistent moderate deficit always outperforms perfect-but-unsustainable crash dieting.",
    ],
  },
];
