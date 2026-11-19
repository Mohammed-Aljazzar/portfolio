import React from "react";

interface MonogramLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  withWatermark?: boolean;
}

export const MonogramLogo: React.FC<MonogramLogoProps> = ({
  className = "w-9 h-9",
  size = 36,
  showText = false,
  withWatermark = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className={`relative flex items-center justify-center transition-transform duration-300 hover:scale-105 ${
          withWatermark ? "opacity-15" : ""
        }`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <linearGradient id="monogramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" className="dark:stop-color-[#2DD4BF]" />
              <stop offset="50%" stopColor="#0F766E" className="dark:stop-color-[#14B8A6]" />
              <stop offset="100%" stopColor="#4F46E5" className="dark:stop-color-[#818CF8]" />
            </linearGradient>
            <linearGradient id="accentGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Background Rounded Shield / Hexagon subtle frame */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            className="stroke-teal-500/20 dark:stroke-teal-400/25 fill-teal-500/5 dark:fill-teal-400/10"
            strokeWidth="2.5"
          />

          {/* Left Vertical Architectural Column (System & ERP Precision) */}
          <path
            d="M24 74 V28 L38 20 V74 H24Z"
            fill="url(#monogramGradient)"
          />

          {/* Central Architectural Diagonal Strut connecting to Apex */}
          <path
            d="M38 20 L50 48 L62 20 H68 L50 62 L32 20 H38Z"
            fill="url(#accentGlow)"
          />

          {/* Right Column with Harmonious UI/UX Curve (Curved Flow meeting Angle) */}
          <path
            d="M62 20 C72 20 76 26 76 36 V74 H62 V38 C62 30 60 26 54 26 L62 20Z"
            fill="url(#monogramGradient)"
          />

          {/* Secondary UI/UX Wave Bridge */}
          <path
            d="M32 74 C42 70 58 70 68 74"
            stroke="url(#accentGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Modern Geometric Accent Node at Apex */}
          <circle
            cx="50"
            cy="48"
            r="3.5"
            className="fill-white dark:fill-teal-200"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
            محمد الجزار
          </span>
          <span className="text-[11px] font-mono tracking-wider text-teal-600 dark:text-teal-400 uppercase font-semibold">
            M. Aljazzar
          </span>
        </div>
      )}
    </div>
  );
};
