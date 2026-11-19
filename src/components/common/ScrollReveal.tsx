"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.65,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const directionOffset = {
    up: { y: 30, opacity: 0, filter: "blur(3px)" },
    down: { y: -30, opacity: 0, filter: "blur(3px)" },
    left: { x: 30, opacity: 0, filter: "blur(3px)" },
    right: { x: -30, opacity: 0, filter: "blur(3px)" },
    none: { opacity: 0, filter: "blur(3px)" },
  };

  return (
    <motion.div
      ref={ref}
      initial={directionOffset[direction]}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered container for lists/grids
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  staggerDelay = 0.08,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger item used inside StaggerContainer
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated counter for numbers (60fps requestAnimationFrame)
export const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  className?: string;
}> = ({ value, suffix = "+", className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      const end = value;
      if (end <= 0) {
        setCount(0);
        return;
      }
      const duration = 1600;
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(easeOutQuad * end);
        setCount(current);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      const frame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frame);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
};
