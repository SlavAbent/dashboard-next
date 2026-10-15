'use client';

import { useEffect, useRef } from 'react';

import { usePomodoroStore } from './store';

const formatTitle = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export function PomodoroRuntime() {
  const running = usePomodoroStore((state) => state.running);
  const remaining = usePomodoroStore((state) => state.remaining);
  const tick = usePomodoroStore((state) => state.tick);
  const originalTitle = useRef('');

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [running, tick]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!originalTitle.current) originalTitle.current = document.title;
    document.title = running
      ? `${formatTitle(remaining)} ● Pomodoro`
      : originalTitle.current;
  }, [remaining, running]);

  return null;
}
