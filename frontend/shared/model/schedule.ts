import { format, parseISO } from 'date-fns';

export const priorities = [
  'none',
  'low',
  'medium',
  'high',
  'critical',
] as const;

export type Priority = (typeof priorities)[number];

export type Schedule = {
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
};

export const priorityConfig: Record<
  Priority,
  {
    label: string;
    dotClassName: string;
    badgeClassName: string;
    cardBadgeClassName: string;
    cardBorderClassName: string;
  }
> = {
  critical: {
    label: 'Higher',
    dotClassName: 'bg-[#800020]',
    badgeClassName: 'border-[#800020]/30 bg-[#800020]/10 text-[#800020]',
    cardBadgeClassName: 'border-[#800020] bg-[#800020] text-white',
    cardBorderClassName: 'border-[#800020]/60',
  },
  high: {
    label: 'High',
    dotClassName: 'bg-red-500',
    badgeClassName: 'border-red-500/30 bg-red-500/10 text-red-600',
    cardBadgeClassName: 'border-red-500 bg-red-500 text-white',
    cardBorderClassName: 'border-red-500/60',
  },
  medium: {
    label: 'Medium',
    dotClassName: 'bg-yellow-500',
    badgeClassName: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700',
    cardBadgeClassName: 'border-yellow-400 bg-yellow-400 text-yellow-950',
    cardBorderClassName: 'border-yellow-500/60',
  },
  low: {
    label: 'Low',
    dotClassName: 'bg-blue-500',
    badgeClassName: 'border-blue-500/30 bg-blue-500/10 text-blue-600',
    cardBadgeClassName: 'border-blue-500 bg-blue-500 text-white',
    cardBorderClassName: 'border-blue-500/60',
  },
  none: {
    label: 'Without',
    dotClassName: 'bg-gray-400',
    badgeClassName: 'border-gray-400/30 bg-gray-400/10 text-gray-500',
    cardBadgeClassName: 'border-gray-400 bg-gray-400 text-white',
    cardBorderClassName: 'border-gray-400/60',
  },
};

export const formatScheduleRange = (
  startDate: string | null,
  endDate: string | null
) => {
  if (!startDate || !endDate) return null;

  const start = format(parseISO(startDate), 'dd.MM.yyyy');
  const end = format(parseISO(endDate), 'dd.MM.yyyy');

  return start === end ? start : `${start} — ${end}`;
};
