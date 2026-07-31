import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "query parameter is required" }, { status: 400 });
  }

  const apiKey = process.env.USDA_API_KEY || "DEMO_KEY";

  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&api_key=${apiKey}&dataType=SR%20Legacy,Foundation&pageSize=8`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "USDA API error" }, { status: response.status });
    }

    const data = await response.json();

    // Normalize USDA response to a simpler format
    const foods = (data.foods || []).map((food: any) => {
      const getNutrient = (id: number) => {
        const n = food.foodNutrients?.find((fn: any) => fn.nutrientId === id);
        return n ? Math.round(n.value * 10) / 10 : 0;
      };

      return {
        fdcId: food.fdcId,
        name: food.description,
        brandOwner: food.brandOwner || null,
        per100g: {
          calories: getNutrient(1008),
          protein: getNutrient(1003),
          carbs: getNutrient(1005),
          fat: getNutrient(1004),
          fiber: getNutrient(1079),
        },
      };
    });

    return NextResponse.json(foods);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch food data" }, { status: 500 });
  }
}
