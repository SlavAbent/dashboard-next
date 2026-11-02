import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Switch } from './switch';

const meta = {
  title: 'Shared/Switch',
  component: Switch,
  args: {
    'aria-label': 'Enable notifications',
  },
  argTypes: {
    defaultChecked: {
      control: 'boolean',
      description: 'Начальное включённое состояние.',
    },
    size: {
      control: 'select',
      description: 'Размер переключателя.',
      options: ['sm', 'default'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Switch — доступный двухпозиционный переключатель на базе Base UI с двумя размерами.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
};
