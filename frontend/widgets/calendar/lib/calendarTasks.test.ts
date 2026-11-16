import type { CalendarFilters } from '@/entities/calendar';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import {
  filterCalendarTasks,
  isTaskOverdue,
  moveTaskScheduleToDate,
} from '@/widgets/calendar/lib/calendarTasks';

const folder: TaskFolder = {
  id: 'folder-1',
  columnId: 'planning',
  title: 'Planning',
  order: 1,
  startDate: null,
  endDate: null,
  priority: 'none',
};

const task = (overrides: Partial<Task> = {}): Task => ({
  id: 'task-1',
  text: 'Calendar task',
  tags: [],
  completed: false,
  taskFolderId: folder.id,
  order: 1,
  createdAt: '2026-11-10T00:00:00.000Z',
  startDate: '2026-11-10',
  endDate: '2026-11-12',
  priority: 'high',
  ...overrides,
});

const filters: CalendarFilters = {
  priority: 'all',
  folderId: 'all',
  columnId: 'all',
  hideCompleted: false,
};

describe('calendar task helpers', () => {
  it('preserves a task range duration when moved to another day', () => {
    expect(moveTaskScheduleToDate(task(), '2026-11-20')).toEqual({
      startDate: '2026-11-20',
      endDate: '2026-11-22',
    });
  });

  it('filters tasks by priority, folder section, and completion', () => {
    expect(
      filterCalendarTasks([task()], [folder], {
        ...filters,
        priority: 'high',
        columnId: 'planning',
        hideCompleted: true,
      })
    ).toHaveLength(1);
    expect(
      filterCalendarTasks([task({ completed: true })], [folder], {
        ...filters,
        hideCompleted: true,
      })
    ).toHaveLength(0);
  });

  it('marks only unfinished tasks with a past end date as overdue', () => {
    const today = new Date(2026, 10, 15);

    expect(isTaskOverdue(task(), today)).toBe(true);
    expect(isTaskOverdue(task({ completed: true }), today)).toBe(false);
  });
});
