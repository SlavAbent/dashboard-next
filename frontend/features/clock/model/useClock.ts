'use client';

import { useEffect } from 'react';

import { useClockStore } from './clock.store';

export const useClock = () => {
  const hours = useClockStore((state) => state.hours);
  const minutes = useClockStore((state) => state.minutes);
  const seconds = useClockStore((state) => state.seconds);
  const startClock = useClockStore((state) => state.startClock);

  useEffect(() => {
    startClock();
  }, [startClock]);

  return {
    hours,
    minutes,
    seconds,
  };
};
