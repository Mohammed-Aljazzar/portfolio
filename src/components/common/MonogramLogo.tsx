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
            {/* Dark & Light adaptive border gradients */}
            <linearGradient id={`${id}-border`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0D9488" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.9" />
            </linearGradient>

            {/* Teal Letters Stroke Gradient */}
            <linearGradient id={`${id}-teal`} x1="25" y1="25" x2="75" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#14B8A6" className="dark:stop-color-[#2DD4BF]" />
              <stop offset="100%" stopColor="#0D9488" className="dark:stop-color-[#14B8A6]" />
            </linearGradient>

            {/* Amber Creative Spark Gradient for Dot atop J */}
            <linearGradient id={`${id}-amber`} x1="68" y1="21" x2="77" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Ambient Radial Glow */}
            <radialGradient id={`${id}-glow`} cx="50" cy="50" r="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Outer Rounded Squircle Frame (Badge Variant) */}
          {variant !== "plain" && (
            <>
              <rect
                x="6"
                y="6"
                width="88"
                height="88"
                rx="25"
                className="fill-white/95 dark:fill-[#0B1120]/95 transition-colors duration-300 shadow-sm"
                stroke={`url(#${id}-border)`}
                strokeWidth="2.25"
              />
              <circle cx="50" cy="50" r="30" fill={`url(#${id}-glow)`} />
            </>
          )}

          {/* 2. Letter "M" (Mohammed) - Smooth, Geometric, Architecturally Balanced */}
          <path
            d="M 27 68 V 36 L 43 54 L 59 36 V 62"
            fill="none"
            stroke={`url(#${id}-teal)`}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Letter "J" (Aljazzar) - Vertical Stem & Graceful Underloop Hook */}
          <path
            d="M 73 36 V 59 C 73 66.5 67 71 58 71 C 51 71 47 67 46 62"
            fill="none"
            stroke={`url(#${id}-teal)`}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 4. Amber Creative Dot Atop "J" - Innovation Spark */}
          <circle
            cx="73"
            cy="25.5"
            r="4.5"
            fill={`url(#${id}-amber)`}
            className="drop-shadow-[0_1px_2px_rgba(217,119,6,0.35)]"
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
