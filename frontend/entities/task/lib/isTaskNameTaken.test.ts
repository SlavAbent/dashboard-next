import type { Task } from '@/entities/task';
import { isTaskNameTaken } from '@/entities/task/lib/isTaskNameTaken';

const task = {
  id: 'task-1',
  text: 'Prepare release',
  tags: [],
  completed: false,
  taskFolderId: 'folder-1',
  order: 1,
  startDate: null,
  endDate: null,
  priority: 'none',
  createdAt: '2026-11-09T00:00:00.000Z',
} satisfies Task;

describe('isTaskNameTaken', () => {
  it('matches task names without case or surrounding whitespace', () => {
    expect(isTaskNameTaken([task], '  prepare RELEASE  ')).toBe(true);
  });

  it('excludes the task currently being edited', () => {
    expect(isTaskNameTaken([task], 'Prepare release', task.id)).toBe(false);
  });
});
