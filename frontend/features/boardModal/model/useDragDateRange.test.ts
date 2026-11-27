import { act, renderHook } from '@testing-library/react';
import type { PointerEvent as ReactPointerEvent } from 'react';

import { useDragDateRange } from '@/features/boardModal/model/useDragDateRange';

describe('useDragDateRange', () => {
  it('normalizes a backwards drag into an ascending date range', () => {
    const onSelect = jest.fn();
    const { result } = renderHook(() => useDragDateRange(onSelect));
    const start = new Date(2026, 10, 12);
    const end = new Date(2026, 10, 5);

    act(() => {
      result.current.start(start);
      result.current.extend(end, { buttons: 1 } as ReactPointerEvent);
    });

    expect(onSelect).toHaveBeenCalledWith({ from: end, to: start });
    expect(result.current.shouldIgnoreClick()).toBe(true);
    expect(result.current.shouldIgnoreClick()).toBe(false);
  });

  it('ignores pointer movement when the primary button is not pressed', () => {
    const onSelect = jest.fn();
    const { result } = renderHook(() => useDragDateRange(onSelect));

    act(() => {
      result.current.start(new Date(2026, 10, 5));
      result.current.extend(new Date(2026, 10, 6), {
        buttons: 0,
      } as ReactPointerEvent);
    });

    expect(onSelect).not.toHaveBeenCalled();
  });
});
