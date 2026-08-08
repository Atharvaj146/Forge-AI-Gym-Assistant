"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, ChevronLeft, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function AiCamPage() {
  return (
    <>
      <DashboardNavbar />

      <main
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "6.5rem 1.25rem 3rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.75rem",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: "var(--radius-sm)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            <ChevronLeft size={16} />
          </Link>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "rgba(236,72,153,0.12)",
                border: "1px solid rgba(236,72,153,0.3)",
                borderRadius: "9999px",
                padding: "0.2rem 0.55rem",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#EC4899",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: "0.3rem",
              }}
            >
              <Sparkles size={10} />
              Feature Coming Soon • Phase 2
            </div>
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              AI CAM Posture Analysis
            </h1>
          </div>
        </div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bento-card-clean"
          style={{
            padding: "2.25rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            borderColor: "rgba(236,72,153,0.3)",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "var(--radius-md)",
              background: "rgba(236,72,153,0.15)",
              border: "1px solid rgba(236,72,153,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#EC4899",
              margin: "0 auto 1.25rem",
            }}
          >
            <Camera size={32} />
          </div>

          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.6rem" }}>
            Real-Time 33-Point Skeletal Joint Tracking
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: 540, margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
            Our computer-vision engine uses browser-native pose estimation to track joint angles, count reps, enforce spinal alignment, and speak voice cues before form breakdown happens.
          </p>

          <div
            style={{
              background: "rgba(9, 10, 14, 0.7)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1.5rem",
              maxWidth: 620,
              margin: "0 auto 1.75rem",
              textAlign: "left",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-tertiary)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Upcoming MediaPipe Capabilities
            </div>
            <div style={{ display: "grid", gap: "0.65rem" }}>
              {[
                "Squat depth validation (passed/failed knee angle ratio)",
                "Spinal curvature & lumbar rounding warnings",
                "Rep cadence & eccentric velocity measurement",
                "Zero cloud upload — 100% private on-device processing",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.82rem", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={16} style={{ color: "#EC4899", flexShrink: 0 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
              color: "white",
              fontSize: "0.85rem",
              fontWeight: 700,
              padding: "0.75rem 1.6rem",
              borderRadius: "9999px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(236,72,153,0.3)",
            }}
          >
            ← Back to Dashboard
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--radius-md)",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border)",
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
          }}
        >
          <ShieldAlert size={16} style={{ color: "#F59E0B", flexShrink: 0 }} />
          <span>
            Safety Notice: AI CAM provides algorithmic movement coaching and is not a substitute for medical or physical therapy diagnosis.
          </span>
        </div>
      </main>
    </>
  );
}
