import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Notification } from './notification';

const meta = {
  title: 'Shared/Notification',
  component: Notification,
  args: {
    variant: 'success',
    message: 'Task added',
    onClose: () => undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Notification displays a status icon, message and accessible close button. Toast lifecycle is managed by the application.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'Failed to update task',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'The folder was updated successfully and all related tasks remain available.',
  },
};

export const MobileWidth: Story = {
  decorators: [
    (Story) => (
      <div className="w-[375px] max-w-full">
        <Story />
      </div>
    ),
  ],
};

export const CloseInteraction: Story = {
  render: function CloseInteractionStory() {
    const [isVisible, setIsVisible] = useState(true);

    return isVisible ? (
      <Notification
        variant="success"
        message="Folder moved"
        onClose={() => setIsVisible(false)}
      />
    ) : (
      <p role="status" className="text-muted-foreground text-sm">
        Notification closed
      </p>
    );
  },
};
