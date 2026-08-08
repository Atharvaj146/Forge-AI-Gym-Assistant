"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Activity,
  Scale,
  ChevronLeft,
  Flame,
  CalendarDays,
} from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { useAuth } from "@/lib/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function ProgressPage() {
  const { profile } = useAuth();
  const [bmiTrend, setBmiTrend] = useState<{ date: string; bmi: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/progress/bmi-trend`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) setBmiTrend(data.data);
      }
    } catch {
      setBmiTrend([
        { date: "Jul 01", bmi: 24.0 },
        { date: "Jul 07", bmi: 23.8 },
        { date: "Jul 14", bmi: 23.5 },
        { date: "Jul 21", bmi: 23.1 },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Generate weight trend from BMI (BMI × height²)
  const heightM = (profile?.height || 175) / 100;
  const weightTrend = bmiTrend.map((d) => ({
    date: d.date,
    weight: parseFloat((d.bmi * heightM * heightM).toFixed(1)),
  }));

  return (
    <>
      <DashboardNavbar />

      <main
        style={{
          maxWidth: 1100,
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
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Progress Tracking
            </h1>
            <p style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
              Your fitness journey over time
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.85rem",
            marginBottom: "1.5rem",
          }}
        >
          {[
            {
              label: "Current BMI",
              value: bmiTrend.length > 0 ? bmiTrend[bmiTrend.length - 1].bmi : "—",
              sub: "Normal Zone",
              icon: <Activity size={16} />,
              color: "#10B981",
            },
            {
              label: "Current Weight",
              value: `${profile?.weight || 75} kg`,
              sub: "Updated recently",
              icon: <Scale size={16} />,
              color: "#3B82F6",
            },
            {
              label: "Streak",
              value: "5 days",
              sub: "Keep it going!",
              icon: <Flame size={16} />,
              color: "#F59E0B",
            },
            {
              label: "Sessions",
              value: "3 / 5",
              sub: "This week",
              icon: <CalendarDays size={16} />,
              color: "#8B5CF6",
            },
          ].map((card) => (
            <div key={card.label} className="bento-card-clean" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                  {card.label}
                </span>
                <div style={{ color: card.color }}>{card.icon}</div>
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {card.value}
              </div>
              <p style={{ fontSize: "0.65rem", color: card.color, marginTop: "0.25rem", fontWeight: 600 }}>
                {card.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
          className="dashboard-grid-2col"
        >
          {/* BMI Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bento-card-clean"
            style={{ padding: "1.25rem" }}
          >
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
              BMI Trend
            </h3>
            <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: "1rem" }}>
              Body Mass Index over time
            </p>
            <div style={{ height: 220, width: "100%" }}>
              {loading ? (
                <div className="skeleton-pulse" style={{ width: "100%", height: "100%", borderRadius: "var(--radius-md)" }} />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bmiTrend}>
                    <defs>
                      <linearGradient id="bmiGradFull" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#181922", borderColor: "rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 11 }}
                      labelStyle={{ color: "#94A3B8" }}
                      itemStyle={{ color: "#8B5CF6" }}
                    />
                    <Area type="monotone" dataKey="bmi" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#bmiGradFull)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          {/* Weight Trend */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bento-card-clean"
            style={{ padding: "1.25rem" }}
          >
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
              Weight Trend
            </h3>
            <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)", marginBottom: "1rem" }}>
              Body weight progression (kg)
            </p>
            <div style={{ height: 220, width: "100%" }}>
              {loading ? (
                <div className="skeleton-pulse" style={{ width: "100%", height: "100%", borderRadius: "var(--radius-md)" }} />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightTrend}>
                    <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis domain={["dataMin - 1", "dataMax + 1"]} stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#181922", borderColor: "rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 11 }}
                      labelStyle={{ color: "#94A3B8" }}
                      itemStyle={{ color: "#3B82F6" }}
                    />
                    <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.5rem 0 1rem",
            marginTop: "2rem",
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
              Operational
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-tertiary)" }}>
            © 2026 FORGE Inc.
          </span>
        </footer>
      </main>
    </>
  );
}
