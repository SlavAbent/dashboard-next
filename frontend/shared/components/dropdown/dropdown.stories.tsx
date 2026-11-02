import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Dropdown } from './index';

const options = [
  { id: 'profile', title: 'Profile' },
  { id: 'settings', title: 'Settings' },
  { id: 'separator', separator: true },
  { id: 'remove', style: 'destructive' as const, title: 'Remove account' },
];

const DropdownExample = () => {
  const [selected, setSelected] = useState('None');
  const interactiveOptions = options.map((option) =>
    option.title
      ? { ...option, onClick: () => setSelected(option.title) }
      : option
  );

  return (
    <div className="flex flex-col items-start gap-3">
      <Dropdown options={interactiveOptions} text="Alex Morgan" />
      <output aria-live="polite">Selected: {selected}</output>
    </div>
  );
};

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

export const TextTrigger: Story = {
  render: () => <DropdownExample />,
};

export const AvatarTrigger: Story = {
  args: {
    isAvatar: true,
  },
};
