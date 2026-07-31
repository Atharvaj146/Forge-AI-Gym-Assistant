"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  type?: "grid-small" | "grid-large" | "dots";
}

export function GridBackground({
  children,
  className,
  type = "grid-small",
}: GridBackgroundProps) {
  const getPattern = () => {
    if (type === "dots") {
      return `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.09) 1px, transparent 0)`;
    }
    return `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`;
  };

  const bgSize = type === "dots" ? "24px 24px" : type === "grid-small" ? "20px 20px" : "40px 40px";

  return (
    <div className={cn("relative w-full overflow-hidden bg-[#090A0E]", className)}>
      {/* Grid / Dot Pattern Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: getPattern(),
          backgroundSize: bgSize,
        }}
      />

      {/* Radial Gradient Vignette Mask to softly fade grid into dark background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 10%, #090A0E 75%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
