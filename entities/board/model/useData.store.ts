'use client';

import { create } from 'zustand';

import {
  createFolderTask,
  deleteFolder,
  updateFolderDetails,
  updateFolders,
} from '@/entities/board/api/folderApi';
import {
  createTask,
  deleteTask,
  updateTask,
} from '@/entities/board/api/taskApi';
import { getNextColumn } from '@/entities/board/lib/getNextColumn';
import {
  Column,
  CreateFolder,
  CreateTask,
  Task,
  TaskFolder,
  UpdateFolderPayload,
} from '@/entities/board/model/types/list.types';
import { type EntityId, sameId } from '@/shared/lib/sameId';

type BoardStore = {
  tasks: Task[];
  taskFolders: TaskFolder[];
  columns: Column[];

  closedColumns: string[];

  setBoardData: (
    tasks: Task[],
    columns: Column[],
    folders: TaskFolder[]
  ) => void;

  addTask: (task: CreateTask) => Promise<void>;
  editTask: (
    id: EntityId,
    data: Partial<Pick<Task, 'text' | 'taskFolderId' | 'completed'>>
  ) => Promise<void>;
  toggleTask: (id: EntityId) => Promise<void>;
  removeTask: (id: EntityId) => Promise<void>;

  moveFolder: (id: EntityId, currentColumn: string) => void;
  updateFolder: (id: EntityId, data: UpdateFolderPayload) => void;
  addFolder: (folder: CreateFolder) => Promise<void>;
  removeFolder: (id: EntityId) => Promise<void>;
  toggleColumn: (columnId: string) => void;
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  tasks: [],
  taskFolders: [],
  columns: [],
  closedColumns: [],

  addTask: async (task) => {
    const createdTask = await createTask(task);

    set((state) => ({
      tasks: [...state.tasks, createdTask],
    }));
  },

  editTask: async (id, data) => {
    const updatedTask = await updateTask(id, data);

    set((state) => ({
      tasks: state.tasks.map((task) =>
        sameId(task.id, id) ? updatedTask : task
      ),
    }));
  },

  toggleTask: async (id) => {
    try {
      const task = get().tasks.find((item) => sameId(item.id, id));

      if (!task) return;

      set((state) => ({
        tasks: state.tasks.map((item) =>
          sameId(item.id, id) ? { ...item, completed: !item.completed } : item
        ),
      }));

      await updateTask(id, {
        completed: !task.completed,
      });
    } catch (error) {
      console.error(error);
    }
  },

  removeTask: async (id) => {
    await deleteTask(id);

    set((state) => ({
      tasks: state.tasks.filter((task) => !sameId(task.id, id)),
    }));
  },

  setBoardData: (tasks, columns, folders) => {
    set({
      tasks,
      columns,
      taskFolders: folders,
    });
  },

  moveFolder: async (id, currentColumn) => {
    const nextColumn = getNextColumn(currentColumn);

    const updatedFolder = await updateFolders(id, { columnId: nextColumn });

    set((state) => ({
      taskFolders: state.taskFolders.map((folder) =>
        sameId(folder.id, id) ? updatedFolder : folder
      ),
    }));
  },

  updateFolder: async (id, data) => {
    const updatedFolder = await updateFolderDetails(id, data);

    set((state) => ({
      taskFolders: state.taskFolders.map((folder) =>
        sameId(folder.id, id) ? updatedFolder : folder
      ),
    }));
  },

  addFolder: async (folder) => {
    const createdFolder = await createFolderTask(folder);

    set((state) => ({
      taskFolders: [...state.taskFolders, createdFolder],
    }));
  },

  removeFolder: async (id) => {
    const folderTasks = get().tasks.filter((task) =>
      sameId(task.taskFolderId, id)
    );

    await Promise.all([
      deleteFolder(id),
      ...folderTasks.map((task) => deleteTask(task.id)),
    ]);

    set((state) => ({
      taskFolders: state.taskFolders.filter((folder) => !sameId(folder.id, id)),
      tasks: state.tasks.filter((task) => !sameId(task.taskFolderId, id)),
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
