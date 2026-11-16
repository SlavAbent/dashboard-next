import { addDays, format, startOfMonth, startOfWeek } from 'date-fns';

import type { CalendarViewMode } from '@/entities/calendar';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { CalendarDayCell } from '@/widgets/calendar/ui/calendarDayCell';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

type MonthCalendarGridProps = {
  currentMonth: Date;
  viewMode: CalendarViewMode;
  tasksByDate: Map<string, Task[]>;
  foldersByDate: Map<string, TaskFolder[]>;
  onCreateTask: (date: string, folderId?: string) => void;
  onEditTask: (taskId: string) => void;
  onEditFolder: (folderId: string, columnId: string) => void;
  onMoveTaskToDate: (taskId: string, date: string) => void;
  onMoveTaskToFolder: (taskId: string, folderId: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onQuickCreateTask: (date: string, text: string) => void;
};

export const MonthCalendarGrid = ({
  currentMonth,
  viewMode,
  tasksByDate,
  foldersByDate,
  onCreateTask,
  onEditTask,
  onEditFolder,
  onMoveTaskToDate,
  onMoveTaskToFolder,
  onToggleTask,
  onDeleteTask,
  onQuickCreateTask,
}: MonthCalendarGridProps) => {
  const periodStart = startOfWeek(startOfMonth(currentMonth), {
    weekStartsOn: 1,
  });
  const weekStart = startOfWeek(currentMonth, { weekStartsOn: 1 });
  const days =
    viewMode === 'day'
      ? [currentMonth]
      : Array.from({ length: viewMode === 'week' ? 7 : 42 }, (_, index) =>
          addDays(viewMode === 'week' ? weekStart : periodStart, index)
        );
  const visibleWeekDays =
    viewMode === 'day' ? [format(currentMonth, 'EEE')] : weekDays;
  const gridClass =
    viewMode === 'day'
      ? 'grid-cols-1 grid-rows-[auto_minmax(24rem,1fr)]'
      : viewMode === 'week'
        ? 'grid-cols-7 grid-rows-[auto_minmax(20rem,1fr)]'
        : 'grid-cols-7 grid-rows-[auto_repeat(6,9rem)]';

  return (
    <div
      role="grid"
      aria-label={format(currentMonth, 'MMMM yyyy')}
      className={`border-border grid w-full ${gridClass} self-start rounded-sm border`}>
      {visibleWeekDays.map((day) => (
        <div
          key={day}
          role="columnheader"
          className="bg-muted text-muted-foreground sticky top-0 z-30 border-r border-b px-2 py-2 text-center text-xs font-semibold last:border-r-0">
          {day}
        </div>
      ))}
      {days.map((date) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        return (
          <CalendarDayCell
            key={dateKey}
            date={date}
            currentMonth={currentMonth}
            tasks={tasksByDate.get(dateKey) ?? []}
            folders={foldersByDate.get(dateKey) ?? []}
            onCreateTask={onCreateTask}
            onEditTask={onEditTask}
            onEditFolder={onEditFolder}
            onMoveTaskToDate={onMoveTaskToDate}
            onMoveTaskToFolder={onMoveTaskToFolder}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onQuickCreateTask={onQuickCreateTask}
          />
        );
      })}
    </div>
  );
};
