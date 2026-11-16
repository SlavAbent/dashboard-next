import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import { CalendarDayCell } from '@/widgets/calendar/ui/calendarDayCell';

const tasks: Task[] = [
  {
    id: 'task-1',
    text: 'Calendar task',
    tags: [],
    completed: false,
    taskFolderId: 'folder-1',
    order: 1,
    createdAt: '2026-11-15T00:00:00.000Z',
    startDate: '2026-11-15',
    endDate: '2026-11-15',
    priority: 'critical',
  },
];

const folders: TaskFolder[] = [
  {
    id: 'folder-1',
    columnId: 'planning',
    title: 'Planning folder',
    order: 1,
    startDate: null,
    endDate: null,
    priority: 'medium',
  },
];

const meta = {
  title: 'Calendar/DayCell',
  component: CalendarDayCell,
  args: {
    date: new Date(2026, 10, 15),
    currentMonth: new Date(2026, 10, 1),
    tasks,
    folders,
    onCreateTask: () => undefined,
    onEditTask: () => undefined,
    onEditFolder: () => undefined,
    onMoveTaskToDate: () => undefined,
    onMoveTaskToFolder: () => undefined,
    onToggleTask: () => undefined,
    onDeleteTask: () => undefined,
    onQuickCreateTask: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="h-36 w-80 border-t border-l">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarDayCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    date: new Date(2026, 10, 16),
    tasks: [],
    folders: [],
  },
};
