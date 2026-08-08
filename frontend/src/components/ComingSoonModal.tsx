"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Dumbbell,
  Utensils,
  Camera,
  TrendingUp,
  Brain,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

export type ComingSoonFeatureType = "workout" | "nutrition" | "aicam" | "progress" | "coach" | "sleep" | "leaderboard" | null;

interface FeatureDetails {
  title: string;
  badge: string;
  icon: React.ReactNode;
  accentColor: string;
  gradient: string;
  tagline: string;
  description: string;
  highlights: string[];
  eta: string;
}

const FEATURE_DATA: Record<string, FeatureDetails> = {
  workout: {
    title: "AI Workout Engine",
    badge: "In Active Development",
    icon: <Dumbbell size={22} />,
    accentColor: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6, #6366F1)",
    tagline: "Adaptive sets, reps & progression calibrated to your recovery",
    description:
      "Our AI Workout Engine automatically generates hyper-personalized training splits, adjusts weights based on velocity tracking, and evolves daily with your biometric performance.",
    highlights: [
      "Custom splits based on your available equipment",
      "Dynamic 1RM and volume load progression",
      "Real-time substitute exercise recommendations",
      "Direct integration with AI CAM form correction",
    ],
    eta: "Phase 2 Release • Coming Soon",
  },
  nutrition: {
    title: "Smart Nutrition Engine",
    badge: "In Active Development",
    icon: <Utensils size={22} />,
    accentColor: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    tagline: "Macro precision & instant dietary conflict resolution",
    description:
      "A tailored dietary assistant that calculates dynamic macro goals, recommends recipes tailored to your dietary restrictions (vegan, jain, lactose-free), and suggests smart food substitutions in real time.",
    highlights: [
      "Dynamic macro and calorie target calculations",
      "Dietary preference enforcement & conflict alerts",
      "Smart substitute recipe engine for missing ingredients",
      "Instant visual meal logger with calorie estimation",
    ],
    eta: "Phase 2 Release • Coming Soon",
  },
  aicam: {
    title: "AI CAM Posture Analysis",
    badge: "Flagship Feature • In Development",
    icon: <Camera size={22} />,
    accentColor: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899, #8B5CF6)",
    tagline: "Real-time 33-point skeletal tracking & rep depth detection",
    description:
      "Computer-vision co-pilot using browser-based pose estimation to analyze joint angles, count reps, enforce spinal alignment, and speak voice cues before injury happens.",
    highlights: [
      "Browser-native camera tracking (Zero latency)",
      "Squat depth, bar path, and joint alignment validation",
      "Live audio and visual posture corrections",
      "Post-set form score and velocity breakdown",
    ],
    eta: "Phase 2 Release • Coming Soon",
  },
  progress: {
    title: "Deep Biometric Analytics",
    badge: "In Active Development",
    icon: <TrendingUp size={22} />,
    accentColor: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    tagline: "Comprehensive progression telemetry & predictive strength graphs",
    description:
      "Track your complete transformation journey with multi-point volume analytics, automated BMI recalculation, body composition projections, and streak rewards.",
    highlights: [
      "Automated BMI trends on every weight log",
      "Volume load graphs per muscle group",
      "Predicted 1RM growth trajectories",
      "Milestone badge unlocks & leaderboard rankings",
    ],
    eta: "Phase 2 Release • Coming Soon",
  },
  coach: {
    title: "FORGE AI Fitness Coach",
    badge: "Private Beta",
    icon: <Brain size={22} />,
    accentColor: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    tagline: "24/7 personalized fitness, lifting & recovery advisor",
    description:
      "Ask your AI coach anything about your workout program, form cues, soreness mitigation, or macro intake adjustments.",
    highlights: [
      "Context-aware answers referencing your exact profile",
      "Lifting form suggestions and warm-up routines",
      "Calorie and protein recommendations",
      "Strict non-medical safety guardrails",
    ],
    eta: "Coming in next update",
  },
  sleep: {
    title: "Sleep & Recovery Tracker",
    badge: "Roadmap Feature",
    icon: <Clock size={22} />,
    accentColor: "#818CF8",
    gradient: "linear-gradient(135deg, #818CF8, #4F46E5)",
    tagline: "Sleep stage tracking & recovery score analysis",
    description:
      "Log your sleep quality and sleep duration to let FORGE adjust your training intensity for optimal central nervous system recovery.",
    highlights: [
      "Sleep quality scoring",
      "Automated workout intensity scaling",
      "Bedtime readiness recommendations",
    ],
    eta: "Coming in Phase 3",
  },
  leaderboard: {
    title: "Global Athlete Leaderboard",
    badge: "Roadmap Feature",
    icon: <Rocket size={22} />,
    accentColor: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #B45309)",
    tagline: "Compete with athletes across streaks, XP and volume",
    description:
      "Earn XP points for every workout, meal logged, and hydration quest completed to climb the ranks on the FORGE global leaderboard.",
    highlights: [
      "Weekly and monthly leaderboard brackets",
      "Exclusive tier badges & status flairs",
      "Community challenges and achievements",
    ],
    eta: "Coming in Phase 3",
  },
};

export function ComingSoonModal({
  feature,
  onClose,
}: {
  feature: ComingSoonFeatureType;
  onClose: () => void;
}) {
  if (!feature || !FEATURE_DATA[feature]) return null;

  const data = FEATURE_DATA[feature];

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="modal-card"
          style={{
            maxWidth: 480,
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
            borderColor: `${data.accentColor}40`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Ambient Glow */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 180,
              height: 180,
              background: data.accentColor,
              opacity: 0.12,
              borderRadius: "50%",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-tertiary)",
              transition: "all 0.2s ease",
            }}
            title="Close"
          >
            <X size={15} />
          </button>

          {/* Icon + Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "var(--radius-md)",
                background: `${data.accentColor}18`,
                border: `1px solid ${data.accentColor}35`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: data.accentColor,
                flexShrink: 0,
              }}
            >
              {data.icon}
            </div>

            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  background: `${data.accentColor}15`,
                  border: `1px solid ${data.accentColor}30`,
                  borderRadius: "9999px",
                  padding: "0.2rem 0.55rem",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: data.accentColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <Sparkles size={10} />
                {data.badge}
              </div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  marginTop: "0.2rem",
                }}
              >
                {data.title}
              </h2>
            </div>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.4,
              marginBottom: "0.6rem",
            }}
          >
            {data.tagline}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "1.25rem",
            }}
          >
            {data.description}
          </p>

          {/* Highlights */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "0.9rem",
              marginBottom: "1.35rem",
              display: "grid",
              gap: "0.55rem",
            }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.15rem",
              }}
            >
              Upcoming Capabilities
            </div>
            {data.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  fontSize: "0.76rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.4,
                }}
              >
                <CheckCircle2
                  size={14}
                  style={{ color: data.accentColor, flexShrink: 0, marginTop: 2 }}
                />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* ETA & Dismiss Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--text-tertiary)",
              }}
            >
              {data.eta}
            </span>

            <button
              onClick={onClose}
              style={{
                background: data.gradient,
                border: "none",
                borderRadius: "9999px",
                padding: "0.55rem 1.25rem",
                color: "#FFFFFF",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: `0 4px 15px ${data.accentColor}30`,
              }}
            >
              Got it!
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
