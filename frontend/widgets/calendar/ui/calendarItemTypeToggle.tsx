import { cn } from '@lib/cn';
import { FolderIcon, ListTodoIcon } from 'lucide-react';

import type { CalendarItemType } from '@/entities/calendar';

type CalendarItemTypeToggleProps = {
  dateKey: string;
  activeItems: CalendarItemType;
  folderCount: number;
  taskCount: number;
  onChange: (items: CalendarItemType) => void;
};

const toggleButtonClass =
  'text-muted-foreground hover:bg-muted hover:text-foreground flex h-6 min-w-9 items-center justify-center gap-1 rounded-sm px-1.5 text-[10px] font-medium transition-colors';

export const CalendarItemTypeToggle = ({
  dateKey,
  activeItems,
  folderCount,
  taskCount,
  onChange,
}: CalendarItemTypeToggleProps) => (
  <div className="pointer-events-auto ml-auto flex items-center gap-1">
    <button
      type="button"
      title={`Folders: ${folderCount}`}
      aria-label={`Show folders for ${dateKey}`}
      aria-pressed={activeItems === 'folders'}
      onClick={() => onChange('folders')}
      className={cn(
        toggleButtonClass,
        activeItems === 'folders' && 'bg-muted text-foreground',
        folderCount === 0 && 'opacity-40 hover:opacity-100'
      )}>
      <FolderIcon className="size-3" />
      <span>{folderCount}</span>
    </button>
    <button
      type="button"
      title={`Tasks: ${taskCount}`}
      aria-label={`Show tasks for ${dateKey}`}
      aria-pressed={activeItems === 'tasks'}
      onClick={() => onChange('tasks')}
      className={cn(
        toggleButtonClass,
        activeItems === 'tasks' && 'bg-muted text-foreground',
        taskCount === 0 && 'opacity-40 hover:opacity-100'
      )}>
      <ListTodoIcon className="size-3" />
      <span>{taskCount}</span>
    </button>
  </div>
);
