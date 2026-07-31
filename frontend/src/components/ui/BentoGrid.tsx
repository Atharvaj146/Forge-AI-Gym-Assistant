"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:border-purple-500/40 transition duration-300 p-5 bg-[#14151D] border border-white/10 justify-between flex flex-col space-y-4 overflow-hidden relative",
        className
      )}
    >
      <div className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 p-2">
        {header}
      </div>
      <div className="group-hover/bento:translate-x-1.5 transition duration-300 z-10">
        {icon && <div className="mb-2 text-purple-400">{icon}</div>}
        <div className="font-sans font-bold text-white text-base mb-1.5">
          {title}
        </div>
        <div className="font-sans font-normal text-slate-400 text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
