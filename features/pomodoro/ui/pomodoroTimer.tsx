import React, { useState } from 'react';

import { formatTitle } from '@/features/pomodoro/lib/format';
import { usePomodoroStore } from '@/features/pomodoro/model/pomodoro.store';
import { PomodoroPanel } from '@/features/pomodoro/ui/pomodoroPanel';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/popover/popover';
import { TypographySmall } from '@/shared/components/typography/typographySmall';
import { iconSize } from '@/shared/icons/iconSize';
import { CircleProgress } from '@/shared/icons/ui/circleProgress';

export function PomodoroTimer() {
  const [open, setOpen] = useState(false);
  const { remaining, totalSeconds } = usePomodoroStore();

  const isDone = remaining === 0;
  const progress = isDone ? 0 : remaining / totalSeconds;

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
        <PomodoroPanel />
      </PopoverContent>
    </Popover>
  );
}
