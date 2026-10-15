'use client';

import { RotateCcw, SkipForward } from 'lucide-react';
import { useState } from 'react';

import { usePomodoroStore } from './store';
import type { DurationType } from './types';

const format = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export function PomodoroPanel() {
  const { remaining, running, selectedMin, setMode, startPause, reset } =
    usePomodoroStore();
  const options: DurationType[] = [5, 10, 25];

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl p-3">
      <div className="text-foreground font-mono text-[48px] leading-none font-bold">
        {format(remaining)}
      </div>
      <div className="flex items-center">
        {options.map((minutes) => (
          <button
            key={minutes}
            type="button"
            aria-selected={selectedMin === minutes}
            onClick={() => setMode(minutes)}
            className="px-4 py-2.5 font-mono text-sm">
            {String(minutes).padStart(2, '0')}:00
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          aria-label="Reset"
          className="flex items-center gap-2 rounded-full p-2">
          <RotateCcw size={18} /> Reset
        </button>
        <button
          type="button"
          onClick={startPause}
          className="flex items-center gap-2 rounded-full p-2">
          <SkipForward size={18} />{' '}
          {running ? 'Pause' : remaining === 0 ? 'Ready' : 'Start'}
        </button>
      </div>
    </div>
  );
}

export function PomodoroTimer() {
  const [open, setOpen] = useState(false);
  const remaining = usePomodoroStore((state) => state.remaining);
  const totalSeconds = usePomodoroStore((state) => state.totalSeconds);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="interactive-hover rounded-xs px-1 py-2">
        {remaining === 0 ? 'Done! Rest & chill' : `${format(remaining)} ◔`}
      </button>
      {open && (
        <div
          className="bg-popover absolute top-full right-0 z-50 rounded-sm border p-2 shadow-md"
          style={{ minWidth: Math.max(220, totalSeconds / 2) }}>
          <PomodoroPanel />
        </div>
      )}
    </div>
  );
}
