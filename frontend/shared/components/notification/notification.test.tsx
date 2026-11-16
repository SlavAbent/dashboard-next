import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Notification } from './notification';

describe('Notification', () => {
  it('renders a success message and closes it', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Notification variant="success" message="Task added" onClose={onClose} />
    );

    expect(screen.getByRole('status')).toHaveTextContent('Task added');

    await user.click(
      screen.getByRole('button', { name: 'Close notification' })
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders errors as an assertive alert', () => {
    render(
      <Notification
        variant="error"
        message="Failed to delete folder"
        onClose={jest.fn()}
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Failed to delete folder'
    );
  });
});
