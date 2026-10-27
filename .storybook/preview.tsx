import '../frontend/shared/styles/global.css';

import type { Decorator, Preview } from '@storybook/nextjs-vite';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as 'light' | 'dark';

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  return (
    <div className="bg-background text-foreground min-h-90 p-8">
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Theme used to render the component',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
  },
};

export default preview;
