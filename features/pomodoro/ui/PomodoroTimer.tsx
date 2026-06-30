import { RotateCcw, SkipForward } from 'lucide-react';
import React, { useState } from 'react';

import { usePomodoro } from '@/features/pomodoro/hooks/usePomodoro';
import { formatTitle } from '@/features/pomodoro/lib/format';
import { usePomodoroStore } from '@/features/pomodoro/model/pomodoro.store';
import { TimerDisplay } from '@/features/pomodoro/ui/TimerDisplay';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/Popover/popover';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { iconSize } from '@/shared/icons/iconSize';
import { CircleProgress } from '@/shared/icons/ui/CircleProgress';

export function PomodoroTimer() {
  const [open, setOpen] = useState(false);
  const { startPause, reset } = usePomodoro();
  const { remaining, running, totalSeconds } = usePomodoroStore();

  const isDone = remaining === 0;
  const progress = isDone ? 0 : remaining / totalSeconds;
  const startLabel = running ? 'Pause' : isDone ? 'Ready' : 'Start';

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
      }}>
      <PopoverTrigger>
        <div className="interactive-hover flex min-w-[36px] cursor-pointer items-center gap-2 rounded-xs px-1 py-2">
          {isDone ? (
            <TypographySmall text="Done! Rest & chill" />
          ) : (
            <>
              <TypographySmall
                text={formatTitle(remaining)}
                className="tabular-nums"
              />
              <CircleProgress progress={progress} size={iconSize(18)} />
            </>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="max-w-auto border-border rounded-sm border">
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
      </PopoverContent>
    </Popover>
  );
}
