import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dashboard/ui';
import { cn } from '@lib/cn';
import { EllipsisVerticalIcon } from 'lucide-react';
import type { DragEvent } from 'react';

import type { Task } from '@/entities/task';
import { calendarItemPriorityClass } from '@/widgets/calendar/lib/calendarItemStyles';
import { isTaskOverdue } from '@/widgets/calendar/lib/calendarTasks';
import { CalendarItemContent } from '@/widgets/calendar/ui/calendarItemContent';

type CalendarTaskItemProps = {
  task: Task;
  onEdit: (taskId: string) => void;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

export const CalendarTaskItem = ({
  task,
  onEdit,
  onToggle,
  onDelete,
}: CalendarTaskItemProps) => {
  const hasHighlightedBorder =
    task.priority === 'high' || task.priority === 'critical';

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/x-dashboard-task-id', task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      title="Drag to another day or folder"
      data-task-id={task.id}
      data-overdue={isTaskOverdue(task) || undefined}
      className={cn(
        'flex min-w-0 shrink-0 items-stretch rounded-sm border text-xs shadow-sm transition-colors',
        calendarItemPriorityClass[task.priority],
        task.completed && 'opacity-60',
        hasHighlightedBorder && 'border-destructive ring-destructive/20 ring-1'
      )}>
      <button
        type="button"
        onClick={() => onEdit(task.id)}
        className="flex min-w-0 flex-1 flex-col items-stretch px-2 py-1.5 text-left">
        <CalendarItemContent
          title={task.text}
          startDate={task.startDate}
          endDate={task.endDate}
          priority={task.priority}
          completed={task.completed}
        />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Actions for ${task.text}`}
          className="hover:bg-background/40 m-1 flex w-6 shrink-0 items-center justify-center rounded-sm">
          <EllipsisVerticalIcon className="size-3.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem onClick={() => onToggle(task.id)}>
            {task.completed ? 'Mark open' : 'Complete'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(task.id)}>
            Edit / move
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete(task.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
