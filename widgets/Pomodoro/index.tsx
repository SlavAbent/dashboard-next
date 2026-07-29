import { RotateCcw, SkipForward } from 'lucide-react';
import React from 'react';

import { usePomodoro } from '@/features/pomodoro/hooks/usePomodoro';
import { usePomodoroStore } from '@/features/pomodoro/model/pomodoro.store';
import { TimerDisplay } from '@/features/pomodoro/ui/TimerDisplay';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';

export const Pomodoro = () => {
  const { startPause, reset } = usePomodoro();
  const { remaining, running } = usePomodoroStore();

  const isDone = remaining === 0;
  const startLabel = running ? 'Pause' : isDone ? 'Ready' : 'Start';

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl">
      <TimerDisplay remaining={remaining} />

      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          aria-label="Reset"
          className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 rounded-full p-2 transition-colors">
          <RotateCcw size={18} />
          <TypographySmall text="Reset" />
        </button>

        <button
          onClick={startPause}
          className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 rounded-full p-2 transition-colors">
          <SkipForward size={18} />
          <TypographySmall text={startLabel} />
        </button>
      </div>
    </div>
  );
};
