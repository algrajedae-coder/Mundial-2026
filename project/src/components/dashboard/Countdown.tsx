"use client"

import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <div className="text-xl font-bold">¡En curso!</div>;

  return (
    <div className="flex gap-4">
      {[
        { label: 'Días', value: timeLeft.d },
        { label: 'Hrs', value: timeLeft.h },
        { label: 'Min', value: timeLeft.m },
        { label: 'Seg', value: timeLeft.s },
      ].map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="text-2xl font-bold bg-secondary w-12 h-12 flex items-center justify-center rounded-lg border border-border shadow-sm">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1 tracking-wider">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}