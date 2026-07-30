"use client";

import { motion } from "framer-motion";
import { useState, MouseEvent } from "react";

interface FactCardProps {
  fact: {
    title: string;
    tag: string;
    desc: string;
  };
  index: number;
}

export function AceternityFactCard({ fact, index }: FactCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.015 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        background: "rgba(18, 19, 26, 0.85)",
        backdropFilter: "blur(12px)",
        border: isHovered ? "1px solid rgba(139, 92, 246, 0.6)" : "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "20px",
        padding: "1.65rem",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: isHovered
          ? "0 12px 35px rgba(139, 92, 246, 0.2), 0 0 20px rgba(139, 92, 246, 0.15)"
          : "0 10px 30px rgba(0,0,0,0.4)",
        transition: "border 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* Aceternity UI Spotlight Radial Gradient Effect */}
      {isHovered && (
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      {/* Top Shimmer Highlight Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background: isHovered
            ? "linear-gradient(90deg, transparent, #8B5CF6, transparent)"
            : "rgba(255, 255, 255, 0.06)",
          transition: "background 0.3s ease",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Aceternity UI Tag Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          fontWeight: 700,
          color: "#A78BFA",
          background: "rgba(139, 92, 246, 0.12)",
          border: "1px solid rgba(139, 92, 246, 0.25)",
          padding: "0.2rem 0.65rem",
          borderRadius: "9999px",
          marginBottom: "0.75rem",
          letterSpacing: "0.05em",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B5CF6" }} />
          {fact.tag}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "1.1rem",
          fontWeight: 800,
          color: "#FFFFFF",
          marginBottom: "0.6rem",
          lineHeight: 1.3,
          letterSpacing: "-0.015em",
        }}>
          {fact.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.65,
          fontWeight: 400,
        }}>
          {fact.desc}
        </p>
      </div>
    </motion.div>
  );
}
