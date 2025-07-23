'use client';

import { cn } from '@/lib/utils';
import './index.css';

import { useState } from 'react';

export default function Spoiler({ children }: { children: React.ReactNode }) {
	const [revealed, setRevealed] = useState(false);

	return (
		<span
			onClick={() => setRevealed(true)}
			className={cn(
				'transition-all',
				!revealed && 'cursor-pointer spoiler text-transparent',
			)}
		>
			{children}
		</span>
	);
}
