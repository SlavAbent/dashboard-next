import { groupTasksToFolders } from '@/entities/board/lib/groupTasksToFolders';
import type { Column } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';

const columns: Column[] = [
  { id: 'todo', title: 'Todo', order: 1, color: '#000000' },
];

describe('groupTasksToFolders', () => {
  it('sorts folders inside a column by order', () => {
    const folders: TaskFolder[] = [
      { id: 'third', columnId: 'todo', title: 'Third', order: 3 },
      { id: 'first', columnId: 'todo', title: 'First', order: 1 },
      { id: 'second', columnId: 'todo', title: 'Second', order: 2 },
    ];

    const result = groupTasksToFolders([], columns, folders);

    expect(result[0]?.folders.map((folder) => folder.id)).toEqual([
      'first',
      'second',
      'third',
    ]);
  });
});
