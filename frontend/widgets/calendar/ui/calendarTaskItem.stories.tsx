import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { Task } from '@/entities/task';
import { CalendarTaskItem } from '@/widgets/calendar/ui/calendarTaskItem';

const task: Task = {
  id: 'task-1',
  text: 'Prepare calendar release',
  tags: [],
  completed: false,
  taskFolderId: 'folder-1',
  order: 1,
  createdAt: '2026-11-15T00:00:00.000Z',
  startDate: '2026-11-15',
  endDate: '2026-11-17',
  priority: 'high',
};

const meta = {
  title: 'Calendar/TaskItem',
  component: CalendarTaskItem,
  args: {
    task,
    onEdit: () => undefined,
    onToggle: () => undefined,
    onDelete: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarTaskItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Completed: Story = {
  args: {
    task: {
      ...task,
      id: 'task-completed',
      completed: true,
      priority: 'low',
    },
  },
};
