"use client";

import { motion } from "framer-motion";
import type { FoodItem } from "@/data/nutritionData";

const categoryColor: Record<FoodItem["category"], string> = {
  protein:    "#8B5CF6",
  carbs:      "#06B6D4",
  fats:       "#F59E0B",
  vegetables: "#10B981",
  dairy:      "#EC4899",
  fruits:     "#F97316",
};

export function FoodCard({ food, index }: { food: FoodItem; index: number }) {
  const proteinKcal = Math.round(food.per100g.protein * 4);
  const carbsKcal = Math.round(food.per100g.carbs * 4);
  const fatKcal = Math.round(food.per100g.fat * 9);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.035 }}
      whileHover={{ y: -3 }}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>{food.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {food.name}
          </div>
          <div style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            color: categoryColor[food.category],
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginTop: 2,
          }}>
            {food.category}
          </div>
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          fontWeight: 800,
          color: "#FFFFFF",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--border)",
          padding: "0.2rem 0.55rem",
          borderRadius: "7px",
          whiteSpace: "nowrap",
        }}>
          {food.per100g.calories} kcal
        </div>
      </div>

      {/* Macro Bar */}
      <div>
        <div style={{ display: "flex", gap: "0.35rem", height: 5, borderRadius: 9999, overflow: "hidden", marginBottom: "0.55rem" }}>
          <div style={{ flex: food.per100g.protein, background: "#8B5CF6", borderRadius: 9999 }} />
          <div style={{ flex: food.per100g.carbs,   background: "#06B6D4", borderRadius: 9999 }} />
          <div style={{ flex: food.per100g.fat,     background: "#F59E0B", borderRadius: 9999 }} />
        </div>

        {/* Macro List showing BOTH Grams AND kcal */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 0.75rem" }}>
          {[
            { label: "Protein", grams: food.per100g.protein, kcal: proteinKcal, color: "#8B5CF6" },
            { label: "Carbs",   grams: food.per100g.carbs,   kcal: carbsKcal,   color: "#06B6D4" },
            { label: "Fat",     grams: food.per100g.fat,     kcal: fatKcal,     color: "#F59E0B" },
            { label: "Fiber",   grams: food.per100g.fiber,   kcal: null,        color: "#10B981" },
          ].map(({ label, grams, kcal, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
                {label}: <strong style={{ color: "var(--text-primary)" }}>{grams}g</strong>
                {kcal !== null && <span style={{ color: "var(--text-tertiary)", fontSize: "0.68rem" }}> ({kcal} kcal)</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", lineHeight: 1.5, margin: 0 }}>
        {food.description}
      </p>

      <div style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>
        Per 100g serving
      </div>
    </motion.div>
  );
}
