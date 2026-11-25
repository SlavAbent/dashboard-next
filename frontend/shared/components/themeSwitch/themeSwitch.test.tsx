import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useThemeStore } from '@/shared/store/themeStore';

import { ThemeSwitch } from './themeSwitch';

describe('ThemeSwitch', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' });
  });

  afterEach(() => {
    act(() => useThemeStore.setState({ theme: 'device' }));
  });

  it('opens the theme menu and applies the selected theme', async () => {
    const user = userEvent.setup();

    render(
      <ThemeSwitch user={{ name: 'Сергей Абент' }} onLogout={jest.fn()} />
    );
    const button = screen.getByRole('button', {
      name: 'Открыть меню пользователя и тем',
    });

    expect(screen.getByText('С.Абент')).toHaveClass('max-w-0', 'opacity-0');

    button.focus();
    await user.keyboard('{ArrowDown}');
    expect(await screen.findByText('Сергей Абент')).toHaveClass('truncate');
    expect(screen.getByRole('button', { name: 'Светлая' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Тёмная' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Системная' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Жёлтая' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Зелёная' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Красная' }));
    expect(useThemeStore.getState().theme).toBe('red');
  });

  it('shows the user name in the trigger only when requested', () => {
    const { rerender } = render(
      <ThemeSwitch user={{ name: 'Сергей Абент' }} />
    );

    expect(screen.getByText('С.Абент')).toHaveClass('max-w-0');

    rerender(<ThemeSwitch user={{ name: 'Сергей Абент' }} showUserName />);

    expect(screen.getByText('С.Абент')).toHaveClass('max-w-28', 'opacity-100');
  });
});
