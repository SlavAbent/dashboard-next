import { expect, test } from '@playwright/test';

test.describe('shared component interactions', () => {
  test('toggles Checkbox and Switch through user clicks', async ({ page }) => {
    await page.goto('/iframe.html?id=shared-checkbox--default&viewMode=story');
    const checkbox = page.getByRole('checkbox', { name: 'Select item' });

    await checkbox.click();
    await expect(checkbox).toBeChecked();

    await page.goto('/iframe.html?id=shared-switch--default&viewMode=story');
    const toggle = page.getByRole('switch', {
      name: 'Enable notifications',
    });

    await toggle.click();
    await expect(toggle).toBeChecked();
  });

  test('opens and closes Popover', async ({ page }) => {
    await page.goto('/iframe.html?id=shared-popover--default&viewMode=story');
    const trigger = page.getByRole('button', { name: 'Open popover' });

    await trigger.click();
    await expect(page.getByText('Project details')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByText('Project details')).toBeHidden();
  });

  test('selects an AppSelect option', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=shared-select--placeholder&viewMode=story'
    );

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Completed' }).click();

    await expect(page.getByRole('combobox')).toContainText('Completed');
  });

  test('opens MenuDropdown and selects an option', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=shared-menudropdown--default&viewMode=story'
    );

    await page.getByRole('button', { name: 'Filter' }).click();
    const option = page.getByRole('menuitem', { name: 'Active' });
    await expect(option).toBeVisible();
    await option.click();
    await expect(page.getByText('Selected: Active')).toBeVisible();
  });

  test('opens Dropdown and invokes an item action', async ({ page }) => {
    await page.goto(
      '/iframe.html?id=shared-dropdown--text-trigger&viewMode=story'
    );

    await page.getByRole('button', { name: 'Alex Morgan' }).click();
    const item = page.getByRole('menuitem', { name: 'Profile' });
    await expect(item).toBeVisible();
    await item.click();
    await expect(page.getByText('Selected: Profile')).toBeVisible();
  });
});
