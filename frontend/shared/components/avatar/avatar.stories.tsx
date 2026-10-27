import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const avatarImage =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#dbeafe" />
      <circle cx="48" cy="38" r="18" fill="#2563eb" />
      <path d="M18 92c3-22 14-32 30-32s27 10 30 32" fill="#2563eb" />
    </svg>
  `);

const meta = {
  title: 'Shared/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      description: 'Размер аватара: 24, 32 или 40 px.',
      options: ['sm', 'default', 'lg'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Avatar — изображение пользователя на базе Base UI со стилями shadcn/ui и Tailwind CSS 4. Показывает доступное изображение или текстовый fallback и поддерживает три размера.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args} aria-label="Alex Morgan">
      <AvatarFallback>AN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Fallback-состояние без доступного изображения. Инициалы остаются видимыми и читаемыми.',
      },
    },
  },
};

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args} aria-label="Alex Morgan">
      <>
        <AvatarImage src={avatarImage} alt="Profile of Alex" />
        <AvatarFallback>AN</AvatarFallback>
      </>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Успешно загруженное изображение с осмысленным alt-текстом. Fallback используется при ошибке загрузки.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" aria-label="Small avatar">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar aria-label="Default avatar">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg" aria-label="Large avatar">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Все размеры Avatar: small — 24 px, default — 32 px, large — 40 px.',
      },
      source: {
        code: `
          <div className="flex items-center gap-4">
            <Avatar size="sm" aria-label="Small avatar">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar aria-label="Default avatar">
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar size="lg" aria-label="Large avatar">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>
        `.trim(),
      },
    },
  },
};
