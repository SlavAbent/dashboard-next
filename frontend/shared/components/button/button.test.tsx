import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './button';

describe('Button', () => {
  it('renders an accessible button and handles a click', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Save changes</Button>);

    const button = screen.getByRole('button', { name: 'Save changes' });
    await user.click(button);

    expect(button).toBeVisible();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not handle clicks while disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button disabled onClick={handleClick}>
        Save changes
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Save changes' });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies the requested visual variant', () => {
    render(<Button variant="outline">Cancel</Button>);

    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass(
      'border-border',
      'bg-background'
    );
  });
});
