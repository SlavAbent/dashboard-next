import React from 'react';

import { formatTitle, padDuration } from '@/features/pomodoro/lib/format';
import { usePomodoroStore } from '@/features/pomodoro/model/pomodoro.store';
import { DurationType } from '@/features/pomodoro/model/types';

type TimerDisplayProps = {
  remaining: number;
};

const OPTIONS: DurationType[] = [5, 10, 25];

export function TimerDisplay({ remaining }: TimerDisplayProps) {
  const { selectedMin, setMode } = usePomodoroStore();
  return (
    <>
      <div
        className="text-foreground group flex items-center gap-1.5 font-mono text-[48px] leading-none font-bold tracking-tight transition-colors"
        aria-label="select duration">
        <span>{formatTitle(remaining)}</span>
      </div>

      <div className="flex items-center">
        {OPTIONS.map((min) => (
          <div key={min}>
            <button
              type="button"
              aria-selected={selectedMin === min}
              onClick={() => setMode(min)}
              className={`flex w-full items-center justify-between px-4 py-2.5 font-mono text-sm transition-colors ${
                selectedMin === min
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              } `}>
              <span>{padDuration(min)}</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
