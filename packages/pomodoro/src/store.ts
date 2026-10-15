'use client';

import { create } from 'zustand';

import type { DurationType, PomodoroStore } from './types';

export const usePomodoroStore = create<PomodoroStore>((set, get) => ({
  selectedMin: 25,
  totalSeconds: 25 * 60,
  remaining: 25 * 60,
  running: false,
  setMode: (min: DurationType) =>
    set({
      selectedMin: min,
      totalSeconds: min * 60,
      remaining: min * 60,
      running: false,
    }),
  startPause: () => {
    const { running, remaining } = get();
    if (remaining <= 0) return get().reset();
    set({ running: !running });
  },
  reset: () =>
    set((state) => ({ remaining: state.totalSeconds, running: false })),
  tick: () => {
    const { remaining } = get();
    set(
      remaining <= 1
        ? { remaining: 0, running: false }
        : { remaining: remaining - 1 }
    );
  },
}));
