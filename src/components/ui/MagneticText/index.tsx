"use client";

import { Inter } from "next/font/google";

import { type MouseEvent, type TouchEvent, useRef, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type MagneticTextType = {
  text: string;
  maxWeight?: number;
  minWeight?: number;
  startBold?: boolean;
  className?: string;
};

const MagneticText = ({
  text,
  startBold = false,
  className = "",
}: MagneticTextType) => {
  const maxWeight = 900;
  const minWeight = 400;
  const containerRef = useRef<HTMLDivElement>(null);
  const [weights, setWeights] = useState<number[]>(
    new Array(text.length).fill(startBold ? maxWeight : minWeight),
  );

  const handleInteractionMove = (x: number, y: number) => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll("span");
    const newWeights: number[] = [];

    letters.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const dx = x - (rect.left + rect.width / 2);
      const dy = y - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const multiplier = text.length;

      const weight = startBold
        ? Math.min(minWeight + multiplier * dist, maxWeight)
        : Math.max(minWeight, maxWeight - multiplier * dist);
      newWeights.push(weight);
    });

    setWeights(newWeights);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    handleInteractionMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      handleInteractionMove(touch.clientX, touch.clientY);
    }
  };

  const resetWeights = () =>
    setWeights(new Array(text.length).fill(startBold ? maxWeight : minWeight));

  return (
    <div
      ref={containerRef}
      className={`flex gap-[0.05em] ${inter.className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={resetWeights}
      onTouchEnd={resetWeights}
      onTouchCancel={resetWeights}
    >
      <p className={`hover:cursor-pointer ${className}`}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              fontVariationSettings: `"wght" ${weights[i] || 400}`,
              transition: "font-variation-settings 0.1s ease",
            }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  );
};

export default MagneticText;
