import { expect, test } from '@playwright/test';

test.describe('Button stories', () => {
  test('renders the default button and supports keyboard focus', async ({
    page,
  }) => {
    await page.goto('/iframe.html?id=shared-button--default&viewMode=story');

    const button = page.getByRole('button', { name: 'Button' });
    await expect(button).toBeVisible();
    await button.focus();
    await expect(button).toBeFocused();
  });

  test('keeps the disabled state non-interactive', async ({ page }) => {
    await page.goto('/iframe.html?id=shared-button--disabled&viewMode=story');

    await expect(page.getByRole('button', { name: 'Button' })).toBeDisabled();
  });

  test('applies extra-small and icon dimensions', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=shared-button--extra-small&viewMode=story'
    );

    await expect(page.getByRole('button', { name: 'Small button' })).toHaveCSS(
      'height',
      '24px'
    );

    await page.goto('/iframe.html?id=shared-button--icon&viewMode=story');

    const iconButton = page.getByRole('button', { name: 'Add item' });
    await expect(iconButton).toHaveCSS('height', '32px');
    await expect(iconButton).toHaveCSS('width', '32px');
  });
});
