import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Skeleton } from './skeleton';

const meta = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  args: {
    className: 'h-20 w-80',
    mode: 'pulse',
  },
  argTypes: {
    mode: {
      control: 'select',
      description: 'Вариант анимации загрузки.',
      options: ['pulse', 'shimmer'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Skeleton — заполнитель содержимого во время загрузки с pulse- и shimmer-анимацией.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pulse: Story = {};

export const Shimmer: Story = {
  args: {
    mode: 'shimmer',
  },
};

export const CardLayout: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Skeleton className="h-32" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" mode="shimmer" />
    </div>
  ),
};
