import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { PomodoroStore } from './types';

export const usePomodoroStore = create<PomodoroStore>()(
  subscribeWithSelector((set, get) => ({
    selectedMin: 25,
    totalSeconds: 25 * 60,
    remaining: 25 * 60,
    running: false,

    setMode: (min) =>
      set({
        selectedMin: min,
        totalSeconds: min * 60,
        remaining: min * 60,
        running: false,
      }),

    startPause: () => {
      const { running, remaining } = get();
      if (remaining <= 0) {
        get().reset();
        return;
      }
      set({ running: !running });
    },

    reset: () =>
      set((s) => ({
        remaining: s.totalSeconds,
        running: false,
      })),

    tick: () => {
      const { remaining } = get();
      if (remaining <= 1) {
        set({ remaining: 0, running: false });
      } else {
        set({ remaining: remaining - 1 });
      }
    },
  }))
);
