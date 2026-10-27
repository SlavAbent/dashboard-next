import { expect, test } from '@playwright/test';

test.describe('Avatar stories', () => {
  test('shows fallback text', async ({ page }) => {
    await page.goto('/iframe.html?id=shared-avatar--fallback&viewMode=story');

    await expect(page.getByText('AN', { exact: true })).toBeVisible();
  });

  test('renders all supported sizes', async ({ page }) => {
    await page.goto('/iframe.html?id=shared-avatar--sizes&viewMode=story');

    await expect(page.getByLabel('Small avatar')).toHaveAttribute(
      'data-size',
      'sm'
    );
    await expect(page.getByLabel('Default avatar')).toHaveAttribute(
      'data-size',
      'default'
    );
    await expect(page.getByLabel('Large avatar')).toHaveAttribute(
      'data-size',
      'lg'
    );
  });
});
