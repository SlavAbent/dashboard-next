import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import {
  groupFoldersByDate,
  groupTasksByDate,
} from '@/widgets/calendar/lib/groupTasksByDate';
import { MonthCalendarGrid } from '@/widgets/calendar/ui/monthCalendarGrid';

const folders: TaskFolder[] = [
  {
    id: 'folder-planning',
    columnId: 'planning',
    title: 'Release planning',
    order: 1,
    startDate: '2026-11-09',
    endDate: '2026-11-13',
    priority: 'medium',
  },
  {
    id: 'folder-content',
    columnId: 'upcoming',
    title: 'Content',
    order: 2,
    startDate: null,
    endDate: null,
    priority: 'none',
  },
];

const tasks: Task[] = [
  {
    id: 'task-release',
    text: 'Prepare release notes',
    tags: [],
    completed: false,
    taskFolderId: 'folder-planning',
    order: 1,
    createdAt: '2026-11-09T00:00:00.000Z',
    startDate: '2026-11-09',
    endDate: '2026-11-11',
    priority: 'high',
  },
  {
    id: 'task-review',
    text: 'Review calendar stories',
    tags: [],
    completed: true,
    taskFolderId: 'folder-planning',
    order: 2,
    createdAt: '2026-11-12T00:00:00.000Z',
    startDate: '2026-11-12',
    endDate: '2026-11-12',
    priority: 'low',
  },
  {
    id: 'task-content',
    text: 'Publish documentation',
    tags: [],
    completed: false,
    taskFolderId: 'folder-content',
    order: 1,
    createdAt: '2026-11-18T00:00:00.000Z',
    startDate: '2026-11-18',
    endDate: '2026-11-20',
    priority: 'critical',
  },
];

const tasksByDate = groupTasksByDate(tasks);
const foldersByDate = groupFoldersByDate(folders, tasksByDate);

const meta = {
  title: 'Calendar/MonthGrid',
  component: MonthCalendarGrid,
  args: {
    currentMonth: new Date(2026, 10, 1),
    viewMode: 'month',
    tasksByDate,
    foldersByDate,
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
      <div className="min-w-[56rem] overflow-auto p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['tasksByDate', 'foldersByDate'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MonthCalendarGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTasksAndFolders: Story = {};

export const EmptyMonth: Story = {
  args: {
    tasksByDate: new Map(),
    foldersByDate: new Map(),
  },
};

export const WeekView: Story = {
  args: {
    viewMode: 'week',
    currentMonth: new Date(2026, 10, 9),
  },
};

export const DayView: Story = {
  args: {
    viewMode: 'day',
    currentMonth: new Date(2026, 10, 9),
  },
};
