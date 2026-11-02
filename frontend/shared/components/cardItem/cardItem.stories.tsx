import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { CardItem } from './cardItem';

const meta = {
  title: 'Shared/CardItem',
  component: CardItem,
  args: {
    children: 'Dashboard item',
  },
  parameters: {
    docs: {
      description: {
        component:
          'CardItem — компактный интерактивный контейнер для строки внутри карточки или списка.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CardItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  render: () => (
    <CardItem className="max-w-xs justify-between border">
      <span>Project status</span>
      <span className="text-muted-foreground text-sm">Active</span>
    </CardItem>
  ),
};
