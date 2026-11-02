import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ThemeSwitch } from './themeSwitch';

const meta = {
  title: 'Shared/ThemeSwitch',
  component: ThemeSwitch,
  parameters: {
    docs: {
      description: {
        component:
          'ThemeSwitch — кнопка циклического переключения тем light, dark и device через Zustand store.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
