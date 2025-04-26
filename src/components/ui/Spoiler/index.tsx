'use client';

import './index.css';

import { useState } from 'react';

export function Spoiler({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      onClick={() => setRevealed(true)}
      className="spoiler"
    >
      {children}
    </span>
  );
}
