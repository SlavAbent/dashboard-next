import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { GoogleSignInButton } from './googleSignInButton';

const meta = {
  title: 'Shared/GoogleSignInButton',
  component: GoogleSignInButton,
  args: {
    'aria-label': 'Sign in with Google',
    type: 'button',
  },
  parameters: {
    docs: {
      description: {
        component:
          'GoogleSignInButton — брендированная кнопка входа через Google с компактным и текстовым представлением.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GoogleSignInButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconOnly: Story = {};

export const WithText: Story = {
  args: {
    children: 'Sign in with Google',
    className: 'w-auto gap-2 px-4',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
