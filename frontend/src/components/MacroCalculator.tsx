"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Goal = "bulking" | "cutting" | "maintenance" | "athletic" | "weight-loss";
type Unit = "metric" | "imperial";
type Gender = "male" | "female";
type Activity = "sedentary" | "light" | "moderate" | "active" | "very-active";

interface MacroResult {
  calories: number;
  proteinGrams: number;
  proteinKcal: number;
  carbsGrams: number;
  carbsKcal: number;
  fatGrams: number;
  fatKcal: number;
}

function NumberTicker({ value, unit = "" }: { value: number; unit?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevRef.current = end;
    };

    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span>
      {displayed.toLocaleString()}
      {unit}
    </span>
  );
}

const GOAL_CONFIGS: Record<Goal, { label: string; emoji: string; proteinRatio: number; carbRatio: number; fatRatio: number; adjustment: number }> = {
  bulking:      { label: "Bulking",           emoji: "📈", proteinRatio: 0.30, carbRatio: 0.50, fatRatio: 0.20, adjustment: +400 },
  cutting:      { label: "Cutting",           emoji: "🔥", proteinRatio: 0.40, carbRatio: 0.30, fatRatio: 0.30, adjustment: -400 },
  maintenance:  { label: "Maintenance",       emoji: "⚖️", proteinRatio: 0.30, carbRatio: 0.45, fatRatio: 0.25, adjustment: 0   },
  athletic:     { label: "Athletic Perf.",    emoji: "⚡", proteinRatio: 0.25, carbRatio: 0.55, fatRatio: 0.20, adjustment: +200 },
  "weight-loss":{ label: "Weight Loss",       emoji: "🎯", proteinRatio: 0.40, carbRatio: 0.25, fatRatio: 0.35, adjustment: -600 },
};

const ACTIVITY_MULTIPLIERS: Record<Activity, number> = {
  sedentary:    1.2,
  light:        1.375,
  moderate:     1.55,
  active:       1.725,
  "very-active":1.9,
};

export default function MacroCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [goal, setGoal] = useState<Goal>("maintenance");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("178");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("10");
  const [age, setAge] = useState("24");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<MacroResult | null>(null);

  const calculate = useCallback(() => {
    setErrorMsg("");
    const w = parseFloat(weight);
    const a = parseFloat(age);

    if (!w || isNaN(w) || w <= 0) {
      setErrorMsg("Please enter a valid weight.");
      return;
    }
    if (!a || isNaN(a) || a <= 0) {
      setErrorMsg("Please enter a valid age.");
      return;
    }

    // Convert to metric if imperial
    const weightKg = unit === "imperial" ? w * 0.453592 : w;
    let heightCm: number;
    if (unit === "imperial") {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      heightCm = (ft * 12 + inch) * 2.54;
    } else {
      heightCm = parseFloat(height);
    }

    if (!heightCm || isNaN(heightCm) || heightCm <= 0) {
      setErrorMsg("Please enter a valid height.");
      return;
    }

    // Mifflin-St Jeor BMR Formula
    const bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * a + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * a - 161;

    const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];
    const config = GOAL_CONFIGS[goal];
    const targetCalories = Math.round(tdee + config.adjustment);

    const proteinKcal = Math.round(targetCalories * config.proteinRatio);
    const carbsKcal = Math.round(targetCalories * config.carbRatio);
    const fatKcal = Math.round(targetCalories * config.fatRatio);

    const proteinGrams = Math.round(proteinKcal / 4);
    const carbsGrams = Math.round(carbsKcal / 4);
    const fatGrams = Math.round(fatKcal / 9);

    setResult({
      calories: targetCalories,
      proteinGrams,
      proteinKcal,
      carbsGrams,
      carbsKcal,
      fatGrams,
      fatKcal,
    });
  }, [weight, age, unit, heightFt, heightIn, height, gender, activity, goal]);

  // Handle unit toggle with sensible defaults
  const handleUnitToggle = (newUnit: Unit) => {
    setUnit(newUnit);
    setErrorMsg("");
    setResult(null); // Reset result when unit changes until calculated again
    if (newUnit === "imperial") {
      setWeight("165");
      setHeightFt("5");
      setHeightIn("10");
    } else {
      setWeight("75");
      setHeight("178");
    }
  };

  const inputStyle = {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "0.6rem 0.85rem",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    width: "100%",
    outline: "none",
    fontFamily: "inherit",
  };

  const labelStyle = {
    fontSize: "0.72rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "0.35rem",
    display: "block",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "22px",
        padding: "2rem",
        marginBottom: "3.5rem",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#8B5CF6", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          MACRO CALCULATOR
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Calculate Your Daily Targets
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 4 }}>
          Based on Mifflin-St Jeor — the gold-standard BMR equation used by sports dietitians.
        </p>
      </div>

      {/* Unit Toggle */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {(["metric", "imperial"] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => handleUnitToggle(u)}
            style={{
              background: unit === u ? "#8B5CF6" : "transparent",
              color: unit === u ? "#FFF" : "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "9999px",
              padding: "0.35rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {u === "metric" ? "Metric (kg / cm)" : "Imperial (lbs / ft)"}
          </button>
        ))}
      </div>

      {/* Input Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {/* Gender */}
        <div>
          <label style={labelStyle}>Gender</label>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {(["male", "female"] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                style={{
                  flex: 1,
                  background: gender === g ? "rgba(139, 92, 246, 0.2)" : "rgba(255,255,255,0.04)",
                  border: gender === g ? "1px solid #8B5CF6" : "1px solid var(--border)",
                  color: gender === g ? "#A78BFA" : "var(--text-secondary)",
                  borderRadius: "9px",
                  padding: "0.55rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "capitalize",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div>
          <label style={labelStyle}>Age (years)</label>
          <input
            type="number"
            placeholder="e.g. 24"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Weight */}
        <div>
          <label style={labelStyle}>Weight ({unit === "metric" ? "kg" : "lbs"})</label>
          <input
            type="number"
            placeholder={unit === "metric" ? "e.g. 75" : "e.g. 165"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Height */}
        {unit === "metric" ? (
          <div>
            <label style={labelStyle}>Height (cm)</label>
            <input
              type="number"
              placeholder="e.g. 178"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              style={inputStyle}
            />
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Height (ft)</label>
              <input type="number" placeholder="5" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Height (in)</label>
              <input type="number" placeholder="10" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} style={inputStyle} />
            </div>
          </div>
        )}

        {/* Activity */}
        <div style={{ gridColumn: unit === "metric" ? "2 / 4" : "2 / 4" }}>
          <label style={labelStyle}>Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as Activity)}
            style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
          >
            <option value="sedentary">Sedentary (desk job, no exercise)</option>
            <option value="light">Light (1–3 days/week exercise)</option>
            <option value="moderate">Moderate (3–5 days/week exercise)</option>
            <option value="active">Active (6–7 days/week exercise)</option>
            <option value="very-active">Very Active (2x/day training)</option>
          </select>
        </div>
      </div>

      {/* Goal Selector */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Your Goal</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {(Object.entries(GOAL_CONFIGS) as [Goal, typeof GOAL_CONFIGS[Goal]][]).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setGoal(key)}
              style={{
                background: goal === key ? "#8B5CF6" : "transparent",
                color: goal === key ? "#FFF" : "var(--text-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "9999px",
                padding: "0.45rem 1.1rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {config.emoji} {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Validation Error Message if Any */}
      {errorMsg && (
        <div style={{ color: "#EF4444", fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem" }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Calculate Button */}
      <button
        onClick={calculate}
        style={{
          background: "#8B5CF6",
          color: "#FFF",
          border: "none",
          borderRadius: "9999px",
          padding: "0.75rem 2.5rem",
          fontSize: "0.925rem",
          fontWeight: 700,
          cursor: "pointer",
          transition: "opacity 0.2s ease",
          marginBottom: result ? "1.75rem" : 0,
        }}
      >
        Calculate My Macros →
      </button>

      {/* Results displaying BOTH grams AND kcal — only shown after clicking Calculate button */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              marginBottom: "1rem",
            }}>
              {[
                { label: "Daily Target", grams: null, kcal: result.calories, color: "#FFFFFF" },
                { label: "Protein", grams: result.proteinGrams, kcal: result.proteinKcal, color: "#8B5CF6" },
                { label: "Carbohydrates", grams: result.carbsGrams, kcal: result.carbsKcal, color: "#06B6D4" },
                { label: "Fat", grams: result.fatGrams, kcal: result.fatKcal, color: "#F59E0B" },
              ].map(({ label, grams, kcal, color }) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "1.1rem",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color }}>
                    {grams !== null ? (
                      <>
                        <NumberTicker value={grams} unit="g" />
                        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: 2 }}>
                          (<NumberTicker value={kcal} unit=" kcal" />)
                        </div>
                      </>
                    ) : (
                      <NumberTicker value={kcal} unit=" kcal" />
                    )}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", marginTop: 6, textTransform: "uppercase" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Signup CTA */}
            <div style={{
              background: "rgba(139, 92, 246, 0.08)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              borderRadius: "12px",
              padding: "0.85rem 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>
                Want to save your plan, track daily progress, and get AI-generated meal suggestions?
              </p>
              <a
                href="/login"
                style={{
                  background: "#8B5CF6",
                  color: "#FFF",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  padding: "0.5rem 1.25rem",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Save My Plan →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
