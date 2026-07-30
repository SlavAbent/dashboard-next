'use client';

import { useEffect, useState } from 'react';

import { iconSize } from '@/shared/icons/iconSize';
import { CircleProgress } from '@/shared/icons/ui/circleProgress';

import { DashboardCard } from './dashboardCard';

const RING_SIZE = 128;
const RING_STROKE_WIDTH = 12;

type AnimatedRingProps = {
  percent: number;
  className?: string;
};

const AnimatedRing = ({ percent, className }: AnimatedRingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setProgress(percent / 100));

    return () => cancelAnimationFrame(raf);
  }, [percent]);

  return (
    <CircleProgress
      progress={progress}
      size={iconSize(RING_SIZE)}
      strokeWidth={RING_STROKE_WIDTH}
      className={className}
    />
  );
};

const formatTaskCount = (count: number) =>
  `${count} task${count === 1 ? '' : 's'}`;

type TaskProgressRingProps = {
  label: string;
  count: number;
  percent: number;
  className?: string;
};

const TaskProgressRing = ({
  label,
  count,
  percent,
  className,
}: TaskProgressRingProps) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
      <AnimatedRing percent={percent} className={className} />
      <span className="absolute text-sm font-semibold tabular-nums">
        {formatTaskCount(count)}
      </span>
    </div>
    <span className="text-muted-foreground text-xs">{label}</span>
  </div>
);

type TaskProgressCardClientProps = {
  doneCount: number;
  undoneCount: number;
  donePercent: number;
  undonePercent: number;
};

export const TaskProgressCardClient = ({
  doneCount,
  undoneCount,
  donePercent,
  undonePercent,
}: TaskProgressCardClientProps) => {
  return (
    <DashboardCard
      title="Tasks progress"
      contentClassName="items-center justify-center">
      <div className="flex items-center justify-center gap-6">
        <TaskProgressRing
          label="Done"
          count={doneCount}
          percent={donePercent}
          className="text-emerald-500"
        />
        <TaskProgressRing
          label="Undone"
          count={undoneCount}
          percent={undonePercent}
          className="text-amber-500"
        />
      </div>
    </DashboardCard>
  );
};
