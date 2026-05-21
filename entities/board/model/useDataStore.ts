import { create } from 'zustand';
import {
  Column,
  CreateFolder,
  Task,
  TasksFolder,
} from '@/entities/board/model/types/list-types';
import {
  addTask,
  createFolderTask,
  deleteFolder,
} from '@/entities/board/api/tasks';
import { getNextColumn } from '@/entities/board/lib/get-next-column';
import { updateFolders } from '@/shared/_api/folder/updateFolders';

type BoardStore = {
  tasks: Task[];
  tasksFolder: TasksFolder[];
  columns: Column[];

  closedColumns: string[];

  setBoardData: (tasks: Task[], columns: Column[]) => void;
  setFolders: (folders: TasksFolder[]) => void;
  moveFolder: (id: number, currentColumn: string) => void;

  addTask: (task: Task) => void;
  addFolder: (folder: CreateFolder) => void;
  removeFolder: (id: number) => void;
  toggleColumn: (columnId: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => ({
  tasks: [],
  tasksFolder: [],
  columns: [],
  closedColumns: [],

  setBoardData: (tasks, columns) => {
    set({
      tasks,
      columns,
    });
  },

  setFolders: (folders) => {
    set({
      tasksFolder: folders,
    });
  },

  moveFolder: async (id, currentColumn) => {
    const nextColumn = getNextColumn(currentColumn);

    const updatedFolder = await updateFolders(id, nextColumn);

    set((state) => ({
      tasksFolder: state.tasksFolder.map((folder) =>
        folder.id === id ? updatedFolder : folder
      ),
    }));
  },

  addFolder: async (tasksFolder) => {
    const createFolder = await createFolderTask(tasksFolder);

    set((state) => ({
      tasksFolder: [...state.tasksFolder, createFolder],
    }));
  },

  addTask: async (task) => {
    await addTask(task);

    set((state) => ({
      tasks: [...state.tasks, task],
    }));
  },
  removeFolder: async (id) => {
    await deleteFolder(id);

    set((state) => ({
      tasksFolder: state.tasksFolder.filter((folder) => folder.id !== id),
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
