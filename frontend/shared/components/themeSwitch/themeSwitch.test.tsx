import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useThemeStore } from '@/shared/store/themeStore';

import { ThemeSwitch } from './themeSwitch';

describe('ThemeSwitch', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' });
  });

  afterEach(() => {
    useThemeStore.setState({ theme: 'device' });
  });

  it('cycles through light, dark and device themes', async () => {
    const user = userEvent.setup();

    render(<ThemeSwitch />);
    const button = screen.getByRole('button', { name: 'Переключить тему' });

    await user.click(button);
    expect(useThemeStore.getState().theme).toBe('dark');

    await user.click(button);
    expect(useThemeStore.getState().theme).toBe('device');

    await user.click(button);
    expect(useThemeStore.getState().theme).toBe('light');
  });
});
