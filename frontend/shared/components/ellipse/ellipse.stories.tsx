import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Ellipse } from './index';

const meta = {
  title: 'Shared/Ellipse',
  component: Ellipse,
  args: {
    color: '#2563eb',
    size: 8,
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'Цвет индикатора.',
    },
    size: {
      control: 'select',
      description: 'Размер индикатора в пикселях.',
      options: [4, 8, 16, 32],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Ellipse — круглый цветовой индикатор с четырьмя поддерживаемыми размерами.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Ellipse>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Ellipse color="#2563eb" size={4} />
      <Ellipse color="#16a34a" size={8} />
      <Ellipse color="#ca8a04" size={16} />
      <Ellipse color="#dc2626" size={32} />
    </div>
  ),
};
