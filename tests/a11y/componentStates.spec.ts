import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const stories = [
  { id: 'shared-button--default', readySelector: '#storybook-root button' },
  { id: 'shared-button--outline', readySelector: '#storybook-root button' },
  { id: 'shared-button--destructive', readySelector: '#storybook-root button' },
  { id: 'shared-button--disabled', readySelector: '#storybook-root button' },
  { id: 'shared-button--extra-small', readySelector: '#storybook-root button' },
  { id: 'shared-button--icon', readySelector: '#storybook-root button' },
  { id: 'shared-button--variants', readySelector: '#storybook-root button' },
  { id: 'shared-button--sizes', readySelector: '#storybook-root button' },
  {
    id: 'shared-avatar--fallback',
    readySelector: '#storybook-root [data-slot="avatar"]',
  },
  { id: 'shared-avatar--with-image', readySelector: '#storybook-root img' },
  {
    id: 'shared-avatar--sizes',
    readySelector: '#storybook-root [data-slot="avatar"]',
  },
];

test.describe('Storybook component accessibility', () => {
  for (const story of stories) {
    test(`${story.id} has no WCAG A/AA violations`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);

      await expect(page.locator(story.readySelector).first()).toBeVisible();

      const results = await new AxeBuilder({ page })
        .include('#storybook-root')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
