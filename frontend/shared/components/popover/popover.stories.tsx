import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '../button/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from './popover';

const meta = {
  title: 'Shared/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          'Popover — составной всплывающий блок на базе Base UI с trigger, content, title и description.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Project details</PopoverTitle>
          <PopoverDescription>
            Review the current dashboard project information.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const Open: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>
            You have three unread messages.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};
