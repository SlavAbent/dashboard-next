import { render, screen } from '@testing-library/react';

import { ScheduleMeta } from '@/shared/components/scheduleMeta/scheduleMeta';

describe('ScheduleMeta', () => {
  it('shows a formatted range and English priority', () => {
    const { container } = render(
      <ScheduleMeta
        startDate="2026-11-05"
        endDate="2026-11-12"
        priority="critical"
      />
    );

    expect(screen.getByText('05.11.2026 — 12.11.2026')).toBeInTheDocument();
    expect(screen.getByText('Higher')).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent(
      'Higher05.11.2026 — 12.11.2026'
    );
  });

  it('can hide priority when it is rendered in the card title', () => {
    render(
      <ScheduleMeta
        startDate="2026-11-05"
        endDate="2026-11-12"
        priority="high"
        showPriority={false}
      />
    );

    expect(screen.getByText('05.11.2026 — 12.11.2026')).toBeInTheDocument();
    expect(screen.queryByText('High')).not.toBeInTheDocument();
  });

  it('does not add empty metadata without a range or priority', () => {
    const { container } = render(
      <ScheduleMeta startDate={null} endDate={null} priority="none" />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
