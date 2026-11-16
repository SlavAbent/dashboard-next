import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CalendarQuickCreate } from '@/widgets/calendar/ui/calendarQuickCreate';

const meta = {
  title: 'Calendar/QuickCreate',
  component: CalendarQuickCreate,
  args: {
    dateKey: '2026-11-15',
    onCreate: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="flex w-64 justify-end p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarQuickCreate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
