import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Card } from './index';

const meta = {
  title: 'Shared/Card',
  component: Card,
  args: {
    children: 'Card content',
    className: 'max-w-sm',
  },
  argTypes: {
    children: {
      control: false,
      description:
        'Содержимое карточки: текст или произвольные React-элементы.',
    },
    className: {
      control: 'text',
      description:
        'Дополнительные классы Tailwind CSS 4 для размера, фона и компоновки.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Card — семантический контейнер для связанного содержимого. Компонент использует нижнюю границу и внутренние отступы проекта, а внешний вид и компоновка расширяются через className.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Базовое состояние с нижней границей и стандартными внутренними отступами.',
      },
    },
  },
};

export const Dashboard: Story = {
  render: () => (
    <Card className="bg-card text-card-foreground flex max-w-sm flex-col gap-3 rounded-2xl border">
      <h3 className="text-2xl font-semibold tracking-tight">Project status</h3>
      <p className="text-muted-foreground text-sm">
        All systems are operational. The next review is scheduled for Friday.
      </p>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Карточка дашборда с заголовком, описанием, фоном и скруглённой общей границей.',
      },
      source: {
        code: `
          <Card className="bg-card text-card-foreground flex max-w-sm flex-col gap-3 rounded-2xl border">
            <h3 className="text-2xl font-semibold tracking-tight">Project status</h3>
            <p className="text-muted-foreground text-sm">
              All systems are operational. The next review is scheduled for Friday.
            </p>
          </Card>
        `.trim(),
      },
    },
  },
};

export const Navigation: Story = {
  render: () => (
    <Card className="bg-sidebar flex w-48 flex-col gap-2">
      <a className="interactive-hover rounded-sm px-2 py-1" href="#overview">
        Overview
      </a>
      <a className="interactive-hover rounded-sm px-2 py-1" href="#activity">
        Activity
      </a>
      <a className="interactive-hover rounded-sm px-2 py-1" href="#settings">
        Settings
      </a>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Навигационный вариант, соответствующий использованию Card в боковой панели приложения.',
      },
      source: {
        code: `
          <Card className="bg-sidebar flex w-48 flex-col gap-2">
            <a className="interactive-hover rounded-sm px-2 py-1" href="#overview">
              Overview
            </a>
            <a className="interactive-hover rounded-sm px-2 py-1" href="#activity">
              Activity
            </a>
            <a className="interactive-hover rounded-sm px-2 py-1" href="#settings">
              Settings
            </a>
          </Card>
        `.trim(),
      },
    },
  },
};
