'use client';

import { Button, NativeSelect } from '@dashboard/ui';

import { useCalendarStore } from '@/entities/calendar';
import type { Column } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';
import { priorities } from '@/shared/model/schedule';

type CalendarToolbarProps = {
  columns: Column[];
  folders: TaskFolder[];
};

const selectClass =
  'border-input bg-background h-8 rounded-sm border px-2 text-xs outline-none';

export const CalendarToolbar = ({ columns, folders }: CalendarToolbarProps) => {
  const defaultVisibleItems = useCalendarStore(
    (state) => state.defaultVisibleItems
  );
  const showItemsForAllDates = useCalendarStore(
    (state) => state.showItemsForAllDates
  );
  const filters = useCalendarStore((state) => state.filters);
  const setFilters = useCalendarStore((state) => state.setFilters);
  const resetFilters = useCalendarStore((state) => state.resetFilters);

  return (
    <div className="mb-2 flex flex-wrap items-center gap-2">
      <div className="border-input flex h-8 items-center rounded-sm border p-0.5">
        {(['tasks', 'folders'] as const).map((items) => (
          <button
            key={items}
            type="button"
            aria-pressed={defaultVisibleItems === items}
            onClick={() => showItemsForAllDates(items)}
            className="aria-pressed:bg-muted h-6 rounded-sm px-2 text-xs capitalize">
            {items}
          </button>
        ))}
      </div>

      <NativeSelect
        aria-label="Filter by priority"
        value={filters.priority}
        onChange={(event) =>
          setFilters({
            priority: event.target.value as typeof filters.priority,
          })
        }
        className={selectClass}>
        <option value="all">All priorities</option>
        {priorities.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </NativeSelect>

      <NativeSelect
        aria-label="Filter by folder"
        value={filters.folderId}
        onChange={(event) => setFilters({ folderId: event.target.value })}
        className={selectClass}>
        <option value="all">All folders</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.title}
          </option>
        ))}
      </NativeSelect>

      <NativeSelect
        aria-label="Filter by section"
        value={filters.columnId}
        onChange={(event) => setFilters({ columnId: event.target.value })}
        className={selectClass}>
        <option value="all">All sections</option>
        {columns.map((column) => (
          <option key={column.id} value={column.id}>
            {column.title}
          </option>
        ))}
      </NativeSelect>

      <label className="flex h-8 items-center gap-1.5 text-xs">
        <input
          type="checkbox"
          checked={filters.hideCompleted}
          onChange={(event) =>
            setFilters({ hideCompleted: event.target.checked })
          }
        />
        Hide completed
      </label>

      <Button type="button" variant="ghost" size="xs" onClick={resetFilters}>
        Reset
      </Button>
    </div>
  );
};
