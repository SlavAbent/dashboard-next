import type { TaskFolder } from '@/entities/folder';
import type { Task } from '@/entities/task';
import {
  groupFoldersByDate,
  groupTasksByDate,
} from '@/widgets/calendar/lib/groupTasksByDate';

const task = (overrides: Partial<Task> = {}): Task => ({
  id: 'task-1',
  text: 'Calendar task',
  tags: [],
  completed: false,
  taskFolderId: 'folder-1',
  order: 1,
  createdAt: '2026-11-11T00:00:00.000Z',
  startDate: '2026-11-11',
  endDate: '2026-11-11',
  priority: 'low',
  ...overrides,
});

describe('calendar task grouping', () => {
  it('places a range task into every included calendar day', () => {
    const grouped = groupTasksByDate([
      task({ startDate: '2026-11-10', endDate: '2026-11-12' }),
    ]);

    expect([...grouped.keys()]).toEqual([
      '2026-11-10',
      '2026-11-11',
      '2026-11-12',
    ]);
  });

  it('places a range folder into every included calendar day', () => {
    const folder: TaskFolder = {
      id: 'folder-1',
      columnId: 'planning',
      title: 'Calendar folder',
      order: 1,
      startDate: '2026-11-10',
      endDate: '2026-11-12',
      priority: 'medium',
    };

    expect([...groupFoldersByDate([folder]).keys()]).toEqual([
      '2026-11-10',
      '2026-11-11',
      '2026-11-12',
    ]);
  });

  it('includes folders that contain tasks for the day without duplicating them', () => {
    const folder: TaskFolder = {
      id: 'folder-1',
      columnId: 'planning',
      title: 'Planning folder',
      order: 1,
      startDate: null,
      endDate: null,
      priority: 'none',
    };
    const tasksByDate = groupTasksByDate([
      task({ taskFolderId: folder.id }),
      task({ id: 'task-2', taskFolderId: folder.id }),
    ]);

    expect(groupFoldersByDate([folder], tasksByDate).get('2026-11-11')).toEqual(
      [folder]
    );
  });
});
