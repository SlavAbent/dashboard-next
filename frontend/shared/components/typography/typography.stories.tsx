import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TypographyH1 } from './typographyH1';
import { TypographyH2 } from './typographyH2';
import { TypographyH3 } from './typographyH3';
import { TypographyP } from './typographyP';
import { TypographySmall } from './typographySmall';

const meta = {
  title: 'Shared/Typography',
  component: TypographyP,
  args: {
    text: 'Typography example',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Typography — набор текстовых компонентов H1, H2, H3, P и Small с типографическими стилями проекта.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TypographyP>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  render: () => <TypographyH1 text="Dashboard heading" />,
};

export const Heading2: Story = {
  render: () => <TypographyH2 text="Section heading" />,
};

export const Heading3: Story = {
  render: () => <TypographyH3 text="Card heading" />,
};

export const Paragraph: Story = {
  render: () => (
    <TypographyP text="Dashboard Next combines project data, time and personnel management." />
  ),
};

export const Small: Story = {
  render: () => <TypographySmall text="Supporting information" />,
};

export const Overview: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      <TypographyH1 text="Dashboard heading" />
      <TypographyH2 text="Section heading" />
      <TypographyH3 text="Card heading" />
      <TypographyP text="Dashboard Next combines project data, time and personnel management." />
      <TypographySmall text="Supporting information" />
    </div>
  ),
};
