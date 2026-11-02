import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('toggles through a user click', async () => {
    const user = userEvent.setup();

    render(<Checkbox aria-label="Completed" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Completed' });

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('does not toggle while disabled', async () => {
    const user = userEvent.setup();

    render(<Checkbox aria-label="Completed" disabled />);
    const checkbox = screen.getByRole('checkbox', { name: 'Completed' });
    await user.click(checkbox);

    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
    expect(checkbox).not.toBeChecked();
  });
});
