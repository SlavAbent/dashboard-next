import path from 'node:path';

import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../frontend/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  viteFinal: async (viteConfig) => {
    viteConfig.css = {
      ...viteConfig.css,
      postcss: path.resolve(process.cwd(), 'frontend'),
    };

    return viteConfig;
  },
};

export default config;
