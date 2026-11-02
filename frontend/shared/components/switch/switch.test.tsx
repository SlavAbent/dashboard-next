import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './switch';

describe('Switch', () => {
  it('toggles and reports the new value', async () => {
    const user = userEvent.setup();
    const onCheckedChange = jest.fn();

    render(
      <Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />
    );
    const control = screen.getByRole('switch', { name: 'Notifications' });
    await user.click(control);

    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('keeps its state when disabled', async () => {
    const user = userEvent.setup();

    render(<Switch aria-label="Notifications" disabled />);
    const control = screen.getByRole('switch', { name: 'Notifications' });
    await user.click(control);

    expect(control).toHaveAttribute('aria-disabled', 'true');
    expect(control).not.toBeChecked();
  });
});
