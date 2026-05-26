import { usePomodoroStore } from '@/features/pomodoro/model/pomodoro.store';
import { useEffect, useRef } from 'react';
import { playCompletionSound } from '@/features/pomodoro/lib/audio';

export function usePomodoro() {
  const store = usePomodoroStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (store.running) {
      intervalRef.current = setInterval(() => store.tick(), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [store.running]);

  useEffect(() => {
    return usePomodoroStore.subscribe(
      (s) => s.remaining,
      (remaining, prev) => {
        if (prev > 0 && remaining === 0) {
          playCompletionSound();
        }
      }
    );
  }, []);

  return { ...store };
}
