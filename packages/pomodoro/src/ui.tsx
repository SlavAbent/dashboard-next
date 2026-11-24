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
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl px-3 py-4">
      <div className="text-foreground font-mono text-[length:clamp(2rem,10vw,3rem)] leading-none font-bold">
        {format(remaining)}
      </div>
      <div className="flex items-center gap-2">
        {options.map((minutes) => (
          <button
            key={minutes}
            type="button"
            aria-pressed={selectedMin === minutes}
            onClick={() => setMode(minutes)}
            className="bg-pomodoro-button text-pomodoro-button-foreground hover:bg-pomodoro-button-hover hover:text-pomodoro-button-hover-foreground aria-pressed:ring-ring min-h-11 rounded-sm px-3 py-2.5 font-mono text-sm transition-colors aria-pressed:ring-2 sm:px-4">
            {String(minutes).padStart(2, '0')}:00
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          aria-label="Reset"
          className="bg-pomodoro-button text-pomodoro-button-foreground hover:bg-pomodoro-button-hover hover:text-pomodoro-button-hover-foreground flex items-center gap-2 rounded-sm px-3 py-2 transition-colors">
          <RotateCcw size={18} /> Reset
        </button>
        <button
          type="button"
          onClick={startPause}
          className="bg-pomodoro-button text-pomodoro-button-foreground hover:bg-pomodoro-button-hover hover:text-pomodoro-button-hover-foreground flex items-center gap-2 rounded-sm px-3 py-2 transition-colors">
          <SkipForward size={18} />{' '}
          {running ? 'Pause' : remaining === 0 ? 'Ready' : 'Start'}
        </button>
      </div>
    </div>
  );
}

type PomodoroTimerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function PomodoroTimer({
  open: controlledOpen,
  onOpenChange,
}: PomodoroTimerProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const remaining = usePomodoroStore((state) => state.remaining);
  const totalSeconds = usePomodoroStore((state) => state.totalSeconds);

  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="interactive-hover rounded-xs px-1 py-2">
        {remaining === 0 ? 'Done! Rest & chill' : `${format(remaining)} ◔`}
      </button>
      {open && (
        <div
          className="bg-popover fixed inset-x-3 top-20 z-50 rounded-sm border p-2 shadow-md sm:absolute sm:inset-x-auto sm:top-full sm:right-0 sm:w-[min(90vw,24rem)]"
          style={{ minWidth: Math.min(220, Math.max(0, totalSeconds / 2)) }}>
          <PomodoroPanel />
        </div>
      )}
    </div>
  );
}
