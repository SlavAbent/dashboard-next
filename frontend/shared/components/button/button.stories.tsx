import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Визуальный стиль и семантический акцент кнопки.',
      options: [
        'default',
        'outline',
        'secondary',
        'ghost',
        'destructive',
        'link',
      ],
    },
    size: {
      control: 'select',
      description: 'Высота, отступы и размеры иконки внутри кнопки.',
      options: [
        'default',
        'xs',
        'sm',
        'lg',
        'icon',
        'icon-xs',
        'icon-sm',
        'icon-lg',
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button — доступная кнопка на базе Base UI со стилями shadcn/ui и токенами Tailwind CSS 4. Поддерживает шесть визуальных вариантов, текстовые и квадратные размеры, disabled-состояние и клавиатурный фокус.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Основное состояние для нейтрального действия. По умолчанию используется размер 32 px.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Контурное состояние для второстепенного действия на фоне страницы.',
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Деструктивное состояние для удаления или другого необратимого действия.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Недоступное состояние: кнопка видима, но не принимает фокус и действия пользователя.',
      },
    },
  },
};

export const ExtraSmall: Story = {
  args: {
    children: 'Small button',
    size: 'xs',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Компактное текстовое состояние высотой 24 px для плотных интерфейсов.',
      },
    },
  },
};

export const Icon: Story = {
  args: {
    'aria-label': 'Add item',
    children: '+',
    size: 'icon',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Квадратное состояние 32×32 px для одной иконки. Требует доступного имени через aria-label.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-3">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все визуальные варианты кнопки.',
      },
      source: {
        code: `
          <div className="flex max-w-sm flex-col gap-3">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        `.trim(),
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-xs" aria-label="Extra-small icon button">
        +
      </Button>
      <Button size="icon-sm" aria-label="Small icon button">
        +
      </Button>
      <Button size="icon" aria-label="Default icon button">
        +
      </Button>
      <Button size="icon-lg" aria-label="Large icon button">
        +
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Все размеры: четыре текстовых и четыре квадратных состояния для иконок.',
      },
      source: {
        code: `
          <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon-xs" aria-label="Extra-small icon button">
                +
              </Button>
              <Button size="icon-sm" aria-label="Small icon button">
                +
              </Button>
              <Button size="icon" aria-label="Default icon button">
                +
              </Button>
              <Button size="icon-lg" aria-label="Large icon button">
                +
              </Button>
            </div>
        `.trim(),
      },
    },
  },
};
