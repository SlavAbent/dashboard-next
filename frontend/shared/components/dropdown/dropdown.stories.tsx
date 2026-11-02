import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Dropdown } from './index';

const options = [
  { id: 'profile', title: 'Profile' },
  { id: 'settings', title: 'Settings' },
  { id: 'separator', separator: true },
  { id: 'remove', style: 'destructive' as const, title: 'Remove account' },
];

const meta = {
  title: 'Shared/Dropdown',
  component: Dropdown,
  args: {
    options,
    text: 'Alex Morgan',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Dropdown — меню действий на базе Base UI. Триггер может отображаться как текст или как пользовательский блок с Avatar.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextTrigger: Story = {};

export const AvatarTrigger: Story = {
  args: {
    isAvatar: true,
  },
};
