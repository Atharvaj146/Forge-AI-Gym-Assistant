"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { popularFoods, nutritionFacts, mealPlans } from "@/data/nutritionData";
import { FoodCard } from "@/components/FoodCard";
import { MinimalFactCard } from "@/components/MinimalFactCard";

const MacroCalculator = dynamic(() => import("@/components/MacroCalculator"), { ssr: false });

/* ─────────────────────────────────────────────────────────
   FLOATING PILL NAVBAR
───────────────────────────────────────────────────────── */
function FloatingPillNavbar() {
  return (
    <div style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 100, padding: "0 1rem" }}>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="floating-pill-nav"
      >
        <Link href="/" style={{ textDecoration: "none", paddingLeft: "0.75rem", paddingRight: "0.5rem" }}>
          <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.08em", color: "#FFFFFF" }}>
            FORGE
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {[["Home", "/"], ["Workout", "/workout"], ["Nutrition", "/nutrition"], ["AICAM", "/ai-cam"]].map(([label, href]) => (
            <Link key={label} href={href} className={`nav-link-item ${label === "Nutrition" ? "active" : ""}`}>
              {label}
            </Link>
          ))}
        </div>

        <Link href="/login" className="nav-pill-btn">Get Started →</Link>
      </motion.nav>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   EXPANDABLE MEAL PLAN CARD
───────────────────────────────────────────────────────── */
function MealPlanCard({ plan, index }: { plan: typeof mealPlans[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      style={{
        background: "var(--card)",
        border: expanded ? "1px solid rgba(139, 92, 246, 0.4)" : "1px solid var(--border)",
        borderRadius: "18px",
        overflow: "hidden",
        transition: "border-color 0.25s ease",
      }}
    >
      {/* Always-visible header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "1.35rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "1.75rem" }}>{plan.emoji}</span>
          <div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>{plan.name}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 2 }}>{plan.goal}</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "#8B5CF6",
            background: "rgba(139, 92, 246, 0.12)",
            padding: "0.2rem 0.65rem",
            borderRadius: "6px",
            whiteSpace: "nowrap",
          }}>
            {plan.adjustment}
          </span>
          <span style={{
            color: "var(--text-secondary)",
            fontSize: "0.75rem",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            display: "inline-block",
          }}>▼</span>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 1.5rem 1.5rem", borderTop: "1px solid var(--border)" }}>

              {/* Macro split */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginTop: "1.25rem", marginBottom: "1.25rem" }}>
                {[
                  { label: "Protein", value: plan.macroSplit.protein, color: "#8B5CF6" },
                  { label: "Carbs",   value: plan.macroSplit.carbs,   color: "#06B6D4" },
                  { label: "Fat",     value: plan.macroSplit.fat,     color: "#F59E0B" },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "0.85rem",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "1.4rem", fontWeight: 800, color }}>{value}%</div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Key foods */}
              <div style={{ marginBottom: "1.1rem" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>
                  Key Foods
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {plan.keyFoods.map((food) => (
                    <span key={food} style={{
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      padding: "0.2rem 0.65rem",
                      borderRadius: "9999px",
                    }}>
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              {/* Principles */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.5rem" }}>
                  Nutrition Principles
                </div>
                <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
                  {plan.principles.map((p, i) => (
                    <li key={i} style={{ fontSize: "0.845rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.35rem" }}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link href="/login" style={{
                display: "inline-block",
                background: "#8B5CF6",
                color: "#FFF",
                fontSize: "0.8rem",
                fontWeight: 700,
                padding: "0.55rem 1.35rem",
                borderRadius: "9999px",
                textDecoration: "none",
              }}>
                Get My Personalized {plan.name} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   FOOD SEARCH (USDA API)
───────────────────────────────────────────────────────── */
function FoodSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const search = async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/food-search?query=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 600);
  };

  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#8B5CF6", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          USDA FOODDATA CENTRAL
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Food Nutrition Search
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 2 }}>
          Search 600,000+ foods from the official USDA database to get accurate nutritional data.
        </p>
      </div>

      <div style={{ position: "relative", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search any food... (e.g. oatmeal, avocado, brown rice)"
          value={query}
          onChange={handleChange}
          style={{
            width: "100%",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "0.85rem 1.1rem 0.85rem 3rem",
            color: "var(--text-primary)",
            fontSize: "0.95rem",
            outline: "none",
            fontFamily: "inherit",
            boxSizing: "border-box",
          }}
        />
        <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
        {loading && (
          <span style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
            Searching...
          </span>
        )}
      </div>

      {searched && !loading && results.length === 0 && (
        <div style={{ textAlign: "center", color: "var(--text-tertiary)", padding: "2rem", fontSize: "0.9rem" }}>
          No results found. Try a different search term.
        </div>
      )}

      {results.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {results.map((food, idx) => (
            <motion.div
              key={food.fdcId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "capitalize" }}>
                  {food.name.toLowerCase()}
                </div>
                {food.brandOwner && (
                  <div style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", marginTop: 2 }}>{food.brandOwner}</div>
                )}
              </div>

              <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                {[
                  { label: "Cal",     value: food.per100g.calories, sub: "kcal", color: "#FFF" },
                  { label: "Protein", value: `${food.per100g.protein}g`, sub: `${Math.round(food.per100g.protein * 4)} kcal`, color: "#8B5CF6" },
                  { label: "Carbs",   value: `${food.per100g.carbs}g`,   sub: `${Math.round(food.per100g.carbs * 4)} kcal`,   color: "#06B6D4" },
                  { label: "Fat",     value: `${food.per100g.fat}g`,     sub: `${Math.round(food.per100g.fat * 9)} kcal`,     color: "#F59E0B" },
                ].map(({ label, value, sub, color }) => (
                  <div key={label} style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "0.3rem 0.65rem",
                    textAlign: "center",
                    minWidth: 60,
                  }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color }}>{value}</div>
                    <div style={{ fontSize: "0.62rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", marginTop: 1 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          <p style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", textAlign: "center" }}>
            Source: USDA FoodData Central — per 100g
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CATEGORY FILTER PILLS
───────────────────────────────────────────────────────── */
const CATEGORIES = ["all", "protein", "carbs", "fats", "vegetables", "dairy", "fruits"] as const;
type CategoryFilter = typeof CATEGORIES[number];

/* ─────────────────────────────────────────────────────────
   MAIN NUTRITION PAGE
───────────────────────────────────────────────────────── */
export default function NutritionPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredFoods = activeCategory === "all"
    ? popularFoods
    : popularFoods.filter((f) => f.category === activeCategory);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <FloatingPillNavbar />

      <main style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div className="container bento-container-compact">

          {/* ── HERO ── */}
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 3.5rem" }}>
            <div style={{
              display: "inline-block",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#8B5CF6",
              background: "rgba(139, 92, 246, 0.1)",
              padding: "0.25rem 0.85rem",
              borderRadius: "9999px",
              marginBottom: "0.75rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              NUTRITION & FUELLING ENGINE
            </div>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Fuel Your Performance
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "0.5rem", lineHeight: 1.6 }}>
              Science-backed nutrition data, macro tracking, and USDA-verified food breakdowns — all in one place.
            </p>
          </div>

          {/* ── NUTRITION FACTS CARDS ── */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#8B5CF6", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              DID YOU KNOW? — NUTRITION FACTS & SCIENCE
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {nutritionFacts.map((fact, i) => (
                <MinimalFactCard key={i} fact={fact} index={i} />
              ))}
            </div>
          </div>

          {/* ── MACRO CALCULATOR ── */}
          <MacroCalculator />

          {/* ── POPULAR FOODS GRID ── */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.25rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#8B5CF6", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  USDA-VERIFIED NUTRITIONAL DATA
                </div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Popular Foods Breakdown
                </h2>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", background: "var(--card)", padding: "0.6rem", borderRadius: "16px", border: "1px solid var(--border)", marginBottom: "1.5rem" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? "#8B5CF6" : "transparent",
                    color: activeCategory === cat ? "#FFF" : "var(--text-secondary)",
                    border: "none",
                    padding: "0.45rem 1.1rem",
                    borderRadius: "9999px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textTransform: "capitalize",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.1rem" }}>
              {filteredFoods.map((food, i) => (
                <FoodCard key={food.id} food={food} index={i} />
              ))}
            </div>
          </div>

          {/* ── FOOD SEARCH ── */}
          <FoodSearch />

          {/* ── MEAL PLAN CARDS ── */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#8B5CF6", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              STRUCTURED MEAL PLANS
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
              Goal-Based Nutrition Plans
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
              Click any plan below to see the full macro split, key foods, and science-backed principles.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {mealPlans.map((plan, i) => (
                <MealPlanCard key={plan.id} plan={plan} index={i} />
              ))}
            </div>
          </div>

          {/* ── CTA BANNER ── */}
          <div style={{
            background: "rgba(18, 19, 26, 0.95)",
            border: "1px solid rgba(139, 92, 246, 0.35)",
            borderRadius: "22px",
            padding: "3rem 2rem",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(139, 92, 246, 0.12)",
          }}>
            <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Ready for a personalized nutrition plan?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 520, margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
              Save your macro targets, log meals daily, and get AI-generated meal suggestions tailored to your exact goals.
            </p>
            <Link href="/login" style={{
              background: "#FFFFFF",
              color: "#090A0E",
              fontSize: "0.925rem",
              fontWeight: 700,
              padding: "0.85rem 2rem",
              borderRadius: "9999px",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 4px 25px rgba(255,255,255,0.25)",
            }}>
              Create Your Nutrition Profile →
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
