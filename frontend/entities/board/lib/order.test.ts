import { getNextOrder } from '@/entities/board/lib/order';

describe('getNextOrder', () => {
  it('returns the initial order for an empty collection', () => {
    expect(getNextOrder([])).toBe(1);
  });

  it('returns the next order after the highest value', () => {
    expect(getNextOrder([{ order: 2 }, { order: 5 }, { order: 3 }])).toBe(6);
  });
});
