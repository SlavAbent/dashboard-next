import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CalendarToolbar } from '@/widgets/calendar/ui/calendarToolbar';

const meta = {
  title: 'Calendar/Toolbar',
  component: CalendarToolbar,
  args: {
    columns: [
      { id: 'planning', title: 'Planning', order: 1, color: '#64748b' },
      { id: 'in-progress', title: 'In progress', order: 2, color: '#3b82f6' },
    ],
    folders: [
      {
        id: 'folder-release',
        columnId: 'planning',
        title: 'Release',
        order: 1,
        startDate: '2026-11-15',
        endDate: '2026-11-20',
        priority: 'high',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
