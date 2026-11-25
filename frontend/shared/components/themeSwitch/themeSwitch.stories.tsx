import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ThemeSwitch } from './themeSwitch';

const meta = {
  title: 'Shared/ThemeSwitch',
  component: ThemeSwitch,
  parameters: {
    docs: {
      description: {
        component:
          'ThemeSwitch — меню профиля с режимом оформления и анимированным свитчером цветовых палитр.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: 'Анна Смирнова',
    },
  },
};
