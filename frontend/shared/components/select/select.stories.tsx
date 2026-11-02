import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { AppSelect } from './appSelect';

const options = [
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'progress' },
  { label: 'Completed', value: 'completed' },
];

const SelectExample = ({ initialValue }: { initialValue?: string }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="w-64">
      <AppSelect
        value={value}
        onChange={setValue}
        options={options}
        placeholder="Select status"
      />
    </div>
  );
};

const meta = {
  title: 'Shared/Select',
  component: AppSelect,
  args: {
    onChange: () => undefined,
    options,
    placeholder: 'Select status',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Select — управляемый выбор значения на базе Base UI. AppSelect связывает trigger, value, popup и items в единый интерфейс.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: () => <SelectExample />,
};

export const Selected: Story = {
  render: () => <SelectExample initialValue="progress" />,
};
