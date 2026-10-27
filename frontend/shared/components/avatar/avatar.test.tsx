import { render, screen } from '@testing-library/react';

import { Avatar, AvatarFallback } from './avatar';

describe('Avatar', () => {
  it('renders fallback content when an image is unavailable', () => {
    render(
      <Avatar aria-label="Alex Morgan">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByLabelText('Alex Morgan')).toBeVisible();
    expect(screen.getByText('AM')).toBeVisible();
  });

  it('exposes the selected size to styling and consumers', () => {
    render(
      <Avatar size="lg" aria-label="Large avatar">
        <AvatarFallback>LA</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByLabelText('Large avatar')).toHaveAttribute(
      'data-size',
      'lg'
    );
  });
});
