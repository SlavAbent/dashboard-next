import { MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './input';

const meta = {
  title: 'Shared/Input',
  component: Input,
  args: {
    'aria-label': 'Example input',
    placeholder: 'Enter value',
  },
  argTypes: {
    classNameContainer: {
      control: 'text',
      description: 'Дополнительные классы контейнера поля.',
    },
    leftIcon: {
      control: false,
      description: 'Иконка в левой части поля.',
    },
    rightIcon: {
      control: false,
      description: 'Иконка или действие в правой части поля.',
    },
    type: {
      control: 'select',
      description: 'Нативный тип поля ввода.',
      options: ['text', 'email', 'password', 'search'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Input — текстовое поле на базе Base UI со стилями проекта. Поддерживает нативные input-атрибуты, левую и правую иконки, disabled и invalid состояния.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Базовое пустое поле с placeholder.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Dashboard',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле с начальным текстовым значением.',
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    leftIcon: <MagnifyingGlassIcon aria-hidden="true" />,
    rightIcon: <XIcon aria-hidden="true" />,
    type: 'search',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле поиска с декоративными иконками слева и справа.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Unavailable value',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Недоступное поле, которое нельзя изменить.',
      },
    },
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    defaultValue: 'Incorrect value',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле с ошибкой, обозначенной через aria-invalid.',
      },
    },
  },
};
