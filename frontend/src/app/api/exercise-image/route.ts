import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const exerciseId = searchParams.get("exerciseId");
  const category = searchParams.get("category") || "";

  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || process.env.RAPIDAPI_KEY || "d259c40a16msh47001b262a50f32p137780jsn669e767e737b";
  const apiHost = process.env.RAPIDAPI_EXERCISEDB_HOST || "exercisedb.p.rapidapi.com";

  // CASE 1: Fetch Official ExerciseDB Image Endpoint by Exercise ID
  if (exerciseId) {
    try {
      const imgRes = await fetch(`https://${apiHost}/image?exerciseId=${encodeURIComponent(exerciseId)}&resolution=360`, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
      });

      if (!imgRes.ok) {
        return new NextResponse(`ExerciseDB Image Error: ${imgRes.statusText}`, { status: imgRes.status });
      }

      const arrayBuffer = await imgRes.arrayBuffer();
      return new NextResponse(arrayBuffer, {
        headers: {
          "Content-Type": imgRes.headers.get("content-type") || "image/gif",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    } catch (e: any) {
      return new NextResponse(`Image stream error: ${e.message}`, { status: 500 });
    }
  }

  // CASE 2: Query exercise data by category from RapidAPI ExerciseDB
  try {
    let endpoint = `https://${apiHost}/exercises?limit=30`;

    const catLower = category.toLowerCase();
    if (catLower === "chest") {
      endpoint = `https://${apiHost}/exercises/bodyPart/chest`;
    } else if (catLower === "back") {
      endpoint = `https://${apiHost}/exercises/bodyPart/back`;
    } else if (catLower === "biceps") {
      endpoint = `https://${apiHost}/exercises/target/biceps`;
    } else if (catLower === "triceps") {
      endpoint = `https://${apiHost}/exercises/target/triceps`;
    } else if (catLower === "shoulders") {
      endpoint = `https://${apiHost}/exercises/bodyPart/shoulders`;
    } else if (catLower === "legs") {
      endpoint = `https://${apiHost}/exercises/bodyPart/upper%20legs`;
    }

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `RapidAPI error: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch exercise data" }, { status: 500 });
  }
}
