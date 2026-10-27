import { render, screen } from '@testing-library/react';

import { Avatar, AvatarFallback } from './avatar';
import { Button } from './button';

describe('shared component semantic snapshots', () => {
  it('keeps the Button semantic contract', () => {
    render(<Button disabled>Save changes</Button>);

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect({
      disabled: button.hasAttribute('disabled'),
      slot: button.dataset.slot,
      tagName: button.tagName,
      text: button.textContent,
    }).toMatchSnapshot();
  });

  it('keeps the Avatar fallback semantic contract', () => {
    render(
      <Avatar size="lg" aria-label="Alex Morgan">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByLabelText('Alex Morgan');

    expect({
      fallback: screen.getByText('AM').textContent,
      label: avatar.getAttribute('aria-label'),
      size: avatar.dataset.size,
      slot: avatar.dataset.slot,
    }).toMatchSnapshot();
  });
});
