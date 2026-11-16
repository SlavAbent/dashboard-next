import { cn } from '@lib/cn';
import { format, isSameDay, isSameMonth } from 'date-fns';
import type { DragEvent } from 'react';

import { useCalendarStore } from '@/entities/calendar';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { CalendarFolderItem } from '@/widgets/calendar/ui/calendarFolderItem';
import { CalendarItemTypeToggle } from '@/widgets/calendar/ui/calendarItemTypeToggle';
import { CalendarQuickCreate } from '@/widgets/calendar/ui/calendarQuickCreate';
import { CalendarTaskItem } from '@/widgets/calendar/ui/calendarTaskItem';

type CalendarDayCellProps = {
  date: Date;
  currentMonth: Date;
  tasks: Task[];
  folders: TaskFolder[];
  onCreateTask: (date: string, folderId?: string) => void;
  onEditTask: (taskId: string) => void;
  onEditFolder: (folderId: string, columnId: string) => void;
  onMoveTaskToDate: (taskId: string, date: string) => void;
  onMoveTaskToFolder: (taskId: string, folderId: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onQuickCreateTask: (date: string, text: string) => void;
};

export const CalendarDayCell = ({
  date,
  currentMonth,
  tasks,
  folders,
  onCreateTask,
  onEditTask,
  onEditFolder,
  onMoveTaskToDate,
  onMoveTaskToFolder,
  onToggleTask,
  onDeleteTask,
  onQuickCreateTask,
}: CalendarDayCellProps) => {
  const dateKey = format(date, 'yyyy-MM-dd');
  const defaultVisibleItems = useCalendarStore(
    (state) => state.defaultVisibleItems
  );
  const visibleItems = useCalendarStore(
    (state) => state.visibleItemsByDate[dateKey] ?? defaultVisibleItems
  );
  const showItemsForDate = useCalendarStore((state) => state.showItemsForDate);
  const isExpanded = useCalendarStore(
    (state) => state.expandedDates[dateKey] ?? false
  );
  const toggleDateExpanded = useCalendarStore(
    (state) => state.toggleDateExpanded
  );
  const visibleTasks = isExpanded ? tasks : tasks.slice(0, 2);
  const visibleFolders = isExpanded ? folders : folders.slice(0, 2);
  const hiddenCount =
    visibleItems === 'tasks'
      ? tasks.length - visibleTasks.length
      : folders.length - visibleFolders.length;

  const handleDropOnDate = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData(
      'application/x-dashboard-task-id'
    );
    if (taskId) onMoveTaskToDate(taskId, dateKey);
  };

  return (
    <div
      role="gridcell"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDropOnDate}
      className={cn(
        'bg-background group relative flex h-full min-h-36 flex-col overflow-hidden border-r border-b p-2 transition-colors last:border-r-0',
        !isSameMonth(date, currentMonth) && 'opacity-45'
      )}>
      <button
        type="button"
        aria-label={`Add task for ${dateKey}`}
        onClick={() => onCreateTask(dateKey)}
        className="focus-visible:ring-ring absolute inset-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset"
      />

      <div className="pointer-events-none relative z-10 mb-2 flex shrink-0 items-center gap-2">
        <span
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-medium',
            isSameDay(date, new Date()) && 'bg-primary text-primary-foreground'
          )}>
          {format(date, 'd')}
        </span>
        <CalendarQuickCreate
          dateKey={dateKey}
          onCreate={(text) => onQuickCreateTask(dateKey, text)}
        />
        <CalendarItemTypeToggle
          dateKey={dateKey}
          activeItems={visibleItems}
          folderCount={folders.length}
          taskCount={tasks.length}
          onChange={(items) => showItemsForDate(dateKey, items)}
        />
      </div>

      {visibleItems === 'tasks' && tasks.length > 0 && (
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) onCreateTask(dateKey);
          }}
          className="relative z-20 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pr-1">
          {visibleTasks.map((task) => (
            <CalendarTaskItem
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      )}

      {visibleItems === 'folders' && folders.length > 0 && (
        <div className="relative z-20 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pr-1">
          {visibleFolders.map((folder) => (
            <CalendarFolderItem
              key={folder.id}
              folder={folder}
              onEdit={onEditFolder}
              onCreateTask={(folderId) => onCreateTask(dateKey, folderId)}
              onMoveTask={onMoveTaskToFolder}
            />
          ))}
        </div>
      )}

      {hiddenCount > 0 && (
        <button
          type="button"
          aria-label={`Show ${hiddenCount} more ${hiddenCount === 1 ? 'item' : 'items'}`}
          onClick={() => toggleDateExpanded(dateKey)}
          className="text-muted-foreground hover:text-foreground relative z-20 mt-1 text-left text-[10px] font-medium">
          +{hiddenCount} more
        </button>
      )}
      {isExpanded &&
        (visibleItems === 'tasks' ? tasks.length : folders.length) > 2 && (
          <button
            type="button"
            aria-label="Show fewer items"
            onClick={() => toggleDateExpanded(dateKey)}
            className="text-muted-foreground hover:text-foreground relative z-20 mt-1 text-left text-[10px] font-medium">
            Show less
          </button>
        )}
    </div>
  );
};
