import { CircleProgressProps } from '@/shared/icons/types/icon.types';

export function CircleProgress({
  progress = 0,
  size,
  strokeWidth = 2,
  className,
}: CircleProgressProps) {
  const width = size?.width ?? 20;
  const height = size?.height ?? 20;
  const r = (Math.min(width, height) - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ transform: 'rotate(-90deg)' }}
      aria-hidden="true">
      <circle
        cx={width / 2}
        cy={height / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeOpacity={0.2}
      />
      <circle
        cx={width / 2}
        cy={height / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s linear' }}
      />
    </svg>
  );
}
