'use client';

import type { Column } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { BoardModals } from '@/features/boardModal';
import { useCalendarBoardData } from '@/widgets/calendar/model/useCalendarBoardData';
import { useCalendarTaskActions } from '@/widgets/calendar/model/useCalendarTaskActions';
import { CalendarToolbar } from '@/widgets/calendar/ui/calendarToolbar';
import { MonthCalendarGrid } from '@/widgets/calendar/ui/monthCalendarGrid';

type CalendarHydratorProps = {
  tasks: Task[];
  columns: Column[];
  folders: TaskFolder[];
};

export const CalendarHydrator = ({
  tasks,
  columns,
  folders,
}: CalendarHydratorProps) => {
  const {
    currentMonth,
    viewMode,
    storeTasks,
    storeFolders,
    storeColumns,
    tasksByDate,
    foldersByDate,
  } = useCalendarBoardData({ tasks, columns, folders });
  const actions = useCalendarTaskActions({
    tasks: storeTasks,
    folders: storeFolders,
  });

  return (
    <div className="flex h-full min-h-0 flex-col p-3 sm:p-4 md:p-6">
      <CalendarToolbar columns={storeColumns} folders={storeFolders} />
      <div className="min-h-0 flex-1 overflow-auto">
        <div className="flex min-h-full min-w-[56rem]">
          <MonthCalendarGrid
            currentMonth={currentMonth}
            viewMode={viewMode}
            tasksByDate={tasksByDate}
            foldersByDate={foldersByDate}
            onCreateTask={(date, folderId) =>
              actions.openCreateTask(folderId, date)
            }
            onEditTask={actions.openEditTask}
            onEditFolder={(folderId, columnId) =>
              actions.openEditFolder(folderId, columnId)
            }
            onMoveTaskToDate={(taskId, date) =>
              void actions.moveTaskToDate(taskId, date)
            }
            onMoveTaskToFolder={(taskId, folderId) =>
              void actions.moveTaskToFolder(taskId, folderId)
            }
            onToggleTask={(taskId) => void actions.toggleCalendarTask(taskId)}
            onDeleteTask={(taskId) => void actions.deleteCalendarTask(taskId)}
            onQuickCreateTask={(date, text) =>
              void actions.quickCreateTask(date, text)
            }
          />
        </div>
      </div>
      <BoardModals defaultNewFolderColumnId="planning" />
    </div>
  );
};
