"use client";

import { motion } from "framer-motion";

interface MinimalFactCardProps {
  fact: {
    title: string;
    tag: string;
    desc: string;
  };
  index: number;
}

export function MinimalFactCard({ fact, index }: MinimalFactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          fontWeight: 600,
          color: "#8B5CF6",
          marginBottom: "0.5rem",
          letterSpacing: "0.06em",
        }}>
          {fact.tag}
        </div>

        <h3 style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
        }}>
          {fact.title}
        </h3>

        <p style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          fontWeight: 400,
        }}>
          {fact.desc}
        </p>
      </div>
    </motion.div>
  );
}
