'use client';

import { create } from 'zustand';

type ClockStore = {
  loading: boolean;
  hours: string;
  minutes: string;
  seconds: string;
  startClock: () => void;
};

let interval: ReturnType<typeof setInterval> | undefined;

const format = (value: number) => value.toString().padStart(2, '0');

export const useClockStore = create<ClockStore>((set) => ({
  loading: true,
  hours: '00',
  minutes: '00',
  seconds: '00',

  startClock: () => {
    if (interval) return;

    const update = () => {
      const now = new Date();

      set({
        hours: format(now.getHours()),
        minutes: format(now.getMinutes()),
        seconds: format(now.getSeconds()),
        loading: false,
      });
    };

    update();
    interval = setInterval(update, 1000);
  },
}));
