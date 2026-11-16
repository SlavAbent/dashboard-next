import { cn } from '@lib/cn';
import { PlusIcon } from 'lucide-react';
import type { DragEvent } from 'react';

import type { TaskFolder } from '@/entities/folder';
import { calendarItemPriorityClass } from '@/widgets/calendar/lib/calendarItemStyles';
import { CalendarItemContent } from '@/widgets/calendar/ui/calendarItemContent';

type CalendarFolderItemProps = {
  folder: TaskFolder;
  onEdit: (folderId: string, columnId: string) => void;
  onCreateTask: (folderId: string) => void;
  onMoveTask: (taskId: string, folderId: string) => void;
};

export const CalendarFolderItem = ({
  folder,
  onEdit,
  onCreateTask,
  onMoveTask,
}: CalendarFolderItemProps) => {
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const taskId = event.dataTransfer.getData(
      'application/x-dashboard-task-id'
    );
    if (taskId) onMoveTask(taskId, folder.id);
  };

  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      title="Drop a task here to move it into this folder"
      className={cn(
        'flex min-w-0 shrink-0 items-stretch rounded-sm border text-xs shadow-sm transition-colors',
        calendarItemPriorityClass[folder.priority]
      )}>
      <button
        type="button"
        onClick={() => onEdit(folder.id, folder.columnId)}
        className="flex min-w-0 flex-1 flex-col items-stretch px-2 py-1.5 text-left">
        <CalendarItemContent
          title={folder.title}
          startDate={folder.startDate}
          endDate={folder.endDate}
          priority={folder.priority}
        />
      </button>
      <button
        type="button"
        aria-label={`Add task to ${folder.title}`}
        onClick={() => onCreateTask(folder.id)}
        className="hover:bg-background/40 focus-visible:ring-ring m-1 flex w-7 shrink-0 items-center justify-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none">
        <PlusIcon className="size-3.5" />
      </button>
    </div>
  );
};
