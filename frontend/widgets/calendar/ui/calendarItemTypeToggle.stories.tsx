import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type ComponentProps, useState } from 'react';

import type { CalendarItemType } from '@/entities/calendar';
import { CalendarItemTypeToggle } from '@/widgets/calendar/ui/calendarItemTypeToggle';

const InteractiveToggle = (
  args: ComponentProps<typeof CalendarItemTypeToggle>
) => {
  const [activeItems, setActiveItems] = useState<CalendarItemType>(
    args.activeItems
  );

  return (
    <div className="flex w-48">
      <CalendarItemTypeToggle
        {...args}
        activeItems={activeItems}
        onChange={setActiveItems}
      />
    </div>
  );
};

const meta = {
  title: 'Calendar/ItemTypeToggle',
  component: CalendarItemTypeToggle,
  args: {
    dateKey: '2026-11-15',
    activeItems: 'tasks',
    folderCount: 2,
    taskCount: 5,
    onChange: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarItemTypeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => <InteractiveToggle {...args} />,
};

export const Empty: Story = {
  args: {
    folderCount: 0,
    taskCount: 0,
  },
};

export const OnlyTasks: Story = {
  args: {
    folderCount: 0,
    taskCount: 5,
  },
};
