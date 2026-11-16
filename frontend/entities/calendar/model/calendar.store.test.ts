import { useCalendarStore } from '@/entities/calendar/model/calendar.store';

describe('calendar store item visibility', () => {
  beforeEach(() => {
    useCalendarStore.setState({
      currentMonth: new Date(2026, 10, 15),
      viewMode: 'month',
      defaultVisibleItems: 'tasks',
      visibleItemsByDate: {},
      expandedDates: {},
      filters: {
        priority: 'all',
        folderId: 'all',
        columnId: 'all',
        hideCompleted: false,
      },
    });
  });

  it('stores the selected item type independently for each day', () => {
    const { showItemsForDate } = useCalendarStore.getState();

    showItemsForDate('2026-11-15', 'folders');
    showItemsForDate('2026-11-16', 'tasks');

    expect(useCalendarStore.getState().visibleItemsByDate).toEqual({
      '2026-11-15': 'folders',
      '2026-11-16': 'tasks',
    });
  });

  it('switches the visible item type for all days', () => {
    const { showItemsForDate, showItemsForAllDates } =
      useCalendarStore.getState();

    showItemsForDate('2026-11-15', 'tasks');
    showItemsForAllDates('folders');

    expect(useCalendarStore.getState().defaultVisibleItems).toBe('folders');
    expect(useCalendarStore.getState().visibleItemsByDate).toEqual({});
  });

  it('navigates by the selected calendar view', () => {
    const { setViewMode, showNextMonth } = useCalendarStore.getState();

    setViewMode('week');
    showNextMonth();

    expect(useCalendarStore.getState().currentMonth).toEqual(
      new Date(2026, 10, 22)
    );
  });
});
