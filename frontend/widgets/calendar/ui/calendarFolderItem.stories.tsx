import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { TaskFolder } from '@/entities/folder';
import { CalendarFolderItem } from '@/widgets/calendar/ui/calendarFolderItem';

const folder: TaskFolder = {
  id: 'folder-1',
  columnId: 'planning',
  title: 'Release planning',
  order: 1,
  startDate: '2026-11-15',
  endDate: '2026-11-20',
  priority: 'medium',
};

const meta = {
  title: 'Calendar/FolderItem',
  component: CalendarFolderItem,
  args: {
    folder,
    onEdit: () => undefined,
    onCreateTask: () => undefined,
    onMoveTask: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarFolderItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDates: Story = {
  args: {
    folder: {
      ...folder,
      id: 'folder-without-dates',
      startDate: null,
      endDate: null,
      priority: 'none',
    },
  },
};
