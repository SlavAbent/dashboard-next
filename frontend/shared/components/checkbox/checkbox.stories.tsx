import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Shared/Checkbox',
  component: Checkbox,
  args: {
    'aria-label': 'Select item',
  },
  argTypes: {
    defaultChecked: {
      control: 'boolean',
      description: 'Начальное отмеченное состояние компонента.',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие с компонентом.',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox — доступный переключатель выбора на базе Base UI со стилями shadcn/ui и токенами Tailwind CSS 4. Поддерживает состояния checked, disabled, invalid и клавиатурный фокус.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Базовое неотмеченное состояние.',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отмеченное состояние с видимым индикатором выбора.',
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
          'Недоступное состояние, которое не принимает действия пользователя.',
      },
    },
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Состояние ошибки, переданное через aria-invalid.',
      },
    },
  },
};
