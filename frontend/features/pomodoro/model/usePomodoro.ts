import { useEffect, useRef } from 'react';

import { playCompletionSound } from '@/features/pomodoro/lib/audio';
import { formatTitle } from '@/features/pomodoro/lib/format';
import { blinkTitle } from '@/features/pomodoro/lib/notifications';
import { usePomodoroStore } from '@/features/pomodoro/model/pomodoro.store';
import { fireConfetti } from '@/shared/lib/confetti';

export function usePomodoro() {
  const store = usePomodoroStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalTitle = useRef<string>('');

  useEffect(() => {
    if (store.running) {
      intervalRef.current = setInterval(() => store.tick(), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [store, store.running]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!originalTitle.current) originalTitle.current = document.title;

    document.title = store.running
      ? `${formatTitle(store.remaining)} ● Pomodoro`
      : originalTitle.current;

    return () => {
      document.title = originalTitle.current;
    };
  }, [store.remaining, store.running]);

  useEffect(() => {
    return usePomodoroStore.subscribe(
      (s) => s.remaining,
      (remaining, prev) => {
        if (prev > 0 && remaining === 0) {
          playCompletionSound();
          blinkTitle(originalTitle.current);
          setTimeout(() => fireConfetti(), 100);
        }
      }
    );
  }, []);

  return { ...store };
}
