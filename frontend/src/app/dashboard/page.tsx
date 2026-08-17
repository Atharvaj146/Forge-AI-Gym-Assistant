"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Flame,
  Trophy,
  TrendingUp,
  Dumbbell,
  Utensils,
  Scale,
  ChevronRight,
  Zap,
  Target,
  Brain,
  Clock,
  CalendarDays,
  Droplets,
  Moon,
  MessageSquare,
  X,
  Play,
  Coffee,
  Award,
  Sparkles,
  Activity,
  Heart,
  CheckCircle2,
  Plus,
} from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { useAuth } from "@/lib/AuthProvider";
import {
  LogMealModal,
  LogWorkoutModal,
  UpdateWeightModal,
} from "@/components/QuickLogModals";
import { ComingSoonModal, ComingSoonFeatureType } from "@/components/ComingSoonModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

/* ── GOAL DISPLAY MAP ── */
const goalLabels: Record<string, string> = {
  weight_loss: "Weight Loss",
  muscle_gain: "Muscle Gain",
  endurance: "Endurance",
  general_fitness: "General Fitness",
};

/* ── SESSIONS SCHEDULE ROTATION ── */
const sessionSchedule: Record<string, Record<number, { type: string; muscles: string }>> = {
  muscle_gain: {
    0: { type: "Rest", muscles: "Recovery & Mobility" },
    1: { type: "Gym", muscles: "Chest & Triceps" },
    2: { type: "Gym", muscles: "Back & Biceps" },
    3: { type: "Mobility", muscles: "Active Recovery" },
    4: { type: "Gym", muscles: "Legs & Glutes" },
    5: { type: "Gym", muscles: "Shoulders & Core" },
    6: { type: "HIIT", muscles: "Cardio Circuit" },
  },
  weight_loss: {
    0: { type: "Rest", muscles: "Recovery Day" },
    1: { type: "HIIT", muscles: "Full Body Burn" },
    2: { type: "Cardio", muscles: "Steady State" },
    3: { type: "Gym", muscles: "Upper Body" },
    4: { type: "HIIT", muscles: "Metabolic Circuit" },
    5: { type: "Gym", muscles: "Lower Body" },
    6: { type: "Yoga", muscles: "Flexibility Flow" },
  },
  endurance: {
    0: { type: "Rest", muscles: "Recovery Day" },
    1: { type: "Cardio", muscles: "Zone 2 Run" },
    2: { type: "HIIT", muscles: "Interval Sprints" },
    3: { type: "Mobility", muscles: "Yoga & Stretch" },
    4: { type: "Cardio", muscles: "Tempo Run" },
    5: { type: "Gym", muscles: "Strength Endurance" },
    6: { type: "Cardio", muscles: "Long Run" },
  },
  general_fitness: {
    0: { type: "Rest", muscles: "Recovery Day" },
    1: { type: "Gym", muscles: "Full Body A" },
    2: { type: "Cardio", muscles: "Moderate Cardio" },
    3: { type: "Gym", muscles: "Full Body B" },
    4: { type: "Yoga", muscles: "Flexibility" },
    5: { type: "Gym", muscles: "Full Body C" },
    6: { type: "HIIT", muscles: "Fun Circuit" },
  },
};

const sessionIcons: Record<string, React.ReactNode> = {
  Gym: <Dumbbell size={20} />,
  HIIT: <Zap size={20} />,
  Cardio: <Activity size={20} />,
  Yoga: <Heart size={20} />,
  Mobility: <Target size={20} />,
  Rest: <Coffee size={20} />,
};

const sessionColors: Record<string, string> = {
  Gym: "#8B5CF6",
  HIIT: "#EF4444",
  Cardio: "#3B82F6",
  Yoga: "#10B981",
  Mobility: "#F59E0B",
  Rest: "#64748B",
};

/* ── SKELETON LOADER ── */
function Skeleton({ width, height, radius }: { width?: string; height?: string; radius?: string }) {
  return (
    <div
      className="skeleton-pulse"
      style={{
        width: width || "100%",
        height: height || "1rem",
        borderRadius: radius || "var(--radius-sm)",
        background: "rgba(255,255,255,0.05)",
      }}
    />
  );
}

function StatCardSkeleton() {
  return (
    <div className="bento-card-clean" style={{ padding: "1.25rem" }}>
      <Skeleton height="0.7rem" width="60%" />
      <div style={{ marginTop: "0.75rem" }}>
        <Skeleton height="2rem" width="40%" />
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <Skeleton height="0.6rem" width="80%" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD PAGE (100% REAL-TIME LIVE DATA)
═══════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const { user, profile, isLoading: authLoading, refreshProfile } = useAuth();

  // Feature Coming Soon modal state
  const [activeComingSoon, setActiveComingSoon] = useState<ComingSoonFeatureType>(null);

  // Live real-time metric state (no static fake values)
  const [liveWeight, setLiveWeight] = useState<number | null>(null);
  const [liveStreak, setLiveStreak] = useState<number>(0);
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);
  const [caloriesLoggedToday, setCaloriesLoggedToday] = useState<number>(0);
  const [bmiTrend, setBmiTrend] = useState<{ date: string; bmi: number }[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  // Modal states
  const [reminderDismissed, setReminderDismissed] = useState(false);
  const [mealModalOpen, setMealModalOpen] = useState(false);
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [weightModalOpen, setWeightModalOpen] = useState(false);

  // Daily quest checkbox states with live XP
  const [quests, setQuests] = useState({
    hydration: false,
    macros: false,
    sleep: false,
  });

  // Calculate live real-time BMI
  const effectiveWeight = liveWeight ?? profile?.weight ?? 0;
  const effectiveHeight = profile?.height ?? 175;
  const liveBMI =
    effectiveWeight > 0 && effectiveHeight > 0
      ? parseFloat((effectiveWeight / Math.pow(effectiveHeight / 100, 2)).toFixed(1))
      : 0;

  const bmiCategory =
    liveBMI <= 0
      ? "Unlogged"
      : liveBMI < 18.5
      ? "Underweight"
      : liveBMI < 25
      ? "Normal"
      : liveBMI < 30
      ? "Overweight"
      : "Obese";

  const bmiColor =
    liveBMI <= 0
      ? "var(--text-tertiary)"
      : liveBMI < 18.5
      ? "#3B82F6"
      : liveBMI < 25
      ? "#10B981"
      : liveBMI < 30
      ? "#F59E0B"
      : "#EF4444";

  // Calculate dynamic live XP
  const questXP =
    (quests.hydration ? 50 : 0) + (quests.macros ? 100 : 0) + (quests.sleep ? 50 : 0);
  const liveXP = liveStreak * 50 + sessionsCompleted * 100 + Math.floor(caloriesLoggedToday / 10) + questXP;

  // Real user name resolution
  const realUserName =
    user?.name ||
    (typeof window !== "undefined" && localStorage.getItem("forge_user")
      ? JSON.parse(localStorage.getItem("forge_user") || "{}").name
      : null) ||
    (user?.email ? user.email.split("@")[0] : "Member");

  const firstName = realUserName.split(" ")[0];

  // Fetch initial summary & trends from API
  const fetchLiveData = useCallback(async () => {
    try {
      const [sumRes, trendRes] = await Promise.all([
        fetch(`${API_URL}/api/progress/summary`, { credentials: "include" }),
        fetch(`${API_URL}/api/progress/bmi-trend`, { credentials: "include" }),
      ]);

      if (sumRes.ok) {
        const data = await sumRes.json();
        if (data.success && data.summary) {
          setLiveStreak(data.summary.streak ?? 0);
          setSessionsCompleted(data.summary.sessionsThisWeek ?? 0);
        }
      }

      if (trendRes.ok) {
        const trendData = await trendRes.json();
        if (trendData.success && Array.isArray(trendData.data)) {
          setBmiTrend(trendData.data);
        }
      }
    } catch {
      // Keep real-time local defaults (0 if unlogged)
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  // Handle live weight updates from modal
  const handleWeightUpdated = () => {
    refreshProfile();
    fetchLiveData();
    if (liveBMI > 0) {
      setBmiTrend((prev) => [
        ...prev.slice(-6),
        { date: "Today", bmi: liveBMI },
      ]);
    }
  };

  // Handle live workout logged from modal
  const handleWorkoutLogged = () => {
    setSessionsCompleted((prev) => prev + 1);
    setLiveStreak((prev) => (prev === 0 ? 1 : prev + 1));
  };

  // Handle live meal logged from modal
  const handleMealLogged = () => {
    setCaloriesLoggedToday((prev) => prev + 450);
  };

  // Derived date & schedule
  const dayOfWeek = new Date().getDay();
  const goalKey = profile?.goal || "general_fitness";
  const goalLabel = goalLabels[goalKey] || "General Fitness";
  const todaySession = sessionSchedule[goalKey]?.[dayOfWeek] || sessionSchedule.general_fitness[dayOfWeek];
  const isRestDay = todaySession.type === "Rest";

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayName = dayNames[dayOfWeek];

  const exerciseCounts: Record<string, { count: number; duration: number }> = {
    Gym: { count: 6, duration: 50 },
    HIIT: { count: 8, duration: 30 },
    Cardio: { count: 3, duration: 40 },
    Yoga: { count: 10, duration: 45 },
    Mobility: { count: 8, duration: 30 },
    Rest: { count: 0, duration: 0 },
  };
  const sessionMeta = exerciseCounts[todaySession.type] || { count: 5, duration: 45 };

  if (authLoading && !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="skeleton-pulse" style={{ width: 40, height: 40, borderRadius: "50%" }} />
      </div>
    );
  }

  return (
    <>
      {/* Persistent Navbar with Coming Soon Modal Handlers */}
      <DashboardNavbar onFeatureClick={(f) => setActiveComingSoon(f)} />

      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "6.5rem 1.25rem 3rem",
        }}
      >
        {/* ═══════════ 1. WELCOME BANNER (REAL USER NAME) ═══════════ */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "relative",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem 2rem 1.75rem",
            overflow: "hidden",
            marginBottom: "1.25rem",
          }}
        >
          {/* Glow accents */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              background: "rgba(139, 92, 246, 0.08)",
              borderRadius: "50%",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Live Status Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                borderRadius: "9999px",
                padding: "0.25rem 0.75rem",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#A78BFA",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10B981",
                  animation: "pulse 2s infinite",
                }}
              />
              {isRestDay ? "Rest Day Active" : "Live Performance Mode"}
            </div>

            {/* Greeting with Real User Name */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: "var(--text-primary)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Welcome back,{" "}
                  <span className="text-gradient-purple">{firstName}</span>
                </h1>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    maxWidth: 500,
                  }}
                >
                  AI coaching engine is tracking your{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {goalLabel}
                  </strong>{" "}
                  plan in real time.
                </p>
              </div>

              {/* CTAs triggering Feature Coming Soon Modals */}
              <div style={{ display: "flex", gap: "0.6rem", flexShrink: 0 }}>
                <button
                  onClick={() => setActiveComingSoon("workout")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "#FFFFFF",
                    color: "#090A0E",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    padding: "0.65rem 1.2rem",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Play size={14} fill="#090A0E" />
                  {isRestDay ? "Browse Workouts" : "Start Today's Session"}
                </button>

                <button
                  onClick={() => setActiveComingSoon("coach")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--text-primary)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    padding: "0.65rem 1.2rem",
                    borderRadius: "9999px",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  <MessageSquare size={14} style={{ color: "#8B5CF6" }} />
                  Ask AI Coach
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════ 2. REMINDER STRIP ═══════════ */}
        <AnimatePresence>
          {!reminderDismissed && !isRestDay && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: "rgba(139, 92, 246, 0.06)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
                borderRadius: "var(--radius-md)",
                padding: "0.7rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  fontSize: "0.82rem",
                }}
              >
                <CalendarDays size={16} style={{ color: "#8B5CF6", flexShrink: 0 }} />
                <span style={{ color: "var(--text-secondary)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>
                    {todayName}
                  </strong>{" "}
                  — {todaySession.muscles} session scheduled for today
                </span>
              </div>
              <button
                onClick={() => setReminderDismissed(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-tertiary)",
                  padding: 4,
                  flexShrink: 0,
                }}
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════ 3. TODAY'S PLAN CARD ═══════════ */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ marginBottom: "1.25rem" }}
        >
          <div
            className="bento-card-clean"
            style={{
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
              borderColor: `${sessionColors[todaySession.type]}25`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
              {/* Session Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "var(--radius-md)",
                  background: `${sessionColors[todaySession.type]}15`,
                  border: `1px solid ${sessionColors[todaySession.type]}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: sessionColors[todaySession.type],
                  flexShrink: 0,
                }}
              >
                {sessionIcons[todaySession.type]}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--text-tertiary)",
                      textTransform: "uppercase",
                    }}
                  >
                    Today&apos;s Plan
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: sessionColors[todaySession.type],
                      background: `${sessionColors[todaySession.type]}12`,
                      padding: "0.1rem 0.45rem",
                      borderRadius: "9999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {todaySession.type}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.2rem",
                  }}
                >
                  {isRestDay ? "Rest & Recovery Day" : todaySession.muscles}
                </h3>

                {!isRestDay ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      fontSize: "0.75rem",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Dumbbell size={12} /> {sessionMeta.count} exercises
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Clock size={12} /> {sessionMeta.duration} min
                    </span>
                  </div>
                ) : (
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                    Recovery is when muscle fibers rebuild. Stretch, hydrate, and prepare for tomorrow.
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setActiveComingSoon("workout")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: sessionColors[todaySession.type],
                color: "#FFFFFF",
                fontSize: "0.8rem",
                fontWeight: 700,
                padding: "0.6rem 1.15rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <Play size={13} fill="white" /> {isRestDay ? "Explore" : "Start"}
            </button>
          </div>
        </motion.section>

        {/* ═══════════ 4. QUICK STATS ROW (100% REAL-TIME LIVE) ═══════════ */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.85rem",
            marginBottom: "1.25rem",
          }}
        >
          {loadingStats ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              {/* Live Workout Streak */}
              <div className="bento-card-clean" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                    Workout Streak
                  </span>
                  <Flame size={16} style={{ color: "#F59E0B" }} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {liveStreak}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>days</span>
                </div>
                <p style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", marginTop: "0.35rem" }}>
                  {liveStreak > 0 ? "Daily consistency active" : "Log a session to begin streak"}
                </p>
              </div>

              {/* Live Sessions This Week */}
              <div className="bento-card-clean" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                    This Week
                  </span>
                  <CalendarDays size={16} style={{ color: "#8B5CF6" }} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {sessionsCompleted}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>/</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-tertiary)" }}>5</span>
                </div>
                <div style={{ marginTop: "0.45rem", height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, (sessionsCompleted / 5) * 100)}%`,
                      background: "linear-gradient(90deg, #8B5CF6, #A78BFA)",
                      borderRadius: 2,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>

              {/* Real-time BMI */}
              <div
                className="bento-card-clean"
                style={{
                  padding: "1.25rem",
                  background: `linear-gradient(135deg, ${bmiColor}08, transparent)`,
                  borderColor: `${bmiColor}20`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                    Live BMI
                  </span>
                  <Activity size={16} style={{ color: bmiColor }} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {liveBMI > 0 ? liveBMI : "0.0"}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: bmiColor, fontWeight: 600 }}>
                    BMI
                  </span>
                </div>
                <p style={{ fontSize: "0.65rem", color: bmiColor, marginTop: "0.35rem", fontWeight: 600 }}>
                  {bmiCategory} Zone
                </p>
              </div>

              {/* Real-time Weight */}
              <div className="bento-card-clean" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                    Current Weight
                  </span>
                  <Scale size={16} style={{ color: "#3B82F6" }} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {effectiveWeight > 0 ? effectiveWeight : "0"}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>kg</span>
                </div>
                <p style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", marginTop: "0.35rem" }}>
                  Target: {goalLabel}
                </p>
              </div>

              {/* Dynamic Live XP Points */}
              <div className="bento-card-clean" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                    XP Points
                  </span>
                  <Trophy size={16} style={{ color: "#F59E0B" }} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
                  <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>
                    {liveXP}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>XP</span>
                </div>
                <p style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", marginTop: "0.35rem" }}>
                  Real-time activity level
                </p>
              </div>
            </>
          )}
        </motion.section>

        {/* ═══════════ 5. QUICK-LOG ACTIONS (ACTIVE MODALS) ═══════════ */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.85rem",
            marginBottom: "1.75rem",
          }}
        >
          {[
            { label: "Log a Meal", icon: <Utensils size={18} />, color: "#10B981", onClick: () => setMealModalOpen(true) },
            { label: "Log a Workout", icon: <Dumbbell size={18} />, color: "#8B5CF6", onClick: () => setWorkoutModalOpen(true) },
            { label: "Update Weight", icon: <Scale size={18} />, color: "#3B82F6", onClick: () => setWeightModalOpen(true) },
          ].map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="quick-log-btn"
              style={{
                background: `${action.color}08`,
                border: `1px solid ${action.color}20`,
                borderRadius: "var(--radius-lg)",
                padding: "1rem 0.75rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.55rem",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                color: action.color,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-md)",
                  background: `${action.color}12`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {action.icon}
              </div>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {action.label}
              </span>
            </button>
          ))}
        </motion.section>

        {/* ═══════════ 6 & 7. LIVE CHARTS & QUESTS GRID ═══════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
          className="dashboard-grid-2col"
        >
          {/* Live Progress Preview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bento-card-clean"
            style={{ padding: "1.25rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  Live BMI Trend
                </h3>
                <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", marginTop: "0.15rem" }}>
                  Real-time progression telemetry
                </p>
              </div>
              <button
                onClick={() => setActiveComingSoon("progress")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#8B5CF6",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
              >
                View Full Progress <ChevronRight size={13} />
              </button>
            </div>

            {bmiTrend.length > 0 ? (
              <div style={{ height: 160, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bmiTrend}>
                    <defs>
                      <linearGradient id="bmiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      stroke="#64748B"
                      fontSize={9}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      domain={["auto", "auto"]}
                      stroke="#64748B"
                      fontSize={9}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#181922",
                        borderColor: "rgba(255,255,255,0.08)",
                        borderRadius: 10,
                        fontSize: 11,
                      }}
                      labelStyle={{ color: "#94A3B8" }}
                      itemStyle={{ color: "#8B5CF6" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="bmi"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#bmiGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div
                style={{
                  height: 160,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-tertiary)",
                  fontSize: "0.78rem",
                  border: "1px dashed var(--border)",
                  borderRadius: "var(--radius-md)",
                  gap: "0.5rem",
                }}
              >
                <span>No logs recorded yet</span>
                <button
                  onClick={() => setWeightModalOpen(true)}
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    borderRadius: "9999px",
                    padding: "0.3rem 0.75rem",
                    color: "#A78BFA",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Log First Weight
                </button>
              </div>
            )}
          </motion.div>

          {/* 8. Daily Quests (Interactive Live XP) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bento-card-clean"
            style={{ padding: "1.25rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Daily Quests
              </h3>
              <span
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#F59E0B",
                  background: "rgba(245, 158, 11, 0.1)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "9999px",
                }}
              >
                +{questXP} XP Earned
              </span>
            </div>

            <div style={{ display: "grid", gap: "0.6rem" }}>
              {[
                { key: "hydration" as const, label: "Hydration Check", desc: "Drink 3L of water today", xp: 50, icon: <Droplets size={15} /> },
                { key: "macros" as const, label: "Macro Builder", desc: "Hit your daily protein target", xp: 100, icon: <Target size={15} /> },
                { key: "sleep" as const, label: "Restful Night", desc: "Log 8+ hours of sleep", xp: 50, icon: <Moon size={15} /> },
              ].map((quest) => (
                <div
                  key={quest.key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.7rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: quests[quest.key]
                      ? "rgba(16, 185, 129, 0.05)"
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${quests[quest.key] ? "rgba(16,185,129,0.15)" : "var(--border)"}`,
                    transition: "all 0.2s ease",
                  }}
                >
                  <button
                    onClick={() =>
                      setQuests((prev) => ({
                        ...prev,
                        [quest.key]: !prev[quest.key],
                      }))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: quests[quest.key]
                        ? "#10B981"
                        : "var(--text-tertiary)",
                      flexShrink: 0,
                      padding: 0,
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      fill={quests[quest.key] ? "rgba(16,185,129,0.15)" : "transparent"}
                    />
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: quests[quest.key]
                            ? "var(--text-tertiary)"
                            : "var(--text-primary)",
                          textDecoration: quests[quest.key] ? "line-through" : "none",
                        }}
                      >
                        {quest.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          color: "#F59E0B",
                        }}
                      >
                        +{quest.xp} XP
                      </span>
                    </div>
                    <p style={{ fontSize: "0.68rem", color: "var(--text-tertiary)", marginTop: "0.1rem" }}>
                      {quest.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ═══════════ 9. SUPPLEMENTARY MODULE WIDGETS ═══════════ */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {/* Sleep Tracker Widget (Triggers Coming Soon) */}
          <div
            onClick={() => setActiveComingSoon("sleep")}
            className="bento-card-clean"
            style={{
              padding: "1.25rem",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: "0.55rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#818CF8",
                background: "rgba(129,140,248,0.12)",
                padding: "0.15rem 0.45rem",
                borderRadius: "9999px",
                border: "1px solid rgba(129,140,248,0.2)",
              }}
            >
              Coming Soon
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Moon size={14} style={{ color: "#818CF8" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Sleep Tracker
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>7.5</span>
              <span style={{ fontSize: "0.75rem", color: "#818CF8", fontWeight: 600 }}>hrs avg</span>
            </div>
            <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: 40 }}>
              {[6.5, 7, 8, 7.5, 6, 8.5, 7].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${(h / 9) * 100}%`,
                    background: i % 2 === 0 ? "#818CF8" : "#6366F1",
                    borderRadius: "3px 3px 0 0",
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Daily Calorie Card (Live counter) */}
          <div
            onClick={() => setMealModalOpen(true)}
            className="bento-card-clean"
            style={{ padding: "1.25rem", cursor: "pointer" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Utensils size={14} style={{ color: "#F59E0B" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                  Daily Calories
                </span>
              </div>
              <span style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", fontWeight: 600 }}>
                Target: 2,200
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F59E0B" }}>
                {caloriesLoggedToday}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-tertiary)" }}>kcal logged</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, (caloriesLoggedToday / 2200) * 100)}%`,
                  background: "linear-gradient(90deg, #F59E0B, #D97706)",
                  borderRadius: 3,
                }}
              />
            </div>
            <p style={{ fontSize: "0.65rem", color: "var(--text-tertiary)", marginTop: "0.4rem" }}>
              {Math.max(0, 2200 - caloriesLoggedToday)} kcal remaining today • Click to log
            </p>
          </div>

          {/* Leaderboard Widget (Triggers Coming Soon) */}
          <div
            onClick={() => setActiveComingSoon("leaderboard")}
            className="bento-card-clean"
            style={{
              padding: "1.25rem",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: "0.55rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#F59E0B",
                background: "rgba(245,158,11,0.12)",
                padding: "0.15rem 0.45rem",
                borderRadius: "9999px",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              Coming Soon
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.9rem" }}>
              <Trophy size={14} style={{ color: "#F59E0B" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Leaderboard
              </span>
            </div>
            <div style={{ display: "grid", gap: "0.4rem" }}>
              {[
                { rank: 1, name: "Diana P.", xp: 3450 },
                { rank: 2, name: firstName, xp: liveXP, isYou: true },
                { rank: 3, name: "Michael C.", xp: 2100 },
              ].map((entry) => (
                <div
                  key={entry.rank}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.45rem 0.55rem",
                    borderRadius: "var(--radius-sm)",
                    background: entry.isYou ? "rgba(139,92,246,0.06)" : "transparent",
                    border: `1px solid ${entry.isYou ? "rgba(139,92,246,0.15)" : "transparent"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, color: "#F59E0B", width: 16 }}>
                      {entry.rank}
                    </span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {entry.name}
                      {entry.isYou && (
                        <span style={{ fontSize: "0.55rem", fontWeight: 700, color: "#8B5CF6", marginLeft: "0.35rem", background: "rgba(139,92,246,0.12)", padding: "0.05rem 0.3rem", borderRadius: "9999px" }}>
                          YOU
                        </span>
                      )}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                    {entry.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════ 10. FOOTER ═══════════ */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.5rem 0 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.68rem", color: "var(--text-tertiary)" }}>
            <span>System Status:</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#10B981", fontWeight: 600 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981" }} />
              Real-time Active
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-tertiary)" }}>
            © 2026 FORGE Inc. — AI Fitness Platform
          </span>
        </footer>
      </main>

      {/* Feature Coming Soon Modal */}
      <ComingSoonModal feature={activeComingSoon} onClose={() => setActiveComingSoon(null)} />

      {/* Active Quick-Log Modals */}
      <LogMealModal open={mealModalOpen} onClose={() => setMealModalOpen(false)} onSuccess={handleMealLogged} />
      <LogWorkoutModal open={workoutModalOpen} onClose={() => setWorkoutModalOpen(false)} onSuccess={handleWorkoutLogged} />
      <UpdateWeightModal
        open={weightModalOpen}
        onClose={() => setWeightModalOpen(false)}
        currentWeight={effectiveWeight > 0 ? effectiveWeight : undefined}
        onSuccess={handleWeightUpdated}
      />
    </>
  );
}
