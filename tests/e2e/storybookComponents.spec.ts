import { expect, test } from '@playwright/test';

test('uses Button and Avatar through the Storybook application', async ({
  page,
}) => {
  await page.goto('/?path=/story/shared-button--default');

  const preview = page.frameLocator('#storybook-preview-iframe');
  const button = preview.getByRole('button', { name: 'Button' });

  await expect(button).toBeVisible();
  await button.focus();
  await expect(button).toBeFocused();

  await page.goto('/?path=/story/shared-avatar--with-image');

  const avatar = page
    .frameLocator('#storybook-preview-iframe')
    .getByLabel('Alex Morgan');

  await expect(avatar).toBeVisible();
  await expect(
    avatar.getByRole('img', { name: 'Profile of Alex' })
  ).toBeVisible();
});
