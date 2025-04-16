import { type MouseEvent, type TouchEvent, useRef, useState } from "react";

type MagneticTextType = {
  text: string;
  maxWeight?: number;
  minWeight?: number;
  startBold?: boolean;
};

const MagneticText = ({
  text,
  startBold = false,
}: MagneticTextType) => {
  const maxWeight = 900;
  const minWeight = 100;
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
      className="flex gap-[0.05em] cursor-pointer"
      style={{
        fontFamily: '"InterVariable", sans-serif',
        userSelect: "text",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={resetWeights}
      onTouchEnd={resetWeights}
      onTouchCancel={resetWeights}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            fontVariationSettings: `"wght" ${weights[i] || 400}`,
            transition: "font-variation-settings 0.3s ease",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default MagneticText;
