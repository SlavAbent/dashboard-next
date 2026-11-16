import type { Priority } from '@/shared/model/schedule';

export const calendarItemPriorityClass: Record<Priority, string> = {
  critical: 'bg-[#800020]/15 hover:bg-[#800020]/25',
  high: 'bg-red-500/15 hover:bg-red-500/25',
  medium: 'bg-yellow-500/15 hover:bg-yellow-500/25',
  low: 'bg-blue-500/15 hover:bg-blue-500/25',
  none: 'bg-gray-400/15 hover:bg-gray-400/25',
};
