"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  phrases: string[];
  speed?: number;
  pause?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  phrases,
  speed = 75,
  pause = 2000,
  className = "",
  cursorClassName = "text-teal-500 font-bold",
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[index % phrases.length];

    // Reached end of current phrase, pause before deleting
    if (subIndex === currentPhrase.length && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    // Finished deleting, move to next phrase
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    // Normal typing or deleting interval
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? speed / 2.5 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, phrases, speed, pause]);

  const currentPhrase = phrases[index % phrases.length] || "";

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentPhrase.substring(0, subIndex)}</span>
      <span className={`inline-block ml-1 rtl:mr-1 animate-pulse ${cursorClassName}`}>|</span>
    </span>
  );
};
