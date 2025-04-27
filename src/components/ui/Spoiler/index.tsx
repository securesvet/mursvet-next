"use client";

import { cn } from "@/lib/utils";
import "./index.css";

import { useState } from "react";

export default function Spoiler({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div onClick={() => setRevealed(true)}>
      <span
        className={cn(
          "transition-all ",
          !revealed && "spoiler text-transparent",
          revealed && "text-opacity-100",
        )}
      >
        {children}
      </span>
    </div>
  );
}
