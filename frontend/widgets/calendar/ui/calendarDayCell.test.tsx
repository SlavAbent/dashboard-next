import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';

jest.mock('@/shared/ui/index', () => {
  const React = jest.requireActual<typeof import('react')>('react');

  return {
    ScheduleMeta: jest.requireActual<
      typeof import('@/shared/components/scheduleMeta/scheduleMeta')
    >('@/shared/components/scheduleMeta/scheduleMeta').ScheduleMeta,
    DropdownMenu: ({ children }: React.PropsWithChildren) => children,
    DropdownMenuContent: ({ children }: React.PropsWithChildren) =>
      React.createElement('div', null, children),
    DropdownMenuItem: ({
      children,
      ...props
    }: React.ComponentProps<'button'>) =>
      React.createElement('button', props, children),
    DropdownMenuTrigger: ({
      children,
      ...props
    }: React.ComponentProps<'button'>) =>
      React.createElement('button', props, children),
  };
});

import { useCalendarStore } from '@/entities/calendar';
import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { CalendarDayCell } from '@/widgets/calendar/ui/calendarDayCell';

const task = (id: string, priority: Task['priority']): Task => ({
  id,
  text: `${priority} task`,
  tags: [],
  completed: false,
  taskFolderId: 'folder-1',
  order: 1,
  createdAt: '2026-11-15T00:00:00.000Z',
  startDate: '2026-11-15',
  endDate: '2026-11-15',
  priority,
});

const folder: TaskFolder = {
  id: 'folder-1',
  columnId: 'planning',
  title: 'Planning folder',
  order: 1,
  startDate: '2026-11-15',
  endDate: '2026-11-15',
  priority: 'medium',
};

const baseProps = {
  date: new Date(2026, 10, 15),
  currentMonth: new Date(2026, 10, 1),
  folders: [],
  onCreateTask: jest.fn(),
  onEditTask: jest.fn(),
  onEditFolder: jest.fn(),
  onMoveTaskToDate: jest.fn(),
  onMoveTaskToFolder: jest.fn(),
  onToggleTask: jest.fn(),
  onDeleteTask: jest.fn(),
  onQuickCreateTask: jest.fn(),
} satisfies Omit<ComponentProps<typeof CalendarDayCell>, 'tasks'>;

describe('CalendarDayCell', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCalendarStore.setState({
      defaultVisibleItems: 'tasks',
      visibleItemsByDate: {},
      expandedDates: {},
    });
  });

  it.each([
    ['critical', 'bg-[#800020]/15'],
    ['high', 'bg-red-500/15'],
    ['medium', 'bg-yellow-500/15'],
    ['low', 'bg-blue-500/15'],
    ['none', 'bg-gray-400/15'],
  ] as const)('highlights a %s task by its priority', (priority, className) => {
    render(
      <CalendarDayCell
        {...baseProps}
        tasks={[task(`task-${priority}`, priority)]}
      />
    );

    expect(
      screen.getByText(`${priority} task`).closest('[data-task-id]')
    ).toHaveClass(className);
  });

  it('does not render a separate priority dot', () => {
    const { container } = render(
      <CalendarDayCell {...baseProps} tasks={[task('task-low', 'low')]} />
    );

    expect(container.querySelector('.bg-blue-500')).not.toBeInTheDocument();
  });

  it.each(['high', 'critical'] as const)(
    'highlights a %s priority task with a border',
    (priority) => {
      render(
        <CalendarDayCell
          {...baseProps}
          tasks={[task(`task-${priority}`, priority)]}
        />
      );

      expect(
        screen.getByText(`${priority} task`).closest('[data-task-id]')
      ).toHaveClass('border-destructive', 'ring-1');
    }
  );

  it.each(['none', 'low', 'medium'] as const)(
    'does not highlight a %s priority task with a border',
    (priority) => {
      render(
        <CalendarDayCell
          {...baseProps}
          tasks={[task(`task-${priority}`, priority)]}
        />
      );

      expect(
        screen.getByText(`${priority} task`).closest('[data-task-id]')
      ).not.toHaveClass('border-destructive', 'ring-1');
    }
  );

  it('keeps the calendar cell background neutral', () => {
    render(
      <CalendarDayCell
        {...baseProps}
        tasks={[task('task-critical', 'critical')]}
      />
    );

    expect(screen.getByRole('gridcell')).toHaveClass('bg-background');
    expect(screen.getByRole('gridcell')).not.toHaveClass('bg-[#800020]/10');
  });

  it('shows the task execution date when it is set', () => {
    render(
      <CalendarDayCell {...baseProps} tasks={[task('task-low', 'low')]} />
    );

    expect(screen.getByText('15.11.2026')).toBeInTheDocument();
  });

  it('shows task and folder counts inside their buttons, including zero', () => {
    render(
      <CalendarDayCell
        {...baseProps}
        tasks={[task('task-low', 'low'), task('task-high', 'high')]}
      />
    );

    const taskButton = screen.getByRole('button', {
      name: 'Show tasks for 2026-11-15',
    });
    const folderButton = screen.getByRole('button', {
      name: 'Show folders for 2026-11-15',
    });

    expect(taskButton).toHaveTextContent('2');
    expect(taskButton).not.toHaveClass('opacity-40');
    expect(folderButton).toHaveTextContent('0');
    expect(folderButton).toHaveClass('opacity-40', 'hover:opacity-100');
  });

  it('switches between tasks and folders for the selected day', async () => {
    const user = userEvent.setup();
    const onEditFolder = jest.fn();

    render(
      <CalendarDayCell
        {...baseProps}
        tasks={[task('task-low', 'low')]}
        folders={[folder]}
        onEditFolder={onEditFolder}
      />
    );

    expect(screen.getByText('low task')).toBeInTheDocument();
    expect(screen.queryByText('Planning folder')).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Show folders for 2026-11-15' })
    );

    expect(screen.queryByText('low task')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^Planning folder/ }));
    expect(onEditFolder).toHaveBeenCalledWith('folder-1', 'planning');

    await user.click(
      screen.getByRole('button', { name: 'Show tasks for 2026-11-15' })
    );
    expect(screen.getByText('low task')).toBeInTheDocument();
  });

  it('starts creating a task in the selected folder and calendar day', async () => {
    const user = userEvent.setup();
    const onCreateTask = jest.fn();

    render(
      <CalendarDayCell
        {...baseProps}
        tasks={[]}
        folders={[folder]}
        onCreateTask={onCreateTask}
      />
    );

    await user.click(
      screen.getByRole('button', { name: 'Show folders for 2026-11-15' })
    );
    await user.click(
      screen.getByRole('button', { name: 'Add task to Planning folder' })
    );

    expect(onCreateTask).toHaveBeenCalledWith('2026-11-15', 'folder-1');
  });

  it('quickly creates a task for the selected day', async () => {
    const user = userEvent.setup();
    const onQuickCreateTask = jest.fn();

    render(
      <CalendarDayCell
        {...baseProps}
        tasks={[]}
        onQuickCreateTask={onQuickCreateTask}
      />
    );

    await user.click(
      screen.getByRole('button', { name: 'Quick add task for 2026-11-15' })
    );
    await user.type(
      screen.getByRole('textbox', { name: 'New task for 2026-11-15' }),
      'New calendar task{Enter}'
    );

    expect(onQuickCreateTask).toHaveBeenCalledWith(
      '2026-11-15',
      'New calendar task'
    );
  });

  it('collapses overflowing items and expands them on demand', async () => {
    const user = userEvent.setup();

    render(
      <CalendarDayCell
        {...baseProps}
        tasks={[
          task('task-low', 'low'),
          task('task-high', 'high'),
          task('task-medium', 'medium'),
        ]}
      />
    );

    expect(screen.queryByText('medium task')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show 1 more item' }));
    expect(screen.getByText('medium task')).toBeInTheDocument();
  });
});
