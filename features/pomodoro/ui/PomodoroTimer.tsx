import React, { useState } from 'react';
import { TimerDisplay } from '@/features/pomodoro/ui/TimerDisplay';
import { usePomodoroStore } from '@/features/pomodoro/model/pomodoro.store';
import { ChevronDown, RotateCcw, SkipForward } from 'lucide-react';
import { usePomodoro } from '@/features/pomodoro/hooks/usePomodoro';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/lib/cn';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { formatTitle } from '@/features/pomodoro/lib/format';

export function PomodoroTimer() {
  const [open, setOpen] = useState(false);
  const { startPause, reset } = usePomodoro();
  const { remaining, running } = usePomodoroStore();

  const isDone = remaining === 0;
  const startLabel = running ? 'Pause' : isDone ? 'Ready' : 'Start';

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
      }}>
      <PopoverTrigger>
        <div className="flex cursor-pointer items-center">
          {isDone ? (
            <TypographySmall text="Done! Rest & chill" />
          ) : (
            <TypographySmall text={formatTitle(remaining)} />
          )}

          <ChevronDown
            width={16}
            height={16}
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-100 rounded-sm border border-[#AFAFAF]">
        <div className="flex flex-col items-center justify-center rounded-2xl">
          <TimerDisplay remaining={remaining} />

          <div className="flex items-center gap-3">
            <button
              onClick={reset}
              aria-label="Reset"
              className="flex cursor-pointer items-center gap-2 rounded-full p-2 text-[#444] transition-colors">
              <RotateCcw size={18} />
              <TypographySmall text="Reset" />
            </button>

            <button
              onClick={startPause}
              className="flex cursor-pointer items-center gap-2 rounded-full p-2 text-[#444] transition-colors">
              <SkipForward size={18} />
              <TypographySmall text={startLabel} />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
