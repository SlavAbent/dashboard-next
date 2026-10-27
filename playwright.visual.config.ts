import { defineConfig } from '@playwright/test';

import baseConfig from './playwright.config';

export default defineConfig(baseConfig, {
  testDir: './tests/visual',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.001,
      scale: 'css',
    },
  },
  use: {
    viewport: {
      width: 1280,
      height: 720,
    },
  },
});
