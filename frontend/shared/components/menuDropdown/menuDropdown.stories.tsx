import { FunnelIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { MenuDropdown } from './index';

const options = [
  { id: 1, title: 'All tasks' },
  { id: 2, title: 'Active' },
  { id: 3, title: 'Completed' },
];

const MenuDropdownExample = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('None');

  return (
    <div className="flex flex-col items-start gap-3">
      <MenuDropdown
        label="Filter"
        open={open}
        icon={<FunnelIcon aria-hidden="true" />}
        onOpenChange={setOpen}
        options={options}
        onSelect={(option) => setSelected(option.title)}
      />
      <output aria-live="polite">Selected: {selected}</output>
    </div>
  );
};

const meta = {
  title: 'Shared/MenuDropdown',
  component: MenuDropdown,
  args: {
    icon: <FunnelIcon aria-hidden="true" />,
    label: 'Filter',
    onOpenChange: () => undefined,
    open: false,
    options,
  },
  parameters: {
    docs: {
      description: {
        component:
          'MenuDropdown — управляемое меню выбора с текстовой меткой, иконкой и списком опций.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MenuDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MenuDropdownExample />,
};
