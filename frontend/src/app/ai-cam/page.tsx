"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Activity, Zap, Shield, Eye, Cpu, Lock, Sparkles } from "lucide-react";

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
          {[
            ["Home", "/"],
            ["Workout", "/workout"],
            ["Nutrition", "/nutrition"],
            ["AICAM", "/ai-cam"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={`nav-link-item ${label === "AICAM" ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link href="/login" className="nav-pill-btn">
          Get Started →
        </Link>
      </motion.nav>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   AUTHENTIC AI CAMERA HUD VIEWFINDER WITH HIGH-ACCURACY VIDEOS
───────────────────────────────────────────────────────── */
function VideoHudShowcase() {
  const [activeProtocol, setActiveProtocol] = useState<"squat" | "curl">("squat");

  const exerciseConfigs = {
    squat: {
      videoSrc: "/videos/squat.mp4",
      title: "Barbell Back Squat",
      target: "Quadriceps & Gluteus",
      angle: "94.2°",
      angleLabel: "KNEE FLEXION",
      status: "Parallel Depth Achieved ✓",
      statusColor: "#10B981",
      reps: "4 / 8",
      tempo: "2-1-2",
    },
    curl: {
      videoSrc: "/videos/bicep_curl.mp4",
      title: "Standing Bicep Curl",
      target: "Biceps Brachii",
      angle: "42.8°",
      angleLabel: "ELBOW FLEXION",
      status: "Peak Contraction ✓",
      statusColor: "#8B5CF6",
      reps: "7 / 10",
      tempo: "1-0-2",
    },
  };

  const current = exerciseConfigs[activeProtocol];

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        padding: "1.75rem",
        marginBottom: "3.5rem",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            AI Camera Telemetry Viewfinder
          </h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: 2 }}>
            Real-time MediaPipe 33-point pose landmarks with live angle calculation
          </p>
        </div>

        {/* Exercise Selector Buttons */}
        <div style={{ display: "flex", gap: "0.4rem", background: "rgba(9, 10, 14, 0.8)", padding: "0.35rem", borderRadius: "12px", border: "1px solid var(--border)" }}>
          {[
            ["squat", "Barbell Squat"],
            ["curl", "Bicep Curl"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveProtocol(key as any)}
              style={{
                background: activeProtocol === key ? "#8B5CF6" : "transparent",
                color: activeProtocol === key ? "#FFFFFF" : "var(--text-secondary)",
                border: "none",
                fontSize: "0.78rem",
                fontFamily: "var(--font-mono)",
                fontWeight: activeProtocol === key ? 700 : 500,
                padding: "0.45rem 1rem",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Video Viewfinder Canvas */}
      <div
        style={{
          width: "100%",
          height: 420,
          background: "#000000",
          borderRadius: "16px",
          border: "1px solid var(--border-purple)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Real MP4 Video Loop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProtocol}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <video
              src={current.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* HUD Reticle Corners */}
        <div style={{ position: "absolute", top: 16, left: 16, borderLeft: "2px solid #8B5CF6", borderTop: "2px solid #8B5CF6", width: 16, height: 16, zIndex: 10 }} />
        <div style={{ position: "absolute", top: 16, right: 16, borderRight: "2px solid #8B5CF6", borderTop: "2px solid #8B5CF6", width: 16, height: 16, zIndex: 10 }} />
        <div style={{ position: "absolute", bottom: 16, left: 16, borderLeft: "2px solid #8B5CF6", borderBottom: "2px solid #8B5CF6", width: 16, height: 16, zIndex: 10 }} />
        <div style={{ position: "absolute", bottom: 16, right: 16, borderRight: "2px solid #8B5CF6", borderBottom: "2px solid #8B5CF6", width: 16, height: 16, zIndex: 10 }} />

        {/* Recording Badge */}
        <div style={{ position: "absolute", top: 18, left: 18, background: "rgba(9, 10, 14, 0.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(139, 92, 246, 0.4)", borderRadius: "8px", padding: "0.35rem 0.75rem", display: "flex", alignItems: "center", gap: "0.4rem", zIndex: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", boxShadow: "0 0 8px #EF4444" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#FFFFFF", fontWeight: 700 }}>
            REC ● AICAM HUD (60 FPS)
          </span>
        </div>

        {/* Top-Right Telemetry Badges */}
        <div style={{ position: "absolute", top: 18, right: 18, display: "flex", gap: "0.5rem", zIndex: 10 }}>
          <div style={{ background: "rgba(9, 10, 14, 0.85)", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.4rem 0.75rem", backdropFilter: "blur(8px)", textAlign: "right" }}>
            <div style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>{current.angleLabel}</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#8B5CF6", fontFamily: "var(--font-mono)" }}>{current.angle}</div>
          </div>
          <div style={{ background: "rgba(9, 10, 14, 0.85)", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.4rem 0.75rem", backdropFilter: "blur(8px)", textAlign: "right" }}>
            <div style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>REPS LOGGED</div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>{current.reps}</div>
          </div>
        </div>

        {/* Bottom Lock Overlay Badge */}
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(18, 19, 26, 0.92)",
            border: "1px solid var(--border-purple)",
            borderRadius: "9999px",
            padding: "0.45rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
            zIndex: 10,
          }}
        >
          <Lock size={14} color="#8B5CF6" />
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            Login required to launch live webcam stream
          </span>
          <Link
            href="/login"
            style={{
              background: "#FFFFFF",
              color: "#090A0E",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              textDecoration: "none",
              marginLeft: "0.25rem",
            }}
          >
            Activate →
          </Link>
        </div>
      </div>

      {/* Bottom Telemetry Metrics Strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.85rem", marginTop: "1.25rem" }}>
        {[
          { label: "PROTOCOL TITLE", val: current.title, color: "var(--text-primary)" },
          { label: "TARGET MUSCLE", val: current.target, color: "var(--text-secondary)" },
          { label: "FORM VERIFICATION", val: current.status, color: current.statusColor },
          { label: "ACCURACY RATE", val: "99.4% Match", color: "#8B5CF6" },
        ].map((item) => (
          <div key={item.label} style={{ background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "12px", padding: "0.85rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>{item.label}</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: item.color, marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {item.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   HOW IT WORKS — 3-STEP FLOW
───────────────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Position Your Device",
      desc: "Place your phone or laptop camera 6 to 8 feet away. No external sensors, wearables, or manual calibration required.",
      tag: "SETUP IN 5 SECONDS",
    },
    {
      num: "02",
      title: "AI Maps 33 Joint Vectors",
      desc: "Our MediaPipe engine calculates joint angles at 60 FPS in real-time, mapping shoulders, hips, knees, and ankles.",
      tag: "REAL-TIME TRIGONOMETRY",
    },
    {
      num: "03",
      title: "Instant Audio-Visual Feedback",
      desc: "Get instantaneous visual telemetry overlays and voice cues whenever form breaks down or target depth is achieved.",
      tag: "REAL-TIME CORRECTION",
    },
  ];

  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 3.5rem" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#8B5CF6",
            background: "rgba(139, 92, 246, 0.1)",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            marginBottom: "0.75rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          SIMPLE WORKFLOW
        </div>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
          How AI Cam Works
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
          Zero setup overhead. Pure computer vision running directly in your browser.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {steps.map((s, idx) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bento-card-clean"
            style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255, 255, 255, 0.08)",
                  lineHeight: 1,
                  marginBottom: "1rem",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "#8B5CF6",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                {s.tag}
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FEATURE BENTO GRID
───────────────────────────────────────────────────────── */
function FeatureBentoGrid() {
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 3.5rem" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#8B5CF6",
            background: "rgba(139, 92, 246, 0.1)",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            marginBottom: "0.75rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          PRECISION ENGINEERING
        </div>
        <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
          Built for Biomechanical Precision
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.25rem" }}>
        <div className="bento-card-clean" style={{ gridColumn: "span 7" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
              01 · TRIGONOMETRY ENGINE
            </span>
            <Activity size={18} color="#8B5CF6" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            33-Point Real-Time Joint Telemetry
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Continuous 3D angle monitoring for hips, knees, elbows, and spine alignment to ensure true depth on every single repetition.
          </p>

          <div style={{ background: "rgba(9, 10, 14, 0.7)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: 8 }}>
              <span>Squat Knee Flexion</span>
              <span style={{ color: "#8B5CF6", fontWeight: 700, fontFamily: "var(--font-mono)" }}>94.2° (Target: &lt;95°)</span>
            </div>
            <div style={{ height: 6, background: "rgba(255, 255, 255, 0.08)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: "94.2%", height: "100%", background: "linear-gradient(90deg, #3B82F6, #8B5CF6)" }} />
            </div>
          </div>
        </div>

        <div className="bento-card-clean" style={{ gridColumn: "span 5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
              02 · REPETITION LOGIC
            </span>
            <Zap size={18} color="#3B82F6" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Automated Rep &amp; TUT Tracking
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Detects eccentric and concentric phase transitions automatically so you never have to count reps manually again.
          </p>

          <div style={{ padding: "0.85rem", background: "rgba(9, 10, 14, 0.7)", border: "1px solid var(--border)", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-tertiary)" }}>ACTIVE TUT</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF", marginTop: 2 }}>2.4s per Rep</div>
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#3B82F6", fontFamily: "var(--font-mono)" }}>
              REP 8/10
            </div>
          </div>
        </div>

        <div className="bento-card-clean" style={{ gridColumn: "span 5" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
              03 · FORM GRADING
            </span>
            <Eye size={18} color="#10B981" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Instant Biomechanical Scoring
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Receive an instantaneous form grade (A+ through F) after each set based on symmetry, depth consistency, and control.
          </p>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, padding: "0.6rem", background: "rgba(9, 10, 14, 0.7)", border: "1px solid var(--border)", borderRadius: "8px" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>DEPTH</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10B981", marginTop: 2 }}>✓ PASS</div>
            </div>
            <div style={{ flex: 1, padding: "0.6rem", background: "rgba(9, 10, 14, 0.7)", border: "1px solid var(--border)", borderRadius: "8px" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>TEMPO</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10B981", marginTop: 2 }}>✓ STABLE</div>
            </div>
          </div>
        </div>

        <div className="bento-card-clean" style={{ gridColumn: "span 7" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>
              04 · EXERCISE PROTOCOLS
            </span>
            <Cpu size={18} color="#8B5CF6" />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Supported Movement Library
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
            Custom trigonometric profiles pre-tuned for major compound and isolation movements.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["Barbell Squat", "Deadlift", "Bench Press", "Overhead Press", "Barbell Row", "EZ-Bar Curl"].map((ex) => (
              <span
                key={ex}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid var(--border)",
                  borderRadius: "9999px",
                  padding: "0.3rem 0.75rem",
                  fontSize: "0.75rem",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B5CF6" }} />
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   INTERACTIVE KINEMATIC SCRUBBER SIMULATOR
───────────────────────────────────────────────────────── */
function KinematicSimulator() {
  const [progress, setProgress] = useState(65);

  const getJointAngle = () => {
    return Math.round(180 - (progress / 100) * 96);
  };

  const getFormStatus = () => {
    if (progress < 25) return { text: "Eccentric Descent", color: "var(--text-secondary)" };
    if (progress < 70) return { text: "Parallel Depth Target Achieved", color: "#10B981" };
    return { text: "Deep Squat — Maximum Flexion", color: "#8B5CF6" };
  };

  const status = getFormStatus();

  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "2rem",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "#8B5CF6", marginBottom: "0.4rem", textTransform: "uppercase" }}>
            INTERACTIVE DEMO
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Test the Angle Calculation Engine
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: 4 }}>
            Scrub the movement slider below to observe how the AI calculates joint angles in real time.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>REP DEPTH PHASE</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-mono)", marginTop: 2 }}>{progress}%</div>
          </div>

          <div style={{ background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>KNEE ANGLE</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#8B5CF6", fontFamily: "var(--font-mono)", marginTop: 2 }}>{getJointAngle()}°</div>
          </div>

          <div style={{ background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem", textAlign: "center" }}>
            <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>STATUS CALLBACK</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: status.color, marginTop: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {status.text}
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)", marginBottom: "0.5rem" }}>
            <span>0% (Top Lockout)</span>
            <span>50% (Parallel Depth)</span>
            <span>100% (Bottom Flexion)</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: "#8B5CF6",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PRIVACY GUARANTEE CARD
───────────────────────────────────────────────────────── */
function PrivacyCard() {
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "1.75rem 2rem",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <div style={{ background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "14px", padding: "0.85rem", color: "#10B981", flexShrink: 0 }}>
          <Shield size={28} />
        </div>
        <div>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            100% On-Device Privacy Guaranteed
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
            Your camera stream never leaves your device. All pose estimation runs locally in your browser using WebGL acceleration. Zero video frames are recorded or saved.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MINIMAL FOOTER
───────────────────────────────────────────────────────── */
function MinimalFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "2.5rem 0", background: "transparent" }}>
      <div className="container bento-container-compact" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: "0.875rem", letterSpacing: "0.08em", color: "#FFFFFF" }}>FORGE</span>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
          <Link href="/workout" style={{ color: "inherit", textDecoration: "none" }}>Workout</Link>
          <Link href="/nutrition" style={{ color: "inherit", textDecoration: "none" }}>Nutrition</Link>
          <Link href="/ai-cam" style={{ color: "inherit", textDecoration: "none" }}>AICAM</Link>
        </div>

        <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>
          © 2026 FORGE Inc.
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN AI CAM LANDING PAGE
───────────────────────────────────────────────────────── */
export default function AICamPage() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh", color: "var(--text-primary)" }}>
      <FloatingPillNavbar />

      <main style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div className="container bento-container-compact">

          {/* ── COMPACT HEADER (Matches Workout & Nutrition Pages) ── */}
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
              AI KINEMATICS &amp; POSE ANALYSIS
            </div>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              AI Camera Coach
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "0.5rem", lineHeight: 1.6 }}>
              Real-time joint trigonometry, 33-point pose landmark estimation, and automated rep counting — 100% in your browser.
            </p>
          </div>

          {/* ── MAIN AI CAMERA VIDEO HUD SHOWCASE ── */}
          <VideoHudShowcase />

          {/* ── HOW IT WORKS ── */}
          <HowItWorks />

          {/* ── FEATURE BENTO GRID ── */}
          <FeatureBentoGrid />

          {/* ── INTERACTIVE KINEMATIC SCRUBBER ── */}
          <KinematicSimulator />

          {/* ── PRIVACY GUARANTEE ── */}
          <PrivacyCard />

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
              Ready to analyze your exercise form?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 520, margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
              Log in to initiate your camera stream, select your exercise protocol, and get instant joint telemetry feedback.
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
              }}
            >
              Unlock AI Camera Coach →
            </Link>
          </div>

        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
