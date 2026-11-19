"use client";

import React, { useId } from "react";

interface MonogramLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  withWatermark?: boolean;
  variant?: "badge" | "plain" | "glow";
}

export const MonogramLogo: React.FC<MonogramLogoProps> = ({
  className = "",
  size = 38,
  showText = false,
  withWatermark = false,
  variant = "badge",
}) => {
  const id = useId();

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className={`relative flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 ${
          withWatermark ? "opacity-10 dark:opacity-15" : ""
        }`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-all duration-300"
        >
          <defs>
            {/* Background Emblem Gradient */}
            <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F172A" className="dark:stop-color-[#0F172A] stop-color-white" />
              <stop offset="100%" stopColor="#080D1A" className="dark:stop-color-[#080D1A] stop-color-slate-100" />
            </linearGradient>

            {/* Emblem Perimeter Border Gradient */}
            <linearGradient id={`${id}-border`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0D9488" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.8" />
            </linearGradient>

            {/* Left Pillar: Architectural & Backend Rigor (Teal Gradient) */}
            <linearGradient id={`${id}-teal`} x1="20" y1="80" x2="40" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="50%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>

            {/* Right Pillar: UI/UX Flow & Creative Dimension (Indigo Gradient) */}
            <linearGradient id={`${id}-indigo`} x1="60" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>

            {/* Center Bridge & AI Diamond Spark Gradient */}
            <linearGradient id={`${id}-spark`} x1="44" y1="22" x2="56" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>

            {/* Ambient Radial Glow */}
            <radialGradient id={`${id}-glow`} cx="50" cy="50" r="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Outer Rounded Squircle Frame (Badge Variant) */}
          {variant !== "plain" && (
            <>
              <rect
                x="4"
                y="4"
                width="92"
                height="92"
                rx="24"
                className="fill-white/80 dark:fill-[#0B1120]/90 shadow-sm"
                stroke={`url(#${id}-border)`}
                strokeWidth="1.75"
              />
              <circle cx="50" cy="50" r="28" fill={`url(#${id}-glow)`} />
            </>
          )}

          {/* 2. Left Architectural Pillar (Engineering, ERP & Systems Precision) */}
          {/* Straight structural column with 45° cut apex */}
          <path
            d="M 22 76 V 30 L 32 20 H 34 V 76 H 22 Z"
            fill={`url(#${id}-teal)`}
          />

          {/* 3. Left Diagonal Strut (Algorithms & Code Logic) */}
          <path
            d="M 34 20 L 50 52 L 42 58 L 24 28 L 34 20 Z"
            fill={`url(#${id}-teal)`}
            opacity="0.95"
          />

          {/* 4. Right Diagonal Strut (Seamless Interlocking Bridge) */}
          <path
            d="M 50 52 L 66 20 L 76 28 L 58 58 L 50 52 Z"
            fill={`url(#${id}-indigo)`}
            opacity="0.95"
          />

          {/* 5. Right UI/UX Pillar (Human Experience, Smooth Curvature & Design Systems) */}
          <path
            d="M 66 20 C 74 20 78 24 78 32 V 76 H 66 V 32 C 66 28 64 25 59 25 L 66 20 Z"
            fill={`url(#${id}-indigo)`}
          />

          {/* 6. Center AI & Creative Insight Spark (Diamond Node at Apex) */}
          <polygon
            points="50,22 55,30 50,38 45,30"
            fill={`url(#${id}-spark)`}
          />
          <circle cx="50" cy="30" r="1.5" className="fill-slate-900 dark:fill-slate-950" />

          {/* 7. Precision Baseline Datum (Systemic Balance & Stability) */}
          <rect
            x="22"
            y="79.5"
            width="56"
            height="2.5"
            rx="1.25"
            fill={`url(#${id}-border)`}
            opacity="0.8"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
            محمد الجزار
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-teal-600 dark:text-teal-400 uppercase font-semibold">
            M. Aljazzar
          </span>
        </div>
      )}
    </div>
  );
};
