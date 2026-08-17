"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { exercisesData } from "@/data/exercisesData";
import { MinimalFactCard } from "@/components/MinimalFactCard";

/* ─────────────────────────────────────────────────────────
   FLOATING PILL NAVBAR (Clean FORGE Text — No Circle Icon)
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
        {/* Left Clean FORGE Text Logo */}
        <Link href="/" style={{ textDecoration: "none", paddingLeft: "0.75rem", paddingRight: "0.5rem" }}>
          <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.08em", color: "#FFFFFF" }}>
            FORGE
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {[
            ["Home", "/"],
            ["Workout", "/workout"],
            ["Nutrition", "/nutrition"],
            ["AICAM", "/ai-cam"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={`nav-link-item ${label === "Workout" ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <Link href="/login" className="nav-pill-btn">
          Get Started →
        </Link>
      </motion.nav>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FALLBACK VECTOR ANIMATION GRAPHIC
───────────────────────────────────────────────────────── */
function VectorFallbackSimulation({ category }: { category: string }) {
  const purpleGlow = "#8B5CF6";
  const strokeColor = "rgba(255, 255, 255, 0.4)";

  if (category === "Chest") {
    return (
      <svg width="120" height="120" viewBox="0 0 100 100">
        <line x1="15" y1="75" x2="85" y2="75" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
        <circle cx="26" cy="67" r="6" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="32" y1="69" x2="70" y2="69" stroke={strokeColor} strokeWidth="3.5" />
        <path d="M 40 64 Q 50 58 60 64 Z" fill={purpleGlow} opacity="0.9" />
        <g className="sim-chest-press">
          <line x1="20" y1="42" x2="80" y2="42" stroke="#FFFFFF" strokeWidth="3.5" />
          <circle cx="20" cy="42" r="5" fill={purpleGlow} />
          <circle cx="80" cy="42" r="5" fill={purpleGlow} />
          <line x1="44" y1="69" x2="40" y2="42" stroke={strokeColor} strokeWidth="2" />
          <line x1="56" y1="69" x2="60" y2="42" stroke={strokeColor} strokeWidth="2" />
        </g>
      </svg>
    );
  }

  if (category === "Back") {
    return (
      <svg width="120" height="120" viewBox="0 0 100 100">
        <line x1="20" y1="15" x2="80" y2="15" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        <circle cx="50" cy="35" r="6" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="50" y1="41" x2="50" y2="75" stroke={strokeColor} strokeWidth="3" />
        <path d="M 43 45 Q 36 58 45 70 L 55 70 Q 64 58 57 45 Z" fill={purpleGlow} opacity="0.85" />
        <g className="sim-row">
          <line x1="25" y1="36" x2="75" y2="36" stroke="#FFFFFF" strokeWidth="3.5" />
          <line x1="50" y1="15" x2="50" y2="36" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
        </g>
      </svg>
    );
  }

  if (category === "Biceps") {
    return (
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="22" r="6" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="50" y1="28" x2="50" y2="70" stroke={strokeColor} strokeWidth="3" />
        <circle cx="36" cy="46" r="6" fill={purpleGlow} />
        <g className="sim-curl">
          <line x1="50" y1="34" x2="35" y2="45" stroke={strokeColor} strokeWidth="2.5" />
          <line x1="35" y1="45" x2="25" y2="28" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="25" cy="28" r="4" fill={purpleGlow} />
        </g>
      </svg>
    );
  }

  if (category === "Triceps") {
    return (
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="25" r="6" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="50" y1="31" x2="50" y2="72" stroke={strokeColor} strokeWidth="3" />
        <path d="M 52 38 Q 62 48 54 58 Z" fill={purpleGlow} />
      </svg>
    );
  }

  if (category === "Shoulders") {
    return (
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="42" r="6" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="50" y1="48" x2="50" y2="88" stroke={strokeColor} strokeWidth="3" />
        <circle cx="36" cy="50" r="5" fill={purpleGlow} />
        <circle cx="64" cy="50" r="5" fill={purpleGlow} />
        <g className="sim-shoulder-press">
          <line x1="20" y1="38" x2="38" y2="38" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="62" y1="38" x2="80" y2="38" stroke="#FFFFFF" strokeWidth="3" />
        </g>
      </svg>
    );
  }

  return (
    <svg width="120" height="120" viewBox="0 0 100 100">
      <g className="sim-squat">
        <circle cx="50" cy="20" r="6" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="50" y1="26" x2="50" y2="50" stroke={strokeColor} strokeWidth="3" />
        <path d="M 45 50 L 35 70 L 45 70 Z" fill={purpleGlow} opacity="0.85" />
        <line x1="25" y1="28" x2="75" y2="28" stroke="#FFFFFF" strokeWidth="3.5" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   SINGLE EXERCISE CARD COMPONENT WITH EXERCISEDB METADATA
───────────────────────────────────────────────────────── */
function ExerciseCard({ item, category }: { item: any; category: string }) {
  const [showSteps, setShowSteps] = useState(false);
  const [imgError, setImgError] = useState(false);

  const gifPath = item.gifUrl
    ? item.gifUrl.startsWith("http")
      ? item.gifUrl
      : `/gif/gifs_360x360/${item.gifUrl}`
    : null;

  const exerciseName = item.name ? item.name.toUpperCase() : "EXERCISE";
  const targetName = Array.isArray(item.targetMuscles) ? item.targetMuscles.join(", ") : (item.target || "Target Muscle");
  const equipmentName = Array.isArray(item.equipments) ? item.equipments.join(", ") : (item.equipment || "Equipment");
  const secondaryList: string[] = item.secondaryMuscles || [];
  const instructionsList: string[] = item.instructions || [
    "Position body with proper alignment.",
    "Perform movement through full range of motion under control.",
    "Squeeze target muscle at peak contraction point.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "18px",
        padding: "1.35rem",
        display: "flex",
        gap: "1.35rem",
        alignItems: "flex-start",
      }}
    >
      {/* Left: Local Exercise GIF or Vector Fallback Graphic */}
      <div style={{
        background: "rgba(9, 10, 14, 0.9)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        width: 145,
        height: 135,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}>
        {gifPath && !imgError ? (
          <img
            src={gifPath}
            alt={exerciseName}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <VectorFallbackSimulation category={category} />
        )}
      </div>

      {/* Right: ExerciseDB Rich Metadata */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", textTransform: "capitalize" }}>
              {exerciseName}
            </h3>
            <div style={{ fontSize: "0.8rem", color: "var(--accent-purple)", fontWeight: 600, marginTop: 2, textTransform: "capitalize" }}>
              Target: {targetName}
            </div>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#8B5CF6", background: "rgba(139, 92, 246, 0.12)", padding: "0.25rem 0.65rem", borderRadius: "6px" }}>
            {item.setsReps || "4 Sets × 8–10 Reps"}
          </span>
        </div>

        {/* Equipment & Secondary Muscle Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.85rem" }}>
          <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--border)", padding: "0.15rem 0.55rem", borderRadius: "6px", textTransform: "capitalize" }}>
            Equipment: {equipmentName}
          </span>
          {secondaryList.map((sec) => (
            <span key={sec} style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border)", padding: "0.15rem 0.55rem", borderRadius: "6px", textTransform: "capitalize" }}>
              +{sec}
            </span>
          ))}
        </div>

        {/* Expandable Execution Steps */}
        <button
          onClick={() => setShowSteps(!showSteps)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-secondary)",
            fontSize: "0.78rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: 0,
            marginBottom: showSteps ? "0.65rem" : 0,
          }}
        >
          <span>{showSteps ? "Hide Execution Cues" : "Show Step-by-Step Execution Cues"}</span>
          <span style={{ transform: showSteps ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>↓</span>
        </button>

        {showSteps && (
          <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border)", borderRadius: "10px", padding: "0.75rem 1rem" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-tertiary)", marginBottom: 4, textTransform: "uppercase" }}>EXERCISEDB EXECUTION STEPS</div>
            <ol style={{ paddingLeft: "1.1rem", fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {instructionsList.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN WORKOUT PAGE COMPONENT
───────────────────────────────────────────────────────── */
export default function WorkoutPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Chest");
  const [liveItems, setLiveItems] = useState<any[]>([]);

  const categories = ["Chest", "Back", "Biceps", "Triceps", "Shoulders", "Legs"];

  const scienceFacts = [
    {
      title: "How Muscle Growth Happens",
      tag: "THE HYPERTROPHY RULE",
      desc: "Lifting challenging weights through a full range of motion creates mechanical tension. This signals your body to synthesize new muscle proteins and grow stronger.",
    },
    {
      title: "The 48-Hour Recovery Window",
      tag: "OPTIMAL REST",
      desc: "After a heavy session, your muscles repair and rebuild for 24 to 48 hours. Resting that specific muscle group before training it again guarantees maximum growth.",
    },
    {
      title: "Protect Your Joints First",
      tag: "FORM & ALIGNMENT",
      desc: "Stacking your joints (like keeping elbows directly under wrists when pressing) directs 95%+ of the weight into your muscles while protecting your tendons.",
    },
    {
      title: "Why Rep Speed Matters",
      tag: "TEMPO & TENSION",
      desc: "Lowering weights with a controlled 2–3 second eccentric phase creates up to 40% more muscle stimulus than dropping weights fast.",
    },
    {
      title: "The Mind-Muscle Connection",
      tag: "FOCUS & RECRUITMENT",
      desc: "Studies show actively focusing on squeezing the target muscle during a set increases muscle fiber recruitment by up to 22%.",
    },
    {
      title: "Progressive Overload Blueprint",
      tag: "CONTINUOUS GAINS",
      desc: "Adding just 1 extra rep or 2.5 kg load over time forces your nervous system and muscles to constantly adapt and grow.",
    },
  ];

  // Fetch local exercises from /data/exercises.json
  useEffect(() => {
    let isMounted = true;

    fetch("/data/exercises.json")
      .then((res) => res.json())
      .then((data: any[]) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const filtered = data.filter((ex) => {
            const bp = (ex.bodyParts || []).map((s: string) => s.toLowerCase());
            const tm = (ex.targetMuscles || []).map((s: string) => s.toLowerCase());
            const sm = (ex.secondaryMuscles || []).map((s: string) => s.toLowerCase());
            const cat = activeCategory.toLowerCase();

            if (cat === "chest") return bp.includes("chest") || tm.includes("pectorals");
            if (cat === "back") return bp.includes("back") || tm.includes("lats") || tm.includes("upper back") || tm.includes("spine");
            if (cat === "biceps") return tm.includes("biceps") || sm.includes("biceps") || (bp.includes("upper arms") && tm.includes("biceps"));
            if (cat === "triceps") return tm.includes("triceps") || sm.includes("triceps") || (bp.includes("upper arms") && tm.includes("triceps"));
            if (cat === "shoulders") return bp.includes("shoulders") || tm.includes("delts");
            if (cat === "legs") return bp.includes("upper legs") || bp.includes("lower legs") || tm.includes("glutes") || tm.includes("calves") || tm.includes("quadriceps");
            return false;
          });

          setLiveItems(filtered.length > 0 ? filtered : data.slice(0, 5));
        } else {
          setLiveItems(exercisesData[activeCategory] || []);
        }
      })
      .catch(() => {
        if (isMounted) setLiveItems(exercisesData[activeCategory] || []);
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <div style={{ background: "transparent", minHeight: "100vh", color: "var(--text-primary)" }}>
      <FloatingPillNavbar />

      <main style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div className="container bento-container-compact">
          
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 3rem" }}>
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
              EXERCISE & BIOMECHANICS ENGINE
            </div>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Biomechanics & Exercise Guide
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "0.5rem" }}>
              Science-backed workout guides, ExerciseDB anatomical maps, and step-by-step movement cues.
            </p>
          </div>

          {/* 1. DID YOU KNOW? 6 Science Facts with Minimal Lift Micro-Scale Cards */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#8B5CF6", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                DID YOU KNOW? — WORKOUT FACTS & INSIGHTS
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {scienceFacts.map((fact, i) => (
                <MinimalFactCard key={i} fact={fact} index={i} />
              ))}
            </div>
          </div>

          {/* 2. EXERCISEDB LIBRARY */}
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  ExerciseDB Engine ({activeCategory})
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 2 }}>
                  Showing verified ExerciseDB 3D movements targeting the {activeCategory} muscle group.
                </p>
              </div>
            </div>

            {/* Muscle Category Selector Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", background: "var(--card)", padding: "0.6rem", borderRadius: "16px", border: "1px solid var(--border)", marginBottom: "2rem" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? "#8B5CF6" : "transparent",
                    color: activeCategory === cat ? "#FFFFFF" : "var(--text-secondary)",
                    border: "none",
                    padding: "0.55rem 1.35rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Exercise List for Active Category */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {(liveItems.length > 0 ? liveItems : exercisesData[activeCategory] || []).map((item, idx) => (
                <ExerciseCard key={item.id || idx} item={item} category={activeCategory} />
              ))}
            </div>

          </div>

          {/* 3. CTA: GENERATE PERSONALISED WORKOUT */}
          <div style={{
            background: "rgba(18, 19, 26, 0.95)",
            border: "1px solid rgba(139, 92, 246, 0.35)",
            borderRadius: "22px",
            padding: "3rem 2rem",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(139, 92, 246, 0.12)",
          }}>
            <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Ready for your custom AI-driven workout plan?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 520, margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
              Unlock real-time camera form correction, progressive overload tracking, and tailored macro split plans.
            </p>

            <Link
              href="/login"
              style={{
                background: "#FFFFFF",
                color: "#090A0E",
                fontSize: "0.925rem",
                fontWeight: 700,
                padding: "0.85rem 2rem",
                borderRadius: "9999px",
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 4px 25px rgba(255,255,255,0.25)",
                transition: "all 0.2s ease",
              }}
            >
              Generate Personalised Workout →
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
