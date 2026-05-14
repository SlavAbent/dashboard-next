import { create } from 'zustand';
import { Column, Task } from '@/entities/board/model/types/list-types';
import { addTask, deleteTask } from '@/entities/board/api/tasks';

type BoardStore = {
  tasks: Task[];
  columns: Column[];

  closedColumns: string[];

  setBoardData: (tasks: Task[], columns: Column[]) => void;

  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  toggleColumn: (columnId: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  tasks: [],
  columns: [],
  closedColumns: [],

  setBoardData: (tasks, columns) => {
    set({
      tasks,
      columns,
    });
  },

  addTask: async (task) => {
    await addTask(task);

    set((state) => ({
      tasks: [...state.tasks, task],
    }));
  },
  removeTask: async (id) => {
    await deleteTask(id);

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  toggleColumn: (columnId) =>
    set((state) => {
      const isClosed = state.closedColumns.includes(columnId);

      return {
        closedColumns: isClosed
          ? state.closedColumns.filter((id) => id !== columnId)
          : [...state.closedColumns, columnId],
      };
    }),
}));
