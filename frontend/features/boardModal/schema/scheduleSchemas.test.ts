import { folderSchema } from '@/features/boardModal/schema/folderSchema';
import { taskSchema } from '@/features/boardModal/schema/taskSchema';

const schedule = {
  startDate: '2026-11-05',
  endDate: '2026-11-12',
  priority: 'critical' as const,
};

describe('board modal schedule schemas', () => {
  it('accepts a date range and priority for a task', () => {
    expect(
      taskSchema.safeParse({
        taskValue: 'Prepare release',
        folderId: 'folder-1',
        completed: false,
        ...schedule,
      }).success
    ).toBe(true);
  });

  it('accepts an empty date range for a folder', () => {
    expect(
      folderSchema.safeParse({
        title: 'Release',
        columnId: 'upcoming',
        startDate: null,
        endDate: null,
        priority: 'none',
      }).success
    ).toBe(true);
  });

  it('rejects an incomplete or reversed range', () => {
    const base = {
      taskValue: 'Prepare release',
      folderId: 'folder-1',
      completed: false,
      priority: 'high' as const,
    };

    expect(
      taskSchema.safeParse({
        ...base,
        startDate: '2026-11-05',
        endDate: null,
      }).success
    ).toBe(false);
    expect(
      taskSchema.safeParse({
        ...base,
        startDate: '2026-11-12',
        endDate: '2026-11-05',
      }).success
    ).toBe(false);
  });
});
