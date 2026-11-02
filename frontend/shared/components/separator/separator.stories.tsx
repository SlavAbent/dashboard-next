import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Index as Separator } from './index';

const meta = {
  title: 'Shared/Separator',
  component: Separator,
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: 'select',
      description: 'Направление разделителя.',
      options: ['horizontal', 'vertical'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Separator — визуальный разделитель содержимого на базе Base UI. Поддерживает горизонтальную и вертикальную ориентации и использует цвет границы дизайн-системы.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-3">
      <span>Account</span>
      <Separator {...args} />
      <span className="text-muted-foreground text-sm">Profile settings</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальный разделитель между блоками содержимого.',
      },
    },
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-6 items-center gap-3">
      <span>Overview</span>
      <Separator {...args} />
      <span>Activity</span>
      <Separator {...args} />
      <span>Settings</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальные разделители между элементами одной строки.',
      },
    },
  },
};
