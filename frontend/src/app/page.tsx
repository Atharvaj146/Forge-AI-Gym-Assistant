"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { GridBackground } from "@/components/ui/GridBackground";


/* ─────────────────────────────────────────────────────────
   FLOATING PILL NAVBAR (Matching Attached Image 4)
───────────────────────────────────────────────────────── */
function FloatingPillNavbar() {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Workout", href: "/workout" },
    { label: "Nutrition", href: "/nutrition" },
    { label: "AICAM", href: "/ai-cam" },
  ];

  return (
    <div style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 100, padding: "0 1rem" }}>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="floating-pill-nav"
      >
        {/* Left FORGE Text Logo */}
        <Link href="/" style={{ textDecoration: "none", paddingLeft: "0.75rem", paddingRight: "0.5rem" }}>
          <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.08em", color: "#FFFFFF" }}>
            FORGE
          </span>
        </Link>

        {/* Center 4 Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-link-item ${activeTab === item.label ? "active" : ""}`}
              onClick={() => setActiveTab(item.label)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right White Pill Action Button */}
        <Link href="/login" className="nav-pill-btn">
          Get Started →
        </Link>
      </motion.nav>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   HERO SECTION (Clean Sans Typography — Satoshi Style)
───────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <GridBackground type="grid-small" className="min-h-[90vh]">
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "8.5rem",
          paddingBottom: "4rem",
          overflow: "hidden",
        }}
      >
        {/* Aceternity UI Spotlight Effect */}
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#8B5CF6" />

        <div className="container" style={{ maxWidth: 840, position: "relative", zIndex: 10 }}>
        
        {/* Clean Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}
        >
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border)",
            borderRadius: "9999px",
            padding: "0.3rem 0.85rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6" }} />
            AI Fitness & Performance Copilot
          </div>
        </motion.div>

        {/* Satoshi Style Bold Sans Headline (NO CURSIVE/SERIF) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-title-sans"
          style={{ marginBottom: "1.5rem" }}
        >
          Train Smarter.<br />
          <span className="text-gradient-purple">Lift Better. Become Stronger.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-subtitle-sans"
          style={{ maxWidth: 540, margin: "0 auto 2.5rem" }}
        >
          FORGE combines real-time camera posture analysis with adaptive workout engine programming to optimize your strength progression.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginBottom: "4rem" }}
        >
          <Link
            href="/login"
            style={{
              background: "#FFFFFF",
              color: "#090A0E",
              fontSize: "0.9rem",
              fontWeight: 600,
              padding: "0.75rem 1.6rem",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Start for free →
          </Link>
          <Link
            href="#why-forge"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "0.75rem 1.6rem",
              borderRadius: "9999px",
              border: "1px solid var(--border)",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Learn more
          </Link>
        </motion.div>

        {/* Centered Telemetry Card Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            overflow: "hidden",
            textAlign: "left",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              padding: "0.75rem 1.25rem",
              background: "rgba(255, 255, 255, 0.02)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#3A3B40" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#3A3B40" }} />
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#3A3B40" }} />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-tertiary)" }}>
              forge / telemtry-active
            </div>
            <div style={{ width: 30 }} />
          </div>

          {/* Stat Row */}
          <div style={{ padding: "1.5rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            <div style={{ background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-tertiary)", marginBottom: 4 }}>PROGRAMME</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Hypertrophy Phase</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>Week 3 · Progressive load</div>
            </div>

            <div style={{ background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-tertiary)", marginBottom: 4 }}>AICAM ACCURACY</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#8B5CF6" }}>98.4% Match</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>Real-time camera active</div>
            </div>

            <div style={{ background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-tertiary)", marginBottom: 4 }}>TARGET MACROS</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>2,850 Kcal</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: 2 }}>180g Protein · 320g Carbs</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
    </GridBackground>
  );
}

/* ─────────────────────────────────────────────────────────
   WHY FORGE BENTO GRID (Centered & Compact Clean Layout)
───────────────────────────────────────────────────────── */
function WhyForgeBento() {
  return (
    <section id="why-forge" style={{ padding: "6rem 0" }}>
      <div className="container bento-container-compact">
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto 3.5rem" }}>
          <div style={{
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
          }}>
            CORE PLATFORM
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Everything in One Place
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
            High-performance features designed for optimal training efficiency.
          </p>
        </div>

        {/* Compact Clean Bento Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.25rem" }}>

          {/* Bento Card 1: AI CAM Posture Analysis */}
          <div className="bento-card-clean" style={{ gridColumn: "span 7" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>AICAM SYSTEM</span>
                <span style={{ fontSize: "0.75rem", color: "#8B5CF6", fontWeight: 600 }}>See More →</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                AI Cam Posture Correction
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Real-time camera joint tracking to monitor rep depth and prevent form breakdown.
              </p>
            </div>

            {/* Inner Preview Box */}
            <div style={{ background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: 8 }}>
                <span>Squat Depth Analysis</span>
                <span style={{ color: "#8B5CF6", fontWeight: 600, fontFamily: "var(--font-mono)" }}>94.2° (Passed)</span>
              </div>
              <div style={{ height: 5, background: "rgba(255, 255, 255, 0.08)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: "94.2%", height: "100%", background: "#8B5CF6" }} />
              </div>
            </div>
          </div>

          {/* Bento Card 2: Personalised Workout */}
          <div className="bento-card-clean" style={{ gridColumn: "span 5" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>WORKOUT ENGINE</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>See More →</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Adaptive Workout Routines
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Personalized training splits with dynamic weight and volume progression.
              </p>
            </div>

            <div style={{ padding: "0.85rem", background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-tertiary)" }}>LOAD VELOCITY</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, marginTop: 2 }}>+2.5 kg next workout</div>
            </div>
          </div>

          {/* Bento Card 3: Personalised Nutrition */}
          <div className="bento-card-clean" style={{ gridColumn: "span 5" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>NUTRITION ENGINE</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>See More →</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Precision Macro Calculator
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Tailored calorie and macro target calculations synced to your daily goals.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[["Protein", "203g"], ["Carbs", "305g"], ["Fat", "75g"]].map(([macro, val]) => (
                <div key={macro} style={{ flex: 1, padding: "0.5rem", background: "rgba(9, 10, 14, 0.6)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-tertiary)" }}>{macro}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, marginTop: 2 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 4: Progress Tracker */}
          <div className="bento-card-clean" style={{ gridColumn: "span 7" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>PROGRESS TRACKER</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>See More →</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Strength & Biometric Tracking
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Automated 1RM progression charts, volume load stats, and training streak logs.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {[
                { label: "VOLUME", val: "42.8k kg" },
                { label: "1RM BENCH", val: "125 kg" },
                { label: "STREAK", val: "18 Days" },
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(9, 10, 14, 0.6)", padding: "0.75rem", borderRadius: "10px", border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-tertiary)" }}>{item.label}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, marginTop: 2 }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
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
   MAIN HOMEPAGE
───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <FloatingPillNavbar />
      <main>
        <HeroSection />
        <WhyForgeBento />
      </main>
      <MinimalFooter />
    </div>
  );
}
