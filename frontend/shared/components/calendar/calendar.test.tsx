import { render } from '@testing-library/react';

import { Calendar } from '@/shared/components/calendar/calendar';

describe('Calendar', () => {
  it('applies the dashboard calendar theme class', () => {
    const { container } = render(<Calendar mode="range" />);

    expect(container.querySelector('.rdp-root')).toHaveClass(
      'dashboard-calendar'
    );
  });
});
