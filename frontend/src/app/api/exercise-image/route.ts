import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const exerciseId = searchParams.get("exerciseId");
  const category = searchParams.get("category") || "";

  // Path to local dataset in public/data/exercises.json
  const jsonPath = path.join(process.cwd(), "public", "data", "exercises.json");

  try {
    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json({ error: "Local exercises.json dataset not found" }, { status: 404 });
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const exercises: any[] = JSON.parse(rawData);

    // CASE 1: Requesting a specific exercise GIF by exerciseId
    if (exerciseId) {
      const match = exercises.find((e) => e.exerciseId === exerciseId || e.id === exerciseId);
      const gifFilename = match?.gifUrl || `${exerciseId}.gif`;
      const gifPath = path.join(process.cwd(), "public", "gif", "gifs_360x360", gifFilename);

      if (fs.existsSync(gifPath)) {
        const fileBuffer = fs.readFileSync(gifPath);
        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": "image/gif",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      }

      return NextResponse.json({ error: "GIF file not found locally" }, { status: 404 });
    }

    // CASE 2: Filtering exercises by category locally
    if (category) {
      const catLower = category.toLowerCase();
      const filtered = exercises.filter((ex) => {
        const bp = (ex.bodyParts || []).map((s: string) => s.toLowerCase());
        const tm = (ex.targetMuscles || []).map((s: string) => s.toLowerCase());
        const sm = (ex.secondaryMuscles || []).map((s: string) => s.toLowerCase());

        if (catLower === "chest") return bp.includes("chest") || tm.includes("pectorals");
        if (catLower === "back") return bp.includes("back") || tm.includes("lats") || tm.includes("upper back") || tm.includes("spine");
        if (catLower === "biceps") return tm.includes("biceps") || sm.includes("biceps") || (bp.includes("upper arms") && tm.includes("biceps"));
        if (catLower === "triceps") return tm.includes("triceps") || sm.includes("triceps") || (bp.includes("upper arms") && tm.includes("triceps"));
        if (catLower === "shoulders") return bp.includes("shoulders") || tm.includes("delts");
        if (catLower === "legs") return bp.includes("upper legs") || bp.includes("lower legs") || tm.includes("glutes") || tm.includes("calves") || tm.includes("quadriceps");
        return false;
      });

      return NextResponse.json(filtered.length > 0 ? filtered : exercises.slice(0, 10));
    }

    return NextResponse.json(exercises);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to load local exercise data" }, { status: 500 });
  }
}
