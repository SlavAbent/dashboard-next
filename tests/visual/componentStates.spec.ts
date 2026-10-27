import { expect, test } from '@playwright/test';

type VisualState = {
  id: string;
  name: string;
  readySelector: string;
};

const visualStates: VisualState[] = [
  {
    id: 'shared-button--default',
    name: 'button-default.png',
    readySelector: '[data-slot="button"]',
  },
  {
    id: 'shared-button--outline',
    name: 'button-outline.png',
    readySelector: '[data-slot="button"]',
  },
  {
    id: 'shared-button--destructive',
    name: 'button-destructive.png',
    readySelector: '[data-slot="button"]',
  },
  {
    id: 'shared-button--disabled',
    name: 'button-disabled.png',
    readySelector: '[data-slot="button"]',
  },
  {
    id: 'shared-button--extra-small',
    name: 'button-extra-small.png',
    readySelector: '[data-slot="button"]',
  },
  {
    id: 'shared-button--icon',
    name: 'button-icon.png',
    readySelector: '[data-slot="button"]',
  },
  {
    id: 'shared-button--variants',
    name: 'button-variants.png',
    readySelector: '[data-slot="button"]',
  },
  {
    id: 'shared-button--sizes',
    name: 'button-sizes.png',
    readySelector: '[data-slot="button"]',
  },
  {
    id: 'shared-avatar--fallback',
    name: 'avatar-fallback.png',
    readySelector: '[data-slot="avatar-fallback"]',
  },
  {
    id: 'shared-avatar--with-image',
    name: 'avatar-with-image.png',
    readySelector: '[data-slot="avatar-image"]',
  },
  {
    id: 'shared-avatar--sizes',
    name: 'avatar-sizes.png',
    readySelector: '[data-slot="avatar"]',
  },
];

test.describe('Storybook component screenshots', () => {
  for (const state of visualStates) {
    test(state.id, async ({ page }) => {
      await page.goto(`/iframe.html?id=${state.id}&viewMode=story`);

      await expect(page.locator(state.readySelector).first()).toBeVisible();
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        state.name
      );
    });
  }
});
